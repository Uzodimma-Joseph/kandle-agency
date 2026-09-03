import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import { logout } from "../services/authService";

const links = [
  { to: "/admin", label: "Dashboard", end: true },
  { to: "/admin/leads", label: "Leads" },
  { to: "/admin/projects", label: "Projects" },
  { to: "/admin/media", label: "Media" },
  { to: "/admin/content", label: "Content" },
];

export default function AdminLayout() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex bg-paper-dim">
      <aside className="hidden md:flex flex-col w-[240px] shrink-0 bg-ink text-paper">
        <div className="h-[76px] flex items-center px-6 border-b border-white/10">
          <Logo className="h-6 w-auto" wordmarkClassName="text-paper" />
        </div>
        <nav className="flex-1 px-4 py-6 space-y-1" aria-label="Admin">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `block px-4 py-2.5 rounded-sm text-sm font-medium transition-colors ${
                  isActive ? "bg-white/10 text-paper" : "text-paper/60 hover:text-paper hover:bg-white/5"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <button
            onClick={() => {
              logout();
              navigate("/admin/login");
            }}
            className="w-full text-left px-4 py-2.5 text-sm text-paper/60 hover:text-paper transition-colors"
          >
            Sign out
          </button>
          <NavLink to="/" className="block px-4 py-2 text-xs text-paper/35 hover:text-paper/60 mt-1">
            ← Back to website
          </NavLink>
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        <header className="md:hidden h-16 flex items-center justify-between px-5 bg-ink text-paper">
          <Logo className="h-5 w-auto" wordmarkClassName="text-paper" />
          <button
            onClick={() => {
              logout();
              navigate("/admin/login");
            }}
            className="text-xs text-paper/60"
          >
            Sign out
          </button>
        </header>
        <nav className="md:hidden flex overflow-x-auto bg-ink-soft text-paper/70 text-xs px-3 py-2 gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `px-3 py-1.5 whitespace-nowrap rounded-full ${isActive ? "bg-kandle-green text-ink font-semibold" : ""}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <main className="p-5 md:p-10 max-w-[1200px]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
