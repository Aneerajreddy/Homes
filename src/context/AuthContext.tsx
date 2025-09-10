import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: 'tenant' | 'owner' | 'admin';
  familySize?: number;
  preferredBudgetMin?: number;
  preferredBudgetMax?: number;
  preferredLocations?: string[];
  isVerified: boolean;
  profileImage?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => Promise<void>;
  isLoading: boolean;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: string;
  familySize?: number;
  preferredBudgetMin?: number;
  preferredBudgetMax?: number;
  preferredLocations?: string[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Sample users for demo
  const sampleUsers: User[] = [
    {
      id: 'tenant1',
      email: 'amit.sharma@email.com',
      firstName: 'Amit',
      lastName: 'Sharma',
      phone: '+91-9876543210',
      role: 'tenant',
      familySize: 4,
      preferredBudgetMin: 25000,
      preferredBudgetMax: 50000,
      preferredLocations: ['Mumbai', 'Pune', 'Bangalore'],
      isVerified: true,
      profileImage: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: 'owner1',
      email: 'priya.singh@email.com',
      firstName: 'Priya',
      lastName: 'Singh',
      phone: '+91-9876543211',
      role: 'owner',
      isVerified: true,
      profileImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: 'admin1',
      email: 'admin@familyrent.com',
      firstName: 'System',
      lastName: 'Admin',
      phone: '+91-9876543212',
      role: 'admin',
      isVerified: true
    }
  ];

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('familyrent_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = sampleUsers.find(u => u.email === email);
    if (foundUser && password === 'password123') {
      setUser(foundUser);
      localStorage.setItem('familyrent_user', JSON.stringify(foundUser));
    } else {
      throw new Error('Invalid email or password');
    }
    
    setIsLoading(false);
  };

  const register = async (userData: RegisterData) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newUser: User = {
      id: `user_${Date.now()}`,
      ...userData,
      role: (userData.role === 'tenant' || userData.role === 'owner') ? userData.role : 'tenant',
      isVerified: false
    };
    
    setUser(newUser);
    localStorage.setItem('familyrent_user', JSON.stringify(newUser));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('familyrent_user');
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) return;
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('familyrent_user', JSON.stringify(updatedUser));
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      updateProfile,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}