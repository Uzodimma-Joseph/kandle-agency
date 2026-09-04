import Eyebrow from "../components/Eyebrow";
import { ButtonLink } from "../components/Button";
import { services } from "../data/mockData";

export default function Services({ intro = true, compact = false }: { intro?: boolean; compact?: boolean }) {
  const list = compact ? services.slice(0, 5) : services;

  return (
    <section className="bg-paper py-24 lg:py-32">
      <div className="container-k">
        {intro && (
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8 mb-16 lg:mb-20">
            <div className="max-w-xl">
              <Eyebrow>What we do</Eyebrow>
              <h2 className="font-serif text-[32px] sm:text-[40px] leading-[1.18]">
                Strategic solutions, not just design tasks.
              </h2>
            </div>
            {compact && (
              <ButtonLink to="/services" variant="stroke-dark" className="shrink-0">
                All services
              </ButtonLink>
            )}
          </div>
        )}

        <div className="border-t border-paper-line">
          {list.map((service) => (
            <div
              key={service.id}
              className="group grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 py-10 lg:py-12 border-b border-paper-line"
            >
              <div className="lg:col-span-1">
                <span className="font-serif text-2xl text-stone/50">{service.index}</span>
              </div>
              <div className="lg:col-span-4">
                <h3 className="font-serif text-2xl sm:text-[26px]">{service.name}</h3>
                <p className="mt-3 text-stone leading-relaxed max-w-[38ch]">{service.summary}</p>
              </div>
              {!compact && (
                <div className="lg:col-span-6 lg:col-start-7">
                  <div className="text-[11px] font-semibold uppercase tracking-widest2 text-stone/60 mb-4">
                    What we help with
                  </div>
                  <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5">
                    {service.capabilities.map((cap) => (
                      <li key={cap} className="text-ink/80 text-[15px] flex items-start gap-2">
                        <span className="mt-2 h-1 w-1 rounded-full bg-kandle-green shrink-0" />
                        {cap}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
