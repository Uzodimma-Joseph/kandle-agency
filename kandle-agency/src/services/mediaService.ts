import type { MediaAsset } from "../types";

const STORAGE_KEY = "kandle_admin_media_v1";

function load(): MediaAsset[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as MediaAsset[]) : [];
  } catch {
    return [];
  }
}

function persist(list: MediaAsset[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

/**
 * PHASE 1 (mock): files are read as data URLs and kept in the browser only
 * (localStorage), purely so the admin Media screen has something real to
 * show and delete. Nothing is uploaded anywhere.
 * PHASE 2 (real): swap uploadMedia's body for a POST to an automation
 * webhook that streams the file to Google Drive and returns a public URL —
 * the browser should never hold a Google Drive credential directly.
 */
export function getMedia(): MediaAsset[] {
  return load().sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export function uploadMedia(file: File, folder: string): Promise<MediaAsset> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const asset: MediaAsset = {
        id: `media-${Date.now()}`,
        filename: file.name,
        url: String(reader.result),
        type: file.type.startsWith("image") ? "image" : "document",
        folder,
        createdAt: new Date().toISOString(),
      };
      const next = [asset, ...load()];
      persist(next);
      resolve(asset);
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export function deleteMedia(id: string): MediaAsset[] {
  const next = load().filter((m) => m.id !== id);
  persist(next);
  return next;
}
