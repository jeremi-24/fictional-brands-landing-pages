import type { SiteConfig } from '../content/site';

export function Footer({ brand, config }: { brand: string; config: SiteConfig['footer'] }) {
  return (
    <footer className="footer wrap">
      <p className="footer__word" aria-hidden="true" data-reveal="">
        {brand}
      </p>
      <p data-reveal="">{config.tagline}</p>
      <p className="footer__credit">
        {config.credit.map((l) => (
          <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer">
            {l.label}
          </a>
        ))}
      </p>
    </footer>
  );
}
