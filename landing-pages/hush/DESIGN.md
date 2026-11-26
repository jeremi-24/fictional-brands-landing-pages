# Hush design system

Everything lives in [`src/styles/tokens.css`](src/styles/tokens.css). Change a value there and the whole page follows. `npm test` fails if a colour is written in any other stylesheet.

## Colours

| Token | Value | Use |
|---|---|---|
| `--paper` | `#FFFCF2` | Page background |
| `--white` | `#FFFFFF` | Cards |
| `--ink` | `#10231C` | Titles, text, dark buttons and cards |
| `--ink-lead` | `#23372F` | Hero paragraph |
| `--ink-accent` | `#2D5F4B` | Second line of the hero title |
| `--soft` | `#4D6058` | Secondary text |
| `--lime` | `#D7F54A` | The brand accent: highlights, selected states, featured plan |
| `--mint` | `#BFF2DA` | Calm blocks and gradients |
| `--sky` | `#CBE6FF` | Gradients, timeline |
| `--cancel` | `#E8432C` | The stroke across the cancelled word, only |
| `--never` | `#FF8A6B` | "Hush never" crosses, only |

Derived: `--line`, `--glass`, `--glass-strong` and `--shadow`. For another transparency, use the channels: `rgb(var(--ink-rgb) / 0.2)`.

## Type and rhythm

| Token | Value |
|---|---|
| `--display` | Bricolage Grotesque, for titles and numbers |
| `--body` | Figtree, for everything else |
| `--section-space` | Space above each section |
| `--ease` | The one easing curve |

Fonts are loaded in `index.html`: change both places together. So is the browser bar colour (`theme-color`).

## Pictures

Images cannot read these tokens. If you change the palette, redraw or replace the files in `public/images/`, `favicon.svg`, and follow the colour rules in [IMAGE_PROMPTS.md](IMAGE_PROMPTS.md) for photos.
