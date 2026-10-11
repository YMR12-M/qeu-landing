import { usePlatform } from '../../hooks/usePlatform.js';
import { useLocale } from '../../i18n/useLocale.js';
import { trackDownloadClick } from '../../lib/analytics.js';
import { cx } from '../../lib/cx.js';
import { getStoreHref, storeLinkTarget } from '../../lib/links.js';
import { AppStoreMark, PlayStoreMark } from '../ui/icons.jsx';
import styles from './StorePills.module.css';

// What each store's own badge says over its name: the stores' wording, in the stores' language.
const STORES = [
  { id: 'googlePlay', Mark: PlayStoreMark, caption: 'Get it on' },
  { id: 'appStore', Mark: AppStoreMark, caption: 'Download on the' },
];

/**
 * Both stores, as store badges: a black plate with a thin grey line, the store's own mark, a
 * small line over its name — the way the stores draw theirs, so a visitor knows them at a glance
 * — each tagged with its placement. Neither store comes second: both are one size. A badge is
 * always read left to right, as the stores set them, whatever the page's direction.
 * `size="sm"`: smaller, side by side, the name alone (the bar's download card). `size="row"`:
 * the hero's — side by side where there is room, one over the other on a phone.
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
      {STORES.map(({ id, Mark, caption }) => (
        <li key={id}>
          <a
            className={styles.pill}
            href={getStoreHref(id, placement)}
            {...target}
            onClick={() => trackDownloadClick({ store: id, placement })}
          >
            <Mark className={styles.icon} />
            <span className={styles.label} lang="en">
              <span className={styles.caption}>{caption}</span>
              <span className={styles.name}>{t.stores[id]}</span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
