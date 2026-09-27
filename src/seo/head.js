import { figuresFor } from '../content/figures.js';
import { dictionaries } from '../content/locales/index.js';
import { policy as policyAr } from '../content/policy.js';
import { policy as policyEn } from '../content/policy-en.js';
import { site } from '../content/site.js';
import { LOCALES, pagePath } from '../i18n/locales.js';
import { interpolate } from '../lib/format.js';

/**
 * <head> tags for one page: title, description, canonical + hreflang, Open Graph, and
 * schema.org structured data. Used only at build time by the pre-renderer.
 */

// The link-preview images, one per language (scripts/og-images.js draws them from the hero).
const OG_IMAGES = { ar: '/og-image.jpg', en: '/og-image-en.jpg' };
const OG_SIZE = { width: 1200, height: 630 };

// The privacy policy, in each language.
const POLICIES = { ar: policyAr, en: policyEn };

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
function policyData(locale) {
  const policy = POLICIES[locale];
  const url = absolute(pagePath('policy', locale));
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
        inLanguage: LOCALES[locale].hreflang,
        dateModified: policy.updatedAt,
        isPartOf: { '@id': websiteId },
        about: { '@id': organizationId },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: dictionaries[locale].meta.siteName,
              item: absolute(LOCALES[locale].path),
            },
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
  const tokens = { ...figuresFor(locale, dictionaries[locale]), email: site.contact.email };

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

/**
 * `assetOrigin` is where the link-preview image is fetched from: the canonical site unless the
 * build says the files are served elsewhere for now (scripts/prerender.js).
 */
export function renderHead(locale, page = 'home', { assetOrigin = site.origin } = {}) {
  const { meta, notFound } = dictionaries[locale];
  if (page === 'notFound') {
    // A link that leads nowhere: named for the tab, kept out of search results.
    return [
      `<title>${escapeHtml(notFound.title)}</title>`,
      `<meta name="robots" content="noindex" />`,
    ].join('\n    ');
  }
  const config = LOCALES[locale];
  const isPolicy = page === 'policy';
  // The home page and the policy are each served in both languages: every language's URL is
  // an alternate, and the Arabic one — the site's default — stands for any other language.
  const { title, description } = isPolicy ? POLICIES[locale].meta : meta;
  const url = absolute(pagePath(page, locale));
  const others = Object.values(LOCALES).filter((l) => l.code !== locale);
  const alternates = [
    ...Object.values(LOCALES).map(
      (l) =>
        `<link rel="alternate" hreflang="${l.hreflang}" href="${absolute(pagePath(page, l.code))}" />`,
    ),
    `<link rel="alternate" hreflang="x-default" href="${absolute(pagePath(page, 'ar'))}" />`,
  ];
  const image = new URL(OG_IMAGES[locale], assetOrigin).href;
  const data = isPolicy ? policyData(locale) : structuredData(locale);
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
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:type" content="image/jpeg" />`,
    `<meta property="og:image:width" content="${OG_SIZE.width}" />`,
    `<meta property="og:image:height" content="${OG_SIZE.height}" />`,
    `<meta property="og:image:alt" content="${escapeHtml(meta.ogImage.alt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    `<meta name="twitter:image:alt" content="${escapeHtml(meta.ogImage.alt)}" />`,
    `<script type="application/ld+json">${jsonLd}</script>`,
  ].join('\n    ');
}
