import Eyebrow from "./Eyebrow";

export default function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="bg-ink text-paper pt-[150px] pb-20 lg:pt-[190px] lg:pb-28">
      <div className="container-k">
        <Eyebrow tone="light">{eyebrow}</Eyebrow>
        <h1 className="font-serif text-[36px] sm:text-[46px] lg:text-[54px] leading-[1.12] max-w-[20ch]">
          {title}
        </h1>
        {subtitle && <p className="mt-6 text-paper/60 text-lg max-w-[54ch] leading-relaxed">{subtitle}</p>}
      </div>
    </section>
  );
}
