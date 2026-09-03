// Central place for the integration points described in the brief.
// PHASE 1 (now): everything runs on mock data / in-memory state, so the UI
// is fully demonstrable with no backend at all.
// PHASE 2 (later): point these at a real automation webhook (n8n, Make,
// Zapier, Google Apps Script) that writes to Google Sheets / Drive, without
// changing any component — only the service implementations below.
//
// IMPORTANT: only VITE_-prefixed values belong here, and only ones that are
// safe to expose to the browser (endpoint URLs, not secrets). Never put
// Google service-account keys, admin passwords, or webhook signing secrets
// in frontend code or in a VITE_ variable — those stay inside the
// automation platform / server side.

export const CONTACT_WEBHOOK_URL = import.meta.env.VITE_CONTACT_WEBHOOK_URL ?? "";
export const ADMIN_API_URL = import.meta.env.VITE_ADMIN_API_URL ?? "";

export const USE_MOCK_BACKEND = !CONTACT_WEBHOOK_URL && !ADMIN_API_URL;
