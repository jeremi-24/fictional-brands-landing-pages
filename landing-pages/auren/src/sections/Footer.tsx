import { useState, type ReactNode } from 'react';
import type { Brand, FooterConfig, Link } from '../content/types';
import './Footer.css';

interface Props {
  brand: Brand;
  config: FooterConfig;
}

const ICONS: Record<NonNullable<Link['icon']>, ReactNode> = {
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </>
  ),
  pinterest: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M11 21l1.8-8M9.5 10.6c0-1.9 1.5-3.1 3.2-3.1 1.9 0 3.3 1.3 3.3 3.2 0 2.2-1.4 3.8-3.2 3.8-.9 0-1.6-.5-1.8-1.2" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3.5 6.5 12 13l8.5-6.5" />
    </>
  ),
};

export function Footer({ brand, config }: Props) {
  const [sent, setSent] = useState(false);

  return (
    <footer className="footer surface-dark">
      <div className="footer__top">
        <form
          id="newsletter"
          className="footer__news"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <label htmlFor="footer-email" className="footer__news-title">
            {config.newsletter.title}
          </label>
          {sent ? (
            <p className="footer__thanks" role="status">
              {config.newsletter.thanks}
            </p>
          ) : (
            <div className="footer__field">
              <input id="footer-email" type="email" required autoComplete="email" placeholder={config.newsletter.placeholder} />
              <button type="submit" className="mono">
                {config.newsletter.cta}
              </button>
            </div>
          )}
        </form>

        <nav className="footer__cols" aria-label="Footer">
          {config.columns.map((col) => (
            <div key={col.title}>
              <p className="mono">{col.title}</p>
              <ul className={col.links.every((l) => l.icon) ? 'footer__icons' : undefined}>
                {col.links.map((l) => (
                  <li key={l.href + l.label}>
                    {l.icon ? (
                      <a href={l.href} aria-label={l.label} title={l.label}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          {ICONS[l.icon]}
                        </svg>
                      </a>
                    ) : (
                      <a href={l.href}>{l.label}</a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <p className="footer__wordmark" aria-hidden="true">
        {brand.name}
      </p>

      <div className="footer__legal mono">
        <span>{config.legal}</span>
      </div>
    </footer>
  );
}
