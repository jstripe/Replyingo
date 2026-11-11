/**
 * Contract between the Worker API (worker/**) and the website (components/**, app/**).
 * Change here first, then in both sides. No runtime imports from Next-only modules.
 */

export type OfferId = "starter" | "pro" | "templates" | "profile" | "visibility";

/** Fixed offers sold through one-time Airwallex Payment Links. amountCents must equal the amount on the link (EUR). */
export const OFFER_CATALOG: Record<OfferId, { name: string; amountCents: number }> = {
  starter: { name: "Reply Starter", amountCents: 2900 },
  pro: { name: "Reply Pro", amountCents: 5900 },
  templates: { name: "Reply Templates Pack", amountCents: 4900 },
  profile: { name: "Google Profile Optimization", amountCents: 8900 },
  visibility: { name: "Local Visibility Pack", amountCents: 19900 },
};
export const OFFER_ORDER: OfferId[] = ["starter", "pro", "templates", "profile", "visibility"];
export const CURRENCY = "EUR";

export const CONTACT_SUBJECTS = ["Question before buying", "Help with an order", "Refund request", "Privacy request", "Something else"] as const;
export const QUOTE_NEEDS = ["Several locations", "Agency or reseller", "Replies in other languages", "Something else"] as const;

export interface ApiError { error: string; message: string }

export interface ContactRequest { name: string; email: string; subject: string; message: string; /** honeypot, must stay empty */ website?: string }
export interface IntakeRequest {
  business: string; contactName: string; email: string; phone: string; profileUrl: string;
  /** an OfferId */ offer: string; paymentRef: string; notes?: string; website?: string;
}
export interface QuoteRequest {
  business: string; contactName: string; email: string; locations: string; need: string; message: string; website?: string;
}

export interface Capabilities { ok: boolean }

export interface AdminContact { id: string; name: string; email: string; subject: string; message: string; createdAt: number; handledAt: number | null }
export interface AdminIntake { id: string; business: string; contactName: string; email: string; phone: string; profileUrl: string; offer: string; paymentRef: string; notes: string; createdAt: number; handledAt: number | null }
export interface AdminQuote { id: string; business: string; contactName: string; email: string; locations: string; need: string; message: string; createdAt: number; handledAt: number | null }
export interface AdminOverview { intakes: AdminIntake[]; quotes: AdminQuote[]; messages: AdminContact[] }
export type AdminKind = "intake" | "quote" | "message";
