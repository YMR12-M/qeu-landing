import { usePlatform } from '../../hooks/usePlatform.js';
import { useLocale } from '../../i18n/useLocale.js';
import { trackDownloadClick } from '../../lib/analytics.js';
import { cx } from '../../lib/cx.js';
import { getStoreHref, storeLinkTarget } from '../../lib/links.js';
import { AppleLogo, GooglePlayLogo } from '../ui/icons.jsx';
import styles from './StorePills.module.css';

const STORES = [
  { id: 'googlePlay', Icon: GooglePlayLogo },
  { id: 'appStore', Icon: AppleLogo },
];

/**
 * Both stores, as two solid buttons of one weight — neither store comes second — each tagged
 * with its placement. `size="sm"`: smaller, side by side (the bar's download card).
 */
export function StorePills({ placement, size = 'md', className }) {
  const { t } = useLocale();
  const target = storeLinkTarget(usePlatform());

  return (
    <ul
      className={cx(styles.list, styles[size], className)}
      role="list"
      aria-label={t.a11y.storeLinks}
    >
      {STORES.map(({ id, Icon }) => (
        <li key={id}>
          <a
            className={styles.pill}
            href={getStoreHref(id, placement)}
            {...target}
            onClick={() => trackDownloadClick({ store: id, placement })}
          >
            <Icon className={styles.icon} />
            <span className={styles.name} lang="en">
              {t.stores[id]}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
