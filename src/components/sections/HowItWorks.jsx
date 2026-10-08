import { useRef } from 'react';
import { media } from '../../content/media.js';
import { useScrollReveal } from '../../hooks/useScrollReveal.js';
import { useLocale } from '../../i18n/useLocale.js';
import { Picture } from '../ui/Picture.jsx';
import { Scribble } from '../ui/Scribble.jsx';
import styles from './HowItWorks.module.css';

// A screen is about a fifth of the poster's width, the van two thirds of it (a little more when the
// page reads left to right); on a phone, and on a tablet reading left to right, the screens are a
// third of it and the van all of it.
const SCREEN_SIZES = '(min-width: 52rem) min(18vw, 18.5rem), 33vw';
const VAN_SIZES = '(min-width: 52rem) min(66vw, 68rem), 100vw';
const SIZES = { offers: SCREEN_SIZES, picks: SCREEN_SIZES, delivery: VAN_SIZES };

// The digits as a marker writes them: one stroke each, in a box 60 wide and 80 tall, a little off
// true as a hand is.
const DIGITS = {
  1: 'M13 29C20 23 27 16 35 8C34 28 33 50 34 72M19 72.5C28 71.4 40 72 49 70.6',
  2: 'M11 26C13 12 27 6 38 9.5C50 13.5 49 29 39 39C30 48 19 58 12 69.5C25 67.5 38 68.3 51 66.5',
  3: 'M12 18C19 8 38 6.5 45 17C50 27 39 36 27 38C40 38 52 46 49.5 58C47 71 27 76.5 11 65',
};

// Each scrap of paper is torn its own way: its size, its tape's place and slant, and the seeds of
// the two tears — the white of the paper's core, and the yellow over it.
const SCRAPS = [
  { w: 118, h: 112, tape: [34, 58, -5], tears: [9, 21] },
  { w: 112, h: 120, tape: [30, 56, 6], tears: [14, 5] },
  { w: 122, h: 108, tape: [36, 60, -3], tears: [23, 33] },
];

/**
 * What the scraps are made with, drawn once and used by name: a torn edge (noise that nudges the
 * outline of a plain rectangle), a marker's slightly wavering line, the grain of paper, and the
 * ragged ends of a strip of tape. Zero-sized, and hidden from screen readers.
 */
function PaperFilters() {
  return (
    <svg className={styles.filters} width="0" height="0" aria-hidden="true" focusable="false">
      <defs>
        {SCRAPS.map(({ tears }, index) => (
          <g key={index}>
            <filter id={`hiw-core-${index}`} x="-12%" y="-12%" width="124%" height="124%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.11"
                numOctaves="3"
                seed={tears[0]}
                result="noise"
              />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="5.5" />
            </filter>
            <filter id={`hiw-paper-${index}`} x="-12%" y="-12%" width="124%" height="124%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.09"
                numOctaves="3"
                seed={tears[1]}
                result="noise"
              />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="6.5" />
            </filter>
          </g>
        ))}
        <filter id="hiw-ink" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.07"
            numOctaves="2"
            seed="4"
            result="noise"
          />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.2" />
        </filter>
        <filter id="hiw-tape" x="-6%" y="-20%" width="112%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.16 0.02"
            numOctaves="2"
            seed="5"
            result="noise"
          />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" />
        </filter>
        <filter id="hiw-grain" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.4  0 0 0 0 0.3  0 0 0 0 0.1  0 0 0 0.28 0"
          />
          <feComposite in2="SourceGraphic" operator="in" />
        </filter>
      </defs>
    </svg>
  );
}

/**
 * A step's number: a scrap of yellow paper torn out of a sheet and taped down, the digit written
 * on it in marker — not a printed badge. Each is torn, taped and slanted its own way.
 */
function Scrap({ index }) {
  const { w, h, tape } = SCRAPS[index];
  const [tapeLeft, tapeWidth, tapeSlant] = tape;

  return (
    <svg className={styles.scrap} viewBox={`0 0 ${w} ${h}`} aria-hidden="true" focusable="false">
      <rect
        className={styles.core}
        x="2"
        y="3"
        width={w - 4}
        height={h - 5}
        filter={`url(#hiw-core-${index})`}
      />
      <rect
        className={styles.paper}
        x="6"
        y="7"
        width={w - 12}
        height={h - 13}
        filter={`url(#hiw-paper-${index})`}
      />
      <rect
        className={styles.grain}
        x="6"
        y="7"
        width={w - 12}
        height={h - 13}
        filter="url(#hiw-grain)"
      />
      <g transform={`translate(${w / 2 - 25} ${h / 2 - 34.5}) scale(0.93)`}>
        <path className={styles.ink} d={DIGITS[index + 1]} filter="url(#hiw-ink)" />
      </g>
      <rect
        className={styles.tape}
        x={tapeLeft}
        y="-10"
        width={tapeWidth}
        height="22"
        rx="1"
        transform={`rotate(${tapeSlant} ${tapeLeft + tapeWidth / 2} 1)`}
        filter="url(#hiw-tape)"
      />
    </svg>
  );
}

/**
 * «عروضنا تجيك وبنفس السعر» — the three steps of an order as one poster on the page's wall, not
 * three cards: the app's home screen standing in front, its picks screen behind Qeu's van, and the
 * van itself across the bottom — each picture whole, large enough to read, with its number taped on
 * it by hand (a scrap of yellow paper, the digit in marker), and under the headline's «وبنفس
 * السعر» the same yellow marker as the hero's. One stroke of the marker is the ground they stand on.
 *
 * The places are in hundredths of the poster's width (the CSS), so it keeps its shape at any size;
 * on a phone the headline stands above and the pictures zigzag down the page, the van across its
 * foot. Each picture is put down as the poster comes into view — the screens, the van, the numbers.
 */
export function HowItWorks() {
  const { t } = useLocale();
  const { inside } = t;
  const stageRef = useRef(null);
  useScrollReveal(stageRef, '0px 0px -15% 0px');

  return (
    <section id="inside" className={styles.section} aria-labelledby="inside-title">
      <div className="container">
        <div className={styles.poster}>
          <div ref={stageRef} className={styles.stage}>
            <PaperFilters />

            <header className={styles.head}>
              <h2 id="inside-title" className={styles.title}>
                {inside.title} <span className={styles.accent}>{inside.titleAccent}</span>
              </h2>
              <p className={styles.lead}>{inside.lead}</p>
            </header>

            <div className={styles.sheet}>
              <ol className={styles.steps} role="list">
                {inside.steps.map((step, index) => (
                  <li
                    key={step.id}
                    className={styles.step}
                    data-step={step.id}
                    style={{ '--n': index }}
                  >
                    <div className={styles.caption}>
                      <span className={styles.number} aria-hidden="true">
                        <Scrap index={index} />
                      </span>
                      <div>
                        <h3 className={styles.name}>{step.title}</h3>
                        <p className={styles.text}>{step.text}</p>
                      </div>
                    </div>

                    <figure className={styles.piece}>
                      <Picture
                        image={media.steps[step.id]}
                        alt={step.imageAlt}
                        sizes={SIZES[step.id]}
                        className={styles.picture}
                      />
                    </figure>
                  </li>
                ))}
              </ol>

              <Scribble shape="line" delay={400} className={styles.ground} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
