import { fiveStarShare, site } from '../../content/site.js';
import { useLocale } from '../../i18n/useLocale.js';
import { cx } from '../../lib/cx.js';
import { formatDate, formatNumber, interpolate, toCompact } from '../../lib/format.js';
import { CountUp } from './CountUp.jsx';
import styles from './StatsRow.module.css';

/**
 * The four Google Play figures from v3, printed as the app's nutrition-facts label — the panel
 * on the side of every pack in the supermarket: its title and serving size, the heavy bars, one
 * figure per line, then the price, and where the figures come from in the small print. In black
 * on the white wall, each figure as large as a headline: one long strip on a computer, like the
 * linear label of a slim pack, and tall and narrow on a phone, as on a pack. Every figure is
 * read from src/content/site.js.
 */
export function StatsRow({ className }) {
  const { t, figures, locale } = useLocale();
  const { stats, dates } = t;
  // A figure as the label prints it: its prefix («+») and suffix («%») are part of it, and move
  // with its digits — «89%» is one figure, in both languages.
  const format =
    (decimals, prefix = '', suffix = '') =>
    (value) =>
      prefix + formatNumber(value, { locale, decimals }) + suffix;
  const downloads = toCompact(site.downloads); // 100_000 → 100 + the thousands unit

  const facts = [
    {
      id: 'downloads',
      name: stats.downloads.name,
      value: downloads.value,
      decimals: downloads.decimals,
      prefix: stats.downloads.prefix,
      unit: stats.downloads.unit[downloads.scale],
      detail: interpolate(stats.downloads.detail, figures),
    },
    {
      id: 'rating',
      name: stats.rating.name,
      value: site.ratings.average,
      decimals: 1,
      star: true,
      detail: stats.rating.detail,
    },
    {
      id: 'fiveStar',
      name: stats.fiveStar.name,
      value: fiveStarShare,
      suffix: stats.fiveStar.suffix,
      detail: interpolate(stats.fiveStar.detail, {
        count: formatNumber(site.ratings.distribution[5], { locale }),
      }),
    },
    {
      id: 'count',
      name: stats.count.name,
      value: site.ratings.count,
      detail: interpolate(stats.count.detail, figures),
    },
  ];

  return (
    <figure className={cx(styles.label, className)} aria-labelledby="facts-title">
      <div className={styles.head}>
        <p id="facts-title" className={styles.title}>
          <span className={styles.titleText}>{stats.title}</span>{' '}
          <span className={styles.product}>{stats.product}</span>
        </p>
        <p className={styles.serving}>
          <span>{stats.serving.label}</span>
          <span>{stats.serving.value}</span>
        </p>
      </div>

      <p className={styles.amount}>{stats.amount}</p>

      <dl className={styles.facts}>
        {facts.map((fact) => (
          <div key={fact.id} className={styles.fact}>
            <dt className={styles.name}>{fact.name}</dt>
            <dd className={styles.figure}>
              <span className={styles.number}>
                <CountUp
                  value={fact.value}
                  format={format(fact.decimals ?? 0, fact.prefix, fact.suffix)}
                />
              </span>
              {fact.unit && <span className={styles.unit}>{fact.unit}</span>}
              {fact.star && (
                <span className={styles.star} aria-hidden="true">
                  ★
                </span>
              )}
            </dd>
            <dd className={styles.detail}>{fact.detail}</dd>
          </div>
        ))}

        {/* What it all costs, after a heavier bar. */}
        <div className={cx(styles.fact, styles.price)}>
          <dt className={styles.name}>{stats.price.name}</dt>
          <dd className={styles.figure}>
            <span className={styles.free}>{stats.price.value}</span>
          </dd>
          <dd className={styles.detail}>{stats.price.detail}</dd>
        </div>
      </dl>

      <figcaption className={styles.source}>
        {interpolate(stats.source, { date: formatDate(site.capturedAt, { locale, dates }) })}
      </figcaption>
    </figure>
  );
}
