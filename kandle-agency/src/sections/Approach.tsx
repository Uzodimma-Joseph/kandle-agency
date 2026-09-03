import Eyebrow from "../components/Eyebrow";
import { approachSteps } from "../data/mockData";

export default function Approach({ intro = true }: { intro?: boolean }) {
  return (
    <section className="bg-ink text-paper py-24 lg:py-32">
      <div className="container-k">
        {intro && (
          <div className="max-w-xl mb-16 lg:mb-20">
            <Eyebrow tone="light">The Kandle approach</Eyebrow>
            <h2 className="font-serif text-[32px] sm:text-[40px] leading-[1.18]">
              We don't start with design. We start with understanding.
            </h2>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-14">
          {approachSteps.map((step) => (
            <div key={step.index} className="lg:border-l lg:border-white/10 lg:pl-6 first:lg:pl-0 first:lg:border-l-0">
              <span className="font-serif text-3xl text-kandle-green">{step.index}</span>
              <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
              <p className="mt-3 text-paper/55 text-[15px] leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
