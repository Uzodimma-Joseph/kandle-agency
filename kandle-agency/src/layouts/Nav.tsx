import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Logo from "../components/Logo";
import { ButtonLink } from "../components/Button";

const links = [
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/work", label: "Work" },
  { to: "/approach", label: "Approach" },
  { to: "/contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ease-kandle ${
        solid ? "bg-ink/95 backdrop-blur border-b border-white/10" : "bg-transparent"
      }`}
    >
      <div className="container-k flex items-center justify-between h-[76px]">
        <Link to="/" className="text-paper" aria-label="Kandle — home">
          <Logo className="h-7 w-auto" wordmarkClassName="text-paper" />
        </Link>

        <nav className="hidden lg:flex items-center gap-10" aria-label="Primary">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `text-[13px] font-semibold uppercase tracking-wide transition-colors ${
                  isActive ? "text-kandle-green" : "text-paper/85 hover:text-paper"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:block">
          <ButtonLink to="/contact" variant="primary" className="!px-6 !py-3">
            Start a project
          </ButtonLink>
        </div>

        <button
          className="lg:hidden text-paper w-10 h-10 flex items-center justify-center"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block w-6 h-4">
            <span
              className={`absolute left-0 top-0 h-[1.5px] w-6 bg-current transition-transform duration-300 ${
                open ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 bottom-0 h-[1.5px] w-6 bg-current transition-transform duration-300 ${
                open ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-ink border-t border-white/10 px-6 pb-10 pt-4">
          <nav className="flex flex-col" aria-label="Mobile primary">
            {links.map((l, i) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `py-4 text-2xl font-serif ${i !== 0 ? "border-t border-white/10" : ""} ${
                    isActive ? "text-kandle-green" : "text-paper"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
          <ButtonLink to="/contact" variant="primary" className="w-full mt-6">
            Start a project
          </ButtonLink>
        </div>
      )}
    </header>
  );
}
