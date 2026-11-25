import { useMemo, useRef } from 'react';
import type { AuraConfig } from '../content/types';
import { Picture } from '../components/Picture';
import { SectionMark } from '../components/SectionMark';
import { useScrollProgress } from '../hooks/useScrollProgress';
import './Aura.css';

/** Indexes of `phrase` that spell `word` in order (greedy, case-insensitive); empty if it can't. */
export function lettersToKeep(phrase: string, word: string): Set<number> {
  const keep = new Set<number>();
  const w = word.toUpperCase();
  for (let i = 0, j = 0; i < phrase.length && j < w.length; i++) {
    if (phrase[i].toUpperCase() === w[j]) {
      keep.add(i);
      j++;
    }
  }
  return keep.size === w.length ? keep : new Set();
}

/**
 * Sticky scroll scene: the phrase collapses into the brand name, then an
 * aura of light opens from the centre and reveals the image. All phases are
 * CSS driven by the track's `--p` scroll progress.
 */
export function Aura({ config }: { config: AuraConfig }) {
  const track = useRef<HTMLDivElement>(null);
  useScrollProgress(track, 'sticky');
  const keep = useMemo(() => lettersToKeep(config.phrase, config.word), [config.phrase, config.word]);

  return (
    <section id={config.id} className="aura surface-dark" aria-label={config.eyebrow}>
      <div className="aura__track" ref={track}>
        <div className="aura__sticky">
          <div className="aura__image">
            <Picture image={config.image} sizes="100vw" />
          </div>
          <div className="aura__glow" aria-hidden="true" />

          <h2 className="aura__word" aria-label={`${config.phrase} — ${config.word}`}>
            {[...config.phrase].map((ch, i) => (
              <span key={i} aria-hidden="true" className={keep.has(i) ? 'is-kept' : 'is-dropped'}>
                {ch === ' ' ? ' ' : ch}
              </span>
            ))}
          </h2>

          <div className="aura__caption">
            <SectionMark index="01" label={config.eyebrow} />
            <h3 className="aura__title">
              {config.title[0]} <em>{config.title[1]}</em>
            </h3>
            <p className="aura__body">{config.body}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
