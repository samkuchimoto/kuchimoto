// scripts/check-copy.mjs
// The site never uses the em dash (U+2014), by request. This fails `npm
// run lint` (and so the review before a deploy) if one appears anywhere in
// the source or the public folder's text files.

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const EM_DASH = String.fromCharCode(0x2014);
const roots = ["src", "public"];
const textFiles = new Set([".ts", ".tsx", ".js", ".mjs", ".css", ".json", ".md", ".html", ".txt", ".svg", ".webmanifest"]);
const hits = [];

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (textFiles.has(extname(name))) {
      readFileSync(path, "utf8").split("\n").forEach((line, i) => {
        if (line.includes(EM_DASH)) hits.push(`${path}:${i + 1}: ${line.trim().slice(0, 100)}`);
      });
    }
  }
}

for (const root of roots) {
  try {
    walk(root);
  } catch {
    // A missing folder is fine.
  }
}

if (hits.length) {
  console.error(`Em dash found (${hits.length}). Use a colon, a comma or a full stop instead:\n${hits.join("\n")}`);
  process.exit(1);
}
console.log("check-copy: no em dash.");
