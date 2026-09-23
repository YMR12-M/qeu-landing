import { Fragment, useEffect, useRef, useState } from 'react';
import { media } from '../../content/media.js';
import { useLocale } from '../../i18n/useLocale.js';
import { interpolate } from '../../lib/format.js';
import { DownloadLink } from '../download/DownloadLink.jsx';
import { Pause, Play } from '../ui/icons.jsx';
import { Picture } from '../ui/Picture.jsx';
import styles from './Hero.module.css';

// Identical sets side by side: the track slides by exactly one set, so the loop has no seam,
// and the three sets still ahead keep even an ultra-wide screen (≈4,300px) covered throughout.
const DRIFT_SETS = 4;
const DRIFT = Array.from({ length: DRIFT_SETS }, () => media.drift).flat();

/**
 * v3 hero: real app screens drift slowly behind a dark scrim, the headline sits on top.
 *
 * The headline has no entrance animation and is one block of text (lines broken with <br>),
 * so the browser measures it whole: it — not a background screen — is the page's Largest
 * Contentful Paint, and it paints with the first frame. The drift can be paused (WCAG 2.2.2),
 * stops while the hero is out of view, and is off entirely under reduced motion.
 */
export function Hero() {
  const { t, figures } = useLocale();
  const { hero } = t;
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
      <div className={styles.drift} aria-hidden="true">
        <div className={styles.track} style={{ '--drift-sets': DRIFT_SETS }}>
          {DRIFT.map((image, index) => (
            <Picture
              key={index}
              image={image}
              alt=""
              sizes="(min-width: 48em) 18rem, 10rem"
              loading="eager"
              fetchPriority="low"
              className={styles.screen}
            />
          ))}
        </div>
      </div>
      <div className={styles.scrim} />

      <div className={styles.content}>
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
