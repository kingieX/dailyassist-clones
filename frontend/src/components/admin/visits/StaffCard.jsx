// import { useState } from "react";
// import { Phone, Mail, MoreVertical, X } from "lucide-react";
// import AssignVisitModal from "../modals/AssignVisitModal";
// import ReassignVisitModal from "../modals/ReassignVisitModal";import StaffDetailsModal from "./StaffDetailsModal";

// function Avatar({ name, photo }) {
//   const initials = name.split(" ").map(n => n[0]).join("").slice(0, 2);
//   const colors = ["bg-amber-200", "bg-blue-200", "bg-green-200", "bg-pink-200"];
//   const color = colors[name.length % colors.length];
//   const sizeClass = "w-14 h-14 text-base";

//   if (photo) {
//     return (
//       <img src={photo} alt={name}
//            className={`${sizeClass} rounded-full object-cover flex-shrink-0`} />
//     );
//   }
//   return (
//     <div className={`${sizeClass} ${color} rounded-full flex items-center
//                      justify-center font-bold text-gray-700 flex-shrink-0`}>
//       {initials}
//     </div>
//   );
// }

// export default function StaffCard({ staff }) {
//   const { name, status, id, phone, email, tasksDone, tasksTotal, photo } = staff;
//   const progress = Math.round((tasksDone / tasksTotal) * 100);
//   const isAvailable = status === "available";
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [showDetails, setShowDetails] = useState(false);
//   const [showEditVisit, setShowEditVisit] = useState(false);
//   const [showReassign, setShowReassign] = useState(false);

//   return (
//     <>
//       <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4
//                       hover:shadow-md transition-all duration-200 flex flex-col gap-3">

//         {/* ── Top row: avatar + name + badge + menu ── */}
//         <div className="flex items-start justify-between">
//           <div className="flex items-center gap-3">
//             <Avatar name={name} photo={photo} />
//             <div className="flex flex-col gap-1">
//               <p className="text-xs font-bold text-gray-900">{name}</p>
//               <span className={`text-[10px] font-semibold px-4 py-0.5 rounded-full
//                                 border w-fit flex items-center justify-center
//                                 ${isAvailable
//                                   ? "border-green-400 text-green-600 bg-green-50"
//                                   : "border-red-300 text-red-500 bg-red-50"
//                                 }`}>
//                 {isAvailable ? "Available" : "Unavailable"}
//               </span>
//             </div>
//           </div>

//           <div className="relative flex-shrink-0 mt-1">
//             <button
//               onClick={() => setMenuOpen(!menuOpen)}
//               className="w-7 h-7 flex items-center justify-center rounded-lg
//                          hover:bg-gray-100 transition-colors"
//             >
//               <MoreVertical className="w-4 h-4 text-gray-400" />
//             </button>

//             {menuOpen && (
//               <div className="absolute right-0 top-8 z-30 bg-white rounded-2xl
//                               shadow-xl border border-gray-100 p-2 w-44
//                               flex flex-col gap-1">
//                 <div className="flex justify-end mb-1">
//                   <button
//                     onClick={() => setMenuOpen(false)}
//                     className="w-5 h-5 rounded-full bg-gray-100 flex items-center
//                                justify-center hover:bg-gray-200 transition-colors"
//                   >
//                     <X className="w-3 h-3 text-gray-500" />
//                   </button>
//                 </div>
//                 <button
//                   onClick={() => { setMenuOpen(false); setShowEditVisit(true); }}
//                   className="w-full text-left text-xs font-semibold text-white
//                              bg-blue-400 hover:bg-blue-500 px-3 py-2
//                              rounded-xl transition-colors"
//                 >
//                   Edit visit details
//                 </button>
//                <button
//                   onClick={() => { setMenuOpen(false); setShowReassign(true); }}
//                   className="w-full text-left text-xs font-semibold text-white
//                              bg-green-500 hover:bg-green-600 px-3 py-2
//                              rounded-xl transition-colors"
//                 >
//                   Reassign visit
//                 </button>
//                 <button
//                   onClick={() => setMenuOpen(false)}
//                   className="w-full text-left text-xs font-semibold text-white
//                              bg-red-400 hover:bg-red-500 px-3 py-2
//                              rounded-xl transition-colors"
//                 >
//                   Cancel visit
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* ── Divider ── */}
//         <hr className="border-gray-100" />

//         {/* ── Details ── */}
//         <div className="flex flex-col gap-2.5">
//           <p className="text-xs text-gray-500">
//             Staff ID: <span className="font-bold text-gray-800">{id}</span>
//           </p>
//           <div className="flex items-center gap-2 text-xs text-gray-600">
//             <Phone className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
//             <span>{phone}</span>
//           </div>
//           <div className="flex items-center gap-2 text-xs text-gray-600">
//             <Mail className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
//             <span className="truncate">{email}</span>
//           </div>
//         </div>

//         {/* ── Tasks progress ── */}
//         <div className="flex flex-col gap-1.5">
//           <div className="flex items-center justify-between">
//             <p className="text-xs text-gray-500">Tasks:</p>
//             <p className="text-xs font-bold text-gray-800">
//               {String(tasksDone).padStart(2, "0")}
//               <span className="text-gray-400">/{String(tasksTotal).padStart(2, "0")}</span>
//             </p>
//           </div>
//           <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
//             <div
//               className="h-full rounded-full"
//               style={{
//                 width: `${progress}%`,
//                 background: "linear-gradient(to right, #FBBF24, #3B82F6)",
//                 minWidth: "8px",
//               }}
//             />
//           </div>
//         </div>

//         {/* ── Buttons ── */}
//         <div className="flex flex-col gap-2 mt-1">
//           <button className="w-full bg-[#f5c045] hover:bg-[#e8b030] text-gray-900
//                              text-sm font-semibold py-2 rounded-xl
//                              transition-colors duration-200">
//             Send a Message
//           </button>
//           <button
//             onClick={() => setShowDetails(true)}
//             className="w-full border border-[#f5c045] text-gray-800
//                        text-sm font-medium py-2 rounded-xl
//                        hover:bg-[#fef9ec] transition-colors duration-200">
//             View Tasks
//           </button>
//         </div>
//       </div>

//       <StaffDetailsModal
//         isOpen={showDetails}
//         onClose={() => setShowDetails(false)}
//         staff={staff}
//       />

//      <AssignVisitModal
//         isOpen={showEditVisit}
//         onClose={() => setShowEditVisit(false)}
//         editMode={true}
//         prefillData={{
//           clientName: name,
//           address: "1 Church Street, Canvey Island, Essex",
//           staff: name,
//         }}
//       />

//      <ReassignVisitModal
//         isOpen={showReassign}
//         onClose={() => setShowReassign(false)}
//         prefillData={{
//           clientName: name,
//           address: "1 Church Street, Canvey Island, Essex",
//           staff: name,
//         }}
//       />
//     </>
//   );
// }


import { useState } from "react";
import { Phone, Mail, MoreVertical, X } from "lucide-react";
import AssignVisitModal from "../modals/AssignVisitModal";
import ReassignVisitModal from "../modals/ReassignVisitModal";
import StaffDetailsModal from "./StaffDetailsModal";

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────
// Safe progress calculation. Returns 0 when tasksTotal is 0 or undefined,
// avoiding NaN on the progress bar's width.
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

function Avatar({ name, photo }) {
  const initials = safeInitials(name);
  const colors = ["bg-amber-200", "bg-blue-200", "bg-green-200", "bg-pink-200"];
  const color = colors[(name?.length ?? 0) % colors.length];
  const sizeClass = "w-14 h-14 text-base";

  if (photo) {
    return (
      <img
        src={photo}
        alt={name ?? "Staff"}
        className={`${sizeClass} rounded-full object-cover flex-shrink-0`}
      />
    );
  }
  return (
    <div className={`${sizeClass} ${color} rounded-full flex items-center
                     justify-center font-bold text-gray-700 flex-shrink-0`}>
      {initials}
    </div>
  );
}

export default function StaffCard({ staff }) {
  const {
    name       = "Staff",
    status     = "available",
    id         = "--",
    phone      = "--",
    email      = "--",
    tasksDone  = 0,
    tasksTotal = 0,
    photo      = null,
  } = staff ?? {};

  const progress    = calcProgress(tasksDone, tasksTotal);
  const isAvailable = status === "available";

  const [menuOpen, setMenuOpen]           = useState(false);
  const [showDetails, setShowDetails]     = useState(false);
  const [showEditVisit, setShowEditVisit] = useState(false);
  const [showReassign, setShowReassign]   = useState(false);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4
                      hover:shadow-md transition-all duration-200 flex flex-col gap-3">

        {/* Top row: avatar + name + badge + menu */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar name={name} photo={photo} />
            <div className="flex flex-col gap-1">
              <p className="text-xs font-bold text-gray-900">{name}</p>
              <span className={`text-[10px] font-semibold px-4 py-0.5 rounded-full
                                border w-fit flex items-center justify-center
                                ${isAvailable
                                  ? "border-green-400 text-green-600 bg-green-50"
                                  : "border-red-300 text-red-500 bg-red-50"
                                }`}>
                {isAvailable ? "Available" : "Unavailable"}
              </span>
            </div>
          </div>

          <div className="relative flex-shrink-0 mt-1">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-7 h-7 flex items-center justify-center rounded-lg
                         hover:bg-gray-100 transition-colors"
            >
              <MoreVertical className="w-4 h-4 text-gray-400" />
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-8 z-30 bg-white rounded-2xl
                              shadow-xl border border-gray-100 p-2 w-44
                              flex flex-col gap-1">
                <div className="flex justify-end mb-1">
                  <button
                    onClick={() => setMenuOpen(false)}
                    className="w-5 h-5 rounded-full bg-gray-100 flex items-center
                               justify-center hover:bg-gray-200 transition-colors"
                  >
                    <X className="w-3 h-3 text-gray-500" />
                  </button>
                </div>
                <button
                  onClick={() => { setMenuOpen(false); setShowEditVisit(true); }}
                  className="w-full text-left text-xs font-semibold text-white
                             bg-blue-400 hover:bg-blue-500 px-3 py-2
                             rounded-xl transition-colors"
                >
                  Edit visit details
                </button>
                <button
                  onClick={() => { setMenuOpen(false); setShowReassign(true); }}
                  className="w-full text-left text-xs font-semibold text-white
                             bg-green-500 hover:bg-green-600 px-3 py-2
                             rounded-xl transition-colors"
                >
                  Reassign visit
                </button>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="w-full text-left text-xs font-semibold text-white
                             bg-red-400 hover:bg-red-500 px-3 py-2
                             rounded-xl transition-colors"
                >
                  Cancel visit
                </button>
              </div>
            )}
          </div>
        </div>

        <hr className="border-gray-100" />

        {/* Details */}
        <div className="flex flex-col gap-2.5">
          <p className="text-xs text-gray-500">
            Staff ID: <span className="font-bold text-gray-800">{id}</span>
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <Phone className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
            <span>{phone}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <Mail className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
            <span className="truncate">{email}</span>
          </div>
        </div>

        {/* Tasks progress */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-500">Tasks:</p>
            <p className="text-xs font-bold text-gray-800">
              {pad2(tasksDone)}
              <span className="text-gray-400">/{pad2(tasksTotal)}</span>
            </p>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(to right, #FBBF24, #3B82F6)",
                minWidth: progress > 0 ? "8px" : "0px",
              }}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-2 mt-1">
          <button className="w-full bg-[#f5c045] hover:bg-[#e8b030] text-gray-900
                             text-sm font-semibold py-2 rounded-xl
                             transition-colors duration-200">
            Send a Message
          </button>
          <button
            onClick={() => setShowDetails(true)}
            className="w-full border border-[#f5c045] text-gray-800
                       text-sm font-medium py-2 rounded-xl
                       hover:bg-[#fef9ec] transition-colors duration-200">
            View Tasks
          </button>
        </div>
      </div>

      <StaffDetailsModal
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
        staff={staff}
      />

      <AssignVisitModal
        isOpen={showEditVisit}
        onClose={() => setShowEditVisit(false)}
        editMode={true}
        prefillData={{
          clientName: name,
          address: "1 Church Street, Canvey Island, Essex",
          staff: name,
        }}
      />

      <ReassignVisitModal
        isOpen={showReassign}
        onClose={() => setShowReassign(false)}
        prefillData={{
          clientName: name,
          address: "1 Church Street, Canvey Island, Essex",
          staff: name,
        }}
      />
    </>
  );
}