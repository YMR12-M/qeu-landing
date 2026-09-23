import { useRef } from 'react';
import { site } from '../../content/site.js';
import { useCurrentYear } from '../../hooks/useCurrentYear.js';
import { usePlatform } from '../../hooks/usePlatform.js';
import { useScrollReveal } from '../../hooks/useScrollReveal.js';
import { useSeenSections } from '../../hooks/useSeenSections.js';
import { useLocale } from '../../i18n/useLocale.js';
import { trackDownloadClick } from '../../lib/analytics.js';
import { formatNumber, interpolate } from '../../lib/format.js';
import { getStoreHref, storeLinkTarget } from '../../lib/links.js';
import { Logo } from '../brand/Logo.jsx';
import { Barcode } from '../ui/Barcode.jsx';
import styles from './Footer.module.css';

/**
 * The footer is the bag the order comes home in: Qeu's teal paper, its top edge cut in teeth,
 * the brand printed large across it — and the delivery sticker slapped on as it scrolls into
 * view. The sticker carries what a footer needs: the page's contents (each one ticked off
 * once it has been read), the ways to reach Qeu, and a barcode whose number is the app's
 * store id. The small print along the bottom keeps the legal line and the figures' source.
 */
export function Footer() {
  const { t, figures, config, locale } = useLocale();
  const { footer } = t;
  const { sticker } = footer;
  const platform = usePlatform();
  const stickerRef = useRef(null);
  const seen = useSeenSections(t.nav.items.map((item) => item.id));
  const mailto = `mailto:${site.contact.email}`;
  const year = formatNumber(useCurrentYear(), { locale, grouping: false });
  useScrollReveal(stickerRef);

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.layout}>
          <div className={styles.print}>
            <a className={styles.home} href={config.path}>
              <Logo className={styles.wordmark} title={t.a11y.home} />
            </a>
            <p className={styles.tagline}>
              {footer.tagline.before} <span className={styles.offer}>{footer.tagline.offer}</span>
            </p>
          </div>

          <div ref={stickerRef} className={styles.sticker}>
            <div className={styles.head}>
              <p className={styles.title}>{sticker.title}</p>
              <div className={styles.tracking} aria-hidden="true">
                <Barcode seed={site.app.androidPackage} count={34} className={styles.barcode} />
                <span dir="ltr">{site.app.androidPackage}</span>
              </div>
            </div>

            <dl className={styles.route}>
              <div className={styles.stop}>
                <dt>{sticker.from}</dt>
                <dd>{sticker.fromValue}</dd>
              </div>
              <div className={styles.stop}>
                <dt>{sticker.to}</dt>
                <dd>{sticker.toValue}</dd>
              </div>
            </dl>

            <div className={styles.lists}>
              <nav aria-labelledby="footer-contents">
                <h2 id="footer-contents" className={styles.heading}>
                  {footer.more.title}
                </h2>
                <ul className={styles.links} role="list">
                  {t.nav.items.map((item) => (
                    <li key={item.id} data-seen={seen.has(item.id) || undefined}>
                      <a href={`#${item.id}`}>
                        <span className={styles.tick} aria-hidden="true" />
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <div>
                <h2 className={styles.heading}>{footer.contact.title}</h2>
                <ul className={styles.links} role="list">
                  <li>
                    <a href={mailto}>
                      <span dir="ltr">{site.contact.email}</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={`${mailto}?subject=${encodeURIComponent(footer.contact.reportSubject)}`}
                    >
                      {footer.contact.report}
                    </a>
                  </li>
                  <li>
                    <a
                      href={getStoreHref('googlePlay', 'footer')}
                      {...storeLinkTarget(platform)}
                      onClick={() =>
                        trackDownloadClick({ store: 'googlePlay', placement: 'footer' })
                      }
                    >
                      {footer.contact.store}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.small}>
          <p>
            {interpolate(footer.legal, { year, company: site.company.legalName })}
            <span aria-hidden="true"> · </span>
            <a className={styles.smallLink} href={config.privacyPath}>
              {footer.more.privacy}
            </a>
          </p>
          <p>{interpolate(footer.sourceLine, figures)}</p>
        </div>
      </div>
    </footer>
  );
}
