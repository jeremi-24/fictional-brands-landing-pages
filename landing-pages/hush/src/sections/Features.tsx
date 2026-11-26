import type { SiteConfig } from '../content/site';
import { Icon } from '../components/Icon';
import { Picture } from '../components/Picture';

/** One benefit per row: what you get in words on one side, what it looks like on the other. */
export function Features({ config }: { config: SiteConfig['features'] }) {
  return (
    <section id="features" className="section wrap">
      <header className="section__head" data-reveal="">
        <p className="pill">{config.eyebrow}</p>
        <h2>{config.title}</h2>
      </header>
      <div className="features">
        {config.items.map((f, i) => (
          <article key={i} className="feature">
            <div className="feature__text" data-reveal="">
              <h3>{f.title}</h3>
              <p>{f.body}</p>
              <ul className="ticks">
                {f.points.map((p, j) => (
                  <li key={j}>
                    <Icon name="check" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <Picture image={f.image} className="feature__art" delay={0.15} />
          </article>
        ))}
      </div>
    </section>
  );
}
