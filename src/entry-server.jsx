import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { App } from './App.jsx';
import { LOCALES, POLICY_PATH } from './i18n/locales.js';
import { renderHead } from './seo/head.js';

/** Every page the build writes: the home page in each locale, and the (Arabic) policy. */
export const routes = [
  ...Object.values(LOCALES).map(({ code, path }) => ({ locale: code, page: 'home', path })),
  { locale: 'ar', page: 'policy', path: POLICY_PATH },
];

/** Renders one page to HTML, plus the <head> tags and <html> attributes it needs. */
export function render(locale, page = 'home') {
  const { lang, dir } = LOCALES[locale];
  const html = renderToString(
    <StrictMode>
      <App locale={locale} page={page} />
    </StrictMode>,
  );

  return { html, head: renderHead(locale, page), lang, dir, page };
}
