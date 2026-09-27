// The stores' names never break across two lines («على Google / Play»): the space inside each
// becomes a no-break space, in every string of a locale's copy, so the copy can be written plainly.
const STORE_NAMES = /\b(Google|App) (Play|Store)\b/g;

/** A locale's copy as the pages use it (see above). */
export function prepareCopy(value) {
  if (typeof value === 'string') return value.replace(STORE_NAMES, '$1\u00a0$2');
  if (Array.isArray(value)) return value.map(prepareCopy);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, prepareCopy(item)]));
  }
  return value;
}
