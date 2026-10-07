import { useRef } from 'react';
import { media } from '../../content/media.js';
import { useScrollReveal } from '../../hooks/useScrollReveal.js';
import { useLocale } from '../../i18n/useLocale.js';
import { Logo } from '../brand/Logo.jsx';
import { Barcode } from '../ui/Barcode.jsx';
import { Edge } from '../ui/Edge.jsx';
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

/**
 * «كيف يشتغل» — the order, as the delivery slip a shop tears off for it, and not as a row of
 * three alike: a sheet of paper with a perforated edge, Qeu's wordmark, «بون توصيل» and a barcode
 * at its head; on it the three steps from the Google Play description as a checklist, each line
 * with its number, its words, and a red-pen tick drawn at its end as it comes into view; beside
 * the list, prints of the app's own screens tossed down together — overlapping, each at its own
 * angle, the last and largest the order with Qeu's van behind it. At the foot the route is a
 * dashed line: as the section scrolls by, the van drives along it, drawing it solid behind, to
 * where «طلبك وصل» is stamped. The drive is a CSS scroll-driven animation: no JavaScript, off
 * the main thread, and where it can't run (or motion is reduced) the van simply waits at the
 * stamp. The prints are laid down, and the stamp pressed, as the slip comes into view.
 */
export function HowItWorks() {
  const { t } = useLocale();
  const { inside } = t;
  const slipRef = useRef(null);
  useScrollReveal(slipRef, '0px 0px -12% 0px');

  return (
    <section id="inside" className={styles.section} aria-labelledby="inside-title">
      <div className="container">
        <SectionHeading id="inside-title" title={inside.title} lead={inside.lead} />

        <div ref={slipRef} className={styles.slip}>
          <div className={styles.head} aria-hidden="true">
            <Logo className={styles.logo} />
            <Barcode seed="qeu-delivery" count={38} className={styles.code} />
          </div>

          <div className={styles.body}>
            <ol className={styles.steps} role="list">
              {inside.steps.map((step, index) => (
                <li key={step.id} className={styles.step} data-step={step.id}>
                  <span className={styles.digit} aria-hidden="true">
                    {index + 1}
                  </span>
                  <div className={styles.words}>
                    <h3 className={styles.title}>{step.title}</h3>
                    <p className={styles.text}>{step.text}</p>
                  </div>
                  <span className={styles.tick} aria-hidden="true">
                    <Scribble shape="tick" delay={400 + index * 350} className={styles.pen} />
                  </span>
                </li>
              ))}
            </ol>

            <div className={styles.prints}>
              {inside.steps.map((step) => (
                <Picture
                  key={step.id}
                  image={media.steps[step.id]}
                  alt={step.imageAlt}
                  sizes="(min-width: 64em) 17rem, 40vw"
                  className={styles.print}
                  data-step={step.id}
                />
              ))}
            </div>
          </div>

          <div className={styles.foot} aria-hidden="true">
            <div className={styles.lane}>
              <span className={styles.dash} />
              <span className={styles.fill} />
              <DeliveryVan />
            </div>
            <span className={styles.stamp}>{inside.arrived}</span>
          </div>
        </div>
      </div>
      <Edge kind="sawtooth" to="var(--paper-sheet)" />
    </section>
  );
}
