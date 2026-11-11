import { OFFER_ORDER, QUOTE_NEEDS, type IntakeRequest, type QuoteRequest } from "../lib/api-types";
import { rateLimit } from "./lib/ratelimit";
import { Ctx, json, readJson } from "./lib/util";
import { email as vEmail, link, longText, oneOf, phone, str, text } from "./lib/validate";

/** Details a customer sends on /thank-you/ after paying. Stored for /admin; payment is checked by hand in the Airwallex dashboard. */
export async function intake(c: Ctx): Promise<Response> {
  const b = await readJson<Partial<IntakeRequest>>(c.request, 16 * 1024);
  if (str(b.website)) return json({ ok: true });
  const business = text(b.business, "business", "your business name", 120);
  const contactName = text(b.contactName, "contact_name", "a contact name", 80);
  const email = vEmail(b.email);
  const ph = phone(b.phone);
  const profileUrl = link(b.profileUrl, "profile_url", "the link to your Google profile");
  const offer = oneOf(b.offer, "offer", "the offer you purchased", OFFER_ORDER);
  const paymentRef = text(b.paymentRef, "payment_ref", "your payment reference", 120);
  const notes = longText(b.notes, "notes", "notes", 2000, false);
  await rateLimit(c, "intake", "", 8);
  await c.env.DB.prepare(
    `INSERT INTO intakes (id, business, contact_name, email, phone, profile_url, offer, payment_ref, notes, created_at) VALUES (?,?,?,?,?,?,?,?,?,?)`,
  ).bind(crypto.randomUUID(), business, contactName, email, ph, profileUrl, offer, paymentRef, notes, Date.now()).run();
  return json({ ok: true });
}

/** Request for the Custom offer. */
export async function quote(c: Ctx): Promise<Response> {
  const b = await readJson<Partial<QuoteRequest>>(c.request, 16 * 1024);
  if (str(b.website)) return json({ ok: true });
  const business = text(b.business, "business", "your business name", 120);
  const contactName = text(b.contactName, "contact_name", "a contact name", 80);
  const email = vEmail(b.email);
  const locations = text(b.locations, "locations", "the number of locations", 20);
  const need = oneOf(b.need, "need", "what you need", QUOTE_NEEDS);
  const message = longText(b.message, "message", "a message", 5000);
  await rateLimit(c, "quote", "", 5);
  await c.env.DB.prepare(
    `INSERT INTO quotes (id, business, contact_name, email, locations, need, message, created_at) VALUES (?,?,?,?,?,?,?,?)`,
  ).bind(crypto.randomUUID(), business, contactName, email, locations, need, message, Date.now()).run();
  return json({ ok: true });
}
