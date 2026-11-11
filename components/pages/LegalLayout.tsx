import Link from "next/link";
import { SiteShell } from "@/components/layout/SiteShell";
import { Table, THead, TBody, TR, TH, TD } from "@/components/ui/table";
import { legalNotice, siteConfig } from "@/lib/site-config";

export const LEGAL_LAST_UPDATED = "9 November 2026";

export type LegalSection = { id: string; title: string; body: React.ReactNode };

export function LegalLayout({ title, intro, sections }: { title: string; intro: string; sections: LegalSection[] }) {
  return (
    <SiteShell>
      <div className="mx-auto max-w-3xl px-5 py-12 sm:px-6 md:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Legal</p>
        <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">{title}</h1>
        <p className="mt-4 text-base text-muted-foreground sm:text-lg">{intro}</p>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: {LEGAL_LAST_UPDATED}</p>
        <div className="mt-6 rounded-2xl border border-primary/25 bg-accent/60 p-4 text-sm leading-6 sm:p-5">{legalNotice()}</div>
        <nav aria-label="Contents" className="mt-8 rounded-2xl border bg-muted/50 p-5">
          <p className="font-display text-base font-semibold">Contents</p>
          <ol className="mt-3 grid gap-x-6 gap-y-1 text-sm sm:grid-cols-2">
            {sections.map((s, i) => (
              <li key={s.id}><a href={`#${s.id}`} className="inline-flex min-h-[44px] items-center text-muted-foreground hover:text-primary hover:underline">{i + 1}. {s.title}</a></li>
            ))}
          </ol>
        </nav>
        <div className="mt-10 space-y-5 break-words text-base leading-7">
          {sections.map((s, i) => (
            <section key={s.id} id={s.id} className="scroll-mt-24 space-y-5">
              <h2 className="!mt-10 text-2xl font-semibold">{i + 1}. {s.title}</h2>
              {s.body}
            </section>
          ))}
        </div>
        <div className="mt-12 rounded-2xl border p-5 text-sm text-muted-foreground">
          <p className="font-display text-base font-semibold text-foreground">Contact</p>
          <p className="mt-2">{siteConfig.legalEntity}, {siteConfig.address}. Registration no. {siteConfig.registrationNumber}.</p>
          <p className="mt-1">Email: <Mail /> or use the <Link className="text-primary underline underline-offset-4" href="/contact/">contact page</Link>. Phone: {siteConfig.phone}. Opening hours: {siteConfig.hours}.</p>
        </div>
      </div>
    </SiteShell>
  );
}

export const LH3 = ({ children }: { children: React.ReactNode }) => <h3 className="!mt-6 text-lg font-semibold">{children}</h3>;
export const LP = ({ children }: { children: React.ReactNode }) => <p className="text-foreground/90">{children}</p>;
export const LUL = ({ children }: { children: React.ReactNode }) => <ul className="list-disc space-y-2 pl-6 text-foreground/90 marker:text-primary">{children}</ul>;
export const LLink = ({ href, children }: { href: string; children: React.ReactNode }) => <Link href={href} className="text-primary underline underline-offset-4">{children}</Link>;
export const Mail = () => <a className="text-primary underline underline-offset-4" href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>;

export function SimpleTable({ head, rows }: { head: string[]; rows: React.ReactNode[][] }) {
  return (
    <div>
      <p className="mb-2 text-xs text-muted-foreground md:hidden">Swipe sideways to see all columns.</p>
      <div className="overflow-x-auto rounded-xl border">
        <Table className="min-w-[640px]">
          <THead><TR>{head.map((h) => <TH key={h}>{h}</TH>)}</TR></THead>
          <TBody>{rows.map((r, i) => <TR key={i}>{r.map((c, j) => <TD key={j} className={j === 0 ? "align-top font-medium" : "align-top"}>{c}</TD>)}</TR>)}</TBody>
        </Table>
      </div>
    </div>
  );
}

export function SubProcessorTable() {
  return <SimpleTable head={["Provider", "Purpose", "Location", "Transfer safeguard"]} rows={siteConfig.subProcessors.map((s) => [s.name, s.purpose, s.location, s.safeguard])} />;
}
