import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHero, Section } from "@/components/layout/Section";
import { ContactForm } from "@/components/pages/Forms";
import { Media } from "@/components/media";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbLd } from "@/lib/seo";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

export const metadata = buildMetadata("Contact", "Write to Replyingo: contact form, email, phone, address and opening hours. We answer within 3 business days.", "/contact/");

export default function ContactPage() {
  const cards = [
    { Icon: Mail, t: "Email", d: <a className="text-primary underline underline-offset-4" href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a> },
    { Icon: Phone, t: "Phone", d: siteConfig.phone },
    { Icon: MapPin, t: "Address", d: siteConfig.address },
    { Icon: Clock, t: "Opening hours", d: <>{siteConfig.hours}. {siteConfig.hoursNote}</> },
  ];
  return (
    <SiteShell>
      <PageHero eyebrow="Contact" title="Talk to us" sub="Questions before buying, help with an order or a refund request: write to us and we answer within 3 business days." />
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <ContactForm />
          <div className="space-y-4">
            {cards.map(({ Icon, t, d }) => (
              <div key={t} className="surface flex gap-4 p-5"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-primary"><Icon className="h-5 w-5" aria-hidden /></span><div><p className="font-semibold">{t}</p><p className="mt-0.5 text-sm text-muted-foreground">{d}</p></div></div>
            ))}
            <p className="px-1 text-sm text-muted-foreground">{siteConfig.legalEntity}, registration no. {siteConfig.registrationNumber}.</p>
            <div className="overflow-hidden rounded-2xl border"><div className="aspect-[16/10]"><Media slug="contact-desk" alt="A person typing on a laptop at a counter" sizes="(min-width: 1024px) 420px, 100vw" className="h-full w-full object-cover" /></div></div>
          </div>
        </div>
      </Section>
      <JsonLd data={breadcrumbLd([{ name: "Contact", path: "/contact/" }])} />
    </SiteShell>
  );
}
