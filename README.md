# ORBITL Website

This repository contains the ORBITL frontend (`web/`) built with React + Vite and Tailwind.

Quick local steps

```bash
# from workspace root
cd web
npm install
npm run dev
```

Prepare and push to GitHub (you will run the final push):

```bash
# run in the workspace root (this repo)
git remote add origin https://github.com/YOUR_USERNAME/ORBITL.git
git push -u origin main
```

Deploy notes

- Frontend: Vercel or Cloudflare Pages (set project root to `web`, build `npm run build`, output `dist/apps/web`)
- Backend: Supabase recommended for form storage (set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in env)

If you want, I can walk you through creating the GitHub repo on github.com and finalizing the push.
