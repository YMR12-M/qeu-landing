/**
 * The site's pages. Each is its own chunk, so a page's code — and, for the policy, its whole
 * text — is only downloaded where it's shown. The policy has one per language, so each of its
 * two pages downloads only its own text. The pre-renderer waits for a page's chunk; the browser
 * loads it before hydrating (src/entry-client.jsx), with a modulepreload in the HTML so it
 * arrives alongside the main script (scripts/prerender.js).
 */
export const PAGES = {
  home: () => import('./Home.jsx'),
  policy: () => import('./Policy.jsx'),
  policyEnglish: () => import('./PolicyEnglish.jsx'),
  notFound: () => import('./NotFound.jsx'),
};

/** Each page's module, as the build manifest names it (for its modulepreload links). */
export const PAGE_MODULES = {
  home: 'src/pages/Home.jsx',
  policy: 'src/pages/Policy.jsx',
  policyEnglish: 'src/pages/PolicyEnglish.jsx',
  notFound: 'src/pages/NotFound.jsx',
};

/** Which of the modules above renders `page` in `locale`: the policy's English is its own. */
export function pageModule(page, locale) {
  return page === 'policy' && locale === 'en' ? 'policyEnglish' : page;
}
