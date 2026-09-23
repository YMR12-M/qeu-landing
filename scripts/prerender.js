/**
 * Static pre-rendering (SSG) — runs after both Vite builds.
 *
 * Renders every locale with the server bundle and writes real HTML into dist/client:
 *   /          → dist/client/index.html          (Arabic)
 *   /english   → dist/client/english/index.html  (English)
 * Crawlers and the first paint get the full page; React then hydrates it in the browser.
 */
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const clientDir = path.join(root, 'dist', 'client');
const serverEntry = path.join(root, 'dist', 'server', 'entry-server.js');

const { render, routes } = await import(pathToFileURL(serverEntry).href);
const template = await readFile(path.join(clientDir, 'index.html'), 'utf8');
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

for (const route of routes) {
  const { html, head, lang, dir } = render(route.locale);
  const preloads = FIRST_PAINT_FONTS[route.locale].map(fontFile).filter(Boolean).map(fontPreload);

  const page = template
    .replace(/<html[^>]*>/, `<html lang="${lang}" dir="${dir}">`)
    .replace('<!--app-head-->', [...preloads, head].join('\n    '))
    .replace('<!--app-html-->', html);

  const outFile = path.join(clientDir, route.path, 'index.html');
  await mkdir(path.dirname(outFile), { recursive: true });
  await writeFile(outFile, page);
  console.log(`  ✓ ${route.path.padEnd(10)} → ${path.relative(root, outFile)}`);
}
