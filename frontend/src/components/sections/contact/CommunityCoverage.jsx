
import { FiCheckCircle } from "react-icons/fi";

const AREAS = [
  "Canvey Island — All areas covered",
  "Benfleet — Comprehensive coverage",
  "Surrounding areas — Please enquire",
];

export default function CommunityCoverage() {
  return (
    <section className="w-full bg-[#fafafa] py-24 px-10 md:px-16 lg:px-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left — Content */}
          <div className="flex flex-col">

          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight relative inline-block">
  <span className="relative inline-block">
    <img
      src="/Images/service-vector.png"
      loading="lazy" alt="Brush underline"
      className="absolute left-[-20] -bottom-5 w-[140%] h-6 object-contain"
      style={{ zIndex: 0 }}
    />
    <span className="relative" style={{ zIndex: 1 }}>
      Proudly Serving
    </span>
  </span>{" "}
  Your Local Community
</h2>

            <p className="text-gray-500 text-base md:text-lg leading-relaxed mt-6 max-w-lg">
              As a local service, we understand the unique needs of our
              community. We're proud to serve residents across Canvey Island
              and Benfleet, providing personalized care that makes a real
              difference.
            </p>

            <ul className="mt-8 space-y-3">
              {AREAS.map((area, i) => (
                <li key={i} className="flex items-center gap-3">
                  <FiCheckCircle size={20} className="text-green-500 flex-shrink-0" />
                  <span className="text-gray-600 text-base md:text-lg">{area}</span>
                </li>
              ))}
            </ul>

            <div className="flex items-start mt-8 border-l-4 border-[#f5c045] pl-4">
              <p className="text-gray-400 italic text-sm md:text-base">
                "Nearby areas may be considered subject to availability"
              </p>
            </div>

            {/* ── BUTTONS ── */}
            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              
                <a href="/pricing"
                className="flex items-center justify-center bg-[#f5c045] text-black font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:brightness-110 hover:shadow-lg hover:scale-[1.02] w-full sm:w-auto"
              >
                Browse Price List
              </a>
              
               <a href="/services"
                className="flex items-center justify-center border-2 border-[#f5c045] text-gray-800 font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:bg-[#f5c045]/10 hover:shadow-md w-full sm:w-auto"
              >
                Browse Services
              </a>
            </div>

          </div>

        {/* Right — Image */}
<div className="w-full">
  <img
    src="/Images/House.png"
    loading="lazy" alt="Local community home in Canvey Island"
    className="w-full h-[220px] md:h-[420px] object-cover rounded-2xl shadow-xl"
  />
</div>

        </div>
      </div>
    </section>
  );
}