import type { SiteConfig } from '../content/site';
import { Picture } from '../components/Picture';

export function Companies({ config }: { config: SiteConfig['companies'] }) {
  return (
    <div className="companies wrap">
      <p data-reveal="">{config.label}</p>
      <ul>
        {config.logos.map((logo, i) => (
          <li key={i}>
            <Picture image={logo} reveal="" delay={i * 0.08} />
          </li>
        ))}
      </ul>
    </div>
  );
}
