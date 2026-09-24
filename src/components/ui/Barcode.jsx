import { barsFor } from './barcode-bars.js';

/** A printed barcode — decoration on the page's receipts, labels and stickers. */
export function Barcode({ seed, count = 46, className }) {
  const { bars, width } = barsFor(seed, count);
  return (
    <svg
      className={className}
      viewBox={`0 0 ${width} 1`}
      preserveAspectRatio="none"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      {bars.map(({ x, width: barWidth }) => (
        <rect key={x} x={x} width={barWidth} height="1" />
      ))}
    </svg>
  );
}
