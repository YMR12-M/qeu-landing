import { useEffect, useRef } from 'react';
import { cx } from '../../lib/cx.js';
import styles from './Reveal.module.css';

/**
 * Fades content up as it scrolls into view.
 *
 * Pre-rendered HTML is always visible: only elements that start below the fold are
 * hidden, and only once JavaScript runs — so there is no flash and nothing is lost
 * without JS. Skipped entirely for users who prefer reduced motion.
 */
export function Reveal({ as: Tag = 'div', delay = 0, className, children, ...props }) {
  const ref = useRef(null);

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
      { rootMargin: '0px 0px -12% 0px' },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={cx(styles.reveal, className)}
      style={delay ? { '--reveal-delay': `${delay}ms` } : undefined}
      {...props}
    >
      {children}
    </Tag>
  );
}
