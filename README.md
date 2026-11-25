# Fictional Brands

**Fictional brands, real feelings.**

Open-source landing pages for brands that don't exist, each built around a real brand idea: a name, a play on words, a moment worth sharing. Every page speaks to a real person, ships in English, French and German, and is a complete project you can clone, run and make your own.

Free to use, MIT licensed.

## Projects

| Preview | Project | Concept |
|---|---|---|
| <a href="landing-pages/auren"><img src="previews/auren.jpg" alt="AUREN landing page preview" width="420"></a> | [AUREN](landing-pages/auren) | A night serum. *Aura renewed* collapses into the brand name, then a 3D bottle tour and a before/after bento. React · Vite · Three.js |

## Run locally

Each folder in `landing-pages/` is an independent project. Requires Node.js 20+.

```bash
cd landing-pages/auren
npm install
npm run dev
```

For a production build, run `npm run build` (output in `dist/`). Each project's README explains its structure and how to rebrand it.

## Deploy

On Vercel, create one project per landing page from this repository:

| Setting | Value |
|---|---|
| Root Directory | `landing-pages/<project>` |
| Framework preset | Vite |

## What every page has

1. A fictional brand with a short name and a real idea behind it
2. One moment worth recording as a GIF
3. Copy written for one real person, not for "users"
4. English, French and German
5. The same structure: all content in `src/content/site.ts`, translations in `src/content/i18n.ts`, one file per section

## Contribute

Ideas, fixes and translations are welcome. Read [CONTRIBUTING.md](CONTRIBUTING.md) first.

## License

Original code is licensed under [MIT](LICENSE). Fonts keep their own licenses (Google Fonts, SIL Open Font License). Images are AI-generated for illustration: the brands, people, results and quotes are fictional, and before/after images demonstrate nothing real.
