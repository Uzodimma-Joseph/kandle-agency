import { useState } from "react";
import type { FormEvent } from "react";
import { Button } from "../components/Button";
import { submitContact } from "../services/contactService";
import { serviceOptions, budgetRanges, timelineOptions } from "../data/mockData";
import type { ContactSubmission } from "../types";

type FormState = ContactSubmission;

const initialState: FormState = {
  name: "",
  email: "",
  company: "",
  phone: "",
  service: "",
  budget: "",
  timeline: "",
  message: "",
};

const STEPS = ["About you", "The need", "The project", "Review"] as const;

function fieldClass(hasError: boolean) {
  return `w-full bg-transparent border-b py-3.5 text-[17px] text-ink placeholder:text-stone/50 focus:outline-none transition-colors ${
    hasError ? "border-red-500" : "border-paper-line focus:border-kandle-green"
  }`;
}

export default function ContactForm() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: "" }));
  }

  function validateStep(current: number): boolean {
    const next: Record<string, string> = {};
    if (current === 0) {
      if (!form.name.trim()) next.name = "Please tell us your name.";
      if (!form.email.trim()) next.email = "Please add an email address.";
      else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "That email doesn't look right.";
    }
    if (current === 1) {
      if (!form.service) next.service = "Select what you need help with.";
    }
    if (current === 2) {
      if (!form.message.trim()) next.message = "Tell us a little about the project.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function goNext() {
    if (validateStep(step)) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  function goBack() {
    setStep((s) => Math.max(s - 1, 0));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validateStep(0) || !form.service || !form.message.trim()) {
      setStep(0);
      return;
    }
    setStatus("submitting");
    const res = await submitContact(form);
    if (res.ok) {
      setStatus("success");
    } else {
      setStatus("error");
      setErrorMsg(res.error ?? "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="py-10 text-center max-w-md mx-auto">
        <div className="mx-auto h-14 w-14 rounded-full bg-kandle-green-tint flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M5 13l4 4L19 7" stroke="#1F6B31" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="font-serif text-2xl mt-6">Thanks — that's in.</h3>
        <p className="mt-3 text-stone leading-relaxed">
          We've received your project details and will get back to you shortly, usually within one business day.
        </p>
        <Button
          variant="stroke-dark"
          className="mt-8"
          onClick={() => {
            setForm(initialState);
            setStep(0);
            setStatus("idle");
          }}
        >
          Send another
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="flex items-center gap-2 mb-10" role="list" aria-label="Form progress">
        {STEPS.map((label, i) => (
          <div key={label} className="flex-1" role="listitem">
            <div className={`h-[3px] rounded-full ${i <= step ? "bg-kandle-green" : "bg-paper-line"}`} />
            <div className={`mt-2.5 text-[11px] uppercase tracking-wide ${i === step ? "text-ink font-semibold" : "text-stone/60"}`}>
              {label}
            </div>
          </div>
        ))}
      </div>

      {step === 0 && (
        <div className="space-y-7 animate-[fadeIn_0.4s_ease]">
          <p className="text-stone">Step 1 — Tell us about yourself.</p>
          <div>
            <input
              type="text"
              placeholder="Full name"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className={fieldClass(!!errors.name)}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "err-name" : undefined}
            />
            {errors.name && <p id="err-name" className="mt-2 text-sm text-red-600">{errors.name}</p>}
          </div>
          <div>
            <input
              type="email"
              placeholder="Email address"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className={fieldClass(!!errors.email)}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "err-email" : undefined}
            />
            {errors.email && <p id="err-email" className="mt-2 text-sm text-red-600">{errors.email}</p>}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
            <input
              type="text"
              placeholder="Company (optional)"
              value={form.company}
              onChange={(e) => update("company", e.target.value)}
              className={fieldClass(false)}
            />
            <input
              type="tel"
              placeholder="Phone (optional)"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              className={fieldClass(false)}
            />
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-4 animate-[fadeIn_0.4s_ease]">
          <p className="text-stone mb-3">Step 2 — What do you need help with?</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {serviceOptions.map((option) => (
              <button
                type="button"
                key={option}
                onClick={() => update("service", option)}
                className={`text-left px-5 py-4 border transition-colors ${
                  form.service === option
                    ? "border-kandle-green bg-kandle-green-tint text-ink"
                    : "border-paper-line hover:border-ink/30"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          {errors.service && <p className="text-sm text-red-600">{errors.service}</p>}
        </div>
      )}

      {step === 2 && (
        <div className="space-y-7 animate-[fadeIn_0.4s_ease]">
          <p className="text-stone">Step 3 — Tell us about the project.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
            <div>
              <label className="text-sm text-stone mb-2 block">Budget range (optional)</label>
              <select
                value={form.budget}
                onChange={(e) => update("budget", e.target.value)}
                className={fieldClass(false)}
              >
                <option value="">Select a range</option>
                {budgetRanges.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm text-stone mb-2 block">Timeline (optional)</label>
              <select
                value={form.timeline}
                onChange={(e) => update("timeline", e.target.value)}
                className={fieldClass(false)}
              >
                <option value="">Select a timeline</option>
                {timelineOptions.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <textarea
              placeholder="Tell us a bit about the project…"
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
              rows={5}
              className={fieldClass(!!errors.message)}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "err-message" : undefined}
            />
            {errors.message && <p id="err-message" className="mt-2 text-sm text-red-600">{errors.message}</p>}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6 animate-[fadeIn_0.4s_ease]">
          <p className="text-stone">Step 4 — Review and submit.</p>
          <dl className="divide-y divide-paper-line border-y border-paper-line">
            {[
              ["Name", form.name],
              ["Email", form.email],
              ["Company", form.company || "—"],
              ["Service", form.service],
              ["Budget", form.budget || "Not specified"],
              ["Timeline", form.timeline || "Not specified"],
              ["Message", form.message],
            ].map(([label, value]) => (
              <div key={label} className="flex flex-col sm:flex-row sm:justify-between gap-1 py-3.5">
                <dt className="text-sm text-stone">{label}</dt>
                <dd className="text-ink sm:text-right sm:max-w-[60%]">{value}</dd>
              </div>
            ))}
          </dl>
          {status === "error" && <p className="text-sm text-red-600">{errorMsg}</p>}
        </div>
      )}

      <div className="mt-10 flex items-center justify-between gap-4">
        {step > 0 ? (
          <Button key="back" type="button" variant="stroke-dark" onClick={goBack}>
            Back
          </Button>
        ) : (
          <span key="spacer" />
        )}

        {step < STEPS.length - 1 ? (
          <Button key="continue" type="button" variant="primary" onClick={goNext}>
            Continue
          </Button>
        ) : (
          <Button key="submit" type="submit" variant="primary" disabled={status === "submitting"}>
            {status === "submitting" ? "Sending…" : "Submit project"}
          </Button>
        )}
      </div>
    </form>
  );
}
