import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type RefObject,
} from "react";
import { CHARACTER_STYLES, MOODS, type CharacterStyleId, type MoodId } from "@/lib/data";
import { useTheme } from "@/components/theme/ThemeContext";
import type {
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
  const [mood, setMood] = useState<MoodId>("playful");
  const [soundOn, setSoundOn] = useState<boolean>(false);
  const [dockTab, setDockTab] = useState<DockTab>("moods");

  // Playable Tools & Interactive States
  const [portalTool, setPortalTool] = useState<boolean>(false);
  const [trampolineOn, setTrampolineOn] = useState<boolean>(false);
  const [featherTool, setFeatherTool] = useState<boolean>(false);
  const [gravityFlipped, setGravityFlipped] = useState<boolean>(false);
  const [shakingStage, setShakingStage] = useState<boolean>(false);
  const [cameraFlash, setCameraFlash] = useState<boolean>(false);
  const [photoPosing, setPhotoPosing] = useState<boolean>(false);

  // Slapstick Reaction Overrides
  const [spicyActive, setSpicyActive] = useState<boolean>(false);
  const [sourActive, setSourActive] = useState<boolean>(false);
  const [caffeinatedActive, setCaffeinatedActive] = useState<boolean>(false);
  const [spinTopActive, setSpinTopActive] = useState<boolean>(false);
  const [dizzyActive, setDizzyActive] = useState<boolean>(false);
  const [tickledActive, setTickledActive] = useState<boolean>(false);
  const [pettingActive, setPettingActive] = useState<boolean>(false);
  const [isHeld, setIsHeld] = useState<boolean>(false);
  const [cursorSnatched, setCursorSnatched] = useState<boolean>(false);
  const [cloneDuelActive, setCloneDuelActive] = useState<boolean>(false);
  const [cloneSpeech, setCloneSpeech] = useState<string>("");

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
      glass: isDark ? "rgba(12, 21, 36, 0.84)" : "rgba(255, 255, 255, 0.86)",
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
    caffeinatedActive,
    spinTopActive,
    dizzyActive,
    tickledActive,
    pettingActive,
    isHeld,
    cursorSnatched,
    cloneDuelActive,
    secretMode,
    peeking,
    chatFocused,
    chatLen: chatText.length,
    portfolioHover,
  });

  useEffect(() => {
    liveRef.current = {
      theme,
      viewMode,
      charStyle,
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
      caffeinatedActive,
      spinTopActive,
      dizzyActive,
      tickledActive,
      pettingActive,
      isHeld,
      cursorSnatched,
      cloneDuelActive,
      secretMode,
      peeking,
      chatFocused,
      chatLen: chatText.length,
      portfolioHover,
    };
  }, [
    theme,
    viewMode,
    charStyle,
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
    caffeinatedActive,
    spinTopActive,
    dizzyActive,
    tickledActive,
    pettingActive,
    isHeld,
    cursorSnatched,
    cloneDuelActive,
    secretMode,
    peeking,
    chatFocused,
    chatText.length,
    portfolioHover,
  ]);

  const actions = useCompanionActions(
    { simRef, liveRef, timersRef, pokeRef, polaroidSeqRef, snackSeqRef },
    {
      setCharStyle,
      setMood,
      setPortalTool,
      setTrampolineOn,
      setFeatherTool,
      setGravityFlipped,
      setShakingStage,
      setCameraFlash,
      setPhotoPosing,
      setSpicyActive,
      setSourActive,
      setCaffeinatedActive,
      setSpinTopActive,
      setDizzyActive,
      setTickledActive,
      setCursorSnatched,
      setCloneDuelActive,
      setCloneSpeech,
      setPolaroids,
      setStickyNote,
      setSpeechShown,
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
    setCursorSnatched,
    setWidgetOpen,
  });

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

  const handleFeatherWiggle = useCallback(
    (e: ReactPointerEvent<SVGSVGElement>) => {
      if (!featherTool) return;
      const sim = simRef.current;
      const dx = e.clientX - sim.tickle.lastX;
      sim.tickle.lastX = e.clientX;
      const dir = dx > 2 ? 1 : dx < -2 ? -1 : 0;
      if (dir !== 0 && sim.tickle.lastDir !== 0 && dir !== sim.tickle.lastDir) {
        sim.tickle.strokes += 1;
        sim.tickle.decay = 0.85;
        if (sim.tickle.strokes >= 2) {
          if (timersRef.current.tickle) clearTimeout(timersRef.current.tickle);
          setTickledActive(true);
          playComedySound("giggle", liveRef.current.soundOn, 1.32);
          if (sim.tickle.cd <= 0) {
            sim.tickle.cd = 0.42;
            actions.spawnParticles("confetti", sim.x, sim.y - 30, 4);
            if (sim.tickle.strokes === 2 || sim.tickle.strokes === 6) {
              actions.say("STOP HAHAHAHA MY RIBS ARE SVG PATHS!!", 2200, true);
            }
          }
          timersRef.current.tickle = setTimeout(() => setTickledActive(false), 1100);
        }
      }
      if (dir !== 0) sim.tickle.lastDir = dir;
    },
    [actions, featherTool]
  );

  const handleStageDown = useCallback(
    (e: ReactPointerEvent<HTMLElement>) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest("button, input, form, [data-mochi-rig], [data-polaroid], [data-sticky]")) return;
      if (!portalTool) return;
      const r = stageRef.current?.getBoundingClientRect();
      if (!r) return;

      const px = clamp(e.clientX - r.left, 56, r.width - 56);
      const py = clamp(e.clientY - r.top, 96, simRef.current.floorY + 12);
      const p = simRef.current.portals;
      if (p.nextColor === "cyan") {
        p.cyan = { x: px, y: py };
        p.nextColor = "orange";
        actions.say("Cyan Entry Portal placed! Click again for Orange Exit.", 2200, true);
      } else {
        p.orange = { x: px, y: py };
        p.nextColor = "cyan";
        actions.say("Orange Exit Portal ready! Fling me or a snack inside!", 2500, true);
      }
      playComedySound("portal", soundOn, 1.15);
    },
    [actions, portalTool, soundOn, stageRef]
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
    spicyActive,
    sourActive,
    spinTopActive,
    dizzyActive,
    tickledActive,
    pettingActive,
    isHeld,
    cursorSnatched,
    cloneDuelActive,
    cloneSpeech,
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
    handleFeatherWiggle,
    handleStageDown,
    startRigDrag,
    startPolaroidDrag,
  };
}
