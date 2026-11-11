import type { AdminKind, AdminOverview, ApiError, Capabilities, ContactRequest, IntakeRequest, QuoteRequest } from "./api-types";

/** Empty in production (same origin). `npm run dev` sets NEXT_PUBLIC_API_BASE=http://localhost:8795. */
export const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "";

export class ApiException extends Error {
  constructor(public status: number, public code: string, message: string) { super(message); }
}

async function call<T>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(API_BASE + path, { credentials: "include", ...init });
  if (!res.ok) {
    let body: Partial<ApiError> = {};
    try { body = await res.json(); } catch { /* not JSON */ }
    throw new ApiException(res.status, body.error || "error", body.message || `Request failed (${res.status})`);
  }
  return (res.status === 204 ? undefined : await res.json()) as T;
}

const json = (method: string, body?: unknown): RequestInit => ({
  method, headers: { "Content-Type": "application/json" }, body: body === undefined ? undefined : JSON.stringify(body),
});

export const api = {
  health: () => call<Capabilities>("/api/health"),
  contact: (b: ContactRequest) => call<{ ok: true }>("/api/contact", json("POST", b)),
  intake: (b: IntakeRequest) => call<{ ok: true }>("/api/intake", json("POST", b)),
  quote: (b: QuoteRequest) => call<{ ok: true }>("/api/quote", json("POST", b)),
  adminLogin: (username: string, password: string) => call<{ ok: true }>("/api/admin/login", json("POST", { username, password })),
  adminLogout: () => call<void>("/api/admin/logout", json("POST")),
  adminSession: () => call<{ ok: true }>("/api/admin/session"),
  adminOverview: () => call<AdminOverview>("/api/admin/overview"),
  adminHandled: (kind: AdminKind, id: string) => call<{ ok: true }>("/api/admin/handled", json("POST", { kind, id })),
};

export const formatDate = (ms: number) => new Date(ms).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" });
