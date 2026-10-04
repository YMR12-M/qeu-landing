import { useLocale } from '../i18n/useLocale.js';
import { LOCALES } from '../i18n/locales.js';
import { DownloadLink } from '../components/download/DownloadLink.jsx';
import { Barcode } from '../components/ui/Barcode.jsx';
import { Scribble } from '../components/ui/Scribble.jsx';
import styles from './NotFound.module.css';

/**
 * The page hosts serve for a link that leads nowhere (404.html): on the hero's teal, the
 * headline — «هالصفحة مو على الرف» — and, where the page would be, what a shop writes on an
 * empty shelf: «نفد», sold out, circled in red pen, over the page's name and a barcode. The way
 * on is the home page, the app, or the English site.
 */
export default function NotFound() {
  const { t, config } = useLocale();
  const { notFound, hero } = t;

  return (
    <section className={styles.page} aria-labelledby="not-found-title">
      <div>
        <p className={styles.eyebrow}>{notFound.eyebrow}</p>
        <h1 id="not-found-title" className={styles.title}>
          {notFound.heading}
        </h1>
        <p className={styles.text}>{notFound.text}</p>
        <div className={styles.actions}>
          <a className={styles.home} href={config.path}>
            <span className={styles.homeLabel}>{notFound.home}</span>
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

      {/* Sold out: written where the page would be, and circled. */}
      <div className={styles.soldOut} aria-hidden="true">
        <p className={styles.flag}>
          {notFound.flag}
          <Scribble shape="circle" draw="load" delay={500} className={styles.circle} />
        </p>
        <p className={styles.name}>{notFound.name}</p>
        <Barcode seed="QEU 404" count={16} className={styles.barcode} />
      </div>
    </section>
  );
}
