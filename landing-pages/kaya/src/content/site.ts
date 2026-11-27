/*
 * Every word and picture of the page, in English. Translations: i18n.ts.
 * To use your own pictures, replace the files in public/images or change the paths here.
 * Kaya is fictional: so are the product, the people, the numbers and everything the sandal does.
 */

const img = (src: string, width: number, height: number, alt: string) => ({ src, width, height, alt });
const photo = (name: string, width: number, height: number, alt: string) => img(`/images/photos/${name}.webp`, width, height, alt);
const art = (name: string, width: number, height: number, alt: string) => img(`/images/art/${name}.webp`, width, height, alt);
const chart = (name: string, height = 80) => img(`/images/charts/${name}.svg`, 320, height, '');
const wordmark = (name: string) => img(`/images/brand/${name}.svg`, 326, 100, 'Kaya');
/** a small drawing on a transparent ground, for decoration only */
const doodle = (name: string) => img(`/images/doodles/${name}.png`, 560, 440, '');

// the maker's profiles
const LINKEDIN = 'https://www.linkedin.com/in/j%C3%A9r%C3%A9mie-ekou%C3%A9-a95873308/';
const GITHUB = 'https://github.com/jeremi-24';

// shown twice: in the opening and further down
const mum = photo('maman', 640, 1147, 'A woman in a cocoa gown and terracotta headwrap rests on a rattan daybed.');
const atEase = photo('decontracte', 640, 1147, 'A young man in a terracotta shirt relaxes on a woven mat on a rooftop.');

export const site = {
  brand: 'Kaya',
  /** the wordmark for light and for dark grounds; the tab icon is public/favicon.svg */
  logo: { dark: wordmark('logo'), light: wordmark('logo-light') },
  /** the 3D file used by the two live scenes; see src/three/model.ts for what it must look like */
  model: '/models/kaya.glb',
  /** drawings: a row in the footer, scattered faintly behind the last band */
  doodles: ['sandal', 'steps', 'ball', 'sun', 'bag', 'rain', 'phone'].map(doodle),
  nav: {
    /** the first two sit left of the wordmark, the others right of it */
    links: [
      { label: 'Benefits', href: '#benefits' },
      { label: 'Your walk', href: '#walk' },
      { label: 'The story', href: '#story' },
      { label: 'Technology', href: '#tech' },
    ],
    cta: 'Choose my pair',
    /** the two states of the menu button on phones and tablets */
    menu: 'Menu',
    close: 'Close',
  },
  /** the large preview opened by clicking a picture */
  lightbox: { close: 'Close preview' },
  hero: {
    title: ['Walk in style,', 'walk well.'],
    /** five pictures, left to right: the middle one is the large one */
    photos: [
      mum,
      photo('street', 640, 1147, 'Two friends in relaxed clothes in a lively old street at dusk, one crouching, one jumping.'),
      photo('hero', 896, 1200, 'A woman in a flowing terracotta outfit strides past clay arches, wearing ivory Kaya sandals.'),
      photo('boss', 640, 1147, 'A woman in a cream suit sits on terracotta steps and looks straight at the camera.'),
      atEase,
    ],
  },
  colours: {
    title: 'Choose your colour.',
    legend: 'Colour',
    /** read to screen readers on the 3D view */
    turn: 'The sandal in 3D: drag it, or use the left and right arrow keys, to turn it.',
    /** the still picture of the 3D view, in the first colour */
    poster: art('hero', 1320, 840, 'The Kaya sandal: an ivory openwork upper, a cork footbed and a metal dial on the ankle strap.'),
    items: [
      { name: 'Ivory', image: art('pair-ivory', 1200, 640, 'A pair of Kaya sandals in ivory.') },
      { name: 'Terracotta', image: art('pair-terracotta', 1200, 640, 'A pair of Kaya sandals in terracotta.') },
      { name: 'Cocoa', image: art('pair-cocoa', 1200, 640, 'A pair of Kaya sandals in cocoa brown.') },
      { name: 'Night', image: art('pair-night', 1200, 640, 'A pair of Kaya sandals in black.') },
    ],
    cta: 'Choose my pair',
  },
  /** the window opened by that button. Pretend: nothing is paid, sent or stored */
  checkout: {
    title: 'Your pair',
    size: 'Size (EU)',
    sizes: ['36', '37', '38', '39', '40', '41', '42', '43', '44', '45'],
    payment: 'Payment',
    methods: ['Mobile money', 'Card', 'On delivery'],
    colour: 'Colour',
    delivery: 'Delivery',
    free: 'Free',
    total: 'Total',
    /** an invented price */
    price: 'CFA 39,000',
    confirm: 'Place my order',
    notice: 'Fictional concept: nothing is paid, ordered or stored.',
    done: 'Order noted.',
    /** {colour}, {size} and {method} are replaced by the choices made */
    summary: '{colour}, size {size}. Payment: {method}.',
    after: 'Kaya is a fictional concept: nothing will be delivered or charged.',
    close: 'Close',
  },
  benefits: {
    style: {
      title: 'A line that dresses you.',
      text: 'Suit, boubou or shorts: it finishes the outfit.',
      image: art('pair', 1200, 640, 'A pair of ivory Kaya sandals.'),
      photo: photo('papa', 640, 1147, 'A father in a cream linen suit carries his child on his shoulders in a clay courtyard.'),
    },
    comfort: {
      title: 'It takes the shape of your foot.',
      text: 'Cork holds you up, foam follows you.',
      image: art('bed', 900, 600, 'The cork footbed over its foam layer, with the soft print of a foot.'),
      photo: mum,
    },
    progress: {
      title: 'Your progress, in the Kaya app.',
      text: 'Three rings each day: your steps, your distance and your minutes of walking.',
      note: 'Today · example',
      image: img('/images/charts/rings.svg', 290, 290, 'Three rings filling up: steps, distance and minutes walked today.'),
      /** outer ring first; the rings are drawn in the picture */
      rings: [
        { value: '6,240', goal: '/ 8,000 steps' },
        { value: '4.2', goal: '/ 5 km' },
        { value: '52', goal: '/ 60 min' },
      ],
    },
    rain: { title: 'Rain no longer ruins the day.', text: 'Rinse it, and you look sharp again.', image: chart('rain', 200) },
  },
  dial: {
    kicker: 'Snug at dawn, free at dusk.',
    title: ['One turn.', 'Done.'],
    text: 'Feet swelling in the afternoon? One notch looser, and you still look sharp.',
    image: art('dial-wide', 1200, 900, 'The dial and straps of the Kaya sandal, seen up close.'),
    photo: atEase,
    moves: [
      { icon: 'turn' as const, title: 'Turn', text: 'More hold for long walks.' },
      { icon: 'press' as const, title: 'Press', text: 'It releases, with no buckle to fight.' },
    ],
  },
  walk: {
    title: ['The Kaya app', 'traces your steps.'],
    text: 'The sandal counts your steps and sends them to the app. Your route appears on the map, to share with your physiotherapist whenever you wish.',
    note: 'Example values. Fictional concept, no medical promise.',
    /** the phone picture contains text, so there is one per language */
    phone: art('walk-en', 640, 1180, 'The Kaya app: 6,240 steps today, the route drawn on a map with footprints, and a button to share with a physiotherapist.'),
    stats: [
      { value: '4.2 km', label: 'covered today', image: chart('line') },
      { value: '+18%', label: 'steadier steps', image: chart('bars') },
      { value: '6 days', label: 'in a row, well done', image: chart('wave') },
    ],
  },
  story: {
    eyebrow: 'The story',
    title: 'The sandal of our childhood has grown up.',
    body: 'We wore it to school, jumped in puddles with it and scored goals between two stones. Then we grew up and left it behind the door. Here it is again: the same shape, for today’s steps.',
    photos: [
      photo('ecole', 720, 1073, 'Three laughing schoolchildren leave a brick school gate in their sandals.'),
      photo('foot', 720, 1073, 'A foot in a sandal rests on a leather ball while friends play on a clay court.'),
    ],
  },
  tech: {
    eyebrow: 'For the curious',
    title: 'What lies under your foot.',
    poster: art('layers', 1400, 1240, 'Exploded view of the sandal: upper, cork, foam, sensors, membrane, battery and outsole.'),
    /** from top to bottom, matching the 3D scene */
    layers: [
      { title: 'Openwork upper', text: 'lets air and water through' },
      { title: 'Cork', text: 'supports the arch' },
      { title: 'Warm foam', text: 'takes the shape of the foot' },
      { title: 'Sensors', text: 'five pressure points' },
      { title: 'Membrane', text: 'keeps the electronics dry' },
      { title: 'Bluetooth battery', text: 'tucked in the heel' },
      { title: 'Outsole', text: 'grips the ground' },
    ],
    nfc: 'In the heel, an NFC chip links the sandal to a phone with a single touch.',
  },
  closing: { title: 'Find your look.', cta: 'Choose my colour' },
  footer: {
    tagline: 'A fictional brand and product.',
    contact: { label: 'Contact me', href: LINKEDIN },
    socials: [
      { icon: 'linkedin' as const, label: 'LinkedIn', href: LINKEDIN },
      { icon: 'github' as const, label: 'GitHub', href: GITHUB },
      { icon: 'code' as const, label: 'Source code', href: 'https://github.com/jeremi-24/fictional-brands-landing-pages/tree/main/landing-pages/kaya' },
    ],
    credit: [{ label: 'Made by jeremi-24', href: GITHUB }],
  },
};

export type SiteConfig = typeof site;
export type SiteImage = SiteConfig['dial']['photo'];
