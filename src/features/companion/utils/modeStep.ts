import { CATCH_QUIPS_DROP, CATCH_QUIPS_HIT } from "@/lib/data";
import type { LiveSnapshot, ParticleKind, SimState } from "../types";
import { clamp, closestPointOnSegment } from "./physics";
import { playComedySound } from "./audio";

export interface ModeStepCallbacks {
  say: (text: string, holdMs?: number, silent?: boolean) => void;
  spawnParticles: (kind: ParticleKind, x: number, y: number, count?: number, customColor?: string | null) => void;
  onRallyChange: (rally: number) => void;
  onBugsCountChange: (count: number) => void;
}

export function stepInkBounces(
  sim: SimState,
  live: LiveSnapshot,
  spawnParticles: ModeStepCallbacks["spawnParticles"]
): void {
  for (let s = 0; s < sim.strokes.length; s++) {
    const pts = sim.strokes[s].pts;
    for (let p = 0; p < pts.length - 1; p++) {
      const cp = closestPointOnSegment(sim.x, sim.y + 18, pts[p].x, pts[p].y, pts[p + 1].x, pts[p + 1].y);
      const dx = sim.x - cp.x;
      const dy = sim.y + 18 - cp.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 56 && dist > 0.01) {
        const nx = dx / dist;
        const ny = dy / dist;
        sim.x += nx * (56 - dist);
        sim.y += ny * (56 - dist);
        const vn = sim.vx * nx + sim.vy * ny;
        if (vn < 0) {
          sim.vx -= 1.82 * vn * nx;
          sim.vy -= 1.82 * vn * ny;
          sim.sx = 1.24;
          sim.sy = 0.78;
          playComedySound("boing", live.soundOn, 1.35);
          spawnParticles("star", cp.x, cp.y, 5, "#38BDF8");
        }
      }
    }
  }
}

export function stepCatchBall(
  sim: SimState,
  live: LiveSnapshot,
  dt: number,
  callbacks: ModeStepCallbacks
): void {
  if (live.playMode !== "catch" || !sim.ball) return;
  const b = sim.ball;
  b.vy += 600 * dt;
  b.x += b.vx * dt;
  b.y += b.vy * dt;
  b.angle += b.spin * dt;
  b.vx *= Math.exp(-dt * 0.16);
  b.trail.push({ x: b.x, y: b.y });
  if (b.trail.length > 12) b.trail.shift();

  if (b.x - b.r < 18) {
    b.x = 18 + b.r;
    b.vx = Math.abs(b.vx) * 0.88;
  }
  if (b.x + b.r > sim.w - 18) {
    b.x = sim.w - 18 - b.r;
    b.vx = -Math.abs(b.vx) * 0.88;
  }
  if (b.y - b.r < 68) {
    b.y = 68 + b.r;
    b.vy = Math.abs(b.vy) * 0.82;
  }

  for (let s = 0; s < sim.strokes.length; s++) {
    const pts = sim.strokes[s].pts;
    for (let p = 0; p < pts.length - 1; p++) {
      const cp = closestPointOnSegment(b.x, b.y, pts[p].x, pts[p].y, pts[p + 1].x, pts[p + 1].y);
      const dx = b.x - cp.x;
      const dy = b.y - cp.y;
      const d = Math.hypot(dx, dy);
      if (d < b.r + 4 && d > 0.01) {
        const nx = dx / d;
        const ny = dy / d;
        b.x = cp.x + nx * (b.r + 4);
        b.y = cp.y + ny * (b.r + 4);
        const vn = b.vx * nx + b.vy * ny;
        if (vn < 0) {
          b.vx -= 1.85 * vn * nx;
          b.vy -= 1.85 * vn * ny;
          playComedySound("boing", live.soundOn, 1.4);
        }
      }
    }
  }

  if (b.y + b.r > sim.floorY + 52) {
    b.y = sim.floorY + 52 - b.r;
    b.vy = -Math.max(330, Math.abs(b.vy) * 0.74);
    b.vx += (Math.random() - 0.5) * 140;
    if (sim.rally > 0) {
      sim.rally = 0;
      callbacks.onRallyChange(0);
      callbacks.say(CATCH_QUIPS_DROP[Math.floor(Math.random() * CATCH_QUIPS_DROP.length)], 2000, true);
    }
    playComedySound("boing", live.soundOn, 0.82);
  }

  if (sim.ptrActive) {
    const dx = b.x - sim.ptrX;
    const dy = b.y - sim.ptrY;
    const d = Math.hypot(dx, dy);
    if (d < b.r + 26 && d > 0.01) {
      const nx = dx / d;
      const ny = dy / d;
      b.x = sim.ptrX + nx * (b.r + 27);
      b.y = sim.ptrY + ny * (b.r + 27);
      b.vx = clamp((sim.x - b.x) * 1.15 + sim.ptrVx * 0.35, -520, 520);
      b.vy = -clamp(440 + Math.abs(sim.ptrVy) * 0.2, 400, 620);
      b.spin = clamp(b.vx * 0.025, -14, 14);
      if (b.lastHit !== "user") {
        b.lastHit = "user";
        sim.rally += 1;
        callbacks.onRallyChange(sim.rally);
        playComedySound("volley", live.soundOn, sim.rally);
        callbacks.spawnParticles("star", b.x, b.y, 4, "#38BDF8");
      }
    }
  }

  const dBot = Math.hypot(b.x - sim.x, b.y - (sim.y - 10));
  if (dBot < b.r + 56 && b.vy > -80) {
    b.vx = sim.ptrActive ? clamp((sim.ptrX - b.x) * 1.25, -380, 380) : (Math.random() - 0.5) * 280;
    b.vy = -500;
    b.spin = clamp(b.vx * 0.03, -15, 15);
    sim.sx = 1.22;
    sim.sy = 0.8;
    if (b.lastHit !== "bot") {
      b.lastHit = "bot";
      sim.rally += 1;
      callbacks.onRallyChange(sim.rally);
      playComedySound("volley", live.soundOn, sim.rally);
      callbacks.spawnParticles("dust", b.x, b.y, 4);
      if (sim.rally % 4 === 0) {
        callbacks.say(`${CATCH_QUIPS_HIT[sim.rally % CATCH_QUIPS_HIT.length]} (Rally ${sim.rally})`, 1600, true);
      }
    }
  }
}

export function stepBugsAndLasers(
  sim: SimState,
  live: LiveSnapshot,
  dt: number,
  callbacks: ModeStepCallbacks
): void {
  sim.zapCooldown = Math.max(0, sim.zapCooldown - dt);

  for (let i = sim.lasers.length - 1; i >= 0; i--) {
    sim.lasers[i].age += dt;
    if (sim.lasers[i].age > 0.22) sim.lasers.splice(i, 1);
  }

  if (sim.bugs.length === 0) return;

  for (let i = sim.bugs.length - 1; i >= 0; i--) {
    const bug = sim.bugs[i];
    bug.legPhase += dt * 24;
    bug.vx += (Math.random() - 0.5) * 260 * dt;
    bug.vy += (Math.random() - 0.5) * 200 * dt;
    bug.vx = clamp(bug.vx, -190, 190);
    bug.vy = clamp(bug.vy, -140, 140);
    bug.x += bug.vx * dt;
    bug.y += bug.vy * dt;

    if (bug.x < 40) { bug.x = 40; bug.vx = Math.abs(bug.vx); }
    if (bug.x > sim.w - 40) { bug.x = sim.w - 40; bug.vx = -Math.abs(bug.vx); }
    if (bug.y < 86) { bug.y = 86; bug.vy = Math.abs(bug.vy); }
    if (bug.y > sim.floorY + 36) { bug.y = sim.floorY + 36; bug.vy = -Math.abs(bug.vy); }

    const dist = Math.hypot(bug.x - sim.x, bug.y - sim.y);
    if (dist < 145 && sim.zapCooldown <= 0 && !sim.drag.active) {
      sim.lasers.push({ x0: sim.x, y0: sim.y - 16, x1: bug.x, y1: bug.y, age: 0 });
      sim.bugs.splice(i, 1);
      sim.zapCooldown = 0.28;
      sim.sx = 1.15;
      sim.sy = 0.86;
      playComedySound("zap", live.soundOn);
      callbacks.spawnParticles("confetti", bug.x, bug.y, 8, "#10B981");
      callbacks.onBugsCountChange(sim.bugs.length);
      if (sim.bugs.length === 0) {
        playComedySound("chime", live.soundOn);
        callbacks.say("All production bugs neutralized! Zero regressions!", 2600, true);
      }
      break;
    }
  }
}

export function stepMiniClonesAndRings(
  sim: SimState,
  live: LiveSnapshot,
  dt: number,
  spawnParticles: ModeStepCallbacks["spawnParticles"]
): void {
  for (let i = sim.miniClones.length - 1; i >= 0; i--) {
    const cl = sim.miniClones[i];
    cl.ttl -= dt;
    cl.phase += dt * 7;
    if (cl.ttl < 1.1) {
      const dx = sim.x - cl.x;
      const dy = sim.y - cl.y;
      cl.vx = (cl.vx + dx * 24 * dt) * 0.88;
      cl.vy = (cl.vy + dy * 24 * dt) * 0.88;
      cl.x += cl.vx * dt;
      cl.y += cl.vy * dt;
      if (Math.hypot(dx, dy) < 30 || cl.ttl <= 0) {
        sim.miniClones.splice(i, 1);
        sim.sx = 1.16;
        sim.sy = 0.86;
        playComedySound("tick", live.soundOn);
        spawnParticles("star", sim.x, sim.y, 3, "#38BDF8");
      }
    } else {
      if (sim.ptrActive) {
        cl.vx += clamp((sim.ptrX + Math.cos(cl.phase) * 54 - cl.x) * 3.8, -420, 420) * dt;
      }
      cl.vy += 940 * dt;
      cl.x += cl.vx * dt;
      cl.y += cl.vy * dt;
      if (cl.y > sim.floorY + 34) {
        cl.y = sim.floorY + 34;
        cl.vy = -310 - Math.random() * 110;
      }
      if (cl.x < 34) { cl.x = 34; cl.vx = Math.abs(cl.vx); }
      if (cl.x > sim.w - 34) { cl.x = sim.w - 34; cl.vx = -Math.abs(cl.vx); }
    }
  }

  for (let i = sim.soundRings.length - 1; i >= 0; i--) {
    const sr = sim.soundRings[i];
    sr.age += dt * 1.45;
    sr.r += (sr.maxR - sr.r) * Math.min(1, dt * 4.5);
    if (sr.age >= 1) sim.soundRings.splice(i, 1);
  }

  if (live.playMode === "laser") {
    for (let i = sim.laserTrail.length - 1; i > 0; i--) {
      sim.laserTrail[i].x += (sim.laserTrail[i - 1].x - sim.laserTrail[i].x) * 0.45;
      sim.laserTrail[i].y += (sim.laserTrail[i - 1].y - sim.laserTrail[i].y) * 0.45;
    }
    sim.laserTrail[0].x = sim.ptrX;
    sim.laserTrail[0].y = sim.ptrY;
  }
}
