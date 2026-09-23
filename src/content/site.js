/**
 * Facts about Qeu — the single source of truth for numbers, links and legal details.
 *
 * Nothing here is estimated or invented; every block names where it comes from.
 * When a number changes (rating, downloads…), update it here and rebuild: both
 * languages, the structured data and the sticky download bar all read from this file.
 */

export const site = {
  origin: 'https://qeu.app',

  // Source: Google Play listing for sa.qeu1.app — captured 20 September 2026.
  app: {
    androidPackage: 'sa.qeu1.app',
    androidMinVersion: '7.0',
    price: 0,
  },

  // Source: Google Play listing — captured 20 September 2026. Downloads is the store's
  // "100K+" bracket; ratings are the phone figures (1.3K reviews across all devices).
  downloads: 100_000,
  ratings: {
    average: 4.7,
    count: 1252,
    distribution: { 5: 1114, 4: 69, 3: 0, 2: 0, 1: 69 },
  },

  links: {
    // Source: qeu.app — every download button on the current site points here, for both
    // iPhone and Android, so it routes each visitor to the right store.
    smartDownload: 'https://link-to.app/qeu',
    // TODO(client): add the direct App Store URL (https://apps.apple.com/sa/app/id…).
    // Until then, iPhone buttons use the smart link above.
    appStore: null,
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
