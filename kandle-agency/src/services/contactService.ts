import type { ContactSubmission } from "../types";
import { addLead } from "./leadService";

export interface SubmitResult {
  ok: boolean;
  error?: string;
}

/**
 * Sends a contact form submission. Delegates to leadService.addLead, which
 * already knows whether to write to the real Apps Script API (Phase 2) or
 * to localStorage (Phase 1 mock) — see config.ts / leadService.ts.
 */
export async function submitContact(payload: ContactSubmission): Promise<SubmitResult> {
  try {
    await addLead(payload);
    return { ok: true };
  } catch {
    return { ok: false, error: "Could not submit your project — please try again in a moment." };
  }
}
