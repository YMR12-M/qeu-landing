/**
 * «أقسام كيو» — the app's departments and the categories in each, in the app's order (the
 * home screen and the «الأقسام» tab list them the same way, right to left, from screenshots
 * of the app provided 27 September 2026). Names are copy (locales → aisles.departments); each
 * category's picture is the app's own, from those screenshots (src/assets/images/departments).
 *
 * The departments with eight categories show eight on the home screen, so there may be more
 * behind the app's «عرض الكل»: the page says "more than" of the total, never "exactly".
 */
export const DEPARTMENTS = [
  {
    id: 'groceries',
    categories: ['frozen', 'rice', 'pasta', 'cooking', 'sauces', 'spices', 'canned', 'breakfast'],
  },
  {
    id: 'fresh',
    categories: ['bakery', 'seafood', 'fruit', 'vegetables', 'meat', 'dairy', 'cheese', 'qfoods'],
  },
  {
    id: 'drinks',
    categories: [
      'cakes',
      'specialty-coffee',
      'water',
      'juices',
      'soft-drinks',
      'tea',
      'sweets',
      'ice-cream',
    ],
  },
  {
    id: 'home',
    categories: ['cleaners', 'laundry', 'fresheners', 'tissues', 'paper', 'household', 'pets'],
  },
  {
    id: 'care',
    categories: ['skin', 'hair', 'body', 'personal', 'baby', 'health', 'makeup'],
  },
  {
    id: 'tech',
    categories: ['phone', 'appliances', 'audio', 'electrical', 'qhome', 'office', 'qtoys'],
  },
];

/** How many categories the departments show between them (45 when this was written). */
export const CATEGORY_COUNT = DEPARTMENTS.reduce(
  (count, department) => count + department.categories.length,
  0,
);
