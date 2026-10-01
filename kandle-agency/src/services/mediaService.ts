import type { MediaAsset } from "../types";
import { USE_MOCK_BACKEND } from "./config";
import { api } from "./apiClient";

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

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

/**
 * PHASE 1 (mock, default): files are read as data URLs and kept in the
 * browser only (localStorage) — nothing is uploaded anywhere.
 * PHASE 2 (VITE_ADMIN_API_URL set): the file is base64-encoded and POSTed
 * to the Apps Script API, which saves it into a Drive folder and returns a
 * public URL. The browser never holds a Google Drive credential — Apps
 * Script runs under your own logged-in Google account.
 */
export async function getMedia(): Promise<MediaAsset[]> {
  if (!USE_MOCK_BACKEND) {
    return api.get<MediaAsset[]>("media");
  }
  return load().sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export async function uploadMedia(file: File, folder: string): Promise<MediaAsset> {
  const dataUrl = await fileToBase64(file);

  if (!USE_MOCK_BACKEND) {
    return api.post<MediaAsset>("uploadMedia", {
      filename: file.name,
      mimeType: file.type,
      folder,
      dataUrl,
    });
  }

  const asset: MediaAsset = {
    id: `media-${Date.now()}`,
    filename: file.name,
    url: dataUrl,
    type: file.type.startsWith("image") ? "image" : "document",
    folder,
    createdAt: new Date().toISOString(),
  };
  const next = [asset, ...load()];
  persist(next);
  return asset;
}

export async function deleteMedia(id: string): Promise<MediaAsset[]> {
  if (!USE_MOCK_BACKEND) {
    await api.post("deleteMedia", { id });
    return getMedia();
  }
  const next = load().filter((m) => m.id !== id);
  persist(next);
  return next;
}
