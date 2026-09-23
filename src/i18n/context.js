import { createContext } from 'react';

/** Holds { locale, t, config, alternate } — provided by <LocaleProvider>. */
export const LocaleContext = createContext(null);
