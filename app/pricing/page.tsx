import Link from "next/link";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHero, Section, SectionHeading } from "@/components/layout/Section";
import { PricingCards } from "@/components/sections/PricingCards";
import { Mandatory } from "@/components/sections/Mandatory";
import { JsonLd } from "@/components/json-ld";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { billingFaqs, eur, offers } from "@/lib/data";
import { breadcrumbLd, faqLd, serviceLd } from "@/lib/seo";
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
      <Section className="defer">
        <SectionHeading eyebrow="Billing" title="Billing questions" />
        <Accordion type="single" collapsible className="mx-auto max-w-3xl">
          {billingFaqs.map((f) => (
            <AccordionItem key={f.q} value={f.q}>
              <AccordionTrigger className="min-h-[56px] text-left text-base font-semibold">{f.q}</AccordionTrigger>
              <AccordionContent className="text-base leading-7 text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>
      <Section className="defer pt-0">
        <div className="surface mx-auto flex max-w-3xl flex-col items-center gap-4 bg-gradient-to-b from-accent/60 to-card p-8 text-center">
          <h2 className="font-display text-2xl font-semibold">Need more than one location, or another language?</h2>
          <p className="text-muted-foreground">Agencies, groups and businesses that need replies in other languages get a custom quote before they pay anything.</p>
          <Button asChild size="lg"><Link href="/quote/">Request a quote</Link></Button>
        </div>
      </Section>
      <JsonLd data={[serviceLd(), faqLd(billingFaqs), breadcrumbLd([{ name: "Pricing", path: "/pricing/" }])]} />
    </SiteShell>
  );
}
