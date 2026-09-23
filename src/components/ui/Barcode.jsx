const cache = new Map();

/**
 * The bars of a decorative barcode. They come from a fixed seed, so the pre-rendered HTML and
 * the browser draw exactly the same ones.
 */
function barsFor(seed, count) {
  const key = `${seed}|${count}`;
  if (!cache.has(key)) {
    const bars = [];
    let x = 0;
    for (let index = 0; index < count; index += 1) {
      const code = seed.charCodeAt(index % seed.length) + index * 7;
      const width = 1 + (code % 3);
      bars.push({ x, width });
      x += width + 1 + ((code >> 2) % 2);
    }
    const last = bars.at(-1);
    cache.set(key, { bars, width: last.x + last.width });
  }
  return cache.get(key);
}

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
