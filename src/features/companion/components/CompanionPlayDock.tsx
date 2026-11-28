"use client";

import type { Dispatch, FormEvent, SetStateAction } from "react";
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
import type { CompanionThemeTokens, DockTab } from "../types";
import { IconLock, IconSend } from "./CompanionIcons";
import { CompanionModeSubbar } from "./CompanionModeSubbar";

export interface CompanionPlayDockProps {
  ui: CompanionThemeTokens;
  styleMeta: CharacterStyleMeta;
  charStyle: CharacterStyleId;
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
  dockTab: DockTab;
  setDockTab: Dispatch<SetStateAction<DockTab>>;
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
  onDevRoast: () => void;
  onDevJoke: () => void;
  onStickyPrank: () => void;
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
  say: (text: string, holdMs?: number, silent?: boolean) => void;
}

export function CompanionPlayDock({
  ui,
  styleMeta,
  charStyle,
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
  dockTab,
  setDockTab,
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
  onDevRoast,
  onDevJoke,
  onStickyPrank,
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
  say,
}: CompanionPlayDockProps) {
  return (
    <div
      data-dock
      className="absolute bottom-3.5 left-1/2 -translate-x-1/2 z-30 w-[min(96%,920px)] flex flex-col items-center gap-2"
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

      <div
        role="tablist"
        aria-label="Play dock tabs"
        className="inline-flex flex-wrap items-center justify-center rounded-full p-1 gap-1"
        style={{
          backgroundColor: ui.glass,
          border: `1px solid ${ui.borderStrong}`,
          boxShadow: ui.shadow,
          backdropFilter: "blur(16px)",
        }}
      >
        {(
          [
            { id: "modes", label: `Modes (${PLAY_MODES.length})` },
            { id: "styles", label: "Styles & Gear" },
            { id: "moods", label: "Moods (12)" },
            { id: "toys", label: "Snacks & Toys" },
            { id: "pranks", label: "Pranks & Chat" },
          ] as const
        ).map((tb) => {
          const active = dockTab === tb.id;
          return (
            <button
              key={tb.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setDockTab(tb.id)}
              className="m4-focus rounded-full px-3 py-1 font-mono text-[10.5px] font-medium cursor-pointer transition-colors"
              style={{
                backgroundColor: active ? ui.ink : "transparent",
                color: active ? ui.bg : ui.muted,
              }}
            >
              {tb.label}
            </button>
          );
        })}
      </div>

      <div
        className="w-full rounded-2xl px-3 py-2"
        style={{
          backgroundColor: ui.glass,
          border: `1px solid ${ui.borderStrong}`,
          boxShadow: ui.shadow,
          backdropFilter: "blur(16px)",
        }}
      >
        {dockTab === "modes" && (
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

        {dockTab === "styles" && (
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

        {dockTab === "moods" && (
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar sm:flex-wrap sm:justify-center">
            {MOODS.map((m) => {
              const active = mood === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => onSelectMood(m.id)}
                  className="m4-focus whitespace-nowrap rounded-full px-3 py-1 font-mono text-[10.5px] cursor-pointer transition-transform active:scale-95"
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
              className="m4-focus whitespace-nowrap rounded-full px-3 py-1 font-mono text-[10.5px] font-semibold cursor-pointer transition-transform active:scale-95"
              style={{ backgroundColor: ui.ink, color: ui.bg }}
            >
              Random Mood 🎲
            </button>
          </div>
        )}

        {dockTab === "toys" && (
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar sm:flex-wrap sm:justify-center">
            {SNACKS.map((sn) => (
              <button
                key={sn.id}
                type="button"
                onClick={() => onThrowSnack(sn.id)}
                className="m4-focus whitespace-nowrap rounded-full px-3 py-1 font-mono text-[10.5px] cursor-pointer transition-transform active:scale-95"
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
                    say("Portal Gun armed! Click two spots on stage!", 2400);
                  }
                  return next;
                });
              }}
              className="m4-focus whitespace-nowrap rounded-full px-3 py-1 font-mono text-[10.5px] font-medium cursor-pointer"
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
                  if (next) say("Trampoline deployed! Drag & drop me onto the pad!", 2600);
                  return next;
                });
              }}
              className="m4-focus whitespace-nowrap rounded-full px-3 py-1 font-mono text-[10.5px] font-medium cursor-pointer"
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
              className="m4-focus whitespace-nowrap rounded-full px-3 py-1 font-mono text-[10.5px] font-medium cursor-pointer"
              style={{
                backgroundColor: featherTool ? "#EC4899" : ui.recessed,
                color: featherTool ? "#FFFFFF" : ui.ink,
                border: featherTool ? "1px solid #EC4899" : `1px solid ${ui.border}`,
              }}
            >
              🪶 Tickle Feather
            </button>

            <button
              type="button"
              onClick={onMiniClones}
              className="m4-focus whitespace-nowrap rounded-full px-3 py-1 font-mono text-[10px] cursor-pointer"
              style={{ backgroundColor: ui.recessed, color: ui.ink, border: `1px solid ${ui.border}` }}
            >
              👯 3x Clones
            </button>

            <button
              type="button"
              onClick={onSneeze}
              className="m4-focus whitespace-nowrap rounded-full px-3 py-1 font-mono text-[10px] cursor-pointer"
              style={{ backgroundColor: ui.recessed, color: ui.ink, border: `1px solid ${ui.border}` }}
            >
              🤧 Sneeze
            </button>

            {/* Voice/Beat mic beta paused for now */}

            <button
              type="button"
              onClick={onShakeStage}
              className="m4-focus whitespace-nowrap rounded-full px-3 py-1 font-mono text-[10.5px] cursor-pointer"
              style={{ backgroundColor: ui.recessed, color: ui.ink, border: `1px solid ${ui.border}` }}
            >
              🌋 Shake Stage
            </button>

            <button
              type="button"
              onClick={onPhotoBooth}
              className="m4-focus whitespace-nowrap rounded-full px-3 py-1 font-mono text-[10.5px] font-semibold cursor-pointer"
              style={{ backgroundColor: ui.ink, color: ui.bg }}
            >
              📸 Photo Booth
            </button>
          </div>
        )}

        {dockTab === "pranks" && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar sm:flex-wrap sm:justify-center">
              <button
                type="button"
                onClick={onChaosPrank}
                className="m4-focus whitespace-nowrap rounded-full px-3 py-1 font-mono text-[10.5px] font-semibold cursor-pointer"
                style={{ backgroundColor: "#E03E2D", color: "#FFFFFF" }}
              >
                🎲 Random Chaos
              </button>
              <button
                type="button"
                onClick={onFridayDeploy}
                className="m4-focus whitespace-nowrap rounded-full px-3 py-1 font-mono text-[10.5px] font-semibold cursor-pointer"
                style={{ backgroundColor: "#F59E0B", color: "#111827" }}
              >
                🚨 Friday Deploy
              </button>
              <button
                type="button"
                onClick={onFakeCrash}
                className="m4-focus whitespace-nowrap rounded-full px-3 py-1 font-mono text-[10.5px] font-semibold cursor-pointer"
                style={{ backgroundColor: "#1D4ED8", color: "#FFFFFF" }}
              >
                💙 Fake BSOD
              </button>
              <button
                type="button"
                onClick={onDevRoast}
                className="m4-focus whitespace-nowrap rounded-full px-3 py-1 font-mono text-[10.5px] cursor-pointer"
                style={{ backgroundColor: ui.recessed, color: ui.ink, border: `1px solid ${ui.border}` }}
              >
                🔥 Roast Me
              </button>
              <button
                type="button"
                onClick={onDevJoke}
                className="m4-focus whitespace-nowrap rounded-full px-3 py-1 font-mono text-[10.5px] cursor-pointer"
                style={{ backgroundColor: ui.recessed, color: ui.ink, border: `1px solid ${ui.border}` }}
              >
                🤣 Dev Joke
              </button>
              <button
                type="button"
                onClick={onStickyPrank}
                className="m4-focus whitespace-nowrap rounded-full px-3 py-1 font-mono text-[10.5px] cursor-pointer"
                style={{ backgroundColor: ui.recessed, color: ui.ink, border: `1px solid ${ui.border}` }}
              >
                📌 Sticky Note
              </button>
              <button
                type="button"
                onClick={onDiscoRave}
                className="m4-focus whitespace-nowrap rounded-full px-3 py-1 font-mono text-[10.5px] cursor-pointer"
                style={{ backgroundColor: ui.recessed, color: ui.ink, border: `1px solid ${ui.border}` }}
              >
                🪩 Disco Rave
              </button>
              <button
                type="button"
                onClick={onGravityFlip}
                className="m4-focus whitespace-nowrap rounded-full px-3 py-1 font-mono text-[10.5px] cursor-pointer"
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
                className="m4-focus whitespace-nowrap rounded-full px-3 py-1 font-mono text-[10.5px] cursor-pointer"
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
                className="m4-focus whitespace-nowrap rounded-full px-3 py-1 font-mono text-[10.5px] cursor-pointer"
                style={{ backgroundColor: ui.recessed, color: ui.ink, border: `1px solid ${ui.border}` }}
              >
                🌀 Backflip
              </button>
            </div>

            <form
              onSubmit={onChatSubmit}
              onPointerDown={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
              onKeyDown={(e) => e.stopPropagation()}
              className="w-full max-w-[660px] mx-auto flex items-center gap-1.5 select-text"
            >
              <button
                type="button"
                aria-pressed={secretMode}
                title={secretMode ? "Disable Secret Mode" : "Secret Mode (Character covers eyes)"}
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
                onPointerDown={(e) => e.stopPropagation()}
                onKeyDown={(e) => e.stopPropagation()}
                placeholder={
                  secretMode
                    ? "Typing in Secret Mode..."
                    : "Type: friday, crash, roast, joke, pizza, flip, laser, photo..."
                }
                aria-label="Chat with MOCHI-04"
                className="flex-1 min-w-[200px] select-text pointer-events-auto rounded-full px-3.5 py-1.5 text-xs outline-none focus:ring-2 focus:ring-sky-400/50"
                style={{
                  backgroundColor: ui.recessed,
                  color: ui.ink,
                  border: `1px solid ${ui.borderStrong}`,
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
                  {peeking ? "Hide Eye" : "Peek"}
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
    </div>
  );
}
