# ASTRA

Personal portfolio of **Pawan Kumar G.**  
*Per Aspera Ad Astra.* — through hardships to the stars.

ASTRA is a static React site built around a cinematic orbital interface: a themed Earth horizon, mission-style project files, a constellation timeline, and a developer terminal.

## Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS 4
- Framer Motion
- Lucide icons
- Vitest and oxlint

## Features

- Dark/light theme with system preference detection and `localStorage` persistence
- Seven sections: Home, About, Projects, Tech Stack, Journey, Trajectory, Contact
- Real screenshots and verified public links for ResuMint, Wisdom Vault, DoxDock, RepoWarp, BioScope, ResQChain, and TenderTrace AI
- Accessible project dialogs with focus trapping and Escape-to-close
- Typed hero motto, smooth section navigation with an arrival scan, and reduced-motion fallbacks
- Animated contact orbit with label-only GitHub, LinkedIn, and Email channels
- Scroll-lit constellation journey with education, open source, hackathon, milestone, and future markers
- Journey category filters that redraw the active constellation path
- Interactive tech-stack console with channel-based context instead of invented skill meters
- Organization Lead role at Sapthagiri Libre-Software Users Group (SLUG), reflected in About and Journey
- Current-focus Now panel in About
- Cinematic loading intro with skip/Escape controls and a reduced-motion bypass
- **Ctrl/⌘ + K** opens a body-portaled command palette for sections, projects, actions, and easter eggs
- Developer terminal available from About, the footer, or **Ctrl/⌘ + J**, with history, tab completion, and theme control
- Slow parallax starfield, smooth mission overlays, orbital minimap, animated Horizon probe, subtle project tilt, and warp-drive easter eggs
- Custom signal-lost 404, ProfilePage JSON-LD, versioned social image, and deployment security headers
- Reduced-motion support, keyboard navigation, skip link, and visible focus states
- Responsive from 320px through 1920px with no horizontal overflow

## Development

```bash
npm install
npm run dev
```

Vite prints the local URL, usually `http://localhost:5173`.

## Validation

```bash
npm test        # Vitest unit tests
npm run lint    # oxlint
npm run build   # TypeScript project build + Vite production build
npm run preview # preview dist/
```

## Content

All public copy, projects, technology groups, timeline entries, and contact links live in:

```text
src/content/portfolio.ts
```

Leave a URL empty to omit it from the public interface. Never add invented metrics, testimonials, or contact details.

Project preview images are stored in `public/projects/`:

- `resumint.jpg`
- `wisdom-vault.jpg`
- `doxdock.jpg`
- `repowarp.jpg`
- `bioscope.jpg`
- `resqchain.jpg`
- `tendertrace.jpg`

Social preview assets are `public/og-image.jpg` and `public/apple-touch-icon.png`.

The Earth background is `public/astra-earth.jpeg`, supplied for this site.

## Structure

```text
src/
  content/          Central portfolio data and content tests
  components/       Sections and signature interactions
  context/          Theme provider and theme context
  hooks/            Active section, focus trap, reduced motion, smooth anchors
  lib/              Shared utilities and terminal commands
  App.tsx
public/             Icons, Earth background, social image, project screenshots
index.html          Document metadata and theme bootstrap
vercel.json         Vite build and rewrite configuration
```

## Deploy on Vercel

1. Push this repository to GitHub.
2. Import the project in [Vercel](https://vercel.com).
3. Use the Vite preset, `npm run build`, and output directory `dist`.
4. Deploy. No server, database, or environment variables are required.

`vercel.json` includes an SPA rewrite for future client-side routes. Unknown paths render the custom signal-lost page client-side, but the rewrite still returns HTTP 200; a true 404 status requires edge routing or a hosting-platform 404 strategy.

The production origin is `https://pawankumarg.vercel.app`. Canonical, Open Graph, Twitter, robots, and sitemap URLs are already configured for it. If the domain changes, update `index.html`, `public/robots.txt`, `public/sitemap.xml`, and `siteUrl` in `src/content/portfolio.ts`.

## Content notes

- The public email is `pawankumarg881156@gmail.com`; the downloadable résumé is `public/pawan-kumar-g-resume.pdf`.
- The public LinkedIn URL is `https://www.linkedin.com/in/pawan-kumar-g/`.
- BioScope’s public demo uses mock data and presentation-layer prediction flows; it does not claim live surveillance or a production ML model.
- ResQChain and TenderTrace AI screenshots reflect their deployed interfaces; their live backends may be unavailable independently of this static portfolio.
- Project repositories, live demos, and the ten DoxDock pull requests were checked when the content was written.
- The site has no analytics, backend, or third-party data collection. Theme preference is the only persisted browser value.
