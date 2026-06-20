// import { todayVisits } from "../../../data/adminData";
// import { Calendar } from "lucide-react";

// const statusStyles = {
//   completed:     "bg-green-100 text-green-600",
//   "in-progress": "bg-amber-100 text-amber-600",
//   late:          "bg-red-100 text-red-500",
//   "not-started": "bg-gray-100 text-gray-500",
// };

// const statusLabels = {
//   completed:     "Completed",
//   "in-progress": "In Progress",
//   late:          "Late",
//   "not-started": "Not Started",
// };
// export default function VisitsTable() {
//   return (
//     <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
//       {/* Header */}
//       <div className="flex items-center gap-2 mb-4">
//         <Calendar className="w-4 h-4 text-[#e7b343]" />
//         <h3 className="text-base font-bold text-gray-800">Today's Visits</h3>
//       </div>

//       {/* Table — scrollable on mobile */}
//       <div className="overflow-x-auto">
//         <table className="w-full min-w-[580px]">
//           <thead>
//             <tr className="bg-[#fef3d0] text-sm font-semibold text-gray-700">
//               <th className="text-left px-4 py-3 rounded-l-xl">Client's Name</th>
//               <th className="text-left px-4 py-3">Address</th>
//               <th className="text-left px-4 py-3">Staff on Duty</th>
//               <th className="text-left px-4 py-3">Time</th>
//               <th className="text-left px-4 py-3 rounded-r-xl">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {todayVisits.map((visit, i) => (
//               <tr
//                 key={visit.id}
//                 className={`text-sm border-b border-gray-50 hover:bg-gray-50
//                             transition-colors cursor-pointer
//                             ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}
//               >
//                 <td className="px-4 py-3 font-medium text-gray-800">{visit.client}</td>
//                 <td className="px-4 py-3 text-gray-500">
//                   <div className="flex items-center gap-1.5">
//                     <Calendar className="w-3.5 h-3.5 text-[#e7b343] flex-shrink-0" />
//                     {visit.address}
//                   </div>
//                 </td>
//                 <td className="px-4 py-3 text-gray-700">{visit.staff}</td>
//                 <td className="px-4 py-3 text-gray-500">{visit.time}</td>
//                 <td className="px-4 py-3">
//                   <span className={`text-xs font-semibold px-3 py-1.5 rounded-lg
//                                    ${statusStyles[visit.status]}`}>
//                     {statusLabels[visit.status]}
//                   </span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//      </div>

//       {/* Footer */}
//       <button className="mt-3 w-full flex items-center justify-center gap-1
//                          text-sm font-medium text-[#e7b343] hover:text-[#d4a030]
//                          transition-colors pt-3 border-t border-gray-100">
//         View All
//         <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//           <path strokeLinecap="round" strokeLinejoin="round"
//                 strokeWidth={2} d="M9 5l7 7-7 7"/>
//         </svg>
//       </button>
//     </div>
//   );
// }

// import { Calendar } from "lucide-react";

// const statusStyles = {
//   completed:     "bg-green-100 text-green-600",
//   "in-progress": "bg-amber-100 text-amber-600",
//   late:          "bg-red-100 text-red-500",
//   "not-started": "bg-gray-100 text-gray-500",
// };

// const statusLabels = {
//   completed:     "Completed",
//   "in-progress": "In Progress",
//   late:          "Late",
//   "not-started": "Not Started",
// };

// const fallbackVisits = [
//   { id: 1, client: "Mrs. Alan Sarah",   address: "1 Church Stre...",  staff: "Lauren James",  time: "9:00am - 10:00am",  status: "completed"    },
//   { id: 2, client: "Mr. Collins Rice",  address: "32 Meadow...",      staff: "Sarah Adeleke", time: "11:00am - 12:00pm", status: "in-progress"  },
//   { id: 3, client: "Ms. Turner Stella", address: "17 Maples Av...",   staff: "James Brown",   time: "1:00pm - 2:00pm",   status: "late"         },
//   { id: 4, client: "Mr. Martins Dyle",  address: "5 Briar Close,...", staff: "John Doe",      time: "3:00pm - 4:00pm",   status: "not-started"  },
// ];

// export default function VisitsTable({ visitsData = [] }) {
//   const visits = visitsData.length > 0
//     ? visitsData.map((v, i) => ({
//         id: v.id ?? i,
//         client:  v.clientName  ?? v.client  ?? "Client",
//         address: v.address     ?? "--",
//         staff:   v.staffName   ?? v.staff   ?? "--",
//         time:    v.time        ?? (v.startTime && v.endTime ? `${v.startTime} - ${v.endTime}` : "--"),
//         status:  v.status?.toLowerCase() ?? "not-started",
//       }))
//     : fallbackVisits;

//   return (
//     <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
//       <div className="flex items-center gap-2 mb-4">
//         <Calendar className="w-4 h-4 text-[#e7b343]" />
//         <h3 className="text-base font-bold text-gray-800">Today's Visits</h3>
//       </div>
//       <div className="overflow-x-auto">
//         <table className="w-full min-w-[580px]">
//           <thead>
//             <tr className="bg-[#fef3d0] text-sm font-semibold text-gray-700">
//               <th className="text-left px-4 py-3 rounded-l-xl">Client's Name</th>
//               <th className="text-left px-4 py-3">Address</th>
//               <th className="text-left px-4 py-3">Staff on Duty</th>
//               <th className="text-left px-4 py-3">Time</th>
//               <th className="text-left px-4 py-3 rounded-r-xl">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {visits.map((visit, i) => (
//               <tr key={visit.id} className={`text-sm border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}>
//                 <td className="px-4 py-3 font-medium text-gray-800">{visit.client}</td>
//                 <td className="px-4 py-3 text-gray-500">
//                   <div className="flex items-center gap-1.5">
//                     <Calendar className="w-3.5 h-3.5 text-[#e7b343] flex-shrink-0" />
//                     {visit.address}
//                   </div>
//                 </td>
//                 <td className="px-4 py-3 text-gray-700">{visit.staff}</td>
//                 <td className="px-4 py-3 text-gray-500">{visit.time}</td>
//                 <td className="px-4 py-3">
//                   <span className={`text-xs font-semibold px-3 py-1.5 rounded-lg ${statusStyles[visit.status] ?? statusStyles["not-started"]}`}>
//                     {statusLabels[visit.status] ?? visit.status}
//                   </span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <button className="mt-3 w-full flex items-center justify-center gap-1 text-sm font-medium text-[#e7b343] hover:text-[#d4a030] transition-colors pt-3 border-t border-gray-100">
//         View All
//         <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
//         </svg>
//       </button>
//     </div>
//   );
// }

import { Calendar } from "lucide-react";

const statusStyles = {
  completed:     "bg-green-100 text-green-600",
  "in-progress": "bg-amber-100 text-amber-600",
  late:          "bg-red-100 text-red-500",
  "not-started": "bg-gray-100 text-gray-500",
};

const statusLabels = {
  completed:     "Completed",
  "in-progress": "In Progress",
  late:          "Late",
  "not-started": "Not Started",
};

export default function VisitsTable({ visitsData = [], onViewAll }) {
  const visits = visitsData.map((v, i) => ({
    id: v.id ?? i,
    client:  v.clientName  ?? v.client  ?? "Client",
    address: v.address     ?? "--",
    staff:   v.staffName   ?? v.staff   ?? "--",
    time:    v.time        ?? (v.startTime && v.endTime ? `${v.startTime} - ${v.endTime}` : "--"),
    status:  v.status?.toLowerCase() ?? "not-started",
  }));

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="w-4 h-4 text-[#e7b343]" />
        <h3 className="text-base font-bold text-gray-800">Today's Visits</h3>
      </div>

      {visits.length === 0 ? (
        <div className="flex items-center justify-center h-[160px] text-sm text-gray-400">
          No visits scheduled for today
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[580px]">
            <thead>
              <tr className="bg-[#fef3d0] text-sm font-semibold text-gray-700">
                <th className="text-left px-4 py-3 rounded-l-xl">Client's Name</th>
                <th className="text-left px-4 py-3">Address</th>
                <th className="text-left px-4 py-3">Staff on Duty</th>
                <th className="text-left px-4 py-3">Time</th>
                <th className="text-left px-4 py-3 rounded-r-xl">Status</th>
              </tr>
            </thead>
            <tbody>
              {visits.map((visit, i) => (
                <tr key={visit.id} className={`text-sm border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}>
                  <td className="px-4 py-3 font-medium text-gray-800">{visit.client}</td>
                  <td className="px-4 py-3 text-gray-500">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#e7b343] flex-shrink-0" />
                      {visit.address}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-700">{visit.staff}</td>
                  <td className="px-4 py-3 text-gray-500">{visit.time}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-3 py-1.5 rounded-lg ${statusStyles[visit.status] ?? statusStyles["not-started"]}`}>
                      {statusLabels[visit.status] ?? visit.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <button
        onClick={onViewAll}
        className="mt-3 w-full flex items-center justify-center gap-1 text-sm font-medium text-[#e7b343] hover:text-[#d4a030] transition-colors pt-3 border-t border-gray-100"
      >
        View All
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
        </svg>
      </button>
    </div>
  );
}