import type { SoundKind } from "../types";
import { clamp } from "./physics";

interface WindowWithWebkitAudio extends Window {
  webkitAudioContext?: typeof AudioContext;
}

let sharedCtx: AudioContext | null = null;
let lastGiggleMs = 0;

export function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  try {
    const win = window as WindowWithWebkitAudio;
    const AudioCtor = window.AudioContext || win.webkitAudioContext;
    if (!AudioCtor) return null;
    if (!sharedCtx) sharedCtx = new AudioCtor();
    if (sharedCtx.state === "suspended") {
      sharedCtx.resume().catch(() => {});
    }
    return sharedCtx;
  } catch {
    return null;
  }
}

export function closeSharedAudioContext(): void {
  if (sharedCtx && sharedCtx.state !== "closed") {
    sharedCtx.close().catch(() => {});
  }
  sharedCtx = null;
}

function playNoiseBurst(
  ctx: AudioContext,
  startAt: number,
  durationSec: number,
  decayFactor: number,
  filterType: BiquadFilterType,
  freqStart: number,
  freqEnd: number,
  gainPeak: number
): void {
  const len = Math.floor(ctx.sampleRate * durationSec);
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (len * decayFactor));
  }

  const src = ctx.createBufferSource();
  src.buffer = buf;

  const filter = ctx.createBiquadFilter();
  filter.type = filterType;
  filter.frequency.setValueAtTime(freqStart, startAt);
  if (freqEnd !== freqStart) {
    filter.frequency.exponentialRampToValueAtTime(freqEnd, startAt + durationSec);
  }

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(gainPeak, startAt);
  gain.gain.exponentialRampToValueAtTime(0.001, startAt + durationSec);

  src.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  src.start(startAt);
}

function playOscEnvelope(
  ctx: AudioContext,
  type: OscillatorType,
  startAt: number,
  durationSec: number,
  freqStops: Array<[number, number]>,
  gainPeak: number,
  attackSec = 0.01
): void {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;

  freqStops.forEach(([hz, offset], idx) => {
    if (idx === 0) osc.frequency.setValueAtTime(hz, startAt + offset);
    else osc.frequency.exponentialRampToValueAtTime(hz, startAt + offset);
  });

  gain.gain.setValueAtTime(0.0001, startAt);
  gain.gain.linearRampToValueAtTime(gainPeak, startAt + attackSec);
  gain.gain.exponentialRampToValueAtTime(0.0001, startAt + durationSec);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(startAt);
  osc.stop(startAt + durationSec + 0.02);
}

function playMarimbaNote(ctx: AudioContext, now: number, hz: number): void {
  const o1 = ctx.createOscillator();
  const o2 = ctx.createOscillator();
  const lp = ctx.createBiquadFilter();
  const g = ctx.createGain();
  o1.type = "triangle";
  o2.type = "sine";
  o1.frequency.setValueAtTime(hz, now);
  o2.frequency.setValueAtTime(hz * 2, now);
  lp.type = "lowpass";
  lp.frequency.setValueAtTime(2200, now);
  lp.frequency.exponentialRampToValueAtTime(640, now + 0.34);
  g.gain.setValueAtTime(0.0001, now);
  g.gain.linearRampToValueAtTime(0.06, now + 0.007);
  g.gain.exponentialRampToValueAtTime(0.0001, now + 0.38);
  o1.connect(lp);
  o2.connect(lp);
  lp.connect(g);
  g.connect(ctx.destination);
  o1.start(now);
  o2.start(now);
  o1.stop(now + 0.4);
  o2.stop(now + 0.4);
}

function playTwang(ctx: AudioContext, now: number): void {
  const o = ctx.createOscillator();
  const lfo = ctx.createOscillator();
  const lfoG = ctx.createGain();
  const g = ctx.createGain();
  o.type = "triangle";
  o.frequency.setValueAtTime(220, now);
  o.frequency.exponentialRampToValueAtTime(360, now + 0.34);
  lfo.frequency.setValueAtTime(24, now);
  lfoG.gain.setValueAtTime(42, now);
  lfoG.gain.exponentialRampToValueAtTime(2, now + 0.36);
  lfo.connect(lfoG);
  lfoG.connect(o.frequency);
  g.gain.setValueAtTime(0.052, now);
  g.gain.exponentialRampToValueAtTime(0.0001, now + 0.38);
  o.connect(g);
  g.connect(ctx.destination);
  o.start(now);
  lfo.start(now);
  o.stop(now + 0.4);
  lfo.stop(now + 0.4);
}

function playSadTrombone(ctx: AudioContext, now: number): void {
  const notes = [
    { hz: 311.13, t: 0.0, d: 0.24, slide: undefined },
    { hz: 293.66, t: 0.26, d: 0.24, slide: undefined },
    { hz: 277.18, t: 0.52, d: 0.24, slide: undefined },
    { hz: 261.63, t: 0.78, d: 0.62, slide: 235.0 },
  ];

  notes.forEach((note) => {
    const osc = ctx.createOscillator();
    const lp = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(note.hz, now + note.t);
    if (note.slide) osc.frequency.exponentialRampToValueAtTime(note.slide, now + note.t + note.d);

    lp.type = "lowpass";
    lp.frequency.setValueAtTime(980, now + note.t);
    lp.frequency.exponentialRampToValueAtTime(420, now + note.t + note.d);

    gain.gain.setValueAtTime(0.0001, now + note.t);
    gain.gain.linearRampToValueAtTime(0.036, now + note.t + 0.025);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + note.t + note.d);

    osc.connect(lp);
    lp.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now + note.t);
    osc.stop(now + note.t + note.d + 0.03);
  });
}

export function playComedySound(kind: SoundKind, enabled: boolean, param = 1): void {
  if (!enabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const pm = clamp(param, 0.55, 1.8);

    switch (kind) {
      case "boing":
        playOscEnvelope(ctx, "sine", now, 0.24, [[175 * pm, 0], [420 * pm, 0.075], [165 * pm, 0.22]], 0.06);
        break;
      case "slideUp":
        playOscEnvelope(ctx, "sine", now, 0.26, [[280 * pm, 0], [1120 * pm, 0.24]], 0.048, 0.02);
        break;
      case "slideDown":
        playOscEnvelope(ctx, "sine", now, 0.26, [[960 * pm, 0], [240 * pm, 0.24]], 0.048, 0.02);
        break;
      case "crunch":
        [0, 0.09, 0.18].forEach((off) => {
          playNoiseBurst(ctx, now + off, 0.055, 0.35, "bandpass", 1350 + off * 1800, 1350 + off * 1800, 0.11);
        });
        break;
      case "fire":
        playNoiseBurst(ctx, now, 0.54, 0.55, "lowpass", 1400, 280, 0.14);
        break;
      case "squeak":
        playOscEnvelope(ctx, "triangle", now, 0.18, [[980 * pm, 0], [1920 * pm, 0.06], [640 * pm, 0.16]], 0.055);
        break;
      case "giggle":
        if (performance.now() - lastGiggleMs < 150) return;
        lastGiggleMs = performance.now();
        [0, 0.06, 0.12].forEach((off, idx) => {
          const base = (580 + idx * 130 + Math.random() * 90) * pm;
          playOscEnvelope(ctx, "sine", now + off, 0.065, [[base, 0], [base * 1.18, 0.045]], 0.036, 0.008);
        });
        break;
      case "sadTrombone":
        playSadTrombone(ctx, now);
        break;
      case "shutter":
        [0, 0.055].forEach((off, idx) => {
          const hz = idx === 0 ? 1800 : 1200;
          playNoiseBurst(ctx, now + off, 0.03, 0.22, "highpass", hz, hz, 0.14);
        });
        break;
      case "poof":
        playNoiseBurst(ctx, now, 0.16, 0.32, "lowpass", 1100, 1100, 0.09);
        break;
      case "portal":
        playOscEnvelope(ctx, "sine", now, 0.28, [[340, 0], [980, 0.14], [520, 0.26]], 0.048, 0.015);
        break;
      case "chime":
        [523.25, 659.25, 783.99].forEach((hz, idx) => {
          playOscEnvelope(ctx, "triangle", now + idx * 0.045, 0.26, [[hz * pm, 0]], 0.036);
        });
        break;
      case "pop":
        playOscEnvelope(ctx, "sine", now, 0.075, [[460 * pm, 0], [780 * pm, 0.055]], 0.04, 0.006);
        break;
      case "marimba":
        playMarimbaNote(ctx, now, param || 440);
        break;
      case "zap":
        playOscEnvelope(ctx, "sawtooth", now, 0.12, [[1450, 0], [180, 0.12]], 0.042, 0.005);
        break;
      case "volley": {
        const pitch = 320 + clamp(param, 0, 14) * 32;
        playOscEnvelope(ctx, "triangle", now, 0.09, [[pitch, 0], [pitch * 1.35, 0.06]], 0.048, 0.006);
        break;
      }
      case "squish": {
        const hz = 220 + clamp(param, 0, 1) * 420;
        playOscEnvelope(ctx, "sine", now, 0.07, [[hz, 0], [hz + 26, 0.055]], 0.022);
        break;
      }
      case "twang":
        playTwang(ctx, now);
        break;
      case "pulse":
        playOscEnvelope(ctx, "sine", now, 0.2, [[340, 0], [110, 0.18]], 0.06, 0.008);
        break;
      case "sneeze":
        playNoiseBurst(ctx, now, 0.18, 0.3, "bandpass", 1850, 1850, 0.1);
        break;
      case "tick":
        playOscEnvelope(ctx, "triangle", now, 0.024, [[1060, 0], [420, 0.02]], 0.022, 0.003);
        break;
    }
  } catch {
    // Ignore Web Audio autoplay restrictions gracefully
  }
}
