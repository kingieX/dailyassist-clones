
import { Link } from "react-router-dom";
import MoreServices from "./MoreServicesSlider";
import { FiCheckCircle } from "react-icons/fi";

export default function ServiceDetailTemplate({
  title,
  description,
  heroImage,
  secondaryImage,
  aboutText,
  includedItems,
  titleClassName,
}) {
  return (
    <section className="bg-[#fafafa] min-h-screen relative overflow-hidden">
     <div className="max-w-6xl mx-auto px-4 py-16 relative z-10">

        {/* Back Navigation */}
        <Link
          to="/services"
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors mb-6"
        >
          ← Services
        </Link>

        {/* Top Header Area */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-8">

          {/* Left — Heading + brush stroke */}
          <div>
            <div className="relative inline-block mb-3">
        <img
  src="/Images/Vector 2.png"
  loading="lazy" alt=""
  className="absolute bottom-[-8px] md:bottom-[-15px] left-8 opacity-90 z-0 w-32 md:w-auto"
  style={{ transform: "rotate(-1deg)" }}
/>
             <h1 className={titleClassName || "relative text-xl md:text-4xl font-bold text-gray-900 z-10"}>
  {title}
</h1>
            </div>
            <p className="text-gray-500 text-sm md:text-base max-w-md">
              {description}
            </p>
          </div>

          {/* Right — Browse Packages Button */}
          <div className="flex-shrink-0">
            <Link
              to="/pricing"
              className="inline-block bg-[#f5c045] text-black font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(250,204,21,0.6)] hover:scale-105"
            >
              Browse packages
            </Link>
          </div>
        </div>

        {/* Hero Image */}
        <div className="w-full h-[260px] md:h-[420px] rounded-2xl overflow-hidden mb-10 shadow-lg">
          <img
            src={heroImage}
            alt={title}
            className="w-full h-full object-cover object-top"
          />
        </div>

        {/* Bottom Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* LEFT CARD — About Service */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              About this service
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              {aboutText}
            </p>

            <h2 className="text-lg font-bold text-gray-900 mb-4">
              What's included in this service?
            </h2>

            <ul className="space-y-3 mb-6">
              {includedItems.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-gray-700">
                  <FiCheckCircle className="text-green-500 flex-shrink-0" size={18} />
                  {item}
                </li>
              ))}
            </ul>

            {/* Secondary Image */}
            <div className="w-full h-58 rounded-xl overflow-hidden">
              <img
                src={secondaryImage}
                alt={`${title} secondary`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* RIGHT CARD — Contact Form */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
              Get in contact with us!
            </h2>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  placeholder="Full name"
                  className="w-full p-3 rounded-md bg-gray-100 border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  placeholder="example@mail.com"
                  className="w-full p-3 rounded-md bg-gray-100 border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  placeholder="(123) 456 - 789"
                  className="w-full p-3 rounded-md bg-gray-100 border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Subject</label>
                <input
                  type="text"
                  placeholder="ex. Pricing"
                  className="w-full p-3 rounded-md bg-gray-100 border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Message</label>
                <textarea
                  placeholder="Please type your message here..."
                  className="w-full p-3 rounded-md bg-gray-100 border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-yellow-400 h-32 resize-none"
                />
              </div>

              <button className="w-full bg-[#f5c045] text-black font-semibold py-3 rounded-lg mt-2 transition-all duration-300 hover:shadow-[0_0_20px_rgba(250,204,21,0.6)] hover:scale-[1.02]">
                Send Message
              </button>
            </div>
          </div>

        </div>
      </div>
      {/* More Services Section */}
      <MoreServices />
    </section>
  );
}


