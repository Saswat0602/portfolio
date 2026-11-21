"use client";

import { useTheme } from "@/hooks/useTheme";
import { Sun, Moon } from "lucide-react";

export interface ThemeToggleProps {
  className?: string;
  compact?: boolean;
  showLabel?: boolean;
}

export function ThemeToggle({
  className = "",
  compact = false,
  showLabel = false,
}: ThemeToggleProps) {
  const { theme, toggleTheme, mounted } = useTheme();

  // Dark is the primary blueprint default before mount to match SSR
  const isDark = mounted ? theme === "dark" : true;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`inline-flex items-center justify-center gap-2 rounded-xl border border-theme-border bg-theme-surface/85 backdrop-blur-md text-theme-secondary hover:text-theme-primary hover:border-theme-accent hover:bg-theme-hover transition-all duration-200 cursor-pointer shadow-xs ${
        compact ? "w-9 h-9 p-0" : "px-3 py-1.5 text-xs font-mono"
      } ${className}`}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "Light" : "Dark"} mode`}
    >
      {isDark ? (
        <Moon
          size={15}
          className="text-sky-400 transition-transform duration-300 hover:-rotate-12 flex-shrink-0"
        />
      ) : (
        <Sun
          size={15}
          className="text-amber-500 transition-transform duration-300 hover:rotate-45 flex-shrink-0"
        />
      )}
      {!compact && showLabel && (
        <span className="capitalize">{isDark ? "Dark" : "Light"}</span>
      )}
      {!compact && !showLabel && (
        <span className="text-[11px] font-mono tracking-wider text-theme-muted uppercase">
          {isDark ? "DARK" : "LIGHT"}
        </span>
      )}
    </button>
  );
}

export default ThemeToggle;
