"use client";

import type { AccessoryId, CharacterStyleId } from "@/lib/data";

export interface CompanionAccessoriesSvgProps {
  accessory: AccessoryId;
  charStyle: CharacterStyleId;
  accentColor: string;
  trimColor: string;
}

const CHASSIS_ACCESSORY_TRANSFORMS: Record<CharacterStyleId, string | undefined> = {
  vinyl: undefined,
  aura: "translate(0 2)",
  bit: "translate(0 4) scale(0.98)",
  crt: "translate(-10 4) scale(0.96)",
  paper: "translate(0 -6) scale(0.96)",
  astro: "translate(0 2) scale(1.03)",
};

export function CompanionAccessoriesSvg({
  accessory,
  charStyle,
  accentColor,
  trimColor,
}: CompanionAccessoriesSvgProps) {
  if (accessory === "none") return null;

  return (
    <g className="pointer-events-none" transform={CHASSIS_ACCESSORY_TRANSFORMS[charStyle]}>
      {accessory === "halo" && (
        <g>
          <ellipse
            cx="170"
            cy="36"
            rx="44"
            ry="10"
            fill="none"
            stroke="#FBBF24"
            strokeWidth="5.5"
          />
          <ellipse
            cx="170"
            cy="36"
            rx="44"
            ry="10"
            fill="none"
            stroke="#FEF3C7"
            strokeWidth="2"
            opacity="0.85"
          />
        </g>
      )}

      {accessory === "shades" && (
        <g>
          <rect
            x="114"
            y="108"
            width="48"
            height="24"
            rx="6"
            fill="#0F172A"
            stroke="#1E293B"
            strokeWidth="2.5"
          />
          <rect
            x="178"
            y="108"
            width="48"
            height="24"
            rx="6"
            fill="#0F172A"
            stroke="#1E293B"
            strokeWidth="2.5"
          />
          <rect x="160" y="114" width="20" height="5" rx="2.5" fill="#1E293B" />
          <path
            d="M 121 113 L 136 113 L 125 127 Z"
            fill="#FFFFFF"
            opacity="0.32"
          />
          <path
            d="M 185 113 L 200 113 L 189 127 Z"
            fill="#FFFFFF"
            opacity="0.32"
          />
        </g>
      )}

      {accessory === "headphones" && (
        <g>
          <path
            d="M 96 142 C 92 66, 248 66, 244 142"
            fill="none"
            stroke="#27272A"
            strokeWidth="12"
            strokeLinecap="round"
          />
          <path
            d="M 98 138 C 96 72, 244 72, 242 138"
            fill="none"
            stroke={accentColor}
            strokeWidth="3.5"
            strokeLinecap="round"
            opacity="0.8"
          />
          <rect
            x="84"
            y="122"
            width="18"
            height="42"
            rx="9"
            fill="#18181B"
            stroke="#3F3F46"
            strokeWidth="2"
          />
          <rect
            x="238"
            y="122"
            width="18"
            height="42"
            rx="9"
            fill="#18181B"
            stroke="#3F3F46"
            strokeWidth="2"
          />
          <rect x="82" y="130" width="5" height="26" rx="2.5" fill={accentColor} />
          <rect x="253" y="130" width="5" height="26" rx="2.5" fill={accentColor} />
        </g>
      )}

      {accessory === "cat" && (
        <g>
          <path
            d="M 110 88 L 94 42 L 140 70 Z"
            fill="#27272A"
            stroke="#18181B"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <path d="M 111 81 L 101 52 L 130 70 Z" fill="#FDA4AF" />
          <path
            d="M 230 88 L 246 42 L 200 70 Z"
            fill="#27272A"
            stroke="#18181B"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <path d="M 229 81 L 239 52 L 210 70 Z" fill="#FDA4AF" />
        </g>
      )}

      {accessory === "crown" && (
        <g>
          <path
            d="M 134 70 L 138 38 L 156 54 L 170 30 L 184 54 L 202 38 L 206 70 Z"
            fill="#FBBF24"
            stroke="#B45309"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <circle cx="170" cy="54" r="4" fill="#EF4444" />
          <circle cx="150" cy="59" r="3" fill="#3B82F6" />
          <circle cx="190" cy="59" r="3" fill="#10B981" />
        </g>
      )}

      {accessory === "wizard" && (
        <g>
          <ellipse
            cx="170"
            cy="68"
            rx="68"
            ry="13"
            fill="#312E81"
            stroke="#1E1B4B"
            strokeWidth="2.2"
          />
          <path
            d="M 124 66 L 166 12 L 216 66 Z"
            fill="#4338CA"
            stroke="#1E1B4B"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <path
            d="M 135 55 Q 170 63 205 55"
            fill="none"
            stroke="#FBBF24"
            strokeWidth="5"
          />
          <circle cx="172" cy="37" r="3.5" fill="#FDE047" />
          <circle cx="155" cy="48" r="2.2" fill="#FDE047" />
        </g>
      )}

      {accessory === "propeller" && (
        <g>
          <path
            d="M 132 68 C 132 42, 208 42, 208 68 Z"
            fill={accentColor}
            stroke="#18181B"
            strokeWidth="2.2"
          />
          <path d="M 150 68 C 150 45, 190 45, 190 68 Z" fill="#FBBF24" />
          <rect x="167" y="42" width="6" height="9" rx="2" fill="#52525B" />
          <g data-mochi-el="propBlade">
            <rect
              x="130"
              y="38"
              width="80"
              height="6"
              rx="3"
              fill={trimColor}
              stroke="#18181B"
              strokeWidth="1.5"
            />
            <circle cx="170" cy="41" r="4.5" fill="#EF4444" />
          </g>
        </g>
      )}

      {accessory === "chef" && (
        <g>
          <path
            d="M 136 68 C 122 52, 126 26, 150 30 C 160 14, 184 14, 192 30 C 216 26, 218 52, 204 68 Z"
            fill="#FFFFFF"
            stroke="#CBD5E1"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <rect
            x="135"
            y="62"
            width="70"
            height="12"
            rx="4"
            fill="#F8FAFC"
            stroke="#CBD5E1"
            strokeWidth="2"
          />
        </g>
      )}

      {accessory === "box" && (
        <g>
          <rect
            x="104"
            y="54"
            width="132"
            height="112"
            rx="8"
            fill="#D6B17E"
            stroke="#9A7648"
            strokeWidth="2.5"
          />
          <line
            x1="104"
            y1="96"
            x2="236"
            y2="96"
            stroke="#9A7648"
            strokeWidth="2"
            opacity="0.7"
          />
          <rect x="122" y="108" width="38" height="22" rx="4" fill="#18181B" />
          <rect x="180" y="108" width="38" height="22" rx="4" fill="#18181B" />
          <circle cx="141" cy="119" r="5" fill="#FFFFFF" />
          <circle cx="199" cy="119" r="5" fill="#FFFFFF" />
          <text
            x="170"
            y="84"
            textAnchor="middle"
            fontSize="10"
            fontWeight="700"
            fill="#785832"
            fontFamily="monospace"
          >
            FRAGILE
          </text>
        </g>
      )}
    </g>
  );
}
