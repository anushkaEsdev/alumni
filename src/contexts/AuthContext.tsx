import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';
import { authAPI } from '@/services/api';

// Mock user data for our frontend implementation
interface User {
  id: string;
  username: string;
  email: string;
  bio?: string;
  avatarUrl?: string;
  photoURL?: string;
}

interface ProfileUpdateData {
  username?: string;
  email?: string;
  bio?: string;
  avatarUrl?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  updateProfile: (data: Partial<User>) => Promise<void>;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user database
const MOCK_USERS = [
  {
    id: "1",
    username: "John Doe",
    email: "john@example.com",
    password: "password123",
    bio: "Software Engineer with 5 years of experience",
    avatarUrl: "/default-avatar.png"
  },
  {
    id: "2",
    username: "Jane Smith",
    email: "jane@example.com",
    password: "password123",
    bio: "UX Designer passionate about creating beautiful interfaces",
    avatarUrl: "/default-avatar.png"
  }
];

export const AuthProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Check for existing session on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authAPI.login(email, password);
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      toast.success("Login successful!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed");
      throw error;
    }
  };

  const register = async (username: string, email: string, password: string) => {
    try {
      const response = await authAPI.register(username, email, password);
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      toast.success("Registration successful!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Registration failed");
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success("Logged out successfully");
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!user) {
      throw new Error("User not authenticated");
    }

    try {
      // In a real app, you would call the backend API here
      const updatedUser = { ...user, ...data };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      toast.success("Profile updated successfully");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update profile");
      throw error;
    }
  };

  const updatePassword = async (currentPassword: string, newPassword: string) => {
    if (!user) {
      throw new Error("User not authenticated");
    }

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Find user in mock database
    const userIndex = MOCK_USERS.findIndex(u => u.id === user.id);
    if (userIndex === -1) {
      throw new Error("User not found");
    }

    // Check if current password is correct
    if (MOCK_USERS[userIndex].password !== currentPassword) {
      throw new Error("Current password is incorrect");
    }

    // Update password
    MOCK_USERS[userIndex].password = newPassword;

    return Promise.resolve();
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      register, 
      logout, 
      isAuthenticated: !!user,
      updateProfile,
      updatePassword
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
