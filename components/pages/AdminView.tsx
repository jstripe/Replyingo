"use client";
import * as React from "react";
import { Loader2 } from "lucide-react";
import { api, ApiException, formatDate } from "@/lib/api";
import { OFFER_CATALOG, type AdminKind, type AdminOverview, type OfferId } from "@/lib/api-types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/layout/Logo";

type View = "loading" | "out" | "in";

/** Back office: orders details, quote requests and contact messages. Login uses the ADMIN_USERNAME and ADMIN_PASSWORD Worker secrets. */
export function AdminView() {
  const [view, setView] = React.useState<View>("loading");
  const [data, setData] = React.useState<AdminOverview | null>(null);
  const [err, setErr] = React.useState("");

  const load = React.useCallback(async () => {
    try { setData(await api.adminOverview()); setView("in"); }
    catch (e) { if (e instanceof ApiException && e.status === 401) setView("out"); else { setErr("Could not load."); setView("out"); } }
  }, []);
  React.useEffect(() => { void load(); }, [load]);

  async function login(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setErr("");
    try { await api.adminLogin(String(fd.get("username") || ""), String(fd.get("password") || "")); await load(); }
    catch (x) { setErr(x instanceof ApiException ? x.message : "Login failed."); }
  }
  const done = async (kind: AdminKind, id: string) => { await api.adminHandled(kind, id); await load(); };

  if (view === "loading") return <div className="grid min-h-screen place-items-center"><Loader2 className="h-8 w-8 animate-spin text-primary" aria-label="Loading" /></div>;
  if (view === "out" || !data) {
    return (
      <div className="mx-auto grid min-h-screen max-w-sm content-center gap-6 px-5">
        <Logo />
        <h1 className="text-2xl font-semibold">Sign in</h1>
        <form onSubmit={login} className="space-y-4">
          <label className="grid gap-1 text-sm">Username<Input name="username" autoComplete="username" required /></label>
          <label className="grid gap-1 text-sm">Password<Input name="password" type="password" autoComplete="current-password" required /></label>
          {err && <p role="alert" className="text-sm text-destructive">{err}</p>}
          <Button type="submit" className="w-full">Sign in</Button>
        </form>
      </div>
    );
  }

  const Handled = ({ kind, id, at }: { kind: AdminKind; id: string; at: number | null }) => at ? <span className="text-xs text-muted-foreground">Handled {formatDate(at)}</span> : <button className="text-sm underline" onClick={() => void done(kind, id)}>Mark as handled</button>;
  const offerName = (id: string) => OFFER_CATALOG[id as OfferId]?.name ?? id;

  return (
    <div className="mx-auto max-w-6xl px-5 py-8 sm:px-6">
      <div className="flex items-center justify-between"><Logo /><Button variant="outline" size="sm" onClick={async () => { await api.adminLogout(); setData(null); setView("out"); }}>Log out</Button></div>
      <h1 className="mt-8 text-3xl font-semibold">Back office</h1>
      <p className="mt-1 text-sm text-muted-foreground">Check each payment reference in the Airwallex dashboard before you start the work.</p>

      <h2 className="mt-8 text-xl font-semibold">Details sent after payment ({data.intakes.filter((i) => !i.handledAt).length} open)</h2>
      <ul className="surface mt-3 divide-y p-0 text-sm">
        {data.intakes.map((i) => (
          <li key={i.id} className={"space-y-1 p-4" + (i.handledAt ? " opacity-60" : "")}>
            <div className="flex flex-wrap justify-between gap-2"><strong>{i.business} · {offerName(i.offer)}</strong><span className="text-muted-foreground">{formatDate(i.createdAt)}</span></div>
            <p>{i.contactName} · <a className="text-primary underline" href={`mailto:${i.email}`}>{i.email}</a> · {i.phone}</p>
            <p>Payment reference: <code>{i.paymentRef}</code></p>
            <p>Profile: <a className="break-all text-primary underline" href={i.profileUrl} target="_blank" rel="noopener noreferrer">{i.profileUrl}</a></p>
            {i.notes && <p className="whitespace-pre-wrap">Notes: {i.notes}</p>}
            <Handled kind="intake" id={i.id} at={i.handledAt} />
          </li>
        ))}
        {!data.intakes.length && <li className="p-4 text-muted-foreground">Nothing yet.</li>}
      </ul>

      <h2 className="mt-10 text-xl font-semibold">Quote requests ({data.quotes.filter((i) => !i.handledAt).length} open)</h2>
      <ul className="surface mt-3 divide-y p-0 text-sm">
        {data.quotes.map((q) => (
          <li key={q.id} className={"space-y-1 p-4" + (q.handledAt ? " opacity-60" : "")}>
            <div className="flex flex-wrap justify-between gap-2"><strong>{q.business} · {q.need} · {q.locations} locations</strong><span className="text-muted-foreground">{formatDate(q.createdAt)}</span></div>
            <p>{q.contactName} · <a className="text-primary underline" href={`mailto:${q.email}`}>{q.email}</a></p>
            <p className="whitespace-pre-wrap">{q.message}</p>
            <Handled kind="quote" id={q.id} at={q.handledAt} />
          </li>
        ))}
        {!data.quotes.length && <li className="p-4 text-muted-foreground">Nothing yet.</li>}
      </ul>

      <h2 className="mt-10 text-xl font-semibold">Contact messages ({data.messages.filter((i) => !i.handledAt).length} open)</h2>
      <ul className="surface mt-3 divide-y p-0 text-sm">
        {data.messages.map((m) => (
          <li key={m.id} className={"space-y-1 p-4" + (m.handledAt ? " opacity-60" : "")}>
            <div className="flex flex-wrap justify-between gap-2"><strong>{m.subject} · {m.name} &lt;{m.email}&gt;</strong><span className="text-muted-foreground">{formatDate(m.createdAt)}</span></div>
            <p className="whitespace-pre-wrap">{m.message}</p>
            <div className="flex gap-4"><a className="text-primary underline" href={`mailto:${m.email}?subject=${encodeURIComponent(`Re: ${m.subject}`)}`}>Reply by email</a><Handled kind="message" id={m.id} at={m.handledAt} /></div>
          </li>
        ))}
        {!data.messages.length && <li className="p-4 text-muted-foreground">No messages.</li>}
      </ul>
    </div>
  );
}
