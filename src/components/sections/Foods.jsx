import { useEffect, useRef } from 'react';
import { media } from '../../content/media.js';
import { MENU } from '../../content/menu.js';
import { useLocale } from '../../i18n/useLocale.js';
import { cx } from '../../lib/cx.js';
import { formatDate, formatPrice, interpolate } from '../../lib/format.js';
import { Logo } from '../brand/Logo.jsx';
import { WithBrand } from '../brand/WithBrand.jsx';
import { DownloadLink } from '../download/DownloadLink.jsx';
import { Picture } from '../ui/Picture.jsx';
import { Sticker } from '../ui/Sticker.jsx';
import styles from './Foods.module.css';

// The fridge's shelves, top to bottom, and the products on each (src/content/menu.js).
const SHELVES = ['sandwiches', 'meals'].map((shelf) =>
  MENU.foods.filter((product) => product.shelf === shelf),
);

// Each pack is drawn at most this wide: a sandwich takes about a third of the fridge, and the
// fridge is 30em — as wide as 26rem on a computer, and nearly the screen on a phone.
const PACK_SIZES = '(min-width: 56em) 8.5rem, 30vw';

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * «كيو فودز», the first of the kitchen's two tabs (Kitchen.jsx) — Qeu's own sandwiches and
 * ready meals, in the fridge they're sold from: a double-door display fridge under Qeu's lit
 * sign, the packs standing on its shelves over their yellow deal labels, and a «من تحضير كيو»
 * rosette on its corner. The fridge is closed while it waits below the fold; as it comes into
 * view its light flickers on, both glass doors swing open and the cold spills out.
 *
 * The pre-rendered page — like reduced motion, or a fridge already on screen — shows it open:
 * only the opening is scripted, and it only plays once.
 */
export function FoodsPanel() {
  const { t, locale } = useLocale();
  const { foods, prices } = t;
  const fridgeRef = useRef(null);
  const date = formatDate(MENU.capturedAt, { locale, dates: t.dates });

  useEffect(() => {
    const fridge = fridgeRef.current;
    if (reducedMotion() || fridge.getBoundingClientRect().top < window.innerHeight) return;

    fridge.dataset.door = 'closed';
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        fridge.dataset.door = 'open';
        observer.disconnect();
      },
      // Once most of it is in view: the doors open where they are seen.
      { rootMargin: '0px 0px -35% 0px' },
    );
    observer.observe(fridge);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={cx('container', styles.layout)}>
      {/* The kitchen's switch names the tab: the heading goes straight to the question. */}
      <div className={styles.intro}>
        <h3 className={styles.title}>
          {foods.title}{' '}
          <span className={styles.accent}>
            <WithBrand text={foods.titleAccent} name={t.meta.siteName} className={styles.brand} />
          </span>
        </h3>
        <p className={styles.lead}>{foods.lead}</p>
      </div>

      <figure className={styles.stage} aria-label={foods.fridgeLabel}>
        <div ref={fridgeRef} className={styles.fridge}>
          {/* The lit sign: the wordmark and «فودز», as the app names the tab. */}
          <div className={styles.sign} aria-hidden="true" dir="rtl">
            <Logo className={styles.signLogo} />
            <span className={styles.signWord} lang="ar">
              {foods.sign}
            </span>
          </div>

          <div className={styles.cabinet}>
            <div className={styles.interior}>
              {SHELVES.map((products, shelf) => (
                <ul key={shelf} className={styles.shelf} role="list">
                  {products.map((product, index) => {
                    const copy = foods.products[product.id];
                    return (
                      <li
                        key={product.id}
                        className={styles.product}
                        data-product={product.id}
                        style={{ '--i': shelf * 2 + index }}
                      >
                        {/* The pack at the front, and its stock lined up behind it. */}
                        <span className={styles.facing}>
                          <Picture
                            image={media.foods[product.id]}
                            alt=""
                            sizes={PACK_SIZES}
                            className={styles.stock}
                          />
                          <Picture
                            image={media.foods[product.id]}
                            alt={copy.imageAlt}
                            sizes={PACK_SIZES}
                            className={styles.pack}
                          />
                        </span>
                        {/* Its label on the shelf edge: a yellow deal flag, the name, the
                              size and the price — the app's price, and the one it replaces. */}
                        <p className={styles.tag}>
                          <span className={styles.flag}>{foods.offer}</span>
                          <span className={styles.tagText}>
                            <span className={styles.tagName}>{copy.name}</span>
                            <span className={styles.tagSize}>{copy.size}</span>
                          </span>
                          <span className={styles.tagPrices}>
                            <span className={styles.price}>
                              {formatPrice(product.price, { locale, template: prices.price })}
                            </span>
                            <s className={styles.was}>
                              <span className="visually-hidden">{prices.was} </span>
                              {formatPrice(product.was, { locale })}
                            </s>
                          </span>
                        </p>
                      </li>
                    );
                  })}
                </ul>
              ))}
              {/* The fridge's light, off while its doors are shut. */}
              <span className={styles.dim} aria-hidden="true" />
            </div>

            {/* The glass doors, hinged at the fridge's two sides, and the cold that spills
                  out when they open. */}
            <div className={styles.doors} aria-hidden="true">
              <span className={styles.door} data-side="left">
                <span className={styles.handle} />
              </span>
              <span className={styles.door} data-side="right">
                <span className={styles.handle} />
              </span>
            </div>
            <span className={styles.mist} aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
          </div>

          <div className={styles.base} aria-hidden="true" />

          {/* «من تحضير كيو», slapped on the sign's corner once the doors are open. */}
          <span className={styles.seal}>
            <Sticker
              shape="seal"
              main={foods.seal.main}
              sub={foods.seal.sub}
              data-state="slap"
              style={{ '--tilt': '9deg' }}
            />
          </span>
        </div>
        <figcaption className={styles.source}>{interpolate(prices.source, { date })}</figcaption>
      </figure>

      <div className={styles.more}>
        {/* The tab's other shelves in the app, which the fridge doesn't show. */}
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
        <DownloadLink placement="foods" variant="link" labels={t.hero.cta} className={styles.cta}>
          {foods.cta}
        </DownloadLink>
      </div>
    </div>
  );
}
