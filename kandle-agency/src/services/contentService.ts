import type { SiteContent, StatMetric } from "../types";
import { siteContent as seedContent, stats as seedStats } from "../data/mockData";
import { USE_MOCK_BACKEND } from "./config";
import { api } from "./apiClient";

const CONTENT_KEY = "kandle_admin_content_v1";
const STATS_KEY = "kandle_admin_stats_v1";

/**
 * PHASE 1 (mock, default): editable site copy (hero, about, contact
 * headline, stats) lives in localStorage, edited from the admin Content
 * screen.
 * PHASE 2 (VITE_ADMIN_API_URL set): backed by the SETTINGS / STATS tabs of
 * the real Google Sheet via the Apps Script API.
 */
export async function getSiteContent(): Promise<SiteContent> {
  if (!USE_MOCK_BACKEND) {
    return api.get<SiteContent>("settings");
  }
  if (typeof window === "undefined") return seedContent;
  try {
    const raw = window.localStorage.getItem(CONTENT_KEY);
    return raw ? (JSON.parse(raw) as SiteContent) : seedContent;
  } catch {
    return seedContent;
  }
}

export async function saveSiteContent(content: SiteContent): Promise<SiteContent> {
  if (!USE_MOCK_BACKEND) {
    await api.post("saveSettings", { settings: content });
    return content;
  }
  if (typeof window !== "undefined") {
    window.localStorage.setItem(CONTENT_KEY, JSON.stringify(content));
  }
  return content;
}

export async function getStats(): Promise<StatMetric[]> {
  if (!USE_MOCK_BACKEND) {
    return api.get<StatMetric[]>("stats");
  }
  if (typeof window === "undefined") return seedStats;
  try {
    const raw = window.localStorage.getItem(STATS_KEY);
    return raw ? (JSON.parse(raw) as StatMetric[]) : seedStats;
  } catch {
    return seedStats;
  }
}

export async function saveStats(stats: StatMetric[]): Promise<StatMetric[]> {
  if (!USE_MOCK_BACKEND) {
    await api.post("saveStats", { stats });
    return stats;
  }
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  }
  return stats;
}
