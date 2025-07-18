"use client";

import { createContext, useContext, useState, useEffect } from "react";

interface ThemeContextType {
  theme: string;
  ChangeTheme: (theme: string) => void;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: "theme",
  ChangeTheme: () => {},
  toggleTheme: () => {},
});

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialClientTheme =
      savedTheme || (systemPrefersDark ? "dark" : "light");
    setTheme(initialClientTheme);

    document.documentElement.setAttribute("data-theme", initialClientTheme);
  }, []);

  useEffect(() => {
    if (theme) {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  const ChangeTheme = (theme: string) => {
    setTheme(theme);
    localStorage.setItem("theme", theme);
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, ChangeTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
