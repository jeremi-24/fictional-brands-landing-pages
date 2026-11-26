/*
 * Every word and image of the page, in English. Translations: i18n.ts.
 * To use your own pictures, replace the files in public/images or change the paths here.
 * Hush is fictional: so are the people, companies, prices and numbers.
 */

const img = (src: string, width: number, height: number, alt: string) => ({ src, width, height, alt });
const logo = (name: string) => img(`/images/logos/${name.toLowerCase()}.svg`, 160, 32, name);
const app = (name: string, file: string) => ({ name, icon: img(`/images/apps/${file}.svg`, 24, 24, '') });

export const site = {
  brand: 'Hush',
  /** next to the brand name; the browser tab icon is public/favicon.svg */
  logo: img('/images/brand/logo.svg', 32, 32, ''),
  nav: {
    links: [
      { label: 'Your agent', href: '#agent' },
      { label: 'Features', href: '#features' },
      { label: 'How it works', href: '#how' },
      { label: 'Privacy', href: '#privacy' },
      { label: 'Pricing', href: '#pricing' },
    ],
    cta: 'Try it free',
  },
  hero: {
    kicker: 'Calendar assistant for teams',
    title: ['Cancel the meetings', 'you don’t need.'],
    /** the word of the title that gets crossed out */
    strike: 'meetings',
    body: 'Hush reads your calendar, flags the useless meetings and writes the polite no. You decide, and you get your hours back.',
    primary: 'Start free',
    secondary: 'Meet your agent',
    worksWith: 'Works with your',
    /** the landscape behind the hero: a large file and a lighter one for small screens */
    background: { large: '/images/sky-2400.jpg', small: '/images/sky-1200.jpg' },
    screen: img('/images/screens/app-en.webp', 1920, 1120, 'The Hush app: a week calendar with focus time, next to three suggestions to shorten or skip meetings.'),
  },
  /** the apps Hush plugs into: keep this in step with the privacy section */
  apps: [app('Calendar', 'calendar'), app('Mail', 'mail')],
  companies: {
    label: 'Trusted by teams that love a quiet week',
    logos: [logo('Quillfox'), logo('Marrowbay'), logo('Tandemoor'), logo('Pebblux'), logo('Vellumo')],
  },
  agent: {
    eyebrow: 'Hush, your agent',
    image: img('/images/brand/agent.svg', 448, 448, 'Hush, the agent: headphones on, eyes closed.'),
    background: img('/images/sky-1200.jpg', 1200, 700, ''),
    title: ['You say yes.', 'Hush does the work.'],
    /** shown around the agent, in this order */
    tasks: [
      { title: 'Reads your week', detail: '9 meetings checked on Monday morning' },
      { title: 'Writes the polite no', detail: 'Your reply to Noah is ready' },
      { title: 'Books your focus time', detail: 'Wednesday, 14:00 to 16:00' },
      { title: 'Waits for your yes', detail: 'Nothing is sent without it' },
    ],
  },
  features: {
    eyebrow: 'What you get',
    title: 'Three headaches Hush takes away.',
    items: [
      {
        title: 'Know which meetings to skip',
        body: 'Before the week starts, Hush checks each invitation for signs that you are not needed, and tells you why.',
        points: ['Optional invite, same people as another meeting', 'Real work sessions are left alone'],
        image: img('/images/screens/skip-en.webp', 1024, 864, 'An invitation with 14 guests where you are optional: Hush says you can skip it and win back 1 h 30.'),
      },
      {
        title: 'Say no without the awkward email',
        body: 'Hush writes the reply for you. Pick a tone, read it, send it.',
        points: ['Nothing leaves until you press send', 'Warm, short or playful'],
        image: img('/images/screens/reply-en.webp', 1024, 864, 'A polite email already written by Hush, with three tones and a send button.'),
      },
      {
        title: 'Get real blocks of time to work',
        body: 'The hours you free are booked in your calendar as focus time, so nobody fills them again.',
        points: ['Colleagues see that you are busy', 'Less work pushed to the evening'],
        image: img('/images/screens/focus-en.webp', 1024, 864, 'The same day before and after: four meetings become two meetings and three hours of focus time.'),
      },
    ],
  },
  steps: {
    eyebrow: 'How it works',
    title: 'From busy to quiet by Wednesday.',
    items: [
      { time: 'Mon 08:00', title: 'Connect your calendar', image: img('/images/steps/connect.svg', 400, 320, 'Your calendar and your mail connected to Hush.') },
      { time: 'Mon 08:02', title: 'Decide in one click', image: img('/images/steps/decide.svg', 400, 320, 'One click declines a meeting; another is kept and a third shortened.') },
      { time: 'Wed 14:00', title: 'Enjoy the quiet', image: img('/images/steps/quiet.svg', 400, 320, 'A day with a large block of focus time, next to Hush wearing headphones.') },
    ],
  },
  privacy: {
    eyebrow: 'Privacy',
    title: 'Your calendar stays yours.',
    body: 'Here is what Hush looks at, what it never does, and what your manager gets to see.',
    reads: { title: 'Hush looks at', items: ['Meeting titles', 'Times and length', 'Guest list and agenda'] },
    never: { title: 'Hush never', items: ['Joins or records a meeting', 'Reads your messages', 'Sends or declines without your yes', 'Shows your meetings to your boss'] },
    manager: {
      title: 'Your manager sees',
      image: img('/images/screens/report-en.webp', 800, 600, 'Design team: 31 hours won back this month. No names, no meeting titles.'),
      consent: 'Only if the team agrees',
    },
  },
  feel: {
    eyebrow: 'How it feels',
    title: 'What a quieter week feels like.',
    moments: [
      {
        feeling: 'Focused',
        text: 'Two quiet hours on Wednesday, and the draft is done.',
        photo: img('/images/photos/focus.webp', 720, 360, 'A woman with headphones writing in a notebook, calm and focused.'),
      },
      {
        feeling: 'Present',
        text: 'Lunch with the team, phone left alone.',
        photo: img('/images/photos/lunch.webp', 720, 360, 'Three colleagues laughing over an unhurried lunch.'),
      },
      {
        feeling: 'Light',
        text: 'Home on time, with nothing left for tonight.',
        photo: img('/images/photos/evening.webp', 760, 380, 'A smiling man walking out of the office in the early evening.'),
      },
    ],
  },
  quote: {
    text: 'I used to do my real work after dinner. Now I do it on Wednesday afternoon.',
    name: 'Nadia, project lead',
    company: 'Quillfox (fictional)',
  },
  pricing: {
    eyebrow: 'Pricing',
    title: 'Cheaper than one more meeting.',
    plans: [
      { name: 'Solo', price: '$0', unit: 'free', items: ['One calendar', 'Weekly suggestions', 'Keep, shorten, skip'], cta: 'Start free', featured: false },
      { name: 'Team', price: '$6', unit: 'per person, per month', items: ['Everything in Solo', 'Focus time booking', 'Replies written for you', 'Team totals, no personal details'], cta: 'Try with your team', featured: true },
      { name: 'Company', price: 'Let’s talk', unit: 'on request', items: ['Everything in Team', 'Shared meeting rules', 'Guided rollout'], cta: 'Contact us', featured: false },
    ],
  },
  closing: {
    title: 'Your calendar can be quieter by Friday.',
    cta: 'Start free',
    image: img('/images/brand/agent.svg', 448, 448, ''),
  },
  footer: {
    tagline: 'Hush is a fictional product. No calendar is connected and nothing is sold.',
    credit: [
      { label: 'Made by jeremi-24', href: 'https://github.com/jeremi-24' },
      { label: 'Source', href: 'https://github.com/jeremi-24/fictional-brands-landing-pages/tree/main/landing-pages/hush' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/j%C3%A9r%C3%A9mie-ekou%C3%A9-a95873308/' },
      { label: 'GitHub', href: 'https://github.com/jeremi-24' },
    ],
  },
};

export type SiteConfig = typeof site;
export type SiteImage = ReturnType<typeof img>;
