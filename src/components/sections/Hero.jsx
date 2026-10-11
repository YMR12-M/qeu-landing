import { Fragment, useEffect, useRef } from 'react';
import qrCode from '../../assets/qr/download-qr.svg';
import { media } from '../../content/media.js';
import { useLocale } from '../../i18n/useLocale.js';
import { cx } from '../../lib/cx.js';
import { Picture } from '../ui/Picture.jsx';
import { StorePills } from '../download/StorePills.jsx';
import styles from './Hero.module.css';

// Identical sets of the six store screenshots side by side: the row moves by exactly one set
// per loop, so the loop has no seam, and the sets still to come keep even an ultra-wide screen
// (≈4,300px) stocked.
const SETS = 4;
const STOCK = Array.from({ length: SETS }, () => media.shelf).flat();

/**
 * The hero, on the page's white wall, laid out as the client drew it — the words top left, the app
 * top right, the store's screenshots along the bottom — with nothing behind any of it: every
 * picture floats on the wall, whole.
 *
 * - The words: the headline, built round one word painted as a sign — «عروض», in the brand's teal
 *   over a night shadow, as the page's signs are — with its promise, «وأسعار ما تلاقيها إلا فيه»,
 *   in a deeper teal; under it the line that says what the app is for (groceries, meals and
 *   coffee, brought to the door), both stores' buttons (the app is free: each says so) and, for
 *   someone reading on a computer, the download code, stuck on like a flyer's tear-off tab.
 * - The app: two of its screens, one in front of the other.
 * - The store's six Google Play screenshots, gliding by in the store's order, each leaning its own
 *   way; they fade in at one end of the strip and out at the other, so none is ever seen cut.
 *
 * The headline has no entrance animation and is one block of text (its lines are spans), so on a
 * phone it is painted with the first frame. On a computer the places are one picture, scaled with
 * the page (Hero.module.css); on a tablet two rows. On a phone the sign stands across the whole
 * width, the words under it on the reading side and the app's two screens large beside them,
 * bleeding off the screen's edge and fading into the wall at their foot; the store's strip glides
 * under them. The glide stops while the hero is out of view, and is off entirely under reduced
 * motion.
 */
export function Hero() {
  const { t } = useLocale();
  const { hero } = t;
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
                {hero.titleParts.map((part) => {
                  const [kind, text] = Object.entries(part)[0];
                  return (
                    <Fragment key={text}>
                      <span className={kind === 'text' ? undefined : styles[kind]}>{text}</span>{' '}
                    </Fragment>
                  );
                })}
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
                  <StorePills placement="hero" size="row" className={styles.stores} />
                  <p className={styles.free}>{hero.freeNote}</p>
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

        </div>
      </div>
    </section>
  );
}
