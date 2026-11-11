import { cn } from "@/lib/utils";

export function Section({ id, className, children }: { id?: string; className?: string; children: React.ReactNode }) {
  return <section id={id} className={cn("scroll-mt-24 py-14 sm:py-20 md:py-24", className)}><div className="mx-auto max-w-7xl px-5 sm:px-6">{children}</div></section>;
}

export function SectionHeading({ eyebrow, title, sub, center = true, as: As = "h2" }: { eyebrow?: string; title: string; sub?: string; center?: boolean; as?: "h1" | "h2" }) {
  return (
    <div className={cn("mb-9 max-w-3xl sm:mb-12", center && "mx-auto text-center")}>
      {eyebrow && <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary">{eyebrow}</p>}
      <As className="text-balance text-[1.85rem] font-semibold leading-[1.12] sm:text-4xl md:text-[2.75rem]">{title}</As>
      {sub && <p className="mt-3 text-pretty text-base text-muted-foreground sm:mt-4 sm:text-lg">{sub}</p>}
    </div>
  );
}

/** Top block of an inner page. */
export function PageHero({ eyebrow, title, sub, children }: { eyebrow?: string; title: string; sub?: string; children?: React.ReactNode }) {
  return (
    <section className="relative overflow-hidden border-b hero-gradient">
      <div aria-hidden className="grid-bg absolute inset-0" />
      <div className="relative mx-auto max-w-7xl px-5 pb-12 pt-14 sm:px-6 sm:pb-16 sm:pt-20">
        <div className="max-w-3xl">
          {eyebrow && <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary">{eyebrow}</p>}
          <h1 className="text-balance text-4xl font-semibold leading-[1.08] sm:text-5xl md:text-6xl">{title}</h1>
          {sub && <p className="mt-4 text-pretty text-lg text-muted-foreground sm:text-xl">{sub}</p>}
          {children}
        </div>
      </div>
    </section>
  );
}
