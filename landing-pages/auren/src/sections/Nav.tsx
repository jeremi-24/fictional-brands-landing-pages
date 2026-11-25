import { useEffect, useState } from 'react';
import type { NavConfig } from '../content/types';
import { LANGS, type Lang } from '../content/i18n';
import './Nav.css';

interface Props {
  brand: string;
  config: NavConfig;
  bagCount: number;
  lang: Lang;
  onLang: (lang: Lang) => void;
}

export function Nav({ brand, config, bagCount, lang, onLang }: Props) {
  const [open, setOpen] = useState(false);
  const [bump, setBump] = useState(false);

  useEffect(() => {
    if (!bagCount) return;
    setBump(true);
    const t = setTimeout(() => setBump(false), 700);
    return () => clearTimeout(t);
  }, [bagCount]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <header className="nav">
        <nav className="nav__links" aria-label="Primary">
          {config.links.map((l) => (
            <a key={l.href} href={l.href} className="nav__link">
              {l.label}
            </a>
          ))}
        </nav>
        <a href="#top" className="nav__brand" aria-label={`${brand}, back to top`}>
          {brand}
        </a>
        <div className="nav__end">
          <div className="nav__langs" role="group" aria-label="Language">
            {LANGS.map((l) => (
              <button
                key={l.code}
                type="button"
                className="nav__lang"
                lang={l.code}
                aria-pressed={l.code === lang}
                title={l.name}
                onClick={() => onLang(l.code)}
              >
                {l.label}
              </button>
            ))}
          </div>
          <a href={config.cta.href} className="nav__link nav__cta">
            {config.cta.label}
          </a>
          <span className={`nav__bag ${bump ? 'is-bump' : ''}`} aria-live="polite">
            {config.bagLabel} ({bagCount})
          </span>
          <button
            className={`nav__toggle ${open ? 'is-open' : ''}`}
            aria-expanded={open}
            aria-controls="nav-sheet"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="sr-only">{config.menuLabel}</span>
            <i />
            <i />
          </button>
        </div>
      </header>

      <div id="nav-sheet" className={`nav-sheet ${open ? 'is-open' : ''}`} inert={!open}>
        <ol>
          {[...config.links, config.cta].map((l, i) => (
            <li key={l.href} style={{ transitionDelay: `${open ? 200 + i * 60 : 0}ms` }}>
              <a href={l.href} onClick={() => setOpen(false)}>
                <span className="mono">0{i + 1}</span>
                {l.label}
              </a>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
