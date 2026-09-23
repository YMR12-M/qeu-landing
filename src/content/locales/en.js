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
    ogImageAlt: 'The Q logo — all the deals in one place',
  },

  a11y: {
    skipToContent: 'Skip to content',
    home: 'Q — home',
    primaryNav: 'Main navigation',
    storeLinks: 'Download the app',
    switchLocale: 'عرض الصفحة بالعربي',
    pauseMotion: 'Pause background animation',
    playMotion: 'Play background animation',
    sectionsMenu: 'Page sections',
  },

  nav: {
    items: [
      { id: 'why', label: 'Why Q' },
      { id: 'inside', label: 'Inside the app' },
      { id: 'faq', label: 'FAQ' },
      { id: 'download', label: 'Download' },
    ],
    download: 'Get Q',
    switchLocale: 'ع',
    here: 'You’re here',
  },

  hero: {
    titleLines: ['An app that’s all deals,', 'from start to finish'],
    titleAccent: 'with prices you won’t find anywhere else',
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
    title: 'Why {brand}?',
    lead: 'Because Q brings together the best deals, the lowest prices and ready-made collections in one simple, clear experience — shop faster, easier and for less.',
    items: [
      {
        id: 'deals',
        title: '1+1 Free Deals',
        text: 'Discover the best available deals on your daily products, from 1+1 offers to clear and simple discounts — all in one place.',
        imageAlt: 'The Q app home screen: a super deal on Al Fakhama rice with Al Fakhama oil free',
      },
      {
        id: 'search',
        title: 'Search & Browsing',
        text: 'Find any product quickly or browse categories with ease. Enjoy a smooth, organized experience without complications.',
        imageAlt:
          'The categories screen in the Q app with the search bar: groceries, and fresh produce like fruit and vegetables',
      },
      {
        id: 'prices',
        title: 'Lowest Prices',
        text: 'Save money with products that offer the lowest price in their category. Everything is displayed clearly to help you choose fast.',
        imageAlt:
          'Products in the Q app with their price before and after the discount, and the size under each one',
      },
      {
        id: 'picks',
        title: 'Personalized Picks',
        text: 'Get product suggestions tailored to your taste and needs, so you can discover the right items faster — without overthinking or scrolling forever.',
        imageAlt:
          'Q-ur, the smart assistant in the Q app, suggesting “Kabsa ingredients” in one list with an “Add all” button',
      },
    ],
  },

  inside: {
    eyebrow: 'How it works',
    title: 'Our deals come to you — at the same price',
    lead: 'A simple, clear shopping experience with secure payment options and fast, organized delivery right to your door.',
    steps: [
      {
        id: 'offers',
        title: 'Browse the deals',
        text: 'A wide range of products, with standout deals and prices you’ll only find on Q.',
        imageAlt:
          'The Q app home screen: a five-can Coca-Cola deal and the “prices you’ll only find on Q” section',
      },
      {
        id: 'picks',
        title: 'Choose and order',
        text: 'Add what you need to your cart and order in seconds, with secure payment options.',
        imageAlt:
          'The “Our picks for you” section of the Q app: products with their price before and after the discount, each with an add button',
      },
      {
        id: 'delivery',
        title: 'Get it at your door',
        text: 'Fast, organized delivery — and you track your order step by step.',
        imageAlt:
          'The order review screen in the Q app, next to a Q delivery van reading “Our deals come to you at the same price”',
      },
    ],
  },

  faq: {
    eyebrow: 'Before you download',
    title: 'Got a question?',
    lead: 'We printed the answers on one receipt: short, clear and free of charge.',
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
        answer: 'iPhone, and Android phones running Android {androidMin} or later.',
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

  stats: {
    downloads: {
      unit: { thousand: 'K+', million: 'M+' },
      label: 'downloads on Google Play in the {months} since launch',
    },
    rating: { label: 'rating from phone users on Google Play' },
    fiveStar: { unit: '%', label: 'of phone ratings are 5 stars ({count} ratings)' },
    count: { label: 'phone ratings · {allRatings} in total' },
  },

  download: {
    title: 'Get {brand}',
    subtitle: 'Free on your phone',
    text: 'Available for iPhone and Android. Scan the code or pick your store — the app is free, and the deals start on the very first screen.',
    source: 'Source: the app’s official Google Play page ({package}), captured {capturedOn}.',
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
    tagline: { before: 'Everything in Q is a', offer: 'deal' },
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
      store: 'Q on Google Play',
    },
    more: {
      title: 'Contents',
      privacy: 'Privacy policy',
    },
    sourceLine: 'Q · {package} · figures from the official Google Play page',
    legal: '© {year} {company} — Al-Rehab District, Jeddah',
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
