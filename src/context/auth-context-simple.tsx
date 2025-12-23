'use client';

import type { ReactNode } from 'react';
import { createContext, useState, useEffect } from 'react';
import { authAPI, usersAPI } from '@/lib/api';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  created_at?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
  isAdmin: () => boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user in localStorage
    const storedUser = localStorage.getItem('grocofy_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem('grocofy_user');
      }
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const userData = await authAPI.signIn(email, password);
      setUser(userData);
      localStorage.setItem('grocofy_user', JSON.stringify(userData));
    } catch (error) {
      throw error;
    }
  };

  const signUp = async (name: string, email: string, password: string) => {
    try {
      const userData = {
        id: Date.now().toString(),
        name,
        email,
        password,
        role: email === 'admin@grocofy.com' ? 'admin' : 'user',
        created_at: new Date().toISOString()
      };
      
      const newUser = await authAPI.signUp(userData);
      setUser(newUser);
      localStorage.setItem('grocofy_user', JSON.stringify(newUser));
    } catch (error) {
      throw error;
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('grocofy_user');
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      signIn,
      signUp,
      signOut,
      isAdmin
    }}>
      {children}
    </AuthContext.Provider>
  );
};
