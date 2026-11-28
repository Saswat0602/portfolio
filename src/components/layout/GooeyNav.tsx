"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useLayoutEffect,
  MouseEvent,
} from "react";
import Link from "next/link";

export interface GooeyTabItem {
  id: string;
  label: string;
  href?: string;
}

export interface GooeyNavProps {
  items?: GooeyTabItem[];
  tabs?: GooeyTabItem[];
  activeId?: string;
  defaultTab?: string;
  onSelect?: (id: string, href?: string, e?: MouseEvent<HTMLElement>) => void;
  onChange?: (id: string) => void;
  className?: string;
}

const DEFAULT_TABS: GooeyTabItem[] = [
  { id: "overview", label: "Overview" },
  { id: "work", label: "Work" },
  { id: "systems", label: "Systems" },
  { id: "ai", label: "AI Lab" },
  { id: "contact", label: "Contact" },
];

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function GooeyNav({
  items,
  tabs,
  activeId: controlledActiveId,
  defaultTab,
  onSelect,
  onChange,
  className = "",
}: GooeyNavProps) {
  const tabList = items || tabs || DEFAULT_TABS;
  const [internalActiveId, setInternalActiveId] = useState<string>(
    controlledActiveId || defaultTab || tabList[0]?.id || ""
  );
  const [hoveredTabId, setHoveredTabId] = useState<string | null>(null);

  const activeTabId = controlledActiveId !== undefined ? controlledActiveId : internalActiveId;
  const displayTabId = hoveredTabId || activeTabId;

  const navWrapRef = useRef<HTMLDivElement>(null);
  const tabBtnRefs = useRef<Record<string, HTMLElement | null>>({});
  const trailTimerRef = useRef<NodeJS.Timeout | null>(null);

  const [pillGeom, setPillGeom] = useState<{ left: number; width: number; ready: boolean }>({
    left: 4,
    width: 72,
    ready: false,
  });
  const [trailGeom, setTrailGeom] = useState<{ left: number; width: number }>({
    left: 4,
    width: 72,
  });

  const measureGooey = useCallback(() => {
    if (!displayTabId) {
      setPillGeom((prev) => (prev.ready ? { ...prev, ready: false } : prev));
      return;
    }

    const btn = tabBtnRefs.current[displayTabId];
    if (!btn || !navWrapRef.current) {
      setPillGeom((prev) => (prev.ready ? { ...prev, ready: false } : prev));
      return;
    }

    const next = { left: btn.offsetLeft, width: btn.offsetWidth, ready: true };
    setPillGeom(next);

    // Delayed trailing orb stretches the liquid neck inside the SVG goo filter
    if (trailTimerRef.current) clearTimeout(trailTimerRef.current);
    trailTimerRef.current = setTimeout(() => {
      setTrailGeom({ left: next.left, width: next.width });
    }, 85);
  }, [displayTabId]);

  useIsomorphicLayoutEffect(() => {
    measureGooey();
  }, [measureGooey]);

  useEffect(() => {
    const handleResize = () => measureGooey();
    window.addEventListener("resize", handleResize);

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && navWrapRef.current) {
      resizeObserver = new ResizeObserver(() => measureGooey());
      resizeObserver.observe(navWrapRef.current);
    }

    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(() => measureGooey());
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeObserver) resizeObserver.disconnect();
      if (trailTimerRef.current) clearTimeout(trailTimerRef.current);
    };
  }, [measureGooey]);

  const handleSelect = (item: GooeyTabItem, e?: MouseEvent<HTMLElement>) => {
    if (controlledActiveId === undefined) {
      setInternalActiveId(item.id);
    }
    onChange?.(item.id);
    onSelect?.(item.id, item.href, e);
  };

  return (
    <>
      {/* Required SVG Gooey Metaball Filter */}
      <svg
        className="absolute w-0 h-0 pointer-events-none opacity-0 -z-50"
        aria-hidden="true"
        style={{ position: "absolute", width: 0, height: 0 }}
      >
        <defs>
          <filter id="liquid-gooey-filter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Liquid-Mercury Gooey Navigation Pill Container */}
      <div
        ref={navWrapRef}
        role="tablist"
        aria-label="Liquid metaball navigation"
        onMouseLeave={() => setHoveredTabId(null)}
        className={`relative inline-flex items-center rounded-full p-1 select-none border border-theme-border bg-theme-surface/85 backdrop-blur-xl shadow-lg transition-colors ${className}`}
        style={{
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.08), 0 14px 34px -12px rgba(0,0,0,0.45)",
        }}
      >
        {/* SVG Gooey Filtered Liquid Backdrop Layer (keeps foreground text sharp) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-full overflow-hidden"
          style={{ filter: "url(#liquid-gooey-filter)" }}
        >
          {/* Primary leading liquid pill */}
          <div
            className="absolute top-1 bottom-1 rounded-full bg-zinc-900 dark:bg-zinc-100 will-change-transform shadow-xs"
            style={{
              left: 0,
              transform: `translate3d(${pillGeom.left}px, 0, 0)`,
              width: `${pillGeom.width}px`,
              opacity: pillGeom.ready ? 1 : 0,
              transition: pillGeom.ready
                ? "transform 460ms cubic-bezier(0.22, 1.18, 0.36, 1), width 380ms cubic-bezier(0.22, 1, 0.36, 1), opacity 200ms ease"
                : "none",
            }}
          />

          {/* Secondary trailing metaball orb that stretches the liquid neck */}
          <div
            className="absolute top-1.5 bottom-1.5 rounded-full bg-zinc-900 dark:bg-zinc-100 will-change-transform"
            style={{
              left: 0,
              transform: `translate3d(${trailGeom.left + trailGeom.width * 0.14}px, 0, 0)`,
              width: `${trailGeom.width * 0.72}px`,
              opacity: pillGeom.ready ? 1 : 0,
              transition: pillGeom.ready
                ? "transform 540ms cubic-bezier(0.22, 1, 0.36, 1), width 460ms cubic-bezier(0.22, 1, 0.36, 1), opacity 200ms ease"
                : "none",
            }}
          />
        </div>

        {/* Foreground Navigation Buttons / Links */}
        {tabList.map((tab) => {
          const isActive = tab.id === displayTabId;
          const isCurrentActive = tab.id === activeTabId;

          const commonClasses = `relative z-10 rounded-full px-3.5 sm:px-4 py-1.5 text-xs sm:text-[13px] font-medium cursor-pointer outline-none whitespace-nowrap transition-colors duration-200 select-none ${
            isActive
              ? "text-zinc-50 dark:text-zinc-950 font-semibold"
              : "text-theme-secondary hover:text-theme-primary"
          }`;

          if (tab.href) {
            return (
              <Link
                key={tab.id}
                ref={(el) => {
                  tabBtnRefs.current[tab.id] = el;
                }}
                href={tab.href}
                role="tab"
                aria-selected={isCurrentActive}
                onMouseEnter={() => setHoveredTabId(tab.id)}
                onClick={(e) => handleSelect(tab, e)}
                className={commonClasses}
              >
                {tab.label}
              </Link>
            );
          }

          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabBtnRefs.current[tab.id] = el;
              }}
              type="button"
              role="tab"
              aria-selected={isCurrentActive}
              onMouseEnter={() => setHoveredTabId(tab.id)}
              onClick={(e) => handleSelect(tab, e)}
              className={commonClasses}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </>
  );
}

export default GooeyNav;
