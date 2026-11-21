"use client";

import { useTheme } from "@/hooks/useTheme";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import { useCallback } from "react";

export interface ThemeToggleProps {
  className?: string;
  compact?: boolean;
}

export function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { theme, toggleTheme, mounted } = useTheme();

  // Dark is the primary blueprint default before mount to match SSR
  const isDark = mounted ? theme === "dark" : true;

  const handleToggle = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      // Respect user's motion preferences
      const isReduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Check if browser supports View Transitions API
      if (
        typeof document === "undefined" ||
        !("startViewTransition" in document) ||
        isReduced
      ) {
        // Fallback: smooth CSS color transition
        document.documentElement.classList.add("theme-transitioning");
        toggleTheme();
        setTimeout(() => {
          document.documentElement.classList.remove("theme-transitioning");
        }, 450);
        return;
      }

      // Calculate the circular wave origin from the button center
      const rect = e.currentTarget.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      // Compute radius to cover all 4 screen corners
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      // Execute smooth circular ripple view transition
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const transition = (document as any).startViewTransition(() => {
        toggleTheme();
      });

      transition.ready.then(() => {
        const clipPath = [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ];

        document.documentElement.animate(
          {
            clipPath: clipPath,
          },
          {
            duration: 480,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            pseudoElement: "::view-transition-new(root)",
          }
        );
      });
    },
    [toggleTheme]
  );

  return (
    <motion.button
      type="button"
      onClick={handleToggle}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl border flex items-center justify-center cursor-pointer shadow-xs overflow-hidden transition-colors duration-300 group ${
        isDark
          ? "border-sky-500/20 bg-theme-surface/90 hover:border-sky-400/50 hover:bg-theme-hover"
          : "border-amber-500/30 bg-theme-surface/95 hover:border-amber-400/60 hover:bg-amber-50/40 shadow-sm"
      } ${className}`}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "Light" : "Dark"} mode`}
    >
      {/* Subtle ambient radial glow on hover */}
      <span
        className={`absolute inset-0 rounded-xl transition-opacity duration-300 pointer-events-none opacity-0 group-hover:opacity-100 ${
          isDark
            ? "bg-radial-[circle_at_center,rgba(56,189,248,0.25)_0%,transparent_70%]"
            : "bg-radial-[circle_at_center,rgba(245,158,11,0.28)_0%,transparent_70%]"
        }`}
      />

      {/* Synchronous Celestial Morph: Moon and Sun animate simultaneously without empty delay */}
      <div className="relative w-5 h-5 flex items-center justify-center pointer-events-none">
        {/* Moon Icon (Dark Mode) */}
        <motion.div
          initial={false}
          animate={{
            rotate: isDark ? 0 : 90,
            scale: isDark ? 1 : 0,
            opacity: isDark ? 1 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 320,
            damping: 22,
            mass: 0.6,
          }}
          className="absolute inset-0 flex items-center justify-center text-sky-400"
        >
          <Moon size={17} className="fill-sky-400/20 stroke-[1.9]" />
        </motion.div>

        {/* Sun Icon (Light Mode) */}
        <motion.div
          initial={false}
          animate={{
            rotate: isDark ? -90 : 0,
            scale: isDark ? 0 : 1,
            opacity: isDark ? 0 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 320,
            damping: 22,
            mass: 0.6,
          }}
          className="absolute inset-0 flex items-center justify-center text-amber-500"
        >
          <Sun size={18} className="fill-amber-500/25 stroke-[1.9]" />
        </motion.div>
      </div>
    </motion.button>
  );
}

export default ThemeToggle;
