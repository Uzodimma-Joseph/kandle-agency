import { Link, Navigate, useParams } from "react-router-dom";
import Eyebrow from "../components/Eyebrow";
import { ButtonLink } from "../components/Button";
import ProjectCard from "../sections/ProjectCard";
import { useProject, usePublishedProjects } from "../hooks/useProjects";

export default function ProjectDetail() {
  const { slug } = useParams();
  const { project, loaded } = useProject(slug);
  const publishedProjects = usePublishedProjects();

  if (!slug) return <Navigate to="/work" replace />;

  if (!project) {
    if (!loaded) return <div className="bg-ink min-h-screen" />;
    return (
      <div className="bg-ink text-paper pt-[160px] pb-32 text-center">
        <p className="text-paper/60">We couldn't find that project.</p>
        <ButtonLink to="/work" variant="stroke-light" className="mt-8 inline-flex">
          Back to work
        </ButtonLink>
      </div>
    );
  }

  const related = publishedProjects.filter((p) => p.id !== project.id).slice(0, 3);

  return (
    <>
      <section className="bg-ink text-paper pt-[150px] pb-16 lg:pt-[190px] lg:pb-20">
        <div className="container-k">
          <Link to="/work" className="text-paper/50 text-sm hover:text-paper transition-colors">
            ← All work
          </Link>
          <div className="mt-8 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <Eyebrow tone="light">{project.category}{project.year ? ` · ${project.year}` : ""}</Eyebrow>
              <h1 className="font-serif text-[36px] sm:text-[48px] leading-[1.1] max-w-[18ch]">{project.title}</h1>
            </div>
            <p className="text-paper/60 max-w-[36ch]">{project.description}</p>
          </div>
        </div>
      </section>

      <div className="bg-paper">
        <div className="container-k -mt-1">
          <div className="aspect-[16/9] overflow-hidden bg-ink-soft">
            <img src={project.coverImage} alt={project.title} className="h-full w-full object-cover" />
          </div>
        </div>

        <div className="container-k py-20 lg:py-28 grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-14">
          {project.overview && (
            <div className="lg:col-span-4">
              <div className="text-[11px] font-semibold uppercase tracking-widest2 text-stone/60 mb-3">Overview</div>
              <p className="text-ink leading-relaxed">{project.overview}</p>
            </div>
          )}
          {project.challenge && (
            <div className="lg:col-span-4">
              <div className="text-[11px] font-semibold uppercase tracking-widest2 text-stone/60 mb-3">The challenge</div>
              <p className="text-ink leading-relaxed">{project.challenge}</p>
            </div>
          )}
          <div className="lg:col-span-4 space-y-10">
            {project.approach && (
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-widest2 text-stone/60 mb-3">Our approach</div>
                <p className="text-ink leading-relaxed">{project.approach}</p>
              </div>
            )}
            {project.solution && (
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-widest2 text-stone/60 mb-3">The solution</div>
                <p className="text-ink leading-relaxed">{project.solution}</p>
              </div>
            )}
          </div>
        </div>

        {project.results && project.results.length > 0 && (
          <div className="border-t border-paper-line py-16">
            <div className="container-k grid grid-cols-2 sm:grid-cols-4 gap-8">
              {project.results.map((r) => (
                <div key={r.label}>
                  <div className="font-serif text-3xl">{r.value}</div>
                  <div className="mt-1 text-sm text-stone">{r.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {related.length > 0 && (
          <div className="border-t border-paper-line py-20 lg:py-28">
            <div className="container-k">
              <Eyebrow>Related work</Eyebrow>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
                {related.map((p) => (
                  <ProjectCard key={p.id} project={p} />
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="border-t border-paper-line py-16 text-center">
          <ButtonLink to="/contact" variant="stroke-dark">
            Start a project
          </ButtonLink>
        </div>
      </div>
    </>
  );
}
