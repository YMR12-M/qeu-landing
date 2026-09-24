const cache = new Map();

/**
 * The bars of a decorative barcode, as { bars: [{ x, width }], width } in bar units. They come
 * from a fixed seed, so the pre-rendered HTML, the browser and the share images
 * (scripts/og-images.js) all draw exactly the same ones.
 */
export function barsFor(seed, count) {
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
