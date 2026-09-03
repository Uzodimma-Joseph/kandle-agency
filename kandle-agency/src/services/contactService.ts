import type { ContactSubmission } from "../types";
import { CONTACT_WEBHOOK_URL } from "./config";
import { addLead } from "./leadService";

export interface SubmitResult {
  ok: boolean;
  error?: string;
}

/**
 * Sends a contact form submission.
 *
 * PHASE 1 (mock): stores the lead locally via leadService, so the admin
 * "Leads" screen reflects real submissions made in this browser session.
 *
 * PHASE 2 (real): POST the same payload shape to an automation webhook
 * (n8n / Make / Apps Script) which can then: validate, append a row to the
 * LEADS sheet, notify the team, email the customer, and kick off follow-up
 * automation, per the brief's automation architecture. No component using
 * this service needs to change when that happens.
 */
export async function submitContact(payload: ContactSubmission): Promise<SubmitResult> {
  const body = {
    ...payload,
    timestamp: new Date().toISOString(),
    source: "website",
  };

  if (CONTACT_WEBHOOK_URL) {
    try {
      const res = await fetch(CONTACT_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) return { ok: false, error: "The webhook responded with an error." };
      return { ok: true };
    } catch {
      return { ok: false, error: "Could not reach the automation webhook." };
    }
  }

  // Mock fallback — simulate network latency and persist to the local lead store.
  await new Promise((resolve) => setTimeout(resolve, 500));
  addLead(payload);
  return { ok: true };
}
