import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { App } from './App.jsx';
import { LOCALES } from './i18n/locales.js';
import { renderHead } from './seo/head.js';

/** Every page the build writes: one per locale. */
export const routes = Object.values(LOCALES).map(({ code, path }) => ({ locale: code, path }));

/** Renders one locale to HTML, plus the <head> tags and <html> attributes it needs. */
export function render(locale) {
  const { lang, dir } = LOCALES[locale];
  const html = renderToString(
    <StrictMode>
      <App locale={locale} />
    </StrictMode>,
  );

  return { html, head: renderHead(locale), lang, dir };
}
