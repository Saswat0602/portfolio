"use client";

import type { ArtRatingMeta, PlayModeId, SynthPadMeta } from "@/lib/data";
import { SYNTH_PADS } from "@/lib/data";

export interface CompanionModeSubbarProps {
  playMode: PlayModeId;
  rallyCount: number;
  bugsLeft: number;
  artVerdict: ArtRatingMeta | null;
  autoJam: boolean;
  micMode: "off" | "live" | "fallback";
  activePad: string | null;
  onCritiqueArt: () => void;
  onClearPaint: () => void;
  onReleaseBugs: () => void;
  onHitPad: (pad: SynthPadMeta) => void;
  onToggleAutoJam: () => void;
  onFireClapPulse: () => void;
}

export function CompanionModeSubbar({
  playMode,
  rallyCount,
  bugsLeft,
  autoJam,
  micMode,
  activePad,
  onCritiqueArt,
  onClearPaint,
  onReleaseBugs,
  onHitPad,
  onToggleAutoJam,
  onFireClapPulse,
}: CompanionModeSubbarProps) {
  const showBar =
    playMode === "paint" ||
    playMode === "dj" ||
    playMode === "catch" ||
    playMode === "bugs" ||
    micMode === "fallback";

  if (!showBar) return null;

  return (
    <div className="flex flex-wrap items-center justify-center gap-1.5 rounded-full border border-white/10 bg-[#0A0E17]/92 px-3 py-1.5 text-[11px] backdrop-blur-md shadow-lg">
      {playMode === "paint" && (
        <>
          <span className="font-mono text-[10px] uppercase tracking-wider text-amber-300">
            Ink Trampoline
          </span>
          <button
            type="button"
            onClick={onCritiqueArt}
            className="rounded-full bg-amber-500 px-2.5 py-0.5 font-medium text-black hover:bg-amber-400 transition-colors cursor-pointer"
          >
            Critique Art
          </button>
          <button
            type="button"
            onClick={onClearPaint}
            className="rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 text-neutral-300 hover:text-white transition-colors cursor-pointer"
          >
            Clear
          </button>
        </>
      )}

      {playMode === "catch" && (
        <span className="font-mono text-[11px] text-sky-300">
          Catch Rally: <strong className="text-white">{rallyCount}</strong>
        </span>
      )}

      {playMode === "bugs" && (
        <>
          <span className="font-mono text-[11px] text-rose-300">
            Bugs Left: <strong className="text-white">{bugsLeft}</strong>
          </span>
          <button
            type="button"
            onClick={onReleaseBugs}
            className="rounded-full bg-rose-500/90 px-2.5 py-0.5 font-medium text-white hover:bg-rose-500 transition-colors cursor-pointer"
          >
            Release More
          </button>
        </>
      )}

      {playMode === "dj" && (
        <>
          {SYNTH_PADS.map((pad) => {
            const lit = activePad === pad.key;
            return (
              <button
                key={pad.key}
                type="button"
                onClick={() => onHitPad(pad)}
                style={{
                  backgroundColor: lit ? pad.color : "rgba(255,255,255,0.06)",
                  borderColor: lit ? pad.color : "rgba(255,255,255,0.14)",
                }}
                className="rounded-md border px-2 py-0.5 font-mono text-[10px] font-bold text-white transition-transform active:scale-95 cursor-pointer"
              >
                {pad.label} · {pad.note}
              </button>
            );
          })}
          <button
            type="button"
            onClick={onToggleAutoJam}
            className={`rounded-full px-2.5 py-0.5 font-medium transition-colors cursor-pointer ${
              autoJam
                ? "bg-emerald-500 text-black"
                : "border border-white/15 bg-white/5 text-neutral-300 hover:text-white"
            }`}
          >
            {autoJam ? "Grooving ♫" : "Auto Groove"}
          </button>
        </>
      )}

      {micMode === "fallback" && (
        <button
          type="button"
          onClick={onFireClapPulse}
          className="rounded-full bg-violet-500 px-2.5 py-0.5 font-medium text-white hover:bg-violet-400 transition-colors cursor-pointer"
        >
          Clap Pulse ⚡
        </button>
      )}
    </div>
  );
}
