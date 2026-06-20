import { FiCheckCircle, FiPhone, FiClock, FiHome, FiHeart } from "react-icons/fi";

function FeatureItem({ text, light }) {
  return (
    <li className="flex items-start gap-3 mb-3">
      <FiCheckCircle
        className={`flex-shrink-0 mt-0.5 ${light ? "text-[#f0c24c]" : "text-green-500"}`}
        size={18}
      />
      <span className={`text-base ${light ? "text-white" : "text-gray-600"}`}>
        {text}
      </span>
    </li>
  );
}

function CardButton({ light }) {
  return (
    
      <a href="/pricing/basic"
      className={`flex items-center justify-center gap-2 py-3 px-6 rounded-lg mt-8 font-medium transition duration-300 hover:shadow-lg hover:brightness-105 ${
        light ? "bg-white text-black" : "bg-[#d6a53b] text-black"
      }`}
    >
      <FiPhone size={16} />
      Choose This Package
    </a>
  );
}

function CardButton2({ light }) {
  return (
    
      <a href="/pricing/standard"
      className={`flex items-center justify-center gap-2 py-3 px-6 rounded-lg mt-8 font-medium transition duration-300 hover:shadow-lg hover:brightness-105 ${
        light ? "bg-white text-black" : "bg-[#d6a53b] text-black"
      }`}
    >
      <FiPhone size={16} />
      Choose This Package
    </a>
  );
}

function CardButton3({ light }) {
  return (
    
      <a href="/pricing/premium"
      className={`flex items-center justify-center gap-2 py-3 px-6 rounded-lg mt-8 font-medium transition duration-300 hover:shadow-lg hover:brightness-105 ${
        light ? "bg-white text-black" : "bg-[#d6a53b] text-black"
      }`}
    >
      <FiPhone size={16} />
      Choose This Package
    </a>
  );
}


export default function PackagesSection() {
  return (
   <section className="w-full bg-[#fafafa] py-24 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
          <span className="text-[#e6b73e]">Our </span>
          <span className="text-black-400 italic">Packages</span>
        </h2>

        <p className="text-gray-600 text-base md:text-xl max-w-3xl mx-auto text-center mb-16">
          Choose the package that best fits your needs. All packages include our full range of services with flexible, reliable support.
        </p>

        {/* Consultation button */}
        <div className="flex justify-center mb-16">
          <a href="/contact" className="bg-[#e6b73e] text-black font-medium px-8 py-3 rounded-lg transition duration-300 shadow-md hover:shadow-lg hover:brightness-105 hover:shadow-[0_0_25px_rgba(245,192,69,0.8),_inset_0_0_18px_rgba(245,192,69,0.6)] hover:border-[#f5c045]">
          Book a Free Consultation
          </a>
        </div>

        {/* Cards grid */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">

          {/* Standard Package */}
          <div className="bg-white rounded-2xl shadow-lg p-10 flex flex-col justify-between">
            <div>
              <div className="flex justify-center mb-6">
                <div className="rounded-full bg-yellow-100 p-4">
                  <FiClock size={28} className="text-yellow-500" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-center text-gray-800 mb-2">Standard Package</h3>
              <p className="text-4xl font-bold text-center text-gray-800">£20 - £25</p>
              <p className="text-gray-500 text-center mb-2">per hour</p>
              <p className="text-gray-500 italic text-center mb-6 text-sm">"Flexible hourly support when you need it"</p>
              <ul>
                <FeatureItem text="Works weekdays & daytime" />
                <FeatureItem text="Perfect for one-off visits" />
                <FeatureItem text="All services available" />
              </ul>
            </div>
            <CardButton />
          </div>

          {/* Weekly Home-Help Package */}
          <div className="bg-[#6f97bd] rounded-2xl shadow-lg p-10 flex flex-col justify-between">
            <div>
              <div className="flex justify-center mb-6">
                <div className="rounded-full bg-[#f0c24c] p-4">
                  <FiHome size={28} className="text-white" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-center text-white mb-2">Weekly Home-Help Package</h3>
              <p className="text-5xl font-bold text-center text-white">£60</p>
              <p className="text-white/80 text-center mb-2">per week</p>
              <p className="text-white/80 italic text-center mb-6 text-sm">"Regular support with housework, errands and check-ins"</p>
              <ul>
                <FeatureItem text="2 visits per week (1 hour each)" light />
                <FeatureItem text="Same staff member for consistency" light />
                <FeatureItem text="All services available" light />
              </ul>
            </div>
            <CardButton2 light />
          </div>

          {/* Welfare Check-In Package */}
          <div className="bg-white rounded-2xl shadow-lg p-10 flex flex-col justify-between">
            <div>
              <div className="flex justify-center mb-6">
                <div className="rounded-full bg-yellow-100 p-4">
                  <FiHeart size={28} className="text-yellow-500" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-center text-gray-800 mb-2">Welfare Check-In Package</h3>
              <p className="text-4xl font-bold text-center text-gray-800">£75</p>
              <p className="text-gray-500 text-center mb-2">per week</p>
              <p className="text-gray-500 italic text-center mb-6 text-sm">"Peace of mind with regular safety and wellbeing visits"</p>
              <ul>
                <FeatureItem text="5 short visits per week (20 mins each)" />
                <FeatureItem text="Safety and wellbeing checks" />
                <FeatureItem text="Conversation & reassurance" />
                <FeatureItem text="Ideal for loved ones living alone" />
                <FeatureItem text="Regular contact throughout the week" />
                <FeatureItem text="All services available" />
              </ul>
            </div>
            <CardButton3 />
          </div>
        </div>

        {/* Additional charges box */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
          <h4 className="text-[#d6a53b] font-semibold text-lg mb-4">Additional Charges</h4>
          <ul className="mb-6">
            <li className="flex items-start gap-3 mb-3">
              <FiCheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={18} />
              <span className="text-gray-700 text-base">
                <span className="font-semibold">Transport mileage: </span>
                <span className="text-[#d6a53b] font-semibold">45p per mile</span> (Canvey Island & Benfleet)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FiCheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={18} />
              <span className="text-gray-700 text-base">
                <span className="font-semibold">One-off deep clean or clearance:</span> priced separately after assessment
              </span>
            </li>
          </ul>
          <div className="bg-[#f4e3b2] rounded-lg py-4 px-6 text-center">
            <p className="text-gray-700 text-base">
              "Our clients pay for <strong>peace of mind</strong> not just cleaning."
            </p>
          </div>
        </div>

        {/* Footnote */}
        <p className="text-green-500 text-center mt-6 text-sm">
          We'll always explain any additional costs clearly before your visit.
        </p>

      </div>
    </section>
  );
}
