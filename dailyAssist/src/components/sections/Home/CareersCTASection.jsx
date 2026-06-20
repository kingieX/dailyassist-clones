export default function CareersCTASection() {
  return (
    <section className="w-full bg-[#294863] py-20 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Inner card */}
        <div className="bg-[#3f5970] border border-yellow-400 rounded-2xl py-16 px-8 md:px-20 text-center">

          {/* Heading */}
          <h2 className="text-xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight mb-6">
            Looking for Meaningful Work In Your Community?
          </h2>

          {/* Description */}
          <p className="text-base md:text-lg text-gray-200 leading-relaxed max-w-2xl mx-auto mb-10">
            Join Daily Assist UK and help people stay independent at home.
            Flexible hours, supportive team and real impact.
          </p>

          {/* CTA Button */}
          <div className="flex justify-center">
            
             <a href="/Job"
              className="px-12 py-4 rounded-lg font-medium text-base bg-[#f0b83f] text-[#1f2937] shadow-[0_0_15px_rgba(240,184,63,0.6)] transition-all duration-300 hover:shadow-[0_0_25px_rgba(240,184,63,0.9)] hover:-translate-y-0.5"
            >
              Apply Now
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
