import userData, { type ProjectData } from "./userdata";

export type CharacterStyleId = "vinyl" | "crt" | "paper" | "astro";

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
  { id: "crt", label: "Retro CRT", accent: "#E03E2D", tag: "1984 POCKET TV" },
  { id: "paper", label: "Paper Spirit", accent: "#D4A037", tag: "ORIGAMI MASK" },
  { id: "astro", label: "Astro Pod", accent: "#2563EB", tag: "SPACE CAPSULE" },
] as const;

export const MOODS: readonly MoodMeta[] = [
  {
    id: "playful",
    label: "Playful",
    pitch: 1.08,
    quips: [
      "Boop! Ready to break physics or build apps?",
      "Catch me if you can—my springs are freshly oiled!",
      "Toss me a snack or open a portal. I dare you.",
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
