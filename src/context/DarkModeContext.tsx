// DarkModeContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";

// Define the context type
interface DarkModeContextType {
  mode: "light" | "dark";
  toggleMode: () => void;
}

// Create the context
const DarkModeContext = createContext<DarkModeContextType | undefined>(
  undefined
);

// Provider component
export const DarkModeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<"light" | "dark">("light");

  // Toggle dark mode
  const toggleMode = () => {
    const newMode = mode === "dark" ? "light" : "dark";
    setMode(newMode);
    if (newMode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <DarkModeContext.Provider value={{ mode, toggleMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

// Hook to use the dark mode context
export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error("useDarkMode must be used within a DarkModeProvider");
  }
  return context;
};
