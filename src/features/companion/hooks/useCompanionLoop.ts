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
import { clamp } from "../utils/physics";
import { closeSharedAudioContext, playComedySound } from "../utils/audio";
import { renderCompanionStageCanvas } from "../utils/canvasRenderer";
import { clearAllCompanionTimers } from "../utils/simInitial";
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
  setCursorSnatched: Dispatch<SetStateAction<boolean>>;
  setWidgetOpen: Dispatch<SetStateAction<boolean>>;
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
  setCursorSnatched,
  setWidgetOpen,
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
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const sim = simRef.current;
      const isInit = sim.w === 1000 && sim.x === 500;

      sim.w = r.width;
      sim.h = r.height;
      if (viewMode === "home") {
        const isDesktop = r.width >= 768;
        sim.floorY = r.height - 96;
        sim.ceilY = 86;
        sim.homeX = isDesktop ? Math.min(r.width - 135, r.width * 0.83) : Math.max(82, r.width - 84);
        sim.homeY = isDesktop ? clamp(r.height * 0.44, 150, r.height - 210) : Math.max(150, r.height - 175);
        sim.tramp.x = isDesktop ? Math.min(r.width - 140, r.width * 0.74) : r.width * 0.5;
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
      sim.charPortalCd = Math.max(0, sim.charPortalCd - dt);
      sim.pet.decay = Math.max(0, sim.pet.decay - dt);
      if (sim.pet.decay <= 0) sim.pet.strokes = 0;
      sim.pet.fxCd = Math.max(0, sim.pet.fxCd - dt);
      sim.tickle.decay = Math.max(0, sim.tickle.decay - dt);
      if (sim.tickle.decay <= 0) sim.tickle.strokes = 0;
      sim.tickle.cd = Math.max(0, sim.tickle.cd - dt);

      const chaseSnack = stepSnacks(sim, live, dt, callbacks);
      stepCharacterKinematics(sim, live, chaseSnack, dt, callbacks);
      stepCloneDuel(sim, live, elements, dt);
      const { drawX, drawY } = stepRigAndCommitDom(sim, live, chaseSnack, elements, dt);

      const ctx = fxCanvasRef.current?.getContext("2d");
      if (ctx) {
        renderCompanionStageCanvas(
          ctx,
          sim,
          live.displayMood,
          drawX,
          drawY,
          live.theme === "dark",
          live.trampolineOn,
          dt
        );
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [consumeSnack, elementsRef, fxCanvasRef, liveRef, say, setDizzyActive, simRef, spawnParticles, stageRef, timersRef]);

  // Global Pointer Tracking, Drag & Fling Release
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const stage = stageRef.current;
      if (!stage) return;
      const r = stage.getBoundingClientRect();
      const px = e.clientX - r.left;
      const py = e.clientY - r.top;
      const sim = simRef.current;

      sim.ptrVx = (px - sim.ptrLastX) * 28;
      sim.ptrVy = (py - sim.ptrLastY) * 28;
      sim.ptrLastX = px;
      sim.ptrLastY = py;
      sim.ptrX = px;
      sim.ptrY = py;
      sim.ptrActive = true;

      if (sim.drag.active) {
        const dx = e.clientX - sim.drag.lastX;
        const dy = e.clientY - sim.drag.lastY;
        if (!sim.drag.moved && Math.hypot(e.clientX - sim.drag.startX, e.clientY - sim.drag.startY) > 7) {
          sim.drag.moved = true;
          setIsHeld(true);
          playComedySound("pop", liveRef.current.soundOn, 1.3);
        }
        sim.drag.lastX = e.clientX;
        sim.drag.lastY = e.clientY;
        sim.drag.vx = sim.drag.vx * 0.45 + dx * 28 * 0.55;
        sim.drag.vy = sim.drag.vy * 0.45 + dy * 28 * 0.55;
      }
    };

    const onUp = () => {
      const sim = simRef.current;
      if (!sim.drag.active) return;
      const wasMoved = sim.drag.moved;
      sim.drag.active = false;
      sim.drag.moved = false;
      setIsHeld(false);

      if (wasMoved) {
        sim.vx = clamp(sim.drag.vx * 1.18, -980, 980);
        sim.vy = clamp(sim.drag.vy * 1.18, -920, 920);
        if (Math.hypot(sim.vx, sim.vy) > 420) {
          playComedySound("slideUp", liveRef.current.soundOn, 1.15);
          say("WEEEE!! AERODYNAMIC MOCHI!!", 2000, true);
        }
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
  }, [handleBodyPoke, liveRef, say, setCursorSnatched, setIsHeld, setWidgetOpen, simRef, stageRef]);
}
