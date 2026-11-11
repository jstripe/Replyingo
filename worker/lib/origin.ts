const DEV_ORIGINS = ["http://localhost:3105", "http://localhost:8795"];
const isLocalHost = (h: string) => h === "localhost" || h === "127.0.0.1" || h === "[::1]";

/** Origin allowed to receive credentialed CORS responses (dev only). */
export function devCorsOrigin(requestUrl: URL, origin: string | null): string | null {
  if (!origin || !isLocalHost(requestUrl.hostname)) return null;
  return DEV_ORIGINS.includes(origin) ? origin : null;
}

/** CSRF guard for mutating requests: true when the request may proceed. */
export function originAllowed(requestUrl: URL, origin: string | null, secFetchSite?: string | null): boolean {
  if (origin === null) return secFetchSite ? secFetchSite === "same-origin" || secFetchSite === "none" : true;
  let o: URL;
  try { o = new URL(origin); } catch { return false; }
  if (o.host === requestUrl.host) return true;
  return devCorsOrigin(requestUrl, origin) !== null;
}
