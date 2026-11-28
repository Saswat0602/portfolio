"use client";

import { useState, type Dispatch, type FormEvent, type SetStateAction } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import {
  CHARACTER_STYLES,
  MOODS,
  SNACKS,
  type CharacterStyleId,
  type CharacterStyleMeta,
  type MoodId,
  type SnackId,
} from "@/lib/data";
import type { CompanionThemeTokens } from "../types";
import { playComedySound } from "../utils/audio";
import { IconLock, IconSend, IconSound } from "./CompanionIcons";

type HomeDrawerTab = "styles" | "moods" | "toys" | "pranks" | null;

export interface CompanionHomeDockProps {
  ui: CompanionThemeTokens;
  charStyle: CharacterStyleId;
  styleMeta: CharacterStyleMeta;
  onSelectStyle: (id: CharacterStyleId) => void;
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
  onMinimize: () => void;
  say: (text: string, holdMs?: number, silent?: boolean) => void;
}

export function CompanionHomeDock({
  ui,
  charStyle,
  styleMeta,
  onSelectStyle,
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
  onMinimize,
  say,
}: CompanionHomeDockProps) {
  const [openDrawer, setOpenDrawer] = useState<HomeDrawerTab>(null);

  const toggleDrawer = (tab: Exclude<HomeDrawerTab, null>) => {
    setOpenDrawer((prev) => (prev === tab ? null : tab));
  };

  return (
    <div className="pointer-events-auto fixed bottom-3.5 right-3.5 z-40 flex flex-col items-end gap-2 max-w-[calc(100vw-1.75rem)]">
      {openDrawer && (
        <div
          className="mochi-pop w-[min(92vw,680px)] rounded-2xl px-3 py-2.5"
          style={{
            backgroundColor: ui.glass,
            border: `1px solid ${ui.borderStrong}`,
            boxShadow: ui.shadow,
            backdropFilter: "blur(16px)",
          }}
        >
          {openDrawer === "styles" && (
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar sm:flex-wrap sm:justify-end">
              {CHARACTER_STYLES.map((st) => {
                const active = charStyle === st.id;
                return (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => onSelectStyle(st.id)}
                    className="m4-focus whitespace-nowrap rounded-full px-3 py-1 font-mono text-[10.5px] cursor-pointer transition-transform active:scale-95"
                    style={{
                      backgroundColor: active ? `${st.accent}24` : ui.recessed,
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
          )}

          {openDrawer === "moods" && (
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar sm:flex-wrap sm:justify-end">
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
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar sm:flex-wrap sm:justify-end">
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
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar sm:justify-end">
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
                  👯 Clone Duel
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

              <form onSubmit={onChatSubmit} className="w-full flex items-center gap-1.5">
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
                  placeholder="Say hi, roast, joke, flip, pepper, portal, photo..."
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

      {/* Horizontal Bottom-Right Control Strip */}
      <div
        className="flex items-center gap-1.5 rounded-full px-2.5 py-1.5 overflow-x-auto no-scrollbar max-w-full"
        style={{
          backgroundColor: ui.glass,
          border: `1px solid ${ui.borderStrong}`,
          boxShadow: ui.shadow,
          backdropFilter: "blur(16px)",
        }}
      >
        <span className="hidden sm:inline-flex items-center gap-1.5 pl-1 pr-1.5 font-mono text-[10px] font-semibold tracking-[0.06em] shrink-0">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: styleMeta.accent }} />
          <span>MOCHI-04</span>
        </span>

        {(
          [
            { id: "styles", label: "Styles (4)" },
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
            className="m4-focus rounded-full w-7 h-7 flex items-center justify-center text-xs cursor-pointer transition-transform active:scale-90"
            style={{ backgroundColor: ui.recessed, border: `1px solid ${ui.border}` }}
          >
            🌶️
          </button>
          <button
            type="button"
            title="Backflip"
            onClick={onBackflip}
            className="m4-focus rounded-full w-7 h-7 flex items-center justify-center text-xs cursor-pointer transition-transform active:scale-90"
            style={{ backgroundColor: ui.recessed, border: `1px solid ${ui.border}` }}
          >
            🌀
          </button>
          <button
            type="button"
            title="Photo Booth"
            onClick={onPhotoBooth}
            className="m4-focus rounded-full w-7 h-7 flex items-center justify-center text-xs cursor-pointer transition-transform active:scale-90"
            style={{ backgroundColor: ui.recessed, border: `1px solid ${ui.border}` }}
          >
            📸
          </button>
          <button
            type="button"
            title="Chaos Prank"
            onClick={onChaosPrank}
            className="m4-focus rounded-full w-7 h-7 flex items-center justify-center text-xs cursor-pointer transition-transform active:scale-90"
            style={{ backgroundColor: "#E03E2D1A", border: "1px solid #E03E2D44" }}
          >
            😈
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
          className="m4-focus inline-flex items-center justify-center rounded-full w-7 h-7 cursor-pointer shrink-0"
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
          aria-label="Minimize MOCHI-04 companion"
          title="Minimize companion"
          onClick={onMinimize}
          className="w-7 h-7 rounded-full flex items-center justify-center cursor-pointer shrink-0"
          style={{ backgroundColor: ui.recessed, color: ui.muted, border: `1px solid ${ui.border}` }}
        >
          <X size={12} />
        </button>
      </div>
    </div>
  );
}
