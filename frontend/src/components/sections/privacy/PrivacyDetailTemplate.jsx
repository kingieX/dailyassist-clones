import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";

const POLICIES = [
  { label: "Complaints Procedure", path: "/privacy/page1" },
  { label: "Data Protection Policy", path: "/privacy/page2" },
  { label: "Equality, Diversity & Inclusion Policy", path: "/privacy/page3" },
  { label: "Health & Safety Policy", path: "/privacy/page4" },
  { label: "Medication & Personal Care Exclusion", path: "/privacy/page5" },
  { label: "Risk Assessment Procedure", path: "/privacy/page6" },
  { label: "Safeguarding Policy", path: "/privacy/page7" },
];

export default function PrivacyDetailTemplate({ title, children }) {
  const location = useLocation();
  const contentRef = useRef(null);

  useEffect(() => {
   const yOffset = -150;
const y = contentRef.current.getBoundingClientRect().top + window.scrollY + yOffset;
window.scrollTo({ top: y, behavior: "smooth" });
  }, [location.pathname]);
  return (
    <section className="bg-[#fafafa] py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">

        {/* Mobile: stack, Desktop: 2 columns */}
        <div className="flex flex-col lg:grid lg:grid-cols-[400px_1fr] gap-32">

          {/* LEFT SIDEBAR */}
          <div className="lg:sticky lg:top-24 self-start">
          <div className="bg-white rounded-2xl shadow-md p-6 w-full">

              <h2 className="text-2xl font-semibold text-[#111827] mb-4 text-center">
                Our Policies
              </h2>

              <div className="flex flex-col gap-3">
                {POLICIES.map((policy) => (
                  <NavLink
                    key={policy.path}
                    to={policy.path}
                    className={({ isActive }) =>
                    `w-full text-center py-3 px-4 rounded-lg text-sm md:text-base font-medium transition-all duration-200 border ${
                        isActive
                          ? "bg-[#f5c045] text-[#111827] border-transparent"
                        : "bg-white text-[#374151] border-[#f5c045] hover:shadow-[inset_0_0_8px_rgba(245,192,69,0.4)]"
                      }`
                    }
                  >
                    {policy.label}
                  </NavLink>
                ))}
              </div>

            </div>
          </div>

          {/* RIGHT CONTENT AREA */}
          <div className="max-w-3xl space-y-6"  ref={contentRef}>

            {/* Main Title */}
            <h1 className="text-2xl md:text-5xl font-bold text-[#111827] mb-4">
              {title}
            </h1>

            {/* Dynamic Content */}
            <div className="text-[#4b5563] text-xl leading-relaxed space-y-4">
              {children}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}