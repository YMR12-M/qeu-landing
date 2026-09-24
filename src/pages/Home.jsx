import { Download } from '../components/sections/Download.jsx';
import { Faq } from '../components/sections/Faq.jsx';
import { Hero } from '../components/sections/Hero.jsx';
import { HowItWorks } from '../components/sections/HowItWorks.jsx';
import { WhyQeu } from '../components/sections/WhyQeu.jsx';

/** The landing page: its sections, in order. */
export default function Home() {
  return (
    <>
      <Hero />
      <WhyQeu />
      <HowItWorks />
      <Faq />
      <Download />
    </>
  );
}
