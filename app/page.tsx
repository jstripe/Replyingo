import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { Section, SectionHeading } from "@/components/layout/Section";
import { Hero } from "@/components/sections/Hero";
import { Benefits, BuiltFor, UseCases } from "@/components/sections/Benefits";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { PricingCards } from "@/components/sections/PricingCards";
import { ReviewExample } from "@/components/sections/ReviewExample";
import { FaqList } from "@/components/sections/Faq";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Marquee } from "@/components/sections/Marquee";
import { ReplyDemo } from "@/components/sections/ReplyDemo";
import { Mandatory } from "@/components/sections/Mandatory";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/json-ld";
import { examples, faqs } from "@/lib/data";
import { faqLd, serviceLd } from "@/lib/seo";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata(
  "ReplyBuilt: professional replies to your genuine customer reviews",
  "We write professional replies to the genuine reviews your business gets on Google, Tripadvisor and Facebook, and optimize your Google Business Profile. One-time offers from EUR 29.",
  "/",
);

export default function HomePage() {
  return (
    <SiteShell>
      <Hero />
      <BuiltFor />
      <Benefits />
      <HowItWorks />
      <Section id="pricing" className="defer">
        <SectionHeading eyebrow="Pricing" title="Five offers and a custom option" sub="Pay once for exactly what you need. Nothing renews." />
        <PricingCards />
        <div className="mt-10"><Mandatory /></div>
      </Section>
      <Section className="defer bg-muted/50">
        <SectionHeading eyebrow="Examples" title="What a good reply sounds like" sub="Three made-up reviews and the replies we would write. They are examples, not real customers." />
        <div className="grid gap-5 lg:grid-cols-3">{examples.map((e) => <ReviewExample key={e.kind} ex={e} compact />)}</div>
        <div className="mt-8 text-center"><Button asChild variant="outline" size="lg" className="bg-background"><Link href="/examples/">More about our replies <ArrowRight className="h-4 w-4" aria-hidden /></Link></Button></div>
      </Section>
      <ReplyDemo />
      <UseCases />
      <Marquee />
      <Section id="faq" className="defer">
        <SectionHeading eyebrow="FAQ" title="Questions before you buy" />
        <FaqList />
      </Section>
      <CtaBanner />
      <JsonLd data={[serviceLd(), faqLd(faqs)]} />
    </SiteShell>
  );
}
