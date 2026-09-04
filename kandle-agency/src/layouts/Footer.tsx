import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import { contactInfo, services } from "../data/mockData";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-paper">
      <div className="container-k pt-20 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-white/10">
          <div className="lg:col-span-5">
            <Logo className="h-8 w-auto" wordmarkClassName="text-paper" />
            <p className="mt-6 text-paper/60 max-w-sm leading-relaxed">
              A strategy-led branding and growth agency, helping growing businesses clarify who they are and build
              the systems they need to grow with confidence.
            </p>
          </div>

          <div className="lg:col-span-2">
            <div className="text-[12px] font-semibold uppercase tracking-widest2 text-paper/40 mb-5">Navigate</div>
            <ul className="space-y-3 text-paper/75">
              <li><Link to="/about" className="hover:text-kandle-green transition-colors">About</Link></li>
              <li><Link to="/services" className="hover:text-kandle-green transition-colors">Services</Link></li>
              <li><Link to="/work" className="hover:text-kandle-green transition-colors">Work</Link></li>
              <li><Link to="/approach" className="hover:text-kandle-green transition-colors">Approach</Link></li>
              <li><Link to="/contact" className="hover:text-kandle-green transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <div className="text-[12px] font-semibold uppercase tracking-widest2 text-paper/40 mb-5">Services</div>
            <ul className="space-y-3 text-paper/75">
              {services.slice(0, 5).map((s) => (
                <li key={s.id}>{s.name}</li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <div className="text-[12px] font-semibold uppercase tracking-widest2 text-paper/40 mb-5">Contact</div>
            <ul className="space-y-3 text-paper/75">
              {contactInfo.emails.map((email) => (
                <li key={email}>
                  <a href={`mailto:${email}`} className="hover:text-kandle-green transition-colors break-all">
                    {email}
                  </a>
                </li>
              ))}
              <li>
                <a href={`tel:${contactInfo.phone.replace(/\s/g, "")}`} className="hover:text-kandle-green transition-colors">
                  {contactInfo.phone}
                </a>
              </li>
              <li className="text-paper/50 text-sm pt-1">WhatsApp: {contactInfo.whatsapp[0]}</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-8">
          <p className="text-paper/40 text-sm">© {year} Kandle Business Agency. All rights reserved.</p>
          <div className="flex items-center gap-5 text-paper/40">
            {["Facebook", "Instagram", "Twitter", "Behance"].map((s) => (
              <span key={s} className="text-[12px] uppercase tracking-wide hover:text-paper/70 transition-colors cursor-default">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
