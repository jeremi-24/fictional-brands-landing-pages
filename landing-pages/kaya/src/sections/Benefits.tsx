import type { SiteConfig } from '../content/site';
import { Picture } from '../components/Picture';

/** A life on one half, what the sandal brings to it (words and a drawing) on the other. */
function Feature({ config, flip }: { config: SiteConfig['benefits']['style']; flip?: boolean }) {
  return (
    <article className={flip ? 'feature feature--flip' : 'feature'}>
      <div className="feature__photo">
        <Picture image={config.photo} className="arch" />
      </div>
      <div className="feature__say">
        <h3 data-reveal="">{config.title}</h3>
        <p data-reveal="">{config.text}</p>
        <Picture image={config.image} className="feature__art" delay={0.15} />
      </div>
    </article>
  );
}

export function Benefits({ config }: { config: SiteConfig['benefits'] }) {
  return (
    <section id="benefits" className="benefits">
      <Feature config={config.style} />
      <Feature config={config.comfort} flip />
      <div className="duo">
        <article data-reveal="">
          <h3>{config.progress.title}</h3>
          <p>{config.progress.text}</p>
          <div className="progress">
            <Picture image={config.progress.image} delay={0.15} />
            <ul>
              {config.progress.rings.map((ring, i) => (
                <li key={i}>
                  <strong>{ring.value}</strong>
                  <span>{ring.goal}</span>
                </li>
              ))}
            </ul>
          </div>
          <small>{config.progress.note}</small>
        </article>
        <article data-reveal="">
          <h3>{config.rain.title}</h3>
          <p>{config.rain.text}</p>
          <Picture image={config.rain.image} delay={0.25} />
        </article>
      </div>
    </section>
  );
}
