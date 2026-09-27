import { formatCompact, formatNumber, formatPlural } from '../lib/format.js';
import { site } from './site.js';

const DAY = 86_400_000;
const AVERAGE_MONTH_DAYS = 365.25 / 12;

/** Whole months between two ISO dates, rounded: 2026-01-25 → 2026-09-20 is 8. */
const monthsBetween = (from, to) =>
  Math.round((Date.parse(to) - Date.parse(from)) / DAY / AVERAGE_MONTH_DAYS);

/**
 * The figures the copy quotes as {tokens}, formatted for one locale from src/content/site.js,
 * so a new capture of the store listing is a one-file change:
 *   {downloads}  "١٠٠ ألف" / "100K"      {months}     "٨ شهور" / "8 months"
 *   {allRatings} "١٫٣ ألف" / "1.3K"
 *   {package}    "sa.qeu1.app"          {androidMin} "٧٫٠" / "7.0"
 *                                        {iosMin}     "١٥٫٠" / "15.0"
 * `copy` is the locale's copy (src/content/locales), for its words for numbers.
 */
export function figuresFor(locale, copy) {
  const { numbers } = copy;
  const months = monthsBetween(site.app.releasedAt, site.capturedAt);
  // A version is written as the store writes it: "7.0", not "7".
  const version = (value) =>
    formatNumber(Number(value), {
      locale,
      decimals: value.split('.')[1]?.length ?? 0,
      grouping: false,
    });

  return {
    downloads: formatCompact(site.downloads, { locale, numbers }),
    months: formatPlural(months, numbers.months, { locale }),
    allRatings: formatCompact(site.ratings.total, { locale, numbers }),
    package: site.app.androidPackage,
    androidMin: version(site.app.androidMinVersion),
    iosMin: version(site.app.iosMinVersion),
  };
}
