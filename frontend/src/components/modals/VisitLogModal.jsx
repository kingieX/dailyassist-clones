
import { useState } from "react";
import { Clock } from "lucide-react";
import CheckInSuccessModal from "./CheckInSuccessModal";
 
const visitTypes = [
  "Home-Help (cleaning, tidying, laundry)",
  "Errands & Shopping Support",
  "Welfare Check-Ins & Companionship",
  "Appointment Escort/Transport",
  "Light Gardening & Practical Tasks",
  "Community Access Support",
  "Light Meal Preparation",
];
 
function FormField({ label, value }) {
  return (
    <div className="flex flex-row rounded-xl overflow-hidden border border-[#e7b343]">
      <div className="bg-[#e7b343] text-gray-900 font-semibold text-sm
                      px-4 py-3 w-32 sm:w-36 flex-shrink-0 flex items-center">
        {label}
      </div>
      <div className="bg-gray-50 text-gray-800 text-sm px-4 py-3 flex-1 flex items-center">
        {value}
      </div>
    </div>
  );
}
 
function TimeField({ label, value }) {
  return (
    <div className="flex flex-col rounded-xl overflow-hidden border border-[#e7b343] flex-1">
      <div className="bg-[#e7b343] text-gray-900 font-semibold text-sm
                      px-4 py-3 flex items-center justify-between gap-2">
        <span>{label}</span>
        <Clock className="w-4 h-4" />
      </div>
      <div className="bg-gray-50 text-gray-800 text-sm px-4 py-3 flex items-center">
        {value}
      </div>
    </div>
  );
}
 
export default function VisitLogModal({ isOpen, onClose, onSubmit, visit, worker, isCompleted }) {
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [otherService, setOtherService] = useState("");
  const [miles, setMiles] = useState("");
  const [notes, setNotes] = useState("");
  const [signature, setSignature] = useState("");
  const [confirmed, setConfirmed] = useState(false);
 
  if (!isOpen) return null;
 
  const today = new Date().toLocaleDateString("en-GB", {
    year: "numeric", month: "long", day: "numeric",
  });
 
  const toggleType = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };
 
  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-start justify-center
                   bg-black/40 px-2 sm:px-4 py-4 sm:py-6 overflow-y-auto"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl mx-auto flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative px-5 sm:px-6 pt-6 pb-4 text-left border-b border-gray-100">
            <h2 className="text-base sm:text-xl font-bold text-gray-900 pr-8">
              Daily Assist UK - Visit Log Sheet
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Staff visit record for service delivery and compliance.
            </p>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700
                         transition-colors text-xl font-bold leading-none"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
 
          {/* Body */}
          <div className="px-4 sm:px-10 py-5 flex flex-col gap-3 sm:gap-4">
            <FormField label="Client Name"  value={visit?.clientName} />
            <FormField label="Address"      value={visit?.address} />
            <FormField label="Date"         value={today} />
            <FormField label="Staff Member" value={worker?.name ?? "Lauren James"} />
 
            {/* Time row — side by side always */}
            <div className="flex flex-row gap-3">
              <TimeField label="Time In"  value={`Checked in at ${visit?.timeStart ?? "1:05pm"}`} />
              <TimeField label="Time Out" value={`Checked out at ${visit?.timeEnd  ?? "2:05pm"}`} />
            </div>
 
            {/* Visit Type */}
            <div className="flex flex-col gap-2 pt-1">
              <h3 className="text-base font-bold text-gray-900">Visit Type</h3>
              <p className="text-xs sm:text-sm text-gray-500">
                Select all services provided during this visit (optional)
              </p>
              <div className="flex flex-col gap-2 mt-1">
                {visitTypes.map((type) => (
                  <label key={type} className="flex items-center gap-3 text-sm text-gray-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedTypes.includes(type)}
                      onChange={() => toggleType(type)}
                      className="w-4 h-4 rounded border-gray-300 accent-[#e7b343]"
                    />
                    {type}
                  </label>
                ))}
              </div>
              <div className="mt-2">
                <p className="text-sm font-semibold text-gray-700 mb-1">Others:</p>
                <input
                  type="text"
                  value={otherService}
                  onChange={(e) => setOtherService(e.target.value)}
                  placeholder="Add other services..."
                  className="w-full bg-gray-100 rounded-xl px-4 py-3 text-sm
                             text-gray-700 outline-none focus:ring-2
                             focus:ring-[#e7b343]/50 border border-transparent"
                />
              </div>
            </div>
 
            {/* Miles Covered */}
            <div className="flex flex-col gap-1">
              <h3 className="text-base font-bold text-gray-900">Miles Covered</h3>
              <input
                type="number"
                value={miles}
                onChange={(e) => setMiles(e.target.value)}
                placeholder="Enter the miles covered"
                className="w-full bg-gray-100 rounded-xl px-4 py-3 text-sm
                           text-gray-700 outline-none focus:ring-2
                           focus:ring-[#e7b343]/50 border border-transparent"
              />
              <p className="text-xs text-gray-400">
                Only to be filled when your service involves driving a client
              </p>
            </div>
 
            <hr className="border-gray-200" />
 
            {/* Notes */}
            <div className="flex flex-col gap-2">
              <h3 className="text-base font-bold text-gray-900">
                Fill in the gaps <span className="text-red-500">*</span>
              </h3>
              <label className="text-sm font-semibold text-gray-700">
                Notes <span className="text-red-500">*</span>
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={5}
                placeholder="Any concerns or observations?"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl
                           px-4 py-3 text-sm text-gray-700 outline-none
                           focus:ring-2 focus:ring-[#e7b343]/50 resize-none"
              />
              <p className="text-xs text-gray-400">
                Record key activities, client mood, concerns, or incidents
              </p>
            </div>
 
            {/* Staff Signature */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-800">
                Staff Signature <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={signature}
                onChange={(e) => setSignature(e.target.value)}
                placeholder="Staff signature goes here..."
                className="w-full bg-gray-50 border border-gray-200 rounded-xl
                           px-4 py-4 text-sm text-gray-700 italic
                           outline-none focus:ring-2 focus:ring-[#e7b343]/50"
              />
              <p className="text-xs text-gray-400">Staff confirms accuracy of report.</p>
            </div>
 
            {/* Confirmation checkbox */}
            <label className="flex items-start gap-3 text-sm font-medium text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded accent-[#e7b343] flex-shrink-0"
              />
              I confirm that these notes accurately reflect today's visit and services rendered
            </label>
          </div>
 
          {/* Footer */}
          <div className="px-4 sm:px-10 pb-6 pt-2">
            <button
              onClick={confirmed ? () => setShowSuccess(true) : undefined}
              disabled={!confirmed}
              className={`w-full font-semibold text-base py-4 rounded-2xl
                          transition-all duration-200
                          ${confirmed
                            ? "bg-[#f7cd6a] hover:bg-[#e8b030] text-gray-900 shadow-sm cursor-pointer"
                            : "bg-[#f7cd6a]/30 text-gray-400 cursor-not-allowed"
                          }`}
            >
              Submit your report
            </button>
          </div>
        </div>
      </div>
 
      <CheckInSuccessModal
        isOpen={showSuccess}
        onClose={() => {
          setShowSuccess(false);
          if (onSubmit) onSubmit();
          else onClose();
        }}
      />
    </>
  );
}