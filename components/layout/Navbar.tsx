"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { navLinks } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className={cn("sticky top-0 z-40 w-full border-b transition-all duration-300", scrolled ? "border-border bg-background/85 shadow-sm backdrop-blur-lg" : "border-transparent bg-background/70 backdrop-blur-md")}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-6">
        <Logo />
        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">{l.label}</Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <Button asChild variant="ghost" size="sm"><Link href="/thank-you/">Already paid?</Link></Button>
          <Button asChild size="sm"><Link href="/pricing/">See pricing</Link></Button>
        </div>
        <div className="flex items-center lg:hidden">
          <Sheet>
            <SheetTrigger asChild><Button variant="ghost" size="icon" className="h-11 w-11" aria-label="Open menu"><Menu className="h-5 w-5" /></Button></SheetTrigger>
            <SheetContent className="pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(1.5rem,env(safe-area-inset-top))]">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="mt-8 flex flex-col gap-1">
                {navLinks.map((l) => (
                  <SheetClose asChild key={l.href}><Link href={l.href} className="rounded-xl px-3 py-3.5 font-display text-lg hover:bg-accent">{l.label}</Link></SheetClose>
                ))}
              </div>
              <div className="mt-auto grid gap-3">
                <SheetClose asChild><Button asChild size="lg"><Link href="/pricing/">See pricing</Link></Button></SheetClose>
                <SheetClose asChild><Button asChild size="lg" variant="outline"><Link href="/thank-you/">Already paid? Send details</Link></Button></SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
