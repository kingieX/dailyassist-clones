// import { useState } from "react";

// import ApplyJob from "../../../pages/ApplyJob";

// const vacancies = [
//   {
//     id: 1,
//     title: "Home-Help & Support Assistant",
//     description:
//       "This role focuses on practical assistance, companionship, and wellbeing support to help clients live independently and comfortably.",
//     payRate: "£13.00 per hour",
//     contractType: "Zero-Hours Contract",
//   },
// ];

// const CurrentVacancies = () => {
//   const [applyHovered, setApplyHovered] = useState(null);
//   const [viewHovered, setViewHovered] = useState(null);

//   const [showApply, setShowApply] = useState(false);
// if (showApply) return <ApplyJob onBack={() => setShowApply(false)} />; 

//   return (
//     <section id="current-vacancies" className="w-full bg-[#1d3a54] py-12 px-5 sm:py-16 sm:px-10 lg:py-20 lg:px-20">
//       <div className="max-w-6xl mx-auto">

//         {/* Section Title */}
//         <h2
//           className="text-2xl lg:text-5xl font-bold mb-8"
//           style={{ fontFamily: "'Inter', sans-serif", color: "white" }}
//         >
//           Current Vacancies
//         </h2>

//         {/* Vacancy Cards */}
//         <div className="flex flex-col gap-6">
//           {vacancies.map((vacancy) => (
//             <div
//               key={vacancy.id}
//               className="w-full rounded-xl border-2 border-white/30 shadow-sm p-5 lg:p-8"
//               style={{ backgroundColor: "#1d3a54" }}
//             >
//               {/* Role Title */}
//               <h3
//                 className="text-2xl font-bold mb-4"
//                 style={{
//                   fontFamily: "'Inter', sans-serif",
//                   fontSize: "24px",
//                   fontWeight: 700,
//                   lineHeight: "120%",
//                   letterSpacing: "-0.02em",
//                   color: "white",
//                 }}
//               >
//                 {vacancy.title}
//               </h3>

//               {/* Description */}
//               <p
//                 className="mb-6 max-w-3xl text-white/90"
//                 style={{
//                   fontFamily: "'Inter', sans-serif",
//                   fontWeight: 500,
//                   fontSize: "23px",
//                   lineHeight: "145%",
//                   letterSpacing: "0.02em",
//                 }}
//               >
//                 {vacancy.description}
//               </p>

//               {/* Details */}
//               <div className="space-y-3 mb-6">
//                 {/* Pay Rate */}
//                 <p
//                   className="text-xl font-semibold text-white"
//                   style={{ fontFamily: "'Inter', sans-serif" }}
//                 >
//                   Pay Rate&nbsp;&nbsp;
//                   <span className="font-bold">{vacancy.payRate}</span>
//                 </p>

//                 {/* Contract Type */}
//                 <p
//                   className="text-xl font-medium text-white/80"
//                   style={{ fontFamily: "'Inter', sans-serif" }}
//                 >
//                   <span className="font-semibold text-white">Contract Type:</span>
//                   &nbsp; {vacancy.contractType}
//                 </p>
//               </div>

//               {/* Buttons */}
//               <div className="flex flex-col sm:flex-row gap-4">

//                 {/* Apply for This Role */}
//                 <button
//                  onClick={() => setShowApply(true)} 
//                   onMouseEnter={() => setApplyHovered(vacancy.id)}
//                   onMouseLeave={() => setApplyHovered(null)}
//                   className="px-16 py-3 rounded-lg font-medium text-black transition-all duration-300 cursor-pointer"
//                   style={{
//                     backgroundColor: "#f5c045",
//                     fontFamily: "'Inter', sans-serif",
//                     boxShadow:
//                       applyHovered === vacancy.id
//                         ? "0 0 25px rgba(245,192,69,0.85)"
//                         : "0 0 15px rgba(245,192,69,0.6)",
//                     transform:
//                       applyHovered === vacancy.id ? "scale(1.05)" : "scale(1)",
//                   }}
//                 >
//                   Apply for This Role
//                 </button>

//                 {/* View Job Description */}
//                 <button
//                   onMouseEnter={() => setViewHovered(vacancy.id)}
//                   onMouseLeave={() => setViewHovered(null)}
//                   className="px-16 py-3 rounded-lg font-medium text-white transition-all duration-300 cursor-pointer bg-transparent"
//                   style={{
//                     fontFamily: "'Inter', sans-serif",
//                     border: "1px solid #f5c045",
//                     boxShadow:
//                       viewHovered === vacancy.id
//                         ? "inset 0 0 18px rgba(245,192,69,0.6)"
//                         : "inset 0 0 10px rgba(245,192,69,0.4)",
//                     transform:
//                       viewHovered === vacancy.id ? "scale(1.05)" : "scale(1)",
//                   }}
//                 >
//                   View Job Description
//                 </button>

//               </div>
//             </div>
//           ))}
//         </div>

//       </div>
//     </section>
//   );
// };

// export default CurrentVacancies;



import { useState } from "react";
import ApplyJob from "../../../pages/ApplyJob";

const CheckIcon = () => (
  <svg className="w-4 h-4 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="#22c55e" strokeWidth="2" />
    <path d="M8 12l3 3 5-5" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const DiamondIcon = () => (
  <span style={{ color: "#f5c045", marginRight: "6px", flexShrink: 0 }}>❖</span>
);

const NoIcon = () => (
  <svg className="w-4 h-4 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="#ef4444" strokeWidth="2" />
    <path d="M8 8l8 8M16 8l-8 8" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const vacancies = [
  {
    id: 1,
    title: "Home-Help & Support Assistant",
    description:
      "This role focuses on practical assistance, companionship, and wellbeing support to help clients live independently and comfortably.",
    payRate: "£13.00 per hour",
    contractType: "Zero-Hours Contract",
  },
];

const CurrentVacancies = () => {
  const [applyHovered, setApplyHovered] = useState(null);
  const [viewHovered, setViewHovered] = useState(null);
  const [showApply, setShowApply] = useState(false);
  const [expandedId, setExpandedId] = useState(null);

  if (showApply) return <ApplyJob onBack={() => setShowApply(false)} />;

  return (
    <section id="current-vacancies" className="relative w-full bg-[#1d3a54] py-12 px-5 sm:py-16 sm:px-10 lg:py-20 lg:px-20 overflow-hidden">

      <style>{`
        @keyframes slideInZoom {
    0%   { transform: translateX(100%) scale(0.3); opacity: 0; }
    60%  { transform: translateX(-8px) scale(1.08); opacity: 0.9; }
    100% { transform: translateX(0) scale(1); opacity: 0.8; }
  }
      `}</style>

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Section Title */}
        <h2
          className="text-2xl lg:text-4xl font-bold mb-8"
          style={{ fontFamily: "'Inter', sans-serif", color: "white" }}
        >
          Current Vacancies
        </h2>

        {/* Vacancy Cards */}
        <div className="flex flex-col gap-6">
          {vacancies.map((vacancy) => {
            const isExpanded = expandedId === vacancy.id;

            return (
              <div
                key={vacancy.id}
                className="w-full rounded-xl border-2 border-white/30 shadow-sm p-5 lg:p-8 relative overflow-hidden"
                style={{ backgroundColor: "#1d3a54" }}
              >

                {/* ── COLLAPSED VIEW ── */}
                {!isExpanded && (
                  <>
                    <h3
                      className="font-bold mb-4"
                      style={{ fontFamily: "'Inter', sans-serif", fontSize: "24px", fontWeight: 700, lineHeight: "120%", letterSpacing: "-0.02em", color: "white" }}
                    >
                      {vacancy.title}
                    </h3>

                    <p
                      className="mb-6 max-w-3xl text-white/90"
                      style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: "20px", lineHeight: "145%", letterSpacing: "0.02em" }}
                    >
                      {vacancy.description}
                    </p>

                    <div className="space-y-3 mb-6">
                      <p className="text-lg font-semibold text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
                        Pay Rate&nbsp;&nbsp;<span className="font-bold">{vacancy.payRate}</span>
                      </p>
                      <p className="text-base font-medium text-white/80" style={{ fontFamily: "'Inter', sans-serif" }}>
                        <span className="font-semibold text-white">Contract Type:</span>&nbsp;{vacancy.contractType}
                      </p>
                    </div>
                  </>
                )}

                {/* ── EXPANDED VIEW ── */}
                {isExpanded && (
                  <>
                    {/* Triangles — animated, middle right of card */}
                      <div className="absolute pointer-events-none" style={{ width: "180px", height: "500px", top: "calc(50% - 350px)", right: "-60px" }}>
  <img src="src/assets/Images/job-triangle1.png" loading="lazy" alt="" style={{ position: "absolute", top: "-280px", right: "0", width: "220px" }} />
  <img src="src/assets/Images/job-triangle2.png" loading="lazy" alt="" style={{ position: "absolute", top: "-40px", right: "0", width: "200px" }} />
  <img src="src/assets/Images/job-triangle3.png" loading="lazy" alt="" style={{ position: "absolute", top: "320px", right: "0", width: "180px" }} />
</div>
                    <div className="space-y-6">

                      {/* Header Info */}
                      <div className="space-y-2">
                        <p className="text-base font-bold text-white" style={{ fontFamily: "'Inter', sans-serif" }}>{vacancy.title}</p>
                        {[
                          ["Report to", "Owner/Manager"],
                          ["Pay Rate", "£13.00 per hour"],
                          ["Contract Type", "Zero-Hours Contract"],
                          ["Hours", "Flexible (Weekday and occasional weekend availability)"],
                          ["Location", "Canvey Island & Benfleet"],
                        ].map(([label, value]) => (
                          <p key={label} className="text-base text-white/90" style={{ fontFamily: "'Inter', sans-serif" }}>
                            <span className="font-bold">{label}:</span>&nbsp;{value}
                          </p>
                        ))}
                      </div>

                      {/* Role Overview */}
                      <div>
                        <p className="font-bold mb-2" style={{ color: "#f5c045", fontFamily: "'Inter', sans-serif" }}>Role Overview</p>
                        <p className="text-white/90 text-base leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                          Daily Assist UK is seeking reliable, compassionate{" "}
                          <span className="font-bold text-white">Home-Help & Support Assistants</span>{" "}
                          to provide non-medical support to clients in their homes and local community. This role focuses on practical assistance, companionship, and wellbeing support to help clients live independently and comfortably.
                        </p>
                      </div>

                      {/* Key Responsibilities */}
                      <div>
                        <p className="font-bold mb-2" style={{ color: "#f5c045", fontFamily: "'Inter', sans-serif" }}>Key Responsibilities:</p>
                        <ul className="space-y-2">
                          {[
                            "Light cleaning, laundry, and household tasks",
                            "Shopping trips and errands",
                            "Welfare check-ins",
                            "Companionship and conversation",
                            "Appointment escorting (walking or car)",
                            "Light meal preparation",
                            "Reporting concerns, incidents, or safeguarding issues promptly",
                            "Completing visit logs accurately",
                            "Communicating clearly with the operations coordinator/manager",
                            "Adhering to boundaries — no medical or personal care tasks",
                          ].map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-white/90 text-base" style={{ fontFamily: "'Inter', sans-serif" }}>
                              <DiamondIcon />{item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* What This Role Does NOT Include */}
                      <div>
                        <p className="font-bold mb-1" style={{ color: "#ef4444", fontFamily: "'Inter', sans-serif" }}>What This Role Does NOT Include</p>
                        <p className="text-white/90 text-base mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                          Daily Assist UK staff <span style={{ color: "#ef4444" }}>do not:</span>
                        </p>
                        <ul className="space-y-2">
                          {[
                            "Administer medication",
                            "Provide personal or intimate care",
                            "Provide medical or nursing care",
                            "Handle client's finances beyond agreed shopping tasks",
                          ].map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-white/90 text-base" style={{ fontFamily: "'Inter', sans-serif" }}>
                              <NoIcon />{item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Pay & Benefits */}
                      <div>
                        <p className="font-bold mb-2" style={{ color: "#f5c045", fontFamily: "'Inter', sans-serif" }}>Pay & Benefits</p>
                        <ul className="space-y-2">
                          {[
                            "£13.00 per hour",
                            "Paid holiday entitlement (accrued at 12.07% of hours worked)",
                            "Flexible working hours",
                            "Mileage reimbursed at £0.45 per mile for approved client transport (drivers only)",
                            "Ongoing support and training",
                            "Opportunity to work locally and make a real difference",
                          ].map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-white/90 text-base" style={{ fontFamily: "'Inter', sans-serif" }}>
                              <DiamondIcon />{item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Requirements */}
                      <div>
                        <p className="font-bold mb-2" style={{ color: "#f5c045", fontFamily: "'Inter', sans-serif" }}>Requirements</p>
                        <ul className="space-y-2">
                          {[
                            "Enhanced DBS (can be applied for after job offer and supported by us)",
                            "Full UK driving licence and access to your own vehicle (if transporting clients)",
                            "Kind, reliable, patient, organised and respectful attitude",
                            "Good communication skills",
                            "Ability to work independently",
                            "Business-use car insurance",
                            "Willingness to complete mandatory training",
                          ].map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-white/90 text-base" style={{ fontFamily: "'Inter', sans-serif" }}>
                              <CheckIcon />{item}
                            </li>
                          ))}
                          <li className="ml-6 space-y-1">
                            {["Safeguarding Adults", "Lone Working", "Health & Safety", "GDPR & Confidentiality"].map((item, i) => (
                              <p key={i} className="text-white/80 text-base" style={{ fontFamily: "'Inter', sans-serif" }}>• {item}</p>
                            ))}
                          </li>
                          <li className="flex items-start gap-2 text-white/90 text-base" style={{ fontFamily: "'Inter', sans-serif" }}>
                            <CheckIcon />Willingness to drive in all weather conditions
                          </li>
                        </ul>
                      </div>

                      {/* Desirable */}
                      <div>
                        <p className="font-bold mb-2" style={{ color: "#f5c045", fontFamily: "'Inter', sans-serif" }}>Desirable (Not Essential)</p>
                        <ul className="space-y-2">
                          {[
                            "Driving license and access to a vehicle (for certain roles)",
                            "Previous experience in home-help, care or support work",
                            "First aid certificate",
                          ].map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-white/90 text-base" style={{ fontFamily: "'Inter', sans-serif" }}>
                              <CheckIcon />{item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Professional Standards */}
                      <div>
                        <p className="font-bold mb-2" style={{ color: "#f5c045", fontFamily: "'Inter', sans-serif" }}>Professional Standards</p>
                        <p className="text-white/90 text-base mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>All staff must:</p>
                        <ul className="space-y-2">
                          {[
                            "Follow Daily Assist UK policies and procedures",
                            "Always maintain confidentiality",
                            "Respect professional boundaries",
                            "Wear approved uniform and ID",
                            "Act with dignity, respect and integrity",
                          ].map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-white/90 text-base" style={{ fontFamily: "'Inter', sans-serif" }}>
                              <CheckIcon />{item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Quote */}
                      <p className="text-base italic" style={{ color: "#22c55e", fontFamily: "'Inter', sans-serif" }}>
                        "Not every visit includes every task."
                      </p>

                    </div>
                  </>
                )}

                {/* ── BUTTONS ── */}
                <div className="flex flex-col sm:flex-row gap-4 mt-6">

                  <button
                    onClick={() => setShowApply(true)}
                    onMouseEnter={() => setApplyHovered(vacancy.id)}
                    onMouseLeave={() => setApplyHovered(null)}
                    className="px-16 py-3 rounded-lg font-medium text-black transition-all duration-300 cursor-pointer"
                    style={{
                      backgroundColor: "#f5c045",
                      fontFamily: "'Inter', sans-serif",
                      boxShadow: applyHovered === vacancy.id ? "0 0 25px rgba(245,192,69,0.85)" : "0 0 15px rgba(245,192,69,0.6)",
                      transform: applyHovered === vacancy.id ? "scale(1.05)" : "scale(1)",
                    }}
                  >
                    Apply for This Role
                  </button>

                  <button
                    onClick={() => setExpandedId(isExpanded ? null : vacancy.id)}
                    onMouseEnter={() => setViewHovered(vacancy.id)}
                    onMouseLeave={() => setViewHovered(null)}
                    className="px-16 py-3 rounded-lg font-medium text-white transition-all duration-300 cursor-pointer bg-transparent"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      border: "1px solid #f5c045",
                      boxShadow: viewHovered === vacancy.id ? "inset 0 0 18px rgba(245,192,69,0.6)" : "inset 0 0 10px rgba(245,192,69,0.4)",
                      transform: viewHovered === vacancy.id ? "scale(1.05)" : "scale(1)",
                    }}
                  >
                    {isExpanded ? "Show Less" : "View Job Description"}
                  </button>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default CurrentVacancies;