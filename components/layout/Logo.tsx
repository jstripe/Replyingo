import Link from "next/link";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/logo-mark.svg" alt="" width={32} height={32} className={cn("h-8 w-8 drop-shadow-[0_6px_12px_rgba(27,63,174,0.3)] transition-transform duration-300 group-hover:scale-105", className)} />;
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("group inline-flex min-h-[44px] items-center gap-2.5 font-display text-xl font-bold tracking-tight", className)} aria-label="Replyingo home">
      <LogoMark />
      <span>Reply<span className="text-primary">ingo</span></span>
    </Link>
  );
}
