import { prepareCopy } from './prepare.js';

/**
 * Each locale's copy as a chunk of its own, for the browser: a page downloads only its own
 * language. The page's HTML preloads it beside the page's chunk (scripts/prerender.js), and
 * the page hydrates once both have arrived (src/entry-client.jsx).
 */
export const loadDictionary = {
  ar: () => import('./ar.js').then(({ default: copy }) => prepareCopy(copy)),
  en: () => import('./en.js').then(({ default: copy }) => prepareCopy(copy)),
};

/** Each locale's module, as the build manifest names it (for its modulepreload link). */
export const DICTIONARY_MODULES = {
  ar: 'src/content/locales/ar.js',
  en: 'src/content/locales/en.js',
};
