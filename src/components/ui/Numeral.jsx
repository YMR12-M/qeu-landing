import styles from './Numeral.module.css';

const SEPARATORS = /([٫٬])/;

/**
 * A figure in the page's Arabic style (formatNumber), its separators set tight: Tajawal draws
 * «٫» and «٬» with a fifth of an em of blank space on each side, so «٤٫٧» read «٤ ,٧» and
 * «١٬٢٥٢» read «١ ,٢٥٢». Figures without them pass through untouched.
 *
 * For display copies only (aria-hidden): split into spans, a figure can be read out in pieces
 * (VoiceOver on iOS reads each span on its own), so screen readers get the plain figure.
 */
export function Numeral({ children }) {
  return String(children)
    .split(SEPARATORS)
    .map((part, index) =>
      index % 2 ? (
        <span key={index} className={part === '٫' ? styles.decimal : styles.group}>
          {part}
        </span>
      ) : (
        part
      ),
    );
}
