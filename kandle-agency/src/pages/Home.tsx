import Hero from "../sections/Hero";
import BrandIntro from "../sections/BrandIntro";
import GrowthPhilosophy from "../sections/GrowthPhilosophy";
import Services from "../sections/Services";
import Portfolio from "../sections/Portfolio";
import Testimonials from "../sections/Testimonials";
import Approach from "../sections/Approach";
import SocialProof from "../sections/SocialProof";
import ContactCta from "../sections/ContactCta";
import { useSiteContent, useStats } from "../hooks/useSiteContent";
import { useFeaturedProjects } from "../hooks/useProjects";
import { usePublishedTestimonials } from "../hooks/useTestimonials";

export default function Home() {
  const content = useSiteContent();
  const stats = useStats();
  const featured = useFeaturedProjects();
  const testimonials = usePublishedTestimonials();

  return (
    <>
      <Hero content={content} />
      <BrandIntro content={content} />
      <GrowthPhilosophy />
      <Services compact />
      <Portfolio projects={featured} />
      <Testimonials testimonials={testimonials} />
      <Approach />
      <SocialProof stats={stats} />
      <ContactCta content={content} />
    </>
  );
}
