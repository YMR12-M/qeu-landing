import { lazy, Suspense } from 'react';
import { LogoSymbol } from './components/brand/Logo.jsx';
import { Footer } from './components/layout/Footer.jsx';
import { Header } from './components/layout/Header.jsx';
import { SkipLink } from './components/layout/SkipLink.jsx';
import { POLICY_CONTENTS } from './content/policy-contents.js';
import { LocaleProvider } from './i18n/LocaleProvider.jsx';
import { pageModule, PAGES } from './pages/index.js';

const LAZY_PAGES = Object.fromEntries(
  Object.entries(PAGES).map(([page, load]) => [page, lazy(load)]),
);

/**
 * The site: the navigation island, one page, the footer.
 *
 * `page` is 'home', 'policy' or 'notFound', and `copy` is the locale's copy
 * (src/content/locales). The page's component is loaded on demand — the pre-renderer waits
 * for it — unless the caller already has it (`Page`): the browser loads it first, so
 * hydration never has to wait mid-way.
 */
export function App({ locale, page = 'home', copy, Page = LAZY_PAGES[pageModule(page, locale)] }) {
  return (
    <LocaleProvider locale={locale} page={page} copy={copy}>
      {/* The wordmark, once: every logo on the page draws it from here. */}
      <LogoSymbol />
      <SkipLink />
      {/* On the policy, the island's pill and receipt list the policy's own sections. */}
      <Header sections={page === 'policy' ? POLICY_CONTENTS[locale] : undefined} />
      <main id="main" tabIndex={-1}>
        <Suspense fallback={null}>
          <Page />
        </Suspense>
      </main>
      <Footer />
    </LocaleProvider>
  );
}
