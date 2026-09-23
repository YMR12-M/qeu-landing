import { dictionaries } from '../content/locales/index.js';
import { site } from '../content/site.js';
import { LOCALES } from '../i18n/locales.js';

/**
 * <head> tags for one locale: title, description, canonical + hreflang, Open Graph,
 * and schema.org structured data. Used only at build time by the pre-renderer.
 */

const OG_IMAGE = { path: '/og-image.png', width: 682, height: 298 };

const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (char) => `&#${char.charCodeAt(0)};`);

const absolute = (path) => new URL(path, site.origin).href;

function structuredData(locale) {
  const { meta } = dictionaries[locale];
  const organizationId = `${site.origin}/#organization`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': organizationId,
        name: dictionaries.ar.meta.siteName,
        alternateName: dictionaries.en.meta.siteName,
        legalName: site.company.legalName,
        url: absolute('/'),
        logo: absolute('/icons/icon-512.png'),
        email: site.contact.email,
        address: {
          '@type': 'PostalAddress',
          addressLocality: site.company.city,
          addressCountry: site.company.country,
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${site.origin}/#website`,
        url: absolute('/'),
        name: dictionaries.ar.meta.siteName,
        inLanguage: Object.values(LOCALES).map((l) => l.hreflang),
        publisher: { '@id': organizationId },
      },
      {
        // No aggregateRating on purpose: Google does not allow marking up ratings
        // collected on another site (the Google Play reviews).
        '@type': 'MobileApplication',
        name: 'كيو | Q',
        description: meta.description,
        applicationCategory: 'ShoppingApplication',
        operatingSystem: `Android ${site.app.androidMinVersion}+, iOS`,
        installUrl: site.links.googlePlay,
        offers: { '@type': 'Offer', price: String(site.app.price), priceCurrency: 'SAR' },
        publisher: { '@id': organizationId },
      },
    ],
  };
}

export function renderHead(locale) {
  const { meta } = dictionaries[locale];
  const config = LOCALES[locale];
  const url = absolute(config.path);
  const others = Object.values(LOCALES).filter((l) => l.code !== locale);
  const jsonLd = JSON.stringify(structuredData(locale)).replace(/</g, '\\u003c');

  return [
    `<title>${escapeHtml(meta.title)}</title>`,
    `<meta name="description" content="${escapeHtml(meta.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    ...Object.values(LOCALES).map(
      (l) => `<link rel="alternate" hreflang="${l.hreflang}" href="${absolute(l.path)}" />`,
    ),
    `<link rel="alternate" hreflang="x-default" href="${absolute('/')}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${escapeHtml(meta.siteName)}" />`,
    `<meta property="og:title" content="${escapeHtml(meta.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(meta.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:locale" content="${config.ogLocale}" />`,
    ...others.map((l) => `<meta property="og:locale:alternate" content="${l.ogLocale}" />`),
    `<meta property="og:image" content="${absolute(OG_IMAGE.path)}" />`,
    `<meta property="og:image:width" content="${OG_IMAGE.width}" />`,
    `<meta property="og:image:height" content="${OG_IMAGE.height}" />`,
    `<meta property="og:image:alt" content="${escapeHtml(meta.ogImageAlt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(meta.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(meta.description)}" />`,
    `<meta name="twitter:image" content="${absolute(OG_IMAGE.path)}" />`,
    `<script type="application/ld+json">${jsonLd}</script>`,
  ].join('\n    ');
}
