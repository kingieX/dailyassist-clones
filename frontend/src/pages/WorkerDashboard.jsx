
// import { useState } from "react";
// import MessageSection from "../components/dashSections/MessageSection";
// import ProfileSection from "../components/dashSections/ProfileSection";
// import VisitsSection from "../components/dashSections/VisitsSection";
// import DashSidebar from "../components/layout/DashSidebar";
// import MobileSidebar from "../components/layout/MobileSidebar";
// import Navbar from "../components/layout/Navbar";
// import OverviewSection from "../components/dashSections/OverviewSection";
// import { useDashboard } from "../hooks/useDashboard";
// import { workerData } from "../utils/mockData";

// const WorkerDashboard = () => {
//   const { activeSection, setActiveSection } = useDashboard();
//   const [mobileOpen, setMobileOpen] = useState(false);

//   const renderSection = () => {
//     switch (activeSection) {
//       case "visits":
//         return <VisitsSection worker={workerData} />;
//       case "message":
//         return <MessageSection onNavigateToVisits={() => setActiveSection("visits")} />;
//       case "profile":
//         return <ProfileSection />;
//       default:
//         return <OverviewSection worker={workerData} onNavigateToVisits={() => setActiveSection("visits")} />;
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-50">

//       {/* Desktop sidebar — hidden on mobile */}
//       <div className="hidden lg:block">
//         <DashSidebar
//           activeSection={activeSection}
//           setActiveSection={setActiveSection}
//         />
//       </div>

//       {/* Mobile sidebar */}
//       <MobileSidebar
//         isOpen={mobileOpen}
//         onClose={() => setMobileOpen(false)}
//         activeSection={activeSection}
//         setActiveSection={setActiveSection}
//       />

//       {/* Main content */}
//       <div className="flex-1 flex flex-col">

//        {/* Mobile top bar */}
//         <div className="lg:hidden flex items-center justify-between
//                         px-4 py-3 bg-white border-b border-gray-100">
//           {/* Logo + brand + tagline */}
//           <div className="flex items-center gap-2">
//             <img
//               src="/Images/Logo/Daily Assist Logos/LOGO-MAIN.png"
//               loading="lazy" alt="Daily Assist UK logo"
//               className="w-10 object-contain flex-shrink-0"
//             />
//             <div className="flex flex-col leading-tight">
//               <img
//                 src="/Images/Logo/Daily Assist Logos/Text Logo - No Bg Black.png"
//                 loading="lazy" alt="Daily Assist UK"
//                 className="w-[120px] object-contain"
//               />
//               <span className="text-[10px] text-gray-400 italic">
//                 "Support you can trust, care you can feel"
//               </span>
//             </div>
//           </div>

//           {/* Hamburger button */}
//           <button
//             onClick={() => setMobileOpen(true)}
//             className="w-10 h-10 rounded-xl bg-[#fef3d0] flex items-center
//                        justify-center text-gray-700 hover:bg-[#f5c045]/30
//                        transition-colors flex-shrink-0"
//             aria-label="Open menu"
//           >
//             <svg className="w-5 h-5" fill="none" stroke="currentColor"
//                  viewBox="0 0 24 24" strokeWidth={2.5}>
//               <path strokeLinecap="round" strokeLinejoin="round"
//                     d="M4 6h16M4 12h16M4 18h16"/>
//             </svg>
//           </button>
//         </div>

//         {/* Navbar — desktop only */}
//         <div className="hidden lg:block">
//           <Navbar worker={workerData} />
//         </div>
//         {renderSection()}
//       </div>
//     </div>
//   );
// };

// export default WorkerDashboard;


import { useState, useEffect } from "react";
import MessageSection from "../components/dashSections/MessageSection";
import ProfileSection from "../components/dashSections/ProfileSection";
import VisitsSection from "../components/dashSections/VisitsSection";
import DashSidebar from "../components/layout/DashSidebar";
import MobileSidebar from "../components/layout/MobileSidebar";
import Navbar from "../components/layout/Navbar";
import OverviewSection from "../components/dashSections/OverviewSection";
import { useDashboard } from "../hooks/useDashboard";
import { authAPI, visitsAPI } from "../services/api";

const WorkerDashboard = () => {
  const { activeSection, setActiveSection } = useDashboard();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [workerData, setWorkerData] = useState(null);
  const [visits, setVisits]         = useState([]);
  const [loading, setLoading]       = useState(true);

  useEffect(() => {
    const fetchWorkerData = async () => {
      try {
        // Get logged-in worker profile
        const profileRes = await authAPI.me();
        const user = profileRes.data?.data ?? profileRes.data;
        setWorkerData({
          name:          user.name          ?? "Worker",
          initials:      user.name ? user.name.split(" ").map((n) => n[0]).join("").slice(0, 2) : "W",
          isOnline:      true,
          nextVisitTime: user.nextVisitTime ?? "--",
          role:          user.role          ?? "Support Worker",
          email:         user.email         ?? "",
          phone:         user.phone         ?? "",
          dob:           user.dob           ?? "",
          gender:        user.gender        ?? "",
          zone:          user.zone          ?? "",
          staffId:       user.id            ?? "",
        });
      } catch (err) {
        console.error("Failed to load worker profile:", err);
        // Fall back to localStorage user if API fails
        const stored = localStorage.getItem("user");
        if (stored) {
          const user = JSON.parse(stored);
          setWorkerData({
            name:     user.name  ?? "Worker",
            initials: user.name ? user.name.split(" ").map((n) => n[0]).join("").slice(0, 2) : "W",
            isOnline: true,
            nextVisitTime: "--",
            role:     user.role  ?? "Support Worker",
            email:    user.email ?? "",
            phone:    "",
            dob:      "",
            gender:   "",
            zone:     "",
            staffId:  user.id   ?? "",
          });
        }
      }

      try {
        // Get today's visits for this worker
        const visitsRes = await visitsAPI.getAll();
        const data = visitsRes.data?.data ?? visitsRes.data ?? [];
        setVisits(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load visits:", err);
        setVisits([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkerData();
  }, []);

  const renderSection = () => {
    if (loading || !workerData) return (
      <div className="flex items-center justify-center flex-1 py-20">
        <div className="w-8 h-8 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );

    switch (activeSection) {
      case "visits":
        return <VisitsSection worker={workerData} visits={visits} setVisits={setVisits} />;
      case "message":
        return <MessageSection onNavigateToVisits={() => setActiveSection("visits")} />;
      case "profile":
        return <ProfileSection worker={workerData} />;
      default:
        return (
          <OverviewSection
            worker={workerData}
            visits={visits}
            onNavigateToVisits={() => setActiveSection("visits")}
          />
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <DashSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      </div>

      {/* Mobile sidebar */}
      <MobileSidebar
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col">

        {/* Mobile top bar */}
        <div className="lg:hidden flex items-center justify-between
                        px-4 py-3 bg-white border-b border-gray-100">
          <div className="flex items-center gap-2">
            <img src="/Images/Logo/Daily Assist Logos/LOGO-MAIN.png"
              loading="lazy" alt="Daily Assist UK logo"
              className="w-10 object-contain flex-shrink-0" />
            <div className="flex flex-col leading-tight">
              <img src="/Images/Logo/Daily Assist Logos/Text Logo - No Bg Black.png"
                loading="lazy" alt="Daily Assist UK"
                className="w-[120px] object-contain" />
              <span className="text-[10px] text-gray-400 italic">
                "Support you can trust, care you can feel"
              </span>
            </div>
          </div>
          <button onClick={() => setMobileOpen(true)}
            className="w-10 h-10 rounded-xl bg-[#fef3d0] flex items-center
                       justify-center text-gray-700 hover:bg-[#f5c045]/30
                       transition-colors flex-shrink-0"
            aria-label="Open menu">
            <svg className="w-5 h-5" fill="none" stroke="currentColor"
              viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>

        {/* Navbar — desktop only */}
        <div className="hidden lg:block">
          <Navbar worker={workerData} />
        </div>

        {renderSection()}
      </div>
    </div>
  );
};

export default WorkerDashboard;