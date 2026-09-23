import { useEffect, useRef, useState } from 'react';

const DURATION = 1100;

/**
 * A figure that counts up the first time it scrolls into view.
 *
 * The pre-rendered HTML carries the real number. Only a figure that starts fully off
 * screen is reset to zero (in an observer callback, so never visibly) and then counted
 * up; one already on screen keeps its value. Nothing moves under reduced motion.
 */
export function CountUp({ value, format, className }) {
  const ref = useRef(null);
  const [current, setCurrent] = useState(value);

  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

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
    <span ref={ref} className={className}>
      {format(current)}
    </span>
  );
}
