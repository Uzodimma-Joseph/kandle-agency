import Eyebrow from "../components/Eyebrow";
import type { StatMetric } from "../types";
import { projects } from "../data/mockData";

export default function SocialProof({ stats }: { stats: StatMetric[] }) {
  const clientNames = projects.map((p) => p.client);

  return (
    <section className="bg-paper py-20 lg:py-28 border-t border-paper-line">
      <div className="container-k">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4">
            <Eyebrow>Trusted by businesses building what's next</Eyebrow>
            <p className="text-stone leading-relaxed max-w-[38ch]">
              We've worked with businesses across property, finance, retail, and digital products — helping each
              one build a clearer, stronger brand.
            </p>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <div className="grid grid-cols-3 gap-6 sm:gap-10 pb-10 border-b border-paper-line">
              {stats.map((stat) => (
                <div key={stat.metric}>
                  <div className="font-serif text-4xl sm:text-5xl text-ink">{stat.value}</div>
                  <div className="mt-2 text-[13px] sm:text-sm text-stone leading-snug">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
              {clientNames.map((name) => (
                <span key={name} className="text-stone/70 text-sm tracking-wide">
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
