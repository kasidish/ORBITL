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

If you'd like, I can also prepare a GitHub Actions workflow to build the site and deploy to GitHub Pages automatically on push.
