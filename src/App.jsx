import { Footer } from './components/layout/Footer.jsx';
import { Header } from './components/layout/Header.jsx';
import { SkipLink } from './components/layout/SkipLink.jsx';
import { Download } from './components/sections/Download.jsx';
import { Hero } from './components/sections/Hero.jsx';
import { HowItWorks } from './components/sections/HowItWorks.jsx';
import { WhyQeu } from './components/sections/WhyQeu.jsx';
import { LocaleProvider } from './i18n/LocaleProvider.jsx';

/** The Qeu Landing v3 page. */
export function App({ locale }) {
  return (
    <LocaleProvider locale={locale}>
      <SkipLink />
      <Header />
      <main id="main" tabIndex={-1}>
        <Hero />
        <WhyQeu />
        <HowItWorks />
        <Download />
      </main>
      <Footer />
    </LocaleProvider>
  );
}
