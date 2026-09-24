import { useContext } from 'react';
import { LocaleContext } from './context.js';

/** Current locale, its copy (`t`), the figures its copy quotes, route config and page. */
export function useLocale() {
  const value = useContext(LocaleContext);
  if (!value) throw new Error('useLocale() must be used inside <LocaleProvider>.');
  return value;
}
