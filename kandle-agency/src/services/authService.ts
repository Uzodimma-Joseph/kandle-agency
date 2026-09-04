// Authentication abstraction for the admin panel.
//
// THIS IS A DEMO-ONLY IMPLEMENTATION. It checks a hardcoded credential in
// the browser and stores a flag in sessionStorage. That is NOT secure and
// must never be treated as production authentication — anyone with the
// bundle can read the "password" and anyone with dev tools can set the
// session flag by hand.
//
// PHASE 2 (real): replace the body of `login` with a call to a real auth
// provider (e.g. Google Sign-In restricted to the team's workspace, or a
// small serverless auth endpoint) that returns a signed session token.
// AdminGuard below only cares about `isAuthenticated()`, so nothing in the
// admin UI needs to change when this is swapped out.

const SESSION_KEY = "kandle_admin_session_demo";

// Demo-only credential — intentionally not a secret worth protecting.
const DEMO_EMAIL = "admin@kandleagency.biz";
const DEMO_PASSWORD = "kandle-demo";

export function login(email: string, password: string): { ok: boolean; error?: string } {
  if (email.trim().toLowerCase() === DEMO_EMAIL && password === DEMO_PASSWORD) {
    window.sessionStorage.setItem(SESSION_KEY, "1");
    return { ok: true };
  }
  return { ok: false, error: "Incorrect email or password." };
}

export function logout() {
  window.sessionStorage.removeItem(SESSION_KEY);
}

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return window.sessionStorage.getItem(SESSION_KEY) === "1";
}

export const demoCredentials = { email: DEMO_EMAIL, password: DEMO_PASSWORD };
