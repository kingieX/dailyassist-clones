
import { useState, useRef, useEffect } from "react";
import { messagesData } from "../../../data/messagesData2";
import SendAnnouncementPage from "./SendAnnouncementPage";
import { Search, Trash2, Send, Megaphone, Bell, HeadphonesIcon, ChevronDown, X, Plus } from "lucide-react";
import CheckInSuccessModal from "../../modals/CheckInSuccessModal";
import ReassignVisitModal from "../modals/ReassignVisitModal";

const AMBER = "#f5c045";

const statusStyles = {
  pending:      "text-amber-500",
  reviewed:     "text-green-600",
  under_review: "text-orange-500",
  flagged:      "text-red-500",
  resolved:     "text-green-700",
};
const statusLabels = {
  pending:      "Pending",
  reviewed:     "Reviewed",
  under_review: "Under Review",
  flagged:      "Flagged",
  resolved:     "Resolved",
};
const statusOptions = ["pending", "reviewed", "under_review", "flagged", "resolved"];

function MessageText({ text }) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return (
    <span className="leading-relaxed whitespace-pre-line">
      {parts.map((part, i) =>
        i % 2 === 1 ? <strong key={i}>{part}</strong> : <span key={i}>{part}</span>
      )}
    </span>
  );
}

// ── Report Details Modal ──────────────────────────────────────────────────────
function ReportDetailsModal({ isOpen, report, onClose }) {
  const [reportStatus, setReportStatus] = useState(report?.status ?? "pending");
  const [statusOpen, setStatusOpen]     = useState(false);
  const [reason, setReason]             = useState(report?.reasonForAction ?? "");
  const [showSuccess, setShowSuccess]   = useState(false);

  if (!isOpen || !report) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 px-3 sm:px-6 py-4 sm:py-6 overflow-y-auto" onClick={onClose}>
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-auto flex flex-col my-2" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">Report Details</h2>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          <div className="px-6 py-5 flex flex-col gap-4">
            <p className="text-2xl font-bold text-gray-900">{report.clientName}</p>
            <hr className="border-gray-100" />
            <div className="flex flex-col gap-3">
              {[
                { label: "Address:",      value: report.address },
                { label: "Service type:", value: report.serviceType },
                { label: "Date:",         value: report.date },
                { label: "Start time:",   value: report.startTime },
                { label: "End time:",     value: report.endTime },
                { label: "Assigned to:",  value: report.assignedTo },
              ].map(({ label, value }) => (
                <div key={label} className="flex gap-3 text-sm">
                  <span className="font-bold text-gray-900 w-28 flex-shrink-0">{label}</span>
                  <span className="text-gray-600">{value}</span>
                </div>
              ))}
            </div>
            <hr className="border-gray-100" />
            <div className="flex flex-col gap-2">
              <p className="text-sm font-bold text-gray-900">Additional Note</p>
              <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-600 leading-relaxed">{report.additionalNote}</div>
            </div>
            <hr className="border-gray-100" />
            <div className="flex flex-col gap-2">
              <p className="text-sm font-bold text-gray-900">Change Report Status:</p>
              <div className="relative">
                <button onClick={() => setStatusOpen(!statusOpen)} className="w-full flex items-center justify-between border border-gray-200 rounded-xl px-4 py-3 text-sm hover:bg-gray-50 transition-colors">
                  <span className={statusStyles[reportStatus] ?? "text-gray-700"}>{statusLabels[reportStatus] ?? reportStatus}</span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${statusOpen ? "rotate-180" : ""}`} />
                </button>
                {statusOpen && (
                  <div className="absolute top-12 left-0 z-20 bg-white border border-gray-200 rounded-2xl shadow-lg w-full p-2 flex flex-col gap-1">
                    {statusOptions.map((s) => (
                      <button key={s} onClick={() => { setReportStatus(s); setStatusOpen(false); }}
                        className={`w-full text-left px-4 py-2.5 text-sm rounded-xl transition-colors hover:bg-[#fef9ec] ${reportStatus === s ? "bg-[#fef9ec] font-semibold " + statusStyles[s] : statusStyles[s]}`}>
                        {statusLabels[s]}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium text-gray-700">Reason for Action:</p>
              <textarea value={reason} onChange={(e) => setReason(e.target.value)} rows={3}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-amber-200 resize-none" />
            </div>
          </div>
          <div className="px-6 pb-6 pt-2 flex flex-col sm:flex-row gap-3">
            <button onClick={() => setShowSuccess(true)} className="flex-1 py-3.5 rounded-xl font-semibold text-sm text-white transition-colors hover:opacity-90" style={{ backgroundColor: "#5b8db8" }}>Save Update</button>
            <button onClick={onClose} className="flex-1 py-3.5 rounded-xl font-semibold text-sm text-gray-900 transition-colors hover:opacity-90" style={{ backgroundColor: AMBER }}>Close</button>
          </div>
        </div>
      </div>
      <CheckInSuccessModal isOpen={showSuccess} onClose={() => { setShowSuccess(false); onClose(); }} buttonText="Back to Messages" />
    </>
  );
}

// ── Visit Details Modal ───────────────────────────────────────────────────────
function VisitDetailsModal({ isOpen, visit, onClose }) {
  if (!isOpen || !visit) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-auto p-6 flex flex-col gap-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-xl font-bold text-gray-900">{visit.clientName}</h2>
          <div className="flex items-center gap-3 flex-shrink-0">
            <span className={`text-xs font-semibold px-3 py-1.5 rounded-full
              ${visit.status === "Completed" || visit.status === "completed"
                ? "bg-green-100 text-green-600"
                : visit.status === "In Progress" || visit.status === "in-progress"
                  ? "bg-[#f5f0d0] text-[#7a6c3a]"
                  : visit.status === "Pending/Late" || visit.status === "pending/late"
                    ? "bg-red-100 text-red-400"
                    : "bg-gray-100 text-gray-500"}`}>
              {visit.status}
            </span>
            <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
              <span className="text-gray-500 text-xl leading-none">×</span>
            </button>
          </div>
        </div>
        <hr className="border-gray-100" />
        <div className="flex flex-col gap-3">
          {[
            { label: "Address:",      value: visit.address },
            { label: "Service type:", value: visit.serviceType },
            { label: "Date:",         value: visit.date },
            { label: "Start time:",   value: visit.startTime },
            { label: "End time:",     value: visit.endTime },
            { label: "Assigned to:",  value: visit.assignedTo },
          ].map(({ label, value }) => (
            <div key={label} className="flex gap-3 text-sm flex-wrap">
              <span className="font-bold text-gray-900 w-28 flex-shrink-0">{label}</span>
              <span className="text-gray-600">{value}</span>
            </div>
          ))}
        </div>
        <hr className="border-gray-100" />
        <div className="flex flex-col gap-2">
          <p className="text-sm font-bold text-gray-900">Additional Note</p>
          <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-600 leading-relaxed">{visit.additionalNote}</div>
        </div>
      </div>
    </div>
  );
}

// ── Missed CheckIn Visit Modal ────────────────────────────────────────────────
function MissedCheckInVisitModal({ isOpen, visit, onClose, onReassign }) {
  if (!isOpen || !visit) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-auto p-6 flex flex-col gap-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-xl font-bold text-gray-900">{visit.clientName}</h2>
          <div className="flex items-center gap-3 flex-shrink-0">
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-red-100 text-red-400">Pending/Late</span>
            <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>
        <hr className="border-gray-100" />
        <div className="flex flex-col gap-3">
          {[
            { label: "Address:",      value: visit.address },
            { label: "Service type:", value: visit.serviceType },
            { label: "Date:",         value: visit.date },
            { label: "Start time:",   value: visit.startTime },
            { label: "End time:",     value: visit.endTime },
            { label: "Assigned to:",  value: visit.assignedTo },
          ].map(({ label, value }) => (
            <div key={label} className="flex gap-3 text-sm flex-wrap">
              <span className="font-bold text-gray-900 w-28 flex-shrink-0">{label}</span>
              <span className="text-gray-600">{value}</span>
            </div>
          ))}
        </div>
        <hr className="border-gray-100" />
        <div className="flex flex-col gap-2">
          <p className="text-sm font-bold text-gray-900">Additional Note</p>
          <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-600 leading-relaxed">{visit.additionalNote}</div>
        </div>
        <button onClick={onReassign} className="w-full py-3.5 rounded-xl font-semibold text-sm text-white hover:opacity-90 transition-colors" style={{ backgroundColor: "#669369" }}>
          Reassign a new staff
        </button>
      </div>
    </div>
  );
}

// ── New Message Modal ─────────────────────────────────────────────────────────
const staffList = [
  "Sam Smith", "Lauren James", "Aminat Muhammed", "John Doe",
  "James Brown", "Kate Steve", "Sarah Adeleke", "Oliver Grant",
];

function NewMessageModal({ isOpen, onClose }) {
  const [staffOpen, setStaffOpen]         = useState(false);
  const [staffSearch, setStaffSearch]     = useState("");
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [message, setMessage]             = useState("");
  const [showConfirm, setShowConfirm]     = useState(false);
  const [showSuccess, setShowSuccess]     = useState(false);

  const filtered = staffList.filter((s) =>
    s.toLowerCase().includes(staffSearch.toLowerCase())
  );

  const handleSend = () => {
    if (!selectedStaff || !message.trim()) return;
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    setShowConfirm(false);
    setShowSuccess(true);
  };

  const handleClose = () => {
    setSelectedStaff(null);
    setMessage("");
    setStaffSearch("");
    setStaffOpen(false);
    setShowConfirm(false);
    setShowSuccess(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6"
        onClick={handleClose}
      >
        <div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-xl mx-auto flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-6 pb-5">
            <div className="flex items-center gap-3">
              <Plus className="w-5 h-5 text-gray-800" />
              <h2 className="text-xl font-bold text-gray-900">New message</h2>
            </div>
            <button onClick={handleClose} className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
              <X className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          <div className="px-6 pb-6 flex flex-col gap-5">
            {/* Send To */}
            <div className="flex flex-col gap-2">
              <p className="text-sm font-semibold text-gray-700">Send To:</p>
              <div className="relative">
                <button
                  onClick={() => setStaffOpen(!staffOpen)}
                  className="w-full flex items-center justify-between bg-gray-100 rounded-xl px-4 py-3 text-sm hover:bg-gray-200 transition-colors"
                >
                  <span className={selectedStaff ? "text-gray-900 font-medium" : "text-gray-400"}>
                    {selectedStaff ?? "Pick a staff"}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${staffOpen ? "rotate-180" : ""}`} />
                </button>
                {staffOpen && (
                  <div className="absolute top-14 left-0 z-20 bg-white border border-gray-200 rounded-2xl shadow-xl w-full flex flex-col overflow-hidden">
                    <div className="px-3 pt-3 pb-2">
                      <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
                        <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <input
                          type="text"
                          value={staffSearch}
                          onChange={(e) => setStaffSearch(e.target.value)}
                          placeholder="Search..."
                          className="bg-transparent text-sm text-gray-700 outline-none placeholder-gray-400 w-full"
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col max-h-48 overflow-y-auto pb-2">
                      {filtered.length > 0 ? filtered.map((staff) => (
                        <button
                          key={staff}
                          onClick={() => { setSelectedStaff(staff); setStaffOpen(false); setStaffSearch(""); }}
                          className={`text-left px-5 py-3 text-sm font-semibold hover:bg-gray-50 transition-colors
                                      ${selectedStaff === staff ? "text-blue-500" : "text-gray-900"}`}
                        >
                          {staff}
                        </button>
                      )) : (
                        <p className="px-5 py-3 text-sm text-gray-400">No staff found</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Message */}
            <div className="flex flex-col gap-2">
              <p className="text-sm font-semibold text-gray-700">Message</p>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here...."
                rows={6}
                className="w-full bg-gray-100 rounded-xl px-4 py-3 text-sm text-gray-700
                           outline-none focus:ring-2 focus:ring-blue-200 resize-none placeholder-gray-400"
              />
            </div>

            {/* Send button */}
            <button
              onClick={handleSend}
              disabled={!selectedStaff || !message.trim()}
              className="w-full py-3.5 rounded-xl font-semibold text-sm text-white transition-colors hover:opacity-90 disabled:opacity-40"
              style={{ backgroundColor: "#5b8db8" }}
            >
              Send New Message
            </button>
          </div>
        </div>
      </div>

      {/* Confirm modal */}
      {showConfirm && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 px-4"
          onClick={() => setShowConfirm(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-sm px-8 py-8 flex flex-col items-center gap-4 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold text-gray-900">Send New Message?</h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              Are you sure you want to send new message?
            </p>
            <div className="flex gap-3 w-full mt-2">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 py-3 rounded-xl border border-blue-400 font-medium text-sm text-blue-500 hover:bg-blue-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 py-3 rounded-xl font-semibold text-sm text-white hover:opacity-90 transition-colors"
                style={{ backgroundColor: "#5b8db8" }}
              >
                Yes, Send New Message
              </button>
            </div>
          </div>
        </div>
      )}

      <CheckInSuccessModal
        isOpen={showSuccess}
        onClose={handleClose}
        buttonText="Go to Announcement History"
      />
    </>
  );
}

// ── Notification Panel ────────────────────────────────────────────────────────
function NotificationPanel({ convo, onNavigate, setShowVisitDetails, setShowReportDetails, setShowMissedCheckinModal }) {
  return (
    <div className="flex flex-col px-6 py-5 pb-12 gap-5">

      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full flex-shrink-0 overflow-hidden bg-gray-200 flex items-center justify-center">
          {convo.avatar
            ? <img src={convo.avatar} alt={convo.name} className="w-full h-full object-cover" />
            : <span className="text-sm font-bold text-gray-500">{convo.name[0]}</span>
          }
        </div>
        <div className="flex flex-col gap-0.5">
          <h3 className="text-lg font-bold text-gray-900">{convo.title || convo.name}</h3>
          <p className="text-sm text-gray-500">From: {convo.from}</p>
          <p className="text-sm text-gray-500">Received: {convo.received || convo.sent}</p>
        </div>
      </div>

      {/* Message body card */}
      <div className="border border-gray-200 rounded-2xl px-5 py-5">
        <p className="text-sm text-gray-600 leading-relaxed">
          <MessageText text={convo.body} />
        </p>
      </div>

      {/* Action buttons */}
      {convo.actions && convo.actions.length > 0 && (
        <div className="flex flex-col gap-3">
          {convo.actions.map((action, i) => (
            <button
              key={i}
              onClick={() => {
                if (action.label === "View Visit Details") {
                  if (convo.notificationType === "missed_checkin") {
                    setShowMissedCheckinModal(true);
                  } else {
                    setShowVisitDetails(true);
                  }
                } else if (action.label === "Proceed to Reports") {
                  setShowReportDetails(true);
                } else {
                  onNavigate && onNavigate(action.navigateTo);
                }
              }}
              className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-colors hover:opacity-90
                          text-gray-900
                          ${convo.notificationType === "checkin_with_reminder"
                            ? "border border-amber-400 hover:bg-amber-50"
                            : action.label === "View Visit Details" || action.primary === false
                              ? "border border-gray-200 hover:bg-gray-50"
                              : ""}`}
              style={
                convo.notificationType === "checkin_with_reminder"
                  ? {}
                  : action.label === "Send Reminder" || i === 0
                    ? { backgroundColor: AMBER }
                    : {}
              }
            >
              {action.label}
            </button>
          ))}
        </div>
      )}

      {/* Embedded card */}
      {convo.embeddedCard && (
        <div className="rounded-2xl overflow-hidden shadow-sm" style={{ backgroundColor: "#4a90d9" }}>
          <div className="flex items-start gap-3 px-4 pt-4 pb-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>
              <Bell className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col gap-0.5">
              <p className="text-sm font-bold text-white">{convo.embeddedCard.title}</p>
              <p className="text-xs text-blue-100">From: {convo.embeddedCard.from}</p>
              <p className="text-xs text-blue-100">Sent: {convo.embeddedCard.sent}</p>
            </div>
          </div>
          <div className="mx-4 mb-4 bg-white rounded-xl px-4 py-4">
            <p className="text-sm text-gray-600 leading-relaxed">{convo.embeddedCard.body}</p>
          </div>
          <div className="px-4 pb-4">
            <button onClick={() => onNavigate && onNavigate(convo.embeddedCard.navigateTo)}
              className="w-full py-3 rounded-xl font-semibold text-sm text-gray-900 hover:opacity-90 transition-colors"
              style={{ backgroundColor: AMBER }}>
              {convo.embeddedCard.actionLabel}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Announcement Panel ────────────────────────────────────────────────────────
function AnnouncementPanel({ convo }) {
  const [showAll, setShowAll] = useState(false);
  const visibleStaff = showAll ? convo.acknowledgements : convo.acknowledgements?.slice(0, 3);

  return (
    <div className="flex flex-col h-full overflow-y-auto px-6 py-5 gap-5">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
          {convo.icon === "megaphone" && <Megaphone className="w-5 h-5 text-gray-600" />}
          {convo.icon === "bell"      && <Bell className="w-5 h-5 text-blue-500" />}
          {convo.icon === "headset"   && <HeadphonesIcon className="w-5 h-5 text-gray-600" />}
        </div>
        <div className="flex flex-col gap-0.5">
          <h3 className="text-lg font-bold text-gray-900">{convo.name}</h3>
          <p className="text-sm text-gray-500">From: {convo.from}</p>
          <p className="text-sm text-gray-500">Sent: {convo.sent}</p>
          <p className="text-sm text-gray-500">Recipients: {convo.recipients}</p>
        </div>
      </div>
      <div className="border border-gray-200 rounded-2xl px-5 py-5 flex flex-col gap-4">
        <div className="text-sm text-gray-600 leading-relaxed"><MessageText text={convo.body} /></div>
        {convo.visitsCard && (
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex flex-col gap-2">
            <p className="text-sm font-bold text-gray-900">Today's Assigned Visits</p>
            <p className="text-sm text-gray-600">{convo.visitsCard.count} visits scheduled</p>
            <div className="flex items-center gap-4 text-sm text-gray-700">
              <span>First visit: <strong>{convo.visitsCard.first}</strong></span>
              <span className="text-gray-300">|</span>
              <span>Last visit: <strong>{convo.visitsCard.last}</strong></span>
            </div>
          </div>
        )}
      </div>
      {convo.acknowledgements && (
        <div className="flex flex-col gap-2">
          <p className="text-sm font-bold text-gray-900">Acknowledgement Status</p>
          <div className="rounded-xl overflow-hidden border border-gray-100">
            <div className="grid grid-cols-2 px-4 py-2.5" style={{ backgroundColor: AMBER }}>
              <p className="text-sm font-bold text-gray-900">Staff</p>
              <p className="text-sm font-bold text-gray-900">Status</p>
            </div>
            {visibleStaff.map((s, i) => (
              <div key={i} className="grid grid-cols-2 px-4 py-2.5 border-t border-gray-100 bg-white">
                <p className="text-sm text-gray-700">{s.name}</p>
                <p className={`text-sm font-semibold ${s.status === "Acknowledged" ? "text-green-500" : "text-amber-500"}`}>{s.status}</p>
              </div>
            ))}
            {convo.acknowledgements.length > 3 && (
              <button onClick={() => setShowAll((v) => !v)} className="w-full py-2.5 text-sm font-semibold text-gray-900 flex items-center justify-center gap-1" style={{ backgroundColor: AMBER }}>
                {showAll ? "View less ∧" : "View more ∨"}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Chat Panel ────────────────────────────────────────────────────────────────
function ChatPanel({ convo, onSend }) {
  const [reply, setReply] = useState("");
  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [convo.messages]);

  const handleSend = () => {
    const text = reply.trim();
    if (!text) return;
    onSend(convo.id, text);
    setReply("");
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 flex-shrink-0">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex-shrink-0 flex items-center justify-center">
          {convo.avatar ? <img src={convo.avatar} alt={convo.name} className="w-full h-full object-cover" /> : <span className="text-sm font-bold text-gray-500">{convo.name[0]}</span>}
        </div>
        <h3 className="text-base font-bold text-gray-900">Chat with {convo.name}</h3>
      </div>
      <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-5">
        {convo.messages.map((msg) => (
          <div key={msg.id} className={`flex flex-col ${msg.sender === "admin" ? "items-end" : "items-start"}`}>
            {msg.sender === "admin" ? (
              <div className="max-w-[80%] bg-white border border-gray-100 rounded-2xl px-4 py-3 shadow-sm">
                <p className="text-sm text-gray-700"><MessageText text={msg.text} /></p>
                <div className="flex items-center justify-end gap-1 mt-2">
                  {msg.read && <span className="text-green-500 text-xs">✓</span>}
                  <p className="text-xs text-gray-400">You • {msg.time}</p>
                </div>
              </div>
            ) : (
              <div className="flex items-end gap-2 max-w-[80%]">
                <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-gray-200 flex items-center justify-center">
                  {convo.avatar ? <img src={convo.avatar} alt={convo.name} className="w-full h-full object-cover" /> : <span className="text-xs font-bold text-gray-500">{convo.name[0]}</span>}
                </div>
                <div className="bg-[#1e2d3d] rounded-2xl px-4 py-3">
                  <p className="text-sm text-white"><MessageText text={msg.text} /></p>
                  <p className="text-xs text-gray-400 mt-2">{convo.name} • {msg.time}</p>
                </div>
              </div>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="px-6 py-4 flex items-center gap-3 border-t border-gray-100 flex-shrink-0">
        <input type="text" value={reply} onChange={(e) => setReply(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSend()} placeholder="Reply..."
          className="flex-1 bg-gray-100 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-amber-200 placeholder-gray-400" />
        <button onClick={handleSend} className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm text-gray-900 hover:opacity-90 transition-colors flex-shrink-0" style={{ backgroundColor: AMBER }}>
          <Send className="w-4 h-4" />Send
        </button>
      </div>
    </div>
  );
}

// ── Conversation List Item ────────────────────────────────────────────────────
function ConversationItem({ convo, isActive, onClick, selectMode, isSelected, onToggle }) {
  return (
    <div
      onClick={selectMode ? onToggle : onClick}
      className={`flex items-center gap-3 p-4 rounded-2xl border cursor-pointer transition-all shadow-md
                  ${isActive && !selectMode ? "border-amber-400 bg-amber-50" : "border-gray-100 bg-white hover:border-gray-200 hover:bg-gray-50"}
                  ${selectMode && isSelected ? "border-red-300 bg-red-50" : ""}`}>
      {selectMode && (
        <div className={`w-5 h-5 rounded flex-shrink-0 border-2 flex items-center justify-center transition-colors
                         ${isSelected ? "bg-red-500 border-red-500" : "border-gray-300 bg-white"}`}>
          {isSelected && <span className="text-white text-xs font-bold leading-none">✓</span>}
        </div>
      )}
      <div className="w-12 h-12 rounded-full flex-shrink-0 overflow-hidden bg-gray-200 flex items-center justify-center">
        {convo.avatar ? <img src={convo.avatar} alt={convo.name} className="w-full h-full object-cover" />
          : convo.icon === "megaphone" ? <Megaphone className="w-5 h-5 text-gray-600" />
          : convo.icon === "bell"      ? <Bell className="w-5 h-5 text-blue-500" />
          : convo.icon === "headset"   ? <HeadphonesIcon className="w-5 h-5 text-gray-600" />
          : <span className="text-sm font-bold text-gray-500">{convo.name[0]}</span>}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-bold text-gray-900 truncate">{convo.name}</p>
          <p className="text-xs text-gray-400 flex-shrink-0">{convo.time}</p>
        </div>
        <div className="flex items-center justify-between gap-2 mt-0.5">
          <p className="text-sm text-gray-500 truncate">{convo.lastMessage}</p>
          {convo.unread && !selectMode && <div className="w-3 h-3 rounded-full bg-green-400 flex-shrink-0" />}
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function MessagesPage({ onNavigate }) {
  const [conversations, setConversations] = useState(messagesData);
  const [activeTab, setActiveTab]         = useState("all");
  const [activeConvo, setActiveConvo]     = useState(null);
  const [search, setSearch]               = useState("");
  const [showChat, setShowChat]           = useState(false);
  const [showSendAnnouncement, setShowSendAnnouncement] = useState(false);

  // Modal state lifted to top level so modals render outside scrollable div
  const [showVisitDetails, setShowVisitDetails]             = useState(false);
  const [showReportDetails, setShowReportDetails]           = useState(false);
  const [showMissedCheckinModal, setShowMissedCheckinModal] = useState(false);
  const [showReassignModal, setShowReassignModal]           = useState(false);
  const [showNewMessage, setShowNewMessage]                 = useState(false);
  const [selectMode, setSelectMode]                         = useState(false);
  const [selectedIds, setSelectedIds]                       = useState([]);
  const [showConfirmDelete, setShowConfirmDelete]           = useState(false);

  const tabs = [
    { key: "all",          label: "All messages",         count: conversations.filter((c) => c.tab === "all" && c.unread).length },
    { key: "announcement", label: "Announcement history", count: conversations.filter((c) => c.tab === "announcement").length },
    { key: "notification", label: "Notification history", count: conversations.filter((c) => c.tab === "notification").length },
  ];

  const filtered = conversations.filter((c) => {
    const matchTab = activeTab === "all" ? c.tab === "all" : c.tab === activeTab;
    const matchSearch = !search || c.name.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const handleSelectConvo = (convo) => {
    setActiveConvo(convo);
    setShowChat(true);
    setShowVisitDetails(false);
    setShowReportDetails(false);
    setShowMissedCheckinModal(false);
    setShowReassignModal(false);
    setConversations((prev) => prev.map((c) => c.id === convo.id ? { ...c, unread: false } : c));
  };

  const handleSend = (convoId, text) => {
    const newMsg = { id: Date.now(), sender: "admin", text, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), read: false };
    setConversations((prev) => prev.map((c) => c.id === convoId ? { ...c, messages: [...c.messages, newMsg], lastMessage: text } : c));
    setActiveConvo((prev) => prev?.id === convoId ? { ...prev, messages: [...prev.messages, newMsg] } : prev);
  };

  const handleDeleteConvo = () => {
    setConversations((prev) => prev.filter((c) => !selectedIds.includes(c.id)));
    setSelectedIds([]);
    setSelectMode(false);
    setShowConfirmDelete(false);
    setActiveConvo(null);
    setShowChat(false);
  };

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  if (showSendAnnouncement) {
    return <SendAnnouncementPage onBack={() => setShowSendAnnouncement(false)} />;
  }

  return (
    <div className="flex flex-col gap-4 px-4 sm:px-6 py-6 max-w-7xl mx-auto w-full h-full">

      <div className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Messages</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowNewMessage(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-blue-300
                       text-sm font-semibold text-blue-500 hover:bg-blue-50 transition-colors"
          >
            <Plus className="w-4 h-4" />
            New message
          </button>
          <button
            onClick={() => { setSelectMode((v) => !v); setSelectedIds([]); }}
            className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-red-50 transition-colors">
            <Trash2 className="w-5 h-5" style={{ color: "#cc0000" }} />
          </button>
          {selectMode && (
            <>
              <button
                onClick={() => { if (selectedIds.length > 0) setShowConfirmDelete(true); }}
                disabled={selectedIds.length === 0}
                className="flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm
                           transition-colors disabled:opacity-40"
                style={{ backgroundColor: "#fde8e8", color: "#cc0000" }}
              >
                <Trash2 className="w-4 h-4" />
                Delete{selectedIds.length > 0 ? ` (${selectedIds.length})` : ""}
              </button>
              <button
                onClick={() => { setSelectMode(false); setSelectedIds([]); }}
                className="px-4 py-2 rounded-xl font-semibold text-sm border border-gray-200
                           text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex items-center gap-4 sm:gap-6 flex-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button key={tab.key} onClick={() => { setActiveTab(tab.key); setActiveConvo(null); setShowChat(false); }}
              className={`flex items-center gap-2 pb-2 text-sm font-semibold whitespace-nowrap transition-colors border-b-2 flex-shrink-0
                          ${activeTab === tab.key ? "border-amber-400 text-gray-900" : "border-transparent text-gray-400 hover:text-gray-600"}`}>
              {tab.label}
              {tab.count > 0 && (
                <span className="w-5 h-5 rounded-full text-xs font-bold text-gray-900 flex items-center justify-center flex-shrink-0" style={{ backgroundColor: AMBER }}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5 sm:w-64 shadow-sm">
          <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..."
            className="bg-transparent text-sm text-gray-700 outline-none placeholder-gray-400 w-full" />
        </div>
      </div>

      <div className="flex gap-4 flex-1 min-h-0" style={{ minHeight: "500px" }}>
        <div className={`flex flex-col gap-3 w-full sm:w-[320px] flex-shrink-0 ${showChat ? "hidden sm:flex" : "flex"}`}>
          {filtered.length > 0 ? (
            filtered.map((convo) => (
              <ConversationItem
                key={convo.id}
                convo={convo}
                isActive={activeConvo?.id === convo.id}
                onClick={() => handleSelectConvo(convo)}
                selectMode={selectMode}
                isSelected={selectedIds.includes(convo.id)}
                onToggle={() => toggleSelect(convo.id)}
              />
            ))
          ) : (
            <div className="flex items-center justify-center py-20 text-gray-400"><p className="text-sm">No messages found.</p></div>
          )}
        </div>

        <div className="hidden sm:block w-px bg-gray-200 flex-shrink-0" />

        <div className={`flex-1 min-w-0 ${showChat ? "flex" : "hidden sm:flex"} flex-col`}>
          {activeConvo ? (
            <>
              <button onClick={() => setShowChat(false)} className="sm:hidden mb-3 text-sm font-semibold text-amber-600 self-start">← Back</button>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-y-auto" style={{ maxHeight: "calc(100vh - 200px)" }}>
                {activeConvo.tab === "notification"
                  ? <NotificationPanel
                      convo={activeConvo}
                      onNavigate={onNavigate}
                      setShowVisitDetails={setShowVisitDetails}
                      setShowReportDetails={setShowReportDetails}
                      setShowMissedCheckinModal={setShowMissedCheckinModal}
                    />
                  : activeConvo.tab === "announcement"
                    ? <AnnouncementPanel convo={activeConvo} />
                    : <ChatPanel convo={activeConvo} onSend={handleSend} />
                }
              </div>
            </>
          ) : (
            <div className="hidden sm:flex flex-1 items-center justify-center text-gray-300">
              <p className="text-sm">Select a conversation to start chatting</p>
            </div>
          )}
        </div>
      </div>

      {/* Modals rendered at top level — outside scrollable div */}
      <NewMessageModal isOpen={showNewMessage} onClose={() => setShowNewMessage(false)} />

      {/* Confirm Delete Modal */}
      {showConfirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" onClick={() => setShowConfirmDelete(false)}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md px-10 py-8 flex flex-col items-center gap-4 text-center" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold text-gray-900">Confirm Delete</h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              Are you sure you want to delete the message?
            </p>
            <div className="flex gap-3 w-full mt-2">
              <button
                onClick={() => setShowConfirmDelete(false)}
                className="flex-1 py-3 rounded-xl border border-red-400 font-medium text-sm text-red-500 hover:bg-red-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConvo}
                className="flex-1 py-3 rounded-xl font-semibold text-sm text-white hover:opacity-90 transition-colors"
                style={{ backgroundColor: "#cc0000" }}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
      <VisitDetailsModal
        isOpen={showVisitDetails}
        visit={activeConvo?.visitDetails}
        onClose={() => setShowVisitDetails(false)}
      />
      <MissedCheckInVisitModal
        isOpen={showMissedCheckinModal}
        visit={activeConvo?.visitDetails}
        onClose={() => setShowMissedCheckinModal(false)}
        onReassign={() => { setShowMissedCheckinModal(false); setShowReassignModal(true); }}
      />
      <ReportDetailsModal
        isOpen={showReportDetails}
        report={activeConvo?.visitDetails}
        onClose={() => setShowReportDetails(false)}
      />
      <ReassignVisitModal
        isOpen={showReassignModal}
        onClose={() => setShowReassignModal(false)}
        prefillData={activeConvo?.visitDetails ?? {}}
      />
    </div>
  );
}








// import { useState, useRef, useEffect } from "react";
// import SendAnnouncementPage from "./SendAnnouncementPage";
// import { Search, Trash2, Send, Megaphone, Bell, HeadphonesIcon, ChevronDown, X, Plus, Loader2 } from "lucide-react";
// import CheckInSuccessModal from "../../modals/CheckInSuccessModal";
// import ReassignVisitModal from "../modals/ReassignVisitModal";
// import { messagesAPI, staffAPI } from "../../../services/api";

// const AMBER = "#f5c045";

// const statusStyles = {
//   pending:      "text-amber-500",
//   reviewed:     "text-green-600",
//   under_review: "text-orange-500",
//   flagged:      "text-red-500",
//   resolved:     "text-green-700",
// };
// const statusLabels = {
//   pending:      "Pending",
//   reviewed:     "Reviewed",
//   under_review: "Under Review",
//   flagged:      "Flagged",
//   resolved:     "Resolved",
// };
// const statusOptions = ["pending", "reviewed", "under_review", "flagged", "resolved"];

// function MessageText({ text }) {
//   const parts = text.split(/\*\*(.*?)\*\*/g);
//   return (
//     <span className="leading-relaxed whitespace-pre-line">
//       {parts.map((part, i) =>
//         i % 2 === 1 ? <strong key={i}>{part}</strong> : <span key={i}>{part}</span>
//       )}
//     </span>
//   );
// }

// // ── Report Details Modal ──────────────────────────────────────────────────────
// function ReportDetailsModal({ isOpen, report, onClose }) {
//   const [reportStatus, setReportStatus] = useState(report?.status ?? "pending");
//   const [statusOpen, setStatusOpen]     = useState(false);
//   const [reason, setReason]             = useState(report?.reasonForAction ?? "");
//   const [showSuccess, setShowSuccess]   = useState(false);

//   if (!isOpen || !report) return null;

//   return (
//     <>
//       <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 px-3 sm:px-6 py-4 sm:py-6 overflow-y-auto" onClick={onClose}>
//         <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-auto flex flex-col my-2" onClick={(e) => e.stopPropagation()}>
//           <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
//             <h2 className="text-xl font-bold text-gray-900">Report Details</h2>
//             <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
//               <X className="w-5 h-5 text-gray-500" />
//             </button>
//           </div>
//           <div className="px-6 py-5 flex flex-col gap-4">
//             <p className="text-2xl font-bold text-gray-900">{report.clientName}</p>
//             <hr className="border-gray-100" />
//             <div className="flex flex-col gap-3">
//               {[
//                 { label: "Address:",      value: report.address },
//                 { label: "Service type:", value: report.serviceType },
//                 { label: "Date:",         value: report.date },
//                 { label: "Start time:",   value: report.startTime },
//                 { label: "End time:",     value: report.endTime },
//                 { label: "Assigned to:",  value: report.assignedTo },
//               ].map(({ label, value }) => (
//                 <div key={label} className="flex gap-3 text-sm">
//                   <span className="font-bold text-gray-900 w-28 flex-shrink-0">{label}</span>
//                   <span className="text-gray-600">{value}</span>
//                 </div>
//               ))}
//             </div>
//             <hr className="border-gray-100" />
//             <div className="flex flex-col gap-2">
//               <p className="text-sm font-bold text-gray-900">Additional Note</p>
//               <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-600 leading-relaxed">{report.additionalNote}</div>
//             </div>
//             <hr className="border-gray-100" />
//             <div className="flex flex-col gap-2">
//               <p className="text-sm font-bold text-gray-900">Change Report Status:</p>
//               <div className="relative">
//                 <button onClick={() => setStatusOpen(!statusOpen)} className="w-full flex items-center justify-between border border-gray-200 rounded-xl px-4 py-3 text-sm hover:bg-gray-50 transition-colors">
//                   <span className={statusStyles[reportStatus] ?? "text-gray-700"}>{statusLabels[reportStatus] ?? reportStatus}</span>
//                   <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${statusOpen ? "rotate-180" : ""}`} />
//                 </button>
//                 {statusOpen && (
//                   <div className="absolute top-12 left-0 z-20 bg-white border border-gray-200 rounded-2xl shadow-lg w-full p-2 flex flex-col gap-1">
//                     {statusOptions.map((s) => (
//                       <button key={s} onClick={() => { setReportStatus(s); setStatusOpen(false); }}
//                         className={`w-full text-left px-4 py-2.5 text-sm rounded-xl transition-colors hover:bg-[#fef9ec] ${reportStatus === s ? "bg-[#fef9ec] font-semibold " + statusStyles[s] : statusStyles[s]}`}>
//                         {statusLabels[s]}
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>
//             <div className="flex flex-col gap-2">
//               <p className="text-sm font-medium text-gray-700">Reason for Action:</p>
//               <textarea value={reason} onChange={(e) => setReason(e.target.value)} rows={3}
//                 className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-amber-200 resize-none" />
//             </div>
//           </div>
//           <div className="px-6 pb-6 pt-2 flex flex-col sm:flex-row gap-3">
//             <button onClick={() => setShowSuccess(true)} className="flex-1 py-3.5 rounded-xl font-semibold text-sm text-white transition-colors hover:opacity-90" style={{ backgroundColor: "#5b8db8" }}>Save Update</button>
//             <button onClick={onClose} className="flex-1 py-3.5 rounded-xl font-semibold text-sm text-gray-900 transition-colors hover:opacity-90" style={{ backgroundColor: AMBER }}>Close</button>
//           </div>
//         </div>
//       </div>
//       <CheckInSuccessModal isOpen={showSuccess} onClose={() => { setShowSuccess(false); onClose(); }} buttonText="Back to Messages" />
//     </>
//   );
// }

// // ── Visit Details Modal ───────────────────────────────────────────────────────
// function VisitDetailsModal({ isOpen, visit, onClose }) {
//   if (!isOpen || !visit) return null;
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" onClick={onClose}>
//       <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-auto p-6 flex flex-col gap-4" onClick={(e) => e.stopPropagation()}>
//         <div className="flex items-start justify-between gap-3">
//           <h2 className="text-xl font-bold text-gray-900">{visit.clientName}</h2>
//           <div className="flex items-center gap-3 flex-shrink-0">
//             <span className={`text-xs font-semibold px-3 py-1.5 rounded-full
//               ${visit.status === "Completed" || visit.status === "completed" ? "bg-green-100 text-green-600"
//                 : visit.status === "In Progress" || visit.status === "in-progress" ? "bg-[#f5f0d0] text-[#7a6c3a]"
//                 : visit.status === "Pending/Late" || visit.status === "pending/late" ? "bg-red-100 text-red-400"
//                 : "bg-gray-100 text-gray-500"}`}>
//               {visit.status}
//             </span>
//             <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
//               <span className="text-gray-500 text-xl leading-none">×</span>
//             </button>
//           </div>
//         </div>
//         <hr className="border-gray-100" />
//         <div className="flex flex-col gap-3">
//           {[
//             { label: "Address:",      value: visit.address },
//             { label: "Service type:", value: visit.serviceType },
//             { label: "Date:",         value: visit.date },
//             { label: "Start time:",   value: visit.startTime },
//             { label: "End time:",     value: visit.endTime },
//             { label: "Assigned to:",  value: visit.assignedTo },
//           ].map(({ label, value }) => (
//             <div key={label} className="flex gap-3 text-sm flex-wrap">
//               <span className="font-bold text-gray-900 w-28 flex-shrink-0">{label}</span>
//               <span className="text-gray-600">{value}</span>
//             </div>
//           ))}
//         </div>
//         <hr className="border-gray-100" />
//         <div className="flex flex-col gap-2">
//           <p className="text-sm font-bold text-gray-900">Additional Note</p>
//           <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-600 leading-relaxed">{visit.additionalNote}</div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ── Missed CheckIn Visit Modal ────────────────────────────────────────────────
// function MissedCheckInVisitModal({ isOpen, visit, onClose, onReassign }) {
//   if (!isOpen || !visit) return null;
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" onClick={onClose}>
//       <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-auto p-6 flex flex-col gap-4" onClick={(e) => e.stopPropagation()}>
//         <div className="flex items-start justify-between gap-3">
//           <h2 className="text-xl font-bold text-gray-900">{visit.clientName}</h2>
//           <div className="flex items-center gap-3 flex-shrink-0">
//             <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-red-100 text-red-400">Pending/Late</span>
//             <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
//               <X className="w-4 h-4 text-gray-500" />
//             </button>
//           </div>
//         </div>
//         <hr className="border-gray-100" />
//         <div className="flex flex-col gap-3">
//           {[
//             { label: "Address:",      value: visit.address },
//             { label: "Service type:", value: visit.serviceType },
//             { label: "Date:",         value: visit.date },
//             { label: "Start time:",   value: visit.startTime },
//             { label: "End time:",     value: visit.endTime },
//             { label: "Assigned to:",  value: visit.assignedTo },
//           ].map(({ label, value }) => (
//             <div key={label} className="flex gap-3 text-sm flex-wrap">
//               <span className="font-bold text-gray-900 w-28 flex-shrink-0">{label}</span>
//               <span className="text-gray-600">{value}</span>
//             </div>
//           ))}
//         </div>
//         <hr className="border-gray-100" />
//         <div className="flex flex-col gap-2">
//           <p className="text-sm font-bold text-gray-900">Additional Note</p>
//           <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-600 leading-relaxed">{visit.additionalNote}</div>
//         </div>
//         <button onClick={onReassign} className="w-full py-3.5 rounded-xl font-semibold text-sm text-white hover:opacity-90 transition-colors" style={{ backgroundColor: "#669369" }}>
//           Reassign a new staff
//         </button>
//       </div>
//     </div>
//   );
// }

// // ── New Message Modal ─────────────────────────────────────────────────────────
// function NewMessageModal({ isOpen, onClose }) {
//   const [staffList, setStaffList]         = useState([]);
//   const [staffOpen, setStaffOpen]         = useState(false);
//   const [staffSearch, setStaffSearch]     = useState("");
//   const [selectedStaff, setSelectedStaff] = useState(null);
//   const [message, setMessage]             = useState("");
//   const [showConfirm, setShowConfirm]     = useState(false);
//   const [showSuccess, setShowSuccess]     = useState(false);
//   const [sending, setSending]             = useState(false);
//   const [apiError, setApiError]           = useState(null);

//   // Fetch real staff list when modal opens
//   useEffect(() => {
//     if (!isOpen) return;
//     staffAPI.getAll()
//       .then((res) => {
//         const data = res.data?.data ?? res.data ?? [];
//         setStaffList(Array.isArray(data) ? data.map((s) => s.name) : []);
//       })
//       .catch(() => setStaffList([]));
//   }, [isOpen]);

//   const filtered = staffList.filter((s) =>
//     s.toLowerCase().includes(staffSearch.toLowerCase())
//   );

//   const handleSend = () => {
//     if (!selectedStaff || !message.trim()) return;
//     setShowConfirm(true);
//   };

//   const handleConfirm = async () => {
//     setSending(true);
//     setApiError(null);
//     try {
//       await messagesAPI.send({ recipient: selectedStaff, message });
//       setShowConfirm(false);
//       setShowSuccess(true);
//     } catch (err) {
//       setApiError(err.response?.data?.message || "Failed to send message.");
//       setShowConfirm(false);
//     } finally {
//       setSending(false);
//     }
//   };

//   const handleClose = () => {
//     setSelectedStaff(null);
//     setMessage("");
//     setStaffSearch("");
//     setStaffOpen(false);
//     setShowConfirm(false);
//     setShowSuccess(false);
//     setApiError(null);
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <>
//       <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6" onClick={handleClose}>
//         <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-auto flex flex-col" onClick={(e) => e.stopPropagation()}>
//           <div className="flex items-center justify-between px-6 pt-6 pb-5">
//             <div className="flex items-center gap-3">
//               <Plus className="w-5 h-5 text-gray-800" />
//               <h2 className="text-xl font-bold text-gray-900">New message</h2>
//             </div>
//             <button onClick={handleClose} className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
//               <X className="w-4 h-4 text-gray-600" />
//             </button>
//           </div>

//           {apiError && (
//             <div className="mx-6 px-4 py-3 bg-red-50 border border-red-200 rounded-xl mb-2">
//               <p className="text-sm text-red-500">{apiError}</p>
//             </div>
//           )}

//           <div className="px-6 pb-6 flex flex-col gap-5">
//             <div className="flex flex-col gap-2">
//               <p className="text-sm font-semibold text-gray-700">Send To:</p>
//               <div className="relative">
//                 <button onClick={() => setStaffOpen(!staffOpen)}
//                   className="w-full flex items-center justify-between bg-gray-100 rounded-xl px-4 py-3 text-sm hover:bg-gray-200 transition-colors">
//                   <span className={selectedStaff ? "text-gray-900 font-medium" : "text-gray-400"}>
//                     {selectedStaff ?? "Pick a staff"}
//                   </span>
//                   <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${staffOpen ? "rotate-180" : ""}`} />
//                 </button>
//                 {staffOpen && (
//                   <div className="absolute top-14 left-0 z-20 bg-white border border-gray-200 rounded-2xl shadow-xl w-full flex flex-col overflow-hidden">
//                     <div className="px-3 pt-3 pb-2">
//                       <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
//                         <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
//                         <input type="text" value={staffSearch} onChange={(e) => setStaffSearch(e.target.value)}
//                           placeholder="Search..."
//                           className="bg-transparent text-sm text-gray-700 outline-none placeholder-gray-400 w-full"
//                           onClick={(e) => e.stopPropagation()} />
//                       </div>
//                     </div>
//                     <div className="flex flex-col max-h-48 overflow-y-auto pb-2">
//                       {filtered.length > 0 ? filtered.map((staff) => (
//                         <button key={staff}
//                           onClick={() => { setSelectedStaff(staff); setStaffOpen(false); setStaffSearch(""); }}
//                           className={`text-left px-5 py-3 text-sm font-semibold hover:bg-gray-50 transition-colors
//                                       ${selectedStaff === staff ? "text-blue-500" : "text-gray-900"}`}>
//                           {staff}
//                         </button>
//                       )) : (
//                         <p className="px-5 py-3 text-sm text-gray-400">No staff found</p>
//                       )}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>

//             <div className="flex flex-col gap-2">
//               <p className="text-sm font-semibold text-gray-700">Message</p>
//               <textarea value={message} onChange={(e) => setMessage(e.target.value)}
//                 placeholder="Type your message here...." rows={6}
//                 className="w-full bg-gray-100 rounded-xl px-4 py-3 text-sm text-gray-700
//                            outline-none focus:ring-2 focus:ring-blue-200 resize-none placeholder-gray-400" />
//             </div>

//             <button onClick={handleSend} disabled={!selectedStaff || !message.trim()}
//               className="w-full py-3.5 rounded-xl font-semibold text-sm text-white transition-colors hover:opacity-90 disabled:opacity-40"
//               style={{ backgroundColor: "#5b8db8" }}>
//               Send New Message
//             </button>
//           </div>
//         </div>
//       </div>

//       {showConfirm && (
//         <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 px-4" onClick={() => setShowConfirm(false)}>
//           <div className="bg-white rounded-2xl shadow-xl w-full max-w-md px-8 py-8 flex flex-col items-center gap-4 text-center" onClick={(e) => e.stopPropagation()}>
//             <h2 className="text-xl font-bold text-gray-900">Send New Message?</h2>
//             <p className="text-sm text-gray-500 leading-relaxed">Are you sure you want to send new message?</p>
//             <div className="flex gap-3 w-full mt-2">
//               <button onClick={() => setShowConfirm(false)}
//                 className="flex-1 py-3 rounded-xl border border-blue-400 font-medium text-sm text-blue-500 hover:bg-blue-50 transition-colors">
//                 Cancel
//               </button>
//               <button onClick={handleConfirm} disabled={sending}
//                 className="flex-1 py-3 rounded-xl font-semibold text-sm text-white hover:opacity-90 transition-colors disabled:opacity-60"
//                 style={{ backgroundColor: "#5b8db8" }}>
//                 {sending ? "Sending..." : "Yes, Send New Message"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <CheckInSuccessModal isOpen={showSuccess} onClose={handleClose} buttonText="Go to Announcement History" />
//     </>
//   );
// }

// // ── Notification Panel ────────────────────────────────────────────────────────
// function NotificationPanel({ convo, onNavigate, setShowVisitDetails, setShowReportDetails, setShowMissedCheckinModal }) {
//   return (
//     <div className="flex flex-col px-6 py-5 pb-12 gap-5">
//       <div className="flex items-start gap-4">
//         <div className="w-12 h-12 rounded-full flex-shrink-0 overflow-hidden bg-gray-200 flex items-center justify-center">
//           {convo.avatar ? <img src={convo.avatar} alt={convo.name} className="w-full h-full object-cover" />
//             : <span className="text-sm font-bold text-gray-500">{convo.name[0]}</span>}
//         </div>
//         <div className="flex flex-col gap-0.5">
//           <h3 className="text-lg font-bold text-gray-900">{convo.title || convo.name}</h3>
//           <p className="text-sm text-gray-500">From: {convo.from}</p>
//           <p className="text-sm text-gray-500">Received: {convo.received || convo.sent}</p>
//         </div>
//       </div>
//       <div className="border border-gray-200 rounded-2xl px-5 py-5">
//         <p className="text-sm text-gray-600 leading-relaxed"><MessageText text={convo.body} /></p>
//       </div>
//       {convo.actions && convo.actions.length > 0 && (
//         <div className="flex flex-col gap-3">
//           {convo.actions.map((action, i) => (
//             <button key={i}
//               onClick={() => {
//                 if (action.label === "View Visit Details") {
//                   if (convo.notificationType === "missed_checkin") setShowMissedCheckinModal(true);
//                   else setShowVisitDetails(true);
//                 } else if (action.label === "Proceed to Reports") {
//                   setShowReportDetails(true);
//                 } else {
//                   onNavigate && onNavigate(action.navigateTo);
//                 }
//               }}
//               className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-colors hover:opacity-90 text-gray-900
//                           ${convo.notificationType === "checkin_with_reminder" ? "border border-amber-400 hover:bg-amber-50"
//                             : action.label === "View Visit Details" || action.primary === false ? "border border-gray-200 hover:bg-gray-50" : ""}`}
//               style={convo.notificationType === "checkin_with_reminder" ? {}
//                 : action.label === "Send Reminder" || i === 0 ? { backgroundColor: AMBER } : {}}>
//               {action.label}
//             </button>
//           ))}
//         </div>
//       )}
//       {convo.embeddedCard && (
//         <div className="rounded-2xl overflow-hidden shadow-sm" style={{ backgroundColor: "#4a90d9" }}>
//           <div className="flex items-start gap-3 px-4 pt-4 pb-3">
//             <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>
//               <Bell className="w-5 h-5 text-white" />
//             </div>
//             <div className="flex flex-col gap-0.5">
//               <p className="text-sm font-bold text-white">{convo.embeddedCard.title}</p>
//               <p className="text-xs text-blue-100">From: {convo.embeddedCard.from}</p>
//               <p className="text-xs text-blue-100">Sent: {convo.embeddedCard.sent}</p>
//             </div>
//           </div>
//           <div className="mx-4 mb-4 bg-white rounded-xl px-4 py-4">
//             <p className="text-sm text-gray-600 leading-relaxed">{convo.embeddedCard.body}</p>
//           </div>
//           <div className="px-4 pb-4">
//             <button onClick={() => onNavigate && onNavigate(convo.embeddedCard.navigateTo)}
//               className="w-full py-3 rounded-xl font-semibold text-sm text-gray-900 hover:opacity-90 transition-colors"
//               style={{ backgroundColor: AMBER }}>
//               {convo.embeddedCard.actionLabel}
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// // ── Announcement Panel ────────────────────────────────────────────────────────
// function AnnouncementPanel({ convo }) {
//   const [showAll, setShowAll] = useState(false);
//   const visibleStaff = showAll ? convo.acknowledgements : convo.acknowledgements?.slice(0, 3);

//   return (
//     <div className="flex flex-col h-full overflow-y-auto px-6 py-5 gap-5">
//       <div className="flex items-start gap-4">
//         <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
//           {convo.icon === "megaphone" && <Megaphone className="w-5 h-5 text-gray-600" />}
//           {convo.icon === "bell"      && <Bell className="w-5 h-5 text-blue-500" />}
//           {convo.icon === "headset"   && <HeadphonesIcon className="w-5 h-5 text-gray-600" />}
//         </div>
//         <div className="flex flex-col gap-0.5">
//           <h3 className="text-lg font-bold text-gray-900">{convo.name}</h3>
//           <p className="text-sm text-gray-500">From: {convo.from}</p>
//           <p className="text-sm text-gray-500">Sent: {convo.sent}</p>
//           <p className="text-sm text-gray-500">Recipients: {convo.recipients}</p>
//         </div>
//       </div>
//       <div className="border border-gray-200 rounded-2xl px-5 py-5 flex flex-col gap-4">
//         <div className="text-sm text-gray-600 leading-relaxed"><MessageText text={convo.body} /></div>
//         {convo.visitsCard && (
//           <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex flex-col gap-2">
//             <p className="text-sm font-bold text-gray-900">Today's Assigned Visits</p>
//             <p className="text-sm text-gray-600">{convo.visitsCard.count} visits scheduled</p>
//             <div className="flex items-center gap-4 text-sm text-gray-700">
//               <span>First visit: <strong>{convo.visitsCard.first}</strong></span>
//               <span className="text-gray-300">|</span>
//               <span>Last visit: <strong>{convo.visitsCard.last}</strong></span>
//             </div>
//           </div>
//         )}
//       </div>
//       {convo.acknowledgements && (
//         <div className="flex flex-col gap-2">
//           <p className="text-sm font-bold text-gray-900">Acknowledgement Status</p>
//           <div className="rounded-xl overflow-hidden border border-gray-100">
//             <div className="grid grid-cols-2 px-4 py-2.5" style={{ backgroundColor: AMBER }}>
//               <p className="text-sm font-bold text-gray-900">Staff</p>
//               <p className="text-sm font-bold text-gray-900">Status</p>
//             </div>
//             {visibleStaff.map((s, i) => (
//               <div key={i} className="grid grid-cols-2 px-4 py-2.5 border-t border-gray-100 bg-white">
//                 <p className="text-sm text-gray-700">{s.name}</p>
//                 <p className={`text-sm font-semibold ${s.status === "Acknowledged" ? "text-green-500" : "text-amber-500"}`}>{s.status}</p>
//               </div>
//             ))}
//             {convo.acknowledgements.length > 3 && (
//               <button onClick={() => setShowAll((v) => !v)} className="w-full py-2.5 text-sm font-semibold text-gray-900 flex items-center justify-center gap-1" style={{ backgroundColor: AMBER }}>
//                 {showAll ? "View less ∧" : "View more ∨"}
//               </button>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// // ── Chat Panel ────────────────────────────────────────────────────────────────
// function ChatPanel({ convo, onSend }) {
//   const [reply, setReply] = useState("");
//   const bottomRef = useRef();

//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [convo.messages]);

//   const handleSend = () => {
//     const text = reply.trim();
//     if (!text) return;
//     onSend(convo.id, text);
//     setReply("");
//   };

//   return (
//     <div className="flex flex-col h-full">
//       <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 flex-shrink-0">
//         <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex-shrink-0 flex items-center justify-center">
//           {convo.avatar ? <img src={convo.avatar} alt={convo.name} className="w-full h-full object-cover" /> : <span className="text-sm font-bold text-gray-500">{convo.name[0]}</span>}
//         </div>
//         <h3 className="text-base font-bold text-gray-900">Chat with {convo.name}</h3>
//       </div>
//       <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-5">
//         {convo.messages.map((msg) => (
//           <div key={msg.id} className={`flex flex-col ${msg.sender === "admin" ? "items-end" : "items-start"}`}>
//             {msg.sender === "admin" ? (
//               <div className="max-w-[80%] bg-white border border-gray-100 rounded-2xl px-4 py-3 shadow-sm">
//                 <p className="text-sm text-gray-700"><MessageText text={msg.text} /></p>
//                 <div className="flex items-center justify-end gap-1 mt-2">
//                   {msg.read && <span className="text-green-500 text-xs">✓</span>}
//                   <p className="text-xs text-gray-400">You • {msg.time}</p>
//                 </div>
//               </div>
//             ) : (
//               <div className="flex items-end gap-2 max-w-[80%]">
//                 <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-gray-200 flex items-center justify-center">
//                   {convo.avatar ? <img src={convo.avatar} alt={convo.name} className="w-full h-full object-cover" /> : <span className="text-xs font-bold text-gray-500">{convo.name[0]}</span>}
//                 </div>
//                 <div className="bg-[#1e2d3d] rounded-2xl px-4 py-3">
//                   <p className="text-sm text-white"><MessageText text={msg.text} /></p>
//                   <p className="text-xs text-gray-400 mt-2">{convo.name} • {msg.time}</p>
//                 </div>
//               </div>
//             )}
//           </div>
//         ))}
//         <div ref={bottomRef} />
//       </div>
//       <div className="px-6 py-4 flex items-center gap-3 border-t border-gray-100 flex-shrink-0">
//         <input type="text" value={reply} onChange={(e) => setReply(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSend()} placeholder="Reply..."
//           className="flex-1 bg-gray-100 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-amber-200 placeholder-gray-400" />
//         <button onClick={handleSend} className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm text-gray-900 hover:opacity-90 transition-colors flex-shrink-0" style={{ backgroundColor: AMBER }}>
//           <Send className="w-4 h-4" />Send
//         </button>
//       </div>
//     </div>
//   );
// }

// // ── Conversation List Item ────────────────────────────────────────────────────
// function ConversationItem({ convo, isActive, onClick, selectMode, isSelected, onToggle }) {
//   return (
//     <div onClick={selectMode ? onToggle : onClick}
//       className={`flex items-center gap-3 p-4 rounded-2xl border cursor-pointer transition-all shadow-md
//                   ${isActive && !selectMode ? "border-amber-400 bg-amber-50" : "border-gray-100 bg-white hover:border-gray-200 hover:bg-gray-50"}
//                   ${selectMode && isSelected ? "border-red-300 bg-red-50" : ""}`}>
//       {selectMode && (
//         <div className={`w-5 h-5 rounded flex-shrink-0 border-2 flex items-center justify-center transition-colors
//                          ${isSelected ? "bg-red-500 border-red-500" : "border-gray-300 bg-white"}`}>
//           {isSelected && <span className="text-white text-xs font-bold leading-none">✓</span>}
//         </div>
//       )}
//       <div className="w-12 h-12 rounded-full flex-shrink-0 overflow-hidden bg-gray-200 flex items-center justify-center">
//         {convo.avatar ? <img src={convo.avatar} alt={convo.name} className="w-full h-full object-cover" />
//           : convo.icon === "megaphone" ? <Megaphone className="w-5 h-5 text-gray-600" />
//           : convo.icon === "bell"      ? <Bell className="w-5 h-5 text-blue-500" />
//           : convo.icon === "headset"   ? <HeadphonesIcon className="w-5 h-5 text-gray-600" />
//           : <span className="text-sm font-bold text-gray-500">{convo.name[0]}</span>}
//       </div>
//       <div className="flex-1 min-w-0">
//         <div className="flex items-center justify-between gap-2">
//           <p className="text-sm font-bold text-gray-900 truncate">{convo.name}</p>
//           <p className="text-xs text-gray-400 flex-shrink-0">{convo.time}</p>
//         </div>
//         <div className="flex items-center justify-between gap-2 mt-0.5">
//           <p className="text-sm text-gray-500 truncate">{convo.lastMessage}</p>
//           {convo.unread && !selectMode && <div className="w-3 h-3 rounded-full bg-green-400 flex-shrink-0" />}
//         </div>
//       </div>
//     </div>
//   );
// }

// // ── Main Page ─────────────────────────────────────────────────────────────────
// export default function MessagesPage({ onNavigate }) {
//   const [conversations, setConversations]                   = useState([]);
//   const [loading, setLoading]                               = useState(true);
//   const [error, setError]                                   = useState(null);
//   const [activeTab, setActiveTab]                           = useState("all");
//   const [activeConvo, setActiveConvo]                       = useState(null);
//   const [search, setSearch]                                 = useState("");
//   const [showChat, setShowChat]                             = useState(false);
//   const [showSendAnnouncement, setShowSendAnnouncement]     = useState(false);
//   const [showVisitDetails, setShowVisitDetails]             = useState(false);
//   const [showReportDetails, setShowReportDetails]           = useState(false);
//   const [showMissedCheckinModal, setShowMissedCheckinModal] = useState(false);
//   const [showReassignModal, setShowReassignModal]           = useState(false);
//   const [showNewMessage, setShowNewMessage]                 = useState(false);
//   const [selectMode, setSelectMode]                         = useState(false);
//   const [selectedIds, setSelectedIds]                       = useState([]);
//   const [showConfirmDelete, setShowConfirmDelete]           = useState(false);

//   const fetchMessages = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await messagesAPI.getAll();
//       const data = response.data?.data ?? response.data ?? [];
//       setConversations(Array.isArray(data) ? data : []);
//     } catch (err) {
//       setError("Failed to load messages. Please try again.");
//       console.error("Messages fetch error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { fetchMessages(); }, []);

//   const tabs = [
//     { key: "all",          label: "All messages",         count: conversations.filter((c) => c.tab === "all" && c.unread).length },
//     { key: "announcement", label: "Announcement history", count: conversations.filter((c) => c.tab === "announcement").length },
//     { key: "notification", label: "Notification history", count: conversations.filter((c) => c.tab === "notification").length },
//   ];

//   const filtered = conversations.filter((c) => {
//     const matchTab = activeTab === "all" ? c.tab === "all" : c.tab === activeTab;
//     const matchSearch = !search || c.name?.toLowerCase().includes(search.toLowerCase());
//     return matchTab && matchSearch;
//   });

//   const handleSelectConvo = (convo) => {
//     setActiveConvo(convo);
//     setShowChat(true);
//     setShowVisitDetails(false);
//     setShowReportDetails(false);
//     setShowMissedCheckinModal(false);
//     setShowReassignModal(false);
//     setConversations((prev) => prev.map((c) => c.id === convo.id ? { ...c, unread: false } : c));
//   };

//   const handleSend = async (convoId, text) => {
//     const newMsg = { id: Date.now(), sender: "admin", text, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), read: false };
//     try {
//       await messagesAPI.send({ conversationId: convoId, message: text });
//     } catch (err) {
//       console.error("Send message error:", err);
//     }
//     setConversations((prev) => prev.map((c) => c.id === convoId ? { ...c, messages: [...(c.messages ?? []), newMsg], lastMessage: text } : c));
//     setActiveConvo((prev) => prev?.id === convoId ? { ...prev, messages: [...(prev.messages ?? []), newMsg] } : prev);
//   };

//   const handleDeleteConvo = () => {
//     setConversations((prev) => prev.filter((c) => !selectedIds.includes(c.id)));
//     setSelectedIds([]);
//     setSelectMode(false);
//     setShowConfirmDelete(false);
//     setActiveConvo(null);
//     setShowChat(false);
//   };

//   const toggleSelect = (id) => {
//     setSelectedIds((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
//   };

//   if (showSendAnnouncement) {
//     return <SendAnnouncementPage onBack={() => setShowSendAnnouncement(false)} />;
//   }

//   if (loading) return (
//     <div className="flex items-center justify-center py-40">
//       <Loader2 className="w-8 h-8 animate-spin text-amber-400" />
//       <span className="ml-3 text-sm text-gray-500">Loading messages...</span>
//     </div>
//   );

//   if (error) return (
//     <div className="flex flex-col items-center justify-center py-40 text-red-400">
//       <p className="text-sm font-medium">{error}</p>
//       <button onClick={fetchMessages}
//         className="mt-3 px-4 py-2 bg-amber-400 text-gray-900 text-sm font-semibold rounded-xl hover:bg-amber-500 transition-colors">
//         Retry
//       </button>
//     </div>
//   );

//   return (
//     <div className="flex flex-col gap-4 px-4 sm:px-6 py-6 max-w-7xl mx-auto w-full h-full">

//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Messages</h1>
//         <div className="flex items-center gap-3">
//           <button onClick={() => setShowNewMessage(true)}
//             className="flex items-center gap-2 px-4 py-2 rounded-xl border border-blue-300
//                        text-sm font-semibold text-blue-500 hover:bg-blue-50 transition-colors">
//             <Plus className="w-4 h-4" />
//             New message
//           </button>
//           <button onClick={() => { setSelectMode((v) => !v); setSelectedIds([]); }}
//             className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-red-50 transition-colors">
//             <Trash2 className="w-5 h-5" style={{ color: "#cc0000" }} />
//           </button>
//           {selectMode && (
//             <>
//               <button onClick={() => { if (selectedIds.length > 0) setShowConfirmDelete(true); }}
//                 disabled={selectedIds.length === 0}
//                 className="flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-colors disabled:opacity-40"
//                 style={{ backgroundColor: "#fde8e8", color: "#cc0000" }}>
//                 <Trash2 className="w-4 h-4" />
//                 Delete{selectedIds.length > 0 ? ` (${selectedIds.length})` : ""}
//               </button>
//               <button onClick={() => { setSelectMode(false); setSelectedIds([]); }}
//                 className="px-4 py-2 rounded-xl font-semibold text-sm border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors">
//                 Cancel
//               </button>
//             </>
//           )}
//         </div>
//       </div>

//       <div className="flex flex-col sm:flex-row sm:items-center gap-3">
//         <div className="flex items-center gap-4 sm:gap-6 flex-1 overflow-x-auto">
//           {tabs.map((tab) => (
//             <button key={tab.key} onClick={() => { setActiveTab(tab.key); setActiveConvo(null); setShowChat(false); }}
//               className={`flex items-center gap-2 pb-2 text-sm font-semibold whitespace-nowrap transition-colors border-b-2 flex-shrink-0
//                           ${activeTab === tab.key ? "border-amber-400 text-gray-900" : "border-transparent text-gray-400 hover:text-gray-600"}`}>
//               {tab.label}
//               {tab.count > 0 && (
//                 <span className="w-5 h-5 rounded-full text-xs font-bold text-gray-900 flex items-center justify-center flex-shrink-0" style={{ backgroundColor: AMBER }}>
//                   {tab.count}
//                 </span>
//               )}
//             </button>
//           ))}
//         </div>
//         <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5 sm:w-64 shadow-sm">
//           <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
//           <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..."
//             className="bg-transparent text-sm text-gray-700 outline-none placeholder-gray-400 w-full" />
//         </div>
//       </div>

//       <div className="flex gap-4 flex-1 min-h-0" style={{ minHeight: "500px" }}>
//         <div className={`flex flex-col gap-3 w-full sm:w-[320px] flex-shrink-0 ${showChat ? "hidden sm:flex" : "flex"}`}>
//           {filtered.length > 0 ? (
//             filtered.map((convo) => (
//               <ConversationItem key={convo.id} convo={convo}
//                 isActive={activeConvo?.id === convo.id}
//                 onClick={() => handleSelectConvo(convo)}
//                 selectMode={selectMode}
//                 isSelected={selectedIds.includes(convo.id)}
//                 onToggle={() => toggleSelect(convo.id)}
//               />
//             ))
//           ) : (
//             <div className="flex items-center justify-center py-20 text-gray-400">
//               <p className="text-sm">No messages found.</p>
//             </div>
//           )}
//         </div>

//         <div className="hidden sm:block w-px bg-gray-200 flex-shrink-0" />

//         <div className={`flex-1 min-w-0 ${showChat ? "flex" : "hidden sm:flex"} flex-col`}>
//           {activeConvo ? (
//             <>
//               <button onClick={() => setShowChat(false)} className="sm:hidden mb-3 text-sm font-semibold text-amber-600 self-start">← Back</button>
//               <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-y-auto" style={{ maxHeight: "calc(100vh - 200px)" }}>
//                 {activeConvo.tab === "notification"
//                   ? <NotificationPanel convo={activeConvo} onNavigate={onNavigate}
//                       setShowVisitDetails={setShowVisitDetails}
//                       setShowReportDetails={setShowReportDetails}
//                       setShowMissedCheckinModal={setShowMissedCheckinModal} />
//                   : activeConvo.tab === "announcement"
//                     ? <AnnouncementPanel convo={activeConvo} />
//                     : <ChatPanel convo={activeConvo} onSend={handleSend} />
//                 }
//               </div>
//             </>
//           ) : (
//             <div className="hidden sm:flex flex-1 items-center justify-center text-gray-300">
//               <p className="text-sm">Select a conversation to start chatting</p>
//             </div>
//           )}
//         </div>
//       </div>

//       <NewMessageModal isOpen={showNewMessage} onClose={() => setShowNewMessage(false)} />

//       {showConfirmDelete && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" onClick={() => setShowConfirmDelete(false)}>
//           <div className="bg-white rounded-2xl shadow-xl w-full max-w-md px-10 py-8 flex flex-col items-center gap-4 text-center" onClick={(e) => e.stopPropagation()}>
//             <h2 className="text-xl font-bold text-gray-900">Confirm Delete</h2>
//             <p className="text-sm text-gray-500 leading-relaxed">Are you sure you want to delete the message?</p>
//             <div className="flex gap-3 w-full mt-2">
//               <button onClick={() => setShowConfirmDelete(false)}
//                 className="flex-1 py-3 rounded-xl border border-red-400 font-medium text-sm text-red-500 hover:bg-red-50 transition-colors">
//                 Cancel
//               </button>
//               <button onClick={handleDeleteConvo}
//                 className="flex-1 py-3 rounded-xl font-semibold text-sm text-white hover:opacity-90 transition-colors"
//                 style={{ backgroundColor: "#cc0000" }}>
//                 Yes, Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <VisitDetailsModal isOpen={showVisitDetails} visit={activeConvo?.visitDetails} onClose={() => setShowVisitDetails(false)} />
//       <MissedCheckInVisitModal isOpen={showMissedCheckinModal} visit={activeConvo?.visitDetails}
//         onClose={() => setShowMissedCheckinModal(false)}
//         onReassign={() => { setShowMissedCheckinModal(false); setShowReassignModal(true); }} />
//       <ReportDetailsModal isOpen={showReportDetails} report={activeConvo?.visitDetails} onClose={() => setShowReportDetails(false)} />
//       <ReassignVisitModal isOpen={showReassignModal} onClose={() => setShowReassignModal(false)} prefillData={activeConvo?.visitDetails ?? {}} />
//     </div>
//   );
// }