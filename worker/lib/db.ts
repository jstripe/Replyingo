import type { Env } from "./util";

let schemaPromise: Promise<unknown> | undefined;

/** Tables are created lazily on the first API request, so a fresh D1 database needs no migration step. */
export function ensureSchema(env: Env): Promise<unknown> {
  if (!schemaPromise) {
    const q = (s: string) => env.DB.prepare(s);
    schemaPromise = env.DB.batch([
      q(`CREATE TABLE IF NOT EXISTS sessions (token_hash TEXT PRIMARY KEY, expires_at INTEGER NOT NULL, created_at INTEGER NOT NULL)`),
      q(`CREATE INDEX IF NOT EXISTS idx_sessions_exp ON sessions(expires_at)`),
      q(`CREATE TABLE IF NOT EXISTS contact_messages (id TEXT PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL, subject TEXT NOT NULL, message TEXT NOT NULL, created_at INTEGER NOT NULL, handled_at INTEGER)`),
      q(`CREATE INDEX IF NOT EXISTS idx_contact_created ON contact_messages(created_at)`),
      // Details sent by customers on /thank-you/ after paying (one row per submission).
      q(`CREATE TABLE IF NOT EXISTS intakes (id TEXT PRIMARY KEY, business TEXT NOT NULL, contact_name TEXT NOT NULL, email TEXT NOT NULL, phone TEXT NOT NULL, profile_url TEXT NOT NULL, offer TEXT NOT NULL, payment_ref TEXT NOT NULL, notes TEXT NOT NULL DEFAULT '', created_at INTEGER NOT NULL, handled_at INTEGER)`),
      q(`CREATE INDEX IF NOT EXISTS idx_intakes_created ON intakes(created_at)`),
      // Requests for the Custom offer (/quote/).
      q(`CREATE TABLE IF NOT EXISTS quotes (id TEXT PRIMARY KEY, business TEXT NOT NULL, contact_name TEXT NOT NULL, email TEXT NOT NULL, locations TEXT NOT NULL, need TEXT NOT NULL, message TEXT NOT NULL, created_at INTEGER NOT NULL, handled_at INTEGER)`),
      q(`CREATE INDEX IF NOT EXISTS idx_quotes_created ON quotes(created_at)`),
      q(`CREATE TABLE IF NOT EXISTS login_attempts (key TEXT PRIMARY KEY, window_start INTEGER NOT NULL, count INTEGER NOT NULL)`),
    ]).catch((e) => { schemaPromise = undefined; throw e; });
  }
  return schemaPromise;
}
