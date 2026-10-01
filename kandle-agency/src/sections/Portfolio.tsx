import Eyebrow from "../components/Eyebrow";
import { ButtonLink } from "../components/Button";
import ProjectCard from "./ProjectCard";
import type { Project } from "../types";

export default function Portfolio({
  projects,
  intro = true,
  showViewAll = true,
}: {
  projects: Project[];
  intro?: boolean;
  showViewAll?: boolean;
}) {
  const large = projects.filter((p) => p.size === "large");
  const medium = projects.filter((p) => p.size === "medium");
  const small = projects.filter((p) => p.size === "small");

  return (
    <section className="bg-paper py-24 lg:py-32">
      <div className="container-k">
        {intro && (
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8 mb-16">
            <div className="max-w-xl">
              <Eyebrow>Selected work</Eyebrow>
              <h2 className="font-serif text-[32px] sm:text-[40px] leading-[1.18]">
                Real projects, real businesses.
              </h2>
            </div>
            {showViewAll && (
              <ButtonLink to="/work" variant="stroke-dark" className="shrink-0">
                View all work
              </ButtonLink>
            )}
          </div>
        )}

        <div className="space-y-6">
          {large.length > 0 && (
            <div className="grid grid-cols-1 gap-6">
              {large.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          )}
          {medium.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {medium.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          )}
          {small.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {small.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
