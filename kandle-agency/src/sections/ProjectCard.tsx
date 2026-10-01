import { Link } from "react-router-dom";
import type { Project } from "../types";

const heightBySize: Record<Project["size"], string> = {
  large: "aspect-[16/10]",
  medium: "aspect-[4/3]",
  small: "aspect-[4/3]",
};

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link to={`/work/${project.slug}`} className="group block">
      <div className={`relative overflow-hidden bg-ink-soft ${heightBySize[project.size]}`}>
        <img
          src={project.coverImage}
          alt={`${project.title} — ${project.category}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-kandle group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/10 transition-colors duration-500" />
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-serif text-xl sm:text-2xl text-ink">{project.title}</h3>
          <p className="mt-1 text-sm text-stone">
            {project.category}
            {project.year ? ` · ${project.year}` : ""}
          </p>
        </div>
        <span className="mt-1.5 shrink-0 text-kandle-green-deep opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M5 19L19 5M19 5H8M19 5V16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
