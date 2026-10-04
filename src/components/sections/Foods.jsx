import { useRef } from 'react';
import { media } from '../../content/media.js';
import { MENU } from '../../content/menu.js';
import { useScrollReveal } from '../../hooks/useScrollReveal.js';
import { useLocale } from '../../i18n/useLocale.js';
import { cx } from '../../lib/cx.js';
import { formatDate, interpolate } from '../../lib/format.js';
import { WithBrand } from '../brand/WithBrand.jsx';
import { Picture } from '../ui/Picture.jsx';
import { Price } from '../ui/Price.jsx';
import { Scribble } from '../ui/Scribble.jsx';
import styles from './Foods.module.css';

// Each pack is drawn at most this wide: a quarter of the page on a computer, a third of it on a
// tablet, and nearly half the screen on a phone.
const PACK_SIZES = '(min-width: 64em) 19rem, (min-width: 48em) 30vw, 45vw';

/**
 * «كيو فودز», the first of the kitchen's two tabs (Kitchen.jsx) — Qeu's own sandwiches and
 * ready meal, set out on the white wall as a flyer sets out its offers: the headline in a column
 * of its own at the start, «تطبخ» crossed out in red pen — no cooking today — and beside it the
 * three offers filling the rest of the page, «من تحضير كيو» circled over them like a flyer's
 * stamp: each pack large, a yellow price sticker slapped on its corner — the deal price in red,
 * the one it replaces struck through — and its name and size under it.
 *
 * The packs are put out one after another as they come into view, each sticker slapped on after
 * its pack; the pre-rendered page — like reduced motion, or packs already on screen — shows them
 * in place.
 */
export function FoodsPanel() {
  const { t, locale } = useLocale();
  const { foods, prices } = t;
  const productsRef = useRef(null);
  useScrollReveal(productsRef, '0px 0px -15% 0px');
  const date = formatDate(MENU.capturedAt, { locale, dates: t.dates });
  const [before, after] = foods.title.split(foods.struck);

  return (
    <div className={cx('container', styles.layout)}>
      {/* The kitchen's switch names the tab: the heading goes straight to the question. */}
      <div className={styles.intro}>
        <h3 className={styles.title}>
          {before}
          <span className={styles.struck}>
            {foods.struck}
            <Scribble shape="strike" delay={500} className={styles.strike} />
          </span>
          {after}{' '}
          <span className={styles.accent}>
            <WithBrand text={foods.titleAccent} name={t.meta.siteName} className={styles.brand} />
          </span>
        </h3>
        <p className={styles.lead}>{foods.lead}</p>
      </div>

      {/* «من تحضير كيو», written on the wall over the packs and circled, like a flyer's stamp. */}
      <p className={styles.note} aria-hidden="true">
        <span>{foods.seal.main}</span> <span className={styles.noteName}>{foods.seal.sub}</span>
        <Scribble shape="circle" delay={900} className={styles.noteCircle} />
      </p>

      <figure className={styles.stage} aria-label={foods.fridgeLabel}>
        <ul ref={productsRef} className={styles.products} role="list">
          {MENU.foods.map((product, index) => {
            const copy = foods.products[product.id];
            return (
              <li
                key={product.id}
                className={styles.product}
                data-product={product.id}
                style={{ '--i': index }}
              >
                <Picture
                  image={media.foods[product.id]}
                  alt={copy.imageAlt}
                  sizes={PACK_SIZES}
                  className={styles.pack}
                />
                <p className={styles.tag}>
                  <span className={styles.name}>{copy.name}</span>
                  <span className={styles.size}>{copy.size}</span>
                </p>
                {/* The flyer's sticker, slapped on the pack's corner: the offer and its price. */}
                <p className={styles.sticker}>
                  <span className={styles.flag}>{foods.offer}</span>
                  <Price
                    value={product.price}
                    was={product.was}
                    locale={locale}
                    prices={prices}
                    className={styles.price}
                  />
                </p>
              </li>
            );
          })}
        </ul>

        <figcaption className={styles.source}>{interpolate(prices.source, { date })}</figcaption>
      </figure>

      <div className={styles.more}>
        {/* The tab's other shelves in the app, which the page doesn't show. */}
        <p className={styles.also}>
          {foods.also.label}{' '}
          <span className={styles.alsoItems}>{foods.also.items.join(' · ')}</span>
        </p>
        <p className={styles.where}>
          {foods.where}{' '}
          {/* The app is Arabic: the way to the tab is written as the app writes it. The
                chevron is mirrored right to left, so it points onwards: ‹. */}
          <bdi className={styles.path} lang="ar" dir="rtl">
            {foods.path.map((step, index) => (
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
