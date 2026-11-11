# PROGRESS: ReplyBuilt

Started 2026-11-09. Playbook: ~/Desktop/Stripe Websites. Skills ui-ux-pro-max / frontend-design / web-perf were not invoked as skills; same goals followed by hand (noted per playbook).

## Decisions
- Service business, so no signup/login/app/credits. Admin at /admin/ (noindex) with ADMIN_USERNAME + ADMIN_PASSWORD Worker secrets.
- Pages follow the owner's brief: Home, Pricing, Examples, FAQ, About, Contact, Quote, Thank-you, Legal Notice, Terms, Refund, Privacy, Cookies, 404. No Features/Careers/Security pages (not in brief). Footer columns SERVICES / COMPANY / LEGAL.
- English, EUR. Light theme only (brief asks for white).
- Cookie notice kept (brief asks for banner). Site sets no cookies for visitors; notice is honest about that.
- Ports: 8790 was taken by ~/linguadesk (not touched). Using 8795 (worker) and 3105 (next dev).
- Company fields are {{...}} values in lib/site-config.ts until STOP 2.
- "Most popular" badge on Reply Pro per playbook standard.

## Phases
- [x] 0 Brief (PROJECT-BRIEF.md)
- [x] 1 Build: worker (contact, intake, quote, admin), all pages, forms, pricing cards with required checkbox
- [x] 2-4 Copy/claims, footer, Pexels images (AVIF/WebP), SEO (metadata, sitemap, robots, JSON-LD), Google file, legal pages, logo + icons + OG
- [x] 5 Mobile 375px checked (no horizontal scroll), speed, functional check
- [x] 6 Local audit
- [ ] STOP 1: brand name, domain, jstripe repo name
- [ ] 7 Launch (rename, push, deploy, live audit)
- [ ] STOP 2: company details + Airwallex links (04-final-launch-prompt.md)

## Tests
- API tests: 34/34 (scripts/test-api.mjs). Banned-word scan: 0 hits.
