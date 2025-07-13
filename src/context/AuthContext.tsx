import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserType = 'admin' | 'supplier' | null;

interface AuthContextType {
  userType: UserType;
  currentSupplier: string | null;
  login: (type: UserType, supplierId?: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userType, setUserType] = useState<UserType>(null);
  const [currentSupplier, setCurrentSupplier] = useState<string | null>(null);

  const login = (type: UserType, supplierId?: string) => {
    setUserType(type);
    if (type === 'supplier' && supplierId) {
      setCurrentSupplier(supplierId);
    }
  };

  const logout = () => {
    setUserType(null);
    setCurrentSupplier(null);
  };

  return (
    <AuthContext.Provider value={{ userType, currentSupplier, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};