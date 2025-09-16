// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { User as FBUser } from 'firebase/auth';
import { subscribeToAuth, signInWithEmail, signUpWithEmail, logout as fbLogout } from '../lib/auth';
import { updateProfile } from 'firebase/auth';

export type ThemePref = 'light' | 'dark' | 'system';

export interface UserProfileShape {
  id: string;           // Firebase uid
  email: string;
  name: string;
  // optional profile fields (for UserProfile page)
  phone?: string;
  location?: string;
  bio?: string;
  avatarUrl?: string;   // Firebase photoURL
  // meta
  joinedAt?: string;
  lastActive?: string;
  // simple stats
  stats?: { posts?: number; projects?: number; followers?: number; following?: number; };
  // security + prefs
  security?: { twoFactorEnabled?: boolean; lastLoginIp?: string; };
  preferences?: { theme?: ThemePref; language?: string; };
}

interface AuthContextType {
  user: UserProfileShape | null;
  isAuthenticated: boolean;

  // Firebase-backed auth
  register: (name: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;

  // profile updates (name / avatar kept in Firebase; the rest stored locally)
  updateUser: (patch: Partial<UserProfileShape>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};

// ---- local persisted extras (for fields not stored in Firebase) ----
const PROFILE_PREFIX = 'profile_'; // key is profile_<uid>

const readLocalProfile = (uid: string): Partial<UserProfileShape> | null => {
  try {
    const raw = localStorage.getItem(PROFILE_PREFIX + uid);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const writeLocalProfile = (uid: string, data: Partial<UserProfileShape>) => {
  localStorage.setItem(PROFILE_PREFIX + uid, JSON.stringify(data));
};

// ensure defaults exist (useful for first-time Google sign-in)
const ensureLocalProfile = (u: FBUser) => {
  const existing = readLocalProfile(u.uid);
  if (!existing) {
    writeLocalProfile(u.uid, {
      preferences: { theme: 'system', language: 'en' },
      stats: { posts: 0, projects: 0, followers: 0, following: 0 },
    });
  }
};

// ---- map Firebase user -> app profile ----
function toProfile(u: FBUser | null): UserProfileShape | null {
  if (!u) return null;
  const extras = readLocalProfile(u.uid) ?? {};
  return {
    id: u.uid,
    email: u.email || '',
    name: u.displayName || (extras.name as string) || (u.email ? u.email.split('@')[0] : 'User'),
    phone: (extras.phone as string) || '',
    location: (extras.location as string) || '',
    bio: (extras.bio as string) || '',
    avatarUrl: u.photoURL || (extras.avatarUrl as string) || '',
    joinedAt: (extras.joinedAt as string) || u.metadata?.creationTime || new Date().toISOString(),
    lastActive: new Date().toISOString(),
    stats: (extras.stats as UserProfileShape['stats']) || { posts: 0, projects: 0, followers: 0, following: 0 },
    security: (extras.security as UserProfileShape['security']) || { twoFactorEnabled: false, lastLoginIp: '' },
    preferences: (extras.preferences as UserProfileShape['preferences']) || { theme: 'system', language: 'en' },
  };
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fbUser, setFbUser] = useState<FBUser | null>(null);
  const [user, setUser] = useState<UserProfileShape | null>(null);

  // subscribe to Firebase auth state
  useEffect(() => {
    const unsub = subscribeToAuth((u) => {
      if (u) ensureLocalProfile(u);
      setFbUser(u);
    });
    return () => unsub();
  }, []);

  // derive our profile whenever Firebase user changes
  useEffect(() => {
    setUser(toProfile(fbUser));
  }, [fbUser]);

  const register = async (name: string, email: string, password: string) => {
    const cred = await signUpWithEmail(name, email, password);
    // seed local extras
    writeLocalProfile(cred.user.uid, {
      name,
      preferences: { theme: 'system', language: 'en' },
      stats: { posts: 0, projects: 0, followers: 0, following: 0 },
    });
    setUser(toProfile(cred.user));
  };

  const login = async (email: string, password: string) => {
    const cred = await signInWithEmail(email, password);
    setUser(toProfile(cred.user));
  };

  const logout = async () => {
    await fbLogout();
    setUser(null);
  };

  const updateUser = async (patch: Partial<UserProfileShape>) => {
    if (!fbUser) return;
    const local = readLocalProfile(fbUser.uid) ?? {};
    // update Firebase displayName/photo if included
    const needsFirebaseUpdate =
      (patch.name && patch.name !== fbUser.displayName) ||
      (patch.avatarUrl && patch.avatarUrl !== fbUser.photoURL);

    if (needsFirebaseUpdate) {
      await updateProfile(fbUser, {
        displayName: patch.name ?? fbUser.displayName ?? undefined,
        photoURL: patch.avatarUrl ?? fbUser.photoURL ?? undefined,
      });
    }

    const mergedLocal = {
      ...local,
      ...patch,
      preferences: { ...(local.preferences || {}), ...(patch.preferences || {}) },
      security: { ...(local.security || {}), ...(patch.security || {}) },
      stats: { ...(local.stats || {}), ...(patch.stats || {}) },
    };
    writeLocalProfile(fbUser.uid, mergedLocal);
    setUser(toProfile({ ...fbUser }));
  };

  const value = useMemo<AuthContextType>(() => ({
    user,
    isAuthenticated: !!user,
    register,
    login,
    logout,
    updateUser,
  }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};