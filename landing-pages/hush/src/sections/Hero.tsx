import type { CSSProperties } from 'react';
import type { SiteConfig } from '../content/site';
import { APP_ICONS, Icon } from '../components/Icon';
import { Picture } from '../components/Picture';

/** Each line of the hero arrives a beat after the previous one. */
const after = (seconds: number) => ({ 'data-reveal': '', style: { '--d': `${seconds}s` } as CSSProperties });

/** The promise, shown: the word being cancelled gets a red stroke. */
function Line({ text, strike }: { text: string; strike: string }) {
  const at = text.indexOf(strike);
  if (at < 0) return <span>{text}</span>;
  return (
    <span>
      {text.slice(0, at)}
      <i className="struck">{strike}</i>
      {text.slice(at + strike.length)}
    </span>
  );
}

export function Hero({ config, apps }: { config: SiteConfig['hero']; apps: SiteConfig['apps'] }) {
  return (
    <section className="hero">
      {/* generated from code, see the project README */}
      <img className="hero__sky" src="/images/sky-2400.jpg" srcSet="/images/sky-1200.jpg 1200w, /images/sky-2400.jpg 2400w" sizes="(max-width: 700px) 200vw, 100vw" alt="" fetchPriority="high" />
      <div className="wrap">
        <p className="pill" {...after(0)}>
          {config.kicker}
        </p>
        <h1 {...after(0.08)}>
          <Line text={config.title[0]} strike={config.strike} /> <Line text={config.title[1]} strike={config.strike} />
        </h1>
        <p className="lead" {...after(0.16)}>
          {config.body}
        </p>
        <div className="actions" {...after(0.24)}>
          <a href="#pricing" className="btn btn--ink">
            {config.primary}
          </a>
          <a href="#agent" className="btn btn--white">
            {config.secondary}
          </a>
        </div>
        <div className="works" {...after(0.32)}>
          <span>{config.worksWith}</span>
          <ul>
            {apps.map((app, i) => (
              <li key={i} className={`app-icon app-icon--${APP_ICONS[i]}`}>
                <Icon name={APP_ICONS[i]} />
                {app}
              </li>
            ))}
          </ul>
        </div>
        <Picture image={config.screen} className="hero__screen" eager delay={0.4} />
      </div>
    </section>
  );
}
