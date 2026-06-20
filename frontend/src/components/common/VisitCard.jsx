import { useState } from "react";
import ConfirmCheckInModal from "../modals/ConfirmCheckInModal";
import CheckInSuccessModal from "../modals/CheckInSuccessModal";
import ConfirmCheckOutModal from "../modals/ConfirmCheckOutModal";
import VisitLogModal from "../modals/VisitLogModal";
import VisitDetailsModal from "../modals/VisitDetailsModal";

function StatusBadge({ status }) {
  if (status === "in-progress") {
    return (
      <span className="bg-[#f5c045] text-gray-900 text-xs font-semibold
                       px-3 py-1.5 rounded-lg whitespace-nowrap">
        In Progress
      </span>
    );
  }
  if (status === "completed") {
    return (
      <span className="flex items-center gap-1.5 bg-green-500 text-white
                       text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap">
        ✓ Completed
      </span>
    );
  }
  return (
    <span className="bg-gray-100 text-gray-500 text-xs font-semibold
                     px-3 py-1.5 rounded-lg whitespace-nowrap">
      Not Started
    </span>
  );
}

const VisitCard = ({ visit, checkedIn, onCheckInSuccess, onNavigateToVisits }) => {
  const [status, setStatus] = useState(visit.status ?? "not-started");
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showCheckOut, setShowCheckOut] = useState(false);
  const [showLog, setShowLog] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

const handleCheckOut = () => {
  setShowCheckOut(false);
  setShowLog(true);
};

  const handleConfirm = () => {
  setShowConfirm(false);
  setShowSuccess(true);
  setStatus("in-progress");
};

 const handleSuccessClose = () => {
  setShowSuccess(false);
  onCheckInSuccess();
};

const handleLogSubmit = () => {
  setShowLog(false);
  setStatus("completed");
  if (onNavigateToVisits) onNavigateToVisits();
};

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      {/* Header row */}
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">{visit.clientName}</h3>
       <StatusBadge status={status} />
      </div>

      {/* Details */}
      <div className="space-y-2 mb-5">
        {/* Address */}
       <div className="flex items-start gap-2 font-semibold text-sm sm:text-lg text-gray-900">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-7 mt-0.5 shrink-0 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
          <span>{visit.address}</span>
        </div>

        {/* Task */}
       <div className="flex items-center gap-2 font-semibold text-sm sm:text-lg text-gray-800">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-7 shrink-0 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
          </svg>
          <span>{visit.task}</span>
        </div>

        {/* Time */}
        <div className="flex items-center font-semibold gap-2 text-sm sm:text-lg text-gray-800">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-7 shrink-0 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{visit.timeStart} - {visit.timeEnd}</span>
        </div>
      </div>

      {/* View Visit Details button — full width on mobile, right aligned on desktop */}
    <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowDetails(true)}
          className="view-details-btn w-full sm:w-auto text-sm font-medium
                     text-gray-700 border border-amber-400 px-5 py-3
                     rounded-xl transition-all duration-300 ease-in-out
                     hover:shadow-[0_0_14px_rgba(245,192,69,0.55)]
                     hover:scale-105 hover:border-amber-500">
          View Visit Details
        </button>
      </div>

      {/* Check-In Button */}
     <button
  onClick={() => checkedIn ? setShowCheckOut(true) : setShowConfirm(true)}
  className={`w-full font-semibold text-base py-4 rounded-2xl flex items-center justify-center gap-2 transition-colors duration-200
    ${checkedIn
      ? "bg-red-600 hover:bg-red-700 text-white"
      : "bg-[#f5c045] hover:bg-amber-500 text-gray-900"
    }`}>
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
  {checkedIn ? "Tap to Check-Out" : "Tap to Check-In"}
</button>

{/* Confirm Check-In Modal */}
<ConfirmCheckInModal
  isOpen={showConfirm}
  onClose={() => setShowConfirm(false)}
  onConfirm={handleConfirm}
/>

<CheckInSuccessModal
  isOpen={showSuccess}
  onClose={handleSuccessClose}
/>

<ConfirmCheckOutModal
  isOpen={showCheckOut}
  onClose={() => setShowCheckOut(false)}
  onConfirm={handleCheckOut}
  visit={visit}
/>

<VisitLogModal
  isOpen={showLog}
  onClose={() => setShowLog(false)}
  onSubmit={handleLogSubmit}
  visit={visit}
  worker={{ name: "Lauren James" }}
/>

<VisitDetailsModal
  isOpen={showDetails}
  onClose={() => setShowDetails(false)}
  visit={visit}
  onCheckIn={() => {
    setShowDetails(false);
    setShowConfirm(true);
  }}
/>
      {/* Helper text */}
      <p className="text-center text-sm text-gray-400 mt-2">
        Tap when you arrive at a client's home to check in.
      </p>
    </div>
  );
};

export default VisitCard;