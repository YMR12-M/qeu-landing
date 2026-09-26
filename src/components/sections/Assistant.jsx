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
// The steps on the shopping list beside the phone are ticked off with it: the question, then
// the list (the last, «أضف الكل», when the reader presses it).
const STEPS_AT = [AT.ask, AT.list];

const FLIGHT = 700; // ms: one product's flight into the cart
const FLIGHT_GAP = 110; // ms between two products taking off

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
 * «اسأل كيور» — the app's assistant, live. Its conversation about kabsa, word for word from
 * Qeu's store screenshot, replays in a phone as the section scrolls into view: the question,
 * كيور typing, its answer streaming in, then the list of ingredients. And «أضف الكل» works:
 * the products fly into a cart that slides up and counts them in. The steps beside the phone,
 * on a shopping list, are ticked off as the conversation reaches them.
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
        <div className={styles.intro}>
          <p className={styles.eyebrow}>{assistant.eyebrow}</p>
          <h2 id="assistant-title" className={styles.title}>
            {before}
            <span className={styles.name}>{assistant.name}</span>
            {after}
          </h2>
          <p className={styles.lead}>{assistant.lead}</p>
        </div>

        <div className={styles.stage}>
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
                                {added ? list.added : list.addAll}
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
              {assistant.replay}
            </button>
          </div>
        </div>

        <div className={styles.more}>
          {/* The steps, on a shopping list taped up beside the phone: each is ticked off as
              the conversation reaches it, and the last one when «أضف الكل» is pressed. */}
          <div className={styles.note}>
            <ol className={styles.steps} role="list">
              {assistant.steps.map((step, index) => {
                const last = index === assistant.steps.length - 1;
                return (
                  <li
                    key={step}
                    className={styles.step}
                    style={last ? undefined : { '--at': `${STEPS_AT[index]}s` }}
                    data-last={last || undefined}
                    data-done={(last && added) || undefined}
                  >
                    <span className={styles.box} aria-hidden="true">
                      <svg className={styles.tick} viewBox="0 0 24 24" focusable="false">
                        <path d="M4.5 12.5 9.5 17.5 20.5 5" pathLength="1" />
                      </svg>
                    </span>
                    {step}
                  </li>
                );
              })}
            </ol>
          </div>
          <DownloadLink placement="assistant" labels={t.hero.cta} className={styles.cta}>
            {assistant.cta}
          </DownloadLink>
        </div>
      </div>
    </section>
  );
}
