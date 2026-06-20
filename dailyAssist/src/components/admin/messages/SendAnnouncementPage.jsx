import { useState } from "react";
import { ArrowLeft, ChevronDown, Megaphone, Gift, X } from "lucide-react";
import CheckInSuccessModal from "../../modals/CheckInSuccessModal";

const AMBER = "#f5c045";
const BLUE = "#5b8db8";

const senderOptions = [
  "Daily Assist Uk Office",
  "Operation Manager",
  "HR Department",
  "System",
];

const sendToOptions = ["All Staff", "Select Staff", "By Zone", "Car Owner"];

// ── Toggle Switch ─────────────────────────────────────────────────────────────
function Toggle({ enabled, onChange }) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative w-11 h-6 rounded-full transition-colors duration-300 flex-shrink-0
                  ${enabled ? "bg-amber-400" : "bg-gray-300"}`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow
                    transition-transform duration-300
                    ${enabled ? "translate-x-5" : "translate-x-0"}`}
      />
    </button>
  );
}

// ── Message Text Renderer ─────────────────────────────────────────────────────
function MessageText({ text }) {
  if (!text) return null;
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return (
    <span className="leading-relaxed whitespace-pre-line text-sm text-gray-600">
      {parts.map((part, i) =>
        i % 2 === 1
          ? <strong key={i}>{part}</strong>
          : <span key={i}>{part}</span>
      )}
    </span>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function SendAnnouncementPage({ onBack }) {
  const [title, setTitle]             = useState("Friday Rota Update");
  const [sender, setSender]           = useState("Daily Assist Uk Office");
  const [senderOpen, setSenderOpen]   = useState(false);
  const [sendTo, setSendTo]           = useState("All Staff");
  const [message, setMessage]         = useState(
    "Hello Lauren,\n\nYour Friday work rota has been updated.\n\nPlease review your assigned visits for today to confirm:\n• Visit times\n• Client addresses\n• Special notes\n\nIf you have any questions or notice an issue, contact the office before your first visit."
  );
  const [acknowledge, setAcknowledge]     = useState(true);
  const [acknowledged, setAcknowledged]   = useState(false);
  const [visitSummary, setVisitSummary]   = useState(false);
  const [visitCount, setVisitCount]       = useState(3);
  const [firstVisitTime, setFirstVisitTime] = useState("8:00 Am");
  const [lastVisitTime, setLastVisitTime]   = useState("5:00 Pm");
  const [showConfirm, setShowConfirm]     = useState(false);
  const [showSuccess, setShowSuccess]     = useState(false);

  const timeOptions = [
    "6:00 Am","6:30 Am","7:00 Am","7:30 Am","8:00 Am","8:30 Am",
    "9:00 Am","9:30 Am","10:00 Am","10:30 Am","11:00 Am","11:30 Am",
    "12:00 Pm","12:30 Pm","1:00 Pm","1:30 Pm","2:00 Pm","2:30 Pm",
    "3:00 Pm","3:30 Pm","4:00 Pm","4:30 Pm","5:00 Pm","5:30 Pm",
    "6:00 Pm","6:30 Pm","7:00 Pm","7:30 Pm","8:00 Pm",
  ];

  const now = new Date();
  const sentTime = now.toLocaleString("en-GB", {
    weekday: "long", hour: "2-digit", minute: "2-digit",
  });

  return (
    <div className="flex flex-col gap-0 px-4 sm:px-6 py-6 max-w-7xl mx-auto w-full">

      {/* Page wrapper card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 flex flex-col gap-6">

        {/* Header */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="hover:opacity-70 transition-opacity"
            >
              <ArrowLeft className="w-5 h-5 text-gray-800" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Send Announcement</h1>
          </div>
          <p className="text-sm text-gray-400 ml-8">
            Create and send a message to staff members regarding rota updates, service notices or urgent alerts.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-8">

          {/* ── Left: Form ── */}
          <div className="flex flex-col gap-5 flex-1">

            {/* Announcement Title */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-800">Announcement Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter announcement title..."
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm
                           text-gray-700 outline-none focus:ring-2 focus:ring-amber-200
                           placeholder-gray-400"
              />
            </div>

            {/* Sender */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-800">Sender</label>
              <div className="relative">
                <button
                  onClick={() => setSenderOpen(!senderOpen)}
                  className="w-full flex items-center justify-between border border-gray-200
                             rounded-xl px-4 py-3 text-sm hover:bg-gray-50 transition-colors"
                >
                  <span className={sender ? "text-gray-700" : "text-gray-400"}>
                    {sender || "Select sender"}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${senderOpen ? "rotate-180" : ""}`} />
                </button>
                {senderOpen && (
                  <div className="absolute top-12 left-0 z-20 bg-white border border-gray-200
                                  rounded-2xl shadow-lg w-full p-2 flex flex-col gap-1">
                    {senderOptions.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => { setSender(opt); setSenderOpen(false); }}
                        className={`w-full text-left px-4 py-2.5 text-sm rounded-xl transition-colors
                                    hover:bg-[#fef9ec]
                                    ${sender === opt ? "text-[#e7b343] font-semibold" : "text-gray-700"}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Send To */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-800">Send To</label>
              <div className="flex flex-wrap items-center gap-4">
                {sendToOptions.map((opt) => (
                  <label key={opt} className="flex items-center gap-2 cursor-pointer">
                    <div
                      onClick={() => setSendTo(opt)}
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                                  transition-colors cursor-pointer flex-shrink-0
                                  ${sendTo === opt ? "border-amber-400" : "border-gray-300"}`}
                    >
                      {sendTo === opt && (
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                      )}
                    </div>
                    <span className="text-sm text-gray-700">{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Message */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-800">Message</label>
              <div className="border border-gray-200 rounded-xl p-3">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={10}
                  placeholder="Type your message here..."
                  className="w-full text-sm text-gray-600 outline-none resize-none
                             placeholder-gray-400 leading-relaxed"
                />
              </div>
            </div>

            {/* Toggles */}
            <div className="flex flex-col gap-4 border-t border-gray-100 pt-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-gray-800">Enable "Click To Acknowledge" Button</p>
                <Toggle enabled={acknowledge} onChange={(val) => { setAcknowledge(val); if (!val) setAcknowledged(false); }} />
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-gray-800">Visit Summary</p>
                <Toggle enabled={visitSummary} onChange={setVisitSummary} />
              </div>

              {/* Visit Summary fields — shown when toggle is on */}
              {visitSummary && (
                <div className="flex flex-col gap-4">

                  {/* Number of Visit */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-gray-800">Number of Visit</label>
                    <input
                      type="number"
                      value={visitCount}
                      onChange={(e) => setVisitCount(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm
                                 text-gray-700 outline-none focus:ring-2 focus:ring-amber-200"
                    />
                  </div>

                  {/* First Visit Time */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-gray-800">First Visit Time</label>
                    <div className="relative">
                      <select
                        value={firstVisitTime}
                        onChange={(e) => setFirstVisitTime(e.target.value)}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm
                                   text-gray-700 outline-none appearance-none bg-white
                                   focus:ring-2 focus:ring-amber-200"
                      >
                        {timeOptions.map((t) => <option key={t}>{t}</option>)}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Last Visit Time */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-gray-800">Last Visit Time</label>
                    <div className="relative">
                      <select
                        value={lastVisitTime}
                        onChange={(e) => setLastVisitTime(e.target.value)}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm
                                   text-gray-700 outline-none appearance-none bg-white
                                   focus:ring-2 focus:ring-amber-200"
                      >
                        {timeOptions.map((t) => <option key={t}>{t}</option>)}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-gray-100 pt-2" />

            {/* Action buttons */}
            <div className="flex flex-col gap-3">
              <button
                onClick={() => setShowConfirm(true)}
                className="w-full py-3.5 rounded-xl font-semibold text-sm text-gray-900
                           hover:opacity-90 transition-colors"
                style={{ backgroundColor: AMBER }}
              >
                Send Announcement
              </button>
              <button
                className="w-full py-3.5 rounded-xl font-semibold text-sm text-white
                           hover:opacity-90 transition-colors"
                style={{ backgroundColor: BLUE }}
              >
                Save Draft
              </button>
            </div>
          </div>

          {/* ── Right: Preview ── */}
          <div className="flex flex-col gap-3 lg:w-[460px] flex-shrink-0">
            <p className="text-sm font-semibold text-gray-800">Preview Announcement</p>

            <div className="border border-gray-200 rounded-2xl overflow-hidden flex flex-col">

              {/* Preview header */}
              <div className="px-5 pt-5 pb-4 flex flex-col gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <Megaphone className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-base font-bold text-gray-900">
                      {title || "Announcement Title"}
                    </p>
                    <p className="text-xs text-gray-500">From: {sender || "Sender"}</p>
                    <p className="text-xs text-gray-500">Sent: {sentTime}</p>
                  </div>
                </div>

                {/* Preview message body */}
                <div className="border border-gray-200 rounded-xl px-4 py-4">
                  <MessageText text={message} />

                  {/* Visit summary card — shown when toggle is on */}
                  {visitSummary && (
                    <div className="mt-4 bg-amber-50 border border-amber-100 rounded-xl p-4 flex flex-col gap-2">
                      <p className="text-sm font-bold text-gray-900">Today's Assigned Visits</p>
                      <p className="text-sm text-gray-600">{visitCount} visits scheduled</p>
                      <div className="flex items-center gap-3 text-sm text-gray-700 flex-wrap">
                        <span>First visit: <strong>{firstVisitTime}</strong></span>
                        <span className="text-gray-300">|</span>
                        <span>Last visit: <strong>{lastVisitTime}</strong></span>
                      </div>
                      <div className="flex gap-2 mt-1">
                        <button
                          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs
                                     font-semibold text-gray-900 hover:opacity-90"
                          style={{ backgroundColor: AMBER }}
                        >
                          <Gift className="w-3.5 h-3.5" />
                          View Today's Visits
                        </button>
                        <button
                          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs
                                     font-semibold text-gray-700 border border-gray-200
                                     hover:bg-gray-50"
                        >
                          Message Office
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Acknowledge button — shown when toggle is on */}
                {acknowledge && (
                  <button
                    onClick={() => setAcknowledged((v) => !v)}
                    className="w-full py-3.5 rounded-xl font-semibold text-base text-gray-900
                               hover:opacity-90 transition-colors flex items-center justify-center gap-2"
                    style={{ backgroundColor: AMBER }}
                  >
                    Click to Acknowledge
                    {acknowledged && <span className="text-gray-900 font-bold">✓</span>}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Confirm Modal ── */}
      {showConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
          onClick={() => setShowConfirm(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto p-8
                       flex flex-col items-center gap-4 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold text-gray-900">Send Staff Announcement?</h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              Create and send important updates or notices to staff members
              regarding rota changes, service updates or urgent information.
            </p>
            <div className="flex gap-3 w-full mt-2">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 py-3.5 rounded-xl font-semibold text-sm text-gray-900
                           border border-amber-400 hover:bg-amber-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => { setShowConfirm(false); setShowSuccess(true); }}
                className="flex-1 py-3.5 rounded-xl font-semibold text-sm text-gray-900
                           hover:opacity-90 transition-colors"
                style={{ backgroundColor: AMBER }}
              >
                Yes, Send Announcement
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Success Modal ── */}
      <CheckInSuccessModal
        isOpen={showSuccess}
        onClose={() => { setShowSuccess(false); onBack(); }}
        buttonText="Go to Announcement History"
      />
    </div>
  );
}