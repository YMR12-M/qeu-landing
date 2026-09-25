/**
 * «اسأل كيور» — the conversation with Q-ur (كيور), the app's smart assistant, word for word
 * from Qeu's own store screenshot (src/assets/images/screen-chat.webp, also the Google Play
 * screenshot «الذكاء الإصطناعي يساعدك في كل شيء»). The section replays it as it happens in
 * the app.
 *
 * The app is Arabic only, so the conversation is Arabic on the English page too — only the
 * section around it is translated (locales → assistant). Figures are written as the app
 * writes them (Western digits, "ر.س"). The products keep the screenshot's names, sizes and
 * prices, without the brand names (their packs show them).
 */
export const ASSISTANT_CHAT = {
  title: 'كيور',
  newChat: 'محادثة جديدة',
  composer: 'اسأل كيور…',

  // `list` is the ingredients card; every other entry is a message.
  messages: [
    { id: 'hello', from: 'user', text: 'كيف حالك' },
    {
      id: 'greeting',
      from: 'qur',
      text: 'أهلاً كيمو! كيف أقدر أساعدك اليوم في التسوق؟ هل تحتاج منتجات معينة أو عندك قائمة مشتريات؟',
      reactions: true, // the copy / like / dislike buttons under it
    },
    { id: 'ask', from: 'user', text: 'كيف اقدر اطبخ الكبسة' },
    { id: 'reply', from: 'qur', text: 'الطبخة عندي أسرع من السناب يا كيمو! 😏' },
    { id: 'list', from: 'qur' },
    { id: 'salad', from: 'qur', text: 'وش رايك تضيف سلطة تفتح النفس جنب الكبسة؟' },
  ],

  list: {
    title: 'مكونات الكبسة',
    count: 15,
    countUnit: 'منتج',
    total: 179,
    currency: 'ر.س',
    addAll: 'أضف الكل',
    added: 'تمت الإضافة',
    // In the card's order (the app lays it out right to left).
    products: [
      { id: 'spice', name: 'بهارات بصل مجروش', size: '150 جم', price: '4.95', was: '7.95' },
      {
        id: 'rice',
        name: 'ارز مزه سيلا بسمتي هندي',
        size: '10 كيلو',
        price: '61.80',
        was: '94.50',
      },
      { id: 'tomato', name: 'معجون طماطم', size: '135X8 جم', price: '11.80', was: '19.99' },
    ],
  },

  // The cart bar that slides up once «أضف الكل» is pressed: the card's own count and total.
  cart: 'السلة',
};
