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
      const saved = sessionStorage.getItem("portfolio_loader_variant") as LoaderVariant;
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
          {selectedVariant === "curtain" && (
            <CurtainLoader
              onComplete={handleComplete}
              name={userData.name}
              title={userData.title}
              skills={userData.about.skills}
            />
          )}

          {selectedVariant === "spotlight" && (
            <SpotlightLoader
              onComplete={handleComplete}
              name={userData.name}
              title={userData.title}
              skills={userData.about.skills}
            />
          )}

          {selectedVariant === "custom3" && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0a] text-white">
              <div className="text-center p-8 border border-white/10 rounded-2xl">
                <p className="text-xl font-bold mb-2">Custom Loader Slot</p>
                <p className="text-sm text-gray-400 mb-4">
                  Reserved for your 3rd upcoming loader animation.
                </p>
                <button
                  onClick={handleComplete}
                  className="px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium"
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

      {/* Floating Development Preloader Switcher & Preview Widget */}
      {isMounted && (
        <div className="fixed bottom-5 right-5 z-40">
          <div className="flex flex-col items-end gap-2">
            {showSwitcher && (
              <div className="bg-[#121212]/95 border border-white/10 backdrop-blur-xl rounded-xl p-3 shadow-2xl flex flex-col gap-2 min-w-[230px] text-xs animate-in fade-in slide-in-from-bottom-2 duration-200">
                <div className="flex items-center justify-between pb-2 border-b border-white/10 font-mono text-[#a3a3a3]">
                  <span>LOADER STYLE</span>
                  <button
                    onClick={replayCurrentLoader}
                    title="Replay Loader"
                    className="flex items-center gap-1 text-[#3b82f6] hover:text-[#60a5fa]"
                  >
                    <RotateCcw size={12} />
                    <span>Replay</span>
                  </button>
                </div>

                <button
                  onClick={() => handleSwitchVariant("curtain")}
                  className={`flex items-center justify-between p-2 rounded-lg transition-colors ${
                    selectedVariant === "curtain"
                      ? "bg-[#3b82f6]/15 text-[#3b82f6] font-semibold border border-[#3b82f6]/30"
                      : "text-[#a3a3a3] hover:bg-white/5"
                  }`}
                >
                  <span>1. Typographic Curtain</span>
                  {selectedVariant === "curtain" && <span className="text-[10px]">ACTIVE</span>}
                </button>

                <button
                  onClick={() => handleSwitchVariant("spotlight")}
                  className={`flex items-center justify-between p-2 rounded-lg transition-colors ${
                    selectedVariant === "spotlight"
                      ? "bg-[#3b82f6]/15 text-[#3b82f6] font-semibold border border-[#3b82f6]/30"
                      : "text-[#a3a3a3] hover:bg-white/5"
                  }`}
                >
                  <span>2. Interactive Spotlight</span>
                  {selectedVariant === "spotlight" && <span className="text-[10px]">ACTIVE</span>}
                </button>

                <button
                  onClick={() => handleSwitchVariant("custom3")}
                  className={`flex items-center justify-between p-2 rounded-lg transition-colors ${
                    selectedVariant === "custom3"
                      ? "bg-[#3b82f6]/15 text-[#3b82f6] font-semibold border border-[#3b82f6]/30"
                      : "text-[#6b6b6b] hover:bg-white/5"
                  }`}
                >
                  <span>3. Custom Slot (Upcoming)</span>
                  {selectedVariant === "custom3" && <span className="text-[10px]">ACTIVE</span>}
                </button>
              </div>
            )}

            <button
              onClick={() => setShowSwitcher(!showSwitcher)}
              className="flex items-center gap-2 px-3 py-2 rounded-full bg-[#1a1a1a]/90 hover:bg-[#262626] border border-white/10 text-xs font-mono text-[#f5f5f5] shadow-lg backdrop-blur-md transition-all hover:scale-105 active:scale-95"
            >
              <Eye size={14} className="text-[#3b82f6]" />
              <span>Loader Preview</span>
              <Sparkles size={12} className="text-[#f59e0b]" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
