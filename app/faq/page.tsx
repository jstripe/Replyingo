import Link from "next/link";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHero, Section } from "@/components/layout/Section";
import { FaqList } from "@/components/sections/Faq";
import { Mandatory } from "@/components/sections/Mandatory";
import { JsonLd } from "@/components/json-ld";
import { faqs } from "@/lib/data";
import { breadcrumbLd, faqLd } from "@/lib/seo";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata("Frequently asked questions", "What ReplyBuilt does, how fast we reply, what we need from you, refunds and data safety. We never write fake reviews.", "/faq/");

export default function FaqPage() {
  return (
    <SiteShell>
      <PageHero eyebrow="FAQ" title="Frequently asked questions" sub="Short, honest answers. If yours is not here, write to us." />
      <Section>
        <FaqList />
        <div className="mt-10"><Mandatory /></div>
        <p className="mt-8 text-center text-muted-foreground">Still unsure? <Link href="/contact/" className="font-medium text-primary underline underline-offset-4">Contact us</Link>.</p>
      </Section>
      <JsonLd data={[faqLd(faqs), breadcrumbLd([{ name: "FAQ", path: "/faq/" }])]} />
    </SiteShell>
  );
}
