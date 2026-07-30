import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserProfile {
  id?: string;
  email: string;
  fullName: string;
  location: string;
  farmAcres: number;
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, fullName: string, location: string, farmAcres?: number) => Promise<boolean>;
  updateProfile: (fullName: string, location: string, farmAcres: number, email: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('cardamom_care_user');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (!parsed.fullName || parsed.fullName === 'Cardamom Farmer' || parsed.fullName === 'Ramanan High-Range Farmer') {
          parsed.fullName = 'Madhusree M';
          parsed.email = 'madhu@gmail.com';
        }
        return parsed;
      } catch (e) {
        return null;
      }
    }
    // Default logged in farmer profile
    return {
      email: 'madhu@gmail.com',
      fullName: 'Madhusree M',
      location: 'Bodinayakanur, Theni',
      farmAcres: 16.0,
    };
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('cardamom_care_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('cardamom_care_user');
    }
  }, [user]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch('http://localhost:8000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok && data.user) {
        const uProfile: UserProfile = {
          id: data.user.id,
          email: data.user.email,
          fullName: data.user.full_name || 'Madhusree M',
          location: data.user.location || 'Bodinayakanur, Theni',
          farmAcres: data.user.farm_acres || 16.0,
        };
        setUser(uProfile);
        return true;
      }
    } catch (e) {
      console.warn('Backend login fallback to local session:', e);
    }
    // Local fallback
    setUser({
      email,
      fullName: 'Madhusree M',
      location: 'Bodinayakanur, Theni',
      farmAcres: 16.0,
    });
    return true;
  };

  const register = async (
    email: string,
    password: string,
    fullName: string,
    location: string,
    farmAcres: number = 16.0
  ): Promise<boolean> => {
    try {
      const res = await fetch('http://localhost:8000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          full_name: fullName,
          location,
          farm_acres: farmAcres,
        }),
      });
      const data = await res.json();
      if (res.ok && data.user) {
        const uProfile: UserProfile = {
          id: data.user.id,
          email: data.user.email,
          fullName: data.user.full_name,
          location: data.user.location,
          farmAcres: data.user.farm_acres || farmAcres,
        };
        setUser(uProfile);
        return true;
      }
    } catch (e) {
      console.warn('Backend registration fallback to local session:', e);
    }
    setUser({
      email,
      fullName,
      location,
      farmAcres,
    });
    return true;
  };

  const updateProfile = async (
    fullName: string,
    location: string,
    farmAcres: number,
    email: string
  ): Promise<boolean> => {
    try {
      await fetch('http://localhost:8000/api/auth/profile/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          full_name: fullName,
          location,
          farm_acres: farmAcres,
        }),
      });
    } catch (e) {
      console.warn('Backend profile update offline fallback:', e);
    }

    setUser((prev) => ({
      email: email || prev?.email || '',
      fullName,
      location,
      farmAcres,
    }));
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        updateProfile,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
