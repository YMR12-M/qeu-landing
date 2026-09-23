import { LOGO_PATHS, LOGO_VIEWBOX } from './logo-paths.js';

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
      {LOGO_PATHS.map((d, index) => (
        <path key={index} d={d} />
      ))}
    </svg>
  );
}
