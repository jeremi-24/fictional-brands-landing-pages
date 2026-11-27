import type { SiteConfig } from '../content/site';
import { Picture } from '../components/Picture';

/** Where it comes from: school on one side, football on the other, the words between them. */
export function Story({ config }: { config: SiteConfig['story'] }) {
  const [first, second] = config.photos;
  return (
    <section id="story" className="story">
      <div className="story__first">
        <Picture image={first} className="arch" />
      </div>
      <div className="story__say" data-reveal="">
        <p className="kicker">{config.eyebrow}</p>
        <h2>{config.title}</h2>
        <p>{config.body}</p>
      </div>
      <div className="story__second">
        <Picture image={second} className="arch" delay={0.15} />
      </div>
    </section>
  );
}
