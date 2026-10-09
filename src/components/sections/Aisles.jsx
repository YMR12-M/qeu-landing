import { useRef } from 'react';
import { CATEGORY_COUNT, DEPARTMENTS } from '../../content/departments.js';
import { media } from '../../content/media.js';
import { useScrollReveal } from '../../hooks/useScrollReveal.js';
import { useLocale } from '../../i18n/useLocale.js';
import { cx } from '../../lib/cx.js';
import { formatNumber, interpolate } from '../../lib/format.js';
import { WithBrand } from '../brand/WithBrand.jsx';
import { Picture } from '../ui/Picture.jsx';
import { Scribble } from '../ui/Scribble.jsx';
import styles from './Aisles.module.css';

// "More than" this many categories: their count, rounded down to the ten.
const AT_LEAST = Math.floor(CATEGORY_COUNT / 10) * 10;

// A category stands about a quarter to a third of the column wide on a computer and a tablet, and
// a little under a third of the screen on a phone, where they are laid out three to a row.
const PRODUCT_SIZES = '(min-width: 64em) 15rem, (min-width: 48em) 24vw, 30vw';

// Behind the categories, the chosen department's name is set on one line, as wide as the products'
// column. CSS can't fit type to a width by itself, so here is how many ems wide each name is in
// the display face, Lalezar (measured in the browser). Measure again if a name changes.
const POSTER = {
  ar: {
    groceries: 3.094, // المقاضي
    fresh: 5.929, // المنتجات الطازجة
    drinks: 7.251, // المشروبات والمفرحات
    home: 4.971, // العناية بالمنزل
    care: 2.477, // كيو كير
    tech: 2.77, // كيو تيك
  },
  en: {
    groceries: 3.987,
    fresh: 2.31,
    drinks: 6.258,
    home: 4.411,
    care: 2.672,
    tech: 2.793,
  },
};

// The pile, in units of the column's width (cqi). The first four categories stand in a back row,
// smaller and higher; the rest in a front row, larger and staggered between the back row's packs
// (half a gap along), so every pack shows. The two rows together are centred and, if they are
// wider than the column, scaled down to it. Reading order runs right to left, so the first
// category takes the rightmost place of its row; a pack leans a little, each its own way.
const BACK_COUNT = 4;
const BACK_WIDTH = 23;
const FRONT_WIDTH = 31;
const PACK_GAP = 24;
const LEANS = [-2.2, 1.8, -1.2, 2.6, -1.6, 2.1, -2.4, 1.4];
const round = (value) => Math.round(value * 100) / 100;

function layPile(count) {
  const front = count - BACK_COUNT;
  const packs = Array.from({ length: count }, (_, index) => {
    const isBack = index < BACK_COUNT;
    const place = isBack ? index : index - BACK_COUNT;
    const slot = (isBack ? BACK_COUNT : front) - 1 - place; // from the left
    const width = isBack ? BACK_WIDTH : FRONT_WIDTH;
    return { isBack, width, centre: slot * PACK_GAP + (isBack ? 0 : PACK_GAP / 2) };
  });
  const left = Math.min(...packs.map((pack) => pack.centre - pack.width / 2));
  const right = Math.max(...packs.map((pack) => pack.centre + pack.width / 2));
  const scale = Math.min(1, 98 / (right - left));
  return packs.map((pack, index) => ({
    row: pack.isBack ? 'back' : 'front',
    x: round(50 + (pack.centre - (left + right) / 2) * scale),
    width: round(pack.width * scale),
    lean: LEANS[index % LEANS.length],
  }));
}

// On a phone the packs are gathered close in staggered rows — 3, 2, 3 (or 2, 3, 2 for seven) — on
// a grid of six columns, each pack two wide: a row of two starts a column in, so it sits between
// the packs of the rows above and below it. Returns [column, row] (1-based) for the pack at `index`.
function gatherPack(count, index) {
  const rows = count === 7 ? [2, 3, 2] : [3, 2, 3];
  let left = index;
  for (let row = 0; row < rows.length; row += 1) {
    if (left < rows[row]) return [(rows[row] === 3 ? 1 : 2) + left * 2, row + 1];
    left -= rows[row];
  }
  return [1, rows.length];
}

const PILES = Object.fromEntries(
  DEPARTMENTS.map((department) => [department.id, layPile(department.categories.length)]),
);

/**
 * «أقسام كيو» — the store's aisles, on the page's wall. At the start, the store directory set like
 * a table of contents: the app's six departments, each with the app's own icon,
 * its name, a run of dots and how many categories it has, the chosen one marked in yellow
 * highlighter with a pen arrow to its products. Beside it, from the top of the heading to the foot
 * of the directory, the chosen department's categories — the app's own picture of each — piled in
 * two rows, the back row higher with its names above, the front row with its names below, and
 * behind them the department's name, painted on the wall in a pale aqua with a hand-painted edge:
 * choose another and the name changes with the products. Under them, the way to that aisle in the
 * app.
 *
 * On a phone the directory gives way to the aisle's sign — its icon and name painted large, the
 * aisles before and after it written beside it in pen, each a tap away — and the categories are
 * gathered close in staggered rows, as on a computer.
 *
 * The directory is a radio group, so choosing works with a keyboard and a screen reader like
 * any form, and without JavaScript: the stylesheet shows the checked aisle's categories
 * (:has()), and a department that appears is set out from the start. The one scripted part is
 * the first reveal: while the aisles wait below the fold, the names are held back and the
 * categories unset; in view, the names come in one after another as the products are set out.
 */
export function Aisles() {
  const { t, locale } = useLocale();
  const { aisles } = t;
  const storeRef = useRef(null);
  useScrollReveal(storeRef, '0px 0px -20% 0px');
  const number = (value) => formatNumber(value, { locale });

  return (
    <section id="departments" className={styles.section} aria-labelledby="departments-title">
      {/* The painted edge of the department's name: the letters' outline nudged by noise. */}
      <svg
        width="0"
        height="0"
        aria-hidden="true"
        focusable="false"
        style={{ position: 'absolute' }}
      >
        <filter id="aisles-paint" x="-2%" y="-5%" width="104%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="7" />
          <feDisplacementMap in="SourceGraphic" scale="5" />
        </filter>
      </svg>
      <div ref={storeRef} className={cx('container', styles.layout)}>
        <div className={styles.intro}>
          <h2 id="departments-title" className={styles.title}>
            {aisles.title}{' '}
            <span className={styles.accent}>
              <WithBrand
                text={aisles.titleAccent}
                name={t.meta.siteName}
                className={styles.brand}
              />
            </span>
          </h2>
          <p className={styles.lead}>
            {interpolate(aisles.lead, {
              departments: number(DEPARTMENTS.length),
              categories: number(AT_LEAST),
            })}
          </p>
        </div>

        {/* The store directory: a line per department, the chosen one highlighted. */}
        <fieldset className={styles.directory}>
          <legend className="visually-hidden">{aisles.legend}</legend>
          <p className={styles.directoryTitle} aria-hidden="true">
            {aisles.directory}
          </p>
          <div className={styles.lines}>
            {DEPARTMENTS.map((department, index) => (
              <label key={department.id} className={styles.line} style={{ '--i': index }}>
                <input
                  id={`aisle-${department.id}`}
                  className={styles.radio}
                  type="radio"
                  name="aisle"
                  value={department.id}
                  defaultChecked={index === 0}
                />
                <Picture
                  image={media.departmentIcons[department.id]}
                  alt=""
                  sizes="2.75rem"
                  className={styles.icon}
                />
                <span className={styles.name}>
                  <span className={styles.mark} aria-hidden="true" />
                  {aisles.departments[department.id].name}
                </span>
                <span className={styles.dots} aria-hidden="true" />
                <span className={styles.count}>
                  {interpolate(aisles.categoryCount, {
                    count: number(department.categories.length),
                  })}
                </span>
                <Scribble shape="arrow" draw="parent" className={styles.toAisle} />
              </label>
            ))}
          </div>
        </fieldset>

        {/* Phones: the chosen aisle's sign, in place of the directory — its icon and name painted
            large, and the aisles either side of it written in pen with an arrow, each a tap to go
            there (the directory's radios, which are still there for a keyboard and a screen
            reader, are what is checked). */}
        <div className={styles.signs} aria-hidden="true">
          {DEPARTMENTS.map((department, index) => {
            const before = DEPARTMENTS[index - 1];
            const after = DEPARTMENTS[index + 1];
            const neighbour = (other, side) =>
              other ? (
                <label htmlFor={`aisle-${other.id}`} className={cx(styles.neighbour, styles[side])}>
                  <Scribble shape="arrow" draw="load" className={styles.pen} />
                  <span>{aisles.departments[other.id].name}</span>
                </label>
              ) : (
                <span />
              );
            return (
              <div key={department.id} className={styles.sign} data-aisle={department.id}>
                {neighbour(before, 'before')}
                <p className={styles.here}>
                  <Picture
                    image={media.departmentIcons[department.id]}
                    alt=""
                    sizes="3.5rem"
                    className={styles.signIcon}
                  />
                  <span className={styles.signName}>{aisles.departments[department.id].name}</span>
                </p>
                {neighbour(after, 'after')}
              </div>
            );
          })}
        </div>

        {/* The chosen department's categories: one set per department, the checked one shown,
            its name painted on the wall behind them. */}
        <div className={styles.products}>
          {DEPARTMENTS.map((department) => (
            <p
              key={department.id}
              className={styles.poster}
              data-aisle={department.id}
              style={{ '--em': POSTER[locale][department.id] }}
              aria-hidden="true"
            >
              {aisles.departments[department.id].name}
            </p>
          ))}
          {DEPARTMENTS.map((department) => {
            const copy = aisles.departments[department.id];
            return (
              <div key={department.id} className={styles.bay} data-aisle={department.id}>
                {/* The circled line names the aisle: its name is here for screen readers. */}
                <h3 className="visually-hidden">{copy.name}</h3>
                <ul className={styles.items} role="list">
                  {department.categories.map((category, index) => {
                    const { row, x, width, lean } = PILES[department.id][index];
                    const [column, line] = gatherPack(department.categories.length, index);
                    return (
                      <li
                        key={category}
                        className={styles.item}
                        data-row={row}
                        style={{
                          '--j': index,
                          '--x': x,
                          '--w': width,
                          '--lean': `${lean}deg`,
                          '--col': column,
                          '--line': line,
                        }}
                      >
                        <Picture
                          image={media.departments[department.id][category]}
                          alt=""
                          sizes={PRODUCT_SIZES}
                          className={styles.product}
                        />
                        <span className={styles.leader} aria-hidden="true" />
                        <span className={styles.label}>{copy.categories[category]}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>

        {/* The way to the chosen aisle in the app, as the app writes it (the chevron is mirrored
            right to left: ‹). */}
        <div className={styles.foot}>
          <p className={styles.where}>
            {aisles.where}{' '}
            <bdi className={styles.path} lang="ar" dir="rtl">
              {aisles.tab}
              <span className={styles.chevron} aria-hidden="true">
                ›
              </span>
              {DEPARTMENTS.map((department) => {
                const copy = aisles.departments[department.id];
                return (
                  <span key={department.id} className={styles.pathName} data-aisle={department.id}>
                    {copy.inApp ?? copy.name}
                  </span>
                );
              })}
            </bdi>
          </p>
        </div>
      </div>
    </section>
  );
}
