import { useEffect, useRef, useState } from 'react';
import { media } from '../../content/media.js';
import { useActiveSection } from '../../hooks/useActiveSection.js';
import { useLocale } from '../../i18n/useLocale.js';
import { Logo } from '../brand/Logo.jsx';
import { DownloadLink } from '../download/DownloadLink.jsx';
import { Globe, Receipt } from '../ui/icons.jsx';
import { Picture } from '../ui/Picture.jsx';
import styles from './Header.module.css';

/**
 * 'dark' or 'light': the colour of the section under a point. It reads the section's own
 * background, not a card or picture inside it (the FAQ's white receipt sits on a dark
 * section), and walks further up only while that background is see-through.
 */
function toneAt(x, y) {
  const hit = document.elementFromPoint(x, y);
  for (let node = hit?.closest('main > *, footer') ?? hit; node; node = node.parentElement) {
    const [r, g, b, alpha = 1] = getComputedStyle(node)
      .backgroundColor.match(/[\d.]+/g)
      .map(Number);
    if (alpha < 0.5) continue;
    return 0.2126 * r + 0.7152 * g + 0.0722 * b < 128 ? 'dark' : 'light';
  }
  return 'light';
}

/**
 * The navigation is an island, not a bar: the page runs up under it, and it takes the colour
 * of whatever section it floats over — dark glass on dark sections, light on light — so
 * nothing separates it from the page.
 *
 * At the top, and whenever the reader scrolls back up, it is open: the brand, the sections
 * (a liquid "you are here" marker stretches from one to the next) and the store button.
 * Reading down, it folds into a small pill that names the section being read; that pill
 * opens the sections as a receipt. On phones it is always the pill.
 *
 * `sections` are the page's own sections, for the pill and the receipt — the home page's by
 * default; the privacy policy passes its contents. The open island always links to the home
 * page's sections, from any page.
 */
export function Header({ sections }) {
  const { t, config, alternate, page, sectionHref } = useLocale();
  const links = t.nav.items;
  const items = sections ?? links;
  const islandRef = useRef(null);
  const trackRef = useRef(null);
  const menuRef = useRef(null);
  const [tone, setTone] = useState('dark'); // every page opens on the dark hero
  const [folded, setFolded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection(items.map((item) => item.id));
  const activeIndex = items.findIndex((item) => item.id === active);

  // Once per scroll frame: the colour under the island sets its tone, and the scroll
  // direction folds it (reading down) or opens it (going back up, or near the top).
  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const island = islandRef.current.getBoundingClientRect();
      setTone(toneAt(Math.max(2, island.left / 2), island.top + island.height / 2));
      if (y < 120) {
        setFolded(false);
        lastY = y;
      } else if (Math.abs(y - lastY) > 8) {
        setFolded(y > lastY);
        lastY = y;
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    window.addEventListener('load', update); // settles it once everything has laid out
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      window.removeEventListener('load', update);
    };
  }, []);

  // The liquid marker: its two ends travel to the active link one after the other — the
  // leading end first, the trailing end catching up — so it stretches, then settles. It only
  // shows on the page whose sections the island lists.
  useEffect(() => {
    const track = trackRef.current;
    const place = () => {
      const target = active && track.querySelector(`a[data-id="${active}"]`);
      const link = target || track.querySelector('a');
      const box = track.getBoundingClientRect();
      const rect = link.getBoundingClientRect();
      const left = rect.left - box.left - track.clientLeft;
      const right = box.left + track.clientLeft + track.clientWidth - rect.right;
      const previous = parseFloat(track.style.getPropertyValue('--blob-left'));
      track.dataset.moving = left >= previous || Number.isNaN(previous) ? 'right' : 'left';
      track.style.setProperty('--blob-left', `${left}px`);
      track.style.setProperty('--blob-right', `${right}px`);
      track.toggleAttribute('data-blob', Boolean(target));
    };
    place();
    const observer = new ResizeObserver(place);
    observer.observe(track);
    return () => observer.disconnect();
  }, [active]);

  // An open receipt closes on Escape (focus back on its pill) or on a tap anywhere else.
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
  // The language link: this very page in the other language — or, from the policy (which has
  // no other language), the site.
  const switchLabel = page === 'home' ? t.a11y.switchLocale : t.a11y.switchSite;

  return (
    <header className={styles.header} data-tone={tone} data-folded={folded || undefined}>
      <div ref={islandRef} className={styles.island}>
        <a className={styles.brand} href={config.path} aria-label={t.a11y.home}>
          <Picture
            image={media.appIcon}
            alt=""
            sizes="2.25rem"
            loading="eager"
            className={styles.icon}
          />
          <span className={styles.wordmarkBox}>
            <Logo className={styles.wordmark} />
          </span>
        </a>

        <nav className={styles.directory} aria-label={t.a11y.primaryNav}>
          <div ref={trackRef} className={styles.track}>
            <span className={styles.blob} aria-hidden="true" />
            <ul className={styles.links} role="list">
              {links.map((item) => (
                <li key={item.id}>
                  <a
                    className={styles.link}
                    href={sectionHref(item.id)}
                    data-id={item.id}
                    aria-current={current(item.id)}
                  >
                    {item.label}
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
            <span key={active ?? 'none'} className={styles.nowLabel}>
              {activeIndex >= 0 ? items[activeIndex].label : t.a11y.sectionsMenu}
            </span>
            <Receipt className={styles.nowIcon} />
          </summary>
          <div className={styles.feed}>
            <nav className={styles.receipt} aria-label={t.a11y.primaryNav}>
              <p className={styles.receiptTitle} aria-hidden="true">
                {t.a11y.sectionsMenu}
              </p>
              <ul className={styles.receiptList} role="list">
                {items.map((item) => (
                  <li key={item.id}>
                    <a
                      className={styles.receiptLink}
                      href={`#${item.id}`}
                      aria-current={current(item.id)}
                      onClick={closeMenu}
                    >
                      <span>{item.label}</span>
                      <span className={styles.leader} aria-hidden="true" />
                      {active === item.id && (
                        <span className={styles.here} aria-hidden="true">
                          {t.nav.here}
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
              <a
                className={styles.receiptLocale}
                href={alternate.path}
                hrefLang={alternate.hreflang}
                lang={alternate.lang}
              >
                <Globe className={styles.globe} />
                {switchLabel}
              </a>
            </nav>
          </div>
        </details>

        <DownloadLink placement="header" size="sm">
          {t.nav.download}
        </DownloadLink>

        <a
          className={styles.locale}
          href={alternate.path}
          hrefLang={alternate.hreflang}
          lang={alternate.lang}
          aria-label={switchLabel}
        >
          <Globe className={styles.globe} />
          <span>{t.nav.switchLocale}</span>
        </a>
      </div>
    </header>
  );
}
