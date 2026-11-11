import { marqueeRows } from "@/lib/data";
import { Section, SectionHeading } from "@/components/layout/Section";

/** Two rows that scroll in opposite directions: the kinds of businesses and reviews we reply to. Pauses on hover, static under reduced motion. */
export function Marquee() {
  return (
    <Section className="defer overflow-hidden bg-muted/50">
      <SectionHeading eyebrow="What we reply to" title="From praise to complaints, every review gets an answer" sub="The kinds of businesses we work for and the kinds of reviews we answer." />
      <div className="-mx-5 space-y-4 sm:-mx-6" aria-label="Examples of businesses and review topics">
        {marqueeRows.map((row, i) => (
          <div key={i} className="marquee-wrap overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
            <div className={"marquee gap-3 " + (i % 2 ? "marquee-rev" : "")} style={{ ["--dur" as string]: i % 2 ? "60s" : "50s" }}>
              {[0, 1].map((dup) => (
                <ul key={dup} className="flex shrink-0 gap-3 pr-3" aria-hidden={dup === 1}>
                  {row.map((t) => <li key={t} className="whitespace-nowrap rounded-full border bg-background px-5 py-2.5 text-sm font-medium shadow-sm">{t}</li>)}
                </ul>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
