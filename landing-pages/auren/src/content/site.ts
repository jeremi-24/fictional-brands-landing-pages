import type { ResponsiveImage, SiteConfig } from './types';

/*
 * AUREN is a fictional brand. Every name, figure and quote below is
 * illustrative. Replace this file (and /public/images) to rebrand the template.
 */

/** `small` is the extra mobile size; files are /images/auren-NAME-WIDTH.jpg */
const img = (name: string, small: number, width: number, height: number, alt: string): ResponsiveImage => ({
  base: `/images/auren-${name}`,
  widths: [small, width],
  width,
  height,
  ext: 'jpg',
  alt,
});

const women = img('women', 900, 1584, 672, 'Six women of different origins and ages, dressed in oxblood, rose, blush and champagne, standing together against a smoky rose backdrop.');
const bottle = img('bottle', 800, 1376, 768, 'The AUREN serum bottle, oxblood glass and a brushed platinum cap, on dark stone against a smoky rose glow.');
const swirl = img('swirl', 800, 1376, 768, 'A ribbon of translucent rose serum swirling around the AUREN bottle.');
const ritual = img('ritual', 600, 928, 1152, 'A woman with closed eyes pressing serum into her cheek at night, the AUREN bottle on her nightstand.');
const product = img('product', 600, 896, 1190, 'Close-up of the AUREN bottle, its pipette visible through the oxblood glass.');
const before = img('before', 600, 928, 1152, 'Close-up of a woman’s face before: dull tone, dark circles and fine lines around the eye.');
const after = img('after', 600, 928, 1152, 'The same woman’s face after: a more even, rested-looking complexion.');
const morning = img('morning', 600, 928, 1152, 'A woman sitting on her bed in the morning, touching her cheek as she looks into a small mirror.');
const packshot = img('packshot', 600, 928, 1152, 'The AUREN bottle standing next to its embossed oxblood box.');

export const site: SiteConfig = {
  brand: {
    name: 'AUREN',
    theme: {
      ink: '#140a0c',
      inkSoft: '#22100f',
      wine: '#5b1622',
      rose: '#c98a80',
      blush: '#ecd9d2',
      paper: '#f4ede6',
      metal: '#b9b1a8',
      light: '#f2e6df',
      dark: '#1d0f11',
      fontDisplay: '"Bodoni Moda", "Didot", "Times New Roman", serif',
      fontBody: '"Figtree", "Helvetica Neue", Arial, sans-serif',
      fontMono: '"IBM Plex Mono", ui-monospace, Menlo, monospace',
    },
  },

  nav: {
    links: [
      { label: 'Why AUREN', href: '#aura' },
      { label: 'The serum', href: '#object' },
      { label: 'Benefits', href: '#benefits' },
    ],
    cta: { label: 'Shop', href: '#reserve' },
    bagLabel: 'Cart',
    menuLabel: 'Menu',
  },

  hero: {
    kicker: 'Night serum · 30 ml',
    headline: [
      { text: 'Every woman' },
      { text: 'has an aura.', italic: true, indent: 1 },
    ],
    body: 'For the evenings you feel more tired than you look, and the mornings you look more tired than you feel. Three drops before bed. Wake up to skin that looks rested, even, and lit from within.',
    primary: { label: 'See what it does', href: '#benefits' },
    secondary: { label: 'Shop — €148', href: '#reserve' },
    image: women,
  },

  aura: {
    id: 'aura',
    eyebrow: 'Why AUREN',
    phrase: 'Aura renewed',
    word: 'AUREN',
    title: ['Your aura,', 'renewed overnight.'],
    body: 'Life dims it a little: short nights, long days, the years. AUREN works while you sleep, so the light you already have shows again by morning.',
    image: bottle,
  },

  benefits: {
    id: 'benefits',
    eyebrow: 'What it does for you',
    title: [{ text: 'Less to hide.' }, { text: 'More to show.', italic: true, indent: 1 }],
    tiles: [
      {
        compare: { before, after, labels: ['Before', 'After'] },
        size: 'large',
      },
      {
        kicker: 'Your evening',
        title: 'One minute that is only yours.',
        body: 'Three drops, warmed in your palms, pressed in.',
        image: ritual,
        size: 'tall',
      },
      {
        kicker: 'Smoother',
        title: 'Fine lines look softer.',
        body: 'Encapsulated retinal works while you sleep, gently enough for every night.',
        size: 'small',
      },
      {
        kicker: 'Rested',
        title: 'You look like you slept eight hours.',
        body: 'Even when you didn’t. Fewer shadows, a more even tone.',
        size: 'small',
      },
      {
        kicker: 'Your morning',
        title: 'The mirror is kind again.',
        image: morning,
        size: 'tall',
      },
      {
        kicker: 'Gentle',
        title: 'No sting. No flaking.',
        body: 'Fermented rose calms your skin while retinal renews it.',
        size: 'small',
      },
      { image: swirl, size: 'wide' },
      { image: product, size: 'small' },
      {
        kicker: 'Our promise',
        title: 'Thirty nights to feel it.',
        body: 'Love your skin, or send it back, even empty.',
        size: 'wide',
        accent: true,
        link: { label: 'Try it tonight', href: '#reserve' },
      },
    ],
  },

  showcase: {
    id: 'object',
    eyebrow: 'The serum',
    title: [{ text: 'Designed around' }, { text: 'your night.', italic: true, indent: 1 }],
    callouts: [
      {
        index: '01',
        label: 'In your hand',
        title: 'Heavy, on purpose.',
        body: 'The weighted cap turns opening it into a small pause. Your evening slows down with it.',
        side: 'left',
        focus: { y: 2.25, distance: 4.4, turn: 0.7 },
      },
      {
        index: '02',
        label: 'Kept safe',
        title: 'Dark glass keeps it working.',
        body: 'Retinal fades in light. The oxblood glass shields it, so your last drop works as well as your first.',
        side: 'right',
        focus: { y: 1.05, distance: 5.2, turn: 2.2 },
      },
      {
        index: '03',
        label: 'No guesswork',
        title: 'Three drops. Never too much.',
        body: 'The pipette measures for you: enough for face and neck, nothing wasted.',
        side: 'left',
        focus: { y: 0.55, distance: 4.2, turn: 3.6 },
      },
      {
        index: '04',
        label: 'On your skin',
        title: 'It melts in, then disappears.',
        body: 'Feels like water, settles like silk, gone within a minute.',
        side: 'right',
        focus: { y: 1.35, distance: 6.4, turn: 6.28 },
      },
    ],
    fallback: product,
  },

  purchase: {
    id: 'reserve',
    eyebrow: 'Shop',
    title: [{ text: 'Begin' }, { text: 'your aura.', italic: true, indent: 1 }],
    body: 'Try it for thirty nights. If your skin doesn’t feel the difference, send it back, even empty. Shipping is on us.',
    image: packshot,
    currency: 'EUR',
    locale: 'en-IE',
    variants: [
      { id: '30', label: '30 ml', detail: '≈ 10 weeks', price: 148 },
      { id: '50', label: '50 ml', detail: '≈ 16 weeks', price: 212 },
      { id: 'refill', label: '30 ml refill', detail: 'Glass pouch', price: 118 },
    ],
    modes: [
      { id: 'once', label: 'One-time', detail: 'Single purchase', factor: 1 },
      { id: 'ritual', label: 'Ritual', detail: 'Every 10 weeks · save 10%', factor: 0.9 },
    ],
    cta: 'Add to cart',
    addedMessage: 'Added to your cart',
    assurances: ['Complimentary shipping', 'Thirty-night trial', 'Recyclable glass & refill'],
    labels: { size: 'Size', purchase: 'Purchase', quantity: 'Quantity', decrease: 'Decrease quantity', increase: 'Increase quantity' },
    ritual: [
      { label: 'Cleanse', value: 'Evening, on dry skin' },
      { label: 'Press', value: 'Three drops, warmed' },
      { label: 'Seal', value: 'Follow with moisturiser' },
    ],
  },

  footer: {
    columns: [
      { title: 'Maison', links: [{ label: 'Why AUREN', href: '#aura' }, { label: 'Benefits', href: '#benefits' }, { label: 'Journal', href: '#' }] },
      { title: 'Care', links: [{ label: 'Shipping', href: '#' }, { label: 'Returns', href: '#' }, { label: 'Contact', href: '#' }] },
      { title: 'Follow', links: [{ label: 'Instagram', href: '#', icon: 'instagram' }, { label: 'Pinterest', href: '#', icon: 'pinterest' }, { label: 'Newsletter', href: '#newsletter', icon: 'mail' }] },
    ],
    newsletter: {
      title: 'Letters from the atelier',
      placeholder: 'Your email',
      cta: 'Subscribe',
      thanks: 'Thank you — the next letter is yours.',
    },
    legal: '© 2026 AUREN',
  },
};
