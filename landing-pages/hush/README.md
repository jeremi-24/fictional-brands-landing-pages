# Hush — Landing Page

A bright SaaS landing page for a product that does not exist: a calendar assistant that helps teams cut useless meetings.

Built with **React 19, TypeScript and Vite**. No animation or icon library.

![Hush landing page](../../previews/hush.jpg)

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:5173.

| Command | Description |
|---|---|
| `npm run build` | Typecheck and build for production |
| `npm run preview` | Preview the production build |
| `npm test` | Check that every picture the page asks for exists (Node.js 22.6+) |

## Features

- A landscape hero with the menu inside it, turning into a floating pill on scroll, and a title whose "meetings" gets crossed out.
- Hush, the agent (see [AGENT.md](AGENT.md)), with its jobs arriving around it.
- Benefits, three animated illustrations for how it works, privacy cards, three moments of a quieter week, a testimonial and pricing.
- Everything appears on scroll. English, French and German.
- Keyboard friendly, and respects `prefers-reduced-motion`.

## Use your own pictures

Every picture is a plain file, named in `src/content/site.ts`. Replace the file, or change its path there.

| In `public/` | What | Size |
|---|---|---|
| `images/brand/logo.svg` | Logo next to the name | square |
| `favicon.svg` | Browser tab icon | square |
| `images/brand/agent.svg` | The agent (agent section and closing block) | square |
| `images/sky-2400.jpg`, `sky-1200.jpg` | Landscape behind the hero (and the agent) | 12:7 |
| `images/apps/*.svg` | "Works with" icons | square |
| `images/logos/*.svg` | "Trusted by" logos | 160 × 32 |
| `images/screens/app-<lang>.webp` | The app in the hero | 1920 × 1120 |
| `images/screens/skip-`, `reply-`, `focus-<lang>.webp` | The three feature pictures | 1024 × 864 |
| `images/screens/report-<lang>.webp` | What the manager sees | 800 × 600 |
| `images/steps/*.svg` | "How it works" illustrations (no text, animated) | 400 × 320 |
| `images/photos/focus.webp`, `lunch.webp`, `evening.webp` | Photos of people (prompts in [IMAGE_PROMPTS.md](IMAGE_PROMPTS.md)) | 2:1, 720 × 360 or larger |

Keep the `width`, `height` and `alt` in `site.ts` in step with your files. `npm test` checks that every named picture exists.

Only small interface symbols (ticks, crosses, task icons) are drawn in code, in `src/components/Icon.tsx`.

The app screens contain text, so there is one per language. They also show the logo and the agent, as do `steps/connect.svg` (logo) and `steps/quiet.svg` (agent): redraw those pictures after changing either. Their source is in `src/screens/`: run `npm run dev`, open `/screens.html?screen=app&lang=en` and capture the `#shot` element. That page is not part of the production build.

## Customize

- `src/content/site.ts`: every word, picture and price.
- `src/content/i18n.ts`: French and German.
- `src/styles/`: colours are CSS variables at the top of `base.css`.
- `src/sections/`: one file per section.

The hero sky (`public/images/sky-*.jpg`) was generated from noise functions in code for this project; it contains no third-party material. The company logos are invented for this project. The three photos are AI-generated (Google Gemini); the people in them do not exist.

Everything is fictional: the product, people, companies, prices and numbers. Fonts: Bricolage Grotesque and Figtree (Google Fonts, SIL Open Font License).
