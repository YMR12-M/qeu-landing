import { useEffect, useRef } from 'react';
import { media } from '../../content/media.js';
import { MENU } from '../../content/menu.js';
import { useLocale } from '../../i18n/useLocale.js';
import { cx } from '../../lib/cx.js';
import { formatDate, formatPrice, interpolate } from '../../lib/format.js';
import { Logo } from '../brand/Logo.jsx';
import { WithBrand } from '../brand/WithBrand.jsx';
import { DownloadLink } from '../download/DownloadLink.jsx';
import { IcedCup } from '../illustrations/IcedCup.jsx';
import { Picture } from '../ui/Picture.jsx';
import styles from './Coffee.module.css';

const { drinks, box } = MENU.coffee;

// The drinks' photos sit beside their names, about as tall as two lines of them.
const THUMB_SIZES = '2.5rem';

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** A menu price: the app's, and — struck through — the one it replaces. */
function Prices({ item, locale, prices }) {
  return (
    <span className={styles.prices}>
      <span className={styles.price}>
        {formatPrice(item.price, { locale, template: prices.price })}
      </span>
      <s className={styles.was}>
        <span className="visually-hidden">{prices.was} </span>
        {formatPrice(item.was, { locale })}
      </s>
    </span>
  );
}

/**
 * «كيو كوفي», the second of the kitchen's two tabs (Kitchen.jsx) — Qeu's coffee as a café
 * corner: its menu board, lit by a neon of the wordmark, and the counter beside it where a cup
 * is poured with whatever the reader picks. The menu is a radio group, so picking works with a
 * keyboard and a screen reader like any form — and without JavaScript: the stylesheet shows
 * the cup of the checked drink (:has()), and a cup that appears plays its pour from the start
 * (IcedCup) — as it does when the tab itself is opened.
 *
 * The one thing scripted is the first pour: held (an empty cup of ice) while the counter
 * waits below the fold, and poured as it comes into view. The pre-rendered page — like
 * reduced motion — shows the first drink already poured.
 */
export function CoffeePanel() {
  const { t, locale } = useLocale();
  const { coffee, prices } = t;
  const barRef = useRef(null);
  const date = formatDate(MENU.capturedAt, { locale, dates: t.dates });

  useEffect(() => {
    const bar = barRef.current;
    if (reducedMotion() || bar.getBoundingClientRect().top < window.innerHeight) return;

    bar.dataset.pour = 'waiting';
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        // The cup's animations apply again, from their start: the pour.
        delete bar.dataset.pour;
        observer.disconnect();
      },
      { rootMargin: '0px 0px -30% 0px' },
    );
    observer.observe(bar);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={cx('container', styles.layout)}>
      {/* The kitchen's switch names the tab: the heading goes straight to the question. */}
      <div className={styles.intro}>
        <h3 className={styles.title}>
          {coffee.title}{' '}
          <span className={styles.accent}>
            <WithBrand text={coffee.titleAccent} name={t.meta.siteName} className={styles.brand} />
          </span>
        </h3>
        <p className={styles.lead}>{coffee.lead}</p>
      </div>

      {/* The counter: one cup per drink, the checked drink's shown (Coffee.module.css). */}
      <div ref={barRef} className={styles.bar}>
        <div className={styles.cups}>
          {drinks.map((drink) => (
            <IcedCup
              key={drink.id}
              drink={drink.id}
              name={coffee.drinks[drink.id].name}
              size={coffee.drinks[drink.id].size}
              sign={coffee.sign}
              className={styles.cup}
            />
          ))}
        </div>
        <span className={styles.counter} aria-hidden="true" />
        <p className={styles.hint}>{coffee.hint}</p>
      </div>

      <div className={styles.board}>
        {/* The neon over the menu: the wordmark and «كوفي». */}
        <p className={styles.neon} aria-hidden="true" dir="rtl">
          <Logo className={styles.neonLogo} />
          <span lang="ar">{coffee.sign}</span>
        </p>

        <fieldset className={styles.menu}>
          <legend className={styles.heading}>
            <span className="visually-hidden">{coffee.menu.legend}: </span>
            {coffee.menu.cold}
          </legend>
          {drinks.map((drink, index) => {
            const copy = coffee.drinks[drink.id];
            return (
              <label key={drink.id} className={styles.option}>
                <input
                  className={styles.radio}
                  type="radio"
                  name="coffee-drink"
                  value={drink.id}
                  defaultChecked={index === 0}
                />
                <Picture
                  image={media.coffee[drink.id]}
                  alt=""
                  sizes={THUMB_SIZES}
                  className={styles.thumb}
                />
                <span className={styles.item}>
                  <span className={styles.name}>{copy.name}</span>
                  <span className={styles.size}>{copy.size}</span>
                </span>
                <Prices item={drink} locale={locale} prices={prices} />
              </label>
            );
          })}
        </fieldset>

        {/* The menu's last line, from the tab's «مشروبات للجمعات»: the box, to share rather
            than to pour. */}
        <div className={styles.boxRow}>
          <Picture
            image={media.coffee.box}
            alt={coffee.box.imageAlt}
            sizes="3.5rem"
            className={styles.boxImage}
          />
          <span className={styles.item}>
            <span className={styles.name}>{coffee.box.name}</span>
            <span className={styles.size}>
              {coffee.box.size} <span className={styles.tag}>{coffee.menu.gatherings}</span>
            </span>
          </span>
          <Prices item={box} locale={locale} prices={prices} />
        </div>

        <p className={styles.source}>{interpolate(prices.source, { date })}</p>
      </div>

      <div className={styles.more}>
        {/* The tab's other shelves in the app, which the board doesn't show. */}
        <p className={styles.also}>
          {coffee.also.label}{' '}
          <span className={styles.alsoItems}>{coffee.also.items.join(' · ')}</span>
        </p>
        <p className={styles.where}>
          {coffee.where}{' '}
          {/* As the app writes it; the chevron is mirrored right to left, pointing on: ‹. */}
          <bdi className={styles.path} lang="ar" dir="rtl">
            {coffee.path.map((step, index) => (
              <span key={step}>
                {index > 0 && (
                  <span className={styles.chevron} aria-hidden="true">
                    ›
                  </span>
                )}
                {step}
              </span>
            ))}
          </bdi>
        </p>
        <DownloadLink placement="coffee" variant="link" labels={t.hero.cta} className={styles.cta}>
          {coffee.cta}
        </DownloadLink>
      </div>
    </div>
  );
}
