import { useEffect, useState } from 'react';

/** The reading line: a thin band just above the middle of the viewport. */
export const READING_BAND = '-45% 0px -54% 0px';

/**
 * "You are here": the id of the section under a thin band just above the middle of the
 * viewport, or null — at the top of the page, and before hydration, nothing is marked.
 */
export function useActiveSection(ids) {
  const [active, setActive] = useState(null);
  const key = ids.join(' ');

  useEffect(() => {
    const order = key.split(' ');
    const inBand = new Set();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) inBand.add(entry.target.id);
          else inBand.delete(entry.target.id);
        }
        setActive(order.find((id) => inBand.has(id)) ?? null);
      },
      { rootMargin: READING_BAND },
    );
    for (const id of order) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, [key]);

  return active;
}
