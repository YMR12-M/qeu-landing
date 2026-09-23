/**
 * Every image on the page, with its responsive variants.
 *
 * vite-imagetools turns each import into AVIF + WebP at the listed widths during the
 * build (`as=picture` → { sources, img }). All sources are Qeu's own material:
 *   screen-home, screen-categories   → app screens published on qeu.app (device frame included)
 *   screen-picks, screen-chat, step-* → Google Play screenshots, cropped (≈1.8× the provided crops)
 *   app-icon                          → Google Play icon
 *
 * `kind` tells the frames how to fit a screen: a device render sits inside with a margin,
 * a store crop fills the frame edge to edge. `focus` is the crop's object-position, for
 * screens whose important part isn't at the top.
 */

import appIcon from '../assets/images/app-icon.png?w=48;96;160;240&format=avif;webp&quality=80&as=picture';
import screenCategories from '../assets/images/screen-categories.webp?w=360;540;720&format=avif;webp&quality=72&as=picture';
import screenChat from '../assets/images/screen-chat.webp?w=240;360;540;720&format=avif;webp&quality=72&as=picture';
import screenHome from '../assets/images/screen-home.webp?w=240;360;540;720&format=avif;webp&quality=72&as=picture';
import screenPicks from '../assets/images/screen-picks.webp?w=240;360;540;720&format=avif;webp&quality=72&as=picture';
import stepDelivery from '../assets/images/step-delivery.webp?w=240;360;480;720;960&format=avif;webp&quality=72&as=picture';
import stepOffers from '../assets/images/step-offers.webp?w=240;360;480;720;960&format=avif;webp&quality=72&as=picture';
import stepPicks from '../assets/images/step-picks.webp?w=240;360;480;720;945&format=avif;webp&quality=72&as=picture';

const device = (image) => ({ image, kind: 'device' });
const crop = (image, focus) => ({ image, kind: 'crop', focus });

export const media = {
  appIcon,

  /** Hero background: the screens drift past behind the headline. */
  drift: [stepOffers, screenPicks, stepPicks, screenChat, stepDelivery],

  /** «ليه كيو؟» — one screen per benefit, keyed by benefit id. */
  why: {
    deals: device(screenHome),
    search: device(screenCategories),
    prices: crop(screenPicks),
    picks: crop(screenChat, '50% 72%'), // the «مكونات الكبسة» card
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
