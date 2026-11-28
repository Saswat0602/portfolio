import { CHARACTER_STYLES, type MoodId } from "@/lib/data";
import type { LiveSnapshot, PortalPoint, SimState } from "../types";
import { clamp, hexToRgb, rgbaStr } from "./physics";

function drawMoodBackdropFx(
  ctx: CanvasRenderingContext2D,
  sim: SimState,
  dm: MoodId,
  drawX: number,
  drawY: number,
  isDark: boolean,
  dt: number
): void {
  const { w, h, floorY, time: t } = sim;

  if (dm === "dramatic") {
    ctx.fillStyle = isDark ? "rgba(0, 0, 0, 0.45)" : "rgba(14, 16, 24, 0.36)";
    ctx.fillRect(0, 0, w, h);
    const spotG = ctx.createLinearGradient(drawX, 0, drawX, floorY + 70);
    spotG.addColorStop(0, "rgba(255, 248, 220, 0.34)");
    spotG.addColorStop(0.75, "rgba(255, 248, 220, 0.14)");
    spotG.addColorStop(1, "rgba(255, 248, 220, 0)");
    ctx.fillStyle = spotG;
    ctx.beginPath();
    ctx.moveTo(drawX - 38, 0);
    ctx.lineTo(drawX + 38, 0);
    ctx.lineTo(drawX + 185, floorY + 80);
    ctx.lineTo(drawX - 185, floorY + 80);
    ctx.closePath();
    ctx.fill();
  }

  if (dm === "caffeinated") {
    ctx.save();
    ctx.strokeStyle = isDark ? "rgba(251, 191, 36, 0.22)" : "rgba(224, 62, 45, 0.16)";
    ctx.lineWidth = 1.5;
    for (let i = 0; i < 18; i++) {
      const a = (i / 18) * Math.PI * 2 + Math.sin(t * 24 + i) * 0.05;
      const r0 = 150 + ((t * 420 + i * 37) % 90);
      const r1 = r0 + 180;
      ctx.beginPath();
      ctx.moveTo(drawX + Math.cos(a) * r0, drawY + Math.sin(a) * r0);
      ctx.lineTo(drawX + Math.cos(a) * r1, drawY + Math.sin(a) * r1);
      ctx.stroke();
    }
    ctx.restore();
  }

  if (dm === "zen") {
    for (let r = 0; r < 3; r++) {
      const p = (t * 0.38 + r / 3) % 1;
      ctx.strokeStyle = `rgba(212, 160, 55, ${((1 - p) * 0.36).toFixed(3)})`;
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.arc(drawX, drawY, 68 + p * 120, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  if (dm === "existential") {
    const cloudX = drawX;
    const cloudY = drawY - 122;
    ctx.fillStyle = isDark ? "#3B4252" : "#525968";
    ctx.beginPath();
    ctx.arc(cloudX - 24, cloudY, 17, 0, Math.PI * 2);
    ctx.arc(cloudX, cloudY - 9, 22, 0, Math.PI * 2);
    ctx.arc(cloudX + 25, cloudY - 2, 16, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = isDark ? "rgba(147, 197, 253, 0.55)" : "rgba(59, 130, 246, 0.55)";
    ctx.lineWidth = 1.5;
    ctx.lineCap = "round";
    sim.rainDrops.forEach((rd) => {
      rd.y = (rd.y + rd.spd * dt) % 92;
      ctx.beginPath();
      ctx.moveTo(cloudX + rd.x, cloudY + 12 + rd.y);
      ctx.lineTo(cloudX + rd.x - 2, cloudY + 20 + rd.y);
      ctx.stroke();
    });
  }
}

function drawInteractiveModesFx(
  ctx: CanvasRenderingContext2D,
  sim: SimState,
  live: LiveSnapshot,
  drawX: number,
  drawY: number,
  accentHex: string,
  dt: number
): void {
  const accentRgb = hexToRgb(accentHex);
  const isDark = live.theme === "dark";

  // Magnet mode contour rings
  if (live.playMode === "magnet" && sim.ptrActive) {
    ctx.save();
    for (let r = 0; r < 4; r++) {
      const phase = (sim.time * 0.8 + r * 0.25) % 1;
      const rad = 28 + phase * 150;
      ctx.beginPath();
      ctx.arc(sim.ptrX, sim.ptrY, rad, 0, Math.PI * 2);
      ctx.strokeStyle = rgbaStr(accentRgb, (1 - phase) * (isDark ? 0.48 : 0.38));
      ctx.lineWidth = 1.4;
      ctx.stroke();
    }
    ctx.setLineDash([4, 5]);
    ctx.strokeStyle = rgbaStr(accentRgb, 0.42);
    ctx.beginPath();
    ctx.moveTo(sim.ptrX, sim.ptrY);
    ctx.lineTo(drawX, drawY);
    ctx.stroke();
    ctx.restore();
  }

  // Paint luminous elastic ribbons
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  const drawRibbon = (pts: PortalPoint[], col: string) => {
    if (pts.length < 2) return;
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
    ctx.strokeStyle = rgbaStr(hexToRgb(col), isDark ? 0.32 : 0.22);
    ctx.lineWidth = 13;
    ctx.stroke();
    ctx.strokeStyle = col;
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.72)";
    ctx.lineWidth = 1.5;
    ctx.stroke();
  };
  sim.strokes.forEach((st) => drawRibbon(st.pts, st.color));
  if (sim.activeStroke) drawRibbon(sim.activeStroke.pts, sim.activeStroke.color);

  if (sim.criticScanY >= 0) {
    sim.criticScanY += dt * 190;
    if (sim.criticScanY > sim.floorY) sim.criticScanY = 85;
    const sg = ctx.createLinearGradient(0, sim.criticScanY - 22, 0, sim.criticScanY + 22);
    sg.addColorStop(0, "rgba(245, 158, 11, 0)");
    sg.addColorStop(0.5, "rgba(245, 158, 11, 0.34)");
    sg.addColorStop(1, "rgba(245, 158, 11, 0)");
    ctx.fillStyle = sg;
    ctx.fillRect(0, sim.criticScanY - 22, sim.w, 44);
    ctx.strokeStyle = "#F59E0B";
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(0, sim.criticScanY);
    ctx.lineTo(sim.w, sim.criticScanY);
    ctx.stroke();
  }

  // Catch mode volley ball + cursor bumper
  if (live.playMode === "catch" && sim.ball) {
    const b = sim.ball;
    if (sim.ptrActive) {
      ctx.beginPath();
      ctx.arc(sim.ptrX, sim.ptrY, 24, 0, Math.PI * 2);
      ctx.strokeStyle = rgbaStr(accentRgb, 0.6);
      ctx.lineWidth = 1.6;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(sim.ptrX, sim.ptrY, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = accentHex;
      ctx.fill();
    }
    for (let i = 0; i < b.trail.length; i++) {
      const frac = (i + 1) / b.trail.length;
      ctx.fillStyle = rgbaStr(accentRgb, frac * 0.28);
      ctx.beginPath();
      ctx.arc(b.trail[i].x, b.trail[i].y, b.r * frac * 0.72, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.save();
    ctx.translate(b.x, b.y);
    ctx.rotate(b.angle);
    const bg = ctx.createRadialGradient(-4, -5, 2, 0, 0, b.r);
    bg.addColorStop(0, "#FFFFFF");
    bg.addColorStop(0.5, accentHex);
    bg.addColorStop(1, "#1E3A8A");
    ctx.fillStyle = bg;
    ctx.beginPath();
    ctx.arc(0, 0, b.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // Laser mode crimson dot + trail
  if (live.playMode === "laser" && sim.ptrActive) {
    for (let i = sim.laserTrail.length - 1; i >= 0; i--) {
      const frac = 1 - i / sim.laserTrail.length;
      const pt = sim.laserTrail[i];
      ctx.fillStyle = `rgba(239, 68, 68, ${(frac * 0.45).toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 2 + frac * 5.5, 0, Math.PI * 2);
      ctx.fill();
    }
    const lg = ctx.createRadialGradient(sim.ptrX, sim.ptrY, 1, sim.ptrX, sim.ptrY, 18);
    lg.addColorStop(0, "#FFFFFF");
    lg.addColorStop(0.28, "#FF2A2A");
    lg.addColorStop(1, "rgba(239, 68, 68, 0)");
    ctx.fillStyle = lg;
    ctx.beginPath();
    ctx.arc(sim.ptrX, sim.ptrY, 18, 0, Math.PI * 2);
    ctx.fill();
  }

  // Bugs & laser zaps
  sim.lasers.forEach((lz) => {
    const a = clamp(1 - lz.age / 0.22, 0, 1);
    ctx.strokeStyle = `rgba(56, 189, 248, ${a.toFixed(3)})`;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(lz.x0, lz.y0);
    ctx.lineTo(lz.x1, lz.y1);
    ctx.stroke();
    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 1.5;
    ctx.stroke();
  });

  sim.bugs.forEach((bug) => {
    ctx.save();
    ctx.translate(bug.x, bug.y);
    const wig = Math.sin(bug.legPhase) * 3;
    ctx.strokeStyle = "#10B981";
    ctx.lineWidth = 1.6;
    [-1, 1].forEach((side) => {
      ctx.beginPath();
      ctx.moveTo(side * 8, -4);
      ctx.lineTo(side * 14, -7 + wig);
      ctx.moveTo(side * 9, 2);
      ctx.lineTo(side * 15, 2 - wig);
      ctx.stroke();
    });
    ctx.fillStyle = "#064E3B";
    ctx.strokeStyle = "#34D399";
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.roundRect(-14, -10, 28, 20, 8);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#ECFDF5";
    ctx.font = '700 8px "JetBrains Mono", monospace';
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(bug.tag, 0, 0.5);
    ctx.restore();
  });

  // Sound rings & mini-clones
  sim.soundRings.forEach((sr) => {
    ctx.save();
    ctx.strokeStyle = sr.color;
    ctx.globalAlpha = clamp(1 - sr.age, 0, 1) * 0.55;
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.ellipse(sr.x, sr.y, sr.r, sr.r * 0.36, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  });

  sim.miniClones.forEach((cl) => {
    ctx.save();
    ctx.translate(cl.x, cl.y);
    ctx.globalAlpha = clamp(cl.ttl / 0.8, 0, 0.92);
    ctx.fillStyle = isDark ? "#1E293B" : "#FFFFFF";
    ctx.strokeStyle = accentHex;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(-18, -16, 36, 30, 12);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#0D1017";
    ctx.beginPath();
    ctx.roundRect(-13, -9, 26, 16, 7);
    ctx.fill();
    ctx.fillStyle = accentHex;
    ctx.beginPath();
    ctx.roundRect(-7, -5, 4, 7, 2);
    ctx.roundRect(3, -5, 4, 7, 2);
    ctx.fill();
    ctx.restore();
  });
}

function drawPortal(
  ctx: CanvasRenderingContext2D,
  pt: PortalPoint | null,
  colA: string,
  colB: string,
  label: string,
  t: number
): void {
  if (!pt) return;
  ctx.save();
  ctx.translate(pt.x, pt.y);

  const pg = ctx.createRadialGradient(0, 0, 8, 0, 0, 44);
  pg.addColorStop(0, "#090A0F");
  pg.addColorStop(0.62, colA);
  pg.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = pg;
  ctx.beginPath();
  ctx.ellipse(0, 0, 32, 46, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = colB;
  ctx.lineWidth = 2.6;
  ctx.setLineDash([12, 8]);
  ctx.lineDashOffset = -t * 75;
  ctx.beginPath();
  ctx.ellipse(0, 0, 26, 40, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.font = '600 9px "JetBrains Mono", monospace';
  ctx.textAlign = "center";
  ctx.fillStyle = colB;
  ctx.fillText(label, 0, -52);
  ctx.restore();
}

function drawTrampoline(
  ctx: CanvasRenderingContext2D,
  sim: SimState,
  isDark: boolean
): void {
  const tx = sim.tramp.x;
  const baseY = sim.floorY + 52;
  const topY = sim.floorY + 26 + sim.tramp.comp * 0.7;

  ctx.strokeStyle = isDark ? "#94A3B8" : "#334155";
  ctx.lineWidth = 4;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(tx - 62, topY + 4);
  ctx.lineTo(tx - 70, baseY);
  ctx.moveTo(tx + 62, topY + 4);
  ctx.lineTo(tx + 70, baseY);
  ctx.stroke();

  ctx.strokeStyle = "#94A3B8";
  ctx.lineWidth = 1.6;
  [-34, 0, 34].forEach((ox) => {
    ctx.beginPath();
    ctx.moveTo(tx + ox, topY + 6);
    for (let s = 1; s <= 4; s++) {
      const sy = topY + 6 + ((baseY - topY - 6) * s) / 4;
      ctx.lineTo(tx + ox + (s % 2 === 0 ? -5 : 5), sy);
    }
    ctx.stroke();
  });

  ctx.fillStyle = "#E03E2D";
  ctx.strokeStyle = "#FFFFFF";
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.roundRect(tx - 74, topY - 5, 148, 13, 6.5);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(tx - 24, topY - 3, 48, 9);
}

function drawSnacks(ctx: CanvasRenderingContext2D, sim: SimState, isDark: boolean): void {
  sim.snacks.forEach((sn) => {
    ctx.save();
    ctx.translate(sn.x, sn.y);
    ctx.rotate(sn.rot);
    ctx.fillStyle = isDark ? "rgba(0,0,0,0.45)" : "rgba(20,20,22,0.14)";
    ctx.beginPath();
    ctx.arc(0, 6, 17, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = isDark ? "#1D202A" : "#FFFFFF";
    ctx.strokeStyle = sn.color;
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.arc(0, 0, 19, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.font = "20px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(sn.emoji, 0, 1);
    ctx.restore();
  });
}

function updateAndDrawParticles(
  ctx: CanvasRenderingContext2D,
  sim: SimState,
  isDark: boolean,
  dt: number
): void {
  const dprScale = ctx.getTransform().a || 1;
  for (let i = sim.particles.length - 1; i >= 0; i--) {
    const pt = sim.particles[i];
    pt.age += dt;
    if (pt.age >= pt.life) {
      sim.particles.splice(i, 1);
      continue;
    }
    if (pt.kind === "confetti" || pt.kind === "tissue") pt.vy += 380 * dt;
    pt.vx *= Math.exp(-dt * 2.2);
    pt.x += pt.vx * dt;
    pt.y += pt.vy * dt;
    pt.rot += pt.vRot * dt;

    const alpha = clamp(1 - pt.age / pt.life, 0, 1);
    ctx.globalAlpha = alpha;
    ctx.setTransform(dprScale, 0, 0, dprScale, 0, 0);
    ctx.translate(pt.x, pt.y);
    ctx.rotate(pt.rot);

    if (pt.kind === "poof") {
      ctx.fillStyle = isDark ? "#E5E7EB" : "#FFFFFF";
      ctx.strokeStyle = "rgba(20,20,22,0.12)";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(0, 0, pt.size * (0.6 + (1 - alpha) * 0.7), 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    } else if (pt.kind === "dust") {
      ctx.fillStyle = isDark ? "rgba(255,255,255,0.24)" : "rgba(110,105,96,0.3)";
      ctx.beginPath();
      ctx.arc(0, 0, pt.size, 0, Math.PI * 2);
      ctx.fill();
    } else if (pt.kind === "confetti" || pt.kind === "tissue") {
      ctx.fillStyle = pt.kind === "tissue" ? "#FFFFFF" : pt.color;
      ctx.fillRect(-pt.size * 0.5, -pt.size * 0.35, pt.size, pt.size * 0.7);
    } else if (pt.kind === "heart") {
      ctx.fillStyle = pt.color;
      ctx.font = "600 14px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("♥", 0, 0);
    } else if (pt.kind === "burp") {
      ctx.strokeStyle = pt.color;
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.arc(0, 0, pt.size * 1.4, 0, Math.PI * 2);
      ctx.stroke();
    } else if (pt.kind === "star") {
      ctx.fillStyle = pt.color;
      const s = pt.size * 1.15;
      ctx.beginPath();
      ctx.moveTo(0, -s);
      ctx.lineTo(s * 0.3, -s * 0.3);
      ctx.lineTo(s, 0);
      ctx.lineTo(s * 0.3, s * 0.3);
      ctx.lineTo(0, s);
      ctx.lineTo(-s * 0.3, s * 0.3);
      ctx.lineTo(-s, 0);
      ctx.lineTo(-s * 0.3, -s * 0.3);
      ctx.closePath();
      ctx.fill();
    }
  }
  ctx.setTransform(dprScale, 0, 0, dprScale, 0, 0);
  ctx.globalAlpha = 1;
}

let wasCanvasDirty = false;

export function renderCompanionStageCanvas(
  ctx: CanvasRenderingContext2D,
  sim: SimState,
  live: LiveSnapshot,
  drawX: number,
  drawY: number,
  dt: number
): void {
  if (sim.w <= 0 || sim.h <= 0) return;

  const hasFx =
    live.displayMood === "dramatic" ||
    live.displayMood === "caffeinated" ||
    live.displayMood === "zen" ||
    live.displayMood === "existential" ||
    live.playMode === "laser" ||
    live.playMode === "magnet" ||
    live.playMode === "catch" ||
    live.playMode === "bugs" ||
    live.trampolineOn ||
    sim.particles.length > 0 ||
    sim.snacks.length > 0 ||
    sim.strokes.length > 0 ||
    sim.activeStroke !== null ||
    sim.miniClones.length > 0 ||
    sim.soundRings.length > 0 ||
    sim.lasers.length > 0 ||
    sim.bugs.length > 0 ||
    sim.ball !== null ||
    sim.portals.cyan !== null ||
    sim.portals.orange !== null ||
    sim.criticScanY >= 0;

  if (!hasFx) {
    if (wasCanvasDirty) {
      ctx.clearRect(0, 0, sim.w, sim.h);
      wasCanvasDirty = false;
    }
    return;
  }

  wasCanvasDirty = true;
  ctx.clearRect(0, 0, sim.w, sim.h);

  const isDark = live.theme === "dark";
  const accentHex =
    CHARACTER_STYLES.find((c) => c.id === live.charStyle)?.accent ?? "#38BDF8";

  drawMoodBackdropFx(ctx, sim, live.displayMood, drawX, drawY, isDark, dt);
  drawInteractiveModesFx(ctx, sim, live, drawX, drawY, accentHex, dt);
  drawPortal(ctx, sim.portals.cyan, "rgba(6, 182, 212, 0.72)", "#22D3EE", "PORTAL IN", sim.time);
  drawPortal(ctx, sim.portals.orange, "rgba(249, 115, 22, 0.72)", "#FB923C", "PORTAL OUT", sim.time);
  if (live.trampolineOn) drawTrampoline(ctx, sim, isDark);
  drawSnacks(ctx, sim, isDark);
  updateAndDrawParticles(ctx, sim, isDark, dt);
}
