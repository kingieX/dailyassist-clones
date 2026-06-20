import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const DAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export default function CalendarPicker({ value, onChange, onClose }) {
  const parseDate = (str) => {
    if (!str) return new Date();
    const d = new Date(str);
    return isNaN(d) ? new Date() : d;
  };

  const initial = parseDate(value);
  const [viewYear, setViewYear]   = useState(initial.getFullYear());
  const [viewMonth, setViewMonth] = useState(initial.getMonth());
  const [selected, setSelected]   = useState(initial);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };

  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  // Build calendar grid
  const firstDay = new Date(viewYear, viewMonth, 1);
  // Monday-based: 0=Mon ... 6=Sun
  let startOffset = firstDay.getDay() - 1;
  if (startOffset < 0) startOffset = 6;

  const daysInMonth  = new Date(viewYear, viewMonth + 1, 0).getDate();
  const daysInPrev   = new Date(viewYear, viewMonth, 0).getDate();

  const cells = [];
  // Prev month trailing days
  for (let i = startOffset - 1; i >= 0; i--) {
    cells.push({ day: daysInPrev - i, month: "prev" });
  }
  // Current month
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, month: "current" });
  }
  // Next month leading days
  const remaining = 42 - cells.length;
  for (let d = 1; d <= remaining; d++) {
    cells.push({ day: d, month: "next" });
  }

  const isSelected = (cell) => {
    if (cell.month !== "current") return false;
    return (
      selected.getDate() === cell.day &&
      selected.getMonth() === viewMonth &&
      selected.getFullYear() === viewYear
    );
  };

  const handleSelect = (cell) => {
    if (cell.month !== "current") return;
    const d = new Date(viewYear, viewMonth, cell.day);
    setSelected(d);
    const label = `${MONTHS[viewMonth]} ${cell.day}, ${viewYear}`;
    onChange(label);
    onClose();
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 w-72">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold text-gray-800">
          {MONTHS[viewMonth]} {viewYear}
          <ChevronRight className="w-3 h-3 inline ml-1 text-gray-400" />
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={prevMonth}
            className="w-7 h-7 flex items-center justify-center rounded-lg
                       hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-gray-500" />
          </button>
          <button
            onClick={nextMonth}
            className="w-7 h-7 flex items-center justify-center rounded-lg
                       hover:bg-gray-100 transition-colors"
          >
            <ChevronRight className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-2">
        {DAYS.map((d) => (
          <div key={d} className="text-center text-xs font-semibold text-gray-400 py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Calendar cells */}
      <div className="grid grid-cols-7 gap-y-1">
        {cells.map((cell, i) => {
          const sel     = isSelected(cell);
          const isCurr  = cell.month === "current";
          const isToday =
            isCurr &&
            cell.day === new Date().getDate() &&
            viewMonth === new Date().getMonth() &&
            viewYear  === new Date().getFullYear();

          return (
            <button
              key={i}
              onClick={() => handleSelect(cell)}
              disabled={!isCurr}
              className={`
                w-8 h-8 mx-auto rounded-full text-xs font-medium
                flex items-center justify-center transition-colors
                ${sel
                  ? "bg-[#f5c045] text-gray-900 font-bold"
                  : isToday && isCurr
                    ? "border border-[#f5c045] text-[#c8860a]"
                    : isCurr
                      ? "text-gray-700 hover:bg-[#fef9ec]"
                      : "text-gray-300 cursor-default"
                }
              `}
            >
              {cell.day}
            </button>
          );
        })}
      </div>
    </div>
  );
}