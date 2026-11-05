"use client";

import React, { createContext, useContext, useCallback, useSyncExternalStore } from "react";

export type Aesthetic = "blueprint" | "editorial";
export type Theme = "dark" | "light";

interface AestheticThemeContextValue {
  aesthetic: Aesthetic;
  theme: Theme;
  mounted: boolean;
  setAesthetic: (aesthetic: Aesthetic) => void;
  setTheme: (theme: Theme) => void;
  toggleAesthetic: () => void;
  toggleTheme: () => void;
}

const AestheticThemeContext = createContext<AestheticThemeContextValue | null>(null);

const STORAGE_KEY_AESTHETIC = "portfolio_aesthetic";
const STORAGE_KEY_THEME = "portfolio_theme";

const emptySubscribe = () => () => {};

const listeners = new Set<() => void>();
function emitChange() {
  listeners.forEach((listener) => listener());
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY_AESTHETIC || e.key === STORAGE_KEY_THEME) {
      callback();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", onStorage);
  };
}

function getAestheticSnapshot(): Aesthetic {
  if (typeof window === "undefined") return "blueprint";
  try {
    const dom = document.documentElement.getAttribute("data-aesthetic") as Aesthetic;
    if (dom === "editorial" || dom === "blueprint") return dom;
    const stored = localStorage.getItem(STORAGE_KEY_AESTHETIC) as Aesthetic;
    if (stored === "editorial" || stored === "blueprint") return stored;
  } catch {
    // Fallback
  }
  return "blueprint";
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

const getServerAesthetic = () => "blueprint" as Aesthetic;
const getServerTheme = () => "dark" as Theme;

export function AestheticThemeProvider({ children }: { children: React.ReactNode }) {
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const aesthetic = useSyncExternalStore(subscribe, getAestheticSnapshot, getServerAesthetic);
  const theme = useSyncExternalStore(subscribe, getThemeSnapshot, getServerTheme);

  const setAesthetic = useCallback((newAesthetic: Aesthetic) => {
    try {
      document.documentElement.setAttribute("data-aesthetic", newAesthetic);
      localStorage.setItem(STORAGE_KEY_AESTHETIC, newAesthetic);
      emitChange();
    } catch {
      // Handle private browsing
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

  const toggleAesthetic = useCallback(() => {
    setAesthetic(aesthetic === "blueprint" ? "editorial" : "blueprint");
  }, [aesthetic, setAesthetic]);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  return (
    <AestheticThemeContext.Provider
      value={{
        aesthetic,
        theme,
        mounted,
        setAesthetic,
        setTheme,
        toggleAesthetic,
        toggleTheme,
      }}
    >
      {children}
    </AestheticThemeContext.Provider>
  );
}

export function useAestheticTheme() {
  const context = useContext(AestheticThemeContext);
  if (!context) {
    return {
      aesthetic: "blueprint" as Aesthetic,
      theme: "dark" as Theme,
      mounted: false,
      setAesthetic: () => {},
      setTheme: () => {},
      toggleAesthetic: () => {},
      toggleTheme: () => {},
    };
  }
  return context;
}
