import { useEffect, useState } from 'react';
import type { SiteConfig, SiteImage } from '../content/site';
import { LANGS, type Lang } from '../content/i18n';

interface Props {
  brand: string;
  logo: SiteImage;
  config: SiteConfig['nav'];
  lang: Lang;
  onLang: (lang: Lang) => void;
}

export function Nav({ brand, logo, config, lang, onLang }: Props) {
  // at the top the bar is part of the hero; once the page moves it becomes a floating pill
  const [stuck, setStuck] = useState(false);
  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`nav ${stuck ? 'is-stuck' : ''}`}>
      <a href="#top" className="logo">
        <img {...logo} className="logo-mark" />
        {brand}
      </a>
      <nav className="nav__links" aria-label="Primary">
        {config.links.map((l) => (
          <a key={l.href} href={l.href}>
            {l.label}
          </a>
        ))}
      </nav>
      <div className="nav__end">
        <div className="langs" role="group" aria-label="Language">
          {LANGS.map((l) => (
            <button key={l.code} type="button" lang={l.code} title={l.name} aria-pressed={l.code === lang} onClick={() => onLang(l.code)}>
              {l.label}
            </button>
          ))}
        </div>
        <a href="#pricing" className="btn btn--ink nav__cta">
          {config.cta}
        </a>
      </div>
    </header>
  );
}
