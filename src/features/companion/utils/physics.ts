/**
 * Pure math helpers and 4th-order Runge-Kutta (RK4) damped spring integrator
 * for 60 FPS companion motion.
 */
export function clamp(v: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, v));
}

export interface SpringStepResult {
  x: number;
  v: number;
}

export function stepRK4(
  x: number,
  v: number,
  target: number,
  k: number,
  c: number,
  dt: number
): SpringStepResult {
  const h = Math.min(0.032, Math.max(0.0005, dt));
  const acc = (p: number, vel: number): number => (target - p) * k - vel * c;

  const a1 = acc(x, v);
  const x2 = x + v * h * 0.5;
  const v2 = v + a1 * h * 0.5;
  const a2 = acc(x2, v2);

  const x3 = x + v2 * h * 0.5;
  const v3 = v + a2 * h * 0.5;
  const a3 = acc(x3, v3);

  const x4 = x + v3 * h;
  const v4 = v + a3 * h;
  const a4 = acc(x4, v4);

  return {
    x: x + ((v + 2 * v2 + 2 * v3 + v4) * h) / 6,
    v: v + ((a1 + 2 * a2 + 2 * a3 + a4) * h) / 6,
  };
}

export function closestPointOnSegment(
  px: number,
  py: number,
  ax: number,
  ay: number,
  bx: number,
  by: number
): { x: number; y: number } {
  const vx = bx - ax;
  const vy = by - ay;
  const l2 = vx * vx + vy * vy;
  if (l2 < 1e-5) return { x: ax, y: ay };
  const t = clamp(((px - ax) * vx + (py - ay) * vy) / l2, 0, 1);
  return { x: ax + t * vx, y: ay + t * vy };
}

export function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "");
  const n = parseInt(clean, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export function rgbaStr(rgb: [number, number, number], a: number): string {
  return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${clamp(a, 0, 1).toFixed(3)})`;
}
