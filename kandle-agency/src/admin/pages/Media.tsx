import { useEffect, useRef, useState } from "react";
import type { MediaAsset } from "../../types";
import { deleteMedia, getMedia, uploadMedia } from "../../services/mediaService";
import { Button } from "../../components/Button";
import { USE_MOCK_BACKEND } from "../../services/config";

export default function Media() {
  const [items, setItems] = useState<MediaAsset[]>([]);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getMedia().then(setItems);
  }, []);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    for (const file of Array.from(files)) {
      await uploadMedia(file, "uploads");
    }
    setItems(await getMedia());
    setUploading(false);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl text-ink">Media</h1>
          <p className="text-stone mt-1">Project images, logos, and other website assets.</p>
        </div>
        <div>
          <input
            ref={inputRef}
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            id="media-upload"
            onChange={(e) => handleFiles(e.target.files)}
          />
          <label htmlFor="media-upload">
            <Button variant="primary" className="!px-5 !py-2.5 text-sm cursor-pointer" onClick={() => inputRef.current?.click()}>
              {uploading ? "Uploading…" : "Upload files"}
            </Button>
          </label>
        </div>
      </div>

      <p className="mt-3 text-xs text-stone/70 max-w-xl">
        {USE_MOCK_BACKEND
          ? "In this prototype, uploads are stored in your browser only. Connect the Apps Script backend to save real files to Google Drive."
          : "Uploads are sent to your Apps Script backend and saved to the Drive folder it's configured with."}
      </p>

      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((m) => (
          <div key={m.id} className="bg-white border border-paper-line group relative">
            <div className="aspect-square overflow-hidden bg-paper-dim">
              <img src={m.url} alt={m.filename} className="h-full w-full object-cover" />
            </div>
            <div className="p-2.5">
              <p className="text-xs text-ink truncate">{m.filename}</p>
            </div>
            <button
              onClick={() => deleteMedia(m.id).then(setItems)}
              className="absolute top-2 right-2 h-7 w-7 bg-ink/70 text-paper text-xs opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label={`Delete ${m.filename}`}
            >
              ✕
            </button>
          </div>
        ))}
        {items.length === 0 && (
          <div className="col-span-full py-16 text-center text-stone text-sm border border-dashed border-paper-line">
            No media uploaded yet.
          </div>
        )}
      </div>
    </div>
  );
}
