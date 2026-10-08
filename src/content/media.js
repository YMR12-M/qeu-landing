/**
 * Every image on the page, with its responsive variants.
 *
 * vite-imagetools encodes each import at the listed widths during the build
 * (`as=picture` → { sources, img }). All sources are Qeu's own material:
 *   screen-home                       → app screen published on qeu.app, in its phone
 *   screen-categories, -picks, -chat  → the app's screens set in screen-home's own phone, so
 *                                       all four are the same phone: the categories screen from
 *                                       qeu.app (its phone was another colour), the picks and
 *                                       chat screens cut out of the Google Play screenshots
 *                                       (their bezel, dynamic island and backdrop left behind),
 *                                       the bottom the store cut off completed with the app's tab
 *                                       bar or the chat's input field, the status bar
 *                                       screen-home's
 *   van                               → Qeu's van, cut out of the two delivery screenshots (play-delivery-1/-2
 *                                       are one panorama): stitched, the sky lifted off it with macOS's Vision
 *                                       (as scripts/cutout.swift does for the packs), the phone that stood
 *                                       in front of its rear taken away, and the rear that phone hid built
 *                                       again as plain bodywork. The panorama's edge cuts its nose, so a
 *                                       phone always stands over it (HowItWorks)
 *   play-*                            → the six Google Play screenshots, whole (1242×2688 originals
 *                                       scaled to 960px wide); play-delivery-1/-2 are one panorama
 *   app-icon                          → Google Play icon
 *   qur-*                             → the kabsa ingredients كيور lists in the chat screenshot
 *                                       (screen-chat), cropped from it with their + button
 *   food-*, coffee-*                  → products from screenshots of the app's «كيو فودز» and
 *                                       «كيو كوفي» tabs (food-*: provided 8 October 2026):
 *                                       upscaled 4× (macOS's super-resolution model), cut out of
 *                                       the app's grey card and its + button (Vision), edges
 *                                       cleaned of the grey; where a product's corner was under
 *                                       the + button it is mirrored from the other side (the
 *                                       price stickers sit over that corner), see scripts/cutout.swift
 *
 * AVIF and WebP are encoded separately because sharp's quality scales differ: AVIF at q50 is
 * 25–30 % smaller than WebP at q72 on these screens and closer to the source (SSIM), while
 * AVIF at q72 came out larger than the WebP. The app icon is WebP only: at the sizes the
 * header asks for, AVIF's container overhead outweighs what it saves.
 */

import appIcon from '../assets/images/app-icon.png?w=48;96;160;240&format=webp&quality=80&as=picture';
import coffeeAmericano from '../assets/images/coffee-americano.webp?w=48;72;96;144&format=webp&quality=80&as=picture';
import coffeeBox from '../assets/images/coffee-box.webp?w=64;96;128;192&format=webp&quality=80&as=picture';
import coffeeLatte from '../assets/images/coffee-latte.webp?w=48;72;96;144&format=webp&quality=80&as=picture';
import coffeePistachio from '../assets/images/coffee-pistachio-latte.webp?w=48;72;96;144&format=webp&quality=80&as=picture';
import coffeeSpanish from '../assets/images/coffee-spanish-latte.webp?w=48;72;96;144&format=webp&quality=80&as=picture';
import foodClubCaesar from '../assets/images/food-club-caesar.webp?w=120;180;240;360&format=webp&quality=80&as=picture';
import foodClubHalloumi from '../assets/images/food-club-halloumi.webp?w=120;180;240;360&format=webp&quality=80&as=picture';
import foodClubShakshuka from '../assets/images/food-club-shakshuka.webp?w=120;180;240;360&format=webp&quality=80&as=picture';
import foodClubTuna from '../assets/images/food-club-tuna.webp?w=120;180;240;360&format=webp&quality=80&as=picture';
import foodCroissantLotus from '../assets/images/food-croissant-lotus.webp?w=120;180;240;360&format=webp&quality=80&as=picture';
import foodCroissantPistachio from '../assets/images/food-croissant-pistachio.webp?w=120;180;240;360&format=webp&quality=80&as=picture';
import foodHummusBeiruti from '../assets/images/food-hummus-beiruti.webp?w=180;240;360;480&format=webp&quality=80&as=picture';
import foodHummusCilantro from '../assets/images/food-hummus-cilantro.webp?w=180;240;360;480&format=webp&quality=80&as=picture';
import foodHummusClassic from '../assets/images/food-hummus-classic.webp?w=180;240;360;480&format=webp&quality=80&as=picture';
import foodHummusFoul from '../assets/images/food-hummus-foul.webp?w=180;240;360;480&format=webp&quality=80&as=picture';
import foodJumboCaesar from '../assets/images/food-jumbo-caesar.webp?w=180;240;360;480&format=webp&quality=80&as=picture';
import foodJumboShawarma from '../assets/images/food-jumbo-shawarma.webp?w=180;240;360;480&format=webp&quality=80&as=picture';
import foodJumboTurkey from '../assets/images/food-jumbo-turkey.webp?w=180;240;360;480&format=webp&quality=80&as=picture';
import foodLabnehOlives from '../assets/images/food-labneh-olives.webp?w=180;240;360;480&format=webp&quality=80&as=picture';
import foodMiniFalafel from '../assets/images/food-mini-falafel.webp?w=180;240;360;480&format=webp&quality=80&as=picture';
import foodMiniMortadella from '../assets/images/food-mini-mortadella.webp?w=180;240;360;480&format=webp&quality=80&as=picture';
import foodMultigrainTurkey from '../assets/images/food-multigrain-turkey.webp?w=180;240;360;480&format=webp&quality=80&as=picture';
import foodSaladQuinoa from '../assets/images/food-salad-quinoa.webp?w=120;180;240;360&format=webp&quality=80&as=picture';
import playPicksAvif from '../assets/images/play-picks.webp?w=240;360;480;720&format=avif&quality=50&as=picture';
import playPicksWebp from '../assets/images/play-picks.webp?w=240;360;480;720&format=webp&quality=72&as=picture';
import playAssistantAvif from '../assets/images/play-assistant.webp?w=240;360;480;720&format=avif&quality=50&as=picture';
import playAssistantWebp from '../assets/images/play-assistant.webp?w=240;360;480;720&format=webp&quality=72&as=picture';
import playDelivery1Avif from '../assets/images/play-delivery-1.webp?w=240;360;480;720&format=avif&quality=50&as=picture';
import playDelivery1Webp from '../assets/images/play-delivery-1.webp?w=240;360;480;720&format=webp&quality=72&as=picture';
import playDelivery2Avif from '../assets/images/play-delivery-2.webp?w=240;360;480;720&format=avif&quality=50&as=picture';
import playDelivery2Webp from '../assets/images/play-delivery-2.webp?w=240;360;480;720&format=webp&quality=72&as=picture';
import playOffersAvif from '../assets/images/play-offers.webp?w=240;360;480;720&format=avif&quality=50&as=picture';
import playOffersWebp from '../assets/images/play-offers.webp?w=240;360;480;720&format=webp&quality=72&as=picture';
import playSmartAvif from '../assets/images/play-smart.webp?w=240;360;480;720&format=avif&quality=50&as=picture';
import playSmartWebp from '../assets/images/play-smart.webp?w=240;360;480;720&format=webp&quality=72&as=picture';
import qurRice from '../assets/images/qur-rice.webp?w=120;180;250&format=webp&quality=80&as=picture';
import qurSpice from '../assets/images/qur-spice.webp?w=120;180;250&format=webp&quality=80&as=picture';
import qurTomato from '../assets/images/qur-tomato.webp?w=120;180;250&format=webp&quality=80&as=picture';
import screenCategoriesAvif from '../assets/images/screen-categories.webp?w=360;540;720&format=avif&quality=50&as=picture';
import screenCategoriesWebp from '../assets/images/screen-categories.webp?w=360;540;720&format=webp&quality=72&as=picture';
import screenChatAvif from '../assets/images/screen-chat.webp?w=240;360;540;720&format=avif&quality=50&as=picture';
import screenChatWebp from '../assets/images/screen-chat.webp?w=240;360;540;720&format=webp&quality=72&as=picture';
import screenHomeAvif from '../assets/images/screen-home.webp?w=240;360;540;720&format=avif&quality=50&as=picture';
import screenHomeWebp from '../assets/images/screen-home.webp?w=240;360;540;720&format=webp&quality=72&as=picture';
import screenPicksAvif from '../assets/images/screen-picks.webp?w=240;360;540;720&format=avif&quality=50&as=picture';
import screenPicksWebp from '../assets/images/screen-picks.webp?w=240;360;540;720&format=webp&quality=72&as=picture';
import vanAvif from '../assets/images/van.webp?w=640;960;1280;1914&format=avif&quality=50&as=picture';
import vanWebp from '../assets/images/van.webp?w=640;960;1280;1914&format=webp&quality=80&as=picture';

// «أقسام كيو»: every category's picture, filed by department (departments/<department>/
// <category>.webp, the ids in src/content/departments.js), and each department's icon — the
// app's own, from its home screen: upscaled 4×, cut out of the app's green card (Vision), and
// its edges cleaned of the card's colour.
const categoryPictures = import.meta.glob(
  ['../assets/images/departments/*/*.webp', '!../assets/images/departments/icons/*.webp'],
  { eager: true, import: 'default', query: '?w=160;280;400&format=webp&quality=78&as=picture' },
);
const departmentIcons = import.meta.glob('../assets/images/departments/icons/*.webp', {
  eager: true,
  import: 'default',
  query: '?w=48;96;144&format=webp&quality=80&as=picture',
});

/** { department: { category: picture } } from the files' paths. */
function byDepartment(pictures) {
  const departments = {};
  for (const [path, image] of Object.entries(pictures)) {
    const [, department, category] = path.match(/([^/]+)\/([^/]+)\.webp$/);
    (departments[department] ??= {})[category] = image;
  }
  return departments;
}

/** One picture from the two encodings: AVIF listed first, WebP as its fallback and the <img>. */
const picture = (avif, webp) => ({ sources: { ...avif.sources, ...webp.sources }, img: webp.img });

const playPicks = picture(playPicksAvif, playPicksWebp);
const playAssistant = picture(playAssistantAvif, playAssistantWebp);
const playDelivery1 = picture(playDelivery1Avif, playDelivery1Webp);
const playDelivery2 = picture(playDelivery2Avif, playDelivery2Webp);
const playOffers = picture(playOffersAvif, playOffersWebp);
const playSmart = picture(playSmartAvif, playSmartWebp);
const screenCategories = picture(screenCategoriesAvif, screenCategoriesWebp);
const screenChat = picture(screenChatAvif, screenChatWebp);
const screenHome = picture(screenHomeAvif, screenHomeWebp);
const screenPicks = picture(screenPicksAvif, screenPicksWebp);
const van = picture(vanAvif, vanWebp);

export const media = {
  appIcon,

  /**
   * Hero: the six Google Play screenshots, in the store's order (by id: the og-image script
   * names them too). The two delivery shots are one panorama, read right to left.
   */
  shelf: [
    { id: 'picks', image: playPicks },
    { id: 'assistant', image: playAssistant },
    { id: 'delivery1', image: playDelivery1 },
    { id: 'delivery2', image: playDelivery2 },
    { id: 'offers', image: playOffers },
    { id: 'smart', image: playSmart },
  ],

  /** «ليش كيو؟» — one screen per benefit, keyed by benefit id: four of the same phone. */
  why: {
    deals: screenHome,
    search: screenCategories,
    prices: screenPicks,
    picks: screenChat,
  },

  /**
   * «كيف يشتغل» — one picture per step, keyed by step id: the app's home screen and its picks
   * screen (the same phone as «ليش كيو؟»), and Qeu's van.
   */
  steps: {
    offers: screenHome,
    picks: screenPicks,
    delivery: van,
  },

  /** «أقسام كيو» — the categories' pictures by department, and the departments' icons. */
  departments: byDepartment(categoryPictures),
  departmentIcons: byDepartment(departmentIcons).icons,

  /** «اسأل كيور» — the products in its kabsa list, keyed by product id (assistant-chat.js). */
  assistant: {
    spice: qurSpice,
    rice: qurRice,
    tomato: qurTomato,
  },

  /** «كيو فودز» — the shelves' products, keyed by product id (src/content/menu.js). */
  foods: {
    'club-caesar': foodClubCaesar,
    'club-halloumi': foodClubHalloumi,
    'club-shakshuka': foodClubShakshuka,
    'club-tuna': foodClubTuna,
    'croissant-lotus': foodCroissantLotus,
    'croissant-pistachio': foodCroissantPistachio,
    'hummus-beiruti': foodHummusBeiruti,
    'hummus-cilantro': foodHummusCilantro,
    'hummus-classic': foodHummusClassic,
    'hummus-foul': foodHummusFoul,
    'jumbo-caesar': foodJumboCaesar,
    'jumbo-shawarma': foodJumboShawarma,
    'jumbo-turkey': foodJumboTurkey,
    'labneh-olives': foodLabnehOlives,
    'mini-falafel': foodMiniFalafel,
    'mini-mortadella': foodMiniMortadella,
    'multigrain-turkey': foodMultigrainTurkey,
    'salad-quinoa': foodSaladQuinoa,
  },

  /** «كيو كوفي» — the menu board's drinks, keyed by drink id, and the gatherings box. */
  coffee: {
    spanish: coffeeSpanish,
    latte: coffeeLatte,
    pistachio: coffeePistachio,
    americano: coffeeAmericano,
    box: coffeeBox,
  },

  /** The app-icon stage in the download section. */
  stageScreen: screenHome,
};
