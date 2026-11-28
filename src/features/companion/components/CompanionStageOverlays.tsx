"use client";

import type { Dispatch, PointerEvent as ReactPointerEvent, SetStateAction } from "react";
import type { ArtRatingMeta } from "@/lib/data";
import type {
  CompanionThemeTokens,
  PolaroidCard,
  StickyNoteState,
} from "../types";
import { playComedySound } from "../utils/audio";
import { PolaroidMiniPortrait } from "./CompanionIcons";

function downloadPolaroidPng(card: PolaroidCard): void {
  const c = document.createElement("canvas");
  c.width = 360;
  c.height = 420;
  const ctx = c.getContext("2d");
  if (!ctx) return;

  ctx.fillStyle = "#FCFBF8";
  ctx.fillRect(0, 0, c.width, c.height);
  ctx.strokeStyle = "rgba(0,0,0,0.12)";
  ctx.lineWidth = 4;
  ctx.strokeRect(2, 2, c.width - 4, c.height - 4);

  ctx.fillStyle = card.moodId === "hype" ? "#FEF3C7" : card.moodId === "dramatic" ? "#1E293B" : "#E0F2FE";
  ctx.fillRect(28, 28, 304, 270);

  ctx.fillStyle = "#18181B";
  ctx.font = '700 22px "JetBrains Mono", monospace';
  ctx.textAlign = "center";
  ctx.fillText(card.styleId.toUpperCase(), 180, 150);
  ctx.font = '500 14px "JetBrains Mono", monospace';
  ctx.fillText(`MOOD: ${card.moodLabel.toUpperCase()}`, 180, 184);

  ctx.fillStyle = "#161618";
  ctx.font = '700 15px "JetBrains Mono", monospace';
  ctx.fillText(card.caption, 180, 344);
  ctx.fillStyle = "#71717A";
  ctx.font = '500 12px "JetBrains Mono", monospace';
  ctx.fillText("MOCHI-04 · PORTFOLIO EDITION", 180, 372);

  const link = document.createElement("a");
  link.download = `mochi-polaroid-${card.id}.png`;
  link.href = c.toDataURL("image/png");
  link.click();
}

export interface CompanionStageOverlaysProps {
  isDark: boolean;
  ui: CompanionThemeTokens;
  stickyNote: StickyNoteState | null;
  setStickyNote: Dispatch<SetStateAction<StickyNoteState | null>>;
  polaroids: PolaroidCard[];
  setPolaroids: Dispatch<SetStateAction<PolaroidCard[]>>;
  startPolaroidDrag: (cardId: number, e: ReactPointerEvent<HTMLDivElement>) => void;
  cloneDuelActive: boolean;
  cloneSpeech: string;
  speechShown: string;
  featherTool: boolean;
  cameraFlash: boolean;
  soundOn: boolean;
  artVerdict?: ArtRatingMeta | null;
  onDismissArtVerdict?: () => void;
  fridayDeployActive?: boolean;
  onDismissFridayDeploy?: () => void;
  fakeCrashActive?: boolean;
  onDismissFakeCrash?: () => void;
  devJoke?: string | null;
  onDismissDevJoke?: () => void;
  onNextDevJoke?: () => void;
  focusSecondsLeft?: number | null;
  onStopFocus?: () => void;
}

export function CompanionStageOverlays({
  isDark,
  ui,
  stickyNote,
  setStickyNote,
  polaroids,
  setPolaroids,
  startPolaroidDrag,
  cloneDuelActive,
  cloneSpeech,
  speechShown,
  featherTool,
  cameraFlash,
  soundOn,
  artVerdict = null,
  onDismissArtVerdict,
  fridayDeployActive = false,
  onDismissFridayDeploy,
  fakeCrashActive = false,
  onDismissFakeCrash,
  devJoke = null,
  onDismissDevJoke,
  onNextDevJoke,
  focusSecondsLeft = null,
  onStopFocus,
}: CompanionStageOverlaysProps) {
  return (
    <>
      {stickyNote && (
        <div
          data-sticky
          className="mochi-pop pointer-events-auto absolute z-20 w-[196px] p-4 rounded-sm shadow-lg"
          style={{
            left: `${stickyNote.x}px`,
            top: `${stickyNote.y}px`,
            transform: `translate(-50%, -50%) rotate(${stickyNote.rot.toFixed(1)}deg)`,
            backgroundColor: "#FEF08A",
            color: "#1C1917",
            border: "1px solid rgba(161, 98, 7, 0.25)",
          }}
        >
          <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.1em] text-amber-900/60 mb-2">
            <span>NOTE FROM MOCHI</span>
            <button
              type="button"
              aria-label="Dismiss sticky note"
              onClick={() => {
                setStickyNote(null);
                playComedySound("poof", soundOn);
              }}
              className="cursor-pointer font-bold hover:text-black"
            >
              ×
            </button>
          </div>
          <p className="m-0 font-mono text-[11.5px] font-semibold leading-snug">
            DON&apos;T HIRE HIM. HIRE ME. I WORK FOR RAM.
          </p>
        </div>
      )}

      {polaroids.map((card) => (
        <div
          key={card.id}
          data-polaroid
          onPointerDown={(e) => {
            setPolaroids((prev) => [...prev.filter((c) => c.id !== card.id), card]);
            startPolaroidDrag(card.id, e);
          }}
          className="mochi-pop pointer-events-auto absolute z-20 w-[158px] p-2.5 pb-3.5 rounded-[3px] cursor-grab active:cursor-grabbing touch-none"
          style={{
            left: `${card.x}px`,
            top: `${card.y}px`,
            transform: `translate(-50%, -50%) rotate(${card.rot.toFixed(1)}deg)`,
            backgroundColor: "#FCFBF8",
            color: "#161618",
            boxShadow: "0 16px 34px -10px rgba(0, 0, 0, 0.28), 0 0 0 1px rgba(0,0,0,0.08)",
          }}
        >
          <button
            type="button"
            aria-label="Download Polaroid PNG"
            title="Download Polaroid PNG"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => downloadPolaroidPng(card)}
            className="absolute -top-2 right-4 w-5 h-5 rounded-full bg-sky-600 text-white font-mono text-[10px] flex items-center justify-center cursor-pointer hover:bg-sky-500"
          >
            ↓
          </button>
          <button
            type="button"
            aria-label="Dismiss Polaroid"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => setPolaroids((prev) => prev.filter((c) => c.id !== card.id))}
            className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-neutral-900 text-white font-mono text-[10px] flex items-center justify-center cursor-pointer"
          >
            ×
          </button>
          <div className="w-full h-[112px] overflow-hidden border border-black/10">
            <PolaroidMiniPortrait styleId={card.styleId} moodId={card.moodId} />
          </div>
          <div className="mt-2 space-y-0.5 text-center">
            <div className="font-mono text-[8.5px] font-semibold tracking-[0.06em] uppercase text-neutral-800">
              {card.caption}
            </div>
            <div className="font-mono text-[7.5px] uppercase tracking-[0.12em] text-neutral-400">
              {card.moodLabel} · MOCHI-04
            </div>
          </div>
        </div>
      ))}

      <div
        data-mochi-el="shadow"
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 z-10 w-[132px] h-[22px] rounded-full"
        style={{
          background: isDark
            ? "radial-gradient(ellipse, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 72%)"
            : "radial-gradient(ellipse, rgba(22,22,24,0.34) 0%, rgba(22,22,24,0) 72%)",
        }}
      />

      {cloneDuelActive && (
        <>
          <div
            data-mochi-el="cloneBubble"
            className="pointer-events-none absolute left-0 top-0 z-[46] w-max max-w-[210px]"
          >
            {cloneSpeech && (
              <div
                className="mochi-pop rounded-xl px-3 py-1.5 text-[11px] font-medium"
                style={{
                  backgroundColor: "#161618",
                  color: "#F6F4EF",
                  boxShadow: ui.shadow,
                }}
              >
                {cloneSpeech}
              </div>
            )}
          </div>
          <div
            data-mochi-el="cloneWrap"
            className="pointer-events-none absolute left-0 top-0 z-[44] w-[160px] h-[160px]"
          >
            <svg viewBox="0 0 120 120" className="w-full h-full block drop-shadow-md" aria-hidden="true">
              <path
                d="M 24 78 C 22 34, 40 18, 60 18 C 80 18, 98 34, 96 78 C 94 98, 80 104, 60 104 C 40 104, 26 98, 24 78 Z"
                fill="#FEE2E2"
                stroke="#E03E2D"
                strokeWidth="2.5"
              />
              <line x1="36" y1="48" x2="54" y2="56" stroke="#18181B" strokeWidth="3.5" strokeLinecap="round" />
              <line x1="84" y1="48" x2="66" y2="56" stroke="#18181B" strokeWidth="3.5" strokeLinecap="round" />
              <circle cx="46" cy="60" r="4.5" fill="#18181B" />
              <circle cx="74" cy="60" r="4.5" fill="#18181B" />
              <path d="M 52 76 Q 60 70, 68 76" fill="none" stroke="#18181B" strokeWidth="2.6" strokeLinecap="round" />
            </svg>
          </div>
        </>
      )}

      <div
        data-mochi-el="speech"
        aria-live="polite"
        className="pointer-events-none absolute left-0 top-0 z-[47] w-max max-w-[min(320px,86vw)] will-change-transform transition-opacity duration-150"
        style={{ opacity: devJoke || speechShown ? 1 : 0 }}
      >
        {devJoke ? (
          <div
            className="mochi-pop pointer-events-auto relative rounded-2xl px-4 py-2.5 text-left text-xs sm:text-[12.5px] font-medium leading-snug"
            style={{
              backgroundColor: ui.surface,
              color: ui.ink,
              border: "1px solid rgba(245, 158, 11, 0.55)",
              boxShadow: ui.shadow,
            }}
          >
            <div className="flex items-center justify-between gap-4 font-mono text-[9.5px] uppercase tracking-[0.1em] text-amber-500 mb-1">
              <span>🤣 DEV JOKE</span>
              <div className="flex items-center gap-2">
                {onNextDevJoke && (
                  <button
                    type="button"
                    onClick={onNextDevJoke}
                    className="cursor-pointer font-semibold hover:opacity-80"
                  >
                    Next 🎲
                  </button>
                )}
                {onDismissDevJoke && (
                  <button
                    type="button"
                    aria-label="Dismiss dev joke"
                    onClick={onDismissDevJoke}
                    className="cursor-pointer font-bold hover:opacity-75"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
            <p className="m-0">{devJoke}</p>
          </div>
        ) : speechShown ? (
          <div
            className="mochi-pop relative rounded-2xl px-3.5 py-2 text-center text-xs sm:text-[12.5px] font-medium leading-snug"
            style={{
              backgroundColor: ui.surface,
              color: ui.ink,
              border: `1px solid ${ui.borderStrong}`,
              boxShadow: ui.shadow,
            }}
          >
            {speechShown}
          </div>
        ) : null}
      </div>

      {focusSecondsLeft !== null && (
        <div
          className="mochi-pop pointer-events-auto fixed top-20 left-4 z-40 flex items-center gap-2 rounded-full px-3 py-1 font-mono text-[10.5px] shadow-md"
          style={{
            backgroundColor: ui.surface,
            color: ui.ink,
            border: `1px solid ${ui.borderStrong}`,
          }}
        >
          <span>
            🍅 {String(Math.floor(focusSecondsLeft / 60)).padStart(2, "0")}:
            {String(focusSecondsLeft % 60).padStart(2, "0")}
          </span>
          {onStopFocus && (
            <button
              type="button"
              onClick={onStopFocus}
              className="text-rose-500 font-bold cursor-pointer hover:opacity-80"
            >
              Stop
            </button>
          )}
        </div>
      )}

      {fridayDeployActive && (
        <div className="mochi-pop pointer-events-auto fixed top-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 rounded-xl border border-rose-500/80 bg-rose-950/92 px-4 py-2 text-rose-100 shadow-2xl backdrop-blur-md">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-500 animate-ping" />
          <div className="font-mono text-[11px] font-bold tracking-wide">
            🚨 FRIDAY 5:58 PM PROD DEPLOY IN PROGRESS — ROLLBACK RECOMMENDED
          </div>
          {onDismissFridayDeploy && (
            <button
              type="button"
              onClick={onDismissFridayDeploy}
              className="rounded-md bg-rose-500 px-2 py-0.5 font-mono text-[10px] font-bold text-white cursor-pointer hover:bg-rose-400"
            >
              Abort
            </button>
          )}
        </div>
      )}

      {fakeCrashActive && (
        <button
          type="button"
          onClick={onDismissFakeCrash}
          className="mochi-pop pointer-events-auto fixed inset-0 z-50 flex items-center justify-center bg-blue-800/88 p-6 text-left text-white backdrop-blur-xs cursor-pointer"
        >
          <div className="max-w-lg space-y-3 font-mono">
            <div className="text-4xl font-black">:(</div>
            <div className="text-sm leading-relaxed">
              MOCHI_KERNEL_PANIC: Your flex container ran into too much swagger and needs to reboot. We are collecting anonymous coffee telemetry (100% complete).
            </div>
            <div className="text-xs text-blue-200">
              Stop code: SHIPPED_ON_FRIDAY_WITHOUT_TESTS · Click anywhere to reboot
            </div>
          </div>
        </button>
      )}

      {artVerdict && (
        <div
          className="mochi-pop pointer-events-auto absolute top-16 left-5 z-30 w-[260px] rounded-xl p-3.5 shadow-xl"
          style={{
            backgroundColor: ui.surface,
            color: ui.ink,
            border: `1px solid ${ui.borderStrong}`,
            boxShadow: ui.shadow,
          }}
        >
          <div className="flex items-center justify-between font-mono text-[9.5px] uppercase tracking-[0.1em] text-amber-500 mb-1">
            <span>Gallery Critique</span>
            {onDismissArtVerdict && (
              <button
                type="button"
                aria-label="Dismiss art critique"
                onClick={onDismissArtVerdict}
                className="cursor-pointer font-bold hover:opacity-75"
              >
                ×
              </button>
            )}
          </div>
          <div className="text-xs font-semibold leading-snug">{artVerdict.title}</div>
          <div className="mt-0.5 font-mono text-[11px] font-bold text-amber-500">
            Score: {artVerdict.score}
          </div>
          <p className="mt-1 text-[11px] leading-relaxed" style={{ color: ui.muted }}>
            {artVerdict.note}
          </p>
        </div>
      )}

      {featherTool && (
        <div
          data-mochi-el="featherDom"
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 z-50 will-change-transform"
        >
          <svg viewBox="0 0 48 48" width="46" height="46" className="block -translate-x-2 -translate-y-8 drop-shadow">
            <path
              d="M 8 42 C 14 26, 26 12, 42 4 C 40 20, 28 32, 12 38 Z"
              fill="#FDA4AF"
              stroke="#BE123C"
              strokeWidth="1.4"
            />
            <path d="M 6 44 Q 22 24, 41 5" fill="none" stroke="#FFF1F2" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      )}

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-50 bg-white transition-opacity duration-150"
        style={{ opacity: cameraFlash ? 0.92 : 0 }}
      />
    </>
  );
}
