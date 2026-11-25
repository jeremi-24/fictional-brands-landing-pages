import { useState } from 'react';
import type { BenefitsConfig, BenefitTile } from '../content/types';
import { ArrowLink } from '../components/ArrowLink';
import { Headline } from '../components/Headline';
import { Picture } from '../components/Picture';
import { SectionMark } from '../components/SectionMark';
import { vars } from '../components/vars';
import './Benefits.css';

const SIZES = '(max-width: 640px) 92vw, (max-width: 1080px) 46vw, 46vw';

/** Drag (or arrow-key) slider: the "after" photo is revealed from the left over the "before". */
function Compare({ compare }: { compare: NonNullable<BenefitTile['compare']> }) {
  const [pos, setPos] = useState(50);
  return (
    <div className="compare" style={vars({ '--pos': `${pos}%` })}>
      <Picture image={compare.before} sizes={SIZES} className="compare__img" />
      <Picture image={compare.after} sizes={SIZES} className="compare__img compare__img--after" />
      <span className="compare__handle" aria-hidden="true" />
      <span className="compare__label compare__label--after mono">{compare.labels[1]}</span>
      <span className="compare__label compare__label--before mono">{compare.labels[0]}</span>
      <input
        className="compare__range"
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label={`${compare.labels[0]} / ${compare.labels[1]}`}
      />
    </div>
  );
}

/** Bento grid: what the serum does, in short tiles, half of them photographs. */
export function Benefits({ config }: { config: BenefitsConfig }) {
  return (
    <section id={config.id} className="benefits section surface-paper" aria-label={config.eyebrow}>
      <header className="benefits__head">
        <SectionMark index="03" label={config.eyebrow} />
        <Headline lines={config.title} className="benefits__title" />
      </header>

      <ul className="bento">
        {config.tiles.map((t, i) => (
          <li
            key={i}
            className={`bento__tile bento__tile--${t.size} ${t.image || t.compare ? 'has-image' : ''} ${t.title && t.image ? 'has-caption' : ''} ${t.accent ? 'is-accent' : ''} fade-up`}
            data-reveal
            style={vars({ '--d': (i % 4) * 90 })}
          >
            {t.image && <Picture image={t.image} sizes={SIZES} className="bento__image" />}
            {t.compare && <Compare compare={t.compare} />}
            {t.title && (
              <div className="bento__text">
                {t.kicker && <p className="bento__kicker mono">{t.kicker}</p>}
                <h3 className="bento__heading">{t.title}</h3>
                {t.body && <p className="bento__body">{t.body}</p>}
                {t.link && <ArrowLink link={t.link} />}
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
