
import { useState } from "react";

const CareersHero = () => {
  const [vacanciesHovered, setVacanciesHovered] = useState(false);
  const [applyHovered, setApplyHovered] = useState(false);

  return (
    <section className="relative min-h-[610px] w-full flex flex-col overflow-hidden -mt-[80px]">
      {/* Background Image */}
      <img
        src="/Images/Career image.png"
        loading="lazy" alt="Careers Hero"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 z-[1]" />

      {/* Content Wrapper */}
     <div className="relative z-10 flex flex-col min-h-[80vh] px-4 sm:px-8 lg:px-12 pt-40 pb-16 lg:pt-48 lg:pb-24">

        {/* Breadcrumb — Top Left */}
        <nav className="flex items-center gap-2 absolute top-28 left-20">
          <span
            onClick={() => window.location.href = "/"}
            className="font-medium text-sm sm:text-base text-white hover:opacity-70 transition-opacity duration-200 cursor-pointer"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Home
          </span>
          <span
            onClick={() => window.location.href = "/"}
            className="text-sm sm:text-base text-white hover:opacity-70 transition-opacity duration-200 select-none cursor-pointer"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            ›
          </span>
          <span
            className="text-sm sm:text-base font-medium"
            style={{ fontFamily: "'Inter', sans-serif", color: "#f5c045" }}
          >
            Careers
          </span>
        </nav>

        {/* Center Content */}
        <div className="flex flex-col items-center justify-center text-center flex-1">

          {/* Heading */}
          <h1
            className="text-3xl sm:text-3xl lg:text-5xl font-semibold text-white max-w-3xl leading-tight"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Join the Daily Assist UK Team
          </h1>

          {/* Paragraph */}
          <p
            className="mt-8 text-white/90 max-w-2xl text-center"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "20px",
              fontWeight: 500,
              lineHeight: "145%",
              letterSpacing: "0.02em",
            }}
          >
            Help people stay independent, comfortable, and connected in their
            own homes — with flexible, rewarding work that truly matters.
          </p>

          {/* CTA Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row items-center gap-4">

            {/* Button 1: View Current Vacancies */}
            <button
            onClick={() => document.getElementById('current-vacancies').scrollIntoView({ behavior: 'smooth' })}
              onMouseEnter={() => setVacanciesHovered(true)}
              onMouseLeave={() => setVacanciesHovered(false)}
              className="px-6 py-3 rounded-lg font-medium text-black transition-all duration-300 cursor-pointer w-full sm:w-auto"
              style={{
                backgroundColor: "#f5c045",
                fontFamily: "'Inter', sans-serif",
                boxShadow: vacanciesHovered
                  ? "0 0 25px rgba(245,192,69,0.85)"
                  : "0 0 15px rgba(245,192,69,0.6)",
                transform: vacanciesHovered ? "scale(1.05)" : "scale(1)",
              }}
            >
              View Current Vacancies
            </button>

            {/* Button 2: Apply Now */}
            <button
            onClick={() => document.getElementById('current-vacancies').scrollIntoView({ behavior: 'smooth' })}
              onMouseEnter={() => setApplyHovered(true)}
              onMouseLeave={() => setApplyHovered(false)}
              className="px-16 py-3 rounded-lg font-medium text-white bg-blue-500 transition-all duration-300 cursor-pointer w-full sm:w-auto"
              style={{
                fontFamily: "'Inter', sans-serif",
                boxShadow: applyHovered
                  ? "0 0 25px rgba(59,130,246,0.85)"
                  : "0 0 15px rgba(59,130,246,0.6)",
                transform: applyHovered ? "scale(1.05)" : "scale(1)",
              }}
            >
              Apply Now
            </button>

          </div>
        </div>

      </div>
    </section>
  );
};

export default CareersHero;