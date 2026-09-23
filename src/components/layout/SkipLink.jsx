import { useLocale } from '../../i18n/useLocale.js';
import styles from './SkipLink.module.css';

/** First focusable element: lets keyboard users jump past the header. */
export function SkipLink() {
  const { t } = useLocale();

  return (
    <a className={styles.skipLink} href="#main">
      {t.a11y.skipToContent}
    </a>
  );
}
