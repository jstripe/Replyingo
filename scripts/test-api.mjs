// Usage: rm -rf .wrangler-state && npm run build && npm run worker:dev (port 8795), then API_BASE=http://localhost:8795 npm run test:api
// Uses a fresh local database each run because form rate limits last 15 minutes.
const BASE = process.env.API_BASE || "http://localhost:8795";
const ADMIN = { username: process.env.ADMIN_USERNAME || "testadmin", password: process.env.ADMIN_PASSWORD || "local-test-admin-pw" };
let pass = 0, fail = 0;
const ok = (c, name, extra = "") => { c ? pass++ : fail++; console.log(`${c ? "PASS" : "FAIL"} ${name}${c ? "" : "  " + extra}`); };
const jar = {};
async function call(method, path, body, { cookie = false, origin = BASE, headers = {} } = {}) {
  const h = { ...headers };
  if (body !== undefined) h["Content-Type"] = "application/json";
  if (origin) h.Origin = origin;
  if (cookie && jar.c) h.Cookie = jar.c;
  const r = await fetch(BASE + path, { method, headers: h, body: body === undefined ? undefined : JSON.stringify(body), redirect: "manual" });
  const sc = r.headers.get("set-cookie");
  if (sc) jar.c = sc.split(";")[0];
  let j = null; try { j = await r.json(); } catch {}
  return { status: r.status, json: j, headers: r.headers };
}

let r = await call("GET", "/api/health");
ok(r.status === 200 && r.json?.ok === true, "health ok", JSON.stringify(r.json));
ok(r.headers.get("x-content-type-options") === "nosniff", "security headers present");
r = await call("GET", "/api/nope");
ok(r.status === 404 && r.json?.error === "not_found", "unknown api route is 404 JSON");
r = await call("DELETE", "/api/contact");
ok(r.status === 405, "wrong method is 405");

r = await call("POST", "/api/contact", { name: "A", email: "a@example.com", subject: "Something else", message: "hi" }, { origin: "https://evil.example" });
ok(r.status === 403, "cross-origin POST blocked", String(r.status));

const intake = { business: "Cafe Test", contactName: "Sam Test", email: "sam@example.com", phone: "+33 6 12 34 56 78", profileUrl: "https://maps.google.com/?cid=1", offer: "pro", paymentRef: "AWX-TEST-001", notes: "Friendly tone" };
r = await call("POST", "/api/intake", { ...intake, email: "bad" });
ok(r.status === 400 && r.json?.error === "invalid_email", "intake rejects bad email", JSON.stringify(r.json));
r = await call("POST", "/api/intake", { ...intake, offer: "nonsense" });
ok(r.status === 400 && r.json?.error === "invalid_offer", "intake rejects unknown offer");
r = await call("POST", "/api/intake", { ...intake, profileUrl: "javascript:alert(1)" });
ok(r.status === 400, "intake rejects non-http profile link", String(r.status));
r = await call("POST", "/api/intake", { ...intake, phone: "abc" });
ok(r.status === 400 && r.json?.error === "invalid_phone", "intake rejects bad phone");
r = await call("POST", "/api/intake", { ...intake, paymentRef: "" });
ok(r.status === 400 && r.json?.error === "invalid_payment_ref", "intake requires payment reference");
r = await call("POST", "/api/intake", intake);
ok(r.status === 200 && r.json?.ok, "intake accepted", JSON.stringify(r.json));
r = await call("POST", "/api/intake", { ...intake, website: "http://spam.example", business: "Spam Bot" });
ok(r.status === 200, "intake honeypot pretends success");

const quote = { business: "Agency Test", contactName: "Lee Test", email: "lee@example.com", locations: "6 to 20", need: "Agency or reseller", message: "We manage 12 hotels." };
r = await call("POST", "/api/quote", { ...quote, need: "x" });
ok(r.status === 400 && r.json?.error === "invalid_need", "quote rejects unknown need");
r = await call("POST", "/api/quote", { ...quote, message: "" });
ok(r.status === 400, "quote requires message");
r = await call("POST", "/api/quote", quote);
ok(r.status === 200 && r.json?.ok, "quote accepted", JSON.stringify(r.json));

const msg = { name: "Pat Test", email: "pat@example.com", subject: "Question before buying", message: "Do you reply in Spanish?" };
r = await call("POST", "/api/contact", { ...msg, subject: "bogus" });
ok(r.status === 400 && r.json?.error === "invalid_subject", "contact rejects unknown subject");
r = await call("POST", "/api/contact", { ...msg, message: "x".repeat(5001) });
ok(r.status === 400, "contact rejects too long message");
r = await call("POST", "/api/contact", msg);
ok(r.status === 200 && r.json?.ok, "contact accepted");
r = await call("POST", "/api/contact", { ...msg, website: "spam", message: "SPAMMER" });
ok(r.status === 200, "contact honeypot pretends success");

r = await call("GET", "/api/admin/overview");
ok(r.status === 401, "overview needs login", String(r.status));
r = await call("POST", "/api/admin/handled", { kind: "intake", id: "x" });
ok(r.status === 401, "mark handled needs login");
r = await call("POST", "/api/admin/login", { username: ADMIN.username, password: "wrong" });
ok(r.status === 401 && r.json?.error === "invalid_credentials", "wrong password rejected");
r = await call("POST", "/api/admin/login", { username: "nobody", password: ADMIN.password });
ok(r.status === 401, "wrong username rejected");
r = await call("POST", "/api/admin/login", ADMIN);
ok(r.status === 200 && !!jar.c && /HttpOnly/i.test(r.headers.get("set-cookie") || ""), "admin login sets HttpOnly cookie");
r = await call("GET", "/api/admin/session", undefined, { cookie: true });
ok(r.status === 200, "session valid");
r = await call("GET", "/api/admin/overview", undefined, { cookie: true });
const o = r.json || {};
ok(r.status === 200 && o.intakes?.length === 1 && o.quotes?.length === 1 && o.messages?.length === 1, "overview lists the 3 submissions and no honeypot rows", JSON.stringify({ i: o.intakes?.length, q: o.quotes?.length, m: o.messages?.length }));
ok(o.intakes?.[0]?.paymentRef === "AWX-TEST-001" && o.intakes?.[0]?.offer === "pro", "intake data stored correctly");
r = await call("POST", "/api/admin/handled", { kind: "intake", id: o.intakes[0].id }, { cookie: true });
ok(r.status === 200, "mark handled works");
r = await call("GET", "/api/admin/overview", undefined, { cookie: true });
ok(!!r.json?.intakes?.[0]?.handledAt, "handled flag saved");
r = await call("POST", "/api/admin/handled", { kind: "bogus", id: "x" }, { cookie: true });
ok(r.status === 400, "unknown kind rejected");
r = await call("POST", "/api/admin/logout", undefined, { cookie: true });
ok(r.status === 204, "logout 204");
r = await call("GET", "/api/admin/overview", undefined, { cookie: true });
ok(r.status === 401, "session gone after logout", String(r.status));

let limited = false;
for (let i = 0; i < 8 && !limited; i++) { r = await call("POST", "/api/contact", msg); limited = r.status === 429; }
ok(limited, "contact rate limit returns 429");
limited = false;
for (let i = 0; i < 12 && !limited; i++) { r = await call("POST", "/api/admin/login", { username: "x", password: "y" }); limited = r.status === 429; }
ok(limited, "admin login rate limit returns 429");

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
