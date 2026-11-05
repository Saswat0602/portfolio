"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import type { LoaderProps } from "./types";

export function SpotlightLoader({
  onComplete,
  name = "Saswat Ranjan",
  title = "Full Stack & AI Developer",
}: LoaderProps) {
  const [percent, setPercent] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [clicked, setClicked] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const triggerExit = useCallback(() => {
    setClicked((prev) => {
      if (prev) return prev;
      setTimeout(() => {
        onComplete();
      }, 900);
      return true;
    });
  }, [onComplete]);

  // Smooth realistic incrementation matching original portfolio
  useEffect(() => {
    let p = 0;
    const interval = setInterval(() => {
      if (p <= 55) {
        const rand = Math.round(Math.random() * 6) + 2;
        p = Math.min(p + rand, 100);
        setPercent(p);
      } else if (p < 100) {
        const rand = Math.round(Math.random() * 4) + 1;
        p = Math.min(p + rand, 100);
        setPercent(p);
      } else {
        clearInterval(interval);
      }
    }, 45);

    return () => clearInterval(interval);
  }, []);

  // Sequence completion: 100% -> reveal welcome -> expand portal -> onComplete
  useEffect(() => {
    if (percent >= 100) {
      const t1 = setTimeout(() => {
        setLoaded(true);
        const t2 = setTimeout(() => {
          triggerExit();
        }, 900);
        return () => clearTimeout(t2);
      }, 400);
      return () => clearTimeout(t1);
    }
  }, [percent, triggerExit]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!wrapRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    wrapRef.current.style.setProperty("--mouse-x", `${x}px`);
    wrapRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  const marqueeItems = [
    title.toUpperCase(),
    "FULL STACK & AI DEVELOPER",
    "REACT & REACT NATIVE",
    "AWS BEDROCK & RAG PIPELINES",
    "SOFTWARE ENGINEER • HYSCALER",
    "SCALABLE WEB & MOBILE APPS",
  ];

  return (
    <>
      <div className="loading-header">
        <span className="loader-title">
          {name.replace(/\s+/g, "")}
        </span>

        {/* Obstacle jumping game from reference */}
        <div className={`loaderGame ${clicked ? "loader-out" : ""}`}>
          <div className="loaderGame-container">
            <div className="loaderGame-in">
              {[...Array(27)].map((_, index) => (
                <div className="loaderGame-line" key={index} />
              ))}
            </div>
            <div className="loaderGame-ball" />
          </div>
        </div>
      </div>

      <div className="loading-screen">
        {/* Background Scrolling Marquee */}
        <div className="loading-marquee">
          <div className="loading-marquee-inner">
            {[...marqueeItems, ...marqueeItems].map((item, idx) => (
              <span key={idx}>&nbsp; {item} &nbsp;</span>
            ))}
          </div>
        </div>

        {/* Center Interactive Expanding Capsule */}
        <div
          ref={wrapRef}
          className={`loading-wrap ${clicked ? "loading-clicked" : ""}`}
          onMouseMove={handleMouseMove}
          onClick={triggerExit}
        >
          <div className="loading-hover" />
          <div className={`loading-button ${loaded ? "loading-complete" : ""}`}>
            <div className="loading-container">
              <div className="loading-content">
                <div className="loading-content-in">
                  Loading <span>{percent}%</span>
                </div>
              </div>
              <div className="loading-box" />
            </div>

            <div className="loading-content2">
              <span>Welcome</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
