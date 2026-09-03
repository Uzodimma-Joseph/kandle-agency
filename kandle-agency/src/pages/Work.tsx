import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import Portfolio from "../sections/Portfolio";
import ContactCta from "../sections/ContactCta";
import { getPublishedProjects } from "../services/projectService";
import { getSiteContent } from "../services/contentService";

export default function Work() {
  const [content] = useState(getSiteContent());
  const [projects, setProjects] = useState(getPublishedProjects());

  useEffect(() => {
    setProjects(getPublishedProjects());
  }, []);

  return (
    <>
      <PageHeader
        eyebrow="Our work"
        title="Real projects for real businesses."
        subtitle="No fabricated case studies — every project here is work we've actually done, for the businesses we did it for."
      />
      <Portfolio projects={projects} intro={false} />
      <ContactCta content={content} />
    </>
  );
}
