import { useState } from 'react';
import type { SiteConfig } from '../content/site';
import { Checkout } from '../components/Checkout';
import { Icon } from '../components/Icon';
import { Stage } from '../components/Stage';
import { Swatches } from '../components/Swatches';
import { TINTS } from '../three/sides';

interface Props {
  config: SiteConfig['colours'];
  checkout: SiteConfig['checkout'];
  model: string;
  picked: number;
  onPick: (index: number) => void;
}

/** Straight after the opening: the sandal in 3D and its four colours. Nothing is sold: the page says so. */
export function Colours({ config, checkout, model, picked, onPick }: Props) {
  const [ordering, setOrdering] = useState(false);
  const colour = config.items[picked];
  return (
    <>
      <section id="colours" className="colours">
        <header className="head" data-reveal="">
          <h2>{config.title}</h2>
        </header>
        <Stage scene="hero" model={model} poster={picked ? colour.image : config.poster} tint={TINTS[picked]} turn={config.turn} className="colours__stage" />
        <Swatches config={config} picked={picked} onPick={onPick} />
        <button type="button" className="btn" aria-haspopup="dialog" onClick={() => setOrdering(true)}>
          <Icon name="bag" />
          {config.cta}
        </button>
      </section>
      {/* outside the section, so that the styles of the band do not reach the window */}
      {ordering && <Checkout config={checkout} colour={colour} onClose={() => setOrdering(false)} />}
    </>
  );
}
