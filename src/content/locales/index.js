import ar from './ar.js';
import en from './en.js';

// The stores' names never break across two lines («على Google / Play»): the space inside each
// becomes a no-break space, in every string of both files, so the copy can be written plainly.
const STORE_NAMES = /\b(Google|App) (Play|Store)\b/g;

function keepStoreNamesTogether(value) {
  if (typeof value === 'string') return value.replace(STORE_NAMES, '$1\u00a0$2');
  if (Array.isArray(value)) return value.map(keepStoreNamesTogether);
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, keepStoreNamesTogether(item)]),
    );
  }
  return value;
}

/** Copy for every locale, keyed by locale code. Both files share the same shape. */
export const dictionaries = { ar: keepStoreNamesTogether(ar), en: keepStoreNamesTogether(en) };
