import { cx } from '../../lib/cx.js';
import styles from './Edge.module.css';

/**
 * How one wall ends and the next begins. A straight line between two colours is how a template
 * does it; a shop does it with what is hanging there: an awning over the door, a sheet torn off
 * a pad, a coupon's perforation, the teeth where a till receipt is torn off, a scalloped
 * shelf-edge.
 *
 * It sits at the foot of the section above and is painted in the colour of the wall below
 * (`to`: any CSS colour), reaching a little way up into the section above. `kind`: 'torn',
 * 'perforation', 'sawtooth', 'scallop' — or 'awning', which hangs under the bar at the top of
 * the hero instead. Purely decorative, and it takes no room: the section's own spacing is
 * unchanged.
 */
export function Edge({ kind, to, flip, className }) {
  return (
    <span
      className={cx(styles.edge, styles[kind], className)}
      data-flip={flip || undefined}
      style={to ? { '--to': to } : undefined}
      aria-hidden="true"
    />
  );
}
