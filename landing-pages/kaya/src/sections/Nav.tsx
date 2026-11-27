import { useEffect, useState } from 'react';
import type { SiteConfig } from '../content/site';
import type { Lang } from '../content/i18n';
import { Icon } from '../components/Icon';
import { Languages } from '../components/Languages';

interface Props {
  logo: SiteConfig['logo'];
  config: SiteConfig['nav'];
  lang: Lang;
  onLang: (lang: Lang) => void;
}

/**
 * A full-width bar with the wordmark in the middle. It leaves while the page is
 * read downwards and comes back, solid, as soon as the visitor scrolls up.
 */
export function Nav({ logo, config, lang, onLang }: Props) {
  const [solid, setSolid] = useState(false);
  const [away, setAway] = useState(false);
  // phone and tablet: everything lives in a full-screen menu
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setSolid(y > 40);
      if (Math.abs(y - last) < 4) return;
      setAway(y > 240 && y > last);
      last = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const link = (l: { label: string; href: string }) => (
    <a key={l.href} href={l.href} onClick={close}>
      {l.label}
    </a>
  );
  const cta = (className: string) => (
    <a href="#colours" className={className} onClick={close}>
      <Icon name="bag" />
      {config.cta}
    </a>
  );

  return (
    <header className={`nav ${solid ? 'is-solid' : ''} ${away && !open ? 'is-away' : ''} ${open ? 'is-open' : ''}`}>
      <div className="nav__side">
        <nav aria-label="Primary">{config.links.slice(0, 2).map(link)}</nav>
        <Languages lang={lang} onLang={onLang} />
      </div>
      <a href="#top" className="nav__logo" onClick={close}>
        <img {...logo.light} className="nav__logo-light" />
        <img {...logo.dark} className="nav__logo-dark" />
      </a>
      <div className="nav__side nav__side--end">
        <nav aria-label="Secondary">{config.links.slice(2).map(link)}</nav>
        {cta('btn btn--small')}
      </div>
      <button type="button" className="nav__toggle" aria-expanded={open} aria-controls="menu" onClick={() => setOpen((o) => !o)}>
        <Icon name={open ? 'cross' : 'menu'} />
        {open ? config.close : config.menu}
      </button>
      {open && (
        <div id="menu" className="nav__menu">
          <nav aria-label="Menu">{config.links.map(link)}</nav>
          <Languages
            full
            lang={lang}
            onLang={(next) => {
              onLang(next);
              close();
            }}
          />
          {cta('btn btn--light')}
        </div>
      )}
    </header>
  );
}
