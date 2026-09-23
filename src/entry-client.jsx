import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { App } from './App.jsx';
import { dictionaries } from './content/locales/index.js';
import { LOCALES, resolveLocale } from './i18n/locales.js';
import './styles/index.css';

const locale = resolveLocale(window.location.pathname);
const container = document.getElementById('root');
const app = (
  <StrictMode>
    <App locale={locale} />
  </StrictMode>
);

if (container.firstElementChild) {
  // Production: the HTML was pre-rendered (scripts/prerender.js) — attach to it.
  hydrateRoot(container, app);
} else {
  // Development: nothing was pre-rendered, so set up the document and render from scratch.
  const { lang, dir } = LOCALES[locale];
  Object.assign(document.documentElement, { lang, dir });
  document.title = dictionaries[locale].meta.title;
  createRoot(container).render(app);
}
