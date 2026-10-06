import { useEffect, useRef, useState } from 'react';
import { media } from '../../content/media.js';
import { useLocale } from '../../i18n/useLocale.js';
import { cx } from '../../lib/cx.js';
import { WithBrand } from '../brand/WithBrand.jsx';
import { Edge } from '../ui/Edge.jsx';
import { Picture } from '../ui/Picture.jsx';
import styles from './WhyQeu.module.css';

// Matches the CSS: narrower (or shorter) than this, the section is a plain list (no pinning).
const PINNED_QUERY = '(min-width: 48.0625em) and (min-height: 36em)';

// A promise whose first word runs longer than this is set a size smaller («اخترناها لك»).
const isLong = (sticker) => sticker.main.length > 5 || undefined;

/**
 * «ليش كيو؟» — four benefits, and the app's screen for each. On wide screens the section pins
 * while the reader scrolls through a 180vh track: scroll progress picks the open benefit and
 * its screen, and a line fills under the open benefit's title as the reader moves through it.
 * A click on a closed benefit scrolls to it, for a reader who'd rather not scroll through the
 * others. Behind the screen, the benefit's promise is set as a poster sets it — «1+1 مجاناً»,
 * «أقل سعر» — huge, in the deal yellow, and it changes with the screen.
 *
 * On phones every benefit is a slide — its screen, its promise, its words — in a row the
 * reader swipes through. All text stays in the DOM (collapsed items are clipped, not removed).
 */
export function WhyQeu() {
  const { t } = useLocale();
  const { why } = t;
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);
  const count = why.items.length;

  // Once per frame, and only while the section is on screen: scroll progress through the
  // track picks the open benefit. Leaving the screen, it is read once more, so a quick scroll
  // past still leaves the first or the last benefit open, as it should.
  useEffect(() => {
    const track = trackRef.current;
    const pinned = window.matchMedia(PINNED_QUERY);
    let frame = 0;

    const sync = () => {
      frame = 0;
      if (!pinned.matches) return;
      const { top, height } = track.getBoundingClientRect();
      const span = height - window.innerHeight;
      const progress = span > 0 ? Math.min(1, Math.max(0, -top / span)) : 0;
      const position = progress * count;
      const index = Math.min(count - 1, Math.floor(position));
      setActive(index);
      // How far through the open benefit the reader is: the line under its title fills to match.
      track.style.setProperty('--step-fill', Math.min(1, position - index).toFixed(3));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(sync);
    };

    const onScreen = new IntersectionObserver(([entry]) => {
      schedule();
      if (entry.isIntersecting) window.addEventListener('scroll', schedule, { passive: true });
      else window.removeEventListener('scroll', schedule);
    });
    onScreen.observe(track);
    window.addEventListener('resize', schedule);
    pinned.addEventListener('change', schedule);
    return () => {
      cancelAnimationFrame(frame);
      onScreen.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      pinned.removeEventListener('change', schedule);
    };
  }, [count]);

  // Pinned, a closed benefit opens on a click: the page scrolls to the start of its stretch of
  // the track. (Its text is in the DOM already, for the keyboard and screen readers.)
  const open = (index) => {
    const track = trackRef.current;
    if (index === active || !window.matchMedia(PINNED_QUERY).matches) return;
    const span = track.offsetHeight - window.innerHeight;
    const top = track.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + (span * (index + 0.1)) / count });
  };

  return (
    <section id="why" className={styles.section} aria-labelledby="why-title">
      {/* qeu.app's old anchor for this section, so links to it still land here. */}
      <span id="benefits" aria-hidden="true" />
      <div ref={trackRef} className={styles.track} data-why-track>
        <div className={styles.pin} data-why-pin>
          <div className={cx('container', styles.inner)}>
            <div className={styles.intro}>
              <h2 id="why-title" className={styles.title}>
                <WithBrand text={why.title} name={t.meta.siteName} className={styles.brand} />
              </h2>
              <p className={styles.lead}>{why.lead}</p>
            </div>

            <ol className={styles.steps} role="list">
              {why.items.map((item, index) => (
                <li
                  key={item.id}
                  className={styles.step}
                  data-why-step
                  data-active={index === active || undefined}
                  onClick={() => open(index)}
                >
                  {/* Phones: the benefit's own screen, over its promise. Pinned, the stage
                      beside the list shows them instead, and this copy is never loaded. */}
                  <div className={styles.shot}>
                    <span
                      className={styles.shotPoster}
                      data-long={isLong(item.sticker)}
                      aria-hidden="true"
                    >
                      <span>{item.sticker.main}</span> <span>{item.sticker.sub}</span>
                    </span>
                    <Picture
                      image={media.why[item.id]}
                      alt={item.imageAlt}
                      sizes={`${PINNED_QUERY} 1px, 11rem`}
                      className={styles.screen}
                    />
                  </div>
                  <h3 className={styles.stepTitle}>
                    <span className={styles.stepTitleText}>{item.title}</span>
                  </h3>
                  <div className={styles.stepBody} data-why-body>
                    <div>
                      <p className={styles.stepText}>{item.text}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
            {/* Phones: how far along the row of slides the reader has swiped. */}
            <span className={styles.swipe} aria-hidden="true" />

            {/* Pinned: the open benefit's promise, set huge, and its screen standing on it. */}
            <div className={styles.stage}>
              {why.items.map((item, index) => (
                <p
                  key={item.id}
                  className={styles.poster}
                  data-long={isLong(item.sticker)}
                  data-active={index === active || undefined}
                  aria-hidden="true"
                >
                  <span>{item.sticker.main}</span> <span>{item.sticker.sub}</span>
                </p>
              ))}
              <div className={styles.phone}>
                {why.items.map((item, index) => (
                  <Picture
                    key={item.id}
                    image={media.why[item.id]}
                    alt={item.imageAlt}
                    sizes="(min-width: 48.0625em) and (min-height: 36em) 30vh, 1px"
                    className={styles.screen}
                    data-active={index === active || undefined}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Edge kind="torn" to="var(--aqua)" />
    </section>
  );
}
