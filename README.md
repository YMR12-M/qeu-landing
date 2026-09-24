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

| Section                                                                                                                                                                                                                 | Source                                                                               |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Navigation island floating over the page: takes each section's colour, folds to a "you are here" pill while reading, opens the sections as a receipt                                                                    | **new**: replaces v3's header bar                                                    |
| «رف العروض» — the hero as a supermarket shelf: the six Google Play screenshots stand on it in the store's order over yellow offer labels, gliding slowly past; the headline on display with its own price label, "free" | v3 copy, store screenshots; shelf **new**                                            |
| «ليش كيو؟» — pinned, scroll-driven benefits with the matching screen                                                                                                                                                    | v3                                                                                   |
| «كيف يشتغل / عروضنا تجيك وبنفس السعر» — three steps on the order's route, Qeu's van driving to the door on scroll                                                                                                       | **kept** from the earlier proposal (takes v3's "inside the app" slot); route **new** |
| «عندك سؤال؟» — FAQ printed on a till receipt, with a take-a-number ticket for anything it doesn't answer                                                                                                                | **new**: answers restate the page and the Google Play listing only                   |
| Google Play figures (count up on scroll)                                                                                                                                                                                | v3                                                                                   |
| «حمّل كيو» with the app-icon stage, phone and QR card                                                                                                                                                                   | v3 text + **kept** stage from the earlier proposal                                   |
| Footer as the bag the order comes in: the brand printed on it, a delivery sticker with the contents (ticked off as they are read) and the contact links                                                                 | v3, with the missing legal and contact details added; bag **new**                    |
| `/policy` — the privacy policy as an official document: the company letterhead, the policy word for word, an index card that ticks each section off as it is read, and the company stamp pressed on at the end          | qeu.app/policy text; page **new**                                                    |

### Changed from v3

Images

- Every app screen sits in the same frame style. v3 showed small, unframed crops.
- The screenshot crops were re-cut from the original Google Play screenshots at about 1.8× the
  resolution of the provided files, so they stay sharp on retina screens. The build serves them
  as responsive AVIF (quality 50) and WebP (quality 72), encoded separately: at the same quality
  number AVIF came out larger than WebP, while at q50 it is ~27% smaller and closer to the source.
- Each «ليش كيو؟» benefit now shows a screen that matches it. In v3, "Lowest prices" showed the
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
- Header: the real wordmark vector replaces the typed name, and the fixed bar is gone. The nav
  floats over the page and takes on the colour of the section under it, so nothing separates it
  from the page.
- Arabic headings no longer get letter-spacing, which breaks letter joining.
- Wording follows the live site where v3 differed: «ليش كيو؟» (v3: «ليه»), and the footer slogan
  is qeu.app's «أسعارنا هي أصلًا عروض» (v3: «كل شي في كيو عرض»). The English hero is
  qeu.app/english's own line.
- In «ليش كيو؟» and «حمّل كيو» the brand's name is drawn as its wordmark (the name stays in the
  text, visually hidden, for screen readers and search).
- Portrait tablets: «ليش كيو؟» puts the screen under the list so the pinned block fills the view;
  screens too short to pin (a phone on its side) get the plain list.

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
  App.jsx                 page composition: the landing page, or the privacy policy
  entry-client.jsx        hydrate (prod) / render (dev)
  entry-server.jsx        render one page to HTML — used by the prerender
  content/
    site.js               facts: ratings, downloads, links, company — single source of truth
    figures.js            those facts formatted per locale, for the copy's {tokens}
    locales/ar.js, en.js  all copy, same shape in both files
    policy.js             the privacy policy, word for word from qeu.app/policy (Arabic only)
    media.js              every image + its responsive sizes
  components/
    layout/               Header, Footer, SkipLink
    sections/             Hero, WhyQeu, HowItWorks, Faq, Download
    policy/               PolicyPage — the policy as a stamped document on a letterhead
    download/             DownloadLink, StorePills, AppStage, QrCard
    stats/                StatsRow, CountUp
    brand/                Logo (vector wordmark from qeu.app)
    ui/                   Picture, Reveal, SectionHeading, Barcode, icons
  i18n/                   locales config, provider, useLocale()
  hooks/                  usePlatform, useCurrentYear (hydration-safe), useScrollReveal,
                          useActiveSection (the section being read), useSeenSections
  lib/                    links (store URLs + UTM), analytics, formatting, cx
  seo/head.js             <title>, meta, hreflang, Open Graph, JSON-LD
  styles/                 fonts, tokens, base, layout
scripts/
  prerender.js            writes dist/client/index.html, english.html (+ english/index.html)
                          and policy.html (+ policy/index.html)
  generate-qr.js          src/assets/qr/download-qr.svg
public/                   favicons, manifest, robots.txt, sitemap.xml, og-image.png
```

**Editing content:** copy is in `src/content/locales/*.js`, numbers and links in
`src/content/site.js`, and images in `src/content/media.js`. Components contain no copy.
The copy quotes the store figures as `{tokens}` (`{downloads}`, `{months}`, `{allRatings}`,
`{androidMin}`, `{iosMin}`): after a new capture of the Google Play listing, update `capturedAt`,
`downloads` and `ratings` in `site.js` and rebuild — both languages follow, with Arabic numerals
and plural forms handled.

## Content sources

Everything on the page comes from Qeu's own material, captured September 2026:

- **qeu.app** — marketing lines, the four benefits, Q-ur, the logo vector and the app screens.
- **qeu.app/policy** (last updated 21 Dec 2025) — the privacy policy at `/policy`, word for word,
  with two corrections to flag to the client: its complaints address read `support@que.app`
  (the support address everywhere else is `support@qeu.app`), and «[•] يوم عمل» was never filled
  in, so the page reads «خلال المدة المحددة نظامًا» until the client gives a number.
- **Google Play (`sa.qeu1.app`)** — rating 4.7 from 1,252 phone ratings (1.3K overall), the
  star distribution, 100K+ downloads, first release 25 Jan 2026 (≈8 months to the capture date),
  the description (secure payment, fast delivery, order tracking), the screenshots and the icon.
- **App Store (`id6754709202`)**, captured 24 Sep 2026 — the direct store link, and the iPhone
  requirement (iPhone only, iOS 15.0 or later).
- **Qeu's store screenshots** — «عروضنا تجيك وبنفس السعر» (van livery), the kabsa conversation with Q-ur.

The English copy is quoted from qeu.app/english where a line exists there; the rest is a
translation and should be reviewed by the client.

## SEO, accessibility, performance

- One `h1`; `lang` and `dir` set per page; hreflang, a canonical URL, Open Graph and schema.org
  data (Organization, WebSite, MobileApplication, and FAQPage from the same copy as the FAQ
  section). The data carries no `aggregateRating`: Google
  doesn't allow marking up ratings collected on another site.
- Skip link, landmarks, visible focus, 44px touch targets, and descriptive alt text on every app
  screen (the drifting hero screens are decorative). Animation (drift, count-up, reveals,
  transitions) switches off under `prefers-reduced-motion`.
- The drifting screens have a pause button (WCAG 2.2.2) and stop while the hero is out of view.
- Text meets WCAG AA contrast: `--brand-text` (#127d86) is the brand teal for text and focus
  rings; `--brand` stays for fills. Screen readers read the real figures, not the count-up.
- The pinned section keeps all text in the DOM: collapsed items are clipped, not removed. It
  pins from tablet width up, with the screen always beside the list.
- The hero headline is one block of text, so it — not a background screen — is the Largest
  Contentful Paint, painted with the first frame.
- Build output: about 85 KB of JS (gzipped; React is ~68 KB of that), 5.5 KB of CSS, fonts
  of about 9–15 KB per file, ~62 KB of hero images on a phone, and lazy-loaded images below
  the fold.

## Analytics

`src/lib/analytics.js` loads no trackers of its own. Once Google Tag Manager or gtag.js is
added, every store click arrives as `app_download_click` with `{ store, placement }`.

Store links carry `utm_source=website`, `utm_medium=button|qr`,
`utm_campaign=landing_<placement>` and `utm_content=<placement>`. Play Console reports store
traffic by `utm_source` and `utm_campaign` only, hence the placement in the campaign. Google
Play links repeat the tags in `referrer`, the value the app's install referrer (Firebase / GA4)
receives. On a computer, store links open in a new tab; on a phone, in the same tab, so the
store app takes over.

## Deploying

**Vercel** (the project is connected to this repository): every push to `main` deploys to
production. `vercel.json` carries the settings the dashboard would otherwise guess wrong — the
output directory is `dist/client` (not `dist`), clean URLs are on, `/assets/*` is cached for a
year, and basic security headers are set.

**Any other static host:** upload `dist/client`. Things to check:

1. `/english` is served from `english.html` — the default "clean URLs" behaviour of Netlify,
   Cloudflare Pages and GitHub Pages (Vercel: `cleanUrls`), and what `npm run preview` does;
   `english/index.html` answers `/english/`. On nginx: `try_files $uri $uri.html $uri/index.html`.
   Should a host still send the Arabic page for `/english`, it hydrates as Arabic instead of
   mixing languages.
2. `/policy` is served from `policy.html` in the same way. It is the site's own page now, so
   nothing needs to move over from Framer.
3. Give `/assets/*` a long cache lifetime (file names are content-hashed).

## Needed from the client

- [ ] The response time for data requests in the privacy policy (the original left
      «[•] يوم عمل» blank), and confirmation of the corrected complaints address.
- [ ] Confirmation that `link-to.app` keeps UTM parameters.
- [ ] A GTM / GA4 container (and Snap / TikTok pixels) if campaigns will run.
- [ ] A 1200×630 share image. `public/og-image.png` is the current 682×298 one from qeu.app.
- [ ] Official App Store and Google Play badge artwork if brand-strict badges are required.
- [ ] A review of the English copy.
