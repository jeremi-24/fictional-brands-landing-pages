import { useEffect, useRef } from 'react';
import { drift } from './drift';

/*
 * The lights and shades behind the opening, bottom one first. Their colour, size and starting
 * place are in sections.css (.halo--tone). `ceiling` is how high a centre may rise, from 0 (top)
 * to 1 (bottom): the light ones stay under the title so that it remains readable.
 */
const HALOS = [
  { tone: 'shade', ceiling: 0 },
  { tone: 'ember', ceiling: 0.45 },
  { tone: 'glow', ceiling: 0.75 },
  { tone: 'night', ceiling: 0 },
  { tone: 'warm', ceiling: 0.48 },
];
/** distance covered each second, as a share of the longest side */
const SPEED = 0.065;

/** Each halo wanders on its own at one constant speed. Still for visitors who ask for less motion. */
export function Halos() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const area = root.current!;
    const still = matchMedia('(prefers-reduced-motion: reduce)');
    const lamps = HALOS.map(({ ceiling }, i) => {
      const element = area.children[i] as HTMLElement;
      const x = (element.offsetLeft + element.offsetWidth / 2) / area.clientWidth;
      const y = (element.offsetTop + element.offsetHeight / 2) / area.clientHeight;
      return { element, ceiling, x, y, home: { x, y }, heading: Math.random() * Math.PI * 2 };
    });
    let frame = 0;
    let last = 0;
    let onScreen = false;

    const move = (now: number) => {
      // never negative on the first frame, and a long pause must not become a leap
      const seconds = Math.min(Math.max(now - last, 0), 100) / 1000;
      last = now;
      const { clientWidth: width, clientHeight: height } = area;
      const distance = Math.max(width, height) * SPEED * seconds;
      for (const lamp of lamps) {
        drift(lamp, distance / width, distance / height, lamp.ceiling, (Math.random() - 0.5) * 2 * Math.sqrt(seconds));
        lamp.element.style.transform = `translate3d(${(lamp.x - lamp.home.x) * width}px, ${(lamp.y - lamp.home.y) * height}px, 0)`;
      }
      frame = requestAnimationFrame(move);
    };
    // moves only while the opening is on screen
    const play = () => {
      cancelAnimationFrame(frame);
      if (still.matches) lamps.forEach((lamp) => (lamp.element.style.transform = ''));
      else if (onScreen) {
        last = performance.now();
        frame = requestAnimationFrame(move);
      }
    };
    const sight = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      play();
    });
    sight.observe(area);
    still.addEventListener('change', play);
    return () => {
      cancelAnimationFrame(frame);
      sight.disconnect();
      still.removeEventListener('change', play);
    };
  }, []);

  return (
    <div ref={root} className="halos" aria-hidden="true">
      {HALOS.map(({ tone }) => (
        <i key={tone} className={`halo halo--${tone}`} />
      ))}
    </div>
  );
}
