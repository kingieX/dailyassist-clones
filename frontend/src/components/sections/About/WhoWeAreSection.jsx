
export default function WhoWeAreSection() {
  return (
    <section className="bg-[#fafafa] py-20">
     <div className="max-w-6xl mx-auto px-6 md:px-12 text-center">

        {/* Title */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 tracking-tight mb-6">
          Who We Are
        </h2>

        {/* Description */}
        <p className="text-base md:text-xl text-gray-600 leading-relaxed text-center max-w-3xl mx-auto mb-8">
          Daily Assist UK provides practical, friendly, and reliable help for people who want
          to stay independent at home. We support older adults, busy families, people
          recovering from illness, and anyone who needs a little extra assistance day-to-day.
        </p>

       {/* Highlight statement card */}
        <div className="flex justify-center mb-20">
          <div className="bg-white text-gray-800 rounded-md px-8 py-6 max-w-4xl shadow-lg border-l-4 border-l-4 border-[#8fcf9a] text-left">
            <p className="text-base md:text-1xl leading-relaxed">
              <span className="font-bold">We are not a care agency</span> — we provide non-medical home-help and companionship designed around your routine and preferences.
            </p>
          </div>
        </div>

        {/* Row 1 — Mission: Text left, Image right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">

          {/* Text */}
          <div>
            <h3 className="text-3xl md:text-5xl font-semibold text-blue-600">
              Our Mission
            </h3>
           <p className="text-center md:text-left max-w-2xl text-base md:text-xl text-gray-600 leading-relaxed mt-3">
              Our mission is to provide safe, reliable and friendly everyday assistance
              that helps people stay independent, connected and comfortable in their own homes.
            </p>
          </div>

          {/* Oval image with cloudy/feathered edges */}
           <div>
        <div className="relative w-[130vw] left-1/2 -translate-x-1/2 h-[280px] md:w-[460px] md:h-[370px]">
  <img
    src="/Images/bg4.png"
    loading="lazy" alt="Our mission"
    className="w-full h-full object-cover"
    style={{
      borderRadius: "50%",
     maskImage:
  "radial-gradient(ellipse 85% 80% at 50% 50%, black 15%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.15) 65%, transparent 95%)",
      WebkitMaskImage:
        "radial-gradient(ellipse 68% 65% at 50% 50%, black 30%, rgba(0,0,0,0.6) 55%, rgba(0,0,0,0.1) 70%, transparent 85%)",
      filter: "drop-shadow(0 0 18px rgba(255,255,255,0.9))",
    }}
  />
</div>
          </div>
        </div>

        {/* Row 2 — Vision: Image left, Text right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Oval image — shows first on mobile, left on desktop */}
        <div className=" order-2 lg:order-1 mt-6 lg:mt-0">
      <div className="relative w-[130vw] left-1/2 -translate-x-1/2 h-[280px] md:w-[460px] md:h-[370px]">
  <img
    src="/Images/bg5.png"
    loading="lazy" alt="Our mission"
    className="w-full h-full object-cover"
    style={{
      borderRadius: "50%",
     maskImage:
  "radial-gradient(ellipse 85% 80% at 50% 50%, black 15%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.15) 65%, transparent 95%)",
      WebkitMaskImage:
  "radial-gradient(ellipse 75% 75% at 50% 50%, black 20%, rgba(0,0,0,0.5) 45%, rgba(0,0,0,0.15) 65%, transparent 90%)",
      filter: "drop-shadow(0 0 18px rgba(255,255,255,0.9))",
    }}
  />
</div>
          </div>

          {/* Text */}
        <div className="order-1 lg:order-2">
            <h3 className="text-2xl md:text-5xl font-semibold text-yellow-500">
              Our Vision
            </h3>
           <p className="text-center md:text-left max-w-2xl text-base md:text-xl text-gray-600 leading-relaxed mt-3">
              Our vision is to become the most trusted home-help and companionship provider
              in Canvey Island and Benfleet, known for professionalism, clear communication,
              and consistent standards.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}