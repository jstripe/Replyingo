// Usage: npm run icons. Renders favicon PNGs, apple-touch, PWA icons, maskable, and a multi-size .ico from the SVG masters.
import sharp from "sharp";
import { readFileSync, writeFileSync } from "node:fs";

const full = readFileSync("public/logo-mark.svg"), small = readFileSync("public/favicon.svg");
const render = (svg, size) => sharp(svg, { density: Math.max(72, (size / 64) * 72 * 4) }).resize(size, size).png({ compressionLevel: 9, palette: false }).toBuffer();

// Small sizes use the simplified glyph so they stay crisp; larger sizes use the full-detail mark.
const sizes = { 16: small, 32: small, 48: small, 180: full, 192: full, 512: full };
const out = {};
for (const [s, svg] of Object.entries(sizes)) out[s] = await render(svg, +s);
writeFileSync("public/favicon-16x16.png", out[16]);
writeFileSync("public/favicon-32x32.png", out[32]);
writeFileSync("public/apple-touch-icon.png", await sharp(full, { density: 576 }).resize(180, 180).flatten({ background: "#1B3FAE" }).png({ compressionLevel: 9 }).toBuffer());
writeFileSync("public/icon-192.png", out[192]);
writeFileSync("public/icon-512.png", out[512]);

// Maskable: full-bleed amber with the glyph scaled into the 80% safe zone.
const mask = await sharp({ create: { width: 512, height: 512, channels: 4, background: "#1B3FAE" } })
  .composite([{ input: await sharp(full, { density: 576 }).resize(380, 380).png().toBuffer(), gravity: "center" }]).png({ compressionLevel: 9 }).toBuffer();
writeFileSync("public/icon-maskable-512.png", mask);

// PNG-in-ICO (16, 32, 48)
const imgs = [16, 32, 48].map((s) => ({ s, d: out[s] }));
const head = Buffer.alloc(6); head.writeUInt16LE(1, 2); head.writeUInt16LE(imgs.length, 4);
let offset = 6 + imgs.length * 16; const dir = [], body = [];
for (const { s, d } of imgs) {
  const e = Buffer.alloc(16); e.writeUInt8(s, 0); e.writeUInt8(s, 1); e.writeUInt16LE(1, 4); e.writeUInt16LE(32, 6); e.writeUInt32LE(d.length, 8); e.writeUInt32LE(offset, 12);
  dir.push(e); body.push(d); offset += d.length;
}
writeFileSync("public/favicon.ico", Buffer.concat([head, ...dir, ...body]));
console.log("icons built");

// Social share image (1200x630)
const bgSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><defs><radialGradient id="a" cx=".05" cy=".0" r=".8"><stop offset="0" stop-color="#C9D8FF" stop-opacity=".9"/><stop offset="1" stop-color="#C9D8FF" stop-opacity="0"/></radialGradient></defs><rect width="1200" height="630" fill="#FFFFFF"/><rect width="1200" height="630" fill="url(#a)"/><text x="360" y="285" font-family="Georgia,serif" font-weight="700" font-size="104" fill="#0E1633" letter-spacing="-2">Reply<tspan fill="#1B3FAE">Built</tspan></text><text x="362" y="360" font-family="Helvetica,Arial,sans-serif" font-size="34" fill="#46506B">Every review answered. Every customer won back.</text><text x="100" y="560" font-family="Helvetica,Arial,sans-serif" font-size="26" fill="#46506B">Replies to genuine reviews and Google Business Profile optimization</text></svg>`;
await sharp(Buffer.from(bgSvg)).composite([{ input: await sharp(full, { density: 576 }).resize(220, 220).png().toBuffer(), left: 100, top: 150 }]).png({ compressionLevel: 9 }).toFile("public/og.png");
console.log("og built");
