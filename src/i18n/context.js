import { createContext } from 'react';

/**
 * Holds { locale, page, t, figures, config, alternate, alternatePath, policyPath, sectionHref }
 * — provided by <LocaleProvider>.
 */
export const LocaleContext = createContext(null);
