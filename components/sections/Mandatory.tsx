import { ShieldCheck } from "lucide-react";
import { mandatoryText } from "@/lib/site-config";

export function Mandatory() {
  return (
    <div className="mx-auto flex max-w-3xl items-start gap-3 rounded-2xl border border-primary/25 bg-accent/60 p-4 text-sm leading-6 sm:p-5 sm:text-base">
      <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
      <p className="font-medium">{mandatoryText}</p>
    </div>
  );
}
