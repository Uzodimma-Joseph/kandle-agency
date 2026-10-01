import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import { services } from "../data/mockData";
import { useSiteContent } from "../hooks/useSiteContent";

export default function Footer() {
  const year = new Date().getFullYear();
  const content = useSiteContent();

  const emails = [content.contactEmailPrimary, content.contactEmailSecondary].filter(Boolean) as string[];
  const socialLinks = [
    { label: "Facebook", url: content.socialFacebook },
    { label: "Instagram", url: content.socialInstagram },
    { label: "Twitter", url: content.socialTwitter },
    { label: "Behance", url: content.socialBehance },
  ].filter((s) => s.url);

  return (
    <footer className="bg-ink text-paper">
      <div className="container-k pt-20 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-white/10">
          <div className="lg:col-span-5">
            <Logo className="h-8 w-auto" wordmarkClassName="text-paper" src={content.logoUrl} />
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
              {emails.map((email) => (
                <li key={email}>
                  <a href={`mailto:${email}`} className="hover:text-kandle-green transition-colors break-all">
                    {email}
                  </a>
                </li>
              ))}
              {content.contactPhone && (
                <li>
                  <a href={`tel:${content.contactPhone.replace(/\s/g, "")}`} className="hover:text-kandle-green transition-colors">
                    {content.contactPhone}
                  </a>
                </li>
              )}
              {content.contactWhatsappPrimary && (
                <li className="text-paper/50 text-sm pt-1">WhatsApp: {content.contactWhatsappPrimary}</li>
              )}
            </ul>
          </div>
        </div>

        <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-8">
          <p className="text-paper/40 text-sm">© {year} Kandle Business Agency. All rights reserved.</p>
          {socialLinks.length > 0 && (
            <div className="flex items-center gap-5 text-paper/40">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[12px] uppercase tracking-wide hover:text-paper/70 transition-colors"
                >
                  {s.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
