// src/components/sections/WhoWeAre.jsx

export default function WhoWeAre() {
  return (
    <section className="w-full bg-[#fafafa] py-20 md:py-28 lg:py-32">
      <div className="max-w-6xl mx-auto px-6 md:px-12 text-center">

        {/* Title */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 tracking-tight mb-6">
          Who We Are
        </h2>

        {/* Description */}
        <p className="text-gray-500 text-xl md:text-xl leading-relaxed max-w-5xl mx-auto mb-12">
          Daily Assist UK provides practical, friendly, and reliable help for people who want to stay independent at home. We support older adults, busy families, people recovering from illness, and anyone who needs a little extra assistance day-to-day.
        </p>

        {/* Highlight statement card */}
        <div className="flex justify-center mb-20">
          <div className="bg-white text-gray-800 rounded-md px-8 py-6 max-w-4xl shadow-lg border-l-4 border-l-4 border-[#8fcf9a] text-left">
            <p className="text-xl md:text-1xl leading-relaxed">
              <span className="font-bold">We are not a care agency</span> — we provide non-medical home-help and companionship designed around your routine and preferences.
            </p>
          </div>
        </div>

        {/* Mission & Vision grid */}
        <div className="grid gap-16 md:grid-cols-2 text-center items-start">

          {/* Our Mission */}
          <div>
            <h3 className="text-2xl md:text-5xl font-bold text-blue-500 mb-6">
              Our Mission
            </h3>
            <p className="text-gray-500 leading-relaxed text-xl md:text-xl ">
              Our mission is to provide safe, reliable and friendly everyday assistance that helps people stay independent, connected and comfortable in their own homes.
            </p>
          </div>

          {/* Our Vision */}
          <div>
            <h3 className="text-2xl md:text-5xl font-bold text-[#f5c045] mb-6">
              Our Vision
            </h3>
            <p className="text-gray-500 leading-relaxed text-xl md:text-xl">
              Our vision is to become the most trusted home-help and companionship provider in Canvey Island and Benfleet, known for professionalism, clear communication, and consistent standards.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
