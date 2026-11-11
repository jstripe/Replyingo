"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const KEY = "replybuilt_cookie_notice";
// Runs before first paint so returning visitors never see the notice flash.
const HIDE = `try{if(localStorage.getItem("${KEY}")){var e=document.getElementById("cookie-notice");if(e)e.style.display="none"}}catch(_){}`;

/**
 * Cookie notice. The site sets no analytics or advertising cookies, so the only choice is to acknowledge.
 * It is part of the server-rendered HTML (fast paint, no layout shift). The answer lives in this browser's localStorage only.
 */
export function CookieBanner() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    try { if (localStorage.getItem(KEY)) setShow(false); } catch { /* storage blocked: keep showing */ }
  }, []);
  if (!show) return null;
  const close = () => { try { localStorage.setItem(KEY, "1"); } catch { /* storage blocked */ } setShow(false); };
  return (
    <>
      <div id="cookie-notice" role="region" aria-label="Cookie notice" className="fixed inset-x-3 bottom-3 z-50 mx-auto flex max-w-3xl items-center gap-3 rounded-2xl border bg-background p-3 shadow-[0_20px_60px_-20px_rgba(14,22,51,0.35)] sm:bottom-5 sm:gap-5 sm:p-4">
        <p className="text-xs leading-5 text-foreground/90 sm:text-sm sm:leading-6">
          This site sets no analytics or advertising cookies. Details in our <Link href="/cookies/" className="font-medium text-primary underline underline-offset-4">Cookie Policy</Link>.
        </p>
        <Button size="sm" className="min-h-11 shrink-0" onClick={close}>Got it</Button>
      </div>
      <script dangerouslySetInnerHTML={{ __html: HIDE }} />
    </>
  );
}
