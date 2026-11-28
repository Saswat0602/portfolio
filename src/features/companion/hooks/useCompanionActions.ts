import { useCallback, useRef, type Dispatch, type MutableRefObject, type SetStateAction } from "react";
import {
  ART_RATINGS,
  BSOD_QUIPS,
  BUG_TAGS,
  CHARACTER_STYLES,
  CLONE_DUEL_SCRIPTS,
  DEV_JOKES,
  DISCO_QUIPS,
  FRIDAY_DEPLOY_QUIPS,
  MOODS,
  PHOTO_POSE_QUIPS,
  PHOTO_PRINT_QUIPS,
  PIZZA_QUIPS,
  POKE_QUIPS,
  POLAROID_CAPTIONS,
  SNACKS,
  SNEEZE_QUIPS,
  type AccessoryId,
  type CharacterStyleId,
  type MoodId,
  type PlayModeId,
  type SnackId,
  type SynthPadMeta,
} from "@/lib/data";
import type {
  ArtVerdictState,
  CompanionTimers,
  LiveSnapshot,
  ParticleKind,
  PolaroidCard,
  SimState,
  SnackEntity,
  StickyNoteState,
} from "../types";
import { clamp } from "../utils/physics";
import { getAudioContext, playComedySound } from "../utils/audio";

function pickRandom<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

export interface CompanionActionSetters {
  setCharStyle: Dispatch<SetStateAction<CharacterStyleId>>;
  setAccessory: Dispatch<SetStateAction<AccessoryId>>;
  setPlayMode: Dispatch<SetStateAction<PlayModeId>>;
  setMood: Dispatch<SetStateAction<MoodId>>;
  setSoundOn: Dispatch<SetStateAction<boolean>>;
  setPortalTool: Dispatch<SetStateAction<boolean>>;
  setTrampolineOn: Dispatch<SetStateAction<boolean>>;
  setFeatherTool: Dispatch<SetStateAction<boolean>>;
  setGravityFlipped: Dispatch<SetStateAction<boolean>>;
  setShakingStage: Dispatch<SetStateAction<boolean>>;
  setCameraFlash: Dispatch<SetStateAction<boolean>>;
  setPhotoPosing: Dispatch<SetStateAction<boolean>>;
  setSpicyActive: Dispatch<SetStateAction<boolean>>;
  setSourActive: Dispatch<SetStateAction<boolean>>;
  setPizzaActive: Dispatch<SetStateAction<boolean>>;
  setCaffeinatedActive: Dispatch<SetStateAction<boolean>>;
  setSpinTopActive: Dispatch<SetStateAction<boolean>>;
  setDizzyActive: Dispatch<SetStateAction<boolean>>;
  setTickledActive: Dispatch<SetStateAction<boolean>>;
  setCursorSnatched: Dispatch<SetStateAction<boolean>>;
  setCloneDuelActive: Dispatch<SetStateAction<boolean>>;
  setCloneSpeech: Dispatch<SetStateAction<string>>;
  setFridayDeployActive: Dispatch<SetStateAction<boolean>>;
  setFakeCrashActive: Dispatch<SetStateAction<boolean>>;
  setPolaroids: Dispatch<SetStateAction<PolaroidCard[]>>;
  setStickyNote: Dispatch<SetStateAction<StickyNoteState | null>>;
  setSpeechShown: Dispatch<SetStateAction<string>>;
  setDevJoke: Dispatch<SetStateAction<string | null>>;
  setRallyCount: Dispatch<SetStateAction<number>>;
  setBugsLeft: Dispatch<SetStateAction<number>>;
  setArtVerdict: Dispatch<SetStateAction<ArtVerdictState | null>>;
  setAutoJam: Dispatch<SetStateAction<boolean>>;
  setActivePad: Dispatch<SetStateAction<string | null>>;
}

export interface CompanionActionRefs {
  simRef: MutableRefObject<SimState>;
  liveRef: MutableRefObject<LiveSnapshot>;
  timersRef: MutableRefObject<CompanionTimers>;
  pokeRef: MutableRefObject<{ count: number; lastAt: number }>;
  polaroidSeqRef: MutableRefObject<number>;
  snackSeqRef: MutableRefObject<number>;
}

export function useCompanionActions(
  refs: CompanionActionRefs,
  setters: CompanionActionSetters
) {
  const { simRef, liveRef, timersRef, pokeRef, polaroidSeqRef, snackSeqRef } = refs;
  const {
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
  } = setters;

  const lastPrankIdxRef = useRef(-1);
  const bugSeqRef = useRef(1);

  const spawnParticles = useCallback(
    (kind: ParticleKind, x: number, y: number, count = 8, customColor: string | null = null) => {
      const arr = simRef.current.particles;
      const colors = ["#FF6B4A", "#2563EB", "#F5C400", "#10B981", "#EC4899", "#FFFFFF"];
      for (let i = 0; i < count; i++) {
        const ang = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.65;
        const spd = kind === "poof" ? 70 + Math.random() * 90 : kind === "dust" ? 35 + Math.random() * 55 : 95 + Math.random() * 170;
        const vy =
          kind === "heart" || kind === "burp" || kind === "zzz" || kind === "star"
            ? -55 - Math.random() * 55
            : Math.sin(ang) * spd - (kind === "poof" ? 12 : 45);
        arr.push({
          kind,
          x: x + (Math.random() - 0.5) * 18,
          y: y + (Math.random() - 0.5) * 14,
          vx: Math.cos(ang) * spd,
          vy,
          size: kind === "poof" ? 18 + Math.random() * 16 : kind === "tissue" ? 9 : kind === "confetti" ? 7 : 5,
          rot: Math.random() * Math.PI * 2,
          vRot: (Math.random() - 0.5) * 9,
          age: 0,
          life: kind === "poof" ? 0.55 : kind === "tissue" ? 1.4 : kind === "confetti" ? 1.25 : 0.85,
          color: customColor || colors[i % colors.length],
        });
      }
      if (arr.length > 180) arr.splice(0, arr.length - 180);
    },
    [simRef]
  );

  const say = useCallback(
    (text: string, holdMs = 3100, silent = false) => {
      if (timersRef.current.speechType) clearInterval(timersRef.current.speechType);
      if (timersRef.current.speechClear) clearTimeout(timersRef.current.speechClear);
      if (timersRef.current.joke) clearTimeout(timersRef.current.joke);
      if (!silent) playComedySound("pop", liveRef.current.soundOn, liveRef.current.pitch);

      setDevJoke(null);
      setSpeechShown(text);
      timersRef.current.speechClear = setTimeout(() => setSpeechShown(""), holdMs);
    },
    [liveRef, setDevJoke, setSpeechShown, timersRef]
  );

  const handleSelectStyle = useCallback(
    (nextStyle: CharacterStyleId) => {
      if (nextStyle === liveRef.current.charStyle) return;
      const sim = simRef.current;
      setCharStyle(nextStyle);
      sim.sx = 1.36;
      sim.sy = 0.68;
      sim.vy = -240;
      playComedySound("poof", liveRef.current.soundOn, 1.0);
      spawnParticles("poof", sim.x, sim.y, 12, "#FFFFFF");
      const meta = CHARACTER_STYLES.find((c) => c.id === nextStyle);
      if (meta) say(`POOF!! Switched chassis to ${meta.label}!`, 2400, true);
    },
    [liveRef, say, setCharStyle, simRef, spawnParticles]
  );

  const handleSelectAccessory = useCallback(
    (nextAcc: AccessoryId) => {
      const resolved: AccessoryId = nextAcc === liveRef.current.accessory && nextAcc !== "none" ? "none" : nextAcc;
      setAccessory(resolved);
      playComedySound("boing", liveRef.current.soundOn, 1.25);
      const lines: Record<AccessoryId, string> = {
        none: "Accessory removed — pure hardware.",
        headphones: "Studio cans on! Feeling that head-nod groove.",
        halo: "Zero bugs. Pure angelic silicon.",
        shades: "Cyber optics engaged. Shipped without tests.",
        crown: "Bow before your 60Hz sovereign.",
        wizard: "Casting npm run build with zero warnings!",
        cat: "Cat ears online. Ready for Laser mode!",
        propeller: "Propeller beanie spinning up for takeoff!",
        chef: "Simmering your React tree at 60 FPS!",
        box: "Stealth cardboard box deployed. Nobody sees me.",
      };
      say(lines[resolved], 2400, true);
    },
    [liveRef, say, setAccessory]
  );

  const handleSelectMood = useCallback(
    (nextMoodId: MoodId) => {
      const resolved: MoodId =
        nextMoodId === liveRef.current.displayMood && nextMoodId !== "playful" ? "playful" : nextMoodId;
      setMood(resolved);
      setCaffeinatedActive(resolved === "caffeinated");
      const m = MOODS.find((item) => item.id === resolved) || MOODS[0];
      const sim = simRef.current;
      sim.sx = 1.18;
      sim.sy = 0.84;

      if (resolved === "dramatic") {
        playComedySound("sadTrombone", liveRef.current.soundOn, 1);
      } else if (resolved === "hype") {
        sim.vy = -310;
        playComedySound("chime", liveRef.current.soundOn, 1.25);
        spawnParticles("confetti", sim.x, sim.y - 30, 18);
      } else if (resolved === "lovestruck") {
        playComedySound("chime", liveRef.current.soundOn, 1.15);
        spawnParticles("heart", sim.x, sim.y - 54, 6, "#FB7185");
      } else if (resolved === "caffeinated") {
        playComedySound("slideUp", liveRef.current.soundOn, 1.35);
      } else {
        playComedySound("pop", liveRef.current.soundOn, m.pitch);
      }

      say(pickRandom(m.quips), 3000, true);
    },
    [liveRef, say, setCaffeinatedActive, setMood, simRef, spawnParticles]
  );

  const releaseBugs = useCallback(
    (count = 6) => {
      const sim = simRef.current;
      for (let i = 0; i < count; i++) {
        sim.bugs.push({
          id: ++bugSeqRef.current,
          x: clamp(80 + Math.random() * (sim.w - 160), 50, sim.w - 50),
          y: clamp(110 + Math.random() * (sim.floorY - 140), 96, sim.floorY),
          vx: (Math.random() > 0.5 ? 1 : -1) * (90 + Math.random() * 90),
          vy: (Math.random() - 0.5) * 120,
          tag: BUG_TAGS[i % BUG_TAGS.length],
          legPhase: Math.random() * Math.PI * 2,
        });
      }
      setBugsLeft(sim.bugs.length);
      playComedySound("pop", liveRef.current.soundOn, 1.2);
      say(`Released ${count} rogue production bugs! Hunting them down!`, 2600, true);
    },
    [liveRef, say, setBugsLeft, simRef]
  );

  const selectPlayMode = useCallback(
    (next: PlayModeId) => {
      const resolved: PlayModeId = next === liveRef.current.playMode && next !== "interact" ? "interact" : next;
      const sim = simRef.current;
      setArtVerdict(null);
      setAutoJam(false);
      setPortalTool(false);
      setFeatherTool(false);
      setPlayMode(resolved);
      playComedySound("tick", liveRef.current.soundOn);

      if (resolved === "catch") {
        sim.rally = 0;
        setRallyCount(0);
        sim.ball = {
          x: sim.w * 0.5,
          y: 118,
          vx: (Math.random() > 0.5 ? 1 : -1) * 190,
          vy: -40,
          r: 16,
          angle: 0,
          spin: 4,
          lastHit: "none",
          trail: [],
        };
        say("Catch mode! Move cursor paddle to rally the sphere!", 2800, true);
      } else {
        sim.ball = null;
      }

      if (resolved === "bugs") {
        releaseBugs(6);
      } else {
        sim.bugs = [];
        setBugsLeft(0);
      }

      if (resolved === "laser") say("Crimson laser armed! Move pointer to tease! (Esc to exit)", 2600, true);
      else if (resolved === "magnet") say("Magnetic orbit active! Click anywhere to fire repel pulse!", 2800, true);
      else if (resolved === "paint") say("Drag anywhere to paint luminous trampolines!", 2800, true);
      else if (resolved === "dj") {
        setSoundOn(true);
        getAudioContext();
        say("Synth pads live! Tap pads or press A S D F G H J!", 2800, true);
      } else if (resolved === "interact") say("Back to free interaction mode!", 1800, true);
    },
    [
      liveRef,
      releaseBugs,
      say,
      setArtVerdict,
      setAutoJam,
      setBugsLeft,
      setFeatherTool,
      setPlayMode,
      setPortalTool,
      setRallyCount,
      setSoundOn,
      simRef,
    ]
  );

  const triggerArtCritique = useCallback(() => {
    const sim = simRef.current;
    if (sim.strokes.length === 0) {
      say("Paint a ribbon first so I can judge your bezier confidence!", 2600);
      return;
    }
    setArtVerdict(null);
    sim.criticScanY = 85;
    playComedySound("tick", liveRef.current.soundOn);
    say("Scanning composition with art-critic monocle...", 1400, true);

    if (timersRef.current.critique) clearTimeout(timersRef.current.critique);
    timersRef.current.critique = setTimeout(() => {
      sim.criticScanY = -1;
      const pick = pickRandom(ART_RATINGS);
      setArtVerdict(pick);
      playComedySound("chime", liveRef.current.soundOn);
      say(`"${pick.title}" — ${pick.score}. ${pick.note}`, 4200, true);
    }, 1350);
  }, [liveRef, say, setArtVerdict, simRef, timersRef]);

  const clearPaintStrokes = useCallback(() => {
    simRef.current.strokes = [];
    setArtVerdict(null);
    playComedySound("tick", liveRef.current.soundOn);
  }, [liveRef, setArtVerdict, simRef]);

  const hitSynthPad = useCallback(
    (pad: SynthPadMeta) => {
      setSoundOn(true);
      getAudioContext();
      playComedySound("marimba", true, pad.hz);
      setActivePad(pad.key);
      setTimeout(() => setActivePad((cur) => (cur === pad.key ? null : cur)), 170);

      const sim = simRef.current;
      sim.beatEnergy = 1.0;
      sim.vy = -175;
      sim.sx = 1.15;
      sim.sy = 0.86;
      sim.vRot = (Math.random() > 0.5 ? 1 : -1) * 70;
      sim.soundRings.push({ x: sim.x, y: sim.y + 38, r: 18, maxR: 240, age: 0, color: pad.color });
      spawnParticles("star", sim.x, sim.y - 54, 3, pad.color);
    },
    [setActivePad, setSoundOn, simRef, spawnParticles]
  );

  const triggerMiniClones = useCallback(() => {
    const sim = simRef.current;
    sim.miniClones = [
      { x: sim.x - 42, y: sim.y - 26, vx: -220, vy: -260, ttl: 7.0, phase: 0 },
      { x: sim.x, y: sim.y - 46, vx: 30, vy: -310, ttl: 7.0, phase: 2.1 },
      { x: sim.x + 42, y: sim.y - 26, vx: 220, vy: -260, ttl: 7.0, phase: 4.2 },
    ];
    playComedySound("chime", liveRef.current.soundOn);
    spawnParticles("star", sim.x, sim.y - 12, 9);
    say("Horizontal autoscaling: 3 mini-clones online for 7s!", 2800, true);
  }, [liveRef, say, simRef, spawnParticles]);

  const triggerSneeze = useCallback(() => {
    const sim = simRef.current;
    playComedySound("sneeze", liveRef.current.soundOn);
    sim.vy = -300;
    sim.vx = (sim.x > sim.w * 0.5 ? -1 : 1) * 320;
    sim.sx = 1.28;
    sim.sy = 0.76;
    spawnParticles("tissue", sim.x, sim.y - 10, 10);
    say(pickRandom(SNEEZE_QUIPS), 2600, true);
  }, [liveRef, say, simRef, spawnParticles]);

  const throwSnack = useCallback(
    (kind: SnackId) => {
      const sim = simRef.current;
      const meta = SNACKS.find((s) => s.id === kind) || SNACKS[0];
      const side = sim.x > sim.w * 0.5 ? -1 : 1;
      const startX = clamp(sim.w * 0.5 + side * Math.min(240, sim.w * 0.28), 70, sim.w - 70);
      sim.snacks.push({
        id: ++snackSeqRef.current,
        kind,
        emoji: meta.emoji,
        color: meta.color,
        x: startX,
        y: 86,
        vx: -side * (90 + Math.random() * 80),
        vy: -50,
        rot: (Math.random() - 0.5) * 0.5,
        vRot: -side * 4.5,
        portalCd: 0,
      });
      if (sim.snacks.length > 6) sim.snacks.shift();
      playComedySound("pop", liveRef.current.soundOn, 1.15);
      say(
        kind === "bug"
          ? "A wild PROD BUG appeared! Hunting it down!"
          : `Ooh! ${meta.label}! Coming right over!`,
        2000,
        true
      );
    },
    [liveRef, say, simRef, snackSeqRef]
  );

  const consumeSnack = useCallback(
    (snack: SnackEntity) => {
      const sim = simRef.current;
      playComedySound("crunch", liveRef.current.soundOn);

      if (snack.kind === "pepper") {
        if (timersRef.current.spicy) clearTimeout(timersRef.current.spicy);
        setSpicyActive(true);
        playComedySound("fire", liveRef.current.soundOn);
        const dir = sim.x > sim.w * 0.5 ? -1 : 1;
        sim.vx = dir * 820;
        sim.vy = -320;
        sim.sx = 1.28;
        sim.sy = 0.78;
        spawnParticles("confetti", sim.x, sim.y, 12, "#FF4500");
        say("HOT!! HOT!! WATER!! MY GPU IS MELTING!! 🔥", 3000, true);
        timersRef.current.spicy = setTimeout(() => setSpicyActive(false), 2400);
      } else if (snack.kind === "lemon") {
        if (timersRef.current.sour) clearTimeout(timersRef.current.sour);
        setSourActive(true);
        sim.vFaceScale = -8;
        sim.sx = 0.84;
        sim.sy = 1.18;
        playComedySound("squeak", liveRef.current.soundOn, 1.15);
        say("*SQUEAK*... SO SOUR MY FACE COLLAPSED TO 0px!!", 2700, true);
        timersRef.current.sour = setTimeout(() => setSourActive(false), 2500);
      } else if (snack.kind === "espresso") {
        if (timersRef.current.caffeine) clearTimeout(timersRef.current.caffeine);
        setCaffeinatedActive(true);
        setMood("caffeinated");
        playComedySound("slideUp", liveRef.current.soundOn, 1.45);
        spawnParticles("confetti", sim.x, sim.y - 20, 12, "#F59E0B");
        say("TRIPLE ESPRESSO!! I CAN SEE THROUGH TIME AND JSON!!", 3200, true);
        timersRef.current.caffeine = setTimeout(() => {
          setCaffeinatedActive(false);
          setMood((m) => (m === "caffeinated" ? "playful" : m));
          say("Phew... caffeine crash. Back to normal clock speed.", 2400);
        }, 7000);
      } else if (snack.kind === "pizza") {
        if (timersRef.current.pizza) clearTimeout(timersRef.current.pizza);
        setPizzaActive(true);
        sim.vy = -210;
        sim.sx = 1.24;
        sim.sy = 0.78;
        playComedySound("chime", liveRef.current.soundOn, 1.12);
        spawnParticles("heart", sim.x, sim.y - 54, 7, "#FB7185");
        spawnParticles("star", sim.x, sim.y - 36, 6, "#F59E0B");
        spawnParticles("burp", sim.x + 28, sim.y - 24, 3, "#FFFFFF");
        say(pickRandom(PIZZA_QUIPS), 3200, true);
        timersRef.current.pizza = setTimeout(() => setPizzaActive(false), 2800);
      } else {
        sim.vy = -240;
        sim.sx = 1.22;
        sim.sy = 0.82;
        playComedySound("chime", liveRef.current.soundOn, 1.2);
        spawnParticles("burp", sim.x + 24, sim.y - 28, 4, "#34D399");
        spawnParticles("confetti", sim.x, sim.y - 20, 10);
        say("*BURP* — Bug squashed & eaten! 0 warnings, ship it!", 2800, true);
      }
    },
    [
      liveRef,
      say,
      setCaffeinatedActive,
      setMood,
      setPizzaActive,
      setSourActive,
      setSpicyActive,
      simRef,
      spawnParticles,
      timersRef,
    ]
  );

  const triggerBackflip = useCallback(() => {
    const sim = simRef.current;
    sim.flipping = true;
    sim.flipDeg = 0;
    sim.vy = liveRef.current.gravityFlipped ? 520 : -520;
    sim.sx = 0.78;
    sim.sy = 1.28;
    sim.ballistic = true;
    sim.ballisticTimer = 0.9;
    playComedySound("slideUp", liveRef.current.soundOn, 1.15);
    spawnParticles("confetti", sim.x, sim.y + 30, 12);
    say(
      pickRandom([
        "360° BACKFLIP!! Judges gave it a 10.0!",
        "TUCK, ROTATE, STICK THE LANDING!!",
        "Zero layout shift mid-air backflip!!",
      ]),
      2600,
      true
    );
  }, [liveRef, say, simRef, spawnParticles]);

  const handleBodyPoke = useCallback(() => {
    const sim = simRef.current;
    if (liveRef.current.displayMood === "sleepy") {
      setMood("playful");
      sim.vy = -680;
      sim.sx = 0.74;
      sim.sy = 1.34;
      playComedySound("slideUp", liveRef.current.soundOn, 1.35);
      spawnParticles("dust", sim.x, sim.y + 42, 8);
      say(pickRandom(POKE_QUIPS.sleepyWake), 2900, true);
      return;
    }

    const now = performance.now();
    if (now - pokeRef.current.lastAt > 4500) pokeRef.current.count = 0;
    pokeRef.current.lastAt = now;
    pokeRef.current.count += 1;
    const n = pokeRef.current.count;

    sim.sx = 1.24;
    sim.sy = 0.78;
    sim.vy = liveRef.current.gravityFlipped ? 180 : -180;
    sim.vAntBend = (Math.random() > 0.5 ? 1 : -1) * 380;

    if (n === 1) {
      playComedySound("boing", liveRef.current.soundOn, 1.2);
      say(pickRandom(POKE_QUIPS.first), 2200, true);
    } else if (n === 2) {
      setMood("grumpy");
      playComedySound("boing", liveRef.current.soundOn, 0.95);
      say(pickRandom(POKE_QUIPS.second), 2300, true);
    } else if (n === 3) {
      setMood("paranoid");
      playComedySound("squeak", liveRef.current.soundOn, 1.0);
      say(pickRandom(POKE_QUIPS.third), 2500, true);
    } else {
      pokeRef.current.count = 0;
      if (timersRef.current.spinTop) clearTimeout(timersRef.current.spinTop);
      setSpinTopActive(true);
      sim.vx = (Math.random() > 0.5 ? 1 : -1) * 460;
      sim.vy = -260;
      playComedySound("slideUp", liveRef.current.soundOn, 1.5);
      spawnParticles("confetti", sim.x, sim.y, 14);
      say(pickRandom(POKE_QUIPS.spinTop), 2600, true);
      timersRef.current.spinTop = setTimeout(() => {
        setSpinTopActive(false);
        setDizzyActive(true);
        if (timersRef.current.dizzy) clearTimeout(timersRef.current.dizzy);
        timersRef.current.dizzy = setTimeout(() => setDizzyActive(false), 1800);
      }, 2100);
    }
  }, [liveRef, pokeRef, say, setDizzyActive, setMood, setSpinTopActive, simRef, spawnParticles, timersRef]);

  const triggerShakeStage = useCallback(() => {
    if (timersRef.current.shake) clearTimeout(timersRef.current.shake);
    setShakingStage(true);
    const sim = simRef.current;
    sim.vx += (Math.random() - 0.5) * 720;
    sim.vy = -560;
    sim.vRot = (Math.random() > 0.5 ? 1 : -1) * 320;
    sim.snacks.forEach((sn) => {
      sn.vx += (Math.random() - 0.5) * 620;
      sn.vy = -480 - Math.random() * 180;
    });
    playComedySound("boing", liveRef.current.soundOn, 0.75);
    spawnParticles("dust", sim.w * 0.5, sim.floorY + 30, 14);
    say("EARTHQUAKE!! WHO SHOOK THE SNOW GLOBE?!", 2800, true);
    timersRef.current.shake = setTimeout(() => setShakingStage(false), 1200);
  }, [liveRef, say, setShakingStage, simRef, spawnParticles, timersRef]);

  const triggerPhotoBooth = useCallback(() => {
    if (timersRef.current.photo1) clearTimeout(timersRef.current.photo1);
    if (timersRef.current.photo2) clearTimeout(timersRef.current.photo2);
    if (timersRef.current.photoFlash) clearTimeout(timersRef.current.photoFlash);
    setPhotoPosing(true);
    say(pickRandom(PHOTO_POSE_QUIPS), 900);

    timersRef.current.photo1 = setTimeout(() => {
      setCameraFlash(true);
      playComedySound("shutter", liveRef.current.soundOn);
      const id = ++polaroidSeqRef.current;
      const sim = simRef.current;
      const caption = pickRandom(POLAROID_CAPTIONS);
      const moodMeta = MOODS.find((m) => m.id === liveRef.current.displayMood) || MOODS[0];
      const newCard: PolaroidCard = {
        id,
        styleId: liveRef.current.charStyle,
        moodId: liveRef.current.displayMood,
        moodLabel: moodMeta.label,
        caption,
        x: clamp(sim.x + (sim.x > sim.w * 0.5 ? -160 : 150), 96, Math.max(120, sim.w - 96)),
        y: clamp(sim.y - 30, 120, Math.max(140, sim.floorY - 60)),
        rot: (Math.random() - 0.5) * 18,
      };
      setPolaroids((prev) => [...prev.slice(-4), newCard]);
      timersRef.current.photoFlash = setTimeout(() => setCameraFlash(false), 170);
      timersRef.current.photo2 = setTimeout(() => {
        setPhotoPosing(false);
        say(pickRandom(PHOTO_PRINT_QUIPS), 2800, true);
      }, 360);
    }, 520);
  }, [liveRef, polaroidSeqRef, say, setCameraFlash, setPhotoPosing, setPolaroids, simRef, timersRef]);

  const triggerGravityFlip = useCallback(() => {
    if (timersRef.current.gravity) clearTimeout(timersRef.current.gravity);
    setGravityFlipped((prev) => {
      const next = !prev;
      const sim = simRef.current;
      playComedySound(next ? "slideUp" : "slideDown", liveRef.current.soundOn, 1.0);
      if (next) {
        sim.vy = -340;
        say("GRAVITY INVERTED!! Walking on the ceiling for 5 seconds!", 3200, true);
        timersRef.current.gravity = setTimeout(() => {
          setGravityFlipped(false);
          playComedySound("slideDown", liveRef.current.soundOn, 1.0);
          say("Gravity restored! Brace for touchdown!", 2200, true);
        }, 5000);
      } else {
        say("Normal gravity restored!", 2000, true);
      }
      return next;
    });
  }, [liveRef, say, setGravityFlipped, simRef, timersRef]);

  const triggerCloneDuel = useCallback(() => {
    if (timersRef.current.clone1) clearTimeout(timersRef.current.clone1);
    if (timersRef.current.clone2) clearTimeout(timersRef.current.clone2);
    if (timersRef.current.clone3) clearTimeout(timersRef.current.clone3);
    if (timersRef.current.cloneEnd) clearTimeout(timersRef.current.cloneEnd);

    const sim = simRef.current;
    sim.vy = -340;
    sim.ballistic = true;
    sim.ballisticTimer = 1.0;
    sim.clone = {
      active: true,
      x: clamp(sim.x + (sim.x > sim.w * 0.5 ? -200 : 200), 90, Math.max(120, sim.w - 90)),
      y: Math.max(120, sim.floorY - 220),
      vx: (sim.x > sim.w * 0.5 ? 1 : -1) * 180,
      vy: -360,
      rot: 0,
    };
    setCloneDuelActive(true);
    playComedySound("poof", liveRef.current.soundOn);
    spawnParticles("poof", sim.clone.x, sim.clone.y, 8, "#FFFFFF");

    const script = pickRandom(CLONE_DUEL_SCRIPTS);
    setCloneSpeech(script[0]);
    say(script[1], 2100, true);

    timersRef.current.clone1 = setTimeout(() => {
      setCloneSpeech(script[2]);
      say(script[3], 2000, true);
    }, 2000);

    timersRef.current.clone2 = setTimeout(() => {
      setCloneSpeech(script[4]);
      say(script[5], 1900, true);
    }, 4000);

    timersRef.current.cloneEnd = setTimeout(() => {
      spawnParticles("poof", simRef.current.clone.x, simRef.current.clone.y, 10, "#FFFFFF");
      simRef.current.clone.active = false;
      setCloneDuelActive(false);
      setCloneSpeech("");
      playComedySound("poof", liveRef.current.soundOn);
      say("Only one true companion remains.", 2400, true);
    }, 6000);
  }, [liveRef, say, setCloneDuelActive, setCloneSpeech, simRef, spawnParticles, timersRef]);

  const triggerFridayDeploy = useCallback(() => {
    if (timersRef.current.friday) clearTimeout(timersRef.current.friday);
    if (timersRef.current.shake) clearTimeout(timersRef.current.shake);
    const sim = simRef.current;
    setFridayDeployActive(true);
    setShakingStage(true);
    setMood("paranoid");
    sim.vy = -440;
    sim.vx = (Math.random() > 0.5 ? 1 : -1) * 420;
    sim.ballistic = true;
    sim.ballisticTimer = 1.1;
    playComedySound("zap", liveRef.current.soundOn, 1.3);
    spawnParticles("confetti", sim.x, sim.y, 16, "#EF4444");
    say(pickRandom(FRIDAY_DEPLOY_QUIPS), 3800, true);
    timersRef.current.shake = setTimeout(() => setShakingStage(false), 750);
    timersRef.current.friday = setTimeout(() => {
      setFridayDeployActive(false);
      setMood("playful");
      say("Rollback complete! Production survived another Friday.", 2600, true);
    }, 4400);
  }, [liveRef, say, setFridayDeployActive, setMood, setShakingStage, simRef, spawnParticles, timersRef]);

  const triggerFakeCrash = useCallback(() => {
    if (timersRef.current.crash) clearTimeout(timersRef.current.crash);
    setFakeCrashActive(true);
    playComedySound("sadTrombone", liveRef.current.soundOn, 1);
    say(pickRandom(BSOD_QUIPS), 2600, true);
    timersRef.current.crash = setTimeout(() => {
      setFakeCrashActive(false);
      playComedySound("chime", liveRef.current.soundOn, 1.2);
      say("System rebooted in 0.02s! Zero data lost.", 2400, true);
    }, 3600);
  }, [liveRef, say, setFakeCrashActive, timersRef]);

  const triggerDiscoRave = useCallback(() => {
    const sim = simRef.current;
    setMood("hype");
    sim.vy = -380;
    sim.vRot = 420;
    sim.soundRings.push({ x: sim.x, y: sim.y, r: 22, maxR: 280, age: 0, color: "#EC4899" });
    sim.soundRings.push({ x: sim.x, y: sim.y, r: 8, maxR: 220, age: 0, color: "#38BDF8" });
    playComedySound("chime", liveRef.current.soundOn, 1.35);
    spawnParticles("confetti", sim.x, sim.y - 30, 22);
    say(pickRandom(DISCO_QUIPS), 2800, true);
  }, [liveRef, say, setMood, simRef, spawnParticles]);

  const triggerDevJoke = useCallback(() => {
    const sim = simRef.current;
    const joke = pickRandom(DEV_JOKES);
    if (timersRef.current.speechClear) clearTimeout(timersRef.current.speechClear);
    if (timersRef.current.joke) clearTimeout(timersRef.current.joke);
    setMood("hype");
    setSpeechShown("");
    setDevJoke(joke);
    sim.vy = liveRef.current.gravityFlipped ? 260 : -280;
    sim.sx = 1.26;
    sim.sy = 0.76;
    sim.vAntBend = (Math.random() > 0.5 ? 1 : -1) * 320;
    playComedySound("giggle", liveRef.current.soundOn, 1.15);
    spawnParticles("confetti", sim.x, sim.y - 30, 14);
    spawnParticles("star", sim.x, sim.y - 54, 5, "#F59E0B");
    timersRef.current.joke = setTimeout(() => setDevJoke(null), 6800);
  }, [liveRef, setDevJoke, setMood, setSpeechShown, simRef, spawnParticles, timersRef]);

  const triggerStickyPrank = useCallback(() => {
    const sim = simRef.current;
    setStickyNote({
      id: Date.now(),
      x: clamp(sim.w * 0.5 + (Math.random() - 0.5) * 260, 120, Math.max(140, sim.w - 130)),
      y: clamp(135 + Math.random() * 110, 96, Math.max(120, sim.floorY - 120)),
      rot: (Math.random() - 0.5) * 14,
    });
    setMood("sneaky");
    playComedySound("pop", liveRef.current.soundOn, 1.1);
    say("Left a totally objective hiring note on your screen >:)", 3000, true);
  }, [liveRef, say, setMood, setStickyNote, simRef]);

  const triggerChaosPrank = useCallback(() => {
    const totalPranks = 8;
    let idx = Math.floor(Math.random() * totalPranks);
    if (idx === lastPrankIdxRef.current) {
      idx = (idx + 1 + Math.floor(Math.random() * (totalPranks - 1))) % totalPranks;
    }
    lastPrankIdxRef.current = idx;
    const sim = simRef.current;

    if (idx === 0) triggerStickyPrank();
    else if (idx === 1) triggerGravityFlip();
    else if (idx === 2) triggerCloneDuel();
    else if (idx === 3) {
      if (timersRef.current.snatchEnd) clearTimeout(timersRef.current.snatchEnd);
      setCursorSnatched(true);
      setMood("sneaky");
      const runDir = sim.x < sim.w * 0.5 ? 1 : -1;
      sim.vx = runDir * 560;
      sim.vy = -220;
      playComedySound("giggle", liveRef.current.soundOn, 1.2);
      say("MY MOUSE NOW >:D  (Click me to get it back!)", 3600, true);
      timersRef.current.snatchEnd = setTimeout(() => setCursorSnatched(false), 6500);
    } else if (idx === 4) triggerFridayDeploy();
    else if (idx === 5) triggerFakeCrash();
    else if (idx === 6) triggerDiscoRave();
    else triggerMiniClones();
  }, [
    liveRef,
    say,
    setCursorSnatched,
    setMood,
    simRef,
    timersRef,
    triggerCloneDuel,
    triggerDiscoRave,
    triggerFakeCrash,
    triggerFridayDeploy,
    triggerGravityFlip,
    triggerMiniClones,
    triggerStickyPrank,
  ]);

  const handleResetStage = useCallback(() => {
    const sim = simRef.current;
    sim.snacks = [];
    sim.portals = { cyan: null, orange: null, nextColor: "cyan" };
    sim.particles = [];
    sim.clone.active = false;
    sim.ball = null;
    sim.bugs = [];
    sim.lasers = [];
    sim.strokes = [];
    sim.activeStroke = null;
    sim.criticScanY = -1;
    sim.miniClones = [];
    sim.soundRings = [];
    sim.ballistic = false;
    sim.x = sim.homeX;
    sim.y = sim.homeY;
    sim.vx = 0;
    sim.vy = 0;
    sim.rot = 0;
    sim.vRot = 0;
    sim.flipDeg = 0;
    sim.flipping = false;

    setPlayMode("interact");
    setAccessory("none");
    setRallyCount(0);
    setBugsLeft(0);
    setArtVerdict(null);
    setAutoJam(false);
    setPortalTool(false);
    setTrampolineOn(false);
    setFeatherTool(false);
    setGravityFlipped(false);
    setSpicyActive(false);
    setSourActive(false);
    setPizzaActive(false);
    setCaffeinatedActive(false);
    setSpinTopActive(false);
    setDizzyActive(false);
    setTickledActive(false);
    setCursorSnatched(false);
    setCloneDuelActive(false);
    setCloneSpeech("");
    setFridayDeployActive(false);
    setFakeCrashActive(false);
    setDevJoke(null);
    setPolaroids([]);
    setStickyNote(null);
    setMood("playful");
    playComedySound("chime", liveRef.current.soundOn, 1.0);
    say("Stage freshly swept! Ready for new chaos.", 2400, true);
  }, [
    liveRef,
    say,
    setAccessory,
    setArtVerdict,
    setAutoJam,
    setBugsLeft,
    setCaffeinatedActive,
    setCloneDuelActive,
    setCloneSpeech,
    setCursorSnatched,
    setDizzyActive,
    setFakeCrashActive,
    setFeatherTool,
    setFridayDeployActive,
    setGravityFlipped,
    setMood,
    setDevJoke,
    setPizzaActive,
    setPlayMode,
    setPolaroids,
    setPortalTool,
    setRallyCount,
    setSourActive,
    setSpicyActive,
    setSpinTopActive,
    setStickyNote,
    setTickledActive,
    setTrampolineOn,
    simRef,
  ]);

  return {
    spawnParticles,
    say,
    handleSelectStyle,
    handleSelectAccessory,
    handleSelectMood,
    selectPlayMode,
    releaseBugs,
    triggerArtCritique,
    clearPaintStrokes,
    hitSynthPad,
    triggerMiniClones,
    triggerSneeze,
    throwSnack,
    consumeSnack,
    triggerBackflip,
    handleBodyPoke,
    triggerShakeStage,
    triggerPhotoBooth,
    triggerGravityFlip,
    triggerCloneDuel,
    triggerFridayDeploy,
    triggerFakeCrash,
    triggerDiscoRave,
    triggerDevJoke,
    triggerStickyPrank,
    triggerChaosPrank,
    handleResetStage,
  };
}
