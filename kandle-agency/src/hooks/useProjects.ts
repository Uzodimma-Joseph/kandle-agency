import { useEffect, useState } from "react";
import {
  projects as seedProjects,
} from "../data/mockData";
import {
  getFeaturedProjects,
  getProjectBySlug,
  getPublishedProjects,
} from "../services/projectService";
import type { Project } from "../types";

const seedPublished = seedProjects.filter((p) => p.status === "published");
const seedFeatured = seedPublished.filter((p) => p.featured);

export function useFeaturedProjects(): Project[] {
  const [projects, setProjects] = useState<Project[]>(seedFeatured);
  useEffect(() => {
    let active = true;
    getFeaturedProjects().then((p) => active && setProjects(p));
    return () => {
      active = false;
    };
  }, []);
  return projects;
}

export function usePublishedProjects(): Project[] {
  const [projects, setProjects] = useState<Project[]>(seedPublished);
  useEffect(() => {
    let active = true;
    getPublishedProjects().then((p) => active && setProjects(p));
    return () => {
      active = false;
    };
  }, []);
  return projects;
}

export function useProject(slug: string | undefined): { project: Project | undefined; loaded: boolean } {
  const [project, setProject] = useState<Project | undefined>(() =>
    slug ? seedProjects.find((p) => p.slug === slug) : undefined
  );
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let active = true;
    setLoaded(false);
    if (!slug) {
      setProject(undefined);
      setLoaded(true);
      return;
    }
    getProjectBySlug(slug).then((p) => {
      if (!active) return;
      setProject(p);
      setLoaded(true);
    });
    return () => {
      active = false;
    };
  }, [slug]);

  return { project, loaded };
}
