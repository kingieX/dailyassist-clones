
// import { useState } from "react";
// import AlertsCard from "../common/AlertsCard";
// import OverviewCard from "../common/OverviewCard";
// import VisitCard from "../common/VisitCard";
// import { overviewStats, nextVisit, alerts } from "../../utils/mockData";

// const getGreeting = () => {
//   const hour = new Date().getHours();
//   if (hour < 12) return "Good morning";
//   if (hour < 17) return "Good afternoon";
//   return "Good evening";
// };

// const OverviewSection = ({ worker, onNavigateToVisits }) => {
//   const [checkedIn, setCheckedIn] = useState(false);

//   return (
//     <div className="flex-1 bg-gray-50 min-h-screen p-4 sm:p-6 space-y-4 sm:space-y-6
//                     overflow-y-auto">

//       {/* Greeting — full width on mobile, alerts hidden on mobile */}
//       <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
//         <div>
//           <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
//             {getGreeting()}, {worker.name.split(" ")[0]} 👋
//           </h1>
//           <p className="text-sm text-gray-500 mt-1">
//             Next visit: <span className="font-bold text-gray-800">{worker.nextVisitTime}.</span>
//           </p>
//         </div>

//         {/* Alerts card — hidden on mobile, visible on sm+ */}
//         <div className="hidden sm:block">
//           <AlertsCard alerts={alerts} />
//         </div>
//       </div>

//       {/* Today's Overview */}
//       <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5">
//         <h2 className="text-base font-bold text-gray-900 mb-4">Today's Overview</h2>
//         {/* 2 cols on mobile, 4 cols on desktop — matches your image exactly */}
//         <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
//           {overviewStats.map((stat) => (
//             <OverviewCard
//               key={stat.id}
//               label={stat.label}
//               value={stat.value}
//               theme={stat.theme}
//               icon={stat.icon}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Next Visit */}
//       <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5">
//         <h2 className="text-base font-bold text-gray-900 mb-4">Next Visit</h2>
//         <VisitCard
//           visit={nextVisit}
//           checkedIn={checkedIn}
//           onCheckInSuccess={() => setCheckedIn(true)}
//           onNavigateToVisits={onNavigateToVisits}
//         />
//       </div>
//     </div>
//   );
// };

// export default OverviewSection;

import { useState } from "react";
import AlertsCard from "../common/AlertsCard";
import OverviewCard from "../common/OverviewCard";
import VisitCard from "../common/VisitCard";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
};

const OverviewSection = ({ worker, visits = [], onNavigateToVisits }) => {
  const [checkedIn, setCheckedIn] = useState(false);

  // Build stats from real visits data
  const totalToday   = visits.length;
  const completed    = visits.filter((v) => v.status === "completed").length;
  const remaining    = visits.filter((v) => v.status !== "completed").length;

  const overviewStats = [
    { id: 1, label: "Visits Today",  value: totalToday, theme: "blue"   },
    { id: 2, label: "Completed",     value: completed,  theme: "green"  },
    { id: 3, label: "Remaining",     value: remaining,  theme: "yellow" },
    { id: 4, label: "Miles Covered", value: worker?.milesCovered ?? "0 miles", theme: "gray", icon: true },
  ];

  // Next visit = first not completed
  const nextVisit = visits.find((v) => v.status !== "completed") ?? null;

  return (
    <div className="flex-1 bg-gray-50 min-h-screen p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto">

      {/* Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            {getGreeting()}, {worker?.name?.split(" ")[0] ?? "there"} 👋
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Next visit:{" "}
            <span className="font-bold text-gray-800">
              {nextVisit ? `${nextVisit.timeStart} - ${nextVisit.timeEnd}` : worker?.nextVisitTime ?? "--"}
            </span>
          </p>
        </div>
        <div className="hidden sm:block">
          <AlertsCard alerts={[]} />
        </div>
      </div>

      {/* Today's Overview */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5">
        <h2 className="text-base font-bold text-gray-900 mb-4">Today's Overview</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {overviewStats.map((stat) => (
            <OverviewCard
              key={stat.id}
              label={stat.label}
              value={stat.value}
              theme={stat.theme}
              icon={stat.icon}
            />
          ))}
        </div>
      </div>

      {/* Next Visit */}
      {nextVisit && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5">
          <h2 className="text-base font-bold text-gray-900 mb-4">Next Visit</h2>
          <VisitCard
            visit={nextVisit}
            checkedIn={checkedIn}
            onCheckInSuccess={() => setCheckedIn(true)}
            onNavigateToVisits={onNavigateToVisits}
          />
        </div>
      )}

      {!nextVisit && visits.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
          <p className="text-sm font-semibold text-green-600">All visits completed for today! 🎉</p>
        </div>
      )}
    </div>
  );
};

export default OverviewSection;