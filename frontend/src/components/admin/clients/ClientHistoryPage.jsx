import { useState } from "react";
import { ArrowLeft, MoreVertical, X } from "lucide-react";
import VisitLogModal from "../../modals/VisitLogModal";
import CheckInSuccessModal from "../../modals/CheckInSuccessModal";

// ── Visit Row ─────────────────────────────────────────────────────────────────
function VisitRow({ visit, onViewLog, onDelete }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const statusStyles = {
    completed: "bg-green-50 border border-green-200 text-green-600",
    pending:   "bg-amber-50 border border-amber-200 text-amber-600",
    cancelled: "bg-red-50 border border-red-200 text-red-500",
  };

  const statusLabel = {
    completed: "Completed",
    pending:   "Pending",
    cancelled: "Cancelled",
  };

  return (
    <div className="flex items-center justify-between px-5 py-4
                    border-b border-gray-100 last:border-0
                    hover:bg-gray-50 transition-colors">

      {/* Left: staff name + date */}
      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900">{visit.staffName}</p>
        <p className="text-xs text-gray-500">{visit.date}</p>
      </div>

      {/* Right: status badge + 3-dot menu */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <span className={`text-xs font-semibold px-4 py-1.5 rounded-lg
                          ${statusStyles[visit.status] ?? statusStyles.completed}`}>
          {statusLabel[visit.status] ?? "Completed"}
        </span>

        {/* 3-dot menu */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-7 h-7 flex items-center justify-center rounded-lg
                       hover:bg-gray-100 transition-colors"
          >
            <MoreVertical className="w-4 h-4 text-gray-400" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-8 z-30 bg-white rounded-2xl
                            shadow-xl border border-gray-100 p-2 w-44 flex flex-col gap-1">
              <div className="flex justify-end mb-1">
                <button
                  onClick={() => setMenuOpen(false)}
                  className="w-5 h-5 rounded-full bg-gray-100 flex items-center
                             justify-center hover:bg-gray-200 transition-colors"
                >
                  <X className="w-3 h-3 text-gray-500" />
                </button>
              </div>
              <button
                onClick={() => { setMenuOpen(false); onViewLog(visit); }}
                className="w-full text-left text-xs font-semibold text-white
                           bg-green-500 hover:bg-green-600 px-3 py-2 rounded-xl transition-colors"
              >
                View log sheet
              </button>
              <button
                onClick={() => { setMenuOpen(false); onDelete(visit); }}
                className="w-full text-left text-xs font-semibold text-white
                           bg-red-400 hover:bg-red-500 px-3 py-2 rounded-xl transition-colors"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Delete Confirm Modal ──────────────────────────────────────────────────────
function DeleteVisitModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40"
      style={{ padding: "16px" }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl text-center"
        style={{ width: "100%", maxWidth: "480px", padding: "40px 32px 32px 32px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#111827", marginBottom: "16px" }}>
          Delete this record?
        </h2>
        <p style={{ fontSize: "14px", color: "#6B7280", lineHeight: "1.6", marginBottom: "28px" }}>
          This action will permanently remove this visit record from Daily Assist.
          This cannot be undone.
        </p>
        <div style={{ display: "flex", gap: "12px", width: "100%" }}>
          <button onClick={onClose}
            style={{ flex: 1, padding: "14px 0", borderRadius: "12px",
                     border: "2px solid #EF4444", background: "white",
                     color: "#EF4444", fontWeight: "600", fontSize: "14px", cursor: "pointer" }}>
            Cancel
          </button>
          <button onClick={onConfirm}
            style={{ flex: 1, padding: "14px 0", borderRadius: "12px",
                     border: "none", background: "#EF4444", color: "white",
                     fontWeight: "600", fontSize: "14px", cursor: "pointer" }}>
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function ClientHistoryPage({ client, onBack }) {
  const history = client?.visitationHistory ?? [];

  const [logVisit, setLogVisit]               = useState(null);
  const [deleteVisit, setDeleteVisit]         = useState(null);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);

  const handleDeleteConfirm = () => {
    setDeleteVisit(null);
    setTimeout(() => setShowDeleteSuccess(true), 300);
  };

  return (
    <>
      <div className="flex flex-col gap-6 px-4 sm:px-6 py-5 max-w-4xl mx-auto w-full">

        {/* ── Header ── */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-800 font-bold text-lg
                     hover:text-gray-600 transition-colors w-fit"
        >
          <ArrowLeft className="w-5 h-5" />
          Client's history
        </button>

        {/* ── History list ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {history.length > 0 ? (
            history.map((visit) => (
              <VisitRow
                key={visit.id}
                visit={visit}
                onViewLog={setLogVisit}
                onDelete={setDeleteVisit}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <p className="text-sm font-medium">No visitation history found</p>
            </div>
          )}
        </div>
      </div>

      {/* ── Visit Log Modal ── */}
      <VisitLogModal
        isOpen={!!logVisit}
        onClose={() => setLogVisit(null)}
        visit={{
          clientName: client?.fullName  ?? "",
          address:    client?.address   ?? "",
          timeStart:  logVisit?.timeStart ?? "1:05pm",
          timeEnd:    logVisit?.timeEnd   ?? "2:05pm",
        }}
        worker={{ name: logVisit?.staffName ?? "" }}
      />

      {/* ── Delete Confirm Modal ── */}
      <DeleteVisitModal
        isOpen={!!deleteVisit}
        onClose={() => setDeleteVisit(null)}
        onConfirm={handleDeleteConfirm}
      />

      {/* ── Delete Success Modal ── */}
      <CheckInSuccessModal
        isOpen={showDeleteSuccess}
        onClose={() => setShowDeleteSuccess(false)}
        buttonText="Back to History"
      />
    </>
  );
}