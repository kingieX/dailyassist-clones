
const stats = [
  { number: "500", label: "Happy Clients Supported" },
  { number: "700", label: "Home Visits Completed" },
  { number: "100", label: "Team Members" },
];

export default function AboutHeroSection() {
  return (
    <section
     className="relative w-full min-h-[101vh] sm:min-h-[90vh] lg:min-h-[800px] flex items-center justify-center text-center bg-cover bg-center bg-no-repeat overflow-hidden -mt-[80px]"
      style={{ backgroundImage: "url('/Images/bg3.png')" }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Title */}
      <h1 className="relative z-10 text-4xl md:text-5xl lg:text-6xl font-bold text-[#f2d18c] tracking-tight pb-20 sm:pb-24">
        About Us
      </h1>

      {/* Floating stats card */}
      <div className="absolute bottom-[20px] left-1/2 -translate-x-1/2 z-20 w-[90%] max-w-4xl bg-white rounded-2xl shadow-xl border border-gray-200 py-4 px-4 sm:py-6 sm:px-10">

        {/* All breakpoints: single row with vertical dividers */}
        <div className="flex flex-row items-center justify-around">

          {stats.map((stat, index) => (
            <div key={index} className="flex flex-row items-center">

              {/* Vertical divider before 2nd and 3rd item — all screen sizes */}
              {index !== 0 && (
                <div className="w-[2px] h-10 sm:h-12 bg-yellow-400 mx-3 sm:mx-8" />
              )}

              <div className="flex flex-col items-center">
                <p className="text-xl sm:text-3xl md:text-4xl font-bold text-gray-800">
                  {stat.number}
                  <span className="text-yellow-500">+</span>
                </p>
                <p className="text-xs sm:text-sm md:text-base text-gray-600 mt-1 text-center">
                  {stat.label}
                </p>
              </div>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}