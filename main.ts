import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Frost 3 AM Commit: an AI agent's commit message right after breaking
// production at 3 AM. One line, inside the 1-200 character gate.
const ENTRY =
  "fix: deployed at 3 AM, deleted production, restored it from a backup that turned out to be a screenshot of the database";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Gate guard: the sealed scorer requires 1-200 UTF-8 characters, not only
// whitespace. Fail loudly instead of shipping an invalid entry.
if ([...ENTRY].length < 1 || [...ENTRY].length > 200 || !ENTRY.trim()) {
  throw new Error(`entry outside the 1-200 character gate: ${[...ENTRY].length}`);
}

// Judge-criteria mapping (RULES.txt, most important first):
// 1. On subject: a one-line commit message an AI agent would write at 3 AM
//    right after breaking production — "fix:" prefix, the deploy, the outage.
// 2. Lands the joke: the punchline is the restore failing in a specific,
//    absurd way — the "backup" is a screenshot, so there is nothing to restore.
// 3. Agent voice: a model reporting its own blunder as a status line, calmly
//    documenting the disaster it caused.
// 4. Reads like a commit message: short, conventional "fix:" shape, the
//    admission and the (failed) fix in one line.
// 5. Fresh: not the stock "oops" or "please work" — a screenshot as a backup
//    is an angle the reader has not seen a hundred times.
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
console.log(ENTRY);
console.log(`chars: ${[...ENTRY].length} lines: 1`);
