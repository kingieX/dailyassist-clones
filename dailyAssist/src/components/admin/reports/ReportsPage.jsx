import { useState } from "react";
import {
  ChevronDown, ChevronLeft, ChevronRight,
  Search, Download, X,
} from "lucide-react";
import { reportsData, staffList, clientList, serviceList } from "../../../data/reportsData";
import CheckInSuccessModal from "../../modals/CheckInSuccessModal";

const AMBER = "#f5c045";
const ROWS_PER_PAGE = 10;

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

// ── Search dropdown ───────────────────────────────────────────────────────────
function SearchDropdown({ label, value, onChange, options }) {
  const [open, setOpen]     = useState(false);
  const [query, setQuery]   = useState("");

  const filtered = options.filter((o) =>
    o.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="relative flex-shrink-0">
      <button
        onClick={() => { setOpen(!open); setQuery(""); }}
        className="flex items-center gap-2 bg-white border border-gray-200
                   text-sm font-medium text-gray-700 px-4 py-2.5 rounded-xl
                   hover:bg-gray-50 transition-colors min-w-[110px]"
      >
        <span className="flex-1 text-left">{value || label}</span>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform
                                  ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute top-12 left-0 z-30 bg-white border border-gray-200
                        rounded-2xl shadow-xl w-56 p-2 flex flex-col gap-1">
          <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2 mb-1">
            <Search className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="bg-transparent text-sm text-gray-700 outline-none w-full placeholder-gray-400"
              autoFocus
            />
          </div>
          <button
            onClick={() => { onChange(""); setOpen(false); }}
            className={`w-full text-left px-4 py-2.5 text-sm rounded-xl transition-colors
                        hover:bg-[#fef9ec] ${!value ? "text-[#e7b343] font-semibold" : "text-gray-500"}`}
          >
            All
          </button>
          {filtered.map((opt) => (
            <button key={opt}
              onClick={() => { onChange(opt); setOpen(false); }}
              className={`w-full text-left px-4 py-2.5 text-sm rounded-xl transition-colors
                          hover:bg-[#fef9ec]
                          ${value === opt ? "text-[#e7b343] font-semibold" : "text-gray-700"}`}>
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Services dropdown ─────────────────────────────────────────────────────────
function ServicesDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative flex-shrink-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-white border border-gray-200
                   text-sm font-medium text-gray-700 px-4 py-2.5 rounded-xl
                   hover:bg-gray-50 transition-colors min-w-[110px]"
      >
        <span className="flex-1 text-left">{value || "Services"}</span>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform
                                  ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute top-12 left-0 z-30 bg-white border border-gray-200
                        rounded-2xl shadow-xl w-60 p-2 flex flex-col gap-1">
          <button onClick={() => { onChange(""); setOpen(false); }}
            className={`w-full text-left px-4 py-2.5 text-sm rounded-xl transition-colors
                        hover:bg-[#fef9ec] ${!value ? "text-[#e7b343] font-semibold" : "text-gray-500"}`}>
            All Services
          </button>
          {serviceList.map((s) => (
            <button key={s}
              onClick={() => { onChange(s); setOpen(false); }}
              className={`w-full text-left px-4 py-2.5 text-sm rounded-xl transition-colors
                          hover:bg-[#fef9ec]
                          ${value === s ? "text-[#e7b343] font-semibold" : "text-gray-700"}`}>
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Date Range dropdown ───────────────────────────────────────────────────────
function DateRangeDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const options = ["Today", "Yesterday", "Last 7 Days", "Last 30 Days", "This Month", "Custom Range"];

  return (
    <div className="relative flex-shrink-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-white border border-gray-200
                   text-sm font-medium text-gray-700 px-4 py-2.5 rounded-xl
                   hover:bg-gray-50 transition-colors min-w-[120px]"
      >
        <span className="flex-1 text-left">{value || "Date Range"}</span>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform
                                  ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute top-12 left-0 z-30 bg-white border border-gray-200
                        rounded-2xl shadow-xl w-52 p-2 flex flex-col gap-1">
          {options.map((opt) => (
            <label key={opt} className="flex items-center justify-between px-4 py-2.5
                                        text-sm text-gray-700 rounded-xl hover:bg-[#fef9ec]
                                        cursor-pointer transition-colors">
              <span className={value === opt ? "text-[#e7b343] font-semibold" : ""}>{opt}</span>
              <input type="checkbox"
                checked={value === opt}
                onChange={() => onChange(value === opt ? "" : opt)}
                className="accent-[#f5c045] w-4 h-4 rounded"
              />
            </label>
          ))}
          <button
            onClick={() => setOpen(false)}
            className="w-full mt-1 py-2.5 rounded-xl font-semibold text-sm text-gray-900
                       transition-colors hover:opacity-90"
            style={{ backgroundColor: AMBER }}
          >
            Done
          </button>
        </div>
      )}
    </div>
  );
}

// ── Report Details Modal ──────────────────────────────────────────────────────
function ReportDetailsModal({ isOpen, report, onClose, onProceedToBookings }) {
  const [reportStatus, setReportStatus] = useState(report?.status ?? "pending");
  const [statusOpen, setStatusOpen]     = useState(false);
  const [reason, setReason]             = useState(report?.reasonForAction ?? "");
  const [showSuccess, setShowSuccess]   = useState(false);

  if (!isOpen || !report) return null;

  const handleSave = () => setShowSuccess(true);

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-start justify-center
                   bg-black/40 px-3 sm:px-6 py-4 sm:py-6 overflow-y-auto"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-auto flex flex-col my-2"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">Report Details</h2>
            <button onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full
                         hover:bg-gray-100 transition-colors">
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Body */}
          <div className="px-6 py-5 flex flex-col gap-4">
            <p className="text-2xl font-bold text-gray-900">{report.client}</p>

            <hr className="border-gray-100" />

            <div className="flex flex-col gap-3">
              {[
                { label: "Address:",     value: report.address },
                { label: "Service type:", value: report.service },
                { label: "Date:",        value: report.fullDate },
                { label: "Start time:",  value: report.startTime },
                { label: "End time:",    value: report.endTime },
                { label: "Assigned to:", value: report.assignedTo },
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
              <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3
                              text-sm text-gray-600 leading-relaxed">
                {report.additionalNote}
              </div>
            </div>

            <hr className="border-gray-100" />

            <div className="flex flex-col gap-2">
              <p className="text-sm font-bold text-gray-900">Change Report Status:</p>
              <div className="relative">
                <button
                  onClick={() => setStatusOpen(!statusOpen)}
                  className="w-full flex items-center justify-between border border-gray-200
                             rounded-xl px-4 py-3 text-sm hover:bg-gray-50 transition-colors"
                >
                  <span className={statusStyles[reportStatus] ?? "text-gray-700"}>
                    {statusLabels[reportStatus] ?? reportStatus}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform
                                           ${statusOpen ? "rotate-180" : ""}`} />
                </button>
                {statusOpen && (
                  <div className="absolute top-12 left-0 z-20 bg-white border border-gray-200
                                  rounded-2xl shadow-lg w-full p-2 flex flex-col gap-1">
                    {statusOptions.map((s) => (
                      <button key={s}
                        onClick={() => { setReportStatus(s); setStatusOpen(false); }}
                        className={`w-full text-left px-4 py-2.5 text-sm rounded-xl
                                    transition-colors hover:bg-[#fef9ec]
                                    ${reportStatus === s
                                      ? "bg-[#fef9ec] font-semibold " + statusStyles[s]
                                      : statusStyles[s]}`}>
                        {statusLabels[s]}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium text-gray-700">Reason for Action:</p>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={3}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3
                           text-sm text-gray-700 outline-none focus:ring-2 focus:ring-amber-200
                           resize-none"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 pb-6 pt-2 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleSave}
              className="flex-1 py-3.5 rounded-xl font-semibold text-sm text-white
                         transition-colors hover:opacity-90"
              style={{ backgroundColor: "#5b8db8" }}
            >
              Save Update
            </button>
            <button
              onClick={onProceedToBookings}
              className="flex-1 py-3.5 rounded-xl font-semibold text-sm text-gray-900
                         transition-colors hover:opacity-90"
              style={{ backgroundColor: AMBER }}
            >
              Proceed to Bookings
            </button>
          </div>
        </div>
      </div>

      <CheckInSuccessModal
        isOpen={showSuccess}
        onClose={() => { setShowSuccess(false); onClose(); }}
        buttonText="Back to Reports"
      />
    </>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function ReportsPage({ onNavigate }) {
  const [staffFilter, setStaffFilter]     = useState("");
  const [clientFilter, setClientFilter]   = useState("");
  const [serviceFilter, setServiceFilter] = useState("");
  const [dateFilter, setDateFilter]       = useState("");
  const [search, setSearch]               = useState("");
  const [page, setPage]                   = useState(1);
  const [selectedReport, setSelectedReport] = useState(null);
  const [csvHovered, setCsvHovered]       = useState(false);
  const [pdfHovered, setPdfHovered]       = useState(false);

  const filtered = reportsData.filter((r) => {
    const matchStaff   = !staffFilter   || r.staff === staffFilter;
    const matchClient  = !clientFilter  || r.client === clientFilter;
    const matchService = !serviceFilter || r.service.includes(serviceFilter.slice(0, 8));
    const matchSearch  = !search ||
      r.staff.toLowerCase().includes(search.toLowerCase()) ||
      r.client.toLowerCase().includes(search.toLowerCase()) ||
      r.service.toLowerCase().includes(search.toLowerCase());
    return matchStaff && matchClient && matchService && matchSearch;
  });

  const totalPages = Math.ceil(filtered.length / ROWS_PER_PAGE);
  const paginated  = filtered.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE);

  const handleExportCSV = () => {
    const headers = ["Date", "Staff", "Client", "Service", "Visit Time", "Status"];
    const rows = filtered.map((r) =>
      [r.date, r.staff, r.client, r.service, r.visitTime, statusLabels[r.status]].join(",")
    );
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href = url; a.download = "reports.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportPDF = () => {
    window.print();
  };

  return (
    <>
      <div className="flex flex-col gap-5 px-4 sm:px-6 py-5 max-w-7xl mx-auto w-full">

        {/* ── Header ── */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Reports</h1>
          <p className="text-sm text-gray-500 mt-1">
            View visit reports submitted by staff after client visits
          </p>
        </div>

        {/* ── Filters row ── */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-wrap">
          <SearchDropdown
            label="Staff"
            value={staffFilter}
            onChange={setStaffFilter}
            options={staffList}
          />
          <SearchDropdown
            label="Client"
            value={clientFilter}
            onChange={setClientFilter}
            options={clientList}
          />
          <ServicesDropdown value={serviceFilter} onChange={setServiceFilter} />
          <DateRangeDropdown value={dateFilter} onChange={setDateFilter} />

          {/* Search */}
          <div className="flex items-center gap-2 bg-white border border-gray-200
                          rounded-xl px-4 py-2.5 flex-1 min-w-[160px] shadow-sm">
            <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="bg-transparent text-sm text-gray-700 outline-none
                         placeholder-gray-400 w-full"
            />
          </div>

          {/* Export buttons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* CSV */}
            <button
              onClick={handleExportCSV}
              onMouseEnter={() => setCsvHovered(true)}
              onMouseLeave={() => setCsvHovered(false)}
              className="flex items-center gap-1.5 rounded-xl font-semibold text-sm
                         text-gray-900 transition-all duration-300 overflow-hidden
                         py-2.5 hover:opacity-90"
              style={{
                backgroundColor: AMBER,
                paddingLeft: "14px",
                paddingRight: "14px",
                width: csvHovered ? "155px" : "90px",
              }}
            >
              <Download className="w-4 h-4 flex-shrink-0" />
              <span
                className="whitespace-nowrap overflow-hidden transition-all duration-300"
                style={{
                  maxWidth: csvHovered ? "110px" : "30px",
                  opacity: 1,
                }}
              >
                {csvHovered ? "Export CSV" : "CSV"}
              </span>
            </button>

            {/* PDF */}
            <button
              onClick={handleExportPDF}
              onMouseEnter={() => setPdfHovered(true)}
              onMouseLeave={() => setPdfHovered(false)}
              className="flex items-center gap-1.5 rounded-xl font-semibold text-sm
                         text-gray-900 transition-all duration-300 overflow-hidden
                         py-2.5 hover:opacity-90"
              style={{
                backgroundColor: AMBER,
                paddingLeft: "14px",
                paddingRight: "14px",
                width: pdfHovered ? "155px" : "90px",
              }}
            >
              <Download className="w-4 h-4 flex-shrink-0" />
              <span
                className="whitespace-nowrap overflow-hidden transition-all duration-300"
                style={{
                  maxWidth: pdfHovered ? "110px" : "30px",
                  opacity: 1,
                }}
              >
                {pdfHovered ? "Export PDF" : "PDF"}
              </span>
            </button>
          </div>
        </div>

        {/* ── Table ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

          {/* Table header */}
          <div className="hidden sm:grid grid-cols-[100px_1fr_1fr_1fr_140px_120px_120px]
                          bg-[#f5c045] px-5 py-4 gap-4">
            <p className="text-sm font-bold text-gray-900">Date</p>
            <p className="text-sm font-bold text-gray-900">Staff</p>
            <p className="text-sm font-bold text-gray-900">Client</p>
            <p className="text-sm font-bold text-gray-900">Services</p>
            <p className="text-sm font-bold text-gray-900">Visit Time</p>
            <p className="text-sm font-bold text-gray-900">Status</p>
            <p className="text-sm font-bold text-gray-900"></p>
          </div>

          {/* Rows */}
          {paginated.length > 0 ? (
            paginated.map((report) => (
              <div
                key={report.id}
                className="hidden sm:grid grid-cols-[100px_1fr_1fr_1fr_140px_120px_120px]
                           px-5 py-4 gap-4 border-b border-gray-100 last:border-0
                           hover:bg-gray-50 transition-colors items-center"
              >
                <p className="text-sm text-gray-700">{report.date}</p>
                <p className="text-sm font-semibold text-gray-800">{report.staff}</p>
                <p className="text-sm text-gray-700">{report.client}</p>
                <p className="text-sm text-gray-700 truncate">{report.service}</p>
                <p className="text-sm text-gray-600">{report.visitTime}</p>
                <p className={`text-sm font-semibold ${statusStyles[report.status] ?? "text-gray-600"}`}>
                  {statusLabels[report.status] ?? report.status}
                </p>
                <button
                  onClick={() => setSelectedReport(report)}
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-white
                             transition-colors hover:opacity-90 w-fit"
                  style={{ backgroundColor: "#5b8db8" }}
                >
                  View report
                </button>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <p className="text-sm font-medium">No reports found</p>
            </div>
          )}

          {/* Mobile cards */}
          <div className="sm:hidden flex flex-col divide-y divide-gray-100">
            {paginated.map((report) => (
              <div key={report.id} className="p-4 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-gray-900">{report.client}</p>
                  <p className={`text-xs font-semibold ${statusStyles[report.status]}`}>
                    {statusLabels[report.status]}
                  </p>
                </div>
                <p className="text-xs text-gray-600">Staff: {report.staff}</p>
                <p className="text-xs text-gray-600">{report.service}</p>
                <p className="text-xs text-gray-500">{report.date} · {report.visitTime}</p>
                <button
                  onClick={() => setSelectedReport(report)}
                  className="self-start px-4 py-2 rounded-xl text-xs font-semibold text-white
                             mt-1 hover:opacity-90"
                  style={{ backgroundColor: "#5b8db8" }}
                >
                  View report
                </button>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 py-5 border-t border-gray-100">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-9 h-9 flex items-center justify-center rounded-xl border
                           border-gray-200 hover:bg-gray-50 disabled:opacity-40 transition-colors"
              >
                <ChevronLeft className="w-4 h-4 text-gray-600" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-9 h-9 flex items-center justify-center rounded-xl text-sm
                              font-medium transition-colors border
                              ${page === p
                                ? "border-amber-400 text-amber-600 bg-[#fef9ec]"
                                : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}
                >
                  {p}
                </button>
              ))}

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="w-9 h-9 flex items-center justify-center rounded-xl border
                           border-gray-200 hover:bg-gray-50 disabled:opacity-40 transition-colors"
              >
                <ChevronRight className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Report Details Modal ── */}
      <ReportDetailsModal
        isOpen={!!selectedReport}
        report={selectedReport}
        onClose={() => setSelectedReport(null)}
        onProceedToBookings={() => {
          setSelectedReport(null);
          if (onNavigate) onNavigate("bookings");
        }}
      />
    </>
  );
}













// import { useState, useEffect } from "react";
// import {
//   ChevronDown, ChevronLeft, ChevronRight,
//   Search, Download, X, Loader2,
// } from "lucide-react";
// import { reportsAPI } from "../../../services/api";
// import CheckInSuccessModal from "../../modals/CheckInSuccessModal";

// const AMBER = "#f5c045";
// const ROWS_PER_PAGE = 10;

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

// // ── Search dropdown ───────────────────────────────────────────────────────────
// function SearchDropdown({ label, value, onChange, options }) {
//   const [open, setOpen]   = useState(false);
//   const [query, setQuery] = useState("");

//   const filtered = options.filter((o) =>
//     o.toLowerCase().includes(query.toLowerCase())
//   );

//   return (
//     <div className="relative flex-shrink-0">
//       <button onClick={() => { setOpen(!open); setQuery(""); }}
//         className="flex items-center gap-2 bg-white border border-gray-200
//                    text-sm font-medium text-gray-700 px-4 py-2.5 rounded-xl
//                    hover:bg-gray-50 transition-colors min-w-[110px]">
//         <span className="flex-1 text-left">{value || label}</span>
//         <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} />
//       </button>
//       {open && (
//         <div className="absolute top-12 left-0 z-30 bg-white border border-gray-200
//                         rounded-2xl shadow-xl w-56 p-2 flex flex-col gap-1">
//           <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2 mb-1">
//             <Search className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
//             <input type="text" value={query} onChange={(e) => setQuery(e.target.value)}
//               placeholder="Search..."
//               className="bg-transparent text-sm text-gray-700 outline-none w-full placeholder-gray-400"
//               autoFocus />
//           </div>
//           <button onClick={() => { onChange(""); setOpen(false); }}
//             className={`w-full text-left px-4 py-2.5 text-sm rounded-xl transition-colors
//                         hover:bg-[#fef9ec] ${!value ? "text-[#e7b343] font-semibold" : "text-gray-500"}`}>
//             All
//           </button>
//           {filtered.map((opt) => (
//             <button key={opt} onClick={() => { onChange(opt); setOpen(false); }}
//               className={`w-full text-left px-4 py-2.5 text-sm rounded-xl transition-colors
//                           hover:bg-[#fef9ec] ${value === opt ? "text-[#e7b343] font-semibold" : "text-gray-700"}`}>
//               {opt}
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// // ── Services dropdown ─────────────────────────────────────────────────────────
// function ServicesDropdown({ value, onChange, options }) {
//   const [open, setOpen] = useState(false);
//   return (
//     <div className="relative flex-shrink-0">
//       <button onClick={() => setOpen(!open)}
//         className="flex items-center gap-2 bg-white border border-gray-200
//                    text-sm font-medium text-gray-700 px-4 py-2.5 rounded-xl
//                    hover:bg-gray-50 transition-colors min-w-[110px]">
//         <span className="flex-1 text-left">{value || "Services"}</span>
//         <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} />
//       </button>
//       {open && (
//         <div className="absolute top-12 left-0 z-30 bg-white border border-gray-200
//                         rounded-2xl shadow-xl w-60 p-2 flex flex-col gap-1">
//           <button onClick={() => { onChange(""); setOpen(false); }}
//             className={`w-full text-left px-4 py-2.5 text-sm rounded-xl transition-colors
//                         hover:bg-[#fef9ec] ${!value ? "text-[#e7b343] font-semibold" : "text-gray-500"}`}>
//             All Services
//           </button>
//           {options.map((s) => (
//             <button key={s} onClick={() => { onChange(s); setOpen(false); }}
//               className={`w-full text-left px-4 py-2.5 text-sm rounded-xl transition-colors
//                           hover:bg-[#fef9ec] ${value === s ? "text-[#e7b343] font-semibold" : "text-gray-700"}`}>
//               {s}
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// // ── Date Range dropdown ───────────────────────────────────────────────────────
// function DateRangeDropdown({ value, onChange }) {
//   const [open, setOpen] = useState(false);
//   const options = ["Today", "Yesterday", "Last 7 Days", "Last 30 Days", "This Month", "Custom Range"];
//   return (
//     <div className="relative flex-shrink-0">
//       <button onClick={() => setOpen(!open)}
//         className="flex items-center gap-2 bg-white border border-gray-200
//                    text-sm font-medium text-gray-700 px-4 py-2.5 rounded-xl
//                    hover:bg-gray-50 transition-colors min-w-[120px]">
//         <span className="flex-1 text-left">{value || "Date Range"}</span>
//         <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} />
//       </button>
//       {open && (
//         <div className="absolute top-12 left-0 z-30 bg-white border border-gray-200
//                         rounded-2xl shadow-xl w-52 p-2 flex flex-col gap-1">
//           {options.map((opt) => (
//             <label key={opt} className="flex items-center justify-between px-4 py-2.5
//                                         text-sm text-gray-700 rounded-xl hover:bg-[#fef9ec]
//                                         cursor-pointer transition-colors">
//               <span className={value === opt ? "text-[#e7b343] font-semibold" : ""}>{opt}</span>
//               <input type="checkbox" checked={value === opt}
//                 onChange={() => onChange(value === opt ? "" : opt)}
//                 className="accent-[#f5c045] w-4 h-4 rounded" />
//             </label>
//           ))}
//           <button onClick={() => setOpen(false)}
//             className="w-full mt-1 py-2.5 rounded-xl font-semibold text-sm text-gray-900
//                        transition-colors hover:opacity-90"
//             style={{ backgroundColor: AMBER }}>
//             Done
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// // ── Report Details Modal ──────────────────────────────────────────────────────
// function ReportDetailsModal({ isOpen, report, onClose, onProceedToBookings }) {
//   const [reportStatus, setReportStatus] = useState(report?.status ?? "pending");
//   const [statusOpen, setStatusOpen]     = useState(false);
//   const [reason, setReason]             = useState(report?.reasonForAction ?? "");
//   const [showSuccess, setShowSuccess]   = useState(false);
//   const [saving, setSaving]             = useState(false);

//   if (!isOpen || !report) return null;

//   const handleSave = async () => {
//     setSaving(true);
//     try {
//       await reportsAPI.update(report.id, { status: reportStatus, reasonForAction: reason });
//     } catch (err) {
//       console.error("Report update error:", err);
//     } finally {
//       setSaving(false);
//       setShowSuccess(true);
//     }
//   };

//   return (
//     <>
//       <div className="fixed inset-0 z-50 flex items-start justify-center
//                      bg-black/40 px-3 sm:px-6 py-4 sm:py-6 overflow-y-auto"
//         onClick={onClose}>
//         <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-auto flex flex-col my-2"
//           onClick={(e) => e.stopPropagation()}>
//           <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
//             <h2 className="text-xl font-bold text-gray-900">Report Details</h2>
//             <button onClick={onClose}
//               className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
//               <X className="w-5 h-5 text-gray-500" />
//             </button>
//           </div>
//           <div className="px-6 py-5 flex flex-col gap-4">
//             <p className="text-2xl font-bold text-gray-900">{report.client}</p>
//             <hr className="border-gray-100" />
//             <div className="flex flex-col gap-3">
//               {[
//                 { label: "Address:",      value: report.address   },
//                 { label: "Service type:", value: report.service   },
//                 { label: "Date:",         value: report.fullDate  },
//                 { label: "Start time:",   value: report.startTime },
//                 { label: "End time:",     value: report.endTime   },
//                 { label: "Assigned to:",  value: report.assignedTo},
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
//               <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-600 leading-relaxed">
//                 {report.additionalNote}
//               </div>
//             </div>
//             <hr className="border-gray-100" />
//             <div className="flex flex-col gap-2">
//               <p className="text-sm font-bold text-gray-900">Change Report Status:</p>
//               <div className="relative">
//                 <button onClick={() => setStatusOpen(!statusOpen)}
//                   className="w-full flex items-center justify-between border border-gray-200
//                              rounded-xl px-4 py-3 text-sm hover:bg-gray-50 transition-colors">
//                   <span className={statusStyles[reportStatus] ?? "text-gray-700"}>
//                     {statusLabels[reportStatus] ?? reportStatus}
//                   </span>
//                   <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${statusOpen ? "rotate-180" : ""}`} />
//                 </button>
//                 {statusOpen && (
//                   <div className="absolute top-12 left-0 z-20 bg-white border border-gray-200
//                                   rounded-2xl shadow-lg w-full p-2 flex flex-col gap-1">
//                     {statusOptions.map((s) => (
//                       <button key={s} onClick={() => { setReportStatus(s); setStatusOpen(false); }}
//                         className={`w-full text-left px-4 py-2.5 text-sm rounded-xl
//                                     transition-colors hover:bg-[#fef9ec]
//                                     ${reportStatus === s ? "bg-[#fef9ec] font-semibold " + statusStyles[s] : statusStyles[s]}`}>
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
//                 className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3
//                            text-sm text-gray-700 outline-none focus:ring-2 focus:ring-amber-200 resize-none" />
//             </div>
//           </div>
//           <div className="px-6 pb-6 pt-2 flex flex-col sm:flex-row gap-3">
//             <button onClick={handleSave} disabled={saving}
//               className="flex-1 py-3.5 rounded-xl font-semibold text-sm text-white
//                          transition-colors hover:opacity-90 disabled:opacity-60"
//               style={{ backgroundColor: "#5b8db8" }}>
//               {saving ? "Saving..." : "Save Update"}
//             </button>
//             <button onClick={onProceedToBookings}
//               className="flex-1 py-3.5 rounded-xl font-semibold text-sm text-gray-900
//                          transition-colors hover:opacity-90"
//               style={{ backgroundColor: AMBER }}>
//               Proceed to Bookings
//             </button>
//           </div>
//         </div>
//       </div>
//       <CheckInSuccessModal
//         isOpen={showSuccess}
//         onClose={() => { setShowSuccess(false); onClose(); }}
//         buttonText="Back to Reports"
//       />
//     </>
//   );
// }

// // ── Main Page ─────────────────────────────────────────────────────────────────
// export default function ReportsPage({ onNavigate }) {
//   const [reportsList, setReportsList]     = useState([]);
//   const [loading, setLoading]             = useState(true);
//   const [error, setError]                 = useState(null);
//   const [staffFilter, setStaffFilter]     = useState("");
//   const [clientFilter, setClientFilter]   = useState("");
//   const [serviceFilter, setServiceFilter] = useState("");
//   const [dateFilter, setDateFilter]       = useState("");
//   const [search, setSearch]               = useState("");
//   const [page, setPage]                   = useState(1);
//   const [selectedReport, setSelectedReport] = useState(null);
//   const [csvHovered, setCsvHovered]       = useState(false);
//   const [pdfHovered, setPdfHovered]       = useState(false);

//   const fetchReports = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await reportsAPI.getAll({ page: 1, limit: 100 });
//       const data = response.data?.data ?? response.data ?? [];
//       setReportsList(Array.isArray(data) ? data : []);
//     } catch (err) {
//       setError("Failed to load reports. Please try again.");
//       console.error("Reports fetch error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { fetchReports(); }, []);

//   // Build dynamic filter options from real data
//   const staffList   = [...new Set(reportsList.map((r) => r.staff).filter(Boolean))];
//   const clientList  = [...new Set(reportsList.map((r) => r.client).filter(Boolean))];
//   const serviceList = [...new Set(reportsList.map((r) => r.service).filter(Boolean))];

//   const filtered = reportsList.filter((r) => {
//     const matchStaff   = !staffFilter   || r.staff === staffFilter;
//     const matchClient  = !clientFilter  || r.client === clientFilter;
//     const matchService = !serviceFilter || r.service?.includes(serviceFilter.slice(0, 8));
//     const matchSearch  = !search ||
//       r.staff?.toLowerCase().includes(search.toLowerCase()) ||
//       r.client?.toLowerCase().includes(search.toLowerCase()) ||
//       r.service?.toLowerCase().includes(search.toLowerCase());
//     return matchStaff && matchClient && matchService && matchSearch;
//   });

//   const totalPages = Math.ceil(filtered.length / ROWS_PER_PAGE);
//   const paginated  = filtered.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE);

//   const handleExportCSV = () => {
//     const headers = ["Date", "Staff", "Client", "Service", "Visit Time", "Status"];
//     const rows = filtered.map((r) =>
//       [r.date, r.staff, r.client, r.service, r.visitTime, statusLabels[r.status]].join(",")
//     );
//     const csv = [headers.join(","), ...rows].join("\n");
//     const blob = new Blob([csv], { type: "text/csv" });
//     const url  = URL.createObjectURL(blob);
//     const a    = document.createElement("a");
//     a.href = url; a.download = "reports.csv"; a.click();
//     URL.revokeObjectURL(url);
//   };

//   const handleExportPDF = () => window.print();

//   return (
//     <>
//       <div className="flex flex-col gap-5 px-4 sm:px-6 py-5 max-w-7xl mx-auto w-full">

//         <div>
//           <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Reports</h1>
//           <p className="text-sm text-gray-500 mt-1">View visit reports submitted by staff after client visits</p>
//         </div>

//         {/* Filters */}
//         <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-wrap">
//           <SearchDropdown label="Staff"  value={staffFilter}  onChange={setStaffFilter}  options={staffList}  />
//           <SearchDropdown label="Client" value={clientFilter} onChange={setClientFilter} options={clientList} />
//           <ServicesDropdown value={serviceFilter} onChange={setServiceFilter} options={serviceList} />
//           <DateRangeDropdown value={dateFilter} onChange={setDateFilter} />
//           <div className="flex items-center gap-2 bg-white border border-gray-200
//                           rounded-xl px-4 py-2.5 flex-1 min-w-[160px] shadow-sm">
//             <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
//             <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
//               placeholder="Search..."
//               className="bg-transparent text-sm text-gray-700 outline-none placeholder-gray-400 w-full" />
//           </div>
//           <div className="flex items-center gap-2 flex-shrink-0">
//             <button onClick={handleExportCSV}
//               onMouseEnter={() => setCsvHovered(true)}
//               onMouseLeave={() => setCsvHovered(false)}
//               className="flex items-center gap-1.5 rounded-xl font-semibold text-sm
//                          text-gray-900 transition-all duration-300 overflow-hidden py-2.5 hover:opacity-90"
//               style={{ backgroundColor: AMBER, paddingLeft: "14px", paddingRight: "14px", width: csvHovered ? "155px" : "90px" }}>
//               <Download className="w-4 h-4 flex-shrink-0" />
//               <span className="whitespace-nowrap overflow-hidden transition-all duration-300"
//                 style={{ maxWidth: csvHovered ? "110px" : "30px" }}>
//                 {csvHovered ? "Export CSV" : "CSV"}
//               </span>
//             </button>
//             <button onClick={handleExportPDF}
//               onMouseEnter={() => setPdfHovered(true)}
//               onMouseLeave={() => setPdfHovered(false)}
//               className="flex items-center gap-1.5 rounded-xl font-semibold text-sm
//                          text-gray-900 transition-all duration-300 overflow-hidden py-2.5 hover:opacity-90"
//               style={{ backgroundColor: AMBER, paddingLeft: "14px", paddingRight: "14px", width: pdfHovered ? "155px" : "90px" }}>
//               <Download className="w-4 h-4 flex-shrink-0" />
//               <span className="whitespace-nowrap overflow-hidden transition-all duration-300"
//                 style={{ maxWidth: pdfHovered ? "110px" : "30px" }}>
//                 {pdfHovered ? "Export PDF" : "PDF"}
//               </span>
//             </button>
//           </div>
//         </div>

//         {/* Loading */}
//         {loading && (
//           <div className="flex items-center justify-center py-20">
//             <Loader2 className="w-8 h-8 animate-spin text-amber-400" />
//             <span className="ml-3 text-sm text-gray-500">Loading reports...</span>
//           </div>
//         )}

//         {/* Error */}
//         {error && !loading && (
//           <div className="flex flex-col items-center justify-center py-20 text-red-400">
//             <p className="text-sm font-medium">{error}</p>
//             <button onClick={fetchReports}
//               className="mt-3 px-4 py-2 bg-amber-400 text-gray-900 text-sm font-semibold rounded-xl hover:bg-amber-500 transition-colors">
//               Retry
//             </button>
//           </div>
//         )}

//         {/* Table */}
//         {!loading && !error && (
//           <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
//             <div className="hidden sm:grid grid-cols-[100px_1fr_1fr_1fr_140px_120px_120px]
//                             bg-[#f5c045] px-5 py-4 gap-4">
//               {["Date","Staff","Client","Services","Visit Time","Status",""].map((h) => (
//                 <p key={h} className="text-sm font-bold text-gray-900">{h}</p>
//               ))}
//             </div>

//             {paginated.length > 0 ? (
//               paginated.map((report) => (
//                 <div key={report.id}
//                   className="hidden sm:grid grid-cols-[100px_1fr_1fr_1fr_140px_120px_120px]
//                              px-5 py-4 gap-4 border-b border-gray-100 last:border-0
//                              hover:bg-gray-50 transition-colors items-center">
//                   <p className="text-sm text-gray-700">{report.date}</p>
//                   <p className="text-sm font-semibold text-gray-800">{report.staff}</p>
//                   <p className="text-sm text-gray-700">{report.client}</p>
//                   <p className="text-sm text-gray-700 truncate">{report.service}</p>
//                   <p className="text-sm text-gray-600">{report.visitTime}</p>
//                   <p className={`text-sm font-semibold ${statusStyles[report.status] ?? "text-gray-600"}`}>
//                     {statusLabels[report.status] ?? report.status}
//                   </p>
//                   <button onClick={() => setSelectedReport(report)}
//                     className="px-4 py-2 rounded-xl text-sm font-semibold text-white
//                                transition-colors hover:opacity-90 w-fit"
//                     style={{ backgroundColor: "#5b8db8" }}>
//                     View report
//                   </button>
//                 </div>
//               ))
//             ) : (
//               <div className="flex flex-col items-center justify-center py-20 text-gray-400">
//                 <p className="text-sm font-medium">No reports found</p>
//               </div>
//             )}

//             {/* Mobile cards */}
//             <div className="sm:hidden flex flex-col divide-y divide-gray-100">
//               {paginated.map((report) => (
//                 <div key={report.id} className="p-4 flex flex-col gap-2">
//                   <div className="flex items-center justify-between">
//                     <p className="text-sm font-bold text-gray-900">{report.client}</p>
//                     <p className={`text-xs font-semibold ${statusStyles[report.status]}`}>
//                       {statusLabels[report.status]}
//                     </p>
//                   </div>
//                   <p className="text-xs text-gray-600">Staff: {report.staff}</p>
//                   <p className="text-xs text-gray-600">{report.service}</p>
//                   <p className="text-xs text-gray-500">{report.date} · {report.visitTime}</p>
//                   <button onClick={() => setSelectedReport(report)}
//                     className="self-start px-4 py-2 rounded-xl text-xs font-semibold text-white mt-1 hover:opacity-90"
//                     style={{ backgroundColor: "#5b8db8" }}>
//                     View report
//                   </button>
//                 </div>
//               ))}
//             </div>

//             {/* Pagination */}
//             {totalPages > 1 && (
//               <div className="flex items-center justify-center gap-2 py-5 border-t border-gray-100">
//                 <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
//                   className="w-9 h-9 flex items-center justify-center rounded-xl border
//                              border-gray-200 hover:bg-gray-50 disabled:opacity-40 transition-colors">
//                   <ChevronLeft className="w-4 h-4 text-gray-600" />
//                 </button>
//                 {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
//                   <button key={p} onClick={() => setPage(p)}
//                     className={`w-9 h-9 flex items-center justify-center rounded-xl text-sm
//                                 font-medium transition-colors border
//                                 ${page === p ? "border-amber-400 text-amber-600 bg-[#fef9ec]" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
//                     {p}
//                   </button>
//                 ))}
//                 <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
//                   className="w-9 h-9 flex items-center justify-center rounded-xl border
//                              border-gray-200 hover:bg-gray-50 disabled:opacity-40 transition-colors">
//                   <ChevronRight className="w-4 h-4 text-gray-600" />
//                 </button>
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       <ReportDetailsModal
//         isOpen={!!selectedReport}
//         report={selectedReport}
//         onClose={() => setSelectedReport(null)}
//         onProceedToBookings={() => {
//           setSelectedReport(null);
//           if (onNavigate) onNavigate("bookings");
//         }}
//       />
//     </>
//   );
// }