import { useEffect, useState } from 'react';
import { READING_BAND } from './useActiveSection.js';

/**
 * The sections the reader has read so far: every id whose section has crossed the reading
 * line. Sections jumped over (through a link) are not counted. Empty before hydration.
 */
export function useSeenSections(ids) {
  const [seen, setSeen] = useState(() => new Set());
  const key = ids.join(' ');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const reached = entries.filter((entry) => entry.isIntersecting);
        if (!reached.length) return;
        setSeen((previous) => {
          const next = new Set(previous);
          for (const entry of reached) next.add(entry.target.id);
          return next.size === previous.size ? previous : next;
        });
      },
      { rootMargin: READING_BAND },
    );
    for (const id of key.split(' ')) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, [key]);

  return seen;
}
