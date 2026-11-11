import { LegalLayout, LLink, LP, Mail, SimpleTable } from "@/components/pages/LegalLayout";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata("Cookie Policy", "The cookies and browser storage ReplyBuilt uses: no analytics and no advertising cookies.", "/cookies/");

export default function CookiesPage() {
  return (
    <LegalLayout title="Cookie Policy" intro="What is stored in your browser when you visit ReplyBuilt, and what is not." sections={[
      { id: "short", title: "In short", body: <LP>Our website does not set cookies for visitors, and we do not use analytics, advertising or tracking cookies. We show a notice at the bottom of the page so that you can see this and close it.</LP> },
      { id: "list", title: "What is stored", body: <SimpleTable head={["Name", "Type", "Purpose", "Duration"]} rows={[
        ["replybuilt_cookie_notice", "Browser storage (localStorage), first party", "Remembers that you closed the cookie notice. It stays in your browser and is never sent to us.", "Until you clear your browser data"],
        ["replybuilt_admin", "Cookie, first party, HttpOnly", "Keeps our own staff signed in to the back office. It is only set when staff log in, never for visitors.", "7 days"],
      ]} /> },
      { id: "third", title: "Third parties", body: <>
        <LP>When you click &ldquo;Pay now&rdquo; you leave our site and open a payment page run by Airwallex. Airwallex sets its own cookies on its own pages, under its own policy. Our hosting provider, Cloudflare, may use technical, security-related cookies to protect the site from abuse. These do not track you across other sites.</LP>
        <LP>Fonts are served from our own domain, so your browser does not contact a font provider.</LP>
      </> },
      { id: "control", title: "Your choices", body: <LP>Because we only use what is strictly necessary, there is nothing to switch off on our site. You can delete or block storage at any time in your browser settings. The site works without it, but the notice will then show again on your next visit.</LP> },
      { id: "more", title: "More information", body: <LP>Read the <LLink href="/privacy/">Privacy Policy</LLink> or write to <Mail />.</LP> },
    ]} />
  );
}
