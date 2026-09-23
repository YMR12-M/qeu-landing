/**
 * Generates src/assets/qr/download-qr.svg — the QR code shown to desktop visitors.
 *
 * It encodes the smart download link (the same link every download button on qeu.app
 * uses), so one code works for iPhone and Android, tagged utm_medium=qr so scans show
 * up in campaign reports. Re-run after changing the link:  npm run qr
 */
import { mkdir, writeFile } from 'node:fs/promises';
import QRCode from 'qrcode';
import { getStoreHref } from '../src/lib/links.js';

const url = getStoreHref('smart', 'desktop', 'qr');
const output = new URL('../src/assets/qr/download-qr.svg', import.meta.url);

const svg = await QRCode.toString(url, {
  type: 'svg',
  errorCorrectionLevel: 'M',
  margin: 0, // the card around the code provides the quiet zone
  color: { dark: '#0a2a2f', light: '#0000' },
});

await mkdir(new URL('.', output), { recursive: true });
await writeFile(output, svg);
console.log(`QR code → ${url}`);
