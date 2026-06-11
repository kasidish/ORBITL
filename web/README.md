 # ORBITL — Local development & testing

This README explains how to run and test the website locally, how to add your transparent logo to the header, and how to enable PocketBase integration before publishing.

Prerequisites
- Node.js (v18+ recommended)
- npm (or pnpm/yarn) available on PATH
- Optional: a PocketBase instance if you want the contact form to post to a real backend

Quick start

1. Install dependencies

```bash
cd web
npm install
```

2. Add the logo

Place your transparent logo file at `web/public/logo.png`. The header will automatically use `/logo.png` if present; otherwise the site falls back to text.

3. Run the dev server

```bash
npm run dev
# open http://localhost:3000/
```

4. Build for production

```bash
npm run build
npm run start
# preview at http://localhost:3000/
```

PocketBase (optional)
- The app uses an environment-aware PocketBase client at `web/src/lib/pocketbaseClient.js`.
- To use a real PocketBase instance, create a file `web/.env.local` with:

```
VITE_POCKETBASE_URL=https://your-pocketbase.example
VITE_POCKETBASE_CONTACT_COLLECTION=contact_messages
```

- With that set, the contact form will POST to the configured collection. Without `VITE_POCKETBASE_URL` the app uses a harmless stub so forms don't error during local testing.

Testing steps I used (so you can reproduce)

- Start dev server:

```bash
cd web
npm run dev
```

- Open `http://localhost:3000/` and verify:
  - Large glowing `ORBITL` hero heading
  - Centered subtitle and orange rounded "Join ORBITL" CTA
  - Header shows light top bar and CTA on the right

- Click the "Join ORBITL" CTA; the site should navigate to `/join`.
- To test contact form behavior (without a real PocketBase): fill the form and submit — the stub will log to the console and show a success toast.

Saving screenshots and comparison
- I captured screenshots at widths 375, 768, 1280 for both the preview and local site. If you want them committed to the repo, run the dev server and I can write the PNGs under `web/screenshots/` and update `design-comparison.md` with repo links.

Deploying
- For a quick publish, deploy `web/dist` to a static host (Vercel, Netlify, GitHub Pages).
- Example (GitHub Pages using `gh-pages`):

```bash
# from the repo root
cd web
npm run build
# push the generated files in ../../dist/apps/web to the gh-pages branch (you can use an npm script or gh-pages package)
```

Notes
- I added a fallback PocketBase stub to avoid runtime errors during testing.
- If you want me to commit the actual logo (`logo.png`) and the captured screenshots into the repo, reply "commit assets" and upload the transparent PNG (or confirm the attachment) and I'll add them to `web/public/logo.png` and `web/screenshots/`.


GitHub Actions → Auto-deploy to Vercel
-----------------------------------

I added a sample GitHub Actions workflow at `.github/workflows/vercel-deploy.yml` which deploys the `web` folder to Vercel on push to `main`.

Required repository secrets (Settings → Secrets):
- `VERCEL_TOKEN` — a personal token from your Vercel account
- `VERCEL_ORG_ID` — your Vercel organization id
- `VERCEL_PROJECT_ID` — the Vercel project id for this site

After adding those secrets, pushes to `main` will trigger the workflow and deploy to Vercel automatically.


Local admin testing (before deploying)

1. Create a local env file at `web/.env.local` with these values (do NOT commit this file):

```
VITE_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE=your_service_role_key
ADMIN_SECRET=some-strong-secret
```

2. Install dependencies and run the admin fetch script:

```bash
cd web
npm install
npm run admin:fetch
```

The script will print the latest 50 records from `contact_messages` using the `service_role` key. This lets you verify server-side access locally before deploying the serverless admin API to Vercel.

Map coordinates and environment variables

- To set the map center to a custom location (for example the Google Maps link you provided), add these to `web/.env.local`:

```
VITE_MAP_LAT=13.0827
VITE_MAP_LNG=100.6270
```

Replace the numbers above with the latitude and longitude from the Google Maps link. The app will read these automatically when you run `npm run dev` in the `web` folder.

Local vs Deployment environment vars

- Locally: create `web/.env.local` (DO NOT commit it) and run `cd web && npm run dev`. This file is only for developer convenience.
- On Vercel: add the same variables under Project Settings → Environment Variables. Add `SUPABASE_SERVICE_ROLE` and `ADMIN_SECRET` as server-only variables.



Admin API (optional — recommended)

I added a serverless admin API at `/api/admin/records` (Vercel serverless function) that returns rows from the `contact_messages` table. It uses a server-only `SUPABASE_SERVICE_ROLE` key, so you can safely fetch records without exposing privileged keys to clients.

Vercel environment variables to set (Project → Settings → Environment Variables):
- `VITE_SUPABASE_URL` — your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` — public anon key (client-side)
- `SUPABASE_SERVICE_ROLE` — service_role key (server-only; do NOT prefix with `VITE_`)
- `ADMIN_SECRET` — a strong secret string used to protect the admin route

Example curl (call the admin API after deployment):

```bash
curl -H "x-admin-secret: YOUR_ADMIN_SECRET" \
  https://your-deployed-site.vercel.app/api/admin/records
```

Security notes:
- Keep `SUPABASE_SERVICE_ROLE` and `ADMIN_SECRET` in Vercel environment variables only; never commit them to the repository.
- The admin API uses `SUPABASE_SERVICE_ROLE` to read records; this key has elevated privileges and must remain secret.

Comprehensive Client & Admin Guide
==================================

This section explains, step-by-step, how the client (public users) and admin (you) interact with the system, how to test locally, and how to deploy to Vercel so the admin flow works without local secrets.

1) Client flow (public users)
- What happens: When a visitor fills the Contact Form (`/contact`), the browser code will attempt to send the data to Supabase (if `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set) using the client `supabase` client. If Supabase is not configured, the app falls back to using PocketBase (if configured) or a harmless stub for local testing.
- Data stored: Submissions are stored in a table/collection named `contact_messages` with these fields by default:
  - `id` (auto)
  - `name` (string)
  - `email` (string)
  - `message` (text)
  - `created_at` (timestamp)

2) Admin flow (secure server-side reads)
- What you can do today:
  - Log in via the Admin UI (`/admin`) by entering `ADMIN_SECRET`.
  - When you click Login, the serverless endpoint `/api/admin/login` validates the secret and sets an HttpOnly cookie (`admin_token`) valid for 24 hours.
  - The Admin UI then calls `/api/admin/records` which reads `contact_messages` using the server-only `SUPABASE_SERVICE_ROLE` key and returns results to the admin UI.
- How authentication works:
  - The cookie is HttpOnly so client scripts cannot read it (more secure). For automation or tooling you can still call `/api/admin/records` directly with the header `x-admin-secret: YOUR_ADMIN_SECRET`.

3) Testing locally (quick checklist)
- Prepare `web/.env.local` (DO NOT commit this file). Example:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE=your_service_role_key
ADMIN_SECRET=some-strong-secret
VITE_MAP_LAT=13.0827
VITE_MAP_LNG=100.6270
```

- Run the dev server (client + serverless emulation using Vercel CLI — recommended):

```powershell
cd "C:\Users\ACER\OneDrive\เอกสาร\ORBITL website\web"
npm install
npx vercel dev
# open http://localhost:3000/admin in your browser
```

Notes: `npx vercel dev` emulates serverless functions so `/api/admin/login` and `/api/admin/records` run locally and can access `SUPABASE_SERVICE_ROLE` from `web/.env.local`.

- Alternative: run just the server-side fetch script (no serverless emulation). This is useful to confirm the `SUPABASE_SERVICE_ROLE` key can read the DB:

```powershell
cd "C:\Users\ACER\OneDrive\เอกสาร\ORBITL website\web"
# explicitly load .env.local when invoking node
$env:DOTENV_CONFIG_PATH='.env.local'; node -r dotenv/config tools/fetch_admin_records.js
```

This will print the latest 50 records (or an error explaining why it failed).

4) Common troubleshooting & notes
- If `npx vercel dev` fails to pick up `web/.env.local`, ensure you run it from the `web` folder and restart the process after editing `.env.local`.
- If the fetch script prints `Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE`, confirm the variables appear in `web/.env.local` and that you used `DOTENV_CONFIG_PATH='.env.local'` when running the helper script.
- If Supabase returns an authentication or network error, double-check the Supabase project URL and that the `service_role` key is correct. The `service_role` key must be created in Supabase and stored securely in Vercel (server-only).

5) What admin can do now and recommended enhancements
- Current admin capabilities:
  - View the latest `contact_messages` via `/admin` (read-only).

  Members (`members` table)
  --------------------------

  The Join form now writes to a Supabase table named `members`. Create this table in your Supabase project before testing or deploying.

  Example SQL to run in the Supabase SQL editor:

  ```sql
  create table public.members (
    id uuid default gen_random_uuid() primary key,
    full_name text,
    email text,
    major text,
    year_of_study text,
    area_of_interest text,
    created_at timestamptz default now()
  );
  ```

  After creating the table you can view and manage member rows in the Supabase table editor or via the admin endpoints:

  - `GET /api/admin/members` — list members (admin only)
  - `GET /api/admin/members.csv` — export CSV (admin only)
  - `DELETE /api/admin/members/{id}` — delete member (admin only)

  - Login with `ADMIN_SECRET` to set a cookie-based session.
- Recommended improvements I can add (pick any):
  - Delete a message: implement `DELETE /api/admin/records/:id` (server-only) so admins can remove spam.
  - Export CSV: add `GET /api/admin/records.csv` to download all messages as CSV.
  - Paginated admin UI and search/filter by email/date.

6) Deploying to Vercel (summary)
- In your Vercel Project Settings add these Environment Variables:
  - `VITE_SUPABASE_URL` — your Supabase URL
  - `VITE_SUPABASE_ANON_KEY` — client anon key
  - `SUPABASE_SERVICE_ROLE` — service role key (server-only)
  - `ADMIN_SECRET` — admin secret (server-only)
  - Optional: `VITE_MAP_LAT`, `VITE_MAP_LNG` for map centering
- Deploy the `web` folder as the project root. After deploy, visit `https://<your-site>/admin`, enter the admin secret, and the admin UI will fetch server-side records.

7) Want me to finish more now?
- If you want, I can implement `DELETE` and `EXPORT CSV` admin endpoints and add buttons to the admin UI for those actions.
- I can also add a GitHub Action to auto-deploy on push to `main` (requires a `VERCEL_TOKEN` repository secret). Reply which enhancements you'd like and I will implement them.

---

If you want me to demonstrate the admin login → cookie → fetchRecords flow right now, I can run `npx vercel dev` here and walk through the steps; note that I cannot deploy to your Vercel project without your credentials, so to show production behavior you'll need to deploy using the env settings above.


