"use client";
import * as React from "react";
import { Check, PenLine } from "lucide-react";
import { Section, SectionHeading } from "@/components/layout/Section";
import { Stars } from "./ReviewExample";
import { examples } from "@/lib/data";

const ex = examples[1];
type Phase = "review" | "drafting" | "reply" | "approved";

/** Animated walk-through of the workflow. Server HTML shows the finished state; animation only runs on screen and never under reduced motion. */
export function ReplyDemo() {
  const ref = React.useRef<HTMLDivElement>(null);
  const [phase, setPhase] = React.useState<Phase>("approved");
  const [chars, setChars] = React.useState(ex.reply.length);

  React.useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer: ReturnType<typeof setTimeout>;
    let running = false;
    const later = (fn: () => void, ms: number) => { timer = setTimeout(fn, ms); };
    const cycle = () => {
      if (!running) return;
      setPhase("review"); setChars(0);
      later(() => {
        setPhase("drafting");
        later(() => {
          setPhase("reply");
          let n = 0;
          const tick = () => {
            if (!running) return;
            n += 3; setChars(Math.min(n, ex.reply.length));
            if (n < ex.reply.length) later(tick, 22);
            else later(() => { setPhase("approved"); later(cycle, 4500); }, 700);
          };
          tick();
        }, 1300);
      }, 1500);
    };
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !running) { running = true; cycle(); }
      else if (!e.isIntersecting && running) { running = false; clearTimeout(timer); setPhase("approved"); setChars(ex.reply.length); }
    }, { threshold: 0.35 });
    io.observe(el);
    return () => { running = false; clearTimeout(timer); io.disconnect(); };
  }, []);

  const showReply = phase === "reply" || phase === "approved";
  return (
    <Section className="defer">
      <SectionHeading eyebrow="How a reply happens" title="Read, draft, approve, publish" sub="A short animation of the steps behind each reply." />
      <div ref={ref} className="mx-auto max-w-3xl">
        <div className="surface overflow-hidden">
          <div className="flex items-center justify-between border-b bg-muted/60 px-5 py-3">
            <span className="text-sm font-semibold">Neutral review</span>
            <span className="rounded-full border bg-background px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Illustrative example</span>
          </div>
          <div className="space-y-5 p-5 sm:p-7">
            <div><Stars n={ex.stars} /><p className="mt-3 leading-7">&ldquo;{ex.review}&rdquo;</p></div>
            <div className="min-h-[11rem] rounded-xl border border-primary/20 bg-accent/60 p-4 sm:min-h-[9rem]">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary"><PenLine className="h-3.5 w-3.5" aria-hidden />{phase === "drafting" ? "We are drafting your reply..." : "Draft reply"}</p>
              {showReply && <p className="mt-2 leading-7" aria-live="off">{ex.reply.slice(0, chars)}{phase === "reply" && <span className="ml-0.5 inline-block h-4 w-px animate-pulse bg-primary align-middle" />}</p>}
            </div>
            <ol className="grid grid-cols-4 gap-2 text-center text-xs font-medium sm:text-sm">
              {([["review", "We read the review"], ["drafting", "We draft the reply"], ["reply", "You read the draft"], ["approved", "You approve it"]] as [Phase, string][]).map(([k, label], i) => {
                const order: Phase[] = ["review", "drafting", "reply", "approved"];
                const on = order.indexOf(phase) >= i;
                return <li key={k} className={"rounded-lg border px-2 py-2 transition-colors " + (on ? "border-primary/40 bg-primary text-primary-foreground" : "bg-background text-muted-foreground")}>{k === "approved" && on && <Check className="mr-1 inline h-3.5 w-3.5" aria-hidden />}{label}</li>;
              })}
            </ol>
          </div>
        </div>
      </div>
    </Section>
  );
}
