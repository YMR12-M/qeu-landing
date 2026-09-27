import { site } from '../content/site.js';

/**
 * Store links with campaign tags, so every install can be traced back to the button
 * that produced it. Extends the convention of Qeu's existing Google Play QR code:
 *   utm_source=website · utm_medium=<button|qr> · utm_campaign=landing_<placement> ·
 *   utm_content=<placement>
 * Play Console reports store-listing traffic by utm_source and utm_campaign only, which is
 * why the campaign carries the placement. Google Play links also repeat the tags in
 * `referrer`: that is the value the app's install referrer (Firebase / GA4) receives.
 * App Store links carry Apple's campaign tags instead — `pt` (Qeu's provider token), `ct`
 * (the same landing_<placement> campaign) and `mt=8` — once the provider token is set.
 */

function withParams(url, params) {
  const target = new URL(url);
  for (const [key, value] of Object.entries(params)) target.searchParams.set(key, value);
  return target.href;
}

function campaign(placement, medium) {
  return {
    utm_source: 'website',
    utm_medium: medium,
    utm_campaign: `landing_${placement}`,
    utm_content: placement,
  };
}

/**
 * @param {'appStore' | 'googlePlay'} store
 * @param {string} placement where the button sits: hero, header, download, footer, desktop (QR)
 * @param {'button' | 'qr'} [medium]
 */
export function getStoreHref(store, placement, medium = 'button') {
  const tags = campaign(placement, medium);

  if (store === 'googlePlay') {
    return withParams(site.links.googlePlay, {
      ...tags,
      referrer: new URLSearchParams(tags).toString(),
    });
  }
  const providerToken = site.links.appStoreProviderToken;
  if (!providerToken) return site.links.appStore;
  return withParams(site.links.appStore, { pt: providerToken, ct: tags.utm_campaign, mt: 8 });
}

/**
 * The redirects behind the download QR code, for vercel.json: its address (site.links.qr)
 * sends an iPhone to the App Store and an Android phone to Google Play — each tagged as a scan
 * of the download section's code (placement `desktop`, medium `qr`) — and anything else (an
 * iPad browsing as a Mac, say) to the download section, which has both. `npm run qr` writes
 * them into vercel.json, and the build checks they are still these (scripts/prerender.js).
 */
export function qrRedirects() {
  const redirect = (destination, userAgent) => ({
    source: site.links.qr,
    ...(userAgent && { has: [{ type: 'header', key: 'user-agent', value: userAgent }] }),
    destination,
    permanent: false,
  });
  return [
    redirect(getStoreHref('appStore', 'desktop', 'qr'), '.*(iPhone|iPad|iPod).*'),
    redirect(getStoreHref('googlePlay', 'desktop', 'qr'), '.*Android.*'),
    redirect('/#download'),
  ];
}

/**
 * On a computer a store page opens in a new tab, so the site stays open; on a phone the
 * store app takes over the link (a new tab there would only be left behind empty).
 * @param {'ios' | 'android' | 'desktop' | 'unknown'} platform from usePlatform()
 */
export function storeLinkTarget(platform) {
  return platform === 'desktop' ? { target: '_blank', rel: 'noopener' } : {};
}
