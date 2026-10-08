import { useCallback, useSyncExternalStore } from 'react';

/**
 * Whether a media query matches: `false` while pre-rendering and until the page has hydrated,
 * then the browser's answer, kept up to date as the window changes.
 */
export function useMedia(query) {
  const subscribe = useCallback(
    (notify) => {
      const list = window.matchMedia(query);
      list.addEventListener('change', notify);
      return () => list.removeEventListener('change', notify);
    },
    [query],
  );
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}
