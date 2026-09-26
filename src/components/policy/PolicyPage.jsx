import { useRef } from 'react';
import { media } from '../../content/media.js';
import { policy } from '../../content/policy.js';
import { POLICY_CONTENTS } from '../../content/policy-contents.js';
import { site } from '../../content/site.js';
import { useActiveSection } from '../../hooks/useActiveSection.js';
import { useScrollReveal } from '../../hooks/useScrollReveal.js';
import { useSeenSections } from '../../hooks/useSeenSections.js';
import { useLocale } from '../../i18n/useLocale.js';
import { cx } from '../../lib/cx.js';
import { formatDate } from '../../lib/format.js';
import { Logo, LOGO_HREF } from '../brand/Logo.jsx';
import { LOGO_VIEWBOX } from '../brand/logo-paths.js';
import { WithBrand } from '../brand/WithBrand.jsx';
import { Landmark, PaymentCard, Van } from '../ui/icons.jsx';
import { Picture } from '../ui/Picture.jsx';
import styles from './PolicyPage.module.css';

const IDS = POLICY_CONTENTS.map((section) => section.id);
const LABELS = Object.fromEntries(POLICY_CONTENTS.map(({ id, label }) => [id, label]));
const ICONS = { delivery: Van, payment: PaymentCard, government: Landmark };
const twoDigits = (value) => String(value).padStart(2, '0');

/**
 * The privacy policy, as the official document it is: laid on the dark desk of the page's
 * cover, on the company's letterhead, with an index card beside it that ticks each section
 * off once it has been read — and, reaching the end, the company's stamp is pressed onto it.
 *
 * The text is the policy's own, word for word (src/content/policy.js). The lists it contains
 * are drawn as what they are — the data as a packing list, the three recipients, the
 * retention as a route, the six rights — but always in the policy's words.
 */
export function PolicyPage() {
  const { t, locale } = useLocale();
  const { labels } = policy;
  const active = useActiveSection(IDS);
  const seen = useSeenSections(IDS);
  const stampRef = useRef(null);
  useScrollReveal(stampRef, '0px 0px -18% 0px');
  const updated = formatDate(policy.updatedAt, { locale, dates: t.dates });

  return (
    <>
      <section className={styles.cover} aria-labelledby="policy-title">
        <div className="container">
          <p className={styles.eyebrow}>{policy.company}</p>
          <h1 id="policy-title" className={styles.title}>
            {policy.title}
          </h1>
          <p className={styles.subtitle}>
            <WithBrand text={policy.subtitle} name={t.meta.siteName} className={styles.brand} />
          </p>
          <dl className={styles.chips}>
            <div className={styles.chip}>
              <dt>{labels.updated}</dt>
              <dd>
                <time dateTime={policy.updatedAt}>{updated}</time>
              </dd>
            </div>
            <div className={styles.chip}>
              <dt>{labels.law}</dt>
              <dd>{policy.law}</dd>
            </div>
          </dl>
        </div>
      </section>

      <div className={styles.desk}>
        <div className={cx('container', styles.layout)}>
          <nav className={styles.index} aria-labelledby="policy-contents">
            <p id="policy-contents" className={styles.indexTitle}>
              {labels.contents}
            </p>
            <ol className={styles.indexList} role="list">
              {policy.sections.map((section) => (
                <li key={section.id} data-seen={seen.has(section.id) || undefined}>
                  <a
                    href={`#${section.id}`}
                    aria-current={active === section.id ? 'location' : undefined}
                  >
                    <span className={styles.tick} aria-hidden="true" />
                    {LABELS[section.id]}
                  </a>
                </li>
              ))}
            </ol>
            <p className={styles.indexFoot}>
              {labels.updated}: {updated}
            </p>
          </nav>

          <article className={styles.sheet}>
            <header className={styles.letterhead}>
              <div className={styles.mark} aria-hidden="true">
                <Picture image={media.appIcon} alt="" sizes="3.25rem" className={styles.markIcon} />
                <Logo className={styles.markLogo} />
              </div>
              <address className={styles.sender}>
                <span className={styles.senderLabel}>{labels.contact}</span>
                <strong>{policy.company}</strong>
                <span>{policy.address}</span>
                <a href={`mailto:${site.contact.email}`}>
                  <span dir="ltr">{site.contact.email}</span>
                </a>
              </address>
            </header>

            <p className={styles.docTitle} aria-hidden="true">
              {policy.title} {policy.subtitle.replace('{brand}', t.meta.siteName)}
            </p>

            <div className={styles.intro}>
              {policy.intro.map((text) => (
                <p key={text.slice(0, 24)}>{text}</p>
              ))}
            </div>

            <div className={styles.updated}>
              <span className={styles.updatedLabel}>{labels.updated}</span>
              <p>{policy.updated}</p>
            </div>

            {policy.sections.map((section, index) => (
              <section
                key={section.id}
                id={section.id}
                className={styles.section}
                aria-labelledby={`${section.id}-title`}
              >
                <h2 id={`${section.id}-title`} className={styles.sectionTitle}>
                  <span className={styles.sectionNumber} aria-hidden="true">
                    {twoDigits(index + 1)}
                  </span>
                  {section.title}
                </h2>
                {section.blocks.map((block, blockIndex) => (
                  <Block key={blockIndex} block={block} />
                ))}
              </section>
            ))}

            <div ref={stampRef} className={styles.stampSpot}>
              <Stamp {...labels.stamp} date={updated} />
            </div>
          </article>
        </div>
      </div>
    </>
  );
}

/** One piece of a section, drawn after what it is. */
function Block({ block }) {
  switch (block.type) {
    case 'p':
      return <p className={styles.p}>{block.text}</p>;

    case 'callout':
      return <p className={styles.callout}>{block.text}</p>;

    case 'list': {
      const List = block.style === 'numbered' ? 'ol' : 'ul';
      return (
        <List className={styles[block.style]} role="list">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </List>
      );
    }

    case 'terms':
      return (
        <dl className={styles[block.style]}>
          {block.items.map(([term, description]) => (
            <div key={term} className={styles.term}>
              <dt>{term}</dt>
              <dd>{description}</dd>
            </div>
          ))}
        </dl>
      );

    case 'groups':
      return (
        <div className={styles.groups}>
          {block.items.map((group) => (
            <div key={group.title} className={styles.group}>
              <p className={styles.groupTitle}>{group.title}</p>
              <ul className={styles.dots} role="list">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );

    case 'recipients':
      return (
        <ul className={styles.recipients} role="list">
          {block.items.map(({ icon, text }) => {
            const Icon = ICONS[icon];
            return (
              <li key={icon} className={styles.recipient}>
                <span className={styles.recipientIcon} aria-hidden="true">
                  <Icon />
                </span>
                {text}
              </li>
            );
          })}
        </ul>
      );

    case 'retention':
      return (
        <ol className={styles.retention} role="list">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      );

    case 'channels':
      return (
        <dl className={styles.channels}>
          {block.items.map((channel) => (
            <div key={channel.label} className={styles.channel}>
              <dt>{channel.label}</dt>
              <dd>
                {channel.email ? (
                  <a href={`mailto:${channel.email}`}>
                    <span dir="ltr">{channel.email}</span>
                  </a>
                ) : (
                  channel.text
                )}
              </dd>
            </div>
          ))}
        </dl>
      );

    case 'escalation':
      return <p className={styles.escalation}>{block.text}</p>;

    default:
      return null;
  }
}

// The stamp's two arcs: the name curves over the top, the place under the bottom — both read
// upright, as on a company seal.
const TOP_ARC = 'M 30 100 A 70 70 0 0 1 170 100';
const BOTTOM_ARC = 'M 14 100 A 86 86 0 0 0 186 100';
// The wordmark in the middle of the stamp: 76 units wide, centred just above the middle.
const [, , logoWidth, logoHeight] = LOGO_VIEWBOX.split(' ').map(Number);
const STAMP_LOGO = { width: 76, height: (76 * logoHeight) / logoWidth, centreY: 90 };

/** The company's round stamp: its name, the wordmark, the policy's date. Decorative. */
function Stamp({ name, place, date }) {
  return (
    <svg className={styles.stamp} viewBox="0 0 200 200" aria-hidden="true" focusable="false">
      <defs>
        <path id="stamp-top" d={TOP_ARC} />
        <path id="stamp-bottom" d={BOTTOM_ARC} />
        {/* Ink never lands evenly: a little grain along every edge. */}
        <filter id="stamp-ink" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="7" />
          <feDisplacementMap in="SourceGraphic" scale="2.4" />
        </filter>
      </defs>
      <g filter="url(#stamp-ink)">
        <circle cx="100" cy="100" r="95" fill="none" stroke="currentColor" strokeWidth="4" />
        <circle cx="100" cy="100" r="89" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="100" cy="100" r="58" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <text className={styles.stampRing}>
          <textPath href="#stamp-top" startOffset="50%" textAnchor="middle">
            {name}
          </textPath>
        </text>
        <text className={styles.stampRing}>
          <textPath href="#stamp-bottom" startOffset="50%" textAnchor="middle">
            {place}
          </textPath>
        </text>
        <circle cx="16" cy="100" r="2.6" fill="currentColor" />
        <circle cx="184" cy="100" r="2.6" fill="currentColor" />
        <use
          href={LOGO_HREF}
          x={100 - STAMP_LOGO.width / 2}
          y={STAMP_LOGO.centreY - STAMP_LOGO.height / 2}
          width={STAMP_LOGO.width}
          height={STAMP_LOGO.height}
          fill="currentColor"
        />
        <text className={styles.stampDate} x="100" y="128" textAnchor="middle">
          {date}
        </text>
      </g>
    </svg>
  );
}
