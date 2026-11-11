# PROJECT BRIEF: Replyingo

Brand (working name): Replyingo
Pitch: Professional replies to the genuine reviews small businesses get on Google, Tripadvisor and Facebook, plus Google Business Profile optimization. 100% online service.
For: restaurants, salons, hotels, garages, shops.
Category: done-for-you online service (no accounts, no credits, no app). This differs from the SaaS template in the playbook, so the starter kit's accounts/credits/Stripe claim code was replaced by order-intake, quote and contact endpoints plus a small admin. The owner's brief overrides the playbook page list.

Core flow: choose an offer > tick Terms + Refund Policy > Pay now (one-time Airwallex Payment Link) > /thank-you/ details form > we start within 48 h. Custom: /quote/ form (no payment link).
Technical: static Next 14 export + Cloudflare Worker + D1 (contact, intakes, quotes, admin sessions). No AI binding, nothing runs in the browser beyond forms.
Payment: Airwallex Payment Links, no parameters passed, payment verified by hand (payment reference + email) in the Airwallex dashboard.

Offers (EUR, one-time, from the owner's brief): Reply Starter 29, Reply Pro 59 (badge "Most popular"), Reply Templates Pack 49, Google Profile Optimization 89, Local Visibility Pack 199, Custom on quote.
Live: everything above. Coming soon: nothing listed.
Look: white background, deep blue (#1B3FAE family), Fraunces headings + Inter body, light only.
Legal entity: pending (STOP 2). Local folder: ~/replybuilt
