import type { CSSProperties } from 'react';
import type { SiteConfig, SiteImage } from '../content/site';
import { Icon } from '../components/Icon';
import { Lines } from '../components/Title';

/*
 * Where the faint pictures sit, in % of the band: along slanting lines from top left to
 * bottom right, leaving the middle to the title, the pair and the button.
 */
const SPOTS: [left: number, top: number][] = [
  [3, 10], [11, 35], [19, 60], [27, 86],
  [18, 7], [26, 31], [33, 54],
  [3, 69], [11, 89],
  [82, 9], [94, 30],
  [70, 29], [79, 49], [89, 66],
  [67, 89], [78, 85], [95, 90],
];

/** The pair in the colour picked above, and one way back to change it. */
export function Closing({ config, pair, doodles }: { config: SiteConfig['closing']; pair: SiteImage; doodles: SiteConfig['doodles'] }) {
  return (
    <section className="closing">
      <div className="closing__doodles" aria-hidden="true">
        {SPOTS.map(([left, top], i) => (
          <img key={i} {...doodles[i % doodles.length]} loading="lazy" style={{ '--x': `${left}%`, '--y': `${top}%` } as CSSProperties} />
        ))}
      </div>
      <h2 data-reveal="">
        <Lines lines={[config.title]} />
      </h2>
      <img {...pair} loading="lazy" data-zoom="" tabIndex={0} role="button" aria-haspopup="dialog" />
      <a href="#colours" className="btn btn--light">
        <Icon name="palette" />
        {config.cta}
      </a>
    </section>
  );
}
