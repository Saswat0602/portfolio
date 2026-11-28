import { useCallback, useRef, type Dispatch, type FormEvent, type MutableRefObject, type SetStateAction } from "react";
import {
  CHARACTER_STYLES,
  DEV_JOKES,
  DEV_ROASTS,
  MOODS,
  POLAROID_CAPTIONS,
  SNACKS,
  type CharacterStyleId,
  type MoodId,
  type SnackId,
} from "@/lib/data";
import type {
  CompanionTimers,
  LiveSnapshot,
  ParticleKind,
  PolaroidCard,
  SimState,
  SnackEntity,
  StickyNoteState,
} from "../types";
import { clamp } from "../utils/physics";
import { playComedySound } from "../utils/audio";
import { resolveChatCommand } from "../utils/chatCommands";

export interface CompanionActionSetters {
  setCharStyle: Dispatch<SetStateAction<CharacterStyleId>>;
  setMood: Dispatch<SetStateAction<MoodId>>;
  setPortalTool: Dispatch<SetStateAction<boolean>>;
  setTrampolineOn: Dispatch<SetStateAction<boolean>>;
  setFeatherTool: Dispatch<SetStateAction<boolean>>;
  setGravityFlipped: Dispatch<SetStateAction<boolean>>;
  setShakingStage: Dispatch<SetStateAction<boolean>>;
  setCameraFlash: Dispatch<SetStateAction<boolean>>;
  setPhotoPosing: Dispatch<SetStateAction<boolean>>;
  setSpicyActive: Dispatch<SetStateAction<boolean>>;
  setSourActive: Dispatch<SetStateAction<boolean>>;
  setCaffeinatedActive: Dispatch<SetStateAction<boolean>>;
  setSpinTopActive: Dispatch<SetStateAction<boolean>>;
  setDizzyActive: Dispatch<SetStateAction<boolean>>;
  setTickledActive: Dispatch<SetStateAction<boolean>>;
  setCursorSnatched: Dispatch<SetStateAction<boolean>>;
  setCloneDuelActive: Dispatch<SetStateAction<boolean>>;
  setCloneSpeech: Dispatch<SetStateAction<string>>;
  setPolaroids: Dispatch<SetStateAction<PolaroidCard[]>>;
  setStickyNote: Dispatch<SetStateAction<StickyNoteState | null>>;
  setSpeechShown: Dispatch<SetStateAction<string>>;
  chatText: string;
  setChatText: Dispatch<SetStateAction<string>>;
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
  } = setters;

  const prankCounterRef = useRef(0);

  const spawnParticles = useCallback(
    (kind: ParticleKind, x: number, y: number, count = 8, customColor: string | null = null) => {
      const arr = simRef.current.particles;
      const colors = ["#FF6B4A", "#2563EB", "#F5C400", "#10B981", "#EC4899", "#FFFFFF"];
      for (let i = 0; i < count; i++) {
        const ang = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.65;
        const spd = kind === "poof" ? 70 + Math.random() * 90 : kind === "dust" ? 35 + Math.random() * 55 : 95 + Math.random() * 170;
        const vy =
          kind === "heart" || kind === "burp" || kind === "zzz"
            ? -55 - Math.random() * 55
            : Math.sin(ang) * spd - (kind === "poof" ? 12 : 45);
        arr.push({
          kind,
          x: x + (Math.random() - 0.5) * 18,
          y: y + (Math.random() - 0.5) * 14,
          vx: Math.cos(ang) * spd,
          vy,
          size: kind === "poof" ? 18 + Math.random() * 16 : kind === "confetti" ? 7 : 5,
          rot: Math.random() * Math.PI * 2,
          vRot: (Math.random() - 0.5) * 9,
          age: 0,
          life: kind === "poof" ? 0.55 : kind === "confetti" ? 1.25 : 0.85,
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
      if (!silent) playComedySound("pop", liveRef.current.soundOn, liveRef.current.pitch);

      let i = 0;
      setSpeechShown("");
      timersRef.current.speechType = setInterval(() => {
        i += 2;
        if (i >= text.length) {
          setSpeechShown(text);
          if (timersRef.current.speechType) clearInterval(timersRef.current.speechType);
          timersRef.current.speechClear = setTimeout(() => setSpeechShown(""), holdMs);
        } else {
          setSpeechShown(text.slice(0, i));
        }
      }, 16);
    },
    [liveRef, setSpeechShown, timersRef]
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

  const handleSelectMood = useCallback(
    (nextMoodId: MoodId) => {
      setMood(nextMoodId);
      setCaffeinatedActive(nextMoodId === "caffeinated");
      const m = MOODS.find((item) => item.id === nextMoodId) || MOODS[0];
      const sim = simRef.current;
      sim.sx = 1.18;
      sim.sy = 0.84;

      if (nextMoodId === "dramatic") {
        playComedySound("sadTrombone", liveRef.current.soundOn, 1);
      } else if (nextMoodId === "hype") {
        sim.vy = -310;
        playComedySound("chime", liveRef.current.soundOn, 1.25);
        spawnParticles("confetti", sim.x, sim.y - 30, 18);
      } else if (nextMoodId === "lovestruck") {
        playComedySound("chime", liveRef.current.soundOn, 1.15);
        spawnParticles("heart", sim.x, sim.y - 54, 6, "#FB7185");
      } else if (nextMoodId === "caffeinated") {
        playComedySound("slideUp", liveRef.current.soundOn, 1.35);
      } else {
        playComedySound("pop", liveRef.current.soundOn, m.pitch);
      }

      const line = m.quips[Math.floor(Math.random() * m.quips.length)];
      say(line, 3300, true);
    },
    [liveRef, say, setCaffeinatedActive, setMood, simRef, spawnParticles]
  );

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
        sim.sx = 1.18;
        sim.sy = 0.86;
        playComedySound("chime", liveRef.current.soundOn, 1.1);
        spawnParticles("heart", sim.x, sim.y - 54, 6, "#FB7185");
        spawnParticles("burp", sim.x + 28, sim.y - 24, 3, "#FFFFFF");
        say("Cold pizza at 2 AM hits different... *burp* ...excuse me.", 3100, true);
      } else {
        sim.vy = -240;
        sim.sx = 1.22;
        sim.sy = 0.82;
        playComedySound("chime", liveRef.current.soundOn, 1.2);
        spawnParticles("burp", sim.x + 24, sim.y - 28, 4, "#34D399");
        spawnParticles("confetti", sim.x, sim.y - 20, 10);
        say("*BURP* — 0 warnings, ship it.", 2800, true);
      }
    },
    [liveRef, say, setCaffeinatedActive, setMood, setSourActive, setSpicyActive, simRef, spawnParticles, timersRef]
  );

  const triggerBackflip = useCallback(() => {
    const sim = simRef.current;
    sim.flipping = true;
    sim.flipDeg = 0;
    sim.vy = liveRef.current.gravityFlipped ? 520 : -520;
    sim.sx = 0.78;
    sim.sy = 1.28;
    playComedySound("slideUp", liveRef.current.soundOn, 1.15);
    spawnParticles("confetti", sim.x, sim.y + 30, 12);
    say("360° BACKFLIP!! Judges gave it a 10.0!", 2600, true);
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
      say("GAH!! I WASN’T SLEEPING, I WAS COMPILING!!", 2900, true);
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
      say("Hey! Watch the matte clearcoat!", 2200, true);
    } else if (n === 2) {
      setMood("grumpy");
      playComedySound("boing", liveRef.current.soundOn, 0.95);
      say("Excuse me? Two pokes in a row?", 2300, true);
    } else if (n === 3) {
      setMood("paranoid");
      playComedySound("squeak", liveRef.current.soundOn, 1.0);
      say("One more poke and I enter Beyblade panic mode!!", 2500, true);
    } else {
      pokeRef.current.count = 0;
      if (timersRef.current.spinTop) clearTimeout(timersRef.current.spinTop);
      setSpinTopActive(true);
      sim.vx = (Math.random() > 0.5 ? 1 : -1) * 460;
      sim.vy = -260;
      playComedySound("slideUp", liveRef.current.soundOn, 1.5);
      spawnParticles("confetti", sim.x, sim.y, 14);
      say("PANIC SPINNING TOP ENGAGED!! WOOOOOO!!", 2600, true);
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
    say("Cheese!! Hold my best angle...", 900);

    timersRef.current.photo1 = setTimeout(() => {
      setCameraFlash(true);
      playComedySound("shutter", liveRef.current.soundOn);
      const id = ++polaroidSeqRef.current;
      const sim = simRef.current;
      const caption = POLAROID_CAPTIONS[id % POLAROID_CAPTIONS.length];
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
        say("Fresh Polaroid printed! Drag it anywhere on stage.", 2600, true);
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
    sim.clone = {
      active: true,
      x: clamp(sim.x + (sim.x > sim.w * 0.5 ? -180 : 180), 80, Math.max(100, sim.w - 80)),
      y: 120,
      vx: (sim.x > sim.w * 0.5 ? 1 : -1) * 140,
      vy: -120,
      rot: 0,
    };
    setCloneDuelActive(true);
    playComedySound("poof", liveRef.current.soundOn);
    spawnParticles("poof", sim.clone.x, sim.clone.y, 8, "#FFFFFF");

    setCloneSpeech("I'm the real one!");
    say("Excuse me?! You are a shallow copy!!", 2100, true);

    timersRef.current.clone1 = setTimeout(() => {
      setCloneSpeech("Object.assign() disagrees!");
      say("My RK4 springs are literally tighter than yours!", 2000, true);
    }, 2000);

    timersRef.current.clone2 = setTimeout(() => {
      setCloneSpeech("At least I pass TypeScript strict mode!");
      say("THAT IS IT! Garbage collecting you NOW!", 1900, true);
    }, 4000);

    timersRef.current.cloneEnd = setTimeout(() => {
      spawnParticles("poof", simRef.current.clone.x, simRef.current.clone.y, 10, "#FFFFFF");
      simRef.current.clone.active = false;
      setCloneDuelActive(false);
      setCloneSpeech("");
      playComedySound("poof", liveRef.current.soundOn);
      say("Only one true MOCHI-04 remains.", 2400, true);
    }, 6000);
  }, [liveRef, say, setCloneDuelActive, setCloneSpeech, simRef, spawnParticles, timersRef]);

  const triggerChaosPrank = useCallback(() => {
    const idx = prankCounterRef.current % 4;
    prankCounterRef.current += 1;
    const sim = simRef.current;

    if (idx === 0) {
      setStickyNote({
        id: Date.now(),
        x: clamp(sim.w * 0.5 + (Math.random() - 0.5) * 260, 120, Math.max(140, sim.w - 130)),
        y: clamp(135 + Math.random() * 110, 96, Math.max(120, sim.floorY - 120)),
        rot: (Math.random() - 0.5) * 14,
      });
      setMood("sneaky");
      playComedySound("pop", liveRef.current.soundOn, 1.1);
      say("Left a totally objective hiring note on your screen >:)", 3000, true);
    } else if (idx === 1) {
      triggerGravityFlip();
    } else if (idx === 2) {
      triggerCloneDuel();
    } else {
      if (timersRef.current.snatchEnd) clearTimeout(timersRef.current.snatchEnd);
      setCursorSnatched(true);
      setMood("sneaky");
      const runDir = sim.x < sim.w * 0.5 ? 1 : -1;
      sim.vx = runDir * 560;
      sim.vy = -220;
      playComedySound("giggle", liveRef.current.soundOn, 1.2);
      say("MY MOUSE NOW >:D  (Click me to get it back!)", 3600, true);
      timersRef.current.snatchEnd = setTimeout(() => setCursorSnatched(false), 6500);
    }
  }, [liveRef, say, setCursorSnatched, setMood, setStickyNote, simRef, timersRef, triggerCloneDuel, triggerGravityFlip]);

  const handleResetStage = useCallback(() => {
    const sim = simRef.current;
    sim.snacks = [];
    sim.portals = { cyan: null, orange: null, nextColor: "cyan" };
    sim.particles = [];
    sim.clone.active = false;
    sim.x = sim.homeX;
    sim.y = sim.homeY;
    sim.vx = 0;
    sim.vy = 0;
    sim.rot = 0;
    sim.vRot = 0;
    sim.flipDeg = 0;
    sim.flipping = false;

    setPortalTool(false);
    setTrampolineOn(false);
    setFeatherTool(false);
    setGravityFlipped(false);
    setSpicyActive(false);
    setSourActive(false);
    setCaffeinatedActive(false);
    setSpinTopActive(false);
    setDizzyActive(false);
    setTickledActive(false);
    setCursorSnatched(false);
    setCloneDuelActive(false);
    setCloneSpeech("");
    setPolaroids([]);
    setStickyNote(null);
    setMood("playful");
    playComedySound("chime", liveRef.current.soundOn, 1.0);
    say("Stage freshly swept! Ready for new chaos.", 2400, true);
  }, [
    liveRef,
    say,
    setCaffeinatedActive,
    setCloneDuelActive,
    setCloneSpeech,
    setCursorSnatched,
    setDizzyActive,
    setFeatherTool,
    setGravityFlipped,
    setMood,
    setPolaroids,
    setPortalTool,
    setSourActive,
    setSpicyActive,
    setSpinTopActive,
    setStickyNote,
    setTickledActive,
    setTrampolineOn,
    simRef,
  ]);

  const handleChatSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const raw = chatText.trim();
      if (!raw) return;
      setChatText("");
      const intent = resolveChatCommand(raw);

      switch (intent.type) {
        case "roast":
          setMood("smug");
          say(DEV_ROASTS[Math.floor(Math.random() * DEV_ROASTS.length)], 3800);
          break;
        case "joke":
          setMood("hype");
          say(DEV_JOKES[Math.floor(Math.random() * DEV_JOKES.length)], 3800);
          break;
        case "backflip":
          triggerBackflip();
          break;
        case "snack":
          throwSnack(intent.snack);
          break;
        case "portal":
          setPortalTool(true);
          setFeatherTool(false);
          say("Portal Gun armed! Click two spots on stage!", 2800);
          break;
        case "trampoline":
          setTrampolineOn(true);
          say("Trampoline deployed! Drop me on it!", 2600);
          break;
        case "photo":
          triggerPhotoBooth();
          break;
        case "gravity":
          triggerGravityFlip();
          break;
        case "clone":
          triggerCloneDuel();
          break;
        case "prank":
          triggerChaosPrank();
          break;
        case "greeting":
          setMood("playful");
          say("Hey there!! Throw me a pepper or click Chaos Prank!", 2800);
          break;
        case "fallback":
          say(`Heard "${intent.raw}" — filing it right next to my snacks.`, 2800);
          break;
      }
    },
    [
      chatText,
      say,
      setChatText,
      setFeatherTool,
      setMood,
      setPortalTool,
      setTrampolineOn,
      throwSnack,
      triggerBackflip,
      triggerChaosPrank,
      triggerCloneDuel,
      triggerGravityFlip,
      triggerPhotoBooth,
    ]
  );

  return {
    spawnParticles,
    say,
    handleSelectStyle,
    handleSelectMood,
    throwSnack,
    consumeSnack,
    triggerBackflip,
    handleBodyPoke,
    triggerShakeStage,
    triggerPhotoBooth,
    triggerGravityFlip,
    triggerCloneDuel,
    triggerChaosPrank,
    handleResetStage,
    handleChatSubmit,
  };
}
