import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/layout/Section";
import { eur, offers } from "@/lib/data";

export function CtaBanner() {
  const from = Math.min(...offers.map((o) => o.price));
  return (
    <Section className="pt-0">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1B3FAE] to-[#0B1F6B] px-6 py-12 text-center text-white sm:px-12 sm:py-16">
        <div aria-hidden className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
        <h2 className="relative mx-auto max-w-2xl text-balance text-3xl font-semibold sm:text-4xl">Ready to answer every review?</h2>
        <p className="relative mx-auto mt-3 max-w-xl text-white/80">Offers start at {eur(from)}. One-time payment, no automatic renewal.</p>
        <div className="relative mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" variant="secondary" className="bg-white text-[#0B1F6B] hover:bg-white"><Link href="/pricing/">See pricing <ArrowRight className="h-4 w-4" aria-hidden /></Link></Button>
          <Button asChild size="lg" variant="outline" className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"><Link href="/examples/">See examples</Link></Button>
        </div>
      </div>
    </Section>
  );
}
