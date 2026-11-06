"use client";

import React, { useRef, useCallback } from "react";

export interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  as?: "div" | "article" | "section";
}

export function SpotlightCard({
  children,
  className = "",
  spotlightColor,
  as: Component = "div",
  ...props
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null);

  const updateCoordinates = useCallback((clientX: number, clientY: number) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    divRef.current.style.setProperty("--mouse-x", `${x}px`);
    divRef.current.style.setProperty("--mouse-y", `${y}px`);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      updateCoordinates(e.clientX, e.clientY);
    },
    [updateCoordinates]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (e.touches.length > 0) {
        updateCoordinates(e.touches[0].clientX, e.touches[0].clientY);
      }
    },
    [updateCoordinates]
  );

  const Tag = Component as React.ElementType;

  return (
    <Tag
      ref={divRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      className={`spotlight-card ${className}`}
      style={
        spotlightColor
          ? ({ ...props.style, "--color-accent-glow": spotlightColor } as React.CSSProperties)
          : props.style
      }
      {...props}
    >
      {children}
    </Tag>
  );
}
