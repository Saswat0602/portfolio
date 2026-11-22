"use client";

import { useState, useRef } from "react";
import {
  Terminal,
  Cpu,
  Layers,
  Radio,
  Waves,
  Zap,
  Globe,
} from "lucide-react";

interface DockItem {
  id: string;
  label: string;
  icon: React.ElementType;
  description: string;
  tag: string;
  color: string;
}

const DOCK_ITEMS: DockItem[] = [
  {
    id: "terminal",
    label: "CLI Runner",
    icon: Terminal,
    description: "Launch sandboxed developer terminal session",
    tag: "zsh 5.9",
    color: "#38bdf8",
  },
  {
    id: "webrtc",
    label: "Web Audio",
    icon: Radio,
    description: "Initialize real-time WebRTC audio frequency mesh",
    tag: "Sub-100ms",
    color: "#818cf8",
  },
  {
    id: "flow",
    label: "Flowfield",
    icon: Waves,
    description: "Render mathematical vector fluid streams",
    tag: "Perlin Vector",
    color: "#2dd4bf",
  },
  {
    id: "ai",
    label: "Claude Code",
    icon: Cpu,
    description: "Trigger autonomous agentic copilot loop",
    tag: "AWS Bedrock",
    color: "#a78bfa",
  },
  {
    id: "radar",
    label: "Sonar Edge",
    icon: Globe,
    description: "Broadcast synchronous 360° telemetry sweep",
    tag: "5 PoPs",
    color: "#34d399",
  },
  {
    id: "physics",
    label: "3D Physics",
    icon: Layers,
    description: "Engage gyroscopic spring perspective matrix",
    tag: "60 FPS",
    color: "#fb923c",
  },
];

export function MagneticSpringDock() {
  const [mouseX, setMouseX] = useState<number | null>(null);
  const [activeItem, setActiveItem] = useState<DockItem>(DOCK_ITEMS[0]);
  const [lastAction, setLastAction] = useState<string>("Hover across the dock to feel spring magnification.");

  const dockRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!dockRef.current) return;
    const rect = dockRef.current.getBoundingClientRect();
    setMouseX(e.clientX - rect.left);
  };

  const handleMouseLeave = () => {
    setMouseX(null);
  };

  const handleItemClick = (item: DockItem) => {
    setActiveItem(item);
    setLastAction(`Activated [${item.label}] • Triggered ${item.description}`);
  };

  return (
    <div className="w-full flex flex-col items-center gap-6">
      {/* Live Status Toast Banner */}
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-theme-border bg-theme-surface-elevated/70 backdrop-blur-md text-xs font-mono text-theme-secondary shadow-xs">
        <Zap size={13} className="text-theme-accent animate-pulse" />
        <span>{lastAction}</span>
      </div>

      {/* Floating Apple-Grade Magnetic Spring Dock */}
      <div
        ref={dockRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="flex items-end gap-2.5 sm:gap-3 p-3 sm:p-3.5 rounded-2xl border border-theme-border/80 bg-theme-surface/85 backdrop-blur-2xl shadow-2xl relative select-none"
      >
        {DOCK_ITEMS.map((item, idx) => {
          const Icon = item.icon;
          const isSelected = activeItem.id === item.id;

          // Gaussian distance magnification formula
          let scale = 1;
          if (mouseX !== null) {
            const itemWidth = 56;
            const itemCenterX = idx * (itemWidth + 12) + itemWidth / 2 + 14;
            const distance = Math.abs(mouseX - itemCenterX);
            const sigma = 68; // Spread width of the magnification wave
            scale = 1 + 0.42 * Math.exp(-(distance * distance) / (2 * sigma * sigma));
          }

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleItemClick(item)}
              style={{
                transform: `scale(${scale})`,
                transition: mouseX === null ? "transform 0.28s cubic-bezier(0.2, 0, 0, 1)" : "none",
              }}
              className={`group relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex flex-col items-center justify-center transition-colors cursor-pointer ${
                isSelected
                  ? "bg-theme-accent text-white dark:text-zinc-950 shadow-lg"
                  : "bg-theme-surface-elevated border border-theme-border hover:border-theme-accent text-theme-primary hover:bg-theme-hover"
              }`}
            >
              <Icon size={20} className="transition-transform group-hover:scale-110" />

              {/* Tooltip on Hover */}
              <div className="absolute -top-10 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 transform translate-y-1 group-hover:translate-y-0 px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-100 whitespace-nowrap shadow-xl z-20">
                {item.label}
              </div>

              {/* Active Bottom Dot */}
              {isSelected && (
                <span className="absolute -bottom-1.5 w-1.5 h-1.5 rounded-full bg-theme-accent" />
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Capability Inspector */}
      <div className="max-w-md w-full p-4 rounded-xl border border-theme-border bg-theme-surface/70 backdrop-blur-md flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{
              backgroundColor: `${activeItem.color}20`,
              color: activeItem.color,
            }}
          >
            <activeItem.icon size={16} />
          </div>
          <div>
            <span className="text-theme-primary font-bold">{activeItem.label}</span>
            <span className="text-theme-muted text-[11px] block">{activeItem.description}</span>
          </div>
        </div>

        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-theme-surface-elevated border border-theme-border text-theme-accent font-semibold flex-shrink-0">
          {activeItem.tag}
        </span>
      </div>
    </div>
  );
}
