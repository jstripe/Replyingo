import { LegalLayout, LH3, LLink, LP, LUL, Mail } from "@/components/pages/LegalLayout";
import { Mandatory } from "@/components/sections/Mandatory";
import { buildMetadata } from "@/lib/metadata";
import { eur, offers } from "@/lib/data";
import { siteConfig } from "@/lib/site-config";

export const metadata = buildMetadata("Terms of Service", "The agreement between you and ReplyBuilt: the service, one-time payments, delivery, genuine reviews only, refunds, liability and governing law.", "/terms/");

export default function TermsPage() {
  const E = siteConfig.legalEntity;
  return (
    <LegalLayout title="Terms of Service" intro={`The agreement between you and ${E} when you use ${siteConfig.name} or buy one of its offers.`} sections={[
      { id: "who", title: "Who we are and who these terms apply to", body: <>
        <LP>{siteConfig.name} is operated by {E}, registration no. {siteConfig.registrationNumber}, registered office: {siteConfig.address} (&ldquo;we&rdquo;, &ldquo;us&rdquo;). By buying an offer or sending us a form you agree to these Terms and to the <LLink href="/refund/">Refund Policy</LLink>.</LP>
        <LP>The service is for businesses. You must be 18 or older and have the authority to act for the business you register with us.</LP>
      </> },
      { id: "service", title: "The service", body: <>
        <LP>{siteConfig.name} is a 100% online service. We write replies to genuine customer reviews on Google, Tripadvisor and Facebook, we write reply templates in your brand voice, and we optimize your Google Business Profile. We sell no physical products. The offers are:</LP>
        <LUL>{offers.map((o) => <li key={o.id}><strong>{o.name}</strong>, {eur(o.price)}: {o.highlights.join(", ")}.</li>)}<li><strong>Custom</strong>, on quote: several locations, agencies and other languages, agreed in writing before you pay.</li></LUL>
      </> },
      { id: "genuine", title: "Genuine reviews only", body: <>
        <Mandatory />
        <LP>We do not write reviews, we do not buy reviews and we do not sell reviews. We do not ask customers to post reviews in exchange for rewards, and we do not remove or report reviews on your behalf unless you ask us and the review breaks the rules of the platform. If we believe that a review you ask us to answer is not genuine, we may decline to reply to it.</LP>
      </> },
      { id: "payment", title: "Prices and payment", body: <>
        <LP>Prices are in EUR and are shown on the <LLink href="/pricing/">pricing page</LLink>. Taxes may apply. Each fixed offer is a one-off payment made by card through Airwallex. There is no automatic renewal, no subscription and nothing to cancel. If you want more of an offer later, you buy it again.</LP>
        <LP>Before paying you must tick the box to accept these Terms and the Refund Policy. We never see or store your card number: card payments are handled by Airwallex under its own terms. A custom quote becomes binding only when you accept it in writing and pay the agreed price.</LP>
      </> },
      { id: "delivery", title: "Delivery and what we need from you", body: <>
        <LP>After you pay, you send us your details on the page that opens after payment: business name, contact name, email, phone, the link to your Google profile, the offer you bought and your payment reference. We start within {siteConfig.startWithinHours} hours of receiving them.</LP>
        <LUL>
          <li>Reply Starter: up to 15 review replies over 30 days, 1 location, replies within 72 hours.</li>
          <li>Reply Pro: up to 40 review replies over 30 days, 1 location, replies within 24 hours.</li>
          <li>Reply Templates Pack: 20 reply templates in your brand voice, delivered in 3 business days.</li>
          <li>Google Profile Optimization: description, categories, services, hours and a photo checklist, delivered in 3 business days.</li>
          <li>Local Visibility Pack: Google Profile Optimization, 30 days of Reply Pro and 20 templates, delivered in 5 business days.</li>
        </LUL>
        <LP>The 30-day periods start when we begin the work. Delivery times run from the moment we have received your complete details. If you are slow to answer our questions, delivery moves back by the same time. Replies that you do not use within the period are not carried over.</LP>
      </> },
      { id: "approval", title: "Your approval and publication", body: <LP>We write each reply as a draft and you approve it before it is published. Replies are published by you, or by us if you give us manager access to your profile and ask us to. You are responsible for the final decision to publish a reply and for the accuracy of the facts you give us about your business.</LP> },
      { id: "refunds", title: "Refunds", body: <LP>Our <LLink href="/refund/">Refund Policy</LLink> is part of these Terms: a full refund if you ask before the work starts, no refund once the work is delivered, and a pro-rata refund if we fail to deliver what you purchased. Nothing in these Terms limits any right you have under mandatory consumer law.</LP> },
      { id: "content", title: "Your content and our work", body: <>
        <LP>You keep all rights to the information you send us. You allow us to use it only to do the work you bought. Once you have paid for an offer, you may use the replies, templates and profile text we deliver for your own business without limit. We keep the right to reuse general know-how, but never your business details.</LP>
        <LP>We never use your content to train AI models.</LP>
      </> },
      { id: "use", title: "Acceptable use", body: <>
        <LP>You agree not to use the service to:</LP>
        <LUL>
          <li>reply to reviews on a profile that you do not own or are not authorised to manage;</li>
          <li>ask us to write, buy, sell or post fake or incentivised reviews;</li>
          <li>publish replies that are unlawful, defamatory, hateful, misleading or that expose another person&apos;s private data;</li>
          <li>impersonate another person or business, or commit fraud.</li>
        </LUL>
        <LP>We may refuse or stop work that breaks this section and, in serious cases, refuse future orders.</LP>
      </> },
      { id: "platforms", title: "Third-party platforms", body: <LP>Google, Tripadvisor and Facebook set their own rules and we do not control them. They may change how reviews, replies and profiles work, or limit or remove content, at any time. We follow their published rules when we write for you, but we cannot be responsible for their decisions.</LP> },
      { id: "guarantees", title: "No guarantee of results", body: <LP>We write professional replies and profile text. We do not promise a particular star rating, a number of new customers, a ranking in search results or any other business result, because these depend on many things outside our control.</LP> },
      { id: "liability", title: "Liability", body: <>
        <LP>Nothing in these Terms excludes or limits liability that cannot be excluded or limited by law, including liability for death or personal injury caused by negligence, for fraud, or for intentional misconduct.</LP>
        <LP>Subject to that, our total liability to you for any claim linked to an order is limited to the amount you paid for that order, and we are not liable for loss of profit, loss of business or indirect loss. The service is provided with reasonable care and skill.</LP>
      </> },
      { id: "suspension", title: "Suspension and ending", body: <LP>We may suspend or end an order if you break these Terms. If we end an order for a reason that is not your fault, the Refund Policy applies. You may stop using the service at any time. Because there is no renewal, there is nothing to cancel.</LP> },
      { id: "law", title: "Governing law", body: <LP>These Terms are governed by {siteConfig.governingLaw}. If you are a consumer, you also keep the protection of the mandatory consumer rules of the country where you live. Please contact us first at <Mail /> so that we can try to solve any problem together.</LP> },
      { id: "changes", title: "Changes to these terms", body: <LP>We may update these Terms. The date at the top shows the latest version. A change does not affect an order you have already paid for, unless the law requires it.</LP> },
      { id: "contact", title: "Contact", body: <LP>Questions about these Terms: <Mail />, or the <LLink href="/contact/">contact page</LLink>.</LP> },
    ]} />
  );
}
