import { media } from '../../content/media.js';
import { site } from '../../content/site.js';
import { useLocale } from '../../i18n/useLocale.js';
import { formatNumber, interpolate } from '../../lib/format.js';
import { getStoreHref } from '../../lib/links.js';
import { Picture } from '../ui/Picture.jsx';
import styles from './Footer.module.css';

// Evaluated when the page is built (and again in the browser) so the year never goes stale.
const YEAR = new Date().getFullYear();

export function Footer() {
  const { t, config, locale } = useLocale();
  const { footer } = t;
  const mailto = `mailto:${site.contact.email}`;
  const year = formatNumber(YEAR, { locale, grouping: false });

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.columns}>
          <div className={styles.brand}>
            <a href={config.path} aria-label={t.a11y.home}>
              <Picture image={media.appIcon} alt="" sizes="5rem" className={styles.icon} />
            </a>
            <p className={styles.tagline}>{footer.tagline}</p>
          </div>

          <div>
            <h2 className={styles.heading}>{footer.contact.title}</h2>
            <ul className={styles.links} role="list">
              <li>
                <a href={mailto} dir="ltr">
                  {site.contact.email}
                </a>
              </li>
              <li>
                <a href={`${mailto}?subject=${encodeURIComponent(footer.contact.reportSubject)}`}>
                  {footer.contact.report}
                </a>
              </li>
              <li>
                <a href={getStoreHref('googlePlay', 'footer')} target="_blank" rel="noopener">
                  {footer.contact.store}
                </a>
              </li>
            </ul>
          </div>

          <nav aria-labelledby="footer-more">
            <h2 id="footer-more" className={styles.heading}>
              {footer.more.title}
            </h2>
            <ul className={styles.links} role="list">
              {t.nav.items.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`}>{item.label}</a>
                </li>
              ))}
              <li>
                <a href={config.privacyPath}>{footer.more.privacy}</a>
              </li>
            </ul>
          </nav>
        </div>

        <div className={styles.bottom}>
          <p>{footer.sourceLine}</p>
          <p suppressHydrationWarning>
            {interpolate(footer.legal, { year, company: site.company.legalName })}
          </p>
        </div>
      </div>
    </footer>
  );
}
