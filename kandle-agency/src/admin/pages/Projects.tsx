import { useEffect, useState } from "react";
import type { Project } from "../../types";
import { deleteProject, getProjects, reorderProject, saveProject } from "../../services/projectService";
import { Button } from "../../components/Button";

const FALLBACK_COVER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%23EAEBDF'/%3E%3C/svg%3E";

const blank: Project = {
  id: "",
  title: "",
  slug: "",
  client: "",
  category: "Branding",
  description: "",
  year: new Date().getFullYear().toString(),
  featured: false,
  displayOrder: 999,
  coverImage: "",
  size: "small",
  status: "draft",
  overview: "",
  challenge: "",
  approach: "",
  solution: "",
  createdAt: "",
  updatedAt: "",
};

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editing, setEditing] = useState<Project | null>(null);

  useEffect(() => {
    setProjects(getProjects());
  }, []);

  useEffect(() => {
    if (!editing) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setEditing(null);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [editing]);

  function refresh(next: Project[]) {
    setProjects([...next].sort((a, b) => a.displayOrder - b.displayOrder));
  }

  function startNew() {
    setEditing({ ...blank, id: `project-${Date.now()}`, displayOrder: projects.length + 1 });
  }

  const canSave = !!editing?.title.trim();

  function handleSave() {
    if (!editing || !canSave) return;
    const slug = editing.slug || slugify(editing.title);
    const coverImage = editing.coverImage.trim() || FALLBACK_COVER;
    refresh(saveProject({ ...editing, slug, coverImage }));
    setEditing(null);
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl text-ink">Projects</h1>
          <p className="text-stone mt-1">{projects.length} in the portfolio</p>
        </div>
        <Button variant="primary" className="!px-5 !py-2.5 text-sm" onClick={startNew}>
          Add project
        </Button>
      </div>

      <div className="mt-8 bg-white border border-paper-line divide-y divide-paper-line">
        {projects.map((p, i) => (
          <div key={p.id} className="flex items-center gap-4 px-5 py-4">
            <img src={p.coverImage || FALLBACK_COVER} alt="" className="h-14 w-20 object-cover bg-paper-dim shrink-0" />
            <div className="min-w-0 flex-1">
              <div className="text-ink font-medium truncate">{p.title}</div>
              <div className="text-sm text-stone truncate">
                {p.category} {p.year ? `· ${p.year}` : ""} · {p.status === "published" ? "Published" : "Draft"}
                {p.featured ? " · Featured" : ""}
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button
                aria-label="Move up"
                onClick={() => refresh(reorderProject(p.id, "up"))}
                disabled={i === 0}
                className="h-8 w-8 flex items-center justify-center border border-paper-line disabled:opacity-30"
              >
                ↑
              </button>
              <button
                aria-label="Move down"
                onClick={() => refresh(reorderProject(p.id, "down"))}
                disabled={i === projects.length - 1}
                className="h-8 w-8 flex items-center justify-center border border-paper-line disabled:opacity-30"
              >
                ↓
              </button>
              <Button variant="stroke-dark" className="!px-3 !py-1.5 text-xs ml-2" onClick={() => setEditing(p)}>
                Edit
              </Button>
              <button
                onClick={() => {
                  if (confirm(`Delete "${p.title}"?`)) refresh(deleteProject(p.id));
                }}
                className="text-xs text-red-600 px-3 py-1.5 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {projects.length === 0 && <div className="px-5 py-10 text-center text-stone text-sm">No projects yet.</div>}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 bg-ink/60 flex items-center justify-center p-4" onClick={() => setEditing(null)}>
          <div
            className="bg-white w-full max-w-2xl max-h-[88vh] overflow-y-auto p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-serif text-xl mb-6">{editing.title ? "Edit project" : "New project"}</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Title">
                  <input className="input" value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
                </Field>
                <Field label="Client">
                  <input className="input" value={editing.client} onChange={(e) => setEditing({ ...editing, client: e.target.value })} />
                </Field>
                <Field label="Category">
                  <input className="input" value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })} />
                </Field>
                <Field label="Year">
                  <input className="input" value={editing.year} onChange={(e) => setEditing({ ...editing, year: e.target.value })} />
                </Field>
                <Field label="Cover image URL">
                  <input className="input" value={editing.coverImage} onChange={(e) => setEditing({ ...editing, coverImage: e.target.value })} />
                </Field>
                <Field label="Card size">
                  <select
                    className="input"
                    value={editing.size}
                    onChange={(e) => setEditing({ ...editing, size: e.target.value as Project["size"] })}
                  >
                    <option value="large">Large</option>
                    <option value="medium">Medium</option>
                    <option value="small">Small</option>
                  </select>
                </Field>
              </div>

              <Field label="Short description">
                <textarea className="input" rows={2} value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
              </Field>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Overview">
                  <textarea className="input" rows={3} value={editing.overview} onChange={(e) => setEditing({ ...editing, overview: e.target.value })} />
                </Field>
                <Field label="Challenge">
                  <textarea className="input" rows={3} value={editing.challenge} onChange={(e) => setEditing({ ...editing, challenge: e.target.value })} />
                </Field>
                <Field label="Approach">
                  <textarea className="input" rows={3} value={editing.approach} onChange={(e) => setEditing({ ...editing, approach: e.target.value })} />
                </Field>
                <Field label="Solution">
                  <textarea className="input" rows={3} value={editing.solution} onChange={(e) => setEditing({ ...editing, solution: e.target.value })} />
                </Field>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-sm text-ink">
                  <input
                    type="checkbox"
                    checked={editing.featured}
                    onChange={(e) => setEditing({ ...editing, featured: e.target.checked })}
                  />
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
                Save project
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
