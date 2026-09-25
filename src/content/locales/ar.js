/**
 * Arabic copy — the default locale.
 *
 * Structure and wording follow the Qeu Landing v3 design, with its claims checked against
 * the sources (qeu.app, the Google Play listing, Qeu's own app and store screenshots —
 * see README → Content sources). Lines v3 invented, or that only half-matched a source,
 * were corrected. `{tokens}` are filled in by the components; the store figures the copy
 * quotes ({downloads}, {months}…) come from src/content/site.js via src/content/figures.js.
 */

const ar = {
  meta: {
    title: 'تطبيق كيو للتسوق - عروض المقاضي وأسعار أقل',
    description:
      'اكتشف تطبيق كيو — تطبيق التسوق الذكي للمقاضي بعروض مميزة، أقل الأسعار، وتجربة تصفح واضحة وسهلة لتلبية احتياجاتك اليومية.',
    siteName: 'كيو',
    // The link-preview image (scripts/og-images.js draws it from the hero and this line).
    ogImage: {
      alt: 'كيو: «تطبيق كله عروض من أوله إلى آخره، وأسعار ما تلاقيها إلا فيه» وزر «حمّل كيو مجاناً»، بجانب شاشات التطبيق على رف العروض',
      stores: 'على Google Play و App Store',
    },
  },

  a11y: {
    skipToContent: 'تخطَّ إلى المحتوى',
    home: 'كيو — الصفحة الرئيسية',
    primaryNav: 'القائمة الرئيسية',
    storeLinks: 'حمّل التطبيق من المتجر',
    switchLocale: 'View this page in English',
    switchSite: 'View the site in English',
    pauseMotion: 'إيقاف حركة الخلفية',
    playMotion: 'تشغيل حركة الخلفية',
    sectionsMenu: 'أقسام الصفحة',
  },

  nav: {
    items: [
      { id: 'why', label: 'ليش كيو' },
      { id: 'assistant', label: 'اسأل كيور' },
      { id: 'inside', label: 'داخل التطبيق' },
      { id: 'faq', label: 'الأسئلة' },
      { id: 'download', label: 'حمّل التطبيق' },
    ],
    download: 'حمّل كيو',
    switchLocale: 'EN',
    here: 'أنت هنا',
  },

  hero: {
    titleLines: ['تطبيق كله عروض', 'من أوله إلى آخره'],
    titleAccent: 'وأسعار ما تلاقيها إلا فيه',
    cta: {
      default: 'حمّل كيو مجاناً',
      ios: 'حمّله مجاناً من App Store',
      android: 'حمّله مجاناً من Google Play',
    },
    note: 'أكثر من {downloads} تنزيل في {months}',
    // The shelf: every product's label is an offer; the names echo the store screenshots.
    shelf: {
      offer: 'عرض',
      labels: {
        picks: 'اخترناها لك',
        assistant: 'مساعد ذكي',
        delivery1: 'عروضنا تجيك',
        delivery2: 'بنفس السعر',
        offers: 'كله عروض',
        smart: 'يفهمك',
      },
      app: 'تطبيق كيو',
      price: 'مجاناً',
    },
  },

  why: {
    title: 'ليش {brand}؟',
    lead: 'لأن كيو يجمع لك أفضل العروض، أقل الأسعار، والتشكيلات الجاهزة في تجربة واحدة بسيطة وواضحة — تسوّق أسرع، وأسهل، وأوفر.',
    items: [
      {
        id: 'deals',
        title: 'عروض ١+١ مجاناً',
        sticker: { main: '١+١', sub: 'مجاناً' },
        text: 'اكتشف أفضل العروض المتاحة على المنتجات اليومية، من ١+١ مجاناً إلى الخصومات الواضحة، وكلها في مكان واحد.',
        imageAlt: 'الشاشة الرئيسية في تطبيق كيو: عرض السوبر «أرز الفخامة + زيت الفخامة مجاناً»',
      },
      {
        id: 'search',
        title: 'بحث وتصفّح بسيط',
        sticker: { main: 'ابحث', sub: 'بسهولة' },
        text: 'ابحث عن أي منتج بسرعة، أو تصفّح الأقسام بسهولة بفضل واجهة واضحة تساعدك توصل للي تبيه بدون تعقيد.',
        imageAlt:
          'شاشة الأقسام في تطبيق كيو مع خانة البحث: المقاضي، والمنتجات الطازجة مثل الفواكه والخضروات',
      },
      {
        id: 'prices',
        title: 'أقل الأسعار',
        sticker: { main: 'أقل', sub: 'سعر' },
        text: 'وفّر وقتك وشوف المنتجات اللي تقدم أقل سعر بكل وضوح، مع عرض الحجم والسعر بطريقة تساعدك تختار بسرعة.',
        imageAlt: 'منتجات في تطبيق كيو بسعرها قبل الخصم وبعده، مع الحجم تحت كل منتج',
      },
      {
        id: 'picks',
        title: 'اقتراحات تناسبك',
        // The screen's own heading: «منتجات اخترناها لك!»
        sticker: { main: 'اخترناها', sub: 'لك' },
        text: 'نقترح لك منتجات تناسب ذوقك واحتياجك، عشان تختار أسرع وبكل ثقة — بدون لف ودوران.',
        imageAlt:
          'كيور، المساعد الذكي في تطبيق كيو، يقترح «مكونات الكبسة» في قائمة وحدة مع زر «أضف الكل»',
      },
    ],
  },

  // «اسأل كيور»: the section around the replayed conversation (src/content/assistant-chat.js).
  // It says only what the FAQ's answer about كيور says, from the same screenshot.
  assistant: {
    eyebrow: 'المساعد الذكي في كيو',
    name: 'كيور', // drawn in the assistant's colours wherever the title names it
    title: 'اسأل كيور عن طبختك',
    lead: 'اسأله عن طبخة مثل الكبسة، ويجهّز لك مكوناتها في قائمة وحدة تضيفها للسلة بزر «أضف الكل».',
    steps: ['اسأل عن الطبخة', 'كيور يجهّز مكوناتها', 'أضف الكل للسلة بضغطة'],
    cta: 'حمّل كيو وجرّب كيور',
    demoLabel: 'محادثة مع كيور في تطبيق كيو',
    hint: 'جرّبها بنفسك: اضغط',
    hintAfter: '',
    done: 'تمّت الإضافة للسلة',
    // Announced to screen readers when «أضف الكل» is pressed.
    added: 'أُضيفت مكونات الكبسة للسلة: ١٥ منتج بـ ١٧٩ ر.س',
    replay: 'أعد المحادثة',
  },

  inside: {
    eyebrow: 'كيف يشتغل',
    // Over the house when the van arrives: the footer's sticker says it too.
    arrived: 'طلبك وصل',
    title: 'عروضنا تجيك وبنفس السعر',
    lead: 'نقدّم تجربة شراء بسيطة وواضحة، مع خيارات دفع آمنة وتوصيل سريع ومنظّم لحد باب بيتك.',
    steps: [
      {
        id: 'offers',
        title: 'تصفّح العروض',
        text: 'تشكيلة واسعة من المنتجات، وعروض للتاريخ وأسعار ما تلاقيها إلا في كيو.',
        imageAlt:
          'الشاشة الرئيسية في تطبيق كيو: عرض خمسة حبات كوكاكولا، وقسم «أسعار ما تلاقيها إلا في كيو»',
      },
      {
        id: 'picks',
        title: 'اختار واطلب',
        text: 'أضف اللي تبيه للسلة واطلب خلال ثواني، مع خيارات دفع آمنة.',
        imageAlt:
          'قسم «اختياراتنا لك» في تطبيق كيو: منتجات بسعرها قبل الخصم وبعده، وزر إضافة لكل منتج',
      },
      {
        id: 'delivery',
        title: 'استلم لحد بابك',
        text: 'توصيل سريع ومنظّم، وتتابع طلبك خطوة بخطوة.',
        imageAlt:
          'شاشة مراجعة الطلب في تطبيق كيو، وسيارة توصيل كيو مكتوب عليها «عروضنا تجيك وبنفس السعر»',
      },
    ],
  },

  // Every answer restates what the page and the Google Play listing already say — nothing new
  // is promised here (no delivery areas, fees or payment brands: the sources don't give them).
  faq: {
    eyebrow: 'قبل ما تحمّل',
    title: 'عندك سؤال؟',
    lead: 'جمعنا لك الأجوبة في فاتورة وحدة: واضحة ومختصرة.',
    // The take-a-number ticket beside the receipt: now serving the last question, yours is next.
    ticket: {
      take: 'خذ رقمك',
      now: 'الدور الحالي',
      label: 'رقمك',
      question: 'سؤالك مو في الفاتورة؟',
      action: 'راسلنا',
    },
    receipt: {
      title: 'فاتورة أسئلة',
      count: {
        one: 'سؤال واحد',
        two: 'سؤالين',
        few: '{n} أسئلة',
        many: '{n} سؤال',
        other: '{n} سؤال',
      },
      columns: { question: 'السؤال', answer: 'الجواب' },
      total: 'الإجمالي',
      totalValue: 'مجاناً',
      thanks: 'شكراً لاختيارك كيو',
    },
    items: [
      {
        id: 'free',
        question: 'هل تطبيق كيو مجاني؟',
        answer: 'أكيد. تحميل كيو مجاني على App Store و Google Play، والعروض تبدأ من أول شاشة.',
      },
      {
        id: 'devices',
        question: 'على أي جوال يشتغل كيو؟',
        answer:
          'على الآيفون بإصدار iOS {iosMin} أو أحدث، وعلى جوالات الأندرويد بإصدار {androidMin} أو أحدث.',
      },
      {
        id: 'deals',
        question: 'إيش العروض اللي في كيو؟',
        answer:
          'عروض ١+١ مجاناً، وخصومات واضحة على المنتجات اليومية، وأسعار ما تلاقيها إلا في كيو.',
      },
      {
        id: 'order',
        question: 'كيف أطلب؟',
        answer: 'تصفّح العروض، أضف اللي تبيه للسلة، واطلب خلال ثواني — مع خيارات دفع آمنة.',
      },
      {
        id: 'tracking',
        question: 'أقدر أتابع طلبي؟',
        answer: 'أكيد، من التطبيق نفسه: تتابع طلبك خطوة بخطوة لحد ما يوصل باب بيتك.',
      },
      {
        id: 'assistant',
        question: 'مين هو كيور؟',
        answer:
          'كيور هو المساعد الذكي في تطبيق كيو. اسأله عن طبخة مثل الكبسة، ويجهّز لك مكوناتها في قائمة وحدة تضيفها للسلة بزر «أضف الكل».',
      },
      {
        id: 'support',
        question: 'كيف أتواصل معكم؟',
        answer:
          'لو واجهتك أي مشكلة، راسلنا على {email}، أو من رابط «بلّغ عن مشكلة في التطبيق» في آخر الصفحة.',
      },
    ],
  },

  // The store figures, printed as the app's nutrition-facts label — «القيمة الغذائية» on
  // every pack in the supermarket. The figures are the ones src/content/site.js holds.
  stats: {
    title: 'القيمة الغذائية',
    product: 'لتطبيق كيو',
    serving: { label: 'حجم الحصة', value: 'تطبيق واحد' },
    downloads: {
      name: 'التنزيلات',
      prefix: '+',
      unit: { thousand: 'ألف', million: 'مليون' },
      detail: 'على Google Play خلال {months} من الإطلاق',
    },
    rating: { name: 'التقييم', detail: 'من مستخدمي الجوال على Google Play' },
    fiveStar: { name: 'تقييمات ٥ نجوم', unit: '٪', detail: '{count} تقييم من الجوال' },
    count: { name: 'عدد التقييمات', detail: 'من الجوال · {allRatings} إجمالاً' },
    price: { name: 'السعر', value: 'مجاناً', detail: 'على App Store و Google Play' },
    source: 'الأرقام من صفحة كيو على Google Play بتاريخ {date}.',
  },

  download: {
    title: 'حمّل {brand}',
    subtitle: 'مجاناً على جوالك',
    // The yellow starburst on the app's stage.
    sticker: 'مجاناً',
    text: 'متوفر للآيفون والأندرويد. امسح الكود أو اختار متجرك — التطبيق مجاني، والعروض تبدأ من أول شاشة.',
    stageAlt:
      'الشاشة الرئيسية في تطبيق كيو: عرض السوبر «أرز الفخامة + زيت الفخامة مجاناً»، وقسم «أسعار ما تلاقيها إلا في كيو!»',
  },

  stores: {
    appStore: 'App Store',
    googlePlay: 'Google Play',
  },

  qr: {
    title: 'تتصفّح من الكمبيوتر؟',
    text: 'امسح الكود بكاميرا جوالك وحمّل كيو.',
    alt: 'رمز QR يفتح رابط تحميل تطبيق كيو',
  },

  footer: {
    // The slogan on qeu.app: «اسعارنا هي اصلًا عروض».
    tagline: { before: 'أسعارنا هي أصلًا', offer: 'عروض' },
    // The delivery sticker on the bag the order comes in.
    sticker: {
      title: 'طلبك وصل',
      from: 'من',
      fromValue: 'كيو',
      to: 'إلى',
      toValue: 'بابك',
    },
    contact: {
      title: 'تواصل معنا',
      report: 'بلّغ عن مشكلة في التطبيق',
      reportSubject: 'مشكلة في تطبيق كيو',
      googlePlay: 'صفحة كيو على Google Play',
      appStore: 'صفحة كيو على App Store',
    },
    more: {
      title: 'المحتويات',
      privacy: 'سياسة الخصوصية',
    },
    sourceLine: 'كيو · {package}',
    legal: '© {year} {company} — حي الرحاب، جدة',
  },

  // The page hosts show for a link that leads nowhere: an empty shelf, its label «نفد».
  notFound: {
    title: 'الصفحة غير موجودة — كيو',
    eyebrow: 'خطأ ٤٠٤',
    heading: 'هالصفحة مو على الرف',
    text: 'يمكن الرابط قديم أو فيه حرف ناقص. العروض كلها في الصفحة الرئيسية، وفي التطبيق نفسه.',
    home: 'الصفحة الرئيسية',
    english: 'This page doesn’t exist — see Q in English',
    flag: 'نفد',
    name: 'الصفحة المطلوبة',
  },

  /** How the figures are written; {n} is the number, already in Arabic-Indic digits. */
  numbers: {
    thousand: '{n} ألف',
    million: '{n} مليون',
    months: { one: 'شهر', two: 'شهرين', few: '{n} شهور', many: '{n} شهر', other: '{n} شهر' },
  },

  dates: {
    format: '{day} {month} {year}',
    months: [
      'يناير',
      'فبراير',
      'مارس',
      'أبريل',
      'مايو',
      'يونيو',
      'يوليو',
      'أغسطس',
      'سبتمبر',
      'أكتوبر',
      'نوفمبر',
      'ديسمبر',
    ],
  },
};

export default ar;
