import { useLocale } from '../../i18n/useLocale.js';
import { Logo } from '../brand/Logo.jsx';
import { Bag, House, Palm, Pin, Skyline, Store } from '../illustrations/Street.jsx';
import { Reveal } from '../ui/Reveal.jsx';
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
 * «كيف يشتغل» — the order's route, as a street. Three steps from the Google Play description,
 * each written under its stop, as a tracker labels its own: Qeu's store at the first, the pin
 * where the order is placed at the second, your house at the third. As the section scrolls by, Qeu's van drives
 * from the store to your door, drawing the route behind it and lighting each stop it reaches —
 * the way the app tracks an order step by step — and the bag is at the door when it arrives.
 * The motion is a CSS scroll-driven animation: no JavaScript, off the main thread, and where
 * it can't run (or motion is reduced) the van simply waits at the door.
 */
export function HowItWorks() {
  const { t } = useLocale();
  const { inside } = t;

  return (
    <section id="inside" className={styles.section} aria-labelledby="inside-title">
      <div className="container">
        <SectionHeading id="inside-title" title={inside.title} lead={inside.lead} />

        <div className={styles.route} aria-hidden="true">
          <Skyline className={styles.skyline} />
          <Store className={styles.store} />
          <Palm className={styles.palm} data-at="1" />
          <Pin className={styles.pin} />
          <Palm className={styles.palm} data-at="2" />
          <div className={styles.home}>
            <House className={styles.house} />
            <Bag className={styles.bag} />
            <span className={styles.bubble}>{inside.arrived}</span>
          </div>
          <span className={styles.walk} />
          <span className={styles.road} />
          <span className={styles.fill} />
          {inside.steps.map((step, index) => (
            <span key={step.id} className={styles.stop} data-stop={index + 1}>
              <span className={styles.dot} />
            </span>
          ))}
          <DeliveryVan />
        </div>

        <ol className={styles.steps} role="list">
          {inside.steps.map((step, index) => (
            <Reveal
              as="li"
              key={step.id}
              className={styles.step}
              data-step={step.id}
              delay={index * 150}
            >
              <span className={styles.number} aria-hidden="true">
                {index + 1}
              </span>
              <h3 className={styles.title}>{step.title}</h3>
              <p className={styles.text}>{step.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
