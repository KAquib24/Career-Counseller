import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { clearUserStorage, getUserStorageKey } from "@/utils/storage";

interface User {
  id: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  googleSignIn: () => Promise<void>;
  githubSignIn: () => Promise<void>;
  getUserStorageKey: (userId: string) => string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_USERS = [
  {
    id: "user1",
    email: "demo@example.com",
    password: "password123",
    displayName: "Demo User",
    photoURL: null,
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const storedUser = localStorage.getItem("careermagic_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("careermagic_user");
      }
    }
    setIsLoading(false);
  }, []);

  const getUserStorageKey = (userId: string) => `careermagic_data_${userId}`;

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const matchedUser = MOCK_USERS.find(
        u => u.email === email && u.password === password
      );
      
      if (!matchedUser) {
        throw new Error("Invalid credentials");
      }
      
      const { password: _, ...userWithoutPassword } = matchedUser;
      setUser(userWithoutPassword);
      
      localStorage.setItem("careermagic_user", JSON.stringify(userWithoutPassword));
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${userWithoutPassword.displayName || "user"}!`,
      });
      
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    if (user) {
      clearUserStorage(user.id);
    }
    
    setUser(null);
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    
    navigate("/");
  };

  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (MOCK_USERS.some(u => u.email === email)) {
        throw new Error("Email already in use");
      }
      
      const newUser = {
        id: `user${MOCK_USERS.length + 1}`,
        email,
        password,
        displayName: name,
        photoURL: null,
      };
      
      MOCK_USERS.push(newUser);
      
      const { password: _, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      localStorage.setItem("careermagic_user", JSON.stringify(userWithoutPassword));
      
      toast({
        title: "Registration successful",
        description: `Welcome, ${name}!`,
      });
      
      navigate("/dashboard");
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const googleSignIn = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const googleUser = {
        id: "google_user1",
        email: "google_user@example.com",
        displayName: "Google User",
        photoURL: "https://lh3.googleusercontent.com/a/default-user",
      };
      
      setUser(googleUser);
      localStorage.setItem("careermagic_user", JSON.stringify(googleUser));
      
      toast({
        title: "Google sign-in successful",
        description: `Welcome, ${googleUser.displayName}!`,
      });
      
      navigate("/dashboard");
    } catch (error) {
      console.error("Google sign-in error:", error);
      toast({
        title: "Google sign-in failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const githubSignIn = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const githubUser = {
        id: "github_user1",
        email: "github_user@example.com",
        displayName: "GitHub User",
        photoURL: "https://avatars.githubusercontent.com/u/default",
      };
      
      setUser(githubUser);
      localStorage.setItem("careermagic_user", JSON.stringify(githubUser));
      
      toast({
        title: "GitHub sign-in successful",
        description: `Welcome, ${githubUser.displayName}!`,
      });
      
      navigate("/dashboard");
    } catch (error) {
      console.error("GitHub sign-in error:", error);
      toast({
        title: "GitHub sign-in failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    googleSignIn,
    githubSignIn,
    getUserStorageKey,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
