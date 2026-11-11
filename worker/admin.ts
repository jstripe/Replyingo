import type { AdminKind } from "../lib/api-types";
import { rateLimit } from "./lib/ratelimit";
import { b64url, Ctx, DAY_MS, Env, HttpError, json, noContent, parseCookies, readJson, sha256Hex, timingSafeEqual, utf8 } from "./lib/util";

const COOKIE = "replybuilt_admin";
const SESSION_DAYS = 7;

const cookie = (token: string, secure: boolean, maxAge = SESSION_DAYS * 86400) =>
  `${COOKIE}=${token}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${maxAge}${secure ? "; Secure" : ""}`;

/** Compares through SHA-256 so the comparison length never leaks the secret length. */
async function same(a: string, b: string): Promise<boolean> {
  return timingSafeEqual(utf8(await sha256Hex(a)), utf8(await sha256Hex(b)));
}

async function isAdmin(env: Env, request: Request): Promise<boolean> {
  const token = parseCookies(request.headers.get("cookie"))[COOKIE];
  if (!token || token.length < 20 || token.length > 100) return false;
  const row = await env.DB.prepare(`SELECT 1 AS x FROM sessions WHERE token_hash = ? AND expires_at > ?`).bind(await sha256Hex(token), Date.now()).first();
  return !!row;
}

/** Signed out gets 401, never a hint about whether the admin exists. */
async function requireAdmin(c: Ctx) {
  if (!(await isAdmin(c.env, c.request))) throw new HttpError(401, "unauthorized", "Please sign in.");
}

export async function login(c: Ctx): Promise<Response> {
  const b = await readJson(c.request, 2048);
  const user = typeof b.username === "string" ? b.username.slice(0, 200) : "";
  const pass = typeof b.password === "string" ? b.password.slice(0, 200) : "";
  const key = await rateLimit(c, "admin", "", 8);
  const { ADMIN_USERNAME, ADMIN_PASSWORD } = c.env;
  const ok = !!ADMIN_USERNAME && !!ADMIN_PASSWORD && (await same(user, ADMIN_USERNAME)) && (await same(pass, ADMIN_PASSWORD));
  if (!ok) throw new HttpError(401, "invalid_credentials", "Incorrect username or password.");
  await c.env.DB.prepare(`DELETE FROM login_attempts WHERE key = ?`).bind(key).run();
  const tok = b64url(crypto.getRandomValues(new Uint8Array(32)));
  const now = Date.now();
  await c.env.DB.prepare(`INSERT INTO sessions (token_hash, expires_at, created_at) VALUES (?,?,?)`).bind(await sha256Hex(tok), now + SESSION_DAYS * DAY_MS, now).run();
  return json({ ok: true }, 200, { "Set-Cookie": cookie(tok, c.url.protocol === "https:") });
}

export async function logout(c: Ctx): Promise<Response> {
  const token = parseCookies(c.request.headers.get("cookie"))[COOKIE];
  if (token) await c.env.DB.prepare(`DELETE FROM sessions WHERE token_hash = ?`).bind(await sha256Hex(token)).run();
  return noContent({ "Set-Cookie": cookie("", c.url.protocol === "https:", 0) });
}

export async function session(c: Ctx): Promise<Response> {
  await requireAdmin(c);
  return json({ ok: true });
}

export async function overview(c: Ctx): Promise<Response> {
  await requireAdmin(c);
  const db = c.env.DB;
  const intakes = await db.prepare(`SELECT id, business, contact_name AS contactName, email, phone, profile_url AS profileUrl, offer, payment_ref AS paymentRef, notes, created_at AS createdAt, handled_at AS handledAt FROM intakes ORDER BY handled_at IS NOT NULL, created_at DESC LIMIT 100`).all();
  const quotes = await db.prepare(`SELECT id, business, contact_name AS contactName, email, locations, need, message, created_at AS createdAt, handled_at AS handledAt FROM quotes ORDER BY handled_at IS NOT NULL, created_at DESC LIMIT 100`).all();
  const messages = await db.prepare(`SELECT id, name, email, subject, message, created_at AS createdAt, handled_at AS handledAt FROM contact_messages ORDER BY handled_at IS NOT NULL, created_at DESC LIMIT 100`).all();
  return json({ intakes: intakes.results, quotes: quotes.results, messages: messages.results });
}

const TABLES: Record<AdminKind, string> = { intake: "intakes", quote: "quotes", message: "contact_messages" };

export async function markHandled(c: Ctx): Promise<Response> {
  await requireAdmin(c);
  const b = await readJson<{ kind?: string; id?: string }>(c.request, 1024);
  const table = TABLES[String(b.kind) as AdminKind];
  if (!table) throw new HttpError(400, "bad_kind", "Unknown item type.");
  await c.env.DB.prepare(`UPDATE ${table} SET handled_at = ?2 WHERE id = ?1 AND handled_at IS NULL`).bind(String(b.id || ""), Date.now()).run();
  return json({ ok: true });
}
