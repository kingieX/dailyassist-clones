import { useState } from "react";
import { FiCheckCircle } from "react-icons/fi";

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
      "picking up groceries",
      "Posting parcels and letters",
      "Other agreed local errands",
    ],
  },
  {
    id: 3,
    title: "Welfare Check-Ins / Companionship",
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
      "GP, hospital & clinic visits",
      "Hairdresser/ barber",
      "Note-taking & mobility support",
    ],
  },
  {
    id: 5,
    title: "Light Gardening / Household Tasks",
    image: "/Images/ServicesImage/card5.jpeg",
    href: "/services/gardening-household",
    items: [
      "Basic garden sweeping & weeding",
      "Tidying small outdoor areas",
      "Putting bins out where safe",
      "Changing lightbulbs",
    ],
  },
  {
    id: 6,
    title: "Community Access Support",
    image: "/Images/ServicesImage/card6.png",
    href: "/services/community-access",
    items: [
      "Accompanying to social groups",
      "Walks",
      "Coffee outings",
    ],
  },
];

function ServiceCard({ service }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="flex flex-col w-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="rounded-t-2xl overflow-hidden h-64 relative">
        <img
          src={service.image}
          alt={service.title}
          className={`w-full h-full object-cover transition-transform duration-500 ease-in-out ${
            hovered ? "scale-105" : "scale-100"
          }`}
        />
      </div>

      {/* Content box — narrower on right side, matching previous adjustments */}
    <div className="flex flex-col flex-1 justify-between bg-white w-full rounded-tr-2xl rounded-b-2xl shadow-lg p-6 -mt-10 relative z-10 mr-8">
        <h3
          className={`text-lg font-semibold mb-4 transition-colors duration-300 ${
            hovered ? "text-[#4689c8]" : "text-gray-800"
          }`}
        >
          {service.title}
        </h3>

        <ul className="flex flex-col gap-2 flex-1">
          {service.items.map((item) => (
            <li
              key={item}
              className="flex items-center gap-3 text-gray-600 text-sm md:text-base"
            >
              <FiCheckCircle
                className="text-green-500 flex-shrink-0"
                size={17}
              />
              {item}
            </li>
          ))}
        </ul>

        <a
          href={service.href}
          className="mt-6 inline-flex items-center gap-2 text-[#4689c8] font-medium text-sm hover:underline hover:brightness-110 transition-all duration-300"
        >
          Book Service →
        </a>
      </div>
    </div>
  );
}


export default function ServicesHeroSection() {
  return (
    <section className="w-full bg-[#fafafa] py-20 md:py-28 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-2xl md:text-5xl font-bold text-gray-800 leading-tight mb-2">
            Your{" "}
            <span className="relative inline-block">
              home-help & everyday
            </span>
          </h1>

     <h1 className="text-2xl md:text-5xl font-bold text-gray-800 -mt-2 md:mt-0 relative z-10">
            support services
          </h1>

          {/* Placeholder for brush line image */}
     <div className="relative -mt-3 md:mt-[1] mb-0 z-0">
            <img
              src="/Images/service-vector.png"  
              loading="lazy" alt="decorative brush line"
              className="mx-auto w-44 md:w-64" 
            />
          </div>

          <p className="text-gray-600 text-base md:text-xl max-w-2xl mx-auto mt-6 leading-relaxed">
            Flexible, non-medical support designed to help people stay independent,
            comfortable, and connected in their own homes.
          </p>
        </div>


        {/* 2-column grid of service cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

      </div>
    </section>
  );
}