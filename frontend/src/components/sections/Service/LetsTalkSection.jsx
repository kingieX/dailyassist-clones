export default function LetsTalkSection() {
  return (
    <section className="relative w-full min-h-[520px] flex items-center justify-center overflow-hidden">

      {/* Background image placeholder — replace the bg-gray-700 with your actual image */}
      <div
        className="absolute inset-0 bg-gray-700 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/Images/talk.png')" }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 py-20 max-w-3xl mx-auto">

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6">
 
  <span className="bg-gradient-to-r from-[#a8d8f0] to-[#4a9fd4] bg-clip-text text-transparent">
    Let's Talk About How We Can Help
  </span>
</h2>

        {/* Subtext */}
        <p className="text-white/85 text-base sm:text-lg max-w-xl mb-10 leading-relaxed">
          If you'd like to learn more about our services or discuss support for yourself or
          a loved one, we're happy to talk.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">

          {/* Primary CTA */}
          <a
            href="/contact"
         className="block w-[110%] -ml-[5%] md:w-auto md:ml-0 text-center px-8 py-3 rounded-md bg-[#4a9fd4] text-white font-semibold text-sm sm:text-base transition-all duration-300 hover:shadow-[0_0_18px_rgba(74,159,212,0.7)] hover:bg-[#3a8fc4]"
          >
            Book a Free Consultation
          </a>

          {/* Secondary CTA */}
          <a
            href="/contact"
         className="block w-[110%] -ml-[5%] md:w-auto md:ml-0 text-center px-16 py-3 rounded-md border border-[#4a9fd4] text-white font-semibold text-sm sm:text-base transition-all duration-300 hover:shadow-[0_0_18px_rgba(255,255,255,0.35)] hover:bg-white/10"
          >
            Contact Us
          </a>

        </div>
      </div>
    </section>
  );
}