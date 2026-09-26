/**
 * Facts about Qeu — the single source of truth for numbers, links and legal details.
 *
 * Nothing here is estimated or invented; every block names where it comes from.
 * When a number changes (rating, downloads…), update it here and rebuild: both languages
 * (their copy quotes these figures as {tokens} — see src/content/figures.js) and the
 * structured data read from this file.
 */

export const site = {
  origin: 'https://qeu.app',

  // The day the Google Play figures below were read from the store listing.
  capturedAt: '2026-09-20',

  // Source: Google Play listing for sa.qeu1.app — captured 20 September 2026; the iOS line
  // from the App Store listing (id6754709202) — captured 24 September 2026.
  app: {
    androidPackage: 'sa.qeu1.app',
    androidMinVersion: '7.0',
    iosMinVersion: '15.0', // iPhone only — the App Store lists no iPad version
    price: 0, // free on both stores
    releasedAt: '2026-01-25', // first release on Google Play (the App Store's: 22 January 2026)
  },

  // Source: Google Play listing — captured 20 September 2026. Downloads is the store's
  // "100K+" bracket; ratings are the phone figures, and `total` is the review count across
  // all devices, which the store shows rounded ("1.3K").
  downloads: 100_000,
  ratings: {
    average: 4.7,
    count: 1252,
    total: 1300,
    distribution: { 5: 1114, 4: 69, 3: 0, 2: 0, 1: 69 },
  },

  links: {
    // Source: qeu.app — every download button on the current site points here, for both
    // iPhone and Android, so it routes each visitor to the right store.
    smartDownload: 'https://link-to.app/qeu',
    // Source: App Store listing, Saudi storefront — captured 24 September 2026.
    appStore: 'https://apps.apple.com/sa/app/id6754709202',
    // The App Store's campaign links need Qeu's provider token (App Store Connect → Analytics →
    // Campaigns → "Generate a campaign link", the `pt` value). Until the client provides it the
    // App Store buttons link plainly; once set, each carries its placement (`ct`) like the
    // Google Play ones, and App Analytics reports installs per button.
    appStoreProviderToken: null,
    googlePlay: 'https://play.google.com/store/apps/details?id=sa.qeu1.app',
  },

  // Source: qeu.app footer and qeu.app/policy.
  contact: {
    email: 'support@qeu.app',
  },

  // Source: qeu.app/policy and the Google Play publisher name.
  company: {
    legalName: 'شركة الخيال اللامحدود',
    city: 'Jeddah',
    country: 'SA',
  },
};

/** Share of phone ratings that are five stars (0–100). */
export const fiveStarShare = Math.round((site.ratings.distribution[5] / site.ratings.count) * 100);
