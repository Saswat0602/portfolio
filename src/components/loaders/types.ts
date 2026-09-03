export type LoaderVariant = "curtain" | "spotlight" | "custom3";

export interface LoaderProps {
  onComplete: () => void;
  name?: string;
  title?: string;
  skills?: string[];
  durationMs?: number;
}
