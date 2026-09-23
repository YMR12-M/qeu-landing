import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};
const getYear = () => new Date().getFullYear();

/**
 * The current year. Pre-rendering and hydration use the year the page was built
 * (__BUILD_YEAR__, defined in vite.config.js), so the browser's first render matches the
 * HTML; right after hydration the visitor's own year replaces it if it differs. A © line
 * that reads it never goes stale between deploys.
 */
export function useCurrentYear() {
  return useSyncExternalStore(subscribe, getYear, () => __BUILD_YEAR__);
}
