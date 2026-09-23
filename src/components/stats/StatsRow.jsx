import { fiveStarShare, site } from '../../content/site.js';
import { useLocale } from '../../i18n/useLocale.js';
import { cx } from '../../lib/cx.js';
import { formatNumber, interpolate, toCompact } from '../../lib/format.js';
import { CountUp } from './CountUp.jsx';
import styles from './StatsRow.module.css';

/** The four Google Play figures from v3, all read from src/content/site.js. */
export function StatsRow({ className }) {
  const { t, figures, locale } = useLocale();
  const { stats } = t;
  const format = (decimals) => (value) => formatNumber(value, { locale, decimals });
  const downloads = toCompact(site.downloads); // 100_000 → 100 + the thousands unit

  const items = [
    {
      id: 'downloads',
      value: downloads.value,
      decimals: downloads.decimals,
      prefix: stats.downloads.prefix,
      unit: stats.downloads.unit[downloads.scale],
      label: interpolate(stats.downloads.label, figures),
    },
    {
      id: 'rating',
      value: site.ratings.average,
      decimals: 1,
      star: true,
      label: stats.rating.label,
    },
    {
      id: 'fiveStar',
      value: fiveStarShare,
      unit: stats.fiveStar.unit,
      label: interpolate(stats.fiveStar.label, {
        count: formatNumber(site.ratings.distribution[5], { locale }),
      }),
    },
    {
      id: 'count',
      value: site.ratings.count,
      label: interpolate(stats.count.label, figures),
    },
  ];

  return (
    <dl className={cx(styles.row, className)}>
      {items.map((item) => (
        <div key={item.id} className={styles.stat}>
          <dt className={styles.label}>{item.label}</dt>
          <dd className={styles.figure}>
            <span className={styles.number}>
              {item.prefix}
              <CountUp value={item.value} format={format(item.decimals ?? 0)} />
            </span>
            {item.unit && <span className={styles.unit}>{item.unit}</span>}
            {item.star && (
              <span className={styles.star} aria-hidden="true">
                ★
              </span>
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}
