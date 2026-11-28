import { useEffect, type Dispatch, type MutableRefObject, type RefObject, type SetStateAction } from "react";
import type {
  CompanionElements,
  CompanionTimers,
  LiveSnapshot,
  ParticleKind,
  SimState,
  SnackEntity,
  ViewMode,
} from "../types";
import { FLING_QUIPS, TICKLE_QUIPS } from "@/lib/data";
import { clamp } from "../utils/physics";
import { closeSharedAudioContext, playComedySound } from "../utils/audio";
import { renderCompanionStageCanvas } from "../utils/canvasRenderer";
import { clearAllCompanionTimers } from "../utils/simInitial";
import { stepBugsAndLasers, stepCatchBall, stepMiniClonesAndRings } from "../utils/modeStep";
import {
  stepCharacterKinematics,
  stepCloneDuel,
  stepRigAndCommitDom,
  stepSnacks,
  syncConnectedElements,
} from "../utils/simStep";

export interface UseCompanionLoopParams {
  stageRef: RefObject<HTMLDivElement | null>;
  fxCanvasRef: RefObject<HTMLCanvasElement | null>;
  elementsRef: MutableRefObject<CompanionElements>;
  simRef: MutableRefObject<SimState>;
  liveRef: MutableRefObject<LiveSnapshot>;
  timersRef: MutableRefObject<CompanionTimers>;
  viewMode: ViewMode;
  consumeSnack: (snack: SnackEntity) => void;
  say: (text: string, holdMs?: number, silent?: boolean) => void;
  spawnParticles: (kind: ParticleKind, x: number, y: number, count?: number, customColor?: string | null) => void;
  handleBodyPoke: () => void;
  setIsHeld: Dispatch<SetStateAction<boolean>>;
  setDizzyActive: Dispatch<SetStateAction<boolean>>;
  setTickledActive: Dispatch<SetStateAction<boolean>>;
  setCursorSnatched: Dispatch<SetStateAction<boolean>>;
  setWidgetOpen: Dispatch<SetStateAction<boolean>>;
  setRallyCount: Dispatch<SetStateAction<number>>;
  setBugsLeft: Dispatch<SetStateAction<number>>;
}

export function useCompanionLoop({
  stageRef,
  fxCanvasRef,
  elementsRef,
  simRef,
  liveRef,
  timersRef,
  viewMode,
  consumeSnack,
  say,
  spawnParticles,
  handleBodyPoke,
  setIsHeld,
  setDizzyActive,
  setTickledActive,
  setCursorSnatched,
  setWidgetOpen,
  setRallyCount,
  setBugsLeft,
}: UseCompanionLoopParams): void {
  // Natural blinking
  useEffect(() => {
    let alive = true;
    let t1: ReturnType<typeof setTimeout> | null = null;
    let t2: ReturnType<typeof setTimeout> | null = null;

    const sched = () => {
      t1 = setTimeout(() => {
        if (!alive) return;
        const m = liveRef.current.displayMood;
        if (m !== "sleepy" && !liveRef.current.dizzyActive && !liveRef.current.sourActive) {
          simRef.current.targetEyelid = 0.04;
          t2 = setTimeout(() => {
            if (alive) simRef.current.targetEyelid = 1;
            sched();
          }, 105);
        } else {
          sched();
        }
      }, 2200 + Math.random() * 2800);
    };

    sched();
    return () => {
      alive = false;
      if (t1) clearTimeout(t1);
      if (t2) clearTimeout(t2);
    };
  }, [liveRef, simRef]);

  // Measure Stage & Resize High-DPI Canvas cleanly (DPR <= 2)
  useEffect(() => {
    const stage = stageRef.current;
    const canvas = fxCanvasRef.current;
    if (!stage || !canvas) return;

    const sync = () => {
      const r = stage.getBoundingClientRect();
      if (r.width <= 0 || r.height <= 0) return;
      const dpr = Math.min(window.devicePixelRatio || 1, viewMode === "home" ? 1.5 : 2);
      const sim = simRef.current;
      const isInit = sim.w === 1000 && sim.x === 500;

      sim.w = r.width;
      sim.h = r.height;
      if (viewMode === "home") {
        const isDesktop = r.width >= 768;
        sim.floorY = isDesktop ? r.height - 175 : r.height - 165;
        sim.ceilY = 86;
        sim.homeX = isDesktop
          ? clamp(r.width * 0.88, r.width * 0.78, r.width - 108)
          : Math.max(82, r.width - 78);
        sim.homeY = isDesktop
          ? clamp(r.height * 0.44, 130, r.height - 235)
          : clamp(r.height * 0.36, 125, r.height - 210);
        sim.tramp.x = isDesktop ? Math.min(r.width - 140, r.width * 0.78) : r.width * 0.5;
      } else {
        sim.floorY = viewMode === "portfolio" ? r.height - 62 : r.height - 178;
        sim.ceilY = 86;
        sim.homeX = viewMode === "portfolio" ? Math.max(84, r.width - 96) : r.width * 0.5;
        sim.homeY = viewMode === "portfolio" ? Math.max(120, r.height - 118) : Math.max(170, sim.floorY - 64);
        sim.tramp.x = r.width * 0.5;
      }

      canvas.width = Math.max(1, Math.floor(r.width * dpr));
      canvas.height = Math.max(1, Math.floor(r.height * dpr));
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (isInit) {
        sim.x = sim.homeX;
        sim.y = sim.homeY;
      } else {
        sim.x = clamp(sim.x, 72, Math.max(72, r.width - 72));
        sim.y = clamp(sim.y, sim.ceilY, Math.max(sim.ceilY, sim.floorY));
      }
    };

    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(stage);
    return () => ro.disconnect();
  }, [fxCanvasRef, simRef, stageRef, viewMode]);

  // Cleanup Timers & AudioContext on Unmount
  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      clearAllCompanionTimers(timers);
      closeSharedAudioContext();
    };
  }, [timersRef]);

  // Single 60 FPS Simulation & Canvas FX Loop
  useEffect(() => {
    let rafId = 0;
    let last = performance.now();

    const onPortalDizzy = () => {
      setDizzyActive(true);
      if (timersRef.current.dizzy) clearTimeout(timersRef.current.dizzy);
      timersRef.current.dizzy = setTimeout(() => setDizzyActive(false), 1400);
    };

    const callbacks = { consumeSnack, say, spawnParticles, onPortalDizzy };
    const modeCallbacks = {
      say,
      spawnParticles,
      onRallyChange: setRallyCount,
      onBugsCountChange: setBugsLeft,
    };

    const tick = (now: number) => {
      const dt = Math.min(0.032, Math.max(0.001, (now - last) / 1000));
      last = now;

      const sim = simRef.current;
      const live = liveRef.current;
      const stage = stageRef.current;
      const elements = elementsRef.current;
      if (stage) syncConnectedElements(stage, elements);

      sim.time += dt;
      sim.ptrVx *= Math.exp(-dt * 12);
      sim.ptrVy *= Math.exp(-dt * 12);
      sim.beatEnergy = Math.max(0, sim.beatEnergy - dt * 3.2);
      sim.laserPounceCd = Math.max(0, sim.laserPounceCd - dt);
      sim.charPortalCd = Math.max(0, sim.charPortalCd - dt);
      sim.pet.decay = Math.max(0, sim.pet.decay - dt);
      if (sim.pet.decay <= 0) sim.pet.strokes = 0;
      sim.pet.fxCd = Math.max(0, sim.pet.fxCd - dt);
      sim.tickle.decay = Math.max(0, sim.tickle.decay - dt);
      if (sim.tickle.decay <= 0) sim.tickle.strokes = 0;
      sim.tickle.cd = Math.max(0, sim.tickle.cd - dt);

      /* Voice/Beat beta paused for now
      if (live.micMode === "live" && analyserRef.current && analyserDataRef.current) { ... }
      */

      // Squish-Charge Jump (> 0.35s press & hold without dragging)
      if (sim.drag.active && !sim.drag.moved) {
        const heldSec = (now - sim.drag.downAt) / 1000;
        if (heldSec > 0.35) {
          sim.squishCharge = clamp((heldSec - 0.35) / 1.0, 0, 1);
          sim.squishTickCd -= dt;
          if (sim.squishTickCd <= 0) {
            sim.squishTickCd = 0.11;
            playComedySound("squish", live.soundOn, sim.squishCharge);
          }
        }
      } else {
        sim.squishCharge = Math.max(0, sim.squishCharge - dt * 8);
      }

      const chaseSnack = stepSnacks(sim, live, dt, callbacks);
      stepCharacterKinematics(sim, live, chaseSnack, dt, callbacks);
      stepCatchBall(sim, live, dt, modeCallbacks);
      stepBugsAndLasers(sim, live, dt, modeCallbacks);
      stepMiniClonesAndRings(sim, live, dt, spawnParticles);
      stepCloneDuel(sim, live, elements, dt);
      const { drawX, drawY } = stepRigAndCommitDom(sim, live, chaseSnack, elements, dt);

      const ctx = fxCanvasRef.current?.getContext("2d");
      if (ctx) {
        renderCompanionStageCanvas(ctx, sim, live, drawX, drawY, dt);
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [
    consumeSnack,
    elementsRef,
    fxCanvasRef,
    liveRef,
    say,
    setBugsLeft,
    setDizzyActive,
    setRallyCount,
    simRef,
    spawnParticles,
    stageRef,
    timersRef,
  ]);

  // Global Pointer Tracking, Feather Tickle Detection, Paint Strokes, Drag & Squish Launch
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const stage = stageRef.current;
      if (!stage) return;
      const r = stage.getBoundingClientRect();
      const px = e.clientX - r.left;
      const py = e.clientY - r.top;
      const sim = simRef.current;
      const live = liveRef.current;

      sim.ptrVx = (px - sim.ptrLastX) * 28;
      sim.ptrVy = (py - sim.ptrLastY) * 28;
      sim.ptrLastX = px;
      sim.ptrLastY = py;
      sim.ptrX = px;
      sim.ptrY = py;
      sim.ptrActive = true;

      // Global Tickle Feather Detection (responsive anywhere near Mochi)
      if (live.featherTool && Math.hypot(px - sim.x, py - sim.y) < 125) {
        const dx = px - sim.tickle.lastX;
        const dy = py - sim.tickle.lastY;
        sim.tickle.lastX = px;
        sim.tickle.lastY = py;
        const movedDist = Math.hypot(dx, dy);

        if (movedDist > 1.8) {
          sim.tickle.strokes += 1;
          sim.tickle.decay = 0.95;
          if (timersRef.current.tickle) clearTimeout(timersRef.current.tickle);
          setTickledActive(true);
          playComedySound("giggle", live.soundOn, 1.32);
          if (sim.tickle.cd <= 0) {
            sim.tickle.cd = 0.36;
            sim.sx = 1.14;
            sim.sy = 0.88;
            spawnParticles("confetti", sim.x, sim.y - 30, 6);
            if (sim.tickle.strokes === 1 || sim.tickle.strokes % 8 === 0) {
              say(TICKLE_QUIPS[Math.floor(Math.random() * TICKLE_QUIPS.length)], 2400, true);
            }
          }
          timersRef.current.tickle = setTimeout(() => setTickledActive(false), 1150);
        }
      }

      if (sim.activeStroke) {
        const pts = sim.activeStroke.pts;
        const lastPt = pts[pts.length - 1];
        if (!lastPt || Math.hypot(px - lastPt.x, py - lastPt.y) > 8) {
          pts.push({ x: px, y: py });
        }
        return;
      }

      if (sim.drag.active) {
        const dx = e.clientX - sim.drag.lastX;
        const dy = e.clientY - sim.drag.lastY;
        if (!sim.drag.moved && Math.hypot(e.clientX - sim.drag.startX, e.clientY - sim.drag.startY) > 7) {
          sim.drag.moved = true;
          sim.squishCharge = 0;
          setIsHeld(true);
          playComedySound("pop", live.soundOn, 1.3);
        }
        sim.drag.lastX = e.clientX;
        sim.drag.lastY = e.clientY;
        sim.drag.vx = sim.drag.vx * 0.45 + dx * 28 * 0.55;
        sim.drag.vy = sim.drag.vy * 0.45 + dy * 28 * 0.55;
      }
    };

    const onUp = () => {
      const sim = simRef.current;

      if (sim.activeStroke) {
        if (sim.activeStroke.pts.length >= 2) {
          sim.strokes.push(sim.activeStroke);
          if (sim.strokes.length > 16) sim.strokes.shift();
        }
        sim.activeStroke = null;
      }

      if (!sim.drag.active) return;
      const wasMoved = sim.drag.moved;
      const charge = sim.squishCharge;
      sim.drag.active = false;
      sim.drag.moved = false;
      sim.squishCharge = 0;
      setIsHeld(false);

      if (wasMoved) {
        const flingSpeed = Math.hypot(sim.drag.vx, sim.drag.vy);
        sim.vx = clamp(sim.drag.vx * 1.18, -980, 980);
        sim.vy = clamp(sim.drag.vy * 1.18, -920, 920);
        sim.ballistic = true;
        sim.ballisticTimer = flingSpeed > 260 ? 1.65 : 0.72;
        if (flingSpeed > 420) {
          playComedySound("slideUp", liveRef.current.soundOn, 1.15);
          say(FLING_QUIPS[Math.floor(Math.random() * FLING_QUIPS.length)], 2200, true);
        }
      } else if (charge > 0.16) {
        sim.flipping = true;
        sim.flipDeg = 0;
        sim.vy = -(490 + charge * 420);
        sim.vx = (Math.random() - 0.5) * 180;
        sim.sx = 0.72;
        sim.sy = 1.36;
        sim.ballistic = true;
        sim.ballisticTimer = 1.2;
        playComedySound("chime", liveRef.current.soundOn);
        spawnParticles("star", sim.x, sim.y + 32, 9);
        say("BOING!! Squish-charge launch!!", 2200, true);
      } else if (liveRef.current.cursorSnatched) {
        setCursorSnatched(false);
        sim.vy = -240;
        playComedySound("chime", liveRef.current.soundOn, 1.1);
        say("Okay okay, you win! Returning your mouse!", 2500, true);
      } else if (liveRef.current.viewMode === "portfolio") {
        setWidgetOpen((v) => !v);
        playComedySound("pop", liveRef.current.soundOn, 1.1);
      } else {
        handleBodyPoke();
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [
    handleBodyPoke,
    liveRef,
    say,
    setCursorSnatched,
    setIsHeld,
    setTickledActive,
    setWidgetOpen,
    simRef,
    spawnParticles,
    stageRef,
    timersRef,
  ]);
}
