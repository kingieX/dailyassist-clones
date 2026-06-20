import { FiMapPin, FiPhone } from "react-icons/fi";
import { FaStar } from "react-icons/fa";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-[url('/Images/Sub-images/Hero.png')] bg-cover bg-center bg-no-repeat -mt-16">

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 w-full py-20">

        {/* Location badge */}
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-sm font-medium px-4 py-2 rounded-full mb-6">
          <FiMapPin size={16} className="text-[#f5c045]" />
          Serving Canvey Island &amp; Benfleet
        </div>

        {/* Main heading */}
        <h1 className="text-white font-bold leading-[1.1] text-4xl md:text-5xl lg:text-6xl max-w-3xl mb-6">
          Friendly Home-Help &amp; Daily Support in Canvey Island &amp; Benfleet.
        </h1>

        {/* Subtext with left accent border */}
        <p className="text-white/90 text-base md:text-lg max-w-xl mb-8 border-l-4 border-[#f5c045] pl-4">
          Helping older adults, families, and recovering individuals stay independent at home.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
         
          {/* Primary button */}
          
          <a href="/contact"
  className="inline-flex items-center justify-center gap-2 bg-[#f5c045] text-black font-semibold px-6 py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-[0_0_25px_rgba(245,192,69,0.8),_inset_0_0_18px_rgba(245,192,69,0.6)] hover:brightness-110 w-full sm:w-auto"
>
  <FiPhone size={18} />
  Book a Free Consultation
</a>
           
          {/* Secondary button */}
          
            <a href="/services"
           className="inline-flex items-center justify-center px-20 py-3 rounded-lg border-2 border-[#f5c045] text-white font-medium transition-all duration-300 hover:shadow-[0_0_25px_rgba(245,192,69,0.8),_inset_0_0_18px_rgba(245,192,69,0.6)] hover:border-[#f5c045] w-full sm:w-auto"
          >
            View Services
          </a>
        </div>
      </div>

      {/* Floating trust card — bottom right */}
     <div className="hidden md:block absolute bottom-10 right-6 md:right-16 z-10 bg-white rounded-xl shadow-xl p-4 w-52">
        <p className="text-sm font-semibold text-gray-800 mb-2">
          Trusted Local Service
        </p>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} size={14} className="text-[#f5c045]" />
          ))}
        </div>
      </div>

    </section>
  );
}
