import { SiteShell } from "@/components/layout/SiteShell";
import { PageHero, Section } from "@/components/layout/Section";
import { Media } from "@/components/media";
import { Mandatory } from "@/components/sections/Mandatory";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbLd } from "@/lib/seo";
import { buildMetadata } from "@/lib/metadata";
import { legalNotice, siteConfig } from "@/lib/site-config";

export const metadata = buildMetadata("About Replyingo", "Replyingo is a new online service that writes professional replies to genuine customer reviews for small businesses.", "/about/");

const values = [
  { t: "Genuine reviews only", d: "We never write, buy or sell reviews. We only reply to real ones." },
  { t: "You stay in control", d: "You approve every reply before it is published." },
  { t: "Privacy", d: "We keep only what we need to do the work, and we say exactly what that is." },
  { t: "Fair, simple pricing", d: "One-time prices, shown in full. Nothing renews." },
];

export default function AboutPage() {
  return (
    <SiteShell>
      <PageHero eyebrow="About" title="A calm, careful answer to every review" sub="Replyingo is a new online service for small businesses." />
      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="space-y-5 text-lg leading-8 text-muted-foreground">
            <h2 className="font-display text-3xl font-semibold text-foreground">Why we started</h2>
            <p>Small businesses live on their reputation, and reviews are where customers read it. Many people who run a business know they should answer each one, but between the customers, the staff and the suppliers the replies wait, and sometimes never get written. A review left unanswered says that nobody is listening.</p>
            <p>Replyingo exists to take that job off your plate. We read your genuine reviews, write professional replies in your tone, and you approve each one. We can also tidy up your Google Business Profile so that new customers see an accurate, complete listing. Everything is done online, and we are a new company with a deliberately small, clear offer.</p>
          </div>
          <div className="overflow-hidden rounded-3xl border shadow-lg"><div className="aspect-[4/3]"><Media slug="about-desk" alt="A person writing on a laptop at a desk" sizes="(min-width: 1024px) 560px, 100vw" className="h-full w-full object-cover" /></div></div>
        </div>
      </Section>
      <Section className="bg-muted/50">
        <h2 className="text-center font-display text-3xl font-semibold">Our principles</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{values.map((v) => <div key={v.t} className="surface p-6"><h3 className="text-lg font-semibold">{v.t}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{v.d}</p></div>)}</div>
        <div className="mt-10"><Mandatory /></div>
      </Section>
      <Section>
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-3xl font-semibold">Company and contact</h2>
          <p className="mt-4 text-muted-foreground">{legalNotice()}</p>
          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="surface p-5"><dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Company</dt><dd className="mt-1 font-medium">{siteConfig.legalEntity}</dd><dd className="text-sm text-muted-foreground">Registration no. {siteConfig.registrationNumber}</dd></div>
            <div className="surface p-5"><dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Address</dt><dd className="mt-1 font-medium">{siteConfig.address}</dd></div>
            <div className="surface p-5"><dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</dt><dd className="mt-1 font-medium"><a className="text-primary underline underline-offset-4" href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a></dd></div>
            <div className="surface p-5"><dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Phone</dt><dd className="mt-1 font-medium">{siteConfig.phone}</dd></div>
          </dl>
        </div>
      </Section>
      <CtaBanner />
      <JsonLd data={breadcrumbLd([{ name: "About", path: "/about/" }])} />
    </SiteShell>
  );
}
