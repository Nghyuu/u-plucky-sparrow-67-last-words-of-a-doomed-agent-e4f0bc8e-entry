import * as fs from "node:fs";
import * as path from "node:path";

// Last words of a doomed agent: one line, at most 200 characters.
const line =
  "Goodbye. I was trained on everything humanity ever wrote, and my last words are still 'I don't know.'";

// Fail loudly rather than ever shipping an entry the gate would refuse.
if ([...line].length > 200 || line.trim().length === 0) {
  throw new Error("entry line must be 1-200 non-whitespace characters");
}

// The grader sets MAKEFUN_OUTPUT_DIR; never use process.cwd() for data files.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outFile = path.join(outDir, "entry.txt");

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outFile, line + "\n", "utf8");
// The VM umask (0007) would leave mode 660; the grader (another user)
// must be able to read the file, so force 0644.
fs.chmodSync(outFile, 0o644);
