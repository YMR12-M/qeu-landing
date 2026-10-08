import { useEffect, useRef } from 'react';
import { media } from '../../content/media.js';
import { useScrollReveal } from '../../hooks/useScrollReveal.js';
import { useLocale } from '../../i18n/useLocale.js';
import { Logo } from '../brand/Logo.jsx';
import { Picture } from '../ui/Picture.jsx';
import { Scribble } from '../ui/Scribble.jsx';
import { SectionHeading } from '../ui/SectionHeading.jsx';
import styles from './HowItWorks.module.css';

/**
 * Qeu's delivery van in its livery — white, two teal waves, the wordmark on the side — drawn
 * facing the way the steps read. The wordmark sits outside the SVG, so flipping the van for
 * right-to-left never mirrors the logo.
 */
function DeliveryVan() {
  return (
    <div className={styles.van}>
      <svg className={styles.vanArt} viewBox="-18 0 136 57" aria-hidden="true" focusable="false">
        <defs>
          <clipPath id="qeu-van-body">
            <path d="M5 6H71c3.6 0 6.9 1.7 9 4.6L92 27.5h12.5c4.1 0 7.5 3.4 7.5 7.5v10c0 2.2-1.8 4-4 4H5c-2.2 0-4-1.8-4-4V10c0-2.2 1.8-4 4-4Z" />
          </clipPath>
        </defs>
        <g className={styles.speed}>
          <path d="M-3 17h-12M-1 26h-16M-3 35h-9" />
        </g>
        <ellipse className={styles.vanShadow} cx="56" cy="55.6" rx="52" ry="1.9" />
        <path
          className={styles.vanBody}
          d="M5 6H71c3.6 0 6.9 1.7 9 4.6L92 27.5h12.5c4.1 0 7.5 3.4 7.5 7.5v10c0 2.2-1.8 4-4 4H5c-2.2 0-4-1.8-4-4V10c0-2.2 1.8-4 4-4Z"
        />
        <g clipPath="url(#qeu-van-body)">
          <path className={styles.waveLight} d="M0 32c20-6 38 8 62 1 17-5 34-3 52 1v18H0Z" />
          <path className={styles.waveBrand} d="M0 39c22-5 42 6 66 0 16-4 32-2 48 1v11H0Z" />
        </g>
        <path
          className={styles.vanWindow}
          d="M76 13.4c0-.9 1.2-1.3 1.8-.5L88.7 27.5H77a1 1 0 0 1-1-1Z"
        />
        <path className={styles.vanSeam} d="M66 8.5v23" />
        <rect className={styles.headlight} x="107.6" y="31" width="4" height="4.6" rx="1.2" />
        <path className={styles.bumper} d="M99 45.6h12" />
        {[25, 90].map((cx) => (
          <g key={cx} className={styles.wheel}>
            <circle className={styles.tyre} cx={cx} cy="49" r="8" />
            <circle className={styles.hub} cx={cx} cy="49" r="3.4" />
            <path className={styles.spokes} d={`M${cx} 45.6v6.8M${cx - 3.4} 49h6.8`} />
          </g>
        ))}
      </svg>
      <Logo className={styles.vanLogo} />
    </div>
  );
}

// The route, drawn in a 1200 × 150 box: from where the order starts, down and up through the three
// stops, to the door. Every curve leaves a stop level, as a hand's line does when it turns.
const W = 1200;
const H = 150;
const ROUTE =
  'M10 70C80 70 120 95 200 95C320 95 440 45 600 45C760 45 880 95 1000 95C1080 95 1120 55 1190 55';
const STOPS = [
  [200, 95],
  [600, 45],
  [1000, 95],
];
const TILT = ['-3deg', '2deg', '-2deg'];

// NaN (a window with no height yet: 0 / 0) counts as the start, or getPointAtLength throws.
const clamp = (value) => (Number.isFinite(value) ? Math.min(1, Math.max(0, value)) : 0);

/**
 * The van's drive: as the route scrolls into view the van moves along the line, the line turning
 * from dashes to solid behind it. Run by script, on scroll; without it — or with reduced motion —
 * the route stays drawn to the end with the van at the door (the CSS defaults).
 */
function useDrive(mapRef) {
  useEffect(() => {
    const map = mapRef.current;
    if (!map || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const path = map.querySelector('[data-route]');
    const done = map.querySelector('[data-done]');
    const van = map.querySelector('[data-van]');
    const length = path.getTotalLength();
    let frame = 0;

    const update = () => {
      frame = 0;
      const progress = clamp(
        (window.innerHeight * 0.9 - map.getBoundingClientRect().top) / (window.innerHeight * 0.5),
      );
      const rtl = getComputedStyle(map).direction === 'rtl';
      const here = progress * length;
      const at = path.getPointAtLength(here);
      const back = path.getPointAtLength(Math.max(0, here - 6));
      const ahead = path.getPointAtLength(Math.min(length, here + 6));
      const slope = Math.atan2((ahead.y - back.y) * (rtl ? -1 : 1), ahead.x - back.x);
      done.style.strokeDasharray = length;
      done.style.strokeDashoffset = length * (1 - progress);
      van.style.setProperty('--x', `${(((rtl ? W - at.x : at.x) / W) * 100).toFixed(3)}%`);
      van.style.setProperty('--y', `${((at.y / H) * 100).toFixed(3)}%`);
      van.style.setProperty(
        '--tilt',
        `${Math.max(-25, Math.min(25, (slope * 180) / Math.PI)).toFixed(1)}deg`,
      );
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [mapRef]);
}

/**
 * «كيف يشتغل» — the order as the route it takes, drawn by hand across the page: a dashed line
 * leaves where the order starts, turns down and up through three stops — each a pen-ringed
 * number — and ends at the door, where «طلبك وصل» is stamped. From each stop a dashed line drops
 * to what happens there: a print of the app's own screen, tossed down, and under it the step from
 * the Google Play description. As the section scrolls by, Qeu's van drives the line, turning it
 * from dashes to solid behind it. No card, no sheet: the route is on the wall.
 *
 * On a phone the route stands upright along the start edge of the steps, the numbers on it. The
 * prints are laid down, and the stamp pressed, as the route comes into view.
 */
export function HowItWorks() {
  const { t } = useLocale();
  const { inside } = t;
  const routeRef = useRef(null);
  const mapRef = useRef(null);
  useScrollReveal(routeRef, '0px 0px -12% 0px');
  useDrive(mapRef);

  return (
    <section id="inside" className={styles.section} aria-labelledby="inside-title">
      <div className="container">
        <SectionHeading id="inside-title" title={inside.title} lead={inside.lead} />

        <div ref={routeRef} className={styles.route}>
          <div ref={mapRef} className={styles.map} aria-hidden="true">
            <svg className={styles.svg} viewBox={`0 0 ${W} ${H}`} focusable="false">
              <path className={styles.dash} d={ROUTE} />
              <path className={styles.done} d={ROUTE} data-done />
              <path d={ROUTE} fill="none" stroke="none" data-route />
            </svg>
            <span className={styles.origin} />
            {STOPS.map(([x, y], index) => (
              <span
                key={x}
                className={styles.stop}
                style={{ '--x': `${(x / W) * 100}%`, '--y': `${(y / H) * 100}%` }}
              >
                <span className={styles.drop} />
                <span className={styles.pin}>
                  <Scribble shape="circle" delay={300 + index * 300} className={styles.ring} />
                  {index + 1}
                </span>
              </span>
            ))}
            <span className={styles.stamp}>{inside.arrived}</span>
            <div className={styles.driver} data-van>
              <DeliveryVan />
            </div>
          </div>

          <ol className={styles.steps} role="list">
            {inside.steps.map((step, index) => (
              <li
                key={step.id}
                className={styles.step}
                data-step={step.id}
                style={{ '--tilt': TILT[index], '--n': index }}
              >
                <span className={styles.number} aria-hidden="true">
                  {index + 1}
                </span>
                <Picture
                  image={media.steps[step.id]}
                  alt={step.imageAlt}
                  sizes="(min-width: 64em) 15rem, 40vw"
                  className={styles.print}
                />
                <h3 className={styles.title}>{step.title}</h3>
                <p className={styles.text}>{step.text}</p>
              </li>
            ))}
          </ol>

          <span className={styles.arrived} aria-hidden="true">
            {inside.arrived}
          </span>
        </div>
      </div>
    </section>
  );
}
