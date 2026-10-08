import { useEffect, useRef, useState } from 'react';
import { useActiveSection } from '../../hooks/useActiveSection.js';
import { useLocale } from '../../i18n/useLocale.js';
import { formatNumber, interpolate } from '../../lib/format.js';
import { Logo } from '../brand/Logo.jsx';
import { DownloadCard } from '../download/DownloadCard.jsx';
import { ChevronDown, Globe } from '../ui/icons.jsx';
import styles from './Header.module.css';

/**
 * The bar across the top of the page. It has no colour of its own: it is painted the page's wall,
 * the same colour as everything it runs over (tokens.css → --page-wall), so nothing separates it
 * from the page.
 *
 * On a computer it is always open, at one size: the wordmark, the sections (a loop of pen
 * glides round the one being read), the language, and the store button — which opens a card with
 * the download QR code and both stores (DownloadCard). On phones and tablets it names the section
 * being read, and how far down the page it is («3 من 7»); that name opens the sections.
 *
 * `sections` are the page's own sections, for the name and the list — the home page's by
 * default; the privacy policy passes its contents. The open bar always links to the home
 * page's sections, from any page.
 */
export function Header({ sections }) {
  const { t, locale, config, alternate, alternatePath, page, sectionHref } = useLocale();
  const links = t.nav.items;
  const items = sections ?? links;
  const trackRef = useRef(null);
  const menuRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection(items.map((item) => item.id));
  const activeIndex = items.findIndex((item) => item.id === active);

  // The mark under the section being read: its two ends travel to the new link one after the
  // other — the leading end first, the trailing end catching up — so it stretches, then
  // settles. It only shows on the page whose sections the bar lists.
  useEffect(() => {
    const track = trackRef.current;
    const place = () => {
      const target = active && track.querySelector(`a[data-id="${active}"]`);
      const link = target || track.querySelector('a');
      const box = track.getBoundingClientRect();
      const rect = link.getBoundingClientRect();
      const left = rect.left - box.left;
      const right = box.right - rect.right;
      const previous = parseFloat(track.style.getPropertyValue('--mark-left'));
      track.dataset.moving = left >= previous || Number.isNaN(previous) ? 'right' : 'left';
      track.style.setProperty('--mark-left', `${left}px`);
      track.style.setProperty('--mark-right', `${right}px`);
      track.toggleAttribute('data-mark', Boolean(target));
    };
    place();
    const observer = new ResizeObserver(place);
    observer.observe(track);
    return () => observer.disconnect();
  }, [active]);

  // The open list closes on Escape (focus back on its button) or on a tap anywhere else.
  useEffect(() => {
    if (!menuOpen) return;
    const menu = menuRef.current;
    const onKeyDown = (event) => {
      if (event.key !== 'Escape') return;
      menu.open = false;
      menu.querySelector('summary').focus();
    };
    const onPointerDown = (event) => {
      if (!menu.contains(event.target)) menu.open = false;
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [menuOpen]);

  const closeMenu = () => {
    menuRef.current.open = false;
  };
  const current = (id) => (active === id ? 'location' : undefined);
  const progress = interpolate(t.nav.progress, {
    n: formatNumber(activeIndex + 1, { locale }),
    total: formatNumber(items.length, { locale }),
  });
  // Every name the button can show, with the count at its widest: unseen, they give it one
  // width for the whole page (Header.module.css → .nowSlot).
  const lastProgress = interpolate(t.nav.progress, {
    n: formatNumber(items.length, { locale }),
    total: formatNumber(items.length, { locale }),
  });
  const pillNames = [[t.a11y.sectionsMenu], ...items.map((item) => [item.label, lastProgress])];
  // The language link: this very page in the other language — the home page or the policy —
  // or, from a page that has no other language (the 404), the site.
  const switchLabel = page === 'notFound' ? t.a11y.switchSite : t.a11y.switchLocale;

  return (
    <header className={styles.header}>
      <div className={styles.bar}>
        {/* The brand is its name alone, the wordmark, on every screen. */}
        <a className={styles.brand} href={config.path} aria-label={t.a11y.home}>
          <Logo className={styles.wordmark} />
        </a>

        <nav className={styles.directory} aria-label={t.a11y.primaryNav}>
          <div ref={trackRef} className={styles.track}>
            <svg
              className={styles.mark}
              viewBox="0 0 200 100"
              preserveAspectRatio="none"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M54 13C94 1 162 5 185 29C205 50 181 84 114 89C50 94 3 76 6 46C9 19 51 6 99 11" />
            </svg>
            <ul className={styles.links} role="list">
              {links.map((item) => (
                <li key={item.id}>
                  <a
                    className={styles.link}
                    href={sectionHref(item.id)}
                    data-id={item.id}
                    aria-current={current(item.id)}
                  >
                    <span className={styles.linkText}>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <details
          ref={menuRef}
          className={styles.menu}
          onToggle={(event) => setMenuOpen(event.currentTarget.open)}
        >
          <summary className={styles.now}>
            {activeIndex >= 0 && <span className="visually-hidden">{t.a11y.sectionsMenu}: </span>}
            <span className={styles.nowSlot}>
              {pillNames.map(([name, count]) => (
                <span key={name} className={styles.nowRoom} aria-hidden="true">
                  <span className={styles.nowName}>{name}</span>
                  {count && <span className={styles.nowCount}> {count}</span>}
                </span>
              ))}
              <span key={active ?? 'none'} className={styles.nowLabel}>
                <span className={styles.nowName}>
                  {activeIndex >= 0 ? items[activeIndex].label : t.a11y.sectionsMenu}
                </span>
                {activeIndex >= 0 && <span className={styles.nowCount}> {progress}</span>}
              </span>
            </span>
            <ChevronDown className={styles.nowIcon} />
          </summary>
          {/* Named apart from the bar's own list: two landmarks, two names. */}
          <nav className={styles.sheet} aria-label={t.a11y.sectionsMenu}>
            <ol className={styles.sheetList} role="list">
              {items.map((item, index) => (
                <li key={item.id}>
                  <a
                    className={styles.sheetLink}
                    href={sections ? `#${item.id}` : sectionHref(item.id)}
                    aria-current={current(item.id)}
                    onClick={closeMenu}
                  >
                    <span className={styles.sheetNumber} aria-hidden="true">
                      {formatNumber(index + 1, { locale })}
                    </span>
                    <span className={styles.sheetName}>{item.label}</span>
                    {active === item.id && (
                      <span className={styles.here} aria-hidden="true">
                        {t.nav.here}
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ol>
            <a
              className={styles.sheetLocale}
              href={alternatePath}
              hrefLang={alternate.hreflang}
              lang={alternate.lang}
            >
              <Globe className={styles.globe} />
              {switchLabel}
            </a>
          </nav>
        </details>

        <a
          className={styles.locale}
          href={alternatePath}
          hrefLang={alternate.hreflang}
          lang={alternate.lang}
          aria-label={switchLabel}
        >
          <Globe className={styles.globe} />
          <span>{t.nav.switchLocale}</span>
        </a>

        <DownloadCard placement="header" className={styles.download}>
          {t.nav.download}
        </DownloadCard>
      </div>
    </header>
  );
}
