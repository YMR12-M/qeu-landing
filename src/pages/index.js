/**
 * The site's pages. Each is its own chunk, so a page's code — and, for the policy, its whole
 * text — is only downloaded where it's shown. The pre-renderer waits for a page's chunk; the
 * browser loads it before hydrating (src/entry-client.jsx), with a modulepreload in the HTML
 * so it arrives alongside the main script (scripts/prerender.js).
 */
export const PAGES = {
  home: () => import('./Home.jsx'),
  policy: () => import('./Policy.jsx'),
  notFound: () => import('./NotFound.jsx'),
};

/** Each page's module, as the build manifest names it (for its modulepreload links). */
export const PAGE_MODULES = {
  home: 'src/pages/Home.jsx',
  policy: 'src/pages/Policy.jsx',
  notFound: 'src/pages/NotFound.jsx',
};
