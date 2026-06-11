# ORBITL Vercel Frontend

This is the current live ORBITL frontend, built with React, Vite, and Tailwind.

The old custom `/admin` page and admin API were removed because content editing is moving to Drupal.

## Local Development

```powershell
npm install
npm run dev
```

Open:

```text
http://localhost:3000/
```

## Production Build

```powershell
npm run build
npm run start
```

The production output is:

```text
dist
```

## Vercel Settings

If the Vercel project root is `web`, use:

- Framework: Vite
- Build command: `npm run build`
- Output directory: `dist`

If the Vercel project root is the repository root, use the root `vercel.json`, which builds `web` and outputs `web/dist`.

## Forms

The Contact and Join forms still use Supabase when these environment variables are set:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

The Drupal rebuild should eventually replace these custom form flows with Drupal Webform.

