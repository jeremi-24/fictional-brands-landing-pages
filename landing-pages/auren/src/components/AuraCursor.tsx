import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../hooks/usePageMotion';

/** A soft rose glow that trails the pointer: the visitor's own aura. Mouse only. */
export function AuraCursor() {
  const el = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = el.current;
    if (!node || prefersReducedMotion() || !matchMedia('(pointer: fine)').matches) return;
    let raf = 0;
    const target = { x: innerWidth / 2, y: innerHeight / 2 };
    const cur = { ...target };
    const tick = () => {
      cur.x += (target.x - cur.x) * 0.12;
      cur.y += (target.y - cur.y) * 0.12;
      node.style.transform = `translate3d(${cur.x.toFixed(1)}px, ${cur.y.toFixed(1)}px, 0)`;
      raf = Math.abs(target.x - cur.x) + Math.abs(target.y - cur.y) > 0.5 ? requestAnimationFrame(tick) : 0;
    };
    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      node.classList.add('is-on');
      dim();
      if (!raf) raf = requestAnimationFrame(tick);
    };
    // over the big type of the Aura scene the glow would wash out the letters;
    // re-checked on scroll too, since the page moves under a still pointer
    const dim = () =>
      node.classList.toggle('is-dim', !!document.elementFromPoint(target.x, target.y)?.closest('.aura'));
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('scroll', dim, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', dim);
    };
  }, []);

  return <div ref={el} className="aura-cursor" aria-hidden="true" />;
}
