import { useEffect, useRef, useState } from 'react';
import { Icon } from './Icon';

/** One preview for the whole page: any `img[data-zoom]` opens large. Tap, click or Escape closes it. */
export function Lightbox({ close }: { close: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [shot, setShot] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    const open = (e: Event) => {
      if (!(e.target instanceof Element)) return;
      let img = e.target.closest<HTMLImageElement>('img[data-zoom]');
      // a button pressed from the keyboard (detail 0) previews the picture it holds
      if (!img && e instanceof MouseEvent && e.detail === 0) img = e.target.querySelector(':scope > img[data-zoom]');
      if (!img) return;
      if (e instanceof KeyboardEvent) {
        if (e.key !== 'Enter' && e.key !== ' ') return;
        e.preventDefault();
      }
      // currentSrc is the file really shown: the phone picture on a phone
      setShot({ src: img.currentSrc || img.src, alt: img.alt });
    };
    document.addEventListener('click', open);
    document.addEventListener('keydown', open);
    return () => {
      document.removeEventListener('click', open);
      document.removeEventListener('keydown', open);
    };
  }, []);

  useEffect(() => {
    if (shot && !dialog.current?.open) dialog.current?.showModal();
  }, [shot]);

  return (
    <dialog ref={dialog} className="lightbox" aria-label={shot?.alt} onClose={() => setShot(null)} onClick={() => dialog.current?.close()}>
      {shot && <img src={shot.src} alt={shot.alt} />}
      <button type="button" aria-label={close}>
        <Icon name="cross" />
      </button>
    </dialog>
  );
}
