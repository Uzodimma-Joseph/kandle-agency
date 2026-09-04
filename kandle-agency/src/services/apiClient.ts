import { ADMIN_API_URL, ADMIN_API_TOKEN } from "./config";

// Talks to the Apps Script Web App (see /apps-script/Code.gs).
//
// Two deliberate quirks here, both required to work reliably with Apps
// Script's Web App runtime:
//
// 1. POST bodies are sent as `text/plain`, not `application/json`. Apps
//    Script's HTML service doesn't handle CORS preflight (OPTIONS)
//    requests, so a "real" JSON content-type — which triggers a preflight
//    — just fails. `text/plain` is a CORS-safelisted content type, so the
//    browser sends it as a "simple request" with no preflight. The Apps
//    Script side still reads and JSON.parses the raw body itself.
// 2. GET requests use query params only, for the same reason (keeps every
//    request "simple" so no preflight is ever triggered).

async function get<T>(action: string, params: Record<string, string> = {}): Promise<T> {
  const url = new URL(ADMIN_API_URL);
  url.searchParams.set("action", action);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const res = await fetch(url.toString(), { method: "GET" });
  if (!res.ok) throw new Error(`Request failed: ${action}`);
  const json = await res.json();
  if (json.ok === false) throw new Error(json.error || `Request failed: ${action}`);
  return json.data as T;
}

async function post<T>(action: string, payload: Record<string, unknown> = {}): Promise<T> {
  const res = await fetch(ADMIN_API_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ action, token: ADMIN_API_TOKEN, ...payload }),
  });
  if (!res.ok) throw new Error(`Request failed: ${action}`);
  const json = await res.json();
  if (json.ok === false) throw new Error(json.error || `Request failed: ${action}`);
  return json.data as T;
}

export const api = { get, post };
