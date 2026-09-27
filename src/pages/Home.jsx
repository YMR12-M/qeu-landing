import { Aisles } from '../components/sections/Aisles.jsx';
import { Assistant } from '../components/sections/Assistant.jsx';
import { Download } from '../components/sections/Download.jsx';
import { Faq } from '../components/sections/Faq.jsx';
import { Hero } from '../components/sections/Hero.jsx';
import { HowItWorks } from '../components/sections/HowItWorks.jsx';
import { Kitchen } from '../components/sections/Kitchen.jsx';
import { WhyQeu } from '../components/sections/WhyQeu.jsx';

/** The landing page: its sections, in order. */
export default function Home() {
  return (
    <>
      <Hero />
      <WhyQeu />
      <Aisles />
      <Assistant />
      <Kitchen />
      <HowItWorks />
      <Faq />
      <Download />
    </>
  );
}
