import type { CSSProperties } from 'react';
import type { HeadlineLine } from '../content/types';

interface Props {
  lines: HeadlineLine[];
  as?: 'h1' | 'h2';
  className?: string;
}

/** Display headline whose lines rise out of a mask, staggered, once revealed. */
export function Headline({ lines, as: Tag = 'h2', className = '' }: Props) {
  return (
    <Tag className={`headline ${className}`} data-reveal aria-label={lines.map((l) => l.text).join(' ')}>
      {lines.map((line, i) => (
        <span
          key={i}
          className="headline__line"
          aria-hidden="true"
          style={{ '--i': i, '--indent': line.indent ?? 0 } as CSSProperties}
        >
          <span className={line.italic ? 'headline__text is-italic' : 'headline__text'}>{line.text}</span>
        </span>
      ))}
    </Tag>
  );
}
