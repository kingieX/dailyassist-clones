import { useState } from "react";
import { X, Plus, Calendar, ChevronDown } from "lucide-react";
import CheckInSuccessModal from "../../modals/CheckInSuccessModal";

const serviceTypes = [
  "Home-Help (cleaning, tidying, laundry)",
  "Errands & Shopping Support",
  "Welfare Check-Ins & Companionship",
  "Appointment Escort/Transport",
  "Light Gardening & Practical Tasks",
  "Community Access Support",
  "Light Meal Preparation",
];

const additionalServices = [
  "One-off Deep Clean",
  "End of Tenancy Cleaning",
  "Building Construction Cleaning",
];

const timeOptions = [
  "8:00 Am","9:00 Am","10:00 Am","11:00 Am",
  "12:00 Pm","1:00 Pm","2:00 Pm","3:00 Pm",
  "4:00 Pm","5:00 Pm","6:00 Pm","7:00 Pm",
];

const staffOptions = [
  "Sam Smith","Kate Steve","Lauren James",
  "Sarah Adeleke","James Brown","John Doe",
];

const packageOptions = [
  "Basic Package","Standard Package","Premium Package",
];

const titleOptions = ["Mr.","Mrs.","Ms.","Dr.","Prof."];

// ─── Trigger Button ───────────────────────────────────────────────────────────
// Drop this wherever you want the "Assign Visit" button to appear.
// Example usage:
//   <AssignVisitButton onClick={() => setReassignOpen(true)} />
export function AssignVisitButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-center gap-2 py-4 rounded-xl
                 font-semibold text-base text-white transition-all duration-200
                 hover:opacity-90 active:scale-[0.98]"
      style={{ backgroundColor: "#669369" }}
    >
      <Calendar className="w-5 h-5" />
      Assign Visit
    </button>
  );
}

// ─── Main Modal ───────────────────────────────────────────────────────────────
export default function ReassignVisitModal({
  isOpen,
  onClose,
  prefillData = {},
}) {
  const [title, setTitle]           = useState("Mrs.");
  const [clientName, setClientName] = useState(prefillData.clientName ?? "");
  const [address, setAddress]       = useState(prefillData.address ?? "");
  const [date, setDate]             = useState("January 9, 2026");
  const [startTime, setStartTime]   = useState("8:00 Am");
  const [endTime, setEndTime]       = useState("9:00 Am");
  const [staff, setStaff]           = useState("Sam Smith");
  const [pkg, setPkg]               = useState("Standard Package");
  const [selectedServices, setSelectedServices]     = useState([]);
  const [selectedAdditional, setSelectedAdditional] = useState([]);
  const [note, setNote]             = useState(
    "Provided home-help support during the scheduled visit, including light cleaning and general assistance. Client was calm and in good spirits throughout the visit. No concerns observed, and the home environment was safe and tidy. No follow-up actions required at this time."
  );
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!isOpen) return null;

  const toggleService = (type, list, setList) => {
    setList((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleSubmit = () => {
    setShowConfirm(false);
    setShowSuccess(true);
  };

  const GREEN = "#669369";

  return (
    <>
      {/* ── Main modal ── */}
      <div
        className="fixed inset-0 z-50 flex items-start justify-center
                   bg-black/40 px-3 sm:px-6 py-4 sm:py-6 overflow-y-auto"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl mx-auto flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 sm:px-8 pt-6 pb-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <Plus className="w-6 h-6 text-gray-800" />
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Reassign visit
              </h2>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Body */}
          <div className="px-6 sm:px-8 py-6 flex flex-col gap-5">

            {/* Title + Client Name */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-end gap-2">
                <label className="text-sm font-medium text-gray-700 w-20 flex-shrink-0">Title</label>
                <label className="text-sm font-medium text-gray-700 flex-1">
                  Client's Name <span className="text-red-500">*</span>
                </label>
              </div>
              <div className="flex gap-2">
                <select
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-20 border border-gray-200 rounded-xl px-3 py-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-green-200 bg-white flex-shrink-0"
                >
                  {titleOptions.map((t) => <option key={t}>{t}</option>)}
                </select>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Alan Sarah"
                  className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-green-200"
                />
              </div>
            </div>

            {/* Address */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">
                Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="1 Church Street, Canvey Island, Essex"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-green-200"
              />
            </div>

            {/* Date + Start Time + End Time */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">Date</label>
                <div className="relative">
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-green-200 pr-10"
                  />
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">Start Time</label>
                <div className="relative">
                  <select
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none appearance-none focus:ring-2 focus:ring-green-200 bg-white"
                  >
                    {timeOptions.map((t) => <option key={t}>{t}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">End Time</label>
                <div className="relative">
                  <select
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none appearance-none focus:ring-2 focus:ring-green-200 bg-white"
                  >
                    {timeOptions.map((t) => <option key={t}>{t}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Staff + Package */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">
                  Assign Staff <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={staff}
                    onChange={(e) => setStaff(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none appearance-none focus:ring-2 focus:ring-green-200 bg-white"
                  >
                    {staffOptions.map((s) => <option key={s}>{s}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">
                  Package <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={pkg}
                    onChange={(e) => setPkg(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none appearance-none focus:ring-2 focus:ring-green-200 bg-white"
                  >
                    {packageOptions.map((p) => <option key={p}>{p}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Service Types */}
            <div className="flex flex-col gap-2">
              <p className="text-sm font-bold text-gray-900">Service Types</p>
              <p className="text-xs text-gray-500">Select any services you might need</p>
              <div className="flex flex-col gap-2 mt-1">
                {serviceTypes.map((type) => (
                  <label key={type} className="flex items-center gap-3 text-sm text-gray-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedServices.includes(type)}
                      onChange={() => toggleService(type, selectedServices, setSelectedServices)}
                      className="w-4 h-4 rounded border-gray-300 accent-[#e7b343]"
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>

            {/* Additional Services */}
            <div className="flex flex-col gap-2">
              <p className="text-sm font-bold text-gray-900">Additional Services</p>
              <p className="text-xs text-gray-500">Select any additional services you might need (optional)</p>
              <div className="flex flex-col gap-2 mt-1">
                {additionalServices.map((type) => (
                  <label key={type} className="flex items-center gap-3 text-sm text-gray-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedAdditional.includes(type)}
                      onChange={() => toggleService(type, selectedAdditional, setSelectedAdditional)}
                      className="w-4 h-4 rounded border-gray-300 accent-[#e7b343]"
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>

            {/* Additional Note */}
            <div className="flex flex-col gap-2">
              <p className="text-sm font-bold text-gray-900">Additional Note</p>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={4}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-600 outline-none focus:ring-2 focus:ring-green-200 resize-none"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 sm:px-8 pb-6 pt-2">
            <button
              onClick={() => setShowConfirm(true)}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-xl
                         font-semibold text-base text-white transition-all duration-200
                         hover:opacity-90 active:scale-[0.98]"
              style={{ backgroundColor: GREEN }}
            >
              <Calendar className="w-5 h-5" />
              Assign Visit
            </button>
          </div>
        </div>
      </div>

      {/* ── Confirm modal (matches image 1) ── */}
      {showConfirm && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 px-4"
          onClick={() => setShowConfirm(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-sm px-8 py-8
                       flex flex-col items-center gap-4 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold text-gray-900">Reassign this visit?</h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              This will remove the current staff and assign a new one.
              The current visit will be updated and both staffs will be notified.
            </p>
            <div className="flex gap-3 w-full mt-2">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 py-3 rounded-xl border font-medium text-sm transition-colors hover:bg-green-50"
                style={{ borderColor: GREEN, color: GREEN }}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 py-3 rounded-xl font-semibold text-sm text-white transition-colors hover:opacity-90"
                style={{ backgroundColor: GREEN }}
              >
                Yes, Reassign Visit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Success modal ── */}
      <CheckInSuccessModal
        isOpen={showSuccess}
        onClose={() => {
          setShowSuccess(false);
          onClose();
        }}
      />
    </>
  );
}