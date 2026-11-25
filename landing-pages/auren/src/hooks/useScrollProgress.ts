import { useEffect, type RefObject } from 'react';

export type ProgressMode =
  /** 0 when the element's top enters the viewport bottom, 1 when its bottom leaves the top. */
  | 'through'
  /** 0 when the element's top hits the viewport top, 1 when its bottom hits the viewport bottom (for sticky scenes). */
  | 'sticky';

/**
 * Writes the element's scroll progress (0–1) to its `--p` CSS variable on
 * every frame it changes, and optionally reports it to a callback.
 * No React state is touched, so it never re-renders.
 */
export function useScrollProgress(
  ref: RefObject<HTMLElement | null>,
  mode: ProgressMode = 'through',
  onProgress?: (p: number) => void,
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    let last = -1;

    const measure = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const raw = mode === 'sticky' ? -r.top / Math.max(1, r.height - vh) : (vh - r.top) / (r.height + vh);
      const p = Math.min(1, Math.max(0, raw));
      if (Math.abs(p - last) < 0.0005) return;
      last = p;
      el.style.setProperty('--p', p.toFixed(4));
      onProgress?.(p);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
    // onProgress is expected to be stable (a ref-backed callback).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, mode]);
}
