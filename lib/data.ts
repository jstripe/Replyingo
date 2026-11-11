import { OFFER_CATALOG, OFFER_ORDER, type OfferId } from "./api-types";

export interface Offer {
  id: OfferId;
  name: string;
  price: number;
  blurb: string;
  highlights: string[];
  delivery: string;
  popular?: boolean;
  /** For JSON-LD and the comparison table */
  replies?: string;
  turnaround: string;
}

export const offers: Offer[] = [
  {
    id: "starter", name: OFFER_CATALOG.starter.name, price: OFFER_CATALOG.starter.amountCents / 100,
    blurb: "For a business that wants every new review answered without spending the evening on it.",
    highlights: ["Up to 15 review replies over 30 days", "1 location", "Replies within 72 hours", "Google, Tripadvisor and Facebook"],
    delivery: "Replies within 72 hours", replies: "Up to 15 replies in 30 days", turnaround: "72 hours",
  },
  {
    id: "pro", name: OFFER_CATALOG.pro.name, price: OFFER_CATALOG.pro.amountCents / 100, popular: true,
    blurb: "For a busy location with a steady flow of reviews that need a fast, careful answer.",
    highlights: ["Up to 40 review replies over 30 days", "1 location", "Replies within 24 hours", "Google, Tripadvisor and Facebook"],
    delivery: "Replies within 24 hours", replies: "Up to 40 replies in 30 days", turnaround: "24 hours",
  },
  {
    id: "templates", name: OFFER_CATALOG.templates.name, price: OFFER_CATALOG.templates.amountCents / 100,
    blurb: "Reply on your own, in your own voice, with a set of ready-to-use answers.",
    highlights: ["20 reply templates", "Written in your brand voice", "Positive, neutral and negative reviews", "Delivered in 3 business days"],
    delivery: "Delivered in 3 business days", replies: "20 templates", turnaround: "3 business days",
  },
  {
    id: "profile", name: OFFER_CATALOG.profile.name, price: OFFER_CATALOG.profile.amountCents / 100,
    blurb: "A complete, accurate Google Business Profile that says clearly what you do.",
    highlights: ["Business description", "Categories and services", "Opening hours", "Photo checklist", "Delivered in 3 business days"],
    delivery: "Delivered in 3 business days", replies: "Profile text and checklist", turnaround: "3 business days",
  },
  {
    id: "visibility", name: OFFER_CATALOG.visibility.name, price: OFFER_CATALOG.visibility.amountCents / 100,
    blurb: "Everything together: a better profile, 30 days of replies and templates for later.",
    highlights: ["Google Profile Optimization", "30 days of Reply Pro", "20 reply templates", "Delivered in 5 business days"],
    delivery: "Delivered in 5 business days", replies: "Profile + 30 days of Reply Pro + 20 templates", turnaround: "5 business days",
  },
];

export const offerById = (id: string) => offers.find((o) => o.id === id);
export const offerOptions = OFFER_ORDER.map((id) => ({ id, name: OFFER_CATALOG[id].name }));
export const eur = (n: number) => `€${n}`;

export const customOffer = {
  name: "Custom",
  blurb: "For more than one location, agencies and other languages.",
  highlights: ["Several locations", "Agencies and resellers", "Replies in other languages", "A price agreed before you pay"],
};

export const benefits = [
  { icon: "clock", title: "Save time", text: "You run the business. We read each review and write the answer, so a new review never waits for a free evening." },
  { icon: "shield", title: "Protect your reputation", text: "Every public review gets a calm, professional and specific reply, so people reading your profile see a business that listens." },
  { icon: "heart", title: "Win back unhappy customers", text: "A good reply to a bad review shows the customer, and everyone reading, that you take the problem seriously and want to put it right." },
] as const;

export const steps = [
  { title: "Choose an offer", text: "Pick the offer that fits your business on the pricing page." },
  { title: "Pay securely", text: "Pay by card through Airwallex. One-off payment, nothing renews." },
  { title: "Send us your details", text: "After paying, you land on a short form: business, contact, your Google profile link and your payment reference." },
  { title: `We start within 48 hours`, text: "We read your reviews, learn your tone and send you drafts to approve." },
] as const;

export const audiences = [
  { icon: "utensils", label: "Restaurants" },
  { icon: "scissors", label: "Salons" },
  { icon: "bed", label: "Hotels" },
  { icon: "wrench", label: "Garages" },
  { icon: "store", label: "Shops" },
] as const;

export const examples = [
  {
    kind: "Positive", place: "Restaurant", stars: 5,
    review: "We booked a table for my mother's birthday and the evening was perfect. The staff brought a small dessert with a candle without us asking, and the fish was cooked exactly right.",
    reply: "Thank you for choosing us for your mother's birthday. We are delighted the evening felt special, and your kind words about the fish and the dessert will be shared with the kitchen and the team. We hope to welcome you all back soon.",
  },
  {
    kind: "Neutral", place: "Hair salon", stars: 3,
    review: "The cut itself was good and the stylist listened to what I wanted. I waited around 25 minutes past my appointment time though, and nobody told me why.",
    reply: "Thank you for your honest feedback. We are glad you liked the cut and that you felt listened to. You should not have waited 25 minutes without an explanation, and we are sorry. We have reminded the team to tell clients when we run late. We would be happy to see you again.",
  },
  {
    kind: "Negative", place: "Garage", stars: 1,
    review: "My car was supposed to be ready on Friday. I called twice and only got a call back on Monday. Nobody explained the delay and I had to organise a rental.",
    reply: "We are sorry about the delay and about the calls that went unanswered. A repair that runs late should always come with a clear explanation, and you did not get one. We would like to understand what happened and make it right. Please contact us at the address shown on our Google profile so we can look at your file together.",
  },
] as const;

export const faqs = [
  { q: "What exactly do you do?", a: "We write professional replies to the genuine reviews your business receives on Google, Tripadvisor and Facebook. We also write reply templates in your brand voice and we optimize your Google Business Profile (description, categories, services, hours and a photo checklist). It is a 100% online service. Nothing is shipped to you." },
  { q: "Do you write fake reviews?", a: "No, never. ReplyBuilt never writes, buys or sells reviews. We only reply to genuine reviews on behalf of our clients, with their approval." },
  { q: "How fast do you reply?", a: "It depends on the offer. Reply Pro replies within 24 hours and Reply Starter within 72 hours. Reply templates and the profile work are delivered in 3 business days, and the Local Visibility Pack in 5 business days. We start within 48 hours of receiving your details." },
  { q: "What do you need from me?", a: "After you pay, we ask for your business name, a contact name, your email and phone, the link to your Google profile, the offer you bought and your payment reference. It also helps if you tell us about your tone of voice, words to avoid and how you like to handle complaints. You approve each reply before it is published." },
  { q: "Can I get a refund?", a: "Yes, in the cases set out in our Refund Policy. In short: a full refund if you ask before the work starts, no refund once the work is delivered, and a pro-rata refund if we fail to deliver what you bought. Write to us and we answer within 3 business days. Refunds are processed within 10 business days." },
  { q: "Is my data safe?", a: "We collect only what we need to do the work: the details you send us and the messages you write. Our site runs on Cloudflare and card payments are handled by Airwallex, so we never see or store your card number. Read the Privacy Policy for the full list of what we keep and for how long." },
] as const;

export const navLinks = [
  { label: "Pricing", href: "/pricing/" },
  { label: "Examples", href: "/examples/" },
  { label: "FAQ", href: "/faq/" },
  { label: "About", href: "/about/" },
  { label: "Contact", href: "/contact/" },
];

export const footerColumns = [
  { title: "Services", links: [{ label: "Pricing", href: "/pricing/" }, { label: "Examples", href: "/examples/" }, { label: "Request a quote", href: "/quote/" }, { label: "FAQ", href: "/faq/" }] },
  { title: "Company", links: [{ label: "About", href: "/about/" }, { label: "Careers", href: "/careers/" }, { label: "Contact", href: "/contact/" }, { label: "After payment", href: "/thank-you/" }] },
  { title: "Legal", links: [
    { label: "Legal Notice", href: "/legal-notice/" }, { label: "Terms of Service", href: "/terms/" }, { label: "Refund Policy", href: "/refund/" },
    { label: "Privacy Policy", href: "/privacy/" }, { label: "Security", href: "/security/" }, { label: "Cookie Policy", href: "/cookies/" },
  ] },
];

export const SELECT_LOCATIONS = ["2 to 5", "6 to 20", "More than 20"] as const;

export const billingFaqs = [
  { q: "Does anything renew automatically?", a: "No. Every offer is a one-off payment. Nothing renews automatically and there is nothing to cancel." },
  { q: "Can I buy more than one offer?", a: "Yes. Each purchase is separate. For example you can buy the Google Profile Optimization now and Reply Pro later. For several locations, request a quote." },
  { q: "When do the 30 days start?", a: "In Reply Starter and Reply Pro, the 30 days start when we begin the work, which is within 48 hours of receiving your details. Replies you do not use in that period are not carried over." },
  { q: "Which payment methods can I use?", a: "You pay by card on a secure Airwallex page. Airwallex shows the card options available for your payment." },
  { q: "Can I get a refund?", a: "Yes, as set out in the Refund Policy: a full refund if you ask before the work starts, no refund once the work is delivered, and a pro-rata refund if we fail to deliver what you bought." },
  { q: "Are prices final?", a: "Prices are in EUR. Taxes may apply depending on where your business is located, and are shown on the payment page if they do." },
] as const;

export const marqueeRows = [
  ["Restaurants", "A table for two that went wrong", "Praise for the kitchen", "Hotels", "A noisy room", "Thank you for the warm welcome", "Garages", "A repair that took longer", "Shops", "A product that arrived late"],
  ["Salons", "A colour that came out perfectly", "A long wait for an appointment", "Cafes", "Friendly staff", "A billing mistake", "Barbers", "A booking mix-up", "Local services", "A five-star thank you"],
] as const;
