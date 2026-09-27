import { useMemo } from 'react';
import { figuresFor } from '../content/figures.js';
import { LocaleContext } from './context.js';
import { alternateLocale, LOCALES, pagePath, POLICY_PATHS } from './locales.js';

/**
 * The locale, its copy (`copy`, src/content/locales) and figures — and the page being shown,
 * so links to the home page's sections work from every page: `#faq` on the home page, `/#faq`
 * from the privacy policy. `alternatePath` is this page in the other language (the site's home
 * page for a page that has none), and `policyPath` the policy in this one.
 */
export function LocaleProvider({ locale, page = 'home', copy, children }) {
  const value = useMemo(() => {
    const config = LOCALES[locale];
    const alternate = alternateLocale(locale);
    return {
      locale,
      page,
      t: copy,
      figures: figuresFor(locale, copy),
      config,
      alternate,
      alternatePath: pagePath(page, alternate.code),
      policyPath: POLICY_PATHS[locale],
      sectionHref: (id) => (page === 'home' ? `#${id}` : `${config.path}#${id}`),
    };
  }, [locale, page, copy]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}
