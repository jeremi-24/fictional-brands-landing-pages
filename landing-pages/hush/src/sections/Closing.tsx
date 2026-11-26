import type { SiteConfig } from '../content/site';
import { Agent } from '../components/Agent';

export function Closing({ config }: { config: SiteConfig['closing'] }) {
  return (
    <section className="closing wrap" data-reveal="zoom">
      <Agent />
      <h2>{config.title}</h2>
      <a href="#pricing" className="btn btn--ink">
        {config.cta}
      </a>
    </section>
  );
}
