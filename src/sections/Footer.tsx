import { useState } from 'react';
import type { Brand, FooterConfig } from '../content/types';
import './Footer.css';

interface Props {
  brand: Brand;
  config: FooterConfig;
}

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
              <ul>
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href}>{l.label}</a>
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
