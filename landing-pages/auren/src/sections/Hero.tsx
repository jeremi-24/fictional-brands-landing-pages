import type { HeroConfig } from '../content/types';
import { ArrowLink } from '../components/ArrowLink';
import { Headline } from '../components/Headline';
import { Picture } from '../components/Picture';
import { vars } from '../components/vars';
import './Hero.css';

export function Hero({ config }: { config: HeroConfig }) {
  return (
    <section className="hero surface-dark" aria-labelledby="hero-title">
      <div className="hero__layout">
        <div className="hero__title" id="hero-title">
          <p className="hero__kicker mono hero-enter" style={vars({ '--d': 300 })}>
            {config.kicker}
          </p>
          <Headline lines={config.headline} as="h1" className="hero__headline" />
        </div>
        <div className="hero__copy hero-enter" style={vars({ '--d': 900 })}>
          <p>{config.body}</p>
          <div className="hero__ctas">
            <ArrowLink link={config.primary} variant="solid" />
            <ArrowLink link={config.secondary} />
          </div>
        </div>
      </div>

      <div className="hero__media">
        <Picture image={config.image} sizes="100vw" eager />
      </div>
    </section>
  );
}
