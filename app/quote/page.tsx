import { SiteShell } from "@/components/layout/SiteShell";
import { PageHero, Section } from "@/components/layout/Section";
import { QuoteForm } from "@/components/pages/Forms";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbLd } from "@/lib/seo";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata("Request a quote", "Several locations, agencies or replies in other languages? Tell us what you need and we reply with a price and a timeline.", "/quote/");

export default function QuotePage() {
  return (
    <SiteShell>
      <PageHero eyebrow="Custom offer" title="Request a quote" sub="For several locations, agencies and other languages. Tell us what you need and we reply by email with a price and a timeline. There is no payment on this page." />
      <Section><div className="mx-auto max-w-3xl"><QuoteForm /></div></Section>
      <JsonLd data={breadcrumbLd([{ name: "Request a quote", path: "/quote/" }])} />
    </SiteShell>
  );
}
