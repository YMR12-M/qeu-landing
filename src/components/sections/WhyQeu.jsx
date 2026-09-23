import { useEffect, useRef, useState } from 'react';
import { media } from '../../content/media.js';
import { useLocale } from '../../i18n/useLocale.js';
import { cx } from '../../lib/cx.js';
import { Picture } from '../ui/Picture.jsx';
import styles from './WhyQeu.module.css';

// Matches the CSS breakpoint below which the section is a plain list (no pinning).
const PINNED_QUERY = '(min-width: 48.0625em)';

/**
 * v3 «ليه كيو؟»: on wide screens the section pins while the reader scrolls through a
 * 250vh track; scroll progress picks the open benefit and the matching app screen.
 * On phones every benefit is open and the screens are hidden, as in v3.
 * All text stays in the DOM (collapsed items are clipped, not removed).
 */
export function WhyQeu() {
  const { t } = useLocale();
  const { why } = t;
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);
  const count = why.items.length;

  useEffect(() => {
    const track = trackRef.current;
    const pinned = window.matchMedia(PINNED_QUERY);

    const sync = () => {
      if (!pinned.matches) return;
      const { top, height } = track.getBoundingClientRect();
      const span = height - window.innerHeight;
      const progress = span > 0 ? Math.min(1, Math.max(0, -top / span)) : 0;
      setActive(Math.min(count - 1, Math.floor(progress * count)));
    };

    const frame = requestAnimationFrame(sync);
    window.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', sync);
      window.removeEventListener('resize', sync);
    };
  }, [count]);

  return (
    <section id="why" className={styles.section} aria-labelledby="why-title">
      <div ref={trackRef} className={styles.track}>
        <div className={styles.pin}>
          <div className={cx('container', styles.inner)}>
            <h2 id="why-title" className={styles.title}>
              {why.title}
            </h2>
            <p className={styles.lead}>{why.lead}</p>

            <div className={styles.body}>
              <ol className={styles.steps} role="list">
                {why.items.map((item, index) => (
                  <li
                    key={item.id}
                    className={styles.step}
                    data-active={index === active || undefined}
                  >
                    <div className={styles.stepHead}>
                      <span className={styles.number} aria-hidden="true">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h3 className={styles.stepTitle}>{item.title}</h3>
                    </div>
                    <div className={styles.stepBody}>
                      <div>
                        <p className={styles.stepText}>{item.text}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>

              <div className={styles.visual}>
                <div className={styles.frame}>
                  {why.items.map((item, index) => {
                    const { image, kind, focus } = media.why[item.id];
                    return (
                      <Picture
                        key={item.id}
                        image={image}
                        alt={item.imageAlt}
                        sizes="(min-width: 48.0625em) 45vh, 1px"
                        className={styles.screen}
                        style={focus ? { '--focus': focus } : undefined}
                        data-kind={kind}
                        data-active={index === active || undefined}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
