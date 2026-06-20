// import { staffSchedule } from "../../../data/adminData";
// import { ChevronRight } from "lucide-react";

// function Avatar({ name }) {
//   const initials = name.split(" ").map(n => n[0]).join("").slice(0, 2);
//   const colors = ["bg-amber-300", "bg-blue-300", "bg-green-300", "bg-pink-300"];
//   const color = colors[name.length % colors.length];
//   return (
//     <div className={`w-9 h-9 rounded-full ${color} flex items-center justify-center
//                      text-white text-xs font-bold flex-shrink-0`}>
//       {initials}
//     </div>
//   );
// }

// export default function StaffSchedule() {
//   return (
//     <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
//       {/* Header */}
//       <div className="flex items-center gap-2 mb-4">
//         <svg className="w-4 h-4 text-[#e7b343]" fill="none" viewBox="0 0 24 24"
//              stroke="currentColor" strokeWidth={1.8}>
//           <path strokeLinecap="round" strokeLinejoin="round"
//                 d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0"/>
//         </svg>
//         <h3 className="text-base font-bold text-gray-800">Staff's Schedule</h3>
//       </div>

//       {/* List */}
//       <div className="flex flex-col gap-3">
//         {staffSchedule.map((staff) => (
//           <div key={staff.id} className="flex items-center gap-3">
//             <Avatar name={staff.name} />
//             <div className="flex-1 min-w-0">
//               <p className="text-sm font-semibold text-gray-800 truncate">{staff.name}</p>
//               <p className="text-xs text-gray-400">{staff.time}</p>
//             </div>
//             <span className={`text-xs font-semibold px-3 py-1 rounded-lg whitespace-nowrap
//                               ${staff.status === "available"
//                                 ? "bg-green-100 text-green-600"
//                                 : "bg-red-100 text-red-500"
//                               }`}>
//               {staff.status === "available" ? "Available" : "Unavailable"}
//             </span>
//           </div>
//         ))}
//       </div>

//       {/* Footer */}
//       <button className="mt-4 w-full flex items-center justify-center gap-1
//                          text-sm font-medium text-[#e7b343] hover:text-[#d4a030]
//                          transition-colors pt-3 border-t border-gray-100">
//         View All <ChevronRight className="w-4 h-4" />
//       </button>
//     </div>
//   );
// }


import { ChevronRight } from "lucide-react";

function Avatar({ name }) {
  const initials = name.split(" ").map(n => n[0]).join("").slice(0, 2);
  const colors = ["bg-amber-300", "bg-blue-300", "bg-green-300", "bg-pink-300"];
  const color = colors[name.length % colors.length];
  return (
    <div className={`w-9 h-9 rounded-full ${color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
      {initials}
    </div>
  );
}

export default function StaffSchedule({ staffData = [], onViewAll }) {
  const schedule = staffData.length > 0
    ? staffData.map((s, i) => ({
        id: s.id ?? i,
        name: s.name ?? s.staffName ?? "Staff",
        time: s.time ?? s.schedule ?? s.shift ?? "--",
        status: s.status ?? "available",
      }))
    : [];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      <div className="flex items-center gap-2 mb-4">
        <svg className="w-4 h-4 text-[#e7b343]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0"/>
        </svg>
        <h3 className="text-base font-bold text-gray-800">Staff's Schedule</h3>
      </div>

      {schedule.length === 0 ? (
        <div className="flex items-center justify-center h-[120px] text-sm text-gray-400">
          No staff scheduled today
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {schedule.map((staff) => (
            <div key={staff.id} className="flex items-center gap-3">
              <Avatar name={staff.name} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">{staff.name}</p>
                <p className="text-xs text-gray-400">{staff.time}</p>
              </div>
              <span className={`text-xs font-semibold px-3 py-1 rounded-lg whitespace-nowrap ${
                staff.status === "available"
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-500"
              }`}>
                {staff.status === "available" ? "Available" : "Unavailable"}
              </span>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={onViewAll}
        className="mt-4 w-full flex items-center justify-center gap-1 text-sm font-medium text-[#e7b343] hover:text-[#d4a030] transition-colors pt-3 border-t border-gray-100"
      >
        View All <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}