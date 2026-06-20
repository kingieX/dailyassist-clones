
import { useState, useEffect } from "react";

const BACKGROUNDS = [
  "/Images/ServicesImage/bg1.png",
  "/Images/ServicesImage/bg2.png",
  "/Images/bg3.png",
  "/Images/bg4.png",
];

const SLIDES = [...BACKGROUNDS, BACKGROUNDS[0]];

const STEPS = [
  {
    number: 1,
    title: "Free Phone Consultation",
    description: "We discuss what you need, how often you want visits, and any preferences you have.",
    circleColor: "bg-yellow-400",
    titleColor: "text-yellow-400",
    glowColor: "hover:shadow-[0_0_20px_rgba(250,204,21,0.4)]",
    dotColor: "border-yellow-400",
  },
  {
    number: 2,
    title: "Home Introduction Visit",
    description: "We meet you at home (with a family member if you prefer) to understand your routine.",
    circleColor: "bg-blue-500",
    titleColor: "text-blue-400",
    glowColor: "hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]",
    dotColor: "border-blue-400",
  },
  {
    number: 3,
    title: "Start of Service",
    description: "We agree on visit times, assign a regular staff member, and begin support at your pace.",
    circleColor: "bg-red-400",
    titleColor: "text-red-400",
    glowColor: "hover:shadow-[0_0_20px_rgba(248,113,113,0.4)]",
    dotColor: "border-red-400",
  },
  {
    number: 4,
    title: "Regular Check-Ins",
    description: "We review needs regularly to make sure the service is always right for you.",
    circleColor: "bg-green-400",
    titleColor: "text-green-400",
    glowColor: "hover:shadow-[0_0_20px_rgba(74,222,128,0.4)]",
    dotColor: "border-green-400",
  },
];

export default function HowItWorks() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setCurrent((prev) => prev + 1);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (current === SLIDES.length - 1) {
      const timeout = setTimeout(() => {
        setIsTransitioning(false);
        setCurrent(0);
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [current]);

  useEffect(() => {
    if (!isTransitioning) {
      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsTransitioning(true));
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [isTransitioning]);

  return (
    <section className="relative w-full py-16 md:py-24 overflow-hidden min-h-[400px] md:min-h-[600px]">

      {/* Background Slider */}
      <div className="absolute inset-0 z-0">
        <div
          className="flex h-full"
          style={{
            width: `${SLIDES.length * 100}%`,
            transform: `translateX(-${(current * 100) / SLIDES.length}%)`,
            transition: isTransitioning ? "transform 800ms ease-in-out" : "none",
          }}
        >
          {SLIDES.map((bg, i) => (
            <div
              key={i}
              style={{
                width: `${100 / SLIDES.length}%`,
                flexShrink: 0,
                backgroundImage: `url(${bg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          ))}
        </div>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40 z-10" />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12">

        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-6">
          How It Works
        </h2>

        <p className="text-gray-200 text-lg text-center max-w-2xl mx-auto mb-16">
          Getting started with Daily Assist UK is simple. We make the process as easy and comfortable as possible.
        </p>

        {/* Steps — zigzag on mobile, grid on desktop */}
        <div className="flex flex-col gap-12 relative lg:grid lg:grid-cols-4 lg:gap-6 lg:flex-none">
          {STEPS.map((step, index) => (
            <div
              key={step.number}
              className={`relative flex items-center lg:flex-col lg:items-center ${
                index % 2 === 0 ? "justify-start" : "justify-end"
              } lg:justify-center`}
            >

              {/* Number circle */}
              <div
                className={`absolute lg:static lg:mb-3 top-0 w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-lg ${step.circleColor} ${
                  index % 2 === 0 ? "left-0" : "right-0"
                } lg:left-auto lg:right-auto`}
              >
                {step.number}
              </div>

              {/* Curved dotted line — mobile only */}
              <div
                className={`absolute lg:hidden top-6 w-16 h-16 border-dashed border-2 ${step.dotColor} ${
                  index % 2 === 0
                    ? "left-10 rounded-bl-2xl border-t-0 border-r-0"
                    : "right-10 rounded-br-2xl border-t-0 border-l-0"
                }`}
              />

              {/* Dashed connector lines — desktop only */}
              <div className="hidden lg:flex items-center w-full mb-3">
                {index > 0 ? (
                  <div className={`flex-1 border-t-2 border-dashed mx-3 ${step.dotColor}`} />
                ) : (
                  <div className="flex-1 mx-3 opacity-0 border-t-2 border-dashed border-white" />
                )}
                {index < STEPS.length - 1 ? (
                  <div className={`flex-1 border-t-2 border-dashed mx-3 ${step.dotColor}`} />
                ) : (
                  <div className="flex-1 mx-3 opacity-0 border-t-2 border-dashed border-white" />
                )}
              </div>

              {/* Card */}
              <div
                className={`w-[80%] lg:w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 text-center text-white shadow-lg transition-all duration-300 hover:scale-105 ${step.glowColor} ${
                  index % 2 === 0 ? "ml-16 lg:ml-0" : "mr-16 lg:mr-0"
                }`}
              >
                <h3 className={`text-lg font-semibold mb-4 ${step.titleColor}`}>
                  {step.title}
                </h3>
                <p className="text-gray-200 text-sm md:text-base leading-relaxed">
                  {step.description}
                </p>
              </div>

            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="mt-12 flex flex-wrap justify-center gap-6">
          
           <a href="/about"
            className="inline-flex items-center gap-2 bg-[#f5c045] text-black font-semibold px-20 py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-[0_0_25px_rgba(245,192,69,0.8),_inset_0_0_18px_rgba(245,192,69,0.6)] hover:brightness-110"
          >
            More about us
          </a>
          
           <a href="/services"
            className="inline-flex items-center justify-center px-20 py-3 rounded-lg border-2 border-[#f5c045] text-white font-medium transition-all duration-300 hover:shadow-[0_0_25px_rgba(245,192,69,0.8),_inset_0_0_18px_rgba(245,192,69,0.6)] hover:border-[#f5c045]"
          >
            Browse services
          </a>
        </div>

      </div>
    </section>
  );
}