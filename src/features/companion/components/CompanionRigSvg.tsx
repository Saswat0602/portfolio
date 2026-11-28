"use client";

import type { PointerEvent as ReactPointerEvent } from "react";
import type { CharacterStyleMeta, MoodMeta } from "@/lib/data";
import type { PortfolioHoverTarget } from "../types";
import { CompanionFaceExpressions } from "./CompanionFaceExpressions";

export interface CompanionRigSvgProps {
  isDark: boolean;
  styleMeta: CharacterStyleMeta;
  activeMoodMeta: MoodMeta;
  spicyActive: boolean;
  sourActive: boolean;
  dizzyActive: boolean;
  tickledActive: boolean;
  pettingActive: boolean;
  secretMode: boolean;
  photoPosing: boolean;
  isHeld: boolean;
  cursorSnatched: boolean;
  portfolioHover: PortfolioHoverTarget;
  onDoubleClick: () => void;
  onPointerMove: (e: ReactPointerEvent<SVGSVGElement>) => void;
  onPointerDown: (e: ReactPointerEvent<SVGSVGElement>) => void;
  onHeadPet: (e: ReactPointerEvent<SVGRectElement>) => void;
  onPokeKey: () => void;
  initialTransform?: string;
}

export function CompanionRigSvg({
  isDark,
  styleMeta,
  activeMoodMeta,
  spicyActive,
  sourActive,
  dizzyActive,
  tickledActive,
  pettingActive,
  secretMode,
  photoPosing,
  isHeld,
  cursorSnatched,
  portfolioHover,
  onDoubleClick,
  onPointerMove,
  onPointerDown,
  onHeadPet,
  onPokeKey,
  initialTransform = "translate3d(500px, 380px, 0) translate(-50%, -50%)",
}: CompanionRigSvgProps) {
  const charStyle = styleMeta.id;
  const displayMood = activeMoodMeta.id;

  const faceNode = (
    <g data-mochi-el="faceGroup">
      <g data-mochi-el="pupils">
        <CompanionFaceExpressions
          charStyle={charStyle}
          displayMood={displayMood}
          spicyActive={spicyActive}
          sourActive={sourActive}
          dizzyActive={dizzyActive}
          tickledActive={tickledActive}
          pettingActive={pettingActive}
          secretMode={secretMode}
          photoPosing={photoPosing}
          isHeld={isHeld}
        />
      </g>
    </g>
  );

  const footFill = charStyle === "crt" ? "#E03E2D" : charStyle === "astro" ? "#2563EB" : "#18181B";

  return (
    <div
      data-mochi-el="charWrap"
      data-mochi-rig
      className="pointer-events-auto absolute left-0 top-0 z-20 w-[216px] h-[216px] will-change-transform touch-none"
      style={{ transform: initialTransform }}
    >
      <svg
        viewBox="0 0 340 320"
        className="w-full h-full block overflow-visible cursor-grab active:cursor-grabbing"
        role="button"
        tabIndex={0}
        aria-label={`MOCHI-04 ${styleMeta.label} companion in ${activeMoodMeta.label} mood. Drag to fling, poke, or double-click to backflip.`}
        onDoubleClick={(e) => {
          e.stopPropagation();
          onDoubleClick();
        }}
        onPointerMove={onPointerMove}
        onPointerDown={onPointerDown}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onPokeKey();
          }
        }}
      >
        <defs>
          <radialGradient id="mochi-vinyl-grad" cx="34%" cy="24%" r="76%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="56%" stopColor="#FFF8EE" />
            <stop offset="86%" stopColor="#F2E6D8" />
            <stop offset="100%" stopColor="#DFCFBC" />
          </radialGradient>

          <radialGradient id="mochi-spicy-grad" cx="35%" cy="25%" r="76%">
            <stop offset="0%" stopColor="#FF8566" />
            <stop offset="55%" stopColor="#EF4444" />
            <stop offset="100%" stopColor="#991B1B" />
          </radialGradient>

          <linearGradient id="mochi-crt-shell" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FAF4E6" />
            <stop offset="65%" stopColor="#EAE0CC" />
            <stop offset="100%" stopColor="#D3C6AE" />
          </linearGradient>

          <pattern id="mochi-crt-scan" width="4" height="4" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="4" y2="0" stroke="#4ADE80" strokeOpacity="0.11" strokeWidth="1" />
          </pattern>

          <radialGradient id="mochi-paper-mask" cx="35%" cy="22%" r="78%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="70%" stopColor="#F7F4EC" />
            <stop offset="100%" stopColor="#E4DEC8" />
          </radialGradient>

          <radialGradient id="mochi-astro-suit" cx="30%" cy="20%" r="80%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="58%" stopColor="#EFF6FF" />
            <stop offset="100%" stopColor="#CBD5E1" />
          </radialGradient>

          <filter id="mochi-shadow" x="-20%" y="-20%" width="140%" height="145%">
            <feDropShadow
              dx="0"
              dy="8"
              stdDeviation="7"
              floodColor={isDark ? "#000000" : "#18181B"}
              floodOpacity={isDark ? "0.52" : "0.12"}
            />
          </filter>
        </defs>

        <g data-mochi-el="rigTransform" filter="url(#mochi-shadow)">
          <g data-mochi-el="footL">
            <rect x="130" y="246" width="30" height="19" rx="9.5" fill={footFill} stroke="#FFFFFF" strokeWidth="1.2" />
          </g>
          <g data-mochi-el="footR">
            <rect x="180" y="246" width="30" height="19" rx="9.5" fill={footFill} stroke="#FFFFFF" strokeWidth="1.2" />
          </g>

          <g data-mochi-el="bodyGroup">
            {charStyle === "crt" && (
              <g>
                <g data-mochi-el="antL">
                  <line x1="144" y1="82" x2="112" y2="30" stroke="#71717A" strokeWidth="3.5" strokeLinecap="round" />
                  <circle cx="112" cy="28" r="5.5" fill="#E03E2D" stroke="#18181B" strokeWidth="1.4" />
                </g>
                <g data-mochi-el="antR">
                  <line x1="196" y1="82" x2="228" y2="30" stroke="#71717A" strokeWidth="3.5" strokeLinecap="round" />
                  <circle cx="228" cy="28" r="5.5" fill="#E03E2D" stroke="#18181B" strokeWidth="1.4" />
                </g>
                <rect
                  x="84"
                  y="82"
                  width="172"
                  height="156"
                  rx="26"
                  fill={spicyActive ? "#EF4444" : "url(#mochi-crt-shell)"}
                  stroke="rgba(20, 20, 22, 0.24)"
                  strokeWidth="2"
                />
                <path d="M 86 212 H 254 V 218 A 20 20 0 0 1 234 238 H 106 A 20 20 0 0 1 86 218 Z" fill="#E03E2D" />
                <rect x="98" y="96" width="124" height="106" rx="18" fill="#18221D" stroke="#111318" strokeWidth="2.4" />
                <rect x="102" y="100" width="116" height="98" rx="15" fill="url(#mochi-crt-scan)" />
                <circle cx="238" cy="120" r="9" fill="#27272A" stroke="#F4F3EF" strokeWidth="1.4" />
                <line x1="238" y1="120" x2="244" y2="115" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
                <circle cx="238" cy="148" r="9" fill="#27272A" stroke="#F4F3EF" strokeWidth="1.4" />
                <line x1="238" y1="148" x2="233" y2="143" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
                {[172, 180, 188, 196].map((sy) => (
                  <line key={sy} x1="230" y1={sy} x2="246" y2={sy} stroke="#52525B" strokeWidth="2" strokeLinecap="round" />
                ))}
                <g transform="translate(-10 0)">{faceNode}</g>
              </g>
            )}

            {charStyle === "paper" && (
              <g>
                <polygon
                  points="102,248 134,198 170,224 206,198 238,248 170,262"
                  fill={spicyActive ? "#F87171" : "#FAF8F3"}
                  stroke="#D4A037"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
                <line x1="170" y1="224" x2="170" y2="262" stroke="#D4A037" strokeWidth="1.4" />
                <polygon
                  points="170,66 244,122 224,218 116,218 96,122"
                  fill={spicyActive ? "#EF4444" : "url(#mochi-paper-mask)"}
                  stroke="rgba(22, 22, 24, 0.22)"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
                <polyline points="170,66 170,218" stroke="rgba(22, 22, 24, 0.06)" strokeWidth="1.2" />
                <polygon points="170,84 177,98 170,110 163,98" fill="#D4A037" />
                {faceNode}
              </g>
            )}

            {charStyle === "astro" && (
              <g>
                <g>
                  <rect x="78" y="180" width="18" height="36" rx="8" fill="#CBD5E1" stroke="#334155" strokeWidth="1.5" />
                  <rect x="244" y="180" width="18" height="36" rx="8" fill="#CBD5E1" stroke="#334155" strokeWidth="1.5" />
                  <path data-mochi-el="boosterL" d="M 81 218 L 87 244 L 93 218 Z" fill="#38BDF8" opacity="0" />
                  <path data-mochi-el="boosterR" d="M 247 218 L 253 244 L 259 218 Z" fill="#38BDF8" opacity="0" />
                </g>
                <rect
                  x="92"
                  y="84"
                  width="156"
                  height="162"
                  rx="68"
                  fill={spicyActive ? "#EF4444" : "url(#mochi-astro-suit)"}
                  stroke="#2563EB"
                  strokeWidth="1.8"
                  strokeOpacity="0.45"
                />
                <rect x="142" y="216" width="56" height="14" rx="7" fill="#1E293B" />
                <circle cx="154" cy="223" r="3" fill="#38BDF8" />
                <circle cx="166" cy="223" r="3" fill="#F59E0B" />
                <rect x="176" y="220.5" width="14" height="5" rx="2.5" fill="#10B981" />
                <rect x="108" y="102" width="124" height="98" rx="46" fill="#0D111A" stroke="#93C5FD" strokeWidth="2.2" />
                {faceNode}
                <path
                  d="M 126 112 Q 170 98, 214 112 Q 204 128, 170 124 Q 136 128, 126 112 Z"
                  fill="#FFFFFF"
                  opacity="0.24"
                  pointerEvents="none"
                />
              </g>
            )}

            {charStyle === "vinyl" && (
              <g>
                <path
                  d="M 94 188 C 90 106, 124 74, 170 74 C 216 74, 250 106, 246 188 C 244 236, 214 252, 170 252 C 126 252, 96 236, 94 188 Z"
                  fill={spicyActive ? "url(#mochi-spicy-grad)" : "url(#mochi-vinyl-grad)"}
                  stroke="rgba(22, 22, 24, 0.16)"
                  strokeWidth="1.8"
                />
                <path d="M 128 96 Q 152 80, 182 86" fill="none" stroke="#FFFFFF" strokeWidth="5.5" strokeLinecap="round" opacity="0.85" />
                <circle cx="116" cy="108" r="3.2" fill="#FFFFFF" opacity="0.75" />
                {faceNode}
              </g>
            )}

            <rect x="104" y="62" width="132" height="46" rx="22" fill="transparent" onPointerMove={onHeadPet} />

            {displayMood === "paranoid" && (
              <g pointerEvents="none">
                <polygon
                  points="116,86 170,22 224,86 202,78 170,88 138,78"
                  fill="#D4D8E0"
                  stroke="#64748B"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
                <polyline points="170,22 154,82" stroke="#FFFFFF" strokeWidth="2" opacity="0.85" />
                <polyline points="170,22 192,80" stroke="#94A3B8" strokeWidth="1.5" />
              </g>
            )}

            {displayMood === "zen" && (
              <g data-mochi-el="halo" pointerEvents="none">
                <ellipse cx="170" cy="44" rx="46" ry="11" fill="none" stroke="#FDE68A" strokeWidth="6" opacity="0.3" />
                <ellipse cx="170" cy="44" rx="46" ry="11" fill="none" stroke="#F59E0B" strokeWidth="2.8" />
              </g>
            )}

            {displayMood === "sleepy" && (
              <g fill={styleMeta.accent} fontFamily='"JetBrains Mono", monospace' fontWeight="700" pointerEvents="none">
                <text x="234" y="88" fontSize="12" className="mochi-zzz-1">z</text>
                <text x="248" y="68" fontSize="15" className="mochi-zzz-2">Z</text>
                <text x="266" y="48" fontSize="18" className="mochi-zzz-3">z</text>
              </g>
            )}

            {spicyActive && (
              <g data-mochi-el="flame" pointerEvents="none">
                <path d="M 170 176 C 194 156, 246 154, 294 176 C 246 202, 194 198, 170 176 Z" fill="#FF4500" />
                <path d="M 172 176 C 192 164, 232 162, 266 176 C 232 190, 192 188, 172 176 Z" fill="#FACC15" />
              </g>
            )}
          </g>

          <g data-mochi-el="handL" pointerEvents="none">
            {charStyle === "paper" ? (
              <polygon points="-14,0 0,-14 14,0 0,14" fill="#FFFFFF" stroke="#D4A037" strokeWidth="1.6" />
            ) : (
              <rect x="-15" y="-12" width="30" height="24" rx="12" fill="#FFFBF3" stroke="rgba(22, 22, 24, 0.2)" strokeWidth="1.5" />
            )}
          </g>

          <g data-mochi-el="handR" pointerEvents="none">
            {charStyle === "paper" ? (
              <polygon points="-14,0 0,-14 14,0 0,14" fill="#FFFFFF" stroke="#D4A037" strokeWidth="1.6" />
            ) : (
              <rect x="-15" y="-12" width="30" height="24" rx="12" fill="#FFFBF3" stroke="rgba(22, 22, 24, 0.2)" strokeWidth="1.5" />
            )}

            {photoPosing && (
              <g stroke="#18181B" strokeWidth="3.5" strokeLinecap="round">
                <line x1="-4" y1="-10" x2="-9" y2="-28" />
                <line x1="4" y1="-10" x2="10" y2="-28" />
              </g>
            )}

            {displayMood === "smug" && !photoPosing && (
              <rect x="8" y="-5" width="16" height="7" rx="3.5" fill="#FFFBF3" stroke="#18181B" strokeWidth="1.3" />
            )}

            {cursorSnatched && (
              <g transform="translate(8 -24) rotate(-15) scale(1.25)">
                <polygon
                  points="0,0 0,20 5,15 9,23 12,21 8,13 15,13"
                  fill="#161618"
                  stroke="#FFFFFF"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
              </g>
            )}

            {portfolioHover === "projects" && (
              <g transform="translate(10 -18)">
                <circle cx="0" cy="0" r="11" fill="rgba(219, 234, 254, 0.55)" stroke="#2563EB" strokeWidth="2.4" />
                <line x1="8" y1="8" x2="17" y2="17" stroke="#18181B" strokeWidth="3.2" strokeLinecap="round" />
              </g>
            )}
          </g>
        </g>
      </svg>
    </div>
  );
}
