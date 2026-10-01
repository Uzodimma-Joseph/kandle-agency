import type { ContactSubmission, Lead, LeadStatus } from "../types";
import { mockLeads } from "../data/mockData";
import { USE_MOCK_BACKEND } from "./config";
import { api } from "./apiClient";

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
 * PHASE 1 (mock, default): leads live in localStorage so the admin demo
 * persists across refreshes in the browser.
 * PHASE 2 (VITE_ADMIN_API_URL set): backed by the LEADS / LEAD_NOTES tabs
 * of the real Google Sheet via the Apps Script API.
 */
export async function getLeads(): Promise<Lead[]> {
  if (!USE_MOCK_BACKEND) {
    const leads = await api.get<Lead[]>("leads");
    return [...leads].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  }
  return [...load()].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export async function addLead(payload: ContactSubmission): Promise<Lead> {
  if (!USE_MOCK_BACKEND) {
    return api.post<Lead>("submitLead", { lead: payload });
  }
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

export async function updateLeadStatus(id: string, status: LeadStatus): Promise<Lead[]> {
  if (!USE_MOCK_BACKEND) {
    await api.post("updateLeadStatus", { id, status });
    return getLeads();
  }
  const leads = load().map((l) =>
    l.id === id ? { ...l, status, updatedAt: new Date().toISOString() } : l
  );
  persist(leads);
  return leads;
}

export async function addLeadNote(id: string, body: string): Promise<Lead[]> {
  if (!USE_MOCK_BACKEND) {
    await api.post("addLeadNote", { id, body });
    return getLeads();
  }
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

export async function setLeadFollowup(id: string, nextFollowup: string): Promise<Lead[]> {
  if (!USE_MOCK_BACKEND) {
    await api.post("setLeadFollowup", { id, nextFollowup });
    return getLeads();
  }
  const leads = load().map((l) =>
    l.id === id ? { ...l, nextFollowup, updatedAt: new Date().toISOString() } : l
  );
  persist(leads);
  return leads;
}

export async function markContacted(id: string): Promise<Lead[]> {
  if (!USE_MOCK_BACKEND) {
    await api.post("markContacted", { id });
    return getLeads();
  }
  const leads = load().map((l) =>
    l.id === id
      ? { ...l, lastContacted: new Date().toISOString(), updatedAt: new Date().toISOString() }
      : l
  );
  persist(leads);
  return leads;
}
