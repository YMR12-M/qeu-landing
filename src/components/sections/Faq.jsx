import { Fragment, useRef } from 'react';
import { site } from '../../content/site.js';
import { useScrollReveal } from '../../hooks/useScrollReveal.js';
import { useLocale } from '../../i18n/useLocale.js';
import { cx } from '../../lib/cx.js';
import { formatPlural, interpolate } from '../../lib/format.js';
import { Logo } from '../brand/Logo.jsx';
import styles from './Faq.module.css';

const EMAIL = site.contact.email;

const twoDigits = (value) => String(value).padStart(2, '0');

// The barcode under the total is decoration. Its bars come from a fixed seed, so the
// pre-rendered HTML and the browser draw exactly the same ones.
const BARCODE = (() => {
  const seed = 'QEU FAQ';
  const bars = [];
  let x = 0;
  for (let index = 0; index < 46; index += 1) {
    const code = seed.charCodeAt(index % seed.length) + index * 7;
    const width = 1 + (code % 3);
    bars.push({ x, width });
    x += width + 1 + ((code >> 2) % 2);
  }
  const last = bars.at(-1);
  return { bars, width: last.x + last.width };
})();

/** Copy with its {email} token rendered as the support mail link. */
function withEmailLink(text) {
  return text.split('{email}').map((part, index) => (
    <Fragment key={index}>
      {index > 0 && (
        <a className={styles.mail} href={`mailto:${EMAIL}`} dir="ltr">
          {EMAIL}
        </a>
      )}
      {part}
    </Fragment>
  ));
}

/**
 * «عندك سؤال؟» — the FAQ, printed on a till receipt that feeds out of a printer slot as it
 * scrolls into view: dashed rules, a torn edge, a barcode, and a total that comes to "free".
 * Beside it, the counter's other machine: a take-a-number dispenser serving the receipt's
 * last question, whose ticket — the next number — is the way to ask one of your own.
 *
 * Each question is a native <details> (one open at a time), so the answers work before
 * hydration and without JavaScript, with the browser's own keyboard and screen-reader
 * behaviour — and find-in-page opens the answer it lands in.
 */
export function Faq() {
  const { t, figures, locale } = useLocale();
  const { faq } = t;
  const { receipt, ticket } = faq;
  const feedRef = useRef(null);
  const queueRef = useRef(null);
  useScrollReveal(feedRef);
  useScrollReveal(queueRef);

  return (
    <section id="faq" className={styles.section} aria-labelledby="faq-title">
      <div className={cx('container', styles.layout)}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>{faq.eyebrow}</p>
          <h2 id="faq-title" className={styles.title}>
            {faq.title}
          </h2>
          <p className={styles.lead}>{faq.lead}</p>
        </div>

        <div className={styles.printer}>
          <div className={styles.slot} aria-hidden="true" />
          <div ref={feedRef} className={styles.feed}>
            <div className={styles.paper}>
              <div className={styles.receipt}>
                <div className={styles.head}>
                  <Logo className={styles.logo} />
                  <p className={styles.receiptTitle}>{receipt.title}</p>
                  <p className={styles.meta}>
                    {formatPlural(faq.items.length, receipt.count, { locale })}
                  </p>
                </div>

                <p className={styles.columns} aria-hidden="true">
                  <span>{receipt.columns.question}</span>
                  <span>{receipt.columns.answer}</span>
                </p>

                {faq.items.map((item, index) => (
                  <details key={item.id} className={styles.item} name="faq">
                    <summary className={styles.question}>
                      <span className={styles.number} aria-hidden="true">
                        {twoDigits(index + 1)}
                      </span>
                      <span className={styles.questionText}>{item.question}</span>
                      <span className={styles.leader} aria-hidden="true" />
                      <span className={styles.mark} aria-hidden="true" />
                    </summary>
                    <p className={styles.answer}>
                      {withEmailLink(interpolate(item.answer, figures))}
                    </p>
                  </details>
                ))}

                <p className={styles.total}>
                  <span>{receipt.total}</span>
                  <span className={styles.leader} aria-hidden="true" />
                  <span>{receipt.totalValue}</span>
                </p>
                <svg
                  className={styles.barcode}
                  viewBox={`0 0 ${BARCODE.width} 1`}
                  preserveAspectRatio="none"
                  fill="currentColor"
                  aria-hidden="true"
                  focusable="false"
                >
                  {BARCODE.bars.map(({ x, width }) => (
                    <rect key={x} x={x} width={width} height="1" />
                  ))}
                </svg>
                <p className={styles.thanks}>{receipt.thanks}</p>
              </div>
            </div>
          </div>
        </div>

        <div ref={queueRef} className={styles.queue}>
          <div className={styles.dispenser} aria-hidden="true">
            <span className={styles.nowServing}>{ticket.now}</span>
            <span className={styles.display}>{twoDigits(faq.items.length)}</span>
          </div>
          <div className={styles.ticketFeed}>
            <div className={styles.ticketPaper}>
              <div className={styles.ticket}>
                <div className={styles.stub} aria-hidden="true">
                  <span>{ticket.take}</span>
                  <Logo className={styles.ticketLogo} />
                </div>
                <p className={styles.ticketLabel} aria-hidden="true">
                  {ticket.label}
                </p>
                <p className={styles.ticketNumber} aria-hidden="true">
                  {twoDigits(faq.items.length + 1)}
                </p>
                <p className={styles.ticketQuestion}>{ticket.question}</p>
                <a className={styles.ticketAction} href={`mailto:${EMAIL}`}>
                  {ticket.action}
                </a>
                <p className={styles.ticketEmail}>
                  <span dir="ltr">{EMAIL}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
