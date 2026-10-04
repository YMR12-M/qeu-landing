import { cx } from '../../lib/cx.js';
import { formatPrice } from '../../lib/format.js';
import styles from './Price.module.css';

/**
 * A price as a flyer prints it: the amount large, the currency small beside it, and the price
 * it replaces struck through after it. `prices` is the locale's copy (its template, «{n} ر.س»
 * or «SAR {n}», and the word read before the old price). Sized and coloured by the section:
 * --price-size, --price-color, --was-color.
 */
export function Price({ value, was, locale, prices, className }) {
  const [before, after] = prices.price.split('{n}').map((part) => part.trim());

  return (
    <span className={cx(styles.price, className)}>
      <span className={styles.now}>
        {before && <span className={styles.currency}>{before}</span>}{' '}
        <span className={styles.amount}>{formatPrice(value, { locale })}</span>{' '}
        {after && <span className={styles.currency}>{after}</span>}
      </span>{' '}
      {was != null && (
        <s className={styles.was}>
          <span className="visually-hidden">{prices.was} </span>
          {formatPrice(was, { locale })}
        </s>
      )}
    </span>
  );
}
