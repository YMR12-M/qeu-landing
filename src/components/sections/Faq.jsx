import { Fragment, useRef } from 'react';
import { site } from '../../content/site.js';
import { useScrollReveal } from '../../hooks/useScrollReveal.js';
import { useLocale } from '../../i18n/useLocale.js';
import { formatPlural, interpolate } from '../../lib/format.js';
import { Logo } from '../brand/Logo.jsx';
import { Barcode } from '../ui/Barcode.jsx';
import { Edge } from '../ui/Edge.jsx';
import styles from './Faq.module.css';

const EMAIL = site.contact.email;

const twoDigits = (value) => String(value).padStart(2, '0');

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
 * One line of the receipt: the question, and its answer printed out under it. `line` is its
 * row in its column, for the order it prints in.
 */
function Question({ item, number, line, figures, open = false }) {
  return (
    <details className={styles.item} name="faq" open={open} style={{ '--line': line }}>
      <summary className={styles.question}>
        <span className={styles.number} aria-hidden="true">
          {twoDigits(number)}
        </span>
        <span className={styles.questionText}>{item.question}</span>
        <span className={styles.leader} aria-hidden="true" />
        <span className={styles.mark} aria-hidden="true" />
      </summary>
      <p className={styles.answer}>{withEmailLink(interpolate(item.answer, figures))}</p>
    </details>
  );
}

/**
 * «عندك سؤال؟» — the FAQ, printed as a till receipt — straight onto the section's own paper: no
 * slip, no torn edge, only the print — as wide as the page, the one thing in the section. The
 * shop's name at its head and the question printed large as the receipt's title, then every
 * question, in two columns as a wide till prints its lines: a line each, with dot leaders to its
 * box. The last line of the second column is yours: your number — the next after the last
 * question — and the way to ask your own. Under both columns a total that comes to "free"
 * (marked in yellow), and a barcode. It prints line by line as it scrolls into view, both
 * columns at once.
 *
 * Each question is a native <details> (one open at a time), so the answers work before
 * hydration and without JavaScript, with the browser's own keyboard and screen-reader
 * behaviour — and find-in-page opens the answer it lands in. The first is printed open, so the
 * receipt shows an answer from the start.
 */
export function Faq() {
  const { t, figures, locale } = useLocale();
  const { faq } = t;
  const { receipt, ticket } = faq;
  const count = formatPlural(faq.items.length, receipt.count, { locale });
  // Your number is one more line: the questions are shared out with it in the second column.
  const perColumn = Math.ceil((faq.items.length + 1) / 2);
  const columns = [faq.items.slice(0, perColumn), faq.items.slice(perColumn)];
  const receiptRef = useRef(null);
  useScrollReveal(receiptRef);

  return (
    <section id="faq" className={styles.section} aria-labelledby="faq-title">
      <div className="container">
        <div ref={receiptRef} className={styles.receipt} style={{ '--rows': perColumn }}>
          {/* The shop's name, then the question printed large as the receipt's title. */}
          <div className={styles.head}>
            <Logo className={styles.logo} />
            <h2 id="faq-title" className={styles.title}>
              {faq.title}
            </h2>
            <p className={styles.lead}>{faq.lead}</p>
            <p className={styles.meta}>
              {receipt.title} · {count}
            </p>
          </div>

          <div className={styles.lines}>
            {columns.map((items, column) => (
              <div key={column} className={styles.column}>
                <p className={styles.columns} aria-hidden="true">
                  <span>{receipt.columns.question}</span>
                  <span>{receipt.columns.answer}</span>
                </p>
                {items.map((item, index) => (
                  <Question
                    key={item.id}
                    item={item}
                    number={column * perColumn + index + 1}
                    line={index + 2}
                    figures={figures}
                    open={column === 0 && index === 0}
                  />
                ))}

                {/* The second column's last line: take a number — yours, the next after the
                    last question — and ask. */}
                {column === 1 && (
                  <p className={styles.ticket} style={{ '--line': items.length + 2 }}>
                    <span className={styles.ticketLabel}>{ticket.label}</span>
                    <span className={styles.ticketNumber}>{twoDigits(faq.items.length + 1)}</span>
                    <span className={styles.ticketQuestion}>{ticket.question}</span>
                    <span className={styles.leader} aria-hidden="true" />
                    <a className={styles.ticketAction} href={`mailto:${EMAIL}`}>
                      {ticket.action}
                    </a>
                    <span className={styles.ticketEmail}>
                      <span dir="ltr">{EMAIL}</span>
                    </span>
                  </p>
                )}
              </div>
            ))}
          </div>

          <p className={styles.total}>
            <span>{receipt.total}</span>
            <span className={styles.leader} aria-hidden="true" />
            <span className={styles.free}>{receipt.totalValue}</span>
          </p>

          <Barcode seed="QEU FAQ" count={64} className={styles.barcode} />
          <p className={styles.thanks}>{receipt.thanks}</p>
        </div>
      </div>
      <Edge kind="perforation" to="var(--brand)" />
    </section>
  );
}
