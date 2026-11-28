"use client";

import type { Dispatch, SetStateAction } from "react";
import { Maximize2, Minimize2 } from "lucide-react";
import { CHARACTER_STYLES, type CharacterStyleId, type CharacterStyleMeta } from "@/lib/data";
import type { CompanionThemeTokens, ViewMode } from "../types";
import { playComedySound } from "../utils/audio";
import { IconMoon, IconSound, IconSun } from "./CompanionIcons";

export interface CompanionStageHeaderProps {
  ui: CompanionThemeTokens;
  isDark: boolean;
  onToggleTheme: () => void;
  charStyle: CharacterStyleId;
  styleMeta: CharacterStyleMeta;
  onSelectStyle: (id: CharacterStyleId) => void;
  viewMode: ViewMode;
  setViewMode: Dispatch<SetStateAction<ViewMode>>;
  setPortalTool: Dispatch<SetStateAction<boolean>>;
  setFeatherTool: Dispatch<SetStateAction<boolean>>;
  setWidgetOpen: Dispatch<SetStateAction<boolean>>;
  soundOn: boolean;
  setSoundOn: Dispatch<SetStateAction<boolean>>;
  onResetStage: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

export function CompanionStageHeader({
  ui,
  isDark,
  onToggleTheme,
  charStyle,
  styleMeta,
  onSelectStyle,
  viewMode,
  setViewMode,
  setPortalTool,
  setFeatherTool,
  setWidgetOpen,
  soundOn,
  setSoundOn,
  onResetStage,
  isFullscreen,
  onToggleFullscreen,
}: CompanionStageHeaderProps) {
  const switchView = (next: ViewMode) => {
    setViewMode(next);
    setPortalTool(false);
    setFeatherTool(false);
    setWidgetOpen(false);
  };

  return (
    <header
      className="w-full h-[54px] shrink-0 z-40 px-3 sm:px-5 flex items-center justify-between gap-2 relative"
      style={{
        backgroundColor: ui.glass,
        borderBottom: `1px solid ${ui.border}`,
        backdropFilter: "blur(14px)",
      }}
    >
      <div className="flex items-center gap-2 min-w-0">
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[11px] font-semibold tracking-[0.06em] shrink-0"
          style={{ backgroundColor: ui.ink, color: ui.bg }}
        >
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: styleMeta.accent }} />
          <span>MOCHI-04</span>
        </span>

        <nav aria-label="Character styles" className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          {CHARACTER_STYLES.map((st) => {
            const active = charStyle === st.id;
            return (
              <button
                key={st.id}
                type="button"
                onClick={() => onSelectStyle(st.id)}
                className="m4-focus whitespace-nowrap rounded-full px-2.5 py-1 font-mono text-[10.5px] cursor-pointer transition-colors"
                style={{
                  backgroundColor: active ? `${st.accent}1E` : "transparent",
                  color: active ? st.accent : ui.muted,
                  border: active ? `1px solid ${st.accent}66` : `1px solid ${ui.border}`,
                  fontWeight: active ? 600 : 400,
                }}
              >
                {st.label}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        <div
          role="tablist"
          aria-label="View mode"
          className="hidden md:inline-flex rounded-full p-0.5 gap-0.5"
          style={{ backgroundColor: ui.recessed, border: `1px solid ${ui.border}` }}
        >
          {(
            [
              { id: "stage", label: "Studio Stage" },
              { id: "portfolio", label: "Portfolio Widget" },
            ] as const
          ).map((v) => {
            const active = viewMode === v.id;
            return (
              <button
                key={v.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => switchView(v.id)}
                className="m4-focus rounded-full px-2.5 py-1 font-mono text-[10px] cursor-pointer whitespace-nowrap"
                style={{
                  backgroundColor: active ? ui.surface : "transparent",
                  color: active ? ui.ink : ui.muted,
                  border: active ? `1px solid ${ui.borderStrong}` : "1px solid transparent",
                  fontWeight: active ? 600 : 400,
                }}
              >
                {v.label}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => switchView(viewMode === "stage" ? "portfolio" : "stage")}
          className="md:hidden m4-focus rounded-full px-2.5 py-1 font-mono text-[10px] cursor-pointer"
          style={{ backgroundColor: ui.surface, border: `1px solid ${ui.borderStrong}`, color: ui.ink }}
        >
          {viewMode === "stage" ? "Widget" : "Stage"}
        </button>

        <button
          type="button"
          role="switch"
          aria-checked={soundOn}
          title={soundOn ? "Mute comedy sound engine" : "Enable comedy sound effects"}
          onClick={() => {
            const next = !soundOn;
            setSoundOn(next);
            if (next) playComedySound("chime", true, 1.1);
          }}
          className="m4-focus inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-mono text-[10.5px] cursor-pointer"
          style={{
            backgroundColor: ui.surface,
            color: soundOn ? styleMeta.accent : ui.muted,
            border: `1px solid ${soundOn ? styleMeta.accent : ui.borderStrong}`,
          }}
        >
          <IconSound on={soundOn} />
          <span className="hidden lg:inline">{soundOn ? "SFX On" : "SFX"}</span>
        </button>

        <button
          type="button"
          aria-label={`Switch to ${isDark ? "Light" : "Dark"} theme`}
          onClick={onToggleTheme}
          className="m4-focus inline-flex items-center justify-center rounded-full w-7 h-7 cursor-pointer"
          style={{ backgroundColor: ui.surface, color: ui.ink, border: `1px solid ${ui.borderStrong}` }}
        >
          {isDark ? <IconSun /> : <IconMoon />}
        </button>

        <button
          type="button"
          aria-label={isFullscreen ? "Exit fullscreen studio" : "Expand studio fullscreen"}
          title={isFullscreen ? "Exit fullscreen" : "Expand fullscreen"}
          onClick={onToggleFullscreen}
          className="m4-focus inline-flex items-center justify-center rounded-full w-7 h-7 cursor-pointer"
          style={{ backgroundColor: ui.surface, color: ui.ink, border: `1px solid ${ui.borderStrong}` }}
        >
          {isFullscreen ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
        </button>

        <button
          type="button"
          onClick={onResetStage}
          className="m4-focus rounded-full px-2.5 py-1 font-mono text-[10px] cursor-pointer whitespace-nowrap"
          style={{ backgroundColor: ui.surface, color: ui.muted, border: `1px solid ${ui.borderStrong}` }}
        >
          Reset
        </button>
      </div>
    </header>
  );
}
