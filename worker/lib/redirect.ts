/**
 * Canonical-host redirects. Returns the absolute target URL (301) or null.
 * Only applies when the request host belongs to the production domain family
 * (apex, www., or other subdomains of the SITE_URL host). Never touches
 * localhost, 127.0.0.1 or *.workers.dev.
 */
export function redirectTarget(requestUrl: URL, siteUrl: string): string | null {
  let prod: string;
  try { prod = new URL(siteUrl).hostname.toLowerCase(); } catch { return null; }
  const host = requestUrl.hostname.toLowerCase();
  const inFamily = host === prod || host.endsWith("." + prod);
  if (!inFamily) return null;
  const target = new URL(requestUrl.toString());
  let changed = false;
  if (target.protocol === "http:") { target.protocol = "https:"; target.port = ""; changed = true; }
  if (host === "www." + prod) { target.hostname = prod; changed = true; }
  return changed ? target.toString() : null;
}
