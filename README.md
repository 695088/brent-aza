# PantryPal — Product Launch Website

A single-page product launch site for **PantryPal**: smart expiration tracker and meal suggester. Built with React, Vite, and React Router.

## Sections

- **Home** — Hero and links to Product, Survey, and Results
- **Product** — Strategy document: analysis, SWOT, Lean Canvas, competitive landscape, perceptual map
- **Survey** — Customer discovery survey (demographics, buying factors, attitudinal)
- **Results** — Survey analysis: correlation matrix and strong-correlation insights (n = 160)

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build for production

```bash
npm run build
```

Output is in `dist/`. Serve that folder with any static host.

## Deploy

- **Vercel / Netlify:** Connect the repo and use build command `npm run build` and publish directory `dist`. No extra config needed if you use `base: './'` in `vite.config.js` for subpath deployment.
- **GitHub Pages:** Set `base: '/your-repo-name/'` in `vite.config.js`, then build and deploy the `dist` folder (e.g. via `gh-pages` or Actions).

## Tech

- React 18
- React Router 6
- Vite 5

No backend; survey responses are local state only (no persistence).
