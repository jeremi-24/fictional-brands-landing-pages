import type { SiteConfig } from '../content/site';

export function Quote({ config }: { config: SiteConfig['quote'] }) {
  return (
    <figure className="quote wrap" data-reveal="">
      <blockquote>“{config.text}”</blockquote>
      <figcaption>
        <strong>{config.name}</strong> · {config.company}
      </figcaption>
    </figure>
  );
}
