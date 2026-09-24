import { figuresFor } from '../content/figures.js';
import { dictionaries } from '../content/locales/index.js';
import { policy } from '../content/policy.js';
import { site } from '../content/site.js';
import { LOCALES, POLICY_PATH } from '../i18n/locales.js';
import { interpolate } from '../lib/format.js';

/**
 * <head> tags for one page: title, description, canonical + hreflang, Open Graph, and
 * schema.org structured data. Used only at build time by the pre-renderer.
 */

const OG_IMAGE = { path: '/og-image.png', width: 682, height: 298 };

const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (char) => `&#${char.charCodeAt(0)};`);

const absolute = (path) => new URL(path, site.origin).href;

const organizationId = `${site.origin}/#organization`;
const websiteId = `${site.origin}/#website`;

const organization = {
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
};

const website = {
  '@type': 'WebSite',
  '@id': websiteId,
  url: absolute('/'),
  name: dictionaries.ar.meta.siteName,
  inLanguage: Object.values(LOCALES).map((l) => l.hreflang),
  publisher: { '@id': organizationId },
};

/** The privacy policy: a page of the site, about the company, with its own date. */
function policyData() {
  const url = absolute(POLICY_PATH);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      organization,
      website,
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: policy.meta.title,
        description: policy.meta.description,
        inLanguage: LOCALES.ar.hreflang,
        dateModified: policy.updatedAt,
        isPartOf: { '@id': websiteId },
        about: { '@id': organizationId },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: organization.name, item: absolute('/') },
            { '@type': 'ListItem', position: 2, name: policy.title, item: url },
          ],
        },
      },
    ],
  };
}

function structuredData(locale) {
  const { meta, faq } = dictionaries[locale];
  const config = LOCALES[locale];
  const tokens = { ...figuresFor(locale), email: site.contact.email };

  return {
    '@context': 'https://schema.org',
    '@graph': [
      organization,
      website,
      {
        // No aggregateRating on purpose: Google does not allow marking up ratings
        // collected on another site (the Google Play reviews).
        '@type': 'MobileApplication',
        name: 'كيو | Q',
        description: meta.description,
        applicationCategory: 'ShoppingApplication',
        operatingSystem: `Android ${site.app.androidMinVersion}+, iOS ${site.app.iosMinVersion}+`,
        installUrl: [site.links.googlePlay, site.links.appStore],
        offers: { '@type': 'Offer', price: String(site.app.price), priceCurrency: 'SAR' },
        publisher: { '@id': organizationId },
      },
      {
        // The same questions and answers the page shows in its FAQ section.
        '@type': 'FAQPage',
        '@id': `${absolute(config.path)}#faq`,
        inLanguage: config.hreflang,
        mainEntity: faq.items.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: interpolate(item.answer, tokens) },
        })),
      },
    ],
  };
}

export function renderHead(locale, page = 'home') {
  const { meta } = dictionaries[locale];
  const config = LOCALES[locale];
  const isPolicy = page === 'policy';
  // The policy has one language, so no alternates; the home page has one per locale.
  const title = isPolicy ? policy.meta.title : meta.title;
  const description = isPolicy ? policy.meta.description : meta.description;
  const url = absolute(isPolicy ? POLICY_PATH : config.path);
  const others = isPolicy ? [] : Object.values(LOCALES).filter((l) => l.code !== locale);
  const alternates = isPolicy
    ? []
    : [
        ...Object.values(LOCALES).map(
          (l) => `<link rel="alternate" hreflang="${l.hreflang}" href="${absolute(l.path)}" />`,
        ),
        `<link rel="alternate" hreflang="x-default" href="${absolute('/')}" />`,
      ];
  const data = isPolicy ? policyData() : structuredData(locale);
  const jsonLd = JSON.stringify(data).replace(/</g, '\\u003c');

  return [
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeHtml(description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    ...alternates,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${escapeHtml(meta.siteName)}" />`,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:locale" content="${config.ogLocale}" />`,
    ...others.map((l) => `<meta property="og:locale:alternate" content="${l.ogLocale}" />`),
    `<meta property="og:image" content="${absolute(OG_IMAGE.path)}" />`,
    `<meta property="og:image:width" content="${OG_IMAGE.width}" />`,
    `<meta property="og:image:height" content="${OG_IMAGE.height}" />`,
    `<meta property="og:image:alt" content="${escapeHtml(meta.ogImageAlt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
    `<meta name="twitter:image" content="${absolute(OG_IMAGE.path)}" />`,
    `<script type="application/ld+json">${jsonLd}</script>`,
  ].join('\n    ');
}
