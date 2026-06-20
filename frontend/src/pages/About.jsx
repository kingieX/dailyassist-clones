import AboutHeroSection from "../components/sections/About/AboutHeroSection";
import WhoWeAreSection from "../components/sections/About/WhoWeAreSection";
import WhoWeServe from "../components/sections/About/WhoWeServe";
import CaseStudies from "../components/sections/About/CaseStudies";
import WhyChooseUs from "../components/sections/Home/WhyChooseUs";
import LetsTalkSection from "../components/sections/Service/LetsTalkSection";

export default function FaQs() {
  return (
    <main>
         <AboutHeroSection />
         <WhoWeAreSection />
         <WhoWeServe />
         <CaseStudies />
       <WhyChooseUs />
        <LetsTalkSection />
     
    </main>
  );
}