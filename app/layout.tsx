import type { Metadata, Viewport } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site-config";
import { JsonLd } from "@/components/json-ld";
import { organizationLd, websiteLd } from "@/lib/seo";
import { CookieBanner } from "@/components/layout/CookieBanner";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const display = Fraunces({ subsets: ["latin"], variable: "--font-display", display: "swap", axes: ["opsz"] });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: "Replyingo: professional replies to your customer reviews", template: "%s" },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: ["reply to Google reviews", "review response service", "Google Business Profile optimization", "Tripadvisor review replies", "reputation management for small business"],
  authors: [{ name: siteConfig.name }],
  category: "business",
  formatDetection: { telephone: false, email: false, address: false },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  openGraph: { siteName: siteConfig.name, type: "website", locale: "en_US", images: [{ url: "/og.png", width: 1200, height: 630, alt: "Replyingo" }] },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

export const viewport: Viewport = { themeColor: "#ffffff", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable}`}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground">Skip to content</a>
        {children}
        <CookieBanner />
        <JsonLd data={[organizationLd(), websiteLd()]} />
      </body>
    </html>
  );
}
