"use client";

import { useState, useSyncExternalStore } from "react";
import { CurtainLoader } from "./CurtainLoader";
import { SpotlightLoader } from "./SpotlightLoader";
import type { LoaderVariant } from "./types";
import { siteConfig } from "@/config/site";
import { userData } from "@/lib/data";
import { Eye, RotateCcw, Sparkles } from "lucide-react";

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

  const [selectedVariant, setSelectedVariant] = useState<LoaderVariant>(() => {
    if (typeof window !== "undefined") {
      const saved = (localStorage.getItem("portfolio_loader_variant") ||
        sessionStorage.getItem("portfolio_loader_variant")) as LoaderVariant;
      if (saved && (saved === "curtain" || saved === "spotlight" || saved === "custom3")) {
        return saved;
      }
    }
    return siteConfig.defaultLoader;
  });

  const [isLoading, setIsLoading] = useState(true);
  const [showSwitcher, setShowSwitcher] = useState(false);

  const handleComplete = () => {
    setIsLoading(false);
  };

  const handleSwitchVariant = (variant: LoaderVariant) => {
    setSelectedVariant(variant);
    if (typeof window !== "undefined") {
      localStorage.setItem("portfolio_loader_variant", variant);
      sessionStorage.setItem("portfolio_loader_variant", variant);
    }
    setIsLoading(true);
  };

  const replayCurrentLoader = () => {
    setIsLoading(true);
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
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#07080a] text-white">
              <div className="text-center p-8 border border-white/10 rounded-2xl bg-[#0d0f14]">
                <p className="text-xl font-bold mb-2">Custom Loader Slot</p>
                <p className="text-sm text-slate-400 mb-4">
                  Reserved for an upcoming custom animation style.
                </p>
                <button
                  onClick={handleComplete}
                  className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-[#07080a] font-semibold rounded-lg text-sm transition-colors"
                >
                  Continue to Site
                </button>
              </div>
            </div>
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

      {/* Floating Preloader Switcher & Preview Widget */}
      {isMounted && siteConfig.enableLoaderPreviewSwitcher && (
        <div className="fixed bottom-3 right-3 sm:bottom-5 sm:right-5 z-40 max-w-[calc(100vw-1.5rem)]">
          <div className="flex flex-col items-end gap-2 max-w-full">
            {showSwitcher && (
              <div className="bg-theme-surface/98 border border-theme-border backdrop-blur-xl rounded-2xl p-3.5 sm:p-4 shadow-2xl flex flex-col gap-2.5 min-w-[240px] max-w-full text-xs animate-in fade-in slide-in-from-bottom-2 duration-200">
                <div className="flex items-center justify-between pb-2 border-b border-theme-border font-mono text-theme-muted">
                  <span className="font-semibold tracking-wider text-[11px]">CHOOSE LOADER</span>
                  <button
                    onClick={replayCurrentLoader}
                    title="Replay Loader"
                    className="flex items-center gap-1 text-theme-accent hover:brightness-125 transition-colors cursor-pointer"
                  >
                    <RotateCcw size={12} />
                    <span>Replay</span>
                  </button>
                </div>

                <button
                  onClick={() => handleSwitchVariant("spotlight")}
                  className={`flex items-center justify-between p-2.5 rounded-xl transition-all cursor-pointer ${
                    selectedVariant === "spotlight"
                      ? "bg-theme-accent-subtle text-theme-accent font-semibold border border-theme-border shadow-xs"
                      : "text-theme-secondary hover:text-theme-primary hover:bg-theme-hover border border-transparent"
                  }`}
                >
                  <span>1. Interactive Spotlight</span>
                  {selectedVariant === "spotlight" && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-theme-accent-subtle text-theme-accent">
                      ACTIVE
                    </span>
                  )}
                </button>

                <button
                  onClick={() => handleSwitchVariant("curtain")}
                  className={`flex items-center justify-between p-2.5 rounded-xl transition-all cursor-pointer ${
                    selectedVariant === "curtain"
                      ? "bg-theme-accent-subtle text-theme-accent font-semibold border border-theme-border shadow-xs"
                      : "text-theme-secondary hover:text-theme-primary hover:bg-theme-hover border border-transparent"
                  }`}
                >
                  <span>2. Typographic Curtain</span>
                  {selectedVariant === "curtain" && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-theme-accent-subtle text-theme-accent">
                      ACTIVE
                    </span>
                  )}
                </button>

                <button
                  onClick={() => handleSwitchVariant("custom3")}
                  className={`flex items-center justify-between p-2.5 rounded-xl transition-all cursor-pointer ${
                    selectedVariant === "custom3"
                      ? "bg-theme-accent-subtle text-theme-accent font-semibold border border-theme-border shadow-xs"
                      : "text-theme-muted hover:text-theme-secondary hover:bg-theme-hover border border-transparent"
                  }`}
                >
                  <span>3. Custom Slot</span>
                  {selectedVariant === "custom3" && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-theme-accent-subtle text-theme-accent">
                      ACTIVE
                    </span>
                  )}
                </button>
              </div>
            )}

            <button
              onClick={() => setShowSwitcher(!showSwitcher)}
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-theme-surface hover:bg-theme-hover border border-theme-border text-xs font-mono text-theme-primary shadow-xl backdrop-blur-md transition-all hover:scale-105 active:scale-95 hover:border-theme-accent cursor-pointer"
              aria-label="Toggle loader switcher"
            >
              <Eye size={14} className="text-theme-accent" />
              <span>Choose Loader</span>
              <Sparkles size={12} className="text-amber-500" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
