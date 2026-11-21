"use client";

import { useTheme } from "@/hooks/useTheme";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface ThemeToggleProps {
  className?: string;
  compact?: boolean;
}

export function ThemeToggle({
  className = "",
}: ThemeToggleProps) {
  const { theme, toggleTheme, mounted } = useTheme();

  // Dark is the primary blueprint default before mount to match SSR
  const isDark = mounted ? theme === "dark" : true;

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-theme-border bg-theme-surface/90 backdrop-blur-md flex items-center justify-center cursor-pointer shadow-xs transition-colors duration-200 hover:border-theme-accent hover:bg-theme-hover overflow-hidden group ${className}`}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "Light" : "Dark"} mode`}
    >
      {/* Subtle ambient radial glow */}
      <span
        className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${
          isDark
            ? "bg-radial-[circle_at_center,rgba(56,189,248,0.18)_0%,transparent_70%]"
            : "bg-radial-[circle_at_center,rgba(245,158,11,0.22)_0%,transparent_70%]"
        }`}
      />

      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="moon"
            initial={{ rotate: -90, scale: 0.4, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0.4, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 380,
              damping: 22,
              mass: 0.6,
            }}
            className="flex items-center justify-center text-sky-400 relative z-10"
          >
            <Moon size={16} className="fill-sky-400/20 stroke-[1.9]" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ rotate: 90, scale: 0.4, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -90, scale: 0.4, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 380,
              damping: 22,
              mass: 0.6,
            }}
            className="flex items-center justify-center text-amber-500 relative z-10"
          >
            <Sun size={17} className="fill-amber-500/25 stroke-[1.9]" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

export default ThemeToggle;
