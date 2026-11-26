import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { LANGS, localize } from '../src/content/i18n.ts';
import { site } from '../src/content/site.ts';

// every picture the page asks for, in every language, is a file in public/
const pictures = (value: unknown): string[] =>
  typeof value === 'string' ? (value.startsWith('/images/') ? [value] : []) : value && typeof value === 'object' ? Object.values(value).flatMap(pictures) : [];
for (const { code } of LANGS) {
  const found = pictures(localize(site, code));
  assert.ok(found.length >= 12, `${code}: pictures are listed`);
  for (const src of found) assert.ok(existsSync(new URL(`../public${src}`, import.meta.url)), `${code}: missing ${src}`);
}
// a template: pictures are named in content/ only, never inside a section or a stylesheet
for (const dir of ['sections', 'styles', 'components']) {
  const folder = new URL(`../src/${dir}/`, import.meta.url);
  for (const file of readdirSync(folder)) {
    const code = readFileSync(new URL(file, folder), 'utf8');
    assert.ok(!/\/images\/|<svg/.test(code) || file === 'Icon.tsx', `src/${dir}/${file}: move the picture to public/images and name it in site.ts`);
  }
}
console.log('hush: ok');
