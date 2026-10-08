import { useEffect, useRef } from 'react';
import { media } from '../../content/media.js';
import { MENU } from '../../content/menu.js';
import { useLocale } from '../../i18n/useLocale.js';
import { cx } from '../../lib/cx.js';
import { formatDate, interpolate } from '../../lib/format.js';
import { WithBrand } from '../brand/WithBrand.jsx';
import { IcedCup } from '../illustrations/IcedCup.jsx';
import { Picture } from '../ui/Picture.jsx';
import { Price } from '../ui/Price.jsx';
import { Scribble } from '../ui/Scribble.jsx';
import styles from './Coffee.module.css';

const { drinks, box } = MENU.coffee;

// The drinks' photos sit beside their names, about as tall as the line and the size under it.
const THUMB_SIZES = '3rem';

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * «كيو كوفي», the second of the kitchen's two tabs (Kitchen.jsx) — Qeu's coffee as a café's
 * menu board: the menu written on the wall in one column, as a café writes its menu — each
 * drink beside its photo, a line of dots from its name to its price — and facing it, level with
 * the middle of the menu, a large cup poured with whatever the reader picks, the pick
 * underlined in teal as with a pen. The menu is a radio group, so picking works with a
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
  const date = formatDate(MENU.coffee.capturedAt, { locale, dates: t.dates });

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

      {/* The cup: one per drink, the checked drink's shown (Coffee.module.css). */}
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
        <p className={styles.hint}>
          {coffee.hint}
          {/* On a computer, a pen arrow from the words to the menu beside the cup. */}
          <Scribble shape="arrow" delay={400} className={styles.hintArrow} />
        </p>
      </div>

      <div className={styles.board}>
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
                <span className={styles.line}>
                  <span className={styles.name}>
                    {copy.name}
                    <Scribble shape="underline" draw="parent" className={styles.pick} />
                  </span>
                  <span className={styles.leader} aria-hidden="true" />
                  <Price
                    value={drink.price}
                    was={drink.was}
                    locale={locale}
                    prices={prices}
                    className={styles.price}
                  />
                </span>
                <span className={styles.size}>{copy.size}</span>
              </label>
            );
          })}
        </fieldset>

        {/* The menu's second heading, from the tab's «مشروبات للجمعات»: the box, to share rather
            than to pour. */}
        <p className={styles.heading}>{coffee.menu.gatherings}</p>
        <div className={styles.option}>
          <Picture
            image={media.coffee.box}
            alt={coffee.box.imageAlt}
            sizes="3.5rem"
            className={styles.thumb}
          />
          <span className={styles.line}>
            <span className={styles.name}>{coffee.box.name}</span>
            <span className={styles.leader} aria-hidden="true" />
            <Price
              value={box.price}
              was={box.was}
              locale={locale}
              prices={prices}
              className={styles.price}
            />
          </span>
          <span className={styles.size}>{coffee.box.size}</span>
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
      </div>
    </div>
  );
}
