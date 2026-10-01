export default function StatCard({ label, value, hint }: { label: string; value: string | number; hint?: string }) {
  return (
    <div className="bg-white border border-paper-line p-6">
      <div className="text-sm text-stone">{label}</div>
      <div className="mt-2 font-serif text-3xl text-ink">{value}</div>
      {hint && <div className="mt-1 text-xs text-stone/70">{hint}</div>}
    </div>
  );
}
