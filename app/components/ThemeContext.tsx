"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Theme = "main" | "alt";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Always start with "main" on server. Client will sync after mount.
  const [theme, setThemeState] = useState<Theme>("main");

  // After mount, read localStorage and sync state with what the init script already set on <html>
  useEffect(() => {
    const saved = localStorage.getItem("stray-light-theme");
    if (saved === "alt") {
      setThemeState("alt");
    }
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    if (newTheme === "alt") {
      document.documentElement.setAttribute("data-theme", "alt");
      localStorage.setItem("stray-light-theme", "alt");
    } else {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("stray-light-theme", "main");
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}