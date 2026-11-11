import { LegalLayout, LLink, LP, LUL, Mail, SimpleTable, SubProcessorTable } from "@/components/pages/LegalLayout";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

export const metadata = buildMetadata("Privacy Policy", "How ReplyBuilt collects and uses personal data under the GDPR: what we collect, why, who we share it with, how long we keep it and your rights.", "/privacy/");

export default function PrivacyPage() {
  const E = siteConfig.legalEntity;
  return (
    <LegalLayout path="/privacy/" title="Privacy Policy" intro="What personal data we collect, why, who else handles it and what rights you have under the GDPR." sections={[
      { id: "controller", title: "Who is responsible for your data", body: <LP>The controller is {E}, registration no. {siteConfig.registrationNumber}, {siteConfig.address}. Contact for privacy questions: <Mail />.</LP> },
      { id: "collect", title: "What we collect", body: <>
        <LP>We collect only what the service needs. We have no user accounts and we do not run analytics or advertising trackers.</LP>
        <LUL>
          <li><strong>Contact form:</strong> your name, email, the subject and your message.</li>
          <li><strong>Details form after payment:</strong> business name, contact name, email, phone number, the link to your Google profile, the offer you bought, your payment reference and optional notes.</li>
          <li><strong>Quote form:</strong> business name, contact name, email, number of locations, what you need and your message.</li>
          <li><strong>Payment:</strong> card payments are handled by Airwallex. We receive the confirmation and the payment reference. We never see or store your card number.</li>
          <li><strong>Technical data:</strong> like any website, our hosting provider processes your IP address and request data to deliver pages, stop abuse and keep the site secure. We also use your IP address, in hashed form, to limit how many times a form can be sent.</li>
          <li><strong>Public information:</strong> the reviews on your public Google, Tripadvisor or Facebook profile, which we read to write replies.</li>
        </LUL>
      </> },
      { id: "bases", title: "Why we use it and the legal basis", body: <SimpleTable head={["Purpose", "Data", "Legal basis (GDPR Art. 6)"]} rows={[
        ["Do the work you bought and keep in touch about it", "Details form, public reviews, emails", "Performance of a contract (6.1.b)"],
        ["Answer your questions and quote requests", "Contact and quote forms", "Steps before a contract and our legitimate interest in replying (6.1.b and 6.1.f)"],
        ["Take and record payments, refunds and accounting", "Payment reference, offer, amount", "Performance of a contract and legal obligation (6.1.b and 6.1.c)"],
        ["Keep the site secure and stop abuse", "IP address, request data", "Legitimate interest (6.1.f)"],
        ["Handle disputes and legal claims", "Order and message records", "Legitimate interest and legal obligation (6.1.f and 6.1.c)"],
      ]} /> },
      { id: "processors", title: "Who else handles your data", body: <>
        <LP>We use only the providers below. We do not sell your data and we do not use it for advertising.</LP>
        <SubProcessorTable />
        <LP>We may also disclose data if the law requires it, or to protect our rights in a dispute.</LP>
      </> },
      { id: "ai", title: "No AI training", body: <LP>We never use your content to train AI models.</LP> },
      { id: "retention", title: "How long we keep it", body: <SimpleTable head={["Data", "Kept for"]} rows={[
        ["Contact messages", "12 months, then deleted automatically"],
        ["Quote requests", "12 months, then deleted automatically"],
        ["Details sent after payment", "3 years, to deliver the work, handle disputes and meet accounting duties, then deleted automatically"],
        ["Payment records held by Airwallex and our accounts", "As long as the law requires accounting records to be kept"],
        ["Rate-limit records", "Under 24 hours"],
        ["Admin session (staff only)", "7 days"],
      ]} /> },
      { id: "transfers", title: "International transfers", body: <LP>Cloudflare and Airwallex may process data outside the European Economic Area. Where they do, the transfer is protected by the safeguards in the table above, such as the EU-US Data Privacy Framework or Standard Contractual Clauses.</LP> },
      { id: "rights", title: "Your rights", body: <>
        <LP>You have the right to access your data, correct it, delete it, restrict or object to its use, receive it in a portable format, and withdraw consent where we rely on it. To use a right, write to <Mail /> or use the <LLink href="/contact/">contact page</LLink> and choose &ldquo;Privacy request&rdquo;. We answer within one month.</LP>
        <LP>You may also complain to the data protection supervisory authority of the country where you live or work, or where {E} is established.</LP>
      </> },
      { id: "automated", title: "Automated decisions", body: <LP>We do not make decisions about you based only on automated processing, and we do not build profiles of visitors.</LP> },
      { id: "us", title: "Notice for US residents", body: <LP>We do not sell personal information and we do not share it for cross-context behavioral advertising. We collect the categories described above for the business purposes described above. If you live in a US state with a privacy law, you may ask to know, correct or delete your personal information, and we will not treat you differently for asking. Write to <Mail />.</LP> },
      { id: "security", title: "Security", body: <LP>The site is served over HTTPS. Form data is stored in an encrypted Cloudflare database, access to the back office needs a login, and forms are protected against abuse. Read more on our <LLink href="/security/">Security</LLink> page. No system is perfectly secure, so please do not send us passwords or card numbers by email or in forms.</LP> },
      { id: "children", title: "Children", body: <LP>The service is for businesses and is not meant for anyone under 18. We do not knowingly collect data from children.</LP> },
      { id: "cookies", title: "Cookies", body: <LP>See the <LLink href="/cookies/">Cookie Policy</LLink>.</LP> },
      { id: "changes", title: "Changes", body: <LP>We may update this policy. The date at the top shows the latest version.</LP> },
    ]} />
  );
}
