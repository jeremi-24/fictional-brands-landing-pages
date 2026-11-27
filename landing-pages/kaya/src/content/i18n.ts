import type { SiteConfig } from './site';

/*
 * Translations. English lives in site.ts and is the base; each language
 * below only lists what changes. Arrays are matched by position,
 * so the n-th entry here translates the n-th entry in site.ts.
 * The phone picture contains text and has one file per language.
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

const alt = (text: string) => ({ alt: text });

const frMum = alt('Une femme en robe cacao et foulard terracotta se repose sur une méridienne en rotin.');
const frAtEase = alt('Un jeune homme en chemise terracotta se détend sur une natte, sur un toit-terrasse.');
const deMum = alt('Eine Frau in kakaobraunem Kleid und terrakottafarbenem Kopftuch ruht auf einer Rattanliege.');
const deAtEase = alt('Ein junger Mann im terrakottafarbenen Hemd entspannt auf einer geflochtenen Matte auf einer Dachterrasse.');

const fr: DeepPartial<SiteConfig> = {
  nav: { links: [{ label: 'Les bienfaits' }, { label: 'Votre marche' }, { label: 'L’histoire' }, { label: 'La technique' }], cta: 'Choisir ma paire', close: 'Fermer' },
  lightbox: { close: 'Fermer l’aperçu' },
  hero: {
    title: ['Marchez chic,', 'marchez bien.'],
    photos: [
      frMum,
      alt('Deux amis en tenue décontractée dans une vieille rue animée au crépuscule, l’un accroupi, l’autre en saut.'),
      alt('Une femme en tenue terracotta fluide avance devant des arches en terre, en sandales Kaya ivoire.'),
      alt('Une femme en tailleur crème, assise sur des marches terracotta, regarde droit l’objectif.'),
      frAtEase,
    ],
  },
  colours: {
    title: 'Choisissez votre couleur.',
    legend: 'Couleur',
    turn: 'La sandale en 3D : faites-la glisser, ou utilisez les flèches gauche et droite, pour la tourner.',
    poster: alt('La sandale Kaya : tige ajourée ivoire, semelle en liège et molette métal sur la bride.'),
    items: [
      { name: 'Ivoire', image: alt('Une paire de sandales Kaya ivoire.') },
      { name: 'Terracotta', image: alt('Une paire de sandales Kaya terracotta.') },
      { name: 'Cacao', image: alt('Une paire de sandales Kaya cacao.') },
      { name: 'Nuit', image: alt('Une paire de sandales Kaya noires.') },
    ],
    cta: 'Choisir ma paire',
  },
  checkout: {
    title: 'Votre paire',
    size: 'Pointure',
    payment: 'Paiement',
    methods: ['Mobile Money', 'Carte', 'À la livraison'],
    colour: 'Couleur',
    delivery: 'Livraison',
    free: 'Offerte',
    price: '39 000 F CFA',
    confirm: 'Valider ma commande',
    notice: 'Concept fictif : rien n’est payé, commandé ni enregistré.',
    done: 'C’est noté.',
    summary: '{colour}, pointure {size}. Paiement : {method}.',
    after: 'Kaya est un concept fictif : rien ne sera livré ni débité.',
    close: 'Fermer',
  },
  benefits: {
    style: {
      title: 'Une ligne qui habille.',
      text: 'Costume, boubou ou short : elle finit la tenue.',
      image: alt('Une paire de sandales Kaya ivoire.'),
      photo: alt('Un père en costume de lin crème porte son enfant sur les épaules dans une cour en terre.'),
    },
    comfort: {
      title: 'Elle épouse votre pied.',
      text: 'Le liège soutient, la mousse prend votre forme.',
      image: alt('La semelle en liège sur sa mousse, avec l’empreinte douce d’un pied.'),
      photo: frMum,
    },
    progress: {
      title: 'Vos progrès, dans l’appli Kaya.',
      text: 'Chaque jour, trois anneaux : vos pas, votre distance et vos minutes de marche.',
      note: 'Aujourd’hui · exemple',
      image: alt('Trois anneaux qui se remplissent : pas, distance et minutes de marche du jour.'),
      rings: [{ value: '6 240', goal: '/ 8 000 pas' }, { value: '4,2', goal: '/ 5 km' }, { value: '52', goal: '/ 60 min' }],
    },
    rain: { title: 'La pluie ne gâche plus rien.', text: 'Un coup d’eau, et vous revoilà impeccable.' },
  },
  dial: {
    kicker: 'Serrée le matin, libre le soir.',
    title: ['Un tour.', 'C’est réglé.'],
    text: 'Vos pieds gonflent l’après-midi ? Un cran de moins, et vous restez élégant.',
    image: alt('La molette et les brides de la sandale Kaya, vues de près.'),
    photo: frAtEase,
    moves: [
      { title: 'Tourner', text: 'Plus de maintien pour les longues marches.' },
      { title: 'Appuyer', text: 'Elle se libère, sans bataille avec une boucle.' },
    ],
  },
  walk: {
    title: ['L’appli Kaya', 'retrace vos pas.'],
    text: 'La sandale compte vos pas et les envoie à l’application. Votre trajet s’affiche sur la carte, à partager avec votre kinésithérapeute quand vous le voulez.',
    note: 'Valeurs d’exemple. Concept fictif, sans promesse médicale.',
    phone: { src: '/images/art/walk-fr.webp', alt: 'L’application Kaya : 6 240 pas aujourd’hui, le trajet dessiné sur une carte avec les empreintes, et un bouton pour partager avec son kinésithérapeute.' },
    stats: [
      { value: '4,2 km', label: 'parcourus aujourd’hui' },
      { value: '+18 %', label: 'de pas réguliers' },
      { value: '6 jours', label: 'd’affilée, bravo' },
    ],
  },
  story: {
    eyebrow: 'L’histoire',
    title: 'La sandale de notre enfance a grandi.',
    body: 'On l’a portée pour aller à l’école, sauter dans les flaques et marquer des buts entre deux pierres. Puis on a grandi, et on l’a laissée derrière la porte. La revoici : la même silhouette, pour les pas d’aujourd’hui.',
    photos: [alt('Trois écoliers rieurs sortent d’un portail en briques, en sandales.'), alt('Un pied en sandale posé sur un ballon de cuir pendant que des amis jouent sur un terrain en terre battue.')],
  },
  tech: {
    eyebrow: 'Pour les curieux',
    title: 'Ce qu’il y a sous le pied.',
    poster: alt('Vue éclatée de la sandale : tige, liège, mousse, capteurs, membrane, batterie et semelle.'),
    layers: [
      { title: 'Tige ajourée', text: 'laisse passer l’air et l’eau' },
      { title: 'Liège', text: 'soutient la voûte' },
      { title: 'Mousse thermique', text: 'prend la forme du pied' },
      { title: 'Capteurs', text: 'cinq points de pression' },
      { title: 'Membrane', text: 'protège l’électronique' },
      { title: 'Batterie Bluetooth', text: 'logée dans le talon' },
      { title: 'Semelle', text: 'accroche au sol' },
    ],
    nfc: 'Au talon, une puce NFC relie la sandale au téléphone d’un simple contact.',
  },
  closing: { title: 'Trouvez votre allure.', cta: 'Choisir ma couleur' },
  footer: { tagline: 'Marque et produit fictifs.', contact: { label: 'Me contacter' }, socials: [{}, {}, { label: 'Code source' }] },
};

const de: DeepPartial<SiteConfig> = {
  nav: { links: [{ label: 'Vorteile' }, { label: 'Dein Gang' }, { label: 'Geschichte' }, { label: 'Technik' }], cta: 'Paar wählen', menu: 'Menü', close: 'Zu' },
  lightbox: { close: 'Vorschau schließen' },
  hero: {
    title: ['Geh stilvoll,', 'geh gut.'],
    photos: [
      deMum,
      alt('Zwei Freunde in lockerer Kleidung in einer belebten alten Gasse in der Dämmerung, einer in der Hocke, einer im Sprung.'),
      alt('Eine Frau in fließendem Terrakotta schreitet an Lehmbögen vorbei, in Kaya-Sandalen in Elfenbein.'),
      alt('Eine Frau im cremefarbenen Anzug sitzt auf Terrakottastufen und blickt direkt in die Kamera.'),
      deAtEase,
    ],
  },
  colours: {
    title: 'Wähle deine Farbe.',
    legend: 'Farbe',
    turn: 'Die Sandale in 3D: zum Drehen ziehen oder die Pfeiltasten links und rechts nutzen.',
    poster: alt('Die Kaya-Sandale: durchbrochenes Obermaterial in Elfenbein, Korkfußbett und Metallrad am Fesselriemen.'),
    items: [
      { name: 'Elfenbein', image: alt('Ein Paar Kaya-Sandalen in Elfenbein.') },
      { name: 'Terrakotta', image: alt('Ein Paar Kaya-Sandalen in Terrakotta.') },
      { name: 'Kakao', image: alt('Ein Paar Kaya-Sandalen in Kakaobraun.') },
      { name: 'Nacht', image: alt('Ein Paar Kaya-Sandalen in Schwarz.') },
    ],
    cta: 'Paar wählen',
  },
  checkout: {
    title: 'Dein Paar',
    size: 'Größe (EU)',
    payment: 'Zahlung',
    methods: ['Mobile Money', 'Karte', 'Bei Lieferung'],
    colour: 'Farbe',
    delivery: 'Lieferung',
    free: 'Kostenlos',
    total: 'Gesamt',
    price: '39.000 F CFA',
    confirm: 'Bestellen',
    notice: 'Fiktives Konzept: Nichts wird bezahlt, bestellt oder gespeichert.',
    done: 'Notiert.',
    summary: '{colour}, Größe {size}. Zahlung: {method}.',
    after: 'Kaya ist ein fiktives Konzept: Nichts wird geliefert oder abgebucht.',
    close: 'Schließen',
  },
  benefits: {
    style: {
      title: 'Eine Form, die kleidet.',
      text: 'Anzug, Boubou oder Shorts: Sie macht das Outfit komplett.',
      image: alt('Ein Paar Kaya-Sandalen in Elfenbein.'),
      photo: alt('Ein Vater im cremefarbenen Leinenanzug trägt sein Kind auf den Schultern durch einen Lehmhof.'),
    },
    comfort: {
      title: 'Sie passt sich deinem Fuß an.',
      text: 'Kork stützt, Schaum folgt deiner Form.',
      image: alt('Das Korkfußbett auf seiner Schaumschicht mit dem weichen Abdruck eines Fußes.'),
      photo: deMum,
    },
    progress: {
      title: 'Dein Fortschritt in der Kaya-App.',
      text: 'Jeden Tag drei Ringe: deine Schritte, deine Strecke und deine Gehminuten.',
      note: 'Heute · Beispiel',
      image: alt('Drei Ringe, die sich füllen: Schritte, Strecke und Gehminuten von heute.'),
      rings: [{ value: '6.240', goal: '/ 8.000 Schritte' }, { value: '4,2', goal: '/ 5 km' }, { value: '52', goal: '/ 60 Min.' }],
    },
    rain: { title: 'Regen verdirbt nichts mehr.', text: 'Kurz abspülen, und du siehst wieder top aus.' },
  },
  dial: {
    kicker: 'Morgens fest, abends frei.',
    title: ['Ein Dreh.', 'Passt.'],
    text: 'Geschwollene Füße am Nachmittag? Eine Stufe lockerer, und du bleibst elegant.',
    image: alt('Rad und Riemen der Kaya-Sandale aus der Nähe.'),
    photo: deAtEase,
    moves: [
      { title: 'Drehen', text: 'Mehr Halt für lange Wege.' },
      { title: 'Drücken', text: 'Sie löst sich, ganz ohne Schnallenkampf.' },
    ],
  },
  walk: {
    title: ['Die Kaya-App', 'zeigt deinen Weg.'],
    text: 'Die Sandale zählt deine Schritte und schickt sie an die App. Dein Weg erscheint auf der Karte, zum Teilen mit deiner Physiotherapie, wann immer du willst.',
    note: 'Beispielwerte. Fiktives Konzept, kein medizinisches Versprechen.',
    phone: { src: '/images/art/walk-de.webp', alt: 'Die Kaya-App: 6.240 Schritte heute, der Weg mit Fußabdrücken auf einer Karte und eine Taste zum Teilen mit der Physiotherapie.' },
    stats: [
      { value: '4,2 km', label: 'heute gegangen' },
      { value: '+18 %', label: 'gleichmäßigere Schritte' },
      { value: '6 Tage', label: 'in Folge, stark' },
    ],
  },
  story: {
    eyebrow: 'Die Geschichte',
    title: 'Die Sandale unserer Kindheit ist erwachsen geworden.',
    body: 'Wir trugen sie zur Schule, sprangen damit in Pfützen und schossen Tore zwischen zwei Steinen. Dann wurden wir groß und ließen sie hinter der Tür stehen. Hier ist sie wieder: dieselbe Form, für die Schritte von heute.',
    photos: [alt('Drei lachende Schulkinder kommen in Sandalen aus einem gemauerten Schultor.'), alt('Ein Fuß in Sandale ruht auf einem Lederball, während Freunde auf einem Lehmplatz spielen.')],
  },
  tech: {
    eyebrow: 'Für Neugierige',
    title: 'Was unter deinem Fuß steckt.',
    poster: alt('Explosionsansicht der Sandale: Obermaterial, Kork, Schaum, Sensoren, Membran, Akku und Laufsohle.'),
    layers: [
      { title: 'Durchbrochener Schaft', text: 'lässt Luft und Wasser durch' },
      { title: 'Kork', text: 'stützt das Fußgewölbe' },
      { title: 'Wärmeschaum', text: 'nimmt die Fußform an' },
      { title: 'Sensoren', text: 'fünf Druckpunkte' },
      { title: 'Membran', text: 'hält die Elektronik trocken' },
      { title: 'Bluetooth-Akku', text: 'in der Ferse verstaut' },
      { title: 'Laufsohle', text: 'greift am Boden' },
    ],
    nfc: 'In der Ferse verbindet ein NFC-Chip die Sandale mit einer Berührung mit dem Telefon.',
  },
  closing: { title: 'Finde deinen Auftritt.', cta: 'Farbe wählen' },
  footer: { tagline: 'Fiktive Marke, fiktives Produkt.', contact: { label: 'Kontakt aufnehmen' }, socials: [{}, {}, { label: 'Quellcode' }] },
};

const TRANSLATIONS: Record<Lang, DeepPartial<SiteConfig>> = { en: {}, fr, de };

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
