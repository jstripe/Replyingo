import { LegalLayout, LLink, LP, LUL, Mail } from "@/components/pages/LegalLayout";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

export const metadata = buildMetadata("Refund Policy", "Full refund if requested before work starts, no refund once the work is delivered, pro-rata refund if we fail to deliver. Answers within 3 business days.", "/refund/");

export default function RefundPage() {
  return (
    <LegalLayout path="/refund/" title="Refund Policy" intro="When you can get your money back, how to ask for it and how fast it is paid." sections={[
      { id: "summary", title: "In short", body: <LUL>
        <li><strong>Full refund</strong> if you ask for it before the work starts.</li>
        <li><strong>No refund</strong> once the work is delivered.</li>
        <li><strong>Pro-rata refund</strong> if we fail to deliver what you purchased.</li>
      </LUL> },
      { id: "before", title: "Before the work starts", body: <LP>If you ask for a refund before we have started the work, we refund the full amount you paid. The work starts when we begin reading your reviews or drafting your text, which we do within {siteConfig.startWithinHours} hours of receiving your details on the page after payment. If you ask before that moment, the refund is complete.</LP> },
      { id: "after", title: "Once the work is delivered", body: <LP>When the work is delivered, there is no refund. Delivered means that we have sent you what you bought: the replies, the reply templates, or the profile text and photo checklist. For Reply Starter and Reply Pro, work is delivered reply by reply, so replies already sent to you are delivered work.</LP> },
      { id: "failure", title: "If we fail to deliver", body: <LP>If we fail to deliver what you purchased, for example if we deliver fewer replies than the offer includes or we miss the delivery time stated for your offer and do not put it right, you receive a pro-rata refund for the part we did not deliver. For example, if you bought up to 15 replies and we only delivered 5 of the replies you asked for, we refund the share that matches the missing replies.</LP> },
      { id: "how", title: "How to request a refund", body: <>
        <LP>Write to <Mail /> or use the <LLink href="/contact/">contact page</LLink> and choose &ldquo;Refund request&rdquo;. Please include your business name, the email you used and your payment reference.</LP>
        <LP>We answer within {siteConfig.refundDecisionDays} business days. Approved refunds are processed within {siteConfig.refundPayDays} business days, to the card used for the payment, through Airwallex. Your bank may need extra time to show it on your statement.</LP>
      </> },
      { id: "billing", title: "Billing errors and unauthorized charges", body: <LP>If you were charged the wrong amount, charged twice, or you did not authorize a payment, write to us straight away. We correct billing errors and refund amounts charged by mistake in full.</LP> },
      { id: "statutory", title: "Your statutory rights", body: <LP>{siteConfig.name} is designed for businesses. If you are a consumer, this policy does not reduce any right you have under mandatory consumer law, including, where it applies, the statutory right to withdraw from a contract for services within 14 days, subject to the conditions set by law. Nothing in this policy limits those rights.</LP> },
      { id: "disputes", title: "Chargebacks", body: <LP>Please contact us before you ask your bank for a chargeback. We answer quickly, and most problems can be solved faster by writing to us. We may share the facts of an order with our payment provider to respond to a dispute.</LP> },
      { id: "see", title: "Related pages", body: <LP>Read our <LLink href="/terms/">Terms of Service</LLink> for the full agreement and the <LLink href="/pricing/">pricing page</LLink> for what each offer includes.</LP> },
    ]} />
  );
}
