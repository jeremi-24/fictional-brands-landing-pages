import { useEffect, useRef, useState, type FormEvent } from 'react';
import type { SiteConfig, SiteImage } from '../content/site';
import { Icon, type IconName } from './Icon';

/** the pictures of the ways to pay, in the order of site.ts */
const METHOD_ICONS: IconName[] = ['phone', 'card', 'truck'];

interface Props {
  config: SiteConfig['checkout'];
  colour: { name: string; image: SiteImage };
  onClose: () => void;
}

/**
 * A pretend checkout, mounted while it is open. Nothing is paid, sent or stored, and the
 * page says so: keep it free of card and personal fields unless a real shop is behind it.
 */
export function Checkout({ config, colour, onClose }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [order, setOrder] = useState<{ size: string; method: string }>();
  const close = () => dialog.current?.close();

  useEffect(() => {
    if (!dialog.current!.open) dialog.current!.showModal();
  }, []);

  const confirm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const answers = new FormData(event.currentTarget);
    setOrder({ size: String(answers.get('size')), method: String(answers.get('method')) });
  };

  const choice = (name: string, legend: string, options: string[], preset?: string, icons?: IconName[]) => (
    <fieldset>
      <legend>{legend}</legend>
      <div className="chips">
        {options.map((option, i) => (
          <label key={option} className="chip">
            <input type="radio" name={name} value={option} defaultChecked={option === preset} required />
            <span>
              {icons && <Icon name={icons[i]} />}
              {option}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );

  return (
    // a click outside the panel lands on the dialog itself
    <dialog ref={dialog} className="checkout" aria-labelledby="checkout-title" onClose={onClose} onClick={(e) => e.target === e.currentTarget && close()}>
      <div className="checkout__body">
        <div className="checkout__pair">
          <img {...colour.image} />
        </div>
        {order ? (
          <div className="checkout__say" role="status">
            <h2 id="checkout-title">{config.done}</h2>
            <p>{config.summary.replace('{colour}', colour.name).replace('{size}', order.size).replace('{method}', order.method)}</p>
            <p>{config.after}</p>
            <button type="button" className="btn" onClick={close} autoFocus>
              <Icon name="cross" />
              {config.close}
            </button>
          </div>
        ) : (
          <form className="checkout__say" onSubmit={confirm}>
            <h2 id="checkout-title">{config.title}</h2>
            {choice('size', config.size, config.sizes)}
            {choice('method', config.payment, config.methods, config.methods[0], METHOD_ICONS)}
            <dl>
              <div>
                <dt>{config.colour}</dt>
                <dd>{colour.name}</dd>
              </div>
              <div>
                <dt>{config.delivery}</dt>
                <dd>{config.free}</dd>
              </div>
              <div>
                <dt>{config.total}</dt>
                <dd>{config.price}</dd>
              </div>
            </dl>
            <button type="submit" className="btn">
              <Icon name="check" />
              {config.confirm}
            </button>
            <small>{config.notice}</small>
          </form>
        )}
      </div>
      <button type="button" className="checkout__close" aria-label={config.close} onClick={close}>
        <Icon name="cross" />
      </button>
    </dialog>
  );
}
