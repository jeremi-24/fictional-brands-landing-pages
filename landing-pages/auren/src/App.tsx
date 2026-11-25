import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import type { SiteConfig, Theme } from './content/types';
import { initialLang, localize, type Lang } from './content/i18n';
import { usePageMotion } from './hooks/usePageMotion';
import { Nav } from './sections/Nav';
import { Hero } from './sections/Hero';
import { Aura } from './sections/Aura';
import { Benefits } from './sections/Benefits';
import { AuraCursor } from './components/AuraCursor';
import { Showcase } from './sections/Showcase';
import { Purchase } from './sections/Purchase';
import { Footer } from './sections/Footer';

const themeVars = (t: Theme): Record<string, string> => ({
    '--ink': t.ink,
    '--ink-soft': t.inkSoft,
    '--wine': t.wine,
    '--rose': t.rose,
    '--blush': t.blush,
    '--paper': t.paper,
    '--metal': t.metal,
    '--light': t.light,
    '--dark': t.dark,
    '--font-display': t.fontDisplay,
    '--font-body': t.fontBody,
    '--font-mono': t.fontMono,
  });

/** Composes the page. Reorder, remove or duplicate sections here. */
export function App({ site }: { site: SiteConfig }) {
  const [lang, setLang] = useState<Lang>(initialLang);
  const config = useMemo(() => localize(site, lang), [site, lang]);
  const [bag, setBag] = useState(0);
  const addToBag = useCallback((qty: number) => setBag((n) => n + qty), []);
  usePageMotion();

  // tokens live on <html> so body, fixed layers and overscroll all share them
  useLayoutEffect(() => {
    const root = document.documentElement.style;
    for (const [k, v] of Object.entries(themeVars(config.brand.theme))) root.setProperty(k, v);
  }, [config.brand.theme]);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem('lang', lang);
    } catch {
      // storage blocked: the choice just won't be remembered
    }
  }, [lang]);

  return (
    <div className="page" id="top">
      <Nav brand={config.brand.name} config={config.nav} bagCount={bag} lang={lang} onLang={setLang} />
      <main>
        <Hero config={config.hero} />
        <Aura config={config.aura} />
        <Showcase brand={config.brand.name} theme={config.brand.theme} config={config.showcase} />
        <Benefits config={config.benefits} />
        <Purchase config={config.purchase} onAdd={addToBag} />
      </main>
      <Footer brand={config.brand} config={config.footer} />
      <AuraCursor />
    </div>
  );
}
