# Qeu — landing page (كيو | Q)

Marketing site for the Qeu grocery-deals app: Arabic at `/` (default, RTL) and English at
`/english` (LTR). Built on the **Qeu Landing v3** design, with two blocks kept from the earlier
proposal and every image and claim checked against Qeu's own sources.

```bash
npm install
npm run dev       # http://localhost:5173 (Arabic) · /english
npm run build     # static site → dist/client
npm run preview   # serve the production build
npm run lint      # ESLint
npm run qr        # regenerate the download QR code (after changing the smart link)
```

Node ≥ 20.19.

---

## What the page is

| Section | Source |
| --- | --- |
| Header, hero with drifting app screens | v3 |
| «ليه كيو؟» — pinned, scroll-driven benefits with the matching screen | v3 |
| «كيف يشتغل / عروضنا تجيك وبنفس السعر» — three steps with screens | **kept** from the earlier proposal (takes v3's "inside the app" slot) |
| Google Play figures (count up on scroll) | v3 |
| «حمّل كيو» with the app-icon stage, phone and QR card | v3 text + **kept** stage from the earlier proposal |
| Footer | v3, with the missing legal and contact details added |

### Changed from v3

Images
- Every app screen sits in the same frame style. v3 showed small, unframed crops.
- The screenshot crops were re-cut from the original Google Play screenshots at about 1.8× the
  resolution of the provided files, so they stay sharp on retina screens. The build serves them
  as responsive AVIF and WebP.
- Each «ليه كيو؟» benefit now shows a screen that matches it. In v3, "Lowest prices" showed the
  delivery screen.

Content (claims v3 made that the sources don't support)
- Removed "فالسلة تتعمّر لوحدها" (the cart fills itself) and "أقسام جاهزة لمقاضي البيت والطبخ والتنظيف".
- "يوصلك، وتعرف متى" implied a delivery ETA; the wording now follows the Play description.
- The five-star share is 89% (1,114 of 1,252 = 88.98%). v3 said 88.9%.
- The copy said "on Google Play" while offering an App Store button; it now names both.
- v3's hero and header buttons sent everyone, iPhone users included, to Google Play. Buttons now
  open the visitor's own store, and on a computer they jump to the download section.
- v3's QR code opened Google Play only, so it was useless on an iPhone. The new QR code encodes the
  smart link, which works for both.
- "بلّغ عن مشكلة" linked to the store page; it now emails support. Added the support email, the
  privacy policy link, and the legal entity and address.
- v3 translated the text in place (brand "Que"). There is now a real `/english` page (brand "Q",
  as on qeu.app/english) with hreflang.
- Header: the real wordmark vector replaces the typed name.
- Arabic headings no longer get letter-spacing, which breaks letter joining.

## Stack, and why

- **React 19 + Vite 8, pre-rendered (SSG).** Pages are written as React components and rendered
  to static HTML at build time (`scripts/prerender.js`). Crawlers and the first paint get the
  whole page, and React hydrates it for the small amount of interaction.
- **No server and no database.** The content is static and changes rarely, so `dist/client` is
  plain files for any static host or CDN. Node is used only for the build. A server or MySQL
  would add cost and attack surface without adding anything here.
- **CSS Modules + design tokens.** Each component owns its styles; colours, type and spacing
  live in `src/styles/tokens.css`. Layout uses logical properties throughout, so RTL and LTR share
  the same CSS.
- Fonts are self-hosted (Tajawal, IBM Plex Mono) and images are optimised at build time
  (vite-imagetools). There are no third-party requests.

## Structure

```
src/
  App.jsx                 page composition
  entry-client.jsx        hydrate (prod) / render (dev)
  entry-server.jsx        render one locale to HTML — used by the prerender
  content/
    site.js               facts: ratings, downloads, links, company — single source of truth
    locales/ar.js, en.js  all copy, same shape in both files
    media.js              every image + its responsive sizes
  components/
    layout/               Header, Footer, SkipLink
    sections/             Hero, WhyQeu, HowItWorks, Download
    download/             DownloadLink, StorePills, AppStage, QrCard
    stats/                StatsRow, CountUp
    brand/                Logo (vector wordmark from qeu.app)
    ui/                   Picture, Reveal, SectionHeading, icons
  i18n/                   locales config, provider, useLocale()
  hooks/usePlatform.js    iOS / Android / desktop (hydration-safe)
  lib/                    links (store URLs + UTM), analytics, formatting, cx
  seo/head.js             <title>, meta, hreflang, Open Graph, JSON-LD
  styles/                 fonts, tokens, base, layout
scripts/
  prerender.js            writes dist/client/index.html and dist/client/english/index.html
  generate-qr.js          src/assets/qr/download-qr.svg
public/                   favicons, manifest, robots.txt, sitemap.xml, og-image.png
```

**Editing content:** copy is in `src/content/locales/*.js`, numbers and links in
`src/content/site.js`, and images in `src/content/media.js`. Components contain no copy.

## Content sources

Everything on the page comes from Qeu's own material, captured September 2026:

- **qeu.app** — marketing lines, the four benefits, Q-ur, the logo vector, the app screens and the privacy-policy summary.
- **Google Play (`sa.qeu1.app`)** — rating 4.7 from 1,252 phone ratings (1.3K overall), the
  star distribution, 100K+ downloads, first release 25 Jan 2026 (≈8 months to the capture date),
  the description (secure payment, fast delivery, order tracking), the screenshots and the icon.
- **Qeu's store screenshots** — «عروضنا تجيك وبنفس السعر» (van livery), the kabsa conversation with Q-ur.

The English copy is quoted from qeu.app/english where a line exists there; the rest is a
translation and should be reviewed by the client.

## SEO, accessibility, performance

- One `h1`; `lang` and `dir` set per page; hreflang, a canonical URL, Open Graph and schema.org
  data (Organization, WebSite, MobileApplication). The data carries no `aggregateRating`: Google
  doesn't allow marking up ratings collected on another site.
- Skip link, landmarks, visible focus, 44px touch targets, and descriptive alt text on every app
  screen (the drifting hero screens are decorative). Animation (drift, count-up, reveals,
  transitions) switches off under `prefers-reduced-motion`.
- The pinned section keeps all text in the DOM: collapsed items are clipped, not removed.
- Build output: about 84 KB of JS (gzipped; React is ~68 KB of that), 5 KB of CSS, fonts
  of about 9–15 KB per file, and lazy-loaded images below the fold.

## Analytics

`src/lib/analytics.js` loads no trackers of its own. Once Google Tag Manager or gtag.js is
added, every store click arrives as `app_download_click` with `{ store, placement }`, and store
links carry `utm_source=website`, `utm_medium=button|qr` and `utm_content=<placement>`.

## Deploying

Upload `dist/client` to any static host. Things to check:

1. `/english` is served from `english/index.html`. Enable clean URLs on the host, or add
   `try_files $uri $uri/index.html` on nginx.
2. **Move `/policy` and `/policy-english` over from the current Framer site before pointing the
   domain here.** The footer links to them.
3. Give `/assets/*` a long cache lifetime (file names are content-hashed).

## Needed from the client

- [ ] The direct App Store URL (`site.links.appStore`). Until it's set, iPhone buttons use the smart link.
- [ ] Confirmation that `link-to.app` keeps UTM parameters.
- [ ] A GTM / GA4 container (and Snap / TikTok pixels) if campaigns will run.
- [ ] A 1200×630 share image. `public/og-image.png` is the current 682×298 one from qeu.app.
- [ ] Official App Store and Google Play badge artwork if brand-strict badges are required.
- [ ] A review of the English copy.
