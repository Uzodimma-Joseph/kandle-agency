import type { SiteContent, StatMetric } from "../types";
import { siteContent as seedContent, stats as seedStats } from "../data/mockData";

const CONTENT_KEY = "kandle_admin_content_v1";
const STATS_KEY = "kandle_admin_stats_v1";

/**
 * PHASE 1 (mock): editable site copy (hero, about, contact headline, stats)
 * lives in localStorage, edited from the admin Content screen.
 * PHASE 2 (real): back this with a SETTINGS / STATS sheet read through the
 * automation API on app load, with the same shape.
 */
export function getSiteContent(): SiteContent {
  if (typeof window === "undefined") return seedContent;
  try {
    const raw = window.localStorage.getItem(CONTENT_KEY);
    return raw ? (JSON.parse(raw) as SiteContent) : seedContent;
  } catch {
    return seedContent;
  }
}

export function saveSiteContent(content: SiteContent): SiteContent {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(CONTENT_KEY, JSON.stringify(content));
  }
  return content;
}

export function getStats(): StatMetric[] {
  if (typeof window === "undefined") return seedStats;
  try {
    const raw = window.localStorage.getItem(STATS_KEY);
    return raw ? (JSON.parse(raw) as StatMetric[]) : seedStats;
  } catch {
    return seedStats;
  }
}

export function saveStats(stats: StatMetric[]): StatMetric[] {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  }
  return stats;
}
