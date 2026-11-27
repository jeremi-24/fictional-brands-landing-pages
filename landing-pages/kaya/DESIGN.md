# Kaya design system: Terracotta arches

Everything lives in [`src/styles/tokens.css`](src/styles/tokens.css). Change a value there and the whole page follows. `npm test` fails if a colour is written in any other stylesheet.

## Colours

| Token | Value | Use |
|---|---|---|
| `--paper` | `#FBF4EC` | Light band, the bar once scrolled |
| `--sand` | `#F1E1CF` | Sand band |
| `--clay` | `#E9CDB6` | The story and the layers |
| `--card` | `#FFFDF9` | Light buttons |
| `--accent` | `#A8431F` | Buttons, the last band |
| `--deep` | `#3B1E12` | Dark bands, menu, footer |
| `--ink` | `#2A160D` | Titles and text on light grounds |
| `--soft` | `#765B4C` | Secondary text |
| `--on-accent`, `--on-deep` | `#FFF4E8`, `#FBEBDD` | Text on dark grounds |
| `--swatch-1` … `4` | ivory, terracotta, cocoa, night | The colour choice |
| `--halo-ground`, `-warm`, `-glow`, `-ember`, `-shade`, `-night` | terracotta to peach | The soft halos of the opening |
| `--ring-1` … `3` | accent, apricot, deep | The progress rings (also written in `rings.svg`) |
| `--ink-soft`, `--accent-ink` | | Small text on clay |

Derived: `--on-deep-soft`, `--edge` and `--edge-deep`. For another transparency, use the channels: `rgb(var(--ink-rgb) / 0.2)`.

## Shapes and rhythm

| Token | Use |
|---|---|
| `--arch` | Every photograph and colour sample: a rounded doorway |
| `--radius` | Buttons: almost square |
| `--band`, `--side` | Air around a full-width band |
| `--screen` | The height of a band on wide screens: one screen |
| `--ease` | The one easing curve |

## Type

| Token | Value or use |
|---|---|
| `--display` | Big Shoulders Display, capitals: titles, links, buttons, numbers |
| `--body` | DM Sans: text |
| `--text-hero` | The title of the page |
| `--text-h2` | Band titles and large numbers |
| `--text-h3` | Smaller titles |
| `--text-h4` | Buttons, names of layers |
| `--text-lead`, `--text-body`, `--text-small` | Text |

Fonts are loaded in `index.html` and `renders.html`: change the places together. So is the browser bar colour (`theme-color`).

## Rules

- The opening holds one promise and five photographs. Nothing else.
- On wide screens every band holds on one screen: sizes there follow the height (`svh`).
- Benefits come first; the technical detail comes last, for those who want it.
- No text over photographs, and no captions under them.
- Drawings carry the benefits; photographs carry the emotion, spread along the page.

## Pictures and 3D

Images cannot read these tokens. If you change the palette, redraw `public/images/art/` from `renders.html`, edit `images/charts/*.svg` and `favicon.svg`, and follow the colour rules in [IMAGE_PROMPTS.md](IMAGE_PROMPTS.md) for photographs. Colours of the 3D materials are in `src/three/` and `src/renders/main.ts`.
