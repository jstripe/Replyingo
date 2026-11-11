import { CONTACT_SUBJECTS, type ContactRequest } from "../lib/api-types";
import { rateLimit } from "./lib/ratelimit";
import { Ctx, json, readJson } from "./lib/util";
import { email as vEmail, longText, oneOf, str, text } from "./lib/validate";

/** Contact form: stores the message for the admin back office (/admin). Purged after 12 months by the cron. */
export async function contact(c: Ctx): Promise<Response> {
  const b = await readJson<Partial<ContactRequest>>(c.request, 16 * 1024);
  // Honeypot: real visitors never fill the hidden "website" field. Pretend success so bots move on.
  if (str(b.website)) return json({ ok: true });
  const name = text(b.name, "name", "your name", 80);
  const email = vEmail(b.email);
  const subject = oneOf(b.subject, "subject", "a subject", CONTACT_SUBJECTS);
  const message = longText(b.message, "message", "a message", 5000);
  await rateLimit(c, "contact", "", 5);
  await c.env.DB.prepare(`INSERT INTO contact_messages (id, name, email, subject, message, created_at) VALUES (?,?,?,?,?,?)`)
    .bind(crypto.randomUUID(), name, email, subject, message, Date.now()).run();
  return json({ ok: true });
}
