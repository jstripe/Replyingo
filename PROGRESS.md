# PROGRESS: ReplyBuilt

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
- [x] STOP 1 answered 2026-11-11: ReplyBuilt, replybuilt.com, repo jstripe/replybuilt
- [x] 7 Launch: renamed (0 old-name hits in repo, out/, history, OG image, live HTML), pushed jstripe/replybuilt (private, main), deployed https://replybuilt.stripecloudflare.workers.dev (D1 replybuilt created), live smoke + audit OK
- [ ] 7.5 Domain: replybuilt.com returns NXDOMAIN (2026-11-11), not delegated to the Stripe Cloudflare account yet; attach apex + www and verify 301s once it is
- [ ] STOP 2: company details + Airwallex links (04-final-launch-prompt.md)

## Pending (by hand / STOP 2)
- Add replybuilt.com to the Stripe Cloudflare account, set nameservers at the registrar, then I attach replybuilt.com + www
- wrangler secrets ADMIN_USERNAME, ADMIN_PASSWORD
- Email Routing contact@replybuilt.com
- Company details ({{...}} in lib/site-config.ts) and 5 Airwallex links

## Tests
- API tests: 34/34 (scripts/test-api.mjs). Banned-word scan: 0 hits.
