import type { MoodId } from "@/lib/data";
import type {
  CompanionElements,
  LiveSnapshot,
  ParticleKind,
  PortalPoint,
  SimState,
  SnackEntity,
  SoundKind,
} from "../types";
import { clamp, stepRK4 } from "./physics";
import { playComedySound } from "./audio";
import { stepInkBounces } from "./modeStep";

const ELEMENT_SELECTORS: ReadonlyArray<[keyof CompanionElements, string]> = [
  ["charWrap", '[data-mochi-el="charWrap"]'],
  ["shadow", '[data-mochi-el="shadow"]'],
  ["speech", '[data-mochi-el="speech"]'],
  ["cloneWrap", '[data-mochi-el="cloneWrap"]'],
  ["cloneBubble", '[data-mochi-el="cloneBubble"]'],
  ["featherDom", '[data-mochi-el="featherDom"]'],
  ["rigTransform", '[data-mochi-el="rigTransform"]'],
  ["bodyGroup", '[data-mochi-el="bodyGroup"]'],
  ["faceGroup", '[data-mochi-el="faceGroup"]'],
  ["pupils", '[data-mochi-el="pupils"]'],
  ["eyeL", '[data-mochi-el="eyeL"]'],
  ["eyeR", '[data-mochi-el="eyeR"]'],
  ["handL", '[data-mochi-el="handL"]'],
  ["handR", '[data-mochi-el="handR"]'],
  ["footL", '[data-mochi-el="footL"]'],
  ["footR", '[data-mochi-el="footR"]'],
  ["antL", '[data-mochi-el="antL"]'],
  ["antR", '[data-mochi-el="antR"]'],
  ["halo", '[data-mochi-el="halo"]'],
  ["snotBubble", '[data-mochi-el="snotBubble"]'],
  ["flame", '[data-mochi-el="flame"]'],
  ["boosterL", '[data-mochi-el="boosterL"]'],
  ["boosterR", '[data-mochi-el="boosterR"]'],
  ["propBlade", '[data-mochi-el="propBlade"]'],
];

let lastElementScanMs = 0;

export function syncConnectedElements(stage: HTMLDivElement, elements: CompanionElements): void {
  const now = performance.now();
  const canQuery = now - lastElementScanMs >= 240;
  const store = elements as unknown as Record<string, Element | null>;
  let scanned = false;
  for (const [key, selector] of ELEMENT_SELECTORS) {
    const current = store[key];
    if (!current || !current.isConnected) {
      if (current && !current.isConnected) store[key] = null;
      if (canQuery) {
        store[key] = stage.querySelector(selector);
        scanned = true;
      }
    }
  }
  if (scanned) lastElementScanMs = now;
}

export interface StepCallbacks {
  consumeSnack: (snack: SnackEntity) => void;
  say: (text: string, holdMs?: number, silent?: boolean) => void;
  spawnParticles: (kind: ParticleKind, x: number, y: number, count?: number, customColor?: string | null) => void;
  onPortalDizzy: () => void;
}

function tryTeleportSnack(
  sn: SnackEntity,
  entry: PortalPoint,
  exit: PortalPoint,
  live: LiveSnapshot,
  callbacks: StepCallbacks
): boolean {
  if (Math.hypot(sn.x - entry.x, sn.y - entry.y) >= 34) return false;
  sn.x = exit.x;
  sn.y = exit.y;
  const spd = Math.max(320, Math.hypot(sn.vx, sn.vy));
  sn.vx = (sn.vx >= 0 ? 1 : -1) * spd * 0.82;
  sn.vy = -Math.max(240, Math.abs(sn.vy));
  sn.portalCd = 0.55;
  playComedySound("portal", live.soundOn, 1.2);
  callbacks.spawnParticles("confetti", exit.x, exit.y, 6);
  return true;
}

export function stepSnacks(
  sim: SimState,
  live: LiveSnapshot,
  dt: number,
  callbacks: StepCallbacks
): SnackEntity | null {
  const gravDir = live.gravityFlipped ? -1 : 1;
  const snFloor = sim.floorY + 40;
  const snCeil = sim.ceilY - 12;
  let chaseSnack: SnackEntity | null = null;

  for (let i = sim.snacks.length - 1; i >= 0; i--) {
    const sn = sim.snacks[i];
    sn.portalCd = Math.max(0, sn.portalCd - dt);

    if (sn.kind === "bug") {
      sn.vx = clamp(sn.vx + (Math.random() - 0.5) * 320 * dt, -160, 160);
    }

    sn.vy += 980 * gravDir * dt;
    sn.x += sn.vx * dt;
    sn.y += sn.vy * dt;
    sn.rot += sn.vRot * dt;

    if (sn.y > snFloor) {
      sn.y = snFloor;
      if (Math.abs(sn.vy) > 85) {
        sn.vy = -sn.vy * 0.52;
        sn.vx *= 0.84;
        sn.vRot *= 0.72;
      } else {
        sn.vy = 0;
        if (sn.kind !== "bug") sn.vx *= 0.88;
        sn.vRot *= 0.8;
      }
    } else if (sn.y < snCeil) {
      sn.y = snCeil;
      sn.vy = Math.abs(sn.vy) * 0.52;
    }

    if (sn.x < 38) {
      sn.x = 38;
      sn.vx = Math.abs(sn.vx) * 0.75;
    } else if (sn.x > sim.w - 38) {
      sn.x = sim.w - 38;
      sn.vx = -Math.abs(sn.vx) * 0.75;
    }

    if (sim.portals.cyan && sim.portals.orange && sn.portalCd <= 0) {
      const moved = tryTeleportSnack(sn, sim.portals.cyan, sim.portals.orange, live, callbacks);
      if (!moved) tryTeleportSnack(sn, sim.portals.orange, sim.portals.cyan, live, callbacks);
    }

    if (!chaseSnack) chaseSnack = sn;

    if (!sim.drag.active && Math.hypot(sim.x - sn.x, sim.y - (sn.y - 24)) < 74) {
      sim.snacks.splice(i, 1);
      callbacks.consumeSnack(sn);
      chaseSnack = null;
    }
  }

  return chaseSnack;
}

function applyPlayModeSteering(
  sim: SimState,
  live: LiveSnapshot,
  minX: number,
  maxX: number,
  dt: number,
  callbacks: StepCallbacks
): boolean {
  if (live.playMode === "laser" && sim.ptrActive) {
    const gx = clamp(sim.ptrX, minX, maxX);
    const gy = clamp(sim.ptrY, sim.ceilY, sim.floorY - 8);
    const sx = stepRK4(sim.x, sim.vx, gx, 72, 11.2, dt);
    const sy = stepRK4(sim.y, sim.vy, gy, 72, 11.2, dt);
    sim.x = sx.x;
    sim.vx = sx.v;
    sim.y = sy.x;
    sim.vy = sy.v;
    if (Math.hypot(sim.ptrX - sim.x, sim.ptrY - sim.y) < 62 && sim.laserPounceCd <= 0) {
      sim.laserPounceCd = 2.4;
      sim.sx = 1.22;
      sim.sy = 0.8;
      playComedySound("boing", live.soundOn, 1.35);
      callbacks.say("ALMOST CAUGHT THE PHOTON!!", 1600, true);
    }
    return true;
  }

  if (live.playMode === "magnet" && sim.ptrActive) {
    sim.magnetAngle += dt * 2.35;
    const orbitR = Math.min(138, sim.w * 0.18);
    const gx = clamp(sim.ptrX + Math.cos(sim.magnetAngle) * orbitR, minX, maxX);
    const gy = clamp(sim.ptrY + Math.sin(sim.magnetAngle) * orbitR * 0.72, sim.ceilY, sim.floorY - 12);
    const sx = stepRK4(sim.x, sim.vx, gx, 64, 10.8, dt);
    const sy = stepRK4(sim.y, sim.vy, gy, 64, 10.8, dt);
    sim.x = sx.x;
    sim.vx = sx.v;
    sim.y = sy.x;
    sim.vy = sy.v;
    return true;
  }

  if (live.playMode === "catch" && sim.ball) {
    const gx = clamp(sim.ball.x + sim.ball.vx * 0.18, minX, maxX);
    const gy = sim.ball.y > sim.h * 0.34 ? clamp(sim.ball.y + 30, sim.ceilY, sim.floorY - 8) : sim.floorY - 36;
    const sx = stepRK4(sim.x, sim.vx, gx, 76, 12.5, dt);
    const sy = stepRK4(sim.y, sim.vy, gy, 76, 12.5, dt);
    sim.x = sx.x;
    sim.vx = sx.v;
    sim.y = sy.x;
    sim.vy = sy.v;
    return true;
  }

  if (live.playMode === "bugs" && sim.bugs.length > 0) {
    const target = sim.bugs[0];
    const gx = clamp(target.x, minX, maxX);
    const gy = clamp(target.y - 18, sim.ceilY, sim.floorY - 8);
    const sx = stepRK4(sim.x, sim.vx, gx, 58, 10.5, dt);
    const sy = stepRK4(sim.y, sim.vy, gy, 58, 10.5, dt);
    sim.x = sx.x;
    sim.vx = sx.v;
    sim.y = sy.x;
    sim.vy = sy.v;
    return true;
  }

  return false;
}

function applyMoodSteering(
  sim: SimState,
  live: LiveSnapshot,
  chaseSnack: SnackEntity | null,
  onFloor: boolean,
  dt: number,
  spawnParticles: StepCallbacks["spawnParticles"]
): void {
  const dm = live.displayMood;
  const t = sim.time;

  if (chaseSnack && !live.spicyActive && !live.spinTopActive) {
    const dx = chaseSnack.x - sim.x;
    sim.vx += clamp(dx * 5.2, -360, 360) * dt;
    if (onFloor && Math.abs(dx) > 40 && Math.random() < 0.06) {
      sim.vy = -290;
      sim.sx = 0.86;
      sim.sy = 1.18;
    }
    return;
  }

  if (live.cursorSnatched) {
    const away = sim.x >= sim.ptrX ? 1 : -1;
    if (Math.hypot(sim.ptrX - sim.x, sim.ptrY - sim.y) < 230) {
      sim.vx += away * 760 * dt;
      if (onFloor && Math.random() < 0.08) sim.vy = -280;
    }
    return;
  }

  if (dm === "lovestruck" && sim.ptrActive && !live.gravityFlipped) {
    sim.vx += clamp((sim.ptrX - sim.x) * 1.35, -160, 160) * dt;
  } else if (dm === "grumpy" && sim.ptrActive) {
    if (Math.hypot(sim.ptrX - sim.x, sim.ptrY - sim.y) < 145) {
      const away = sim.x >= sim.ptrX ? 1 : -1;
      sim.vx += away * 460 * dt;
      if (onFloor && Math.random() < 0.05) {
        sim.vy = -170;
        spawnParticles("dust", sim.x, sim.floorY + 46, 4);
      }
    }
  } else if (dm === "hype" && onFloor && Math.sin(t * 7.5) > 0.88) {
    sim.vy = -280;
    sim.sx = 0.86;
    sim.sy = 1.18;
    if (Math.random() < 0.35) spawnParticles("confetti", sim.x, sim.y - 40, 5);
  } else if (dm === "caffeinated") {
    sim.vx += Math.sin(t * 10.5) * 440 * dt;
    if (onFloor && Math.random() < 0.09) sim.vy = -340;
  } else if (dm === "sneaky" && onFloor) {
    const patrolX = sim.w * 0.5 + Math.sin(t * 0.85) * Math.min(200, sim.w * 0.22);
    sim.vx += clamp((patrolX - sim.x) * 1.4, -140, 140) * dt;
  } else if (live.viewMode === "portfolio" && onFloor) {
    sim.vx += clamp((sim.homeX - sim.x) * 2.2, -220, 220) * dt;
  }
}

function tryTeleportCharacter(
  sim: SimState,
  entry: PortalPoint,
  exit: PortalPoint,
  live: LiveSnapshot,
  callbacks: StepCallbacks
): boolean {
  if (Math.hypot(sim.x - entry.x, sim.y - entry.y) >= 52) return false;
  sim.x = exit.x;
  sim.y = exit.y;
  const spd = Math.max(420, Math.hypot(sim.vx, sim.vy));
  const ang = Math.atan2(sim.vy, sim.vx);
  sim.vx = Math.cos(ang) * spd;
  sim.vy = Math.sin(ang) * spd - 120;
  sim.sx = 0.72;
  sim.sy = 1.32;
  sim.charPortalCd = 0.58;
  playComedySound("portal", live.soundOn, 1.0);
  callbacks.spawnParticles("confetti", exit.x, exit.y, 12);
  callbacks.say("WHEEEEE!! MY PIXELS JUST TELEPORTED!!", 2100, true);
  callbacks.onPortalDizzy();
  return true;
}

function containCharacter(
  sim: SimState,
  minX: number,
  maxX: number,
  live: LiveSnapshot,
  callbacks: StepCallbacks
): void {
  const playBounce = (pitch: number) => playComedySound("boing", live.soundOn, pitch);

  if (sim.x < minX) {
    sim.x = minX;
    if (Math.abs(sim.vx) > 160) {
      sim.sx = 0.76;
      sim.sy = 1.26;
      playBounce(0.95);
      callbacks.spawnParticles("dust", minX - 24, sim.y, 4);
    }
    sim.vx = Math.abs(sim.vx) * 0.65;
  } else if (sim.x > maxX) {
    sim.x = maxX;
    if (Math.abs(sim.vx) > 160) {
      sim.sx = 0.76;
      sim.sy = 1.26;
      playBounce(0.95);
      callbacks.spawnParticles("dust", maxX + 24, sim.y, 4);
    }
    sim.vx = -Math.abs(sim.vx) * 0.65;
  }

  if (sim.y < sim.ceilY) {
    sim.y = sim.ceilY;
    if (Math.abs(sim.vy) > 180) {
      sim.sx = 1.28;
      sim.sy = 0.74;
      playBounce(1.3);
      callbacks.spawnParticles("dust", sim.x, sim.ceilY - 18, 6);
      if (!live.gravityFlipped && sim.vy < -420) {
        callbacks.say("BONK!! Watch that top bar!", 1700, true);
      }
    }
    sim.vy = live.gravityFlipped ? 0 : Math.abs(sim.vy) * 0.52;
  }

  if (sim.y > sim.floorY) {
    sim.y = sim.floorY;
    sim.tramp.combo = 0;
    if (Math.abs(sim.vy) > 180) {
      const hard = Math.abs(sim.vy) > 540;
      sim.vy = -sim.vy * 0.48;
      sim.vx *= 0.82;
      sim.sx = hard ? 1.36 : 1.22;
      sim.sy = hard ? 0.68 : 0.8;
      playBounce(hard ? 0.78 : 1.0);
      callbacks.spawnParticles("dust", sim.x, sim.floorY + 46, hard ? 8 : 4);
    } else {
      sim.vy = 0;
    }
  }
}

export function stepCharacterKinematics(
  sim: SimState,
  live: LiveSnapshot,
  chaseSnack: SnackEntity | null,
  dt: number,
  callbacks: StepCallbacks
): void {
  const minX = 70;
  const maxX = Math.max(minX + 40, sim.w - 70);
  const gravDir = live.gravityFlipped ? -1 : 1;

  if (sim.drag.active && sim.drag.moved) {
    const gx = clamp(sim.ptrX + sim.drag.offX, minX, maxX);
    const gy = clamp(sim.ptrY + sim.drag.offY, sim.ceilY, sim.floorY);
    const sx = stepRK4(sim.x, sim.vx, gx, 340, 26, dt);
    const sy = stepRK4(sim.y, sim.vy, gy, 340, 26, dt);
    sim.x = sx.x;
    sim.vx = sx.v;
    sim.y = sy.x;
    sim.vy = sy.v;
    return;
  }

  if (sim.squishCharge > 0.01) {
    sim.vx *= 0.78;
    sim.vy *= 0.78;
    return;
  }

  const onFloor = !live.gravityFlipped && sim.y >= sim.floorY - 6;
  const homeToyActive =
    live.trampolineOn ||
    live.gravityFlipped ||
    live.spicyActive ||
    live.spinTopActive ||
    live.cursorSnatched ||
    (live.playMode !== "interact" && live.playMode !== "dj") ||
    Boolean(chaseSnack) ||
    Boolean(sim.portals.cyan && sim.portals.orange) ||
    sim.ballistic ||
    sim.flipping;

  const steeredByMode = !chaseSnack && applyPlayModeSteering(sim, live, minX, maxX, dt, callbacks);

  if (!steeredByMode) {
    if (live.viewMode === "home" && !homeToyActive) {
      const floatX = sim.homeX + Math.cos(sim.time * 0.9) * 14;
      const floatY = sim.homeY + Math.sin(sim.time * 1.8) * 12 - sim.beatEnergy * 28;
      const sx = stepRK4(sim.x, sim.vx, floatX, 34, 10, dt);
      const sy = stepRK4(sim.y, sim.vy, floatY, 34, 10, dt);
      sim.x = sx.x;
      sim.vx = sx.v;
      sim.y = sy.x;
      sim.vy = sy.v;
    } else if (live.displayMood === "zen" && !live.gravityFlipped) {
      const zenY = sim.homeY - 46 + Math.sin(sim.time * 1.9) * 14;
      const zenX = sim.homeX + Math.cos(sim.time * 0.8) * 32;
      const sx = stepRK4(sim.x, sim.vx, zenX, 26, 9, dt);
      const sy = stepRK4(sim.y, sim.vy, zenY, 26, 9, dt);
      sim.x = sx.x;
      sim.vx = sx.v;
      sim.y = sy.x;
      sim.vy = sy.v;
    } else {
      sim.vy += 1160 * gravDir * dt;
      applyMoodSteering(sim, live, chaseSnack, onFloor, dt, callbacks.spawnParticles);
      sim.vx *= Math.exp(-dt * (onFloor ? 3.0 : 0.45));
      sim.x += sim.vx * dt;
      sim.y += sim.vy * dt;
    }
  }

  if (sim.ballistic || sim.strokes.length > 0) {
    stepInkBounces(sim, live, callbacks.spawnParticles);
  }
  if (sim.ballistic) {
    sim.ballisticTimer -= dt;
    if (sim.ballisticTimer <= 0) sim.ballistic = false;
  }

  const trSpring = stepRK4(sim.tramp.comp, sim.tramp.vComp, 0, 260, 12, dt);
  sim.tramp.comp = trSpring.x;
  sim.tramp.vComp = trSpring.v;

  if (live.trampolineOn && !live.gravityFlipped && sim.vy > 0) {
    const padY = sim.floorY + 26;
    if (Math.abs(sim.x - sim.tramp.x) < 76 && sim.y + 38 >= padY && sim.y + 38 <= padY + 34) {
      sim.y = padY - 38;
      sim.tramp.combo = Math.min(5, sim.tramp.combo + 1);
      sim.vy = -(560 + sim.tramp.combo * 105);
      sim.tramp.comp = 22;
      sim.tramp.vComp = 160;
      sim.sx = 0.72;
      sim.sy = 1.34;
      sim.flipping = true;
      sim.flipDeg = 0;
      playComedySound("slideUp", live.soundOn, 0.95 + sim.tramp.combo * 0.12);
      callbacks.spawnParticles("confetti", sim.tramp.x, padY, 8);
      if (sim.tramp.combo >= 3) {
        callbacks.say(`SUPER BOUNCE ×${sim.tramp.combo}!! WATCH THE CEILING!!`, 1800, true);
      }
    }
  }

  if (sim.portals.cyan && sim.portals.orange && sim.charPortalCd <= 0) {
    const moved = tryTeleportCharacter(sim, sim.portals.cyan, sim.portals.orange, live, callbacks);
    if (!moved) tryTeleportCharacter(sim, sim.portals.orange, sim.portals.cyan, live, callbacks);
  }

  containCharacter(sim, minX, maxX, live, callbacks);
}

export function stepCloneDuel(
  sim: SimState,
  live: LiveSnapshot,
  elements: CompanionElements,
  dt: number
): void {
  if (!sim.clone.active) return;
  const gravDir = live.gravityFlipped ? -1 : 1;
  const cl = sim.clone;
  cl.vy += 980 * gravDir * dt;
  const offset = cl.x >= sim.x ? 190 : -190;
  const targetCloneX = clamp(sim.x + offset, 84, sim.w - 84);
  cl.vx += clamp((targetCloneX - cl.x) * 4.2, -320, 320) * dt;
  cl.vx *= Math.exp(-dt * 2.2);
  cl.x += cl.vx * dt;
  cl.y += cl.vy * dt;
  cl.rot = clamp(cl.vx * 0.045, -18, 18);

  const cloneFloor = sim.floorY - 14;
  if (cl.y > cloneFloor) {
    cl.y = cloneFloor;
    cl.vy = -(440 + Math.random() * 140);
  } else if (cl.y < sim.ceilY + 12) {
    cl.y = sim.ceilY + 12;
    cl.vy = 220;
  }
  cl.x = clamp(cl.x, 76, sim.w - 76);

  if (elements.cloneWrap) {
    elements.cloneWrap.style.transform = `translate3d(${Math.round(cl.x)}px, ${Math.round(cl.y)}px, 0) translate(-50%, -50%) scale(0.66) rotate(${cl.rot.toFixed(1)}deg)`;
  }
  if (elements.cloneBubble) {
    const cbx = Math.round(clamp(cl.x, 120, sim.w - 120));
    const placeBelow = live.gravityFlipped || cl.y < 185;
    const cby = Math.round(placeBelow ? clamp(cl.y + 76, 130, sim.h - 140) : clamp(cl.y - 78, 118, sim.h - 150));
    elements.cloneBubble.style.transform = `translate3d(${cbx}px, ${cby}px, 0) translate(-50%, ${placeBelow ? "0%" : "-100%"})`;
  }
}

function resolveHandTargets(
  sim: SimState,
  live: LiveSnapshot,
  dm: MoodId
): { tHLX: number; tHLY: number; tHRX: number; tHRY: number; rHL: number; rHR: number } {
  const t = sim.time;
  const tHLX = 82 + sim.headX * 6;
  const tHLY = 204 + Math.sin(t * 2.6) * 4;
  const tHRX = 258 + sim.headX * 6;
  const tHRY = 204 + Math.sin(t * 2.6 + 0.8) * 4;
  const rHL = -14;
  const rHR = 14;

  if (live.secretMode) {
    return { tHLX: 142, tHLY: 146, tHRX: 198, tHRY: live.peeking ? 180 : 146, rHL: 18, rHR: live.peeking ? -6 : -18 };
  }
  if (live.photoPosing) {
    return { tHLX: 88, tHLY: 212, tHRX: 258, tHRY: 142, rHL, rHR: 16 };
  }
  if (live.playMode === "dj") {
    const b = Math.sin(t * 8.4) * 16 + sim.beatEnergy * 18;
    return { tHLX: 88, tHLY: 180 - b, tHRX: 252, tHRY: 180 + b * 0.7, rHL: -22, rHR: 22 };
  }
  if (live.playMode === "laser" || live.playMode === "catch") {
    const sw = Math.sin(t * 14) * 12;
    return { tHLX: 98 + sim.headX * 18, tHLY: 188 + sw, tHRX: 242 + sim.headX * 18, tHRY: 188 - sw, rHL: -22, rHR: 22 };
  }
  if (dm === "dramatic") {
    return { tHLX: 96, tHLY: 224, tHRX: 194, tHRY: 104, rHL, rHR: -36 };
  }
  if (dm === "smug") {
    return { tHLX: 94, tHLY: 216, tHRX: 266, tHRY: 162, rHL, rHR: 22 };
  }
  if (dm === "grumpy") {
    return { tHLX: 146, tHLY: 204, tHRX: 194, tHRY: 204, rHL: 28, rHR: -28 };
  }
  if (live.tickledActive || live.isHeld) {
    const fl = Math.sin(t * 24) * 18;
    return { tHLX: 76, tHLY: 168 - fl, tHRX: 264, tHRY: 168 + fl, rHL: -34, rHR: 34 };
  }
  if (dm === "hype" || dm === "lovestruck" || live.pettingActive) {
    const wave = Math.sin(t * 10) * 10;
    return { tHLX: 84, tHLY: 132 + wave, tHRX: 256, tHRY: 132 - wave, rHL: -30, rHR: 30 };
  }
  if (live.cursorSnatched) {
    return { tHLX: 84, tHLY: 194, tHRX: 268, tHRY: 146 + Math.sin(t * 14) * 8, rHL, rHR: 24 };
  }
  if (dm === "zen") {
    return { tHLX: 114, tHLY: 214, tHRX: 226, tHRY: 214, rHL: 12, rHR: -12 };
  }
  return { tHLX, tHLY, tHRX, tHRY, rHL, rHR };
}

const attrCache = new WeakMap<Element, string>();

function setTransformAttr(el: Element | null, value: string): void {
  if (!el) return;
  if (attrCache.get(el) === value) return;
  attrCache.set(el, value);
  el.setAttribute("transform", value);
}

const styleCache = new WeakMap<HTMLElement, string>();

function setStyleTransform(el: HTMLElement | null, value: string): void {
  if (!el) return;
  if (styleCache.get(el) === value) return;
  styleCache.set(el, value);
  el.style.transform = value;
}

export function stepRigAndCommitDom(
  sim: SimState,
  live: LiveSnapshot,
  chaseSnack: SnackEntity | null,
  elements: CompanionElements,
  dt: number
): { drawX: number; drawY: number } {
  const dm = live.displayMood;
  const t = sim.time;
  const ptrSpeed = Math.hypot(sim.ptrVx, sim.ptrVy);

  const scrouch = stepRK4(sim.crouchY, sim.vCrouchY, dm === "paranoid" && ptrSpeed > 320 ? 1 : 0, 160, 16, dt);
  sim.crouchY = clamp(scrouch.x, 0, 1.1);
  sim.vCrouchY = scrouch.v;

  const sfs = stepRK4(sim.faceScale, sim.vFaceScale, live.sourActive ? 0.44 : 1.0, 220, 14, dt);
  sim.faceScale = clamp(sfs.x, 0.36, 1.25);
  sim.vFaceScale = sfs.v;

  const squishSX = sim.squishCharge > 0.01 ? 1 + sim.squishCharge * 0.42 : 1;
  const squishSY = sim.squishCharge > 0.01 ? 1 - sim.squishCharge * 0.38 : 1;
  const goalSX = live.spinTopActive ? 0.72 : squishSX + sim.crouchY * 0.24;
  const goalSY = live.spinTopActive ? 0.72 : squishSY - sim.crouchY * 0.26;
  const rsx = stepRK4(sim.sx, sim.vsx, goalSX, 220, 16, dt);
  const rsy = stepRK4(sim.sy, sim.vsy, goalSY, 220, 16, dt);
  sim.sx = clamp(rsx.x, 0.56, 1.5);
  sim.vsx = rsx.v;
  sim.sy = clamp(rsy.x, 0.56, 1.44);
  sim.vsy = rsy.v;

  if (sim.flipping) {
    sim.flipDeg += dt * 560;
    if (sim.flipDeg >= 360) {
      sim.flipDeg = 0;
      sim.flipping = false;
    }
  }

  let targetRot = clamp(sim.vx * 0.032, -22, 22);
  if (live.gravityFlipped) targetRot = 180 + clamp(-sim.vx * 0.03, -15, 15);
  else if (live.spinTopActive) targetRot = (t * 1400) % 360;
  else if (live.tickledActive) targetRot = Math.sin(t * 28) * 16;
  else if (live.dizzyActive) targetRot = Math.sin(t * 14) * 14;
  else if (live.playMode === "dj") targetRot = Math.sin(t * 6.5) * (6 + sim.beatEnergy * 8);
  else if (dm === "dramatic") targetRot = -14 + Math.sin(t * 2.2) * 8;
  else if (dm === "smug") targetRot = -6;
  else if (dm === "sleepy") targetRot = -5 + Math.sin(t * 1.1) * 1.5;

  if (live.spinTopActive) {
    sim.rot = targetRot;
  } else {
    const rRot = stepRK4(sim.rot, sim.vRot, targetRot, 115, 14, dt);
    sim.rot = rRot.x;
    sim.vRot = rRot.v;
  }

  let lookX = clamp((sim.ptrX - sim.x) / Math.max(180, sim.w * 0.34), -1, 1);
  let lookY = clamp((sim.ptrY - sim.y) / Math.max(160, sim.h * 0.34), -1, 1);
  if (chaseSnack) {
    lookX = clamp((chaseSnack.x - sim.x) / 180, -1, 1);
    lookY = clamp((chaseSnack.y - sim.y) / 160, -1, 1);
  } else if (live.playMode === "catch" && sim.ball) {
    lookX = clamp((sim.ball.x - sim.x) / 180, -1, 1);
    lookY = clamp((sim.ball.y - sim.y) / 160, -1, 1);
  } else if (dm === "paranoid") {
    lookX = Math.sin(t * 6.5) > 0 ? 0.85 : -0.85;
    lookY = -0.15;
  } else if (dm === "sneaky") {
    lookX = Math.sin(t * 2.4) * 0.85;
    lookY = 0.08;
  } else if (dm === "existential") {
    lookX = 0;
    lookY = -0.1;
  } else if (live.chatFocused && live.chatLen > 0) {
    lookX = -0.82 + clamp(live.chatLen / 24, 0, 1) * 1.64;
    lookY = 0.65;
  } else if (live.secretMode) {
    lookX = live.peeking ? 0.36 : 0;
    lookY = 0.25;
  }

  const shx = stepRK4(sim.headX, sim.vHeadX, lookX, 115, 16, dt);
  const shy = stepRK4(sim.headY, sim.vHeadY, lookY, 115, 16, dt);
  sim.headX = shx.x;
  sim.vHeadX = shx.v;
  sim.headY = shy.x;
  sim.vHeadY = shy.v;

  const sant = stepRK4(sim.antBend, sim.vAntBend, clamp(-sim.vx * 0.06 + Math.sin(t * 2.6) * 4, -32, 32), 120, 8.5, dt);
  sim.antBend = clamp(sant.x, -38, 38);
  sim.vAntBend = sant.v;

  const sey = stepRK4(sim.eyelid, sim.vEyelid, dm === "sleepy" ? 0.14 : sim.targetEyelid, 340, 25, dt);
  sim.eyelid = clamp(sey.x, 0.04, 1.12);
  sim.vEyelid = sey.v;

  const hands = resolveHandTargets(sim, live, dm);
  const sHLX = stepRK4(sim.hlX, sim.vHlX, hands.tHLX, 155, 17, dt);
  const sHLY = stepRK4(sim.hlY, sim.vHlY, hands.tHLY, 155, 17, dt);
  const sHRX = stepRK4(sim.hrX, sim.vHrX, hands.tHRX, 155, 17, dt);
  const sHRY = stepRK4(sim.hrY, sim.vHrY, hands.tHRY, 155, 17, dt);
  sim.hlX = sHLX.x;
  sim.vHlX = sHLX.v;
  sim.hlY = sHLY.x;
  sim.vHlY = sHLY.v;
  sim.hrX = sHRX.x;
  sim.vHrX = sHRX.v;
  sim.hrY = sHRY.x;
  sim.vHrY = sHRY.v;

  const spdX = Math.abs(sim.vx);
  if (spdX > 16 || live.tickledActive || live.isHeld) {
    sim.walkPhase += dt * (live.tickledActive ? 28 : 8 + spdX * 0.035);
  }
  const fKickL = Math.sin(sim.walkPhase) * (live.tickledActive ? 20 : Math.min(12, spdX * 0.05));
  if (elements.footL) elements.footL.setAttribute("transform", `rotate(${fKickL.toFixed(1)} 146 254)`);
  if (elements.footR) elements.footR.setAttribute("transform", `rotate(${(-fKickL).toFixed(1)} 194 254)`);

  if (live.accessory === "propeller" && elements.propBlade) {
    sim.propellerDeg = (sim.propellerDeg + dt * (280 + spdX * 1.4 + Math.abs(sim.vy) * 1.2)) % 360;
    const scaleX = Math.cos((sim.propellerDeg * Math.PI) / 180);
    elements.propBlade.setAttribute("transform", `translate(170 46) scale(${scaleX.toFixed(2)} 1) translate(-170 -46)`);
  }

  const cafVibX = dm === "caffeinated" ? Math.sin(t * 90) * 2.2 : 0;
  const cafVibY = dm === "caffeinated" ? Math.cos(t * 86) * 1.6 : 0;
  const squishJitX = sim.squishCharge > 0.25 ? Math.sin(t * 48) * sim.squishCharge * 2.0 : 0;
  const isHomeIdle = live.viewMode === "home" && live.playMode === "interact" && !sim.drag.active;
  const idleBob = isHomeIdle ? 0 : dm === "playful" && !sim.drag.active ? Math.sin(t * 3.8) * 3 : Math.sin(t * 2.0) * 1.8;
  const drawX = sim.x + cafVibX + squishJitX;
  const drawY = sim.y + idleBob + cafVibY + sim.crouchY * 18;
  const sc =
    live.viewMode === "portfolio"
      ? 0.56
      : live.viewMode === "home"
        ? sim.w >= 768
          ? 0.74
          : 0.58
        : 1.0;

  setStyleTransform(
    elements.charWrap,
    `translate3d(${drawX.toFixed(2)}px, ${drawY.toFixed(2)}px, 0) translate(-50%, -50%) scale(${sc})`
  );
  setTransformAttr(
    elements.rigTransform,
    `translate(170 250) scale(${sim.sx.toFixed(2)} ${sim.sy.toFixed(2)}) translate(0 -70) rotate(${(sim.rot + sim.flipDeg).toFixed(1)}) translate(-170 -180)`
  );
  setTransformAttr(
    elements.faceGroup,
    `translate(${(170 + sim.headX * 10).toFixed(1)} ${(154 + sim.headY * 7).toFixed(1)}) scale(${sim.faceScale.toFixed(2)}) translate(-170 -154)`
  );
  setTransformAttr(
    elements.pupils,
    `translate(${(sim.headX * 8.5).toFixed(1)} ${(sim.headY * 6).toFixed(1)})`
  );
  setTransformAttr(
    elements.eyeL,
    `translate(144 150) scale(1 ${sim.eyelid.toFixed(2)}) translate(-144 -150)`
  );
  setTransformAttr(
    elements.eyeR,
    `translate(196 150) scale(1 ${sim.eyelid.toFixed(2)}) translate(-196 -150)`
  );
  setTransformAttr(
    elements.handL,
    `translate(${sim.hlX.toFixed(1)} ${sim.hlY.toFixed(1)}) rotate(${hands.rHL.toFixed(1)})`
  );
  setTransformAttr(
    elements.handR,
    `translate(${sim.hrX.toFixed(1)} ${sim.hrY.toFixed(1)}) rotate(${hands.rHR.toFixed(1)})`
  );
  setTransformAttr(elements.antL, `rotate(${(sim.antBend * 0.7 - 18).toFixed(1)} 144 82)`);
  setTransformAttr(elements.antR, `rotate(${(sim.antBend * 0.7 + 18).toFixed(1)} 196 82)`);
  setTransformAttr(elements.halo, `translate(0 ${(Math.sin(t * 3.0) * 4).toFixed(1)})`);
  if (elements.snotBubble) {
    elements.snotBubble.setAttribute("r", (5 + Math.abs(Math.sin(t * 1.45)) * 12).toFixed(1));
  }
  if (elements.flame) {
    const flScale = 0.85 + Math.abs(Math.sin(t * 26)) * 0.35;
    setTransformAttr(elements.flame, `translate(170 176) scale(${flScale.toFixed(2)}) translate(-170 -176)`);
  }

  const jetOp = Math.abs(sim.vy) > 60 || dm === "zen" ? (0.7 + Math.sin(t * 28) * 0.28).toFixed(2) : "0";
  if (elements.boosterL) elements.boosterL.setAttribute("opacity", jetOp);
  if (elements.boosterR) elements.boosterR.setAttribute("opacity", jetOp);

  if (elements.shadow) {
    const refY = live.gravityFlipped ? sim.ceilY - 40 : sim.floorY + 58;
    const alt = Math.abs(refY - drawY);
    const f = clamp(1 - alt / 400, 0.22, 1.06);
    setStyleTransform(
      elements.shadow,
      `translate3d(${drawX.toFixed(1)}px, ${refY.toFixed(1)}px, 0) translate(-50%, -50%) scale(${(f * sc).toFixed(2)})`
    );
    elements.shadow.style.opacity = (0.2 * f * f).toFixed(2);
  }

  if (elements.speech) {
    const maxBW = Math.min(320, sim.w - 32);
    const bx = Math.round(clamp(sim.x, maxBW * 0.5 + 16, sim.w - maxBW * 0.5 - 16));
    const topOffset = (live.accessory !== "none" ? 114 : 96) * sc;
    const placeBelow = live.gravityFlipped || sim.y < 185;
    const by = Math.round(
      placeBelow
        ? clamp(sim.y + 94 * sc, 120, sim.h - 145)
        : clamp(sim.y - topOffset, 125, sim.h - 155)
    );
    setStyleTransform(
      elements.speech,
      `translate3d(${bx}px, ${by}px, 0) translate(-50%, ${placeBelow ? "0%" : "-100%"})`
    );
  }

  if (live.featherTool && elements.featherDom) {
    const wig = Math.sin(t * 14) * 6;
    setStyleTransform(
      elements.featherDom,
      `translate3d(${sim.ptrX.toFixed(1)}px, ${sim.ptrY.toFixed(1)}px, 0) rotate(${(-24 + wig).toFixed(1)}deg)`
    );
  }

  return { drawX, drawY };
}

export type { SoundKind };
