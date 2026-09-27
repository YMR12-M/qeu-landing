import ar from './ar.js';
import en from './en.js';
import { prepareCopy } from './prepare.js';

/**
 * Copy for every locale, keyed by locale code (both files share the same shape) — for the
 * build: the pre-renderer, the <head> and the share images. The browser loads only the
 * language of the page it shows (load.js).
 */
export const dictionaries = { ar: prepareCopy(ar), en: prepareCopy(en) };
