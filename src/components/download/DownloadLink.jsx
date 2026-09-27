import { usePlatform } from '../../hooks/usePlatform.js';
import { useLocale } from '../../i18n/useLocale.js';
import { trackDownloadClick } from '../../lib/analytics.js';
import { cx } from '../../lib/cx.js';
import { getStoreHref } from '../../lib/links.js';
import { ArrowForward } from '../ui/icons.jsx';
import styles from './DownloadLink.module.css';

const STORE_BY_PLATFORM = { ios: 'appStore', android: 'googlePlay' };

/**
 * The "get the app" call: a pill (`variant="button"`) at the top of the page and in the
 * header, or a quieter text link with an arrow (`variant="link"`) closing the sections in
 * between, so the page doesn't repeat the same big button all the way down.
 *
 * On a phone it opens that phone's store directly, in the same tab so the store app can
 * take over (and can name it: `labels.ios` / `labels.android`); on a computer — and in the
 * pre-rendered HTML — it jumps to the download section, which has both stores and a QR code.
 */
export function DownloadLink({
  placement,
  size = 'md',
  variant = 'button',
  labels,
  className,
  children,
}) {
  const platform = usePlatform();
  const { sectionHref } = useLocale();
  const store = STORE_BY_PLATFORM[platform];
  const label = labels?.[platform] ?? children;
  const isLink = variant === 'link';
  const classes = isLink ? cx(styles.link, className) : cx(styles.button, styles[size], className);
  const content = isLink ? (
    <>
      <span className={styles.linkText}>{label}</span>
      <span className={styles.arrow} aria-hidden="true">
        <ArrowForward />
      </span>
    </>
  ) : (
    label
  );

  if (!store) {
    return (
      <a className={classes} href={sectionHref('download')}>
        {content}
      </a>
    );
  }

  return (
    <a
      className={classes}
      href={getStoreHref(store, placement)}
      onClick={() => trackDownloadClick({ store, placement })}
    >
      {content}
    </a>
  );
}
