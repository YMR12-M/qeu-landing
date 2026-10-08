import { Fragment, useEffect, useRef, useState } from 'react';
import { ASSISTANT_CHAT as chat } from '../../content/assistant-chat.js';
import { media } from '../../content/media.js';
import { useLocale } from '../../i18n/useLocale.js';
import { cx } from '../../lib/cx.js';
import { DownloadLink } from '../download/DownloadLink.jsx';
import {
  ArrowUp,
  Basket,
  Check,
  ChevronBack,
  Copy,
  Replay,
  Sparkle,
  ThumbDown,
  ThumbUp,
} from '../ui/icons.jsx';
import { Picture } from '../ui/Picture.jsx';
import styles from './Assistant.module.css';

const GRADIENT = 'qur-sparkle';
const SPEAKERS = { user: 'كيمو', qur: 'كيور' };

// When each part of the conversation arrives, in seconds from the start of the replay. كيور
// "types" for a moment before each of its messages, then its words stream in. The whole replay
// is over within five seconds, so it needs no pause control (WCAG 2.2.2).
const AT = { hello: 0.15, greeting: 0.9, ask: 1.6, reply: 2.25, list: 2.75, salad: 3.65 };
const HINT_AT = 4.3;

/**
 * A pen arrow, drawn in the phone's own grid — ems of its font, 24 across and 48 down (see
 * Assistant.module.css → --u) — so it lands on the same spot of the screen at any size: a curve
 * from a note to the part of the screen it explains, and a head on the end, along the curve.
 */
function penArrow([x0, y0], [c1x, c1y], [c2x, c2y], [x1, y1]) {
  const angle = Math.atan2(y1 - c2y, x1 - c2x);
  const barb = (turn) => {
    const a = angle + Math.PI + turn;
    return `${(x1 + 0.95 * Math.cos(a)).toFixed(2)} ${(y1 + 0.95 * Math.sin(a)).toFixed(2)}`;
  };
  return {
    shaft: `M${x0} ${y0}C${c1x} ${c1y} ${c2x} ${c2y} ${x1} ${y1}`,
    head: `M${barb(-0.55)}L${x1} ${y1}L${barb(0.5)}`,
  };
}

// The steps, as notes round the phone, each pointing at its part of the screen (the screen is
// right to left in both languages, so the parts are always where they are): the question in
// your bubble, كيور's list, its «أضف الكل» — and the way to get the app, at the box to ask
// كيور in. Each is written in as the conversation reaches it; the ends are measured from the
// screen as it is drawn.
const NOTES = [
  { id: 'ask', at: AT.ask, arrow: penArrow([-4, 15.3], [-2.3, 15.5], [-0.5, 16.8], [1.05, 18.75]) },
  { id: 'list', at: AT.list, arrow: penArrow([28, 34], [26.2, 33.9], [24.3, 33], [22.95, 31.2]) },
  { id: 'add', at: HINT_AT, arrow: penArrow([-4, 30.6], [-2.1, 30.5], [0.1, 28.9], [1.95, 26.05]) },
];
const CTA_AT = HINT_AT + 0.5;
const CTA_ARROW = penArrow([28, 42.9], [26.3, 43], [24.7, 44], [23.45, 45.2]);

const FLIGHT = 900; // ms: one product's flight into the cart
const FLIGHT_GAP = 150; // ms between two products taking off

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Checkpoints for the replay's start: every 5% of the phone, up to half of it.
const IN_VIEW_STEPS = Array.from({ length: 11 }, (_, step) => step / 20);

/**
 * Flies a copy of each product picture into the cart bar: straight across and up-and-over in
 * an arc — two animations on two nested boxes, so the path curves — shrinking as it lands.
 * The copies live on <body>, above everything, and are removed once they land.
 */
function flyToCart(images, target) {
  const end = target.getBoundingClientRect();
  const endX = end.left + end.width / 2;
  const endY = end.top + end.height / 2;

  images.forEach((image, index) => {
    const start = image.getBoundingClientRect();
    const x = endX - (start.left + start.width / 2);
    const y = endY - (start.top + start.height / 2);
    const flight = document.createElement('div');
    const copy = document.createElement('img');
    flight.className = styles.flight;
    Object.assign(flight.style, {
      left: `${start.left}px`,
      top: `${start.top}px`,
      width: `${start.width}px`,
      height: `${start.height}px`,
    });
    copy.src = image.currentSrc || image.src;
    copy.alt = '';
    flight.append(copy);
    document.body.append(flight);

    const timing = { duration: FLIGHT, delay: index * FLIGHT_GAP, fill: 'both' };
    flight.animate([{ transform: 'none' }, { transform: `translateX(${x}px)` }], {
      ...timing,
      easing: 'cubic-bezier(0.45, 0, 0.55, 1)',
    });
    const arc = copy.animate(
      [
        { transform: 'none', easing: 'cubic-bezier(0.2, 0.6, 0.35, 1)' },
        {
          transform: `translateY(${Math.min(0, y) - 64}px) scale(0.72)`,
          offset: 0.4,
          easing: 'cubic-bezier(0.55, 0, 0.85, 0.35)',
        },
        { transform: `translateY(${y}px) scale(0.2)`, opacity: 0.35 },
      ],
      timing,
    );
    arc.finished.finally(() => flight.remove());
  });
}

/** A message of كيور's, its words in separate spans so they can stream in one by one. */
function Words({ text }) {
  return text.split(' ').map((word, index) => (
    <Fragment key={index}>
      {index > 0 && ' '}
      <span className={styles.word} style={{ '--i': index }}>
        {word}
      </span>
    </Fragment>
  ));
}

/**
 * «اسأل كيور» — the app's assistant, live, as a poster shows a feature: the phone in the middle,
 * its title one line broken by it — «اسأل كيور» before the phone, «عن طبختك» after it — and the
 * steps written round it as notes, each with a pen arrow pointing at the part of the screen it
 * explains. Its conversation about kabsa, word for word from Qeu's store screenshot, replays in
 * the phone as the section scrolls into view: the question, كيور typing, its answer streaming
 * in, then the list of ingredients — each note written in as the conversation reaches its part.
 * And «أضف الكل» works: the products fly into a cart that slides up and counts them in. The
 * last note is the way to get the app, pointing at the box where you would ask كيور yourself.
 * On a phone the title is over the screen, and the notes are listed under it, their numbers
 * pinned on the parts they explain.
 *
 * The pre-rendered page shows the conversation whole — as does reduced motion, or a phone
 * already on screen when the page loads — and only the replay is scripted.
 */
export function Assistant() {
  const { t } = useLocale();
  const { assistant } = t;
  const { list } = chat;
  const sectionRef = useRef(null);
  const phoneRef = useRef(null);
  const productsRef = useRef(null);
  const composerRef = useRef(null);
  const [added, setAdded] = useState(false);
  const [before, after] = assistant.title.split(assistant.name);

  // Armed while the phone is below the fold, the replay starts once half of it is in view — or,
  // on a screen shorter than that (a phone on its side), once it fills half the screen. Half of
  // a phone taller than twice the screen is never in view at once: the replay would never start
  // and the phone would stay empty.
  useEffect(() => {
    const section = sectionRef.current;
    const phone = phoneRef.current;
    if (reducedMotion() || phone.getBoundingClientRect().top < window.innerHeight) return;

    section.dataset.demo = 'ready';
    const observer = new IntersectionObserver(
      ([entry]) => {
        const screen = entry.rootBounds?.height ?? window.innerHeight;
        const needed = Math.min(entry.boundingClientRect.height, screen) / 2 - 1; // 1px: rounding
        if (!entry.isIntersecting || entry.intersectionRect.height < needed) return;
        section.dataset.demo = 'play';
        observer.disconnect();
      },
      { threshold: IN_VIEW_STEPS },
    );
    observer.observe(phone);
    return () => observer.disconnect();
  }, []);

  const replay = () => {
    const section = sectionRef.current;
    setAdded(false);
    if (reducedMotion()) return;
    section.dataset.demo = '';
    void section.offsetWidth; // a fresh start for every animation
    section.dataset.demo = 'play';
  };

  const addAll = () => {
    if (added) return;
    setAdded(true);
    if (reducedMotion()) return;
    flyToCart([...productsRef.current.querySelectorAll('img')], composerRef.current);
  };

  return (
    <section
      ref={sectionRef}
      id="assistant"
      className={styles.section}
      style={{ '--hint-at': `${HINT_AT}s` }}
      aria-labelledby="assistant-title"
    >
      {/* The app's violet-to-teal, for every sparkle in the section. */}
      <svg className={styles.defs} aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id={GRADIENT} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#e08ad6" />
            <stop offset="0.5" stopColor="#7c9cf2" />
            <stop offset="1" stopColor="#1fc8b9" />
          </linearGradient>
        </defs>
      </svg>

      <div className={cx('container', styles.layout)}>
        <div className={styles.stage}>
          <div className={styles.board}>
            {/* On a computer the title is one line broken by the phone: its first half before
                the phone, its second after it, both level with the top of the screen. */}
            <h2 id="assistant-title" className={styles.title}>
              <span className={styles.titleStart}>
                {before}
                <span className={styles.name}>{assistant.name}</span>
              </span>{' '}
              <span className={styles.titleEnd}>{after.trim()}</span>
            </h2>
            <p className={styles.lead}>{assistant.lead}</p>

            <figure className={styles.demo} aria-label={assistant.demoLabel}>
              <div ref={phoneRef} className={styles.phone} lang="ar" dir="rtl">
                <div className={styles.screen}>
                  <span className={styles.island} aria-hidden="true" />
                  <div className={styles.chatHead}>
                    <ChevronBack className={styles.back} />
                    <p className={styles.chatTitle}>{chat.title}</p>
                    <p className={styles.newChat} aria-hidden="true">
                      {chat.newChat}
                    </p>
                  </div>

                  <ol className={styles.thread} role="list">
                    {chat.messages.map((message) => {
                      const at = { '--at': `${AT[message.id]}s` };

                      if (message.id === 'list') {
                        return (
                          <li key={message.id}>
                            <span className="visually-hidden">{SPEAKERS.qur}: </span>
                            <div className={styles.card} data-added={added || undefined} style={at}>
                              <div className={styles.cardHead}>
                                <Sparkle className={styles.cardMark} />
                                <div className={styles.cardTitles}>
                                  <p className={styles.cardTitle}>{list.title}</p>
                                  <p className={styles.cardMeta}>
                                    <span>
                                      {list.count} {list.countUnit}
                                    </span>
                                    <span>
                                      {list.total} {list.currency}
                                    </span>
                                  </p>
                                </div>
                                <button
                                  type="button"
                                  className={styles.addAll}
                                  aria-disabled={added || undefined}
                                  onClick={addAll}
                                >
                                  {added ? (
                                    <Check className={styles.addIcon} />
                                  ) : (
                                    <span className={styles.plus} aria-hidden="true">
                                      +
                                    </span>
                                  )}
                                  <span className={styles.addAllLabel}>
                                    {added ? list.added : list.addAll}
                                  </span>
                                </button>
                              </div>

                              <ul ref={productsRef} className={styles.products} role="list">
                                {list.products.map((product, index) => (
                                  <li
                                    key={product.id}
                                    className={styles.product}
                                    style={{ '--i': index }}
                                  >
                                    <span className={styles.productImage}>
                                      <Picture
                                        image={media.assistant[product.id]}
                                        alt=""
                                        sizes="6rem"
                                        className={styles.productImg}
                                      />
                                      <span className={styles.productAdded} aria-hidden="true">
                                        <Check />
                                      </span>
                                    </span>
                                    <p className={styles.price}>
                                      {product.price}{' '}
                                      <span className={styles.currency}>{list.currency}</span>{' '}
                                      <s className={styles.was}>{product.was}</s>
                                    </p>
                                    <p className={styles.productName}>{product.name}</p>
                                    <p className={styles.size}>{product.size}</p>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </li>
                        );
                      }

                      if (message.from === 'user') {
                        return (
                          <li key={message.id} className={styles.user} style={at}>
                            <span className="visually-hidden">{SPEAKERS.user}: </span>
                            {message.text}
                          </li>
                        );
                      }

                      return (
                        <li key={message.id} className={styles.qur} style={at}>
                          <div className={styles.qurBody}>
                            <p className={styles.qurText}>
                              <span className="visually-hidden">{SPEAKERS.qur}: </span>
                              <Words text={message.text} />
                            </p>
                            {message.reactions && (
                              <span className={styles.reactions} aria-hidden="true">
                                <Copy />
                                <ThumbUp />
                                <ThumbDown />
                              </span>
                            )}
                          </div>
                          <Sparkle gradient={GRADIENT} className={styles.qurMark} />
                          <span className={styles.typing} aria-hidden="true">
                            <i />
                            <i />
                            <i />
                          </span>
                        </li>
                      );
                    })}
                  </ol>

                  <div ref={composerRef} className={styles.composer} aria-hidden="true">
                    <span>{chat.composer}</span>
                    <span className={styles.send}>
                      <ArrowUp />
                    </span>
                  </div>

                  {/* The cart the products land in: the card's own count and total, counted up. */}
                  <div
                    className={styles.cart}
                    data-open={added || undefined}
                    style={{ '--qty-to': list.count, '--sar-to': list.total }}
                    aria-hidden="true"
                  >
                    <Basket className={styles.cartIcon} />
                    <span className={styles.cartLabel}>{chat.cart}</span>
                    <span className={styles.cartFigures}>
                      <span className={styles.cartQty} /> {list.countUnit}
                      <span className={styles.cartDot}>·</span>
                      <span className={styles.cartSar} /> {list.currency}
                    </span>
                  </div>
                </div>
              </div>
              <p className="visually-hidden" aria-live="polite">
                {added ? assistant.added : ''}
              </p>

              {/* The pen's arrows from the notes to the screen, and — for the list on a phone —
                  each note's number pinned on its part. */}
              <svg
                className={styles.arrows}
                viewBox="-18 0 60 48"
                aria-hidden="true"
                focusable="false"
              >
                {[...NOTES, { id: 'cta', at: CTA_AT, arrow: CTA_ARROW }].map(
                  ({ id, at, arrow }) => (
                    <g
                      key={id}
                      className={styles.arrow}
                      data-note={id}
                      style={{ '--at': `${at}s` }}
                    >
                      <path d={arrow.shaft} pathLength="1" />
                      <path className={styles.arrowHead} d={arrow.head} pathLength="1" />
                    </g>
                  ),
                )}
              </svg>
              {NOTES.map(({ id, at }, index) => (
                <span
                  key={id}
                  className={styles.pin}
                  data-note={id}
                  style={{ '--at': `${at}s` }}
                  aria-hidden="true"
                >
                  <span className={styles.pinNumber}>{index + 1}</span>
                </span>
              ))}
            </figure>

            <div className={styles.controls} data-needs-js>
              <p className={styles.hint} style={{ '--at': `${HINT_AT}s` }}>
                {added ? (
                  <>
                    <Check className={styles.hintIcon} />
                    {assistant.done}
                  </>
                ) : (
                  <>
                    {assistant.hint}{' '}
                    <bdi lang="ar" className={styles.hintButton}>
                      {list.addAll}
                    </bdi>
                    {assistant.hintAfter && ` ${assistant.hintAfter}`}
                  </>
                )}
              </p>
              <button type="button" className={styles.replay} onClick={replay}>
                <Replay className={styles.replayIcon} />
                <span className={styles.replayLabel}>{assistant.replay}</span>
              </button>
            </div>

            {/* The steps, written round the phone — or, on a phone, under it. */}
            <ol className={styles.notes} role="list">
              {assistant.steps.map((step, index) => (
                <li
                  key={step}
                  className={styles.note}
                  data-note={NOTES[index].id}
                  style={{ '--at': `${NOTES[index].at}s` }}
                >
                  <span className={styles.noteNumber} aria-hidden="true">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>

            {/* The way to get the app, as the last note: at the box you'd ask كيور in. */}
            <DownloadLink
              placement="assistant"
              variant="link"
              arrow={false}
              labels={t.hero.cta}
              className={styles.cta}
            >
              {assistant.cta}
            </DownloadLink>
          </div>
        </div>
      </div>
    </section>
  );
}
