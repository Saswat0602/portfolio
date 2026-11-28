"use client";

import { useEffect, useRef } from "react";
import { useCompanionEngine } from "../hooks/useCompanionEngine";
import { useCompanionReaction } from "../context/CompanionReactionContext";
import { CompanionRigSvg } from "./CompanionRigSvg";
import { CompanionStageOverlays } from "./CompanionStageOverlays";
import { CompanionHomeDock } from "./CompanionHomeDock";
import "../styles/companion.css";

export function CompanionCornerWidget() {
  const { hoverTarget, lastCue } = useCompanionReaction();
  const stageRef = useRef<HTMLDivElement | null>(null);
  const fxCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const {
    isDark,
    ui,
    charStyle,
    auraFinish,
    setAuraFinish,
    accessory,
    playMode,
    selectPlayMode,
    releaseBugs,
    triggerArtCritique,
    clearPaintStrokes,
    hitSynthPad,
    triggerMiniClones,
    toggleVoiceBeat,
    fireClapPulse,
    triggerSneeze,
    rallyCount,
    bugsLeft,
    artVerdict,
    setArtVerdict,
    autoJam,
    setAutoJam,
    activePad,
    micMode,
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
    handleSelectAccessory,
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

  const stagePointerActive =
    portalTool || playMode === "paint" || playMode === "magnet";

  const stageCursorClass =
    featherTool || playMode === "laser" || playMode === "catch"
      ? "cursor-none"
      : portalTool || playMode === "paint"
        ? "cursor-crosshair"
        : "";

  return (
    <div
      ref={stageRef}
      onPointerDown={handleStageDown}
      className={`${
        stagePointerActive ? "pointer-events-auto" : "pointer-events-none"
      } ${stageCursorClass} fixed inset-0 z-40 overflow-hidden select-none ${
        shakingStage ? "mochi-quake" : ""
      }`}
    >
      {(portalTool || playMode !== "interact") && (
        <div
          className="pointer-events-auto fixed top-20 right-4 z-40 rounded-full px-3 py-1 font-mono text-[10.5px] shadow-md flex items-center gap-2"
          style={{
            backgroundColor: ui.glass,
            color: portalTool ? "#06B6D4" : styleMeta.accent,
            border: `1px solid ${portalTool ? "#06B6D4" : ui.borderStrong}`,
            backdropFilter: "blur(12px)",
          }}
        >
          <span>
            {portalTool
              ? "🌀 Click two spots to place portals"
              : `Mode: ${playMode.toUpperCase()} (Esc to exit)`}
          </span>
          <button
            type="button"
            onClick={() => {
              setPortalTool(false);
              selectPlayMode("interact");
            }}
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
        artVerdict={artVerdict}
        onDismissArtVerdict={() => setArtVerdict(null)}
      />

      <CompanionRigSvg
        isDark={isDark}
        styleMeta={styleMeta}
        auraFinish={auraFinish}
        accessory={accessory}
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
        onPointerDown={startRigDrag}
        onHeadPet={handleHeadPet}
        onPokeKey={handleBodyPoke}
        initialTransform="translate3d(80vw, 56vh, 0) translate(-50%, -50%) scale(0.76)"
      />

      <CompanionHomeDock
        ui={ui}
        charStyle={charStyle}
        styleMeta={styleMeta}
        onSelectStyle={handleSelectStyle}
        auraFinish={auraFinish}
        onSelectAuraFinish={setAuraFinish}
        accessory={accessory}
        onSelectAccessory={handleSelectAccessory}
        playMode={playMode}
        onSelectPlayMode={selectPlayMode}
        rallyCount={rallyCount}
        bugsLeft={bugsLeft}
        artVerdict={artVerdict}
        autoJam={autoJam}
        onToggleAutoJam={() => setAutoJam((v) => !v)}
        activePad={activePad}
        micMode={micMode}
        onCritiqueArt={triggerArtCritique}
        onClearPaint={clearPaintStrokes}
        onReleaseBugs={releaseBugs}
        onHitPad={hitSynthPad}
        onMiniClones={triggerMiniClones}
        onToggleVoiceBeat={toggleVoiceBeat}
        onFireClapPulse={fireClapPulse}
        onSneeze={triggerSneeze}
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
        say={say}
      />
    </div>
  );
}
