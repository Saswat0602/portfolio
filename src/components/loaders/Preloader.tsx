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

export function Preloader({ children }: PreloaderProps) {
  // Safe client-side mount detection without cascading renders
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const [selectedVariant] = useState<LoaderVariant>(siteConfig.defaultLoader);
  const [isLoading, setIsLoading] = useState(true);

  const handleComplete = () => {
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

      {/* Main App Content */}
      <div
        className={`transition-opacity duration-700 ${
          isMounted && isLoading ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        {children}
      </div>
    </>
  );
}
