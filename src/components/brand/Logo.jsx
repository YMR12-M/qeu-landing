import { LOGO_PATHS, LOGO_VIEWBOX } from './logo-paths.js';

/** What every drawing of the wordmark refers to: the symbol <LogoSymbol> defines. */
export const LOGO_HREF = '#qeu-wordmark';

/**
 * The wordmark's paths, defined once per page (App renders it). Every <Logo>, and every drawing
 * that carries the wordmark (the store's sign, the bag, the policy's stamp), draws it with
 * <use>, so a page holds the paths once instead of on each of its ten or so copies.
 */
export function LogoSymbol() {
  return (
    <svg width="0" height="0" aria-hidden="true" focusable="false">
      <symbol id={LOGO_HREF.slice(1)} viewBox={LOGO_VIEWBOX}>
        {LOGO_PATHS.map((d, index) => (
          <path key={index} d={d} />
        ))}
      </symbol>
    </svg>
  );
}

/**
 * The كيو wordmark, drawn from the vector published on qeu.app.
 * It takes the current text colour, so it works on light and dark backgrounds.
 * Pass `title` when the logo is the only content of a link.
 */
export function Logo({ title, className }) {
  return (
    <svg
      className={className}
      viewBox={LOGO_VIEWBOX}
      fill="currentColor"
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <use href={LOGO_HREF} />
    </svg>
  );
}
