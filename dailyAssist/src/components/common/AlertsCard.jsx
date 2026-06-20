import { useState } from "react";
import { BellIcon } from "@heroicons/react/24/solid"; // solid for filled blue look

export default function AlertsCard({ alerts = [] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm
                    px-5 py-4 w-full sm:min-w-[260px] sm:max-w-[340px]">

      {/* Header — clicking this toggles the dropdown */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 w-full text-left"
      >
        <BellIcon className="w-4 h-4 text-blue-500 flex-shrink-0" />
        <span className="text-sm font-semibold text-gray-700 flex-1">
          Alerts &amp; Reminders
        </span>
        {/* Small arrow indicator */}
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform duration-200
                      ${isOpen ? "rotate-180" : "rotate-0"}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round"
                strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown body — only visible when isOpen is true */}
      {isOpen && (
        <div className="mt-3 bg-gray-50 rounded-xl px-4 py-3">
          {alerts.length === 0 ? (
            <p className="text-sm text-gray-400">No new alerts</p>
          ) : (
            <ul className="flex flex-col gap-2">
              {alerts.map((a, i) => (
                <li key={i}
                    className="text-sm text-gray-600 border-b border-gray-100
                               pb-1 last:border-0">
                  {a}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}