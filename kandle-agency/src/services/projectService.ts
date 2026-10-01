import type { Project } from "../types";
import { projects as seedProjects } from "../data/mockData";
import { USE_MOCK_BACKEND } from "./config";
import { api } from "./apiClient";

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
 * PHASE 1 (mock, default): reads/writes localStorage, seeded from the real
 * project data pulled out of the existing Kandle site.
 * PHASE 2 (VITE_ADMIN_API_URL set): calls the Apps Script API, which reads
 * and writes the PROJECTS tab of the real Google Sheet. Components never
 * know which mode is active — they just await these functions.
 */
export async function getProjects(): Promise<Project[]> {
  if (!USE_MOCK_BACKEND) {
    const list = await api.get<Project[]>("projects", { scope: "all" });
    return [...list].sort((a, b) => a.displayOrder - b.displayOrder);
  }
  return [...load()].sort((a, b) => a.displayOrder - b.displayOrder);
}

export async function getPublishedProjects(): Promise<Project[]> {
  if (!USE_MOCK_BACKEND) {
    const list = await api.get<Project[]>("projects", { scope: "published" });
    return [...list].sort((a, b) => a.displayOrder - b.displayOrder);
  }
  return (await getProjects()).filter((p) => p.status === "published");
}

export async function getFeaturedProjects(): Promise<Project[]> {
  return (await getPublishedProjects()).filter((p) => p.featured);
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  if (!USE_MOCK_BACKEND) {
    try {
      return await api.get<Project>("project", { slug });
    } catch {
      return undefined;
    }
  }
  return load().find((p) => p.slug === slug);
}

export async function saveProject(project: Project): Promise<Project[]> {
  if (!USE_MOCK_BACKEND) {
    await api.post<Project>("saveProject", { project });
    return getProjects();
  }
  const list = load();
  const exists = list.some((p) => p.id === project.id);
  const now = new Date().toISOString();
  const next = exists
    ? list.map((p) => (p.id === project.id ? { ...project, updatedAt: now } : p))
    : [...list, { ...project, createdAt: now, updatedAt: now }];
  persist(next);
  return next;
}

export async function deleteProject(id: string): Promise<Project[]> {
  if (!USE_MOCK_BACKEND) {
    await api.post("deleteProject", { id });
    return getProjects();
  }
  const next = load().filter((p) => p.id !== id);
  persist(next);
  return next;
}

export async function reorderProject(id: string, direction: "up" | "down"): Promise<Project[]> {
  if (!USE_MOCK_BACKEND) {
    await api.post("reorderProject", { id, direction });
    return getProjects();
  }
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
