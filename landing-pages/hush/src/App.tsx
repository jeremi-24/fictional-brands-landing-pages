import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { site } from './content/site';
import { initialLang, localize, type Lang } from './content/i18n';
import { Nav } from './sections/Nav';
import { Hero } from './sections/Hero';
import { Companies } from './sections/Companies';
import { Work } from './sections/Work';
import { Feel } from './sections/Feel';
import { Features } from './sections/Features';
import { Steps } from './sections/Steps';
import { Privacy } from './sections/Privacy';
import { Quote } from './sections/Quote';
import { Pricing } from './sections/Pricing';
import { Closing } from './sections/Closing';
import { Footer } from './sections/Footer';
import { Lightbox } from './components/Lightbox';

/** Composes the page. Reorder, remove or duplicate sections here. */
export function App() {
  const [lang, setLang] = useState<Lang>(initialLang);
  const c = useMemo(() => localize(site, lang), [lang]);

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
      <Nav brand={c.brand} logo={c.logo} config={c.nav} lang={lang} onLang={setLang} />
      <main>
        <Hero config={c.hero} apps={c.apps} />
        <Companies config={c.companies} />
        <Work config={c.agent} />
        <Features config={c.features} />
        <Steps config={c.steps} />
        <Privacy config={c.privacy} />
        <Feel config={c.feel} />
        <Quote config={c.quote} />
        <Pricing config={c.pricing} />
        <Closing config={c.closing} />
      </main>
      <Footer brand={c.brand} config={c.footer} />
      <Lightbox close={c.lightbox.close} />
    </div>
  );
}
