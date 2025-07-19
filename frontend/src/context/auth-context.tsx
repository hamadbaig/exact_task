'use client';

import api from '@/lib/api';
import { getToken, removeToken, setToken } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface AuthContextProps {
  user: User | null;
  token: string | null;
  login: (token: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setTokenState] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = getToken();
      if (storedToken) {
        setTokenState(storedToken);
        try {
          const res = await api.get('/auth/profile', {
            headers: { Authorization: `Bearer ${storedToken}` },
          });
          setUser(res.data);
        } catch (err) {
          console.error('Auth error', err);
          removeToken();
          setTokenState(null);
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = async (jwtToken: string) => {
    setToken(jwtToken);
    setTokenState(jwtToken);
    const res = await api.get('/auth/profile', {
      headers: { Authorization: `Bearer ${jwtToken}` },
    });
    setUser(res.data);
  };

  const logout = () => {
    removeToken();
    setUser(null);
    setTokenState(null);
    router.push('/auth/login');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
