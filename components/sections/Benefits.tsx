import { Icon } from "@/components/Icon";
import { Section, SectionHeading } from "@/components/layout/Section";
import { audiences, benefits } from "@/lib/data";
import { Media } from "@/components/media";

export function BuiltFor() {
  return (
    <div className="border-b bg-background">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-5 py-6 sm:px-6 md:flex-row md:justify-between">
        <p className="text-sm font-medium text-muted-foreground">Built for small businesses</p>
        <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3">
          {audiences.map((a) => <li key={a.label} className="flex items-center gap-2 text-sm font-medium"><Icon name={a.icon} className="h-4 w-4 text-primary" />{a.label}</li>)}
        </ul>
      </div>
    </div>
  );
}

export function Benefits() {
  return (
    <Section>
      <SectionHeading eyebrow="Why Replyingo" title="A reply is the answer your customers read" sub="Most people check the reviews and how the business answers them before they choose. We make sure the answer is there, and that it is good." />
      <div className="grid gap-5 md:grid-cols-3">
        {benefits.map((b) => (
          <div key={b.title} className="surface surface-hover p-7">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-primary"><Icon name={b.icon} className="h-6 w-6" /></span>
            <h3 className="mt-5 text-xl font-semibold">{b.title}</h3>
            <p className="mt-2 leading-7 text-muted-foreground">{b.text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

const tiles = [
  { slug: "aud-restaurant", title: "Restaurants and cafes", text: "Thank the guest who loved the evening. Take the late order seriously." },
  { slug: "aud-salon", title: "Salons and barbers", text: "Answer the review about the wait and the one about the color, in the same warm voice." },
  { slug: "aud-shop", title: "Shops and local services", text: "Hotels, garages and shops get replies that sound like the people who run them." },
];

export function UseCases() {
  return (
    <Section className="defer">
      <SectionHeading eyebrow="Who it is for" title="Local businesses that live on their reputation" />
      <div className="grid gap-5 md:grid-cols-3">
        {tiles.map((t) => (
          <figure key={t.slug} className="surface overflow-hidden">
            <div className="aspect-[4/3] overflow-hidden"><Media slug={t.slug} alt={t.title} sizes="(min-width: 768px) 33vw, 100vw" className="h-full w-full object-cover" /></div>
            <figcaption className="p-6"><h3 className="text-lg font-semibold">{t.title}</h3><p className="mt-1.5 text-sm leading-6 text-muted-foreground">{t.text}</p></figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
