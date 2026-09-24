import { usePlatform } from '../../hooks/usePlatform.js';
import { useLocale } from '../../i18n/useLocale.js';
import { trackDownloadClick } from '../../lib/analytics.js';
import { cx } from '../../lib/cx.js';
import { getStoreHref } from '../../lib/links.js';
import styles from './DownloadLink.module.css';

const STORE_BY_PLATFORM = { ios: 'appStore', android: 'googlePlay' };

/**
 * The primary "get the app" pill.
 *
 * On a phone it opens that phone's store directly, in the same tab so the store app can
 * take over (and can name it: `labels.ios` / `labels.android`); on a computer — and in the
 * pre-rendered HTML — it jumps to the download section, which has both stores and a QR code.
 */
export function DownloadLink({ placement, size = 'md', labels, className, children }) {
  const platform = usePlatform();
  const { sectionHref } = useLocale();
  const store = STORE_BY_PLATFORM[platform];
  const label = labels?.[platform] ?? children;
  const classes = cx(styles.button, styles[size], className);

  if (!store) {
    return (
      <a className={classes} href={sectionHref('download')}>
        {label}
      </a>
    );
  }

  return (
    <a
      className={classes}
      href={getStoreHref(store, placement)}
      onClick={() => trackDownloadClick({ store, placement })}
    >
      {label}
    </a>
  );
}
