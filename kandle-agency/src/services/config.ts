// Central place for the integration points described in the brief.
// PHASE 1 (now, default): everything runs on mock data / localStorage, so
// the UI is fully demonstrable with no backend at all.
// PHASE 2 (once VITE_ADMIN_API_URL is set): a single Google Apps Script Web
// App (see /apps-script/Code.gs) backs leads, projects, and site content —
// all reading/writing the Kandle-Data-Model Google Sheet. One URL handles
// the public contact form AND the admin panel.
//
// IMPORTANT: only VITE_-prefixed values belong here, and only ones that are
// safe to expose to the browser (endpoint URL, and a lightweight shared
// token — NOT a real secret, just enough to stop randoms from writing junk
// data). Never put Google service-account keys or admin passwords here.

export const ADMIN_API_URL = import.meta.env.VITE_ADMIN_API_URL ?? "";
export const ADMIN_API_TOKEN = import.meta.env.VITE_ADMIN_API_TOKEN ?? "";

export const USE_MOCK_BACKEND = !ADMIN_API_URL;
