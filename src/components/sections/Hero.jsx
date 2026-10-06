import { Fragment, useEffect, useRef } from 'react';
import qrCode from '../../assets/qr/download-qr.svg';
import { media } from '../../content/media.js';
import { useLocale } from '../../i18n/useLocale.js';
import { cx } from '../../lib/cx.js';
import { interpolate } from '../../lib/format.js';
import { DownloadLink } from '../download/DownloadLink.jsx';
import { Edge } from '../ui/Edge.jsx';
import { Picture } from '../ui/Picture.jsx';
import { Scribble } from '../ui/Scribble.jsx';
import styles from './Hero.module.css';

// Identical sets of the six store screenshots side by side: the row moves by exactly one set
// per loop, so the loop has no seam, and the sets still to come keep even an ultra-wide screen
// (≈4,300px) stocked.
const SETS = 4;
const STOCK = Array.from({ length: SETS }, () => media.shelf).flat();

/**
 * The hero: a wall of Qeu's own teal with the headline set on it as a poster sets it — large,
 * heavy, in night ink — and its promise, «وأسعار ما تلاقيها إلا فيه», marked in the deal yellow
 * as with a highlighter pen. At its end the app's price, circled by the same pen: free.
 *
 * Under it the app's six Google Play screenshots glide by in the store's order, each with its
 * yellow offer flag: all deals, from one end of the row to the other. The row stays within the
 * page's margins — the screens fade in at one edge of the content and out at the other, so
 * none is ever seen cut in half. The headline has no entrance animation and is one block of
 * text (lines broken with <br>), so it — not a screen — is the page's Largest Contentful
 * Paint, painted with the first frame. The motion stops while the hero is out of view,
 * and is off entirely under reduced motion.
 */
export function Hero() {
  const { t, figures } = useLocale();
  const { hero } = t;
  const { shelf } = hero;
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const observer = new IntersectionObserver(([entry]) =>
      section.toggleAttribute('data-offscreen', !entry.isIntersecting),
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="hero" className={styles.hero} aria-labelledby="hero-title">
      {/* The shop's awning, hanging from the bar. */}
      <Edge kind="awning" />
      <div className={cx('container', styles.head)}>
        <h1 id="hero-title" className={styles.title}>
          {hero.titleLines.map((line) => (
            <Fragment key={line}>
              {line} <br />
            </Fragment>
          ))}
          <span className={styles.accent}>{hero.titleAccent}</span>
        </h1>

        <div className={styles.actions}>
          <DownloadLink placement="hero" labels={hero.cta}>
            {hero.cta.default}
          </DownloadLink>
          <p className={styles.note}>{interpolate(hero.note, figures)}</p>
        </div>

        {/* The tear-off coupon a flyer carries at its foot, for someone reading on a computer: the
            download code, ready for a phone's camera. (On a phone the button above is the way.) */}
        <div className={styles.coupon}>
          <div className={styles.couponCopy}>
            <p className={styles.couponTitle}>{t.qr.title}</p>
            <p className={styles.couponText}>{t.qr.text}</p>
          </div>
          <img
            className={styles.couponCode}
            src={qrCode}
            width="96"
            height="96"
            alt={t.qr.alt}
            decoding="async"
          />
        </div>

        {/* The app's own price, as a flyer prints it — and circled. */}
        <p className={styles.price} aria-hidden="true">
          <span className={styles.priceName}>{shelf.app}</span>
          <span className={styles.priceValue}>
            {shelf.price}
            <Scribble shape="circle" draw="load" delay={1100} className={styles.priceCircle} />
          </span>
        </p>
      </div>

      <div className={styles.floor} data-wall aria-hidden="true" />

      <div className={styles.stock}>
        <div className={styles.aisle} aria-hidden="true">
          {/* data-hero-drift: without JavaScript the row doesn't need to move, so no-js.css stops it. */}
          <div className={styles.track} style={{ '--sets': SETS }} data-hero-drift>
            {STOCK.map(({ id, image }, index) => (
              <div key={index} className={styles.facing}>
                <Picture
                  image={image}
                  alt=""
                  sizes="(min-width: 114em) 11.25rem, (min-width: 64em) 9.75vw, (min-width: 33em) 7.5rem, 22.5vw"
                  loading="eager"
                  fetchPriority="low"
                  className={styles.product}
                />
                <span className={styles.label}>
                  <span className={styles.flag}>{shelf.offer}</span>
                  <span className={styles.name}>{shelf.labels[id]}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
