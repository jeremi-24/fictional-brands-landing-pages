import { Fragment } from 'react';

/** A title written as two lines in site.ts: broken there on wide screens, free to wrap on phones. */
export function Lines({ lines }: { lines: string[] }) {
  return (
    <>
      {lines.map((line, i) => (
        <Fragment key={i}>
          {i > 0 && ' '}
          <span className="line">{line}</span>
        </Fragment>
      ))}
    </>
  );
}
