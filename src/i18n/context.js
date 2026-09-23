import { createContext } from 'react';

/** Holds { locale, t, figures, config, alternate } — provided by <LocaleProvider>. */
export const LocaleContext = createContext(null);
