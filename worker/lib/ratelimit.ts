import { Ctx, HttpError, sha256Hex } from "./util";

const RL_WINDOW_MS = 15 * 60_000;

/** Counts this attempt; throws 429 when over the limit. Returns the key so a success can clear it. */
export async function rateLimit(c: Ctx, action: string, who: string, max: number): Promise<string> {
  const key = `${action}:${await sha256Hex(`${c.ip}|${who}`)}`.slice(0, 80);
  const now = Date.now();
  const row = await c.env.DB.prepare(
    `INSERT INTO login_attempts (key, window_start, count) VALUES (?, ?, 1)
     ON CONFLICT(key) DO UPDATE SET
       count = CASE WHEN window_start < ?3 THEN 1 ELSE count + 1 END,
       window_start = CASE WHEN window_start < ?3 THEN ?2 ELSE window_start END
     RETURNING count, window_start`,
  ).bind(key, now, now - RL_WINDOW_MS).first<{ count: number; window_start: number }>();
  if (row && row.count > max) {
    const retry = Math.max(1, Math.ceil((row.window_start + RL_WINDOW_MS - now) / 1000));
    throw new HttpError(429, "rate_limited", "Too many attempts. Please try again later.", { "Retry-After": String(retry) });
  }
  return key;
}
