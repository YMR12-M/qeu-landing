import { useRef } from 'react';
import { CATEGORY_COUNT, DEPARTMENTS } from '../../content/departments.js';
import { media } from '../../content/media.js';
import { useScrollReveal } from '../../hooks/useScrollReveal.js';
import { useLocale } from '../../i18n/useLocale.js';
import { cx } from '../../lib/cx.js';
import { formatNumber, interpolate } from '../../lib/format.js';
import { WithBrand } from '../brand/WithBrand.jsx';
import { Edge } from '../ui/Edge.jsx';
import { Picture } from '../ui/Picture.jsx';
import { Scribble } from '../ui/Scribble.jsx';
import styles from './Aisles.module.css';

// "More than" this many categories: their count, rounded down to the ten.
const AT_LEAST = Math.floor(CATEGORY_COUNT / 10) * 10;

// A category takes a quarter of the products' width on a computer and a tablet, and a little
// over a third of the screen on a phone, where they are swiped.
const PRODUCT_SIZES = '(min-width: 64em) 11rem, (min-width: 48em) 20vw, 34vw';

// Behind the categories, the chosen department's name is set as wide as the products' column.
// CSS can't fit type to a width by itself, so here is how many ems wide each name's longest
// line is in the display face, Lalezar (measured in the browser), and on how many lines it is set — a long
// name a word to a line, its last word on the second. Measure again if a name changes.
const POSTER = {
  ar: {
    groceries: { em: 3.094, lines: 1 }, // المقاضي
    fresh: { em: 3.254, lines: 2 }, // المنتجات / الطازجة
    drinks: { em: 3.634, lines: 2 }, // المشروبات / والمفرحات
    home: { em: 2.566, lines: 2 }, // العناية / بالمنزل
    care: { em: 2.477, lines: 1 }, // كيو كير
    tech: { em: 2.77, lines: 1 }, // كيو تيك
  },
  en: {
    groceries: { em: 3.987, lines: 1 },
    fresh: { em: 2.31, lines: 1 },
    drinks: { em: 3.579, lines: 2 }, // Drinks & / treats
    home: { em: 4.411, lines: 1 },
    care: { em: 2.672, lines: 1 },
    tech: { em: 2.793, lines: 1 },
  },
};

/** A department's name as the poster sets it: on one line, or its last word on a second. */
function posterLines(name, lines) {
  if (lines === 1) return [name];
  const words = name.split(' ');
  return [words.slice(0, -1).join(' '), words.at(-1)];
}

/**
 * «أقسام كيو» — the store's aisles, on the deal yellow, as a poster. At the start, the store
 * directory set as a list of names: the app's six departments, each with its aisle number and
 * the app's own icon, the chosen one circled in pen. Beside it, from the top of the heading to
 * the foot of the directory, the chosen department's categories — the app's own picture of
 * each, standing straight on the yellow over its name, two rows of four, all in view at once —
 * and behind them the department's name, set huge in a deeper yellow, as wide as the column:
 * choose another and the name changes with the products. Under them, the way to that aisle in
 * the app.
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

        {/* The store directory: a numbered line per department, the chosen one circled. */}
        <fieldset className={styles.directory}>
          <legend className="visually-hidden">{aisles.legend}</legend>
          <p className={styles.directoryTitle} aria-hidden="true">
            {aisles.directory}
          </p>
          <div className={styles.lines}>
            {DEPARTMENTS.map((department, index) => (
              <label key={department.id} className={styles.line} style={{ '--i': index }}>
                <input
                  className={styles.radio}
                  type="radio"
                  name="aisle"
                  value={department.id}
                  defaultChecked={index === 0}
                />
                <span className={styles.aisleNumber} aria-hidden="true">
                  {number(index + 1)}
                </span>
                <Picture
                  image={media.departmentIcons[department.id]}
                  alt=""
                  sizes="2.75rem"
                  className={styles.icon}
                />
                <span className={styles.name}>
                  {aisles.departments[department.id].name}
                  <Scribble shape="circle" draw="parent" className={styles.circle} />
                  <Scribble shape="arrow" draw="parent" className={styles.toAisle} />
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        {/* The chosen department's categories: one set per department, the checked one shown,
            its name set huge behind them. */}
        <div className={styles.products}>
          {DEPARTMENTS.map((department) => {
            const { em, lines } = POSTER[locale][department.id];
            return (
              <p
                key={department.id}
                className={styles.poster}
                data-aisle={department.id}
                style={{ '--em': em }}
                aria-hidden="true"
              >
                {posterLines(aisles.departments[department.id].name, lines).map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </p>
            );
          })}
          {DEPARTMENTS.map((department) => {
            const copy = aisles.departments[department.id];
            return (
              <div key={department.id} className={styles.bay} data-aisle={department.id}>
                {/* The circled line names the aisle: its name is here for screen readers. */}
                <h3 className="visually-hidden">{copy.name}</h3>
                <ul className={styles.items} role="list">
                  {department.categories.map((category, index) => (
                    <li key={category} className={styles.item} style={{ '--j': index }}>
                      <Picture
                        image={media.departments[department.id][category]}
                        alt=""
                        sizes={PRODUCT_SIZES}
                        className={styles.product}
                      />
                      <span className={styles.label}>{copy.categories[category]}</span>
                    </li>
                  ))}
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
      <Edge kind="perforation" to="var(--night)" />
    </section>
  );
}
