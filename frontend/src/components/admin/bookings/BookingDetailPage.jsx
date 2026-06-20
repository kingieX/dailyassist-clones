import { useState } from "react";
import { ArrowLeft, ChevronDown, Calendar } from "lucide-react";
import CalendarPicker from "./CalendarPicker";
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

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const timeOptions = [
  "8:00 Am", "9:00 Am", "10:00 Am", "11:00 Am",
  "12:00 Pm", "1:00 Pm", "2:00 Pm", "3:00 Pm",
  "4:00 Pm", "5:00 Pm", "6:00 Pm",
];

const staffOptions = [
  "Sam Smith", "Kate Steve", "Lauren James",
  "Sarah Adeleke", "James Brown", "John Doe",
];

const statusOptions = ["Pending", "Contacted", "Assigned", "Completed", "Cancelled"];

const mockBookingDetails = {
  default: {
    email: "Alansarah1@email.com",
    phone: "01234 XXX XXX",
    address: "1 Church Street, Canvey Island, Essex, Uk.",
    emergencyContact: {
      name: "Sarah",
      phone: "01234 XXX XXX",
      relationship: "Daughter",
    },
    service: {
      name: "Welfare Check-Ins",
      price: "£60",
      frequency: "week",
      visitsPerWeek: "2 visits/week",
      transportMileage: "45p/mile",
    },
    selectedServiceTypes: [
      "Home-Help (cleaning, tidying, laundry)",
      "Light Meal Preparation",
    ],
    selectedAdditional: [],
    preferredDays: ["Monday", "Wednesday"],
    preferredTime: "8:00 Am",
    preferredStartDate: "January 9, 2026",
  },
};

function getBookingDetails(id) {
  return mockBookingDetails[id] ?? mockBookingDetails.default;
}

// ── Info row ──────────────────────────────────────────────────────────────────
function InfoRow({ label, value }) {
  return (
    <div className="flex gap-2 text-sm">
      <span className="text-gray-500 flex-shrink-0 w-32">{label}:</span>
      <span className="text-gray-800 font-medium">{value}</span>
    </div>
  );
}

// ── Section card ──────────────────────────────────────────────────────────────
function SectionCard({ title, children }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm font-bold text-gray-900">{title}</p>
      <div className="rounded-2xl p-5 flex flex-col gap-3 bg-white
                      shadow-md border border-gray-100">
        {children}
      </div>
    </div>
  );
}

// ── Checkbox row ──────────────────────────────────────────────────────────────
function CheckRow({ label, checked }) {
  return (
    <label className="flex items-center gap-3 text-sm text-gray-700 cursor-default">
      <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0
                       ${checked ? "bg-amber-400 border-amber-400" : "border-gray-300 bg-white"}`}>
        {checked && (
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24"
               stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      {label}
    </label>
  );
}

// ── Approve Confirm Modal ─────────────────────────────────────────────────────
function ApproveConfirmModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 px-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-sm px-8 py-8
                   flex flex-col items-center gap-4 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold text-gray-900">Approve Booking Request?</h2>
        <p className="text-sm text-gray-500 leading-relaxed">
          This will confirm the client's booking and add the visit to the Schedule.
        </p>
        <div className="flex gap-3 w-full mt-2">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border font-medium text-sm
                       transition-colors hover:bg-green-50"
            style={{ borderColor: "#22c55e", color: "#22c55e" }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 rounded-xl font-semibold text-sm text-white
                       transition-colors hover:opacity-90"
            style={{ backgroundColor: "#22c55e" }}
          >
            Yes, Approve Booking
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Cancel Confirm Modal ──────────────────────────────────────────────────────
function CancelConfirmModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 px-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-sm px-8 py-8
                   flex flex-col items-center gap-4 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold text-gray-900">Cancel Booking Request?</h2>
        <p className="text-sm text-gray-500 leading-relaxed">
          This will remove the visit from the schedule and notify the client
          of the status.
        </p>
        <div className="flex gap-3 w-full mt-2">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border font-medium text-sm
                       transition-colors hover:bg-red-50"
            style={{ borderColor: "#ef4444", color: "#ef4444" }}
          >
            Go Back
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 rounded-xl font-semibold text-sm text-white
                       transition-colors hover:opacity-90"
            style={{ backgroundColor: "#ef4444" }}
          >
            Yes, Cancel Booking
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function BookingDetailPage({ booking, onBack }) {
  const details = getBookingDetails(booking.id);

  const [status, setStatus]               = useState(
    booking.status.charAt(0).toUpperCase() + booking.status.slice(1)
  );
  const [assignedStaff, setAssignedStaff] = useState("");
  const [pricing, setPricing]             = useState("");
  const [mileageFee, setMileageFee]       = useState("0");
  const [statusOpen, setStatusOpen]       = useState(false);
  const [staffOpen, setStaffOpen]         = useState(false);
  const [timeOpen, setTimeOpen]           = useState(false);
  const [startDate, setStartDate]         = useState(details.preferredStartDate);
  const [calendarOpen, setCalendarOpen]   = useState(false);
  const [showApproveConfirm, setShowApproveConfirm] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm]   = useState(false);
  const [showSuccess, setShowSuccess]     = useState(false);
  const [showCancelSuccess, setShowCancelSuccess]   = useState(false);
  const [approved, setApproved]           = useState(false);

  const handleApproveConfirm = () => {
    setShowApproveConfirm(false);
    setApproved(true);
    setTimeout(() => setShowSuccess(true), 300);
  };

  const handleCancelConfirm = () => {
    setShowCancelConfirm(false);
    setTimeout(() => setShowCancelSuccess(true), 300);
  };

  return (
    <>
      <div className="flex flex-col gap-6 px-4 sm:px-6 py-5 max-w-7xl mx-auto w-full bg-white min-h-screen">

        {/* ── Header ── */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-800 font-bold text-lg
                     hover:text-gray-600 transition-colors w-fit"
        >
          <ArrowLeft className="w-5 h-5" />
          Booking request
        </button>

        {/* ── Two column layout ── */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">

          {/* ── LEFT column ── */}
          <div className="flex flex-col gap-6 flex-1 w-full">

            {/* Client Information */}
            <SectionCard title="Client Information">
              <p className="text-sm font-bold text-gray-900">{booking.clientName}</p>
              <InfoRow label="Email Address" value={details.email} />
              <InfoRow label="Phone Number"  value={details.phone} />
              <InfoRow label="Address"       value={details.address} />
            </SectionCard>

            {/* Emergency Contact — gray */}
            <div className="flex flex-col gap-3">
              <p className="text-sm font-bold text-gray-900">Emergency Contact</p>
              <div className="rounded-2xl p-5 flex flex-col gap-3 bg-gray-100 border border-gray-200">
                <p className="text-sm font-bold text-gray-900">
                  {details.emergencyContact.name}
                </p>
                <InfoRow label="Phone Number" value={details.emergencyContact.phone} />
                <InfoRow label="Relationship" value={details.emergencyContact.relationship} />
              </div>
            </div>

            {/* Service Request */}
            <SectionCard title="Service Request">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-bold text-gray-900">{details.service.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{details.service.visitsPerWeek}</p>
                </div>
                <p className="text-sm font-bold text-gray-800">
                  {details.service.price}
                  <span className="text-gray-500 font-normal">/{details.service.frequency}</span>
                </p>
              </div>

              <hr className="border-gray-100" />

              <div className="flex flex-col gap-2">
                <p className="text-xs font-bold text-gray-800">Service Types</p>
                {serviceTypes.map((type) => (
                  <CheckRow
                    key={type}
                    label={type}
                    checked={details.selectedServiceTypes.includes(type)}
                  />
                ))}
              </div>

              <hr className="border-gray-100" />

              <div className="flex items-center justify-between text-sm text-gray-700">
                <span>Transport Mileage</span>
                <span className="font-semibold text-gray-800">
                  {details.service.transportMileage}
                </span>
              </div>

              <hr className="border-gray-100" />

              <div className="flex flex-col gap-2">
                <p className="text-xs font-bold text-gray-800">Additional Services</p>
                {additionalServices.map((type) => (
                  <CheckRow
                    key={type}
                    label={type}
                    checked={details.selectedAdditional.includes(type)}
                  />
                ))}
              </div>
            </SectionCard>

            {/* Schedule Preferences */}
            <SectionCard title="Schedule Preferences">
              <div className="flex flex-col gap-2">
                <p className="text-xs font-bold text-gray-800">Preferred Days</p>
                <div className="grid grid-cols-3 gap-2">
                  {days.map((day) => (
                    <CheckRow
                      key={day}
                      label={day}
                      checked={details.preferredDays.includes(day)}
                    />
                  ))}
                </div>
              </div>

              <hr className="border-gray-100" />

              <div className="flex flex-col gap-1.5">
                <p className="text-xs font-bold text-gray-800">Preferred Time of Day</p>
                <div className="relative">
                  <button
                    onClick={() => setTimeOpen(!timeOpen)}
                    className="w-full flex items-center justify-between border border-gray-200
                               rounded-xl px-4 py-3 text-sm text-gray-700 bg-white
                               hover:bg-gray-50 transition-colors"
                  >
                    {details.preferredTime}
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform
                                             ${timeOpen ? "rotate-180" : ""}`} />
                  </button>
                  {timeOpen && (
                    <div className="absolute top-12 left-0 z-20 bg-white border border-gray-200
                                    rounded-2xl shadow-lg w-full p-2 flex flex-col gap-1
                                    max-h-48 overflow-y-auto">
                      {timeOptions.map((t) => (
                        <button key={t} onClick={() => setTimeOpen(false)}
                          className="w-full text-left px-4 py-2 text-sm text-gray-600
                                     rounded-xl hover:bg-[#fef9ec] transition-colors">
                          {t}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <hr className="border-gray-100" />

              <div className="flex flex-col gap-1.5">
                <p className="text-xs font-bold text-gray-800">Preferred Start Date</p>
                <div className="relative">
                  <button
                    onClick={() => setCalendarOpen(!calendarOpen)}
                    className="w-full flex items-center justify-between border border-gray-200
                               rounded-xl px-4 py-3 text-sm text-gray-700 bg-white
                               hover:bg-gray-50 transition-colors"
                  >
                    <span>{startDate}</span>
                    <Calendar className="w-4 h-4 text-gray-400" />
                  </button>
                  {calendarOpen && (
                    <div className="absolute top-12 left-0 z-30">
                      <CalendarPicker
                        value={startDate}
                        onChange={(date) => setStartDate(date)}
                        onClose={() => setCalendarOpen(false)}
                      />
                    </div>
                  )}
                </div>
              </div>
            </SectionCard>
          </div>

          {/* ── RIGHT column ── */}
          <div className="w-full lg:w-80 flex-shrink-0 flex flex-col gap-5">
            <p className="text-sm font-bold text-gray-900">Manage Booking</p>

            {/* Status */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Status:</label>
              <div className="relative">
                <button
                  onClick={() => setStatusOpen(!statusOpen)}
                  className="w-full flex items-center justify-between border border-gray-200
                             rounded-xl px-4 py-3 text-sm text-gray-700 bg-gray-100
                             hover:bg-gray-200 transition-colors"
                >
                  {status}
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform
                                           ${statusOpen ? "rotate-180" : ""}`} />
                </button>
                {statusOpen && (
                  <div className="absolute top-12 left-0 z-20 bg-white border border-gray-200
                                  rounded-2xl shadow-lg w-full p-2 flex flex-col gap-1">
                    {statusOptions.map((s) => (
                      <button key={s}
                        onClick={() => { setStatus(s); setStatusOpen(false); }}
                        className={`w-full text-left px-4 py-2.5 text-sm rounded-xl
                                    transition-colors hover:bg-[#fef9ec]
                                    ${status === s
                                      ? "bg-[#fef9ec] text-[#e7b343] font-semibold"
                                      : "text-gray-600"}`}>
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Assign To */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Assign To:</label>
              <div className="relative">
                <button
                  onClick={() => setStaffOpen(!staffOpen)}
                  className="w-full flex items-center justify-between border border-gray-200
                             rounded-xl px-4 py-3 text-sm bg-gray-100
                             hover:bg-gray-200 transition-colors"
                >
                  <span className={assignedStaff ? "text-gray-700" : "text-gray-400"}>
                    {assignedStaff || "Pick a staff"}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform
                                           ${staffOpen ? "rotate-180" : ""}`} />
                </button>
                {staffOpen && (
                  <div className="absolute top-12 left-0 z-20 bg-white border border-gray-200
                                  rounded-2xl shadow-lg w-full p-2 flex flex-col gap-1">
                    {staffOptions.map((s) => (
                      <button key={s}
                        onClick={() => { setAssignedStaff(s); setStaffOpen(false); }}
                        className={`w-full text-left px-4 py-2.5 text-sm rounded-xl
                                    transition-colors hover:bg-[#fef9ec]
                                    ${assignedStaff === s
                                      ? "bg-[#fef9ec] text-[#e7b343] font-semibold"
                                      : "text-gray-600"}`}>
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Pricing Adjustments */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Pricing Adjustments:</label>
              <div className="flex items-center border border-gray-200 rounded-xl
                              overflow-hidden bg-white">
                <span className="px-4 py-3 text-sm text-gray-500">£</span>
                <input type="number" value={pricing}
                  onChange={(e) => setPricing(e.target.value)}
                  className="flex-1 px-4 py-3 text-sm text-gray-700 outline-none bg-white" />
              </div>
            </div>

            {/* Mileage/Extra Fee */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Mileage/Extra Fee:</label>
              <div className="flex items-center border border-gray-200 rounded-xl
                              overflow-hidden bg-white">
                <span className="px-4 py-3 text-sm text-gray-500">£</span>
                <input type="number" value={mileageFee}
                  onChange={(e) => setMileageFee(e.target.value)}
                  className="flex-1 px-4 py-3 text-sm text-gray-700 outline-none bg-white" />
              </div>
            </div>

            {/* Approve button */}
            {approved ? (
              <button disabled
                className="w-full py-4 rounded-xl font-semibold text-base
                           text-gray-400 bg-gray-200 cursor-not-allowed transition-all"
              >
                Approve
              </button>
            ) : (
              <button
                onClick={() => setShowApproveConfirm(true)}
                className="w-full py-4 rounded-xl font-semibold text-base text-white
                           transition-all duration-200 hover:opacity-90"
                style={{ backgroundColor: "#22c55e" }}
              >
                Approve
              </button>
            )}

            {/* Cancel button */}
            <button
              onClick={() => setShowCancelConfirm(true)}
              className="w-full py-4 rounded-xl font-semibold text-base text-white
                         transition-all duration-200 hover:opacity-90"
              style={{ backgroundColor: "#ef4444" }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      {/* ── Approve Confirm Modal ── */}
      <ApproveConfirmModal
        isOpen={showApproveConfirm}
        onClose={() => setShowApproveConfirm(false)}
        onConfirm={handleApproveConfirm}
      />

      {/* ── Cancel Confirm Modal ── */}
      <CancelConfirmModal
        isOpen={showCancelConfirm}
        onClose={() => setShowCancelConfirm(false)}
        onConfirm={handleCancelConfirm}
      />

      {/* ── Approve Success Modal ── */}
      <CheckInSuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        buttonText="Back to Bookings"
      />

      {/* ── Cancel Success Modal ── */}
      <CheckInSuccessModal
        isOpen={showCancelSuccess}
        onClose={() => {
          setShowCancelSuccess(false);
          onBack();
        }}
        buttonText="Back to Bookings"
      />
    </>
  );
}