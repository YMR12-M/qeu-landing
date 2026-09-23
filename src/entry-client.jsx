import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { App } from './App.jsx';
import { dictionaries } from './content/locales/index.js';
import { LOCALES, localeFromLang, resolveLocale } from './i18n/locales.js';
import './styles/index.css';

const container = document.getElementById('root');
const prerendered = container.firstElementChild !== null;

// Pre-rendered HTML is hydrated in the language it was rendered in (its <html lang>), even
// when a host serves it for another URL — the page then stays consistent instead of mixing
// languages. Only the dev server, which pre-renders nothing, reads the locale from the path.
const locale = prerendered
  ? localeFromLang(document.documentElement.lang)
  : resolveLocale(window.location.pathname);

const app = (
  <StrictMode>
    <App locale={locale} />
  </StrictMode>
);

if (prerendered) {
  // Production: the HTML was pre-rendered (scripts/prerender.js) — attach to it.
  hydrateRoot(container, app);
} else {
  // Development: nothing was pre-rendered, so set up the document and render from scratch.
  const { lang, dir } = LOCALES[locale];
  Object.assign(document.documentElement, { lang, dir });
  document.title = dictionaries[locale].meta.title;
  createRoot(container).render(app);
}
