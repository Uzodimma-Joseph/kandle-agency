import Mark from "./Mark";

export default function Eyebrow({ children, tone = "dark" }: { children: React.ReactNode; tone?: "dark" | "light" }) {
  return (
    <div className="flex items-center gap-2.5 mb-5">
      <Mark className="h-2.5 w-2.5" />
      <span
        className={`text-[12px] font-semibold uppercase tracking-widest2 ${
          tone === "light" ? "text-paper/70" : "text-stone"
        }`}
      >
        {children}
      </span>
    </div>
  );
}
