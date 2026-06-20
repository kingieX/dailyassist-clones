import { X } from "lucide-react";

const statusStyles = {
  late:          { bg: "bg-[#F7C9C2]", text: "text-[#9B4B43]",  label: "Late"        },
  "not-started": { bg: "bg-[#ECECEC]", text: "text-[#6B7280]",  label: "Not Started" },
  completed:     { bg: "bg-[#D8EFD9]", text: "text-[#5B9B67]",  label: "Completed"   },
  "in-progress": { bg: "bg-amber-100", text: "text-amber-600",   label: "In Progress" },
};

export default function VisitDetailsModal({ isOpen, onClose, task, staffName }) {
  if (!isOpen || !task) return null;

  const s = statusStyles[task.status] ?? statusStyles["not-started"];

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center
                 bg-black/25 backdrop-blur-sm px-4 py-6"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-6 sm:p-8
                   flex flex-col gap-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header: name + status + close ── */}
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            {task.client}
          </h2>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className={`${s.bg} ${s.text} text-sm font-medium px-4 py-1.5
                              rounded-lg whitespace-nowrap`}>
              {s.label}
            </span>
            <button
              onClick={onClose}
              className="w-7 h-7 flex items-center justify-center rounded-full
                         hover:bg-gray-100 transition-colors"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* ── Divider ── */}
        <hr className="border-gray-200" />

        {/* ── Details ── */}
        <div className="flex flex-col gap-3">
          <div className="flex items-start gap-2 text-sm sm:text-base">
            <span className="font-bold text-gray-900 w-36 flex-shrink-0">Address:</span>
            <span className="text-gray-600">{task.address ?? "1 Church Street, Canvey Island, Essex"}</span>
          </div>
          <div className="flex items-center gap-2 text-sm sm:text-base">
            <span className="font-bold text-gray-900 w-36 flex-shrink-0">Service type:</span>
            <span className="text-gray-600">{task.serviceType ?? "Meal Prep"}</span>
          </div>
          <div className="flex items-center gap-2 text-sm sm:text-base">
            <span className="font-bold text-gray-900 w-36 flex-shrink-0">Scheduled time:</span>
            <span className="text-gray-600">{task.time ?? "1:00pm - 2:00pm"}</span>
          </div>
          <div className="flex items-center gap-2 text-sm sm:text-base">
            <span className="font-bold text-gray-900 w-36 flex-shrink-0">Assigned to:</span>
            <span className="text-gray-600">{staffName ?? "Sam Smith"}</span>
          </div>
        </div>

        {/* ── Divider ── */}
        <hr className="border-gray-200" />

        {/* ── Special Notes ── */}
        <div className="flex flex-col gap-3">
          <p className="font-bold text-gray-900 text-sm sm:text-base">Special Notes</p>
          <div className="bg-gray-50 border border-gray-200 rounded-2xl px-4 py-4
                          text-sm text-gray-600 leading-relaxed">
            {task.notes ?? "This service should only be started when you are physically present with the client and ready to provide support. Also make sure you record key activities, client mood, concerns, or incidents."}
          </div>
        </div>
      </div>
    </div>
  );
}