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
  if (charStyle === "aura") {
    return (
      <g>
        <defs>
          <radialGradient id="mochi-aura-body" cx="34%" cy="22%" r="78%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="48%" stopColor="#F8F6F1" />
            <stop offset="82%" stopColor="#E6E1D6" />
            <stop offset="100%" stopColor="#CEC7BA" />
          </radialGradient>
          <radialGradient id="mochi-aura-head" cx="34%" cy="20%" r="80%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#FAF8F4" />
            <stop offset="84%" stopColor="#EAE5DB" />
            <stop offset="100%" stopColor="#D3CCC0" />
          </radialGradient>
          <linearGradient id="mochi-aura-ear" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F9F6F0" />
            <stop offset="60%" stopColor="#E5DFD4" />
            <stop offset="100%" stopColor="#C9C1B3" />
          </linearGradient>
          <radialGradient id="mochi-aura-visor" cx="35%" cy="25%" r="80%">
            <stop offset="0%" stopColor="#1B2436" />
            <stop offset="60%" stopColor="#0D121D" />
            <stop offset="100%" stopColor="#06080F" />
          </radialGradient>
        </defs>

        {/* Whip Antenna */}
        <g data-mochi-el="antL">
          <path
            d="M 170 76 Q 166 50 171 32"
            fill="none"
            stroke="#B8A68E"
            strokeWidth="4.2"
            strokeLinecap="round"
          />
          <circle cx="171" cy="29" r="6" fill="#2563EB" stroke="rgba(24,22,20,0.16)" strokeWidth="1.4" />
          <circle cx="171" cy="29" r="2.6" fill="#60A5FA" />
        </g>

        {/* Ear Pods */}
        <rect
          x="78"
          y="126"
          width="20"
          height="46"
          rx="10"
          fill="url(#mochi-aura-ear)"
          stroke="rgba(24,22,20,0.14)"
          strokeWidth="1.6"
        />
        <rect x="83" y="139" width="4" height="20" rx="2" fill="#60A5FA" opacity="0.85" />
        <rect
          x="242"
          y="126"
          width="20"
          height="46"
          rx="10"
          fill="url(#mochi-aura-ear)"
          stroke="rgba(24,22,20,0.14)"
          strokeWidth="1.6"
        />
        <rect x="253" y="139" width="4" height="20" rx="2" fill="#60A5FA" opacity="0.85" />

        {/* Lower Sculpted Torso */}
        <path
          d="M 106 184 C 106 172, 234 172, 234 184 L 226 230 C 222 248, 200 256, 170 256 C 140 256, 118 248, 114 230 Z"
          fill={spicyActive ? "#EF4444" : "url(#mochi-aura-body)"}
          stroke="rgba(24,22,20,0.14)"
          strokeWidth="1.8"
        />
        <path d="M 118 198 Q 170 207 222 198" fill="none" stroke="rgba(24,22,20,0.10)" strokeWidth="1.6" />
        <rect x="150" y="218" width="40" height="8" rx="4" fill="rgba(24,22,20,0.10)" />
        <circle cx="170" cy="222" r="3.2" fill="#60A5FA" />

        {/* Sculpted Ceramic Head */}
        <rect
          x="90"
          y="74"
          width="160"
          height="128"
          rx="54"
          fill={spicyActive ? "#EF4444" : "url(#mochi-aura-head)"}
          stroke="rgba(24,22,20,0.14)"
          strokeWidth="1.8"
        />
        <path
          d="M 122 88 Q 170 76 218 88"
          fill="none"
          stroke="rgba(255,255,255,0.92)"
          strokeWidth="5"
          strokeLinecap="round"
          opacity="0.82"
        />

        {/* Recessed Obsidian OLED Visor */}
        <rect
          x="108"
          y="102"
          width="124"
          height="88"
          rx="34"
          fill="url(#mochi-aura-visor)"
          stroke="rgba(147,197,253,0.38)"
          strokeWidth="2.2"
        />
        <path
          d="M 124 114 Q 170 105 216 114"
          fill="none"
          stroke="rgba(255,255,255,0.22)"
          strokeWidth="3.5"
          strokeLinecap="round"
          pointerEvents="none"
        />

        {faceNode}
      </g>
    );
  }

  if (charStyle === "bit") {
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
        <line x1="128" y1="214" x2="212" y2="214" stroke="#18181B" strokeWidth="2.2" strokeLinecap="round" opacity="0.22" />
        <circle cx="132" cy="230" r="3" fill="#18181B" opacity="0.4" />
        <circle cx="144" cy="230" r="3" fill="#18181B" opacity="0.4" />
        <circle cx="206" cy="230" r="4" fill="#10B981" />

        {faceNode}
      </g>
    );
  }

  return null;
}
