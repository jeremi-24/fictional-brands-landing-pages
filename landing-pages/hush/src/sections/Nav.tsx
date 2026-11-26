import { useEffect, useState } from 'react';
import type { SiteConfig, SiteImage } from '../content/site';
import { LANGS, type Lang } from '../content/i18n';
import { Icon } from '../components/Icon';

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
  // phone and tablet: everything lives behind the menu button
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 12);
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

  const links = config.links.map((l) => (
    <a key={l.href} href={l.href} onClick={close}>
      {l.label}
    </a>
  ));
  const cta = (
    <a href="#pricing" className="btn btn--ink" onClick={close}>
      {config.cta}
    </a>
  );
  const languages = (full: boolean) => (
    <div className="langs" role="group" aria-label="Language">
      {LANGS.map((l) => (
        <button
          key={l.code}
          type="button"
          lang={l.code}
          title={l.name}
          aria-pressed={l.code === lang}
          onClick={() => {
            onLang(l.code);
            close();
          }}
        >
          {full ? l.name : l.label}
        </button>
      ))}
    </div>
  );

  return (
    <header className={`nav ${stuck ? 'is-stuck' : ''} ${open ? 'is-open' : ''}`}>
      <a href="#top" className="logo" onClick={close}>
        <img {...logo} className="logo-mark" />
        {brand}
      </a>
      <nav className="nav__links" aria-label="Primary">
        {links}
      </nav>
      <div className="nav__end">
        {languages(false)}
        {cta}
      </div>
      <button type="button" className="nav__toggle" aria-expanded={open} aria-controls="menu" aria-label={config.menu} onClick={() => setOpen((o) => !o)}>
        <Icon name={open ? 'cross' : 'menu'} />
      </button>
      {open && (
        <div id="menu" className="nav__menu">
          <nav aria-label="Menu">{links}</nav>
          {languages(true)}
          {cta}
        </div>
      )}
    </header>
  );
}
