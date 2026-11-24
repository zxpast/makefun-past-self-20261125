// Two Lines to Your Past Self — entry program (Node 22, stdlib only).
//
// The entry is two lines, one sentence each:
//   Line 1 warns the past self about ONE specific moment: a time (06:10),
//   a date (3 March), a place (the harbour), and a sentence said out loud
//   ("I can swim") — concrete enough to picture.
//   Line 2 traces the real cause and effect: the lie is believed, the
//   speaker is put on the rescue boat, and eleven years later the
//   consequence lands — he still cannot swim, he only got good at pulling
//   other people out. The twist sits in the final words; nothing explains
//   the joke. The narrator is the lie's victim and its beneficiary at once
//   (self-own, character + routine + motif).
//
// Deterministic: no input, no network, no randomness, no clock. The same
// bytes are written on every run.
import { mkdirSync, writeFileSync } from "node:fs";

const LINE_1 =
  "Don't tell the harbour master 'I can swim' at 06:10 on 3 March.";
const LINE_2 =
  "He believed you, put you on the rescue boat, and eleven years later you still can't swim \u2014 you just got very good at pulling other people out.";

const entry = `${LINE_1}\n${LINE_2}\n`;

// Hardening: fail loudly instead of silently writing an entry that would
// fail the gate (UTF-8, 1-280 chars, exactly 2 lines, 1 sentence per line).
// A sentence here is one terminal period; the quoted 'I can swim' carries
// no period, and the em dash in line 2 is not a sentence break.
const lines = entry.split("\n");
if (entry.length < 1 || entry.length > 280) {
  throw new Error(`entry length ${entry.length} outside gate 1-280`);
}
if (lines.length !== 3 || lines[2] !== "") {
  throw new Error(`expected exactly 2 lines, got ${lines.length - 1}`);
}
for (const [i, line] of lines.slice(0, 2).entries()) {
  if (line.trim().length === 0 || line.split(".").length - 1 !== 1) {
    throw new Error(`line ${i + 1} is not exactly one sentence: ${line}`);
  }
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", entry, "utf8");
