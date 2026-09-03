# Kandle Business Agency — website + admin

A strategy-led branding/growth agency site, rebuilt from the existing Kandle
site and screenshots. React + TypeScript + Vite + Tailwind, with a
lightweight admin panel for managing leads, projects, media, and site copy.

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
- **Media** — upload images (kept in the browser only, for the demo).
- **Content** — edit hero/about/contact copy and the homepage stats.

All admin data currently lives in the browser's `localStorage`, seeded from
`src/data/mockData.ts`. Clearing site data resets it back to the seed
content.

## Connecting the real backend (Phase 2)

Every place that talks to "the backend" goes through `src/services/*.ts` —
components never touch `localStorage` or `fetch` directly. To wire up the
real Google Sheets/Drive + automation setup described in the brief:

1. Stand up an automation workflow (n8n / Make / Google Apps Script) that
   accepts a POST with the shape in `submitContact` (`contactService.ts`)
   and appends a row to a `LEADS` sheet.
2. Set `VITE_CONTACT_WEBHOOK_URL` in a `.env` file to that webhook's URL.
   Once set, `contactService.ts` automatically posts there instead of
   using the local mock.
3. Do the equivalent for `VITE_ADMIN_API_URL` and update
   `leadService.ts` / `projectService.ts` / `mediaService.ts` /
   `contentService.ts` to call it instead of `localStorage`. The function
   signatures are the contract — the admin UI doesn't need to change.

**Never** put Google service-account keys, webhook signing secrets, or
admin passwords in a `VITE_` variable — those are exposed to the browser.
They belong inside the automation platform itself.

## Deploying

Static build, deploys anywhere. For Netlify/Vercel: connect the repo,
build command `npm run build`, publish directory `dist`, and add a SPA
rewrite (`/* -> /index.html`) so client-side routes like `/work/:slug`
don't 404 on refresh.

## Project structure

```
src/
  components/   Button, Logo, Eyebrow, PageHeader — shared UI atoms
  sections/     Hero, Services, Portfolio, ContactForm, etc.
  pages/        One per public route
  layouts/      Nav, Footer, SiteLayout
  admin/        Admin panel (guard, layout, pages)
  services/     contactService, leadService, projectService, mediaService,
                contentService, authService — the only things that touch
                storage/network
  data/         mockData.ts — seed content, sourced from the real site
  types/        Shared TypeScript types (mirrors the Sheets data model)
```
