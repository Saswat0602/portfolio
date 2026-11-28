import type { MoodId } from "@/lib/data";
import type { PortalPoint, SimState } from "../types";
import { clamp } from "./physics";

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

function drawSnacks(
  ctx: CanvasRenderingContext2D,
  sim: SimState,
  isDark: boolean
): void {
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
  for (let i = sim.particles.length - 1; i >= 0; i--) {
    const pt = sim.particles[i];
    pt.age += dt;
    if (pt.age >= pt.life) {
      sim.particles.splice(i, 1);
      continue;
    }
    if (pt.kind === "confetti") pt.vy += 420 * dt;
    pt.vx *= Math.exp(-dt * 2.2);
    pt.x += pt.vx * dt;
    pt.y += pt.vy * dt;
    pt.rot += pt.vRot * dt;

    const alpha = clamp(1 - pt.age / pt.life, 0, 1);
    ctx.save();
    ctx.translate(pt.x, pt.y);
    ctx.rotate(pt.rot);
    ctx.globalAlpha = alpha;

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
    } else if (pt.kind === "confetti") {
      ctx.fillStyle = pt.color;
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
    }
    ctx.restore();
  }
}

export function renderCompanionStageCanvas(
  ctx: CanvasRenderingContext2D,
  sim: SimState,
  dm: MoodId,
  drawX: number,
  drawY: number,
  isDark: boolean,
  trampolineOn: boolean,
  dt: number
): void {
  if (sim.w <= 0 || sim.h <= 0) return;
  ctx.clearRect(0, 0, sim.w, sim.h);

  drawMoodBackdropFx(ctx, sim, dm, drawX, drawY, isDark, dt);
  drawPortal(ctx, sim.portals.cyan, "rgba(6, 182, 212, 0.72)", "#22D3EE", "PORTAL IN", sim.time);
  drawPortal(ctx, sim.portals.orange, "rgba(249, 115, 22, 0.72)", "#FB923C", "PORTAL OUT", sim.time);
  if (trampolineOn) drawTrampoline(ctx, sim, isDark);
  drawSnacks(ctx, sim, isDark);
  updateAndDrawParticles(ctx, sim, isDark, dt);
}
