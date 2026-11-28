"use client";

import { useState, type Dispatch, type FormEvent, type SetStateAction } from "react";
import Link from "next/link";
import { Sparkles, X } from "lucide-react";
import {
  ACCESSORIES,
  AURA_FINISHES,
  CHARACTER_STYLES,
  MOODS,
  PLAY_MODES,
  SNACKS,
  type AccessoryId,
  type ArtRatingMeta,
  type AuraFinishId,
  type CharacterStyleId,
  type CharacterStyleMeta,
  type MoodId,
  type PlayModeId,
  type SnackId,
  type SynthPadMeta,
} from "@/lib/data";
import type { CompanionThemeTokens } from "../types";
import { playComedySound } from "../utils/audio";
import { IconLock, IconSend, IconSound } from "./CompanionIcons";
import { CompanionModeSubbar } from "./CompanionModeSubbar";

type HomeDrawerTab = "styles" | "modes" | "moods" | "toys" | "pranks" | null;

export interface CompanionHomeDockProps {
  ui: CompanionThemeTokens;
  charStyle: CharacterStyleId;
  styleMeta: CharacterStyleMeta;
  onSelectStyle: (id: CharacterStyleId) => void;
  auraFinish: AuraFinishId;
  onSelectAuraFinish: (id: AuraFinishId) => void;
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
  micMode: "off" | "live" | "fallback";
  onCritiqueArt: () => void;
  onClearPaint: () => void;
  onReleaseBugs: () => void;
  onHitPad: (pad: SynthPadMeta) => void;
  onMiniClones: () => void;
  onToggleVoiceBeat: () => void;
  onFireClapPulse: () => void;
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
  onGravityFlip: () => void;
  onCloneDuel: () => void;
  onBackflip: () => void;
  secretMode: boolean;
  setSecretMode: Dispatch<SetStateAction<boolean>>;
  peeking: boolean;
  setPeeking: Dispatch<SetStateAction<boolean>>;
  chatText: string;
  setChatText: Dispatch<SetStateAction<string>>;
  setChatFocused: Dispatch<SetStateAction<boolean>>;
  onChatSubmit: (e: FormEvent<HTMLFormElement>) => void;
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
  auraFinish,
  onSelectAuraFinish,
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
  micMode,
  onCritiqueArt,
  onClearPaint,
  onReleaseBugs,
  onHitPad,
  onMiniClones,
  onToggleVoiceBeat,
  onFireClapPulse,
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
  onGravityFlip,
  onCloneDuel,
  onBackflip,
  secretMode,
  setSecretMode,
  peeking,
  setPeeking,
  chatText,
  setChatText,
  setChatFocused,
  onChatSubmit,
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
      <div className="pointer-events-auto fixed bottom-3.5 right-4 z-40">
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
    <div className="pointer-events-auto fixed bottom-3 left-1/2 -translate-x-1/2 z-40 w-fit max-w-[96vw] flex flex-col items-center gap-1.5">
      <CompanionModeSubbar
        playMode={playMode}
        rallyCount={rallyCount}
        bugsLeft={bugsLeft}
        artVerdict={artVerdict}
        autoJam={autoJam}
        micMode={micMode}
        activePad={activePad}
        onCritiqueArt={onCritiqueArt}
        onClearPaint={onClearPaint}
        onReleaseBugs={onReleaseBugs}
        onHitPad={onHitPad}
        onToggleAutoJam={onToggleAutoJam}
        onFireClapPulse={onFireClapPulse}
      />

      {openDrawer && (
        <div
          className="mochi-pop w-fit max-w-[94vw] rounded-2xl px-3 py-2"
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

              {charStyle === "aura" && (
                <div className="flex items-center justify-center gap-2 pt-0.5">
                  <span className="font-mono text-[9.5px] uppercase tracking-wider" style={{ color: ui.muted }}>
                    Finish:
                  </span>
                  {(Object.values(AURA_FINISHES) as Array<(typeof AURA_FINISHES)[AuraFinishId]>).map((fin) => {
                    const active = auraFinish === fin.id;
                    return (
                      <button
                        key={fin.id}
                        type="button"
                        title={fin.name}
                        aria-label={`Select ${fin.name} finish`}
                        onClick={() => onSelectAuraFinish(fin.id)}
                        className="w-5 h-5 rounded-full cursor-pointer transition-transform hover:scale-110"
                        style={{
                          backgroundColor: fin.dot,
                          border: active ? `2.5px solid ${styleMeta.accent}` : `1.5px solid ${ui.borderStrong}`,
                          boxShadow: active ? `0 0 0 2px ${styleMeta.accent}44` : "none",
                        }}
                      />
                    );
                  })}
                </div>
              )}

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

              <button
                type="button"
                onClick={onToggleVoiceBeat}
                className="m4-focus whitespace-nowrap rounded-full px-2.5 py-1 font-mono text-[10px] font-medium cursor-pointer"
                style={{
                  backgroundColor: micMode !== "off" ? "#8B5CF6" : ui.recessed,
                  color: micMode !== "off" ? "#FFFFFF" : ui.ink,
                  border: micMode !== "off" ? "1px solid #8B5CF6" : `1px solid ${ui.border}`,
                }}
              >
                🎙️ Voice/Beat
              </button>

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
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar sm:justify-center">
                <button
                  type="button"
                  onClick={onChaosPrank}
                  className="m4-focus whitespace-nowrap rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold cursor-pointer"
                  style={{ backgroundColor: "#E03E2D", color: "#FFFFFF" }}
                >
                  😈 Chaos Prank
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

              <form onSubmit={onChatSubmit} className="w-full max-w-[640px] mx-auto flex items-center gap-1.5">
                <button
                  type="button"
                  aria-pressed={secretMode}
                  title={secretMode ? "Disable Secret Mode" : "Secret Mode (Covers eyes)"}
                  onClick={() => {
                    const next = !secretMode;
                    setSecretMode(next);
                    if (!next) setPeeking(false);
                    else say("Hands over my eyes! I promise I am not peeking.", 2400);
                  }}
                  className="m4-focus inline-flex items-center justify-center rounded-full w-7 h-7 cursor-pointer shrink-0"
                  style={{
                    backgroundColor: secretMode ? "#EC489922" : ui.recessed,
                    color: secretMode ? "#EC4899" : ui.muted,
                    border: secretMode ? "1px solid #EC489955" : `1px solid ${ui.border}`,
                  }}
                >
                  <IconLock locked={secretMode} />
                </button>

                <input
                  type={secretMode && !peeking ? "password" : "text"}
                  value={chatText}
                  onFocus={() => setChatFocused(true)}
                  onBlur={() => setChatFocused(false)}
                  onChange={(e) => setChatText(e.target.value)}
                  placeholder="Say hi, roast, joke, flip, sneeze, bugs, portal, photo..."
                  aria-label="Chat with MOCHI-04"
                  className="flex-1 min-w-0 rounded-full px-3 py-1.5 text-xs outline-none"
                  style={{
                    backgroundColor: ui.recessed,
                    color: ui.ink,
                    border: `1px solid ${ui.border}`,
                  }}
                />

                {secretMode && (
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => setPeeking((v) => !v)}
                    className="m4-focus rounded-full px-2.5 py-1 font-mono text-[10px] font-medium cursor-pointer shrink-0"
                    style={{
                      backgroundColor: "#EC489922",
                      color: "#EC4899",
                      border: "1px solid #EC489955",
                    }}
                  >
                    {peeking ? "Hide" : "Peek"}
                  </button>
                )}

                <button
                  type="submit"
                  aria-label="Send message"
                  className="m4-focus inline-flex items-center justify-center rounded-full w-7 h-7 cursor-pointer shrink-0"
                  style={{ backgroundColor: styleMeta.accent, color: "#FFFFFF" }}
                >
                  <IconSend />
                </button>
              </form>
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
            { id: "pranks", label: "Pranks & Chat" },
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
            title="Throw Ghost Pepper"
            onClick={() => onThrowSnack("pepper")}
            className="m4-focus rounded-full w-6.5 h-6.5 flex items-center justify-center text-xs cursor-pointer transition-transform active:scale-90"
            style={{ backgroundColor: ui.recessed, border: `1px solid ${ui.border}` }}
          >
            🌶️
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
            title="Sneeze"
            onClick={onSneeze}
            className="m4-focus rounded-full w-6.5 h-6.5 flex items-center justify-center text-xs cursor-pointer transition-transform active:scale-90"
            style={{ backgroundColor: ui.recessed, border: `1px solid ${ui.border}` }}
          >
            🤧
          </button>
          <button
            type="button"
            title="3x Mini-Clones"
            onClick={onMiniClones}
            className="m4-focus rounded-full w-6.5 h-6.5 flex items-center justify-center text-xs cursor-pointer transition-transform active:scale-90"
            style={{ backgroundColor: ui.recessed, border: `1px solid ${ui.border}` }}
          >
            👯
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
