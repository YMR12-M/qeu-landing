import { lazy, Suspense } from 'react';
import { Footer } from './components/layout/Footer.jsx';
import { Header } from './components/layout/Header.jsx';
import { SkipLink } from './components/layout/SkipLink.jsx';
import { POLICY_CONTENTS } from './content/policy-contents.js';
import { LocaleProvider } from './i18n/LocaleProvider.jsx';
import { PAGES } from './pages/index.js';

const LAZY_PAGES = Object.fromEntries(
  Object.entries(PAGES).map(([page, load]) => [page, lazy(load)]),
);

/**
 * The site: the navigation island, one page, the footer.
 *
 * `page` is 'home', 'policy' or 'notFound'. Its component is loaded on demand — the
 * pre-renderer waits for it — unless the caller already has it (`Page`): the browser loads it
 * first, so hydration never has to wait mid-way.
 */
export function App({ locale, page = 'home', Page = LAZY_PAGES[page] }) {
  return (
    <LocaleProvider locale={locale} page={page}>
      <SkipLink />
      {/* On the policy, the island's pill and receipt list the policy's own sections. */}
      <Header sections={page === 'policy' ? POLICY_CONTENTS : undefined} />
      <main id="main" tabIndex={-1}>
        <Suspense fallback={null}>
          <Page />
        </Suspense>
      </main>
      <Footer />
    </LocaleProvider>
  );
}
