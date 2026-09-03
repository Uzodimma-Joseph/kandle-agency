import Eyebrow from "../components/Eyebrow";
import type { SiteContent } from "../types";

export default function BrandIntro({ content }: { content: SiteContent }) {
  return (
    <section className="bg-paper py-24 lg:py-32">
      <div className="container-k grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8">
        <div className="lg:col-span-4">
          <Eyebrow>{content.aboutEyebrow}</Eyebrow>
          <h2 className="font-serif text-[32px] sm:text-[38px] leading-[1.2] max-w-[12ch]">
            {content.aboutHeadline}
          </h2>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <p className="text-xl sm:text-2xl font-serif leading-[1.55] text-ink/90 max-w-[42ch]">
            {content.aboutBody}
          </p>
          <p className="mt-8 text-stone leading-relaxed max-w-[52ch]">
            Our work goes beyond aesthetics — we connect strategy, identity, marketing, digital experiences, and
            execution into one system, so every part of the business says the same thing about who you are.
          </p>
        </div>
      </div>
    </section>
  );
}
