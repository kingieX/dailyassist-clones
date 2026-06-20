const WorkingHours = () => {
  return (
    <section className="relative bg-[#F5E6C8] py-12 px-6 md:px-16 lg:px-25 overflow-hidden">

      {/* Decorative Corner Shape — Top Right */}
      <div className="absolute top-6 right-6 z-0 w-10 md:w-14 opacity-90">
        <img
          src="/Images/IMG and VECTOR/Quote.png"
          loading="lazy" alt=""
          className="w-full h-full object-contain"
        />
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 items-start">

          {/* ── LEFT SIDE ── */}
          <div>
            {/* Main Heading */}
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6 md:mb-10">
              Working<br />
              Hours &<br />
              Availability
            </h2>

            {/* Operating Hours Subtext */}
            <p className="text-gray-800 text-lg sm:text-xl md:text-2xl leading-relaxed font-semibold">
              Daily Assist UK operates<br />
              Monday to Saturday,<br />
              <span className="font-bold">8:00am – 6:00pm.</span>
            </p>
          </div>

          {/* ── RIGHT SIDE ── */}
          <div className="flex flex-col gap-6">

            {/* Descriptive Paragraphs */}
            <div className="space-y-4">
              <p className="text-gray-800 text-base sm:text-lg md:text-2xl leading-relaxed">
                Working hours and schedules are discussed in advance and planned
                fairly to suit both staff and client needs.
              </p>
              <p className="text-gray-800 text-base sm:text-lg md:text-2xl leading-relaxed">
                Some Saturday availability may be required, depending on the role.
              </p>
            </div>

            {/* Info Card */}
            <div className="bg-[#f4faf5] border border-green-300 rounded-xl p-5 md:p-6 flex items-start gap-4 shadow-md mt-2 md:mt-4">

              {/* Icon */}
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-green-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg
                  className="w-4 h-4 md:w-5 md:h-5 text-green-700"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>

              {/* Text */}
              <div>
                <p className="font-semibold text-gray-900 mb-1 text-base md:text-xl">You should know</p>
                <p className="text-gray-700 text-base md:text-xl">
                  We do not offer overnight, emergency, or on-call shifts.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WorkingHours;