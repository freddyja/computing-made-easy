import fs from "node:fs";
import path from "node:path";
import { exportHtmlLang, setDocumentLang } from "../lib/export-lang.ts";

const outDir = path.resolve("out");
const files: string[] = [];

function walk(dir: string) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith(".html")) files.push(full);
  }
}

walk(outDir);
let changed = 0;
for (const file of files) {
  const relative = path.relative(outDir, file);
  const lang = exportHtmlLang(relative);
  if (!lang) continue;
  const before = fs.readFileSync(file, "utf8");
  const after = setDocumentLang(before, lang);
  if (!new RegExp(`<html\\b[^>]*\\slang="${lang}"`).test(after)) {
    console.error(`document language was not set for ${relative}`);
    process.exit(1);
  }
  if (after !== before) {
    fs.writeFileSync(file, after);
    changed += 1;
  }
}

const checks: [string, string][] = [
  ["en/index.html", "en"],
  ["es/index.html", "es"],
  ["pt-br/index.html", "pt-BR"],
  ["en/contact/index.html", "en"],
  ["es/contact/index.html", "es"],
  ["pt-br/app-center/index.html", "pt-BR"],
];
for (const [relative, lang] of checks) {
  const html = fs.readFileSync(path.join(outDir, relative), "utf8");
  const match = html.match(/<html\b[^>]*>/);
  if (!match || !match[0].includes(`lang="${lang}"`)) {
    console.error(`expected ${relative} to use lang=${lang}, found ${match?.[0]}`);
    process.exit(1);
  }
  if (/Example slides|Not a customer review|testimonial/i.test(html)) {
    console.error(`review copy remains in ${relative}`);
    process.exit(1);
  }
}

console.log(`export document language set on ${changed} files; ${checks.length} paths checked`);
