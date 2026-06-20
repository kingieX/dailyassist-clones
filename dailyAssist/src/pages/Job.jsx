import Hero from "../components/sections/job/CareersHero";
import Join from "../components/sections/job/WhyJoinSection";
import Vacancy from "../components/sections/job/CurrentVacancies";
import Working from "../components/sections/job/WorkingHours";
import JoinCTA from "../components/sections/job/JoinCTA";

export default function FaQs() {
  return (
    <main>
      <Hero />
       <Join />
       <Vacancy />
       <Working />
       <JoinCTA />
    </main>
  );
}