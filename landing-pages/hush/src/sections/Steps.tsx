import type { CSSProperties } from 'react';
import type { SiteConfig } from '../content/site';
import { Picture } from '../components/Picture';

/** Three moments, told by their pictures: a time and a few words under each. */
export function Steps({ config }: { config: SiteConfig['steps'] }) {
  return (
    <section id="how" className="section wrap">
      <header className="section__head" data-reveal="">
        <p className="pill">{config.eyebrow}</p>
        <h2>{config.title}</h2>
      </header>
      <ol className="how">
        {config.items.map((s, i) => (
          <li key={i}>
            <Picture image={s.image} delay={i * 0.18} />
            <div data-reveal="" style={{ '--d': `${0.2 + i * 0.18}s` } as CSSProperties}>
              <time>{s.time}</time>
              <h3>{s.title}</h3>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
