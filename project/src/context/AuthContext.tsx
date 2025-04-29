import React, { createContext, useContext, useState } from 'react';
import { User } from '../types';

const defaultUsers: User[] = [
  {
    id: '1',
    name: 'Админ',
    email: 'admin@example.com',
    role: 'admin',
  },
  {
    id: '2',
    name: 'Официант',
    email: 'waiter@example.com',
    role: 'waiter',
  },
];

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
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
  const [user, setUser] = useState<User | null>(null);

  const login = (username: string, password: string) => {
    if (username === 'Admin' && password === 'Admins2@#') {
      setUser(defaultUsers[0]);
      return true;
    } else if (username === 'Waiter' && password === 'Waiter123') {
      setUser(defaultUsers[1]);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};