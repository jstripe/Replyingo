import Link from "next/link";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHero, Section, SectionHeading } from "@/components/layout/Section";
import { PricingCards } from "@/components/sections/PricingCards";
import { Mandatory } from "@/components/sections/Mandatory";
import { JsonLd } from "@/components/json-ld";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";
import { eur, offers } from "@/lib/data";
import { breadcrumbLd, serviceLd } from "@/lib/seo";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata("Pricing: review replies and profile optimization", "Five one-time offers from EUR 29 plus a custom quote. Replies to genuine reviews, reply templates and Google Business Profile optimization. No automatic renewal.", "/pricing/");

export default function PricingPage() {
  return (
    <SiteShell>
      <PageHero eyebrow="Pricing" title="Simple one-time prices" sub="Choose an offer, tick the box to accept the Terms and the Refund Policy, and pay by card. Prices are in EUR. Taxes may apply." />
      <Section>
        <div className="mb-10"><Mandatory /></div>
        <PricingCards />
      </Section>
      <Section className="defer bg-muted/50">
        <SectionHeading title="Compare the offers" />
        <p className="mb-2 text-xs text-muted-foreground md:hidden">Swipe sideways to see all columns.</p>
        <div className="overflow-x-auto rounded-2xl border bg-background">
          <Table className="min-w-[760px]">
            <THead><TR><TH>Offer</TH><TH>Price (one-off)</TH><TH>What you get</TH><TH>Delivery</TH></TR></THead>
            <TBody>
              {offers.map((o) => <TR key={o.id}><TD className="font-semibold">{o.name}</TD><TD>{eur(o.price)}</TD><TD>{o.replies}</TD><TD>{o.delivery}</TD></TR>)}
              <TR><TD className="font-semibold">Custom</TD><TD>On quote</TD><TD>Several locations, agencies, other languages</TD><TD>Agreed in the quote</TD></TR>
            </TBody>
          </Table>
        </div>
        <ul className="mx-auto mt-8 max-w-3xl list-disc space-y-2 pl-6 text-muted-foreground marker:text-primary">
          <li>Every offer is paid once. Nothing renews and there is nothing to cancel.</li>
          <li>The 30 days in Reply Starter and Reply Pro start when we begin the work, which is within 48 hours of receiving your details.</li>
          <li>Reply Starter and Reply Pro cover one location. For several locations, <Link href="/quote/" className="text-primary underline underline-offset-4">request a quote</Link>.</li>
          <li>Replies are drafted by us and approved by you before they are published.</li>
          <li>Refunds follow our <Link href="/refund/" className="text-primary underline underline-offset-4">Refund Policy</Link>.</li>
        </ul>
      </Section>
      <JsonLd data={[serviceLd(), breadcrumbLd([{ name: "Pricing", path: "/pricing/" }])]} />
    </SiteShell>
  );
}
