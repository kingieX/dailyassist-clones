// import { useState } from "react";
import { useState, useEffect } from "react";

import { FiChevronLeft, FiChevronRight, FiCheckCircle } from "react-icons/fi";

const SERVICES = [
  {
    id: 1,
    title: "Home-Help",
    image: "/Images/ServicesImage/card1.png",
    href: "/services/HomeHelp",
    items: [
      "General house cleaning",
      "Laundry & ironing",
      "Bed-making",
      "Simple meal preparation",
      "Kitchen tidy-up",
    ],
  },
  {
    id: 2,
    title: "Errands & Shopping",
    image: "/Images/ServicesImage/card2.png",
    href: "/services/errands",
    items: [
      "Collecting prescriptions",
      "Picking up groceries",
      "Posting parcels and letters",
      "Other agreed local errands",
    ],
  },
  {
    id: 3,
    title: "Welfare Companionship",
    image: "/Images/ServicesImage/card3.png",
    href: "/services/warfare",
    items: [
      "Short friendly visits",
      "Conversation & activities",
      "Safety and wellbeing check-ins",
      "Support and staying socially connected",
    ],
  },
  {
    id: 4,
    title: "Transport to Appointments",
    image: "/Images/ServicesImage/card4.png",
    href: "/services/transport",
    items: [
      "GP and hospital visits",
      "Pharmacy collections",
      "Social outings",
      "Safe and reliable transport",
    ],
  },
  {
    id: 5,
    title: "Light Gardening / Household Tasks",
    image: "/Images/ServicesImage/card5.jpeg",
    href: "/services/light",
    items: [
      "Lawn mowing & weeding",
      "Bin putting out & in",
      "Light DIY assistance",
      "Seasonal tidying",
    ],
  },
  {
    id: 6,
    title: "Community Access Support",
    image: "/Images/ServicesImage/card6.png",
    href: "/services/community",
    items: [
      "Accompanying to local events",
      "Support accessing services",
      "Building confidence outside home",
      "Social engagement support",
    ],
  },
];

function ServiceCard({ service }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="flex flex-col w-full px-3"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="rounded-t-2xl  overflow-hidden h-64 relative">
        <img
          src={service.image}
          alt={service.title}
          className={`w-full h-full object-cover transition-transform duration-500 ease-in-out ${
            hovered ? "scale-105" : "scale-100"
          }`}
        />
      </div>

    <div className="bg-white rounded-tr-2xl rounded-b-2xl shadow-lg p-4 md:p-6 -mt-10 relative z-10 flex flex-col mr-0 md:mr-8 h-72 md:h-80">
       <h3
  className={`text-lg md:text-2xl font-semibold mb-2 md:mb-4 transition-colors duration-300 ${
            hovered ? "text-[#4689c8]" : "text-gray-800"
          }`}
        >
          {service.title}
        </h3>

        <ul className="flex flex-col gap-2 flex-1">
          {service.items.map((item) => (
         <li key={item} className="flex items-start gap-2 text-gray-600 text-xs md:text-lg">
              <FiCheckCircle className="text-green-500 mt-1.5 flex-shrink-0" size={17} />
              {item}
            </li>
          ))}
        </ul>

        
          <a href={service.href}
  className="mt-3 md:mt-6 inline-flex items-center gap-2 text-[#4689c8] font-medium text-sm md:text-lg hover:underline hover:brightness-110 transition-all duration-300"
  >
          Book Service →
        </a>
      </div>
    </div>
  );
}

// export default function Services() {
//   const [current, setCurrent] = useState(0);
//  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
// const visibleCards = isMobile ? 1 : 3;
// const maxIndex = SERVICES.length - visibleCards;
export default function Services() {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const maxIndex = isMobile ? SERVICES.length - 1 : SERVICES.length - 3;

  const prev = () => setCurrent((c) => Math.max(c - 1, 0));
  const next = () => setCurrent((c) => Math.min(c + 1, maxIndex));

  return (
    <section className="w-full bg-[#ededed] py-20 md:py-28 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

       <div className="max-w-7xl mx-auto px-6 md:px-12">

  {/* Header row — Our Services + Learn more on same line (mobile only) */}
  <div className="flex items-center justify-between md:block mb-3 md:mb-6">
    <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-800 md:text-center">
      Our Services
    </h2>
    <a href="/services" className="md:hidden text-[#4689c8] font-medium text-sm flex items-center gap-1 whitespace-nowrap flex-shrink-0">
      Learn more →
    </a>
  </div>

  {/* Paragraph — outside the flex div */}
  <p className="text-gray-600 text-base md:text-xl max-w-3xl md:mx-auto text-left md:text-center mb-10 md:mb-16 mt-3 md:mt-6">
    We offer comprehensive non-medical home-help services designed to help
    you stay independent, connected and comfortable in your own home.
  </p>

</div>

        <div className="relative">
          <button
            onClick={prev}
            disabled={current === 0}
            aria-label="Previous service"
            className="absolute left-0 md:-left-6 top-[45%] -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:ring-2 hover:ring-[#4689c8]/30 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <FiChevronLeft size={22} className="text-gray-700" />
          </button>

        <div
  className="overflow-hidden mx-8 md:mx-10"
  onTouchStart={(e) => { e.currentTarget._touchStartX = e.touches[0].clientX; }}
  onTouchEnd={(e) => {
    const diff = e.currentTarget._touchStartX - e.changedTouches[0].clientX;
    if (diff > 50) next();
    if (diff < -50) prev();
  }}
>
  <div
    className="flex transition-all duration-500 ease-in-out"
    style={{ transform: `translateX(-${current * (isMobile ? 100 : 100 / 3)}%)` }}
  >
              {SERVICES.map((service) => (
                // <div key={service.id} className="w-full sm:w-2/3 lg:w-2/5 flex-shrink-0 pb-4">
                <div key={service.id} className="flex-shrink-0 pb-4 w-full md:w-1/3">
                  <ServiceCard service={service} />
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={next}
            disabled={current >= maxIndex}
            aria-label="Next service"
            className="absolute right-0 md:-right-6 top-[45%] -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:ring-2 hover:ring-[#4689c8]/30 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <FiChevronRight size={22} className="text-gray-700" />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                current === i ? "bg-[#4689c8] w-6" : "bg-gray-400 w-2.5"
              }`}
            />
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
        <a href="/services"
  className="hidden md:inline-flex items-center justify-center gap-2 px-12 py-3 bg-[#4689c8] text-white font-medium rounded-lg text-center transition-all duration-300 shadow-md hover:shadow-[0_0_25px_rgba(70,137,200,0.8),_inset_0_0_18px_rgba(70,137,200,0.6)]"
>
  Learn more
</a>
          <a href="/pricing" className="border-2 border-[#4689c8] text-gray-800 px-8 py-3 rounded-lg font-medium text-center transition-all duration-300 hover:shadow-[0_0_25px_rgba(70,137,200,0.8),_inset_0_0_18px_rgba(70,137,200,0.6)]">
            Browse packages
          </a>
        </div>

      </div>
    </section>
  );
}
