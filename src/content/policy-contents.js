/**
 * The privacy policy's sections — ids and short names — and its page title, in each language.
 * Kept apart from the policy's text (src/content/policy.js, policy-en.js) so the navigation
 * island can list the sections on every page without every page downloading the whole policy.
 * The ids are the same in both languages, so a section's link works in either.
 */

export const POLICY_META = {
  ar: {
    title: 'تطبيق كيو للتسوق - سياسة الخصوصية والاستخدام',
    description:
      'سياسة الخصوصية لتطبيق كيو: البيانات الشخصية التي نجمعها، وكيف نستخدمها ونخزّنها ونفصح عنها، وحقوقك بموجب نظام حماية البيانات الشخصية.',
  },
  en: {
    // The English policy's own title on qeu.app/policy-english.
    title: 'Q Shopping App - Privacy Policy',
    description:
      'The Q app’s privacy policy: the personal data we collect, how we use, store and disclose it, and your rights under the Personal Data Protection Law.',
  },
};

export const POLICY_CONTENTS = {
  ar: [
    { id: 'data', label: 'البيانات التي نجمعها' },
    { id: 'collection', label: 'كيف نجمعها ولماذا' },
    { id: 'use', label: 'كيف نستخدمها' },
    { id: 'disclosure', label: 'متى نفصح عنها' },
    { id: 'cookies', label: 'ملفات تعريف الارتباط' },
    { id: 'legal-basis', label: 'المسوغات النظامية' },
    { id: 'storage', label: 'التخزين والحماية' },
    { id: 'rights', label: 'حقوقك' },
    { id: 'complaints', label: 'الشكاوى والاعتراض' },
    { id: 'external-links', label: 'الروابط الخارجية' },
    { id: 'updates', label: 'تحديثات السياسة' },
    { id: 'consent', label: 'موافقتك' },
  ],
  en: [
    { id: 'data', label: 'Data we collect' },
    { id: 'collection', label: 'How and why we collect it' },
    { id: 'use', label: 'How we use it' },
    { id: 'disclosure', label: 'When we disclose it' },
    { id: 'cookies', label: 'Cookies' },
    { id: 'legal-basis', label: 'Legal basis' },
    { id: 'storage', label: 'Storage and protection' },
    { id: 'rights', label: 'Your rights' },
    { id: 'complaints', label: 'Complaints and objections' },
    { id: 'external-links', label: 'External links' },
    { id: 'updates', label: 'Policy updates' },
    { id: 'consent', label: 'Your consent' },
  ],
};
