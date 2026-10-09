import { Fragment, useEffect, useRef } from 'react';
import qrCode from '../../assets/qr/download-qr.svg';
import { media } from '../../content/media.js';
import { useLocale } from '../../i18n/useLocale.js';
import { cx } from '../../lib/cx.js';
import { interpolate } from '../../lib/format.js';
import { Picture } from '../ui/Picture.jsx';
import { Scribble } from '../ui/Scribble.jsx';
import styles from './Hero.module.css';

// Identical sets of the six store screenshots side by side: the row moves by exactly one set
// per loop, so the loop has no seam, and the sets still to come keep even an ultra-wide screen
// (≈4,300px) stocked.
const SETS = 4;
const STOCK = Array.from({ length: SETS }, () => media.shelf).flat();

/**
 * The hero, on the page's white wall, laid out as the client drew it — the words top left, the
 * app top right, the store's screenshots along the bottom, a product in the corner — with nothing
 * behind any of it: every picture floats on the wall, whole.
 *
 * - The words: the headline — large, heavy, in night ink — with its promise, «وأسعار ما تلاقيها
 *   إلا فيه», marked in the deal yellow as with a highlighter pen; under it the line that says
 *   what the app is for (groceries, meals and coffee, brought to the door), how many have
 *   downloaded it and, for someone reading on a computer, the download code, stuck on like a
 *   flyer's tear-off tab.
 * - The app: two of its screens, and its price — free — circled in pen across the gap between
 *   them and the words.
 * - The store's six Google Play screenshots, gliding by in the store's order, each leaning its own
 *   way; they fade in at one end of the strip and out at the other, so none is ever seen cut.
 *
 * The headline has no entrance animation and is one block of text (lines broken with <br>), so on
 * a phone it is painted with the first frame. On a computer the places are one picture, scaled
 * with the page (Hero.module.css); on a tablet two rows. On a phone the words stand in a column
 * on the reading side, and the app's two screens stand large beside them, bleeding off the
 * screen's edge and fading into the wall at their foot, «مجاناً» painted over the first; the
 * store's strip glides under them. The glide stops while the hero is out of view, and is off
 * entirely under reduced motion.
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
      <div className="container">
        <div className={styles.bento}>
          {/* The words. */}
          <div className={cx(styles.piece, styles.words)}>
            <div className={styles.copy}>
              <h1 id="hero-title" className={styles.title}>
                {hero.titleLines.map((line) => (
                  <Fragment key={line}>
                    {line} <br />
                  </Fragment>
                ))}
                <span className={styles.accent}>{hero.titleAccent}</span>
              </h1>

              <div className={styles.row}>
                {/* The tear-off tab a flyer carries at its foot, for someone reading on a
                    computer: the download code, ready for a phone's camera. (On a phone the
                    button beside it is the way.) */}
                <figure className={styles.code}>
                  <img
                    className={styles.codeImage}
                    src={qrCode}
                    width="96"
                    height="96"
                    alt={t.qr.alt}
                    decoding="async"
                  />
                  <figcaption className={styles.codeCaption}>{hero.scan}</figcaption>
                </figure>

                <div className={styles.say}>
                  <p className={styles.lead}>{hero.lead}</p>
                  <p className={styles.note}>{interpolate(hero.note, figures)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* The app: two of its screens. */}
          <div className={cx(styles.piece, styles.phones)} aria-hidden="true">
            {/* The second screen is only on a computer: lazy, so a phone, which hides it, never
                fetches it. */}
            <Picture
              image={media.why.search}
              alt=""
              sizes="(min-width: 48em) 21vw, 56vw"
              fetchPriority="low"
              className={cx(styles.phone, styles.phoneBack)}
            />
            <Picture
              image={media.why.deals}
              alt=""
              sizes="(min-width: 80em) 21vw, (min-width: 48em) 22vw, 72vw"
              loading="eager"
              className={cx(styles.phone, styles.phoneFront)}
            />
          </div>

          {/* The store's screenshots, gliding by. */}
          <div className={cx(styles.piece, styles.strip)} aria-hidden="true">
            <div className={styles.aisle}>
              {/* data-hero-drift: without JavaScript the row doesn't need to move, so no-js.css stops it. */}
              <div className={styles.track} style={{ '--sets': SETS }} data-hero-drift>
                {STOCK.map(({ image }, index) => (
                  <div key={index} className={styles.facing}>
                    <Picture
                      image={image}
                      alt=""
                      sizes="(min-width: 114em) 11.25rem, (min-width: 80em) 8vw, (min-width: 33em) 7.5rem, 22.5vw"
                      loading="eager"
                      fetchPriority="low"
                      className={styles.screen}
                    />
                  </div>
                ))}
              </div>
            </div>
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
      </div>
    </section>
  );
}
