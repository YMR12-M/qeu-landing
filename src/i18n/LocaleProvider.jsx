import { useMemo } from 'react';
import { figuresFor } from '../content/figures.js';
import { dictionaries } from '../content/locales/index.js';
import { LocaleContext } from './context.js';
import { alternateLocale, LOCALES, POLICY_PATH } from './locales.js';

/**
 * The locale, its copy and figures — and the page being shown, so links to the home page's
 * sections work from every page: `#faq` on the home page, `/#faq` from the privacy policy.
 */
export function LocaleProvider({ locale, page = 'home', children }) {
  const value = useMemo(() => {
    const config = LOCALES[locale];
    return {
      locale,
      page,
      t: dictionaries[locale],
      figures: figuresFor(locale),
      config,
      alternate: alternateLocale(locale),
      policyPath: POLICY_PATH,
      sectionHref: (id) => (page === 'home' ? `#${id}` : `${config.path}#${id}`),
    };
  }, [locale, page]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}
