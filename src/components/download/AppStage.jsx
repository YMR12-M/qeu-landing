import { media } from '../../content/media.js';
import { useLocale } from '../../i18n/useLocale.js';
import { cx } from '../../lib/cx.js';
import { Picture } from '../ui/Picture.jsx';
import styles from './AppStage.module.css';

/**
 * The app's home screen, in its phone, standing at the end of the download section — set a
 * little askew, as a phone is held out to someone — and reaching down past the teal into the
 * footer's night (Download.module.css → .floor).
 */
export function AppStage({ className }) {
  const { t } = useLocale();

  return (
    <div className={cx(styles.visual, className)}>
      <Picture
        image={media.stageScreen}
        alt={t.download.stageAlt}
        sizes="(min-width: 64em) 19rem, 44vw"
        className={styles.phone}
      />
    </div>
  );
}
