import { cx } from '../../lib/cx.js';
import styles from './SectionHeading.module.css';

/** Eyebrow + h2 + lead, start-aligned. `tone="dark"` on teal backgrounds. */
export function SectionHeading({ id, eyebrow, title, lead, tone = 'light', className }) {
  return (
    <div className={cx(styles.heading, tone === 'dark' && styles.dark, className)}>
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      <h2 id={id} className={styles.title}>
        {title}
      </h2>
      {lead && <p className={styles.lead}>{lead}</p>}
    </div>
  );
}
