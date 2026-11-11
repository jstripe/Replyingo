# PROGRESS: Replyingo

Started 2026-11-09. Playbook: ~/Desktop/Stripe Websites. Skills ui-ux-pro-max / frontend-design / web-perf were not invoked as skills; same goals followed by hand (noted per playbook).

## Decisions
- Service business, so no signup/login/app/credits. Admin at /admin/ (noindex) with ADMIN_USERNAME + ADMIN_PASSWORD Worker secrets.
- Pages follow the owner's brief: Home, Pricing, Examples, FAQ, About, Contact, Quote, Thank-you, Legal Notice, Terms, Refund, Privacy, Cookies, 404. No Features/Careers/Security pages (not in brief). Footer columns SERVICES / COMPANY / LEGAL.
- English, EUR. Light theme only (brief asks for white).
- Cookie notice kept (brief asks for banner). Site sets no cookies for visitors; notice is honest about that.
- Ports: 8790 was taken by ~/linguadesk (not touched). Using 8795 (worker) and 3105 (next dev).
- Brand renamed before the first push; history squashed so no earlier name ever left the Mac.
- Company fields are {{...}} values in lib/site-config.ts until STOP 2.
- "Most popular" badge on Reply Pro per playbook standard.

## Phases
- [x] 0 Brief (PROJECT-BRIEF.md)
- [x] 1 Build: worker (contact, intake, quote, admin), all pages, forms, pricing cards with required checkbox
- [x] 2-4 Copy/claims, footer, Pexels images (AVIF/WebP), SEO (metadata, sitemap, robots, JSON-LD), Google file, legal pages, logo + icons + OG
- [x] 5 Mobile 375px checked (no horizontal scroll), speed, functional check
- [x] 6 Local audit
- [x] Renamed to Replyingo (replyingo.com) 2026-11-11; wrangler name is now replyingo (next deploy creates a new Worker; the live one is still named replybuilt until the domain is moved); repo jstripe/replybuilt and the D1 database name replybuilt are kept
- [x] 7 Launch: pushed jstripe/replybuilt (private, main), deployed https://replybuilt.stripecloudflare.workers.dev, live smoke + audit OK
- [ ] 7.5 Domain: replyingo.com returns NXDOMAIN (2026-11-11), not delegated to the Stripe Cloudflare account yet; attach apex + www and verify 301s once it is
- [ ] STOP 2: company details + Airwallex links (04-final-launch-prompt.md)

## Pending (by hand / STOP 2)
- Add replyingo.com to the Stripe Cloudflare account, set nameservers at the registrar, then I attach replyingo.com + www
- wrangler secrets ADMIN_USERNAME, ADMIN_PASSWORD
- Email Routing contact@replyingo.com
- Company details ({{...}} in lib/site-config.ts) and 5 Airwallex links

## Tests
- API tests: 34/34 (scripts/test-api.mjs). Banned-word scan: 0 hits.

## Audit log (2026-11-11)
- Self-audit against final-standard.md and 02/03 prompts: added Security + Careers pages, "product of" footer line, billing FAQ + "Need more?" block, 2-row marquee, animated "Illustrative example" demo, more legal clauses (indemnity, general, automated decisions, US notice), SSR cookie notice (LCP fix).
- Independent agent audit of the live workers.dev site (03 prompt, adapted to a service + Airwallex): 0 blocking, 0 important, 9 minor. Fixed: withdrawal wording, turnaround start point, "Illustrative example" labels, legal breadcrumbs, HSTS (production domain only), slimmer mobile cookie bar, US spelling. Kept on purpose: "Most popular" badge (playbook standard), 307 slash redirect (platform behavior).
- Lighthouse mobile: home 93, others 100; accessibility 99-100, best practices 100, SEO 100.
- restropanel.com (legal reference) could not be fetched (broken TLS certificate), so legal coverage was checked against final-standard.md and the Step 3 prompt instead.
