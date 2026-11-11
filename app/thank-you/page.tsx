import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { Section } from "@/components/layout/Section";
import { IntakeForm } from "@/components/pages/Forms";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

export const metadata = buildMetadata("Thank you: send us your details", "Send Replyingo your business details after your payment so we can start.", "/thank-you/", true);

export default function ThankYouPage() {
  return (
    <SiteShell>
      <Section className="pb-8">
        <div className="mx-auto max-w-3xl text-center">
          <CheckCircle2 className="mx-auto h-12 w-12 text-primary" aria-hidden />
          <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">Thank you for your order</h1>
          <p className="mt-4 text-lg text-muted-foreground">One last step: tell us about your business so we can begin. We start within {siteConfig.startWithinHours} hours of receiving your details.</p>
          <p className="mt-2 text-sm text-muted-foreground">Have not paid yet? See the <Link href="/pricing/" className="text-primary underline underline-offset-4">pricing page</Link>.</p>
        </div>
      </Section>
      <Section className="pt-0"><div className="mx-auto max-w-3xl"><IntakeForm /></div></Section>
    </SiteShell>
  );
}
