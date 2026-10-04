import { cx } from '../../lib/cx.js';
import styles from './SectionHeading.module.css';

/** The section's title, and one line of lead: start-aligned. */
export function SectionHeading({ id, title, lead, className }) {
  return (
    <div className={cx(styles.heading, className)}>
      <h2 id={id} className={styles.title}>
        {title}
      </h2>
      {lead && <p className={styles.lead}>{lead}</p>}
    </div>
  );
}
