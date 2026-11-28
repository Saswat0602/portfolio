import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type RefObject,
} from "react";
import {
  CHARACTER_STYLES,
  MOODS,
  SYNTH_PADS,
  type AccessoryId,
  type CharacterStyleId,
  type MoodId,
  type PlayModeId,
} from "@/lib/data";
import { useTheme } from "@/components/theme/ThemeContext";
import type {
  ArtVerdictState,
  CompanionElements,
  CompanionThemeTokens,
  CompanionTimers,
  DockTab,
  LiveSnapshot,
  PolaroidCard,
  PortfolioHoverTarget,
  SimState,
  StickyNoteState,
  ViewMode,
} from "../types";
import { clamp } from "../utils/physics";
import { playComedySound } from "../utils/audio";
import { createEmptyElements, createEmptyTimers, createInitialSimState } from "../utils/simInitial";
import { useCompanionActions } from "./useCompanionActions";
import { useCompanionLoop } from "./useCompanionLoop";

export interface UseCompanionEngineOptions {
  stageRef: RefObject<HTMLDivElement | null>;
  fxCanvasRef: RefObject<HTMLCanvasElement | null>;
  initialViewMode?: ViewMode;
  initialStyle?: CharacterStyleId;
  externalHover?: PortfolioHoverTarget;
}

export function useCompanionEngine(options: UseCompanionEngineOptions) {
  const { stageRef, fxCanvasRef } = options;
  const { theme, toggleTheme } = useTheme();
  const [viewMode, setViewMode] = useState<ViewMode>(options.initialViewMode ?? "stage");
  const [charStyle, setCharStyle] = useState<CharacterStyleId>(options.initialStyle ?? "vinyl");
  const [accessory, setAccessory] = useState<AccessoryId>("none");
  const [playMode, setPlayMode] = useState<PlayModeId>("interact");
  const [mood, setMood] = useState<MoodId>("playful");
  const [soundOn, setSoundOn] = useState<boolean>(false);
  const [dockTab, setDockTab] = useState<DockTab>("modes");

  // Playable Tools & Interactive States
  const [portalTool, setPortalTool] = useState<boolean>(false);
  const [trampolineOn, setTrampolineOn] = useState<boolean>(false);
  const [featherTool, setFeatherTool] = useState<boolean>(false);
  const [gravityFlipped, setGravityFlipped] = useState<boolean>(false);
  const [shakingStage, setShakingStage] = useState<boolean>(false);
  const [cameraFlash, setCameraFlash] = useState<boolean>(false);
  const [photoPosing, setPhotoPosing] = useState<boolean>(false);

  // Mode Sub-states
  const [rallyCount, setRallyCount] = useState<number>(0);
  const [bugsLeft, setBugsLeft] = useState<number>(0);
  const [artVerdict, setArtVerdict] = useState<ArtVerdictState | null>(null);
  const [autoJam, setAutoJam] = useState<boolean>(false);
  const [activePad, setActivePad] = useState<string | null>(null);

  // Slapstick Reaction Overrides
  const [spicyActive, setSpicyActive] = useState<boolean>(false);
  const [sourActive, setSourActive] = useState<boolean>(false);
  const [pizzaActive, setPizzaActive] = useState<boolean>(false);
  const [caffeinatedActive, setCaffeinatedActive] = useState<boolean>(false);
  const [spinTopActive, setSpinTopActive] = useState<boolean>(false);
  const [dizzyActive, setDizzyActive] = useState<boolean>(false);
  const [tickledActive, setTickledActive] = useState<boolean>(false);
  const [pettingActive, setPettingActive] = useState<boolean>(false);
  const [isHeld, setIsHeld] = useState<boolean>(false);
  const [cursorSnatched, setCursorSnatched] = useState<boolean>(false);
  const [cloneDuelActive, setCloneDuelActive] = useState<boolean>(false);
  const [cloneSpeech, setCloneSpeech] = useState<string>("");
  const [fridayDeployActive, setFridayDeployActive] = useState<boolean>(false);
  const [fakeCrashActive, setFakeCrashActive] = useState<boolean>(false);
  const [devJoke, setDevJoke] = useState<string | null>(null);

  // Draggable Polaroids & Sticky Note
  const [polaroids, setPolaroids] = useState<PolaroidCard[]>([]);
  const [stickyNote, setStickyNote] = useState<StickyNoteState | null>(null);

  // Chat, Reading & Secret Mode
  const [speechShown, setSpeechShown] = useState<string>("");
  const [chatText, setChatText] = useState<string>("");
  const [chatFocused, setChatFocused] = useState<boolean>(false);
  const [secretMode, setSecretMode] = useState<boolean>(false);
  const [peeking, setPeeking] = useState<boolean>(false);
  const [widgetOpen, setWidgetOpen] = useState<boolean>(false);
  const [internalPortfolioHover, setPortfolioHover] = useState<PortfolioHoverTarget>(null);

  const portfolioHover = options.externalHover ?? internalPortfolioHover;

  const elementsRef = useRef<CompanionElements>(createEmptyElements());
  const timersRef = useRef<CompanionTimers>(createEmptyTimers());
  const pokeRef = useRef({ count: 0, lastAt: 0 });
  const polaroidSeqRef = useRef(1);
  const snackSeqRef = useRef(1);
  const simRef = useRef<SimState>(createInitialSimState());

  const displayMood = useMemo<MoodId>(() => {
    if (portfolioHover === "hire") return "lovestruck";
    if (portfolioHover === "projects") return "smug";
    if (portfolioHover === "resume") return "zen";
    if (caffeinatedActive) return "caffeinated";
    return mood;
  }, [portfolioHover, caffeinatedActive, mood]);

  const activeMoodMeta = useMemo(
    () => MOODS.find((m) => m.id === displayMood) || MOODS[0],
    [displayMood]
  );

  const styleMeta = useMemo(
    () => CHARACTER_STYLES.find((c) => c.id === charStyle) || CHARACTER_STYLES[0],
    [charStyle]
  );

  const isDark = theme === "dark";

  const ui = useMemo<CompanionThemeTokens>(
    () => ({
      bg: isDark ? "#060b13" : "#F6F4EF",
      surface: isDark ? "#0c1524" : "#FFFFFF",
      glass: isDark ? "rgba(12, 21, 36, 0.88)" : "rgba(255, 255, 255, 0.90)",
      recessed: isDark ? "#111d30" : "#ECE9E1",
      ink: isDark ? "#f0f6fc" : "#161618",
      muted: isDark ? "#94a3b8" : "#6A6760",
      border: isDark ? "rgba(56, 189, 248, 0.16)" : "rgba(22, 22, 24, 0.10)",
      borderStrong: isDark ? "rgba(56, 189, 248, 0.30)" : "rgba(22, 22, 24, 0.18)",
      shadow: isDark ? "0 20px 48px -16px rgba(0,0,0,0.82)" : "0 14px 36px -14px rgba(22,22,24,0.12)",
    }),
    [isDark]
  );

  const liveRef = useRef<LiveSnapshot>({
    theme,
    viewMode,
    charStyle,
    accessory,
    playMode,
    displayMood,
    pitch: activeMoodMeta.pitch,
    soundOn,
    portalTool,
    trampolineOn,
    featherTool,
    gravityFlipped,
    photoPosing,
    spicyActive,
    sourActive,
    pizzaActive,
    caffeinatedActive,
    spinTopActive,
    dizzyActive,
    tickledActive,
    pettingActive,
    isHeld,
    cursorSnatched,
    cloneDuelActive,
    fridayDeployActive,
    fakeCrashActive,
    secretMode,
    peeking,
    chatFocused,
    chatLen: chatText.length,
    portfolioHover,
    micMode: "off",
  });

  useEffect(() => {
    liveRef.current = {
      theme,
      viewMode,
      charStyle,
      accessory,
      playMode,
      displayMood,
      pitch: activeMoodMeta.pitch,
      soundOn,
      portalTool,
      trampolineOn,
      featherTool,
      gravityFlipped,
      photoPosing,
      spicyActive,
      sourActive,
      pizzaActive,
      caffeinatedActive,
      spinTopActive,
      dizzyActive,
      tickledActive,
      pettingActive,
      isHeld,
      cursorSnatched,
      cloneDuelActive,
      fridayDeployActive,
      fakeCrashActive,
      secretMode,
      peeking,
      chatFocused,
      chatLen: chatText.length,
      portfolioHover,
      micMode: "off",
    };
  }, [
    theme,
    viewMode,
    charStyle,
    accessory,
    playMode,
    displayMood,
    activeMoodMeta.pitch,
    soundOn,
    portalTool,
    trampolineOn,
    featherTool,
    gravityFlipped,
    photoPosing,
    spicyActive,
    sourActive,
    pizzaActive,
    caffeinatedActive,
    spinTopActive,
    dizzyActive,
    tickledActive,
    pettingActive,
    isHeld,
    cursorSnatched,
    cloneDuelActive,
    fridayDeployActive,
    fakeCrashActive,
    secretMode,
    peeking,
    chatFocused,
    chatText.length,
    portfolioHover,
  ]);

  const actions = useCompanionActions(
    {
      simRef,
      liveRef,
      timersRef,
      pokeRef,
      polaroidSeqRef,
      snackSeqRef,
    },
    {
      setCharStyle,
      setAccessory,
      setPlayMode,
      setMood,
      setSoundOn,
      setPortalTool,
      setTrampolineOn,
      setFeatherTool,
      setGravityFlipped,
      setShakingStage,
      setCameraFlash,
      setPhotoPosing,
      setSpicyActive,
      setSourActive,
      setPizzaActive,
      setCaffeinatedActive,
      setSpinTopActive,
      setDizzyActive,
      setTickledActive,
      setCursorSnatched,
      setCloneDuelActive,
      setCloneSpeech,
      setFridayDeployActive,
      setFakeCrashActive,
      setPolaroids,
      setStickyNote,
      setSpeechShown,
      setDevJoke,
      setRallyCount,
      setBugsLeft,
      setArtVerdict,
      setAutoJam,
      setActivePad,
      chatText,
      setChatText,
    }
  );

  useCompanionLoop({
    stageRef,
    fxCanvasRef,
    elementsRef,
    simRef,
    liveRef,
    timersRef,
    viewMode,
    consumeSnack: actions.consumeSnack,
    say: actions.say,
    spawnParticles: actions.spawnParticles,
    handleBodyPoke: actions.handleBodyPoke,
    setIsHeld,
    setDizzyActive,
    setTickledActive,
    setCursorSnatched,
    setWidgetOpen,
    setRallyCount,
    setBugsLeft,
  });

  // Auto-Jam interval for DJ mode
  const { hitSynthPad } = actions;
  useEffect(() => {
    const timers = timersRef.current;
    if (!autoJam || playMode !== "dj") {
      if (timers.autoJam) clearInterval(timers.autoJam);
      return;
    }
    const seq = [0, 2, 4, 6, 4, 3, 2, 1];
    let idx = 0;
    hitSynthPad(SYNTH_PADS[seq[0]]);
    timers.autoJam = setInterval(() => {
      idx = (idx + 1) % seq.length;
      hitSynthPad(SYNTH_PADS[seq[idx]]);
    }, 280);
    return () => {
      if (timers.autoJam) clearInterval(timers.autoJam);
    };
  }, [autoJam, hitSynthPad, playMode]);

  // Keyboard shortcuts for DJ Jam (A S D F G H J) & Escape to exit Laser/Paint/Feather/Portal/BSOD
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || e.repeat) return;
      const tag = document.activeElement?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      if (e.key === "Escape") {
        setPortalTool(false);
        setFeatherTool(false);
        setAutoJam(false);
        setFakeCrashActive(false);
        setFridayDeployActive(false);
        setDevJoke(null);
        if (liveRef.current.playMode !== "interact") setPlayMode("interact");
        return;
      }

      if (liveRef.current.playMode === "dj") {
        const hit = SYNTH_PADS.find((p) => p.key === e.key.toLowerCase());
        if (hit) {
          e.preventDefault();
          hitSynthPad(hit);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [hitSynthPad]);

  const triggerHireHearts = useCallback(() => {
    const sim = simRef.current;
    actions.spawnParticles("heart", sim.x, sim.y - 45, 5, "#F43F5E");
  }, [actions]);

  const handleHeadPet = useCallback(
    (e: ReactPointerEvent<SVGRectElement>) => {
      const sim = simRef.current;
      if (sim.drag.active) return;
      const dx = e.clientX - sim.pet.lastX;
      sim.pet.lastX = e.clientX;
      const dir = dx > 2.5 ? 1 : dx < -2.5 ? -1 : 0;
      if (dir !== 0 && sim.pet.lastDir !== 0 && dir !== sim.pet.lastDir) {
        sim.pet.strokes += 1;
        sim.pet.decay = 0.85;
        if (sim.pet.strokes >= 2) {
          if (timersRef.current.pet) clearTimeout(timersRef.current.pet);
          setPettingActive(true);
          playComedySound("giggle", liveRef.current.soundOn, 1.15);
          if (sim.pet.fxCd <= 0) {
            sim.pet.fxCd = 0.34;
            actions.spawnParticles("heart", sim.x, sim.y - 74, 2, "#FB7185");
            if (sim.pet.strokes === 2) actions.say("Hehe... okay, that head-pat actually rocks.", 2400, true);
          }
          timersRef.current.pet = setTimeout(() => setPettingActive(false), 1200);
        }
      }
      if (dir !== 0) sim.pet.lastDir = dir;
    },
    [actions]
  );

  const handleStageDown = useCallback(
    (e: ReactPointerEvent<HTMLElement>) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest("button, input, form, a, [data-mochi-rig], [data-polaroid], [data-sticky], [data-dock]")) return;
      const r = stageRef.current?.getBoundingClientRect();
      if (!r) return;
      const px = e.clientX - r.left;
      const py = e.clientY - r.top;

      if (playMode === "paint") {
        setArtVerdict(null);
        simRef.current.activeStroke = {
          pts: [{ x: px, y: py }],
          color: styleMeta.accent,
        };
        return;
      }

      if (playMode === "magnet") {
        const sim = simRef.current;
        const dx = sim.x - px;
        const dy = sim.y - py;
        const dist = Math.hypot(dx, dy) || 1;
        sim.vx += (dx / dist) * 620;
        sim.vy += (dy / dist) * 520 - 160;
        sim.ballistic = true;
        sim.ballisticTimer = 0.78;
        sim.soundRings.push({ x: px, y: py, r: 14, maxR: 230, age: 0, color: styleMeta.accent });
        playComedySound("pulse", soundOn);
        actions.spawnParticles("star", px, py, 6, styleMeta.accent);
        actions.say("Magnetic repel! Whoosh!", 1800, true);
        return;
      }

      if (!portalTool) return;
      const clampedX = clamp(px, 56, r.width - 56);
      const clampedY = clamp(py, 96, simRef.current.floorY + 12);
      const p = simRef.current.portals;
      if (p.nextColor === "cyan") {
        p.cyan = { x: clampedX, y: clampedY };
        p.nextColor = "orange";
        actions.say("Cyan Entry Portal placed! Click again for Orange Exit.", 2200, true);
      } else {
        p.orange = { x: clampedX, y: clampedY };
        p.nextColor = "cyan";
        actions.say("Orange Exit Portal ready! Fling me or a snack inside!", 2500, true);
      }
      playComedySound("portal", soundOn, 1.15);
    },
    [actions, playMode, portalTool, soundOn, stageRef, styleMeta.accent]
  );

  const startRigDrag = useCallback(
    (e: ReactPointerEvent<SVGSVGElement>) => {
      e.stopPropagation();
      const r = stageRef.current?.getBoundingClientRect();
      const px = r ? e.clientX - r.left : e.clientX;
      const py = r ? e.clientY - r.top : e.clientY;
      const sim = simRef.current;
      sim.drag = {
        active: true,
        moved: false,
        startX: e.clientX,
        startY: e.clientY,
        lastX: e.clientX,
        lastY: e.clientY,
        vx: 0,
        vy: 0,
        offX: sim.x - px,
        offY: sim.y - py,
        downAt: performance.now(),
      };
    },
    [stageRef]
  );

  const startPolaroidDrag = useCallback(
    (cardId: number, e: ReactPointerEvent<HTMLDivElement>) => {
      e.stopPropagation();
      const startX = e.clientX;
      const startY = e.clientY;
      const card = polaroids.find((c) => c.id === cardId);
      if (!card) return;
      const initX = card.x;
      const initY = card.y;

      const onM = (ev: PointerEvent) => {
        const dx = ev.clientX - startX;
        const dy = ev.clientY - startY;
        setPolaroids((prev) => prev.map((c) => (c.id === cardId ? { ...c, x: initX + dx, y: initY + dy } : c)));
      };
      const onU = () => {
        window.removeEventListener("pointermove", onM);
        window.removeEventListener("pointerup", onU);
      };
      window.addEventListener("pointermove", onM);
      window.addEventListener("pointerup", onU);
    },
    [polaroids]
  );

  return {
    isDark,
    toggleTheme,
    ui,
    viewMode,
    setViewMode,
    charStyle,
    accessory,
    playMode,
    styleMeta,
    mood,
    displayMood,
    activeMoodMeta,
    soundOn,
    setSoundOn,
    dockTab,
    setDockTab,
    portalTool,
    setPortalTool,
    trampolineOn,
    setTrampolineOn,
    featherTool,
    setFeatherTool,
    gravityFlipped,
    shakingStage,
    cameraFlash,
    photoPosing,
    rallyCount,
    bugsLeft,
    artVerdict,
    setArtVerdict,
    autoJam,
    setAutoJam,
    activePad,
    spicyActive,
    sourActive,
    pizzaActive,
    spinTopActive,
    dizzyActive,
    tickledActive,
    pettingActive,
    isHeld,
    cursorSnatched,
    cloneDuelActive,
    cloneSpeech,
    fridayDeployActive,
    setFridayDeployActive,
    fakeCrashActive,
    setFakeCrashActive,
    devJoke,
    setDevJoke,
    polaroids,
    setPolaroids,
    stickyNote,
    setStickyNote,
    speechShown,
    chatText,
    setChatText,
    setChatFocused,
    secretMode,
    setSecretMode,
    peeking,
    setPeeking,
    widgetOpen,
    setWidgetOpen,
    portfolioHover,
    setPortfolioHover,
    ...actions,
    triggerHireHearts,
    handleHeadPet,
    handleStageDown,
    startRigDrag,
    startPolaroidDrag,
  };
}
