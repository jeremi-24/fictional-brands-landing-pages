import { useEffect, useLayoutEffect, useRef } from 'react';
import type { SiteConfig } from '../content/site';
import { Halos } from '../components/Halos';
import { Picture } from '../components/Picture';
import { Lines } from '../components/Title';

/** One promise and five lives in arched frames. On phones the frames are a strip to swipe. */
export function Hero({ config }: { config: SiteConfig['hero'] }) {
  const strip = useRef<HTMLUListElement>(null);

  // the strip opens on the middle picture (nothing to scroll on wide screens)
  useLayoutEffect(() => {
    const list = strip.current!;
    const middle = list.children[Math.floor(list.children.length / 2)] as HTMLElement;
    list.scrollLeft = middle.offsetLeft - (list.clientWidth - middle.offsetWidth) / 2;
  }, []);

  // the picture in front of the strip stands tall
  useEffect(() => {
    const list = strip.current!;
    const front = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.toggleAttribute('data-front', e.intersectionRatio >= 0.6)),
      { root: list, threshold: 0.6 },
    );
    [...list.children].forEach((item) => front.observe(item));
    return () => front.disconnect();
  }, []);

  return (
    <section className="hero">
      <Halos />
      <div className="hero__words">
        <h1 data-reveal="">
          <Lines lines={config.title} />
        </h1>
      </div>
      <ul ref={strip} className="hero__arches">
        {config.photos.map((photo, i) => (
          <li key={i}>
            <Picture image={photo} className="arch" eager delay={0.2 + i * 0.1} />
          </li>
        ))}
      </ul>
    </section>
  );
}
