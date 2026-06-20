import {
  FiShield, FiHeart, FiBook, FiClock, FiMapPin,
  FiCheckCircle, FiUmbrella, FiTag, FiFileText,
} from "react-icons/fi";

const FEATURES = [
  { icon: FiShield, iconBg: "bg-blue-100", iconColor: "text-blue-500", title: "Friendly, Enhanced DBS-checked staffs", description: "All our helpers are thoroughly vetted and background checked" },
  { icon: FiHeart, iconBg: "bg-green-100", iconColor: "text-green-500", title: "Safeguarding", description: "Safeguarding is paramount — every visit is delivered with safety, dignity and clear protection standards." },
  { icon: FiBook, iconBg: "bg-yellow-100", iconColor: "text-yellow-500", title: "Training", description: "Regular training ensures high standards of professionalism, safety and reliable support" },
  { icon: FiClock, iconBg: "bg-gray-100", iconColor: "text-gray-500", title: "Flexible visits — as often as you need", description: "Services tailored to your schedule and preferences" },
  { icon: FiMapPin, iconBg: "bg-orange-100", iconColor: "text-orange-400", title: "Locally based team", description: "We're part of your community, serving Canvey Island & Benfleet" },
  { icon: FiCheckCircle, iconBg: "bg-blue-100", iconColor: "text-blue-400", title: "Reliable timekeeping & communication", description: "Consistent service you can depend on with clear updates" },
  { icon: FiUmbrella, iconBg: "bg-pink-100", iconColor: "text-pink-400", title: "Fully insured", description: "Complete insurance coverage for your peace of mind" },
  { icon: FiTag, iconBg: "bg-green-100", iconColor: "text-green-500", title: "Clear, upfront pricing — no hidden fees", description: "Transparent pricing with no surprises" },
  { icon: FiFileText, iconBg: "bg-yellow-100", iconColor: "text-yellow-600", title: "Outstanding company policies and procedures", description: "Upholding the highest standards" },
];

export default function WhyChooseUs() {
  return (
    <section className="w-full bg-[#fafafa] py-20 md:py-28 px-6">
      <div className="max-w-7xl mx-auto">
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

  {/* Mobile only — Title and paragraph shown above image */}
  <div className="lg:hidden text-center">
    <h2 className="text-xl font-bold text-gray-800 leading-tight mb-0">
      Why Choose Daily Assist{" "}
      <span className="relative inline-block">
        UK?
        <span className="absolute -bottom-1 left-0 w-full h-[4px] rounded-full bg-[#f5c045]" />
      </span>
    </h2>
    <p className="text-gray-500 text-base leading-relaxed mt-6 max-w-xl mx-auto">
      We understand that inviting someone into your home requires trust. Here's why families across Canvey Island and Benfleet choose us for their home-help needs.
    </p>
  </div>

  {/* Left — Image */}
        <div className="relative flex justify-center items-center min-h-0 md:min-h-[500px]">
            {/* Beige decorative shape */}
          <div className="hidden md:block absolute top-4 left-0 w-[88%] h-full bg-[#e6d3a8] rounded-3xl z-0" />
            {/* Team image */}
        <div className="relative z-10 w-full md:w-[90%] rounded-2xl md:rounded-2xl overflow-hidden shadow-xl mt-0 md:mt-10 ml-0">
              <img src="/Images/WhyChoose.png" loading="lazy" alt="Daily Assist UK team" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Right — Content */}
          <div className="flex flex-col">
        <h2 className="hidden lg:block text-xl md:text-3xl font-bold text-gray-800 leading-tight mb-0">
              Why Choose Daily Assist{" "}
              <span className="relative inline-block">
                UK?
                <span className="absolute -bottom-1 left-0 w-full h-[4px] rounded-full bg-[#f5c045]" />
              </span>
            </h2>

        <p className="hidden lg:block text-gray-500 text-base md:text-lg leading-relaxed mt-6 mb-8 max-w-xl">
              We understand that inviting someone into your home requires trust. Here's why families across Canvey Island and Benfleet choose us for their home-help needs.
            </p>

            <ul className="flex flex-col space-y-5">
              {FEATURES.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <li key={index} className="flex items-start gap-4">
                    <div className={`flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center ${feature.iconBg}`}>
                      <Icon size={18} className={feature.iconColor} />
                    </div>
                    <div>
                      <p className="text-gray-800 font-medium text-sm md:text-base">{feature.title}</p>
                      <p className="text-gray-500 text-sm md:text-base leading-relaxed">{feature.description}</p>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <a href="/about" className="flex items-center justify-center bg-[#f5c045] text-black font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:brightness-110 hover:shadow-lg hover:scale-[1.02]">
                More about us
              </a>
              <a href="/services" className="flex items-center justify-center border-2 border-[#f5c045] text-gray-800 font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:bg-[#f5c045]/10 hover:shadow-md">
                Browse services
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
