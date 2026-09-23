import { useEffect, useRef, useState } from 'react';
import { media } from '../../content/media.js';
import { useLocale } from '../../i18n/useLocale.js';
import { Logo } from '../brand/Logo.jsx';
import { DownloadLink } from '../download/DownloadLink.jsx';
import { Globe } from '../ui/icons.jsx';
import { Picture } from '../ui/Picture.jsx';
import styles from './Header.module.css';

export function Header() {
  const { t, config, alternate } = useLocale();
  const sentinelRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  // A 1px marker at the top of the page: once it scrolls away, the header lifts off the page.
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting));
    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <span ref={sentinelRef} className={styles.sentinel} aria-hidden="true" />
      <header className={styles.header} data-scrolled={scrolled || undefined}>
        <a className={styles.brand} href={config.path} aria-label={t.a11y.home}>
          <Picture
            image={media.appIcon}
            alt=""
            sizes="2.75rem"
            loading="eager"
            className={styles.icon}
          />
          <Logo className={styles.wordmark} />
        </a>

        <nav className={styles.nav} aria-label={t.a11y.primaryNav}>
          <ul className={styles.links} role="list">
            {t.nav.items.map((item) => (
              <li key={item.id}>
                <a className={styles.link} href={`#${item.id}`}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <DownloadLink placement="header" size="sm">
            {t.nav.download}
          </DownloadLink>
          <a
            className={styles.locale}
            href={alternate.path}
            hrefLang={alternate.hreflang}
            lang={alternate.lang}
            aria-label={t.a11y.switchLocale}
          >
            <Globe className={styles.globe} />
            <span>{t.nav.switchLocale}</span>
          </a>
        </nav>
      </header>
    </>
  );
}
