/**
 * Static pre-rendering (SSG) — runs after both Vite builds.
 *
 * Renders every page with the server bundle and writes real HTML into dist/client:
 *   /          → dist/client/index.html          (Arabic)
 *   /english   → dist/client/english.html        (English — what hosts and `vite preview`
 *                dist/client/english/index.html   serve for /english; the folder copy
 *                                                  answers /english/)
 *   /policy    → dist/client/policy.html          (the privacy policy)
 *                dist/client/policy/index.html
 *   /policy-english → dist/client/policy-english.html   (its English translation)
 *                     dist/client/policy-english/index.html
 *   (404)      → dist/client/404.html            (what hosts serve for a missing page)
 * Crawlers and the first paint get the full page; React then hydrates it in the browser.
 * Each page's own chunk, and its language's copy, are preloaded next to the main script, so
 * hydration never waits.
 */
import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { DICTIONARY_MODULES } from '../src/content/locales/load.js';
import { site } from '../src/content/site.js';
import { qrRedirects } from '../src/lib/links.js';
import { PAGE_MODULES, pageModule } from '../src/pages/index.js';

const root = fileURLToPath(new URL('..', import.meta.url));

// iCloud Drive keeps a file it couldn't sync as a copy, "name 2.ext" (README: keep the working
// copy out of it). One in public/ would be published with the site, and one in src/ means an
// edit may be in the copy rather than the file: either way, the conflict is resolved first.
const conflicts = [];
for (const folder of ['public', 'src']) {
  for (const file of await readdir(path.join(root, folder), { recursive: true })) {
    if (/ \d+(\.[^./\\]+)?$/.test(file)) conflicts.push(path.join(folder, file));
  }
}
if (conflicts.length) {
  throw new Error(
    `iCloud conflict copies — keep the right version of each, delete the other:\n  ${conflicts.join('\n  ')}`,
  );
}

// The download QR code encodes site.links.qr, which only vercel.json's redirects send on to the
// stores: they must be the ones src/lib/links.js makes from site.js, tags and all.
const canonical = (value) =>
  JSON.stringify(value, (key, item) =>
    item && typeof item === 'object' && !Array.isArray(item)
      ? Object.fromEntries(Object.entries(item).sort(([a], [b]) => a.localeCompare(b)))
      : item,
  );
const vercel = JSON.parse(await readFile(path.join(root, 'vercel.json'), 'utf8'));
const qrWritten = (vercel.redirects ?? []).filter((redirect) => redirect.source === site.links.qr);
if (canonical(qrWritten) !== canonical(qrRedirects())) {
  throw new Error(
    `vercel.json's redirects for ${site.links.qr} (the download QR code) don't match the store ` +
      'links in src/content/site.js: run `npm run qr`.',
  );
}

const clientDir = path.join(root, 'dist', 'client');
const serverEntry = path.join(root, 'dist', 'server', 'entry-server.js');

// The client build's index.html is the template, and the Arabic page is then written over
// it. A copy is kept outside the deployed folder, so the prerender can run again (on its
// own) without reading a page it already rendered. The build manifest is kept the same way,
// and removed from the deployed folder: the site has no use for it.
const indexFile = path.join(clientDir, 'index.html');
const templateCopy = path.join(root, 'dist', 'index.template.html');
const manifestFile = path.join(clientDir, '.vite', 'manifest.json');
const manifestCopy = path.join(root, 'dist', 'manifest.client.json');
const HEAD_SLOT = '<!--app-head-->';
const HTML_SLOT = '<!--app-html-->';
const isTemplate = (html) => html.includes(HEAD_SLOT) && html.includes(HTML_SLOT);
const missing = (what) =>
  new Error(`No ${what} was found in dist/ — run \`npm run build\` (not only the prerender).`);

let template = await readFile(indexFile, 'utf8');
if (isTemplate(template)) {
  await writeFile(templateCopy, template);
} else {
  template = await readFile(templateCopy, 'utf8').catch(() => '');
  if (!isTemplate(template)) throw missing(`page template with ${HEAD_SLOT} and ${HTML_SLOT}`);
}

let manifestJson = await readFile(manifestFile, 'utf8').catch(() => null);
if (manifestJson) {
  await writeFile(manifestCopy, manifestJson);
  await rm(path.dirname(manifestFile), { recursive: true });
} else {
  manifestJson = await readFile(manifestCopy, 'utf8').catch(() => null);
  if (!manifestJson) throw missing('build manifest');
}
const manifest = JSON.parse(manifestJson);

const { render, routes } = await import(pathToFileURL(serverEntry).href);
const assets = await readdir(path.join(clientDir, 'assets'));

// Canonical URLs name qeu.app, but a link preview's image has to exist where the page is
// actually served. On Vercel that is the project's production domain, which Vercel gives the
// build: its .vercel.app address today, qeu.app itself (the shortest custom domain) once that
// is added to the project — so the previews follow the move with the next deploy.
const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const assetOrigin = productionHost ? `https://${productionHost}` : undefined;

// Preload the three Tajawal files the first screen paints with (the headline 900, the button
// and the flags 800, the bar's links and the note 700), so the hero renders in the brand font
// without a visible swap.
const FIRST_PAINT_FONTS = {
  ar: ['tajawal-arabic-900-normal', 'tajawal-arabic-800-normal', 'tajawal-arabic-700-normal'],
  en: ['tajawal-latin-900-normal', 'tajawal-latin-800-normal', 'tajawal-latin-700-normal'],
};
const fontFile = (name) =>
  assets.find((file) => file.startsWith(`${name}-`) && file.endsWith('.woff2'));
const fontPreload = (file) =>
  `<link rel="preload" href="/assets/${file}" as="font" type="font/woff2" crossorigin />`;

/** A chunk and the chunks it imports — all but the main one, which index.html loads. */
function chunksOf(key, seen = new Set()) {
  const chunk = manifest[key];
  if (!chunk || chunk.isEntry || seen.has(key)) return [];
  seen.add(key);
  return [chunk.file, ...(chunk.imports ?? []).flatMap((imported) => chunksOf(imported, seen))];
}
const modulePreload = (file) => `<link rel="modulepreload" crossorigin href="/${file}" />`;

// The Content-Security-Policy (vercel.json) runs scripts from files only, so a page must not
// carry an inline one. Structured data (JSON-LD) is data, not a script, and may stay.
const INLINE_SCRIPT = /<script(?![^>]*\ssrc=)(?![^>]*\stype="application\/ld\+json")[^>]*>/;

/** '/' → index.html; '/english' → english.html and english/index.html; '/404' → 404.html. */
const outputFiles = (route) => {
  if (route === '/') return ['index.html'];
  if (route === '/404') return ['404.html'];
  return [`${route.slice(1)}.html`, `${route.slice(1)}/index.html`];
};

for (const route of routes) {
  const rendered = await render(route.locale, route.page, { assetOrigin });
  const { html, head, lang, dir, page: pageId } = rendered;
  const pageKey = pageModule(pageId, route.locale);
  const seen = new Set();
  const chunks = chunksOf(PAGE_MODULES[pageKey], seen);
  if (!chunks.length) throw new Error(`No chunk for the ${pageKey} page in the build manifest.`);
  const copyChunks = chunksOf(DICTIONARY_MODULES[route.locale], seen);
  if (!copyChunks.length) throw new Error(`No chunk for the ${route.locale} copy in the manifest.`);
  chunks.push(...copyChunks);
  const fonts = FIRST_PAINT_FONTS[route.locale].map(fontFile).filter(Boolean).map(fontPreload);

  // Replacer functions insert the markup verbatim ("$&", "$'"… are not patterns there). The
  // page's chunks are only needed to hydrate, so they come last, after the main script and
  // the stylesheet: the first paint's requests (the fonts, the CSS) are made before them.
  const page = template
    .replace(/<html[^>]*>/, () => `<html lang="${lang}" dir="${dir}" data-page="${pageId}">`)
    .replace(HEAD_SLOT, () => [...fonts, head].join('\n    '))
    .replace('</head>', () => `  ${chunks.map(modulePreload).join('\n    ')}\n  </head>`)
    .replace(HTML_SLOT, () => html);
  if (INLINE_SCRIPT.test(page)) {
    throw new Error(
      `The ${route.path} page has an inline <script>, which the Content-Security-Policy ` +
        'in vercel.json blocks: load the code from a file instead.',
    );
  }

  const written = [];
  for (const file of outputFiles(route.path)) {
    const outFile = path.join(clientDir, file);
    await mkdir(path.dirname(outFile), { recursive: true });
    await writeFile(outFile, page);
    written.push(path.relative(root, outFile));
  }
  console.log(`  ✓ ${route.path.padEnd(10)} → ${written.join(', ')}`);
}

// The store figures are a capture: say so when it's time to take a new one.
const STALE_AFTER_DAYS = 60;
const age = Math.floor((Date.now() - Date.parse(site.capturedAt)) / 86_400_000);
if (age > STALE_AFTER_DAYS) {
  console.warn(
    `\n  ⚠ The store figures were captured ${age} days ago (${site.capturedAt}). Check the ` +
      'Google Play listing and update src/content/site.js — downloads, ratings, capturedAt.',
  );
}
