import { MapPinIcon } from "@heroicons/react/24/outline";

export default function VisitDetailsCheckOutModal({ isOpen, onClose, visit, onCheckOut }) {
  if (!isOpen) return null;

  const today = new Date().toLocaleDateString("en-GB", {
    day: "numeric", month: "short", year: "numeric",
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center
                 bg-black/40 px-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-2xl
                   mx-auto flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <div className="flex justify-end px-6 pt-5">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 transition-colors
                       text-xl font-bold leading-none"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="px-6 sm:px-10 pb-8 flex flex-col gap-6">

          {/* Name + status — In Progress */}
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {visit?.clientName}
            </h2>
            <span className="text-xs font-semibold bg-[#f5c045] text-gray-900
                             px-4 py-2 rounded-xl whitespace-nowrap flex-shrink-0 mt-1">
              In Progress
            </span>
          </div>

          {/* Divider */}
          <hr className="border-gray-200" />

          {/* Details */}
          <div className="flex flex-col gap-3">
            <div className="flex items-start gap-2 text-sm sm:text-base">
              <span className="font-bold text-gray-900 w-28 flex-shrink-0">Address:</span>
              <span className="text-gray-600">{visit?.address}</span>
            </div>
            <div className="flex items-center gap-2 text-sm sm:text-base">
              <span className="font-bold text-gray-900 w-28 flex-shrink-0">Service type:</span>
              <span className="text-gray-600">{visit?.task}</span>
            </div>
            <div className="flex items-center gap-2 text-sm sm:text-base">
              <span className="font-bold text-gray-900 w-28 flex-shrink-0">Date:</span>
              <span className="text-gray-600">{today}</span>
            </div>
            <div className="flex items-center gap-2 text-sm sm:text-base">
              <span className="font-bold text-gray-900 w-28 flex-shrink-0">Start time:</span>
              <span className="text-gray-600">{visit?.timeStart}</span>
            </div>
            <div className="flex items-center gap-2 text-sm sm:text-base">
              <span className="font-bold text-gray-900 w-28 flex-shrink-0">End time:</span>
              <span className="text-gray-600">{visit?.timeEnd}</span>
            </div>
          </div>

          {/* Divider */}
          <hr className="border-gray-200" />

          {/* Additional Note */}
          <div className="flex flex-col gap-3">
            <p className="font-bold text-gray-900 text-sm sm:text-base">
              Additional Note
            </p>
            <div className="bg-gray-100 rounded-xl px-4 py-4 text-sm text-gray-500
                            leading-relaxed">
              This service should only be checked out when you have completed
              all tasks with the client. Make sure to fill in your visit log
              sheet before leaving the client's home.
            </div>
          </div>

          {/* Check-Out button — red */}
          <button
            onClick={onCheckOut}
            className="w-full bg-red-600 hover:bg-red-700 text-white
                       font-semibold text-base py-4 rounded-2xl
                       flex items-center justify-center gap-2
                       transition-all duration-200 shadow-sm"
          >
            <MapPinIcon className="w-5 h-5" />
            Tap to Check-Out
          </button>

          {/* Helper text */}
          <p className="text-center text-xs text-gray-400 -mt-4">
            Tap when you are done with your task at the client's home.
          </p>
        </div>
      </div>
    </div>
  );
}