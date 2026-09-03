import { useState } from "react";
import PageHeader from "../components/PageHeader";
import Services from "../sections/Services";
import ContactCta from "../sections/ContactCta";
import { getSiteContent } from "../services/contentService";

export default function ServicesPage() {
  const [content] = useState(getSiteContent());

  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Every service is a strategic solution, not a task."
        subtitle="From identity to marketing to the systems that run behind them — each service starts with the same question: what does this business actually need to grow?"
      />
      <Services intro={false} />
      <ContactCta content={content} />
    </>
  );
}
