import type { SnackId } from "@/lib/data";

export type ChatActionIntent =
  | { type: "roast" }
  | { type: "joke" }
  | { type: "backflip" }
  | { type: "snack"; snack: SnackId }
  | { type: "portal" }
  | { type: "trampoline" }
  | { type: "photo" }
  | { type: "gravity" }
  | { type: "clone" }
  | { type: "prank" }
  | { type: "greeting" }
  | { type: "fallback"; raw: string };

export function resolveChatCommand(rawInput: string): ChatActionIntent {
  const low = rawInput.toLowerCase();

  if (/roast/.test(low)) return { type: "roast" };
  if (/joke|funny/.test(low)) return { type: "joke" };
  if (/flip|jump|backflip/.test(low)) return { type: "backflip" };
  if (/pepper|fire|spicy/.test(low)) return { type: "snack", snack: "pepper" };
  if (/lemon|sour/.test(low)) return { type: "snack", snack: "lemon" };
  if (/coffee|espresso/.test(low)) return { type: "snack", snack: "espresso" };
  if (/pizza/.test(low)) return { type: "snack", snack: "pizza" };
  if (/bug/.test(low)) return { type: "snack", snack: "bug" };
  if (/portal/.test(low)) return { type: "portal" };
  if (/trampoline|bounce/.test(low)) return { type: "trampoline" };
  if (/photo|selfie|polaroid/.test(low)) return { type: "photo" };
  if (/gravity|ceiling/.test(low)) return { type: "gravity" };
  if (/clone|duel/.test(low)) return { type: "clone" };
  if (/prank|chaos/.test(low)) return { type: "prank" };
  if (/\b(hi|hello|hey)\b/.test(low)) return { type: "greeting" };

  return { type: "fallback", raw: rawInput };
}
