import type { SiteConfig } from '../content/site';
import { Picture } from '../components/Picture';

/** The people side: three moments of a quieter week, each with a photo. */
export function Feel({ config }: { config: SiteConfig['feel'] }) {
  return (
    <section id="feel" className="section wrap">
      <header className="section__head" data-reveal="">
        <p className="pill">{config.eyebrow}</p>
        <h2>{config.title}</h2>
      </header>
      <div className="moments">
        {config.moments.map((m, i) => (
          <figure key={i}>
            <Picture image={m.photo} delay={i * 0.15} />
            <figcaption data-reveal="">
              <strong>{m.feeling}</strong>
              {m.text}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
