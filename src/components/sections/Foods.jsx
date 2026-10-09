import { useRef, useState } from 'react';
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

// A pack is drawn at most about a third of its pile: a pile is a third of the page on a computer
// and most of the screen on a phone, where one pile is shown at a time.
const PACK_SIZES = '(min-width: 64em) 10rem, (min-width: 48em) 7rem, 30vw';

/**
 * How each shelf's packs are piled, as a shop stacks them on its counter, in hundredths of the
 * pile's width: `ratio` is the pile's height; each pack is [id, start, bottom, width, lean],
 * listed from the back of the pile to the top, the order they are put out in.
 *
 * - The clubs stand in a row, leaning on one another like books, the croissant rolls in front.
 * - The minis and jumbos lie in a pyramid of loaves: three, two on them, and one on top.
 * - The tubs are stacked three and two, and the tall jar of tabbouleh stands beside them.
 */
const PILES = {
  clubs: {
    ratio: 61,
    packs: [
      ['club-caesar', 2, 16, 34, -7],
      ['club-halloumi', 22, 17, 34, -3],
      ['club-shakshuka', 42, 16.5, 34, 2],
      ['club-tuna', 62, 16, 34, 6],
      ['croissant-lotus', 12, 0, 33, -3],
      ['croissant-pistachio', 53, 0, 32, 4],
    ],
  },
  minis: {
    ratio: 53,
    packs: [
      ['jumbo-shawarma', 0, 0, 38, -1.5],
      ['jumbo-turkey', 31, 0, 38, 1],
      ['jumbo-caesar', 62, 0, 38, -2],
      ['mini-mortadella', 14, 17, 38, 2],
      ['multigrain-turkey', 48, 17, 36, -2],
      ['mini-falafel', 28, 33, 42, -1],
    ],
  },
  dips: {
    ratio: 41,
    packs: [
      ['salad-quinoa', 80, 0, 20, 2],
      ['hummus-classic', 0, 0, 34, -1],
      ['hummus-cilantro', 29, 0, 34, 1.5],
      ['hummus-foul', 58, 0, 34, -1.5],
      ['hummus-beiruti', 14.5, 17, 34, 2],
      ['labneh-olives', 43.5, 17, 34, -2],
    ],
  },
};

/**
 * «كيو فودز», the first of the kitchen's two tabs (Kitchen.jsx) — Qeu's own sandwiches, dips and
 * salads, put out on the wall as a shop puts out its stock: not a grid of eighteen look-alike
 * cards, but three piles, each stacked the way its packs stack (PILES), with one cardboard price
 * sign leaning at its foot. The headline first, «تطبخ» crossed out in red pen — no cooking today —
 * and «من تحضير كيو» circled beside it; under it the piles.
 *
 * The sign is what is read: what is on the pile, a strip of tape with its lowest price, and the
 * six packs with their sizes and prices, written in marker. The piles are the pictures beside
 * it (hidden from screen readers, which read the signs). Pointing at a pack marks its line on
 * the sign, and pointing at a line lifts its pack out of the pile; a tap does the same on a
 * phone.
 *
 * On a computer the three piles stand side by side; on a tablet they are swiped along; on a
 * phone one is shown at a time, picked by three short names above them (a radio group, like the
 * kitchen's own switch: it works without a script too). They are
 * stacked pack by pack, from the back of each pile to its top, as they come into view, and each
 * sign is leant on after its pile; the pre-rendered page — like reduced motion, or piles already
 * on screen — shows them in place.
 */
export function FoodsPanel() {
  const { t, locale } = useLocale();
  const { foods, prices } = t;
  const pilesRef = useRef(null);
  const [active, setActive] = useState(null);
  useScrollReveal(pilesRef, '0px 0px -15% 0px');
  const date = formatDate(MENU.foods.capturedAt, { locale, dates: t.dates });
  const [before, after] = foods.title.split(foods.struck);

  // A mouse marks what it points at, and lets go when it leaves; a finger or a pen marks what it
  // taps, until the next tap (on it again, it lets go).
  const pointAt = (id) => ({
    onPointerEnter: (event) => event.pointerType === 'mouse' && setActive(id),
    onPointerLeave: (event) => event.pointerType === 'mouse' && setActive(null),
    onPointerUp: (event) =>
      event.pointerType !== 'mouse' && setActive((current) => (current === id ? null : id)),
  });

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
      </div>

      <div className={styles.aside}>
        <p className={styles.lead}>{foods.lead}</p>
        {/* «من تحضير كيو», written on the wall and circled, like a flyer's stamp — and an arrow
            from it down to the piles it speaks of. */}
        <div className={styles.stamp} aria-hidden="true">
          <p className={styles.note}>
            <span>{foods.seal.main}</span> <span className={styles.noteName}>{foods.seal.sub}</span>
            <Scribble shape="circle" delay={900} className={styles.noteCircle} />
          </p>
          <Scribble shape="arrow" delay={1300} className={styles.arrow} />
        </div>
      </div>

      {/* Phones only: the three piles are one at a time, and these are their names. */}
      <fieldset className={styles.chips}>
        <legend className="visually-hidden">{foods.shelvesLabel}</legend>
        {MENU.foods.shelves.map((shelf, shelfIndex) => (
          <label key={shelf.id} className={styles.chip}>
            <input
              className={styles.chipRadio}
              type="radio"
              name="foods-shelf"
              value={shelf.id}
              defaultChecked={shelfIndex === 0}
            />
            <span className={styles.chipName}>{foods.chips[shelf.id]}</span>
          </label>
        ))}
      </fieldset>

      <div ref={pilesRef} className={styles.piles} role="group" aria-label={foods.shelvesLabel}>
        {MENU.foods.shelves.map((shelf, shelfIndex) => {
          const pile = PILES[shelf.id];
          const lowest = Math.min(...shelf.items.map((item) => item.price));
          return (
            <section
              key={shelf.id}
              className={styles.stall}
              data-shelf={shelf.id}
              aria-labelledby={`foods-${shelf.id}`}
              style={{ '--pile': shelfIndex, '--count': pile.packs.length }}
            >
              {/* The pile: the packs, stacked. */}
              <div className={styles.pile} style={{ '--ratio': pile.ratio }} aria-hidden="true">
                {pile.packs.map(([id, start, bottom, width, lean], order) => (
                  <span
                    key={id}
                    className={styles.pack}
                    data-active={active === id || undefined}
                    style={{
                      '--x': start,
                      '--b': bottom,
                      '--w': width,
                      '--lean': `${lean}deg`,
                      '--n': order,
                    }}
                    {...pointAt(id)}
                  >
                    <Picture
                      image={media.foods[id]}
                      alt=""
                      sizes={PACK_SIZES}
                      className={styles.packImage}
                    />
                  </span>
                ))}
              </div>

              {/* The sign leant at its foot: what is on it, from what price, and every pack's
                  line — its name and size, and its price, the old one struck through. */}
              <div className={styles.sign}>
                <div className={styles.board}>
                  <h4 id={`foods-${shelf.id}`} className={styles.signName}>
                    {foods.shelves[shelf.id]}
                  </h4>
                  {/* A strip of tape across the sign's corner, the pile's lowest price written on it. */}
                  <p className={styles.tape}>
                    <span className={styles.tapeFrom}>{foods.from}</span>
                    <Price
                      value={lowest}
                      locale={locale}
                      prices={prices}
                      className={styles.tapePrice}
                    />
                  </p>
                  <ul className={styles.lines} role="list">
                    {shelf.items.map((item) => {
                      const copy = foods.products[item.id];
                      return (
                        <li
                          key={item.id}
                          className={styles.line}
                          data-active={active === item.id || undefined}
                          {...pointAt(item.id)}
                        >
                          <span className={styles.what}>
                            <span className={styles.name}>{copy.name}</span>{' '}
                            <span className={styles.size}>{copy.size}</span>
                          </span>
                          <Price
                            value={item.price}
                            was={item.was}
                            locale={locale}
                            prices={prices}
                            className={styles.price}
                          />
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <div className={styles.more}>
        <p className={styles.source}>{interpolate(prices.source, { date })}</p>
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
