import { createRoot } from 'react-dom/client';
import { SCREENS } from './Screens';
import { TEXT, type ScreenLang } from './text';
import './screens.css';

const query = new URLSearchParams(location.search);
const Screen = SCREENS[query.get('screen') ?? 'app'] ?? SCREENS.app;
const t = TEXT[query.get('lang') as ScreenLang] ?? TEXT.en;

createRoot(document.getElementById('root')!).render(
  <div id="shot">
    <Screen t={t} />
  </div>,
);
