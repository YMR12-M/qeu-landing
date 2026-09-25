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
import stepDeliveryAvif from '../assets/images/step-delivery.webp?w=240;360;480;720;960&format=avif&quality=50&as=picture';
import stepDeliveryWebp from '../assets/images/step-delivery.webp?w=240;360;480;720;960&format=webp&quality=72&as=picture';
import stepOffersAvif from '../assets/images/step-offers.webp?w=240;360;480;720;960&format=avif&quality=50&as=picture';
import stepOffersWebp from '../assets/images/step-offers.webp?w=240;360;480;720;960&format=webp&quality=72&as=picture';
import stepPicksAvif from '../assets/images/step-picks.webp?w=240;360;480;720;945&format=avif&quality=50&as=picture';
import stepPicksWebp from '../assets/images/step-picks.webp?w=240;360;480;720;945&format=webp&quality=72&as=picture';

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
const stepDelivery = picture(stepDeliveryAvif, stepDeliveryWebp);
const stepOffers = picture(stepOffersAvif, stepOffersWebp);
const stepPicks = picture(stepPicksAvif, stepPicksWebp);

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

  /** «اسأل كيور» — the products in its kabsa list, keyed by product id (assistant-chat.js). */
  assistant: {
    spice: qurSpice,
    rice: qurRice,
    tomato: qurTomato,
  },

  /** «كيف يشتغل» — keyed by step id. */
  steps: {
    offers: stepOffers,
    picks: stepPicks,
    delivery: stepDelivery,
  },

  /** The app-icon stage in the download section. */
  stageScreen: screenHome,
};
