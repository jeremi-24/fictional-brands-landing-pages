import type { SiteConfig } from '../content/site';
import { Stage } from '../components/Stage';
import { LAYER_SIDES } from '../three/sides';

/** For those who want it: the sandal opens into its layers as the page scrolls. */
export function Tech({ config, model, tint }: { config: SiteConfig['tech']; model: string; tint: string }) {
  return (
    <section id="tech" className="tech">
      <header className="head" data-reveal="">
        <p className="kicker">{config.eyebrow}</p>
        <h2>{config.title}</h2>
      </header>
      <Stage scene="layers" model={model} poster={config.poster} tint={tint} className="tech__stage">
        {/* the same words as the list below, pinned to the 3D on wide screens */}
        <div className="tags" aria-hidden="true">
          {config.layers.map((l, i) => (
            <div key={i} data-mark="" className={LAYER_SIDES[i] ? 'tag tag--right' : 'tag'}>
              <i />
              <p>
                <em>{i + 1}</em>
                <strong>{l.title}</strong>
                <span>{l.text}</span>
              </p>
            </div>
          ))}
        </div>
      </Stage>
      <ol className="tech__list">
        {config.layers.map((l, i) => (
          <li key={i}>
            <em>{i + 1}</em>
            <strong>{l.title}</strong>
            <span>{l.text}</span>
          </li>
        ))}
      </ol>
      <p className="tech__nfc" data-reveal="">
        {config.nfc}
      </p>
    </section>
  );
}
