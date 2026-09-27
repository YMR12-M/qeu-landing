/**
 * Supported locales and the route each one is served from.
 * `/english` keeps the URL the current site already has indexed.
 */
export const LOCALES = {
  ar: {
    code: 'ar',
    lang: 'ar',
    dir: 'rtl',
    hreflang: 'ar-SA',
    ogLocale: 'ar_SA',
    path: '/',
  },
  en: {
    code: 'en',
    lang: 'en',
    dir: 'ltr',
    hreflang: 'en',
    ogLocale: 'en_US',
    path: '/english',
  },
};

const DEFAULT_LOCALE = 'ar';

/**
 * The privacy policy in each language. Both are the URLs qeu.app already has: the Arabic
 * policy, which the store listings link to, and its English translation.
 */
export const POLICY_PATHS = {
  ar: '/policy',
  en: '/policy-english',
};

/** Whether a URL path is `path` or under it: /policy, /policy/ — but not /policy-english. */
const isAt = (pathname, path) => pathname === path || pathname.startsWith(`${path}/`);

/** Maps a URL path to a page, on the dev server: either policy → policy, anything else → home. */
export function resolvePage(pathname) {
  return Object.values(POLICY_PATHS).some((path) => isAt(pathname, path)) ? 'policy' : 'home';
}

/** Maps a URL path to a locale code: /english and /policy-english → en, anything else → ar. */
export function resolveLocale(pathname) {
  return isAt(pathname, LOCALES.en.path) || isAt(pathname, POLICY_PATHS.en) ? 'en' : DEFAULT_LOCALE;
}

/** Maps an <html lang> value back to its locale code: 'en' → en, anything unknown → ar. */
export function localeFromLang(lang) {
  return Object.values(LOCALES).find((locale) => locale.lang === lang)?.code ?? DEFAULT_LOCALE;
}

/** The locale the language switch points to. */
export function alternateLocale(code) {
  return code === 'ar' ? LOCALES.en : LOCALES.ar;
}

/**
 * Where a page is served in a locale: the home page and the policy each have one per
 * language. A page that has no other language (the 404) stands for the home page.
 */
export function pagePath(page, code) {
  return page === 'policy' ? POLICY_PATHS[code] : LOCALES[code].path;
}
