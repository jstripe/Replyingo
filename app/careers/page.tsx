import Link from "next/link";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHero, Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbLd } from "@/lib/seo";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

export const metadata = buildMetadata("Careers", "There are no open roles at ReplyBuilt right now. You can still get in touch.", "/careers/");

export default function CareersPage() {
  return (
    <SiteShell>
      <PageHero eyebrow="Careers" title="There are no open roles right now" sub="ReplyBuilt is a new company and we are not hiring at the moment." />
      <Section>
        <div className="mx-auto max-w-2xl space-y-5 text-lg leading-8 text-muted-foreground">
          <p>If you write well and care about how small businesses talk to their customers, you are welcome to introduce yourself. We keep messages on file only as long as the Privacy Policy says, and we will write back if a role opens that fits.</p>
          <p>Write to <a className="text-primary underline underline-offset-4" href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a> or use the contact page.</p>
          <Button asChild size="lg"><Link href="/contact/">Contact us</Link></Button>
        </div>
      </Section>
      <JsonLd data={breadcrumbLd([{ name: "Careers", path: "/careers/" }])} />
    </SiteShell>
  );
}
