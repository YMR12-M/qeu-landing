import { useEffect, useId, useRef, useState } from 'react';
import qrCode from '../../assets/qr/download-qr.svg';
import { usePlatform } from '../../hooks/usePlatform.js';
import { useLocale } from '../../i18n/useLocale.js';
import { cx } from '../../lib/cx.js';
import { DownloadLink } from './DownloadLink.jsx';
import buttonStyles from './DownloadLink.module.css';
import styles from './DownloadCard.module.css';
import { StorePills } from './StorePills.jsx';

/**
 * The header's «حمّل كيو». On a computer — where the app can't be installed — it opens a card
 * under the button instead of sending the reader down the page: the download QR code, which
 * sends each phone to its own store, and both stores. On a phone it is the store link, as
 * everywhere else (DownloadLink); and in the pre-rendered page, or without JavaScript, the
 * link to the download section.
 *
 * The card closes on Escape (focus back on the button), on a click or a tab anywhere else, and
 * once a store has been opened.
 */
export function DownloadCard({ placement, className, children }) {
  const { t } = useLocale();
  const { card } = t.nav;
  const platform = usePlatform();
  const rootRef = useRef(null);
  const [open, setOpen] = useState(false);
  const cardId = useId();
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const root = rootRef.current;
    const onKeyDown = (event) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      root.querySelector('button').focus();
    };
    const onOutside = (event) => {
      if (!root.contains(event.target)) setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onOutside);
    document.addEventListener('focusin', onOutside);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onOutside);
      document.removeEventListener('focusin', onOutside);
    };
  }, [open]);

  if (platform !== 'desktop') {
    return (
      <DownloadLink placement={placement} size="sm" className={className}>
        {children}
      </DownloadLink>
    );
  }

  return (
    <div ref={rootRef} className={cx(styles.root, className)}>
      <button
        type="button"
        className={cx(buttonStyles.button, buttonStyles.sm, styles.trigger)}
        aria-expanded={open}
        aria-controls={cardId}
        onClick={() => setOpen((value) => !value)}
      >
        <span className={buttonStyles.label}>{children}</span>
      </button>

      {/* A store opens in a new tab: the card has done its job, and closes behind it. */}
      <div
        id={cardId}
        className={styles.card}
        data-open={open || undefined}
        role="group"
        aria-labelledby={titleId}
        onClick={(event) => event.target.closest('a') && setOpen(false)}
      >
        <p id={titleId} className={styles.title}>
          {card.title}
        </p>
        <p className={styles.text}>{card.text}</p>
        <div className={styles.code}>
          <img src={qrCode} width="136" height="136" alt={t.qr.alt} decoding="async" />
        </div>
        <p className={styles.or}>{card.or}</p>
        <StorePills placement={`${placement}_card`} size="sm" />
        <p className={styles.note}>{card.note}</p>
      </div>
    </div>
  );
}
