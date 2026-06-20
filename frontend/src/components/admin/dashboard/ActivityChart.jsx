// import { useState } from "react";

// const datasets = {
//   week: {
//     label: "This week",
//     bars: [
//       { label: "MON",  value: 50  },
//       { label: "TUES", value: 70  },
//       { label: "WED",  value: 70  },
//       { label: "THUR", value: 120 },
//       { label: "FRI",  value: 140 },
//       { label: "SAT",  value: 100 },
//     ],
//   },
//   month: {
//     label: "This month",
//     bars: [
//       { label: "WEEK 1", value: 100 },
//       { label: "WEEK 2", value: 150 },
//       { label: "WEEK 3", value: 190 },
//       { label: "WEEK 4", value: 170 },
//       { label: "WEEK 5", value: 80  },
//     ],
//   },
//   year: {
//     label: "This year",
//     bars: [
//       { label: "JAN", value: 50  },
//       { label: "FEB", value: 70  },
//       { label: "MAR", value: 75  },
//       { label: "APR", value: 110 },
//       { label: "MAY", value: 140 },
//       { label: "JUN", value: 105 },
//       { label: "JUL", value: 120 },
//       { label: "AUG", value: 55  },
//       { label: "SEP", value: 140 },
//       { label: "OCT", value: 165 },
//       { label: "NOV", value: 185 },
//       { label: "DEC", value: 205 },
//     ],
//   },
// };

// const MAX_VALUE = 220;
// const CHART_HEIGHT = 180;

// export default function ActivityChart() {
//   const [view, setView] = useState("week");
//   const [open, setOpen] = useState(false);
//   const data = datasets[view];

//   return (
//     <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
//       {/* ── Header ── */}
//       <div className="flex items-center justify-between mb-5">
//         <h3 className="text-base font-bold text-gray-800">Activity</h3>

//         {/* Dropdown */}
//         <div className="relative">
//           <button
//             onClick={() => setOpen(!open)}
//             className="flex items-center gap-1.5 text-xs text-gray-600
//                        border border-gray-200 rounded-lg px-3 py-1.5
//                        hover:bg-gray-50 transition-colors bg-white"
//           >
//             <span className="w-2 h-2 rounded-full bg-green-500 inline-block"/>
//             {data.label}
//             <svg className="w-3 h-3 ml-0.5" fill="none" viewBox="0 0 24 24"
//                  stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round"
//                     strokeWidth={2} d="M19 9l-7 7-7-7"/>
//             </svg>
//           </button>

//           {open && (
//             <div className="absolute right-0 top-8 bg-white border border-gray-200
//                             rounded-xl shadow-lg z-20 overflow-hidden w-36">
//               {Object.entries(datasets).map(([key, val]) => (
//                 <button
//                   key={key}
//                   onClick={() => { setView(key); setOpen(false); }}
//                   className={`w-full text-left px-4 py-2.5 text-xs font-medium
//                               transition-colors hover:bg-[#fef9ec]
//                               ${view === key
//                                 ? "bg-[#fef9ec] text-[#e7b343]"
//                                 : "text-gray-600"
//                               }`}
//                 >
//                   {val.label}
//                 </button>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* ── Chart ── */}
//       <div className="flex gap-2 items-end">
//         {/* Y-axis */}
//         <div className="flex flex-col justify-between text-[10px] text-gray-400
//                         text-right pr-1 flex-shrink-0"
//              style={{ height: CHART_HEIGHT }}>
//           <span>200+</span>
//           <span>150</span>
//           <span>100</span>
//           <span>50</span>
//           <span>0</span>
//         </div>

//         {/* Bars */}
//         <div className={`flex items-end flex-1 gap-2
//                          ${view === "year" ? "gap-1" : "gap-2"}`}
//              style={{ height: CHART_HEIGHT }}>
//           {data.bars.map((bar) => {
//             const fillHeight = Math.round((bar.value / MAX_VALUE) * CHART_HEIGHT);
//             const isYear = view === "year";

//             return (
//               <div
//                 key={bar.label}
//                 className="flex flex-col items-center gap-1 flex-1"
//               >
//                 {/* Bar container */}
//                 <div
//                   className="relative w-full rounded-t-2xl overflow-hidden
//                               group cursor-pointer"
//                   style={{ height: CHART_HEIGHT - 20 }}
//                 >
//                   {/* Background bar — full height gray */}
//                   <div className="absolute inset-0 bg-[#E5E7EB] rounded-t-2xl"/>

//                   {/* Foreground gradient bar — from bottom */}
//                   <div
//                     className="absolute bottom-0 left-0 right-0 rounded-t-2xl
//                                 transition-all duration-500 ease-out
//                                 group-hover:scale-x-105"
//                     style={{
//                       height: `${fillHeight}px`,
//                       background: "linear-gradient(to top, #FBBF24, #3B82F6)",
//                     }}
//                   />
//                 </div>

//                 {/* X label */}
//                 <span className={`text-gray-400 font-medium text-center
//                                   leading-tight
//                                   ${isYear ? "text-[8px]" : "text-[10px]"}`}>
//                   {bar.label}
//                 </span>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }



import { useState } from "react";

const MAX_VALUE = 220;
const CHART_HEIGHT = 180;

export default function ActivityChart({ chartData }) {
  const [view, setView] = useState("week");
  const [open, setOpen] = useState(false);

  // Build datasets purely from real backend data
  const datasets = (() => {
    if (!chartData) return null;

    const result = {};

    if (chartData.week?.length > 0) {
      result.week = {
        label: "This week",
        bars: chartData.week.map((item, i) => ({
          label: item.label ?? item.day ?? `Day ${i + 1}`,
          value: item.value ?? item.count ?? 0,
        })),
      };
    }

    if (chartData.month?.length > 0) {
      result.month = {
        label: "This month",
        bars: chartData.month.map((item, i) => ({
          label: item.label ?? item.week ?? `Week ${i + 1}`,
          value: item.value ?? item.count ?? 0,
        })),
      };
    }

    if (chartData.year?.length > 0) {
      result.year = {
        label: "This year",
        bars: chartData.year.map((item, i) => ({
          label: item.label ?? item.month ?? `M${i + 1}`,
          value: item.value ?? item.count ?? 0,
        })),
      };
    }

    // Fallback: bookingsByStatus from backend
    if (Object.keys(result).length === 0 && chartData.bookingsByStatus?.length > 0) {
      result.week = {
        label: "Bookings by Status",
        bars: chartData.bookingsByStatus.map((item, i) => ({
          label: item.status ?? `Item ${i + 1}`,
          value: item.count ?? item.value ?? 0,
        })),
      };
    }

    return Object.keys(result).length > 0 ? result : null;
  })();

  // No data state
  if (!datasets) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <h3 className="text-base font-bold text-gray-800 mb-5">Activity</h3>
        <div className="flex items-center justify-center h-[180px] text-sm text-gray-400">
          No activity data available
        </div>
      </div>
    );
  }

  // Make sure the current view key exists in datasets, reset to first available if not
  const availableKey = datasets[view] ? view : Object.keys(datasets)[0];
  const data = datasets[availableKey];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-bold text-gray-800">Activity</h3>
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-1.5 text-xs text-gray-600 border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50 transition-colors bg-white"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 inline-block"/>
            {data.label}
            <svg className="w-3 h-3 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
          {open && (
            <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-xl shadow-lg z-20 overflow-hidden w-36">
              {Object.entries(datasets).map(([key, val]) => (
                <button
                  key={key}
                  onClick={() => { setView(key); setOpen(false); }}
                  className={`w-full text-left px-4 py-2.5 text-xs font-medium transition-colors hover:bg-[#fef9ec] ${availableKey === key ? "bg-[#fef9ec] text-[#e7b343]" : "text-gray-600"}`}
                >
                  {val.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-2 items-end">
        <div
          className="flex flex-col justify-between text-[10px] text-gray-400 text-right pr-1 flex-shrink-0"
          style={{ height: CHART_HEIGHT }}
        >
          <span>200+</span><span>150</span><span>100</span><span>50</span><span>0</span>
        </div>
        <div
          className={`flex items-end flex-1 ${availableKey === "year" ? "gap-1" : "gap-2"}`}
          style={{ height: CHART_HEIGHT }}
        >
          {data.bars.map((bar) => {
            const fillHeight = Math.round((bar.value / MAX_VALUE) * CHART_HEIGHT);
            const isYear = availableKey === "year";
            return (
              <div key={bar.label} className="flex flex-col items-center gap-1 flex-1">
                <div
                  className="relative w-full rounded-t-2xl overflow-hidden group cursor-pointer"
                  style={{ height: CHART_HEIGHT - 20 }}
                >
                  <div className="absolute inset-0 bg-[#E5E7EB] rounded-t-2xl"/>
                  <div
                    className="absolute bottom-0 left-0 right-0 rounded-t-2xl transition-all duration-500 ease-out group-hover:scale-x-105"
                    style={{ height: `${fillHeight}px`, background: "linear-gradient(to top, #FBBF24, #3B82F6)" }}
                  />
                </div>
                <span className={`text-gray-400 font-medium text-center leading-tight ${isYear ? "text-[8px]" : "text-[10px]"}`}>
                  {bar.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}