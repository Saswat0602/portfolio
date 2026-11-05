"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { LoaderProps } from "./types";
import { useAestheticTheme } from "@/hooks/useAestheticTheme";

export function CurtainLoader({
  onComplete,
  name = "Saswat Ranjan",
  durationMs = 2200,
}: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const { aesthetic } = useAestheticTheme();

  // Split name into first and last
  const parts = name.split(" ");
  const firstName = parts[0] || "Saswat";
  const lastName = parts.slice(1).join(" ") || "Ranjan";

  useEffect(() => {
    const startTime = performance.now();

    const interval = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const pct = Math.min(Math.round((elapsed / durationMs) * 100), 100);
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            onComplete();
          }, 950);
        }, 300);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [durationMs, onComplete]);

  return (
    <div
      id="curtain-loader"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden pointer-events-auto select-none"
    >
      {/* Background Curtain 1: Primary Layer */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: isExiting ? "-100%" : 0 }}
        transition={{
          duration: 0.85,
          ease: [0.76, 0, 0.24, 1],
          delay: 0.1,
        }}
        className="absolute inset-0 bg-theme-base z-[1]"
      />

      {/* Background Curtain 2: Secondary Accent Layer */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: isExiting ? "-100%" : 0 }}
        transition={{
          duration: 0.85,
          ease: [0.76, 0, 0.24, 1],
          delay: 0.22,
        }}
        className="absolute inset-0 bg-theme-surface z-[2] opacity-95"
      >
        <div className="absolute inset-0 bg-theme-accent/10 opacity-60" />
      </motion.div>

      {/* Center Content Container */}
      <AnimatePresence>
        {!isExiting && (
          <motion.div
            key="center-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              y: -50,
              opacity: 0,
              transition: { duration: 0.45, ease: "easeInOut" },
            }}
            className="relative z-[10] flex flex-col items-end gap-5 px-6 max-w-4xl"
          >
            {/* Split Names with Masked Slide-Up */}
            <div className="flex items-baseline gap-3 md:gap-6 overflow-hidden">
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: "120%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.1,
                  }}
                  className={`text-5xl sm:text-7xl md:text-9xl tracking-tight text-theme-primary ${
                    aesthetic === "editorial"
                      ? "font-serif italic font-normal"
                      : "font-extrabold uppercase font-sans"
                  }`}
                >
                  {firstName}
                </motion.h1>
              </div>

              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: "120%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.22,
                  }}
                  className={`text-5xl sm:text-7xl md:text-9xl tracking-tight text-theme-accent drop-shadow-md ${
                    aesthetic === "editorial"
                      ? "font-serif font-normal"
                      : "font-extrabold uppercase font-sans"
                  }`}
                >
                  {lastName}
                </motion.h1>
              </div>
            </div>

            {/* Progress Bar & Percentage Counter */}
            <div className="w-full flex flex-col gap-2">
              <div className="w-full h-[3px] bg-theme-border rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-theme-accent rounded-full origin-left"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut" }}
                />
              </div>

              <div className="flex justify-between items-center text-xs font-mono text-theme-muted">
                <span className="tracking-widest uppercase">
                  {aesthetic === "blueprint" ? "SYS // INITIALIZING_TELEMETRY" : "Initializing Architectural Craft"}
                </span>
                <span className="text-theme-accent font-semibold">{progress}%</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
