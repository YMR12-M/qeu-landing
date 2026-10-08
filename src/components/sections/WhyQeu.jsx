import { useRef } from 'react';
import { media } from '../../content/media.js';
import { useScrollReveal } from '../../hooks/useScrollReveal.js';
import { useLocale } from '../../i18n/useLocale.js';
import { cx } from '../../lib/cx.js';
import { WithBrand } from '../brand/WithBrand.jsx';
import { Picture } from '../ui/Picture.jsx';
import { Scribble } from '../ui/Scribble.jsx';
import styles from './WhyQeu.module.css';

// A promise whose first word runs longer than this is set a size smaller («اخترناها لك»).
const isLong = (sticker) => sticker.main.length > 5 || undefined;

/**
 * «ليش كيو؟» — the four benefits, all in view at once: the app's four screens stand in a row, each
 * leaning a little as it was put there, every second one set a step lower, each under a sign
 * painted with its promise — «1+1 مجاناً», «أقل سعر» — and the benefit's words under it. The sign
 * is the benefit's title (the name is there for a screen reader, once): nothing is said twice.
 * Nothing is hidden behind a scroll, a tab or a click: it is a list of four, read in order, and
 * seen at a glance.
 *
 * On a tablet it breaks into two rows of two; on a phone it is one row the reader swipes along,
 * the next screen showing at the edge, and a note in pen under it saying so.
 *
 * The screens are put down one after another as the row comes into view (the pre-rendered page,
 * reduced motion, or a row already on screen shows them in place).
 */
export function WhyQeu() {
  const { t } = useLocale();
  const { why } = t;
  const rowRef = useRef(null);
  useScrollReveal(rowRef, '0px 0px -15% 0px');

  return (
    <section id="why" className={styles.section} aria-labelledby="why-title">
      {/* qeu.app's old anchor for this section, so links to it still land here. */}
      <span id="benefits" aria-hidden="true" />
      <div className={cx('container', styles.inner)}>
        <div className={styles.intro}>
          <h2 id="why-title" className={styles.title}>
            <WithBrand text={why.title} name={t.meta.siteName} className={styles.brand} />
          </h2>
          <p className={styles.lead}>{why.lead}</p>
        </div>

        <ol ref={rowRef} className={styles.row} role="list">
          {why.items.map((item, index) => (
            <li key={item.id} className={styles.bay} style={{ '--i': index }}>
              {/* The benefit's name, for a screen reader: the sign under it paints the same
                  promise, so a sighted reader has it once. */}
              <h3 className="visually-hidden">{item.title}</h3>
              <p className={styles.sign} data-long={isLong(item.sticker)} aria-hidden="true">
                <span>{item.sticker.main}</span> <span>{item.sticker.sub}</span>
              </p>
              <Picture
                image={media.why[item.id]}
                alt={item.imageAlt}
                sizes="(min-width: 64em) 15rem, 12rem"
                className={styles.phone}
              />
              <p className={styles.text}>{item.text}</p>
            </li>
          ))}
        </ol>

        {/* Phones: the row is swiped, and this says so. */}
        <p className={styles.swipe} aria-hidden="true">
          {why.swipe}
          <Scribble shape="arrow" delay={900} className={styles.swipeArrow} />
        </p>
      </div>
    </section>
  );
}
