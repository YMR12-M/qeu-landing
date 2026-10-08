/**
 * «كيو فودز» and «كيو كوفي» — Qeu's own food and coffee, as the Qeu app lists them under
 * «المنتجات الطازجة»: screenshots of the app's two tabs, Qeu Foods' provided 8 October 2026 and
 * Qeu Coffee's 26 September 2026.
 *
 * The prices are the app's, in riyals: `price` is what the app charges, `was` the price it
 * strikes through. They are the deal prices of the day they were read, so the sections print
 * that date beside them ({date}, from each tab's `capturedAt`): when the app's prices change,
 * update them here. Names and sizes are copy (locales → foods.products, coffee.drinks), in both
 * languages.
 */
export const MENU = {
  // Qeu Foods, shelf by shelf: the page shows eighteen of the app's sandwiches, dips and salads
  // (the app lists many more), the ones whose names the app's cards print whole.
  foods: {
    capturedAt: '2026-10-08',
    shelves: [
      {
        id: 'clubs',
        items: [
          { id: 'club-tuna', price: 8.8, was: 13 },
          { id: 'club-halloumi', price: 4.8, was: 10 },
          { id: 'club-shakshuka', price: 4.8, was: 10 },
          { id: 'club-caesar', price: 4.8, was: 10 },
          { id: 'croissant-lotus', price: 8.8, was: 13 },
          { id: 'croissant-pistachio', price: 8.8, was: 13 },
        ],
      },
      {
        id: 'minis',
        items: [
          { id: 'mini-falafel', price: 3.8, was: 8 },
          { id: 'mini-mortadella', price: 4.8, was: 9 },
          { id: 'jumbo-shawarma', price: 10.8, was: 15 },
          { id: 'jumbo-turkey', price: 10.8, was: 16 },
          { id: 'jumbo-caesar', price: 10.8, was: 15 },
          { id: 'multigrain-turkey', price: 10.8, was: 15 },
        ],
      },
      {
        id: 'dips',
        items: [
          { id: 'hummus-classic', price: 7.8, was: 12 },
          { id: 'hummus-cilantro', price: 7.8, was: 12 },
          { id: 'hummus-foul', price: 8.8, was: 13 },
          { id: 'hummus-beiruti', price: 7.8, was: 12 },
          { id: 'labneh-olives', price: 10.8, was: 15 },
          { id: 'salad-quinoa', price: 12.8, was: 17 },
        ],
      },
    ],
  },

  // Qeu Coffee's «قهوة باردة» — every drink 16 oz — and, from «مشروبات للجمعات», the box.
  coffee: {
    capturedAt: '2026-09-26',
    drinks: [
      { id: 'spanish', price: 9.8, was: 16 },
      { id: 'latte', price: 9.8, was: 16 },
      { id: 'pistachio', price: 9.8, was: 16 },
      { id: 'americano', price: 5.8, was: 9 },
    ],
    box: { price: 19.8, was: 27 },
  },
};
