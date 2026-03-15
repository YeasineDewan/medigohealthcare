# Scripts – npm only (no .sh / .bat / .ps1 required)

Use **only npm scripts** (and the Node script below) for all workflows. You do **not** need any `.sh`, `.bat`, or `.ps1` files.

## Quick reference

| Task | Command |
|------|--------|
| Development | `npm run dev` |
| Build (output to `dist/`) | `npm run build` |
| Build and copy into Laravel for cPanel | `npm run build:cpanel` |
| Preview production build | `npm run preview` |

## Commands

- **`npm run dev`** – Start Vite dev server. Uses `.env` (e.g. `VITE_API_URL`). No mock server needed when your Laravel API is running.
- **`npm run build`** – Production build into `dist/`.
- **`npm run build:cpanel`** – Runs Vite build and copies `dist/` into Laravel `public/` (see `scripts/build-for-cpanel.cjs`). Use this before zipping for cPanel.
- **`npm run preview`** – Serve the built `dist/` locally to test production build.

## Environment

- **`.env`** is the source of truth. Set `VITE_API_URL` (and optionally `VITE_WS_URL`) for production/cPanel; leave `VITE_API_URL` empty when frontend and Laravel are on the same domain (same-origin `/api/v1`).
- No mock API or mock data: the app talks to your real backend using the URL from `.env`.

## cPanel deploy

1. Run **`npm run build:cpanel`** (builds and copies into Laravel `public/`).
2. Zip the Laravel project (see `CPANEL_DEPLOY.md` and `ZIP_INCLUDE.txt`).
3. Upload and set document root, `.env`, and DB credentials as in `CPANEL_DEPLOY.md`.

No shell or PowerShell scripts are required for the frontend or for this deploy flow.
