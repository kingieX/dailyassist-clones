// import { reports } from "../../../data/adminData";
// import { ChevronRight, FileText } from "lucide-react";

// function Avatar({ name, index }) {
//   const colors = ["bg-amber-400", "bg-blue-400", "bg-green-400"];
//   const color = colors[index % colors.length];
//   return (
//     <div className={`w-9 h-9 rounded-full ${color} flex items-center
//                      justify-center text-white text-xs font-bold flex-shrink-0`}>
//       R
//     </div>
//   );
// }

// export default function ReportPanel() {
//   return (
//     <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
//       {/* Header */}
//       <div className="flex items-center gap-2 mb-4">
//         <FileText className="w-4 h-4 text-[#e7b343]" />
//         <h3 className="text-base font-bold text-gray-800">Report</h3>
//       </div>

//       {/* List */}
//       <div className="flex flex-col gap-3">
//         {reports.map((report, i) => (
//           <button
//             key={report.id}
//             className="flex items-center gap-3 w-full text-left
//                        hover:bg-gray-50 rounded-xl p-2 transition-colors"
//           >
//             <Avatar name={report.text} index={i} />
//             <div className="flex-1 min-w-0">
//               <p className="text-sm font-medium text-gray-800 truncate">{report.text}</p>
//               <p className="text-xs text-gray-400">{report.time}</p>
//             </div>
//             <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0" />
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }





// import { ChevronRight, FileText } from "lucide-react";

// function Avatar({ index }) {
//   const colors = ["bg-amber-400", "bg-blue-400", "bg-green-400"];
//   const color = colors[index % colors.length];
//   return (
//     <div className={`w-9 h-9 rounded-full ${color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
//       R
//     </div>
//   );
// }

// const fallbackReports = [
//   { id: 1, text: "Provided home-help su...", time: "Just now" },
//   { id: 2, text: "Provided home-help su...", time: "Just now" },
//   { id: 3, text: "Provided home-help su...", time: "Just now" },
// ];

// export default function ReportPanel({ reportsData = [] }) {
//   const reports = reportsData.length > 0
//     ? reportsData.map((r, i) => ({
//         id:   r.id   ?? i,
//         text: r.additionalNote ?? r.text ?? r.notes ?? "Visit report submitted",
//         time: r.createdAt ? new Date(r.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "Just now",
//       }))
//     : fallbackReports;

//   return (
//     <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
//       <div className="flex items-center gap-2 mb-4">
//         <FileText className="w-4 h-4 text-[#e7b343]" />
//         <h3 className="text-base font-bold text-gray-800">Report</h3>
//       </div>
//       <div className="flex flex-col gap-3">
//         {reports.map((report, i) => (
//           <button key={report.id} className="flex items-center gap-3 w-full text-left hover:bg-gray-50 rounded-xl p-2 transition-colors">
//             <Avatar index={i} />
//             <div className="flex-1 min-w-0">
//               <p className="text-sm font-medium text-gray-800 truncate">{report.text}</p>
//               <p className="text-xs text-gray-400">{report.time}</p>
//             </div>
//             <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0" />
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

import { ChevronRight, FileText } from "lucide-react";

function Avatar({ index }) {
  const colors = ["bg-amber-400", "bg-blue-400", "bg-green-400"];
  const color = colors[index % colors.length];
  return (
    <div className={`w-9 h-9 rounded-full ${color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
      R
    </div>
  );
}

export default function ReportPanel({ reportsData = [] }) {
  const reports = reportsData.map((r, i) => ({
    id:   r.id   ?? i,
    text: r.additionalNote ?? r.text ?? r.notes ?? "Visit report submitted",
    time: r.createdAt ? new Date(r.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "Just now",
  }));

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="w-4 h-4 text-[#e7b343]" />
        <h3 className="text-base font-bold text-gray-800">Report</h3>
      </div>

      {reports.length === 0 ? (
        <div className="flex items-center justify-center h-[120px] text-sm text-gray-400">
          No reports submitted yet
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {reports.map((report, i) => (
            <button key={report.id} className="flex items-center gap-3 w-full text-left hover:bg-gray-50 rounded-xl p-2 transition-colors">
              <Avatar index={i} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{report.text}</p>
                <p className="text-xs text-gray-400">{report.time}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}