import { useEffect, useRef, useState } from "react";

const benefits = [
  "Enhanced DBS support",
  "Competitive hourly pay",
  "Mileage reimbursement",
  "Flexible working patterns",
  "Minimum visit times — no rushed visits",
  "Training and onboarding",
  "Ongoing support from a friendly local team",
  "Holiday entitlement (pro rata)",
];

const CheckIcon = () => (
  <svg
    className="w-5 h-5 flex-shrink-0 mt-0.5"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="10" stroke="#22c55e" strokeWidth="2" />
    <path
      d="M8 12l3 3 5-5"
      stroke="#22c55e"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const WhyJoinSection = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="w-full bg-[#fafafa] py-12 px-5 sm:py-16 sm:px-10 lg:py-24 lg:px-20">
      <div className="max-w-7xl mx-auto">

        {/* ── TOP INTRO ── */}
        <div
          ref={sectionRef}
          className="text-left mb-16"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <h2
            className="text-2xl lg:text-5xl font-semibold"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: "#1f2937",
            }}
          >
            {/* Your Header Here */}
            Why Work With Daily Assist UK?
          </h2>
          <p
            className="mt-4 text-base text-left"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: "20px",
              lineHeight: "145%",
              letterSpacing: "0.02em",
              color: "#6b7280",
            }}
          >
            {/* Your paragraph here */}
            At Daily Assist UK, we believe that great support starts with feeling valued. We are a local home-help service that treats our team with respect, fairness, and care.

            You don’t need previous experience — what matters most is your attitude, reliability, and willingness to help others.
          </p>
        </div>

        {/* ── MAIN 2-COLUMN GRID ── */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(32px)",
            transition: "opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s",
          }}
        >

          {/* ── LEFT: TEXT CONTENT ── */}
          <div>
            {/* Main Heading */}
            <h2
              className="text-2xl lg:text-[2.75rem] font-bold mb-5 whitespace-nowrap"
              style={{ fontFamily: "'Inter', sans-serif", color: "#1f2937" }}
            >
              Why Join Daily Assist UK?
            </h2>

            {/* Subtitle with gold underline */}
            <div className="mb-6">
              <p
                className="text-2xl font-semibold"
                style={{ fontFamily: "'Inter', sans-serif", color: "#1f2937" }}
              >
                Benefits
              </p>
              <div
                className="mt-2 h-[3px] w-10 rounded-full"
                style={{ backgroundColor: "#f5c045" }}
              />
            </div>

            {/* Benefits List */}
            <ul className="space-y-4">
              {benefits.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckIcon />
                  <span
                    className="text-xl font-medium"
                    style={{ fontFamily: "'Inter', sans-serif", color: "#374151" }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* ── RIGHT: IMAGE ── */}
          <div className="mx-auto w-full max-h-[500px] overflow-hidden rounded-2xl shadow-lg">
            <img
              src="/Images/WhyChoose.png"
              loading="lazy" alt="Team Image"
              className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-500"
              style={{ maxHeight: "500px" }}
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyJoinSection;