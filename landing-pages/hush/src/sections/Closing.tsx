import type { SiteConfig } from '../content/site';

export function Closing({ config }: { config: SiteConfig['closing'] }) {
  return (
    <section className="closing wrap" data-reveal="zoom">
      <img {...config.image} loading="lazy" />
      <h2>{config.title}</h2>
      <a href="#pricing" className="btn btn--ink">
        {config.cta}
      </a>
    </section>
  );
}
