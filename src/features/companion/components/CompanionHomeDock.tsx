"use client";

import { useState, type Dispatch, type SetStateAction } from "react";
import Link from "next/link";
import { Sparkles, X } from "lucide-react";
import {
  ACCESSORIES,
  CHARACTER_STYLES,
  MOODS,
  PLAY_MODES,
  SNACKS,
  type AccessoryId,
  type ArtRatingMeta,
  type CharacterStyleId,
  type CharacterStyleMeta,
  type MoodId,
  type PlayModeId,
  type SnackId,
  type SynthPadMeta,
} from "@/lib/data";
import type { CompanionThemeTokens } from "../types";
import { playComedySound } from "../utils/audio";
import { IconSound } from "./CompanionIcons";
import { CompanionModeSubbar } from "./CompanionModeSubbar";

type HomeDrawerTab = "styles" | "modes" | "moods" | "toys" | "pranks" | null;

export interface CompanionHomeDockProps {
  ui: CompanionThemeTokens;
  charStyle: CharacterStyleId;
  styleMeta: CharacterStyleMeta;
  onSelectStyle: (id: CharacterStyleId) => void;
  accessory: AccessoryId;
  onSelectAccessory: (id: AccessoryId) => void;
  playMode: PlayModeId;
  onSelectPlayMode: (mode: PlayModeId) => void;
  rallyCount: number;
  bugsLeft: number;
  artVerdict: ArtRatingMeta | null;
  autoJam: boolean;
  onToggleAutoJam: () => void;
  activePad: string | null;
  onCritiqueArt: () => void;
  onClearPaint: () => void;
  onReleaseBugs: () => void;
  onHitPad: (pad: SynthPadMeta) => void;
  onMiniClones: () => void;
  onSneeze: () => void;
  mood: MoodId;
  onSelectMood: (id: MoodId) => void;
  onThrowSnack: (kind: SnackId) => void;
  portalTool: boolean;
  setPortalTool: Dispatch<SetStateAction<boolean>>;
  trampolineOn: boolean;
  setTrampolineOn: Dispatch<SetStateAction<boolean>>;
  featherTool: boolean;
  setFeatherTool: Dispatch<SetStateAction<boolean>>;
  gravityFlipped: boolean;
  cloneDuelActive: boolean;
  onShakeStage: () => void;
  onPhotoBooth: () => void;
  onChaosPrank: () => void;
  onFridayDeploy: () => void;
  onFakeCrash: () => void;
  onDiscoRave: () => void;
  onDevJoke: () => void;
  onStickyPrank: () => void;
  onGravityFlip: () => void;
  onCloneDuel: () => void;
  onBackflip: () => void;
  soundOn: boolean;
  setSoundOn: Dispatch<SetStateAction<boolean>>;
  onResetStage: () => void;
  say: (text: string, holdMs?: number, silent?: boolean) => void;
}

export function CompanionHomeDock({
  ui,
  charStyle,
  styleMeta,
  onSelectStyle,
  accessory,
  onSelectAccessory,
  playMode,
  onSelectPlayMode,
  rallyCount,
  bugsLeft,
  artVerdict,
  autoJam,
  onToggleAutoJam,
  activePad,
  onCritiqueArt,
  onClearPaint,
  onReleaseBugs,
  onHitPad,
  onMiniClones,
  onSneeze,
  mood,
  onSelectMood,
  onThrowSnack,
  portalTool,
  setPortalTool,
  trampolineOn,
  setTrampolineOn,
  featherTool,
  setFeatherTool,
  gravityFlipped,
  cloneDuelActive,
  onShakeStage,
  onPhotoBooth,
  onChaosPrank,
  onFridayDeploy,
  onFakeCrash,
  onDiscoRave,
  onDevJoke,
  onStickyPrank,
  onGravityFlip,
  onCloneDuel,
  onBackflip,
  soundOn,
  setSoundOn,
  onResetStage,
  say,
}: CompanionHomeDockProps) {
  const [openDrawer, setOpenDrawer] = useState<HomeDrawerTab>(null);
  const [dockCollapsed, setDockCollapsed] = useState(false);

  const toggleDrawer = (tab: Exclude<HomeDrawerTab, null>) => {
    setDockCollapsed(false);
    setOpenDrawer((prev) => (prev === tab ? null : tab));
  };

  if (dockCollapsed) {
    return (
      <div data-dock className="pointer-events-auto fixed bottom-3.5 right-4 z-40">
        <button
          type="button"
          onClick={() => setDockCollapsed(false)}
          className="mochi-pop inline-flex items-center gap-2 rounded-full px-3.5 py-2 font-mono text-[11px] font-medium shadow-lg cursor-pointer transition-transform hover:scale-105"
          style={{
            backgroundColor: ui.glass,
            color: ui.ink,
            border: `1px solid ${ui.borderStrong}`,
            boxShadow: ui.shadow,
            backdropFilter: "blur(16px)",
          }}
        >
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: styleMeta.accent }} />
          <span>Play with MOCHI</span>
          <Sparkles size={13} style={{ color: styleMeta.accent }} />
        </button>
      </div>
    );
  }

  return (
    <div
      data-dock
      className="pointer-events-auto fixed bottom-3 left-1/2 -translate-x-1/2 z-40 w-fit max-w-[96vw] flex flex-col items-center gap-1.5"
    >
      <CompanionModeSubbar
        playMode={playMode}
        rallyCount={rallyCount}
        bugsLeft={bugsLeft}
        artVerdict={artVerdict}
        autoJam={autoJam}
        activePad={activePad}
        onCritiqueArt={onCritiqueArt}
        onClearPaint={onClearPaint}
        onReleaseBugs={onReleaseBugs}
        onHitPad={onHitPad}
        onToggleAutoJam={onToggleAutoJam}
      />

      {openDrawer && (
        <div
          className="mochi-pop w-fit max-w-[94vw] rounded-2xl px-3.5 py-2.5"
          style={{
            backgroundColor: ui.glass,
            border: `1px solid ${ui.borderStrong}`,
            boxShadow: ui.shadow,
            backdropFilter: "blur(16px)",
          }}
        >
          {openDrawer === "styles" && (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar sm:flex-wrap sm:justify-center">
                {CHARACTER_STYLES.map((st) => {
                  const active = charStyle === st.id;
                  return (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => onSelectStyle(st.id)}
                      className="m4-focus whitespace-nowrap rounded-full px-3 py-1 font-mono text-[10.5px] cursor-pointer transition-transform active:scale-95"
                      style={{
                        backgroundColor: active ? `${st.accent}26` : ui.recessed,
                        color: active ? st.accent : ui.ink,
                        border: active ? `1px solid ${st.accent}` : `1px solid ${ui.border}`,
                        fontWeight: active ? 600 : 400,
                      }}
                    >
                      {st.label}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar sm:flex-wrap sm:justify-center">
                {ACCESSORIES.map((acc) => {
                  const active = accessory === acc.id;
                  return (
                    <button
                      key={acc.id}
                      type="button"
                      onClick={() => onSelectAccessory(acc.id)}
                      className="m4-focus whitespace-nowrap rounded-full px-2.5 py-0.5 font-mono text-[10px] cursor-pointer transition-transform active:scale-95"
                      style={{
                        backgroundColor: active ? styleMeta.accent : ui.recessed,
                        color: active ? "#FFFFFF" : ui.ink,
                        border: active ? `1px solid ${styleMeta.accent}` : `1px solid ${ui.border}`,
                      }}
                    >
                      {acc.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {openDrawer === "modes" && (
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar sm:flex-wrap sm:justify-center">
              {PLAY_MODES.map((pm) => {
                const active = playMode === pm.id;
                return (
                  <button
                    key={pm.id}
                    type="button"
                    title={pm.hint}
                    onClick={() => onSelectPlayMode(pm.id)}
                    className="m4-focus whitespace-nowrap rounded-full px-3 py-1 font-mono text-[10.5px] cursor-pointer transition-transform active:scale-95"
                    style={{
                      backgroundColor: active ? styleMeta.accent : ui.recessed,
                      color: active ? "#FFFFFF" : ui.ink,
                      border: active ? `1px solid ${styleMeta.accent}` : `1px solid ${ui.border}`,
                      fontWeight: active ? 600 : 400,
                    }}
                  >
                    {pm.label}
                  </button>
                );
              })}
            </div>
          )}

          {openDrawer === "moods" && (
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar sm:flex-wrap sm:justify-center">
              {MOODS.map((m) => {
                const active = mood === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => onSelectMood(m.id)}
                    className="m4-focus whitespace-nowrap rounded-full px-2.5 py-1 font-mono text-[10px] cursor-pointer transition-transform active:scale-95"
                    style={{
                      backgroundColor: active ? styleMeta.accent : ui.recessed,
                      color: active ? "#FFFFFF" : ui.ink,
                      border: active ? `1px solid ${styleMeta.accent}` : `1px solid ${ui.border}`,
                      fontWeight: active ? 600 : 400,
                    }}
                  >
                    {m.label}
                  </button>
                );
              })}
              <button
                type="button"
                onClick={() => {
                  const others = MOODS.filter((m) => m.id !== mood);
                  const rnd = others[Math.floor(Math.random() * others.length)];
                  onSelectMood(rnd.id);
                }}
                className="m4-focus whitespace-nowrap rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold cursor-pointer"
                style={{ backgroundColor: ui.ink, color: ui.bg }}
              >
                Random 🎲
              </button>
            </div>
          )}

          {openDrawer === "toys" && (
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar sm:flex-wrap sm:justify-center">
              {SNACKS.map((sn) => (
                <button
                  key={sn.id}
                  type="button"
                  onClick={() => onThrowSnack(sn.id)}
                  className="m4-focus whitespace-nowrap rounded-full px-2.5 py-1 font-mono text-[10px] cursor-pointer transition-transform active:scale-95"
                  style={{
                    backgroundColor: ui.recessed,
                    color: ui.ink,
                    border: `1px solid ${ui.border}`,
                  }}
                >
                  {sn.emoji} {sn.label}
                </button>
              ))}

              <span className="h-4 w-px shrink-0" style={{ backgroundColor: ui.borderStrong }} />

              <button
                type="button"
                onClick={() => {
                  setPortalTool((v) => {
                    const next = !v;
                    if (next) {
                      setFeatherTool(false);
                      say("Portal Gun armed! Click two spots on screen!", 2400);
                    }
                    return next;
                  });
                }}
                className="m4-focus whitespace-nowrap rounded-full px-2.5 py-1 font-mono text-[10px] font-medium cursor-pointer"
                style={{
                  backgroundColor: portalTool ? "#06B6D4" : ui.recessed,
                  color: portalTool ? "#FFFFFF" : ui.ink,
                  border: portalTool ? "1px solid #06B6D4" : `1px solid ${ui.border}`,
                }}
              >
                🌀 Portal Gun
              </button>

              <button
                type="button"
                onClick={() => {
                  setTrampolineOn((v) => {
                    const next = !v;
                    if (next) say("Trampoline deployed! Drop me on the pad!", 2600);
                    return next;
                  });
                }}
                className="m4-focus whitespace-nowrap rounded-full px-2.5 py-1 font-mono text-[10px] font-medium cursor-pointer"
                style={{
                  backgroundColor: trampolineOn ? "#E03E2D" : ui.recessed,
                  color: trampolineOn ? "#FFFFFF" : ui.ink,
                  border: trampolineOn ? "1px solid #E03E2D" : `1px solid ${ui.border}`,
                }}
              >
                🏀 Trampoline
              </button>

              <button
                type="button"
                onClick={() => {
                  setFeatherTool((v) => {
                    const next = !v;
                    if (next) {
                      setPortalTool(false);
                      say("Oh no, not the tickle feather!!", 2200);
                    }
                    return next;
                  });
                }}
                className="m4-focus whitespace-nowrap rounded-full px-2.5 py-1 font-mono text-[10px] font-medium cursor-pointer"
                style={{
                  backgroundColor: featherTool ? "#EC4899" : ui.recessed,
                  color: featherTool ? "#FFFFFF" : ui.ink,
                  border: featherTool ? "1px solid #EC4899" : `1px solid ${ui.border}`,
                }}
              >
                🪶 Feather
              </button>

              <button
                type="button"
                onClick={onMiniClones}
                className="m4-focus whitespace-nowrap rounded-full px-2.5 py-1 font-mono text-[10px] cursor-pointer"
                style={{ backgroundColor: ui.recessed, color: ui.ink, border: `1px solid ${ui.border}` }}
              >
                👯 3x Clones
              </button>

              <button
                type="button"
                onClick={onSneeze}
                className="m4-focus whitespace-nowrap rounded-full px-2.5 py-1 font-mono text-[10px] cursor-pointer"
                style={{ backgroundColor: ui.recessed, color: ui.ink, border: `1px solid ${ui.border}` }}
              >
                🤧 Sneeze
              </button>

              {/* Voice/Beat mic beta paused for now */}

              <button
                type="button"
                onClick={onShakeStage}
                className="m4-focus whitespace-nowrap rounded-full px-2.5 py-1 font-mono text-[10px] cursor-pointer"
                style={{ backgroundColor: ui.recessed, color: ui.ink, border: `1px solid ${ui.border}` }}
              >
                🌋 Shake
              </button>

              <button
                type="button"
                onClick={onPhotoBooth}
                className="m4-focus whitespace-nowrap rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold cursor-pointer"
                style={{ backgroundColor: ui.ink, color: ui.bg }}
              >
                📸 Photo
              </button>
            </div>
          )}

          {openDrawer === "pranks" && (
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar sm:flex-wrap sm:justify-center">
              <button
                type="button"
                onClick={onChaosPrank}
                className="m4-focus whitespace-nowrap rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold cursor-pointer"
                style={{ backgroundColor: "#E03E2D", color: "#FFFFFF" }}
              >
                🎲 Random Chaos
              </button>
              <button
                type="button"
                onClick={onFridayDeploy}
                className="m4-focus whitespace-nowrap rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold cursor-pointer"
                style={{ backgroundColor: "#F59E0B", color: "#111827" }}
              >
                🚨 Friday Deploy
              </button>
              <button
                type="button"
                onClick={onFakeCrash}
                className="m4-focus whitespace-nowrap rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold cursor-pointer"
                style={{ backgroundColor: "#1D4ED8", color: "#FFFFFF" }}
              >
                💙 Fake BSOD
              </button>
              <button
                type="button"
                onClick={onDevJoke}
                className="m4-focus whitespace-nowrap rounded-full px-2.5 py-1 font-mono text-[10px] cursor-pointer"
                style={{ backgroundColor: ui.recessed, color: ui.ink, border: `1px solid ${ui.border}` }}
              >
                🤣 Dev Joke
              </button>
              <button
                type="button"
                onClick={onStickyPrank}
                className="m4-focus whitespace-nowrap rounded-full px-2.5 py-1 font-mono text-[10px] cursor-pointer"
                style={{ backgroundColor: ui.recessed, color: ui.ink, border: `1px solid ${ui.border}` }}
              >
                📌 Sticky Note
              </button>
              <button
                type="button"
                onClick={onDiscoRave}
                className="m4-focus whitespace-nowrap rounded-full px-2.5 py-1 font-mono text-[10px] cursor-pointer"
                style={{ backgroundColor: ui.recessed, color: ui.ink, border: `1px solid ${ui.border}` }}
              >
                🪩 Disco Rave
              </button>
              <button
                type="button"
                onClick={onGravityFlip}
                className="m4-focus whitespace-nowrap rounded-full px-2.5 py-1 font-mono text-[10px] cursor-pointer"
                style={{
                  backgroundColor: gravityFlipped ? "#F59E0B" : ui.recessed,
                  color: gravityFlipped ? "#161618" : ui.ink,
                  border: `1px solid ${ui.border}`,
                }}
              >
                🙃 Gravity Flip
              </button>
              <button
                type="button"
                onClick={onCloneDuel}
                className="m4-focus whitespace-nowrap rounded-full px-2.5 py-1 font-mono text-[10px] cursor-pointer"
                style={{
                  backgroundColor: cloneDuelActive ? styleMeta.accent : ui.recessed,
                  color: cloneDuelActive ? "#FFFFFF" : ui.ink,
                  border: `1px solid ${ui.border}`,
                }}
              >
                🤺 Clone Duel
              </button>
              <button
                type="button"
                onClick={onBackflip}
                className="m4-focus whitespace-nowrap rounded-full px-2.5 py-1 font-mono text-[10px] cursor-pointer"
                style={{ backgroundColor: ui.recessed, color: ui.ink, border: `1px solid ${ui.border}` }}
              >
                🌀 Backflip
              </button>
            </div>
          )}
        </div>
      )}

      {/* Single-Row Bottom-Center Interactive Dock */}
      <div
        className="flex flex-nowrap items-center gap-1 rounded-full px-2.5 py-1.5 max-w-full overflow-x-auto no-scrollbar"
        style={{
          backgroundColor: ui.glass,
          border: `1px solid ${ui.borderStrong}`,
          boxShadow: ui.shadow,
          backdropFilter: "blur(16px)",
        }}
      >
        <span className="hidden xl:inline-flex items-center gap-1.5 pl-1 pr-1 font-mono text-[10px] font-semibold tracking-[0.06em] shrink-0">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: styleMeta.accent }} />
          <span>{styleMeta.label.toUpperCase()}</span>
        </span>

        {(
          [
            { id: "styles", label: "Styles & Gear" },
            { id: "modes", label: `Modes (${PLAY_MODES.length})` },
            { id: "moods", label: "Moods (12)" },
            { id: "toys", label: "Snacks & Toys" },
            { id: "pranks", label: "Pranks" },
          ] as const
        ).map((tab) => {
          const active = openDrawer === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => toggleDrawer(tab.id)}
              className="m4-focus whitespace-nowrap rounded-full px-2.5 py-1 font-mono text-[10px] font-medium cursor-pointer transition-colors shrink-0"
              style={{
                backgroundColor: active ? styleMeta.accent : ui.recessed,
                color: active ? "#FFFFFF" : ui.ink,
                border: active ? `1px solid ${styleMeta.accent}` : `1px solid ${ui.border}`,
              }}
            >
              {tab.label}
            </button>
          );
        })}

        <span className="h-4 w-px shrink-0 hidden md:inline-block" style={{ backgroundColor: ui.borderStrong }} />

        <div className="hidden md:flex items-center gap-1 shrink-0">
          <button
            type="button"
            title="Throw Cold Pizza"
            onClick={() => onThrowSnack("pizza")}
            className="m4-focus rounded-full w-6.5 h-6.5 flex items-center justify-center text-xs cursor-pointer transition-transform active:scale-90"
            style={{ backgroundColor: ui.recessed, border: `1px solid ${ui.border}` }}
          >
            🍕
          </button>
          <button
            type="button"
            title="Backflip"
            onClick={onBackflip}
            className="m4-focus rounded-full w-6.5 h-6.5 flex items-center justify-center text-xs cursor-pointer transition-transform active:scale-90"
            style={{ backgroundColor: ui.recessed, border: `1px solid ${ui.border}` }}
          >
            🌀
          </button>
          <button
            type="button"
            title="Friday Deploy Panic"
            onClick={onFridayDeploy}
            className="m4-focus rounded-full w-6.5 h-6.5 flex items-center justify-center text-xs cursor-pointer transition-transform active:scale-90"
            style={{ backgroundColor: "#F59E0B22", border: "1px solid #F59E0B55" }}
          >
            🚨
          </button>
          <button
            type="button"
            title="Photo Booth"
            onClick={onPhotoBooth}
            className="m4-focus rounded-full w-6.5 h-6.5 flex items-center justify-center text-xs cursor-pointer transition-transform active:scale-90"
            style={{ backgroundColor: ui.recessed, border: `1px solid ${ui.border}` }}
          >
            📸
          </button>
        </div>

        <button
          type="button"
          role="switch"
          aria-checked={soundOn}
          title={soundOn ? "Mute sound effects" : "Enable sound effects"}
          onClick={() => {
            const next = !soundOn;
            setSoundOn(next);
            if (next) playComedySound("chime", true, 1.1);
          }}
          className="m4-focus inline-flex items-center justify-center rounded-full w-6.5 h-6.5 cursor-pointer shrink-0"
          style={{
            backgroundColor: ui.recessed,
            color: soundOn ? styleMeta.accent : ui.muted,
            border: `1px solid ${soundOn ? styleMeta.accent : ui.border}`,
          }}
        >
          <IconSound on={soundOn} />
        </button>

        <button
          type="button"
          onClick={onResetStage}
          className="m4-focus whitespace-nowrap rounded-full px-2 py-1 font-mono text-[10px] cursor-pointer shrink-0"
          style={{ backgroundColor: ui.recessed, color: ui.muted, border: `1px solid ${ui.border}` }}
        >
          Reset
        </button>

        <Link
          href="/playground?tab=companion"
          className="whitespace-nowrap rounded-full px-2.5 py-1 font-mono text-[10px] font-medium shrink-0 transition-colors"
          style={{
            backgroundColor: ui.recessed,
            color: styleMeta.accent,
            border: `1px solid ${ui.border}`,
          }}
        >
          Studio ↗
        </Link>

        <button
          type="button"
          aria-label={openDrawer ? "Close menu drawer" : "Collapse dock"}
          title={openDrawer ? "Close drawer (keeps companion visible)" : "Collapse dock (keeps companion visible)"}
          onClick={() => {
            if (openDrawer) {
              setOpenDrawer(null);
            } else {
              setDockCollapsed(true);
            }
          }}
          className="w-6.5 h-6.5 rounded-full flex items-center justify-center cursor-pointer shrink-0"
          style={{ backgroundColor: ui.recessed, color: ui.muted, border: `1px solid ${ui.border}` }}
        >
          <X size={12} />
        </button>
      </div>
    </div>
  );
}
