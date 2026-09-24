/**
 * The link-preview images (Open Graph, 1200×630): public/og-image.jpg for the Arabic pages,
 * public/og-image-en.jpg for the English one.
 *
 * They are drawn like the hero: the night shelf, three of the store screenshots standing on
 * it with their offer labels, the headline, the download button and the app's own price
 * label. Copy, logo, fonts and screenshots are the site's own, so after changing any of them
 * in the hero, run `npm run og` and commit the two images.
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
import { barsFor } from '../src/components/ui/barcode-bars.js';
import { dictionaries } from '../src/content/locales/index.js';
import { LOCALES } from '../src/i18n/locales.js';

const root = fileURLToPath(new URL('..', import.meta.url));

const WIDTH = 1200;
const HEIGHT = 630;
const OUTPUT = { ar: 'og-image.jpg', en: 'og-image-en.jpg' };
// Three of the six store screenshots, the one nearest the headline first — the hero's labels.
const PRODUCTS = ['offers', 'picks', 'assistant'];
// The headline's size: the English line is longer, and has one line fewer.
const TITLE_SIZE = { ar: 54, en: 50 };

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
for (const weight of [500, 700, 800]) {
  const css = await readFile(path.join(fontsDir, `${weight}.css`), 'utf8');
  const sources = [...css.matchAll(/src: url\(\.\/files\/([\w-]+\.woff2)\)[^;]*;/g)];
  let inlined = css;
  for (const [rule, file] of sources) {
    const uri = await dataUri(path.join(fontsDir, 'files', file), 'font/woff2');
    inlined = inlined.replace(rule, `src: url(${uri}) format('woff2');`);
  }
  fontCss += inlined;
}

function barcode(seed, count) {
  const { bars, width } = barsFor(seed, count);
  const rects = bars.map(({ x, width: w }) => `<rect x="${x}" width="${w}" height="1"/>`).join('');
  return `<svg class="barcode" viewBox="0 0 ${width} 1" preserveAspectRatio="none" fill="currentColor">${rects}</svg>`;
}

const CSS = `
* { box-sizing: border-box; margin: 0; }
html, body { inline-size: ${WIDTH}px; block-size: ${HEIGHT}px; }
body {
  position: relative;
  overflow: hidden;
  font-family: 'Tajawal', sans-serif;
  color: #fff;
  background:
    radial-gradient(75% 70% at 50% 0, rgb(159 227 234 / 0.13), rgb(159 227 234 / 0) 70%),
    radial-gradient(circle, rgb(159 227 234 / 0.09) 1.1px, rgb(159 227 234 / 0) 1.6px) 50% 0 / 24px 24px,
    #04282f;
}

/* The brand, in the corner the page reads from. */
.brand { position: absolute; inset-block-start: 50px; inset-inline-start: 64px; display: flex; align-items: center; gap: 14px; }
.icon { inline-size: 58px; block-size: 58px; border-radius: 28%; }
.wordmark { block-size: 38px; inline-size: auto; aspect-ratio: 65 / 34; }

/* The headline and the button, standing at the head of the shelf. */
.display { position: absolute; inset-inline-start: 64px; inset-block-end: 162px; inline-size: 600px; }
.title { font-size: var(--title, 54px); font-weight: 800; line-height: 1.16; text-wrap: balance; }
.accent { color: #9fe3ea; }
.actions { display: flex; align-items: center; gap: 22px; margin-block-start: 32px; }
.cta { padding: 13px 34px 15px; border-radius: 999px; background: #17a2ae; color: #052f38; font-size: 25px; font-weight: 700; line-height: 1.2; white-space: nowrap; }
.stores { font-size: 20px; font-weight: 500; color: #9fe3ea; white-space: nowrap; }

/* The shelf: top face lit from above, the edge catching the light, the price rail. */
.edge {
  position: absolute; inset-inline: 0; inset-block-start: 520px; block-size: 70px;
  background:
    linear-gradient(rgb(159 227 234 / 0.45), rgb(159 227 234 / 0.45)) 0 14px / 100% 1px no-repeat,
    linear-gradient(#1c5864, #10424c) 0 0 / 100% 14px no-repeat,
    linear-gradient(#0b4a57, #073842) 0 14px / 100% 56px no-repeat;
  box-shadow: 0 24px 32px -16px rgb(0 0 0 / 0.65);
}

/* The products: whole store screenshots on the middle of the top face. */
.aisle {
  position: absolute; z-index: 1; inset-inline-end: 0; inset-block-end: ${HEIGHT - 527}px;
  inline-size: 520px; display: flex; align-items: flex-end; gap: 28px; padding-inline-start: 28px;
  overflow-x: clip; /* the last product runs off the picture, as down an aisle */
}
.aisle::before {
  content: ''; position: absolute; inset-inline-start: 0; inset-block-end: 0;
  inline-size: 3px; block-size: 262px; border-radius: 2px 2px 0 0;
  background: linear-gradient(to top, rgb(159 227 234 / 0.55), rgb(159 227 234 / 0.06));
}
.facing { position: relative; flex: none; }
.product { display: block; block-size: 372px; inline-size: auto; border-radius: 8% / 3.7%; box-shadow: 0 16px 24px -16px rgb(0 0 0 / 0.8); }
.facing::after {
  content: ''; position: absolute; inset-inline: 4%; inset-block-end: -5px; block-size: 10px;
  background: radial-gradient(closest-side, rgb(0 0 0 / 0.6), rgb(0 0 0 / 0));
}

/* Labels in the rail: a yellow offer flag, then the name; the app's own label says its price. */
.label, .priceTag {
  position: absolute; display: flex; align-items: stretch; block-size: 40px; overflow: hidden;
  border-radius: 4px; background: #fff; color: #04282f; white-space: nowrap;
  box-shadow: 0 2px 4px rgb(0 0 0 / 0.4);
}
.label { inset-block-start: calc(100% + 15px); inset-inline: 4px; }
.flag { display: grid; place-items: center; padding-inline: 10px; background: #ffc43d; font-size: 17px; font-weight: 800; }
.name { align-self: center; padding-inline: 10px; font-size: 15px; font-weight: 700; color: #0b4a57; }
.priceTag { inset-block-start: 542px; inset-inline-start: 64px; align-items: center; gap: 14px; padding-inline: 14px; }
.priceName { font-size: 15px; font-weight: 700; color: #3e6e78; }
.price { font-size: 25px; font-weight: 800; line-height: 1; color: #0b4a57; }
.barcode { inline-size: 46px; block-size: 22px; color: #04282f; }
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
  <div class="display">
    <h1 class="title">${title.join('<br>')}</h1>
    <div class="actions">
      <span class="cta">${escapeHtml(hero.cta.default)}</span>
      <span class="stores">${escapeHtml(meta.ogImage.stores)}</span>
    </div>
  </div>
  <div class="edge"></div>
  <div class="aisle">${products}</div>
  <span class="priceTag">
    <span class="priceName">${escapeHtml(hero.shelf.app)}</span>
    <span class="price">${escapeHtml(hero.shelf.price)}</span>
    ${barcode('QEU APP', 18)}
  </span>
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
