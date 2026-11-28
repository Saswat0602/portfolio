"use client";

import type { ReactNode } from "react";
import type { CharacterStyleId } from "@/lib/data";

export interface AuraAndBitChassisProps {
  charStyle: CharacterStyleId;
  spicyActive: boolean;
  faceNode: ReactNode;
}

export function AuraAndBitChassis({
  charStyle,
  spicyActive,
  faceNode,
}: AuraAndBitChassisProps) {
  if (charStyle !== "bit") return null;

  return (
    <g>
      <defs>
        <linearGradient id="mochi-bit-body" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFDF9" />
          <stop offset="65%" stopColor="#F2EFE8" />
          <stop offset="100%" stopColor="#DDD6CA" />
        </linearGradient>
      </defs>

      {/* Spring Antenna */}
      <g data-mochi-el="antR">
        <line x1="170" y1="80" x2="170" y2="40" stroke="#18181B" strokeWidth="4" strokeLinecap="round" />
        <circle cx="170" cy="34" r="8" fill="#E03E2D" stroke="#18181B" strokeWidth="2.2" />
        <circle cx="167.5" cy="31.5" r="2.5" fill="#FFFFFF" opacity="0.85" />
      </g>

      {/* Matte Chassis Pill */}
      <rect
        x="96"
        y="80"
        width="148"
        height="168"
        rx="42"
        fill={spicyActive ? "#EF4444" : "url(#mochi-bit-body)"}
        stroke="#18181B"
        strokeWidth="2.6"
      />

      {/* Swiss Orange Side Ear Buttons */}
      <rect x="85" y="136" width="12" height="32" rx="5" fill="#E03E2D" stroke="#18181B" strokeWidth="2" />
      <rect x="243" y="136" width="12" height="32" rx="5" fill="#E03E2D" stroke="#18181B" strokeWidth="2" />

      {/* Desk Monitor Visor */}
      <rect
        x="110"
        y="102"
        width="120"
        height="90"
        rx="22"
        fill="#111318"
        stroke="#18181B"
        strokeWidth="2.4"
      />
      {/* Hardware Speaker Grille */}
      <line x1="128" y1="214" x2="212" y2="214" stroke="#18181B" strokeWidth="2.2" strokeLinecap="round" opacity="0.22" />
      <circle cx="132" cy="230" r="3" fill="#18181B" opacity="0.4" />
      <circle cx="144" cy="230" r="3" fill="#18181B" opacity="0.4" />
      <circle cx="206" cy="230" r="4" fill="#10B981" />

      {faceNode}
    </g>
  );
}
