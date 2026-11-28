"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Sparkles, X } from "lucide-react";
import { useCompanionEngine } from "../hooks/useCompanionEngine";
import { useCompanionReaction } from "../context/CompanionReactionContext";
import { CompanionRigSvg } from "./CompanionRigSvg";
import { CompanionStageOverlays } from "./CompanionStageOverlays";
import { CompanionQuickPopover } from "./CompanionPortfolioPreview";
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
    featherTool,
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
    widgetOpen,
    setWidgetOpen,
    portfolioHover,
    say,
    handleSelectStyle,
    handleSelectMood,
    throwSnack,
    triggerBackflip,
    handleBodyPoke,
    triggerPhotoBooth,
    triggerChaosPrank,
    handleChatSubmit,
    triggerHireHearts,
    handleHeadPet,
    handleFeatherWiggle,
    startRigDrag,
    startPolaroidDrag,
  } = useCompanionEngine({
    stageRef,
    fxCanvasRef,
    initialViewMode: "portfolio",
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

  return (
    <div
      ref={stageRef}
      className={`pointer-events-none fixed inset-0 z-40 overflow-hidden select-none ${
        shakingStage ? "mochi-quake" : ""
      }`}
    >
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
        initialTransform="translate3d(calc(100vw - 96px), calc(100vh - 118px), 0) translate(-50%, -50%) scale(0.56)"
      />

      <div className="pointer-events-auto fixed bottom-3 right-3 z-40 flex items-center gap-1.5">
        <Link
          href="/playground?tab=companion"
          className="px-2.5 py-1 rounded-full border border-theme-border bg-theme-surface/90 backdrop-blur-md text-[10px] font-mono text-theme-secondary hover:text-theme-accent hover:border-theme-accent transition-colors shadow-sm"
        >
          Studio ↗
        </Link>
        <button
          type="button"
          aria-label="Minimize MOCHI-04 companion"
          title="Minimize companion"
          onClick={onMinimize}
          className="w-6 h-6 rounded-full border border-theme-border bg-theme-surface/90 backdrop-blur-md flex items-center justify-center text-theme-muted hover:text-theme-primary cursor-pointer shadow-sm"
        >
          <X size={12} />
        </button>
      </div>

      {widgetOpen && (
        <CompanionQuickPopover
          ui={ui}
          styleMeta={styleMeta}
          charStyle={charStyle}
          onSelectStyle={handleSelectStyle}
          mood={mood}
          onSelectMood={handleSelectMood}
          onThrowSnack={throwSnack}
          onPhotoBooth={triggerPhotoBooth}
          onChaosPrank={triggerChaosPrank}
          onClose={() => setWidgetOpen(false)}
          chatText={chatText}
          setChatText={setChatText}
          setChatFocused={setChatFocused}
          onChatSubmit={handleChatSubmit}
          studioHref="/playground?tab=companion"
          positionClassName="fixed bottom-12 right-4 z-40"
        />
      )}
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
          <span>MOCHI-04</span>
          <Sparkles size={13} className="text-theme-accent" />
        </button>
      </div>
    );
  }

  return <CompanionCornerActive onMinimize={() => setMinimized(true)} />;
}
