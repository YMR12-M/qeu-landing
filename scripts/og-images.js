/**
 * The link-preview images (Open Graph, 1200×630): public/og-image.jpg for the Arabic pages,
 * public/og-image-en.jpg for the English one.
 *
 * They are drawn like the hero: Qeu's teal wall, the headline in night ink with its promise
 * marked in yellow, the download button, the app's price circled in pen, and three of the store
 * screenshots with their offer flags, standing half on the teal and half on the white floor.
 * Copy, logo, fonts, the marker and the screenshots are the site's own, so after changing any
 * of them in the hero, run `npm run og` and commit the two images.
 *
 * Renders with headless Google Chrome over the DevTools protocol (set CHROME to use another
 * Chrome or Chromium binary) and encodes with sharp, which vite-imagetools already installs.
 */
import { spawn } from 'node:child_process';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import sharp from 'sharp';
import { LOGO_PATHS, LOGO_VIEWBOX } from '../src/components/brand/logo-paths.js';
import { dictionaries } from '../src/content/locales/index.js';
import { LOCALES } from '../src/i18n/locales.js';

const root = fileURLToPath(new URL('..', import.meta.url));

const WIDTH = 1200;
const HEIGHT = 630;
const OUTPUT = { ar: 'og-image.jpg', en: 'og-image-en.jpg' };
// Three of the six store screenshots, the one nearest the headline first — the hero's labels.
const PRODUCTS = ['offers', 'picks', 'assistant'];
// The headline's size: the English line is longer, and has one line fewer.
const TITLE_SIZE = { ar: 52, en: 52 };

const CHROME =
  process.env.CHROME ??
  {
    darwin: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    win32: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  }[process.platform] ??
  'google-chrome';

const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (char) => `&#${char.charCodeAt(0)};`);

const dataUri = async (file, type) =>
  `data:${type};base64,${(await readFile(file)).toString('base64')}`;
const image = (name, type) => dataUri(path.join(root, 'src', 'assets', 'images', name), type);

// Tajawal from @fontsource, as the site loads it: each weight's Arabic and Latin subsets. The
// files are inlined, so the page needs nothing from disk (fonts from file: URLs are blocked).
const fontsDir = path.join(root, 'node_modules', '@fontsource', 'tajawal');
let fontCss = '';
for (const weight of [500, 700, 800, 900]) {
  const css = await readFile(path.join(fontsDir, `${weight}.css`), 'utf8');
  const sources = [...css.matchAll(/src: url\(\.\/files\/([\w-]+\.woff2)\)[^;]*;/g)];
  let inlined = css;
  for (const [rule, file] of sources) {
    const uri = await dataUri(path.join(fontsDir, 'files', file), 'font/woff2');
    inlined = inlined.replace(rule, `src: url(${uri}) format('woff2');`);
  }
  fontCss += inlined;
}

// The hero's highlighter stroke and the pen's loop, as the page draws them.
const marker = await dataUri(
  path.join(root, 'src', 'assets', 'marks', 'marker.svg'),
  'image/svg+xml',
);
const LOOP = 'M54 13C94 1 162 5 185 29C205 50 181 84 114 89C50 94 3 76 6 46C9 19 51 6 99 11';

const CSS = `
* { box-sizing: border-box; margin: 0; }
html, body { inline-size: ${WIDTH}px; block-size: ${HEIGHT}px; }
body {
  position: relative;
  overflow: hidden;
  font-family: 'Tajawal', sans-serif;
  color: #04282f;
  /* The teal wall, and the white floor the screens stand on. */
  background: linear-gradient(#17a2ae 0 540px, #fff 540px);
}

/* The brand, in the corner the page reads from. */
.brand { position: absolute; inset-block-start: 46px; inset-inline-start: 64px; display: flex; align-items: center; gap: 14px; }
.icon { inline-size: 56px; block-size: 56px; border-radius: 28%; }
.wordmark { block-size: 38px; inline-size: auto; aspect-ratio: 65 / 34; }

/* The headline and the button. */
.display { position: absolute; inset-inline-start: 64px; inset-block-start: 150px; inline-size: 640px; }
.title { font-size: var(--title, 58px); font-weight: 900; line-height: 1.15; text-wrap: balance; }
.accent {
  margin-inline: -0.12em; padding-inline: 0.12em;
  background: url("${marker}") no-repeat right 0 bottom 0.02em / 100% 0.62em;
}
:dir(ltr) .accent { background-position: left 0 bottom 0.02em; }
.actions { display: flex; align-items: center; gap: 24px; margin-block-start: 34px; }
.cta { padding: 16px 34px 17px; border-radius: 14px; background: #04282f; color: #fff; font-size: 24px; font-weight: 800; line-height: 1.2; white-space: nowrap; }
.stores { font-size: 20px; font-weight: 700; white-space: nowrap; }

/* The app's price at the far end, circled in white pen. */
.price { position: absolute; inset-block-start: 44px; inset-inline-end: 64px; display: grid; justify-items: center; gap: 2px; rotate: -6deg; }
:dir(ltr) .price { rotate: 6deg; }
.priceName { font-size: 19px; font-weight: 800; }
.priceValue { position: relative; font-size: 58px; font-weight: 900; line-height: 1.1; }
.loop { position: absolute; inset: -12px -26px -7px; inline-size: calc(100% + 52px); block-size: calc(100% + 19px); overflow: visible; fill: none; stroke: #fff; stroke-width: 4px; stroke-linecap: round; }
:dir(ltr) .loop { scale: -1 1; }

/* Three screens, set down by hand, half on the teal and half on the floor. */
.stock { position: absolute; z-index: 1; inset-inline-end: 56px; inset-block-start: 250px; display: flex; gap: 26px; }
.facing { display: grid; justify-items: start; gap: 12px; }
.facing:nth-child(1) { rotate: -2deg; }
.facing:nth-child(2) { rotate: 1.5deg; translate: 0 12px; }
.facing:nth-child(3) { rotate: -1deg; }
.product { display: block; block-size: 290px; inline-size: auto; border-radius: 8% / 3.7%; box-shadow: 0 24px 32px -20px rgb(4 40 47 / 0.55); }
.label { display: flex; align-items: center; gap: 8px; white-space: nowrap; }
.flag { padding: 6px 8px 7px; border-radius: 5px; background: #ffc43d; font-size: 15px; font-weight: 900; line-height: 1; }
.name { font-size: 15px; font-weight: 800; }
`;

async function page(locale) {
  const { lang, dir } = LOCALES[locale];
  const { hero, meta } = dictionaries[locale];
  const title = [
    ...hero.titleLines.map(escapeHtml),
    `<span class="accent">${escapeHtml(hero.titleAccent)}</span>`,
  ];
  const screenshots = await Promise.all(
    PRODUCTS.map((id) => image(`play-${id}.webp`, 'image/webp')),
  );
  const products = PRODUCTS.map(
    (id, index) => `
    <div class="facing">
      <img class="product" src="${screenshots[index]}" alt="">
      <span class="label"><span class="flag">${escapeHtml(hero.shelf.offer)}</span><span class="name">${escapeHtml(hero.shelf.labels[id])}</span></span>
    </div>`,
  ).join('');

  return `<!doctype html>
<html lang="${lang}" dir="${dir}">
<head><meta charset="utf-8"><style>${fontCss}\n${CSS}</style></head>
<body style="--title: ${TITLE_SIZE[locale]}px">
  <div class="brand">
    <img class="icon" src="${await image('app-icon.png', 'image/png')}" alt="">
    <svg class="wordmark" viewBox="${LOGO_VIEWBOX}" fill="currentColor">${LOGO_PATHS.map((d) => `<path d="${d}"/>`).join('')}</svg>
  </div>
  <p class="price">
    <span class="priceName">${escapeHtml(hero.shelf.app)}</span>
    <span class="priceValue">${escapeHtml(hero.shelf.price)}<svg class="loop" viewBox="0 0 200 100" preserveAspectRatio="none"><path d="${LOOP}" vector-effect="non-scaling-stroke"/></svg></span>
  </p>
  <div class="display">
    <h1 class="title">${title.join('<br>')}</h1>
    <div class="actions">
      <span class="cta">${escapeHtml(hero.cta.default)}</span>
      <span class="stores">${escapeHtml(meta.ogImage.stores)}</span>
    </div>
  </div>
  <div class="stock">${products}</div>
</body>
</html>`;
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/** Headless Chrome, driven over the DevTools protocol: `send(method, params)` and `close()`. */
async function openChrome(profile) {
  const chrome = spawn(
    CHROME,
    [
      '--headless=new',
      `--user-data-dir=${profile}`,
      '--remote-debugging-port=0',
      '--no-first-run',
      '--no-default-browser-check',
      '--hide-scrollbars',
      'about:blank',
    ],
    { stdio: 'ignore' },
  );
  const failed = new Promise((_, reject) => {
    chrome.once('error', (error) =>
      reject(new Error(`Chrome didn't start (${CHROME}): ${error.message}`)),
    );
  });

  // Chrome picks a free port and writes it into the profile.
  const port = await Promise.race([
    failed,
    (async () => {
      for (let attempt = 0; attempt < 100; attempt += 1) {
        const [line] = (
          await readFile(path.join(profile, 'DevToolsActivePort'), 'utf8').catch(() => '')
        ).split('\n');
        if (line) return line;
        await sleep(100);
      }
      throw new Error('Chrome started, but its DevTools port never showed up.');
    })(),
  ]);
  const targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
  const socket = new WebSocket(
    targets.find((target) => target.type === 'page').webSocketDebuggerUrl,
  );
  await new Promise((resolve, reject) => {
    socket.addEventListener('open', resolve, { once: true });
    socket.addEventListener('error', reject, { once: true });
  });

  let lastId = 0;
  const pending = new Map();
  const listeners = new Set();
  socket.addEventListener('message', ({ data }) => {
    const message = JSON.parse(data);
    const call = pending.get(message.id);
    if (call) {
      pending.delete(message.id);
      if (message.error) call.reject(new Error(message.error.message));
      else call.resolve(message.result);
    } else if (message.method) {
      for (const listener of listeners) listener(message);
    }
  });
  const send = (method, params = {}) =>
    new Promise((resolve, reject) => {
      lastId += 1;
      pending.set(lastId, { resolve, reject });
      socket.send(JSON.stringify({ id: lastId, method, params }));
    });
  const once = (method) =>
    new Promise((resolve) => {
      const listener = (message) => {
        if (message.method !== method) return;
        listeners.delete(listener);
        resolve(message.params);
      };
      listeners.add(listener);
    });
  const close = () => {
    socket.close();
    chrome.kill();
  };
  return { send, once, close };
}

const work = await mkdtemp(path.join(tmpdir(), 'qeu-og-'));
const chrome = await openChrome(path.join(work, 'profile'));
try {
  await chrome.send('Page.enable');
  await chrome.send('Emulation.setDeviceMetricsOverride', {
    width: WIDTH,
    height: HEIGHT,
    deviceScaleFactor: 1,
    mobile: false,
  });

  for (const locale of Object.keys(OUTPUT)) {
    const html = path.join(work, `${locale}.html`);
    await writeFile(html, await page(locale));
    const loaded = chrome.once('Page.loadEventFired');
    await chrome.send('Page.navigate', { url: pathToFileURL(html).href });
    await loaded;
    // Every font face and image in place before the picture is taken.
    await chrome.send('Runtime.evaluate', {
      expression:
        'document.fonts.ready.then(() => Promise.all([...document.images].map((image) => image.decode())))',
      awaitPromise: true,
    });
    const { data } = await chrome.send('Page.captureScreenshot', { format: 'png' });

    const png = Buffer.from(data, 'base64');
    const { width, height } = await sharp(png).metadata();
    if (width !== WIDTH || height !== HEIGHT) {
      throw new Error(`Chrome drew ${width}×${height} instead of ${WIDTH}×${HEIGHT}.`);
    }
    const out = path.join(root, 'public', OUTPUT[locale]);
    const { size } = await sharp(png)
      .jpeg({ quality: 86, mozjpeg: true, chromaSubsampling: '4:4:4' })
      .toFile(out);
    console.log(
      `  ✓ ${path.relative(root, out)} — ${WIDTH}×${HEIGHT}, ${Math.round(size / 1024)} kB`,
    );
  }
} finally {
  chrome.close();
  await rm(work, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
}
