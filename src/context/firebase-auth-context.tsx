'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { authAPI, User as AppUser, isAdmin } from '../lib/supabase-api';

interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<AppUser>;
  signUp: (email: string, password: string, displayName?: string) => Promise<AppUser>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
  checkAdminStatus: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAdminStatus = async () => {
    try {
      const adminStatus = await isAdmin();
      setIsAdmin(adminStatus);
      return adminStatus;
    } catch (error) {
      console.error('Error checking admin status:', error);
      setIsAdmin(false);
      return false;
    }
  };

  useEffect(() => {
    const unsubscribe = authAPI.onAuthStateChanged(async (user) => {
      setUser(user);
      if (user) {
        await checkAdminStatus();
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string): Promise<AppUser> => {
    const user = await authAPI.signIn(email, password);
    setUser(user);
    await checkAdminStatus();
    return user;
  };

  const signUp = async (email: string, password: string, displayName?: string): Promise<AppUser> => {
    const user = await authAPI.signUp(email, password, displayName);
    setUser(user);
    await checkAdminStatus();
    return user;
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
