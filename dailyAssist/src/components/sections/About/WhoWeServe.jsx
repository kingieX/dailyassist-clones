import { FiUser, FiHeart, FiClock, FiCheckCircle, FiShield } from "react-icons/fi";

const cards = [
  {
    icon: <FiUser size={28} />,
    title: "Older Adults",
    bullets: [
      "Need help with housework and errands",
      "Want social contact and companionship",
      "Family members who live elsewhere",
    ],
  },
  {
    icon: <FiHeart size={28} />,
    title: "Adults Children & Relatives",
    bullets: [
      "Commission services for parents / grandparent",
      "Value reliability and regular reporting",
      "Want peace of mind about safeguarding",
    ],
  },
  {
    icon: <FiClock size={28} />,
    title: "Busy Professionals & Families",
    bullets: [
      "Need help with cleaning and errands",
      "Pet care during busy periods",
      "Welfare visits for relatives",
    ],
  },
];

export default function WhoWeServe() {
  return (
    <section className="bg-[#fef9ec] py-16 md:py-24 px-6 md:px-24">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <h2 className="text-2xl md:text-5xl font-bold text-center text-gray-800 mb-6">
          Who We Serve
        </h2>
        <p className="text-gray-600 text-base text-center max-w-2xl mx-auto mb-16 leading-relaxed">
          Our services are designed for anyone who needs practical support to maintain
          their independence at home.
        </p>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col items-center text-center"
            >
              {/* Icon Badge */}
              <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center mb-6 text-yellow-500">
                {card.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                {card.title}
              </h3>

              {/* Bullets */}
              <ul className="space-y-3 mt-2 w-full text-left">
                {card.bullets.map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-600">
                    <FiCheckCircle className="text-green-500 mt-1 flex-shrink-0" size={18} />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-6 mt-12">
          <a
            href="/pricing"
             className="inline-flex items-center gap-2 bg-[#f5c045] text-black font-semibold px-6 py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-[0_0_25px_rgba(245,192,69,0.8),_inset_0_0_18px_rgba(245,192,69,0.6)] hover:brightness-110"
          >
            Browse packages
          </a>
          <a
            href="/services"
            className="border-2 border-yellow-400 text-gray-800 px-8 py-3 rounded-lg transition-all duration-300 hover:shadow-[0_0_25px_rgba(245,192,69,0.8),_inset_0_0_18px_rgba(245,192,69,0.6)] hover:border-[#f5c045] "
          >
            
          
            Browse services
          </a>
        </div>

        {/* Info Highlight Box */}
        <div className="mt-16 max-w-4xl mx-auto bg-green-50 border border-green-300 rounded-xl p-6 md:p-8 shadow-sm flex gap-4 items-start">
          {/* Shield Icon */}
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
            <FiShield size={20} />
          </div>

          {/* Text */}
          <div>
            <p className="font-semibold text-gray-800 mb-2">
              Our Commitment to Safe, Non-Medical Support
            </p>
            <p className="text-gray-600 leading-relaxed">
              <span className="font-semibold text-green-700">Daily Assist UK provides non-regulated services only.</span>{" "}
              We do not provide any regulated personal care such as washing, dressing,
              giving medication, or clinical tasks. This keeps our business outside CQC
              regulation and focused on practical home-help and lifestyle support. We are
              registered as a Limited Company, fully insured and all staff are DBS checked.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}