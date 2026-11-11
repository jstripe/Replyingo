import { Section, SectionHeading } from "@/components/layout/Section";
import { steps } from "@/lib/data";

export function HowItWorks() {
  return (
    <Section id="how-it-works" className="bg-muted/50">
      <SectionHeading eyebrow="How it works" title="From payment to published reply in four steps" />
      <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <li key={s.title} className="surface p-6">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-display text-lg font-semibold text-primary-foreground">{i + 1}</span>
            <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{s.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
