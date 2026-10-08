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

| Section                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Source                                                                               |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Navigation bar across the top, the wordmark its only brand mark: no box of its own — it is painted the page's white wall, so the page runs straight up into it; on a computer it stays open at one size all the way down, a loop of pen glides round the section being read (no line under the links, no progress bar), and its «حمّل كيو» opens a card with the download QR code and both stores; on phones and tablets it names the section being read — with how far down the page it is, «3 من 7» — and opens the sections in large type on a night sheet                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | **new**: replaces v3's header bar                                                    |
| Hero — on the page's white wall, laid out as the client drew it, with nothing behind any picture: every one floats, whole. The words (top left; right in Arabic): the headline set in night ink, heavy and large, its promise «وأسعار ما تلاقيها إلا فيه» marked with a yellow highlighter stroke; under it the line that says what the app is for — «مقاضي وأكل وقهوة، توصلك لحد باب بيتك» — the download button and a second one, in the app's aqua, to «كيف يشتغل» («شوف كيف يشتغل»), the downloads figure, and on a computer the download QR code stuck on like a tear-off tab. The app (top right): two of its screens, one in front of the other, and its price, «مجاناً», circled in pen between them and the words. The store's six Google Play screenshots along the bottom, gliding by in the store's order, each leaning its own way, fading in at one end of the strip and out at the other — never cut. A shop's awning, yellow and teal, is let down from the bar as the page loads. On a computer (1280px and up) the places are one picture, scaled with the page (every size is in units of a 1400 × 760 sheet); on a tablet two rows; on a phone stacked, the words first | v3 copy, store screenshots; layout **new**                                           |
| «ليش كيو؟» — the four benefits in view at once: the four screens (all the same phone) stand in a row, each leaning its own way and every second one a step lower, each under a sign painted with its promise in the deal yellow («1+1 مجاناً», «أقل سعر»…, a night shadow behind the letters) — the sign is the benefit's title, so nothing is said twice — and its words under the screen; two rows of two on a tablet, one row to swipe along on a phone, with a note in pen under it that says so («اسحب لتشوف الباقي»)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | v3; promises and slides **new**                                                      |
| «أقسام كيو» — the store's aisles as a poster on the white wall: the store directory as a list of names — each department's aisle number, the app's icon and its name — the chosen one circled in red pen with an arrow to its aisle, and beside it the chosen department's categories, the app's own picture of each standing on a shelf over its name, two rows (a seven's second row of three set in the middle), all in view at once (swiped on a phone), over the department's name set huge in pale aqua; the way to it in the app under them                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | **new**: the app's departments and categories (home screen)                          |
| «اسأل كيور» — the assistant, live, on the white wall, shown as a poster shows a feature: the phone in the middle, its title one line broken by it — «اسأل كيور» before it, «عن طبختك» after it — and the steps written round it as notes, each numbered on a yellow disc and with a pen arrow to the part of the screen it explains — your question, كيور's list, its «أضف الكل» — and «حمّل كيو وجرّب كيور» as the last note, at the box to ask in; the kabsa conversation from the store screenshot replays in the phone, each note written in as it reaches its part, and «أضف الكل» works — the products fly into a cart that counts them in                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | **new**: the conversation is the screenshot's, word for word                         |
| «كيو فودز» and «كيو كوفي» — one section with the app's two tabs: the switch is the two names set large, the open one over a thick line. Qeu Foods, as a shop's stock put out on its counter: the headline across the top, «تطبخ» struck out in red pen and «من تحضير كيو» circled beside it, then three piles — the clubs leaning like books, the loaves in a pyramid, the tubs stacked by the jar — each with a cardboard sign leant at its foot: a yellow burst with its lowest price and its six packs in marker, the deal price in red, the old one struck through; pointing at a pack marks its line, and pointing at a line lifts its pack; swiped along on a phone. Qeu Coffee, as a café's menu board: the heading, a large 16 oz cup of ice in the middle, outlined in night ink so the clear plastic reads on white, poured with the drink picked — the milk, then the shot — and labelled, and the menu written on the wall, each drink beside its photo, dots to its price                                                                                                                                                                                                      | **new**: the app's «كيو فودز» and «كيو كوفي» tabs — their products, sizes and prices |
| «كيف يشتغل / عروضنا تجيك وبنفس السعر» — the order as the route it takes, drawn by hand across the wall: a dashed line leaves where the order starts, turns down and up through three stops — each a pen-ringed number — and ends at the door, where «طلبك وصل» is stamped; from each stop a dashed line drops to its step — a print of the app's own screen (Google Play screenshots, cropped), tossed down at its own angle, and under it the step from the Google Play description; as the section scrolls by, Qeu's van drives the line and turns it from dashes to solid behind it; on a phone the route stands upright along the steps                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | **kept** from the earlier proposal (takes v3's "inside the app" slot); slip **new**  |
| «عندك سؤال؟» — FAQ printed as a till receipt straight onto the wall, no slip around it, the one thing in the section, as wide as the page: the shop's name, «عندك سؤال؟» printed large as the receipt's title, then every question in two columns, as a wide till prints its lines, with dot leaders — the first printed open, and «رقمك 08 — سؤالك مو في الفاتورة؟ راسلنا» the second column's last line — a total that comes to «مجاناً» in yellow marker, and a barcode across the page                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | **new**: answers restate the page and the Google Play listing only                   |
| Google Play figures (count up on scroll), printed as the app's nutrition-facts label, «القيمة الغذائية» — its heavy frame, the thick bar after the title, hairlines between the figures, heavy rules before the price and the small print — in night ink on the white, each figure as large as a headline: one strip on a computer, the tall label on a phone                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | v3 figures; label **new**                                                            |
| «حمّل كيو» — both stores and, on a computer, the QR code beside them, and the app in its phone at the end, set askew and standing on its own shadow like a print on the wall (left out on phones and tablets, which have the store buttons)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | v3 text; phone **new**                                                               |
| Footer on the same white wall: the wordmark and the slogan set large, «عروض» on a stroke of yellow marker; under them the order's delivery label written on the wall («طلبك وصل», from Qeu to your door, a barcode), the page's contents — each ticked in pen once read; on phones, left to the bar's list — and the contact links                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | v3, with the missing legal and contact details added; delivery label **new**         |
| `/policy` — the privacy policy as an official document: its title under the shop's awning, then the document on the same white wall — the company letterhead, the policy word for word, the company stamp pressed on at the end — with its contents beside it, each ticked in pen as it is read; `/policy-english`, Qeu's English translation of it, the same document left to right                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | qeu.app/policy and /policy-english text; pages **new**                               |
| 404 — on the white wall, under the awning: «هالصفحة مو على الرف» and the way back home, and what a shop writes on an empty shelf, «نفد», circled in red pen                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | **new**                                                                              |

### The look: a poster, not a stack of boxes

Redesigned in full on 28 Sep 2026, on the client's review: the page read as things in framed
boxes, looked like a ready-made template, and every section needed a designer's own answer.
The content, the structure and every function stayed; what changed is the look.

- **No frames.** Nothing sits in a bordered card: what is on the page is told apart by its
  space, size and weight, and the page itself is one white wall. The bar at the top has no box
  either: it is painted that same white.
- **One wall, not eight.** The page is one wall from the bar to the foot — white, a shade toward
  Qeu's aqua (#f4fbfd, the swatch the client chose; `--page-wall` in `src/styles/tokens.css`,
  painted on `body`): no section has a colour, a
  blend or an edge of its own, so nothing tells the reader where one section stopped and the
  next began. What sets sections apart is space (`--section-space`), each one's own
  composition and a change of scale. What isn't the wall's colour stands out on it, and is the page's
  colour: the night of the store buttons, the shelf labels and the nutrition label's frame, the
  yellow of the offers, the teal of the awning and the store screenshots, the cream of the
  coupon and the delivery slip. The shop's awning over the hero is the page's one edge. A link
  to a section lands where its words begin.
- **Type as the picture.** Display titles are Lalezar — a thick, slightly uneven poster face close to the lettering on a shop's sign — set large and tight, with a pale aqua ghost print a hair off its letters, as a poster is printed a little out of register (fonts.css declares it as Tajawal's weight 900, so everything at 900 is set in it); prices and
  figures are set like headlines (the amount large, the currency small, the old price struck
  through: `src/components/ui/Price.jsx`). The template opening — a short rule, a line naming
  the section, the title — is gone, the small line over the title included: each title stands
  on its own.
- **A hand on the page.** One pen draws every mark (`src/components/ui/Scribble.jsx`): the
  price circled in the hero, the chosen department circled in red, the drink picked
  underlined, the contents ticked off, and the arrows from كيور's notes to its screen; a yellow
  highlighter stroke (`src/assets/marks/marker.svg`) marks the hero's promise, «مجاناً» and
  «عروض». Keyboard focus on the page's text controls — the aisles, the kitchen's tabs, the
  café's menu, the FAQ's questions — underlines the words rather than boxing them (a box could
  turn up in a screenshot taken with a key press).
- **Things stand on the wall.** Screens and products carry their own shadow, never a card: the
  aisles' pictures, the cup and the download's phone stand on the white like prints on a wall.
- **Each section composed on its own**, from what it is for Qeu, and each laid out its own way
  rather than words on one side and a picture on the other every time: a poster of the promise
  for «ليش كيو؟», a poster for the aisles (the department's name huge behind its products), a
  screen noted up for كيور and its title broken by the phone, a shop counter for Qeu Foods (the
  headline over three piles of packs, a cardboard price sign leant at each), a café's menu board with its cup
  in the middle, a hand-drawn delivery route for the order, and the FAQ a receipt as wide as the page.
- **Few calls to download.** «حمّل كيو» is in the hero, the bar and the download section; the
  one «حمّل كيو و…» link left between them is part of a design — the last of كيور's notes.

On the client's next look the same day, the page still read as made by a machine in places:
four phones that weren't the same phone, an empty corner beside the aisles' products and in
the middle of «اسأل كيور», a café menu in two columns with a gap down its middle, the FAQ in two
half-empty columns, the same opening over every title and the same «حمّل كيو و…» link closing
every section. The sections above are the answer.

On the client's look on 29 Sep 2026, five sections still left too much of the wall empty and
read as templates: كيور's title sat over its phone with the sides bare, Qeu Foods' packs stood
small under a headline with half the page white, the café put its words on one side and its
cup on the other, the FAQ receipt was a narrow column in the middle of the paper, and the
nutrition label had lost its label. Each is now filled from its own idea — the title broken by
the phone, a flyer with stickers, a menu board with the cup in the middle, a receipt as wide as
the page, and the label's frame and bars back at the size and colours of the new page — and
Foods and the café each fit one screen of a 14″ MacBook Pro. The aisles then moved off the deal
yellow onto the aqua of the app's own «الأقسام» screen, so the yellow only ever marks an offer,
and the footer's «عروض» got a marker stroke tall enough to keep the dot of its «ض».

On 7 Oct 2026 the page was asked to feel like one section as it is scrolled, not eight. A first
answer ran each section's colour into the next over a short blend; the client still felt the
difference, and asked for the wall behind the page to be white, not blue. So there are no
colours between sections any more: the teal of the hero and the download, the night of
«اسأل كيور» and the footer, the café's espresso and the pale aqua of the aisles are gone, and the
page stands on the one white wall (`--page-wall`), its colour kept for what stands on it.

### Changed from v3

Images

- Every app screen stands in its phone, and in «ليش كيو؟» all four in the same one: the home
  render's (qeu.app). The categories screen came in a phone of another colour; the picks and
  chat screens were crops of the Google Play screenshots with a piece of another phone round
  them — its bezel, its dynamic island, the store's aqua backdrop. Each was cut down to its
  screen, the island painted out, the bottom the store screenshot cut off completed with the
  app's own tab bar (under the picks) or the chat's input field, the home render's status bar
  added, and the screen set into the home render's frame. None sits in a card. v3 showed small,
  unframed crops.
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
- Header: the real wordmark vector replaces the typed name, and v3's boxed bar is gone: the bar
  is painted the page's white wall, so nothing separates it from the page.
- Arabic headings no longer get letter-spacing, which breaks letter joining.
- Figures are written with the digits 0–9 in Arabic too (1+1, 4.7, 100 ألف, 9.80 ر.س), as
  Qeu's app writes its prices; v3 used Arabic-Indic digits (١٢٣).
- Wording follows the live site where v3 differed: «ليش كيو؟» (v3: «ليه»), and the footer slogan
  is qeu.app's «أسعارنا هي أصلًا عروض» (v3: «كل شي في كيو عرض»). The English hero is
  qeu.app/english's own line.
- In «ليش كيو؟» and «حمّل كيو» the brand's name is drawn as its wordmark (the name stays in the
  text, visually hidden, for screen readers and search).
- Portrait tablets: «ليش كيو؟» puts the screen under the list so the pinned block fills the view;
  screens too short to pin (a phone on its side) get the row of slides, like phones.

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
- The supermarket, carried further — in words, marks and type rather than in framed objects:
  - «ليش كيو؟»: each benefit's promise is set as a poster sets it, in huge yellow type beside
    its screen — «1+1 مجاناً», «ابحث بسهولة», «أقل سعر», «اخترناها لك» (the screen's own
    heading) — and changes with it. The promises only repeat the text.
  - The store figures are printed as the app's nutrition-facts label, «القيمة الغذائية لتطبيق
    كيو», in its own form — the heavy frame, the thick bar after the title, a hairline between
    the figures, heavy rules before the price and the small print — in night ink on the white:
    the serving size, the figures, the price — free — and, in the small print, where and when
    the figures were read; each figure is set as large as a headline.
  - Round كيور's phone, the steps are notes in night ink, each numbered on a yellow disc and
    with a pen arrow to its part of the screen — placed in the phone's own grid (ems of its type), so the
    arrows land on the same spot at any size — and written in as the conversation reaches it.
    On a phone they are listed under the screen, their numbers pinned on the parts they
    explain.
  - Each screen in the hero's row is set down at its own tilt; they carry no captions (the
    screens say their own words).
  - «كيف يشتغل» is the order's route (`src/components/sections/HowItWorks.jsx`): drawn by hand
    across the wall — a dashed line through three pen-ringed stops to the stamp «طلبك وصل» —
    with a print of the app's screen and the step under each stop (it was a delivery slip, and
    before that a drawn street; a card was what the client felt looked machine-made). Qeu's van
    drives the line as you scroll, turning it solid: a small script moves the van along the
    path's own length (`getPointAtLength`) and sets how much of the line is drawn; without it,
    or with reduced motion, the route is drawn to the end with the van at the door. On a phone
    the route stands upright along the steps and the van stays out.
- «أقسام كيو», after «ليش كيو؟»: the app's six departments — «المقاضي» to «كيو تيك» — and the
  categories in each, 45 on the app's home screen (`src/content/departments.js`), as the
  store's aisles, as a poster on the white wall, in the aqua of the app's own «الأقسام» screen
  (the colour of the circles its categories sit in) — the deal yellow is kept for offers. The store directory,
  «دليل الأقسام», is a list of names — each department's aisle number, the app's icon and the
  name — and the chosen one is circled in red pen, with the same pen's arrow to its aisle;
  beside it the chosen department's categories stand on a shelf, large, the app's own picture
  of each over its name, all in view at once (a department of seven sets its second row of
  three in the middle) — the first row level with the heading, the second with the directory's
  last line — and behind them, in the
  band between the rows, the department's name set huge in pale aqua, as wide as the
  column (CSS can't fit type to a width, so each name's width in ems is measured once and kept
  in `Aisles.jsx`); under them the way to that aisle in the app («الأقسام › …»). Choosing
  another name circles it, sets its categories out, each put down in its place, and changes the
  name behind them. The directory is a radio group that needs no
  script (the checked aisle's categories are shown with `:has()`, and the pen's loop is drawn
  from the checked line); the script only holds the names back and the categories unset below
  the fold, so they come in one after another when the aisles come into view. Only the shown
  department's pictures load. On phones and tablets the names become tiles (three to a row on a
  phone, all six on a tablet), the chosen one filled in night; on a phone the two rows of
  categories are swiped. The heading counts the departments and rounds the categories down
  ("more than 40"): the departments showing eight may hold more behind the app's «عرض الكل».
  The pictures were cut from the screenshots like Qeu Foods' (below), with three put right by
  hand: the green of the app's card that came away with the rice and the phone case, and the
  Areon card Vision left out of «المعطرات». The icons are cut from their white background.
- The bar lists seven sections (Qeu Foods and Qeu Coffee share one): its links close up a
  little at 1024px.
- «كيو فودز» and «كيو كوفي»: Qeu's own food and coffee — two tabs under «المنتجات الطازجة» in the
  app — share a section, after «اسأل كيور» (don't feel like cooking the kabsa? Qeu Foods) and
  before «كيف يشتغل» (`src/components/sections/Kitchen.jsx`). The switch at its top is the two
  names set large, the open one over a thick line — a radio group, so it needs no script — and
  the wall stays the same white for both. Their products, sizes and prices are the app's, from
  screenshots of the two tabs (`src/content/menu.js`); the prices are deal prices, so the date
  they were read is printed beside them, and the page adds that they may change. That Qeu
  prepares the meals itself comes from the brief; the sandwiches' packs carry the wordmark.
  - «كيو فودز» is the shop's stock put out on the counter, not a grid of eighteen look-alike
    cards: the headline across the top, «تطبخ» crossed out in red pen (no cooking today) and
    «من تحضير كيو» circled, then three piles, each stacked the way its packs stack — the clubs
    standing in a row leaning on one another like books with the croissant rolls in front, the
    minis and jumbos in a pyramid of loaves, the tubs of hummus and labneh stacked three and two
    beside the tall jar of tabbouleh (positions in `PILES`, Foods.jsx). One cardboard sign leans
    at each pile's foot, each at its own angle: what is on the pile, a yellow burst with its
    lowest price, and its six packs written in marker — name, size, the price in red and the old
    one struck through (read out as «بدل»). The signs are what is read; the piles are pictures
    beside them (hidden from screen readers). Pointing at a pack marks its line on the sign with
    the yellow highlighter, and pointing at a line lifts its pack out of the pile; on a phone a
    tap does it. The piles are stacked pack by pack as they come into view, each sign leant on
    after its pile. The page shows eighteen of the app's sandwiches, dips and salads — the ones
    whose names its cards print whole — and says that there are more in the app, with the way to
    the tab. The piles stand side by side on a computer and are swiped along on a phone and a
    tablet.
  - «كيو كوفي» is a café's menu board: the heading at the start, the cup large in the middle,
    and the menu written on the wall at the end, in one column, as a café writes it: under
    «قهوة باردة» a line per drink — the app's photo, the name, a run of dots, the price —
    the one picked underlined in the app's teal, then under «مشروبات للجمعات» the box, its price as near
    its name as the drinks'. The menu is a radio group (`fieldset`, arrow keys, screen
    readers); the tab's other shelves are named in a line under it. Picking a drink pours it in
    the large cup beside the menu (`src/components/illustrations/IcedCup.jsx`): a 16 oz cup, outlined in night ink so the clear plastic reads on white, packed with ice, the milk
    rising through the ice, the shot running down into it, the café's label slapped on and the
    cup beading with cold — each drink in its colours, the pistachio latte with its sauce down
    the sides. It needs no script: the stylesheet shows the checked drink's cup (`:has()`), and
    a cup that appears plays its pour from the start. The script only holds the first pour (an
    empty cup of ice) until the cup is in view. On phones the cup is a strip over the menu — a
    small cup, and the hint beside it — so the pour is seen while picking.
  - The product photos are cut from the screenshots: the app's + button painted out of its
    corner (mirrored from the other side of the pack where the pack is symmetrical), upscaled 4×
    with macOS's own super-resolution model (VideoToolbox), separated from the app's grey card
    with Vision's subject lifting, and the matte pulled in a pixel so no halo shows on the wall
    (`scripts/cutout.swift`). The eighteen of Qeu Foods are from screenshots provided 8 October
    2026; the shelves that the earlier screenshots (26 September) showed — the omelette club and
    «داود باشا مع الرز» — are out of the page, since the new screenshots' shelves («ساندويتشات»,
    «سلطات», «مقبلات وغموس») don't list them.
- «ليش كيو؟» on phones showed no screens at all; each benefit is now a slide with its screen and
  its promise, in a row that snaps as it is swiped, with a bar under it that fills as it goes
  (drawn by the browser from the row's scroll position, no script). Pinned, a line fills under
  the open benefit's title as the reader scrolls through it, over a 180vh track — a fifth of a
  screen's scroll per benefit — and a click on a closed benefit scrolls to it.
- A screen's place in the hero's row shows before its picture loads; buttons give a little when
  pressed. Nothing follows the pointer and nothing shines: the motion is the row's drift, the
  scroll-linked van, the pen drawing its marks and the one-off replays (the chat, the pour).
- Moving between the Arabic, English and policy pages cross-fades, and the bar glides to its
  new place (cross-document view transitions, where the browser supports them).
- On a computer the bar stays open, at one size, all the way down the page: a loop of pen
  glides round the section being read (no line under the links, no progress bar).
- A page that reads shorter: about 10 screens on a computer (a 14″ MacBook Pro, 1512×860)
  and 10.4 on a phone (390×844; it was 12.2 and 14.4). The sections sit closer together, Qeu Foods and Qeu Coffee share one, the FAQ
  prints its questions in two columns, each section's intro is one line, «كيف يشتغل»
  lists its steps on one slip, and the aisles show a department's categories on
  two rows beside the directory. Phones leave out what they don't need: the download's phone,
  the café's big cup and the footer's contents. The «حمّل كيو» button is kept for the hero, the
  bar and the download section, and one quieter link between them — كيور's last note. The bar
  says how far down the page the reader is.
- Unhurried motion (`src/styles/tokens.css`): content fades up over a second as it scrolls into
  view, the pen takes a second and more to draw a mark, the coffee about four and a half seconds
  to pour, and the hero's row glides one set of screenshots past in 80 seconds. Hovers still answer at once. The كيور replay keeps its
  timing, so it is still over within five seconds (WCAG 2.2.2).
- Set close, as Tajawal reads best: its line box is 1em and its letters small in it, so
  headings take a line height of 1.2 and text 1.4. Every section's title is one size, in
  Tajawal 900, with nothing over it.
- Every label in a button, a tab or a pill is centred on the middle of its letters, not on its
  line box. Tajawal sets its baseline 64% of the way down its line box on a Mac or a phone
  (lower on Windows), so a label centred by its line box read high — by about a tenth of its
  size, 1.5–3 px in the store buttons. Each label is trimmed to its letters' x-height and
  baseline (`text-box: trim-both ex alphabetic`, the `--label-box` token), which lands the
  same on every system, and the button centres that; its height is set, not left to the
  label. Browsers without `text-box` (Chrome before 133, Safari before 18.2, Firefox before 154) keep the line box, as before.
- On a phone the bar shows the wordmark, sized so the section's name beside it stays whole with
  its count, down to 360px («حمّل التطبيق 7 من 7», the longest).

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
  App.jsx                 the frame every page shares: the bar at the top, the page, footer
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
    illustrations/        IcedCup (the cup «كيو كوفي» pours)
    policy/               PolicyPage — the policy as a stamped document on a letterhead
    download/             DownloadLink, DownloadCard (the bar's, on a computer), StorePills,
                          AppStage (the phone), QrCard
    stats/                StatsRow, CountUp
    brand/                Logo (vector wordmark from qeu.app; LogoSymbol defines it once per
                          page), WithBrand
    ui/                   Picture, SectionHeading, Scribble (the pen's marks), Price,
                          Barcode
                          (+ barcode-bars.js), icons
  i18n/                   locales config, provider, useLocale()
  hooks/                  usePlatform, useCurrentYear (hydration-safe), useScrollReveal,
                          useActiveSection (the section being read), useSeenSections
  lib/                    links (store URLs + UTM), analytics, formatting, cx
  seo/head.js             <title>, meta, hreflang, Open Graph, JSON-LD
  styles/                 fonts, tokens (the page's one white wall is `--page-wall`), base, layout
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
`downloads` and `ratings` in `site.js` and rebuild — both languages follow, digits 0–9 in both
and Arabic plural forms handled. The build reminds you when the capture is more than 60 days old.
When the app's prices for Qeu Foods or Qeu Coffee change, update them and `capturedAt` in
`src/content/menu.js`: Qeu Foods' prices, the coffee menu and the date beside them follow.

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
- **Screenshots of the app**, provided 26 Sep 2026 — the «كيو كوفي» tab under «المنتجات الطازجة»:
  its drinks, sizes and prices, and the product photos cut out for the café. The coffee box's
  name runs past its card in the app («بوكس قهوة اليوم بارد ا…»), so the page uses only the
  words that show.
- **Five screenshots of the app's «كيو فودز» tab**, provided 8 Oct 2026 — its three shelves
  («ساندويتشات», «سلطات», «مقبلات وغموس»): the products with their sizes and prices, and the
  photos cut out for the three shelves. Where a card cuts a name short («لبنة وزعتر ميني بخبز
  ا…») the product is left out of the page.

The English copy is quoted from qeu.app/english where a line exists there; the rest is a
translation and should be reviewed by the client.

## SEO, accessibility, performance

- One `h1`; `lang` and `dir` set per page; hreflang (the home pages to each other, the two
  policies to each other), a canonical URL, Open Graph and schema.org data (Organization,
  WebSite, MobileApplication, and FAQPage from the same copy as the FAQ section; WebPage and a
  breadcrumb on the policy). The data carries no `aggregateRating`: Google doesn't allow marking
  up ratings collected on another site.
- Link previews use a 1200×630 image per language, drawn from the hero's copy and screens (`npm run og`; it still draws the hero as it was before its pieces: the teal one). On
  Vercel the image URL names the project's production domain (`VERCEL_PROJECT_PRODUCTION_URL`),
  so previews work on the `.vercel.app` address now and switch to qeu.app with the first deploy
  after that domain is added. The 404 page is `noindex`, and so is every `*.vercel.app` address
  (`X-Robots-Tag`): the canonical site is qeu.app, and this copy shouldn't compete with it in
  search.
- Without JavaScript the page still reads in full: `public/no-js.css` stops the hero's screens,
  hides the controls that need a script (the four benefits in their row need none). The page
  loads the same stylesheet itself if its own script fails to arrive, so a dropped connection
  leaves it readable rather than half-working.
- Skip link, landmarks, visible focus, 44px touch targets, and descriptive alt text on every app
  screen (the drifting hero screens are decorative). Animation (drift, count-up, reveals,
  transitions) switches off under `prefers-reduced-motion`.
- The drifting screens stop while the hero is out of view, are off under reduced motion and stand
  still without JavaScript. They have no pause button (the client asked for it to go), so WCAG
  2.2.2 is not met for a visitor who allows motion; a pause on hover or keyboard focus would be the
  quiet way to meet it. The كيور replay plays once and
  is over within five seconds, so it needs none; it can be replayed. It starts once half the
  phone is in view — or, on a screen shorter than that (a phone on its side), once the phone
  fills half the screen. The pre-rendered page, reduced motion and a page without JavaScript
  all show the conversation whole.
- On a phone on its side the page runs under the notch and the rounded corners
  (`viewport-fit=cover`), and every gutter grows to the safe-area insets, so no text goes under
  them. The page opts out of browsers' automatic dark modes (`color-scheme: light only`): it
  is drawn on a white wall, and a darkened one would turn its colours inside out.
- Text meets WCAG AA contrast: `--brand-text` (#127d86) is the brand teal for text and focus rings
  on white; `--brand` (#17a2ae) is only for what is drawn — the awning, the screens' art — and text
  set on it would be night ink (5:1 — white would be 2.9:1). The aisles' department names are in a
  deeper teal (#0b5f6b, 7:1) and the policy's small labels in another (#10747c, 5.5:1). The names set back — a closed benefit, the tab not open, the departments
  not chosen — are large text, at 3.3:1 or more; the yellow promises are painted over a night shadow; each benefit's name is in the page once, for a screen reader. Screen readers read the real figures, not the
  count-up; the pen's marks and the huge promises only repeat the text, and are hidden from them.
- «ليش كيو؟» hides nothing: all four benefits, their words included, are on the page at once, so
  there is nothing pinned, collapsed or scripted in it (a plain ordered list, read in order).
- The hero headline is one block of text, so on a phone it — not a picture — is the Largest
  Contentful Paint, painted with the first frame; its face, Lalezar (fonts.css declares it as
  weight 900), is preloaded with the bar's and the button's. On a phone every picture in the hero
  is sized to stay smaller than the headline, which in English is a line shorter than in Arabic —
  the app's screen included, shadow and all: the browser measures a picture with the drop shadow
  round it, so on a phone it has none. (On a computer the app's screen is the LCP, at about
  0.4 s.)
- Nothing scrolls by itself as the page loads: Chrome ends its LCP at the first scroll, and a
  phone would report none at all. The rows that snap as they are swiped (the benefits' row,
  the aisles' categories on a phone) keep their scroll padding equal to their padding, so their
  first item already stands where the snap would put it.
- Nothing moves once the page runs, nor as it is scrolled (CLS ≈ 0): on phones and tablets the
  note sits under the download button from the first paint, so the button naming the visitor's
  store once the page runs («حمّله مجاناً من Google Play», longer than the pre-rendered label)
  pushes nothing down; the figures count up over the final figure, which holds their place
  (Tajawal's digits differ in width, so a count in the flow would rewrap the line); and the
  bar's section name keeps the width of the longest name it can show (every name is stacked in
  it, unseen), and a name too long for a phone is cut short rather than pushing the store
  button off the screen. Scrolled through, the production build measures 0 on a computer and
  0.001 on a phone.
- The wordmark is defined once per page (`<LogoSymbol>`) and every copy draws it with `<use>`:
  with its paths in each of its ten copies, the landing page's HTML was 31 KB gzipped, and
  drawn from the one symbol it was 20. The page now draws it 19 times, Qeu Foods and Qeu
  Coffee included, in 29 KB (the aisles' 45 pictures and 12 icons take about 5 of them). Its
  paths were compacted without changing the shape (zero-length segments dropped, relative
  coordinates).
- Build output (gzipped): 87 KB of shared JS, most of it React; the page's language, 5.4 KB
  (Arabic) or 4.8 KB (English); the page's own chunk (16.8 KB for the landing page, 6.6 KB for
  the policy and 6 KB for its English, 0.7 KB for the 404); one 24.4 KB stylesheet for the whole
  site, so no page waits for another's CSS; Tajawal's files of about 9–10 KB each, the three
  the first screen paints with preloaded; about 70 KB of hero images on a phone (the six store
  screens, one app screen and the product's pack), and lazy-loaded images below the fold.
  The landing page's first visit on a phone is about 390 KB in all.
- Measured in Chrome with Lighthouse's mobile throttling settings (150 ms RTT, 1.6 Mbps, 4×
  CPU), median of five runs, before the redesign: LCP about 1.2 s in both languages (the
  headline), 0.9 s on the policy pages; TBT 0; CLS 0 as the page loads. The redesign preloads
  one more font file (the headline's weight) and takes 5 KB off the stylesheet.
  The hero's pieces (8 October 2026), driven over the DevTools protocol — a Moto G-sized phone
  (412×823), 4× CPU, 1.6 Mbps, 150 ms — gave 1.2–1.6 s for the headline, still the LCP in both
  languages, and a CLS of 0.001.

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

On a computer the bar's «حمّل كيو» opens a card instead of jumping to the download section:
its store buttons are tagged `header_card`, and its QR code is the download section's, so a
scan from either counts as `desktop`. On a phone the same button is the phone's store link
(`header`); without JavaScript it is the link to the download section.

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
- [ ] Delivery facts: the cities and areas served, the delivery window and fee, the payment
      methods. The page says «توصيل سريع» and «خيارات دفع آمنة» because that is all the sources
      give (the Google Play description); with real figures the hero's line and «كيف يشتغل»
      could say them, which is what a visitor asks first.
- [ ] Original photographs — the van on a street, an order handed over at a door, Qeu Foods'
      kitchen, the team. Every image on the page is the app's own screen or product shot, which
      is right for an app; one real photograph would be the thing a template cannot have.
- [ ] «أقسام كيو»: confirmation that the six departments are all of them, and the full list
      of categories for the three that show eight on the home screen (there may be more
      behind «عرض الكل»); the heading says "more than 40" until then.
- [ ] Qeu Foods and Qeu Coffee: confirmation that the food is prepared by Qeu (the brief says
      so; the page says «تحضّرها كيو بنفسها»), whether «داود باشا مع الرز» and the omelette club
      are still sold (they were left out when the 8 October screenshots no longer showed them),
      the full names of the cards the app cuts short («لبنة وزعتر ميني بخبز ا…», …), the coffee
      box's full name, and — when the app's prices change — the new ones for `src/content/menu.js`.
