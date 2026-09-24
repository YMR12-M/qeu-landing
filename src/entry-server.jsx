import { StrictMode } from 'react';
import { prerenderToNodeStream } from 'react-dom/static';
import { App } from './App.jsx';
import { LOCALES, POLICY_PATH } from './i18n/locales.js';
import { renderHead } from './seo/head.js';

/**
 * Every page the build writes: the home page in each locale, the (Arabic) policy, and the
 * page hosts serve for a URL that doesn't exist.
 */
export const routes = [
  ...Object.values(LOCALES).map(({ code, path }) => ({ locale: code, page: 'home', path })),
  { locale: 'ar', page: 'policy', path: POLICY_PATH },
  { locale: 'ar', page: 'notFound', path: '/404' },
];

/**
 * Renders one page to HTML, plus the <head> tags and <html> attributes it needs. The static
 * pre-renderer waits for the page's own chunk (loaded on demand), so the HTML is complete.
 *
 * A static page has nothing to stream, so every Suspense boundary is written in place. React
 * would otherwise move a large one (over 12.8 kB, like any of these pages) into a hidden
 * block and show it with inline scripts. The page would then stay blank without JavaScript,
 * and the Content-Security-Policy (vercel.json) would need to allow inline scripts.
 */
export async function render(locale, page = 'home', { assetOrigin } = {}) {
  const { lang, dir } = LOCALES[locale];
  const { prelude } = await prerenderToNodeStream(
    <StrictMode>
      <App locale={locale} page={page} />
    </StrictMode>,
    { progressiveChunkSize: Number.POSITIVE_INFINITY },
  );
  const decoder = new TextDecoder();
  let html = '';
  for await (const chunk of prelude) {
    html += typeof chunk === 'string' ? chunk : decoder.decode(chunk, { stream: true });
  }
  html += decoder.decode();

  return { html, head: renderHead(locale, page, { assetOrigin }), lang, dir, page };
}
