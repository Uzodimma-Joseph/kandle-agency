import type { ContactSubmission, Lead, LeadStatus } from "../types";
import { mockLeads } from "../data/mockData";
import { ADMIN_API_URL } from "./config";

const STORAGE_KEY = "kandle_admin_leads_v1";

function load(): Lead[] {
  if (typeof window === "undefined") return mockLeads;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return mockLeads;
    return JSON.parse(raw) as Lead[];
  } catch {
    return mockLeads;
  }
}

function persist(leads: Lead[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
}

/**
 * PHASE 1 (mock): leads live in localStorage so the admin demo persists
 * across refreshes in the browser.
 * PHASE 2 (real): replace the bodies of these functions with calls to
 * ADMIN_API_URL (or a Google Sheets-reading automation endpoint), keeping
 * the same function signatures so admin/pages/* never need to change.
 */
export function getLeads(): Lead[] {
  return [...load()].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export function addLead(payload: ContactSubmission): Lead {
  const leads = load();
  const now = new Date().toISOString();
  const lead: Lead = {
    id: `lead-${Date.now()}`,
    ...payload,
    status: "new",
    createdAt: now,
    updatedAt: now,
    source: "Website",
  };
  const next = [lead, ...leads];
  persist(next);
  return lead;
}

export function updateLeadStatus(id: string, status: LeadStatus): Lead[] {
  const leads = load().map((l) =>
    l.id === id ? { ...l, status, updatedAt: new Date().toISOString() } : l
  );
  persist(leads);
  return leads;
}

export function addLeadNote(id: string, body: string): Lead[] {
  const leads = load().map((l) =>
    l.id === id
      ? {
          ...l,
          notes: [...(l.notes ?? []), { id: `note-${Date.now()}`, body, createdAt: new Date().toISOString() }],
          updatedAt: new Date().toISOString(),
        }
      : l
  );
  persist(leads);
  return leads;
}

export function setLeadFollowup(id: string, nextFollowup: string) {
  const leads = load().map((l) =>
    l.id === id ? { ...l, nextFollowup, updatedAt: new Date().toISOString() } : l
  );
  persist(leads);
  return leads;
}

export function markContacted(id: string) {
  const leads = load().map((l) =>
    l.id === id
      ? { ...l, lastContacted: new Date().toISOString(), updatedAt: new Date().toISOString() }
      : l
  );
  persist(leads);
  return leads;
}

export const isRemoteLeadBackend = Boolean(ADMIN_API_URL);
