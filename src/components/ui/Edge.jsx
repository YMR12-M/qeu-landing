import { cx } from '../../lib/cx.js';
import styles from './Edge.module.css';

/**
 * The page's one edge: the shop's awning, hung from the bar over the hero. Everything below it
 * is one white wall, with nothing between one section and the next — a torn sheet, a perforation
 * or a scalloped trim between them would only tell the reader where one section stopped. Purely
 * decorative, and it takes no room.
 */
export function Edge({ kind = 'awning', className }) {
  return <span className={cx(styles.edge, styles[kind], className)} aria-hidden="true" />;
}
