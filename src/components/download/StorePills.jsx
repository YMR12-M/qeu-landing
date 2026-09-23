import { useLocale } from '../../i18n/useLocale.js';
import { trackDownloadClick } from '../../lib/analytics.js';
import { cx } from '../../lib/cx.js';
import { getStoreHref } from '../../lib/links.js';
import { AppleLogo, GooglePlayLogo } from '../ui/icons.jsx';
import styles from './StorePills.module.css';

const STORES = [
  { id: 'googlePlay', Icon: GooglePlayLogo, variant: 'solid' },
  { id: 'appStore', Icon: AppleLogo, variant: 'outline' },
];

/** v3's stacked store pills — Google Play filled, App Store outlined — tagged per placement. */
export function StorePills({ placement, className }) {
  const { t } = useLocale();

  return (
    <ul className={cx(styles.list, className)} role="list" aria-label={t.a11y.storeLinks}>
      {STORES.map(({ id, Icon, variant }) => (
        <li key={id}>
          <a
            className={cx(styles.pill, styles[variant])}
            href={getStoreHref(id, placement)}
            target="_blank"
            rel="noopener"
            onClick={() => trackDownloadClick({ store: id, placement })}
          >
            <Icon className={styles.icon} />
            <span lang="en">{t.stores[id]}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
