import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StatCard from "../components/StatCard";
import { getLeads } from "../../services/leadService";
import { getProjects } from "../../services/projectService";
import type { Lead } from "../../types";

const statusLabel: Record<string, string> = {
  new: "New",
  contacted: "Contacted",
  discovery: "Discovery",
  proposal: "Proposal",
  negotiation: "Negotiation",
  won: "Won",
  onboarding: "Onboarding",
  in_progress: "In progress",
  completed: "Completed",
  lost: "Lost",
};

export default function Dashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [projectCount, setProjectCount] = useState(0);
  const [activeCount, setActiveCount] = useState(0);

  useEffect(() => {
    let active = true;
    getLeads().then((l) => active && setLeads(l));
    getProjects().then((p) => {
      if (!active) return;
      setProjectCount(p.length);
      setActiveCount(p.filter((x) => x.status === "published").length);
    });
    return () => {
      active = false;
    };
  }, []);

  const newLeads = leads.filter((l) => l.status === "new").length;
  const clients = new Set(leads.filter((l) => l.status === "won" || l.status === "completed").map((l) => l.company)).size;

  return (
    <div>
      <h1 className="font-serif text-2xl text-ink">Dashboard</h1>
      <p className="text-stone mt-1">Overview of leads, projects, and recent activity.</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        <StatCard label="Total leads" value={leads.length} />
        <StatCard label="New inquiries" value={newLeads} hint="Awaiting first contact" />
        <StatCard label="Published projects" value={activeCount} hint={`${projectCount} total`} />
        <StatCard label="Clients" value={clients || "—"} hint="Won or completed" />
      </div>

      <div className="mt-10 bg-white border border-paper-line">
        <div className="flex items-center justify-between px-6 py-4 border-b border-paper-line">
          <h2 className="font-semibold text-ink">Recent activity</h2>
          <Link to="/admin/leads" className="text-sm text-kandle-green-deep hover:underline">
            View all leads
          </Link>
        </div>
        <div className="divide-y divide-paper-line">
          {leads.slice(0, 6).map((lead) => (
            <div key={lead.id} className="px-6 py-4 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="text-ink font-medium truncate">{lead.name}</div>
                <div className="text-sm text-stone truncate">{lead.service} {lead.company ? `· ${lead.company}` : ""}</div>
              </div>
              <span className="shrink-0 text-xs font-medium px-2.5 py-1 bg-kandle-green-tint text-kandle-green-deep">
                {statusLabel[lead.status]}
              </span>
            </div>
          ))}
          {leads.length === 0 && <div className="px-6 py-8 text-center text-stone text-sm">No leads yet.</div>}
        </div>
      </div>
    </div>
  );
}
