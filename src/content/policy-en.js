/**
 * The privacy policy in English — word for word from qeu.app/policy-english, Qeu's own
 * translation of the Arabic policy (src/content/policy.js), last updated 21 December 2025 and
 * captured 27 September 2026. Its sections follow the Arabic one's, with the same ids.
 *
 * Only the typography is the site's own — a line split at its colon starts its second half
 * with a capital, and the disclosure line is split before its "However" — with the same two
 * corrections as the Arabic, both flagged for the client:
 *   · the complaints address read support@que.app — the support address everywhere else is
 *     support@qeu.app;
 *   · "within [•] business days" was never filled in. Rather than invent a number, it reads
 *     "within the period required by law" until the client sets one.
 */

import { POLICY_META } from './policy-contents.js';

export const policy = {
  meta: POLICY_META.en,

  title: 'Privacy Policy',
  subtitle: 'for the Q app',
  company: 'Unlimited Imagination Company (Q)',
  address: 'Al-Rehab District, Jeddah, Kingdom of Saudi Arabia',
  updatedAt: '2025-12-21',
  law: 'Personal Data Protection Law (M/19)',

  labels: {
    contact: 'Contact information',
    updated: 'Last updated',
    law: 'Legal reference',
    contents: 'Policy contents',
    // The round company stamp at the end of the document: its name over the top, its city under.
    stamp: { name: 'Unlimited Imagination Company', place: 'Jeddah · Kingdom of Saudi Arabia' },
  },

  intro: [
    'Through the Q platform—an electronic platform specialized in delivering food and consumer products (“the platform,” “our platform,” or “the app”)—we value your concerns and interest regarding the privacy of your personal data. We are committed to transparency in how we collect and use your information, and this Privacy Policy (“policy”) aims to clarify the data we collect when you use our app or website and how we handle it to ensure its security and confidentiality while providing our services to you.',
    'Our platform offers an integrated shopping experience that enables you to browse, select, and order various products with ease, while ensuring your personal information is protected every step of the way. For inquiries or comments regarding your privacy, you may contact us through the communication channels listed below.',
  ],

  updated: 'The last update to this policy was made on December 21, 2025.',

  sections: [
    {
      id: 'data',
      title: 'What personal data is collected?',
      blocks: [
        { type: 'p', text: 'We collect and process the following personal data:' },
        {
          type: 'terms',
          style: 'data',
          items: [
            ['Basic data', 'Name, national ID number, address, mobile number.'],
            ['Account data', 'Login information.'],
            ['Location data', 'Geographic location for delivery.'],
            ['Payment data', 'Payment card information, transaction history.'],
            ['Usage data', 'Order history, product preferences, usage times.'],
            [
              'Technical data',
              'Device type, operating system, browser information, IP address, cookie information.',
            ],
          ],
        },
      ],
    },
    {
      id: 'collection',
      title: 'How do we collect your personal data and for what purpose?',
      blocks: [
        {
          type: 'groups',
          items: [
            {
              title: 'Data collected directly:',
              items: [
                'When creating an account in the app to enable you to use our services.',
                'When placing product orders for processing and delivery.',
                'When communicating with customer service for support.',
                'When making payments to complete purchases.',
              ],
            },
            {
              title: 'Data collected indirectly:',
              items: [
                'Through cookie technologies to improve user experience.',
                'Through platform analytics to understand user behavior and enhance services.',
                'Through location services to facilitate delivery.',
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'use',
      title: 'How do we use your personal data?',
      blocks: [
        { type: 'p', text: 'We use collected personal data as follows:' },
        {
          type: 'list',
          style: 'ticks',
          items: [
            'Creating and managing your account.',
            'Processing and delivering orders placed through the platform.',
            'Handling payments and issuing electronic invoices.',
            'Communicating with you regarding orders and technical support.',
            'Improving our services and developing new features and products.',
            'Ensuring the security of the platform and preventing fraud.',
            'Complying with legal and regulatory requirements.',
          ],
        },
        {
          type: 'p',
          text: 'The Q app processes your personal data using advanced secure digital systems, including analytics platforms and customer support tools. These systems help us understand your preferences, send relevant notifications, and continuously improve our services while fully complying with regulatory requirements in the Kingdom of Saudi Arabia.',
        },
      ],
    },
    {
      id: 'disclosure',
      title: 'How do we disclose your personal data?',
      blocks: [
        {
          type: 'callout',
          text: 'We will not disclose your personal data to any third party for direct marketing purposes.',
        },
        { type: 'p', text: 'However, we may disclose it to:' },
        {
          type: 'recipients',
          items: [
            { icon: 'delivery', text: 'Delivery representatives for fulfilling your orders.' },
            { icon: 'payment', text: 'Payment service providers for processing payments.' },
            {
              icon: 'government',
              text: 'Government authorities when required by applicable laws and regulations.',
            },
          ],
        },
        {
          type: 'p',
          text: 'This policy does not cover content that users publicly share such as reviews, images, and comments about products or services. We may use such content for improvement and marketing purposes without requiring further consent.',
        },
      ],
    },
    {
      id: 'cookies',
      title: 'Cookies',
      blocks: [
        {
          type: 'p',
          text: 'The Q app uses cookies, which are small digital files stored on your device. These files help improve your experience and personalize it according to your needs. Through your device settings, you can accept or reject cookies. Disabling cookies may limit some app features.',
        },
      ],
    },
    {
      id: 'legal-basis',
      title: 'Legal basis for collecting and processing your personal data',
      blocks: [
        {
          type: 'p',
          text: 'According to the Personal Data Protection Law issued under Royal Decree No. (M/19) dated 09/02/1443H and its implementing regulations issued by Cabinet Resolution No. (98) dated 07/02/1443H (“Personal Data Protection Law”), the legal basis for processing your personal data includes:',
        },
        {
          type: 'list',
          style: 'numbered',
          items: [
            'Your explicit consent, which you may withdraw at any time.',
            'Fulfilling contractual obligations between you and us to provide requested services.',
            'Legitimate interests in developing and improving our services without conflicting with your rights.',
          ],
        },
      ],
    },
    {
      id: 'storage',
      title: 'How do we store your personal data?',
      blocks: [
        {
          type: 'p',
          text: 'Your personal data is securely stored in protected servers located within the Kingdom of Saudi Arabia and/or with trusted cloud service providers. We use encryption and advanced protection techniques to safeguard your information.',
        },
        {
          type: 'p',
          text: 'We retain personal data as long as your account remains active on the Q platform, and for no more than five (5) years after account closure or last service use, in accordance with regulatory requirements. When the retention period ends, we securely destroy the data through permanent deletion from our systems and backups.',
        },
        {
          // The retention the paragraph above sets out, drawn as a route — in its own words.
          type: 'retention',
          items: [
            'As long as your account remains active',
            'For no more than five (5) years after account closure or last service use',
            'Securely destroy the data through permanent deletion',
          ],
        },
        {
          type: 'p',
          text: 'The Q app adopts multi-layered security measures, including encryption and strict access controls. However, digital communication cannot be guaranteed 100% secure. We commit to notifying you immediately in the event of any security breach affecting your data and taking corrective measures per applicable regulations.',
        },
      ],
    },
    {
      id: 'rights',
      title: 'Your rights regarding personal data processing',
      blocks: [
        {
          type: 'p',
          text: 'Under the Personal Data Protection Law, you have the following rights:',
        },
        {
          type: 'terms',
          style: 'rights',
          items: [
            ['Right to be informed', 'To know how your data is collected and used.'],
            ['Right of access', 'To view your stored personal data.'],
            ['Right to rectification', 'To correct inaccurate or incomplete information.'],
            ['Right to erasure', 'To request deletion when the data is no longer needed.'],
            ['Right to withdraw consent', 'At any time.'],
            [
              'Right to file a complaint',
              'To the competent authority if you believe your rights have been violated.',
            ],
          ],
        },
        {
          type: 'p',
          text: 'To exercise any of these rights, you may contact us via email or through the app’s communication feature. We will respond to your request within the period required by law.',
        },
      ],
    },
    {
      id: 'complaints',
      title: 'How to file a complaint or objection',
      blocks: [
        {
          type: 'p',
          text: 'If you have any concerns regarding how we handle your personal data, you may submit a complaint to the support department through:',
        },
        {
          type: 'channels',
          items: [
            { label: 'Email', email: 'support@qeu.app' },
            { label: 'App', text: 'Via the “Contact Us” section' },
          ],
        },
        {
          type: 'escalation',
          text: 'If you are not satisfied with our handling of your complaint, you may file a complaint with the Saudi Data & Artificial Intelligence Authority (SDAIA).',
        },
      ],
    },
    {
      id: 'external-links',
      title: 'External links',
      blocks: [
        {
          type: 'p',
          text: 'The Q app may contain links to platforms outside our control. When using these links, you will be subject to different privacy policies. We advise reviewing the privacy policies of those platforms before use, as we cannot be responsible for their data-handling practices.',
        },
      ],
    },
    {
      id: 'updates',
      title: 'Privacy Policy Updates',
      blocks: [
        {
          type: 'p',
          text: 'We may update this policy from time to time to reflect changes in our practices or to comply with legal requirements. We will notify you of any material changes via in-app notice or email.',
        },
      ],
    },
    {
      id: 'consent',
      title: 'Your Consent',
      blocks: [
        {
          type: 'p',
          text: 'By using the Q platform, you agree to the collection and use of your information in accordance with this policy. If you do not agree with the policy, please refrain from using our platform or services.',
        },
      ],
    },
  ],
};
