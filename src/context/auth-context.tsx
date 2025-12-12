
'use client';

import type { ReactNode } from 'react';
import { createContext, useState, useEffect } from 'react';

interface User {
  email: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
  signup: (email: string, pass: string) => boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_EMAIL = 'admin@grocofy.com';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (email: string, pass: string): boolean => {
    try {
        const storedUsers = JSON.parse(localStorage.getItem('users') || '{}');
        if (storedUsers[email] && storedUsers[email].password === pass) {
            const user: User = { email, isAdmin: email === ADMIN_EMAIL };
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);
            return true;
        }
    } catch (error) {
        console.error("Failed during login", error);
    }
    return false;
  };

  const signup = (email: string, pass: string): boolean => {
    try {
        const storedUsers = JSON.parse(localStorage.getItem('users') || '{}');
        if (storedUsers[email]) {
            return false; // User already exists
        }
        storedUsers[email] = { password: pass };
        localStorage.setItem('users', JSON.stringify(storedUsers));
        
        const user: User = { email, isAdmin: email === ADMIN_EMAIL };
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
        return true;
    } catch (error) {
        console.error("Failed during signup", error);
    }
    return false;
  };

  const logout = () => {
    try {
      localStorage.removeItem('user');
    } catch (error) {
       console.error("Failed to remove user from localStorage", error);
    }
    setUser(null);
  };

  const value = { user, loading, login, logout, signup };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
