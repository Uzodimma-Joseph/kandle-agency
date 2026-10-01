import Eyebrow from "../components/Eyebrow";
import type { Testimonial } from "../types";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 text-kandle-green" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 20 20" fill={i < rating ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1">
          <path d="M10 1.5l2.6 5.6 6 .7-4.5 4.2 1.2 6-5.3-3-5.3 3 1.2-6L1.4 7.8l6-.7z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  if (testimonials.length === 0) return null;

  return (
    <section className="bg-paper py-24 lg:py-32 border-t border-paper-line">
      <div className="container-k">
        <div className="max-w-xl mb-16">
          <Eyebrow>What clients say</Eyebrow>
          <h2 className="font-serif text-[32px] sm:text-[40px] leading-[1.18]">
            Real feedback from real projects.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <figure key={t.id} className="bg-white border border-paper-line p-8 flex flex-col">
              {typeof t.rating === "number" && t.rating > 0 && (
                <div className="mb-4">
                  <Stars rating={t.rating} />
                </div>
              )}
              <blockquote className="font-serif text-lg leading-relaxed text-ink/90 flex-1">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-6 pt-6 border-t border-paper-line">
                <div className="font-semibold text-ink">{t.authorName}</div>
                {(t.authorRole || t.company) && (
                  <div className="text-sm text-stone mt-0.5">
                    {[t.authorRole, t.company].filter(Boolean).join(", ")}
                  </div>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
