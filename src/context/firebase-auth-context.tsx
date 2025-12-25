'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { authAPI } from '../lib/api';

interface User {
  id: number;
  email: string;
  full_name?: string;
  role: 'user' | 'admin';
  isAuthenticated?: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<User>;
  signUp: (email: string, password: string, displayName?: string) => Promise<User>;
  signOut: () => Promise<void>;
  logout: () => Promise<void>;
  login: (email: string, password: string) => Promise<User>;
  signup: (email: string, password: string, displayName?: string) => Promise<User>;
  isAdmin: boolean;
  checkAdminStatus: () => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAdminStatus = async () => {
    try {
      const adminStatus = user?.role === 'admin';
      setIsAdmin(adminStatus);
      return adminStatus;
    } catch (error) {
      console.error('Error checking admin status:', error);
      setIsAdmin(false);
      return false;
    }
  };

  useEffect(() => {
    // Initialize loading state
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string): Promise<User> => {
    const user = await authAPI.signIn(email, password);
    setUser(user);
    await checkAdminStatus();
    return user;
  };

  const signUp = async (email: string, password: string, displayName?: string): Promise<User> => {
    // Mock signup - in production you'd implement this in PHP backend
    const mockUser: User = {
      id: Date.now(),
      email,
      full_name: displayName || email.split('@')[0],
      role: 'user',
      isAuthenticated: true
    };
    setUser(mockUser);
    await checkAdminStatus();
    return mockUser;
  };

  const signOut = async (): Promise<void> => {
    await authAPI.signOut();
    setUser(null);
    setIsAdmin(false);
  };

  const value: AuthContextType = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    logout: signOut,
    login: signIn,
    signup: signUp,
    isAdmin,
    checkAdminStatus,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Hook for admin-only access
export function useAdminAuth() {
  const { user, isAdmin, ...auth } = useAuth();
  
  if (user && !isAdmin) {
    throw new Error('Admin access required');
  }
  
  return { user, isAdmin, ...auth };
}
