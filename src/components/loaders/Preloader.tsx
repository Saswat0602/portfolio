"use client";

import { useState, useCallback, useEffect } from "react";
import { CurtainLoader } from "./CurtainLoader";
import { SpotlightLoader } from "./SpotlightLoader";
import type { LoaderVariant } from "./types";
import { siteConfig } from "@/config/site";
import { userData } from "@/lib/data";

interface PreloaderProps {
  children: React.ReactNode;
}

// In-memory flag: only true during client-side SPA navigation within the same session.
// Resets to false on every page refresh / full page load so the intro plays reliably.
let hasRunLoaderOnce = false;

export function Preloader({ children }: PreloaderProps) {
  const [selectedVariant] = useState<LoaderVariant>(siteConfig.defaultLoader);
  const [isLoading, setIsLoading] = useState(!hasRunLoaderOnce);

  // Lock body scroll while loader is active to prevent scrolling hidden content
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  // Clean up any legacy sessionStorage flags from previous sessions
  useEffect(() => {
    try {
      sessionStorage.removeItem("portfolio_intro_seen");
    } catch {}
  }, []);

  const handleComplete = useCallback(() => {
    hasRunLoaderOnce = true;
    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading && (
        <>
          {selectedVariant === "spotlight" && (
            <SpotlightLoader
              onComplete={handleComplete}
              name={userData.name}
              title={userData.title}
              skills={userData.about.skills}
            />
          )}

          {selectedVariant === "curtain" && (
            <CurtainLoader
              onComplete={handleComplete}
              name={userData.name}
              title={userData.title}
              skills={userData.about.skills}
            />
          )}

          {selectedVariant === "custom3" && (
            <SpotlightLoader
              onComplete={handleComplete}
              name={userData.name}
              title={userData.title}
              skills={userData.about.skills}
            />
          )}
        </>
      )}

      {/* Main App Content - immediately visible if loader already ran, hidden during loading with zero FOUC */}
      <div
        className={`transition-opacity duration-700 ease-out ${
          isLoading ? "opacity-0 pointer-events-none select-none" : "opacity-100"
        }`}
      >
        {children}
      </div>
    </>
  );
}
