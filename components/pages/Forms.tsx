"use client";
import * as React from "react";
import Link from "next/link";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { api, ApiException } from "@/lib/api";
import { CONTACT_SUBJECTS, QUOTE_NEEDS } from "@/lib/api-types";
import { offerOptions, SELECT_LOCATIONS } from "@/lib/data";
import { siteConfig } from "@/lib/site-config";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const selectCls = "flex h-11 w-full rounded-xl border border-input bg-background px-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:text-sm";

function Field({ id, label, hint, children }: { id: string; label: string; hint?: string; children: React.ReactNode }) {
  return <div className="space-y-2"><Label htmlFor={id}>{label}</Label>{children}{hint && <p className="text-xs text-muted-foreground">{hint}</p>}</div>;
}

const Honeypot = () => <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>;

type Status = "idle" | "sending" | "success" | "error";

/** Shared submit logic: success only after a real 200 from the API. */
function useForm(send: (fd: FormData) => Promise<unknown>) {
  const [status, setStatus] = React.useState<Status>("idle");
  const [error, setError] = React.useState("");
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setStatus("sending"); setError("");
    try { await send(fd); setStatus("success"); }
    catch (err) { setError(err instanceof ApiException ? err.message : "We could not send this. Please try again or email us."); setStatus("error"); }
  };
  return { status, error, onSubmit, reset: () => setStatus("idle") };
}

const v = (fd: FormData, k: string) => String(fd.get(k) || "");

function Success({ title, text, onAgain, againLabel }: { title: string; text: React.ReactNode; onAgain?: () => void; againLabel?: string }) {
  return (
    <div role="status" className="surface p-8 text-center">
      <CheckCircle2 className="mx-auto h-10 w-10 text-primary" aria-hidden />
      <h2 className="mt-4 text-2xl font-semibold">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-muted-foreground">{text}</p>
      {onAgain && <Button variant="outline" className="mt-6 w-full sm:w-auto" onClick={onAgain}>{againLabel}</Button>}
    </div>
  );
}

function Submit({ status, label }: { status: Status; label: string }) {
  return <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={status === "sending"}>{status === "sending" && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}{status === "sending" ? "Sending..." : label}</Button>;
}

function ErrorLine({ status, error }: { status: Status; error: string }) {
  if (status !== "error") return null;
  return <p role="alert" className="flex items-start gap-2 text-sm text-destructive"><AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />{error}</p>;
}

export function ContactForm() {
  const f = useForm((fd) => api.contact({ name: v(fd, "name"), email: v(fd, "email"), subject: v(fd, "subject"), message: v(fd, "message"), website: v(fd, "website") }));
  if (f.status === "success") return <Success title="Message sent" text="Thanks for reaching out. We reply by email within 3 business days." onAgain={f.reset} againLabel="Send another message" />;
  return (
    <form onSubmit={f.onSubmit} className="relative space-y-5 surface p-5 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="c-name" label="Name"><Input id="c-name" name="name" required maxLength={80} autoComplete="name" /></Field>
        <Field id="c-email" label="Email"><Input id="c-email" name="email" type="email" inputMode="email" autoCapitalize="none" spellCheck={false} required autoComplete="email" /></Field>
      </div>
      <Field id="c-subject" label="Subject">
        <select id="c-subject" name="subject" required defaultValue="" className={selectCls}><option value="" disabled>Choose a topic</option>{CONTACT_SUBJECTS.map((s) => <option key={s}>{s}</option>)}</select>
      </Field>
      <Field id="c-message" label="Message"><Textarea id="c-message" name="message" required rows={6} maxLength={5000} /></Field>
      <Honeypot />
      <ErrorLine status={f.status} error={`${f.error} You can also write to ${siteConfig.contactEmail}.`} />
      <Submit status={f.status} label="Send message" />
    </form>
  );
}

export function QuoteForm() {
  const f = useForm((fd) => api.quote({ business: v(fd, "business"), contactName: v(fd, "contactName"), email: v(fd, "email"), locations: v(fd, "locations"), need: v(fd, "need"), message: v(fd, "message"), website: v(fd, "website") }));
  if (f.status === "success") return <Success title="Quote request received" text="Thank you. We will read your request and reply by email with a price and a timeline within 3 business days. Nothing is charged until you agree." onAgain={f.reset} againLabel="Send another request" />;
  return (
    <form onSubmit={f.onSubmit} className="relative space-y-5 surface p-5 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="q-business" label="Business name"><Input id="q-business" name="business" required maxLength={120} autoComplete="organization" /></Field>
        <Field id="q-contact" label="Contact name"><Input id="q-contact" name="contactName" required maxLength={80} autoComplete="name" /></Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="q-email" label="Email"><Input id="q-email" name="email" type="email" inputMode="email" autoCapitalize="none" spellCheck={false} required autoComplete="email" /></Field>
        <Field id="q-locations" label="Number of locations">
          <select id="q-locations" name="locations" required defaultValue="" className={selectCls}><option value="" disabled>Choose</option>{SELECT_LOCATIONS.map((s) => <option key={s}>{s}</option>)}</select>
        </Field>
      </div>
      <Field id="q-need" label="What do you need?">
        <select id="q-need" name="need" required defaultValue="" className={selectCls}><option value="" disabled>Choose</option>{QUOTE_NEEDS.map((s) => <option key={s}>{s}</option>)}</select>
      </Field>
      <Field id="q-message" label="Message" hint="Tell us about your business, your platforms and the languages you need."><Textarea id="q-message" name="message" required rows={6} maxLength={5000} /></Field>
      <Honeypot />
      <ErrorLine status={f.status} error={f.error} />
      <Submit status={f.status} label="Request a quote" />
    </form>
  );
}

export function IntakeForm() {
  const [offer, setOffer] = React.useState("");
  React.useEffect(() => {
    const o = new URLSearchParams(window.location.search).get("offer") || "";
    if (offerOptions.some((x) => x.id === o)) setOffer(o);
  }, []);
  const f = useForm((fd) => api.intake({ business: v(fd, "business"), contactName: v(fd, "contactName"), email: v(fd, "email"), phone: v(fd, "phone"), profileUrl: v(fd, "profileUrl"), offer, paymentRef: v(fd, "paymentRef"), notes: v(fd, "notes"), website: v(fd, "website") }));
  if (f.status === "success") return <Success title="Details received" text={`Thank you. We start within ${siteConfig.startWithinHours} hours and we will write to you by email. If something is missing, we will ask.`} />;
  return (
    <form onSubmit={f.onSubmit} className="relative space-y-5 surface p-5 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="i-business" label="Business name"><Input id="i-business" name="business" required maxLength={120} autoComplete="organization" /></Field>
        <Field id="i-contact" label="Contact name"><Input id="i-contact" name="contactName" required maxLength={80} autoComplete="name" /></Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="i-email" label="Email"><Input id="i-email" name="email" type="email" inputMode="email" autoCapitalize="none" spellCheck={false} required autoComplete="email" /></Field>
        <Field id="i-phone" label="Phone"><Input id="i-phone" name="phone" type="tel" inputMode="tel" required maxLength={30} autoComplete="tel" /></Field>
      </div>
      <Field id="i-profile" label="Google profile link" hint="The link to your business on Google Maps or your Google Business Profile.">
        <Input id="i-profile" name="profileUrl" type="url" inputMode="url" autoCapitalize="none" spellCheck={false} required maxLength={500} placeholder="https://" />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="i-offer" label="Offer purchased">
          <select id="i-offer" value={offer} onChange={(e) => setOffer(e.target.value)} required className={selectCls}><option value="" disabled>Choose the offer you bought</option>{offerOptions.map((o) => <option key={o.id} value={o.id}>{o.name}</option>)}</select>
        </Field>
        <Field id="i-ref" label="Payment reference" hint="Shown on your Airwallex payment confirmation and receipt."><Input id="i-ref" name="paymentRef" required maxLength={120} autoComplete="off" /></Field>
      </div>
      <Field id="i-notes" label="Anything we should know? (optional)" hint="Your tone of voice, words to avoid, how you like to handle complaints."><Textarea id="i-notes" name="notes" rows={4} maxLength={2000} /></Field>
      <Honeypot />
      <p className="text-xs text-muted-foreground">We use these details only to do the work you bought. See the <Link href="/privacy/" className="text-primary underline underline-offset-4">Privacy Policy</Link>.</p>
      <ErrorLine status={f.status} error={f.error} />
      <Submit status={f.status} label="Send my details" />
    </form>
  );
}
