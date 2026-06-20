import { useState } from "react";
import VisitDetailsCheckOutModal from "./VisitDetailsCheckOutModal";

export default function ConfirmCheckOutModal({ isOpen, onClose, onConfirm, visit }) {
  const [showDetails, setShowDetails] = useState(false);
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
        onClick={onClose}
      >
        {/* Modal box */}
        <div
          className="bg-white rounded-2xl shadow-xl w-full max-w-xl
                     px-8 py-10 sm:px-14 sm:py-12 flex flex-col gap-6"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Title */}
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 text-center">
            Confirm Check-Out
          </h2>

          {/* Body text */}
          <p className="text-sm sm:text-base text-gray-600 text-center leading-relaxed">
            Are you sure you want to check out?{" "}
            <br className="hidden sm:block" />
            This confirms that your visit at the client's house is complete.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            {/* View Visit Details */}
            <button
              onClick={() => setShowDetails(true)}
              className="flex-1 py-3.5 rounded-xl border border-red-500
                         text-red-500 font-medium text-sm
                         bg-white transition-all duration-200
                         hover:bg-red-50"
            >
              Cancel
            </button>

            {/* Confirm */}
            <button
              onClick={onConfirm}
              className="flex-1 py-3.5 rounded-xl
                         bg-red-600 hover:bg-red-700
                         text-white font-semibold text-sm
                         transition-all duration-200 shadow-sm"
            >
              Yes, Check-Out
            </button>
          </div>
        </div>
      </div>

      <VisitDetailsCheckOutModal
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
        visit={visit}
        onCheckOut={() => { setShowDetails(false); onConfirm(); }}
      />
    </>
  );
}