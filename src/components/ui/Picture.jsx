/**
 * Renders an image imported with `as=picture` (see src/content/media.js):
 * AVIF first, WebP as fallback, intrinsic width/height to prevent layout shift.
 * Extra props (data-*, aria-*) go on the <img>.
 */
export function Picture({ image, alt, sizes, loading = 'lazy', ...imgProps }) {
  return (
    <picture>
      {Object.entries(image.sources).map(([format, srcSet]) => (
        <source key={format} type={`image/${format}`} srcSet={srcSet} sizes={sizes} />
      ))}
      <img
        src={image.img.src}
        width={image.img.w}
        height={image.img.h}
        alt={alt}
        loading={loading}
        decoding="async"
        {...imgProps}
      />
    </picture>
  );
}
