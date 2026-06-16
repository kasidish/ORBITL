# AGENTS.md

## Project structure

```
ORBITL website/
  web/          ← main app (React + Vite)
  web/src/      ← source code
  web/tools/    ← build helpers (generate-llms.js runs pre-build)
  apps/*        ← workspace packages (currently empty)
```

## Commands

Run from repo root unless noted.

```bash
npm run dev       # starts Vite dev server on port 3000 (from web/)
npm run build     # runs generate-llms.js then vite build → web/dist
npm run start     # vite preview of dist on port 3000
npm run lint      # eslint in web/ (quiet mode)
```

Single lint pass: `npm run lint` from root delegates to `web/`.

## Tech stack

- **React 18** + **Vite 7** + **Tailwind CSS 3** + **shadcn/ui** (new-york style)
- **react-router-dom 7** for routing (`BrowserRouter` in `web/src/app.jsx`)
- **framer-motion** for animations
- **lucide-react** for icons
- **Helmet** for SEO meta tags
- **Supabase** (forms) + **PocketBase** (optional backend) + **Strapi** (news CMS)
- Path alias: `@` → `web/src` (configured in `vite.config.js`)

## UI components

shadcn/ui components live in `web/src/components/ui/`. They are pre-installed — do not regenerate. Use `components.json` as the source of truth for aliases and style config.

New shadcn components: `npx shadcn@latest add <component>` from `web/`.

## Environment variables

Copy `web/.env.local.example` to `web/.env.local`:

```
VITE_POCKETBASE_URL=          # PocketBase instance URL (optional)
VITE_SUPABASE_URL=            # Supabase project URL
VITE_SUPABASE_ANON_KEY=       # Supabase anon key
VITE_STRAPI_URL=              # Strapi instance URL (for news CMS)
```

## Key files

- `web/src/app.jsx` — route definitions
- `web/src/pages/` — page components (Home, About, Mission, News, Contact, Join)
- `web/src/components/` — shared components (Header, Footer, NewsCard, etc.)
- `web/src/components/ui/` — shadcn/ui primitives
- `web/src/lib/supabaseClient.js` — env-aware Supabase client (null when unconfigured)
- `web/src/lib/pocketbaseClient.js` — env-aware PocketBase client (stub when unconfigured)
- `web/src/lib/strapiClient.js` — Strapi fetch helper and media URL resolver
- `web/src/index.css` — CSS variables, theme, custom classes (space-gradient, star-field, orbitl-logo)
- `web/tools/generate-llms.js` — pre-build step, runs before every `vite build`

## Deploy

Vercel via GitHub Actions. Push to `main` triggers `.github/workflows/vercel-deploy.yml`.

- Vercel project root: `web/`
- Build: `npm run build`
- Output: `web/dist`
- SPA rewrite: all non-`/api/` routes → `index.html` (see `web/vercel.json`)

## News page (active work)

Current: Headless CMS via **Strapi**. News cards are clickable, linking to individual news detail pages. Pagination is implemented.

When working on news:
- `NewsPage.jsx` fetches from Strapi with pagination (falls back to hardcoded data when Strapi not configured)
- `NewsDetailPage.jsx` shows individual articles at `/news/:id`
- `NewsCard.jsx` is clickable with `<Link>` wrapper
- `strapiClient.js` handles API calls and media URLs

## Conventions

- Components use `.jsx` extension
- Pages live in `web/src/pages/`, named `*Page.jsx`
- Shared components in `web/src/components/`, UI primitives in `components/ui/`
- Use `@/` alias for imports from `src/`
- Tailwind classes; CSS variables for theming (`--primary`, `--background`, etc.)
- Animations via framer-motion `motion` components
- SEO via `react-helmet` `<Helmet>` in each page
