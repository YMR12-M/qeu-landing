/**
 * Static pre-rendering (SSG) — runs after both Vite builds.
 *
 * Renders every page with the server bundle and writes real HTML into dist/client:
 *   /          → dist/client/index.html          (Arabic)
 *   /english   → dist/client/english.html        (English — what hosts and `vite preview`
 *                dist/client/english/index.html   serve for /english; the folder copy
 *                                                  answers /english/)
 *   /policy    → dist/client/policy.html          (the privacy policy, Arabic only)
 *                dist/client/policy/index.html
 * Crawlers and the first paint get the full page; React then hydrates it in the browser.
 */
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const clientDir = path.join(root, 'dist', 'client');
const serverEntry = path.join(root, 'dist', 'server', 'entry-server.js');

// The client build's index.html is the template, and the Arabic page is then written over
// it. A copy is kept outside the deployed folder, so the prerender can run again (on its
// own) without reading a page it already rendered.
const indexFile = path.join(clientDir, 'index.html');
const templateCopy = path.join(root, 'dist', 'index.template.html');
const HEAD_SLOT = '<!--app-head-->';
const HTML_SLOT = '<!--app-html-->';
const isTemplate = (html) => html.includes(HEAD_SLOT) && html.includes(HTML_SLOT);

let template = await readFile(indexFile, 'utf8');
if (isTemplate(template)) {
  await writeFile(templateCopy, template);
} else {
  template = await readFile(templateCopy, 'utf8').catch(() => '');
  if (!isTemplate(template)) {
    throw new Error(
      `No page template with ${HEAD_SLOT} and ${HTML_SLOT} was found — run \`npm run build\`.`,
    );
  }
}

const { render, routes } = await import(pathToFileURL(serverEntry).href);
const assets = await readdir(path.join(clientDir, 'assets'));

// Preload the two Tajawal files the first screen paints with (headline 800, body 500),
// so the hero renders in the brand font without a visible swap.
const FIRST_PAINT_FONTS = {
  ar: ['tajawal-arabic-800-normal', 'tajawal-arabic-500-normal'],
  en: ['tajawal-latin-800-normal', 'tajawal-latin-500-normal'],
};
const fontFile = (name) =>
  assets.find((file) => file.startsWith(`${name}-`) && file.endsWith('.woff2'));
const fontPreload = (file) =>
  `<link rel="preload" href="/assets/${file}" as="font" type="font/woff2" crossorigin />`;

/** '/' → index.html; '/english' → english.html and english/index.html. */
const outputFiles = (route) =>
  route === '/' ? ['index.html'] : [`${route.slice(1)}.html`, `${route.slice(1)}/index.html`];

for (const route of routes) {
  const { html, head, lang, dir, page: pageId } = render(route.locale, route.page);
  const preloads = FIRST_PAINT_FONTS[route.locale].map(fontFile).filter(Boolean).map(fontPreload);

  // Replacer functions insert the markup verbatim ("$&", "$'"… are not patterns there).
  const page = template
    .replace(/<html[^>]*>/, () => `<html lang="${lang}" dir="${dir}" data-page="${pageId}">`)
    .replace(HEAD_SLOT, () => [...preloads, head].join('\n    '))
    .replace(HTML_SLOT, () => html);

  const written = [];
  for (const file of outputFiles(route.path)) {
    const outFile = path.join(clientDir, file);
    await mkdir(path.dirname(outFile), { recursive: true });
    await writeFile(outFile, page);
    written.push(path.relative(root, outFile));
  }
  console.log(`  ✓ ${route.path.padEnd(10)} → ${written.join(', ')}`);
}
