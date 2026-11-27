import type { SiteConfig } from '../content/site';
import { Icon } from '../components/Icon';
import { Picture } from '../components/Picture';
import { Lines } from '../components/Title';

/** The one gesture: an evening at ease, what each move gives, the dial up close. */
export function Dial({ config }: { config: SiteConfig['dial'] }) {
  return (
    <section className="dial">
      <div className="dial__photo">
        <Picture image={config.photo} className="arch" />
      </div>
      <div className="dial__say" data-reveal="">
        <p className="kicker">{config.kicker}</p>
        <h2>
          <Lines lines={config.title} />
        </h2>
        <p>{config.text}</p>
        <ul className="moves">
          {config.moves.map((m, i) => (
            <li key={i}>
              <span className={`moves__icon moves__icon--${m.icon}`}>
                <Icon name={m.icon} />
              </span>
              <strong>{m.title}</strong>
              <span>{m.text}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="dial__close">
        <Picture image={config.image} className="arch" delay={0.2} />
      </div>
    </section>
  );
}
