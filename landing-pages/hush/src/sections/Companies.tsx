import type { SiteConfig } from '../content/site';

/** One row of logos that never stops: the list is written twice so the loop has no seam. */
export function Companies({ config }: { config: SiteConfig['companies'] }) {
  return (
    <div className="companies wrap">
      <p data-reveal="">{config.label}</p>
      <div className="marquee" data-reveal="">
        {[false, true].map((copy) => (
          <ul key={String(copy)} aria-hidden={copy}>
            {config.logos.map((logo, i) => (
              <li key={i}>
                <img {...logo} />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
