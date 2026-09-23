import { useEffect } from 'react';

/**
 * Marks an element that starts below the fold `data-reveal="pending"`, then `"shown"` once it
 * scrolls into view; the element's CSS decides what each state looks like.
 *
 * Pre-rendered HTML is always visible: nothing is hidden before JavaScript runs, nothing
 * already on screen is touched, and reduced motion skips it all — so there is no flash and
 * nothing is lost without JS.
 */
export function useScrollReveal(ref, rootMargin = '0px 0px -12% 0px') {
  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (element.getBoundingClientRect().top < window.innerHeight) return;

    element.dataset.reveal = 'pending';
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        element.dataset.reveal = 'shown';
        observer.disconnect();
      },
      { rootMargin },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, rootMargin]);
}
