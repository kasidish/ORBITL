# ORBITL Website — Ready for GitHub & Publication

## Status Summary (2026-06-11)

✅ **Completed & Tested**
- Hero section with large glowing ORBITL text
- Light header bar with navigation and orange pill CTA
- Responsive design at 375px, 768px, 1280px viewports
- All pages (Home, About, Mission, News, Contact, Join) are functional
- Form components with contact submission support
- Environment-aware PocketBase client (real client when `VITE_POCKETBASE_URL` is set)
- Production build verified (`npm run build` succeeds)

## Files Ready for GitHub

```
web/
├── README.md                       ✓ (how to test & deploy)
├── .env.local.example              ✓ (env template for PocketBase)
├── design-comparison.md            ✓ (visual comparison report)
├── package.json                    ✓ (all deps included)
├── vite.config.js                  ✓ (with @ alias)
├── src/
│   ├── main.jsx                    ✓ (fixed imports)
│   ├── app.jsx                     ✓
│   ├── index.css                   ✓ (with glow effects)
│   ├── lib/pocketbaseClient.js     ✓ (env-aware)
│   ├── components/
│   │   ├── Header.jsx              ✓ (with logo img support)
│   │   ├── Footer.jsx              ✓
│   │   ├── ContactForm.jsx         ✓
│   │   └── ...
│   └── pages/
│       ├── HomePage.jsx            ✓ (large hero)
│       ├── JoinPage.jsx            ✓
│       └── ...
└── public/
    └── logo.png                    ⏳ (waiting for your transparent logo file)
```

## What You Need to Do Before Publishing

1. **Add the logo** — Upload your transparent logo PNG to `web/public/logo.png`
   - The header will auto-detect and use it
   - If not present, site falls back to text (still works)

2. **Set up GitHub** — Push the repo:
   ```bash
   git init
   git add .
   git commit -m "Initial ORBITL website setup"
   git remote add origin https://github.com/YOUR_USERNAME/orbitl.git
   git push -u origin main
   ```

3. **Optional: Configure PocketBase** — If you want the contact form to submit to a real backend:
   - Create `web/.env.local`:
     ```
     VITE_POCKETBASE_URL=https://your-pocketbase-instance.com
     VITE_POCKETBASE_CONTACT_COLLECTION=contact_messages
     ```
   - Restart dev server: `npm run dev`

4. **Deploy** — Choose a host:
   - **GitHub Pages** (free): [GitHub Pages setup guide](https://pages.github.com/)
   - **Vercel** (free): Connect repo, auto-deploys on push
   - **Netlify** (free): Similar to Vercel

   After build (`npm run build`), deploy the contents of `dist/apps/web/`.

### Deploying to Vercel (recommended for React + Vite)

1. Install Vercel CLI (optional) or use the Vercel web UI:

```bash
npm i -g vercel
# from the `web` folder
cd web
vercel login
vercel
```

2. When using the web UI, connect your GitHub repo and set the root project to the `web` folder. Use the following build settings:
- Framework: `Other`
- Build command: `npm run build`
- Output Directory: `dist/apps/web`

3. To enable PocketBase access, set environment variables in Vercel (Project Settings → Environment Variables):
- `VITE_POCKETBASE_URL` = `https://your-pocketbase.example` (if PocketBase is publicly accessible)

Notes on PocketBase access and security
- If your PocketBase is running locally (on your computer) and you want the deployed site to write to it, you must expose PocketBase to the internet (not recommended for production) or host PocketBase on a public server.

- Quick secure options:
  - Deploy PocketBase on a small cloud VM (DigitalOcean, Hetzner, AWS) and enable HTTPS. Then use that public URL as `VITE_POCKETBASE_URL`.
  - For short-term testing, run PocketBase locally and expose it with `ngrok` or `cloudflared` (creates a temporary secure tunnel). Example using `ngrok`:

```bash
# run pocketbase on port 8090 locally
pocketbase serve --http=localhost:8090

# in another shell, run ngrok
ngrok http 8090
# copy the https://*.ngrok.io url and set VITE_POCKETBASE_URL to it
```

- Be careful: exposing a local PocketBase to the internet may allow others to write to your database. Protect collections with auth rules and consider using API keys or server-side proxies for production.

## Quick Test Commands

```bash
# local dev
cd web && npm run dev

# build production
npm run build

# lint check
npm run lint
```

## Next Steps

1. **Upload logo** — Drag `logo.png` into `web/public/` (or tell me path)
2. **Test locally** — Run `npm run dev`, verify header shows logo
3. **Push to GitHub** — Initialize repo and push
4. **Deploy** — Follow your chosen hosting provider's steps

Once you upload the logo file, the site will be 100% ready to publish. Comment out or let me know if you want me to help with any of these steps!
