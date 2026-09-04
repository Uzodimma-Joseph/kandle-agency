import { useEffect, useState } from "react";
import { siteContent as seedContent, stats as seedStats } from "../data/mockData";
import { getSiteContent, getStats } from "../services/contentService";
import type { SiteContent, StatMetric } from "../types";

// Paints instantly with the known seed copy, then swaps in the live
// content once it resolves (from localStorage in the mock phase, or from
// the real Google Sheet once the Apps Script backend is connected).
export function useSiteContent(): SiteContent {
  const [content, setContent] = useState<SiteContent>(seedContent);
  useEffect(() => {
    let active = true;
    getSiteContent().then((c) => active && setContent(c));
    return () => {
      active = false;
    };
  }, []);
  return content;
}

export function useStats(): StatMetric[] {
  const [stats, setStats] = useState<StatMetric[]>(seedStats);
  useEffect(() => {
    let active = true;
    getStats().then((s) => active && setStats(s));
    return () => {
      active = false;
    };
  }, []);
  return stats;
}
