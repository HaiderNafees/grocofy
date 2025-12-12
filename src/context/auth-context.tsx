
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
  login: (email: string, pass: string) => User | null;
  logout: () => void;
  signup: (email: string, pass: string) => User | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_EMAIL = 'admin@store.com';
const ADMIN_PASSWORD = 'Admin7989';

const initializeUsers = () => {
    try {
        if (typeof window !== 'undefined') {
            const storedUsers = localStorage.getItem('users');
            if (storedUsers) {
                const users = JSON.parse(storedUsers);
                if (!users[ADMIN_EMAIL]) {
                    users[ADMIN_EMAIL] = { password: ADMIN_PASSWORD };
                    localStorage.setItem('users', JSON.stringify(users));
                }
                return users;
            } else {
                const initialUsers = {
                    [ADMIN_EMAIL]: { password: ADMIN_PASSWORD }
                };
                localStorage.setItem('users', JSON.stringify(initialUsers));
                return initialUsers;
            }
        }
    } catch (error) {
        console.error("Failed to initialize users in localStorage", error);
    }
    return {};
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeUsers();
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

  const login = (email: string, pass: string): User | null => {
    try {
        const storedUsers = JSON.parse(localStorage.getItem('users') || '{}');
        if (storedUsers[email] && storedUsers[email].password === pass) {
            const user: User = { email, isAdmin: email === ADMIN_EMAIL };
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);
            return user;
        }
    } catch (error) {
        console.error("Failed during login", error);
    }
    return null;
  };

  const signup = (email: string, pass: string): User | null => {
    try {
        const storedUsers = JSON.parse(localStorage.getItem('users') || '{}');
        if (storedUsers[email]) {
            return null; // User already exists
        }
        storedUsers[email] = { password: pass };
        localStorage.setItem('users', JSON.stringify(storedUsers));
        
        const user: User = { email, isAdmin: email === ADMIN_EMAIL };
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
        return user;
    } catch (error) {
        console.error("Failed during signup", error);
    }
    return null;
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
