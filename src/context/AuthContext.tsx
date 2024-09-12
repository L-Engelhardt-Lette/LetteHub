import { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "react-toastify";

// Define the shape of the AuthContext
interface AuthContextProps {
  isAuthenticated: boolean;
  login: (identifier: string, password: string) => Promise<void>;
  logout: () => void;
}

// Create the AuthContext with default undefined value
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Custom hook to access AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// AuthProvider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (identifier: string, password: string) => {
    const response = await fetch("http://localhost:3001/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ identifier, password }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "Login failed");
    }

    const data = await response.json();
    setIsAuthenticated(true);
    localStorage.setItem("token", data.token);
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    toast.info("Logged out!");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
