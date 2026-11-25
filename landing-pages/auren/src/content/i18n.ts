import type { SiteConfig } from './types';

/*
 * Translations. English lives in site.ts and is the base; each language
 * below only lists the words that change. Arrays are matched by position,
 * so the n-th entry here translates the n-th entry in site.ts
 * (use {} to skip one, e.g. a photo tile with no text).
 *
 * The "Aura renewed" phrase must still contain the brand letters in order
 * (A-U-R … E-N): "Aura renouvelée" and "Aura erneuert" both do.
 */

export const LANGS = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'fr', label: 'FR', name: 'Français' },
  { code: 'de', label: 'DE', name: 'Deutsch' },
] as const;

export type Lang = (typeof LANGS)[number]['code'];

type DeepPartial<T> = T extends (infer U)[]
  ? DeepPartial<U>[]
  : T extends object
    ? { [K in keyof T]?: DeepPartial<T[K]> }
    : T;

const fr: DeepPartial<SiteConfig> = {
  nav: {
    links: [{ label: 'Pourquoi AUREN' }, { label: 'Le sérum' }, { label: 'Bienfaits' }],
    cta: { label: 'Acheter' },
    bagLabel: 'Panier',
    menuLabel: 'Menu',
  },
  hero: {
    kicker: 'Sérum de nuit · 30 ml',
    headline: [{ text: 'Chaque femme' }, { text: 'a son aura.' }],
    body: 'Pour les soirs où vous vous sentez plus fatiguée que vous n’en avez l’air, et les matins où vous en avez l’air plus que vous ne l’êtes. Trois gouttes avant de dormir. Au réveil, une peau qui paraît reposée, unifiée, lumineuse.',
    primary: { label: 'Ce qu’il fait pour vous' },
    secondary: { label: 'Acheter — 148 €' },
  },
  aura: {
    eyebrow: 'Pourquoi AUREN',
    phrase: 'Aura renouvelée',
    title: ['Votre aura,', 'renouvelée en une nuit.'],
    body: 'La vie la ternit un peu : nuits courtes, journées longues, les années. AUREN agit pendant votre sommeil pour que la lumière que vous avez déjà se voie de nouveau au matin.',
  },
  benefits: {
    eyebrow: 'Ce qu’il fait pour vous',
    title: [{ text: 'Moins à cacher.' }, { text: 'Plus à montrer.' }],
    tiles: [
      { compare: { labels: ['Avant', 'Après'] } },
      { kicker: 'Votre soir', title: 'Une minute rien qu’à vous.', body: 'Trois gouttes, réchauffées entre vos paumes, puis pressées.' },
      { kicker: 'Lissée', title: 'Les ridules paraissent adoucies.', body: 'Le rétinal encapsulé agit pendant votre sommeil, assez doux pour chaque nuit.' },
      { kicker: 'Reposée', title: 'Comme après huit heures de sommeil.', body: 'Même quand ce n’est pas le cas. Moins d’ombres, un teint plus uniforme.' },
      { kicker: 'Votre matin', title: 'Le miroir redevient bienveillant.' },
      { kicker: 'Douce', title: 'Ni picotements, ni desquamation.', body: 'La rose fermentée apaise votre peau pendant que le rétinal la renouvelle.' },
      {},
      {},
      { kicker: 'Notre promesse', title: 'Trente nuits pour le sentir.', body: 'Aimez votre peau, ou renvoyez-le, même vide.', link: { label: 'L’essayer ce soir' } },
    ],
  },
  showcase: {
    eyebrow: 'Le sérum',
    title: [{ text: 'Pensé pour' }, { text: 'vos nuits.' }],
    callouts: [
      { label: 'En main', title: 'Lourd, exprès.', body: 'Le bouchon lesté fait de chaque ouverture une petite pause. Votre soirée ralentit avec lui.' },
      { label: 'À l’abri', title: 'Le verre sombre le garde actif.', body: 'Le rétinal craint la lumière. Le verre sang-de-bœuf le protège : la dernière goutte agit comme la première.' },
      { label: 'Sans calcul', title: 'Trois gouttes. Jamais trop.', body: 'La pipette dose pour vous : assez pour le visage et le cou, rien de gâché.' },
      { label: 'Sur votre peau', title: 'Il fond, puis disparaît.', body: 'Léger comme l’eau, soyeux, absorbé en une minute.' },
    ],
  },
  purchase: {
    eyebrow: 'Acheter',
    title: [{ text: 'Commencez' }, { text: 'votre aura.' }],
    body: 'Essayez-le pendant trente nuits. Si votre peau ne sent pas la différence, renvoyez-le, même vide. La livraison est offerte.',
    locale: 'fr-FR',
    variants: [
      { label: '30 ml', detail: '≈ 10 semaines' },
      { label: '50 ml', detail: '≈ 16 semaines' },
      { label: 'Recharge 30 ml', detail: 'Sachet en verre' },
    ],
    modes: [
      { label: 'Une fois', detail: 'Achat unique' },
      { label: 'Rituel', detail: 'Toutes les 10 semaines · −10 %' },
    ],
    cta: 'Ajouter au panier',
    addedMessage: 'Ajouté à votre panier',
    assurances: ['Livraison offerte', 'Trente nuits d’essai', 'Verre recyclable et recharge'],
    labels: { size: 'Format', purchase: 'Achat', quantity: 'Quantité', decrease: 'Diminuer la quantité', increase: 'Augmenter la quantité' },
    ritual: [
      { label: 'Nettoyer', value: 'Le soir, peau sèche' },
      { label: 'Presser', value: 'Trois gouttes, réchauffées' },
      { label: 'Sceller', value: 'Puis votre crème' },
    ],
  },
  footer: {
    columns: [
      { title: 'Maison', links: [{ label: 'Pourquoi AUREN' }, { label: 'Bienfaits' }, { label: 'Journal' }] },
      { title: 'Service', links: [{ label: 'Livraison' }, { label: 'Retours' }, { label: 'Contact' }] },
      { title: 'Suivre', links: [{}, {}, { label: 'Newsletter' }] },
    ],
    newsletter: {
      title: 'Lettres de l’atelier',
      placeholder: 'Votre e-mail',
      cta: 'S’inscrire',
      thanks: 'Merci, la prochaine lettre est pour vous.',
    },
  },
};

const de: DeepPartial<SiteConfig> = {
  nav: {
    links: [{ label: 'Warum AUREN' }, { label: 'Das Serum' }, { label: 'Wirkung' }],
    cta: { label: 'Kaufen' },
    bagLabel: 'Warenkorb',
    menuLabel: 'Menü',
  },
  hero: {
    kicker: 'Nachtserum · 30 ml',
    headline: [{ text: 'Jede Frau' }, { text: 'hat eine Aura.' }],
    body: 'Für Abende, an denen Sie sich müder fühlen, als Sie aussehen, und Morgen, an denen Sie müder aussehen, als Sie sich fühlen. Drei Tropfen vor dem Schlafen. Wachen Sie mit Haut auf, die erholt, ebenmäßig und strahlend aussieht.',
    primary: { label: 'Was es bewirkt' },
    secondary: { label: 'Kaufen — 148 €' },
  },
  aura: {
    eyebrow: 'Warum AUREN',
    phrase: 'Aura erneuert',
    title: ['Ihre Aura,', 'über Nacht erneuert.'],
    body: 'Das Leben dämpft sie ein wenig: kurze Nächte, lange Tage, die Jahre. AUREN wirkt, während Sie schlafen, damit das Licht, das Sie schon haben, am Morgen wieder sichtbar wird.',
  },
  benefits: {
    eyebrow: 'Was es für Sie tut',
    title: [{ text: 'Weniger verbergen.' }, { text: 'Mehr zeigen.' }],
    tiles: [
      { compare: { labels: ['Vorher', 'Nachher'] } },
      { kicker: 'Ihr Abend', title: 'Eine Minute nur für Sie.', body: 'Drei Tropfen, zwischen den Handflächen erwärmt, sanft eingedrückt.' },
      { kicker: 'Glatter', title: 'Feine Linien wirken weicher.', body: 'Verkapseltes Retinal wirkt im Schlaf, sanft genug für jede Nacht.' },
      { kicker: 'Erholt', title: 'Als hätten Sie acht Stunden geschlafen.', body: 'Auch wenn nicht. Weniger Schatten, ein ebenmäßigerer Teint.' },
      { kicker: 'Ihr Morgen', title: 'Der Spiegel ist wieder freundlich.' },
      { kicker: 'Sanft', title: 'Kein Brennen. Kein Schuppen.', body: 'Fermentierte Rose beruhigt die Haut, während Retinal sie erneuert.' },
      {},
      {},
      { kicker: 'Unser Versprechen', title: 'Dreißig Nächte, um es zu spüren.', body: 'Lieben Sie Ihre Haut, oder schicken Sie es zurück, auch leer.', link: { label: 'Heute Abend testen' } },
    ],
  },
  showcase: {
    eyebrow: 'Das Serum',
    title: [{ text: 'Gemacht für' }, { text: 'Ihre Nacht.' }],
    callouts: [
      { label: 'In der Hand', title: 'Schwer, mit Absicht.', body: 'Die beschwerte Kappe macht das Öffnen zu einer kleinen Pause. Ihr Abend wird mit ihr langsamer.' },
      { label: 'Geschützt', title: 'Dunkles Glas hält es wirksam.', body: 'Retinal verliert im Licht an Kraft. Das ochsenblutrote Glas schützt es, damit der letzte Tropfen wirkt wie der erste.' },
      { label: 'Kein Rätselraten', title: 'Drei Tropfen. Nie zu viel.', body: 'Die Pipette dosiert für Sie: genug für Gesicht und Hals, nichts verschwendet.' },
      { label: 'Auf Ihrer Haut', title: 'Es schmilzt ein und verschwindet.', body: 'Leicht wie Wasser, seidig, in einer Minute eingezogen.' },
    ],
  },
  purchase: {
    eyebrow: 'Kaufen',
    title: [{ text: 'Beginnen Sie' }, { text: 'Ihre Aura.' }],
    body: 'Testen Sie es dreißig Nächte lang. Spürt Ihre Haut keinen Unterschied, schicken Sie es zurück, auch leer. Der Versand ist kostenlos.',
    locale: 'de-DE',
    variants: [
      { label: '30 ml', detail: '≈ 10 Wochen' },
      { label: '50 ml', detail: '≈ 16 Wochen' },
      { label: '30 ml Nachfüllung', detail: 'Glasbeutel' },
    ],
    modes: [
      { label: 'Einmalig', detail: 'Einzelkauf' },
      { label: 'Ritual', detail: 'Alle 10 Wochen · 10 % sparen' },
    ],
    cta: 'In den Warenkorb',
    addedMessage: 'Zum Warenkorb hinzugefügt',
    assurances: ['Kostenloser Versand', 'Dreißig Nächte testen', 'Recycelbares Glas & Nachfüllung'],
    labels: { size: 'Größe', purchase: 'Kauf', quantity: 'Menge', decrease: 'Menge verringern', increase: 'Menge erhöhen' },
    ritual: [
      { label: 'Reinigen', value: 'Abends, auf trockener Haut' },
      { label: 'Eindrücken', value: 'Drei Tropfen, erwärmt' },
      { label: 'Versiegeln', value: 'Danach Ihre Creme' },
    ],
  },
  footer: {
    columns: [
      { title: 'Maison', links: [{ label: 'Warum AUREN' }, { label: 'Wirkung' }, { label: 'Journal' }] },
      { title: 'Service', links: [{ label: 'Versand' }, { label: 'Rücksendung' }, { label: 'Kontakt' }] },
      { title: 'Folgen', links: [{}, {}, { label: 'Newsletter' }] },
    ],
    newsletter: {
      title: 'Briefe aus dem Atelier',
      placeholder: 'Ihre E-Mail',
      cta: 'Abonnieren',
      thanks: 'Danke, der nächste Brief gehört Ihnen.',
    },
  },
};

const TRANSLATIONS: Partial<Record<Lang, DeepPartial<SiteConfig>>> = { fr, de };

/** Deep merge where objects merge by key and arrays by position. */
function merge<T>(base: T, patch: unknown): T {
  if (patch === undefined) return base;
  if (Array.isArray(base)) return base.map((b, i) => merge(b, (patch as unknown[])[i])) as T;
  if (base && typeof base === 'object') {
    const out: Record<string, unknown> = { ...(base as object) };
    for (const [k, v] of Object.entries(patch as object)) out[k] = merge((base as unknown as Record<string, unknown>)[k], v);
    return out as T;
  }
  return patch as T;
}

export const localize = (site: SiteConfig, lang: Lang): SiteConfig => merge(site, TRANSLATIONS[lang]);

/** ?lang= in the URL, then the visitor's last choice, then the browser language. */
export function initialLang(): Lang {
  const known = (v: string | null | undefined): Lang | undefined => LANGS.find((l) => l.code === v?.slice(0, 2).toLowerCase())?.code;
  let saved: string | null = null;
  try {
    saved = localStorage.getItem('lang');
  } catch {
    // storage blocked (private mode): fall through
  }
  return known(new URLSearchParams(location.search).get('lang')) ?? known(saved) ?? known(navigator.language) ?? 'en';
}
