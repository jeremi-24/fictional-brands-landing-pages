import { useEffect, useRef, type ReactNode } from 'react';
import type { SiteImage } from '../content/site';
import type { SceneName } from '../three/live';

interface Props {
  scene: SceneName;
  model: string;
  /** shown until the 3D is ready, and kept if the browser cannot draw it */
  poster: SiteImage;
  /** the colour of the sandal */
  tint: string;
  className?: string;
  eager?: boolean;
  /** said to screen readers; makes a sandal that can be turned reachable with the keyboard */
  turn?: string;
  /** labels: each child marked data-mark is pinned to its point of the model (--x, --y) */
  children?: ReactNode;
}

/** A live 3D picture of the sandal. three.js is downloaded only when this mounts. */
export function Stage({ scene, model, poster, tint, className = '', eager, turn, children }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const view = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  // the scene may not exist yet when a colour is picked: it reads the latest one when it starts
  const colour = useRef(tint);
  const live = useRef<{ stop: () => void; tint: (colour: string) => void } | undefined>(undefined);

  useEffect(() => {
    colour.current = tint;
    live.current?.tint(tint);
  }, [tint]);

  useEffect(() => {
    let gone = false;
    const start = async () => {
      const { mount } = await import('../three/live');
      const handle = await mount({
        canvas: canvas.current!,
        host: view.current!,
        model,
        scene,
        onDraw: (marks, progress) => {
          const el = root.current;
          if (!el) return;
          el.classList.add('is-live');
          el.style.setProperty('--open', progress.toFixed(2));
          el.querySelectorAll<HTMLElement>('[data-mark]').forEach((mark, i) => {
            if (!marks[i]) return;
            mark.style.setProperty('--x', `${(marks[i].x * 100).toFixed(2)}%`);
            mark.style.setProperty('--y', `${(marks[i].y * 100).toFixed(2)}%`);
          });
        },
      });
      if (gone) return handle.stop();
      live.current = handle;
      handle.tint(colour.current);
    };
    // wait until the stage is near the screen; without WebGL the poster simply stays
    const near = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        near.disconnect();
        start().catch((error) => console.warn('3D view unavailable:', error));
      },
      { rootMargin: '60% 0px' },
    );
    near.observe(root.current!);
    return () => {
      gone = true;
      near.disconnect();
      live.current?.stop();
      live.current = undefined;
      root.current?.classList.remove('is-live');
    };
  }, [scene, model]);

  return (
    <div ref={root} className={`stage ${className}`}>
      <div ref={view} className="stage__view" tabIndex={turn ? 0 : undefined} role={turn ? 'group' : undefined} aria-label={turn}>
        <img {...poster} className="stage__poster" loading={eager ? 'eager' : 'lazy'} />
        <canvas ref={canvas} aria-hidden="true" />
      </div>
      {children}
    </div>
  );
}
