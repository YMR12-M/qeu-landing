import { useRef } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal.js';
import { cx } from '../../lib/cx.js';
import styles from './Reveal.module.css';

/**
 * Fades content up as it scrolls into view (see useScrollReveal for when it runs at all).
 */
export function Reveal({ as: Tag = 'div', delay = 0, className, children, ...props }) {
  const ref = useRef(null);
  useScrollReveal(ref);

  return (
    <Tag
      ref={ref}
      className={cx(styles.reveal, className)}
      style={delay ? { '--reveal-delay': `${delay}ms` } : undefined}
      {...props}
    >
      {children}
    </Tag>
  );
}
