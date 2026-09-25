import { useRef } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal.js';
import { cx } from '../../lib/cx.js';
import styles from './Sticker.module.css';

// The outlines, in a 100×100 box: an 18-point starburst, and a rosette's scalloped edge
// (16 waves around a circle) with its two ribbon tails.
const BURST =
  'M50 3L56.9 10.6L66.1 5.8L70 15.4L80.2 14L80.6 24.3L90.7 26.5L87.6 36.3L96.3 41.8L90 50L96.3 58.2L87.6 63.7L90.7 73.5L80.6 75.7L80.2 86L70 84.6L66.1 94.2L56.9 89.4L50 97L43.1 89.4L33.9 94.2L30 84.6L19.8 86L19.4 75.7L9.3 73.5L12.4 63.7L3.7 58.2L10 50L3.7 41.8L12.4 36.3L9.3 26.5L19.4 24.3L19.8 14L30 15.4L33.9 5.8L43.1 10.6Z';
const SEAL =
  'M88.6 43L87.2 45.4L84.4 47.5L82.8 49.5L83.5 52L85.3 55L85.7 57.8L83.5 59.5L80.1 60.3L77.8 61.6L77.5 64.1L78 67.6L77.3 70.3L74.6 71L71.1 70.5L68.6 70.8L67.3 73.1L66.5 76.5L64.8 78.7L62 78.3L59 76.5L56.5 75.8L54.5 77.4L52.4 80.2L50 81.6L47.6 80.2L45.5 77.4L43.5 75.8L41 76.5L38 78.3L35.2 78.7L33.5 76.5L32.7 73.1L31.4 70.8L28.9 70.5L25.4 71L22.7 70.3L22 67.6L22.5 64.1L22.2 61.6L19.9 60.3L16.5 59.5L14.3 57.8L14.7 55L16.5 52L17.2 49.5L15.6 47.5L12.8 45.4L11.4 43L12.8 40.6L15.6 38.5L17.2 36.5L16.5 34L14.7 31L14.3 28.2L16.5 26.5L19.9 25.7L22.2 24.4L22.5 21.9L22 18.4L22.7 15.7L25.4 15L28.9 15.5L31.4 15.2L32.6 12.9L33.5 9.5L35.2 7.3L38 7.7L41 9.5L43.5 10.2L45.5 8.6L47.6 5.8L50 4.4L52.4 5.8L54.5 8.6L56.5 10.2L59 9.5L62 7.7L64.8 7.3L66.5 9.5L67.3 12.9L68.6 15.2L71.1 15.5L74.6 15L77.3 15.7L78 18.4L77.5 21.9L77.8 24.4L80.1 25.6L83.5 26.5L85.7 28.2L85.3 31L83.5 34L82.8 36.5L84.4 38.5L87.2 40.6Z';
const TAILS = 'M36 66 23 96l8.5-4.5L38 99l10-29ZM64 66l13 30-8.5-4.5L62 99 52 70Z';

/** Each shape: its outline(s), and the printed ring inside it. */
function Shape({ shape }) {
  switch (shape) {
    case 'burst':
      return (
        <>
          <path className={styles.body} d={BURST} />
          <circle className={styles.ring} cx="50" cy="50" r="33" />
        </>
      );
    case 'round':
      return (
        <>
          <circle className={styles.body} cx="50" cy="50" r="45" />
          <circle className={styles.ring} cx="50" cy="50" r="38" />
        </>
      );
    case 'tag':
      return (
        <>
          <rect className={styles.body} x="5" y="19" width="90" height="62" rx="11" />
          <rect className={styles.ring} x="10.5" y="24.5" width="79" height="51" rx="7" />
        </>
      );
    case 'seal':
      return (
        <>
          <path className={styles.tails} d={TAILS} />
          <path className={styles.body} d={SEAL} />
          <circle className={styles.ring} cx="50" cy="43" r="28" />
        </>
      );
    default:
      return null;
  }
}

/**
 * A supermarket promo sticker, the kind slapped onto a pack: a yellow starburst, a round
 * sticker, a red price-cut label or a rosette — die-cut, with its white edge. It only repeats
 * what the text beside it says, so it is hidden from screen readers.
 *
 * `data-state="slap"` (or a reveal, with `reveal`) slaps it on; `"off"` peels it away.
 */
export function Sticker({ shape, main, sub, reveal = false, className, ...props }) {
  const ref = useRef(null);
  const unused = useRef(null); // what the reveal watches when there is to be none: nothing
  useScrollReveal(reveal ? ref : unused);

  return (
    <span
      ref={ref}
      className={cx(styles.sticker, styles[shape], className)}
      aria-hidden="true"
      {...props}
    >
      <svg className={styles.art} viewBox="0 0 100 100" focusable="false">
        <Shape shape={shape} />
      </svg>
      <span className={styles.words}>
        <span className={styles.main}>{main}</span>
        {sub && <span className={styles.sub}>{sub}</span>}
      </span>
    </span>
  );
}
