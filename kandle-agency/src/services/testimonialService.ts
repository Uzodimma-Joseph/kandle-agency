import type { Testimonial } from "../types";
import { testimonials as seedTestimonials } from "../data/mockData";
import { USE_MOCK_BACKEND } from "./config";
import { api } from "./apiClient";

const STORAGE_KEY = "kandle_admin_testimonials_v1";

function load(): Testimonial[] {
  if (typeof window === "undefined") return seedTestimonials;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return seedTestimonials;
    return JSON.parse(raw) as Testimonial[];
  } catch {
    return seedTestimonials;
  }
}

function persist(list: Testimonial[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

/**
 * PHASE 1 (mock, default): reads/writes localStorage. Starts empty — no
 * fabricated testimonials ship with the demo; add real ones from the
 * admin Testimonials page once you have them.
 * PHASE 2 (VITE_ADMIN_API_URL set): backed by the TESTIMONIALS tab of the
 * real Google Sheet via the Apps Script API.
 */
export async function getTestimonials(): Promise<Testimonial[]> {
  if (!USE_MOCK_BACKEND) {
    const list = await api.get<Testimonial[]>("testimonials", { scope: "all" });
    return [...list].sort((a, b) => a.displayOrder - b.displayOrder);
  }
  return [...load()].sort((a, b) => a.displayOrder - b.displayOrder);
}

export async function getPublishedTestimonials(): Promise<Testimonial[]> {
  if (!USE_MOCK_BACKEND) {
    const list = await api.get<Testimonial[]>("testimonials", { scope: "published" });
    return [...list].sort((a, b) => a.displayOrder - b.displayOrder);
  }
  return (await getTestimonials()).filter((t) => t.status === "published");
}

export async function saveTestimonial(testimonial: Testimonial): Promise<Testimonial[]> {
  if (!USE_MOCK_BACKEND) {
    await api.post<Testimonial>("saveTestimonial", { testimonial });
    return getTestimonials();
  }
  const list = load();
  const exists = list.some((t) => t.id === testimonial.id);
  const now = new Date().toISOString();
  const next = exists
    ? list.map((t) => (t.id === testimonial.id ? { ...testimonial, updatedAt: now } : t))
    : [...list, { ...testimonial, createdAt: now, updatedAt: now }];
  persist(next);
  return next;
}

export async function deleteTestimonial(id: string): Promise<Testimonial[]> {
  if (!USE_MOCK_BACKEND) {
    await api.post("deleteTestimonial", { id });
    return getTestimonials();
  }
  const next = load().filter((t) => t.id !== id);
  persist(next);
  return next;
}

export async function reorderTestimonial(id: string, direction: "up" | "down"): Promise<Testimonial[]> {
  if (!USE_MOCK_BACKEND) {
    await api.post("reorderTestimonial", { id, direction });
    return getTestimonials();
  }
  const list = [...load()].sort((a, b) => a.displayOrder - b.displayOrder);
  const idx = list.findIndex((t) => t.id === id);
  const swapWith = direction === "up" ? idx - 1 : idx + 1;
  if (idx < 0 || swapWith < 0 || swapWith >= list.length) return list;
  const a = list[idx].displayOrder;
  list[idx].displayOrder = list[swapWith].displayOrder;
  list[swapWith].displayOrder = a;
  persist(list);
  return list;
}
