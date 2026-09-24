import { useEffect, useState } from 'react';

// The middle fifth of the viewport: wide enough that a short section passing through on a
// quick scroll still counts.
const PASSING_BAND = '-35% 0px -45% 0px';

/**
 * The sections the reader has read so far: every id whose section has passed through the
 * middle of the screen. Sections jumped over (through a link) are not counted. Empty before
 * hydration.
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
      { rootMargin: PASSING_BAND },
    );
    for (const id of key.split(' ')) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, [key]);

  return seen;
}
