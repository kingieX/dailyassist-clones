

import Hero from "../components/sections/pricing/priceHero";
import PricingSection from "../components/sections/Home/PricingSection";
import PackagesSection from "../components/sections/Home/PackagesSection";
import FAQSection from "../components/sections/Home/FAQSection";
import LetsTalkSection from "../components/sections/Service/LetsTalkSection";

export default function Pricing() {
  return (
    <main>
       <Hero />
        <PricingSection />
        <PackagesSection />
           <FAQSection />
           <LetsTalkSection />
    </main>
  );
}