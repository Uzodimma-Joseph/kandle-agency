import Eyebrow from "../components/Eyebrow";
import { growthStages } from "../data/mockData";

export default function GrowthPhilosophy() {
  return (
    <section className="bg-ink text-paper py-24 lg:py-32 overflow-hidden">
      <div className="container-k">
        <div className="max-w-2xl">
          <Eyebrow tone="light">Our philosophy</Eyebrow>
          <h2 className="font-serif text-[34px] sm:text-[44px] leading-[1.15]">
            We grow with you.
          </h2>
          <p className="mt-6 text-paper/65 text-lg leading-relaxed max-w-[50ch]">
            Kandle works with businesses at different stages of growth. Wherever you are on this line, our job is
            the same: build the clarity and systems your business needs for the next stage.
          </p>
        </div>

        <div className="mt-20 relative">
          <div className="hidden lg:block absolute left-0 right-0 top-[13px] h-px bg-white/15" />
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-x-6 gap-y-14">
            {growthStages.map((stage, i) => (
              <div key={stage.label} className="relative">
                <div className="flex items-center gap-3 lg:block">
                  <span
                    className={`relative z-10 flex h-[27px] w-[27px] shrink-0 items-center justify-center rounded-full border-2 ${
                      i === growthStages.length - 1
                        ? "bg-kandle-green border-kandle-green"
                        : "bg-ink border-white/30"
                    }`}
                  >
                    <span className="text-[11px] font-semibold text-paper">{i + 1}</span>
                  </span>
                  <div className="lg:mt-5">
                    <div className="font-serif text-lg sm:text-xl">{stage.label}</div>
                  </div>
                </div>
                <p className="mt-3 text-sm text-paper/50 leading-relaxed lg:max-w-[20ch]">{stage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
