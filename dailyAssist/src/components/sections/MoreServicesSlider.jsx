import { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight, FiCheckCircle } from "react-icons/fi";

const SERVICES = [
  {
    id: 1,
    title: "Home-Help",
    image: "/Images/ServicesImage/card1.png",
    href: "/services/",
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

     <div className="bg-white rounded-tr-2xl rounded-b-2xl shadow-lg p-6 -mt-10 relative z-10 flex flex-col mr-8 h-80">
        <h3
          className={`text-2xl font-semibold mb-4 transition-colors duration-300 ${
            hovered ? "text-[#4689c8]" : "text-gray-800"
          }`}
        >
          {service.title}
        </h3>

        <ul className="flex flex-col gap-2 flex-1">
          {service.items.map((item) => (
            <li key={item} className="flex items-start gap-3 text-gray-600 text-sm md:text-lg">
              <FiCheckCircle className="text-green-500 mt-1.5 flex-shrink-0" size={17} />
              {item}
            </li>
          ))}
        </ul>

        
          <a href={service.href}
          className="mt-6 inline-flex items-center gap-2 text-[#4689c8] font-medium text-lg hover:underline hover:brightness-110 transition-all duration-300"
        >
          Book Service →
        </a>
      </div>
    </div>
  );
}

export default function Services() {
  const [current, setCurrent] = useState(0);
   const [visibleCards, setVisibleCards] = useState(3);

  useEffect(() => {
    const update = () => setVisibleCards(window.innerWidth < 768 ? 1 : 3);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIndex = SERVICES.length - visibleCards;

  const prev = () => setCurrent((c) => Math.max(c - 1, 0));
  const next = () => setCurrent((c) => Math.min(c + 1, maxIndex));

  return (
    <section className="w-full bg-[#ededed] py-20 md:py-28 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-16 gap-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            More services
          </h2>
          
           <a href="/services"
            className="inline-block border-2 border-[#4689c8] text-gray-800 px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-md hover:ring-2 hover:ring-[#4689c8]/30"
          >
            Browse services
          </a>
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

          <div className="overflow-hidden mx-8 md:mx-10">
            <div
              className="flex transition-all duration-500 ease-in-out"
           style={{ transform: `translateX(-${current * (100 / visibleCards)}%)` }}
            >
              {SERVICES.map((service) => (
              <div key={service.id} className="flex-shrink-0 pb-4 md:w-1/3" style={{ width: visibleCards === 1 ? "100%" : undefined }}>
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
       {Array.from({ length: SERVICES.length - visibleCards + 1 }).map((_, i) => (
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

      </div>
    </section>
  );
}
