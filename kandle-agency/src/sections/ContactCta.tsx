import { ButtonLink } from "../components/Button";
import Mark from "../components/Mark";
import type { SiteContent } from "../types";

export default function ContactCta({ content }: { content: SiteContent }) {
  return (
    <section className="bg-ink text-paper py-24 lg:py-36">
      <div className="container-k text-center">
        <div className="flex justify-center mb-8">
          <Mark className="h-8 w-8" />
        </div>
        <h2 className="font-serif text-[34px] sm:text-[48px] lg:text-[56px] leading-[1.12] max-w-[18ch] mx-auto">
          {content.contactHeadline}
        </h2>
        <p className="mt-6 text-paper/60 text-lg max-w-[48ch] mx-auto leading-relaxed">
          {content.contactSubhead}
        </p>
        <div className="mt-10">
          <ButtonLink to="/contact" variant="primary">
            Start a project
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
