"use client";

import React, { createContext, useContext, useCallback, useSyncExternalStore } from "react";

export type Theme = "dark" | "light";

export interface ThemeContextValue {
  theme: Theme;
  mounted: boolean;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY_THEME = "portfolio_theme";
const LEGACY_STORAGE_KEY_AESTHETIC = "portfolio_aesthetic";

const emptySubscribe = () => () => {};

const listeners = new Set<() => void>();
function emitChange() {
  listeners.forEach((listener) => listener());
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY_THEME) {
      callback();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", onStorage);
  };
}

function getThemeSnapshot(): Theme {
  if (typeof window === "undefined") return "dark";
  try {
    const dom = document.documentElement.getAttribute("data-theme") as Theme;
    if (dom === "light" || dom === "dark") return dom;
    const stored = localStorage.getItem(STORAGE_KEY_THEME) as Theme;
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    // Fallback
  }
  return "dark";
}

const getServerTheme = () => "dark" as Theme;

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const theme = useSyncExternalStore(subscribe, getThemeSnapshot, getServerTheme);

  // Clean up any legacy editorial / aesthetic tokens on mount
  React.useEffect(() => {
    try {
      localStorage.removeItem(LEGACY_STORAGE_KEY_AESTHETIC);
      document.documentElement.removeAttribute("data-aesthetic");
    } catch {
      // Safe fallback
    }
  }, []);

  const setTheme = useCallback((newTheme: Theme) => {
    try {
      document.documentElement.setAttribute("data-theme", newTheme);
      if (newTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      localStorage.setItem(STORAGE_KEY_THEME, newTheme);
      emitChange();
    } catch {
      // Handle private browsing
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        mounted,
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    return {
      theme: "dark",
      mounted: false,
      setTheme: () => {},
      toggleTheme: () => {},
    };
  }
  return context;
}
