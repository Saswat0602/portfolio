"use client";

import { useRef, useState } from "react";
import { useCompanionEngine } from "../hooks/useCompanionEngine";
import { CompanionStageHeader } from "./CompanionStageHeader";
import { CompanionRigSvg } from "./CompanionRigSvg";
import { CompanionStageOverlays } from "./CompanionStageOverlays";
import { CompanionPlayDock } from "./CompanionPlayDock";
import { CompanionPortfolioPreview, CompanionQuickPopover } from "./CompanionPortfolioPreview";
import "../styles/companion.css";

export interface CompanionStudioProps {
  defaultFullscreen?: boolean;
}

export function CompanionStudio({ defaultFullscreen = false }: CompanionStudioProps) {
  const [isFullscreen, setIsFullscreen] = useState(defaultFullscreen);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const fxCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const {
    isDark,
    toggleTheme,
    ui,
    viewMode,
    setViewMode,
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
  } = useCompanionEngine({ stageRef, fxCanvasRef, initialViewMode: "stage", initialStyle: "vinyl" });

  const containerClass = isFullscreen
    ? "fixed inset-0 z-50 w-screen h-screen"
    : "relative w-full h-[78vh] min-h-[620px] max-h-[820px] rounded-2xl border border-theme-border shadow-xl";

  const stageCursorClass =
    featherTool || playMode === "laser" || playMode === "catch"
      ? "cursor-none"
      : portalTool || playMode === "paint"
        ? "cursor-crosshair"
        : "";

  return (
    <div
      className={`${containerClass} overflow-hidden flex flex-col antialiased ${
        shakingStage ? "mochi-quake" : ""
      }`}
      style={{
        backgroundColor: ui.bg,
        color: ui.ink,
        fontFamily: 'var(--font-sans), "Plus Jakarta Sans", sans-serif',
        transition: "background-color 240ms ease, color 200ms ease",
      }}
    >
      <CompanionStageHeader
        ui={ui}
        isDark={isDark}
        onToggleTheme={toggleTheme}
        charStyle={charStyle}
        styleMeta={styleMeta}
        onSelectStyle={handleSelectStyle}
        viewMode={viewMode}
        setViewMode={setViewMode}
        setPortalTool={setPortalTool}
        setFeatherTool={setFeatherTool}
        setWidgetOpen={setWidgetOpen}
        soundOn={soundOn}
        setSoundOn={setSoundOn}
        onResetStage={handleResetStage}
        isFullscreen={isFullscreen}
        onToggleFullscreen={() => setIsFullscreen((v) => !v)}
      />

      <main
        ref={stageRef}
        onPointerDown={handleStageDown}
        className={`relative flex-1 w-full overflow-hidden select-none ${stageCursorClass}`}
        style={{
          backgroundImage: isDark
            ? "radial-gradient(rgba(56, 189, 248, 0.12) 1px, transparent 1px)"
            : "radial-gradient(rgba(22, 22, 24, 0.08) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      >
        {viewMode === "stage" && (
          <div
            className="pointer-events-none absolute top-4 left-5 z-10 flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.08em]"
            style={{ color: ui.muted }}
          >
            <span className="font-semibold" style={{ color: ui.ink }}>
              {styleMeta.tag}
            </span>
            <span>·</span>
            <span>MOOD: {activeMoodMeta.label.toUpperCase()}</span>
            {playMode !== "interact" && (
              <span style={{ color: styleMeta.accent }}>· MODE: {playMode.toUpperCase()}</span>
            )}
            {portalTool && <span style={{ color: "#06B6D4" }}>· CLICK STAGE TO PLACE PORTALS</span>}
            {featherTool && <span style={{ color: "#EC4899" }}>· WIGGLE FEATHER OVER CHARACTER</span>}
            {gravityFlipped && <span style={{ color: "#F59E0B" }}>· CEILING GRAVITY</span>}
          </div>
        )}

        {viewMode === "portfolio" && (
          <CompanionPortfolioPreview
            ui={ui}
            styleMeta={styleMeta}
            setPortfolioHover={setPortfolioHover}
            triggerHireHearts={triggerHireHearts}
            say={say}
            triggerBackflip={triggerBackflip}
          />
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
        />

        {viewMode === "portfolio" && widgetOpen && (
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
          />
        )}

        {viewMode === "stage" && (
          <CompanionPlayDock
            ui={ui}
            styleMeta={styleMeta}
            charStyle={charStyle}
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
            dockTab={dockTab}
            setDockTab={setDockTab}
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
            say={say}
          />
        )}
      </main>
    </div>
  );
}
