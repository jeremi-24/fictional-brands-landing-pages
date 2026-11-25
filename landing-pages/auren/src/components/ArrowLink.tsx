import type { Link } from '../content/types';

interface Props {
  link: Link;
  variant?: 'solid' | 'line';
}

export function ArrowLink({ link, variant = 'line' }: Props) {
  return (
    <a className={`arrow-link arrow-link--${variant}`} href={link.href}>
      <span className="arrow-link__label">{link.label}</span>
      <svg className="arrow-link__icon" viewBox="0 0 24 12" aria-hidden="true">
        <path d="M0 6h22M17 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1" />
      </svg>
    </a>
  );
}
