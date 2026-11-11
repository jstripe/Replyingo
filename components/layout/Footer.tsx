import Link from "next/link";
import { ArrowUp, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { footerColumns } from "@/lib/data";
import { legalNotice, siteConfig } from "@/lib/site-config";

const socials = [
  { key: "x", href: siteConfig.social.x, label: "X", Icon: Twitter },
  { key: "instagram", href: siteConfig.social.instagram, label: "Instagram", Icon: Instagram },
  { key: "linkedin", href: siteConfig.social.linkedin, label: "LinkedIn", Icon: Linkedin },
  { key: "facebook", href: siteConfig.social.facebook, label: "Facebook", Icon: Facebook },
].filter((s) => siteConfig.socialLive[s.key]);

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="mx-auto max-w-7xl px-5 pb-[max(2rem,env(safe-area-inset-bottom))] pt-12 sm:px-6 sm:pt-16">
        <div className="grid gap-10 sm:gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-sm font-display text-2xl leading-snug">Every review answered. <em className="text-primary">Every customer won back.</em></p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button asChild size="sm" className="min-h-11"><Link href="/pricing/">See pricing</Link></Button>
              <Button asChild size="sm" variant="outline" className="min-h-11"><Link href="/contact/">Contact us</Link></Button>
            </div>
            <dl className="mt-6 space-y-1 text-sm text-muted-foreground">
              <div><dt className="sr-only">Email</dt><dd><a href={`mailto:${siteConfig.contactEmail}`} className="underline-offset-4 hover:text-foreground hover:underline">{siteConfig.contactEmail}</a></dd></div>
              <div><dt className="sr-only">Phone</dt><dd>{siteConfig.phone}</dd></div>
            </dl>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3">
            {footerColumns.map((c) => (
              <div key={c.title}>
                <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-foreground">{c.title}</h2>
                <ul className="mt-3 space-y-0.5 sm:mt-4">
                  {c.links.map((l) => (
                    <li key={l.label}><Link href={l.href} className="inline-flex min-h-[44px] items-center text-sm text-muted-foreground transition-colors hover:text-foreground sm:min-h-0 sm:py-1.5">{l.label}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-5 border-t pt-6 text-xs leading-relaxed text-muted-foreground md:flex-row md:items-start md:justify-between">
          <div className="flex gap-3 md:order-last">
            {socials.map(({ href, label, Icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="flex h-11 w-11 items-center justify-center rounded-full border text-muted-foreground transition-colors hover:border-primary hover:text-primary"><Icon className="h-4 w-4" /></a>
            ))}
            <a href="#main" className="inline-flex min-h-[44px] items-center gap-2 font-medium text-foreground hover:text-primary">Back to top <span className="flex h-11 w-11 items-center justify-center rounded-full border"><ArrowUp className="h-4 w-4" aria-hidden /></span></a>
          </div>
          <div className="max-w-3xl space-y-1.5">
            <p>&copy; {new Date().getFullYear()} {siteConfig.legalEntity}. All rights reserved.</p>
            <p>{legalNotice()}</p>
            <p>{siteConfig.name} is a product of {siteConfig.legalEntity}, {siteConfig.legalForm}. Registration no. {siteConfig.registrationNumber}. Registered office: {siteConfig.address}. Email: {siteConfig.contactEmail}. Phone: {siteConfig.phone}.</p>
            <p>ReplyBuilt never writes, buys or sells reviews. Photos by Pexels contributors.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
