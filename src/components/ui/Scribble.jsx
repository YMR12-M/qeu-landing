import { useRef } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal.js';
import { cx } from '../../lib/cx.js';
import styles from './Scribble.module.css';

// Each mark as a hand would draw it: a loop round a word that runs on past where it started,
// an underline with its second pass, a word crossed out with two quick strokes, an arrow and its
// head, a tick, a plain line drawn once. Drawn in a box they are stretched to fit
// (preserveAspectRatio="none"), at an even width. `reveal` is how the pen's progress is shown: a
// loop is uncovered round its centre, the rest along their length.
const MARKS = {
  circle: {
    viewBox: '0 0 200 100',
    reveal: 'sweep',
    strokes: ['M54 13C94 1 162 5 185 29C205 50 181 84 114 89C50 94 3 76 6 46C9 19 51 6 99 11'],
  },
  underline: {
    viewBox: '0 0 200 24',
    reveal: 'wipe',
    strokes: ['M3 13C50 6 130 4 197 9', 'M26 19C80 14 142 14 184 16'],
  },
  strike: {
    viewBox: '0 0 200 24',
    reveal: 'wipe',
    strokes: ['M2 15C52 9 128 7 198 5', 'M12 20C70 15 136 13 190 12'],
  },
  arrow: {
    viewBox: '0 0 120 80',
    reveal: 'wipe',
    strokes: ['M6 72C22 34 58 12 102 17', 'M84 4 104 17 88 33'],
  },
  tick: {
    viewBox: '0 0 40 40',
    reveal: 'wipe',
    strokes: ['M5 22 15 32 36 6'],
  },
  line: {
    viewBox: '0 0 200 10',
    reveal: 'wipe',
    strokes: ['M2 6C50 3 130 2 198 5'],
  },
};

/**
 * A pen mark on the page — a circle round a word, an underline, a word struck out, an arrow, a
 * tick, a line — uncovered as the pen would draw it. It draws as it scrolls into view
 * (`draw="reveal"`, the default), once the page has loaded (`"load"`, for what is on screen from
 * the start), or when an ancestor sets `--drawn: 1` (`"parent"`, for a mark that comes and goes
 * with a choice, even without a script). Under reduced motion it is simply there. Decorative: it
 * only marks what the text already says.
 */
export function Scribble({ shape, draw = 'reveal', delay = 0, className, style, ...props }) {
  const ref = useRef(null);
  const unused = useRef(null); // what the reveal watches when there is to be none: nothing
  useScrollReveal(draw === 'reveal' ? ref : unused);
  const { viewBox, reveal, strokes } = MARKS[shape];

  return (
    <svg
      ref={ref}
      className={cx(styles.scribble, className)}
      viewBox={viewBox}
      preserveAspectRatio="none"
      data-draw={draw}
      data-uncover={reveal}
      style={delay ? { ...style, '--draw-delay': `${delay}ms` } : style}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {strokes.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}
