import PageHeader from "../components/PageHeader";
import Approach from "../sections/Approach";
import ContactCta from "../sections/ContactCta";
import { useSiteContent } from "../hooks/useSiteContent";

export default function ApproachPage() {
  const content = useSiteContent();

  return (
    <>
      <PageHeader
        eyebrow="How we work"
        title="We don't start with design. We start with understanding."
        subtitle="A simple, five-stage process — used the same way whether the work is a full rebrand or a single campaign."
      />
      <Approach intro={false} />
      <ContactCta content={content} />
    </>
  );
}
