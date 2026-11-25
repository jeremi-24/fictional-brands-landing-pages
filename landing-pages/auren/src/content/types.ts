/**
 * Content contract for the template. Every section reads only from these
 * shapes, so swapping `site.ts` re-skins the page for another brand.
 */

export interface Link {
  label: string;
  href: string;
  /** Show this icon instead of the label (the label stays as its accessible name). */
  icon?: 'instagram' | 'pinterest' | 'mail';
}

/** Pre-generated responsive image: files live at `${base}-${width}.{avif,webp}`. */
export interface ResponsiveImage {
  base: string;
  widths: number[];
  width: number;
  height: number;
  alt: string;
  /** Single format (e.g. 'jpg') instead of the AVIF + WebP pair. */
  ext?: string;
}

export interface Theme {
  /** Darkest surface (hero, showcase, purchase). */
  ink: string;
  /** Raised dark surface. */
  inkSoft: string;
  /** Brand accent (glass tint). */
  wine: string;
  /** Warm mid-tone used for highlights and the glow. */
  rose: string;
  /** Pale tint for light sections. */
  blush: string;
  /** Paper surface for editorial sections. */
  paper: string;
  /** Metal / hairline tone. */
  metal: string;
  /** Text on dark surfaces. */
  light: string;
  /** Text on light surfaces. */
  dark: string;
  fontDisplay: string;
  fontBody: string;
  fontMono: string;
}

export interface HeadlineLine {
  text: string;
  italic?: boolean;
  /** Horizontal indent in grid columns (desktop only). */
  indent?: number;
}

export interface KeyValue {
  label: string;
  value: string;
}

export interface Brand {
  name: string;
  theme: Theme;
}

export interface NavConfig {
  links: Link[];
  cta: Link;
  bagLabel: string;
  menuLabel: string;
}

export interface HeroConfig {
  kicker: string;
  headline: HeadlineLine[];
  body: string;
  primary: Link;
  secondary: Link;
  image: ResponsiveImage;
}

export interface AuraConfig {
  id: string;
  eyebrow: string;
  /** Shown first; letters not needed for `word` dissolve away. */
  phrase: string;
  /** Must be spelled, in order, by letters of `phrase`. */
  word: string;
  title: [string, string];
  body: string;
  image: ResponsiveImage;
}

export interface BenefitTile {
  kicker?: string;
  /** Omit on product photos: they are shown clean, with no text over them. */
  title?: string;
  body?: string;
  /** Photo tiles show the image full-bleed with the text over it. */
  image?: ResponsiveImage;
  /** Before/after slider; `labels` name the two sides. */
  compare?: { before: ResponsiveImage; after: ResponsiveImage; labels: [string, string] };
  /** Desktop footprint: large = 2x2, tall = 1x2, wide = 2x1, small = 1x1. */
  size: 'large' | 'tall' | 'wide' | 'small';
  accent?: boolean;
  link?: Link;
}

export interface BenefitsConfig {
  id: string;
  eyebrow: string;
  title: HeadlineLine[];
  tiles: BenefitTile[];
}

/** Where the 3D camera looks while a callout is active. */
export interface CameraFocus {
  /** Height of the point the camera looks at (model units, 0 = base, ~2.8 = cap top). */
  y: number;
  /** Camera distance from the model axis. */
  distance: number;
  /** Model rotation (radians) when the callout is centred. */
  turn: number;
}

export interface Callout {
  index: string;
  label: string;
  title: string;
  body: string;
  side: 'left' | 'right';
  focus: CameraFocus;
}

export interface ShowcaseConfig {
  id: string;
  eyebrow: string;
  title: HeadlineLine[];
  callouts: Callout[];
  /** Shown instead of the 3D stage when WebGL is unavailable. */
  fallback: ResponsiveImage;
}

export interface ProductVariant {
  id: string;
  label: string;
  detail: string;
  price: number;
}

export interface PurchaseMode {
  id: string;
  label: string;
  detail: string;
  /** Multiplier applied to the price (0.9 = 10% off). */
  factor: number;
}

export interface PurchaseConfig {
  id: string;
  eyebrow: string;
  title: HeadlineLine[];
  body: string;
  image: ResponsiveImage;
  currency: string;
  locale: string;
  variants: ProductVariant[];
  modes: PurchaseMode[];
  cta: string;
  addedMessage: string;
  assurances: string[];
  ritual: KeyValue[];
  labels: { size: string; purchase: string; quantity: string; decrease: string; increase: string };
}

export interface FooterConfig {
  columns: { title: string; links: Link[] }[];
  newsletter: { title: string; placeholder: string; cta: string; thanks: string };
  legal: string;
}

export interface SiteConfig {
  brand: Brand;
  nav: NavConfig;
  hero: HeroConfig;
  aura: AuraConfig;
  benefits: BenefitsConfig;
  showcase: ShowcaseConfig;
  purchase: PurchaseConfig;
  footer: FooterConfig;
}
