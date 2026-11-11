"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const KEY = "replybuilt_cookie_notice";

/**
 * Cookie notice. The site sets no analytics or advertising cookies, so the only choice is to acknowledge.
 * The answer is kept in this browser's localStorage and is never sent to a server.
 */
export function CookieBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    try { if (!localStorage.getItem(KEY)) setShow(true); } catch { setShow(true); }
  }, []);
  if (!show) return null;
  const close = () => { try { localStorage.setItem(KEY, "1"); } catch { /* storage blocked */ } setShow(false); };
  return (
    <div role="region" aria-label="Cookie notice" className="fixed inset-x-3 bottom-3 z-50 mx-auto flex max-w-3xl flex-col gap-3 rounded-2xl border bg-background p-4 shadow-[0_20px_60px_-20px_rgba(14,22,51,0.35)] sm:bottom-5 sm:flex-row sm:items-center sm:gap-5 sm:p-4">
      <p className="text-sm leading-6 text-foreground/90">
        This site sets no analytics or advertising cookies. Closing this notice is remembered in your browser only. Details are in our <Link href="/cookies/" className="font-medium text-primary underline underline-offset-4">Cookie Policy</Link>.
      </p>
      <Button size="sm" className="min-h-11 w-full shrink-0 sm:w-auto" onClick={close}>Got it</Button>
    </div>
  );
}
