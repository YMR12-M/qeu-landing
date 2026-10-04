import { site } from '../../content/site.js';
import { useCurrentYear } from '../../hooks/useCurrentYear.js';
import { usePlatform } from '../../hooks/usePlatform.js';
import { useSeenSections } from '../../hooks/useSeenSections.js';
import { useLocale } from '../../i18n/useLocale.js';
import { trackDownloadClick } from '../../lib/analytics.js';
import { formatNumber, interpolate } from '../../lib/format.js';
import { getStoreHref, storeLinkTarget } from '../../lib/links.js';
import { Logo } from '../brand/Logo.jsx';
import { Barcode } from '../ui/Barcode.jsx';
import { Scribble } from '../ui/Scribble.jsx';
import styles from './Footer.module.css';

// Both store pages, in the order of the download section's buttons.
const STORES = ['googlePlay', 'appStore'];

/**
 * The footer, on the night wall: the wordmark and Qeu's slogan set large — its last word marked
 * in yellow, as the hero's promise is — and under them what the order's delivery label says,
 * written on the wall: «طلبك وصل», from Qeu to your door, the app's store id in a barcode. Beside
 * it the page's contents, each ticked in pen once it has been read, and the ways to reach Qeu.
 * The small print along the bottom keeps the legal line and the figures' source. On a phone the
 * contents are left to the bar's list, a tap away at the top.
 */
export function Footer() {
  const { t, figures, config, locale, page, policyPath, sectionHref } = useLocale();
  const { footer } = t;
  const { sticker } = footer;
  const platform = usePlatform();
  const seen = useSeenSections(t.nav.items.map((item) => item.id));
  const mailto = `mailto:${site.contact.email}`;
  const year = formatNumber(useCurrentYear(), { locale, grouping: false });

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.print}>
          <a className={styles.home} href={config.path}>
            <Logo className={styles.wordmark} title={t.a11y.home} />
          </a>
          <p className={styles.tagline}>
            {footer.tagline.before} <span className={styles.offer}>{footer.tagline.offer}</span>
          </p>
        </div>

        <div className={styles.lists}>
          {/* The order's delivery label, without the label: its words on the wall. */}
          <div>
            <p className={styles.deliveryTitle}>{sticker.title}</p>
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
            <div className={styles.tracking} aria-hidden="true">
              <Barcode seed={site.app.androidPackage} count={34} className={styles.barcode} />
              <span dir="ltr">{site.app.androidPackage}</span>
            </div>
          </div>

          <nav className={styles.contents} aria-labelledby="footer-contents">
            <h2 id="footer-contents" className={styles.heading}>
              {footer.more.title}
            </h2>
            <ul className={styles.links} role="list">
              {t.nav.items.map((item) => (
                <li key={item.id} data-seen={seen.has(item.id) || undefined}>
                  <a href={sectionHref(item.id)}>
                    <Scribble shape="tick" draw="parent" className={styles.tick} />
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
                <a href={`${mailto}?subject=${encodeURIComponent(footer.contact.reportSubject)}`}>
                  {footer.contact.report}
                </a>
              </li>
              {STORES.map((store) => (
                <li key={store}>
                  <a
                    href={getStoreHref(store, 'footer')}
                    {...storeLinkTarget(platform)}
                    onClick={() => trackDownloadClick({ store, placement: 'footer' })}
                  >
                    {footer.contact[store]}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.small}>
          <p>
            {interpolate(footer.legal, { year, company: site.company.legalName })}
            <span className={styles.dot} aria-hidden="true">
              {' '}
              ·{' '}
            </span>
            <a
              className={styles.smallLink}
              href={policyPath}
              aria-current={page === 'policy' ? 'page' : undefined}
            >
              {footer.more.privacy}
            </a>
          </p>
          <p>{interpolate(footer.sourceLine, figures)}</p>
        </div>
      </div>
    </footer>
  );
}
