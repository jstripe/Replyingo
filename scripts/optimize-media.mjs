// Usage: npm run media
// media-source/<section>/<slug>.(jpg|png|webp) -> public/media/<slug>-<w>.(avif|webp) + lib/media-manifest.json
import sharp from "sharp";
import { existsSync, mkdirSync, readdirSync, writeFileSync, statSync, readdirSync as ls } from "node:fs";
import { join, parse } from "node:path";

const SRC = "media-source", OUT = "public/media", WIDTHS = [640, 1280, 1920];
mkdirSync(OUT, { recursive: true });
const manifest = { photos: {}, videos: {} };
let before = 0, after = 0;
for (const section of ls(SRC, { withFileTypes: true }).filter((d) => d.isDirectory())) {
  for (const f of readdirSync(join(SRC, section.name))) {
    if (!/\.(jpe?g|png|webp)$/i.test(f)) continue;
    const { name } = parse(f), input = join(SRC, section.name, f);
    before += statSync(input).size;
    const meta = await sharp(input).rotate().metadata();
    const w0 = meta.autoOrient?.width ?? meta.width, h0 = meta.autoOrient?.height ?? meta.height;
    const widths = WIDTHS.filter((w) => w <= w0);
    const [r, g, b] = (await sharp(input).rotate().resize(16, 16, { fit: "inside" }).stats()).channels.map((c) => Math.round(c.mean));
    const blur = (await sharp(input).rotate().resize(24).blur(1).webp({ quality: 40 }).toBuffer()).toString("base64");
    for (const w of widths) {
      const base = sharp(input).rotate().resize({ width: w, withoutEnlargement: true });
      await base.clone().avif({ quality: 50, effort: 5 }).toFile(join(OUT, `${name}-${w}.avif`));
      await base.clone().webp({ quality: 78, effort: 5, smartSubsample: true }).toFile(join(OUT, `${name}-${w}.webp`));
      for (const e of ["avif", "webp"]) after += statSync(join(OUT, `${name}-${w}.${e}`)).size;
    }
    const outH = Math.round((h0 / w0) * widths[widths.length - 1]);
    manifest.photos[name] = { width: widths[widths.length - 1], height: outH, widths, color: `rgb(${r},${g},${b})`, blur: `data:image/webp;base64,${blur}`, section: section.name };
    console.log("photo", name, widths.join("/"));
  }
}
writeFileSync("lib/media-manifest.json", JSON.stringify(manifest));
console.log(`originals ${(before / 1e6).toFixed(1)} MB -> optimised ${(after / 1e6).toFixed(1)} MB`);
