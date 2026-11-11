import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqs } from "@/lib/data";

export function FaqList() {
  return (
    <Accordion type="single" collapsible className="mx-auto max-w-3xl">
      {faqs.map((f) => (
        <AccordionItem key={f.q} value={f.q}>
          <AccordionTrigger className="min-h-[56px] text-left text-base font-semibold">{f.q}</AccordionTrigger>
          <AccordionContent className="text-base leading-7 text-muted-foreground">{f.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
