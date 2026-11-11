import Link from "next/link";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHero, Section } from "@/components/layout/Section";
import { ReviewExample } from "@/components/sections/ReviewExample";
import { Mandatory } from "@/components/sections/Mandatory";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { JsonLd } from "@/components/json-ld";
import { examples } from "@/lib/data";
import { breadcrumbLd } from "@/lib/seo";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata("Examples of review replies", "Three examples of a customer review and the reply we would write: one positive, one neutral and one negative. They are examples, not real customers.", "/examples/");

const principles = [
  { t: "Specific", d: "A good reply mentions what the customer actually wrote, so it never reads like a copy and paste." },
  { t: "Calm and polite", d: "Even when a review is unfair, the reply stays factual and kind, because the next customer reads it too." },
  { t: "Honest", d: "We never promise what you cannot do, and we never argue with a customer in public." },
  { t: "In your voice", d: "We match the tone you tell us: warm and relaxed, or more formal." },
];

export default function ExamplesPage() {
  return (
    <SiteShell>
      <PageHero eyebrow="Examples" title="What our replies look like" sub="Each card below is an example that we wrote for this page. The reviews are made up and are not from real customers." />
      <Section>
        <div className="grid gap-6 lg:grid-cols-3">{examples.map((e) => <ReviewExample key={e.kind} ex={e} />)}</div>
        <div className="mt-10"><Mandatory /></div>
      </Section>
      <Section className="bg-muted/50">
        <h2 className="text-center text-3xl font-semibold">How we write them</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((p) => <div key={p.t} className="surface p-6"><h3 className="text-lg font-semibold">{p.t}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{p.d}</p></div>)}
        </div>
        <p className="mt-8 text-center text-muted-foreground">Want replies like these for your business? <Link href="/pricing/" className="font-medium text-primary underline underline-offset-4">See the offers</Link>.</p>
      </Section>
      <CtaBanner />
      <JsonLd data={breadcrumbLd([{ name: "Examples", path: "/examples/" }])} />
    </SiteShell>
  );
}
