"use client";

import type { CharacterStyleId, MoodId } from "@/lib/data";

export function IconSun() {
  return (
    <svg viewBox="0 0 16 16" width="13.5" height="13.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
      <circle cx="8" cy="8" r="2.7" />
      <path d="M8 1.6v1.4M8 13v1.4M1.6 8H3M13 8h1.4M3.5 3.5l1 1M11.5 11.5l1 1M12.5 3.5l-1 1M4.5 11.5l-1 1" />
    </svg>
  );
}

export function IconMoon() {
  return (
    <svg viewBox="0 0 16 16" width="13.5" height="13.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M13 9.7A5.4 5.4 0 0 1 6.3 3a5.4 5.4 0 1 0 6.7 6.7Z" />
    </svg>
  );
}

export function IconSound({ on }: { on: boolean }) {
  return (
    <svg viewBox="0 0 16 16" width="13.5" height="13.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2.6 6.4h2.2L8 3.8v8.4L4.8 9.6H2.6V6.4Z" />
      {on ? (
        <path d="M10.6 5.8a3.2 3.2 0 0 1 0 4.4M12.4 4.2a5.4 5.4 0 0 1 0 7.6" />
      ) : (
        <path d="m10.8 6.2 3 3.6M13.8 6.2l-3 3.6" />
      )}
    </svg>
  );
}

export function IconLock({ locked }: { locked: boolean }) {
  return (
    <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3.5" y="7.2" width="9" height="6.8" rx="1.8" />
      {locked ? (
        <path d="M5.5 7.2V5.1a2.5 2.5 0 0 1 5 0v2.1" />
      ) : (
        <path d="M5.5 7.2V5.1a2.5 2.5 0 0 1 4.6-1.3" />
      )}
    </svg>
  );
}

export function IconSend() {
  return (
    <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2.5 8h11M9.2 3.8 13.5 8l-4.3 4.2" />
    </svg>
  );
}

export function PolaroidMiniPortrait({
  styleId,
  moodId,
}: {
  styleId: CharacterStyleId;
  moodId: MoodId;
}) {
  const bg =
    moodId === "dramatic"
      ? "#161824"
      : moodId === "existential"
        ? "#CBD5E1"
        : moodId === "hype"
          ? "#FEF3C7"
          : moodId === "lovestruck"
            ? "#FFE4E6"
            : "#EFECE5";

  const eyeColor = styleId === "crt" || styleId === "astro" ? "#60A5FA" : "#18181B";

  return (
    <svg viewBox="0 0 120 100" className="w-full h-full block" aria-hidden="true">
      <rect width="120" height="100" fill={bg} />
      {moodId === "dramatic" && (
        <polygon points="44,0 76,0 98,100 22,100" fill="rgba(255,250,230,0.22)" />
      )}
      {styleId === "vinyl" && (
        <path
          d="M32 74 C30 34, 44 18, 60 18 C76 18, 90 34, 88 74 C88 86, 76 90, 60 90 C44 90, 32 86, 32 74 Z"
          fill="#FFFBF3"
          stroke="#1A1918"
          strokeWidth="1.8"
        />
      )}
      {styleId === "crt" && (
        <g>
          <line x1="50" y1="24" x2="36" y2="8" stroke="#1A1918" strokeWidth="2" />
          <line x1="70" y1="24" x2="84" y2="8" stroke="#1A1918" strokeWidth="2" />
          <rect x="26" y="24" width="68" height="58" rx="10" fill="#F3E5CE" stroke="#1A1918" strokeWidth="1.8" />
          <rect x="33" y="31" width="44" height="38" rx="6" fill="#17211E" />
        </g>
      )}
      {styleId === "paper" && (
        <g>
          <polygon points="36,86 60,64 84,86" fill="#FAF8F3" stroke="#D4A037" strokeWidth="1.6" />
          <polygon points="60,16 88,42 78,74 42,74 32,42" fill="#FFFFFF" stroke="#1A1918" strokeWidth="1.6" />
        </g>
      )}
      {styleId === "astro" && (
        <g>
          <circle cx="60" cy="52" r="30" fill="#EFF6FF" stroke="#2563EB" strokeWidth="1.8" />
          <rect x="38" y="38" width="44" height="28" rx="14" fill="#111827" />
        </g>
      )}
      {styleId === "aura" && (
        <g>
          <line x1="60" y1="22" x2="60" y2="10" stroke="#94A3B8" strokeWidth="2" />
          <circle cx="60" cy="9" r="3" fill="#2563EB" />
          <rect x="28" y="22" width="64" height="58" rx="22" fill="#F8F6F1" stroke="#CBD5E1" strokeWidth="1.8" />
          <rect x="36" y="34" width="48" height="32" rx="14" fill="#0D121D" />
        </g>
      )}
      {styleId === "bit" && (
        <g>
          <line x1="60" y1="24" x2="60" y2="10" stroke="#1A1918" strokeWidth="2.2" />
          <circle cx="60" cy="9" r="4" fill="#E03E2D" stroke="#1A1918" strokeWidth="1.2" />
          <rect x="30" y="24" width="60" height="60" rx="18" fill="#F5F3EE" stroke="#1A1918" strokeWidth="1.8" />
          <rect x="37" y="33" width="46" height="32" rx="8" fill="#111318" />
        </g>
      )}
      <g fill={eyeColor}>
        <circle cx={styleId === "crt" ? 47 : 50} cy={51} r="4" />
        <path
          d={styleId === "crt" ? "M 58 51 Q 63 45, 68 51" : "M 66 51 Q 71 45, 76 51"}
          fill="none"
          stroke={eyeColor}
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </g>
      <circle cx="92" cy="64" r="6" fill="#FFFBF3" stroke="#1A1918" strokeWidth="1.4" />
      <path d="M90 58 L88 49 M94 58 L97 49" stroke="#1A1918" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
