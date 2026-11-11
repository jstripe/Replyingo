// Usage: node scripts/pexels-fetch.mjs   (downloads the picks below to media-source/<section>/<slug>.jpg + sidecar json)
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
const key = process.env.PEXELS_API_KEY;
if (!key) { console.error("PEXELS_API_KEY not set"); process.exit(1); }
const picks = [
  ["home", "hero-reviews", 6684764], ["home", "aud-restaurant", 3801690], ["home", "aud-salon", 8834018], ["home", "aud-shop", 5410100],
  ["about", "about-desk", 6684766], ["contact", "contact-desk", 10341587],
];
for (const [section, slug, id] of picks) {
  const dir = `media-source/${section}`; mkdirSync(dir, { recursive: true });
  const file = `${dir}/${slug}.jpg`;
  if (existsSync(file)) continue;
  const meta = await (await fetch(`https://api.pexels.com/v1/photos/${id}`, { headers: { Authorization: key } })).json();
  const img = await fetch(meta.src.original);
  writeFileSync(file, Buffer.from(await img.arrayBuffer()));
  writeFileSync(`${dir}/${slug}.json`, JSON.stringify({ slug, pexelsId: id, url: meta.url, photographer: meta.photographer, photographerUrl: meta.photographer_url, alt: meta.alt, width: meta.width, height: meta.height, license: "Pexels License (free to use, attribution not required)" }, null, 2));
  console.log("ok", slug);
}
