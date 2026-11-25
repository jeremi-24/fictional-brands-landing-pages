import { useEffect, useState, type FormEvent } from 'react';
import type { PurchaseConfig } from '../content/types';
import { Headline } from '../components/Headline';
import { Picture } from '../components/Picture';
import { SectionMark } from '../components/SectionMark';
import './Purchase.css';

interface Props {
  config: PurchaseConfig;
  onAdd: (quantity: number) => void;
}

const MAX_QTY = 9;

export function Purchase({ config, onAdd }: Props) {
  const [variantId, setVariantId] = useState(config.variants[0].id);
  const [modeId, setModeId] = useState(config.modes[0].id);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const variant = config.variants.find((v) => v.id === variantId) ?? config.variants[0];
  const mode = config.modes.find((m) => m.id === modeId) ?? config.modes[0];
  const money = new Intl.NumberFormat(config.locale, { style: 'currency', currency: config.currency, maximumFractionDigits: 0 });
  const unit = Math.round(variant.price * mode.factor);
  const total = unit * qty;

  useEffect(() => {
    if (!added) return;
    const t = setTimeout(() => setAdded(false), 2600);
    return () => clearTimeout(t);
  }, [added]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    onAdd(qty);
    setAdded(true);
  };

  return (
    <section id={config.id} className="purchase section surface-dark" aria-label={config.eyebrow}>
      <div className="purchase__visual">
        <div className="purchase__image" data-reveal>
          <Picture image={config.image} sizes="(max-width: 900px) 100vw, 50vw" />
        </div>
      </div>

      <div className="purchase__panel">
        <SectionMark index="04" label={config.eyebrow} />
        <Headline lines={config.title} className="purchase__title" />
        <p className="purchase__body fade-up" data-reveal>
          {config.body}
        </p>

        <form className="purchase__form fade-up" data-reveal onSubmit={submit}>
          <fieldset className="choice">
            <legend className="mono">{config.labels.size}</legend>
            {config.variants.map((v) => (
              <label key={v.id} className={`choice__option ${v.id === variantId ? 'is-checked' : ''}`}>
                <input type="radio" name="variant" value={v.id} checked={v.id === variantId} onChange={() => setVariantId(v.id)} />
                <span className="choice__label">{v.label}</span>
                <span className="choice__detail mono">{v.detail}</span>
                <span className="choice__price">{money.format(Math.round(v.price * mode.factor))}</span>
              </label>
            ))}
          </fieldset>

          <fieldset className="choice choice--inline">
            <legend className="mono">{config.labels.purchase}</legend>
            {config.modes.map((m) => (
              <label key={m.id} className={`choice__option ${m.id === modeId ? 'is-checked' : ''}`}>
                <input type="radio" name="mode" value={m.id} checked={m.id === modeId} onChange={() => setModeId(m.id)} />
                <span className="choice__label">{m.label}</span>
                <span className="choice__detail mono">{m.detail}</span>
              </label>
            ))}
          </fieldset>

          <div className="purchase__row">
            <div className="stepper" role="group" aria-label={config.labels.quantity}>
              <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label={config.labels.decrease} disabled={qty <= 1}>
                −
              </button>
              <output aria-live="polite">{qty}</output>
              <button type="button" onClick={() => setQty((q) => Math.min(MAX_QTY, q + 1))} aria-label={config.labels.increase} disabled={qty >= MAX_QTY}>
                +
              </button>
            </div>

            <button type="submit" className={`purchase__cta ${added ? 'is-added' : ''}`}>
              <span className="purchase__cta-label">
                {config.cta} — {money.format(total)}
              </span>
              <span className="purchase__cta-done" aria-live="polite">
                {added ? config.addedMessage : ''}
              </span>
            </button>
          </div>
        </form>

        <ul className="purchase__assurances">
          {config.assurances.map((a) => (
            <li key={a} className="mono">
              {a}
            </li>
          ))}
        </ul>

        <ol className="purchase__ritual">
          {config.ritual.map((r, i) => (
            <li key={r.label}>
              <span className="mono">0{i + 1}</span>
              <strong>{r.label}</strong>
              <span>{r.value}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
