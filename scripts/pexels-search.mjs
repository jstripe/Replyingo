// Usage: node scripts/pexels-search.mjs "query" [orientation] [perPage]
// Prints id | size | photographer | alt. Reads PEXELS_API_KEY from the environment; never prints it.
const [q, orientation = "landscape", per = "10"] = process.argv.slice(2);
const key = process.env.PEXELS_API_KEY;
if (!key) { console.error("PEXELS_API_KEY not set"); process.exit(1); }
const r = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(q)}&orientation=${orientation}&size=large&per_page=${per}`, { headers: { Authorization: key } });
if (!r.ok) { console.error("HTTP", r.status); process.exit(1); }
const j = await r.json();
for (const p of j.photos) console.log(`${p.id} | ${p.width}x${p.height} | ${p.photographer} | ${p.alt}`);
