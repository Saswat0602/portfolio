"use client";

import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";
import type { PortfolioHoverTarget } from "../types";

export interface CompanionCueEvent {
  id: number;
  hoverTarget?: PortfolioHoverTarget;
  quip?: string;
  action?: "backflip" | "hearts";
}

interface CompanionReactionContextValue {
  hoverTarget: PortfolioHoverTarget;
  lastCue: CompanionCueEvent | null;
  notifyHover: (target: PortfolioHoverTarget, quip?: string) => void;
  notifyAction: (action: "backflip" | "hearts", quip?: string) => void;
}

const CompanionReactionContext = createContext<CompanionReactionContextValue | null>(null);

export function CompanionReactionProvider({ children }: { children: ReactNode }) {
  const [hoverTarget, setHoverTarget] = useState<PortfolioHoverTarget>(null);
  const [lastCue, setLastCue] = useState<CompanionCueEvent | null>(null);
  const seqRef = useRef(0);

  const notifyHover = useCallback((target: PortfolioHoverTarget, quip?: string) => {
    setHoverTarget(target);
    if (target && quip) {
      setLastCue({ id: ++seqRef.current, hoverTarget: target, quip });
    }
  }, []);

  const notifyAction = useCallback((action: "backflip" | "hearts", quip?: string) => {
    setLastCue({ id: ++seqRef.current, action, quip });
  }, []);

  return (
    <CompanionReactionContext.Provider value={{ hoverTarget, lastCue, notifyHover, notifyAction }}>
      {children}
    </CompanionReactionContext.Provider>
  );
}

export function useCompanionReaction(): CompanionReactionContextValue {
  const ctx = useContext(CompanionReactionContext);
  if (!ctx) {
    return {
      hoverTarget: null,
      lastCue: null,
      notifyHover: () => {},
      notifyAction: () => {},
    };
  }
  return ctx;
}
