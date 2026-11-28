"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/components/theme/ThemeContext";

interface GlyphMetric {
  w: number;
  h: number;
  left: number;
  ascent: number;
}

interface ShockWave {
  r: number;
  c: number;
  age: number;
}

export interface ElasticHeroNameProps {
  name: string;
  onRippleClick?: () => void;
}

const LINES = ["SASWAT RANJAN", "MOHANTY"] as const;

export function ElasticHeroName({ name, onRippleClick }: ElasticHeroNameProps) {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  const simRef = useRef({
    w: 0,
    h: 0,
    rowWeights: [1, 1],
    rowVels: [0, 0],
    charWeights: LINES.map((line) => new Array<number>(line.length).fill(1)),
    charVels: LINES.map((line) => new Array<number>(line.length).fill(0)),
    pointer: { x: 0, y: 0, active: false },
    shocks: [{ r: 0, c: 6, age: 0 }] as ShockWave[],
    glyphMetrics: {} as Record<string, GlyphMetric>,
  });

  const themeColorsRef = useRef({ ink: "#F0F6FC", accent: "#38BDF8" });
  const wakeRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const styles = getComputedStyle(document.documentElement);
    const ink = styles.getPropertyValue("--color-text-primary").trim() || (theme === "dark" ? "#F0F6FC" : "#111827");
    const accent = styles.getPropertyValue("--color-accent-primary").trim() || (theme === "dark" ? "#38BDF8" : "#2563EB");
    themeColorsRef.current = { ink, accent };
    wakeRef.current?.();
  }, [theme]);

  useEffect(() => {
    if (reducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const REF_SIZE = 140;
    const FONT_SPEC = `900 ${REF_SIZE}px "Outfit", "Inter", -apple-system, BlinkMacSystemFont, sans-serif`;

    const measureGlyphTable = () => {
      const table: Record<string, GlyphMetric> = {};
      ctx.save();
      ctx.font = FONT_SPEC;
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      for (let i = 0; i < chars.length; i++) {
        const ch = chars[i];
        const m = ctx.measureText(ch);
        const left = m.actualBoundingBoxLeft ?? 0;
        const right = m.actualBoundingBoxRight ?? m.width;
        const ascent = m.actualBoundingBoxAscent ?? REF_SIZE * 0.72;
        const descent = m.actualBoundingBoxDescent ?? 0;
        table[ch] = {
          w: Math.max(10, left + right),
          h: Math.max(10, ascent + descent),
          left,
          ascent,
        };
      }
      table[" "] = { w: REF_SIZE * 0.36, h: REF_SIZE * 0.72, left: 0, ascent: REF_SIZE * 0.72 };
      ctx.restore();
      simRef.current.glyphMetrics = table;
    };

    let rafId = 0;
    let last = performance.now();

    const startLoop = () => {
      if (rafId || document.hidden) return;
      last = performance.now();
      rafId = requestAnimationFrame(tick);
    };
    wakeRef.current = startLoop;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.parentElement?.clientWidth || 720;
      const h = canvas.parentElement?.clientHeight || 190;
      simRef.current.w = w;
      simRef.current.h = h;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      measureGlyphTable();
      startLoop();
    };

    resize();
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        measureGlyphTable();
        startLoop();
      });
    }
    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    const tick = (now: number) => {
      rafId = 0;
      if (document.hidden) return;
      const dt = Math.min(0.032, Math.max(0.001, (now - last) / 1000));
      last = now;

      const sim = simRef.current;
      const { w, h, rowWeights, rowVels, charWeights, charVels, pointer, shocks } = sim;
      if (w <= 0 || h <= 0) return;

      for (let i = shocks.length - 1; i >= 0; i--) {
        shocks[i].age += dt * 2.25;
        if (shocks[i].age > 2.4) shocks.splice(i, 1);
      }

      const nRows = LINES.length;
      const ptrRowFloat = pointer.active ? (pointer.y / h) * nRows - 0.5 : -99;
      const ptrNormX = pointer.active ? pointer.x / w : -99;

      let rowSum = 0;
      let maxMotion = shocks.length > 0 || pointer.active ? 1 : 0;

      for (let r = 0; r < nRows; r++) {
        let targetW = 1.0;
        if (pointer.active) {
          const distR = Math.abs(r - ptrRowFloat);
          targetW = 0.82 + Math.exp(-(distR * distR) * 1.4) * 0.48;
        }
        for (let s = 0; s < shocks.length; s++) {
          const sh = shocks[s];
          const dR = Math.abs(r - sh.r);
          const front = sh.age * 3.0;
          const env = Math.exp(-Math.pow(dR - front, 2) * 1.8) * Math.exp(-sh.age * 1.35);
          targetW += Math.cos((dR - front) * 4.5) * env * 0.34;
        }
        targetW = Math.max(0.55, targetW);
        const acc = (targetW - rowWeights[r]) * 125 - rowVels[r] * 18;
        rowVels[r] += acc * dt;
        rowWeights[r] = Math.max(0.5, rowWeights[r] + rowVels[r] * dt);
        rowSum += rowWeights[r];
        maxMotion = Math.max(maxMotion, Math.abs(rowVels[r]), Math.abs(targetW - rowWeights[r]));
      }

      ctx.clearRect(0, 0, w, h);
      ctx.font = FONT_SPEC;
      ctx.textAlign = "left";
      ctx.textBaseline = "alphabetic";

      const { ink, accent } = themeColorsRef.current;
      let curY = 0;

      for (let r = 0; r < nRows; r++) {
        const rowH = (rowWeights[r] / rowSum) * h;
        const word = LINES[r];
        const nChars = word.length;
        const cWeights = charWeights[r];
        const cVels = charVels[r];
        const rowProx = pointer.active ? Math.exp(-Math.pow(r - ptrRowFloat, 2) * 1.25) : 0;

        let charSum = 0;
        let peakIdx = -1;
        let peakWeight = 0;

        for (let c = 0; c < nChars; c++) {
          const baseWeight = word[c] === " " ? 0.52 : 1.0;
          const charCenterU = (c + 0.5) / nChars;
          let targetCW = baseWeight;

          if (pointer.active) {
            const dX = Math.abs(charCenterU - ptrNormX) * nChars;
            const boost = Math.exp(-(dX * dX) * 0.65) * (0.28 + rowProx * 0.95);
            targetCW = baseWeight * 0.8 + boost;
          }

          for (let s = 0; s < shocks.length; s++) {
            const sh = shocks[s];
            const d = Math.hypot(c - sh.c, (r - sh.r) * 2.1);
            const front = sh.age * 5.6;
            const env = Math.exp(-Math.pow(d - front, 2) * 1.1) * Math.exp(-sh.age * 1.35);
            targetCW += Math.sin((d - front) * 3.8) * env * 0.65;
          }

          targetCW = Math.max(baseWeight * 0.35, targetCW);
          const acc = (targetCW - cWeights[c]) * 140 - cVels[c] * 19;
          cVels[c] += acc * dt;
          cWeights[c] = Math.max(baseWeight * 0.32, cWeights[c] + cVels[c] * dt);
          charSum += cWeights[c];
          maxMotion = Math.max(maxMotion, Math.abs(cVels[c]), Math.abs(targetCW - cWeights[c]));

          if (word[c] !== " " && cWeights[c] > peakWeight) {
            peakWeight = cWeights[c];
            peakIdx = c;
          }
        }

        let curX = 0;
        for (let c = 0; c < nChars; c++) {
          const cellW = (cWeights[c] / charSum) * w;
          const ch = word[c];
          if (ch !== " ") {
            const gm = sim.glyphMetrics[ch] || { w: 96, h: 105, left: 0, ascent: 102 };
            const isHeroLetter = pointer.active && rowProx > 0.68 && c === peakIdx && peakWeight > 1.18;

            const padX = Math.max(1.5, cellW * 0.055);
            const padY = Math.max(3, rowH * 0.11);
            const innerW = Math.max(2, cellW - padX * 2);
            const innerH = Math.max(2, rowH - padY * 2);

            ctx.save();
            ctx.beginPath();
            ctx.rect(curX, curY, cellW, rowH);
            ctx.clip();
            ctx.translate(curX + padX, curY + padY);
            ctx.scale(innerW / gm.w, innerH / gm.h);
            ctx.fillStyle = isHeroLetter ? accent : ink;
            ctx.fillText(ch, gm.left, gm.ascent);
            ctx.restore();
          }
          curX += cellW;
        }
        curY += rowH;
      }

      if (maxMotion > 0.002) {
        rafId = requestAnimationFrame(tick);
      }
    };

    const onVis = () => {
      if (!document.hidden) startLoop();
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      wakeRef.current = null;
    };
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-sans tracking-tight text-theme-primary mb-3 sm:mb-4 break-words">
        {name}
      </h1>
    );
  }

  return (
    <div className="relative w-full max-w-[920px] mx-auto h-[108px] xs:h-[128px] sm:h-[164px] md:h-[196px] mb-3 sm:mb-4">
      <h1 className="sr-only">{name}</h1>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        onPointerMove={(e) => {
          const rect = canvasRef.current?.getBoundingClientRect();
          if (!rect) return;
          simRef.current.pointer.x = e.clientX - rect.left;
          simRef.current.pointer.y = e.clientY - rect.top;
          simRef.current.pointer.active = true;
          wakeRef.current?.();
        }}
        onPointerDown={(e) => {
          const rect = canvasRef.current?.getBoundingClientRect();
          if (!rect || rect.height === 0) return;
          const sim = simRef.current;
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const r = Math.min(LINES.length - 1, Math.max(0, Math.floor((y / rect.height) * LINES.length)));
          const c = Math.min(LINES[r].length - 1, Math.max(0, Math.floor((x / rect.width) * LINES[r].length)));
          sim.shocks.push({ r, c, age: 0 });
          wakeRef.current?.();
          onRippleClick?.();
        }}
        onPointerLeave={() => {
          simRef.current.pointer.active = false;
          wakeRef.current?.();
        }}
        className="w-full h-full block touch-none cursor-pointer"
      />
    </div>
  );
}
