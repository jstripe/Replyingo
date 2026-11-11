/**
 * Single source of truth. Company fields hold {{...}} values until the final step (STOP 2); every page reads them from here.
 * Domain: replyingo.com (bought by the owner).
 */
const domain = "replyingo.com";

export const siteConfig = {
  name: "Replyingo",
  domain,
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://replyingo.com",
  tagline: "Every review answered. Every customer won back.",
  description:
    "Replyingo writes professional replies to the genuine reviews your business receives on Google, Tripadvisor and Facebook, and optimizes your Google Business Profile. 100% online service.",
  launchMonth: "November 2026",

  // Company identity (final step fills these in)
  legalEntity: "{{LEGAL NAME}}",
  legalForm: "{{LEGAL FORM}}",
  registrationNumber: "{{REGISTRATION NUMBER}}",
  address: "{{ADDRESS}}",
  governingLaw: "{{GOVERNING LAW}}",
  /** The exact legal notice the owner gives at STOP 2. Empty = built from the fields above. */
  legalNoticeOverride: "",

  contactEmail: `contact@${domain || "{{DOMAIN}}"}`,
  phone: "{{PHONE}}",
  hours: "Monday to Friday, 9:00 to 17:00 (time zone of our registered office)",
  hoursNote: "Messages sent outside these hours are answered on the next business day.",

  // Service promises, reused by every page so they stay identical
  refundDecisionDays: 3,
  refundPayDays: 10,
  startWithinHours: 48,

  social: {
    x: "https://x.com/replyingo",
    instagram: "https://instagram.com/replyingo",
    linkedin: "https://linkedin.com/company/replyingo",
    facebook: "https://facebook.com/replyingo",
  } as Record<string, string>,
  /** Only networks that really exist are shown. Hidden until the owner confirms them. */
  socialLive: { x: false, instagram: false, linkedin: false, facebook: false } as Record<string, boolean>,

  /** One-time Airwallex payment links, one per offer. Env vars override. Empty = disabled "Checkout opens soon" button. */
  payLinks: {
    starter: process.env.NEXT_PUBLIC_PAY_STARTER || "",
    pro: process.env.NEXT_PUBLIC_PAY_PRO || "",
    templates: process.env.NEXT_PUBLIC_PAY_TEMPLATES || "",
    profile: process.env.NEXT_PUBLIC_PAY_PROFILE || "",
    visibility: process.env.NEXT_PUBLIC_PAY_VISIBILITY || "",
  } as Record<string, string>,

  /** Only what the site really uses. */
  subProcessors: [
    { name: "Cloudflare, Inc.", purpose: "Hosting, content delivery, security and the database that stores the forms you send us", location: "United States and worldwide edge network", safeguard: "EU-US Data Privacy Framework and Standard Contractual Clauses" },
    { name: "Airwallex (UK) Limited and affiliates", purpose: "Card payment processing for the offers you buy", location: "United Kingdom, EEA, Hong Kong and Singapore", safeguard: "UK adequacy decisions and Standard Contractual Clauses" },
  ],
};

export const mandatoryText = "Replyingo never writes, buys or sells reviews. We only reply to genuine reviews on behalf of our clients, with their approval.";

export function legalNotice(): string {
  if (siteConfig.legalNoticeOverride) return siteConfig.legalNoticeOverride;
  return `${siteConfig.name} is operated by ${siteConfig.legalEntity}, registration no. ${siteConfig.registrationNumber}, registered office: ${siteConfig.address}.`;
}
