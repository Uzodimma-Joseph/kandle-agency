# Kandle Business Agency — website + admin

A strategy-led branding/growth agency site, rebuilt from the existing Kandle
site and screenshots. React + TypeScript + Vite + Tailwind, with a
lightweight admin panel for managing leads, projects, media, and site copy —
backed by a real Google Sheet once you connect it (see below).

Real content preserved from the original site: services, the six portfolio
projects (Biggest Coil, Ikorodu Property Markets, Great Minds Investments,
Tabernacle Investments, Ora App, Palmeira), the brand green (`#39B54A`),
fonts (Montserrat + Lora), and contact details. No invented clients,
testimonials, or results — see `src/data/mockData.ts` for everything that
was pulled from the source site vs. newly written.

## Run it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build to /dist
npm run preview   # serve the production build locally
```

## Admin

Visit `/admin/login`.

```
email:    admin@kandleagency.biz
password: kandle-demo
```

This is a **demo-only** login (see `src/services/authService.ts`) — it
checks a hardcoded credential in the browser and is not secure. Replace it
with a real auth provider before this goes anywhere near production.

From the admin you can manage:
- **Leads** — status, notes, follow-up dates. New contact-form submissions
  land here automatically.
- **Projects** — add/edit/delete/reorder portfolio items, toggle
  featured/published.
- **Media** — upload images.
- **Content** — edit hero/about/contact copy and the homepage stats.

## Connecting the real backend (Google Sheets)

By default (no `.env`), everything above runs on mock data in
`localStorage` — fine for demoing, but it doesn't sync between devices and
resets if browser data is cleared.

To make it real:

1. **Get the Sheet.** Import `Kandle-Data-Model.xlsx` into Google Sheets
   (File > Import > Upload > Insert as new sheets), or use whichever copy
   of it you're already working from.
2. **Add the backend script.** Open that Sheet → Extensions → Apps Script.
   Delete the placeholder code and paste in the contents of
   [`apps-script/Code.gs`](./apps-script/Code.gs) from this repo.
3. **Set a token.** In that script, change the `TOKEN` constant at the top
   to any password-like string you choose.
4. **Deploy.** Deploy → New deployment → type **Web app** → Execute as
   **Me** → Who has access **Anyone** → Deploy. Authorize when prompted.
   Copy the URL (ends in `/exec`).
5. **Wire up the site.** Create a `.env` file (see `.env.example`):
   ```
   VITE_ADMIN_API_URL=<the /exec URL from step 4>
   VITE_ADMIN_API_TOKEN=<the same TOKEN you set in step 3>
   ```
   Rebuild (`npm run build`) and redeploy.

Once that's set, **every part of the admin — leads, projects, media,
content — reads and writes the real Google Sheet**, and the public site
(portfolio, services copy, homepage stats) reads from it too. No code
changes needed; the services in `src/services/*.ts` automatically switch
from localStorage to the real API the moment `VITE_ADMIN_API_URL` is set.

If you edit `Code.gs` later, you need **Manage deployments → Edit → New
version** (not just saving the script) for changes to go live.

**Never** put Google service-account keys or admin passwords in a `VITE_`
variable — those are exposed to the browser. `VITE_ADMIN_API_TOKEN` is a
lightweight shared secret, not real authentication (see the note at the
top of `Code.gs`).

## Deploying

Static build, deploys anywhere. For Netlify/Vercel: connect the repo,
build command `npm run build`, publish directory `dist`. A `vercel.json`
(Vercel) and `public/_redirects` (Netlify) are already included so
client-side routes like `/work/:slug` don't 404 on refresh.

## Project structure

```
src/
  components/   Button, Logo, Eyebrow, PageHeader — shared UI atoms
  sections/     Hero, Services, Portfolio, ContactForm, etc.
  pages/        One per public route
  layouts/      Nav, Footer, SiteLayout
  admin/        Admin panel (guard, layout, pages)
  hooks/        useSiteContent, useStats, useProjects — async data hooks
  services/     contactService, leadService, projectService, mediaService,
                contentService, authService, apiClient — the only things
                that talk to storage/network
  data/         mockData.ts — seed content, sourced from the real site
  types/        Shared TypeScript types (mirrors the Sheets data model)
apps-script/
  Code.gs       The Google Apps Script backend — see setup steps above
```
