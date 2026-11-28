"use client";

import { useEffect, useRef, useState } from "react";
import { Sparkles } from "lucide-react";
import { useCompanionEngine } from "../hooks/useCompanionEngine";
import { useCompanionReaction } from "../context/CompanionReactionContext";
import { CompanionRigSvg } from "./CompanionRigSvg";
import { CompanionStageOverlays } from "./CompanionStageOverlays";
import { CompanionHomeDock } from "./CompanionHomeDock";
import "../styles/companion.css";

function CompanionCornerActive({ onMinimize }: { onMinimize: () => void }) {
  const { hoverTarget, lastCue } = useCompanionReaction();
  const stageRef = useRef<HTMLDivElement | null>(null);
  const fxCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const {
    isDark,
    ui,
    charStyle,
    styleMeta,
    mood,
    activeMoodMeta,
    soundOn,
    setSoundOn,
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
    portfolioHover,
    say,
    handleSelectStyle,
    handleSelectMood,
    throwSnack,
    triggerBackflip,
    handleBodyPoke,
    triggerShakeStage,
    triggerPhotoBooth,
    triggerGravityFlip,
    triggerCloneDuel,
    triggerChaosPrank,
    handleResetStage,
    handleChatSubmit,
    triggerHireHearts,
    handleHeadPet,
    handleFeatherWiggle,
    handleStageDown,
    startRigDrag,
    startPolaroidDrag,
  } = useCompanionEngine({
    stageRef,
    fxCanvasRef,
    initialViewMode: "home",
    initialStyle: "vinyl",
    externalHover: hoverTarget,
  });

  useEffect(() => {
    if (!lastCue) return;
    if (lastCue.action === "backflip") {
      triggerBackflip();
    } else if (lastCue.hoverTarget === "hire") {
      triggerHireHearts();
    }
    if (lastCue.quip) {
      say(lastCue.quip, 2800, true);
    }
  }, [lastCue, say, triggerBackflip, triggerHireHearts]);

  useEffect(() => {
    if (!portalTool && !featherTool) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setPortalTool(false);
        setFeatherTool(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [featherTool, portalTool, setFeatherTool, setPortalTool]);

  return (
    <div
      ref={stageRef}
      onPointerDown={handleStageDown}
      className={`${
        portalTool ? "pointer-events-auto cursor-crosshair" : "pointer-events-none"
      } fixed inset-0 z-40 overflow-hidden select-none ${
        shakingStage ? "mochi-quake" : ""
      }`}
    >
      {portalTool && (
        <div
          className="pointer-events-auto fixed top-20 right-4 z-40 rounded-full px-3 py-1 font-mono text-[10.5px] shadow-md flex items-center gap-2"
          style={{
            backgroundColor: ui.surface,
            color: "#06B6D4",
            border: "1px solid #06B6D4",
          }}
        >
          <span>🌀 Click anywhere on screen to place portals</span>
          <button
            type="button"
            onClick={() => setPortalTool(false)}
            className="font-bold cursor-pointer hover:opacity-80"
          >
            Done
          </button>
        </div>
      )}

      <canvas
        ref={fxCanvasRef}
        className="pointer-events-none absolute inset-0 z-10 w-full h-full block"
      />

      <CompanionStageOverlays
        isDark={isDark}
        ui={ui}
        stickyNote={stickyNote}
        setStickyNote={setStickyNote}
        polaroids={polaroids}
        setPolaroids={setPolaroids}
        startPolaroidDrag={startPolaroidDrag}
        cloneDuelActive={cloneDuelActive}
        cloneSpeech={cloneSpeech}
        speechShown={speechShown}
        featherTool={featherTool}
        cameraFlash={cameraFlash}
        soundOn={soundOn}
      />

      <CompanionRigSvg
        isDark={isDark}
        styleMeta={styleMeta}
        activeMoodMeta={activeMoodMeta}
        spicyActive={spicyActive}
        sourActive={sourActive}
        dizzyActive={dizzyActive}
        tickledActive={tickledActive}
        pettingActive={pettingActive}
        secretMode={secretMode}
        photoPosing={photoPosing}
        isHeld={isHeld}
        cursorSnatched={cursorSnatched}
        portfolioHover={portfolioHover}
        onDoubleClick={triggerBackflip}
        onPointerMove={handleFeatherWiggle}
        onPointerDown={startRigDrag}
        onHeadPet={handleHeadPet}
        onPokeKey={handleBodyPoke}
        initialTransform="translate3d(83vw, 44vh, 0) translate(-50%, -50%) scale(0.74)"
      />

      <CompanionHomeDock
        ui={ui}
        charStyle={charStyle}
        styleMeta={styleMeta}
        onSelectStyle={handleSelectStyle}
        mood={mood}
        onSelectMood={handleSelectMood}
        onThrowSnack={throwSnack}
        portalTool={portalTool}
        setPortalTool={setPortalTool}
        trampolineOn={trampolineOn}
        setTrampolineOn={setTrampolineOn}
        featherTool={featherTool}
        setFeatherTool={setFeatherTool}
        gravityFlipped={gravityFlipped}
        cloneDuelActive={cloneDuelActive}
        onShakeStage={triggerShakeStage}
        onPhotoBooth={triggerPhotoBooth}
        onChaosPrank={triggerChaosPrank}
        onGravityFlip={triggerGravityFlip}
        onCloneDuel={triggerCloneDuel}
        onBackflip={triggerBackflip}
        secretMode={secretMode}
        setSecretMode={setSecretMode}
        peeking={peeking}
        setPeeking={setPeeking}
        chatText={chatText}
        setChatText={setChatText}
        setChatFocused={setChatFocused}
        onChatSubmit={handleChatSubmit}
        soundOn={soundOn}
        setSoundOn={setSoundOn}
        onResetStage={handleResetStage}
        onMinimize={onMinimize}
        say={say}
      />
    </div>
  );
}

export function CompanionCornerWidget() {
  const [minimized, setMinimized] = useState(false);

  if (minimized) {
    return (
      <div className="fixed bottom-4 right-4 z-40">
        <button
          type="button"
          onClick={() => setMinimized(false)}
          className="mochi-pop inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-theme-border bg-theme-surface/90 backdrop-blur-xl text-xs font-mono text-theme-primary shadow-lg hover:border-theme-accent transition-colors cursor-pointer"
        >
          <span className="w-2 h-2 rounded-full bg-[#FF6B4A] animate-pulse" />
          <span>MOCHI-04 · Play</span>
          <Sparkles size={13} className="text-theme-accent" />
        </button>
      </div>
    );
  }

  return <CompanionCornerActive onMinimize={() => setMinimized(true)} />;
}
