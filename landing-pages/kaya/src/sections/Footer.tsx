import type { SiteConfig } from '../content/site';
import type { Lang } from '../content/i18n';
import { Icon } from '../components/Icon';
import { Languages } from '../components/Languages';

interface Props {
  logo: SiteConfig['logo']['light'];
  links: SiteConfig['nav']['links'];
  config: SiteConfig['footer'];
  doodles: SiteConfig['doodles'];
  lang: Lang;
  onLang: (lang: Lang) => void;
}

export function Footer({ logo, links, config, doodles, lang, onLang }: Props) {
  return (
    <footer className="footer">
      <div className="footer__brand">
        <img {...logo} loading="lazy" />
        <p>{config.tagline}</p>
      </div>
      <nav aria-label="Footer">
        {links.map((l) => (
          <a key={l.href} href={l.href}>
            {l.label}
          </a>
        ))}
      </nav>
      <div className="footer__contact">
        <a className="btn btn--light" href={config.contact.href} target="_blank" rel="noopener noreferrer">
          <Icon name="chat" />
          {config.contact.label}
        </a>
        <ul>
          {config.socials.map((s) => (
            <li key={s.icon}>
              <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} title={s.label}>
                <Icon name={s.icon} />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <Languages full lang={lang} onLang={onLang} />
      <div className="footer__doodles" aria-hidden="true">
        {doodles.map((d) => (
          <img key={d.src} {...d} loading="lazy" />
        ))}
      </div>
      <p className="footer__credit">
        {config.credit.map((l) => (
          <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer">
            {l.label}
          </a>
        ))}
      </p>
    </footer>
  );
}
