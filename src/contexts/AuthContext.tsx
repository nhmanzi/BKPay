import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  businessName: string;
  isVerified?: boolean;
  merchantCode: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: Omit<User, 'id'> & { password: string }) => Promise<void>;
  verifyAccount: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const { t } = useTranslation();

  const login = async (email: string, password: string) => {
    // This would be replaced with actual API call
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login
      setUser({
        id: '123',
        name: 'Kevin Rutayisire',
        email:'ngabo@gmail.com',
        role: 'merchant',
        businessName: 'Profit Prophets',
        isVerified: false,
        merchantCode: '11333357'
      });
    } catch (error) {
      console.error(t('auth.loginFailed'), error);
      throw new Error(t('auth.loginFailed'));
    }
  };

  const logout = () => {
    setUser(null);
  };

  const register = async (userData: Omit<User, 'id'> & { password: string }) => {
    // This would be replaced with actual API call
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful registration
      setUser({
        id: '123',
        name: userData.name,
        email: userData.email,
        role: userData.role,
        businessName: userData.businessName,
        isVerified: false,
        merchantCode: '11333357'
      });
    } catch (error) {
      console.error(t('auth.registrationFailed'), error);
      throw new Error(t('auth.registrationFailed'));
    }
  };

  const verifyAccount = async () => {
    if (user) {
      setUser({
        ...user,
        isVerified: true
      });
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user,
      login, 
      logout,
      register,
      verifyAccount
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}