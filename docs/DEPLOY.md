# Deploy

Stripe Cloudflare account id: afa4f082a470ce277cf6774c8660cafc (always prefix, wrangler is logged in to two accounts).

```
npm install
npm run build
CLOUDFLARE_ACCOUNT_ID=afa4f082a470ce277cf6774c8660cafc npx wrangler deploy
```
The first deploy creates the D1 database (no database_id in wrangler.jsonc). Redeploy after every change (CLI deploys do not follow GitHub pushes).

## Worker secrets (set by the owner)
```
CLOUDFLARE_ACCOUNT_ID=afa4f082a470ce277cf6774c8660cafc npx wrangler secret put ADMIN_USERNAME
CLOUDFLARE_ACCOUNT_ID=afa4f082a470ce277cf6774c8660cafc npx wrangler secret put ADMIN_PASSWORD
```
Use a long random password. /admin/ lists the details customers send after paying, quote requests and contact messages.

## Airwallex Payment Links
One link per fixed offer, one-time, EUR, product named exactly like the offer, amount equal to lib/api-types.ts OFFER_CATALOG.
After payment redirect (if Airwallex lets you set it): https://<domain>/thank-you/?offer=<starter|pro|templates|profile|visibility>
Put the URLs in lib/site-config.ts payLinks (or NEXT_PUBLIC_PAY_* env vars at build time).

## Domain and email
Add the domain to the Stripe Cloudflare account, attach <domain> and www.<domain> to the Worker (Domains and Routes). Email Routing: contact@<domain> to your inbox. Email Sending is optional (the site does not send emails; you reply from your inbox).

## Local
```
rm -rf .wrangler-state && npm run build && npm run worker:dev   # :8795
API_BASE=http://localhost:8795 npm run test:api
npm run scan
```
