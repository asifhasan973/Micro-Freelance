import React, { createContext, useContext, useEffect, useState } from 'react';

export type Role = 'admin' | 'job_provider' | 'job_seeker';
export type ThemePref = 'light' | 'dark' | 'system';

export interface UserProfileShape {
  id: string;
  email: string;
  role: Role;
  name: string;

  // optional profile fields (for UserProfile page)
  phone?: string;
  location?: string;
  bio?: string;
  avatarUrl?: string;

  // meta
  joinedAt?: string;   // ISO string
  lastActive?: string; // ISO string

  // simple stats
  stats?: {
    posts?: number;
    projects?: number;
    followers?: number;
    following?: number;
  };

  // security + prefs
  security?: {
    twoFactorEnabled?: boolean;
    lastLoginIp?: string;
  };
  preferences?: {
    theme?: ThemePref;
    language?: string; // 'en' | 'bn'
  };
}

interface AuthContextType {
  user: UserProfileShape | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;

  // added so Register page works
  register: (name: string, email: string, password: string) => boolean;

  // used by UserProfile Save
  updateUser: (patch: Partial<UserProfileShape>) => void;
}

const LS_USER = 'user';
const LS_USERS_DB = 'users_db'; // [{ email, password, profile }]
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

// ------------ helpers ------------
function cryptoRandomId(): string {
  try {
    const bytes = new Uint8Array(8);
    (window.crypto || (window as any).msCrypto).getRandomValues(bytes);
    return Array.from(bytes).map((b) => b.toString(16).padStart(2, '0')).join('');
  } catch {
    return Math.random().toString(36).slice(2);
  }
}

const withDefaults = (
  u: Partial<UserProfileShape> & Pick<UserProfileShape, 'email' | 'role' | 'name'>
): UserProfileShape => ({
  id: u.id ?? cryptoRandomId(),
  email: u.email,
  role: u.role,
  name: u.name,

  phone: u.phone ?? '',
  location: u.location ?? '',
  bio: u.bio ?? '',
  avatarUrl: u.avatarUrl ?? '',

  joinedAt: u.joinedAt ?? new Date().toISOString(),
  lastActive: new Date().toISOString(),

  stats: {
    posts: u.stats?.posts ?? 0,
    projects: u.stats?.projects ?? 0,
    followers: u.stats?.followers ?? 0,
    following: u.stats?.following ?? 0,
  },

  security: {
    twoFactorEnabled: u.security?.twoFactorEnabled ?? false,
    lastLoginIp: u.security?.lastLoginIp ?? '',
  },

  preferences: {
    theme: u.preferences?.theme ?? 'system',
    language: u.preferences?.language ?? 'en',
  },
});

type UsersDBRow = { email: string; password: string; profile: UserProfileShape };

const readUsersDB = (): UsersDBRow[] => {
  try {
    const raw = localStorage.getItem(LS_USERS_DB);
    return raw ? (JSON.parse(raw) as UsersDBRow[]) : [];
  } catch {
    return [];
  }
};
const writeUsersDB = (rows: UsersDBRow[]) => {
  localStorage.setItem(LS_USERS_DB, JSON.stringify(rows));
};

// ------------ provider ------------
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfileShape | null>(() => {
    try {
      const raw = localStorage.getItem(LS_USER);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (!parsed) return null;
      const basic = {
        email: parsed.email as string,
        role: parsed.role as Role,
        name: parsed.name as string,
      };
      return withDefaults({ ...parsed, ...basic });
    } catch {
      return null;
    }
  });

  // persist current user
  useEffect(() => {
    if (user) localStorage.setItem(LS_USER, JSON.stringify(user));
    else localStorage.removeItem(LS_USER);
  }, [user]);

  // --- register ---
  const register = (name: string, email: string, password: string): boolean => {
    const db = readUsersDB();
    const exists = db.find((r) => r.email.toLowerCase() === email.toLowerCase());
    if (exists) return false;

    const profile = withDefaults({
      email,
      role: 'job_seeker',
      name,
      bio: '',
      avatarUrl: '',
      preferences: { theme: 'system', language: 'en' },
    });

    db.push({ email, password, profile });
    writeUsersDB(db);

    setUser(profile);
    localStorage.setItem(LS_USER, JSON.stringify(profile));
    return true;
  };

  // --- login ---
  const login = (email: string, password: string): boolean => {
    // 1) try registered users db
    const db = readUsersDB();
    const row = db.find(
      (r) => r.email.toLowerCase() === email.toLowerCase() && r.password === password
    );
    if (row) {
      const prof = withDefaults({ ...row.profile, email: row.profile.email, role: row.profile.role, name: row.profile.name });
      setUser(prof);
      localStorage.setItem(LS_USER, JSON.stringify(prof));
      return true;
    }

    // 2) fallback: your previous dummy credentials
    let base: { email: string; role: Role; name: string } | null = null;

    if (email === 'admin@gmail.com' && password === 'admin') {
      base = { email, role: 'admin', name: 'Admin User' };
    } else if (email === 'test@gmail.com' && password === 'test') {
      base = { email, role: 'job_provider', name: 'Test User' };
    } else if (email.includes('@') && password.length >= 4) {
      const nm = email.split('@')[0];
      base = { email, role: 'job_seeker', name: nm.charAt(0).toUpperCase() + nm.slice(1) };
    }

    if (!base) return false;

    const enriched = withDefaults(base);
    setUser(enriched);
    localStorage.setItem(LS_USER, JSON.stringify(enriched));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(LS_USER);
  };

  // update profile (deep merge relevant parts)
  const updateUser = (patch: Partial<UserProfileShape>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const next: UserProfileShape = {
        ...prev,
        ...patch,
        preferences: { ...prev.preferences, ...patch.preferences },
        security: { ...prev.security, ...patch.security },
        stats: { ...prev.stats, ...patch.stats },
        lastActive: patch.lastActive ?? new Date().toISOString(),
      };
      localStorage.setItem(LS_USER, JSON.stringify(next));

      // also sync users_db if this user came from there
      const db = readUsersDB();
      const i = db.findIndex((r) => r.email.toLowerCase() === prev.email.toLowerCase());
      if (i !== -1) {
        db[i] = { ...db[i], profile: next };
        writeUsersDB(db);
      }

      return next;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        register,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};