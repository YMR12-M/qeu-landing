import { useMemo } from 'react';
import { dictionaries } from '../content/locales/index.js';
import { LocaleContext } from './context.js';
import { alternateLocale, LOCALES } from './locales.js';

export function LocaleProvider({ locale, children }) {
  const value = useMemo(
    () => ({
      locale,
      t: dictionaries[locale],
      config: LOCALES[locale],
      alternate: alternateLocale(locale),
    }),
    [locale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}
