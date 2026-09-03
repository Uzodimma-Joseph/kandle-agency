import type { Project } from "../types";
import { projects as seedProjects } from "../data/mockData";

const STORAGE_KEY = "kandle_admin_projects_v1";

function load(): Project[] {
  if (typeof window === "undefined") return seedProjects;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return seedProjects;
    return JSON.parse(raw) as Project[];
  } catch {
    return seedProjects;
  }
}

function persist(list: Project[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

/**
 * PHASE 1 (mock): reads/writes localStorage, seeded from the real project
 * data pulled out of the existing Kandle site.
 * PHASE 2 (real): swap these bodies for calls to a PROJECTS sheet via the
 * automation API — the admin Projects screen and public Work/case-study
 * pages consume this module only, never localStorage directly.
 */
export function getProjects(): Project[] {
  return [...load()].sort((a, b) => a.displayOrder - b.displayOrder);
}

export function getPublishedProjects(): Project[] {
  return getProjects().filter((p) => p.status === "published");
}

export function getFeaturedProjects(): Project[] {
  return getPublishedProjects().filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return load().find((p) => p.slug === slug);
}

export function saveProject(project: Project): Project[] {
  const list = load();
  const exists = list.some((p) => p.id === project.id);
  const now = new Date().toISOString();
  const next = exists
    ? list.map((p) => (p.id === project.id ? { ...project, updatedAt: now } : p))
    : [...list, { ...project, createdAt: now, updatedAt: now }];
  persist(next);
  return next;
}

export function deleteProject(id: string): Project[] {
  const next = load().filter((p) => p.id !== id);
  persist(next);
  return next;
}

export function reorderProject(id: string, direction: "up" | "down"): Project[] {
  const list = [...load()].sort((a, b) => a.displayOrder - b.displayOrder);
  const idx = list.findIndex((p) => p.id === id);
  const swapWith = direction === "up" ? idx - 1 : idx + 1;
  if (idx < 0 || swapWith < 0 || swapWith >= list.length) return list;
  const a = list[idx].displayOrder;
  list[idx].displayOrder = list[swapWith].displayOrder;
  list[swapWith].displayOrder = a;
  persist(list);
  return list;
}
