"use client";

import { createContext, useContext, useState, useEffect } from "react";

type ThemeContextType = {
  theme: string;
  ChangeTheme: (theme: "light" | "dark") => void;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
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
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    const initialClientTheme =
      savedTheme === "light" || savedTheme === "dark"
        ? savedTheme
        : systemPrefersDark
          ? "dark"
          : "light";

    setTheme(initialClientTheme);
    document.documentElement.setAttribute("data-theme", initialClientTheme);
    setIsThemeLoaded(true);
  }, []);

  useEffect(() => {
    if (isThemeLoaded) {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    }
  }, [theme, isThemeLoaded]);

  return (
    <ThemeContext.Provider value={{ theme, ChangeTheme, toggleTheme }}>
      {isThemeLoaded && children}
    </ThemeContext.Provider>
  );

  function ChangeTheme(theme: "light" | "dark") {
    setTheme(theme);
    localStorage.setItem("theme", theme);
  }

  function toggleTheme() {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  }
};
