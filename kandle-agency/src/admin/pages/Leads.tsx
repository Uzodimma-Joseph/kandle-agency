import { useEffect, useState } from "react";
import type { Lead, LeadStatus } from "../../types";
import { addLeadNote, getLeads, markContacted, setLeadFollowup, updateLeadStatus } from "../../services/leadService";
import { Button } from "../../components/Button";

const STATUSES: LeadStatus[] = [
  "new", "contacted", "discovery", "proposal", "negotiation", "won", "onboarding", "in_progress", "completed", "lost",
];

const statusLabel: Record<LeadStatus, string> = {
  new: "New", contacted: "Contacted", discovery: "Discovery", proposal: "Proposal", negotiation: "Negotiation",
  won: "Won", onboarding: "Onboarding", in_progress: "In progress", completed: "Completed", lost: "Lost",
};

const statusColor: Record<LeadStatus, string> = {
  new: "bg-blue-100 text-blue-800",
  contacted: "bg-amber-100 text-amber-800",
  discovery: "bg-purple-100 text-purple-800",
  proposal: "bg-kandle-green-tint text-kandle-green-deep",
  negotiation: "bg-orange-100 text-orange-800",
  won: "bg-green-100 text-green-800",
  onboarding: "bg-teal-100 text-teal-800",
  in_progress: "bg-indigo-100 text-indigo-800",
  completed: "bg-gray-200 text-gray-700",
  lost: "bg-red-100 text-red-700",
};

function formatDate(iso?: string) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
}

export default function Leads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filter, setFilter] = useState<LeadStatus | "all">("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [followup, setFollowup] = useState("");

  useEffect(() => {
    setLeads(getLeads());
  }, []);

  const visible = filter === "all" ? leads : leads.filter((l) => l.status === filter);
  const selected = leads.find((l) => l.id === selectedId) ?? null;

  function refresh(next: Lead[]) {
    setLeads([...next].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)));
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl text-ink">Leads</h1>
          <p className="text-stone mt-1">{leads.length} total inquiries</p>
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as LeadStatus | "all")}
          className="border border-paper-line bg-white px-4 py-2.5 text-sm"
        >
          <option value="all">All statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>{statusLabel[s]}</option>
          ))}
        </select>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-white border border-paper-line overflow-x-auto">
          <table className="w-full text-sm min-w-[560px]">
            <thead>
              <tr className="text-left text-stone border-b border-paper-line">
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-5 py-3 font-medium">Service</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((lead) => (
                <tr
                  key={lead.id}
                  onClick={() => {
                    setSelectedId(lead.id);
                    setFollowup(lead.nextFollowup?.slice(0, 10) ?? "");
                  }}
                  className={`border-b border-paper-line cursor-pointer hover:bg-paper-dim transition-colors ${
                    selectedId === lead.id ? "bg-paper-dim" : ""
                  }`}
                >
                  <td className="px-5 py-3.5">
                    <div className="text-ink font-medium">{lead.name}</div>
                    <div className="text-stone text-xs">{lead.company}</div>
                  </td>
                  <td className="px-5 py-3.5 text-ink/80">{lead.service}</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColor[lead.status]}`}>
                      {statusLabel[lead.status]}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-stone">{formatDate(lead.createdAt)}</td>
                </tr>
              ))}
              {visible.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-5 py-10 text-center text-stone">No leads match this filter.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="lg:col-span-5">
          {!selected ? (
            <div className="bg-white border border-paper-line p-8 text-center text-stone text-sm">
              Select a lead to view details.
            </div>
          ) : (
            <div className="bg-white border border-paper-line p-6 space-y-6">
              <div>
                <h2 className="font-serif text-xl text-ink">{selected.name}</h2>
                <p className="text-stone text-sm mt-0.5">{selected.email}{selected.phone ? ` · ${selected.phone}` : ""}</p>
              </div>

              <dl className="grid grid-cols-2 gap-4 text-sm">
                <div><dt className="text-stone">Company</dt><dd className="text-ink mt-0.5">{selected.company || "—"}</dd></div>
                <div><dt className="text-stone">Service</dt><dd className="text-ink mt-0.5">{selected.service}</dd></div>
                <div><dt className="text-stone">Budget</dt><dd className="text-ink mt-0.5">{selected.budget || "—"}</dd></div>
                <div><dt className="text-stone">Timeline</dt><dd className="text-ink mt-0.5">{selected.timeline || "—"}</dd></div>
              </dl>

              <div>
                <div className="text-stone text-sm mb-1">Message</div>
                <p className="text-ink text-sm leading-relaxed">{selected.message}</p>
              </div>

              <div>
                <label className="text-stone text-sm block mb-1.5">Status</label>
                <select
                  value={selected.status}
                  onChange={(e) => refresh(updateLeadStatus(selected.id, e.target.value as LeadStatus))}
                  className="w-full border border-paper-line px-3 py-2 text-sm"
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>{statusLabel[s]}</option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3">
                <Button variant="stroke-dark" className="!px-4 !py-2 text-xs" onClick={() => refresh(markContacted(selected.id))}>
                  Mark contacted
                </Button>
              </div>

              <div>
                <label className="text-stone text-sm block mb-1.5">Next follow-up</label>
                <div className="flex gap-2">
                  <input
                    type="date"
                    value={followup}
                    onChange={(e) => setFollowup(e.target.value)}
                    className="flex-1 border border-paper-line px-3 py-2 text-sm"
                  />
                  <Button
                    variant="stroke-dark"
                    className="!px-4 !py-2 text-xs"
                    onClick={() => followup && refresh(setLeadFollowup(selected.id, new Date(followup).toISOString()))}
                  >
                    Set
                  </Button>
                </div>
                {selected.nextFollowup && (
                  <p className="text-xs text-stone mt-1.5">Next follow-up: {formatDate(selected.nextFollowup)}</p>
                )}
              </div>

              <div>
                <label className="text-stone text-sm block mb-1.5">Notes</label>
                <div className="space-y-2 max-h-32 overflow-y-auto mb-2">
                  {(selected.notes ?? []).map((n) => (
                    <div key={n.id} className="text-sm bg-paper-dim px-3 py-2">
                      <p className="text-ink">{n.body}</p>
                      <p className="text-xs text-stone mt-0.5">{formatDate(n.createdAt)}</p>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Add a note…"
                    className="flex-1 border border-paper-line px-3 py-2 text-sm"
                  />
                  <Button
                    variant="stroke-dark"
                    className="!px-4 !py-2 text-xs"
                    onClick={() => {
                      if (!note.trim()) return;
                      refresh(addLeadNote(selected.id, note.trim()));
                      setNote("");
                    }}
                  >
                    Add
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
