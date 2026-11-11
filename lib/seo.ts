import { siteConfig } from "./site-config";
import { offers } from "./data";
import { OFFER_CATALOG } from "./api-types";

const url = siteConfig.url;
const sameAs = () => Object.entries(siteConfig.social).filter(([k]) => siteConfig.socialLive[k]).map(([, v]) => v);

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${url}/#organization`,
    name: siteConfig.name,
    legalName: siteConfig.legalEntity,
    url,
    logo: `${url}/icon-512.png`,
    email: siteConfig.contactEmail,
    identifier: siteConfig.registrationNumber,
    address: { "@type": "PostalAddress", streetAddress: siteConfig.address },
    contactPoint: [{ "@type": "ContactPoint", contactType: "customer support", email: siteConfig.contactEmail, availableLanguage: ["English"] }],
    ...(sameAs().length ? { sameAs: sameAs() } : {}),
  };
}

export function websiteLd() {
  return { "@context": "https://schema.org", "@type": "WebSite", "@id": `${url}/#website`, url, name: siteConfig.name, description: siteConfig.description, publisher: { "@id": `${url}/#organization` }, inLanguage: "en" };
}

/** The service with one one-time Offer per fixed offer. */
export function serviceLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Review replies and Google Business Profile optimization",
    serviceType: "Online reputation management for small businesses",
    description: siteConfig.description,
    provider: { "@id": `${url}/#organization` },
    areaServed: "Worldwide",
    offers: offers.map((o) => ({
      "@type": "Offer",
      name: o.name,
      price: (OFFER_CATALOG[o.id].amountCents / 100).toFixed(2),
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: `${url}/pricing/`,
      description: `One-time payment. ${o.highlights.join(". ")}.`,
    })),
  };
}

const plain = (s: string) => s.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
export function faqLd(items: readonly { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: plain(i.a) } })),
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: `${url}${it.path === "/" ? "/" : it.path.replace(/\/$/, "") + "/"}` })),
  };
}
