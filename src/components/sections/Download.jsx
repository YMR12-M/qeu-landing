import { useLocale } from '../../i18n/useLocale.js';
import { cx } from '../../lib/cx.js';
import { WithBrand } from '../brand/WithBrand.jsx';
import { AppStage } from '../download/AppStage.jsx';
import { QrCard } from '../download/QrCard.jsx';
import { StorePills } from '../download/StorePills.jsx';
import { StatsRow } from '../stats/StatsRow.jsx';
import styles from './Download.module.css';

/**
 * «حمّل كيو» — the page ends where it began, on Qeu's teal: the store figures first, then the
 * call to download, with both stores and — on a computer — the QR code beside them, and the app
 * itself in its phone at the end, reaching down into the footer's night as the hero's screens
 * reach into the page. On a phone the reader is holding one already: the store buttons do it.
 */
export function Download() {
  const { t } = useLocale();
  const { download } = t;

  return (
    <section id="download" className={styles.section} aria-labelledby="download-title">
      <div className="container">
        <StatsRow className={styles.stats} />
      </div>

      <div className={cx('container', styles.grid)}>
        <div className={styles.copy}>
          <h2 id="download-title" className={styles.title}>
            <WithBrand text={download.title} name={t.meta.siteName} className={styles.brand} />
          </h2>
          <p className={styles.subtitle}>{download.subtitle}</p>
          <p className={styles.text}>{download.text}</p>
          <div className={styles.get}>
            <StorePills placement="download" />
            <QrCard />
          </div>
        </div>

        <AppStage className={styles.stage} />
      </div>

      {/* The footer's night, begun under the phone: the bar at the top takes it as it passes. */}
      <div className={styles.floor} data-wall aria-hidden="true" />
    </section>
  );
}
