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
    privacyPath: '/policy',
  },
  en: {
    code: 'en',
    lang: 'en',
    dir: 'ltr',
    hreflang: 'en',
    ogLocale: 'en_US',
    path: '/english',
    privacyPath: '/policy-english',
  },
};

export const DEFAULT_LOCALE = 'ar';

/** Maps a URL path to a locale code: /english → en, everything else → ar. */
export function resolveLocale(pathname) {
  return /^\/english(\/|$)/.test(pathname) ? 'en' : DEFAULT_LOCALE;
}

/** Maps an <html lang> value back to its locale code: 'en' → en, anything unknown → ar. */
export function localeFromLang(lang) {
  return Object.values(LOCALES).find((locale) => locale.lang === lang)?.code ?? DEFAULT_LOCALE;
}

/** The locale the language switch points to. */
export function alternateLocale(code) {
  return code === 'ar' ? LOCALES.en : LOCALES.ar;
}
