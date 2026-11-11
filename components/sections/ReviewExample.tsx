import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ExampleItem { kind: string; place: string; stars: number; review: string; reply: string }

const tone: Record<string, string> = {
  Positive: "bg-emerald-50 text-emerald-800 ring-emerald-200",
  Neutral: "bg-amber-50 text-amber-800 ring-amber-200",
  Negative: "bg-rose-50 text-rose-800 ring-rose-200",
};

export function Stars({ n }: { n: number }) {
  return (
    <span className="inline-flex gap-0.5" role="img" aria-label={`${n} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => <Star key={i} className={cn("h-4 w-4", i <= n ? "fill-amber-400 text-amber-400" : "fill-transparent text-border")} aria-hidden />)}
    </span>
  );
}

/** A made-up review and our reply, always labelled "Example". */
export function ReviewExample({ ex, compact = false }: { ex: ExampleItem; compact?: boolean }) {
  return (
    <article className="surface flex h-full flex-col overflow-hidden">
      <div className="flex items-center justify-between gap-3 border-b bg-muted/60 px-5 py-3">
        <span className={cn("whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ring-1", tone[ex.kind])}>{ex.kind} review</span>
        <span className="whitespace-nowrap rounded-full border bg-background px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground sm:text-xs sm:tracking-wider">Illustrative example</span>
      </div>
      <div className="space-y-4 p-5 sm:p-6">
        <div>
          <div className="flex items-center justify-between gap-3"><Stars n={ex.stars} /><span className="text-xs text-muted-foreground">{ex.place}</span></div>
          <p className={cn("mt-3 text-pretty leading-7 text-foreground/90", compact && "text-sm leading-6")}>&ldquo;{ex.review}&rdquo;</p>
        </div>
        <div className="rounded-xl border border-primary/20 bg-accent/60 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">Our reply</p>
          <p className={cn("mt-2 text-pretty leading-7", compact && "text-sm leading-6")}>{ex.reply}</p>
        </div>
      </div>
    </article>
  );
}
