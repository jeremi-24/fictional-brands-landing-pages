import type { CSSProperties } from 'react';
import type { SiteConfig } from '../content/site';
import { Icon, type IconName } from '../components/Icon';
import { Picture } from '../components/Picture';

function List({ title, items, icon, kind, delay }: { title: string; items: string[]; icon: IconName; kind: string; delay: number }) {
  return (
    <article className={`vault vault--${kind}`} data-reveal="" style={{ '--d': `${delay}s` } as CSSProperties}>
      <h3>{title}</h3>
      <ul>
        {items.map((item, i) => (
          <li key={i}>
            <i>
              <Icon name={icon} />
            </i>
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}

export function Privacy({ config }: { config: SiteConfig['privacy'] }) {
  const { manager } = config;
  return (
    <section id="privacy" className="section wrap">
      <header className="section__head" data-reveal="">
        <p className="pill">{config.eyebrow}</p>
        <h2>{config.title}</h2>
        <p className="section__sub">{config.body}</p>
      </header>
      <div className="vaults">
        <List {...config.reads} icon="check" kind="reads" delay={0} />
        <List {...config.never} icon="cross" kind="never" delay={0.12} />
        <article className="vault vault--manager" data-reveal="" style={{ '--d': '0.24s' } as CSSProperties}>
          <h3>{manager.title}</h3>
          <Picture image={manager.image} className="vault__report" delay={0.35} />
          <p className="vault__consent">
            <Icon name="check" />
            {manager.consent}
          </p>
        </article>
      </div>
    </section>
  );
}
