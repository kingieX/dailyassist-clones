const PARTNERS = [
  { name: "Disclosure & Barring Service", logo: "/images/partners/dbs.png" },
  { name: "Disclosure & Barring Service", logo: "/images/partners/dbs.png" },
  { name: "Disclosure & Barring Service", logo: "/images/partners/dbs.png" },
  { name: "Disclosure & Barring Service", logo: "/images/partners/dbs.png" },
  { name: "Disclosure & Barring Service", logo: "/images/partners/dbs.png" },
  { name: "Disclosure & Barring Service", logo: "/images/partners/dbs.png" },
  { name: "Disclosure & Barring Service", logo: "/images/partners/dbs.png" },
  { name: "Disclosure & Barring Service", logo: "/images/partners/dbs.png" },
  { name: "Disclosure & Barring Service", logo: "/images/partners/dbs.png" },
  { name: "Disclosure & Barring Service", logo: "/images/partners/dbs.png" },
];

function PartnerItem({ partner }) {
  return (
    <div className="flex flex-col items-start mx-12 flex-shrink-0">
      <div className="flex items-start gap-3">
  <div className="flex flex-col">
          {/* Logo — replace with your actual logo */}
          <div className="w-32 h-32 mb-1">
            <img
              src= "/Images/IMG and VECTOR/partner.png"
              alt={partner.name}
              className="w-full h-full object-contain"
            />
          </div>
         
        </div>
      </div>
    </div>
  );
}

export default function PartnersSliderSection() {
  return (
    <section className="w-full bg-[#efefef] py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 text-center mb-12">
          Proud to work with
        </h2>
      </div>

      <div className="relative overflow-hidden w-full">
        <style>{`
          @keyframes scrollLeft {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .partners-track {
            animation: scrollLeft 50s linear infinite;
          }
          .partners-track:hover {
            animation-play-state: paused;
          }
        `}</style>

        {/* Render items twice for seamless infinite loop */}
        <div className="partners-track flex items-center w-max">
          {[...PARTNERS, ...PARTNERS].map((partner, i) => (
            <PartnerItem key={i} partner={partner} />
          ))}
        </div>
      </div>
    </section>
  );
}
