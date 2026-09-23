import { useSyncExternalStore } from 'react';

function detectPlatform() {
  const { userAgent, maxTouchPoints } = navigator;
  // iPadOS reports itself as a Mac; a touch screen gives it away.
  if (/iPad|iPhone|iPod/.test(userAgent) || (/Macintosh/.test(userAgent) && maxTouchPoints > 1)) {
    return 'ios';
  }
  if (/Android/i.test(userAgent)) return 'android';
  return 'desktop';
}

const subscribe = () => () => {};

/**
 * 'ios' | 'android' | 'desktop' in the browser, 'unknown' while pre-rendering.
 * Pre-rendered HTML always gets the neutral link; the browser swaps in the store
 * that matches the device right after hydration, without a mismatch.
 */
export function usePlatform() {
  return useSyncExternalStore(subscribe, detectPlatform, () => 'unknown');
}
