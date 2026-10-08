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
      alt: 'كيو: «تطبيق كله عروض من أوله إلى آخره، وأسعار ما تلاقيها إلا فيه» وزر «حمّل كيو مجاناً»، بجانب شاشات التطبيق بأعلام العروض، وسعره: مجاناً',
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
    sectionsMenu: 'أقسام الصفحة',
  },

  nav: {
    items: [
      { id: 'why', label: 'ليش كيو' },
      { id: 'departments', label: 'الأقسام' },
      { id: 'assistant', label: 'اسأل كيور' },
      { id: 'kitchen', label: 'فودز وكوفي' },
      { id: 'inside', label: 'كيف يشتغل' },
      { id: 'faq', label: 'الأسئلة' },
      { id: 'download', label: 'حمّل التطبيق' },
    ],
    download: 'حمّل كيو',
    switchLocale: 'EN',
    here: 'أنت هنا',
    // Beside the section's name in the bar at the top (phones): how far down the page it is.
    progress: '{n} من {total}',
    // On a computer, «حمّل كيو» in the bar opens a card: the download QR code (which sends
    // each phone to its own store) and both stores.
    card: {
      title: 'حمّل كيو على جوالك',
      text: 'امسح الكود بكاميرا جوالك، ويفتح لك متجر جوالك مباشرة.',
      or: 'أو حمّله من',
      note: 'مجاني على الآيفون والأندرويد',
    },
  },

  hero: {
    titleLines: ['تطبيق كله عروض', 'من أوله إلى آخره'],
    titleAccent: 'وأسعار ما تلاقيها إلا فيه',
    cta: {
      default: 'حمّل كيو مجاناً',
      ios: 'حمّله مجاناً من App Store',
      android: 'حمّله مجاناً من Google Play',
    },
    // What it is, under the headline: the things the app brings, and that it brings them to the
    // door — all said elsewhere on the page and in the Google Play listing.
    lead: 'مقاضي وأكل وقهوة، توصلك لحد باب بيتك.',
    note: 'أكثر من {downloads} تنزيل في {months}',
    // The way on from the download button: to how an order works. And the caption of the
    // download code beside the headline, on a computer.
    explore: 'شوف كيف يشتغل',
    scan: 'امسح وحمّل',
    // The page no longer prints these under the screens (the screens say their own words); the
    // link-preview image does (scripts/og-images.js). The app's own price is circled beside the
    // headline.
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
    lead: 'لأنه يجمع لك أفضل العروض وأقل الأسعار على رف واحد.',
    // Phones, under the row of four: it is swiped.
    swipe: 'اسحب لتشوف الباقي',
    items: [
      {
        id: 'deals',
        title: 'عروض 1+1 مجاناً',
        sticker: { main: '1+1', sub: 'مجاناً' },
        text: 'اكتشف أفضل العروض المتاحة على المنتجات اليومية، من 1+1 مجاناً إلى الخصومات الواضحة، وكلها في مكان واحد.',
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
        text: 'نقترح لك منتجات تناسب ذوقك واحتياجك، عشان تختار أسرع وبكل ثقة.',
        imageAlt:
          'كيور، المساعد الذكي في تطبيق كيو، يقترح «مكونات الكبسة» في قائمة وحدة مع زر «أضف الكل»',
      },
    ],
  },

  // «أقسام كيو»: the store's aisles — the store directory, a line for each of the app's
  // departments, and beside it the chosen one's categories (src/content/departments.js). Every
  // name is the app's, written out in full where its card cuts it short.
  aisles: {
    title: 'كل اللي تبيه،',
    titleAccent: 'تلقاه في {brand}',
    lead: '{departments} أقسام وأكثر من {categories} فئة — من الرز والخضار لحد السماعات.',
    legend: 'اختر القسم',
    // The directory's title, over its lines.
    directory: 'دليل الأقسام',
    // The way to a department in the app: its «الأقسام» tab, then the department.
    where: 'في التطبيق:',
    tab: 'الأقسام',
    departments: {
      groceries: {
        name: 'المقاضي',
        categories: {
          frozen: 'الأطعمة المجمدة',
          rice: 'الأرز والحبوب',
          pasta: 'المعكرونة والنودلز',
          cooking: 'مستلزمات الطبخ',
          sauces: 'الصلصات والتتبيلات',
          spices: 'البهارات والتوابل',
          canned: 'التونة والمعلبات',
          breakfast: 'منتجات الإفطار',
        },
      },
      fresh: {
        name: 'المنتجات الطازجة',
        categories: {
          bakery: 'المخبوزات',
          seafood: 'المأكولات البحرية',
          fruit: 'الفواكه',
          vegetables: 'الخضروات',
          meat: 'الدجاج واللحوم الطازجة',
          dairy: 'البيض ومنتجات الحليب',
          cheese: 'الأجبان ومشتقات الحليب',
          qfoods: 'كيو فودز',
        },
      },
      drinks: {
        name: 'المشروبات والمفرحات',
        categories: {
          cakes: 'الكيك والبسكويت',
          'specialty-coffee': 'القهوة المختصة',
          water: 'المياه والثلج',
          juices: 'العصائر',
          'soft-drinks': 'المشروبات الغازية',
          tea: 'المشروبات الفورية والشاي',
          sweets: 'الحلويات والسناكات',
          'ice-cream': 'الآيس كريم',
        },
      },
      home: {
        name: 'العناية بالمنزل',
        categories: {
          cleaners: 'منظفات ومطهرات',
          laundry: 'غسيل الملابس',
          fresheners: 'المعطرات',
          tissues: 'المناديل الورقية والمعطرة',
          paper: 'الورقيات والمواد البلاستيكية',
          household: 'المنتجات المنزلية',
          pets: 'مستلزمات الحيوانات',
        },
      },
      care: {
        name: 'كيو كير',
        categories: {
          skin: 'العناية بالبشرة',
          hair: 'العناية بالشعر',
          body: 'العناية بالجسم',
          personal: 'العناية الشخصية',
          baby: 'منتجات الأطفال',
          health: 'المستلزمات الصحية',
          makeup: 'مكياج',
        },
      },
      tech: {
        name: 'كيو تيك',
        categories: {
          phone: 'إكسسوارات الجوال',
          appliances: 'أجهزة منزلية صغيرة',
          audio: 'السماعات',
          electrical: 'مستلزمات كهربائية',
          qhome: 'كيو هوم',
          office: 'مستلزمات مكتبية',
          qtoys: 'كيو تويز',
        },
      },
    },
  },

  // «اسأل كيور»: the section around the replayed conversation (src/content/assistant-chat.js).
  // It says only what the FAQ's answer about كيور says, from the same screenshot.
  assistant: {
    name: 'كيور', // drawn in the assistant's colours wherever the title names it
    title: 'اسأل كيور عن طبختك',
    lead: 'اسأله عن طبخة مثل الكبسة، ويجهّز لك مكوناتها في قائمة وحدة.',
    steps: ['اسأل عن الطبخة', 'كيور يجهّز مكوناتها', 'أضف الكل للسلة بضغطة'],
    cta: 'حمّل كيو وجرّب كيور',
    demoLabel: 'محادثة مع كيور في تطبيق كيو',
    hint: 'جرّبها بنفسك: اضغط',
    hintAfter: '',
    done: 'تمّت الإضافة للسلة',
    // Announced to screen readers when «أضف الكل» is pressed.
    added: 'أُضيفت مكونات الكبسة للسلة: 15 منتج بـ 179 ر.س',
    replay: 'أعد المحادثة',
  },

  // The kitchen: «كيو فودز» and «كيو كوفي» in one section, as the app's two tabs under
  // «المنتجات الطازجة». `title` names the section for screen readers; the switch shows the tabs.
  kitchen: {
    title: 'كيو فودز وكيو كوفي',
    legend: 'اعرض',
    tabs: { foods: 'كيو فودز', coffee: 'كيو كوفي' },
  },

  // «كيو فودز»: Qeu's own sandwiches, dips and salads, set out on three shelves as a flyer sets
  // out its offers: what the app's screenshots of the tab show — names and sizes as the app writes
  // them (only the names its cards print whole), prices from src/content/menu.js. "Made by Qeu"
  // is the client's own word for this food.
  foods: {
    title: 'ما تبي تطبخ اليوم؟',
    struck: 'تطبخ', // crossed out in the title with the red pen: no cooking today
    titleAccent: 'خلّها على {brand} فودز',
    lead: 'ساندويتشات وحمص وسلطات تحضّرها كيو بنفسها، وتطلبها مع مقاضيك.',
    shelvesLabel: 'رفوف كيو فودز',
    seal: { main: 'من تحضير', sub: 'كيو' },
    offer: 'عرض',
    from: 'من',
    // Each shelf's sign: the kinds of product on it, as their names say.
    shelves: {
      clubs: 'كلوب وكرواسون رول',
      minis: 'ميني وجامبو',
      dips: 'مقبلات وغموس وسلطات',
    },
    products: {
      'club-tuna': { name: 'كلوب تونة حارة بالجرجير', size: '1 قطعة' },
      'club-halloumi': { name: 'كلوب جبنة حلوم', size: '1 قطعة' },
      'club-shakshuka': { name: 'كلوب شكشوكة', size: '100 جم' },
      'club-caesar': { name: 'كلوب دجاج سيزر', size: '1 قطعة' },
      'croissant-lotus': { name: 'كرواسون رول باللوتس', size: '1 قطعة' },
      'croissant-pistachio': { name: 'كرواسون رول بالفستق', size: '1 قطعة' },
      'mini-falafel': { name: 'فلافل ميني بخبز الحليب', size: '115 جم' },
      'mini-mortadella': { name: 'مرتديلا ميني بخبز زيتون', size: '100 جم' },
      'jumbo-shawarma': { name: 'شاورما دجاج جامبو', size: '1 قطعة' },
      'jumbo-turkey': { name: 'ديك رومي جامبو', size: '1 قطعة' },
      'jumbo-caesar': { name: 'دجاج سيزر جامبو', size: '1 قطعة' },
      'multigrain-turkey': { name: 'ديك رومي ملتي سيريال', size: '1 قطعة' },
      'hummus-classic': { name: 'حمص كلاسيك', size: '250 جم' },
      'hummus-cilantro': { name: 'حمص بالكزبرة', size: '250 جم' },
      'hummus-foul': { name: 'فول وحمص', size: '250 جم' },
      'hummus-beiruti': { name: 'حمص بيروتي', size: '250 جم' },
      'labneh-olives': { name: 'لبنة بالزيتون الأسود', size: '250 جم' },
      'salad-quinoa': { name: 'سلطة تبولة كينوا', size: '1 علبة' },
    },
    where: 'وأصناف أكتر تلقاها في التطبيق:',
    path: ['المنتجات الطازجة', 'كيو فودز'],
  },

  // «كيو كوفي»: the menu of Qeu's coffee, and a cup poured with the drink picked from it.
  // The drinks, their size and prices are the app's (src/content/menu.js).
  coffee: {
    title: 'كيف تبي قهوتك؟',
    titleAccent: '{brand} كوفي تجهّزها لك',
    lead: 'قهوتك الباردة بأسعار عروض، وتوصلك مع مقاضيك.',
    // The label on the cup: the wordmark, then this word.
    sign: 'كوفي',
    menu: {
      legend: 'اختر مشروبك',
      cold: 'قهوة باردة',
      gatherings: 'مشروبات للجمعات', // the box's shelf: the menu's second heading
    },
    drinks: {
      spanish: { name: 'لاتيه إسباني مثلج', size: '16 أونصة' },
      latte: { name: 'لاتيه مثلج', size: '16 أونصة' },
      pistachio: { name: 'لاتيه فستق مثلج', size: '16 أونصة' },
      americano: { name: 'أمريكانو مثلج', size: '16 أونصة' },
    },
    // Its name runs past the app's card («بوكس قهوة اليوم بارد ا…»): only what shows is used.
    box: {
      name: 'بوكس قهوة اليوم بارد',
      size: '1.2 لتر',
      imageAlt: 'بوكس قهوة اليوم: كرتون قهوة بصنبور، مع أكواب وكوب ثلج',
    },
    hint: 'اختر من القائمة، ونصبّها لك',
    // The tab's other shelves in the app, which the menu doesn't show.
    also: { label: 'وكمان في التطبيق:', items: ['شاي مثلج', 'قهوة اليوم'] },
    where: 'تلقاها في التطبيق:',
    path: ['المنتجات الطازجة', 'كيو كوفي'],
  },

  // The prices of Qeu Foods' packs and the coffee menu (src/content/menu.js).
  prices: {
    price: '{n} ر.س',
    was: 'بدل', // read before the struck-through price: «4.80 ر.س، بدل 10»
    source: 'الأسعار كما في تطبيق كيو بتاريخ {date}، وقد تتغير.',
  },

  inside: {
    // Over the house when the van arrives: the footer says it too.
    arrived: 'طلبك وصل',
    title: 'عروضنا تجيك وبنفس السعر',
    lead: 'تجربة شراء بسيطة، وخيارات دفع آمنة، وتوصيل لحد باب بيتك.',
    steps: [
      // Each is written under its stop on the street: a title, and one line.
      {
        id: 'offers',
        title: 'تصفّح العروض',
        text: 'عروض للتاريخ، وأسعار ما تلاقيها إلا في كيو.',
        imageAlt: 'من تطبيق كيو: شاشة العروض، عرض على المشروبات وقسم «أسعار ما تلاقيها إلا في كيو»',
      },
      {
        id: 'picks',
        title: 'اختار واطلب',
        text: 'أضف اللي تبيه للسلة، واطلب خلال ثواني.',
        imageAlt: 'من تطبيق كيو: منتجات «اخترناها لك» بسعرها قبل الخصم وبعده وزر + للإضافة للسلة',
      },
      {
        id: 'delivery',
        title: 'استلم لحد بابك',
        text: 'توصيل سريع ومنظّم، وتتابع طلبك خطوة بخطوة.',
        imageAlt: 'من تطبيق كيو: شاشة مراجعة الطلب، وخلفها فان كيو بشعاره',
      },
    ],
  },

  // Every answer restates what the page and the Google Play listing already say — nothing new
  // is promised here (no delivery areas, fees or payment brands: the sources don't give them).
  faq: {
    title: 'عندك سؤال؟',
    lead: 'جمعنا لك الأجوبة في فاتورة وحدة: واضحة ومختصرة.',
    // The last line of the receipt's questions: take a number — yours is the next after its
    // last question — and ask.
    ticket: {
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
          'عروض 1+1 مجاناً، وخصومات واضحة على المنتجات اليومية، وأسعار ما تلاقيها إلا في كيو.',
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

  // The store figures, in the words of the app's nutrition-facts label — «القيمة الغذائية» on
  // every pack in the supermarket. The figures are the ones src/content/site.js holds.
  stats: {
    title: 'القيمة الغذائية',
    product: 'لتطبيق كيو',
    serving: { label: 'حجم الحصة', value: 'تطبيق واحد' },
    amount: 'الكمية لكل حصة',
    downloads: {
      name: 'التنزيلات',
      prefix: '+',
      unit: { thousand: 'ألف', million: 'مليون' },
      detail: 'على Google Play خلال {months} من الإطلاق',
    },
    rating: { name: 'التقييم', detail: 'من مستخدمي الجوال على Google Play' },
    fiveStar: { name: 'تقييمات 5 نجوم', suffix: '%', detail: '{count} تقييم من الجوال' },
    count: { name: 'عدد التقييمات', detail: 'من الجوال · {allRatings} إجمالاً' },
    price: { name: 'السعر', value: 'مجاناً', detail: 'على App Store و Google Play' },
    source: 'الأرقام من صفحة كيو على Google Play بتاريخ {date}.',
  },

  download: {
    title: 'حمّل {brand}',
    subtitle: 'مجاناً على جوالك',
    text: 'متوفر للآيفون والأندرويد، والعروض تبدأ من أول شاشة.',
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
    // The order's delivery label, written in the footer.
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

  // The page hosts show for a link that leads nowhere: what a shop writes on an empty shelf, «نفد».
  notFound: {
    title: 'الصفحة غير موجودة — كيو',
    eyebrow: 'خطأ 404',
    heading: 'هالصفحة مو على الرف',
    text: 'يمكن الرابط قديم أو فيه حرف ناقص. العروض كلها في الصفحة الرئيسية، وفي التطبيق نفسه.',
    home: 'الصفحة الرئيسية',
    english: 'This page doesn’t exist — see Q in English',
    flag: 'نفد',
    name: 'الصفحة المطلوبة',
  },

  /** How the figures are written; {n} is the number, already formatted (100, 1.3). */
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
