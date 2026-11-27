import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { drift, FLOOR } from '../src/components/drift.ts';
import { LANGS, localize } from '../src/content/i18n.ts';
import { site } from '../src/content/site.ts';

// the halos of the opening: never faster than one step, never outside their area (so never over the title)
const lamp = { x: 0.5, y: 0.8, heading: 1 };
for (let i = 0; i < 20000; i++) {
  const { x, y } = lamp;
  drift(lamp, 0.02, 0.03, 0.45, Math.sin(i) * 0.3);
  const steps = Math.hypot((lamp.x - x) / 0.02, (lamp.y - y) / 0.03);
  assert.ok(steps <= 1.000001, `halo step ${i}: ${steps}`);
  assert.ok(lamp.x >= 0 && lamp.x <= 1 && lamp.y >= 0.45 && lamp.y <= FLOOR, `halo left its area at step ${i}`);
}
const free = { x: 0.5, y: 0.7, heading: 0.4 };
drift(free, 0.02, 0.03, 0, 0);
assert.ok(Math.abs(Math.hypot((free.x - 0.5) / 0.02, (free.y - 0.7) / 0.03) - 1) < 1e-9, 'away from the edges a step is exactly one step');

const inPublic = (src: string) => existsSync(new URL(`../public${src}`, import.meta.url));

// the lock file must install anywhere: a package pointing outside the project (a shared node_modules) breaks the deployment
const lock: { packages: Record<string, { link?: boolean }> } = JSON.parse(readFileSync(new URL('../package-lock.json', import.meta.url), 'utf8'));
for (const [name, entry] of Object.entries(lock.packages)) assert.ok(!entry.link && !name.startsWith('..'), `package-lock.json: ${name} points outside the project`);

// every file index.html links to from the site root exists (tab and home screen icons)
for (const [, src] of readFileSync(new URL('../index.html', import.meta.url), 'utf8').matchAll(/<link [^>]*href="(\/[^"]+)"/g)) assert.ok(inPublic(src), `index.html: missing ${src}`);

// every picture and model the page asks for, in every language, is a file in public/
const files = (value: unknown): string[] =>
  typeof value === 'string' ? (/^\/(images|models)\//.test(value) ? [value] : []) : value && typeof value === 'object' ? Object.values(value).flatMap(files) : [];
for (const { code } of LANGS) {
  const found = files(localize(site, code));
  assert.ok(found.length >= 20, `${code}: pictures are listed`);
  for (const src of found) assert.ok(inPublic(src), `${code}: missing ${src}`);
}

// translations are matched by position: the phone picture is the one that changes with the language
for (const { code } of LANGS) assert.ok(localize(site, code).walk.phone.src.endsWith(`walk-${code}.webp`), `${code}: phone picture`);

// the opening is drawn for exactly five pictures (sections.css places them one by one), in every language
for (const { code } of LANGS) {
  const { hero, benefits } = localize(site, code);
  assert.equal(hero.photos.length, 5, `${code}: opening pictures`);
  assert.equal(new Set(hero.photos.map((p) => p.alt)).size, 5, `${code}: each opening picture has its own description`);
  assert.equal(benefits.progress.rings.length, 3, `${code}: one line per ring`);
}

// the checkout's closing line keeps its three blanks in every language, and offers the same ways to pay
for (const { code } of LANGS) {
  const { checkout } = localize(site, code);
  for (const blank of ['{colour}', '{size}', '{method}']) assert.ok(checkout.summary.includes(blank), `${code}: checkout.summary lacks ${blank}`);
  assert.equal(checkout.methods.length, site.checkout.methods.length, `${code}: ways to pay`);
}

// a template: pictures are named in content/ only, never inside a section or a stylesheet
for (const dir of ['sections', 'styles', 'components']) {
  const folder = new URL(`../src/${dir}/`, import.meta.url);
  for (const file of readdirSync(folder)) {
    const code = readFileSync(new URL(file, folder), 'utf8');
    assert.ok(!/\/images\/|<svg/.test(code) || file === 'Icon.tsx', `src/${dir}/${file}: move the picture to public/images and name it in site.ts`);
  }
}

// the design system: colours are written in tokens.css only, and pictures are never CSS backgrounds
const styles = new URL('../src/styles/', import.meta.url);
for (const file of readdirSync(styles)) {
  const css = readFileSync(new URL(file, styles), 'utf8');
  assert.ok(!/url\(/.test(css), `src/styles/${file}: use an <img>, not a CSS picture`);
  if (file === 'tokens.css') continue;
  const found = css.match(/#[0-9a-f]{3,8}\b|rgba?\(\s*\d/gi);
  assert.equal(found, null, `src/styles/${file}: use a token from tokens.css instead of ${found?.join(', ')}`);
}
console.log('kaya: ok');
