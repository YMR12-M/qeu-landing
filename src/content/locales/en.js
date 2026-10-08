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
      alt: 'Q: “Make your shopping easier, and your deals better!” and a “Get Q for free” button, beside the app’s screens with their deal flags, and its price: free',
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
    card: {
      title: 'Get Q on your phone',
      text: 'Scan the code with your phone’s camera — it opens your phone’s store.',
      or: 'or get it from',
      note: 'Free on iPhone and Android',
    },
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
    // What it is, under the headline: the things the app brings, and that it brings them to the
    // door — all said elsewhere on the page and in the Google Play listing.
    lead: 'Groceries, meals and coffee, delivered to your door.',
    note: '{downloads}+ downloads in {months}',
    // The way on from the download button: to how an order works. And the caption of the
    // download code beside the headline, on a computer.
    explore: 'See how it works',
    scan: 'Scan to get it',
    // The page no longer prints these under the screens (the screens say their own words); the
    // link-preview image does (scripts/og-images.js). The app's own price is circled beside the
    // headline.
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
    lead: 'Because it puts the best deals and the lowest prices on one shelf.',
    // Phones, under the row of four: it is swiped.
    swipe: 'Swipe for the rest',
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
        text: 'Get product suggestions tailored to your taste and needs, so you can find the right items faster.',
        imageAlt:
          'Q-ur, the smart assistant in the Q app, suggesting “Kabsa ingredients” in one list with an “Add all” button',
      },
    ],
  },

  // The departments and categories are translated; the way to them (`inApp`) stays in Arabic,
  // as the app writes it.
  aisles: {
    title: 'Everything you want —',
    titleAccent: 'it’s all in Q',
    lead: '{departments} departments and over {categories} categories — from rice and vegetables to headphones.',
    legend: 'Choose a department',
    directory: 'Store directory',
    where: 'In the app:',
    tab: 'الأقسام',
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

  // The app is Arabic, so its signs stay Arabic (the cup's label) and so does the way to the
  // tab (`path`); the products are translated.
  foods: {
    title: 'Not cooking today?',
    struck: 'cooking',
    titleAccent: 'Leave it to Q Foods',
    lead: 'Sandwiches, hummus and salads made by Q itself, ordered with your groceries.',
    shelvesLabel: 'Q Foods shelves',
    seal: { main: 'Made by', sub: 'Q' },
    offer: 'Deal',
    from: 'From',
    shelves: {
      clubs: 'Clubs & croissant rolls',
      minis: 'Minis & jumbos',
      dips: 'Dips & salads',
    },
    products: {
      'club-tuna': { name: 'Spicy tuna club with arugula', size: '1 piece' },
      'club-halloumi': { name: 'Halloumi club', size: '1 piece' },
      'club-shakshuka': { name: 'Shakshuka club', size: '100 g' },
      'club-caesar': { name: 'Chicken Caesar club', size: '1 piece' },
      'croissant-lotus': { name: 'Lotus croissant roll', size: '1 piece' },
      'croissant-pistachio': { name: 'Pistachio croissant roll', size: '1 piece' },
      'mini-falafel': { name: 'Falafel mini on milk bread', size: '115 g' },
      'mini-mortadella': { name: 'Mortadella mini on olive bread', size: '100 g' },
      'jumbo-shawarma': { name: 'Chicken shawarma jumbo', size: '1 piece' },
      'jumbo-turkey': { name: 'Turkey jumbo', size: '1 piece' },
      'jumbo-caesar': { name: 'Chicken Caesar jumbo', size: '1 piece' },
      'multigrain-turkey': { name: 'Turkey on multigrain', size: '1 piece' },
      'hummus-classic': { name: 'Classic hummus', size: '250 g' },
      'hummus-cilantro': { name: 'Hummus with cilantro', size: '250 g' },
      'hummus-foul': { name: 'Foul and hummus', size: '250 g' },
      'hummus-beiruti': { name: 'Beiruti hummus', size: '250 g' },
      'labneh-olives': { name: 'Labneh with black olives', size: '250 g' },
      'salad-quinoa': { name: 'Quinoa tabbouleh', size: '1 pack' },
    },
    where: 'And more in the app, under:',
    path: ['المنتجات الطازجة', 'كيو فودز'],
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
  },

  prices: {
    price: 'SAR {n}',
    was: 'was',
    source: 'Prices as shown in the Q app on {date}; they may change.',
  },

  inside: {
    arrived: 'Your order’s here',
    title: 'Our deals come to you — at the same price',
    lead: 'Simple shopping, secure payment options, and delivery right to your door.',
    steps: [
      {
        id: 'offers',
        title: 'Browse the deals',
        text: 'Standout deals, and prices you’ll only find on Q.',
        imageAlt:
          'From the Q app: the deals screen, a drinks offer and the «prices you’ll only find on Q» section',
      },
      {
        id: 'picks',
        title: 'Choose and order',
        text: 'Add what you need to your cart, and order in seconds.',
        imageAlt:
          'From the Q app: «picked for you» products with their prices before and after the discount, and a + button to add to the cart',
      },
      {
        id: 'delivery',
        title: 'Get it at your door',
        text: 'Fast, organized delivery — and you track your order step by step.',
        imageAlt: 'From the Q app: the order review screen, with a Q van and its logo behind it',
      },
    ],
  },

  faq: {
    title: 'Got a question?',
    lead: 'We printed the answers on one receipt: short and clear.',
    ticket: {
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

  // The store figures, in the words of the app's nutrition-facts label.
  stats: {
    title: 'Nutrition Facts',
    product: 'for the Q app',
    serving: { label: 'Serving size', value: '1 app' },
    amount: 'Amount per serving',
    downloads: {
      name: 'Downloads',
      unit: { thousand: 'K+', million: 'M+' },
      detail: 'on Google Play in the {months} since launch',
    },
    rating: { name: 'Rating', detail: 'from phone users on Google Play' },
    fiveStar: { name: '5-star ratings', suffix: '%', detail: '{count} phone ratings' },
    count: { name: 'Ratings', detail: 'from phones · {allRatings} in total' },
    price: { name: 'Price', value: 'Free', detail: 'on the App Store and Google Play' },
    source: 'Figures from Q’s Google Play page, {date}.',
  },

  download: {
    title: 'Get Q',
    subtitle: 'Free on your phone',
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
    // The order's delivery label, written in the footer.
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
