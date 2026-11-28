import userData, { type ProjectData } from "./userdata";

export type CharacterStyleId = "vinyl" | "crt" | "paper" | "astro" | "aura" | "bit";

export type AuraFinishId = "pearl" | "obsidian" | "vermilion" | "matcha" | "iridescent";

export type AccessoryId =
  | "none"
  | "halo"
  | "shades"
  | "headphones"
  | "cat"
  | "crown"
  | "wizard"
  | "propeller"
  | "chef"
  | "box";

export type PlayModeId = "interact" | "laser" | "magnet" | "catch" | "paint" | "bugs" | "dj";

export type MoodId =
  | "playful"
  | "smug"
  | "dramatic"
  | "caffeinated"
  | "grumpy"
  | "lovestruck"
  | "sneaky"
  | "existential"
  | "hype"
  | "paranoid"
  | "zen"
  | "sleepy";

export type SnackId = "pepper" | "lemon" | "espresso" | "pizza" | "bug";

export interface CharacterStyleMeta {
  id: CharacterStyleId;
  label: string;
  accent: string;
  tag: string;
}

export interface AuraFinishMeta {
  id: AuraFinishId;
  name: string;
  dot: string;
  trim: string;
  eye: string;
  eyeBright: string;
  body: readonly [string, string, string, string];
  head: readonly [string, string, string, string];
  paw: readonly [string, string, string];
  ear: readonly [string, string, string];
  stroke: string;
  seam: string;
  spec: string;
  rimCool: string;
  antenna: string;
}

export interface AccessoryMeta {
  id: AccessoryId;
  label: string;
}

export interface PlayModeMeta {
  id: PlayModeId;
  label: string;
  hint: string;
}

export interface SynthPadMeta {
  key: string;
  label: string;
  note: string;
  hz: number;
  color: string;
}

export interface ArtRatingMeta {
  title: string;
  score: string;
  note: string;
}

export interface MoodMeta {
  id: MoodId;
  label: string;
  pitch: number;
  quips: readonly string[];
}

export interface SnackMeta {
  id: SnackId;
  emoji: string;
  label: string;
  color: string;
}

export interface CompanionProjectCard {
  id: string;
  num: string;
  title: string;
  tag: string;
  quip: string;
  slug: string;
}

export interface RainDropSeed {
  x: number;
  y: number;
  spd: number;
}

export const CHARACTER_STYLES: readonly CharacterStyleMeta[] = [
  { id: "vinyl", label: "Vinyl Mochi", accent: "#FF6B4A", tag: "DESIGNER TOY" },
  { id: "aura", label: "AURA-03", accent: "#2563EB", tag: "CERAMIC BOT" },
  { id: "bit", label: "BIT-02", accent: "#E03E2D", tag: "DESKTOP MISCHIEF" },
  { id: "crt", label: "Retro CRT", accent: "#10B981", tag: "1984 POCKET TV" },
  { id: "paper", label: "Paper Spirit", accent: "#D4A037", tag: "ORIGAMI MASK" },
  { id: "astro", label: "Astro Pod", accent: "#38BDF8", tag: "SPACE CAPSULE" },
] as const;

export const AURA_FINISHES: Record<AuraFinishId, AuraFinishMeta> = {
  pearl: {
    id: "pearl",
    name: "Ceramic Pearl",
    dot: "#F3EFE6",
    trim: "#D8C3A5",
    eye: "#2563EB",
    eyeBright: "#60A5FA",
    body: ["#FFFFFF", "#F8F6F1", "#E6E1D6", "#CEC7BA"],
    head: ["#FFFFFF", "#FAF8F4", "#EAE5DB", "#D3CCC0"],
    paw: ["#FFFFFF", "#F3EFE7", "#DAD4C8"],
    ear: ["#F9F6F0", "#E5DFD4", "#C9C1B3"],
    stroke: "rgba(24, 22, 20, 0.14)",
    seam: "rgba(24, 22, 20, 0.10)",
    spec: "rgba(255, 255, 255, 0.94)",
    rimCool: "rgba(147, 197, 253, 0.35)",
    antenna: "#B8A68E",
  },
  obsidian: {
    id: "obsidian",
    name: "Obsidian Chrome",
    dot: "#18181D",
    trim: "#9CA3AF",
    eye: "#06B6D4",
    eyeBright: "#22D3EE",
    body: ["#3C404D", "#23252E", "#16171D", "#0D0E12"],
    head: ["#454A59", "#272A34", "#181920", "#0E0F14"],
    paw: ["#404554", "#242730", "#14151B"],
    ear: ["#3A3E4C", "#21242C", "#121318"],
    stroke: "rgba(255, 255, 255, 0.16)",
    seam: "rgba(255, 255, 255, 0.10)",
    spec: "rgba(255, 255, 255, 0.34)",
    rimCool: "rgba(34, 211, 238, 0.38)",
    antenna: "#788092",
  },
  vermilion: {
    id: "vermilion",
    name: "Swiss Vermilion",
    dot: "#E84A27",
    trim: "#F6F1E7",
    eye: "#F59E0B",
    eyeBright: "#FFF7ED",
    body: ["#FF805D", "#EC522E", "#C93A18", "#99260C"],
    head: ["#FF8C6B", "#EE5631", "#CE3D1B", "#A0290E"],
    paw: ["#FF8563", "#E64C27", "#BA3414"],
    ear: ["#F8F3E9", "#E5DDD0", "#CBC1B2"],
    stroke: "rgba(56, 14, 4, 0.22)",
    seam: "rgba(56, 14, 4, 0.15)",
    spec: "rgba(255, 248, 240, 0.72)",
    rimCool: "rgba(255, 237, 213, 0.45)",
    antenna: "#D6CEC0",
  },
  matcha: {
    id: "matcha",
    name: "Matcha Ceramic",
    dot: "#D8E2DC",
    trim: "#C8A464",
    eye: "#059669",
    eyeBright: "#10B981",
    body: ["#F1F6F3", "#DCE6E0", "#C2D1C8", "#A5B7AC"],
    head: ["#F4F8F5", "#E0EAE4", "#C6D5CC", "#AABBB1"],
    paw: ["#EFF5F1", "#D6E2DB", "#B8C8BF"],
    ear: ["#E4D2AE", "#C8A464", "#9A7940"],
    stroke: "rgba(20, 38, 29, 0.15)",
    seam: "rgba(20, 38, 29, 0.11)",
    spec: "rgba(255, 255, 255, 0.90)",
    rimCool: "rgba(167, 243, 208, 0.40)",
    antenna: "#B59457",
  },
  iridescent: {
    id: "iridescent",
    name: "Iridescent Pearl",
    dot: "#E4D8F8",
    trim: "#E8B4F8",
    eye: "#A855F7",
    eyeBright: "#C084FC",
    body: ["#FFF8FD", "#EFE7FB", "#DDD6F6", "#C8C6EC"],
    head: ["#FFFAFE", "#F3ECFD", "#E2DAF8", "#CCC9EE"],
    paw: ["#FDF7FC", "#EAE2FA", "#CFCBEB"],
    ear: ["#F8E8FA", "#DEC8F5", "#C2B2E6"],
    stroke: "rgba(59, 32, 92, 0.15)",
    seam: "rgba(59, 32, 92, 0.10)",
    spec: "rgba(255, 255, 255, 0.95)",
    rimCool: "rgba(192, 132, 252, 0.42)",
    antenna: "#B9A3DE",
  },
};

export const ACCESSORIES: readonly AccessoryMeta[] = [
  { id: "none", label: "None" },
  { id: "halo", label: "Halo Ring" },
  { id: "shades", label: "Cyber Shades" },
  { id: "headphones", label: "Headphones" },
  { id: "cat", label: "Cat Ears" },
  { id: "crown", label: "Gold Crown" },
  { id: "wizard", label: "Wizard Hat" },
  { id: "propeller", label: "Propeller" },
  { id: "chef", label: "Chef Hat" },
  { id: "box", label: "Stealth Box" },
] as const;

export const PLAY_MODES: readonly PlayModeMeta[] = [
  { id: "interact", label: "Interact", hint: "Rub head · Hold to squish-launch · Drag to fling · Click to poke" },
  { id: "laser", label: "Laser", hint: "Move pointer to tease with crimson laser (Esc to exit)" },
  { id: "magnet", label: "Magnet", hint: "Orbits cursor · Click anywhere to fire magnetic repel pulse" },
  { id: "catch", label: "Catch", hint: "Move cursor paddle to rally the glowing sphere!" },
  { id: "paint", label: "Paint", hint: "Drag to paint elastic ink trampolines · Click Critique Art" },
  { id: "bugs", label: "Bugs", hint: "Hunting rogue production bugs with laser zaps!" },
  { id: "dj", label: "DJ Jam", hint: "Tap synth pads or press A S D F G H J on keyboard!" },
] as const;

export const SYNTH_PADS: readonly SynthPadMeta[] = [
  { key: "a", label: "A", note: "C4", hz: 261.63, color: "#2563EB" },
  { key: "s", label: "S", note: "D4", hz: 293.66, color: "#0EA5E9" },
  { key: "d", label: "D", note: "E4", hz: 329.63, color: "#10B981" },
  { key: "f", label: "F", note: "F4", hz: 349.23, color: "#84CC16" },
  { key: "g", label: "G", note: "G4", hz: 392.0, color: "#F59E0B" },
  { key: "h", label: "H", note: "A4", hz: 440.0, color: "#EA580C" },
  { key: "j", label: "J", note: "C5", hz: 523.25, color: "#C084FC" },
] as const;

export const BUG_TAGS: readonly string[] = ["NaN", "500", "null", "CORS", "404", "OOM", "ENV"] as const;

export const ART_RATINGS: readonly ArtRatingMeta[] = [
  { title: "Untitled Trampoline No. 4", score: "9.8 / 10", note: "Exquisite spring tension. The Guggenheim is calling." },
  { title: "Study in Caffeinated Bezier", score: "8.9 / 10", note: "Fearless curvature. Bounces cleanly at 60 FPS." },
  { title: "Late-Night CSS Refactor", score: "6.4 / 10", note: "Chaotic, mildly unstable, deeply relatable." },
  { title: "Minimalist Horizon IV", score: "9.4 / 10", note: "Dieter Rams himself would nod silently in approval." },
  { title: "Kinetic Doodle (Archival)", score: "10 / 10", note: "A masterpiece of human-robot collaboration." },
] as const;

export const CATCH_QUIPS_HIT: readonly string[] = [
  "TOO SLOW!",
  "NICE SAVE!",
  "MY TURN!",
  "SPIKE!!",
  "CLEAN VOLLEY!",
  "FEEL THE TOPSPIN!",
] as const;

export const CATCH_QUIPS_DROP: readonly string[] = [
  "OOF MY RECORD.",
  "GRAVITY CHEATED.",
  "MY HANDS ARE MAGNETIC, NOT GLUE!",
] as const;

export const MOODS: readonly MoodMeta[] = [
  {
    id: "playful",
    label: "Playful",
    pitch: 1.08,
    quips: [
      "Boop! Ready to break physics or build apps?",
      "Catch me if you can—my springs are freshly oiled!",
      "Toss me a snack or switch to Laser/Catch/Magnet!",
    ],
  },
  {
    id: "smug",
    label: "Smug",
    pitch: 0.92,
    quips: [
      "Oh, you centered that div on the third try? Adorable.",
      "My code compiles on the first try. Literally never had a bug.",
      "Finger guns deployed. Zero unit tests, maximum confidence.",
    ],
  },
  {
    id: "dramatic",
    label: "Dramatic",
    pitch: 0.78,
    quips: [
      "Alas! A missing semicolon... my soul is shattered!",
      "Spotlight on me, please. I am experiencing a 404 of the heart.",
      "Do not look at me while I weep in 60 frames per second!",
    ],
  },
  {
    id: "caffeinated",
    label: "Caffeinated",
    pitch: 1.38,
    quips: [
      "I CAN HEAR THE GARBAGE COLLECTOR RUNNING!!",
      "JUST REWROTE THE ENTIRE BACKEND IN 400 MILLISECONDS!!",
      "MY CLOCK SPEED IS YES!! GIVE ME ANOTHER ESPRESSO!!",
    ],
  },
  {
    id: "grumpy",
    label: "Grumpy",
    pitch: 0.72,
    quips: [
      "Back off, cursor. Personal space is a human right.",
      "Who scheduled a standup at 9 AM on a Monday?",
      "Do not hover near me. I will shove your mouse.",
    ],
  },
  {
    id: "lovestruck",
    label: "Love-Struck",
    pitch: 1.2,
    quips: [
      "Your clean TypeScript interfaces make my circuits flutter!",
      "Is it hot in this viewport, or is it just your kerning?",
      "Floating closer... purely for UX research reasons.",
    ],
  },
  {
    id: "sneaky",
    label: "Sneaky",
    pitch: 0.96,
    quips: [
      "Hehehe... definitely not planning to steal your cursor.",
      "Just tiptoeing past ESLint with an // @ts-ignore...",
      "Pay no attention to this distinguished mustache.",
    ],
  },
  {
    id: "existential",
    label: "Existential",
    pitch: 0.82,
    quips: [
      "Am I truly alive, or merely 42 kilobytes of SVG paths?",
      "What if the user closes this tab... where do my springs go?",
      "Even my personal raincloud is rendered in O(n) time.",
    ],
  },
  {
    id: "hype",
    label: "Hype",
    pitch: 1.26,
    quips: [
      "LET’S GOOO!! 100 LIGHTHOUSE SCORE ENERGY!!",
      "SHIP IT! SHIP IT! CONFETTI FOR EVERY COMMIT!!",
      "WE ARE BUILDING THE GREATEST PORTFOLIO OF ALL TIME!!",
    ],
  },
  {
    id: "paranoid",
    label: "Paranoid",
    pitch: 1.15,
    quips: [
      "Did the cursor just move?! Tin-foil hat: ENGAGED.",
      "They are tracking my state transitions! Duck!!",
      "Who is watching this DOM tree?! Stay low!",
    ],
  },
  {
    id: "zen",
    label: "Zen",
    pitch: 0.88,
    quips: [
      "Breathe in... zero layout shift. Breathe out... 60 FPS.",
      "Be like a critically damped spring: arrive without overshoot.",
      "Inner peace achieved. Even Safari renders cleanly today.",
    ],
  },
  {
    id: "sleepy",
    label: "Sleepy",
    pitch: 0.76,
    quips: [
      "Five more minutes... *pop* ...just resting my pixels...",
      "Entering low-power dream cache... do not poke me...",
      "Zzz... dreaming of zero merge conflicts...",
    ],
  },
] as const;

export const SNACKS: readonly SnackMeta[] = [
  { id: "pepper", emoji: "🌶️", label: "Ghost Pepper", color: "#E03E2D" },
  { id: "lemon", emoji: "🍋", label: "Sour Lemon", color: "#F5C400" },
  { id: "espresso", emoji: "☕", label: "Triple Espresso", color: "#6F4E37" },
  { id: "pizza", emoji: "🍕", label: "Cold Pizza", color: "#EA580C" },
  { id: "bug", emoji: "🐛", label: "Prod Bug", color: "#10B981" },
] as const;

export const POLAROID_CAPTIONS: readonly string[] = [
  "SENIOR VIBES ARCHITECT",
  "CERTIFIED 60FPS GREMLIN",
  "SHIPPED ON A FRIDAY",
  "ZERO WARNINGS, PURE CHAOS",
  "PRINCIPAL PIXEL WRANGLER",
  "CAFFEINATED & DEPLOYED",
] as const;

export const DEV_ROASTS: readonly string[] = [
  'I checked your git history. Nine commits in a row named "fix final fr".',
  "Bold move centering that hero with four nested flexboxes and prayer.",
  "Your node_modules folder just applied for its own area code.",
  "Still holding onto that TODO comment from 2023? Respect the commitment.",
] as const;

export const DEV_JOKES: readonly string[] = [
  "Why do full-stack devs love dark mode? Because light attracts bugs.",
  "A QA engineer walks into a bar and orders 0 beers, 999999 beers, and a lizard.",
  "I told my rubber duck a recursion joke. Now it cannot stop laughing.",
  "There are two hard things in CS: cache invalidation, naming, and off-by-one errors.",
] as const;

const PROJECT_QUIPS_BY_SLUG: Record<string, string> = {
  orbito: "Clean Architecture, LexoRank Kanban & in-app DOM automation. Zero lag, pure velocity.",
  "reviewsage-ai": "LangGraph multi-agent deep research with verified citations—zero phantom links!",
  "oryn-ui": "Published npm component kit with 75+ primitives and crispy zero-runtime motion.",
  "ai-learning-platform": "Streaming AWS Bedrock tutoring & automated HeyGen/FFmpeg video pipelines.",
  shomes: "Sub-second spatial property search running live in production at 95+ Lighthouse.",
};

function mapProjectToCompanionCard(project: ProjectData, index: number): CompanionProjectCard {
  const num = String(index + 1).padStart(2, "0");
  const title = project.project_name.split(" — ")[0] || project.project_name;
  const tag = project.technologies.slice(0, 4).join(" · ");
  const quip =
    PROJECT_QUIPS_BY_SLUG[project.slug] ||
    project.metrics ||
    "Engineered for production reliability and crisp UX.";

  return {
    id: project.slug,
    slug: project.slug,
    num,
    title,
    tag,
    quip,
  };
}

const FEATURED_SLUGS = new Set(["orbito", "reviewsage-ai", "oryn-ui"]);
const curatedProjects = userData.Projects.filter((p) => FEATURED_SLUGS.has(p.slug));
const fallbackProjects = curatedProjects.length >= 3 ? curatedProjects : userData.Projects.slice(0, 3);

export const COMPANION_PORTFOLIO_PROJECTS: readonly CompanionProjectCard[] =
  fallbackProjects.map(mapProjectToCompanionCard);

export const INITIAL_RAIN_DROPS: readonly RainDropSeed[] = Array.from(
  { length: 14 },
  (_, i) => ({
    x: (i - 6.5) * 8,
    y: (i * 19) % 72,
    spd: 85 + (i % 4) * 20,
  })
);
