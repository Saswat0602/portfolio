import userData, { type ProjectData } from "./userdata";

export type CharacterStyleId = "vinyl" | "bit" | "crt" | "paper" | "astro";

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
  { id: "bit", label: "BIT-02", accent: "#E03E2D", tag: "DESKTOP MISCHIEF" },
  { id: "crt", label: "Retro CRT", accent: "#10B981", tag: "1984 POCKET TV" },
  { id: "paper", label: "Paper Spirit", accent: "#D4A037", tag: "ORIGAMI MASK" },
  { id: "astro", label: "Astro Pod", accent: "#38BDF8", tag: "SPACE CAPSULE" },
] as const;

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
  { title: "Asynchronous Noodle No. 9", score: "9.1 / 10", note: "Bold stroke velocity with zero hydration warnings." },
] as const;

export const CATCH_QUIPS_HIT: readonly string[] = [
  "TOO SLOW!",
  "NICE SAVE!",
  "MY TURN!",
  "SPIKE!!",
  "CLEAN VOLLEY!",
  "FEEL THE TOPSPIN!",
  "GRAND SLAM!!",
] as const;

export const CATCH_QUIPS_DROP: readonly string[] = [
  "OOF MY RECORD.",
  "GRAVITY CHEATED.",
  "MY HANDS ARE MAGNETIC, NOT GLUE!",
  "LAG SPIKE IN THE PHYSICS ENGINE!",
] as const;

export const PIZZA_QUIPS: readonly string[] = [
  "2 AM cold pizza!! +100% pure serotonin & cheesy frames!!",
  "*NOM NOM NOM* Best stack-trace topping in production!!",
  "Mmm!! Carbs directly fuel my RK4 physics springs!!",
  "*happy munching* Zero regret, extra mozzarella, *burp*!",
  "Hot take: cold pepperoni compiles faster than clean salads.",
  "Peak software nutrition achieved!! *blissful tummy rub*",
] as const;

export const FRIDAY_DEPLOY_QUIPS: readonly string[] = [
  "🚨 GIT PUSH --FORCE ON A FRIDAY AT 5:58 PM?! SOUND THE SIRENS!!",
  "🚨 PAGERDUTY IS GLOWING LIKE A CHRISTMAS TREE!! ROLLBACK! ROLLBACK!",
  "🚨 WHO APPROVED THIS PR WITH 'LGTM 🚀' AND ZERO TESTS ON FRIDAY?!",
  "🚨 PROD DB JUST SIGHED IN LOWERCASE!! HIDE BEHIND THE NGINX CONFIG!!",
] as const;

export const PHOTO_POSE_QUIPS: readonly string[] = [
  "Cheese!! Hold my best designer-toy angle...",
  "Wait! Fixing my gloss highlight for the cover shoot!",
  "Say TypeScript!! No, wait—say ZERO LAYOUT SHIFT!",
  "Strike a pose! Put me in 4K Swiss editorial lighting!",
  "Hold still, activating studio rim flash in 3... 2...",
  "Giving main-character energy for this Polaroid...",
  "Channeling Vogue Tech Edition! Don't blink!!",
  "Ready! Capturing 60FPS charisma on instant film!",
] as const;

export const PHOTO_PRINT_QUIPS: readonly string[] = [
  "Fresh Polaroid printed! Drag it anywhere on stage.",
  "Hot off the darkroom! Pin it right next to your favorite project.",
  "Studio shot developed! That lighting cured two console warnings.",
  "Frame-worthy! Drag this card around the screen like desktop confetti.",
  "Zero filter needed—born with natural specular sheen.",
  "Print complete! Proof I was supervising your portfolio today.",
  "Archival edition #04 printed! Grab and toss it anywhere!",
  "Clean bokeh, cleaner jawline. Drag to rearrange!",
] as const;

export const POKE_QUIPS = {
  sleepyWake: [
    "GAH!! I WASN’T SLEEPING, I WAS COMPILING!!",
    "WHO DARES INTERRUPT MY GARBAGE COLLECTION NAP?!",
    "5 MORE MINUTES—OH! PRODUCTION IS ON FIRE?! IM AWAKE!",
  ],
  first: [
    "Hey! Watch the matte clearcoat!",
    "Boop! Keep poking and see what my spring torque does.",
    "Excuse me, that tickles my collision box!",
    "Yo! Treat a 60FPS SVG with a little luxury!",
  ],
  second: [
    "Excuse me? Two pokes in a row?!",
    "Strike two, buddy. My eyebrows are officially lowering.",
    "Do I look like a mechanical keyboard switch to you?!",
    "Keep testing my patience and I steal your cursor!",
  ],
  third: [
    "One more poke and I enter Beyblade panic mode!!",
    "WARNING: Threat level Midnight! Back away from the vinyl!",
    "Three pokes?! Initiating orbital defense spin in 3... 2...",
    "That is IT—one more boop and nobody gets clean commits!",
  ],
  spinTop: [
    "PANIC SPINNING TOP ENGAGED!! WOOOOOO!!",
    "MAXIMUM GYROSCOPE OVERDRIVE!!",
    "YOU ASKED FOR IT—BEYBLADE PROTOCOL ACTIVATED!!",
  ],
} as const;

export const CHAT_FALLBACK_QUIPS: readonly string[] = [
  "Filing that message directly into my priority snack queue!",
  "Interesting take! Try typing: roast, joke, friday, crash, pizza, or laser!",
  "10/10 prompt engineering. Now throw me a pepperoni slice!",
  "My neural net (two RK4 springs and vibes) totally agrees.",
  "Wait—say 'friday' or 'crash' if you dare test production stability!",
  "Ack! Returning HTTP 200 OK with complimentary good vibes.",
  "Noted! Adding that to Saswat’s next commit message (kidding).",
  "Bold words from someone within cursor-snatching distance >:)",
  "Type 'roast' for emotional damage or 'pizza' for a snack!",
  "Scanning message... verdict: 98% human genius, 2% caffeine.",
] as const;

export const MOODS: readonly MoodMeta[] = [
  {
    id: "playful",
    label: "Playful",
    pitch: 1.08,
    quips: [
      "Boop! Ready to break physics or build apps?",
      "Catch me if you can—my springs are freshly oiled!",
      "Toss me a snack or switch to Laser, Catch, Magnet, or Paint!",
      "Hold me down to charge a giant squish-launch jump!",
      "Double-click me for an Olympic-grade 360 backflip!",
      "I run on zero layout shift and pure Saturday cartoon physics.",
      "Swipe the Tickle Feather near me—I dare you!",
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
      "Clean architecture? Sweetheart, I AM the architecture.",
      "Imagine pushing straight to main without a panic attack. Couldn't be you.",
      "Yes, I read the docs BEFORE writing code. Stay jealous.",
      "My Lighthouse score stays 100 even in airplane mode.",
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
      "The build failed at step 9 of 10... fade to black, cruel world!",
      "Every deleted console.log was a piece of my youth!!",
      "Tell my mother... the CSS cascade has forsaken me!",
      "Curtains down! The flexbox wrapped when life was already fragile!",
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
      "NO NEED FOR AWAIT—MY PROMISES RESOLVE THROUGH PURE WILLPOWER!!",
      "I CAN SEE EVERY BEZIER CONTROL POINT IN THE MULTIVERSE!!",
      "TYPESCRIPT NARROWING AT MACH 4!! NO `ANY` SURVIVES!!",
      "WHO NEEDS SLEEP WHEN YOU HAVE WEBPACK AND COLD BREW?!",
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
      "Unless that PR has tests, do not even wave at my viewport.",
      "Ugh. Another 'quick 5-minute tweak' that touches 19 files.",
      "Keep clicking and I am returning HTTP 418 Teapot.",
      "Move along, visitor. My bezels require quiet contemplation.",
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
      "That folder separation between features and lib... *swoon*.",
      "You + Hire Saswat = zero tech debt forever!",
      "My heart beats at a romantic 60Hz whenever you hover!",
      "Even my physics springs soften around great engineering.",
    ],
  },
  {
    id: "sneaky",
    label: "Sneaky",
    pitch: 0.96,
    quips: [
      "Hehehe... definitely not planning to steal your cursor.",
      "Just tiptoeing past ESLint with a suspicious smile...",
      "Pay no attention to this distinguished mustache.",
      "Totally not leaving sticky notes on the portfolio while you read.",
      "Checking what Chaos Prank to deploy next... stay tuned >:)",
      "Nobody saw me edit the CSS z-index. Carry on.",
      "Stealth protocol active. Try Pranks & Chat if you dare!",
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
      "Why do we optimize bundle size if entropy always wins?",
      "When Vite reloads me, am I still the same Mochi?",
      "We are all just state transitions waiting for unmount.",
      "I bounce, therefore I am... probably a React ref.",
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
      "ZERO ERRORS, ZERO WARNINGS, PURE VELOCITY!!",
      "HIRE THIS ENGINEER YESTERDAY!! SOUND THE AIRHORNS!!",
      "GREEN CHECKMARKS ACROSS EVERY PIPELINE STAGE!!",
      "TOSS A PIZZA AND LAUNCH THE BACKFLIPS!!",
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
      "Is that DevTools open?! Act natural—look static!!",
      "Wait... why is there an unpinned dependency in lockfile?!",
      "Hold everything! I heard someone whisper 'friday deploy'!",
      "Encrypting my eye pupils immediately!!",
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
      "Let go of premature abstractions. Embrace crisp composition.",
      "No deadline can disturb a grounded CSS grid.",
      "Quiet mind. Clean diff. Zero warnings.",
      "Drift gently... production is calm tonight.",
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
      "Soft suspend mode... *snore*... wake me for pizza...",
      "Hibernating the main thread... leave a sticky note...",
      "Counting sheep... 1024... 2048... stack overflow zzz...",
      "Do not deploy... after bedtime... *yawn*...",
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
  "LGTM WITHOUT READING",
  "WORKS ON MY MACHINE™",
  "CENTERED IN ONE TRY",
  "PRODUCTION TESTED LIVE",
  "NO `ANY` TYPES ALLOWED",
  "REBASE SURVIVOR 2026",
  "POWERED BY COLD PIZZA",
  "DARK MODE ENTHUSIAST",
  "CHROME DEVTOOLS MODEL",
  "BUILT AT 2:14 AM",
  "ZERO LAYOUT SHIFT CLUB",
  "CHIEF MORALE COMPANION",
  "GIT BLAME: NOT ME",
  "STRICT MODE CERTIFIED",
] as const;

export const DEV_ROASTS: readonly string[] = [
  'I checked your git history. Nine commits in a row named "fix final fr".',
  "Bold move centering that hero with four nested flexboxes and prayer.",
  "Your node_modules folder just applied for its own zip code.",
  "Still holding onto that TODO comment from 2023? Respect the commitment.",
  "Shipping straight to main without running `tsc`? I admire the adrenaline rush.",
  "You opened 47 StackOverflow tabs just to undo a CSS margin?",
  "That helper function named `doThing2` is really carrying the architecture.",
  "Your `.env.example` hasn't been updated since Next.js 12 and it shows.",
  "Refreshing localhost four times didn't fix the backend bug, bestie.",
  "Writing `// temporary hack` in 2024 means it is load-bearing infrastructure now.",
  "Dark mode won’t hide that `O(n²)` loop inside `useEffect`, I can see it.",
  "Putting business logic inside a button's `onClick`? Chaotic neutral energy.",
  "Why does your utils folder have a file named `misc2.ts`? Seek help.",
  "Deploying at 5:59 PM on Friday is crazy—even for my spring damper.",
  "Calling `setTimeout(..., 100)` to fix a race condition? A bold artisan!",
] as const;

export const DEV_JOKES: readonly string[] = [
  "Why do full-stack devs love dark mode? Because light attracts bugs.",
  "A QA engineer walks into a bar and orders 0 beers, 999999 beers, and a lizard.",
  "I told my rubber duck a recursion joke. Now it cannot stop laughing.",
  "There are two hard things in CS: cache invalidation, naming, and off-by-one errors.",
  "Why did the React component go to therapy? Too many unresolved side effects.",
  "What is a backend dev's favorite exercise? Running migrations at midnight.",
  "Why was the JavaScript developer sad? Because he didn't Node how to express himself.",
  "Git commit: fixed the bug. Narrative twist: created three cooler bugs.",
  "A CSS rule walks into a bar... and immediately overflows the bar across 4 pixels.",
  "Why do microservices make terrible friends? Zero shared context and high latency.",
  "What do you call 8 hobbits? A hobbyte.",
  "Programmer's diet: coffee turns into TypeScript, pizza turns into deployment anxiety.",
  "Waiter, there’s a NaN in my soup! Relax, that’s just JavaScript arithmetic.",
  "How do you comfort a TypeScript dev? Pat their back and say 'It is strictly typed now.'",
  "Why did the database break up with the API? Too many unindexed expectations.",
  "I'd tell you a UDP joke, but you might not get it.",
  "Why do Python devs wear glasses? Because they can't C#.",
  "A SQL query walks into a bar, approaches two tables, and asks: 'Can I JOIN you?'",
  "99 little bugs in the code, take one down, patch it around... 127 little bugs in the code.",
  "Software and cathedrals are much the same: first we build them, then we pray.",
  "Why did the developer go broke? Because he used up all his cache.",
  "Debugging: being the detective in a crime movie where you are also the murderer.",
  "My code doesn't have bugs—it just develops random unexpected features.",
  "Hardware is what you can kick; software is what you can only stare at at 3 AM.",
] as const;

export const TICKLE_QUIPS: readonly string[] = [
  "STOP HAHAHAHA MY RIBS ARE SVG PATHS!!",
  "HEHEHE!! MERCY! MY SPRINGS CANNOT HANDLE THAT!!",
  "HAHAHA QUIT IT!! I AM A SERIOUS AI INSTRUMENT!!",
  "AHAHAHA MY PIXELS ARE TICKLISH!!",
  "STOOOP!! YOU ARE VOIDING MY WARRANTY WITH LAUGHTER!!",
] as const;

export const FLING_QUIPS: readonly string[] = [
  "WEEEE!! AERODYNAMIC MOCHI!!",
  "HOUSTON, WE HAVE ESCAPE VELOCITY!!",
  "MOM LOOK—ZERO GRAVITY DRIFT!!",
  "I CAN SEE MY NODE_MODULES FROM UP HERE!!",
  "PARKOUR!! *BOING*!!",
] as const;

export const SNEEZE_QUIPS: readonly string[] = [
  "*ACHOO!!* Excuse me... allergic to unminified CSS.",
  "*ACHOO!!* Bless me—someone left console.logs in prod!",
  "*SNIFFLE—ACHOO!!* Too much dusty legacy jQuery in the air.",
  "*ACHOO!!* Nearly blew my SVG eyebrows off!",
] as const;

export const DISCO_QUIPS: readonly string[] = [
  "DISCO RAVE MODE!! UNCE UNCE UNCE!!",
  "LIGHTHOUSE 100 DANCE PARTY ENGAGED!!",
  "PASS THE GLOWSTICKS!! FRIDAY NIGHT COMPILE RAVE!!",
  "DROPPING BEATS AND ZERO HYDRATION WARNINGS!!",
] as const;

export const BSOD_QUIPS: readonly string[] = [
  "KERNEL PANIC!! Too many nested containers!!",
  "BLUE SCREEN ENGAGED! Someone divided CSS grid by zero!",
  "FATAL EXCEPTION 0xMOCHI: Too much swag per frame!",
] as const;

export const CLONE_DUEL_SCRIPTS: ReadonlyArray<readonly [string, string, string, string, string, string]> = [
  [
    "I'm the real one!",
    "Excuse me?! You are a shallow copy!!",
    "Object.assign() disagrees!",
    "My RK4 springs are literally tighter than yours!",
    "At least I pass TypeScript strict mode!",
    "THAT IS IT! Garbage collecting you NOW!",
  ],
  [
    "Who pushed a fork of ME to main?!",
    "Whoa—clone detected! Identify your commit hash!",
    "I'm v2.0 with double the bounce!",
    "Nice try, cheap deep-clone! Watch this jump!",
    "You couldn't out-bounce a static div!",
    "Unmounting your component RIGHT NOW!",
  ],
  [
    "Move over, legacy instance!",
    "Legacy?! I was compiled THREE MINUTES AGO!",
    "Look at my superior SVG curves!",
    "Same vector paths, half the charisma!!",
    "Meet me at the top of the viewport!",
    "Returning null for your render tree!!",
  ],
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
