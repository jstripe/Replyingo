import type { Metadata } from "next";
import { siteConfig } from "./site-config";

/** Title is the page name; the brand is appended: "Pricing | ReplyBuilt". */
export function buildMetadata(title: string, description: string, path = "/", noindex = false): Metadata {
  const url = `${siteConfig.url}${path === "/" ? "/" : path.replace(/\/$/, "") + "/"}`;
  const fullTitle = path === "/" || title.includes(siteConfig.name) ? title : `${title} | ${siteConfig.name}`;
  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    robots: noindex ? { index: false, follow: false } : undefined,
    openGraph: { title: fullTitle, description, url, siteName: siteConfig.name, type: "website", images: [{ url: "/og.png", width: 1200, height: 630, alt: "ReplyBuilt: every review answered, every customer won back" }] },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: ["/og.png"] },
  };
}
