"use client";

import { useAestheticTheme } from "@/hooks/useAestheticTheme";
import { LayoutGrid, PenTool, Sun, Moon } from "lucide-react";

interface AestheticThemeSwitcherProps {
  className?: string;
  compact?: boolean;
}

export function AestheticThemeSwitcher({
  className = "",
  compact = false,
}: AestheticThemeSwitcherProps) {
  const { aesthetic, theme, setAesthetic, toggleTheme } = useAestheticTheme();

  return (
    <div
      className={`inline-flex items-center gap-1.5 p-1 rounded-xl border border-theme-border bg-theme-surface/85 backdrop-blur-md shadow-sm transition-all duration-300 ${className}`}
    >
      {/* Aesthetic Segmented Control */}
      <div
        role="radiogroup"
        aria-label="Design Aesthetic Direction"
        className="flex items-center gap-1 p-0.5 rounded-lg bg-theme-base/60"
      >
        <button
          type="button"
          role="radio"
          aria-checked={aesthetic === "blueprint"}
          onClick={() => setAesthetic("blueprint")}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-mono transition-all duration-200 cursor-pointer ${
            aesthetic === "blueprint"
              ? "bg-sky-500/15 text-sky-700 dark:text-sky-300 font-semibold shadow-xs border border-sky-600/30 dark:border-sky-400/30"
              : "text-theme-muted hover:text-theme-primary hover:bg-theme-hover"
          }`}
          title="Systematic Blueprint Grid (IBM Plex Sans, 24px hairline grid, cyan telemetry)"
        >
          <LayoutGrid size={13} className="flex-shrink-0" />
          {!compact && <span>Blueprint</span>}
        </button>

        <button
          type="button"
          role="radio"
          aria-checked={aesthetic === "editorial"}
          onClick={() => setAesthetic("editorial")}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs transition-all duration-200 cursor-pointer ${
            aesthetic === "editorial"
              ? "bg-[#D95D39]/15 text-[#C85A32] dark:text-[#E06D48] font-serif italic font-medium shadow-xs border border-[#D95D39]/35"
              : "text-theme-muted hover:text-theme-primary hover:bg-theme-hover font-sans"
          }`}
          title="Editorial Engineering Craft (Instrument Serif headlines, warm paper surface, terracotta accents)"
        >
          <PenTool size={13} className="flex-shrink-0" />
          {!compact && <span className="font-serif">Editorial</span>}
        </button>
      </div>

      {/* Theme Toggle (Dark / Light) */}
      <div className="h-4 w-px bg-theme-border/60 mx-0.5" />

      <button
        type="button"
        onClick={toggleTheme}
        className="p-1.5 rounded-md text-theme-muted hover:text-theme-primary hover:bg-theme-hover transition-all duration-200 cursor-pointer flex items-center justify-center"
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        title={`Switch to ${theme === "dark" ? "Light" : "Dark"} mode`}
      >
        {theme === "dark" ? (
          <Sun size={14} className="text-amber-400 hover:rotate-45 transition-transform" />
        ) : (
          <Moon size={14} className="text-sky-700 dark:text-sky-400 hover:-rotate-12 transition-transform" />
        )}
      </button>
    </div>
  );
}
