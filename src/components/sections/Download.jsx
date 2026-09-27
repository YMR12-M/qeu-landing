import { useLocale } from '../../i18n/useLocale.js';
import { WithBrand } from '../brand/WithBrand.jsx';
import { AppStage } from '../download/AppStage.jsx';
import { StorePills } from '../download/StorePills.jsx';
import { StatsRow } from '../stats/StatsRow.jsx';
import styles from './Download.module.css';

/**
 * v3 «حمّل كيو»: the store figures, then the call to download beside the kept app stage — on a
 * computer or a tablet. On a phone the reader is holding one already: the store buttons do it.
 */
export function Download() {
  const { t } = useLocale();
  const { download } = t;

  return (
    <section id="download" className={styles.section} aria-labelledby="download-title">
      <div className="container">
        <StatsRow className={styles.stats} />

        <div className={styles.grid}>
          <div className={styles.copy}>
            <h2 id="download-title" className={styles.title}>
              <WithBrand text={download.title} name={t.meta.siteName} className={styles.brand} />
            </h2>
            <p className={styles.subtitle}>{download.subtitle}</p>
            <p className={styles.text}>{download.text}</p>
            <StorePills placement="download" className={styles.pills} />
          </div>

          <AppStage className={styles.stage} />
        </div>
      </div>
    </section>
  );
}
