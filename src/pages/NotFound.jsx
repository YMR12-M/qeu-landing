import { useLocale } from '../i18n/useLocale.js';
import { LOCALES } from '../i18n/locales.js';
import { DownloadLink } from '../components/download/DownloadLink.jsx';
import { Barcode } from '../components/ui/Barcode.jsx';
import styles from './NotFound.module.css';

/**
 * The page hosts serve for a link that leads nowhere (404.html): the hero's shelf, empty —
 * clear dividers with nothing between them, and one label in the rail: «نفد», sold out. The
 * way on is the home page, the app, or the English site.
 */
export default function NotFound() {
  const { t, config } = useLocale();
  const { notFound, hero } = t;

  return (
    <section className={styles.page} aria-labelledby="not-found-title">
      <div className={styles.copy}>
        <p className={styles.eyebrow}>{notFound.eyebrow}</p>
        <h1 id="not-found-title" className={styles.title}>
          {notFound.heading}
        </h1>
        <p className={styles.text}>{notFound.text}</p>
        <div className={styles.actions}>
          <a className={styles.home} href={config.path}>
            {notFound.home}
          </a>
          <DownloadLink placement="not_found" labels={hero.cta}>
            {hero.cta.default}
          </DownloadLink>
        </div>
        {/* An English line on the Arabic page: it runs left to right, but lines up with the
            copy above it. */}
        <p className={styles.english}>
          <a href={LOCALES.en.path} hrefLang="en" lang="en" dir="ltr">
            {notFound.english}
          </a>
        </p>
      </div>

      <div className={styles.shelf} aria-hidden="true">
        <div className={styles.dividers}>
          {Array.from({ length: 7 }, (_, index) => (
            <span key={index} />
          ))}
        </div>
        <div className={styles.edge}>
          <span className={styles.label}>
            <span className={styles.flag}>{notFound.flag}</span>
            <span className={styles.name}>{notFound.name}</span>
            <Barcode seed="QEU 404" count={16} className={styles.barcode} />
          </span>
        </div>
      </div>
    </section>
  );
}
