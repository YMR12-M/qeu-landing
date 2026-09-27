/**
 * Every image on the page, with its responsive variants.
 *
 * vite-imagetools encodes each import at the listed widths during the build
 * (`as=picture` → { sources, img }). All sources are Qeu's own material:
 *   screen-home, screen-categories   → app screens published on qeu.app (device frame included)
 *   screen-picks, screen-chat, step-* → Google Play screenshots, cropped (≈1.8× the provided crops)
 *   play-*                            → the six Google Play screenshots, whole (1242×2688 originals
 *                                       scaled to 960px wide); play-delivery-1/-2 are one panorama
 *   app-icon                          → Google Play icon
 *   qur-*                             → the kabsa ingredients كيور lists in the chat screenshot
 *                                       (screen-chat), cropped from it with their + button
 *   food-*, coffee-*                  → products from screenshots of the app's «كيو فودز» and
 *                                       «كيو كوفي» tabs: upscaled 4× (macOS's super-resolution
 *                                       model), cut out of the app's grey card and its + button
 *                                       (Vision), edges cleaned of the grey; the meal tray's
 *                                       corner, under the + button, mirrored from the other one
 *
 * AVIF and WebP are encoded separately because sharp's quality scales differ: AVIF at q50 is
 * 25–30 % smaller than WebP at q72 on these screens and closer to the source (SSIM), while
 * AVIF at q72 came out larger than the WebP. The app icon is WebP only: at the sizes the
 * header asks for, AVIF's container overhead outweighs what it saves.
 *
 * `kind` tells the frames how to fit a screen: a device render sits inside with a margin,
 * a store crop fills the frame edge to edge. `focus` is the crop's object-position, for
 * screens whose important part isn't at the top.
 */

import appIcon from '../assets/images/app-icon.png?w=48;96;160;240&format=webp&quality=80&as=picture';
import coffeeAmericano from '../assets/images/coffee-americano.webp?w=48;72;96;144&format=webp&quality=80&as=picture';
import coffeeBox from '../assets/images/coffee-box.webp?w=64;96;128;192&format=webp&quality=80&as=picture';
import coffeeLatte from '../assets/images/coffee-latte.webp?w=48;72;96;144&format=webp&quality=80&as=picture';
import coffeePistachio from '../assets/images/coffee-pistachio-latte.webp?w=48;72;96;144&format=webp&quality=80&as=picture';
import coffeeSpanish from '../assets/images/coffee-spanish-latte.webp?w=48;72;96;144&format=webp&quality=80&as=picture';
import foodMeal from '../assets/images/food-dawood-basha.webp?w=120;180;240;360&format=webp&quality=80&as=picture';
import foodOmelette from '../assets/images/food-club-omelette.webp?w=120;180;240;360&format=webp&quality=80&as=picture';
import foodTuna from '../assets/images/food-club-tuna.webp?w=120;180;240;360&format=webp&quality=80&as=picture';
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

const device = (image) => ({ image, kind: 'device' });
const crop = (image, focus) => ({ image, kind: 'crop', focus });

export const media = {
  appIcon,

  /**
   * Hero: the six Google Play screenshots stand on the deals shelf, in the store's order, each
   * over its offer label (by id). The two delivery shots are one panorama, read right to left.
   */
  shelf: [
    { id: 'picks', image: playPicks },
    { id: 'assistant', image: playAssistant },
    { id: 'delivery1', image: playDelivery1 },
    { id: 'delivery2', image: playDelivery2 },
    { id: 'offers', image: playOffers },
    { id: 'smart', image: playSmart },
  ],

  /** «ليه كيو؟» — one screen per benefit, keyed by benefit id. */
  why: {
    deals: device(screenHome),
    search: device(screenCategories),
    prices: crop(screenPicks),
    picks: crop(screenChat, '50% 72%'), // the «مكونات الكبسة» card
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

  /** «كيو فودز» — the fridge's products, keyed by product id (src/content/menu.js). */
  foods: {
    omelette: foodOmelette,
    tuna: foodTuna,
    meal: foodMeal,
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
