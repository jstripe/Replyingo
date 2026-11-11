import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { Button } from "@/components/ui/button";

export const metadata = { title: "Page not found | Replyingo", robots: { index: false, follow: false } };

export default function NotFound() {
  return (
    <SiteShell>
      <section className="px-5 pb-24 pt-24 sm:pt-32">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Error 404</p>
          <p aria-hidden className="text-gradient mt-4 font-display text-[7rem] font-semibold leading-none sm:text-[9rem]">404</p>
          <h1 className="mt-4 text-2xl font-semibold sm:text-3xl">We could not find that page</h1>
          <p className="mx-auto mt-3 max-w-md text-muted-foreground">It may have moved, or the link may be wrong. These pages should help.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button asChild size="lg"><Link href="/">Back to home <ArrowRight className="h-4 w-4" aria-hidden /></Link></Button>
            <Button asChild size="lg" variant="outline"><Link href="/pricing/">See pricing</Link></Button>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
