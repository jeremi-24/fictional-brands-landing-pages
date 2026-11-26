import type { SiteConfig } from './site';

/*
 * Translations. English lives in site.ts and is the base; each language
 * below only lists what changes. Arrays are matched by position,
 * so the n-th entry here translates the n-th entry in site.ts.
 * Screen pictures that contain text have one file per language.
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

const screen = (name: string, lang: 'fr' | 'de', alt: string) => ({ src: `/images/screens/${name}-${lang}.webp`, alt });

const fr: DeepPartial<SiteConfig> = {
  nav: { links: [{ label: 'L’agent' }, { label: 'Fonctions' }, { label: 'Fonctionnement' }, { label: 'Confidentialité' }, { label: 'Tarifs' }], cta: 'Essai gratuit' },
  hero: {
    kicker: 'Assistant d’agenda pour les équipes',
    title: ['Supprimez les réunions', 'inutiles.'],
    strike: 'réunions',
    body: 'Hush lit votre agenda, repère les réunions inutiles et rédige le refus poli. Vous décidez, et vous récupérez vos heures.',
    primary: 'Commencer gratuitement',
    secondary: 'Découvrir l’agent',
    worksWith: 'Se branche sur',
    screen: screen('app', 'fr', 'L’application Hush : un agenda de la semaine avec du temps de concentration, à côté de trois suggestions de réunions à raccourcir ou décliner.'),
  },
  apps: [{ name: 'Agenda' }, { name: 'E-mail' }, { name: 'Visio' }, { name: 'Messagerie' }],
  companies: { label: 'La confiance des équipes qui aiment les semaines calmes' },
  agent: {
    eyebrow: 'Hush, votre agent',
    image: { alt: 'Hush, l’agent : casque sur les oreilles, yeux fermés.' },
    title: ['Vous dites oui.', 'Hush fait le travail.'],
    tasks: [
      { title: 'Lit votre semaine', detail: '9 réunions vérifiées lundi matin' },
      { title: 'Rédige le refus poli', detail: 'Votre réponse à Noah est prête' },
      { title: 'Réserve votre concentration', detail: 'Mercredi, de 14:00 à 16:00' },
      { title: 'Attend votre accord', detail: 'Rien ne part sans lui' },
    ],
  },
  features: {
    eyebrow: 'Ce que vous gagnez',
    title: 'Trois casse-tête en moins.',
    items: [
      {
        title: 'Savoir quelles réunions éviter',
        body: 'Avant le début de la semaine, Hush cherche dans chaque invitation les signes que votre présence n’est pas nécessaire, et vous dit pourquoi.',
        points: ['Invitation facultative, mêmes personnes qu’une autre réunion', 'Les vraies séances de travail sont laissées tranquilles'],
        image: screen('skip', 'fr', 'Une invitation à 14 personnes où vous êtes facultatif : Hush indique que vous pouvez la sauter et gagner 1 h 30.'),
      },
      {
        title: 'Dire non sans e-mail gênant',
        body: 'Hush rédige la réponse à votre place. Choisissez le ton, relisez, envoyez.',
        points: ['Rien ne part avant que vous appuyiez sur Envoyer', 'Chaleureux, court ou léger'],
        image: screen('reply', 'fr', 'Un e-mail poli déjà rédigé par Hush, avec trois tons et un bouton Envoyer.'),
      },
      {
        title: 'Retrouver de vrais moments pour travailler',
        body: 'Les heures libérées sont réservées dans votre agenda pour vous concentrer, et personne ne les remplit à nouveau.',
        points: ['Vos collègues voient que vous êtes pris', 'Moins de travail repoussé au soir'],
        image: screen('focus', 'fr', 'La même journée avant et après : quatre réunions deviennent deux réunions et trois heures de concentration.'),
      },
    ],
  },
  steps: {
    eyebrow: 'Comment ça marche',
    title: 'Du trop-plein au calme dès mercredi.',
    items: [
      { time: 'Lun 08:00', title: 'Connectez votre agenda', image: { alt: 'Agenda, e-mail, visio et messagerie reliés à Hush.' } },
      { time: 'Lun 08:02', title: 'Décidez en un clic', image: { alt: 'Un clic décline une réunion ; une autre est gardée et une troisième raccourcie.' } },
      { time: 'Mer 14:00', title: 'Profitez du calme', image: { alt: 'Une journée avec un grand créneau de concentration, à côté de Hush casque sur les oreilles.' } },
    ],
  },
  privacy: {
    eyebrow: 'Confidentialité',
    title: 'Votre agenda reste à vous.',
    body: 'Voici ce que Hush regarde, ce qu’il ne fait jamais, et ce que voit votre responsable.',
    reads: { title: 'Hush regarde', items: ['Les titres des réunions', 'Les horaires et la durée', 'Les invités et l’ordre du jour'] },
    never: { title: 'Hush ne fait jamais', items: ['Rejoindre ou enregistrer une réunion', 'Envoyer ou refuser sans votre accord', 'Montrer vos réunions à votre chef'] },
    manager: { title: 'Votre responsable voit', image: screen('report', 'fr', 'Équipe design : 31 heures gagnées ce mois-ci. Aucun nom, aucun titre de réunion.'), consent: 'Seulement si l’équipe accepte' },
  },
  feel: {
    eyebrow: 'Ce que ça change',
    title: 'À quoi ressemble une semaine plus calme.',
    moments: [
      { feeling: 'Concentré', text: 'Deux heures au calme mercredi, et le brouillon est fini.', photo: { alt: 'Une personne qui travaille au calme, très concentrée.' } },
      { feeling: 'Présent', text: 'Un déjeuner avec l’équipe, sans toucher au téléphone.', photo: { alt: 'Des collègues qui déjeunent sans se presser.' } },
      { feeling: 'Léger', text: 'Parti à l’heure, sans rien à rattraper ce soir.', photo: { alt: 'Une personne qui quitte le travail dans la lumière du soir.' } },
    ],
  },
  quote: {
    text: 'Je faisais mon vrai travail après le dîner. Maintenant, c’est le mercredi après-midi.',
    name: 'Nadia, cheffe de projet',
    company: 'Quillfox (fictif)',
  },
  pricing: {
    eyebrow: 'Tarifs',
    title: 'Moins cher qu’une réunion de plus.',
    plans: [
      { price: '0 $', unit: 'gratuit', items: ['Un agenda', 'Suggestions chaque semaine', 'Garder, raccourcir, décliner'], cta: 'Commencer gratuitement' },
      { name: 'Équipe', price: '6 $', unit: 'par personne et par mois', items: ['Tout Solo', 'Réservation du temps de concentration', 'Réponses rédigées pour vous', 'Totaux d’équipe, sans détails personnels'], cta: 'Essayer en équipe' },
      { name: 'Entreprise', price: 'Parlons-en', unit: 'sur demande', items: ['Tout Équipe', 'Règles de réunion communes', 'Accompagnement'], cta: 'Nous contacter' },
    ],
  },
  closing: { title: 'Votre agenda peut être plus calme dès vendredi.', cta: 'Commencer gratuitement' },
  footer: { tagline: 'Hush est un produit fictif. Aucun agenda n’est connecté et rien n’est vendu.' },
};

const de: DeepPartial<SiteConfig> = {
  nav: { links: [{ label: 'Der Agent' }, { label: 'Funktionen' }, { label: 'Ablauf' }, { label: 'Datenschutz' }, { label: 'Preise' }], cta: 'Gratis testen' },
  hero: {
    kicker: 'Kalenderassistent für Teams',
    title: ['Weg mit unnötigen', 'Meetings.'],
    strike: 'Meetings',
    body: 'Hush liest deinen Kalender, findet unnötige Meetings und schreibt die höfliche Absage. Du entscheidest und bekommst deine Stunden zurück.',
    primary: 'Kostenlos starten',
    secondary: 'Den Agenten kennenlernen',
    worksWith: 'Verbindet sich mit',
    screen: screen('app', 'de', 'Die Hush-App: ein Wochenkalender mit Fokuszeit, daneben drei Vorschläge, Meetings zu kürzen oder abzusagen.'),
  },
  apps: [{ name: 'Kalender' }, { name: 'E-Mail' }, { name: 'Videocalls' }, { name: 'Team-Chat' }],
  companies: { label: 'Teams, die ruhige Wochen lieben, vertrauen uns' },
  agent: {
    eyebrow: 'Hush, dein Agent',
    image: { alt: 'Hush, der Agent: Kopfhörer auf, Augen geschlossen.' },
    title: ['Du sagst Ja.', 'Hush erledigt den Rest.'],
    tasks: [
      { title: 'Liest deine Woche', detail: '9 Meetings am Montagmorgen geprüft' },
      { title: 'Schreibt die höfliche Absage', detail: 'Deine Antwort an Noah ist bereit' },
      { title: 'Bucht deine Fokuszeit', detail: 'Mittwoch, 14:00 bis 16:00' },
      { title: 'Wartet auf dein Ja', detail: 'Ohne das geht nichts raus' },
    ],
  },
  features: {
    eyebrow: 'Dein Gewinn',
    title: 'Drei Sorgen weniger.',
    items: [
      {
        title: 'Wissen, welche Meetings du lassen kannst',
        body: 'Vor Wochenbeginn prüft Hush jede Einladung auf Zeichen, dass du nicht gebraucht wirst, und sagt dir warum.',
        points: ['Optionale Einladung, dieselben Leute wie in einem anderen Meeting', 'Echte Arbeitstermine bleiben unangetastet'],
        image: screen('skip', 'de', 'Eine Einladung mit 14 Gästen, bei der du optional bist: Hush sagt, du kannst sie auslassen und 1 Std. 30 gewinnen.'),
      },
      {
        title: 'Nein sagen ohne peinliche E-Mail',
        body: 'Hush schreibt die Antwort für dich. Ton wählen, lesen, senden.',
        points: ['Nichts geht raus, bevor du auf Senden drückst', 'Herzlich, knapp oder locker'],
        image: screen('reply', 'de', 'Eine von Hush geschriebene höfliche E-Mail mit drei Tonlagen und Senden-Knopf.'),
      },
      {
        title: 'Echte Zeitblöcke zum Arbeiten',
        body: 'Freie Stunden werden als Fokuszeit in deinem Kalender gebucht, damit sie niemand wieder füllt.',
        points: ['Das Team sieht, dass du belegt bist', 'Weniger Arbeit am Abend'],
        image: screen('focus', 'de', 'Derselbe Tag vorher und nachher: aus vier Meetings werden zwei Meetings und drei Stunden Fokuszeit.'),
      },
    ],
  },
  steps: {
    eyebrow: 'So funktioniert es',
    title: 'Bis Mittwoch von voll zu ruhig.',
    items: [
      { time: 'Mo 08:00', title: 'Kalender verbinden', image: { alt: 'Kalender, E-Mail, Video und Chat laufen bei Hush zusammen.' } },
      { time: 'Mo 08:02', title: 'Mit einem Klick entscheiden', image: { alt: 'Ein Klick sagt ein Meeting ab; eines bleibt, ein drittes wird gekürzt.' } },
      { time: 'Mi 14:00', title: 'Die Ruhe genießen', image: { alt: 'Ein Tag mit einem großen Fokusblock, daneben Hush mit Kopfhörern.' } },
    ],
  },
  privacy: {
    eyebrow: 'Datenschutz',
    title: 'Dein Kalender bleibt deiner.',
    body: 'Das sieht sich Hush an, das tut es nie, und das sieht deine Führungskraft.',
    reads: { title: 'Hush sieht sich an', items: ['Titel der Meetings', 'Uhrzeit und Dauer', 'Gästeliste und Agenda'] },
    never: { title: 'Hush tut nie', items: ['Einem Meeting beitreten oder mitschneiden', 'Ohne dein Ja senden oder absagen', 'Deine Meetings der Chefetage zeigen'] },
    manager: { title: 'Deine Führungskraft sieht', image: screen('report', 'de', 'Designteam: 31 Stunden diesen Monat gewonnen. Keine Namen, keine Meetingtitel.'), consent: 'Nur wenn das Team zustimmt' },
  },
  feel: {
    eyebrow: 'Wie es sich anfühlt',
    title: 'So fühlt sich eine ruhigere Woche an.',
    moments: [
      { feeling: 'Konzentriert', text: 'Zwei ruhige Stunden am Mittwoch, und der Entwurf ist fertig.', photo: { alt: 'Eine Person arbeitet ruhig und konzentriert.' } },
      { feeling: 'Präsent', text: 'Mittagessen mit dem Team, und das Handy bleibt liegen.', photo: { alt: 'Kolleginnen und Kollegen beim entspannten Mittagessen.' } },
      { feeling: 'Leicht', text: 'Pünktlich zu Hause, und für heute Abend ist nichts offen.', photo: { alt: 'Eine Person verlässt die Arbeit im Abendlicht.' } },
    ],
  },
  quote: {
    text: 'Meine eigentliche Arbeit habe ich nach dem Abendessen erledigt. Jetzt am Mittwochnachmittag.',
    name: 'Nadia, Projektleiterin',
    company: 'Quillfox (fiktiv)',
  },
  pricing: {
    eyebrow: 'Preise',
    title: 'Günstiger als ein Meeting mehr.',
    plans: [
      { price: '0 $', unit: 'kostenlos', items: ['Ein Kalender', 'Wöchentliche Vorschläge', 'Behalten, kürzen, absagen'], cta: 'Kostenlos starten' },
      { price: '6 $', unit: 'pro Person und Monat', items: ['Alles aus Solo', 'Fokuszeit automatisch buchen', 'Antworten für dich geschrieben', 'Teamsummen ohne persönliche Details'], cta: 'Im Team testen' },
      { name: 'Unternehmen', price: 'Auf Anfrage', unit: 'individuell', items: ['Alles aus Team', 'Gemeinsame Meeting-Regeln', 'Begleitete Einführung'], cta: 'Kontakt aufnehmen' },
    ],
  },
  closing: { title: 'Dein Kalender kann schon bis Freitag ruhiger sein.', cta: 'Kostenlos starten' },
  footer: { tagline: 'Hush ist ein fiktives Produkt. Es wird kein Kalender verbunden und nichts verkauft.' },
};

const TRANSLATIONS: Record<Lang, DeepPartial<SiteConfig>> = { en: {}, fr, de };

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
