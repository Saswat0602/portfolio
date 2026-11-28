"use client";

import type { CharacterStyleId, MoodId } from "@/lib/data";

export interface CompanionFaceExpressionsProps {
  charStyle: CharacterStyleId;
  displayMood: MoodId;
  spicyActive: boolean;
  sourActive: boolean;
  pizzaActive: boolean;
  dizzyActive: boolean;
  tickledActive: boolean;
  pettingActive: boolean;
  secretMode: boolean;
  photoPosing: boolean;
  isHeld: boolean;
}

export function CompanionFaceExpressions({
  charStyle,
  displayMood,
  spicyActive,
  sourActive,
  pizzaActive,
  dizzyActive,
  tickledActive,
  pettingActive,
  secretMode,
  photoPosing,
  isHeld,
}: CompanionFaceExpressionsProps) {
  const isLightFace = charStyle === "vinyl" || charStyle === "paper";
  const primaryInk = spicyActive
    ? "#FFFFFF"
    : isLightFace
      ? "#18181B"
      : charStyle === "crt"
        ? "#4ADE80"
        : "#60A5FA";
  const cheekCol = "#FB7185";
  const m = displayMood;

  if (sourActive) {
    return (
      <g stroke={primaryInk} strokeWidth="4.2" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <polyline points="132,140 156,152 132,164" />
        <polyline points="208,140 184,152 208,164" />
        <path d="M 162 162 Q 170 154, 178 162 Q 170 170, 162 162" strokeWidth="3.2" />
      </g>
    );
  }

  if (dizzyActive) {
    return (
      <g stroke={primaryInk} strokeWidth="3" strokeLinecap="round" fill="none">
        <path d="M 144 150 m 0 -1 a 2 2 0 1 1 -2 2 a 5 5 0 1 1 5 5 a 9 9 0 1 1 -9 -9" />
        <path d="M 196 150 m 0 -1 a 2 2 0 1 1 -2 2 a 5 5 0 1 1 5 5 a 9 9 0 1 1 -9 -9" />
        <path d="M 160 176 Q 165 170, 170 176 T 180 176" strokeWidth="2.4" />
      </g>
    );
  }

  if (tickledActive || pettingActive) {
    return (
      <g>
        <ellipse cx="126" cy="166" rx="10" ry="5.5" fill={cheekCol} opacity="0.55" />
        <ellipse cx="214" cy="166" rx="10" ry="5.5" fill={cheekCol} opacity="0.55" />
        <g stroke={primaryInk} strokeWidth="4.2" strokeLinecap="round" fill="none">
          <path d="M 131 155 Q 144 136, 157 155" />
          <path d="M 183 155 Q 196 136, 209 155" />
          <path d="M 157 166 Q 170 184, 183 166 Z" fill={tickledActive ? "#FB7185" : "none"} strokeWidth="2.8" />
        </g>
      </g>
    );
  }

  if (pizzaActive) {
    return (
      <g>
        <ellipse cx="123" cy="168" rx="11.5" ry="6" fill="#FB923C" opacity="0.65" />
        <ellipse cx="217" cy="168" rx="11.5" ry="6" fill="#FB923C" opacity="0.65" />
        <g stroke={primaryInk} strokeWidth="4" strokeLinecap="round" fill="none">
          <path d="M 131 151 Q 144 137, 157 151" />
          <path d="M 183 151 Q 196 137, 209 151" />
        </g>
        <path
          d="M 154 166 Q 170 192, 186 166 Z"
          fill="#FB7185"
          stroke={primaryInk}
          strokeWidth="2.8"
          strokeLinejoin="round"
        />
        <ellipse cx="170" cy="176" rx="7" ry="4" fill="#F43F5E" />
        <polygon points="168,125 174,113 181,123" fill="#F59E0B" stroke={primaryInk} strokeWidth="1.2" />
      </g>
    );
  }

  if (m === "lovestruck") {
    return (
      <g>
        <ellipse cx="126" cy="168" rx="11" ry="6" fill={cheekCol} opacity="0.6" />
        <ellipse cx="214" cy="168" rx="11" ry="6" fill={cheekCol} opacity="0.6" />
        <g fill="#F43F5E">
          <path d="M 144 166 C 128 154, 128 137, 137 137 C 142 137, 144 142, 144 142 C 144 142, 146 137, 151 137 C 160 137, 160 154, 144 166 Z" />
          <path d="M 196 166 C 180 154, 180 137, 189 137 C 194 137, 196 142, 196 142 C 196 142, 198 137, 203 137 C 212 137, 212 154, 196 166 Z" />
        </g>
        <path d="M 161 174 Q 170 182, 179 174" fill="none" stroke={primaryInk} strokeWidth="2.6" strokeLinecap="round" />
      </g>
    );
  }

  if (m === "hype") {
    return (
      <g>
        <path d="M 144 131 L 148 145 L 162 149 L 148 153 L 144 167 L 140 153 L 126 149 L 140 145 Z" fill="#F59E0B" />
        <path d="M 196 131 L 200 145 L 214 149 L 200 153 L 196 167 L 192 153 L 178 149 L 192 145 Z" fill="#F59E0B" />
        <path d="M 157 170 Q 170 186, 183 170 Z" fill="#FB7185" stroke={primaryInk} strokeWidth="2.4" />
      </g>
    );
  }

  if (m === "caffeinated") {
    return (
      <g>
        {[144, 196].map((ex) => (
          <g key={ex}>
            <circle cx={ex} cy="150" r="15" fill="#FFFFFF" stroke={primaryInk} strokeWidth="2.6" />
            <circle cx={ex} cy="150" r="9.5" fill="none" stroke="#E03E2D" strokeWidth="2" strokeDasharray="4 3" />
            <circle cx={ex} cy="150" r="4" fill="#141416" />
          </g>
        ))}
        <path d="M 157 176 L 163 181 L 170 175 L 177 181 L 183 176" fill="none" stroke={primaryInk} strokeWidth="2.5" strokeLinecap="round" />
      </g>
    );
  }

  if (m === "dramatic") {
    return (
      <g>
        <rect x="135" y="156" width="16" height="46" rx="8" fill="#38BDF8" opacity="0.72" className="mochi-tear-flow" />
        <rect x="189" y="156" width="16" height="46" rx="8" fill="#38BDF8" opacity="0.72" className="mochi-tear-flow" />
        <g stroke={primaryInk} strokeWidth="3.8" strokeLinecap="round" fill="none">
          <path d="M 132 152 Q 144 162, 156 152" />
          <path d="M 184 152 Q 196 162, 208 152" />
          <path d="M 158 180 Q 170 168, 182 180" strokeWidth="2.8" />
        </g>
      </g>
    );
  }

  if (m === "zen") {
    return (
      <g stroke={primaryInk} strokeWidth="3.2" strokeLinecap="round" fill="none">
        <path d="M 132 153 Q 144 162, 156 153" />
        <path d="M 184 153 Q 196 162, 208 153" />
        <path d="M 163 172 Q 170 177, 177 172" strokeWidth="2.4" />
      </g>
    );
  }

  if (m === "sleepy") {
    return (
      <g>
        <g stroke={primaryInk} strokeWidth="3.4" strokeLinecap="round" fill="none" opacity="0.8">
          <path d="M 132 154 Q 144 161, 156 154" />
          <path d="M 184 154 Q 196 161, 208 154" />
          <ellipse cx="170" cy="175" rx="4.5" ry="5.5" strokeWidth="2.2" />
        </g>
        <circle
          data-mochi-el="snotBubble"
          cx="182"
          cy="168"
          r="9"
          fill="rgba(186, 230, 253, 0.52)"
          stroke="#7DD3FC"
          strokeWidth="1.4"
        />
      </g>
    );
  }

  if (m === "existential") {
    return (
      <g>
        <circle cx="144" cy="150" r="11" fill="#FFFFFF" stroke={primaryInk} strokeWidth="2.4" />
        <circle cx="196" cy="150" r="11" fill="#FFFFFF" stroke={primaryInk} strokeWidth="2.4" />
        <circle cx="144" cy="150" r="2.2" fill="#18181B" />
        <circle cx="196" cy="150" r="2.2" fill="#18181B" />
        <line x1="160" y1="176" x2="180" y2="176" stroke={primaryInk} strokeWidth="2.4" strokeLinecap="round" />
      </g>
    );
  }

  const mouthPath =
    spicyActive || isHeld
      ? "M 164 174 A 6 7 0 1 0 176 174 A 6 7 0 1 0 164 174"
      : m === "grumpy"
        ? "M 159 179 Q 170 171, 181 179"
        : m === "smug"
          ? "M 161 175 Q 173 181, 184 169"
          : m === "paranoid"
            ? "M 160 177 Q 165 173, 170 177 T 180 177"
            : "M 161 173 Q 170 182, 179 173";

  return (
    <g>
      {(m === "playful" || secretMode || photoPosing) && (
        <g fill={cheekCol} opacity="0.42">
          <ellipse cx="124" cy="166" rx="9" ry="5" />
          <ellipse cx="216" cy="166" rx="9" ry="5" />
        </g>
      )}

      <g data-mochi-el="eyeL">
        <rect x="133" y="135" width="22" height="30" rx="11" fill={primaryInk} />
        <circle cx="140" cy="143" r="4.2" fill="#FFFFFF" />
        <circle cx="148" cy="156" r="1.8" fill="#FFFFFF" opacity="0.7" />
      </g>

      {photoPosing ? (
        <path d="M 184 151 Q 196 138, 208 151" fill="none" stroke={primaryInk} strokeWidth="4" strokeLinecap="round" />
      ) : (
        <g data-mochi-el="eyeR">
          <rect x="185" y="135" width="22" height="30" rx="11" fill={primaryInk} />
          <circle cx="192" cy="143" r="4.2" fill="#FFFFFF" />
          <circle cx="200" cy="156" r="1.8" fill="#FFFFFF" opacity="0.7" />
        </g>
      )}

      {m === "grumpy" && (
        <g stroke={primaryInk} strokeWidth="5.2" strokeLinecap="round">
          <line x1="128" y1="128" x2="160" y2="142" />
          <line x1="212" y1="128" x2="180" y2="142" />
        </g>
      )}
      {m === "smug" && (
        <g stroke={primaryInk} strokeWidth="4.2" strokeLinecap="round">
          <line x1="130" y1="138" x2="158" y2="138" />
          <path d="M 182 132 Q 196 122, 210 134" fill="none" strokeWidth="3.2" />
        </g>
      )}
      {m === "sneaky" && (
        <g stroke={primaryInk} strokeWidth="4.2" strokeLinecap="round">
          <line x1="130" y1="139" x2="158" y2="141" />
          <line x1="182" y1="141" x2="210" y2="139" />
        </g>
      )}
      {m === "paranoid" && (
        <g stroke={primaryInk} strokeWidth="3.2" strokeLinecap="round" fill="none">
          <path d="M 129 129 Q 144 121, 158 131" />
          <path d="M 182 131 Q 196 121, 211 129" />
        </g>
      )}

      {m === "sneaky" && (
        <path
          d="M 170 169 C 162 162, 150 165, 144 174 C 154 177, 164 174, 170 172 C 176 174, 186 177, 196 174 C 190 165, 178 162, 170 169 Z"
          fill="#18181B"
          stroke="#FFFFFF"
          strokeWidth="0.8"
        />
      )}

      {m !== "sneaky" && (
        <path
          d={mouthPath}
          fill={spicyActive ? "#F59E0B" : "none"}
          stroke={primaryInk}
          strokeWidth="2.8"
          strokeLinecap="round"
        />
      )}
    </g>
  );
}
