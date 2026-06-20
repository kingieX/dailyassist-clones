// import { useState } from "react";
// import ConfirmCheckInModal  from "../modals/ConfirmCheckInModal";
// import CheckInSuccessModal  from "../modals/CheckInSuccessModal";
// import ConfirmCheckOutModal from "../modals/ConfirmCheckOutModal";
// import VisitLogModal        from "../modals/VisitLogModal";
// import VisitDetailsModal    from "../modals/VisitDetailsModal";
// import { todayVisits } from "../../utils/visitsData";

// /* ── Status badge ── */
// function StatusBadge({ status }) {
//   if (status === "completed") {
//     return (
//       <span className="flex items-center gap-1.5 bg-green-500 text-white
//                        text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap">
//         ✓ Completed
//       </span>
//     );
//   }
//   if (status === "in-progress") {
//     return (
//       <span className="bg-[#f5c045] text-gray-900 text-xs font-semibold
//                        px-3 py-1.5 rounded-lg whitespace-nowrap">
//         In Progress
//       </span>
//     );
//   }
//   return (
//     <span className="bg-gray-100 text-gray-500 text-xs font-semibold
//                      px-3 py-1.5 rounded-lg whitespace-nowrap">
//       Not Started
//     </span>
//   );
// }

// /* ── Map book icon ── */
// function MapBookIcon() {
//   return (
//     <svg className="w-4 h-4 text-gray-500 flex-shrink-0" viewBox="0 0 24 24"
//          fill="none" stroke="currentColor" strokeWidth="1.8"
//          strokeLinecap="round" strokeLinejoin="round">
//       <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/>
//       <path d="M4 4.5A2.5 2.5 0 016.5 2H20v20H6.5A2.5 2.5 0 014 19.5z"/>
//     </svg>
//   );
// }

// /* ── Care icon ── */
// function CareIcon() {
//   return (
//     <svg className="w-4 h-4 text-gray-500 flex-shrink-0" viewBox="0 0 24 24"
//          fill="none" stroke="currentColor" strokeWidth="1.8"
//          strokeLinecap="round" strokeLinejoin="round">
//       <path d="M18 11V6a2 2 0 00-4 0v5"/>
//       <path d="M14 10V4a2 2 0 00-4 0v6"/>
//       <path d="M10 10.5V6a2 2 0 00-4 0v8.5"/>
//       <path d="M6 14.5S5 17 7 19c1.5 1.5 4 2 7 2s5-2 5-5v-5"/>
//     </svg>
//   );
// }

// /* ── Clock icon ── */
// function ClockIcon() {
//   return (
//     <svg className="w-4 h-4 text-gray-500 flex-shrink-0" viewBox="0 0 24 24"
//          fill="none" stroke="currentColor" strokeWidth="1.8"
//          strokeLinecap="round" strokeLinejoin="round">
//       <circle cx="12" cy="12" r="10"/>
//       <polyline points="12 6 12 12 16 14"/>
//     </svg>
//   );
// }

// /* ── Single visit card ── */
// function VisitCard({ visit, worker, onMarkComplete }) {
//   const [status,          setStatus]          = useState(visit.status);
//   const [showConfirmIn,   setShowConfirmIn]   = useState(false);
//   const [showSuccess,     setShowSuccess]     = useState(false);
//   const [showConfirmOut,  setShowConfirmOut]  = useState(false);
//   const [showLog,         setShowLog]         = useState(false);
//   const [showDetails,     setShowDetails]     = useState(false);

//   const handleCheckIn = () => {
//     setShowConfirmIn(false);
//     setShowSuccess(true);
//     setStatus("in-progress");
//   };

//   const handleSuccessClose = () => {
//     setShowSuccess(false);
//   };

//   const handleCheckOut = () => {
//     setShowConfirmOut(false);
//     setShowLog(true);
//   };

//   const handleLogSubmit = () => {
//     setShowLog(false);
//     setStatus("completed");
//     onMarkComplete(visit.id);
//   };

//   const isCompleted  = status === "completed";
//   const isInProgress = status === "in-progress";

//   return (
//     <>
//       <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5
//                       flex flex-col gap-4">

//         {/* Name + badge */}
//         <div className="flex items-start justify-between gap-3">
//           <p className="text-base font-bold text-gray-900">{visit.clientName}</p>
//           <StatusBadge status={status} />
//         </div>

//         {/* Details */}
//         <div className="flex flex-col gap-2">
//           <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
//             <MapBookIcon />
//             <span>{visit.address}</span>
//           </div>
//           <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
//             <CareIcon />
//             <span>{visit.task}</span>
//           </div>
//           <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
//             <ClockIcon />
//             <span>{visit.timeStart} - {visit.timeEnd}</span>
//           </div>
//         </div>
// {/* View Visit Details — full width on mobile always */}
//         <div className={`flex ${isCompleted ? "" : "sm:justify-end"}`}>
//           <button
//             onClick={() => setShowDetails(true)}
//             className="w-full sm:w-auto text-sm font-medium text-gray-700
//                        border border-[#f5c045] rounded-xl px-5 py-3
//                        transition-all duration-300
//                        hover:shadow-[0_0_14px_rgba(245,192,69,0.55)]
//                        hover:scale-105 hover:bg-yellow-50"
//           >
//             View Visit Details
//           </button>
//         </div>

//         {/* Check-in / Check-out button — hidden when completed */}
//         {!isCompleted && (
//           <>
//             <button
//               onClick={() => isInProgress ? setShowConfirmOut(true) : setShowConfirmIn(true)}
//               className={`w-full font-semibold text-base py-4 rounded-2xl
//                           flex items-center justify-center gap-2
//                           transition-colors duration-200
//                           ${isInProgress
//                             ? "bg-red-600 hover:bg-red-700 text-white"
//                             : "bg-[#f5c045] hover:bg-amber-500 text-gray-900"
//                           }`}
//             >
//               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24"
//                    stroke="currentColor" strokeWidth={2}>
//                 <path strokeLinecap="round" strokeLinejoin="round"
//                       d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
//                 <path strokeLinecap="round" strokeLinejoin="round"
//                       d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
//               </svg>
//               {isInProgress ? "Tap to Check-Out" : "Tap to Check-In"}
//             </button>
//             <p className="text-center text-xs text-gray-400 -mt-2">
//               {isInProgress
//                 ? <>Tap on <strong>"Check-Out"</strong> when you're done with your task.</>
//                 : "Tap when you arrive at a client's home to check in."
//               }
//             </p>
//           </>
//         )}
//       </div>

//       {/* ── Modals ── */}
//       <ConfirmCheckInModal
//         isOpen={showConfirmIn}
//         onClose={() => setShowConfirmIn(false)}
//         onConfirm={handleCheckIn}
//       />
//       <CheckInSuccessModal
//         isOpen={showSuccess}
//         onClose={handleSuccessClose}
//       />
//       <ConfirmCheckOutModal
//         isOpen={showConfirmOut}
//         onClose={() => setShowConfirmOut(false)}
//         onConfirm={handleCheckOut}
//       />
//       <VisitLogModal
//         isOpen={showLog}
//         onClose={() => setShowLog(false)}
//         onSubmit={handleLogSubmit}
//         visit={visit}
//         worker={worker}
//         isCompleted={isCompleted}
//       />

//       <VisitDetailsModal
//         isOpen={showDetails}
//         onClose={() => setShowDetails(false)}
//         visit={visit}
//         onCheckIn={() => {
//           setShowDetails(false);
//           setShowConfirmIn(true);
//         }}
//       />
//     </>
//   );
// }

// /* ── Main VisitsSection ── */
// export default function VisitsSection({ worker }) {
//   const [visits, setVisits] = useState(todayVisits);

//   const today = new Date().toLocaleDateString("en-GB", {
//     day: "numeric", month: "short", year: "numeric",
//   });

//   const handleMarkComplete = (id) => {
//     setVisits((prev) =>
//       prev.map((v) => v.id === id ? { ...v, status: "completed" } : v)
//     );
//   };

//   return (
//     <div className="flex flex-col gap-5 px-6 py-6 max-w-5xl mx-auto w-full">
//       {/* Header row */}
//       <div className="flex items-center justify-between">
//         <h1 className="text-xl font-bold text-gray-900">Today Visits</h1>
//         <span className="text-sm font-medium text-gray-500">{today}</span>
//       </div>

//       {/* Cards */}
//       <div className="flex flex-col gap-4">
//         {visits.map((visit) => (
//           <VisitCard
//             key={visit.id}
//             visit={visit}
//             worker={worker}
//             onMarkComplete={handleMarkComplete}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import ConfirmCheckInModal  from "../modals/ConfirmCheckInModal";
import CheckInSuccessModal  from "../modals/CheckInSuccessModal";
import ConfirmCheckOutModal from "../modals/ConfirmCheckOutModal";
import VisitLogModal        from "../modals/VisitLogModal";
import VisitDetailsModal    from "../modals/VisitDetailsModal";
import { visitsAPI } from "../../services/api";

/* ── Status badge ── */
function StatusBadge({ status }) {
  if (status === "completed") return (
    <span className="flex items-center gap-1.5 bg-green-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap">✓ Completed</span>
  );
  if (status === "in-progress") return (
    <span className="bg-[#f5c045] text-gray-900 text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap">In Progress</span>
  );
  return (
    <span className="bg-gray-100 text-gray-500 text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap">Not Started</span>
  );
}

function MapBookIcon() {
  return (
    <svg className="w-4 h-4 text-gray-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/>
      <path d="M4 4.5A2.5 2.5 0 016.5 2H20v20H6.5A2.5 2.5 0 014 19.5z"/>
    </svg>
  );
}

function CareIcon() {
  return (
    <svg className="w-4 h-4 text-gray-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 11V6a2 2 0 00-4 0v5"/>
      <path d="M14 10V4a2 2 0 00-4 0v6"/>
      <path d="M10 10.5V6a2 2 0 00-4 0v8.5"/>
      <path d="M6 14.5S5 17 7 19c1.5 1.5 4 2 7 2s5-2 5-5v-5"/>
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className="w-4 h-4 text-gray-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  );
}

/* ── Single visit card ── */
function VisitCard({ visit, worker, onMarkComplete }) {
  const [status,         setStatus]         = useState(visit.status);
  const [showConfirmIn,  setShowConfirmIn]  = useState(false);
  const [showSuccess,    setShowSuccess]    = useState(false);
  const [showConfirmOut, setShowConfirmOut] = useState(false);
  const [showLog,        setShowLog]        = useState(false);
  const [showDetails,    setShowDetails]    = useState(false);

  const handleCheckIn = async () => {
    try {
      await visitsAPI.update(visit.id, { status: "in-progress" });
    } catch (err) {
      console.error("Check-in error:", err);
    }
    setShowConfirmIn(false);
    setShowSuccess(true);
    setStatus("in-progress");
  };

  const handleCheckOut = () => {
    setShowConfirmOut(false);
    setShowLog(true);
  };

  const handleLogSubmit = async () => {
    try {
      await visitsAPI.update(visit.id, { status: "completed" });
    } catch (err) {
      console.error("Check-out error:", err);
    }
    setShowLog(false);
    setStatus("completed");
    onMarkComplete(visit.id);
  };

  const isCompleted  = status === "completed";
  const isInProgress = status === "in-progress";

  return (
    <>
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <p className="text-base font-bold text-gray-900">{visit.clientName}</p>
          <StatusBadge status={status} />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
            <MapBookIcon /><span>{visit.address}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
            <CareIcon /><span>{visit.task}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
            <ClockIcon /><span>{visit.timeStart} - {visit.timeEnd}</span>
          </div>
        </div>
        <div className={`flex ${isCompleted ? "" : "sm:justify-end"}`}>
          <button onClick={() => setShowDetails(true)}
            className="w-full sm:w-auto text-sm font-medium text-gray-700
                       border border-[#f5c045] rounded-xl px-5 py-3
                       transition-all duration-300
                       hover:shadow-[0_0_14px_rgba(245,192,69,0.55)]
                       hover:scale-105 hover:bg-yellow-50">
            View Visit Details
          </button>
        </div>
        {!isCompleted && (
          <>
            <button
              onClick={() => isInProgress ? setShowConfirmOut(true) : setShowConfirmIn(true)}
              className={`w-full font-semibold text-base py-4 rounded-2xl flex items-center justify-center gap-2 transition-colors duration-200
                          ${isInProgress ? "bg-red-600 hover:bg-red-700 text-white" : "bg-[#f5c045] hover:bg-amber-500 text-gray-900"}`}>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              {isInProgress ? "Tap to Check-Out" : "Tap to Check-In"}
            </button>
            <p className="text-center text-xs text-gray-400 -mt-2">
              {isInProgress
                ? <><strong>"Check-Out"</strong> when you're done with your task.</>
                : "Tap when you arrive at a client's home to check in."}
            </p>
          </>
        )}
      </div>

      <ConfirmCheckInModal  isOpen={showConfirmIn}  onClose={() => setShowConfirmIn(false)}  onConfirm={handleCheckIn} />
      <CheckInSuccessModal  isOpen={showSuccess}    onClose={() => setShowSuccess(false)} />
      <ConfirmCheckOutModal isOpen={showConfirmOut} onClose={() => setShowConfirmOut(false)} onConfirm={handleCheckOut} />
      <VisitLogModal        isOpen={showLog}        onClose={() => setShowLog(false)} onSubmit={handleLogSubmit} visit={visit} worker={worker} isCompleted={isCompleted} />
      <VisitDetailsModal    isOpen={showDetails}    onClose={() => setShowDetails(false)} visit={visit}
        onCheckIn={() => { setShowDetails(false); setShowConfirmIn(true); }} />
    </>
  );
}

/* ── Main VisitsSection ── */
export default function VisitsSection({ worker, visits = [], setVisits }) {
  const today = new Date().toLocaleDateString("en-GB", {
    day: "numeric", month: "short", year: "numeric",
  });

  const handleMarkComplete = (id) => {
    setVisits((prev) => prev.map((v) => v.id === id ? { ...v, status: "completed" } : v));
  };

  return (
    <div className="flex flex-col gap-5 px-6 py-6 max-w-5xl mx-auto w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">Today Visits</h1>
        <span className="text-sm font-medium text-gray-500">{today}</span>
      </div>
      <div className="flex flex-col gap-4">
        {visits.length === 0 && (
          <div className="flex items-center justify-center py-20 text-gray-400">
            <p className="text-sm">No visits scheduled for today.</p>
          </div>
        )}
        {visits.map((visit) => (
          <VisitCard key={visit.id} visit={visit} worker={worker} onMarkComplete={handleMarkComplete} />
        ))}
      </div>
    </div>
  );
}