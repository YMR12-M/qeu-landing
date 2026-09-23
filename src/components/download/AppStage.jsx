import { media } from '../../content/media.js';
import { useLocale } from '../../i18n/useLocale.js';
import { cx } from '../../lib/cx.js';
import { Logo } from '../brand/Logo.jsx';
import { Picture } from '../ui/Picture.jsx';
import { QrCard } from './QrCard.jsx';
import styles from './AppStage.module.css';

/**
 * Kept from the previous design: the app icon blown up into a stage — its aqua and the
 * white wordmark — with the real home screen standing in front and the download QR code
 * pinned to the corner for visitors on a computer.
 */
export function AppStage({ className }) {
  const { t } = useLocale();

  return (
    <div className={cx(styles.visual, className)}>
      <div className={styles.stage}>
        <Logo className={styles.logo} />
        <Picture
          image={media.stageScreen}
          alt={t.download.stageAlt}
          sizes="(min-width: 64em) 17rem, 56vw"
          className={styles.phone}
        />
      </div>
      <QrCard className={styles.qr} />
    </div>
  );
}
