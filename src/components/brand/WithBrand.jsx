import { Fragment } from 'react';
import { Logo } from './Logo.jsx';

/**
 * Copy with its {brand} token drawn as the wordmark. The brand's name stays in the text,
 * visually hidden, so «ليه {brand}؟» still reads «ليه كيو؟» to screen readers, search engines
 * and find-in-page.
 */
export function WithBrand({ text, name, className }) {
  return text.split('{brand}').map((part, index) => (
    <Fragment key={index}>
      {index > 0 && (
        <>
          <span className="visually-hidden">{name}</span>
          <Logo className={className} />
        </>
      )}
      {part}
    </Fragment>
  ));
}
