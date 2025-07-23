import React, { createContext, useContext, useState } from 'react';

interface User {
  email: string;
  role: 'admin' | 'job_provider' | 'job_seeker';
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email: string, password: string): boolean => {
    // Dummy authentication logic
    if (email === 'admin@gmail.com' && password === 'admin') {
      const adminUser = {
        email,
        role: 'admin' as const,
        name: 'Admin User'
      };
      setUser(adminUser);
      localStorage.setItem('user', JSON.stringify(adminUser));
      return true;
    } else if (email === 'test@gmail.com' && password === 'test') {
      const testUser = {
        email,
        role: 'job_provider' as const,
        name: 'Test User'
      };
      setUser(testUser);
      localStorage.setItem('user', JSON.stringify(testUser));
      return true;
    } else if (email.includes('@') && password.length >= 4) {
      // Allow any valid email with password >= 4 chars as job_seeker
      const jobSeekerUser = {
        email,
        role: 'job_seeker' as const,
        name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1)
      };
      setUser(jobSeekerUser);
      localStorage.setItem('user', JSON.stringify(jobSeekerUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
};