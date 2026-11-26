import type { CSSProperties } from 'react';
import type { SiteConfig } from '../content/site';
import { Agent } from '../components/Agent';
import { Icon, type IconName } from '../components/Icon';

/** One icon per task, in the order of `agent.tasks`. */
const ICONS: IconName[] = ['calendar', 'mail', 'moon', 'check'];

/** The agent in the middle, its jobs arriving one after the other around it. */
export function Work({ config }: { config: SiteConfig['agent'] }) {
  return (
    <section id="agent" className="section wrap">
      <header className="section__head" data-reveal="">
        <p className="pill">{config.eyebrow}</p>
        <h2>
          {config.title[0]}
          <br />
          {config.title[1]}
        </h2>
      </header>
      <div className="work__stage" data-reveal="zoom">
        <div className="work__agent">
          <Agent />
        </div>
        {config.tasks.map((task, i) => (
          <article key={i} className="task" data-reveal="" style={{ '--d': `${0.35 + i * 0.35}s` } as CSSProperties}>
            <i>
              <Icon name={ICONS[i]} />
            </i>
            <p>
              <strong>{task.title}</strong>
              {task.detail}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
