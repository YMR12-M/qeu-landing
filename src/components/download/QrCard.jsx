import qrCode from '../../assets/qr/download-qr.svg';
import { useLocale } from '../../i18n/useLocale.js';
import { cx } from '../../lib/cx.js';
import styles from './QrCard.module.css';

/** Desktop-only: lets someone browsing on a computer install the app with their phone camera. */
export function QrCard({ className }) {
  const { t } = useLocale();

  return (
    <div className={cx(styles.card, className)}>
      <img
        className={styles.code}
        src={qrCode}
        width="96"
        height="96"
        alt={t.qr.alt}
        loading="lazy"
        decoding="async"
      />
      <div className={styles.copy}>
        <p className={styles.title}>{t.qr.title}</p>
        <p className={styles.text}>{t.qr.text}</p>
      </div>
    </div>
  );
}
