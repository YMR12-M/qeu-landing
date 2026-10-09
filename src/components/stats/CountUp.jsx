import { useEffect, useRef, useState } from 'react';
import { cx } from '../../lib/cx.js';
import { ANIMATE_ON_SCROLL } from '../../lib/motion.js';
import styles from './CountUp.module.css';

const DURATION = 1800;

/**
 * A figure that counts up the first time it scrolls into view.
 *
 * The pre-rendered HTML carries the real number. Only a figure that starts fully off
 * screen is reset to zero (in an observer callback, so never visibly) and then counted
 * up; one already on screen keeps its value. Nothing moves under reduced motion.
 * Screen readers (and crawlers) always get the real number: the moving one is hidden
 * from them. The final figure, unseen, holds its place and the count runs over it
 * (CountUp.module.css), so it moves nothing around it: no layout shift while it counts.
 */
export function CountUp({ value, format, className }) {
  const ref = useRef(null);
  const [current, setCurrent] = useState(value);

  useEffect(() => {
    const element = ref.current;
    if (!ANIMATE_ON_SCROLL || !element) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let armed = false;
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio === 0) {
          if (!armed) {
            armed = true;
            setCurrent(0);
          }
          return;
        }
        if (!armed) {
          observer.disconnect(); // already visible on load: leave the real figure alone
          return;
        }
        if (entry.intersectionRatio < 0.4) return;

        observer.disconnect();
        const start = performance.now();
        const tick = (now) => {
          const progress = Math.min(1, (now - start) / DURATION);
          setCurrent(value * (1 - (1 - progress) ** 3));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: [0, 0.4] },
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span ref={ref} className={cx(styles.countUp, className)}>
      <span className={styles.final} aria-hidden="true">
        {format(value)}
      </span>
      <span className={styles.current} aria-hidden="true">
        {format(current)}
      </span>
      <span className="visually-hidden">{format(value)}</span>
    </span>
  );
}
