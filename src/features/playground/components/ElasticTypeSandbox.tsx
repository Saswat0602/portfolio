"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/components/theme/ThemeContext";

const WORDSETS = {
  editorial: ["DESIGN", "SYSTEMS", "MOTION", "SIGNAL", "CRAFT"],
  engineering: ["BUILD", "AGENTS", "STACK", "SCALE", "SHIP"],
  portfolio: ["SASWAT", "ORBITO", "BEDROCK", "REACT19", "TYPES"],
} as const;

type WordsetKey = keyof typeof WORDSETS;

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

export function ElasticTypeSandbox() {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [wordsetKey, setWordsetKey] = useState<WordsetKey>("editorial");
  const [showGrid, setShowGrid] = useState(true);

  const propsRef = useRef({ wordsetKey, showGrid, isLight });
  const wakeRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    propsRef.current = { wordsetKey, showGrid, isLight };
    wakeRef.current?.();
  }, [wordsetKey, showGrid, isLight]);

  const simRef = useRef({
    w: 0,
    h: 0,
    words: WORDSETS.editorial as readonly string[],
    rowWeights: [1, 1, 1, 1, 1],
    rowVels: [0, 0, 0, 0, 0],
    charWeights: WORDSETS.editorial.map((w) => new Array<number>(w.length).fill(1)),
    charVels: WORDSETS.editorial.map((w) => new Array<number>(w.length).fill(0)),
    pointer: { x: 0, y: 0, active: false },
    shocks: [{ r: 2, c: 2, age: 0 }] as ShockWave[],
    glyphMetrics: {} as Record<string, GlyphMetric>,
  });

  useEffect(() => {
    const words = WORDSETS[wordsetKey];
    const sim = simRef.current;
    sim.words = words;
    sim.rowWeights = new Array<number>(words.length).fill(1);
    sim.rowVels = new Array<number>(words.length).fill(0);
    sim.charWeights = words.map((w) => new Array<number>(w.length).fill(1));
    sim.charVels = words.map((w) => new Array<number>(w.length).fill(0));
    sim.shocks = [{ r: 2, c: 2, age: 0 }];
    wakeRef.current?.();
  }, [wordsetKey]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const REF_SIZE = 200;
    const FONT_SPEC = `900 ${REF_SIZE}px "Inter", -apple-system, BlinkMacSystemFont, sans-serif`;

    const measureGlyphTable = () => {
      const table: Record<string, GlyphMetric> = {};
      ctx.save();
      ctx.font = FONT_SPEC;
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
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
      ctx.restore();
      simRef.current.glyphMetrics = table;
    };

    let rafId = 0;
    let last = performance.now();
    let inView = true;

    const startLoop = () => {
      if (rafId || document.hidden || !inView) return;
      last = performance.now();
      rafId = requestAnimationFrame(tick);
    };
    wakeRef.current = startLoop;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.parentElement?.clientWidth || 900;
      const h = canvas.parentElement?.clientHeight || 560;
      simRef.current.w = w;
      simRef.current.h = h;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      measureGlyphTable();
      startLoop();
    };

    const tick = (now: number) => {
      rafId = 0;
      if (document.hidden || !inView) return;
      const dt = Math.min(0.032, Math.max(0.001, (now - last) / 1000));
      last = now;

      const sim = simRef.current;
      const { showGrid: gridOn, isLight: light } = propsRef.current;
      const { w, h, words, rowWeights, rowVels, charWeights, charVels, pointer, shocks } = sim;
      if (w <= 0 || h <= 0) return;

      for (let i = shocks.length - 1; i >= 0; i--) {
        shocks[i].age += dt * 2.2;
        if (shocks[i].age > 2.4) shocks.splice(i, 1);
      }

      const nRows = words.length;
      const ptrRowFloat = pointer.active ? (pointer.y / h) * nRows - 0.5 : -99;
      const ptrNormX = pointer.active ? pointer.x / w : -99;

      let rowSum = 0;
      let maxMotion = shocks.length > 0 || pointer.active ? 1 : 0;

      for (let r = 0; r < nRows; r++) {
        let targetW = 1.0;
        if (pointer.active) {
          const distR = Math.abs(r - ptrRowFloat);
          targetW = 0.68 + Math.exp(-(distR * distR) * 1.45) * 1.55;
        }
        for (let s = 0; s < shocks.length; s++) {
          const sh = shocks[s];
          const dR = Math.abs(r - sh.r);
          const front = sh.age * 3.4;
          const env = Math.exp(-Math.pow(dR - front, 2) * 1.8) * Math.exp(-sh.age * 1.3);
          targetW += Math.cos((dR - front) * 4.5) * env * 0.55;
        }
        targetW = Math.max(0.32, targetW);
        const acc = (targetW - rowWeights[r]) * 115 - rowVels[r] * 17.5;
        rowVels[r] += acc * dt;
        rowWeights[r] = Math.max(0.28, rowWeights[r] + rowVels[r] * dt);
        rowSum += rowWeights[r];
        maxMotion = Math.max(maxMotion, Math.abs(rowVels[r]), Math.abs(targetW - rowWeights[r]));
      }

      const bgCol = light ? "#F5F4F0" : "#0B0B0C";
      const inkCol = light ? "#111110" : "#F4F3EE";
      const accentCol = light ? "#E03E2D" : "#38BDF8";
      const lineCol = light ? "rgba(17, 17, 16, 0.14)" : "rgba(244, 243, 238, 0.14)";

      ctx.fillStyle = bgCol;
      ctx.fillRect(0, 0, w, h);

      ctx.font = FONT_SPEC;
      ctx.textAlign = "left";
      ctx.textBaseline = "alphabetic";

      let curY = 0;
      for (let r = 0; r < nRows; r++) {
        const rowH = (rowWeights[r] / rowSum) * h;
        const word = words[r];
        const nChars = word.length;
        const cWeights = charWeights[r];
        const cVels = charVels[r];
        const rowProximity = pointer.active ? Math.exp(-Math.pow(r - ptrRowFloat, 2) * 1.15) : 0;

        let charSum = 0;
        let peakCharIdx = -1;
        let peakWeight = 0;

        for (let c = 0; c < nChars; c++) {
          const charCenterU = (c + 0.5) / nChars;
          let targetCW = 1.0;

          if (pointer.active) {
            const dX = Math.abs(charCenterU - ptrNormX) * nChars;
            const boost = Math.exp(-(dX * dX) * 0.85) * (0.45 + rowProximity * 1.85);
            targetCW = 0.65 + boost;
          }

          for (let s = 0; s < shocks.length; s++) {
            const sh = shocks[s];
            const d = Math.hypot(c - sh.c, (r - sh.r) * 1.4);
            const front = sh.age * 4.5;
            const env = Math.exp(-Math.pow(d - front, 2) * 1.4) * Math.exp(-sh.age * 1.35);
            targetCW += Math.sin((d - front) * 4.2) * env * 0.95;
          }

          targetCW = Math.max(0.28, targetCW);
          const acc = (targetCW - cWeights[c]) * 130 - cVels[c] * 18.5;
          cVels[c] += acc * dt;
          cWeights[c] = Math.max(0.24, cWeights[c] + cVels[c] * dt);
          charSum += cWeights[c];
          maxMotion = Math.max(maxMotion, Math.abs(cVels[c]), Math.abs(targetCW - cWeights[c]));

          if (cWeights[c] > peakWeight) {
            peakWeight = cWeights[c];
            peakCharIdx = c;
          }
        }

        let curX = 0;
        for (let c = 0; c < nChars; c++) {
          const cellW = (cWeights[c] / charSum) * w;
          const ch = word[c];
          const gm = sim.glyphMetrics[ch] || { w: 120, h: 145, left: 0, ascent: 145 };
          const isHeroLetter = pointer.active && rowProximity > 0.72 && c === peakCharIdx && peakWeight > 1.35;

          const padX = Math.max(3, cellW * 0.045);
          const padY = Math.max(4, rowH * 0.065);
          const innerW = Math.max(2, cellW - padX * 2);
          const innerH = Math.max(2, rowH - padY * 2);

          ctx.save();
          ctx.beginPath();
          ctx.rect(curX, curY, cellW, rowH);
          ctx.clip();
          ctx.translate(curX + padX, curY + padY);
          ctx.scale(innerW / gm.w, innerH / gm.h);
          ctx.fillStyle = isHeroLetter ? accentCol : inkCol;
          ctx.fillText(ch, gm.left, gm.ascent);
          ctx.restore();

          if (gridOn && c > 0) {
            ctx.strokeStyle = lineCol;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(Math.round(curX) + 0.5, curY);
            ctx.lineTo(Math.round(curX) + 0.5, curY + rowH);
            ctx.stroke();
          }

          curX += cellW;
        }

        if (gridOn && r > 0) {
          ctx.strokeStyle = lineCol;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(0, Math.round(curY) + 0.5);
          ctx.lineTo(w, Math.round(curY) + 0.5);
          ctx.stroke();
        }

        curY += rowH;
      }

      if (maxMotion > 0.002) {
        rafId = requestAnimationFrame(tick);
      }
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

    const onVis = () => {
      if (!document.hidden) startLoop();
    };
    document.addEventListener("visibilitychange", onVis);

    let io: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        (entries) => {
          inView = entries[0]?.isIntersecting ?? true;
          if (inView) startLoop();
        },
        { threshold: 0.02 }
      );
      io.observe(canvas);
    }

    startLoop();
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      if (io) io.disconnect();
      wakeRef.current = null;
    };
  }, []);

  return (
    <div className="relative w-full h-[540px] sm:h-[620px] rounded-2xl border border-theme-border overflow-hidden select-none shadow-xl">
      <canvas
        ref={canvasRef}
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
          const r = Math.min(sim.words.length - 1, Math.max(0, Math.floor((y / rect.height) * sim.words.length)));
          const c = Math.min(sim.words[r].length - 1, Math.max(0, Math.floor((x / rect.width) * sim.words[r].length)));
          sim.shocks.push({ r, c, age: 0 });
          wakeRef.current?.();
        }}
        onPointerLeave={() => {
          simRef.current.pointer.active = false;
          wakeRef.current?.();
        }}
        className="w-full h-full block touch-none cursor-crosshair"
        aria-label="Elastic Letterpress Conservation-of-Area Type Wall"
      />

      <div className="absolute bottom-4 left-4 z-20 flex flex-wrap items-center gap-1.5">
        {(["editorial", "engineering", "portfolio"] as const).map((key) => {
          const active = wordsetKey === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setWordsetKey(key)}
              className="rounded-full px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-wider cursor-pointer transition-colors backdrop-blur-md"
              style={{
                backgroundColor: active
                  ? isLight
                    ? "#141413"
                    : "#F3F2EE"
                  : isLight
                    ? "rgba(255,255,255,0.82)"
                    : "rgba(18,19,22,0.82)",
                color: active
                  ? isLight
                    ? "#F4F3EF"
                    : "#111214"
                  : isLight
                    ? "#222220"
                    : "#D8D8DC",
                border: isLight ? "1px solid rgba(20,20,19,0.16)" : "1px solid rgba(255,255,255,0.16)",
              }}
            >
              {key}
            </button>
          );
        })}
        <button
          type="button"
          onClick={() => setShowGrid((v) => !v)}
          className="rounded-full px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-wider cursor-pointer transition-colors backdrop-blur-md"
          style={{
            backgroundColor: showGrid
              ? isLight
                ? "#141413"
                : "#F3F2EE"
              : isLight
                ? "rgba(255,255,255,0.82)"
                : "rgba(18,19,22,0.82)",
            color: showGrid
              ? isLight
                ? "#F4F3EF"
                : "#111214"
              : isLight
                ? "#222220"
                : "#D8D8DC",
            border: isLight ? "1px solid rgba(20,20,19,0.16)" : "1px solid rgba(255,255,255,0.16)",
          }}
        >
          Grid: {showGrid ? "On" : "Off"}
        </button>
      </div>
    </div>
  );
}
