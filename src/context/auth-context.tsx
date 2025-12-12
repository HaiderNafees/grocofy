'use client';

import type { ReactNode } from 'react';
import { createContext, useState, useEffect } from 'react';

interface User {
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
  signup: (email: string, pass: string) => boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This effect runs once on mount to check for a user in local storage.
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      // If parsing fails, ensure user is null
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (email: string, pass: string): boolean => {
    // This is a mock login. In a real app, you'd validate credentials.
    // We'll check if a user with this email exists.
    try {
        const storedUsers = JSON.parse(localStorage.getItem('users') || '{}');
        if (storedUsers[email] && storedUsers[email].password === pass) {
            const user = { email };
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
    // This is a mock signup.
    try {
        const storedUsers = JSON.parse(localStorage.getItem('users') || '{}');
        if (storedUsers[email]) {
            return false; // User already exists
        }
        storedUsers[email] = { password: pass };
        localStorage.setItem('users', JSON.stringify(storedUsers));
        
        const user = { email };
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
