
// import { useState } from "react";
// import { Search, SlidersHorizontal, Calendar, LayoutGrid, List, MoreVertical, X } from "lucide-react";
// import StaffCard from "./StaffCard";
// import { staffData } from "../../../data/staffData";
// import AssignVisitModal from "../modals/AssignVisitModal";
// import ReassignVisitModal from "../modals/ReassignVisitModal";

// export default function VisitsSection() {
//   const [search, setSearch] = useState("");
//   const [layout, setLayout] = useState("grid");
//   const [filterOpen, setFilterOpen] = useState(false);
//   const [filters, setFilters] = useState([]);
//  const [openMenu, setOpenMenu] = useState(null);
//   const [selectedStaff, setSelectedStaff] = useState(null);
//   const [showAssignVisit, setShowAssignVisit] = useState(false);
//   const [editStaff, setEditStaff] = useState(null);

//   const toggleFilter = (option) => {
//     setFilters(prev =>
//       prev.includes(option) ? prev.filter(f => f !== option) : [...prev, option]
//     );
//   };

//   const filtered = staffData.filter((s) =>
//     s.name.toLowerCase().includes(search.toLowerCase()) ||
//     s.id.toLowerCase().includes(search.toLowerCase()) ||
//     s.email.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
  
//     <div className="flex flex-col gap-5 px-4 sm:px-6 py-5 max-w-7xl mx-auto w-full">

//       {/* ── Page header ── */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
//           Visits &amp; Schedules
//         </h1>

//         <div className="flex items-center gap-3">
//           {/* Layout toggles */}
//           <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-xl p-1 shadow-sm">
//             <button
//               onClick={() => setLayout("grid")}
//               className={`p-2 rounded-lg transition-all duration-200
//                 ${layout === "grid" ? "bg-[#fef9ec] text-[#e7b343] shadow-sm" : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"}`}
//             >
//               <LayoutGrid className="w-5 h-5" />
//             </button>
//             <button
//               onClick={() => setLayout("list")}
//               className={`p-2 rounded-lg transition-all duration-200
//                 ${layout === "list" ? "bg-[#fef9ec] text-[#e7b343] shadow-sm" : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"}`}
//             >
//               <List className="w-5 h-5" />
//             </button>
//           </div>

//           {/* Assign Visit button */}
//           <button
//             onClick={() => setShowAssignVisit(true)}
//             className="flex items-center gap-2 border border-blue-400
//                        text-blue-500 text-sm font-medium px-4 py-2
//                        rounded-xl hover:bg-blue-50 transition-colors">
//             <Calendar className="w-4 h-4" />
//             Assign Visit
//           </button>

//           <AssignVisitModal
//             isOpen={showAssignVisit}
//             onClose={() => setShowAssignVisit(false)}
//           />
//         </div>
//       </div>

//       {/* ── Filter + Search row ── */}
//       <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">

//         {/* Filter by dropdown */}
//         <div className="relative flex-shrink-0">
//           <button
//             onClick={() => setFilterOpen(!filterOpen)}
//             className="flex items-center gap-2 bg-white border border-gray-200
//                        text-sm font-medium text-gray-700 px-4 py-2.5
//                        rounded-xl hover:bg-gray-50 transition-colors"
//           >
//             <SlidersHorizontal className="w-4 h-4 text-gray-400" />
//             Filter by
//             <svg className={`w-3 h-3 text-gray-400 transition-transform ${filterOpen ? "rotate-180" : ""}`}
//                  fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
//             </svg>
//           </button>

//           {filterOpen && (
//             <div className="absolute top-12 left-0 z-20 bg-white border border-gray-200
//                             rounded-2xl shadow-lg w-48 p-4 flex flex-col gap-3">
//               <p className="text-sm font-semibold text-gray-800">Filter by</p>
//               {["Name", "Available", "Unavailable", "Car owners"].map((option) => (
//                 <label key={option} className="flex items-center gap-3 text-sm text-gray-600 cursor-pointer hover:text-gray-900">
//                   <input
//                     type="checkbox"
//                     checked={filters.includes(option)}
//                     onChange={() => toggleFilter(option)}
//                     className="w-4 h-4 rounded border-gray-300 accent-[#f5c045]"
//                   />
//                   {option}
//                 </label>
//               ))}
//               <button
//                 onClick={() => setFilterOpen(false)}
//                 className="w-full bg-[#f5c045] hover:bg-[#e8b030] text-gray-900
//                            text-sm font-semibold py-2 rounded-xl mt-1 transition-colors"
//               >
//                 Done
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Search bar */}
//         <div className="flex items-center gap-2 bg-white border border-gray-200
//                         rounded-xl px-4 py-2.5 flex-1 shadow-sm">
//           <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
//           <input
//             type="text"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             placeholder="Search for a staff by name, staff id or email..."
//             className="bg-transparent text-sm text-gray-700 outline-none placeholder-gray-400 w-full"
//           />
//         </div>
//       </div>

//       {/* ── Staff Grid ── */}
//       {layout === "grid" ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
//           {filtered.map((staff, i) => (
//             <StaffCard key={`${staff.id}-${i}`} staff={staff} />
//           ))}
//         </div>

//       ) : (
//         /* List layout */
//         <div className="flex gap-4">

//           {/* Left: list of rows */}
//           <div className="flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex-1">
//             {filtered.map((staff, i) => {
//               const isAvailable = staff.status === "available";
//               const initials = staff.name.split(" ").map(n => n[0]).join("");
//               const avatarColors = ["bg-amber-200", "bg-blue-200"];
//               return (
//                 <div
//                   key={`${staff.id}-${i}`}
//                   onClick={() => setSelectedStaff(staff)}
//                   className={`flex items-center gap-4 px-5 py-4 border-b border-gray-100
//                               last:border-0 hover:bg-gray-50 transition-colors cursor-pointer
//                               ${selectedStaff === staff ? "bg-[#fef9ec]" : ""}`}
//                 >
//                   {/* Avatar */}
//                   <div className={`w-10 h-10 rounded-full flex items-center justify-center
//                                    font-bold text-sm text-gray-700 flex-shrink-0
//                                    ${avatarColors[i % avatarColors.length]}`}>
//                     {staff.photo
//                       ? <img src={staff.photo} alt={staff.name} className="w-full h-full rounded-full object-cover"/>
//                       : initials
//                     }
//                   </div>

//                   {/* Name + ID */}
//                   <div className="flex flex-col flex-1 min-w-0">
//                     <p className="text-sm font-semibold text-gray-900">{staff.name}</p>
//                     <p className="text-xs text-gray-500">
//                       Staff ID: <span className="font-bold text-gray-700">{staff.id}</span>
//                     </p>
//                   </div>

//                   {/* Status badge */}
//                   <span className={`text-xs font-semibold px-4 py-1.5 rounded-lg border flex-shrink-0
//                                     ${isAvailable
//                                       ? "border-green-300 text-green-600 bg-green-50"
//                                       : "border-red-300 text-red-500 bg-red-50"
//                                     }`}>
//                     {isAvailable ? "Available" : "Unavailable"}
//                   </span>

//                   {/* 3 dots menu */}
//                   <div className="relative flex-shrink-0" onClick={(e) => e.stopPropagation()}>
//                     <button
//                       onClick={() => setOpenMenu(openMenu === i ? null : i)}
//                       className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
//                     >
//                       <MoreVertical className="w-4 h-4 text-gray-400" />
//                     </button>

//                     {openMenu === i && (
//                       <div className="absolute right-0 top-8 z-30 bg-white rounded-2xl
//                                       shadow-xl border border-gray-100 p-2 w-44 flex flex-col gap-1">
//                         <div className="flex justify-end mb-1">
//                           <button
//                             onClick={() => setOpenMenu(null)}
//                             className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
//                           >
//                             <X className="w-3 h-3 text-gray-500" />
//                           </button>
//                         </div>
//                         <button onClick={() => { setOpenMenu(null); setEditStaff(staff); }}
//                                 className="w-full text-left text-xs font-semibold text-white bg-blue-400 hover:bg-blue-500 px-3 py-2 rounded-xl transition-colors">
//                           Edit visit details
//                         </button>
//                         <button onClick={() => { setOpenMenu(null); setEditStaff({ ...staff, reassign: true }); }}
//                                 className="w-full text-left text-xs font-semibold text-white bg-green-500 hover:bg-green-600 px-3 py-2 rounded-xl transition-colors">
//                           Reassign visit
//                         </button>
//                         <button onClick={() => setOpenMenu(null)}
//                                 className="w-full text-left text-xs font-semibold text-white bg-red-400 hover:bg-red-500 px-3 py-2 rounded-xl transition-colors">
//                           Cancel visit
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           {/* Right: selected staff card */}
//           {selectedStaff && (
//             <div className="w-64 flex-shrink-0">
//               <StaffCard staff={selectedStaff} />
//             </div>
//           )}
//         </div>
//       )}

//      {/* Empty state */}
//       {filtered.length === 0 && (
//         <div className="flex flex-col items-center justify-center py-20 text-gray-400">
//           <Search className="w-10 h-10 mb-3 opacity-30" />
//           <p className="text-sm font-medium">No staff found matching your search</p>
//         </div>
//       )}

     
//     <AssignVisitModal
//         isOpen={!!editStaff && !editStaff.reassign}
//         onClose={() => setEditStaff(null)}
//         editMode={true}
//         prefillData={{
//           clientName: editStaff?.name ?? "",
//           address: "1 Church Street, Canvey Island, Essex",
//           staff: editStaff?.name ?? "",
//         }}
//       />

//       <ReassignVisitModal
//         isOpen={!!editStaff && !!editStaff.reassign}
//         onClose={() => setEditStaff(null)}
//         prefillData={{
//           clientName: editStaff?.name ?? "",
//           address: "1 Church Street, Canvey Island, Essex",
//           staff: editStaff?.name ?? "",
//         }}
//       />
//     </div>
//   );
// }










import { useState, useEffect } from "react";
import { Search, SlidersHorizontal, Calendar, LayoutGrid, List, MoreVertical, X, Loader2 } from "lucide-react";
import StaffCard from "./StaffCard";
import { staffData } from "../../../data/staffData";
import { staffAPI, visitsAPI } from "../../../services/api";
import AssignVisitModal from "../modals/AssignVisitModal";
import ReassignVisitModal from "../modals/ReassignVisitModal";

// ─────────────────────────────────────────────────────────────────────────────
// Backend → UI value mappers
// ─────────────────────────────────────────────────────────────────────────────
// Backend uses ACTIVE / INACTIVE / SUSPENDED for staff status.
// UI uses "available" / "unavailable". Map between them here, in one spot, so
// the rest of the UI can stay simple. If the backend ever adds a new status,
// only this function changes.
function mapStaffStatus(backendStatus) {
  if (!backendStatus) return "available";
  if (backendStatus === "ACTIVE") return "available";
  return "unavailable"; // INACTIVE, SUSPENDED, anything else
}

// Backend uses ASSIGNED / ACKNOWLEDGED / IN_PROGRESS / COMPLETED / CANCELLED / NO_SHOW
// UI uses "completed" / "in-progress" / "late" / "not-started"
function mapVisitStatus(backendStatus) {
  if (!backendStatus) return "not-started";
  if (backendStatus === "COMPLETED")   return "completed";
  if (backendStatus === "IN_PROGRESS") return "in-progress";
  if (backendStatus === "CANCELLED" || backendStatus === "NO_SHOW") return "late";
  return "not-started"; // ASSIGNED, ACKNOWLEDGED
}

// Format a backend ISO datetime range into a friendly "9:00am - 10:00am" string
function formatVisitTime(start, end) {
  if (!start || !end) return "--";
  try {
    const opts = { hour: "numeric", minute: "2-digit", hour12: true };
    const s = new Date(start).toLocaleTimeString([], opts).replace(" ", "").toLowerCase();
    const e = new Date(end).toLocaleTimeString([],   opts).replace(" ", "").toLowerCase();
    return `${s} - ${e}`;
  } catch {
    return "--";
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Normalisers
// ─────────────────────────────────────────────────────────────────────────────
// Backend payloads can be nested in different ways depending on pagination
// settings. Unwrap them safely so the rest of the code always sees a plain array.
function unwrapList(response) {
  const root = response?.data;
  if (!root) return [];
  // Possible shapes:
  //   { data: { items: [...], meta: {...} } }  (new paginated)
  //   { data: [...] }                          (flat)
  //   [...]                                    (raw)
  if (Array.isArray(root)) return root;
  if (Array.isArray(root.data)) return root.data;
  if (Array.isArray(root.data?.items)) return root.data.items;
  if (Array.isArray(root.items)) return root.items;
  return [];
}

// Convert one backend visit object into the UI's task shape
function visitToTask(visit) {
  return {
    id:          visit.id,
    visitId:     visit.id,             // explicit pointer to the backend visit
    bookingId:   visit.bookingId,
    staffId:     visit.staffId,
    client:      visit.booking?.clientName ?? visit.client?.name ?? "Client",
    address:     visit.booking?.address    ?? visit.client?.address ?? "--",
    serviceType: visit.booking?.serviceType ?? visit.serviceType ?? "--",
    time:        formatVisitTime(visit.scheduledStartAt, visit.scheduledEndAt),
    status:      mapVisitStatus(visit.status),
    notes:       visit.adminNotes ?? visit.staffNotes ?? "",
    raw:         visit, // keep the original for later edit/reassign/cancel calls
  };
}

// Convert one backend staff object + its assigned visits into the UI's staff shape
function staffToCard(staff, visitsForThisStaff) {
  const tasks = visitsForThisStaff.map(visitToTask);
  const tasksDone  = tasks.filter((t) => t.status === "completed").length;
  const tasksTotal = tasks.length;

  return {
    id:               staff.staffCode ?? staff.id,
    backendId:        staff.id,        // keep the UUID for later API calls
    name:             [staff.firstName, staff.lastName].filter(Boolean).join(" ") || staff.name || staff.email || "Staff",
    status:           mapStaffStatus(staff.status),
    phone:            staff.phone ?? "--",
    email:            staff.email ?? "--",
    photo:            staff.photo ?? staff.avatarUrl ?? null,
    avatar:           null,
    role:             staff.staffRoleLabel ?? staff.role ?? "Support Worker",
    ownsCar:          staff.ownsCar ?? false,
    trainingUpToDate: staff.trainingUpToDate ?? false,
    milesCovered:     staff.milesCovered ?? "0 miles",
    tasksDone,
    tasksTotal,
    tasks,
  };
}

export default function VisitsSection() {
  // ── Page-level state ──────────────────────────────────────────────────────
  const [staffList, setStaffList]           = useState([]);
  const [loading, setLoading]               = useState(true);
  const [usingFallback, setUsingFallback]   = useState(false); // for dev visibility

  const [search, setSearch]                 = useState("");
  const [layout, setLayout]                 = useState("grid");
  const [filterOpen, setFilterOpen]         = useState(false);
  const [filters, setFilters]               = useState([]);
  const [openMenu, setOpenMenu]             = useState(null);
  const [selectedStaff, setSelectedStaff]   = useState(null);
  const [showAssignVisit, setShowAssignVisit] = useState(false);
  const [editStaff, setEditStaff]           = useState(null);

  // ── Data fetch on mount ───────────────────────────────────────────────────
  // Try real backend first. If staff OR visits fails, silently fall back to
  // the mock staffData so the page never looks broken to the admin.
  // Once the backend is stable, remove the catch fallback below.
  useEffect(() => {
    let cancelled = false;

    const loadFromAPI = async () => {
      setLoading(true);

      // Fire both requests in parallel using allSettled so one failure
      // doesn't kill the other.
      const [staffRes, visitsRes] = await Promise.allSettled([
        staffAPI.getAll(),
        visitsAPI.getAll({ page: 1, limit: 100 }),
      ]);

      // If either failed, take the fallback path
      if (staffRes.status !== "fulfilled" || visitsRes.status !== "fulfilled") {
        console.warn(
          "[VisitsSection] Falling back to mock staffData. Reasons:",
          { staff: staffRes.reason?.message, visits: visitsRes.reason?.message }
        );
        if (!cancelled) {
          setStaffList(staffData);
          setUsingFallback(true);
          setLoading(false);
        }
        return;
      }

      // Both succeeded, stitch them together
      const realStaff  = unwrapList(staffRes.value);
      const realVisits = unwrapList(visitsRes.value);

      const built = realStaff.map((s) => {
        const visitsForThisStaff = realVisits.filter((v) => v.staffId === s.id);
        return staffToCard(s, visitsForThisStaff);
      });

      if (!cancelled) {
        setStaffList(built);
        setUsingFallback(false);
        setLoading(false);
      }
    };

    loadFromAPI();

    return () => { cancelled = true; };
  }, []);

  // ── UI helpers ────────────────────────────────────────────────────────────
  const toggleFilter = (option) => {
    setFilters((prev) =>
      prev.includes(option) ? prev.filter((f) => f !== option) : [...prev, option]
    );
  };

  const filtered = staffList.filter((s) => {
    const matchesSearch =
      (s.name  ?? "").toLowerCase().includes(search.toLowerCase()) ||
      (s.id    ?? "").toString().toLowerCase().includes(search.toLowerCase()) ||
      (s.email ?? "").toLowerCase().includes(search.toLowerCase());

    if (filters.length === 0) return matchesSearch;

    const matchesFilter = filters.some((f) => {
      if (f === "Available")   return s.status === "available";
      if (f === "Unavailable") return s.status === "unavailable";
      if (f === "Car owners")  return s.ownsCar === true;
      if (f === "Name")        return true; // sort placeholder, treat as no-op
      return true;
    });

    return matchesSearch && matchesFilter;
  });

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col gap-5 px-4 sm:px-6 py-5 max-w-7xl mx-auto w-full">

      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
          Visits &amp; Schedules
        </h1>

        <div className="flex items-center gap-3">
          {/* Layout toggles */}
          <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-xl p-1 shadow-sm">
            <button
              onClick={() => setLayout("grid")}
              className={`p-2 rounded-lg transition-all duration-200
                ${layout === "grid" ? "bg-[#fef9ec] text-[#e7b343] shadow-sm" : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"}`}
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setLayout("list")}
              className={`p-2 rounded-lg transition-all duration-200
                ${layout === "list" ? "bg-[#fef9ec] text-[#e7b343] shadow-sm" : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>

          {/* Assign Visit button */}
          <button
            onClick={() => setShowAssignVisit(true)}
            className="flex items-center gap-2 border border-blue-400
                       text-blue-500 text-sm font-medium px-4 py-2
                       rounded-xl hover:bg-blue-50 transition-colors">
            <Calendar className="w-4 h-4" />
            Assign Visit
          </button>

          <AssignVisitModal
            isOpen={showAssignVisit}
            onClose={() => setShowAssignVisit(false)}
          />
        </div>
      </div>

      {/* Filter + Search row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-shrink-0">
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center gap-2 bg-white border border-gray-200
                       text-sm font-medium text-gray-700 px-4 py-2.5
                       rounded-xl hover:bg-gray-50 transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4 text-gray-400" />
            Filter by
            <svg className={`w-3 h-3 text-gray-400 transition-transform ${filterOpen ? "rotate-180" : ""}`}
                 fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
            </svg>
          </button>

          {filterOpen && (
            <div className="absolute top-12 left-0 z-20 bg-white border border-gray-200
                            rounded-2xl shadow-lg w-48 p-4 flex flex-col gap-3">
              <p className="text-sm font-semibold text-gray-800">Filter by</p>
              {["Name", "Available", "Unavailable", "Car owners"].map((option) => (
                <label key={option} className="flex items-center gap-3 text-sm text-gray-600 cursor-pointer hover:text-gray-900">
                  <input
                    type="checkbox"
                    checked={filters.includes(option)}
                    onChange={() => toggleFilter(option)}
                    className="w-4 h-4 rounded border-gray-300 accent-[#f5c045]"
                  />
                  {option}
                </label>
              ))}
              <button
                onClick={() => setFilterOpen(false)}
                className="w-full bg-[#f5c045] hover:bg-[#e8b030] text-gray-900
                           text-sm font-semibold py-2 rounded-xl mt-1 transition-colors"
              >
                Done
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 bg-white border border-gray-200
                        rounded-xl px-4 py-2.5 flex-1 shadow-sm">
          <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for a staff by name, staff id or email..."
            className="bg-transparent text-sm text-gray-700 outline-none placeholder-gray-400 w-full"
          />
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-amber-400" />
          <span className="ml-3 text-sm text-gray-500">Loading staff...</span>
        </div>
      )}

      {/* Staff Grid */}
      {!loading && layout === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map((staff) => (
            <StaffCard key={staff.backendId ?? staff.id} staff={staff} />
          ))}
        </div>
      )}

      {/* Staff List */}
      {!loading && layout === "list" && (
        <div className="flex gap-4">
          <div className="flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex-1">
            {filtered.map((staff, i) => {
              const isAvailable = staff.status === "available";
              const initials = staff.name.split(" ").map((n) => n[0]).join("").slice(0, 2);
              const avatarColors = ["bg-amber-200", "bg-blue-200"];
              const rowKey = staff.backendId ?? staff.id;
              return (
                <div
                  key={rowKey}
                  onClick={() => setSelectedStaff(staff)}
                  className={`flex items-center gap-4 px-5 py-4 border-b border-gray-100
                              last:border-0 hover:bg-gray-50 transition-colors cursor-pointer
                              ${selectedStaff?.backendId === staff.backendId && selectedStaff?.id === staff.id ? "bg-[#fef9ec]" : ""}`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center
                                   font-bold text-sm text-gray-700 flex-shrink-0
                                   ${avatarColors[i % avatarColors.length]}`}>
                    {staff.photo
                      ? <img src={staff.photo} alt={staff.name} className="w-full h-full rounded-full object-cover"/>
                      : initials}
                  </div>

                  <div className="flex flex-col flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900">{staff.name}</p>
                    <p className="text-xs text-gray-500">
                      Staff ID: <span className="font-bold text-gray-700">{staff.id}</span>
                    </p>
                  </div>

                  <span className={`text-xs font-semibold px-4 py-1.5 rounded-lg border flex-shrink-0
                                    ${isAvailable
                                      ? "border-green-300 text-green-600 bg-green-50"
                                      : "border-red-300 text-red-500 bg-red-50"
                                    }`}>
                    {isAvailable ? "Available" : "Unavailable"}
                  </span>

                  {/* 3 dots menu */}
                  <div className="relative flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => setOpenMenu(openMenu === rowKey ? null : rowKey)}
                      className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <MoreVertical className="w-4 h-4 text-gray-400" />
                    </button>

                    {openMenu === rowKey && (
                      <div className="absolute right-0 top-8 z-30 bg-white rounded-2xl
                                      shadow-xl border border-gray-100 p-2 w-44 flex flex-col gap-1">
                        <div className="flex justify-end mb-1">
                          <button
                            onClick={() => setOpenMenu(null)}
                            className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                          >
                            <X className="w-3 h-3 text-gray-500" />
                          </button>
                        </div>
                        <button onClick={() => { setOpenMenu(null); setEditStaff(staff); }}
                                className="w-full text-left text-xs font-semibold text-white bg-blue-400 hover:bg-blue-500 px-3 py-2 rounded-xl transition-colors">
                          Edit visit details
                        </button>
                        <button onClick={() => { setOpenMenu(null); setEditStaff({ ...staff, reassign: true }); }}
                                className="w-full text-left text-xs font-semibold text-white bg-green-500 hover:bg-green-600 px-3 py-2 rounded-xl transition-colors">
                          Reassign visit
                        </button>
                        <button onClick={() => setOpenMenu(null)}
                                className="w-full text-left text-xs font-semibold text-white bg-red-400 hover:bg-red-500 px-3 py-2 rounded-xl transition-colors">
                          Cancel visit
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {selectedStaff && (
            <div className="w-64 flex-shrink-0">
              <StaffCard staff={selectedStaff} />
            </div>
          )}
        </div>
      )}

      {/* Empty state */}
      {!loading && filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <Search className="w-10 h-10 mb-3 opacity-30" />
          <p className="text-sm font-medium">
            {staffList.length === 0
              ? "No staff added yet"
              : "No staff found matching your search"}
          </p>
        </div>
      )}

      {/* Modals */}
      <AssignVisitModal
        isOpen={!!editStaff && !editStaff.reassign}
        onClose={() => setEditStaff(null)}
        editMode={true}
        prefillData={{
          clientName: editStaff?.name ?? "",
          address: "1 Church Street, Canvey Island, Essex",
          staff: editStaff?.name ?? "",
        }}
      />

      <ReassignVisitModal
        isOpen={!!editStaff && !!editStaff.reassign}
        onClose={() => setEditStaff(null)}
        prefillData={{
          clientName: editStaff?.name ?? "",
          address: "1 Church Street, Canvey Island, Essex",
          staff: editStaff?.name ?? "",
        }}
      />
    </div>
  );
}