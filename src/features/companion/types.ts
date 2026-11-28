import type { AccessoryId, CharacterStyleId, MoodId, PlayModeId, SnackId } from "@/lib/data";

export type ViewMode = "stage" | "portfolio" | "home";
export type DockTab = "styles" | "modes" | "moods" | "toys" | "pranks";
export type PortfolioHoverTarget = "hire" | "projects" | "resume" | null;

export type SoundKind =
  | "boing"
  | "slideUp"
  | "slideDown"
  | "crunch"
  | "fire"
  | "squeak"
  | "giggle"
  | "sadTrombone"
  | "shutter"
  | "poof"
  | "portal"
  | "chime"
  | "pop"
  | "marimba"
  | "zap"
  | "volley"
  | "squish"
  | "twang"
  | "pulse"
  | "sneeze"
  | "tick";

export type ParticleKind = "poof" | "dust" | "confetti" | "heart" | "burp" | "zzz" | "star" | "tissue";

export interface SnackEntity {
  id: number;
  kind: SnackId;
  emoji: string;
  color: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vRot: number;
  portalCd: number;
}

export interface ParticleEntity {
  kind: ParticleKind;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rot: number;
  vRot: number;
  age: number;
  life: number;
  color: string;
}

export interface PortalPoint {
  x: number;
  y: number;
}

export interface PortalPair {
  cyan: PortalPoint | null;
  orange: PortalPoint | null;
  nextColor: "cyan" | "orange";
}

export interface PolaroidCard {
  id: number;
  styleId: CharacterStyleId;
  moodId: MoodId;
  moodLabel: string;
  caption: string;
  x: number;
  y: number;
  rot: number;
}

export interface StickyNoteState {
  id: number;
  x: number;
  y: number;
  rot: number;
}

export interface RainDropState {
  x: number;
  y: number;
  spd: number;
}

export interface BallEntity {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  angle: number;
  spin: number;
  lastHit: "none" | "user" | "bot";
  trail: PortalPoint[];
}

export interface BugEntity {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  tag: string;
  legPhase: number;
}

export interface LaserBeamEntity {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  age: number;
}

export interface InkStroke {
  pts: PortalPoint[];
  color: string;
}

export interface MiniCloneEntity {
  x: number;
  y: number;
  vx: number;
  vy: number;
  ttl: number;
  phase: number;
}

export interface SoundRingEntity {
  x: number;
  y: number;
  r: number;
  maxR: number;
  age: number;
  color: string;
}

export interface ArtVerdictState {
  title: string;
  score: string;
  note: string;
}

export interface DragState {
  active: boolean;
  moved: boolean;
  startX: number;
  startY: number;
  lastX: number;
  lastY: number;
  vx: number;
  vy: number;
  offX: number;
  offY: number;
  downAt: number;
}

export interface StrokeTracker {
  lastX: number;
  lastDir: number;
  strokes: number;
  decay: number;
  fxCd: number;
}

export interface TickleTracker {
  lastX: number;
  lastY: number;
  lastDirX: number;
  lastDirY: number;
  strokes: number;
  decay: number;
  cd: number;
}

export interface TrampolineState {
  x: number;
  comp: number;
  vComp: number;
  combo: number;
}

export interface CloneState {
  active: boolean;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
}

export interface SimState {
  w: number;
  h: number;
  floorY: number;
  ceilY: number;
  homeX: number;
  homeY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vRot: number;
  flipDeg: number;
  flipping: boolean;
  sx: number;
  vsx: number;
  sy: number;
  vsy: number;
  faceScale: number;
  vFaceScale: number;
  headX: number;
  vHeadX: number;
  headY: number;
  vHeadY: number;
  antBend: number;
  vAntBend: number;
  hlX: number;
  vHlX: number;
  hlY: number;
  vHlY: number;
  hrX: number;
  vHrX: number;
  hrY: number;
  vHrY: number;
  eyelid: number;
  vEyelid: number;
  targetEyelid: number;
  walkPhase: number;
  crouchY: number;
  vCrouchY: number;
  propellerDeg: number;
  ptrX: number;
  ptrY: number;
  ptrVx: number;
  ptrVy: number;
  ptrLastX: number;
  ptrLastY: number;
  ptrActive: boolean;
  drag: DragState;
  squishCharge: number;
  squishTickCd: number;
  ballistic: boolean;
  ballisticTimer: number;
  pet: StrokeTracker;
  tickle: TickleTracker;
  snacks: SnackEntity[];
  portals: PortalPair;
  charPortalCd: number;
  tramp: TrampolineState;
  clone: CloneState;
  laserTrail: PortalPoint[];
  laserPounceCd: number;
  magnetAngle: number;
  ball: BallEntity | null;
  rally: number;
  bugs: BugEntity[];
  lasers: LaserBeamEntity[];
  zapCooldown: number;
  strokes: InkStroke[];
  activeStroke: InkStroke | null;
  criticScanY: number;
  miniClones: MiniCloneEntity[];
  soundRings: SoundRingEntity[];
  beatEnergy: number;
  particles: ParticleEntity[];
  rainDrops: RainDropState[];
  time: number;
  lastInteractionAt: number;
}

export interface LiveSnapshot {
  theme: "dark" | "light";
  viewMode: ViewMode;
  charStyle: CharacterStyleId;
  accessory: AccessoryId;
  playMode: PlayModeId;
  displayMood: MoodId;
  pitch: number;
  soundOn: boolean;
  portalTool: boolean;
  trampolineOn: boolean;
  featherTool: boolean;
  gravityFlipped: boolean;
  photoPosing: boolean;
  spicyActive: boolean;
  sourActive: boolean;
  pizzaActive: boolean;
  caffeinatedActive: boolean;
  spinTopActive: boolean;
  dizzyActive: boolean;
  tickledActive: boolean;
  pettingActive: boolean;
  isHeld: boolean;
  cursorSnatched: boolean;
  cloneDuelActive: boolean;
  fridayDeployActive: boolean;
  fakeCrashActive: boolean;
  reducedMotion: boolean;
  homeTucked: boolean;
  portfolioHover: PortfolioHoverTarget;
}

export interface CompanionTimers {
  speechType: ReturnType<typeof setInterval> | null;
  speechClear: ReturnType<typeof setTimeout> | null;
  spicy: ReturnType<typeof setTimeout> | null;
  sour: ReturnType<typeof setTimeout> | null;
  pizza: ReturnType<typeof setTimeout> | null;
  caffeine: ReturnType<typeof setTimeout> | null;
  spinTop: ReturnType<typeof setTimeout> | null;
  dizzy: ReturnType<typeof setTimeout> | null;
  tickle: ReturnType<typeof setTimeout> | null;
  pet: ReturnType<typeof setTimeout> | null;
  gravity: ReturnType<typeof setTimeout> | null;
  shake: ReturnType<typeof setTimeout> | null;
  friday: ReturnType<typeof setTimeout> | null;
  crash: ReturnType<typeof setTimeout> | null;
  photo1: ReturnType<typeof setTimeout> | null;
  photo2: ReturnType<typeof setTimeout> | null;
  photoFlash: ReturnType<typeof setTimeout> | null;
  clone1: ReturnType<typeof setTimeout> | null;
  clone2: ReturnType<typeof setTimeout> | null;
  clone3: ReturnType<typeof setTimeout> | null;
  cloneEnd: ReturnType<typeof setTimeout> | null;
  snatchEnd: ReturnType<typeof setTimeout> | null;
  critique: ReturnType<typeof setTimeout> | null;
  joke: ReturnType<typeof setTimeout> | null;
  autoJam: ReturnType<typeof setInterval> | null;
}

export interface CompanionElements {
  stage: HTMLDivElement | null;
  fxCanvas: HTMLCanvasElement | null;
  charWrap: HTMLDivElement | null;
  shadow: HTMLDivElement | null;
  speech: HTMLDivElement | null;
  cloneWrap: HTMLDivElement | null;
  cloneBubble: HTMLDivElement | null;
  featherDom: HTMLDivElement | null;
  rigTransform: SVGGElement | null;
  bodyGroup: SVGGElement | null;
  faceGroup: SVGGElement | null;
  pupils: SVGGElement | null;
  eyeL: SVGGElement | null;
  eyeR: SVGGElement | null;
  handL: SVGGElement | null;
  handR: SVGGElement | null;
  footL: SVGGElement | null;
  footR: SVGGElement | null;
  antL: SVGGElement | null;
  antR: SVGGElement | null;
  halo: SVGGElement | null;
  snotBubble: SVGCircleElement | null;
  flame: SVGGElement | null;
  boosterL: SVGPathElement | null;
  boosterR: SVGPathElement | null;
  propBlade: SVGGElement | null;
}

export interface CompanionThemeTokens {
  bg: string;
  surface: string;
  glass: string;
  recessed: string;
  ink: string;
  muted: string;
  border: string;
  borderStrong: string;
  shadow: string;
}
