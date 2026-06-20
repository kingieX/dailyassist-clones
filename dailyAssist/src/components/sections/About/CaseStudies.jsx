import { useState } from "react";

const caseStudies = [
  {
    title: "Case Study 1",
    cardTitle: "Supporting an Older Adult Living Alone",
    image: "/Images/case1.png",
    profile: { name: "Mrs. H", age: "79 years", location: "Living alone in Canvey Island" },
    challenge:
      "Mrs. H's daughter works full-time and lives outside the area. She was worried about her mum missing meals, forgetting essential errands, and feeling increasingly isolated. Mrs. H didn't need medical care — just practical support and companionship.",
    solution: [
      <span>Scheduled <strong>2 home-help visits per week</strong></span>,
      "Helped with laundry, tidying, and light meal preparation",
      <span>Provided <strong>welfare check-ins</strong> to ensure she was well</span>,
      "Weekly shopping support for groceries and prescriptions",
      "Regular updates (with consent) to her daughter for peace of mind",
    ],
    outcome: [
      <span>Mrs. H reported feeling <strong>more confident and less lonely</strong></span>,
      "Her home stayed consistently tidy and safe",
      <span>Missed meals and forgotten errands dropped to <strong>zero</strong></span>,
      "Her daughter gained peace of mind knowing someone reliable checked in regularly",
    ],
    whyMatters:
      "A small amount of regular support helped Mrs. H stay independent at home — safely, comfortably, and without relying solely on family.",
  },
  {
    title: "Case Study 2",
    cardTitle: "Supporting a Family From a Distance",
   image: "/Images/case2.png",
    profile: { name: "Mr. T", age: "83 years", location: "Living in Benfleet" },
    challenge:
      "Mr. T's two adult children both live over an hour away and were struggling to keep on top of his home upkeep and welfare. He was becoming increasingly isolated and his home environment was deteriorating. He was independent but needed consistent, practical support.",
    solution: [
      "Weekly home-help visits for cleaning and tidying",
      <span>Regular <strong>companionship visits</strong> to reduce isolation</span>,
      "Errand support including post office and pharmacy runs",
      "Family liaison updates after every visit",
    ],
    outcome: [
      "Mr. T's home environment improved significantly",
      <span>He reported feeling <strong>less anxious and more engaged</strong></span>,
      "His family felt reassured with regular updates",
      "No safeguarding concerns raised during the entire service period",
    ],
    whyMatters:
      "Consistent, friendly support gave Mr. T the practical help he needed while keeping his family informed and reassured — even from a distance.",
  },
  {
    title: "Case Study 3",
    cardTitle: "Supporting Recovery After a Hospital Stay",
    image: "/Images/case3.png",
    profile: { name: "Mrs. P", age: "71 years", location: "Canvey Island" },
    challenge:
      "Mrs. P was discharged from hospital after a fall and short stay. She lived alone and her confidence had dropped significantly. Her family wanted temporary, structured support to help her ease back into her daily routine and regain her independence.",
    solution: [
      <span>Daily morning visits for the first <strong>two weeks</strong></span>,
      "Help with breakfast preparation and light tidying",
      <span>Gentle <strong>companionship and reassurance</strong> during recovery</span>,
      "Gradual step-down to twice weekly once confidence improved",
    ],
    outcome: [
      <span>Mrs. P regained her confidence within <strong>3 weeks</strong></span>,
      "She was able to manage her daily tasks independently again",
      "No readmission to hospital during the support period",
      "Family reported significant reduction in worry and stress",
    ],
    whyMatters:
      "Flexible, responsive support during a vulnerable period helped Mrs. P recover at home safely and rebuild her confidence at her own pace.",
  },
];

// Gradient X icon using SVG linearGradient (top to bottom)
function GradientX() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <defs>
        <linearGradient id="xgrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#a6c7e1" />
          <stop offset="100%" stopColor="#deb556" />
        </linearGradient>
      </defs>
      <line x1="18" y1="6" x2="6" y2="18" stroke="url(#xgrad)" />
      <line x1="6" y1="6" x2="18" y2="18" stroke="url(#xgrad)" />
    </svg>
  );
}

export default function CaseStudies() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="bg-[#DDE3E1] py-24 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-6">
          Case Studies
        </h2>
        <p className="text-gray-600 text-center text-lg mb-16">
          Real Stories of Compassionate Support and Renewed Independence.
        </p>

        {/* Accordion */}
        <div>
          {caseStudies.map((item, index) => {
            const isOpen = activeIndex === index;
            return (
              <div key={index} className="flex flex-col mb-2">

                {/* Accordion Header — hidden when open */}
                {!isOpen && (
                  <div
                    className="border-b border-gray-300 py-6 flex items-center justify-between cursor-pointer"
                    onClick={() => toggle(index)}
                  >
                    <h3 className="text-2xl font-semibold text-gray-800">{item.title}</h3>
                    <span className="text-yellow-500 text-3xl font-light select-none">+</span>
                  </div>
                )}

                {/* Dropdown Card */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-[1400px] opacity-100 mt-2" : "max-h-0 opacity-0"
                  }`}
                >
                  <div
                    className="rounded-2xl p-6 md:p-8"
                    style={{
                      border: "2px solid transparent",
                      backgroundClip: "padding-box",
                      boxShadow: "0 0 0 2px transparent",
                      outline: "2px solid",
                      outlineColor: "transparent",
                      backgroundImage: "none",
                      position: "relative",
                    }}
                  >
                    {/* Gradient border wrapper */}
                    <div
                      style={{
                        position: "relative",
                        background: "linear-gradient(to bottom, #a6c7e1, #deb556)",
                        borderRadius: "1rem",
                        padding: "2px",
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: "#dde3e1",
                          borderRadius: "calc(1rem - 2px)",
                          padding: "1.5rem",
                        }}
                      >

                        {/* Card Header — title + X */}
                        <div className="flex items-start justify-between mb-6">
                          <h4
                            className="text-xl md:text-2xl font-semibold leading-snug max-w-[85%]"
                            style={{ color: "#2b2b2b" }}
                          >
                            {item.cardTitle}
                          </h4>
                          <button
                            onClick={() => setActiveIndex(null)}
                            className="flex-shrink-0 mt-1 transition-opacity hover:opacity-70 cursor-pointer"
                          >
                            <GradientX />
                          </button>
                        </div>

                        {/* Profile + Image */}
                        <div className="flex flex-col sm:flex-row gap-6 mb-6">
                          <div className="flex-shrink-0">
                            <img
                              src={item.image}
                              alt={item.profile.name}
                              className="w-full sm:w-[200px] h-[180px] object-cover rounded-xl"
                            />
                          </div>
                          <div className="flex flex-col justify-center gap-3">
                            <p className="font-semibold text-sm uppercase tracking-wide" style={{ color: "#2b2b2b" }}>
                              Client Profile:
                            </p>
                            <p style={{ color: "#7b7b7b" }}>
                              <span className="font-medium mr-2" style={{ color: "#2b2b2b" }}>Name:</span>
                              {item.profile.name}
                            </p>
                            <p style={{ color: "#7b7b7b" }}>
                              <span className="font-medium mr-2" style={{ color: "#2b2b2b" }}>Age:</span>
                              {item.profile.age}
                            </p>
                            <p style={{ color: "#7b7b7b" }}>
                              <span className="font-medium mr-2" style={{ color: "#2b2b2b" }}>Location:</span>
                              {item.profile.location}
                            </p>
                          </div>
                        </div>

                        {/* Challenge */}
                        <div className="mb-6">
                          <p className="font-semibold text-sm uppercase tracking-wide mb-2" style={{ color: "#2b2b2b" }}>
                            The Challenge:
                          </p>
                          <p className="leading-relaxed" style={{ color: "#7b7b7b" }}>{item.challenge}</p>
                        </div>

                        {/* Solution + Outcome */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          <div>
                            <p className="font-semibold text-sm uppercase tracking-wide mb-3" style={{ color: "#2b2b2b" }}>
                              Daily Assist UK Solution:
                            </p>
                            <ul className="space-y-2">
                              {item.solution.map((point, i) => (
                                <li key={i} className="flex items-start gap-2" style={{ color: "#7b7b7b" }}>
                                  <span className="mt-1 text-yellow-500">•</span>
                                  <span>{point}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="font-semibold text-sm uppercase tracking-wide mb-3" style={{ color: "#2b2b2b" }}>
                              Outcome:
                            </p>
                            <ul className="space-y-2">
                              {item.outcome.map((point, i) => (
                                <li key={i} className="flex items-start gap-2" style={{ color: "#7b7b7b" }}>
                                  <span className="mt-1 text-yellow-500">•</span>
                                  <span>{point}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Why This Matters */}
                        <div>
                          <p className="font-semibold text-sm uppercase tracking-wide mb-2" style={{ color: "#2b2b2b" }}>
                            Why This Matters:
                          </p>
                          <p className="leading-relaxed" style={{ color: "#7b7b7b" }}>{item.whyMatters}</p>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom border shown after closed items */}
                {!isOpen && index < caseStudies.length - 1 && <div className="h-0" />}

              </div>
            );
          })}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-6 mt-12">
          <a
            href="/pricing"
           className="block w-full md:w-auto text-center bg-[#f5c045] text-black font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(250,204,21,0.6)] hover:scale-105"
          >
            Browse packages
          </a>
          <a
            href="/services"
           className="block w-full md:w-auto text-center border-2 border-[#f5c045] text-gray-800 px-8 py-3 rounded-lg transition-all duration-300 hover:bg-yellow-400 hover:text-black hover:shadow-[0_0_20px_rgba(250,204,21,0.5)] hover:scale-105"
          >
            Browse services
          </a>
        </div>

      </div>
    </section>
  );
}