import { Bed, Clock, Heart, Scissors, ShieldCheck, Store, Utensils, Wrench, type LucideIcon } from "lucide-react";

const map: Record<string, LucideIcon> = { clock: Clock, shield: ShieldCheck, heart: Heart, utensils: Utensils, scissors: Scissors, bed: Bed, wrench: Wrench, store: Store };
export function Icon({ name, className }: { name: string; className?: string }) {
  const C = map[name] ?? Store;
  return <C className={className} aria-hidden />;
}
