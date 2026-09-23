import { media } from '../../content/media.js';
import { useLocale } from '../../i18n/useLocale.js';
import { cx } from '../../lib/cx.js';
import { DownloadLink } from '../download/DownloadLink.jsx';
import { Picture } from '../ui/Picture.jsx';
import styles from './Hero.module.css';

// Two identical sets side by side: the track slides by exactly one set, so the loop has no seam.
const DRIFT = [...media.drift, ...media.drift];

/**
 * v3 hero: real app screens drift slowly behind a dark scrim, the headline sits on top.
 * The headline has no entrance animation — it is readable in the first paint.
 */
export function Hero() {
  const { t } = useLocale();
  const { hero } = t;

  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.drift} aria-hidden="true">
        <div className={styles.track}>
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
            <span key={line} className={styles.line}>
              {line}{' '}
            </span>
          ))}
          <span className={cx(styles.line, styles.accent)}>{hero.titleAccent}</span>
        </h1>
        <div className={styles.actions}>
          <DownloadLink placement="hero" labels={hero.cta}>
            {hero.cta.default}
          </DownloadLink>
          <p className={styles.note}>{hero.note}</p>
        </div>
      </div>
    </section>
  );
}
