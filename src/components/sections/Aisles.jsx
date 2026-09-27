import { useEffect, useRef, useState } from 'react';
import { CATEGORY_COUNT, DEPARTMENTS } from '../../content/departments.js';
import { media } from '../../content/media.js';
import { useScrollReveal } from '../../hooks/useScrollReveal.js';
import { useLocale } from '../../i18n/useLocale.js';
import { cx } from '../../lib/cx.js';
import { formatNumber, interpolate } from '../../lib/format.js';
import { WithBrand } from '../brand/WithBrand.jsx';
import { DownloadLink } from '../download/DownloadLink.jsx';
import { ChevronBack } from '../ui/icons.jsx';
import { Picture } from '../ui/Picture.jsx';
import { Sticker } from '../ui/Sticker.jsx';
import styles from './Aisles.module.css';

// "More than" this many categories: their count, rounded down to the ten.
const AT_LEAST = Math.floor(CATEGORY_COUNT / 10) * 10;

// A category stands in a quarter of the shelf (a little over a third on a phone), a little
// narrower than it.
const PRODUCT_SIZES = '(min-width: 64em) 11rem, (min-width: 48em) 20vw, 32vw';

/**
 * One department's shelf: its categories in a single row that slides sideways — swiped on a
 * phone; on a wider screen, moved along a shelf's width at a time by the arrows at its ends,
 * the one at an end it has reached dimmed. Without JavaScript the arrows are left out, and a
 * wide screen stacks the row into shelves again (public/no-js.css).
 */
function Shelf({ department, copy, labels }) {
  const shelfRef = useRef(null);
  const [ends, setEnds] = useState({ start: true, end: false });

  useEffect(() => {
    const shelf = shelfRef.current;
    let frame = 0;
    const update = () => {
      frame = 0;
      // Right to left, scrollLeft runs negative from the start: its size is what counts.
      const scrolled = Math.abs(shelf.scrollLeft);
      const room = shelf.scrollWidth - shelf.clientWidth;
      setEnds({ start: scrolled < 2, end: scrolled > room - 2 });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    shelf.addEventListener('scroll', schedule, { passive: true });
    // Read once it has a size, and again whenever it changes: a bay shown, a screen turned.
    const resize = new ResizeObserver(schedule);
    resize.observe(shelf);
    return () => {
      cancelAnimationFrame(frame);
      shelf.removeEventListener('scroll', schedule);
      resize.disconnect();
    };
  }, []);

  // A shelf's width at a time — the room between the arrows — towards its end (1) or back
  // towards its start (-1). The row snaps to a category's edge as it stops.
  const slide = (towards) => {
    const shelf = shelfRef.current;
    const style = getComputedStyle(shelf);
    const width =
      shelf.clientWidth - parseFloat(style.paddingInlineStart) - parseFloat(style.paddingInlineEnd);
    shelf.scrollBy({ left: towards * width * (style.direction === 'rtl' ? -1 : 1) });
  };

  return (
    <div className={styles.shelf}>
      <ul ref={shelfRef} className={styles.shelves} role="list" data-shelf>
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
      {[
        ['start', -1, labels.previous],
        ['end', 1, labels.next],
      ].map(([end, towards, label]) => (
        <button
          key={end}
          type="button"
          className={styles.arrow}
          data-to={end}
          aria-label={label}
          aria-disabled={ends[end] || undefined}
          onClick={() => slide(towards)}
          data-needs-js
        >
          <ChevronBack className={styles.arrowIcon} />
        </button>
      ))}
    </div>
  );
}

/**
 * «أقسام كيو» — the store's aisles. A sign hangs from the ceiling rail for each of the app's
 * departments, and the shelf under them is stocked with the chosen department's categories:
 * the app's own picture of each, standing on the shelf over its label, and the way to that
 * aisle in the app under it. Choosing another sign swings it and lights it up, and the shelf
 * is restocked — every category dropped into its place — for that aisle.
 *
 * The signs are a radio group, so choosing works with a keyboard and a screen reader like any
 * form, and without JavaScript: the stylesheet shows the checked aisle's shelf (:has()), and a
 * shelf that appears restocks from the start. The one scripted part is the first reveal: while
 * the aisles wait below the fold, the signs are folded up against the ceiling; in view, they
 * flip down one after another as the shelf is stocked.
 */
export function Aisles() {
  const { t, locale } = useLocale();
  const { aisles } = t;
  const storeRef = useRef(null);
  useScrollReveal(storeRef, '0px 0px -25% 0px');
  const number = (value) => formatNumber(value, { locale });

  return (
    <section id="departments" className={styles.section} aria-labelledby="departments-title">
      <div className={cx('container', styles.layout)}>
        <div className={styles.intro}>
          <div className={styles.heading}>
            <p className={styles.eyebrow}>{aisles.eyebrow}</p>
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
          <span className={styles.sticker}>
            <Sticker
              shape="burst"
              main={`+${number(AT_LEAST)}`}
              sub={aisles.sticker}
              reveal
              style={{ '--tilt': '-9deg' }}
            />
          </span>
        </div>

        <div ref={storeRef} className={styles.store}>
          {/* The signs, hanging from the ceiling rail: one per department, the chosen one lit. */}
          <fieldset className={styles.signs}>
            <legend className="visually-hidden">{aisles.legend}</legend>
            <div className={styles.rail}>
              {DEPARTMENTS.map((department, index) => {
                const copy = aisles.departments[department.id];
                return (
                  <label key={department.id} className={styles.sign} style={{ '--i': index }}>
                    <input
                      className={styles.radio}
                      type="radio"
                      name="aisle"
                      value={department.id}
                      defaultChecked={index === 0}
                    />
                    <span className={styles.hanger}>
                      <span className={styles.board}>
                        <Picture
                          image={media.departmentIcons[department.id]}
                          alt=""
                          sizes="2.5rem"
                          className={styles.signIcon}
                        />
                        <span className={styles.signName}>{copy.name}</span>
                      </span>
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          {/* The shelf under them: one bay per department, the checked one shown. */}
          <div className={styles.gondola}>
            {DEPARTMENTS.map((department) => {
              const copy = aisles.departments[department.id];
              return (
                <div key={department.id} className={styles.bay} data-aisle={department.id}>
                  {/* The lit sign names the aisle: its name is here for screen readers. */}
                  <h3 className="visually-hidden">{copy.name}</h3>
                  <Shelf department={department} copy={copy} labels={aisles.shelf} />
                </div>
              );
            })}
            <span className={styles.kick} aria-hidden="true" />
          </div>

          {/* Under the shelf: the way to the chosen aisle in the app, as the app writes it (the
              chevron is mirrored right to left: ‹). */}
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

        <DownloadLink
          placement="departments"
          variant="link"
          labels={t.hero.cta}
          className={styles.cta}
        >
          {aisles.cta}
        </DownloadLink>
      </div>
    </section>
  );
}
