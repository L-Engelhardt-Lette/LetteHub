import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios"; // Import AxiosError
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface AuthContextType {
  user: any;
  token: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate();

  const isAuthenticated = !!token;

  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    try {
      const response = await axios.post(`http://localhost:8899/login`, {
        username,
        password,
      });

      const { token, user } = response.data;

      setToken(token);
      setUser(user);

      localStorage.setItem("authToken", token);
      localStorage.setItem("authUser", JSON.stringify(user));

      toast.success("Login successful! 🎉");

      return true;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Login error response:", error.response);
        toast.error("Login failed. Please check your credentials. 😞");
      } else {
        console.error("Unexpected error:", error);
        toast.error("An unexpected error occurred. 😞");
      }
      throw new Error("Login failed");
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");

    toast.info("You have been logged out.");
    navigate("/login");
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("authUser");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
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
