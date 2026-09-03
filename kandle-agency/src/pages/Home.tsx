import { useEffect, useState } from "react";
import Hero from "../sections/Hero";
import BrandIntro from "../sections/BrandIntro";
import GrowthPhilosophy from "../sections/GrowthPhilosophy";
import Services from "../sections/Services";
import Portfolio from "../sections/Portfolio";
import Approach from "../sections/Approach";
import SocialProof from "../sections/SocialProof";
import ContactCta from "../sections/ContactCta";
import { getSiteContent, getStats } from "../services/contentService";
import { getFeaturedProjects } from "../services/projectService";

export default function Home() {
  const [content] = useState(getSiteContent());
  const [stats] = useState(getStats());
  const [featured, setFeatured] = useState(getFeaturedProjects());

  useEffect(() => {
    setFeatured(getFeaturedProjects());
  }, []);

  return (
    <>
      <Hero content={content} />
      <BrandIntro content={content} />
      <GrowthPhilosophy />
      <Services compact />
      <Portfolio projects={featured} />
      <Approach />
      <SocialProof stats={stats} />
      <ContactCta content={content} />
    </>
  );
}
