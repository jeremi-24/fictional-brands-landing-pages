import { LANGS, type Lang } from '../content/i18n';

interface Props {
  lang: Lang;
  onLang: (lang: Lang) => void;
  /** full names instead of two letters */
  full?: boolean;
}

export function Languages({ lang, onLang, full }: Props) {
  return (
    <div className="langs" role="group" aria-label="Language">
      {LANGS.map((l) => (
        <button key={l.code} type="button" lang={l.code} title={l.name} aria-pressed={l.code === lang} onClick={() => onLang(l.code)}>
          {full ? l.name : l.label}
        </button>
      ))}
    </div>
  );
}
