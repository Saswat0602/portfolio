"use client";

import { useState, useSyncExternalStore } from "react";
import { CurtainLoader } from "./CurtainLoader";
import { SpotlightLoader } from "./SpotlightLoader";
import type { LoaderVariant } from "./types";
import { siteConfig } from "@/config/site";
import { userData } from "@/lib/data";

interface PreloaderProps {
  children: React.ReactNode;
}

const emptySubscribe = () => () => {};

// Global in-memory flag: intro loader must only run ONCE per browser session, NEVER on page transitions
let hasRunLoaderOnce = false;

export function Preloader({ children }: PreloaderProps) {
  // Safe client-side mount detection without cascading renders
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const [selectedVariant] = useState<LoaderVariant>(siteConfig.defaultLoader);

  // Initialize isLoading based on whether the loader has already completed in this session
  const [isLoading, setIsLoading] = useState(() => {
    if (typeof window === "undefined") return true;
    if (hasRunLoaderOnce) return false;
    try {
      if (sessionStorage.getItem("portfolio_intro_seen") === "true") {
        hasRunLoaderOnce = true;
        return false;
      }
    } catch {}
    return true;
  });

  const handleComplete = () => {
    hasRunLoaderOnce = true;
    try {
      sessionStorage.setItem("portfolio_intro_seen", "true");
    } catch {}
    setIsLoading(false);
  };

  return (
    <>
      {isMounted && isLoading && (
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

      {/* Main App Content - immediately visible with zero delay if loader already ran */}
      <div
        className={`transition-opacity duration-500 ${
          isMounted && isLoading ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        {children}
      </div>
    </>
  );
}
