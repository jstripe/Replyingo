import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Media } from "@/components/media";
import { ReviewExample } from "./ReviewExample";
import { examples } from "@/lib/data";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b hero-gradient">
      <div aria-hidden className="grid-bg absolute inset-0" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 pb-16 pt-12 sm:px-6 sm:pt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:pb-24 lg:pt-20">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border bg-background/80 px-3.5 py-1.5 text-xs font-semibold text-primary shadow-sm">For restaurants, salons, hotels, garages and shops</p>
          <h1 className="mt-5 text-balance text-[2.5rem] font-semibold leading-[1.05] sm:text-6xl">Every review answered. <span className="text-gradient">Every customer won back.</span></h1>
          <p className="mt-5 max-w-xl text-pretty text-lg leading-8 text-muted-foreground sm:text-xl">We reply to your real customer reviews on Google, Tripadvisor and Facebook, professionally and in your voice, within 24 to 72 hours. You approve every reply.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg"><Link href="/pricing/">See pricing <ArrowRight className="h-4 w-4" aria-hidden /></Link></Button>
            <Button asChild size="lg" variant="outline" className="bg-background"><Link href="/examples/">See examples</Link></Button>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">One-time payment. No automatic renewal.</p>
        </div>
        <div className="relative">
          <div className="overflow-hidden rounded-3xl border shadow-[0_30px_70px_-30px_rgba(14,22,51,0.45)]">
            <div className="aspect-[4/3] lg:aspect-[6/5]"><Media slug="hero-reviews" alt="A small business worker at a cafe counter writing on a laptop" priority sizes="(min-width: 1024px) 560px, 100vw" className="h-full w-full object-cover" /></div>
          </div>
          <div className="relative mx-auto -mt-16 w-[92%] sm:absolute sm:-bottom-10 sm:-left-10 sm:mt-0 sm:w-[72%]"><ReviewExample ex={examples[0]} compact /></div>
        </div>
      </div>
    </section>
  );
}
