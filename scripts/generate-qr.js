/**
 * Generates src/assets/qr/download-qr.svg — the QR code shown to desktop visitors — and the
 * redirects behind it, in vercel.json.
 *
 * The code encodes qeu.app/get (site.links.qr): an address on Qeu's own domain, so where it
 * leads can change without a new code, and short, so the code stays small with error
 * correction to spare. vercel.json sends each phone on from there to its store, tagged
 * utm_medium=qr so scans show up in campaign reports (src/lib/links.js → qrRedirects). Re-run
 * after changing a store link, the App Store provider token or the address:  npm run qr — the
 * build fails until vercel.json agrees with src/content/site.js (scripts/prerender.js).
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { format, resolveConfig } from 'prettier';
import QRCode from 'qrcode';
import { site } from '../src/content/site.js';
import { qrRedirects } from '../src/lib/links.js';

const url = new URL(site.links.qr, site.origin).href;
const output = new URL('../src/assets/qr/download-qr.svg', import.meta.url);
const vercelFile = fileURLToPath(new URL('../vercel.json', import.meta.url));

const svg = await QRCode.toString(url, {
  type: 'svg',
  // M: the address is short enough for 15% error correction at 25×25 modules — a code only
  // ever shown on a screen, and large enough to scan at the card's 96px.
  errorCorrectionLevel: 'M',
  margin: 0, // the card around the code provides the quiet zone
  color: { dark: '#0a2a2f', light: '#0000' },
});

await mkdir(new URL('.', output), { recursive: true });
await writeFile(output, svg);

// The address's own redirects replace any earlier ones; every other redirect stays as it is.
const config = JSON.parse(await readFile(vercelFile, 'utf8'));
const redirects = qrRedirects();
config.redirects = [
  ...(config.redirects ?? []).filter((redirect) => redirect.source !== site.links.qr),
  ...redirects,
];
const style = { ...(await resolveConfig(vercelFile)), filepath: vercelFile };
await writeFile(vercelFile, await format(JSON.stringify(config), style));

console.log(`QR code → ${url}, which vercel.json sends on:`);
for (const { has, destination } of redirects) {
  console.log(`  ${has ? `user-agent ${has[0].value}` : 'anything else'} → ${destination}`);
}
