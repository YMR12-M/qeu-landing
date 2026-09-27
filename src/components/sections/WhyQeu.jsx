import { useEffect, useRef, useState } from 'react';
import { media } from '../../content/media.js';
import { useLocale } from '../../i18n/useLocale.js';
import { cx } from '../../lib/cx.js';
import { WithBrand } from '../brand/WithBrand.jsx';
import { Picture } from '../ui/Picture.jsx';
import { Sticker } from '../ui/Sticker.jsx';
import styles from './WhyQeu.module.css';

// Matches the CSS: narrower (or shorter) than this, the section is a plain list (no pinning).
const PINNED_QUERY = '(min-width: 48.0625em) and (min-height: 36em)';

// Each benefit's promo sticker: its shape, and the angle it was slapped on at.
const STICKERS = {
  deals: { shape: 'burst', tilt: '-10deg' },
  search: { shape: 'round', tilt: '8deg' },
  prices: { shape: 'tag', tilt: '-7deg' },
  picks: { shape: 'seal', tilt: '6deg' },
};

/**
 * v3 «ليه كيو؟»: on wide screens the section pins while the reader scrolls through a
 * 180vh track; scroll progress picks the open benefit and the matching app screen, and the
 * open benefit's rule fills as the reader moves through it. A click on a closed benefit
 * scrolls to it, for a reader who'd rather not scroll through the others. Each benefit comes with its
 * supermarket promo sticker — a «١+١» starburst, a red «أقل سعر» label… — slapped onto the
 * screen's frame as the benefit opens.
 * On phones every benefit is a card with its own screen and sticker, in a row the reader
 * swipes through. All text stays in the DOM (collapsed items are clipped, not removed).
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
      // How far through the open benefit the reader is: its rule fills to match.
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
            <h2 id="why-title" className={styles.title}>
              <WithBrand text={why.title} name={t.meta.siteName} className={styles.brand} />
            </h2>
            <p className={styles.lead}>{why.lead}</p>

            <div className={styles.body}>
              <ol className={styles.steps} role="list">
                {why.items.map((item, index) => {
                  const { image, kind, focus } = media.why[item.id];
                  return (
                    <li
                      key={item.id}
                      className={styles.step}
                      data-why-step
                      data-active={index === active || undefined}
                      onClick={() => open(index)}
                    >
                      {/* Phones: the benefit's own screen, on its card. Pinned, the frame
                          beside the list shows it instead, and this copy is never loaded. */}
                      <div className={styles.shot}>
                        <Picture
                          image={image}
                          alt={item.imageAlt}
                          sizes={`${PINNED_QUERY} 1px, min(78vw, 19rem)`}
                          className={styles.shotScreen}
                          style={focus ? { '--focus': focus } : undefined}
                          data-kind={kind}
                        />
                      </div>
                      <span className={styles.cardSticker}>
                        <Sticker
                          shape={STICKERS[item.id].shape}
                          main={item.sticker.main}
                          sub={item.sticker.sub}
                          style={{ '--tilt': STICKERS[item.id].tilt }}
                          reveal
                        />
                      </span>
                      <div className={styles.stepHead}>
                        <span className={styles.number} aria-hidden="true">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <h3 className={styles.stepTitle}>{item.title}</h3>
                      </div>
                      <div className={styles.stepBody} data-why-body>
                        <div>
                          <p className={styles.stepText}>{item.text}</p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ol>
              {/* Phones: how far along the row of cards the reader has swiped. */}
              <span className={styles.swipe} aria-hidden="true" />

              <div className={styles.visual}>
                <div className={styles.frameBox}>
                  <div className={styles.frame}>
                    {why.items.map((item, index) => {
                      const { image, kind, focus } = media.why[item.id];
                      return (
                        <Picture
                          key={item.id}
                          image={image}
                          alt={item.imageAlt}
                          sizes="(min-width: 48.0625em) and (min-height: 36em) 45vh, 1px"
                          className={styles.screen}
                          style={focus ? { '--focus': focus } : undefined}
                          data-kind={kind}
                          data-active={index === active || undefined}
                        />
                      );
                    })}
                  </div>
                  {/* The open benefit's sticker, slapped onto the frame's corner. */}
                  {why.items.map((item, index) => (
                    <span key={item.id} className={styles.frameSticker}>
                      <Sticker
                        shape={STICKERS[item.id].shape}
                        main={item.sticker.main}
                        sub={item.sticker.sub}
                        style={{ '--tilt': STICKERS[item.id].tilt }}
                        data-state={index === active ? 'slap' : 'off'}
                      />
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
