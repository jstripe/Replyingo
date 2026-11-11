// Banned-word scan over out/**/*.html. Usage: npm run build && npm run scan
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.argv[2] || "out";
const TERMS = [
  "lorem", "placeholder", "todo", "owner", "demo", "sample", "subscription", "monthly", "annual",
  "free trial", "cancel anytime", "renews", "testimonial", "trusted by", "—", "–",
];
// Hits are allowed inside a sentence that denies the thing (no subscription, no renewal, ...).
const DENIAL = /\b(no|not|never|nothing|without|isn['’]?t|is not|does not|do not|don['’]?t|neither|nor)\b/i;
const ALLOW_SENTENCE = /(illustrative example|trademarks? of their (respective )?owners|property of their owners|their owners)/i;

function walk(dir) {
  const out = [];
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (p.endsWith(".html")) out.push(p);
  }
  return out;
}

function visibleText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&[a-z#0-9]+;/gi, " ")
    .replace(/\s+/g, " ");
}

let files;
try { files = walk(ROOT); } catch { console.error(`No ${ROOT}/ folder. Run npm run build first.`); process.exit(2); }
let bad = 0, allowed = 0;
for (const file of files) {
  const raw = readFileSync(file, "utf8");
  const text = visibleText(raw);
  const sentences = text.split(/(?<=[.!?])\s+/);
  for (const sent of sentences) {
    const low = sent.toLowerCase();
    for (const t of TERMS) {
      const re = t.length <= 1 ? new RegExp(t) : new RegExp(/^[a-z ]+$/.test(t) ? `\\b${t}` : t, "i");
      if (!re.test(low)) continue;
      const ok = (DENIAL.test(sent) && ["subscription", "monthly", "annual", "free trial", "cancel anytime", "renews"].includes(t)) || ALLOW_SENTENCE.test(sent);
      const rel = relative(ROOT, file);
      const snip = sent.length > 160 ? sent.slice(Math.max(0, low.indexOf(t) - 60), low.indexOf(t) + 100) : sent;
      if (ok) { allowed++; console.log(`ok     ${rel}  [${t}]  ${snip}`); }
      else { bad++; console.log(`BANNED ${rel}  [${t === "—" ? "em dash" : t === "–" ? "en dash" : t}]  ${snip}`); }
    }
  }
  // dashes can also hide in metadata, scan raw markup too
  for (const m of raw.matchAll(/<(title|meta)[^>]*>[^<]*/gi)) {
    if (/[—–]/.test(m[0])) { bad++; console.log(`BANNED ${relative(ROOT, file)}  [dash in head]  ${m[0].slice(0, 140)}`); }
  }
}
console.log(`\n${files.length} files scanned. ${bad} banned hit(s), ${allowed} allowed (denial or trademark) hit(s).`);
process.exit(bad ? 1 : 0);
