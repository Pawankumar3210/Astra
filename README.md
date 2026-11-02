# ASTRA

Personal portfolio of **Pawan Kumar G.**  
*Per Aspera Ad Astra.* — through hardships to the stars.

ASTRA is a static React site: a cinematic, space-themed portfolio with a moon-inspired theme toggle, mission-style project files, a constellation timeline, and an optional developer terminal.

## Project structure

```
src/
  content/portfolio.ts    All public copy, projects, skills, journey, contact
  components/             Page sections and signature features
  context/ThemeContext.tsx
  hooks/
  lib/                    Shared helpers and the terminal command allowlist
  App.tsx
public/                   Favicon and static assets
```

Edit `src/content/portfolio.ts` to add a project, change a URL, or update wording. Empty URL fields are omitted from the public UI.

## Prerequisites

- Node.js 20+
- npm 9+

## Install

```bash
npm install
```

## Development

```bash
npm run dev
```

Open the URL printed by Vite (typically `http://localhost:5173`).

## Tests

```bash
npm test
```

## Production build

```bash
npm run build
npm run preview
```

The build output is written to `dist/`.

## Deploy on Vercel

1. Push this repository to GitHub.
2. Import the project in [Vercel](https://vercel.com).
3. Framework preset: Vite. Build command: `npm run build`. Output directory: `dist`.
4. Deploy. No server, database, or environment variables are required.

`vercel.json` is included for SPA rewrites if you later add client-side routes.

## Theme and terminal

- Theme preference is stored in `localStorage` under `astra-theme`.
- The first visit follows the operating system theme when no preference is saved.
- Open the developer terminal from the footer icon or `Ctrl/⌘ + ``.

## Manual content still to confirm

These values are left empty on purpose and will not appear as public links until filled in `src/content/portfolio.ts`:

- Email (`contact.channels` entry `email`)
- Résumé file / `resumeUrl`
- Production `siteUrl` (canonical / Open Graph URL)
- Optional project `screenshot` paths

