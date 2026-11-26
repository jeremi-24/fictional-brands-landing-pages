import { useState } from 'react';
import type { SiteConfig } from '../content/site';

/**
 * The people side, in one strip: three moments of a quieter week. The one you
 * point at, tap or tab to opens wide. On a phone they swipe side by side.
 */
export function Feel({ config }: { config: SiteConfig['feel'] }) {
  const [open, setOpen] = useState(0);
  return (
    <section id="feel" className="section wrap">
      <header className="section__head" data-reveal="">
        <p className="pill">{config.eyebrow}</p>
        <h2>{config.title}</h2>
      </header>
      <div className="strip" data-reveal="zoom">
        {config.moments.map((m, i) => (
          <button
            key={i}
            type="button"
            className={`strip__card ${i === open ? 'is-open' : ''}`}
            aria-pressed={i === open}
            onClick={() => setOpen(i)}
            onFocus={() => setOpen(i)}
            onPointerEnter={() => setOpen(i)}
          >
            <img {...m.photo} loading="lazy" data-zoom="" />
            <span className="strip__text">
              <strong>{m.feeling}</strong>
              <span>{m.text}</span>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
