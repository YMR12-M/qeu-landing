/**
 * The privacy policy's sections — ids and short names — and its page title. Kept apart from
 * the policy's text (src/content/policy.js) so the navigation island can list the sections
 * on every page without every page downloading the whole policy.
 */

export const POLICY_META = {
  title: 'تطبيق كيو للتسوق - سياسة الخصوصية والاستخدام',
  description:
    'سياسة الخصوصية لتطبيق كيو: البيانات الشخصية التي نجمعها، وكيف نستخدمها ونخزّنها ونفصح عنها، وحقوقك بموجب نظام حماية البيانات الشخصية.',
};

export const POLICY_CONTENTS = [
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
];
