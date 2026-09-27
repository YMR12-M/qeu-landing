/**
 * English copy — served at /english.
 *
 * The brand is "Q" in English, as on qeu.app/english and the store listing ("كيو | Q").
 * Benefit texts and the Q-ur line are quoted from qeu.app/english; the rest translates
 * the Arabic source (listed in README → Content sources for client review), in the same
 * US spelling as the quoted lines. {tokens} work as in ar.js.
 */

const en = {
  meta: {
    title: 'Q Shopping App - Easy Grocery Deals & Lowest Prices',
    description:
      'Discover Q — the smart grocery shopping app with great deals, the lowest prices and a clear, easy browsing experience for your everyday needs.',
    siteName: 'Q',
    // The link-preview image (scripts/og-images.js draws it from the hero and this line).
    ogImage: {
      alt: 'Q: “Make your shopping easier, and your deals better!” and a “Get Q for free” button, beside the app’s screens on a shelf of deals',
      stores: 'on Google Play and the App Store',
    },
  },

  a11y: {
    skipToContent: 'Skip to content',
    home: 'Q — home',
    primaryNav: 'Main navigation',
    storeLinks: 'Download the app',
    switchLocale: 'عرض الصفحة بالعربي',
    switchSite: 'عرض الموقع بالعربي',
    pauseMotion: 'Pause background animation',
    playMotion: 'Play background animation',
    sectionsMenu: 'Page sections',
  },

  nav: {
    items: [
      { id: 'why', label: 'Why Q' },
      { id: 'departments', label: 'Departments' },
      { id: 'assistant', label: 'Ask Q-ur' },
      { id: 'kitchen', label: 'Foods & Coffee' },
      { id: 'inside', label: 'How it works' },
      { id: 'faq', label: 'FAQ' },
      { id: 'download', label: 'Download' },
    ],
    download: 'Get Q',
    switchLocale: 'ع',
    here: 'You’re here',
    progress: '{n} of {total}',
  },

  hero: {
    // The hero line on qeu.app/english.
    titleLines: ['Make your shopping easier,'],
    titleAccent: 'and your deals better!',
    cta: {
      default: 'Get Q for free',
      ios: 'Download free on the App Store',
      android: 'Download free on Google Play',
    },
    note: '{downloads}+ downloads in {months}',
    // The shelf: every product's label is an offer; the names echo the store screenshots.
    shelf: {
      offer: 'Deal',
      labels: {
        picks: 'Picked for you',
        assistant: 'AI helper',
        delivery1: 'Deals to you',
        delivery2: 'Same price',
        offers: 'All deals',
        smart: 'Gets you',
      },
      app: 'The Q app',
      price: 'Free',
    },
  },

  why: {
    title: 'Why Q?',
    lead: 'Because it brings you the best deals and the lowest prices in one simple experience.',
    items: [
      {
        id: 'deals',
        title: '1+1 Free Deals',
        sticker: { main: '1+1', sub: 'FREE' },
        text: 'Discover the best available deals on your daily products, from 1+1 offers to clear and simple discounts — all in one place.',
        imageAlt: 'The Q app home screen: a super deal on Al Fakhama rice with Al Fakhama oil free',
      },
      {
        id: 'search',
        title: 'Search & Browsing',
        sticker: { main: 'Search', sub: 'with ease' },
        text: 'Find any product quickly or browse categories with ease. Enjoy a smooth, organized experience without complications.',
        imageAlt:
          'The categories screen in the Q app with the search bar: groceries, and fresh produce like fruit and vegetables',
      },
      {
        id: 'prices',
        title: 'Lowest Prices',
        sticker: { main: 'Lowest', sub: 'prices' },
        text: 'Save money with products that offer the lowest price in their category. Everything is displayed clearly to help you choose fast.',
        imageAlt:
          'Products in the Q app with their price before and after the discount, and the size under each one',
      },
      {
        id: 'picks',
        title: 'Personalized Picks',
        sticker: { main: 'Picked', sub: 'for you' },
        text: 'Get product suggestions tailored to your taste and needs, so you can discover the right items faster — without overthinking or scrolling forever.',
        imageAlt:
          'Q-ur, the smart assistant in the Q app, suggesting “Kabsa ingredients” in one list with an “Add all” button',
      },
    ],
  },

  // The departments and categories are translated; the way to them (`inApp`) stays in Arabic,
  // as the app writes it.
  aisles: {
    eyebrow: 'Departments',
    title: 'Everything you want —',
    titleAccent: 'it’s all in Q',
    lead: '{departments} departments and over {categories} categories — from rice and vegetables to headphones.',
    sticker: 'categories',
    legend: 'Choose a department',
    shelf: { previous: 'Previous categories', next: 'More categories' },
    where: 'In the app:',
    tab: 'الأقسام',
    cta: 'Get Q and shop every department',
    departments: {
      groceries: {
        name: 'Groceries',
        inApp: 'المقاضي',
        categories: {
          frozen: 'Frozen food',
          rice: 'Rice & grains',
          pasta: 'Pasta & noodles',
          cooking: 'Cooking essentials',
          sauces: 'Sauces & dressings',
          spices: 'Spices & seasonings',
          canned: 'Tuna & canned food',
          breakfast: 'Breakfast',
        },
      },
      fresh: {
        name: 'Fresh',
        inApp: 'المنتجات الطازجة',
        categories: {
          bakery: 'Bakery',
          seafood: 'Seafood',
          fruit: 'Fruit',
          vegetables: 'Vegetables',
          meat: 'Fresh chicken & meat',
          dairy: 'Eggs & milk products',
          cheese: 'Cheese & dairy products',
          qfoods: 'Q Foods',
        },
      },
      drinks: {
        name: 'Drinks & treats',
        inApp: 'المشروبات والمفرحات',
        categories: {
          cakes: 'Cakes & biscuits',
          'specialty-coffee': 'Specialty coffee',
          water: 'Water & ice',
          juices: 'Juices',
          'soft-drinks': 'Soft drinks',
          tea: 'Instant drinks & tea',
          sweets: 'Sweets & snacks',
          'ice-cream': 'Ice cream',
        },
      },
      home: {
        name: 'Home care',
        inApp: 'العناية بالمنزل',
        categories: {
          cleaners: 'Cleaners & disinfectants',
          laundry: 'Laundry',
          fresheners: 'Air fresheners',
          tissues: 'Tissues & scented wipes',
          paper: 'Paper & plastic goods',
          household: 'Household products',
          pets: 'Pet supplies',
        },
      },
      care: {
        name: 'Q Care',
        inApp: 'كيو كير',
        categories: {
          skin: 'Skin care',
          hair: 'Hair care',
          body: 'Body care',
          personal: 'Personal care',
          baby: 'Baby products',
          health: 'Health essentials',
          makeup: 'Makeup',
        },
      },
      tech: {
        name: 'Q Tech',
        inApp: 'كيو تيك',
        categories: {
          phone: 'Phone accessories',
          appliances: 'Small home appliances',
          audio: 'Headphones',
          electrical: 'Electrical supplies',
          qhome: 'Q Home',
          office: 'Office supplies',
          qtoys: 'Q Toys',
        },
      },
    },
  },

  // The section around the replayed conversation, which stays in Arabic: so is the app.
  assistant: {
    eyebrow: 'The smart assistant in Q',
    name: 'Q-ur',
    title: 'Ask Q-ur about your dish',
    lead: 'Ask it about a dish like kabsa, and it puts the ingredients in one list.',
    steps: ['Ask about a dish', 'Q-ur lists the ingredients', 'Add them all in one tap'],
    cta: 'Get Q and try Q-ur',
    demoLabel: 'A chat with Q-ur in the Q app, in Arabic like the app',
    hint: 'Try it yourself: tap',
    hintAfter: '(Add all)',
    done: 'Added to the cart',
    added: 'The kabsa ingredients were added to the cart: 15 products for SAR 179',
    replay: 'Replay the chat',
  },

  kitchen: {
    title: 'Q Foods and Q Coffee',
    legend: 'Show',
    tabs: { foods: 'Q Foods', coffee: 'Q Coffee' },
  },

  // The app is Arabic, so its signs stay Arabic (the fridge's, the menu board's) and so does
  // the way to the tab (`path`); the products are translated.
  foods: {
    title: 'Not cooking today?',
    titleAccent: 'Leave it to Q Foods',
    lead: 'Meals and sandwiches made by Q itself, ordered with your groceries.',
    fridgeLabel: 'The Q Foods fridge',
    sign: 'فودز',
    seal: { main: 'Made by', sub: 'Q' },
    offer: 'Deal',
    products: {
      omelette: {
        name: 'Omelette club',
        size: '130 g',
        imageAlt: 'An omelette club sandwich in a pack printed with the Q logo',
      },
      tuna: {
        name: 'Spicy tuna club with arugula',
        size: '1 piece',
        imageAlt: 'A spicy tuna club sandwich with arugula in a pack printed with the Q logo',
      },
      meal: {
        name: 'Dawood Basha with rice',
        size: '150×150 g',
        imageAlt: 'A tray of Dawood Basha with rice: white rice, and meatballs in tomato sauce',
      },
    },
    also: { label: 'Also in the app:', items: ['Appetizers & dips', 'Salads'] },
    where: 'In the app, under:',
    path: ['المنتجات الطازجة', 'كيو فودز'],
    cta: 'Get Q and order your meal',
  },

  coffee: {
    title: 'How do you take your coffee?',
    titleAccent: 'Q Coffee makes it for you',
    lead: 'Your iced coffee at deal prices, delivered with your groceries.',
    sign: 'كوفي',
    menu: {
      legend: 'Pick your drink',
      cold: 'Iced coffee',
      gatherings: 'Drinks for gatherings',
    },
    drinks: {
      spanish: { name: 'Iced Spanish latte', size: '16 oz' },
      latte: { name: 'Iced latte', size: '16 oz' },
      pistachio: { name: 'Iced pistachio latte', size: '16 oz' },
      americano: { name: 'Iced Americano', size: '16 oz' },
    },
    box: {
      name: 'Coffee of the day box, iced',
      size: '1.2 L',
      imageAlt: 'The coffee of the day box: a coffee carton with a tap, cups and a cup of ice',
    },
    hint: 'Pick from the menu — we’ll pour it',
    also: { label: 'Also in the app:', items: ['Iced tea', 'Coffee of the day'] },
    where: 'In the app, under:',
    path: ['المنتجات الطازجة', 'كيو كوفي'],
    cta: 'Get Q and order your coffee',
  },

  prices: {
    price: 'SAR {n}',
    was: 'was',
    source: 'Prices as shown in the Q app on {date}; they may change.',
  },

  inside: {
    eyebrow: 'How it works',
    arrived: 'Your order’s here',
    title: 'Our deals come to you — at the same price',
    lead: 'Simple shopping, secure payment options, and delivery right to your door.',
    steps: [
      {
        id: 'offers',
        title: 'Browse the deals',
        text: 'Standout deals, and prices you’ll only find on Q.',
      },
      {
        id: 'picks',
        title: 'Choose and order',
        text: 'Add what you need to your cart, and order in seconds.',
      },
      {
        id: 'delivery',
        title: 'Get it at your door',
        text: 'Fast, organized delivery — and you track your order step by step.',
      },
    ],
  },

  faq: {
    eyebrow: 'Before you download',
    title: 'Got a question?',
    lead: 'We printed the answers on one receipt: short and clear.',
    ticket: {
      take: 'Take a number',
      now: 'Now serving',
      label: 'Your number',
      question: 'Your question isn’t on the receipt?',
      action: 'Email us',
    },
    receipt: {
      title: 'Question receipt',
      count: { one: '{n} question', other: '{n} questions' },
      columns: { question: 'Question', answer: 'Answer' },
      total: 'Total',
      totalValue: 'Free',
      thanks: 'Thanks for choosing Q',
      more: 'Print the other questions ({n})',
      less: 'Fold the questions back',
    },
    items: [
      {
        id: 'free',
        question: 'Is Q free?',
        answer:
          'Yes. Q is free to download on the App Store and Google Play, and the deals start on the very first screen.',
      },
      {
        id: 'devices',
        question: 'Which phones does Q work on?',
        answer:
          'iPhone with iOS {iosMin} or later, and Android phones running Android {androidMin} or later.',
      },
      {
        // Only asked in English: the app's screens are Arabic (as its store screenshots show),
        // and English speakers should know before they download.
        id: 'language',
        question: 'Is the app in English?',
        answer: 'The app is in Arabic.',
      },
      {
        id: 'deals',
        question: 'What kind of deals does Q have?',
        answer:
          '1+1 free offers, clear discounts on everyday products, and prices you’ll only find on Q.',
      },
      {
        id: 'order',
        question: 'How do I order?',
        answer:
          'Browse the deals, add what you need to your cart and order in seconds, with secure payment options.',
      },
      {
        id: 'tracking',
        question: 'Can I track my order?',
        answer:
          'Yes, right in the app: you follow your order step by step until it reaches your door.',
      },
      {
        id: 'assistant',
        question: 'Who is Q-ur?',
        answer:
          'Q-ur is the smart assistant in the Q app. Ask it about a dish like kabsa, and it puts the ingredients in one list you add to your cart with “Add all”.',
      },
      {
        id: 'support',
        question: 'How do I reach you?',
        answer:
          'If anything goes wrong in the app, email us at {email}, or use “Report a problem in the app” at the bottom of this page.',
      },
    ],
  },

  // The store figures, printed as the app's nutrition-facts label.
  stats: {
    title: 'Nutrition Facts',
    product: 'for the Q app',
    serving: { label: 'Serving size', value: '1 app' },
    downloads: {
      name: 'Downloads',
      unit: { thousand: 'K+', million: 'M+' },
      detail: 'on Google Play in the {months} since launch',
    },
    rating: { name: 'Rating', detail: 'from phone users on Google Play' },
    fiveStar: { name: '5-star ratings', unit: '%', detail: '{count} phone ratings' },
    count: { name: 'Ratings', detail: 'from phones · {allRatings} in total' },
    price: { name: 'Price', value: 'Free', detail: 'on the App Store and Google Play' },
    source: 'Figures from Q’s Google Play page, {date}.',
  },

  download: {
    title: 'Get Q',
    subtitle: 'Free on your phone',
    sticker: 'FREE',
    text: 'For iPhone and Android, and the deals start on the very first screen. The app itself is in Arabic.',
    stageAlt:
      'The Q app home screen: a super deal on Al Fakhama rice with Al Fakhama oil free, and the “prices you’ll only find on Q” section',
  },

  stores: {
    appStore: 'App Store',
    googlePlay: 'Google Play',
  },

  qr: {
    title: 'Browsing on a computer?',
    text: 'Scan the code with your phone camera to get Q.',
    alt: 'QR code that opens the Q app download link',
  },

  footer: {
    // The slogan on qeu.app/english: “Our Prices are Offers!”.
    tagline: { before: 'Our prices are', offer: 'offers' },
    // The delivery sticker on the bag the order comes in.
    sticker: {
      title: 'Your order’s here',
      from: 'From',
      fromValue: 'Q',
      to: 'To',
      toValue: 'your door',
    },
    contact: {
      title: 'Contact us',
      report: 'Report a problem in the app',
      reportSubject: 'Problem in the Q app',
      googlePlay: 'Q on Google Play',
      appStore: 'Q on the App Store',
    },
    more: {
      title: 'Contents',
      privacy: 'Privacy policy',
    },
    sourceLine: 'Q · {package}',
    legal: '© {year} {company} — Al-Rehab District, Jeddah',
  },

  // Same shape as ar.js; the 404 page itself is Arabic, with a line in English.
  notFound: {
    title: 'Page not found — Q',
    eyebrow: 'Error 404',
    heading: 'This page isn’t on the shelf',
    text: 'The link may be old or mistyped. All the deals are on the home page, and in the app itself.',
    home: 'Home page',
    english: 'This page doesn’t exist — see Q in English',
    flag: 'Sold out',
    name: 'The page you asked for',
  },

  /** How the figures are written; {n} is the number. */
  numbers: {
    thousand: '{n}K',
    million: '{n}M',
    months: { one: '{n} month', other: '{n} months' },
  },

  dates: {
    format: '{day} {month} {year}',
    months: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
  },
};

export default en;
