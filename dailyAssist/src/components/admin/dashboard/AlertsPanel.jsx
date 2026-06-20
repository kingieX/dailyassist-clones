// import { alerts } from "../../../data/adminData";
// import { ChevronRight, AlertTriangle, FileText, Shield } from "lucide-react";

// const iconMap = {
//   warning: { Icon: AlertTriangle, color: "text-red-500",   bg: "bg-red-50"   },
//   info:    { Icon: FileText,      color: "text-blue-500",  bg: "bg-blue-50"  },
//   yellow:  { Icon: Shield,        color: "text-amber-500", bg: "bg-amber-50" },
// };

// export default function AlertsPanel() {
//   return (
//     <div className="rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

//       {/* Header — blue background */}
//       <div className="bg-blue-50 flex items-center gap-2 px-5 py-4">
//         <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24"
//              stroke="currentColor" strokeWidth={1.8}>
//           <path strokeLinecap="round" strokeLinejoin="round"
//                 d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
//         </svg>
//         <h3 className="text-base font-bold text-gray-800">Alerts &amp; Reminders</h3>
//       </div>

//       {/* Body — white background */}
//       <div className="bg-white px-5 py-3 flex flex-col gap-1">
//         {alerts.map((alert) => {
//           const { Icon, color, bg } = iconMap[alert.type] ?? iconMap.info;
//           return (
//             <button
//               key={alert.id}
//               className="flex items-center gap-3 w-full text-left py-2.5
//                          hover:bg-gray-50 rounded-xl px-2 transition-colors"
//             >
//               <div className={`w-7 h-7 rounded-lg ${bg} flex items-center
//                                justify-center flex-shrink-0`}>
//                 <Icon className={`w-3.5 h-3.5 ${color}`} />
//               </div>
//               <span className="text-sm text-gray-700 flex-1 truncate">
//                 {alert.text}
//               </span>
//               <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
//             </button>
//           );
//         })}

//         {/* Footer */}
//         <button className="w-full flex items-center justify-center gap-1
//                            text-sm font-medium text-[#e7b343] hover:text-[#d4a030]
//                            transition-colors pt-3 mt-1 border-t border-gray-100">
//           View All <ChevronRight className="w-4 h-4" />
//         </button>
//       </div>
//     </div>
//   );
// }



import { useState } from "react";
import { ChevronRight, ChevronUp, AlertTriangle, FileText, Shield } from "lucide-react";

const iconMap = {
  warning: { Icon: AlertTriangle, color: "text-red-500",   bg: "bg-red-50"   },
  info:    { Icon: FileText,      color: "text-blue-500",  bg: "bg-blue-50"  },
  yellow:  { Icon: Shield,        color: "text-amber-500", bg: "bg-amber-50" },
};

const PREVIEW_COUNT = 2;

export default function AlertsPanel({ alerts = [] }) {
  const [expanded, setExpanded] = useState(false);

  // Build alerts from real backend data
  const builtAlerts = [];

  if (alerts.unassignedRequestedBookings?.length > 0) {
    builtAlerts.push({
      id: "unassigned",
      type: "warning",
      text: `${alerts.unassignedRequestedBookings.length} Unassigned Booking(s) need attention`,
    });
  }

  if (alerts.overdueRequestedBookings?.length > 0) {
    builtAlerts.push({
      id: "overdue",
      type: "yellow",
      text: `${alerts.overdueRequestedBookings.length} Overdue Booking(s) require action`,
    });
  }

  const hasRealAlerts = builtAlerts.length > 0;

  const displayAlerts = hasRealAlerts
    ? builtAlerts
    : [{ id: "none", type: "info", text: "No alerts at this time" }];

  // Only show View All / collapse if there are real alerts beyond the preview count
  // const showToggle = hasRealAlerts && builtAlerts.length > PREVIEW_COUNT;
  const showToggle = true;
  const visibleAlerts = expanded ? displayAlerts : displayAlerts.slice(0, PREVIEW_COUNT);

  return (
    <div className="rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="bg-blue-50 flex items-center gap-2 px-5 py-4">
        <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
        </svg>
        <h3 className="text-base font-bold text-gray-800">Alerts &amp; Reminders</h3>
      </div>

      <div className="bg-white px-5 py-3 flex flex-col gap-1">
        {visibleAlerts.map((alert) => {
          const { Icon, color, bg } = iconMap[alert.type] ?? iconMap.info;
          return (
            <button
              key={alert.id}
              className="flex items-center gap-3 w-full text-left py-2.5 hover:bg-gray-50 rounded-xl px-2 transition-colors"
            >
              <div className={`w-7 h-7 rounded-lg ${bg} flex items-center justify-center flex-shrink-0`}>
                <Icon className={`w-3.5 h-3.5 ${color}`} />
              </div>
              <span className="text-sm text-gray-700 flex-1 truncate">{alert.text}</span>
              <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
            </button>
          );
        })}

        {showToggle && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-full flex items-center justify-center gap-1 text-sm font-medium text-[#e7b343] hover:text-[#d4a030] transition-colors pt-3 mt-1 border-t border-gray-100"
          >
            {expanded ? (
              <>Show Less <ChevronUp className="w-4 h-4" /></>
            ) : (
              <>View All <ChevronRight className="w-4 h-4" /></>
            )}
          </button>
        )}
      </div>
    </div>
  );
}