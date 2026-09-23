import { cx } from '../../lib/cx.js';
import styles from './SectionHeading.module.css';

/** Eyebrow + h2 + lead, start-aligned. */
export function SectionHeading({ id, eyebrow, title, lead, className }) {
  return (
    <div className={cx(styles.heading, className)}>
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      <h2 id={id} className={styles.title}>
        {title}
      </h2>
      {lead && <p className={styles.lead}>{lead}</p>}
    </div>
  );
}
