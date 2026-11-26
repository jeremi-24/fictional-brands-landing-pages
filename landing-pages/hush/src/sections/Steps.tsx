import type { CSSProperties } from 'react';
import type { SiteConfig } from '../content/site';

/** A short timeline: the line draws itself, then each moment appears on it. */
export function Steps({ config }: { config: SiteConfig['steps'] }) {
  return (
    <section id="how" className="section wrap">
      <header className="section__head" data-reveal="">
        <p className="pill">{config.eyebrow}</p>
        <h2>{config.title}</h2>
      </header>
      <ol className="timeline">
        <li className="timeline__line" aria-hidden="true" data-reveal="line" />
        {config.items.map((s, i) => (
          <li key={i} className="moment" data-reveal="" style={{ '--d': `${0.25 + i * 0.35}s` } as CSSProperties}>
            <time>{s.time}</time>
            <i aria-hidden="true" />
            <h3>{s.title}</h3>
            <p>{s.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
