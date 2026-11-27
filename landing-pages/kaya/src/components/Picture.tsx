import type { CSSProperties } from 'react';
import type { SiteImage } from '../content/site';

interface Props {
  image: SiteImage;
  className?: string;
  /** above the fold: load it right away */
  eager?: boolean;
  /** how it appears on scroll: rises, or rises while growing */
  reveal?: '' | 'zoom';
  delay?: number;
}

/** Every picture of the page: replaceable file, reserved space, appears on scroll, opens large on click. */
export function Picture({ image, className, eager, reveal = 'zoom', delay = 0 }: Props) {
  return (
    <img
      {...image}
      className={className}
      loading={eager ? 'eager' : 'lazy'}
      data-reveal={reveal}
      data-zoom=""
      tabIndex={0}
      role="button"
      aria-haspopup="dialog"
      style={{ '--d': `${delay}s` } as CSSProperties}
    />
  );
}
