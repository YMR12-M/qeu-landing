import { site } from '../content/site.js';

/**
 * Store links with campaign tags, so every install can be traced back to the button
 * that produced it. Same convention as Qeu's existing Google Play QR code:
 * utm_source=website · utm_medium=<button|qr> · utm_content=<placement>.
 */

function withParams(url, params) {
  const target = new URL(url);
  for (const [key, value] of Object.entries(params)) target.searchParams.set(key, value);
  return target.href;
}

function campaign(placement, medium) {
  return { utm_source: 'website', utm_medium: medium, utm_content: placement };
}

/**
 * @param {'appStore' | 'googlePlay' | 'smart'} store
 * @param {string} placement where the button sits: hero, header, sticky, download, footer…
 * @param {'button' | 'qr'} [medium]
 */
export function getStoreHref(store, placement, medium = 'button') {
  const tags = campaign(placement, medium);

  if (store === 'googlePlay') return withParams(site.links.googlePlay, tags);
  if (store === 'appStore' && site.links.appStore) return site.links.appStore;
  return withParams(site.links.smartDownload, tags);
}
