/**
 * «كيو فودز» and «كيو كوفي» — Qeu's own food and coffee, as the Qeu app lists them under
 * «المنتجات الطازجة» (screenshots of the app's two tabs, provided 26 September 2026).
 *
 * The prices are the app's, in riyals: `price` is what the app charges, `was` the price it
 * strikes through. They are the deal prices of the day they were read, so the sections print
 * that date beside them ({date}, from `capturedAt`): when the app's prices change, update them
 * here. Names and sizes are copy (locales → foods.products, coffee.drinks), in both languages.
 */
export const MENU = {
  capturedAt: '2026-09-26',

  // Qeu Foods, shelf by shelf, in the app's order (right to left): the sandwiches, then the
  // ready meals. The app's other two shelves, «مقبلات وغموس» and «سلطات», are only named.
  foods: [
    { id: 'omelette', shelf: 'sandwiches', price: 4.8, was: 10 },
    { id: 'tuna', shelf: 'sandwiches', price: 8.8, was: 13 },
    { id: 'meal', shelf: 'meals', price: 11.8, was: 15 },
  ],

  // Qeu Coffee's «قهوة باردة» — every drink 16 oz — and, from «مشروبات للجمعات», the box.
  coffee: {
    drinks: [
      { id: 'spanish', price: 9.8, was: 16 },
      { id: 'latte', price: 9.8, was: 16 },
      { id: 'pistachio', price: 9.8, was: 16 },
      { id: 'americano', price: 5.8, was: 9 },
    ],
    box: { price: 19.8, was: 27 },
  },
};
