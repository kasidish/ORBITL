# Design Comparison — Preview vs Local

Date: 2026-06-11

This report summarizes the side-by-side visual comparison between the hosted preview and the local dev server, and lists the exact CSS / markup changes applied to make the local site match the preview.

Screenshots
- I captured full-page screenshots at widths 375, 768, and 1280 for both the preview and local dev site; those images are visible in the chat where I ran the comparison. If you want them saved into the repo I can write them into `web/screenshots/`.

Summary of visual parity
- Hero: large glowing `ORBITL` heading, centered subtitle, orange rounded CTA — matched.
- Header: light top bar with right-aligned nav and pill CTA — matched.
- Glow: increased on the local copy to match preview.

Exact changes made

- `web/src/pages/HomePage.jsx`
  - Increased hero heading sizes and adjusted spacing.
  - CTA updated to be rounded and orange.

  Snippet (new):

```jsx
<h1 className="orbitl-logo text-8xl md:text-[140px] lg:text-[200px] mb-6 text-glow leading-none">ORBITL</h1>
<p className="text-lg md:text-2xl lg:text-3xl text-white/90 font-medium mb-8 max-w-3xl mx-auto leading-snug">Pioneering the future...</p>
<Button asChild size="lg" className="rounded-full px-8 py-4 text-lg glow-orange transition-smooth hover:scale-105 active:scale-[0.98] bg-primary text-primary-foreground">
  <Link to="/join">Join ORBITL</Link>
</Button>
```

- `index.css` (root)
  - Strengthened logo glow (text-shadow) and added a soft drop shadow.

  Snippet (new):

```css
.text-glow {
  text-shadow: 0 0 30px rgba(255, 107, 53, 0.85), 0 6px 40px rgba(0,0,0,0.6);
}
```

- `web/src/components/Header.jsx`
  - Light top bar (`background: #ececec`), increased header height, added pill `Join ORBITL` button and optional logo image support.

  Snippet (logo + brand):

```jsx
<Link to="/" className="flex items-center orbitl-logo transition-smooth hover:scale-105">
  <img src="/logo.png" alt="ORBITL" className="h-10 w-auto mr-3 hidden sm:block" onError={(e)=>{e.currentTarget.style.display='none'}} />
  <span className="text-2xl text-primary font-bold">ORBITL</span>
</Link>
```

Notes & next steps
- If you want the screenshots stored in the repo, reply "save screenshots" and I will write the PNGs to `web/screenshots/` and update this report with links.
- I added a minimal PocketBase client stub earlier; below I implemented a proper client that uses `VITE_POCKETBASE_URL` when provided. To enable real PocketBase integration, set `VITE_POCKETBASE_URL` in `.env`.

PocketBase integration
- See `web/src/lib/pocketbaseClient.js` for the environment-aware PocketBase client (real client when `VITE_POCKETBASE_URL` is set, otherwise a harmless stub is used for local dev).

If you want a more detailed numeric delta (per-selector computed styles at each viewport stored as JSON), reply and I'll write the JSON output into `web/design-styles.json` and link it here.
