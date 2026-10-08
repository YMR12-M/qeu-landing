import { Fragment, useRef } from 'react';
import { site } from '../../content/site.js';
import { useScrollReveal } from '../../hooks/useScrollReveal.js';
import { useLocale } from '../../i18n/useLocale.js';
import { formatPlural, interpolate } from '../../lib/format.js';
import { Logo } from '../brand/Logo.jsx';
import { Barcode } from '../ui/Barcode.jsx';
import { SectionHeading } from '../ui/SectionHeading.jsx';
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
 * One line of the receipt: the question, and its answer printed out under it. `line` is its row,
 * for the order it prints in.
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
 * «عندك سؤال؟» — the FAQ, printed as one long till receipt: the shop's logo, how many
 * questions there are, every question, then a total that comes to "free" and a barcode. On the
 * other side are the section's heading, and under it a number machine: its display shows the turn
 * it's on — the last question's — and the slip it hands out is yours, the next after the last
 * question, with the way to ask it. The machine stays in view while the receipt is read. The
 * receipt prints line by line as it scrolls into view.
 *
 * Each question is a native <details> (one open at a time), so the answers work before
 * hydration and without JavaScript, with the browser's own keyboard and screen-reader
 * behaviour — and find-in-page opens the answer it lands in. The first question is printed open,
 * so the receipt shows an answer from the start.
 */
export function Faq() {
  const { t, figures, locale } = useLocale();
  const { faq } = t;
  const { receipt, ticket } = faq;
  const layoutRef = useRef(null);
  useScrollReveal(layoutRef);

  return (
    <section id="faq" className={styles.section} aria-labelledby="faq-title">
      <div className="container">
        <div ref={layoutRef} className={styles.layout}>
          <SectionHeading
            id="faq-title"
            title={faq.title}
            lead={faq.lead}
            className={styles.intro}
          />

          <div className={styles.printer}>
            <div className={styles.receipt}>
              <div className={styles.head}>
                <Logo className={styles.logo} />
                <p className={styles.headTitle}>{receipt.title}</p>
                <p className={styles.meta}>
                  {formatPlural(faq.items.length, receipt.count, { locale })}
                </p>
              </div>

              <p className={styles.columns} aria-hidden="true">
                <span>{receipt.columns.question}</span>
                <span>{receipt.columns.answer}</span>
              </p>

              {faq.items.map((item, index) => (
                <Question
                  key={item.id}
                  item={item}
                  number={index + 1}
                  line={index + 2}
                  figures={figures}
                  open={index === 0}
                />
              ))}

              <p className={styles.total}>
                <span>{receipt.total}</span>
                <span className={styles.leader} aria-hidden="true" />
                <span>{receipt.totalValue}</span>
              </p>

              <Barcode seed="QEU FAQ" count={64} className={styles.barcode} />
              <p className={styles.thanks}>{receipt.thanks}</p>
            </div>
          </div>

          {/* The number machine: the turn it's on, and the slip it hands out — yours. */}
          <div className={styles.machine}>
            <div className={styles.dispenser}>
              <span className={styles.current}>{ticket.current}</span>
              <span className={styles.display} dir="ltr">
                {twoDigits(faq.items.length)}
              </span>
            </div>
            <div className={styles.slip}>
              <div className={styles.slipHead}>
                <Logo className={styles.slipLogo} />
                <span>{ticket.take}</span>
              </div>
              <p className={styles.slipLabel}>{ticket.label}</p>
              <p className={styles.slipNumber} dir="ltr">
                {twoDigits(faq.items.length + 1)}
              </p>
              <p className={styles.slipQuestion}>{ticket.question}</p>
              <a className={styles.slipAction} href={`mailto:${EMAIL}`}>
                {ticket.action}
              </a>
              <p className={styles.slipEmail} dir="ltr">
                {EMAIL}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
