/*
 * The source of the images in public/images/screens.
 * Open /screens.html?screen=app&lang=en with `npm run dev` and capture #shot.
 * Replacing the image files is enough: nothing here is part of the page.
 */
import type { CSSProperties, ReactNode } from 'react';
import { Icon, type IconName } from '../components/Icon';
import type { Text } from './text';

const Agent = () => <img className="agent" src="/images/brand/agent.svg" alt="" />;
const LogoMark = () => <img className="logo-mark" src="/images/brand/logo.svg" alt="" />;

/** [day column, start hour, hours, event text index or -1 for focus, kind] */
const EVENTS: [number, number, number, number, string][] = [
  [0, 9, 1, -1, 'focus'],
  [0, 14, 1, 0, 'flag'],
  [1, 11, 1, 1, ''],
  [1, 15, 1, 2, ''],
  [2, 10, 1.5, 3, 'flag'],
  [2, 14, 2, -1, 'focus'],
  [3, 10, 1.5, 4, ''],
  [3, 13, 2, 5, ''],
  [4, 9.5, 0.5, 6, 'flag'],
  [4, 14, 1, 7, ''],
];
const RAIL: IconName[] = ['calendar', 'spark', 'moon', 'team'];

function App({ t }: { t: Text }) {
  return (
    <div className="s-app">
      <aside>
        <LogoMark />
        {RAIL.map((name, i) => (
          <i key={name} className={i === 0 ? 'is-active' : ''}>
            <Icon name={name} />
          </i>
        ))}
        <b>JM</b>
      </aside>
      <main>
        <header>
          <div>
            <h1>{t.week}</h1>
            <p>{t.range}</p>
          </div>
          <span>{t.won}</span>
        </header>
        <div className="s-cal">
          <div className="s-cal__hours">
            {[9, 10, 11, 12, 13, 14, 15, 16].map((h) => (
              <span key={h}>{h}:00</span>
            ))}
          </div>
          {t.days.map((day, col) => (
            <div key={day} className="s-cal__day">
              <p>
                {day} <b>{23 + col}</b>
              </p>
              <div>
                {EVENTS.filter((e) => e[0] === col).map(([, start, hours, text, kind]) => (
                  <span key={start} className={`s-event ${kind}`} style={{ '--from': start - 9, '--len': hours } as CSSProperties}>
                    {text < 0 && <Icon name="moon" />}
                    {text < 0 ? t.focus : t.events[text]}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
      <section>
        <header>
          <Agent />
          <div>
            <h2>Hush</h2>
            <p>{t.found}</p>
          </div>
        </header>
        {t.tips.map(([title, reason, action]) => (
          <article key={title}>
            <h3>{title}</h3>
            <p>{reason}</p>
            <div>
              <span>{action}</span>
              <span>{t.keep}</span>
            </div>
          </article>
        ))}
        <footer>{t.all}</footer>
      </section>
    </div>
  );
}

/** A feature picture: one window floating over the Hush sky. */
const Scene = ({ children }: { children: ReactNode }) => <div className="s-scene">{children}</div>;

function Skip({ t }: { t: Text }) {
  const icons: IconName[] = ['team', 'note', 'calendar'];
  return (
    <Scene>
      <div className="s-window s-invite">
        <header>
          <i>
            <Icon name="calendar" />
          </i>
          <div>
            <h2>{t.skip.name}</h2>
            <p>{t.skip.when}</p>
          </div>
        </header>
        <ul>
          {t.skip.facts.map((fact, i) => (
            <li key={fact}>
              <Icon name={icons[i]} />
              {fact}
            </li>
          ))}
        </ul>
        <div className="s-verdict">
          <Agent />
          <div>
            <h3>{t.skip.verdict}</h3>
            <p>{t.skip.saves}</p>
          </div>
        </div>
        <div className="s-buttons">
          <span>{t.skip.buttons[0]}</span>
          <span>{t.skip.buttons[1]}</span>
        </div>
      </div>
    </Scene>
  );
}

function Reply({ t }: { t: Text }) {
  return (
    <Scene>
      <div className="s-window s-reply">
        <header>
          <i>
            <Icon name="mail" />
          </i>
          <div>
            <h2>{t.reply.subject}</h2>
            <p>{t.reply.to}</p>
          </div>
        </header>
        <div className="s-reply__body">
          {t.reply.body.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        <p className="s-reply__by">
          <Agent />
          {t.reply.by}
        </p>
        <footer>
          {t.reply.tones.map((tone, i) => (
            <span key={tone} className={i === 0 ? 'is-active' : ''}>
              {tone}
            </span>
          ))}
          <b>{t.reply.send}</b>
        </footer>
      </div>
    </Scene>
  );
}

function Day({ t }: { t: Text }) {
  const [status, project, demo, sync] = t.day.meetings;
  const block = (from: number, hours: number, label: string, kind = '') => (
    <span className={`s-event ${kind}`} style={{ '--from': from, '--len': hours } as CSSProperties}>
      {label}
    </span>
  );
  return (
    <Scene>
      <div className="s-window s-day">
        <div>
          <h2>{t.day.before}</h2>
          <div>
            {block(0, 1, status, 'flag')}
            {block(1.25, 1.5, project, 'flag')}
            {block(3.5, 1, demo)}
            {block(5, 1, sync, 'flag')}
          </div>
        </div>
        <div>
          <h2 className="is-after">{t.day.after}</h2>
          <div>
            {block(0, 3, t.day.block, 'focus')}
            {block(3.5, 1, demo)}
            {block(5, 0.5, sync)}
          </div>
        </div>
      </div>
    </Scene>
  );
}

function Report({ t }: { t: Text }) {
  return (
    <div className="s-report">
      <small>{t.report.team}</small>
      <strong>{t.report.value}</strong>
      <span>{t.report.label}</span>
      <p>
        <i />
        <i />
        <i />
      </p>
      <em>{t.report.hidden}</em>
    </div>
  );
}

/** The same app on a phone: the suggestions come first, one under the other. */
function Phone({ t }: { t: Text }) {
  return (
    <div className="s-phone">
      <div>
        <p className="s-phone__status">
          <b>9:41</b>
          <i />
          <span />
        </p>
        <header>
          <LogoMark />
          <strong>Hush</strong>
          <b>JM</b>
        </header>
        <p className="s-phone__won">
          <span>
            <h1>{t.week}</h1>
            {t.range}
          </span>
          <strong>{t.won}</strong>
        </p>
        <ol>
          {t.days.map((day, i) => (
            <li key={day} className={i === 2 ? 'is-active' : ''}>
              {day}
              <b>{23 + i}</b>
            </li>
          ))}
        </ol>
        <p className="s-phone__agent">
          <Agent />
          {t.found}
        </p>
        {t.tips.map(([title, reason, action]) => (
          <article key={title}>
            <h3>{title}</h3>
            <p>{reason}</p>
            <div>
              <span>{action}</span>
              <span>{t.keep}</span>
            </div>
          </article>
        ))}
        <footer>{t.all}</footer>
        <nav>
          {RAIL.map((name, i) => (
            <i key={name} className={i === 0 ? 'is-active' : ''}>
              <Icon name={name} />
            </i>
          ))}
        </nav>
      </div>
    </div>
  );
}

export const SCREENS: Record<string, (props: { t: Text }) => ReactNode> = {
  app: App,
  'app-mobile': Phone,
  skip: Skip,
  reply: Reply,
  focus: Day,
  report: Report,
};
