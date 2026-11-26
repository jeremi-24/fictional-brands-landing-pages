/* Words drawn inside the screen images. Only used to redraw them, never shipped with the page. */
const en = {
  week: 'My week',
  range: '23 to 27 November',
  won: '3 h won back',
  days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  focus: 'Focus',
  events: ['Weekly sync', 'Client demo', '1:1 with Sam', 'Project status', 'Brainstorm', 'Sprint planning', 'Daily, again', 'Retro'],
  found: '3 suggestions for you',
  tips: [
    ['Weekly sync', 'Always ends at half time', 'Shorten'],
    ['Project status', 'You are optional', 'Skip'],
    ['Daily, again', 'Fifth one this week', 'Skip'],
  ],
  keep: 'Keep',
  all: 'Accept all',
  skip: {
    name: 'Project status',
    when: 'Wednesday, 10:00 to 11:30',
    facts: ['14 guests', 'You are marked optional', 'Same people as Monday’s update'],
    verdict: 'You can skip this one',
    saves: 'It gives you back 1 h 30',
    buttons: ['Skip', 'Keep'],
  },
  reply: {
    subject: 'Re: Project status on Wednesday',
    to: 'To: Noah',
    body: ['Hi Noah,', 'I will skip Wednesday so I can finish the draft. Monday’s update covers my part. Send me the notes and I will answer the same day.', 'Thank you!'],
    by: 'Drafted by Hush',
    tones: ['Warm', 'Short', 'Playful'],
    send: 'Send',
  },
  day: { before: 'Before', after: 'After', meetings: ['Status update', 'Project status', 'Client demo', 'Weekly sync'], block: 'Focus time, 3 h' },
  report: { team: 'Design team', value: '31 h', label: 'won back this month', hidden: 'No names. No meeting titles.' },
};

type Text = typeof en;

const fr: Text = {
  week: 'Ma semaine',
  range: 'Du 23 au 27 novembre',
  won: '3 h gagnées',
  days: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven'],
  focus: 'Concentration',
  events: ['Point hebdo', 'Démo client', 'Point avec Sam', 'Suivi projet', 'Brainstorm', 'Sprint', 'Daily, encore', 'Rétro'],
  found: '3 suggestions pour vous',
  tips: [
    ['Point hebdo', 'Finit toujours à mi-temps', 'Raccourcir'],
    ['Suivi projet', 'Vous êtes facultatif', 'Décliner'],
    ['Daily, encore', 'Le cinquième de la semaine', 'Décliner'],
  ],
  keep: 'Garder',
  all: 'Tout accepter',
  skip: {
    name: 'Suivi projet',
    when: 'Mercredi, de 10:00 à 11:30',
    facts: ['14 invités', 'Vous êtes marqué facultatif', 'Les mêmes personnes que lundi'],
    verdict: 'Vous pouvez sauter celle-ci',
    saves: 'Vous récupérez 1 h 30',
    buttons: ['Décliner', 'Garder'],
  },
  reply: {
    subject: 'Re : Suivi projet de mercredi',
    to: 'À : Noah',
    body: ['Bonjour Noah,', 'Je passe mon tour mercredi pour finir le brouillon. Le point de lundi couvre ma partie. Envoie-moi les notes, je réponds le jour même.', 'Merci !'],
    by: 'Rédigé par Hush',
    tones: ['Chaleureux', 'Court', 'Léger'],
    send: 'Envoyer',
  },
  day: { before: 'Avant', after: 'Après', meetings: ['Point d’avancement', 'Suivi projet', 'Démo client', 'Point hebdo'], block: 'Concentration, 3 h' },
  report: { team: 'Équipe design', value: '31 h', label: 'gagnées ce mois-ci', hidden: 'Aucun nom. Aucun titre de réunion.' },
};

const de: Text = {
  week: 'Meine Woche',
  range: '23. bis 27. November',
  won: '3 Std. gewonnen',
  days: ['Mo', 'Di', 'Mi', 'Do', 'Fr'],
  focus: 'Fokus',
  events: ['Wochen-Sync', 'Kundendemo', '1:1 mit Sam', 'Projektstatus', 'Brainstorming', 'Sprint-Planung', 'Wieder Daily', 'Retro'],
  found: '3 Vorschläge für dich',
  tips: [
    ['Wochen-Sync', 'Endet immer nach der Hälfte', 'Kürzen'],
    ['Projektstatus', 'Du bist optional', 'Absagen'],
    ['Wieder Daily', 'Das fünfte diese Woche', 'Absagen'],
  ],
  keep: 'Behalten',
  all: 'Alle annehmen',
  skip: {
    name: 'Projektstatus',
    when: 'Mittwoch, 10:00 bis 11:30',
    facts: ['14 Gäste', 'Du bist als optional markiert', 'Dieselben Leute wie am Montag'],
    verdict: 'Dieses kannst du auslassen',
    saves: 'Du gewinnst 1 Std. 30',
    buttons: ['Absagen', 'Behalten'],
  },
  reply: {
    subject: 'Re: Projektstatus am Mittwoch',
    to: 'An: Noah',
    body: ['Hallo Noah,', 'ich setze am Mittwoch aus, um den Entwurf fertigzustellen. Mein Teil ist seit Montag besprochen. Schick mir die Notizen, ich antworte noch am selben Tag.', 'Danke!'],
    by: 'Entwurf von Hush',
    tones: ['Herzlich', 'Knapp', 'Locker'],
    send: 'Senden',
  },
  day: { before: 'Vorher', after: 'Nachher', meetings: ['Status-Update', 'Projektstatus', 'Kundendemo', 'Wochen-Sync'], block: 'Fokuszeit, 3 Std.' },
  report: { team: 'Designteam', value: '31 Std.', label: 'diesen Monat gewonnen', hidden: 'Keine Namen. Keine Meetingtitel.' },
};

export const TEXT = { en, fr, de };
export type ScreenLang = keyof typeof TEXT;
export type { Text };
