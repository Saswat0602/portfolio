import type { SnackId } from "@/lib/data";

export type ChatActionIntent =
  | { type: "roast" }
  | { type: "joke" }
  | { type: "backflip" }
  | { type: "friday" }
  | { type: "crash" }
  | { type: "disco" }
  | { type: "sneeze" }
  | { type: "snack"; snack: SnackId }
  | { type: "portal" }
  | { type: "trampoline" }
  | { type: "photo" }
  | { type: "gravity" }
  | { type: "clone" }
  | { type: "prank" }
  | { type: "mode"; mode: "laser" | "magnet" | "catch" | "paint" | "bugs" | "dj" }
  | { type: "hire" }
  | { type: "greeting" }
  | { type: "fallback"; raw: string };

export function resolveChatCommand(rawInput: string): ChatActionIntent {
  const low = rawInput.toLowerCase();

  if (/friday|deploy|prod|push|release/.test(low)) return { type: "friday" };
  if (/crash|bsod|blue screen|panic|error|404|500/.test(low)) return { type: "crash" };
  if (/disco|party|dance|rave|groove/.test(low)) return { type: "disco" };
  if (/sneeze|achoo|allergy/.test(low)) return { type: "sneeze" };
  if (/roast|audit|flame|burn/.test(low)) return { type: "roast" };
  if (/joke|funny|laugh|meme/.test(low)) return { type: "joke" };
  if (/flip|jump|backflip|spin/.test(low)) return { type: "backflip" };
  if (/pepper|fire|spicy|hot/.test(low)) return { type: "snack", snack: "pepper" };
  if (/lemon|sour/.test(low)) return { type: "snack", snack: "lemon" };
  if (/coffee|espresso|caffeine/.test(low)) return { type: "snack", snack: "espresso" };
  if (/pizza|cheese|hungry|eat|food/.test(low)) return { type: "snack", snack: "pizza" };
  if (/\blaser\b/.test(low)) return { type: "mode", mode: "laser" };
  if (/\bmagnet\b/.test(low)) return { type: "mode", mode: "magnet" };
  if (/\bcatch\b/.test(low)) return { type: "mode", mode: "catch" };
  if (/\bpaint\b|\bdraw\b/.test(low)) return { type: "mode", mode: "paint" };
  if (/\bbugs\b|\bhunt\b/.test(low)) return { type: "mode", mode: "bugs" };
  if (/\bdj\b|\bmusic\b|\bsynth\b/.test(low)) return { type: "mode", mode: "dj" };
  if (/bug/.test(low)) return { type: "snack", snack: "bug" };
  if (/portal/.test(low)) return { type: "portal" };
  if (/trampoline|bounce/.test(low)) return { type: "trampoline" };
  if (/photo|selfie|polaroid|pic|snap/.test(low)) return { type: "photo" };
  if (/gravity|ceiling/.test(low)) return { type: "gravity" };
  if (/clone|duel|copy/.test(low)) return { type: "clone" };
  if (/prank|chaos|surprise|random/.test(low)) return { type: "prank" };
  if (/hire|saswat|resume|work|project|contact/.test(low)) return { type: "hire" };
  if (/\b(hi|hello|hey|yo|sup|hola)\b/.test(low)) return { type: "greeting" };

  return { type: "fallback", raw: rawInput };
}
