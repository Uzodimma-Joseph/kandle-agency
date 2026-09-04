import PageHeader from "../components/PageHeader";
import Eyebrow from "../components/Eyebrow";
import GrowthPhilosophy from "../sections/GrowthPhilosophy";
import SocialProof from "../sections/SocialProof";
import ContactCta from "../sections/ContactCta";
import { useSiteContent, useStats } from "../hooks/useSiteContent";

export default function About() {
  const content = useSiteContent();
  const stats = useStats();

  return (
    <>
      <PageHeader
        eyebrow="About Kandle"
        title="A growth partner, not a design vendor."
        subtitle="Kandle is a strategy-led branding and growth agency. We don't just make things look better — we help businesses get clearer about who they are, so everything built after that actually works."
      />

      <section className="bg-paper py-24 lg:py-32">
        <div className="container-k grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <Eyebrow>{content.aboutEyebrow}</Eyebrow>
            <h2 className="font-serif text-[30px] leading-[1.25] max-w-[14ch]">{content.aboutHeadline}</h2>
          </div>
          <div className="lg:col-span-7 lg:col-start-6 space-y-6">
            <p className="text-xl font-serif leading-[1.6] text-ink/90">{content.aboutBody}</p>
            <p className="text-stone leading-relaxed">
              We work with businesses that are growing, trying to become more professional, and preparing to scale
              — from founders building their first serious brand to established companies going through a clearer
              repositioning. In every case, the work connects strategy, identity, marketing, digital experiences,
              and execution into one system.
            </p>
            <p className="text-stone leading-relaxed">
              We're not interested in being a vendor you hire once. Kandle is built to work alongside a business
              as it moves from one stage of growth to the next.
            </p>
          </div>
        </div>
      </section>

      <GrowthPhilosophy />
      <SocialProof stats={stats} />
      <ContactCta content={content} />
    </>
  );
}
