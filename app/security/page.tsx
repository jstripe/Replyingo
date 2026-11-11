import { LegalLayout, LLink, LP, LUL, Mail, SubProcessorTable } from "@/components/pages/LegalLayout";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata("Security", "How Replyingo protects your data: hosting, encryption, access control, payments through Airwallex, retention and how to report a vulnerability.", "/security/");

export default function SecurityPage() {
  return (
    <LegalLayout path="/security/" title="Security" intro="How we protect the information you send us, and how to tell us if you find a problem." sections={[
      { id: "infra", title: "Infrastructure", body: <LP>The website and its small back end run on Cloudflare&apos;s global network. Pages are static files, and the only server code handles our forms and the back office. We do not run our own servers.</LP> },
      { id: "transit", title: "Encryption", body: <LUL>
        <li><strong>In transit:</strong> the site is served over HTTPS only, and plain HTTP requests are redirected to HTTPS.</li>
        <li><strong>At rest:</strong> form submissions are stored in a Cloudflare D1 database, which Cloudflare encrypts at rest.</li>
      </LUL> },
      { id: "access", title: "Access control", body: <LUL>
        <li>The back office has one login, whose credentials are stored as encrypted Worker secrets and never in the code.</li>
        <li>Sessions use a random token. Only a hash of it is stored on our side, and the cookie is HttpOnly and expires after 7 days.</li>
        <li>Login attempts and form submissions are rate limited, and forms use a hidden field to catch bots.</li>
        <li>Requests that change data must come from our own site, which blocks cross-site request forgery.</li>
      </LUL> },
      { id: "payments", title: "Payments", body: <LP>Card payments are made on a page run by Airwallex. We never see, receive or store your card number. Airwallex states that its payment gateway is certified to PCI DSS Level 1. We receive only a payment confirmation and a reference.</LP> },
      { id: "browser", title: "What stays in your browser", body: <LP>The site uses no analytics or advertising trackers. The only thing kept in your browser is a note that you closed the cookie notice. See the <LLink href="/cookies/">Cookie Policy</LLink>.</LP> },
      { id: "retention", title: "Retention and deletion", body: <LP>We keep data only as long as stated in the <LLink href="/privacy/">Privacy Policy</LLink>, and old records are deleted automatically every day. To have your data deleted sooner, write to <Mail /> and choose &ldquo;Privacy request&rdquo;.</LP> },
      { id: "least", title: "Minimal data", body: <LP>We do not ask for passwords, card details or access to your accounts in our forms. If you want us to publish replies for you, you can add us as a manager of your profile through the platform itself, and remove us at any time.</LP> },
      { id: "incident", title: "Incident response", body: <LP>If we discover a security incident that affects personal data, we investigate it, limit its effect, and notify affected customers and the supervisory authority where the law requires it, without undue delay.</LP> },
      { id: "report", title: "Reporting a vulnerability", body: <LP>If you believe you have found a security problem on this site, please write to <Mail /> with the details. Please give us reasonable time to fix it before you share it publicly, and do not access data that is not yours. We will acknowledge your report within 3 business days.</LP> },
      { id: "providers", title: "Providers", body: <SubProcessorTable /> },
    ]} />
  );
}
