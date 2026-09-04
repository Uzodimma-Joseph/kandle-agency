import { useEffect, useState } from "react";
import type { SiteContent, StatMetric } from "../../types";
import { getSiteContent, getStats, saveSiteContent, saveStats } from "../../services/contentService";
import { Button } from "../../components/Button";
import { USE_MOCK_BACKEND } from "../../services/config";

export default function Content() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [stats, setStats] = useState<StatMetric[]>([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getSiteContent().then(setContent);
    getStats().then(setStats);
  }, []);

  if (!content) return null;

  function update<K extends keyof SiteContent>(key: K, value: SiteContent[K]) {
    setContent((c) => (c ? { ...c, [key]: value } : c));
  }

  async function handleSave() {
    if (content) await saveSiteContent(content);
    await saveStats(stats);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="max-w-3xl">
      <h1 className="font-serif text-2xl text-ink">Website content</h1>
      <p className="text-stone mt-1">
        Edit the copy shown across the public site.{" "}
        {USE_MOCK_BACKEND ? "Changes save to this browser." : "Changes save to the SETTINGS/STATS sheet."}
      </p>

      <div className="mt-8 bg-white border border-paper-line p-6 space-y-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-stone">Hero section</h2>
        <LabeledInput label="Eyebrow" value={content.heroEyebrow} onChange={(v) => update("heroEyebrow", v)} />
        <LabeledTextarea label="Headline" value={content.heroHeadline} onChange={(v) => update("heroHeadline", v)} />
        <LabeledTextarea label="Subhead" rows={3} value={content.heroSubhead} onChange={(v) => update("heroSubhead", v)} />
        <div className="grid grid-cols-2 gap-4">
          <LabeledInput label="Primary CTA" value={content.heroPrimaryCta} onChange={(v) => update("heroPrimaryCta", v)} />
          <LabeledInput label="Secondary CTA" value={content.heroSecondaryCta} onChange={(v) => update("heroSecondaryCta", v)} />
        </div>
      </div>

      <div className="mt-6 bg-white border border-paper-line p-6 space-y-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-stone">About section</h2>
        <LabeledInput label="Eyebrow" value={content.aboutEyebrow} onChange={(v) => update("aboutEyebrow", v)} />
        <LabeledInput label="Headline" value={content.aboutHeadline} onChange={(v) => update("aboutHeadline", v)} />
        <LabeledTextarea label="Body" rows={4} value={content.aboutBody} onChange={(v) => update("aboutBody", v)} />
      </div>

      <div className="mt-6 bg-white border border-paper-line p-6 space-y-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-stone">Contact section</h2>
        <LabeledInput label="Headline" value={content.contactHeadline} onChange={(v) => update("contactHeadline", v)} />
        <LabeledTextarea label="Subhead" rows={2} value={content.contactSubhead} onChange={(v) => update("contactSubhead", v)} />
      </div>

      <div className="mt-6 bg-white border border-paper-line p-6 space-y-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-stone">Stats</h2>
        {stats.map((s, i) => (
          <div key={s.metric} className="grid grid-cols-2 gap-4">
            <LabeledInput
              label={`${s.metric} — value`}
              value={s.value}
              onChange={(v) => setStats((arr) => arr.map((x, idx) => (idx === i ? { ...x, value: v } : x)))}
            />
            <LabeledInput
              label={`${s.metric} — label`}
              value={s.label}
              onChange={(v) => setStats((arr) => arr.map((x, idx) => (idx === i ? { ...x, label: v } : x)))}
            />
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center gap-4">
        <Button variant="primary" className="!px-6 !py-3 text-sm" onClick={handleSave}>
          Save changes
        </Button>
        {saved && <span className="text-sm text-kandle-green-deep">Saved.</span>}
      </div>
    </div>
  );
}

function LabeledInput({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="text-xs text-stone block mb-1.5">{label}</label>
      <input className="input" value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

function LabeledTextarea({
  label,
  value,
  onChange,
  rows = 2,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <div>
      <label className="text-xs text-stone block mb-1.5">{label}</label>
      <textarea className="input" rows={rows} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}
