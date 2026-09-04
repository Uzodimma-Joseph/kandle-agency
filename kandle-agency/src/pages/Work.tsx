import PageHeader from "../components/PageHeader";
import Portfolio from "../sections/Portfolio";
import ContactCta from "../sections/ContactCta";
import { useSiteContent } from "../hooks/useSiteContent";
import { usePublishedProjects } from "../hooks/useProjects";

export default function Work() {
  const content = useSiteContent();
  const projects = usePublishedProjects();

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
