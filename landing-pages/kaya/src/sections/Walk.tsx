import type { SiteConfig } from '../content/site';
import { Picture } from '../components/Picture';
import { Lines } from '../components/Title';

/** The phone in the middle, three plain numbers around it. */
export function Walk({ config }: { config: SiteConfig['walk'] }) {
  const stats = (from: number, to: number) => (
    <ul className="walk__stats">
      {config.stats.slice(from, to).map((s, i) => (
        <li key={i} data-reveal="" style={{ transitionDelay: `${(from + i) * 0.1}s` }}>
          <strong>{s.value}</strong>
          <span>{s.label}</span>
          <img {...s.image} loading="lazy" />
        </li>
      ))}
    </ul>
  );
  return (
    <section id="walk" className="walk">
      <header className="head" data-reveal="">
        <h2>
          <Lines lines={config.title} />
        </h2>
        <p>{config.text}</p>
      </header>
      <div className="walk__board">
        {stats(0, 2)}
        <Picture image={config.phone} className="walk__phone" />
        <div className="walk__end">
          {stats(2, 3)}
          <small>{config.note}</small>
        </div>
      </div>
    </section>
  );
}
