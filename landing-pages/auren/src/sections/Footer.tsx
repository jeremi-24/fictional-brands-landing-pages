import { useState, type ReactNode } from 'react';
import type { Brand, FooterConfig, Link } from '../content/types';
import './Footer.css';

interface Props {
  brand: Brand;
  config: FooterConfig;
}

const ICONS: Record<NonNullable<Link['icon']>, ReactNode> = {
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 10.5V16M8 7.8v.1M12 16v-5.5M12 13c0-1.5 1-2.5 2.3-2.5S16.5 11.5 16.5 13v3" />
    </>
  ),
  github: (
    <path d="M9 19c-4 1.3-4-2-6-2.5m12 4.5v-3.2a2.8 2.8 0 0 0-.8-2.2c2.7-.3 5.5-1.3 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.3 4.3 0 0 0-.1-3.2s-1-.3-3.4 1.3a11.600 11.600 0 0 0-6 0C6.500 3.500 5.500 3.800 5.500 3.800a4.300 4.300 0 0 0-.1 3.200A4.600 4.600 0 0 0 4 10.200c0 4.600 2.800 5.600 5.500 6a2.800 2.800 0 0 0-.8 2.200V21" />
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
                      <a href={l.href} aria-label={l.label} title={l.label} {...(l.href.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })}>
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
