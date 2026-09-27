import { Fragment, useRef } from 'react';
import { site } from '../../content/site.js';
import { useScrollReveal } from '../../hooks/useScrollReveal.js';
import { useLocale } from '../../i18n/useLocale.js';
import { cx } from '../../lib/cx.js';
import { formatNumber, formatPlural, interpolate } from '../../lib/format.js';
import { Logo } from '../brand/Logo.jsx';
import { Barcode } from '../ui/Barcode.jsx';
import { Receipt } from '../ui/icons.jsx';
import styles from './Faq.module.css';

const EMAIL = site.contact.email;

// The questions printed from the start; the rest are printed on demand.
const PRINTED = 4;

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

/** One line of the receipt: the question, and its answer printed out under it. */
function Question({ item, number, figures }) {
  return (
    <details className={styles.item} name="faq">
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
 * «عندك سؤال؟» — the FAQ, printed on a till receipt that feeds out of a printer slot as it
 * scrolls into view: dashed rules, a torn edge, a barcode, and a total that comes to "free".
 * Beside it, the counter's other machine: a take-a-number dispenser serving the receipt's
 * last question, whose ticket — the next number — is the way to ask one of your own.
 *
 * Each question is a native <details> (one open at a time), so the answers work before
 * hydration and without JavaScript, with the browser's own keyboard and screen-reader
 * behaviour — and find-in-page opens the answer it lands in. The receipt prints the first
 * questions; «اطبع باقي الأسئلة», a <details> of its own, prints the rest under them (and
 * find-in-page opens it too).
 *
 * On phones and tablets, where the ticket comes after the receipt, it is a slip — the next
 * number, the question and the way to ask it — without the dispenser around it.
 */
export function Faq() {
  const { t, figures, locale } = useLocale();
  const { faq } = t;
  const { receipt, ticket } = faq;
  const printed = faq.items.slice(0, PRINTED);
  const onDemand = faq.items.slice(PRINTED);
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

                {printed.map((item, index) => (
                  <Question key={item.id} item={item} number={index + 1} figures={figures} />
                ))}

                {onDemand.length > 0 && (
                  <details className={styles.more}>
                    <summary className={styles.moreToggle}>
                      <Receipt className={styles.moreIcon} />
                      <span className={styles.whenClosed}>
                        {interpolate(receipt.more, {
                          n: formatNumber(onDemand.length, { locale }),
                        })}
                      </span>
                      <span className={styles.whenOpen}>{receipt.less}</span>
                    </summary>
                    {onDemand.map((item, index) => (
                      <Question
                        key={item.id}
                        item={item}
                        number={PRINTED + index + 1}
                        figures={figures}
                      />
                    ))}
                  </details>
                )}

                <p className={styles.total}>
                  <span>{receipt.total}</span>
                  <span className={styles.leader} aria-hidden="true" />
                  <span>{receipt.totalValue}</span>
                </p>
                <Barcode seed="QEU FAQ" className={styles.barcode} />
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
