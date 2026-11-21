"use client";

import { useTheme, ThemeProvider, type Theme, type ThemeContextValue } from "./ThemeContext";

export type Aesthetic = "blueprint";
export type { Theme, ThemeContextValue };

export interface AestheticThemeContextValue extends ThemeContextValue {
  aesthetic: Aesthetic;
  setAesthetic: (aesthetic?: Aesthetic) => void;
  toggleAesthetic: () => void;
}

export function useAestheticTheme(): AestheticThemeContextValue {
  const themeContext = useTheme();
  return {
    ...themeContext,
    aesthetic: "blueprint",
    setAesthetic: () => {},
    toggleAesthetic: () => {},
  };
}

export { ThemeProvider as AestheticThemeProvider, ThemeProvider, useTheme };
