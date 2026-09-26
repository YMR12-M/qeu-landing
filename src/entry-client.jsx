// The global styles first: the reset and the tokens come before every component's own rules
// in the built stylesheet, so a component's rule wins wherever the two are equally specific.
import './styles/index.css';
import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { App } from './App.jsx';
import { dictionaries } from './content/locales/index.js';
import { POLICY_META } from './content/policy-contents.js';
import { LOCALES, localeFromLang, resolveLocale, resolvePage } from './i18n/locales.js';
import { PAGES } from './pages/index.js';

const container = document.getElementById('root');
const prerendered = container.firstElementChild !== null;

// Pre-rendered HTML is hydrated in the language it was rendered in (its <html lang>), even
// when a host serves it for another URL — the page then stays consistent instead of mixing
// languages. Only the dev server, which pre-renders nothing, reads the locale from the path.
const locale = prerendered
  ? localeFromLang(document.documentElement.lang)
  : resolveLocale(window.location.pathname);
// The page, likewise: from the pre-rendered <html data-page>, or the path on the dev server.
const page = prerendered
  ? (document.documentElement.dataset.page ?? 'home')
  : resolvePage(window.location.pathname);

// The page's own chunk is loaded first, so React finds everything it hydrates in place.
PAGES[page]()
  .then(({ default: Page }) => {
    const app = (
      <StrictMode>
        <App locale={locale} page={page} Page={Page} />
      </StrictMode>
    );

    if (prerendered) {
      // Production: the HTML was pre-rendered (scripts/prerender.js) — attach to it.
      hydrateRoot(container, app);
    } else {
      // Development: nothing was pre-rendered, so set up the document and render from scratch.
      const { lang, dir } = LOCALES[locale];
      Object.assign(document.documentElement, { lang, dir });
      document.title = page === 'policy' ? POLICY_META.title : dictionaries[locale].meta.title;
      createRoot(container).render(app);
    }
  })
  .catch((error) => {
    // The page's script didn't arrive (a dropped connection): the pre-rendered page stays, and
    // reads as it does without JavaScript — the same stylesheet unpins «ليش كيو؟», stops the
    // shelf and hides the controls that would do nothing now.
    const noScript = document.createElement('link');
    noScript.rel = 'stylesheet';
    noScript.href = '/no-js.css';
    document.head.append(noScript);
    reportError(error);
  });
