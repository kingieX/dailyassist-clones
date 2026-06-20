// import { useState } from "react";
// import { X, Phone, Mail, Car, GraduationCap, ChevronDown, MoreVertical, Check } from "lucide-react";
// import VisitDetailsModal from "./VisitDetailsModal";
// import AdminVisitLogModal from "./AdminVisitLogModal";

// const statusStyles = {
//   late:          { bg: "bg-[#F7C9C2]", text: "text-[#9B4B43]",  label: "Late"        },
//   "not-started": { bg: "bg-[#ECECEC]", text: "text-[#6B7280]",  label: "Not Started" },
//   completed:     { bg: "bg-[#D8EFD9]", text: "text-[#5B9B67]",  label: "Completed"   },
//   "in-progress": { bg: "bg-amber-100", text: "text-amber-600",   label: "In Progress" },
// };

// function TaskItem({ task, staffName }) {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [showVisitDetails, setShowVisitDetails] = useState(false);
//   const s = statusStyles[task.status] ?? statusStyles["not-started"];
// const [showLogSheet, setShowLogSheet] = useState(false);

//   return (
//     <>
//      <div
//         onClick={() => setShowVisitDetails(true)}
//         className="bg-white shadow-sm border border-gray-100 rounded-xl
//                       px-5 py-4 flex items-center justify-between gap-3
//                       cursor-pointer hover:bg-gray-50 transition-colors">
//         <p className="text-base font-semibold text-gray-900 flex-1">{task.client}</p>
//         <span className={`${s.bg} ${s.text} text-sm font-medium px-4 py-1.5
//                           rounded-lg min-w-[110px] text-center flex-shrink-0`}>
//           {s.label}
//         </span>
//         <div className="relative flex-shrink-0" onClick={(e) => e.stopPropagation()}>
//           <button
//             onClick={(e) => { e.stopPropagation(); setMenuOpen(!menuOpen); }}
//             className="w-7 h-7 flex items-center justify-center rounded-full
//                        hover:bg-gray-100 transition-colors"
//           >
//             <MoreVertical className="w-4 h-4 text-gray-400" />
//           </button>
//           {menuOpen && (
//             <div className="absolute right-0 bottom-8 z-50 bg-white rounded-2xl
//                             shadow-xl border border-gray-100 p-2 w-44 flex flex-col gap-1">
//               <div className="flex justify-end mb-1">
//                 <button
//                   onClick={(e) => { e.stopPropagation(); setMenuOpen(false); }}
//                   className="w-5 h-5 rounded-full bg-gray-100 flex items-center
//                              justify-center hover:bg-gray-200 transition-colors"
//                 >
//                   <X className="w-3 h-3 text-gray-500" />
//                 </button>
//               </div>
//               <button
//                 onClick={(e) => { e.stopPropagation(); setMenuOpen(false); setShowVisitDetails(true); }}
//                 className="w-full text-left text-xs font-semibold text-white
//                            bg-blue-400 hover:bg-blue-500 px-3 py-2.5
//                            rounded-xl transition-colors"
//               >
//                 View visit details
//               </button>
//               <button
//                 onClick={(e) => { e.stopPropagation(); setMenuOpen(false); setShowLogSheet(true); }}
//                 className="w-full text-left text-xs font-semibold text-white
//                            bg-green-500 hover:bg-green-600 px-3 py-2.5
//                            rounded-xl transition-colors"
//               >
//                 View log sheet
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//      <VisitDetailsModal
//         isOpen={showVisitDetails}
//         onClose={() => setShowVisitDetails(false)}
//         task={task}
//         staffName={staffName}
//       />

//       <AdminVisitLogModal
//         isOpen={showLogSheet}
//         onClose={() => setShowLogSheet(false)}
//         task={task}
//         staffName={staffName}
//       />
//     </>
//   );
// }

// export default function StaffDetailsModal({ isOpen, onClose, staff }) {
//   const [showAll, setShowAll] = useState(false);

//   if (!isOpen || !staff) return null;

//   const {
//     name, id, phone, email, status, tasksDone, tasksTotal,
//     photo, ownsCar, trainingUpToDate, milesCovered, role, tasks = []
//   } = staff;

//   const progress = Math.round((tasksDone / tasksTotal) * 100);
//   const isAvailable = status === "available";
//   const initials = name.split(" ").map(n => n[0]).join("").slice(0, 2);
//   const visibleTasks = showAll ? tasks : tasks.slice(0, 4);

//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center
//                  bg-black/25 backdrop-blur-sm px-4 py-6"
//       onClick={onClose}
//     >
//       <div
//         className="bg-white rounded-3xl shadow-2xl w-full max-w-lg
//                    max-h-[90vh] overflow-y-auto"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="px-6 sm:px-8 py-6 flex flex-col gap-5">

//           {/* Header */}
//           <div className="flex items-center justify-center relative">
//             <p className="text-lg font-medium text-gray-800">{id}</p>
//             <button
//               onClick={onClose}
//               className="absolute right-0 w-7 h-7 flex items-center justify-center
//                          rounded-full hover:bg-gray-100 transition-colors"
//             >
//               <X className="w-4 h-4 text-gray-600" />
//             </button>
//           </div>

//           {/* Profile */}
//           <div className="flex flex-col items-center gap-2 text-center">
//             <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden
//                             border-4 border-gray-100 shadow-md flex-shrink-0">
//               {photo ? (
//                 <img src={photo} alt={name} className="w-full h-full object-cover"/>
//               ) : (
//                 <div className="w-full h-full bg-amber-200 flex items-center
//                                 justify-center text-3xl font-bold text-gray-700">
//                   {initials}
//                 </div>
//               )}
//             </div>

//             <span className={`text-sm font-medium px-4 py-1 rounded-full border
//                               ${isAvailable
//                                 ? "bg-[#DDF3E4] border-[#B7E0C2] text-[#5C9C6D]"
//                                 : "bg-red-50 border-red-200 text-red-500"
//                               }`}>
//               {isAvailable ? "Available" : "Unavailable"}
//             </span>

//             <p className="text-3xl sm:text-4xl font-bold text-gray-900 mt-1">{name}</p>
//             <p className="text-base sm:text-lg text-gray-500">{role}</p>

//             <div className="flex flex-col items-center gap-2 mt-1">
//               {ownsCar && (
//                 <div className="flex items-center gap-2 text-gray-500 text-sm sm:text-base">
//                   <Car className="w-4 h-4" />
//                   <span>Owns a car</span>
//                   <Check className="w-4 h-4 text-green-500" />
//                 </div>
//               )}
//               {trainingUpToDate && (
//                 <div className="flex items-center gap-2 text-gray-500 text-sm sm:text-base">
//                   <GraduationCap className="w-4 h-4" />
//                   <span>Training up to date</span>
//                   <Check className="w-4 h-4 text-green-500" />
//                 </div>
//               )}
//               <div className="flex items-center gap-2 text-gray-500 text-sm sm:text-base">
//                 <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24"
//                      stroke="currentColor" strokeWidth={1.8}>
//                   <circle cx="6"  cy="18" r="2" fill="currentColor" stroke="none"/>
//                   <circle cx="18" cy="6"  r="2" fill="currentColor" stroke="none"/>
//                   <path d="M6 16 C6 10 10 10 12 12 C14 14 18 14 18 8"/>
//                 </svg>
//                 <span>Miles covered: <strong className="text-gray-800">{milesCovered}</strong></span>
//               </div>
//             </div>
//           </div>

//           <hr className="border-gray-200" />

//           {/* Contact */}
//           <div className="flex flex-col items-center gap-4">
//             <div className="flex items-center gap-3 text-base sm:text-lg font-medium text-gray-700">
//               <div className="w-9 h-9 rounded-full bg-green-50 flex items-center justify-center">
//                 <Phone className="w-4 h-4 text-green-500" />
//               </div>
//               <span>{phone}</span>
//             </div>
//             <div className="flex items-center gap-3 text-base sm:text-lg font-medium text-gray-700">
//               <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center">
//                 <Mail className="w-4 h-4 text-blue-400" />
//               </div>
//               <span className="truncate">{email}</span>
//             </div>
//           </div>

//           <button className="w-full h-12 bg-[#F4BE3D] hover:bg-[#e8b030]
//                              text-gray-900 text-base font-medium rounded-xl
//                              transition-colors duration-200">
//             Send a Message
//           </button>

//           <hr className="border-gray-200" />

//           {/* Tasks */}
//           <div className="flex flex-col gap-3">
//             <div className="flex items-center justify-between">
//               <p className="text-base sm:text-lg font-medium text-gray-700">Tasks:</p>
//               <p className="text-base sm:text-lg font-medium text-gray-800">
//                 <span className="font-bold">{String(tasksDone).padStart(2, "0")}</span>
//                 <span className="text-gray-400">/{String(tasksTotal).padStart(2, "0")}</span>
//               </p>
//             </div>

//             <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
//               <div
//                 className="h-full rounded-full"
//                 style={{
//                   width: `${progress}%`,
//                   background: "linear-gradient(to right, #F4BE3D, #8B9E4A, #3B82F6)",
//                 }}
//               />
//             </div>

//             <div className="flex flex-col gap-2 mt-1">
//               {visibleTasks.map((task) => (
//                 <TaskItem key={task.id} task={task} staffName={name} />
//               ))}
//             </div>

//             {tasks.length > 4 && (
//               <button
//                 onClick={() => setShowAll(!showAll)}
//                 className="flex items-center justify-center gap-1.5
//                            text-base font-medium text-gray-700
//                            hover:opacity-70 transition-opacity mt-2"
//               >
//                 {showAll ? "View less" : "View more"}
//                 <ChevronDown className={`w-4 h-4 transition-transform duration-200
//                                          ${showAll ? "rotate-180" : ""}`} />
//               </button>
//             )}
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }




import { useState } from "react";
import { X, Phone, Mail, Car, GraduationCap, ChevronDown, MoreVertical, Check } from "lucide-react";
import VisitDetailsModal from "./VisitDetailsModal";
import AdminVisitLogModal from "./AdminVisitLogModal";

const statusStyles = {
  late:          { bg: "bg-[#F7C9C2]", text: "text-[#9B4B43]", label: "Late"        },
  "not-started": { bg: "bg-[#ECECEC]", text: "text-[#6B7280]", label: "Not Started" },
  completed:     { bg: "bg-[#D8EFD9]", text: "text-[#5B9B67]", label: "Completed"   },
  "in-progress": { bg: "bg-amber-100", text: "text-amber-600",  label: "In Progress" },
};

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────
function calcProgress(done, total) {
  const d = Number(done)  || 0;
  const t = Number(total) || 0;
  if (t <= 0) return 0;
  return Math.min(100, Math.max(0, Math.round((d / t) * 100)));
}

function safeInitials(name) {
  if (!name || typeof name !== "string") return "?";
  return name
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function pad2(n) {
  const num = Number(n) || 0;
  return String(num).padStart(2, "0");
}

function TaskItem({ task, staffName }) {
  const [menuOpen, setMenuOpen]                 = useState(false);
  const [showVisitDetails, setShowVisitDetails] = useState(false);
  const [showLogSheet, setShowLogSheet]         = useState(false);

  const s = statusStyles[task.status] ?? statusStyles["not-started"];

  return (
    <>
      <div
        onClick={() => setShowVisitDetails(true)}
        className="bg-white shadow-sm border border-gray-100 rounded-xl
                   px-5 py-4 flex items-center justify-between gap-3
                   cursor-pointer hover:bg-gray-50 transition-colors"
      >
        <p className="text-base font-semibold text-gray-900 flex-1">{task.client}</p>
        <span className={`${s.bg} ${s.text} text-sm font-medium px-4 py-1.5
                          rounded-lg min-w-[110px] text-center flex-shrink-0`}>
          {s.label}
        </span>
        <div className="relative flex-shrink-0" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={(e) => { e.stopPropagation(); setMenuOpen(!menuOpen); }}
            className="w-7 h-7 flex items-center justify-center rounded-full
                       hover:bg-gray-100 transition-colors"
          >
            <MoreVertical className="w-4 h-4 text-gray-400" />
          </button>
          {menuOpen && (
            <div className="absolute right-0 bottom-8 z-50 bg-white rounded-2xl
                            shadow-xl border border-gray-100 p-2 w-44 flex flex-col gap-1">
              <div className="flex justify-end mb-1">
                <button
                  onClick={(e) => { e.stopPropagation(); setMenuOpen(false); }}
                  className="w-5 h-5 rounded-full bg-gray-100 flex items-center
                             justify-center hover:bg-gray-200 transition-colors"
                >
                  <X className="w-3 h-3 text-gray-500" />
                </button>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); setMenuOpen(false); setShowVisitDetails(true); }}
                className="w-full text-left text-xs font-semibold text-white
                           bg-blue-400 hover:bg-blue-500 px-3 py-2.5
                           rounded-xl transition-colors"
              >
                View visit details
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setMenuOpen(false); setShowLogSheet(true); }}
                className="w-full text-left text-xs font-semibold text-white
                           bg-green-500 hover:bg-green-600 px-3 py-2.5
                           rounded-xl transition-colors"
              >
                View log sheet
              </button>
            </div>
          )}
        </div>
      </div>

      <VisitDetailsModal
        isOpen={showVisitDetails}
        onClose={() => setShowVisitDetails(false)}
        task={task}
        staffName={staffName}
      />

      <AdminVisitLogModal
        isOpen={showLogSheet}
        onClose={() => setShowLogSheet(false)}
        task={task}
        staffName={staffName}
      />
    </>
  );
}

export default function StaffDetailsModal({ isOpen, onClose, staff }) {
  const [showAll, setShowAll] = useState(false);

  if (!isOpen || !staff) return null;

  // Safe destructuring with defaults so a missing field never crashes the modal
  const {
    name             = "Staff",
    id               = "--",
    phone            = "--",
    email            = "--",
    status           = "available",
    tasksDone        = 0,
    tasksTotal       = 0,
    photo            = null,
    ownsCar          = false,
    trainingUpToDate = false,
    milesCovered     = "0 miles",
    role             = "Support Worker",
    tasks            = [],
  } = staff;

  const safeTasks   = Array.isArray(tasks) ? tasks : [];
  const progress    = calcProgress(tasksDone, tasksTotal);
  const isAvailable = status === "available";
  const initials    = safeInitials(name);
  const visibleTasks = showAll ? safeTasks : safeTasks.slice(0, 4);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center
                 bg-black/25 backdrop-blur-sm px-4 py-6"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-lg
                   max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 sm:px-8 py-6 flex flex-col gap-5">

          {/* Header */}
          <div className="flex items-center justify-center relative">
            <p className="text-lg font-medium text-gray-800">{id}</p>
            <button
              onClick={onClose}
              className="absolute right-0 w-7 h-7 flex items-center justify-center
                         rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          {/* Profile */}
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden
                            border-4 border-gray-100 shadow-md flex-shrink-0">
              {photo ? (
                <img src={photo} alt={name} className="w-full h-full object-cover"/>
              ) : (
                <div className="w-full h-full bg-amber-200 flex items-center
                                justify-center text-3xl font-bold text-gray-700">
                  {initials}
                </div>
              )}
            </div>

            <span className={`text-sm font-medium px-4 py-1 rounded-full border
                              ${isAvailable
                                ? "bg-[#DDF3E4] border-[#B7E0C2] text-[#5C9C6D]"
                                : "bg-red-50 border-red-200 text-red-500"
                              }`}>
              {isAvailable ? "Available" : "Unavailable"}
            </span>

            <p className="text-3xl sm:text-4xl font-bold text-gray-900 mt-1">{name}</p>
            <p className="text-base sm:text-lg text-gray-500">{role}</p>

            <div className="flex flex-col items-center gap-2 mt-1">
              {ownsCar && (
                <div className="flex items-center gap-2 text-gray-500 text-sm sm:text-base">
                  <Car className="w-4 h-4" />
                  <span>Owns a car</span>
                  <Check className="w-4 h-4 text-green-500" />
                </div>
              )}
              {trainingUpToDate && (
                <div className="flex items-center gap-2 text-gray-500 text-sm sm:text-base">
                  <GraduationCap className="w-4 h-4" />
                  <span>Training up to date</span>
                  <Check className="w-4 h-4 text-green-500" />
                </div>
              )}
              <div className="flex items-center gap-2 text-gray-500 text-sm sm:text-base">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor" strokeWidth={1.8}>
                  <circle cx="6"  cy="18" r="2" fill="currentColor" stroke="none"/>
                  <circle cx="18" cy="6"  r="2" fill="currentColor" stroke="none"/>
                  <path d="M6 16 C6 10 10 10 12 12 C14 14 18 14 18 8"/>
                </svg>
                <span>Miles covered: <strong className="text-gray-800">{milesCovered}</strong></span>
              </div>
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* Contact */}
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-3 text-base sm:text-lg font-medium text-gray-700">
              <div className="w-9 h-9 rounded-full bg-green-50 flex items-center justify-center">
                <Phone className="w-4 h-4 text-green-500" />
              </div>
              <span>{phone}</span>
            </div>
            <div className="flex items-center gap-3 text-base sm:text-lg font-medium text-gray-700">
              <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center">
                <Mail className="w-4 h-4 text-blue-400" />
              </div>
              <span className="truncate">{email}</span>
            </div>
          </div>

          <button className="w-full h-12 bg-[#F4BE3D] hover:bg-[#e8b030]
                             text-gray-900 text-base font-medium rounded-xl
                             transition-colors duration-200">
            Send a Message
          </button>

          <hr className="border-gray-200" />

          {/* Tasks */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <p className="text-base sm:text-lg font-medium text-gray-700">Tasks:</p>
              <p className="text-base sm:text-lg font-medium text-gray-800">
                <span className="font-bold">{pad2(tasksDone)}</span>
                <span className="text-gray-400">/{pad2(tasksTotal)}</span>
              </p>
            </div>

            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  background: "linear-gradient(to right, #F4BE3D, #8B9E4A, #3B82F6)",
                  minWidth: progress > 0 ? "8px" : "0px",
                }}
              />
            </div>

            {safeTasks.length === 0 ? (
              <div className="flex items-center justify-center py-8 text-sm text-gray-400">
                No tasks assigned yet
              </div>
            ) : (
              <>
                <div className="flex flex-col gap-2 mt-1">
                  {visibleTasks.map((task) => (
                    <TaskItem key={task.id} task={task} staffName={name} />
                  ))}
                </div>

                {safeTasks.length > 4 && (
                  <button
                    onClick={() => setShowAll(!showAll)}
                    className="flex items-center justify-center gap-1.5
                               text-base font-medium text-gray-700
                               hover:opacity-70 transition-opacity mt-2"
                  >
                    {showAll ? "View less" : "View more"}
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200
                                             ${showAll ? "rotate-180" : ""}`} />
                  </button>
                )}
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}