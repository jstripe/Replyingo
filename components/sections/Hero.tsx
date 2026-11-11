import Link from "next/link";
import { ArrowRight, CheckCheck, PenLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Media } from "@/components/media";
import { ReviewExample } from "./ReviewExample";
import { examples } from "@/lib/data";

/**
 * Right side is a stacked composition: the photo keeps its own space (subject fully visible),
 * the example card overlaps only its empty bottom edge, and two small status pills sit on the plain wall.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden border-b hero-gradient">
      <div aria-hidden className="grid-bg absolute inset-0" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 pt-10 sm:px-6 sm:pt-14 lg:grid-cols-[1fr_1.08fr] lg:gap-14 lg:pb-20 lg:pt-14">
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
          <div aria-hidden className="absolute -inset-6 -z-0 rounded-[2.5rem] bg-gradient-to-br from-primary/15 via-transparent to-primary/10 blur-2xl" />
          <div className="relative overflow-hidden rounded-3xl border bg-background p-1.5 shadow-[0_30px_70px_-30px_rgba(14,22,51,0.45)]">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem]">
              <Media slug="hero-reviews" alt="A small business worker at a cafe counter writing on a laptop" priority sizes="(min-width: 1024px) 620px, 100vw" className="h-full w-full object-cover object-[50%_28%]" />
              <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/25 to-transparent" />
              <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-background/95 px-3 py-1.5 text-xs font-semibold shadow-md sm:left-5 sm:top-5"><PenLine className="h-3.5 w-3.5 text-primary" aria-hidden />Draft reply ready</span>
              <span className="absolute right-3 top-3 hidden items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-md sm:inline-flex sm:right-5 sm:top-5"><CheckCheck className="h-3.5 w-3.5" aria-hidden />You approve it</span>
            </div>
          </div>
          <div className="relative z-10 mx-auto -mt-12 w-[94%] sm:-mt-16 sm:w-[88%] lg:ml-auto lg:mr-4 lg:w-[84%]">
            <ReviewExample ex={examples[0]} compact />
          </div>
        </div>
      </div>
    </section>
  );
}
