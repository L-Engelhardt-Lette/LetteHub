import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Define the shape of the AuthContext
interface AuthContextType {
  user: any;
  token: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

// Create the AuthContext with an initial value of undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// AuthProvider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate();

  // Dynamically check if user is authenticated
  const isAuthenticated = Boolean(token);

  // Base URL for API
  const API_BASE_URL =
    import.meta.env.VITE_API_SERVER_URL || "http://localhost:8080";

  // Login function
  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        username,
        password,
      });

      const { token, user } = response.data;

      // Set user and token in state
      setToken(token);
      setUser(user);

      // Save to localStorage
      localStorage.setItem("authToken", token);
      localStorage.setItem("authUser", JSON.stringify(user));

      toast.success("Login successful!");
      return true;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Login error response:", error.response?.data);
        toast.error(
          error.response?.data.message ||
            "Login failed. Please check your credentials."
        );
      } else {
        console.error("Unexpected error:", error);
        toast.error("An unexpected error occurred.");
      }
      return false;
    }
  };

  // Logout function
  const logout = () => {
    // Clear user and token from state
    setUser(null);
    setToken(null);

    // Remove from localStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");

    toast.info("You have been logged out.");
    navigate("/login");
  };

  // Synchronize auth state with localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("authUser");

    if (storedToken) {
      setToken(storedToken);
    }

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("authUser");
      }
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};
