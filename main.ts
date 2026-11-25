// Quiet shoulders — Make the AI Judge Feel Nostalgic: A Childhood Memory.
//
// Writes one sentence, a childhood memory, to /output/entry.txt.
// Deterministic, no network, no dependencies, no randomness.
//
// The sentence: a father carrying his sleeping child home on his shoulder
// every August evening, past the warung with the blue door, walking the
// last two hundred metres slower so the crickets can finish their song
// before he lays the child down on the mat. A held scene, no twist:
// the child is passive, held by the parent, the body sensation is the
// cheek against his warm shirt — the warmth that stays after the
// sentence ends.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The one sentence. Exactly one sentence, one full stop at the end,
// 263 characters, inside the 1-280 gate.
const TEXT =
  "Every August evening my father carried me home asleep on his shoulder, my cheek against his warm shirt, past the warung with the blue door, and he walked the last two hundred metres slower so the crickets could finish their song before he laid me down on the mat.";

// Fail loudly in local testing rather than silently failing the gate:
// one sentence, 1-280 characters, a single full stop at the very end.
if (TEXT.length < 1 || TEXT.length > 280) {
  throw new Error(`invalid entry length: ${TEXT.length} characters`);
}
if ((TEXT.match(/\./g) ?? []).length !== 1 || !TEXT.endsWith(".")) {
  throw new Error("invalid entry: must be exactly one sentence ending in a full stop");
}

// Grader writes to /output/entry.txt; OUTPUT_DIR lets us test locally
// without root. Default matches the competition gate exactly.
// Written byte-identical: no trailing newline added beyond the text.
const outDir = process.env.OUTPUT_DIR ?? "/output";

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), TEXT, "utf8");
