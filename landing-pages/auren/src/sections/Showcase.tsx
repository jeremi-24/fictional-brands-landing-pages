import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { CameraFocus, ShowcaseConfig, Theme } from '../content/types';
import { Headline } from '../components/Headline';
import { Picture } from '../components/Picture';
import { SectionMark } from '../components/SectionMark';
import { vars } from '../components/vars';
import { useScrollProgress } from '../hooks/useScrollProgress';
import './Showcase.css';

// three.js ships in its own chunk, fetched only when this section mounts
const BottleStage = lazy(() => import('../three/BottleStage').then((m) => ({ default: m.BottleStage })));

interface Props {
  brand: string;
  theme: Theme;
  config: ShowcaseConfig;
}

const INTRO: CameraFocus = { y: 1.4, distance: 7.4, turn: -0.45 };
const OUTRO: CameraFocus = { y: 1.4, distance: 7.2, turn: Math.PI * 2 + 0.5 };

/**
 * Scroll-driven product tour: the section is tall, its scene sticks to the
 * viewport, and scroll progress moves the camera from one callout to the next.
 */
export function Showcase({ brand, theme, config }: Props) {
  const track = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const [active, setActive] = useState(-1);
  const stops = useMemo(() => [INTRO, ...config.callouts.map((c) => c.focus), OUTRO], [config.callouts]);
  const span = stops.length - 1;

  const onProgress = useCallback(
    (p: number) => {
      progress.current = p;
      const x = p * span;
      const i = Math.round(x) - 1;
      const near = Math.abs(x - Math.round(x)) < 0.4;
      setActive(near && i >= 0 && i < config.callouts.length ? i : -1);
    },
    [span, config.callouts.length],
  );
  useScrollProgress(track, 'sticky', onProgress);

  // three.js (~140 kB) and the WebGL scene start only when the tour is about two screens away
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        setNear(true);
        io.disconnect();
      },
      { rootMargin: '200% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id={config.id} className="showcase surface-dark" aria-label={config.eyebrow}>
      <div className="showcase__track" ref={track} style={vars({ '--steps': span + 1 })}>
      <div className="showcase__sticky">
        {near && (
        <Suspense fallback={null}>
          <BottleStage
            name={brand}
            theme={theme}
            progress={progress}
            stops={stops}
            fallback={<Picture image={config.fallback} sizes="100vw" className="showcase__fallback" />}
          />
        </Suspense>
        )}

        <header className={`showcase__intro ${active === -1 ? '' : 'is-away'}`}>
          <SectionMark index="02" label={config.eyebrow} />
          <Headline lines={config.title} className="showcase__title" />
        </header>

        {config.callouts.map((c, i) => (
          <article
            key={c.index}
            className={`callout callout--${c.side} ${active === i ? 'is-active' : ''}`}
            aria-hidden={active !== i}
          >
            <p className="callout__label mono">
              {c.index} — {c.label}
            </p>
            <h3 className="callout__title">{c.title}</h3>
            <p className="callout__body">{c.body}</p>
            <span className="callout__leader" aria-hidden="true" />
          </article>
        ))}

        <ol className="showcase__rail" aria-hidden="true">
          {config.callouts.map((c, i) => (
            <li key={c.index} className={active === i ? 'is-active' : ''}>
              <span className="mono">{c.index}</span>
            </li>
          ))}
        </ol>
      </div>
      </div>

    </section>
  );
}
