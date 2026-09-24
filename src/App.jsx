import { Footer } from './components/layout/Footer.jsx';
import { Header } from './components/layout/Header.jsx';
import { SkipLink } from './components/layout/SkipLink.jsx';
import { PolicyPage } from './components/policy/PolicyPage.jsx';
import { Download } from './components/sections/Download.jsx';
import { Faq } from './components/sections/Faq.jsx';
import { Hero } from './components/sections/Hero.jsx';
import { HowItWorks } from './components/sections/HowItWorks.jsx';
import { WhyQeu } from './components/sections/WhyQeu.jsx';
import { policy } from './content/policy.js';
import { LocaleProvider } from './i18n/LocaleProvider.jsx';

// The policy's contents, for the navigation island while the policy is read.
const POLICY_CONTENTS = policy.sections.map(({ id, label }) => ({ id, label }));

/** The Qeu Landing v3 page — or, with page="policy", the privacy policy. */
export function App({ locale, page = 'home' }) {
  const isPolicy = page === 'policy';
  return (
    <LocaleProvider locale={locale} page={page}>
      <SkipLink />
      <Header sections={isPolicy ? POLICY_CONTENTS : undefined} />
      <main id="main" tabIndex={-1}>
        {isPolicy ? (
          <PolicyPage />
        ) : (
          <>
            <Hero />
            <WhyQeu />
            <HowItWorks />
            <Faq />
            <Download />
          </>
        )}
      </main>
      <Footer />
    </LocaleProvider>
  );
}
