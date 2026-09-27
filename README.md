# Qeu — landing page (كيو | Q)

Marketing site for the Qeu grocery-deals app: Arabic at `/` (default, RTL) and English at
`/english` (LTR), plus the privacy policy at `/policy` and its English translation at
`/policy-english`. Built on the **Qeu Landing v3** design, with two blocks kept from the earlier
proposal and every image and claim checked against Qeu's own sources.

```bash
npm install
npm run dev       # http://localhost:5173 (Arabic) · /english · /policy · /policy-english
npm run build     # static site → dist/client
npm run preview   # serve the production build
npm run lint      # ESLint
npm run qr        # regenerate the download QR code and its redirects (after changing a store link)
npm run og        # redraw the link-preview images (after changing the hero; needs Chrome)
```

Node 22 (22.13 or later) or 24 — the versions every build tool here supports. Vercel builds on 24.
Keep the working copy out of iCloud Drive (Desktop & Documents sync) and other synced folders:
with "Optimize Mac Storage" they evict files from `node_modules` and `.git` to the cloud, and
tools then read them as empty (ESLint crashes, builds break) or make conflict copies.

---

## What the page is

| Section                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Source                                                                                |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Navigation island floating over the page: takes each section's colour, folds to a "you are here" pill while reading — with how far down the page it is, «٣ من ٧» — and opens the sections as a receipt                                                                                                                                                                                                                                                                                                                                                                                                                                                            | **new**: replaces v3's header bar                                                     |
| «رف العروض» — the hero as a supermarket shelf, lit from the shelf above: the six Google Play screenshots stand on it in the store's order, their stock lined up behind them, over yellow offer labels, gliding slowly past; the headline on display with its own price label, "free"                                                                                                                                                                                                                                                                                                                                                                              | v3 copy, store screenshots; shelf **new**                                             |
| «ليش كيو؟» — pinned, scroll-driven benefits with the matching screen, each with its supermarket promo sticker (a «١+١» starburst, a red «أقل سعر» label…) slapped onto the frame; a click opens a closed benefit; on phones, a row of cards to swipe through                                                                                                                                                                                                                                                                                                                                                                                                      | v3; stickers and phone cards **new**                                                  |
| «أقسام كيو» — the store's aisles: a sign hangs from the ceiling rail for each of the app's six departments; choosing one swings it and lights it up, and the gondola under the signs is restocked with that department's categories — the app's own picture of each, on one shelf over its label, moved along by arrows on a computer and swiped on a phone — with the way to it in the app under the shelf                                                                                                                                                                                                                                                       | **new**: the app's departments and categories (home screen)                           |
| «اسأل كيور» — the assistant, live: its kabsa conversation from the store screenshot replays in a phone, and «أضف الكل» works — the products fly into a cart that counts them in; beside it, the steps on a shopping list, ticked off as it goes                                                                                                                                                                                                                                                                                                                                                                                                                   | **new**: the conversation is the screenshot's, word for word                          |
| «كيو فودز» and «كيو كوفي» — one section with the app's two tabs, a switch showing one at a time; the section takes that one's wall. Qeu Foods is a double-door display fridge under Qeu's lit sign: as it comes into view its light flickers on, the glass doors swing open and the cold spills out; the packs stand on its shelves over yellow deal labels, and a «من تحضير كيو» rosette is slapped on its corner. Qeu Coffee is a café corner: the menu board under a neon of the wordmark, and the counter beside it, where the drink picked from the board is poured into a 16 oz cup of ice — the milk, then the shot running down through it — and labelled | **new**: the app's «كيو فودز» and «كيو كوفي» tabs — their products, sizes and prices  |
| «كيف يشتغل / عروضنا تجيك وبنفس السعر» — three steps on the order's route, drawn as a street: Qeu's store, the pin where the order is placed, a Jeddah house with its rawshan, each step written under its stop; Qeu's van drives from the store to the door on scroll, and the bag is waiting when it arrives                                                                                                                                                                                                                                                                                                                                                     | **kept** from the earlier proposal (takes v3's "inside the app" slot); street **new** |
| «عندك سؤال؟» — FAQ printed on a till receipt — its first four questions, and «اطبع باقي الأسئلة» for the rest — with a take-a-number ticket for anything it doesn't answer (a slip under the receipt on phones and tablets)                                                                                                                                                                                                                                                                                                                                                                                                                                       | **new**: answers restate the page and the Google Play listing only                    |
| Google Play figures (count up on scroll), printed as the app's nutrition-facts label, «القيمة الغذائية»                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | v3 figures; label **new**                                                             |
| «حمّل كيو» with the app-icon stage, phone and QR card, and a «مجاناً» starburst on the stage (left out on phones, which have the store buttons)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | v3 text + **kept** stage from the earlier proposal                                    |
| Footer as the bag the order comes in: the brand printed on it, a delivery sticker with the contents (ticked off as they are read; on phones, left to the island's receipt) and the contact links                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | v3, with the missing legal and contact details added; bag **new**                     |
| `/policy` — the privacy policy as an official document: the company letterhead, the policy word for word, an index card that ticks each section off as it is read, and the company stamp pressed on at the end; `/policy-english`, Qeu's English translation of it, the same document left to right                                                                                                                                                                                                                                                                                                                                                               | qeu.app/policy and /policy-english text; pages **new**                                |
| 404 — the hero's shelf, emptied: clear dividers with nothing between them and one label left, «نفد», with the way back home                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | **new**                                                                               |

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
- v3's QR code opened Google Play only, so it was useless on an iPhone. The new QR code encodes
  qeu.app/get, which sends an iPhone to the App Store and an Android phone to Google Play (see
  Analytics).
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
  screens too short to pin (a phone on its side) get the row of cards, like phones.

### Added after v3

- «اسأل كيور»: the app's most distinctive feature had only an FAQ answer and one screenshot. It
  now has its own section, between «ليش كيو؟» and «كيف يشتغل». The conversation is the one in
  Qeu's store screenshot (`src/content/assistant-chat.js`), replayed when the phone scrolls into
  view: the question, كيور typing, its answer streaming in word by word, then the kabsa list. The
  products are cropped from the same screenshot; their brand names are left out of the text
  (their packs show them). The app is Arabic, so the conversation stays Arabic on the English
  page. «أضف الكل» really adds: the products fly into a cart bar that counts up to the card's own
  15 products and 179 ر.س, and screen readers hear the result. The section heading says only
  what the FAQ's answer about كيور says.
- The supermarket, carried further: every section is now one of its objects, as the shelf, the
  receipt and the bag already were.
  - «ليش كيو؟»: each benefit has the promo sticker a supermarket slaps on a pack — a yellow
    «١+١ مجاناً» starburst, a round «ابحث بسهولة», a red «أقل سعر» price-cut label, and a
    «اخترناها لك» rosette (the screen's own heading) — slapped onto the screen's frame as the
    benefit opens (`src/components/ui/Sticker.jsx`). The stickers only repeat the text.
  - The store figures are the app's nutrition-facts label, «القيمة الغذائية لتطبيق كيو»: the
    serving size, the heavy bars, a figure per line, the price — free — and, in the small print,
    where and when the figures were read. Tall on phones, tablets and small laptops, a long
    linear label from 1280px wide (narrower, five columns squeezed every line to a few words).
  - A yellow «مجاناً» starburst on the download stage; beside كيور, the steps on a taped-up
    shopping list, ticked off in pen as the conversation reaches them.
  - Each screen on the hero's shelf has its stock lined up behind it, and the shelf above
    lights them.
  - «كيف يشتغل» is a street (`src/components/illustrations/Street.jsx`): Qeu's store with its
    sign and awning at the first stop, the pin where the order is placed at the second, a
    Jeddah house with its wooden rawshan at the third, palms and the city behind. The van
    drives the road from the store to the door, drawing the route behind it; when it arrives,
    Qeu's bag is at the door and «طلبك وصل» — the footer sticker's words — shows over the
    house. Still a CSS scroll-driven animation, and where it can't run the van is parked at
    the door. Each step — its title and one line — is written under its stop, as a tracker
    labels its own; the app screens that used to hang below them were dropped to keep the
    section short (their files are still in `src/assets/images`, unused).
- «أقسام كيو», after «ليش كيو؟»: the app's six departments — «المقاضي» to «كيو تيك» — and the
  categories in each, 45 on the app's home screen (`src/content/departments.js`), as the
  store's aisles. A sign hangs from the ceiling rail for each department (the app's icon and
  the name); below them, a gondola with a pegboard back holds the chosen department's
  categories, the app's own picture of each standing on one shelf over its label, and under it
  the way to that aisle in the app («الأقسام › …»). Choosing another sign
  swings it on its wires and lights it up, and the shelf is restocked, every category dropped
  into place. The signs are a radio group that needs no script (the checked aisle's bay is
  shown with `:has()`); the script only folds the signs up against the ceiling below the fold,
  so they flip down one after another when the aisles come into view. Only the shown bay's
  pictures load. The shelf is one row, four categories to a view: arrows at its ends move it
  along a shelf's width at a time on a wider screen (the one at an end dimmed), and on phones
  it is swiped, like the signs along the rail. Without JavaScript the arrows are left out and a
  wide screen stacks the row into shelves again. The heading counts the departments and rounds the categories down ("more than 40"):
  the departments showing eight may hold more behind the app's «عرض الكل». The pictures were
  cut from the screenshots like Qeu Foods' (below), with three put right by hand: the green of
  the app's card that came away with the rice and the phone case, and the Areon card Vision
  left out of «المعطرات». The icons are cut from their white background.
- The navigation island lists seven sections (Qeu Foods and Qeu Coffee share one): its links
  close up a little at 1024px, and the list may grow to 58rem.
- «كيو فودز» and «كيو كوفي»: Qeu's own food and coffee — two tabs under «المنتجات الطازجة» in the
  app — share a section, after «اسأل كيور» (don't feel like cooking the kabsa? Qeu Foods) and
  before «كيف يشتغل» (`src/components/sections/Kitchen.jsx`). A switch at its top, the app's two
  tabs, shows one at a time — a radio group, so it needs no script — and the section takes that
  one's wall, white for the fridge or espresso brown for the café; the navigation island turns
  with it. Their products, sizes and prices are the app's, from screenshots of the
  two tabs (`src/content/menu.js`); the prices are deal prices, so the date they were read is
  printed beside them, and the page adds that they may change. That Qeu prepares the meals
  itself comes from the brief; the sandwiches' packs carry the wordmark.
  - «كيو فودز» is the fridge the meals are sold from: Qeu's lit sign on top, two glass doors, the
    packs on the shelves two deep, each over a yellow deal label with its name, size and price
    (the old price struck through, read out as «بدل»). Below the fold the fridge waits shut and
    dark; in view, its light flickers on, the doors swing open (a CSS 3D turn), the cold spills
    out at the bottom, the labels drop onto the shelf edge and the «من تحضير كيو» rosette is
    slapped on. The shelves the app lists but the screenshots don't show («مقبلات وغموس»,
    «سلطات») are named in a line beside it, with the way to the tab in the app.
  - «كيو كوفي» is a café corner, in espresso brown with a warm neon of the wordmark over its menu
    board. The menu is a radio group (`fieldset`, arrow keys, screen readers): a two-by-two grid
    of cards, each with the app's photo of its drink, and under them the box from «مشروبات
    للجمعات», tagged with its shelf; the tab's other shelves are named in a line under the board.
    Picking a drink pours it at the counter beside the board
    (`src/components/illustrations/IcedCup.jsx`): a 16 oz cup packed with ice is set down, the
    milk rises through the ice, the shot runs down into it, the café's label is slapped on and
    the cup beads with cold — each drink in its colours, the pistachio latte with its sauce
    down the sides. It needs no script: the stylesheet shows the checked drink's cup (`:has()`),
    and a cup that appears plays its pour from the start. The script only holds the first pour
    (an empty cup of ice) until the counter is in view. On phones the counter is a strip over
    the menu — a small cup, and the hint beside it — so the pour is seen while picking.
  - The product photos are cut from the screenshots: upscaled 4× with macOS's own
    super-resolution model (VideoToolbox), separated from the app's grey card and its + button
    with Vision's subject lifting, and cleaned of the grey at their edges so no halo shows on
    the dark menu board. The meal tray's corner was under the + button; it is mirrored from the
    opposite corner.
- «ليش كيو؟» on phones showed no screens at all; each benefit is now a card with its screen and
  sticker, in a row that snaps as it is swiped, with a bar under it that fills as it goes (drawn
  by the browser from the row's scroll position, no script). Pinned, the open benefit's rule
  fills as the reader scrolls through it, over a 180vh track — a fifth of a screen's scroll per
  benefit — and a click on a closed benefit scrolls to it.
- A product's place on the hero's shelf shows before its picture loads; buttons give a little
  when pressed. Nothing follows the pointer and nothing shines: the motion is the shelf's drift,
  the scroll-linked van and the one-off replays (the chat, the fridge opening, the pour).
- Moving between the Arabic, English and policy pages cross-fades, and the navigation island
  glides to its new shape (cross-document view transitions, where the browser supports them).
- Folded while reading down, the navigation island glides from the middle to the start of the
  page's content — the right, in Arabic — in line with the sections' text, in the same move as
  the fold; reading back up, it opens in the middle again.
- A page that reads shorter: about 9 screens on a computer and 9.7 on a phone (it was 12.2
  and 14.4). The sections sit closer together, Qeu Foods and Qeu Coffee share one, the FAQ
  prints four questions and the rest on demand, each section's intro is one line, «كيف يشتغل»
  writes its steps under the street's stops, the aisles keep one shelf, and the café's menu is
  a grid of cards. Phones leave out what they don't need: the download stage, the café's big
  cup and the footer's contents. The «حمّل كيو» pill is kept for
  the hero, the island and the download section; the sections between end with a quieter link.
  Content that fades in on scroll does it in half a second, and the island's pill says how far
  down the page the reader is.

## Stack, and why

- **React 19 + Vite 8, pre-rendered (SSG).** Pages are written as React components and rendered
  to static HTML at build time (`scripts/prerender.js`). Crawlers and the first paint get the
  whole page, and React hydrates it for the small amount of interaction.
- **One chunk per page, and per language.** The header, footer and React are shared; each page
  (`src/pages`) is its own chunk, which its HTML preloads, so the policy doesn't download the
  landing page and the other way round — and each language's copy is a chunk of its own, so a
  page downloads only the language it shows (the policy's text too: one page per language).
  The HTML carries no inline script: every boundary is rendered in place, and the build fails
  if an inline `<script>` ever appears (the CSP would block it).
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
  App.jsx                 the frame every page shares: navigation island, the page, footer
  entry-client.jsx        load the page's chunk and its copy, then hydrate (prod) / render (dev)
  entry-server.jsx        render one page to HTML — used by the prerender
  pages/                  Home (the landing page), Policy and PolicyEnglish, NotFound (404) —
                          one chunk each; index.js maps page names to them
  content/
    site.js               facts: ratings, downloads, links, company — single source of truth
    figures.js            those facts formatted per locale, for the copy's {tokens}
    locales/ar.js, en.js  all copy, same shape in both files; load.js loads one per page in the
                          browser, index.js has both for the build
    assistant-chat.js     the conversation with كيور, word for word from the store screenshot
    departments.js        the app's departments and their categories, in the app's order
    menu.js               Qeu Foods' and Qeu Coffee's products and prices, as the app lists them,
                          and the day they were read
    policy.js             the privacy policy, word for word from qeu.app/policy
    policy-en.js          its English translation, word for word from qeu.app/policy-english
    policy-contents.js    its titles and section lists — all the header needs of them
    media.js              every image + its responsive sizes
  components/
    layout/               Header, Footer, SkipLink
    sections/             Hero, WhyQeu, Aisles, Assistant, Kitchen (its tabs: Foods, Coffee),
                          HowItWorks, Faq, Download
    illustrations/        Street (the street of «كيف يشتغل»), IcedCup (the cup «كيو كوفي» pours)
    policy/               PolicyPage — the policy as a stamped document on a letterhead
    download/             DownloadLink, StorePills, AppStage, QrCard
    stats/                StatsRow, CountUp
    brand/                Logo (vector wordmark from qeu.app; LogoSymbol defines it once per
                          page), WithBrand
    ui/                   Picture, Reveal, SectionHeading, Sticker, Numeral, Barcode
                          (+ barcode-bars.js), icons
  i18n/                   locales config, provider, useLocale()
  hooks/                  usePlatform, useCurrentYear (hydration-safe), useScrollReveal,
                          useActiveSection (the section being read), useSeenSections
  lib/                    links (store URLs + UTM), analytics, formatting, cx
  seo/head.js             <title>, meta, hreflang, Open Graph, JSON-LD
  styles/                 fonts, tokens, base, layout
scripts/
  prerender.js            writes dist/client/index.html, english.html (+ english/index.html),
                          policy.html, policy-english.html (+ their folder copies) and 404.html
  generate-qr.js          src/assets/qr/download-qr.svg, and its redirects in vercel.json
  og-images.js            public/og-image.jpg and og-image-en.jpg
public/                   favicons, manifest, robots.txt, sitemap.xml, the link-preview images,
                          no-js.css (the page without JavaScript)
```

**Editing content:** copy is in `src/content/locales/*.js`, numbers and links in
`src/content/site.js`, and images in `src/content/media.js`. Components contain no copy.
The copy quotes the store figures as `{tokens}` (`{downloads}`, `{months}`, `{allRatings}`,
`{androidMin}`, `{iosMin}`): after a new capture of the Google Play listing, update `capturedAt`,
`downloads` and `ratings` in `site.js` and rebuild — both languages follow, with Arabic numerals
and plural forms handled. The build reminds you when the capture is more than 60 days old.
When the app's prices for Qeu Foods or Qeu Coffee change, update them and `capturedAt` in
`src/content/menu.js`: the fridge's labels, the menu board and the date beside them follow.

## Content sources

Everything on the page comes from Qeu's own material, captured September 2026:

- **qeu.app** — marketing lines, the four benefits, Q-ur, the logo vector and the app screens.
- **qeu.app/policy** (last updated 21 Dec 2025) — the privacy policy at `/policy`, word for word,
  with two corrections to flag to the client: its complaints address read `support@que.app`
  (the support address everywhere else is `support@qeu.app`), and «[•] يوم عمل» was never filled
  in, so the page reads «خلال المدة المحددة نظامًا» until the client gives a number.
- **qeu.app/policy-english**, captured 27 Sep 2026 — Qeu's English translation of it, at the
  same address, word for word, with the same two corrections ("within [•] business days" reads
  "within the period required by law").
- **Google Play (`sa.qeu1.app`)** — rating 4.7 from 1,252 phone ratings (1.3K overall), the
  star distribution, 100K+ downloads, first release 25 Jan 2026 (≈8 months to the capture date),
  the description (secure payment, fast delivery, order tracking), the screenshots and the icon.
- **App Store (`id6754709202`)**, captured 24 Sep 2026 — the direct store link, and the iPhone
  requirement (iPhone only, iOS 15.0 or later).
- **Qeu's store screenshots** — «عروضنا تجيك وبنفس السعر» (van livery), the kabsa conversation with
  Q-ur (replayed in «اسأل كيور», with the three products cropped from it).
- **Screenshots of the app's home screen**, provided 27 Sep 2026 — its six departments with
  their icons, and the categories in each with their pictures («أقسام كيو»). Names cut short
  on a card are written out from elsewhere in the app («الأجبان ومشتقات الحليب», from its tab).
- **Screenshots of the app**, provided 26 Sep 2026 — the «كيو فودز» and «كيو كوفي» tabs under
  «المنتجات الطازجة»: their shelves (the app's chips), the products with their sizes and prices, and
  the product photos cut out for the two sections. The coffee box's name runs past its card in
  the app («بوكس قهوة اليوم بارد ا…»), so the page uses only the words that show.

The English copy is quoted from qeu.app/english where a line exists there; the rest is a
translation and should be reviewed by the client.

## SEO, accessibility, performance

- One `h1`; `lang` and `dir` set per page; hreflang (the home pages to each other, the two
  policies to each other), a canonical URL, Open Graph and schema.org data (Organization,
  WebSite, MobileApplication, and FAQPage from the same copy as the FAQ section; WebPage and a
  breadcrumb on the policy). The data carries no `aggregateRating`: Google doesn't allow marking
  up ratings collected on another site.
- Link previews use a 1200×630 image per language, drawn from the hero (`npm run og`). On
  Vercel the image URL names the project's production domain (`VERCEL_PROJECT_PRODUCTION_URL`),
  so previews work on the `.vercel.app` address now and switch to qeu.app with the first deploy
  after that domain is added. The 404 page is `noindex`, and so is every `*.vercel.app` address
  (`X-Robots-Tag`): the canonical site is qeu.app, and this copy shouldn't compete with it in
  search.
- Without JavaScript the page still reads in full: `public/no-js.css` unpins «ليش كيو؟», opens
  every benefit, stops the hero's shelf and hides the controls that need a script. The page
  loads the same stylesheet itself if its own script fails to arrive, so a dropped connection
  leaves it readable rather than half-working.
- Skip link, landmarks, visible focus, 44px touch targets, and descriptive alt text on every app
  screen (the drifting hero screens are decorative). Animation (drift, count-up, reveals,
  transitions) switches off under `prefers-reduced-motion`.
- The drifting screens have a pause button (WCAG 2.2.2), stop while the hero is out of view, and
  stand still without JavaScript (no button to pause them then). The كيور replay plays once and
  is over within five seconds, so it needs none; it can be replayed. It starts once half the
  phone is in view — or, on a screen shorter than that (a phone on its side), once the phone
  fills half the screen. The pre-rendered page, reduced motion and a page without JavaScript
  all show the conversation whole.
- On a phone on its side the page runs under the notch and the rounded corners
  (`viewport-fit=cover`), and every gutter grows to the safe-area insets, so no text goes under
  them. The page opts out of browsers' automatic dark modes (`color-scheme: light only`): its
  dark sections are part of the design.
- Text meets WCAG AA contrast: `--brand-text` (#127d86) is the brand teal for text and focus
  rings; `--brand` stays for fills. On the aisles' wall (#eef5f5, darker than the white it is
  set for) it is a shade deeper, #117a83, to keep 4.6:1. Screen readers read the real figures,
  not the count-up.
- The pinned section keeps all text in the DOM: collapsed items are clipped, not removed. It
  pins from tablet width up, with the screen always beside the list.
- The hero headline is one block of text, so it — not a background screen — is the Largest
  Contentful Paint, painted with the first frame. On a phone the shelf's screens are sized to
  stay smaller than the headline, which in English is a line shorter than in Arabic (on a
  computer the English page's LCP is a shelf screen, at about 0.3 s).
- Nothing scrolls by itself as the page loads: Chrome ends its LCP at the first scroll, and a
  phone would report none at all. The rows that snap as they are swiped (the benefits' cards,
  the aisles' signs and shelf) keep their scroll padding equal to their padding, so their first
  item already stands where the snap would put it.
- Nothing moves once the page runs, nor as it is scrolled (CLS ≈ 0): on phones and tablets the
  note sits under the download button from the first paint, so the button naming the visitor's
  store once the page runs («حمّله مجاناً من Google Play», longer than the pre-rendered label)
  pushes nothing down; the nutrition label's figures count up over the final figure, which
  holds their place (Tajawal's Arabic digits differ in width, so a count in the flow would
  rewrap the label); the island's pill keeps the width of the longest name it can show (every
  name is stacked in it, unseen), and a name too long for a phone is cut short rather than
  pushing the store button off the screen; and the island glides to its folded place with a
  translate alone. Scrolled through, a phone measures 0.001; a computer 0.03, from the folding
  island's contents and «ليش كيو؟» opening one benefit after another.
- The wordmark is defined once per page (`<LogoSymbol>`) and every copy draws it with `<use>`:
  with its paths in each of its ten copies, the landing page's HTML was 31 KB gzipped, and
  drawn from the one symbol it was 20. The page now draws it 19 times, Qeu Foods and Qeu
  Coffee included, in 29 KB (the aisles' 45 pictures and 12 icons take about 5 of them). Its
  paths were compacted without changing the shape (zero-length segments dropped, relative
  coordinates).
- Build output (gzipped): 85 KB of shared JS, most of it React; the page's language, 5 KB
  (Arabic) or 4.7 KB (English); the page's own chunk (18.6 KB for the landing page, 6.5 KB for
  the policy and 6 KB for its English, 0.7 KB for the 404); one 27.6 KB stylesheet for the whole
  site, so no page waits for another's CSS; seven font files of about 9–15 KB (73 KB on the
  landing page); 60–70 KB of hero images on a phone, and lazy-loaded images below the fold.
  The landing page's first visit on a phone is about 390 KB in all.
- Measured in Chrome with Lighthouse's mobile throttling settings (150 ms RTT, 1.6 Mbps, 4×
  CPU), median of five runs: LCP about 1.2 s in both languages (the headline), 0.9 s on the
  policy pages; TBT 0; CLS 0 as the page loads.

## Analytics

`src/lib/analytics.js` loads no trackers of its own. Once Google Tag Manager or gtag.js is
added, every store click arrives as `app_download_click` with `{ store, placement }`. Adding a
tag means adding its origins to the Content-Security-Policy in `vercel.json` (for GTM and GA4:
`https://www.googletagmanager.com` in `script-src`, and the GA4 collection origins in
`connect-src` and `img-src`); the page allows nothing from other sites until then.

Store links carry `utm_source=website`, `utm_medium=button|qr`,
`utm_campaign=landing_<placement>` and `utm_content=<placement>`. Play Console reports store
traffic by `utm_source` and `utm_campaign` only, hence the placement in the campaign. Google
Play links repeat the tags in `referrer`, the value the app's install referrer (Firebase / GA4)
receives. App Store links carry Apple's campaign tags instead (`pt`, `ct=landing_<placement>`,
`mt=8`), so App Analytics reports installs per button — once Qeu's provider token is set in
`src/content/site.js` (`appStoreProviderToken`); until then they link plainly. On a computer,
store links open in a new tab; on a phone, in the same tab, so the store app takes over.

The QR code on the page encodes **qeu.app/get**, an address on Qeu's own domain: `vercel.json`
redirects an iPhone from there to the App Store and an Android phone to Google Play, each
tagged `utm_medium=qr`, `landing_desktop`, and anything else (an iPad browsing as a Mac) to the
download section. The current qeu.app sends its buttons through a smart link,
`link-to.app/qeu`, instead — which, checked on 27 Sep 2026, replaces the tags with its own
(`utm_campaign=1link.io`) on Android and drops them on iPhone, so installs from it can't be told
apart. The redirects are written from the store links in `src/content/site.js` by
`npm run qr` (which also redraws the code), and the build fails if `vercel.json` no longer
matches them — after changing a store link or the provider token, run `npm run qr` and deploy.
The same address suits a printed code: where it leads can change without reprinting. It works
once qeu.app is served by this site.

## Deploying

**Vercel** (the project is connected to this repository): every push to `main` deploys to
production. `vercel.json` carries the settings the dashboard would otherwise guess wrong:

- the output directory is `dist/client` (not `dist`);
- clean URLs, with no trailing slash (`/english/` redirects to `/english`); an unknown address
  gets `404.html` with a real 404 status;
- `/assets/*` is cached for a year (file names are content-hashed);
- security headers: a Content-Security-Policy that allows the site's own files only (inline
  style attributes aside — React writes a few), no framing, `nosniff`, a strict referrer
  policy, `Cross-Origin-Opener-Policy`, and a `Permissions-Policy` that turns off the camera,
  microphone, location, payment and USB;
- `X-Robots-Tag: noindex` on `*.vercel.app` hosts only — it drops away by itself on qeu.app;
- the QR code's redirects from `/get` to the stores (see Analytics).

The build fails, with the files named, if iCloud Drive has left a conflict copy ("name 2.ext")
in `public/` or `src/`: one in `public/` would be published. In this working copy the build's
own output is kept out of iCloud as `dist.nosync`, with `dist` a link to it (iCloud skips
`.nosync` names), because it kept copying the build's files — moving the whole working copy out
of iCloud remains the real fix.

**Any other static host:** upload `dist/client`. Things to check:

1. `/english` is served from `english.html` — the default "clean URLs" behaviour of Netlify,
   Cloudflare Pages and GitHub Pages (Vercel: `cleanUrls`), and what `npm run preview` does;
   `english/index.html` answers `/english/`. On nginx: `try_files $uri $uri.html $uri/index.html`.
   Should a host still send the Arabic page for `/english`, it hydrates as Arabic instead of
   mixing languages.
2. `/policy` and `/policy-english` are served from `policy.html` and `policy-english.html` in
   the same way. They are the site's own pages now, at the addresses the Framer site had, so
   nothing needs to move over from Framer.
3. Serve `404.html` for unknown addresses, with status 404.
4. Give `/assets/*` a long cache lifetime, and carry over the headers above.
5. Redirect `/get` as `vercel.json` does (by user agent), or the QR code leads nowhere.

## Needed from the client

- [ ] The response time for data requests in the privacy policy (the original left
      «[•] يوم عمل» blank, and its English "[•] business days"), and confirmation of the
      corrected complaints address, in both languages.
- [ ] The stores' privacy labels. The App Store ("Data Not Collected") and Google Play's Data
      safety section both say the app collects no data, while the privacy policy lists the ID
      number, payment card details, location and IP address. That is fixed in App Store Connect
      and the Play Console, not on this site.
- [ ] A decision on ratings: the page quotes the Google Play rating (4.7 from phone users) and
      says so; the Saudi App Store rating is 3.1 from 995 ratings.
- [ ] The App Store provider token (App Store Connect → Analytics → Campaigns, the `pt` value)
      for campaign-tagged App Store links — see Analytics.
- [ ] Optionally, an endpoint for Content-Security-Policy reports (`report-to`), to hear about
      anything the policy blocks in visitors' browsers.
- [ ] A GTM / GA4 container (and Snap / TikTok pixels) if campaigns will run — see Analytics
      for the matching CSP change.
- [ ] Official App Store and Google Play badge artwork if brand-strict badges are required.
- [ ] A review of the English copy.
- [ ] «أقسام كيو»: confirmation that the six departments are all of them, and the full list
      of categories for the three that show eight on the home screen (there may be more
      behind «عرض الكل»); the heading says "more than 40" until then.
- [ ] Qeu Foods and Qeu Coffee: confirmation that the meals are prepared by Qeu (the brief says
      so; the page says «تحضّرها كيو بنفسها»), the coffee box's full name, and — when the app's
      prices change — the new ones for `src/content/menu.js`. Photos of the salads and dips would
      fill the fridge's other shelves.
