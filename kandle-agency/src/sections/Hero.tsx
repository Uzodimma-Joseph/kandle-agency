import { useEffect, useState } from "react";
import { ButtonLink } from "../components/Button";
import HeroGraphic from "./HeroGraphic";
import type { SiteContent } from "../types";

export default function Hero({ content }: { content: SiteContent }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="relative bg-ink text-paper overflow-hidden">
      <div className="container-k pt-[150px] pb-24 lg:pt-[190px] lg:pb-32 grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
        <div className="lg:col-span-7">
          <div
            className={`transition-all duration-700 ease-kandle ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            <span className="text-[12px] font-semibold uppercase tracking-widest2 text-kandle-green">
              {content.heroEyebrow}
            </span>
            <h1 className="font-serif text-[38px] leading-[1.15] sm:text-[48px] sm:leading-[1.12] lg:text-[58px] lg:leading-[1.1] mt-6 max-w-[16ch]">
              {content.heroHeadline}
            </h1>
            <p className="mt-7 text-paper/70 text-lg leading-relaxed max-w-[46ch]">
              {content.heroSubhead}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <ButtonLink to="/contact" variant="primary">
                {content.heroPrimaryCta}
              </ButtonLink>
              <ButtonLink to="/work" variant="stroke-light">
                {content.heroSecondaryCta}
              </ButtonLink>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div
            className={`transition-all duration-1000 delay-150 ease-kandle ${
              mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <HeroGraphic />
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-k grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/10">
          {[
            "Brand Identity",
            "Marketing",
            "Web Design & Development",
            "Automation",
          ].map((label) => (
            <div key={label} className="py-5 px-4 sm:px-6 text-[12px] sm:text-[13px] font-medium text-paper/55 uppercase tracking-wide">
              {label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
