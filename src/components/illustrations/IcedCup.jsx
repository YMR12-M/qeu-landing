import { Fragment } from 'react';
import { cx } from '../../lib/cx.js';
import { Logo } from '../brand/Logo.jsx';
import styles from './IcedCup.module.css';

// A 16 oz cold cup, in a 200 × 300 box: its outline, the inside the drink fills, and its lip.
const CUP = 'M25 30 L175 30 L157.4 277 Q157 283 151 283 L49 283 Q43 283 42.6 277 Z';
const INSIDE = 'M28.5 32 L171.5 32 L154.3 274.5 Q154 279 149.5 279 L50.5 279 Q46 279 45.7 274.5 Z';
const LIP =
  'M22 29.5 Q22 25 26.5 25 L173.5 25 Q178 25 178 29.5 Q178 34 173.5 34 L26.5 34 Q22 34 22 29.5 Z';

// The ice it's packed with, as in the app's photos: [x, y, size, tilt], top to bottom.
const ICE = [
  [34, 14, 32, -10],
  [70, 8, 34, 8],
  [107, 12, 33, -6],
  [140, 18, 27, 12],
  [40, 50, 30, 6],
  [78, 45, 32, -8],
  [117, 48, 31, 10],
  [47, 86, 29, -12],
  [86, 82, 30, 5],
  [121, 86, 27, -6],
  [54, 122, 27, 8],
  [92, 119, 27, -10],
  [124, 125, 24, 4],
  [60, 158, 26, -5],
  [98, 156, 25, 9],
];
const ICE_ABOVE = 4; // the first row pokes out of the top

function cube([x, y, size, tilt]) {
  return (
    <rect
      key={`${x}-${y}`}
      x={x}
      y={y}
      width={size}
      height={size * 0.9}
      rx="6"
      transform={`rotate(${tilt} ${x + size / 2} ${y + size / 2})`}
    />
  );
}

// Beads of condensation on the outside, once the cup is cold.
const DROPS = [
  [48, 120, 2.2],
  [58, 176, 1.6],
  [52, 228, 2.4],
  [66, 252, 1.4],
  [140, 110, 1.8],
  [148, 150, 2.4],
  [136, 196, 1.5],
  [144, 238, 2.1],
  [128, 262, 1.4],
  [100, 214, 1.3],
  [84, 138, 1.2],
];

// The pistachio sauce, drizzled down the inside of the cup before the ice and the milk.
const SWIRLS = [
  'M30 56 46 276h14c-4-14 4-28-2-44s4-32-3-48 3-34-4-50 3-34-4-50c-5-12 1-22-5-28Z',
  'M169 62 154 276h-13c4-16-4-30 2-46s-4-32 3-48-3-34 4-50-3-32 4-46c4-10-2-18 4-24Z',
  'M92 110c4 14-4 26 2 40 4 10-2 20 2 28h-6c-4-10 2-20-3-30-5-14 3-26-1-38Z',
  'M118 140c4 16-4 30 2 46 4 12-2 24 2 34h-6c-4-12 2-24-3-36-5-16 3-30-1-44Z',
];

/**
 * An iced coffee in Qeu Coffee's 16 oz cup, drawn flat like the street's van: clear plastic
 * packed with ice, and the drink it's poured with — the milk rises first, then the shot runs
 * down through it — then the café's label, and the cold beading on the outside.
 * `drink` picks the colours (IcedCup.module.css); the label names the drink.
 *
 * The pour plays whenever the cup is shown, and is held while an ancestor has
 * `data-pour="waiting"` (the empty cup, with its ice). Decorative: the menu names the drink.
 */
export function IcedCup({ drink, name, size, sign, className }) {
  const id = (part) => `iced-cup-${drink}-${part}`;

  return (
    <div className={cx(styles.cup, className)} data-drink={drink} aria-hidden="true">
      <svg className={styles.art} viewBox="0 0 200 300" focusable="false">
        <defs>
          <clipPath id={id('inside')}>
            <path d={INSIDE} />
          </clipPath>
          {/* Where a stream can be seen: above the cup, and inside it — never below it. */}
          <clipPath id={id('fall')}>
            <rect x="0" y="-120" width="200" height="152" />
            <path d={INSIDE} />
          </clipPath>
          <linearGradient id={id('body')} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" className={styles.bodyTop} />
            <stop offset="1" className={styles.bodyBottom} />
          </linearGradient>
          {/* The shot: dark where it lands, thinning out as it sinks through the milk. */}
          <linearGradient id={id('shot')} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" className={styles.shotStop} />
            <stop offset="0.55" className={styles.shotStop} stopOpacity="0.7" />
            <stop offset="1" className={styles.shotStop} stopOpacity="0" />
          </linearGradient>
          {/* The streams fade in from above: poured from out of the picture — and so does the
              thin edge that keeps a pale one from vanishing into the wall. */}
          {['milk', 'coffee'].map((stream) => (
            <Fragment key={stream}>
              <linearGradient id={id(stream)} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" className={styles[`${stream}Stop`]} stopOpacity="0" />
                <stop offset="0.16" className={styles[`${stream}Stop`]} />
              </linearGradient>
              <linearGradient id={id(`${stream}-edge`)} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" className={styles.edgeStop} stopOpacity="0" />
                <stop offset="0.16" className={styles.edgeStop} />
              </linearGradient>
            </Fragment>
          ))}
        </defs>

        <path className={styles.back} d={CUP} />

        {/* Behind the drink, so each stream shows only above what's already poured. */}
        <g clipPath={`url(#${id('fall')})`}>
          <rect
            className={styles.stream}
            data-stream="milk"
            x="96.5"
            y="-80"
            width="7"
            height="360"
            rx="3.5"
            fill={`url(#${id('milk')})`}
            stroke={`url(#${id('milk-edge')})`}
          />
          <rect
            className={styles.stream}
            data-stream="coffee"
            x="97"
            y="-80"
            width="6"
            height="360"
            rx="3"
            fill={`url(#${id('coffee')})`}
            stroke={`url(#${id('coffee-edge')})`}
          />
        </g>

        <g clipPath={`url(#${id('inside')})`}>
          <g className={styles.pour}>
            <rect x="0" y="52" width="200" height="240" fill={`url(#${id('body')})`} />
            <rect
              className={styles.shot}
              x="0"
              y="52"
              width="200"
              height="130"
              fill={`url(#${id('shot')})`}
            />
            <ellipse className={styles.surface} cx="100" cy="52" rx="80" ry="3.5" />
          </g>
          {drink === 'pistachio' && (
            <g className={styles.swirls}>
              {SWIRLS.map((d) => (
                <path key={d} d={d} />
              ))}
            </g>
          )}
          {/* The ice down in the drink, clouded by it… */}
          <g className={styles.ice} data-under>
            {ICE.slice(ICE_ABOVE).map(cube)}
          </g>
        </g>

        {/* …and the top layer, standing above the rim, so it isn't cut to the cup. */}
        <g className={styles.ice}>{ICE.slice(0, ICE_ABOVE).map(cube)}</g>

        <path className={styles.glass} d={CUP} />
        <path className={styles.shine} d="M37 44 L54 268" />
        <path className={styles.shineThin} d="M161 48 L149 262" />
        <path className={styles.lip} d={LIP} />
        <g className={styles.drops}>
          {DROPS.map(([cx, cy, r]) => (
            <ellipse key={`${cx}-${cy}`} cx={cx} cy={cy} rx={r} ry={r * 1.3} />
          ))}
        </g>
      </svg>

      {/* The café's label on the cup: the wordmark and «كوفي», the drink, its size. */}
      <span className={styles.label}>
        <span className={styles.labelSign} dir="rtl" lang="ar">
          <Logo className={styles.labelLogo} />
          {sign}
        </span>
        <span className={styles.labelName}>{name}</span>
        <span className={styles.labelSize}>{size}</span>
      </span>
    </div>
  );
}
