import type { CSSProperties } from 'react';
import type { SiteConfig } from '../content/site';

export function Pricing({ config }: { config: SiteConfig['pricing'] }) {
  return (
    <section id="pricing" className="section wrap">
      <header className="section__head" data-reveal="">
        <p className="pill">{config.eyebrow}</p>
        <h2>{config.title}</h2>
      </header>
      <div className="plans">
        {config.plans.map((p, i) => (
          <article key={i} className={`plan ${p.featured ? 'plan--featured' : ''}`} data-reveal="" style={{ '--d': `${i * 0.12}s` } as CSSProperties}>
            <h3>{p.name}</h3>
            <p className="plan__price">
              <strong>{p.price}</strong> <span>{p.unit}</span>
            </p>
            <ul>
              {p.items.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
            {/* fictional product: every plan button leads back to the demo */}
            <a href="#agent" className={`btn ${p.featured ? 'btn--ink' : 'btn--white'}`}>
              {p.cta}
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
