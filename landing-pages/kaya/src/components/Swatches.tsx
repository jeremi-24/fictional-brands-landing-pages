import type { SiteConfig } from '../content/site';

interface Props {
  config: Pick<SiteConfig['colours'], 'legend' | 'items'>;
  picked: number;
  onPick: (index: number) => void;
}

/** The four colours of the sandal, each shown as a small arched doorway. */
export function Swatches({ config, picked, onPick }: Props) {
  return (
    <fieldset className="swatches">
      <legend className="sr-only">{config.legend}</legend>
      {config.items.map((c, i) => (
        <label key={i} className={`swatch swatch--${i + 1}`}>
          <input type="radio" name="colour" checked={i === picked} onChange={() => onPick(i)} />
          <i />
          <span>{c.name}</span>
        </label>
      ))}
    </fieldset>
  );
}
