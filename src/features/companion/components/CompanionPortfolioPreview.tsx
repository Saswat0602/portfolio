"use client";

import type { Dispatch, FormEvent, SetStateAction } from "react";
import Link from "next/link";
import {
  CHARACTER_STYLES,
  COMPANION_PORTFOLIO_PROJECTS,
  type CharacterStyleId,
  type CharacterStyleMeta,
  type MoodId,
  type SnackId,
} from "@/lib/data";
import type { CompanionThemeTokens, PortfolioHoverTarget } from "../types";
import { IconSend } from "./CompanionIcons";

export interface CompanionQuickPopoverProps {
  ui: CompanionThemeTokens;
  styleMeta: CharacterStyleMeta;
  charStyle: CharacterStyleId;
  onSelectStyle: (id: CharacterStyleId) => void;
  mood: MoodId;
  onSelectMood: (id: MoodId) => void;
  onThrowSnack: (kind: SnackId) => void;
  onPhotoBooth: () => void;
  onChaosPrank: () => void;
  onClose: () => void;
  chatText: string;
  setChatText: Dispatch<SetStateAction<string>>;
  setChatFocused: Dispatch<SetStateAction<boolean>>;
  onChatSubmit: (e: FormEvent<HTMLFormElement>) => void;
  studioHref?: string;
  positionClassName?: string;
}

const QUICK_MOODS: readonly MoodId[] = ["playful", "smug", "hype", "lovestruck", "zen", "dramatic"];

export function CompanionQuickPopover({
  ui,
  styleMeta,
  charStyle,
  onSelectStyle,
  mood,
  onSelectMood,
  onThrowSnack,
  onPhotoBooth,
  onChaosPrank,
  onClose,
  chatText,
  setChatText,
  setChatFocused,
  onChatSubmit,
  studioHref,
  positionClassName = "absolute bottom-6 left-5 sm:left-8 z-40",
}: CompanionQuickPopoverProps) {
  return (
    <div
      className={`mochi-pop pointer-events-auto ${positionClassName} w-[312px] max-w-[calc(100vw-2rem)] rounded-2xl p-3.5 space-y-3`}
      style={{
        backgroundColor: ui.surface,
        border: `1px solid ${ui.borderStrong}`,
        boxShadow: ui.shadow,
      }}
    >
      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.1em]" style={{ color: ui.muted }}>
        <span>{styleMeta.label} · Quick Widget</span>
        <div className="flex items-center gap-2">
          {studioHref && (
            <Link
              href={studioHref}
              className="font-mono text-[10px] hover:underline"
              style={{ color: styleMeta.accent }}
            >
              Full Studio →
            </Link>
          )}
          <button type="button" aria-label="Close quick widget" onClick={onClose} className="cursor-pointer font-bold">
            ×
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-1">
        {CHARACTER_STYLES.map((st) => (
          <button
            key={st.id}
            type="button"
            onClick={() => onSelectStyle(st.id)}
            className="m4-focus rounded-full px-2 py-0.5 font-mono text-[9.5px] cursor-pointer"
            style={{
              backgroundColor: charStyle === st.id ? `${st.accent}24` : ui.recessed,
              color: charStyle === st.id ? st.accent : ui.muted,
              border: charStyle === st.id ? `1px solid ${st.accent}66` : "1px solid transparent",
            }}
          >
            {st.label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-1">
        {QUICK_MOODS.map((mId) => (
          <button
            key={mId}
            type="button"
            onClick={() => onSelectMood(mId)}
            className="m4-focus rounded-full px-2 py-0.5 font-mono text-[9.5px] cursor-pointer capitalize"
            style={{
              backgroundColor: mood === mId ? styleMeta.accent : ui.recessed,
              color: mood === mId ? "#FFFFFF" : ui.ink,
            }}
          >
            {mId}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-1.5">
        <button
          type="button"
          onClick={() => onThrowSnack("pepper")}
          className="m4-focus rounded-full px-2.5 py-1 font-mono text-[10px] cursor-pointer"
          style={{ backgroundColor: ui.recessed, color: ui.ink }}
        >
          🌶️ Feed Pepper
        </button>
        <button
          type="button"
          onClick={onPhotoBooth}
          className="m4-focus rounded-full px-2.5 py-1 font-mono text-[10px] cursor-pointer"
          style={{ backgroundColor: ui.recessed, color: ui.ink }}
        >
          📸 Photo
        </button>
        <button
          type="button"
          onClick={onChaosPrank}
          className="m4-focus rounded-full px-2.5 py-1 font-mono text-[10px] cursor-pointer"
          style={{ backgroundColor: "#E03E2D1A", color: "#E03E2D" }}
        >
          😈 Prank
        </button>
      </div>

      <form
        onSubmit={onChatSubmit}
        onPointerDown={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        className="flex items-center gap-1.5 select-text"
      >
        <input
          type="text"
          value={chatText}
          onFocus={() => setChatFocused(true)}
          onBlur={() => setChatFocused(false)}
          onChange={(e) => setChatText(e.target.value)}
          onPointerDown={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
          placeholder="Say hi, roast, joke, friday, flip…"
          className="flex-1 min-w-0 select-text pointer-events-auto rounded-lg px-2.5 py-1.5 text-xs outline-none"
          style={{ backgroundColor: ui.recessed, color: ui.ink }}
        />
        <button
          type="submit"
          aria-label="Send message"
          className="m4-focus rounded-lg px-2.5 py-1.5 cursor-pointer"
          style={{ backgroundColor: styleMeta.accent, color: "#FFFFFF" }}
        >
          <IconSend />
        </button>
      </form>
    </div>
  );
}

export interface CompanionPortfolioPreviewProps {
  ui: CompanionThemeTokens;
  styleMeta: CharacterStyleMeta;
  setPortfolioHover: Dispatch<SetStateAction<PortfolioHoverTarget>>;
  triggerHireHearts: () => void;
  say: (text: string, holdMs?: number, silent?: boolean) => void;
  triggerBackflip: () => void;
}

export function CompanionPortfolioPreview({
  ui,
  styleMeta,
  setPortfolioHover,
  triggerHireHearts,
  say,
  triggerBackflip,
}: CompanionPortfolioPreviewProps) {
  return (
    <div className="relative z-10 w-full h-full overflow-y-auto px-6 sm:px-12 py-10 pb-36">
      <div className="mx-auto max-w-4xl space-y-10">
        <div
          className="pb-4 flex flex-wrap items-center justify-between gap-4"
          style={{ borderBottom: `1px solid ${ui.borderStrong}` }}
        >
          <span className="font-mono text-xs font-semibold tracking-[0.08em]">
            STUDIO PORTFOLIO · WIDGET PREVIEW
          </span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onMouseEnter={() => {
                setPortfolioHover("resume");
                say("Clean Swiss layout. Zero fake 95% skill bars.", 2800, true);
              }}
              onMouseLeave={() => setPortfolioHover(null)}
              className="m4-focus rounded-full px-3.5 py-1.5 font-mono text-[11px] cursor-pointer"
              style={{ border: `1px solid ${ui.borderStrong}`, color: ui.ink }}
            >
              Resume
            </button>
            <button
              type="button"
              onMouseEnter={() => {
                setPortfolioHover("hire");
                triggerHireHearts();
                say("YES! HIRE IMMEDIATELY! 10/10 TEAM VELOCITY!", 3000, true);
              }}
              onMouseLeave={() => setPortfolioHover(null)}
              onClick={() => {
                triggerBackflip();
                say("HIRED?! Throwing confetti across production!!", 3000, true);
              }}
              className="m4-focus rounded-full px-4 py-1.5 font-mono text-[11px] font-semibold cursor-pointer"
              style={{ backgroundColor: styleMeta.accent, color: "#FFFFFF" }}
            >
              Hire Me ✦
            </button>
          </div>
        </div>

        <div className="space-y-4 max-w-2xl">
          <h3
            className="m-0 font-bold tracking-[-0.04em] leading-[1.02]"
            style={{ fontSize: "clamp(2rem, 4.6vw, 3.6rem)" }}
          >
            Building playful,{" "}
            <span className="font-serif-it font-normal" style={{ fontSize: "1.14em" }}>
              unforgettable
            </span>{" "}
            web software.
          </h3>
          <p className="m-0 text-sm sm:text-base leading-relaxed" style={{ color: ui.muted }}>
            Hover over <strong>Hire Me</strong> or any project below—your chosen{" "}
            <strong>{styleMeta.label}</strong> lives interactively in the corner. Click it to open its
            mini mood/chat widget, or drag and fling it across the canvas!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {COMPANION_PORTFOLIO_PROJECTS.map((proj) => (
            <article
              key={proj.id}
              onMouseEnter={() => {
                setPortfolioHover("projects");
                say(proj.quip, 3200, true);
              }}
              onMouseLeave={() => setPortfolioHover(null)}
              className="rounded-2xl p-5 flex flex-col justify-between gap-4 transition-transform duration-200 hover:-translate-y-1 cursor-default"
              style={{
                backgroundColor: ui.surface,
                border: `1px solid ${ui.borderStrong}`,
                boxShadow: ui.shadow,
              }}
            >
              <div className="space-y-2">
                <span className="font-mono text-[10.5px]" style={{ color: styleMeta.accent }}>
                  {proj.num}
                </span>
                <h4 className="m-0 text-base font-semibold tracking-[-0.02em]">{proj.title}</h4>
              </div>
              <div className="font-mono text-[10px] leading-relaxed" style={{ color: ui.muted }}>
                {proj.tag}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
