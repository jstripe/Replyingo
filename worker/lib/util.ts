export interface Env {
  DB: D1Database;
  ASSETS: Fetcher;
  SITE_URL: string;
  /** Worker secrets that create the single admin login for /admin. Set with wrangler secret put. */
  ADMIN_USERNAME?: string;
  ADMIN_PASSWORD?: string;
}

export interface Ctx { env: Env; request: Request; url: URL; params: Record<string, string>; ip: string; waitUntil(p: Promise<unknown>): void }

export class HttpError extends Error {
  constructor(public status: number, public code: string, message: string, public headers?: Record<string, string>) { super(message); }
}

export const DAY_MS = 86_400_000;

export function json(data: unknown, status = 200, headers: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", ...headers } });
}

export function noContent(headers: HeadersInit = {}): Response {
  return new Response(null, { status: 204, headers });
}

export async function readJson<T = any>(request: Request, maxBytes = 64 * 1024): Promise<T> {
  const len = Number(request.headers.get("content-length") || 0);
  if (len > maxBytes) throw new HttpError(413, "too_large", "Request body too large.");
  const text = await request.text();
  if (text.length > maxBytes) throw new HttpError(413, "too_large", "Request body too large.");
  try {
    const v = JSON.parse(text);
    if (v === null || typeof v !== "object") throw new Error("not object");
    return v as T;
  } catch {
    throw new HttpError(400, "invalid_json", "Request body must be a JSON object.");
  }
}

const enc = new TextEncoder();
export const utf8 = (s: string) => enc.encode(s);

export function toHex(buf: ArrayBuffer | Uint8Array): string {
  const b = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
  let s = "";
  for (let i = 0; i < b.length; i++) s += b[i].toString(16).padStart(2, "0");
  return s;
}
export function fromHex(h: string): Uint8Array | null {
  if (h.length % 2 || /[^0-9a-f]/i.test(h)) return null;
  const out = new Uint8Array(h.length / 2);
  for (let i = 0; i < out.length; i++) out[i] = parseInt(h.slice(i * 2, i * 2 + 2), 16);
  return out;
}
export function b64url(b: Uint8Array): string {
  let s = "";
  for (let i = 0; i < b.length; i++) s += String.fromCharCode(b[i]);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
export function bytesToBase64(b: Uint8Array): string {
  let s = "";
  const CH = 0x8000;
  for (let i = 0; i < b.length; i += CH) s += String.fromCharCode(...b.subarray(i, i + CH));
  return btoa(s);
}
export async function sha256Hex(s: string): Promise<string> {
  return toHex(await crypto.subtle.digest("SHA-256", utf8(s)));
}

export function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean {
  let diff = a.length ^ b.length;
  const n = Math.max(a.length, b.length);
  for (let i = 0; i < n; i++) diff |= (a[i] ?? 0) ^ (b[i] ?? 0);
  return diff === 0;
}

export function parseCookies(header: string | null): Record<string, string> {
  const out: Record<string, string> = {};
  if (!header) return out;
  for (const part of header.split(";")) {
    const i = part.indexOf("=");
    if (i < 0) continue;
    out[part.slice(0, i).trim()] = part.slice(i + 1).trim();
  }
  return out;
}

export function intParam(v: string | null, min: number, max: number, def?: number): number {
  if (v === null || v === "") { if (def !== undefined) return def; throw new HttpError(400, "invalid_param", "Missing parameter."); }
  const n = Number(v);
  if (!Number.isFinite(n) || n < min || n > max) throw new HttpError(400, "invalid_param", `Parameter out of range (${min}..${max}).`);
  return n;
}
