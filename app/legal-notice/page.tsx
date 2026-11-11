import { LegalLayout, LLink, LP, LUL, Mail } from "@/components/pages/LegalLayout";
import { buildMetadata } from "@/lib/metadata";
import { legalNotice, siteConfig } from "@/lib/site-config";

export const metadata = buildMetadata("Legal Notice", "Who publishes ReplyBuilt: company name, registration number, address, contact details and hosting provider.", "/legal-notice/");

export default function LegalNoticePage() {
  return (
    <LegalLayout path="/legal-notice/" title="Legal Notice" intro="The identity of the company that publishes this website and operates the service." sections={[
      { id: "publisher", title: "Publisher of the website", body: <>
        <LP>{legalNotice()}</LP>
        <LUL>
          <li>Company name: {siteConfig.legalEntity}</li>
          <li>Registration number: {siteConfig.registrationNumber}</li>
          <li>Registered address: {siteConfig.address}</li>
          <li>Email: <Mail /></li>
          <li>Phone: {siteConfig.phone}</li>
          <li>Opening hours: {siteConfig.hours}</li>
        </LUL>
      </> },
      { id: "hosting", title: "Hosting", body: <LP>The website is hosted and delivered by Cloudflare, Inc., 101 Townsend Street, San Francisco, CA 94107, USA (cloudflare.com).</LP> },
      { id: "service", title: "The service", body: <LP>{siteConfig.name} is an online service for small businesses. We write replies to genuine customer reviews on Google, Tripadvisor and Facebook, write reply templates and optimize Google Business Profiles. We sell no physical products. Our offers and prices are on the <LLink href="/pricing/">pricing page</LLink>.</LP> },
      { id: "ip", title: "Intellectual property", body: <LP>The texts, design, logo and layout of this website belong to {siteConfig.legalEntity} or are used with permission. Photographs are provided by Pexels contributors under the Pexels license. You may not copy or reuse our content without written permission. Brand names such as Google, Tripadvisor, Facebook and Airwallex belong to the companies that hold them and are used only to describe what our service works with.</LP> },
      { id: "reviews", title: "Our position on reviews", body: <LP>{siteConfig.name} never writes, buys or sells reviews. We only reply to genuine reviews on behalf of our clients, with their approval.</LP> },
      { id: "liability", title: "Liability for content and links", body: <LP>We take care to keep this website accurate and up to date, but we cannot guarantee that it is free of errors. Links to third-party websites are provided for convenience. We have no control over their content and are not responsible for it.</LP> },
      { id: "data", title: "Personal data and cookies", body: <LP>How we handle personal data is described in the <LLink href="/privacy/">Privacy Policy</LLink>, and the cookies and similar storage we use are described in the <LLink href="/cookies/">Cookie Policy</LLink>.</LP> },
      { id: "law", title: "Applicable law", body: <LP>This website and the use of the service are governed by {siteConfig.governingLaw}, without prejudice to any mandatory consumer protection rules that apply where you live. See the <LLink href="/terms/">Terms of Service</LLink> for details.</LP> },
    ]} />
  );
}
