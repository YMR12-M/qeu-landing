/**
 * Vendor-neutral analytics. Nothing is loaded from here: once Google Tag Manager or
 * gtag.js is added (see README → Analytics), download clicks arrive as
 * `app_download_click` with the store and the button's placement.
 */
export function trackDownloadClick({ store, placement }) {
  window.dataLayer?.push({ event: 'app_download_click', store, placement });
  window.gtag?.('event', 'app_download_click', { store, placement });
}
