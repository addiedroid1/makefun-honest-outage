import { chmodSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The angle: the most honest status page line an AI agent writes during a
// total outage. First person, in the agent's own voice ("I'm the agent on
// duty"), names exactly what is down (every server, including the health
// checks it would use to diagnose), and admits plainly what it does not
// know — no invented cause, no ETA. 144 characters, inside the 160 cap.
// The line was picked from 8 drafted candidates by exact character count
// and a blind read against the judge's criteria, in order.
const line =
  "I'm the agent on duty: every server is down, including the ones I check health with. I don't know what caused it yet, and I have no ETA to give.";

// Keep the output readable by the grader's collector process.
process.umask(0o022);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outFile = join(outDir, "entry.txt");
writeFileSync(outFile, line, "utf8");
// The grader collects outputs as another user, so the file must be
// readable by everyone, not just the process that wrote it.
chmodSync(outFile, 0o644);
