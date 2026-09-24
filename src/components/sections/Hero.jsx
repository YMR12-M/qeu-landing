import { Fragment, useEffect, useRef, useState } from 'react';
import { media } from '../../content/media.js';
import { useLocale } from '../../i18n/useLocale.js';
import { interpolate } from '../../lib/format.js';
import { DownloadLink } from '../download/DownloadLink.jsx';
import { Barcode } from '../ui/Barcode.jsx';
import { Pause, Play } from '../ui/icons.jsx';
import { Picture } from '../ui/Picture.jsx';
import styles from './Hero.module.css';

// Identical sets of the six store screenshots side by side: the shelf moves by exactly one set
// per loop, so the loop has no seam, and the sets still to come keep even an ultra-wide screen
// (≈4,300px) stocked.
const SETS = 4;
const STOCK = Array.from({ length: SETS }, () => media.shelf).flat();

/**
 * «رف العروض» — the hero is a supermarket shelf at night. The app's six Google Play
 * screenshots stand on it like products, all one size and in the store's order, lit from
 * above; every label on the shelf edge is a yellow offer label: all deals, from one end of the
 * shelf to the other. The headline is on display at the head of the shelf, with the app's own
 * price label under it: free.
 *
 * The shelf glides slowly and steadily away from the headline, like walking down the aisle.
 * The headline has no entrance animation and is one block of text (lines broken with <br>),
 * so it — not a product — is the page's Largest Contentful Paint, painted with the first
 * frame. The motion can be paused (WCAG 2.2.2), stops while the hero is out of view, and is
 * off entirely under reduced motion.
 */
export function Hero() {
  const { t, figures } = useLocale();
  const { hero } = t;
  const { shelf } = hero;
  const sectionRef = useRef(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const observer = new IntersectionObserver(([entry]) =>
      section.toggleAttribute('data-offscreen', !entry.isIntersecting),
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="top"
      className={styles.hero}
      data-paused={paused || undefined}
      aria-labelledby="hero-title"
    >
      <div className={styles.shelf}>
        <div className={styles.display}>
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
        </div>

        <div className={styles.aisle} aria-hidden="true">
          <div className={styles.track} style={{ '--sets': SETS }}>
            {STOCK.map(({ id, image }, index) => (
              <div key={index} className={styles.facing}>
                <Picture
                  image={image}
                  alt=""
                  sizes="(min-width: 110em) 14rem, (min-width: 64em) 12.5vw, (min-width: 30em) 8.5rem, 28vw"
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

        <div className={styles.edge} aria-hidden="true">
          <span className={styles.priceTag}>
            <span className={styles.priceName}>{shelf.app}</span>
            <span className={styles.price}>{shelf.price}</span>
            <Barcode seed="QEU APP" count={18} className={styles.priceBarcode} />
          </span>
        </div>
      </div>

      <button
        type="button"
        className={styles.motionToggle}
        aria-label={paused ? t.a11y.playMotion : t.a11y.pauseMotion}
        onClick={() => setPaused((value) => !value)}
      >
        {paused ? <Play className={styles.motionIcon} /> : <Pause className={styles.motionIcon} />}
      </button>
    </section>
  );
}
