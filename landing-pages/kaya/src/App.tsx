import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { site } from './content/site';
import { initialLang, localize, type Lang } from './content/i18n';
import { Lightbox } from './components/Lightbox';
import { Nav } from './sections/Nav';
import { Hero } from './sections/Hero';
import { Colours } from './sections/Colours';
import { Benefits } from './sections/Benefits';
import { Dial } from './sections/Dial';
import { Walk } from './sections/Walk';
import { Story } from './sections/Story';
import { Tech } from './sections/Tech';
import { Closing } from './sections/Closing';
import { Footer } from './sections/Footer';
import { TINTS } from './three/sides';

/** Composes the page. Reorder, remove or duplicate sections here. */
export function App() {
  const [lang, setLang] = useState<Lang>(initialLang);
  const c = useMemo(() => localize(site, lang), [lang]);
  // the colour of the sandal, kept for the whole page
  const [colour, setColour] = useState(0);

  useLayoutEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    try {
      localStorage.setItem('lang', lang);
    } catch {
      // storage blocked: the choice just won't be remembered
    }
  }, [lang]);

  // [data-reveal] elements appear the first time they are seen; React never touches data-in
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          (e.target as HTMLElement).dataset.in = '';
          io.unobserve(e.target);
        }
      },
      { threshold: 0.12 },
    );
    document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div id="top">
      <Nav logo={c.logo} config={c.nav} lang={lang} onLang={setLang} />
      <main>
        <Hero config={c.hero} />
        <Colours config={c.colours} checkout={c.checkout} model={c.model} picked={colour} onPick={setColour} />
        <Benefits config={c.benefits} />
        <Dial config={c.dial} />
        <Walk config={c.walk} />
        <Story config={c.story} />
        <Tech config={c.tech} model={c.model} tint={TINTS[colour]} />
        <Closing config={c.closing} pair={c.colours.items[colour].image} doodles={c.doodles} />
      </main>
      <Footer logo={c.logo.light} links={c.nav.links} config={c.footer} doodles={c.doodles} lang={lang} onLang={setLang} />
      <Lightbox close={c.lightbox.close} />
      <Analytics />
    </div>
  );
}
