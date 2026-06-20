
import Hero from "../components/sections/Home/Hero";
import WhoWeAre from "../components/sections/Home/WhoWeAre";
import Services from "../components/sections/Home/Services";
import PackagesSection from "../components/sections/Home/PackagesSection";
import PricingSection from "../components/sections/Home/PricingSection";
import WhyChooseUs from "../components/sections/Home/WhyChooseUs";
import HowItWorks from "../components/sections/Home/HowItWorks";
import Testimonials from "../components/sections/Home/Testimonials";
import CommunityCoverage from "../components/sections/Home/CommunityCoverage";
import FAQSection from "../components/sections/Home/FAQSection";
import ContactOptionsSection from "../components/sections/Home/ContactOptionsSection";
import PartnersSliderSection from "../components/sections/Home/PartnersSliderSection";
import CareersCTASection from "../components/sections/Home/CareersCTASection";

export default function Home() {
  return (
    <>
      <Hero />
      <WhoWeAre />
      <Services />
      <PackagesSection />
       <PricingSection />
       <WhyChooseUs />
       <HowItWorks />
      <Testimonials />
      <CommunityCoverage />
      <FAQSection />
      <ContactOptionsSection />
       <PartnersSliderSection />
       <CareersCTASection />
    </>
  );
}


