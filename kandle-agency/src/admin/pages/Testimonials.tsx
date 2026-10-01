import { useEffect, useState } from "react";
import type { Testimonial } from "../../types";
import { deleteTestimonial, getTestimonials, reorderTestimonial, saveTestimonial } from "../../services/testimonialService";
import { Button } from "../../components/Button";

const blank: Testimonial = {
  id: "",
  authorName: "",
  authorRole: "",
  company: "",
  quote: "",
  rating: 5,
  featured: false,
  displayOrder: 999,
  status: "draft",
  createdAt: "",
  updatedAt: "",
};

export default function Testimonials() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [editing, setEditing] = useState<Testimonial | null>(null);

  useEffect(() => {
    getTestimonials().then(setItems);
  }, []);

  useEffect(() => {
    if (!editing) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setEditing(null);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [editing]);

  function refresh(next: Promise<Testimonial[]>) {
    next.then((list) => setItems([...list].sort((a, b) => a.displayOrder - b.displayOrder)));
  }

  function startNew() {
    setEditing({ ...blank, id: `testimonial-${Date.now()}`, displayOrder: items.length + 1 });
  }

  const canSave = !!editing?.authorName.trim() && !!editing?.quote.trim();

  function handleSave() {
    if (!editing || !canSave) return;
    refresh(saveTestimonial(editing));
    setEditing(null);
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl text-ink">Testimonials</h1>
          <p className="text-stone mt-1">{items.length} on file — only real client feedback belongs here.</p>
        </div>
        <Button variant="primary" className="!px-5 !py-2.5 text-sm" onClick={startNew}>
          Add testimonial
        </Button>
      </div>

      <p className="mt-3 text-xs text-stone/70 max-w-xl">
        Nothing here is invented or seeded with demo content on purpose — the public site simply hides this
        section until at least one testimonial is published. Add only feedback a real client actually gave you.
      </p>

      <div className="mt-6 bg-white border border-paper-line divide-y divide-paper-line">
        {items.map((t, i) => (
          <div key={t.id} className="flex items-start gap-4 px-5 py-4">
            <div className="min-w-0 flex-1">
              <div className="text-ink font-medium truncate">
                {t.authorName || "(no name)"}
                {t.company ? ` — ${t.company}` : ""}
              </div>
              <p className="text-sm text-stone mt-1 line-clamp-2">{t.quote}</p>
              <div className="text-xs text-stone/70 mt-1">
                {t.status === "published" ? "Published" : "Draft"}
                {t.featured ? " · Featured" : ""}
                {typeof t.rating === "number" && t.rating > 0 ? ` · ${t.rating}/5` : ""}
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button
                aria-label="Move up"
                onClick={() => refresh(reorderTestimonial(t.id, "up"))}
                disabled={i === 0}
                className="h-8 w-8 flex items-center justify-center border border-paper-line disabled:opacity-30"
              >
                ↑
              </button>
              <button
                aria-label="Move down"
                onClick={() => refresh(reorderTestimonial(t.id, "down"))}
                disabled={i === items.length - 1}
                className="h-8 w-8 flex items-center justify-center border border-paper-line disabled:opacity-30"
              >
                ↓
              </button>
              <Button variant="stroke-dark" className="!px-3 !py-1.5 text-xs ml-2" onClick={() => setEditing(t)}>
                Edit
              </Button>
              <button
                onClick={() => {
                  if (confirm(`Delete this testimonial from ${t.authorName}?`)) refresh(deleteTestimonial(t.id));
                }}
                className="text-xs text-red-600 px-3 py-1.5 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="px-5 py-10 text-center text-stone text-sm">No testimonials yet.</div>
        )}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 bg-ink/60 flex items-center justify-center p-4" onClick={() => setEditing(null)}>
          <div className="bg-white w-full max-w-xl max-h-[88vh] overflow-y-auto p-6 sm:p-8" onClick={(e) => e.stopPropagation()}>
            <h2 className="font-serif text-xl mb-6">{editing.authorName ? "Edit testimonial" : "New testimonial"}</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Author name">
                  <input className="input" value={editing.authorName} onChange={(e) => setEditing({ ...editing, authorName: e.target.value })} />
                </Field>
                <Field label="Company (optional)">
                  <input className="input" value={editing.company} onChange={(e) => setEditing({ ...editing, company: e.target.value })} />
                </Field>
                <Field label="Role (optional)">
                  <input className="input" value={editing.authorRole} onChange={(e) => setEditing({ ...editing, authorRole: e.target.value })} />
                </Field>
                <Field label="Rating (0 = hide stars)">
                  <select
                    className="input"
                    value={editing.rating ?? 0}
                    onChange={(e) => setEditing({ ...editing, rating: Number(e.target.value) })}
                  >
                    {[0, 1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>{n === 0 ? "No rating" : `${n} / 5`}</option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field label="Quote">
                <textarea className="input" rows={4} value={editing.quote} onChange={(e) => setEditing({ ...editing, quote: e.target.value })} />
              </Field>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-sm text-ink">
                  <input type="checkbox" checked={editing.featured} onChange={(e) => setEditing({ ...editing, featured: e.target.checked })} />
                  Featured
                </label>
                <label className="flex items-center gap-2 text-sm text-ink">
                  <input
                    type="checkbox"
                    checked={editing.status === "published"}
                    onChange={(e) => setEditing({ ...editing, status: e.target.checked ? "published" : "draft" })}
                  />
                  Published
                </label>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-8">
              <Button variant="stroke-dark" className="!px-5 !py-2.5 text-sm" onClick={() => setEditing(null)}>
                Cancel
              </Button>
              <Button variant="primary" className="!px-5 !py-2.5 text-sm" onClick={handleSave} disabled={!canSave}>
                Save testimonial
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs text-stone block mb-1.5">{label}</label>
      {children}
    </div>
  );
}
