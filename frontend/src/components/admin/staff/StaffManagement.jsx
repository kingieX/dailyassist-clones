
import { useState } from "react";
import EditStaffModal from "../modals/EditStaffModal";
import DeleteStaffModal from "../modals/DeleteStaffModal";
import AddStaffModal from "../modals/AddStaffModal";
import StaffDetailsPage from "./StaffDetailsPage";
import CheckInSuccessModal from "../../modals/CheckInSuccessModal";
import {
  Search, SlidersHorizontal, LayoutGrid, List,
  Phone, Mail, MoreVertical, X, UserPlus,
} from "lucide-react";
import { staffManagementData } from "../../../data/staffManagementData";

// ── Avatar ────────────────────────────────────────────────────────────────────
function Avatar({ name, photo, size = "lg" }) {
  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2);
  const colors = ["bg-amber-200", "bg-blue-200", "bg-green-200", "bg-pink-200", "bg-purple-200"];
  const color = colors[name.length % colors.length];
  const sizeClass = size === "lg" ? "w-12 h-12 text-sm" : "w-9 h-9 text-xs";

  if (photo) {
    return (
      <img
        src={photo}
        alt={name}
        className={`${sizeClass} rounded-full object-cover flex-shrink-0`}
      />
    );
  }
  return (
    <div className={`${sizeClass} ${color} rounded-full flex items-center
                     justify-center font-bold text-gray-700 flex-shrink-0`}>
      {initials}
    </div>
  );
}

// ── Staff Card (Grid) ─────────────────────────────────────────────────────────
function StaffCard({ staff, onMenuAction }) {
  const { name, status, id, phone, email, photo } = staff;
  const isAvailable = status === "available";
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4
                    hover:shadow-md transition-all duration-200 flex flex-col gap-3">

      {/* Top row */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Avatar name={name} photo={photo} size="lg" />
          <div className="flex flex-col gap-1">
            <p className="text-sm font-bold text-gray-900 leading-tight">{name}</p>
            <span className={`text-[10px] font-semibold px-3 py-0.5 rounded-full border w-fit
                              ${isAvailable
                                ? "border-green-400 text-green-600 bg-green-50"
                                : "border-red-300 text-red-500 bg-red-50"
                              }`}>
              {isAvailable ? "Available" : "Unavailable"}
            </span>
          </div>
        </div>

        {/* 3-dot menu */}
        <div className="relative flex-shrink-0">
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
                onClick={() => { setMenuOpen(false); onMenuAction("edit", staff); }}
                className="w-full text-left text-xs font-semibold text-white
                           bg-blue-400 hover:bg-blue-500 px-3 py-2 rounded-xl transition-colors"
              >
                Edit staff details
              </button>
              <button
                onClick={() => { setMenuOpen(false); onMenuAction("delete", staff); }}
                className="w-full text-left text-xs font-semibold text-white
                           bg-red-400 hover:bg-red-500 px-3 py-2 rounded-xl transition-colors"
              >
                Delete staff
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Divider */}
      <hr className="border-gray-100" />

      {/* Details */}
      <div className="flex flex-col gap-2">
        <p className="text-xs text-gray-500">
          Staff ID: <span className="font-bold text-gray-800">{id}</span>
        </p>
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <Phone className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
          <span>{phone}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <Mail className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
          <span className="truncate">{email}</span>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-2 mt-1">
        <button
          onClick={() => onMenuAction("message", staff)}
          className="w-full bg-[#f5c045] hover:bg-[#e8b030] text-gray-900
                     text-sm font-semibold py-2 rounded-xl transition-colors duration-200"
        >
          Send a Message
        </button>
        <button
          onClick={() => onMenuAction("view", staff)}
          className="w-full border border-[#f5c045] text-gray-800
                     text-sm font-medium py-2 rounded-xl
                     hover:bg-[#fef9ec] transition-colors duration-200"
        >
          View Staff Details
        </button>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function StaffManagement() {
  const [search, setSearch]         = useState("");
  const [layout, setLayout]         = useState("grid");
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters]       = useState([]);
  const [openMenu, setOpenMenu]     = useState(null);
  const [selectedStaff, setSelectedStaff]         = useState(null);
  const [editStaff, setEditStaff]                 = useState(null);
  const [deleteStaff, setDeleteStaff]             = useState(null);
  const [viewStaff, setViewStaff]                 = useState(null);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  const [showAddStaff, setShowAddStaff]           = useState(false);

  const toggleFilter = (option) => {
    setFilters((prev) =>
      prev.includes(option) ? prev.filter((f) => f !== option) : [...prev, option]
    );
  };

  const filtered = staffManagementData.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.id.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase());

    if (!filters.length) return matchesSearch;

    const matchesFilter = filters.some((f) => {
      if (f === "Available")   return s.status === "available";
      if (f === "Unavailable") return s.status === "unavailable";
      return true;
    });

    return matchesSearch && matchesFilter;
  });

  const handleMenuAction = (action, staff) => {
    if (action === "edit")   setEditStaff(staff);
    if (action === "delete") setDeleteStaff(staff);
    if (action === "view")   setViewStaff(staff);
    if (action === "add")    setShowAddStaff(true);
  };

  if (viewStaff) {
    return <StaffDetailsPage staff={viewStaff} onBack={() => setViewStaff(null)} />;
  }

  return (
    <div className="flex flex-col gap-5 px-4 sm:px-6 py-5 max-w-7xl mx-auto w-full">

      {/* ── Page header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
          Staff Management
        </h1>

        <div className="flex items-center gap-3">
          {/* Layout toggles */}
          <div className="flex items-center gap-1 bg-white border border-gray-200
                          rounded-xl p-1 shadow-sm">
            <button
              onClick={() => setLayout("grid")}
              className={`p-2 rounded-lg transition-all duration-200
                ${layout === "grid"
                  ? "bg-[#fef9ec] text-[#e7b343] shadow-sm"
                  : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"}`}
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setLayout("list")}
              className={`p-2 rounded-lg transition-all duration-200
                ${layout === "list"
                  ? "bg-[#fef9ec] text-[#e7b343] shadow-sm"
                  : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>

          {/* Divider */}
          <div className="h-8 w-px bg-gray-200" />

          {/* Add Staff button */}
          <button
            onClick={() => setShowAddStaff(true)}
            className="flex items-center gap-2 bg-[#fef9ec] border border-[#f5c045]
                       text-[#c8860a] text-sm font-semibold px-4 py-2
                       rounded-xl hover:bg-[#fef0c0] transition-colors"
          >
            <UserPlus className="w-4 h-4" />
            Add Staff
          </button>
        </div>
      </div>

      {/* ── Filter + Search row ── */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">

        {/* Filter dropdown */}
        <div className="relative flex-shrink-0">
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center gap-2 bg-white border border-gray-200
                       text-sm font-medium text-gray-700 px-4 py-2.5
                       rounded-xl hover:bg-gray-50 transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4 text-gray-400" />
            Filter by
            <svg
              className={`w-3 h-3 text-gray-400 transition-transform ${filterOpen ? "rotate-180" : ""}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {filterOpen && (
            <div className="absolute top-12 left-0 z-20 bg-white border border-gray-200
                            rounded-2xl shadow-lg w-48 p-4 flex flex-col gap-3">
              <p className="text-sm font-semibold text-gray-800">Filter by</p>
              {["Name", "Available", "Unavailable"].map((option) => (
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

        {/* Search bar */}
        <div className="flex items-center gap-2 bg-white border border-gray-200
                        rounded-xl px-4 py-2.5 flex-1 shadow-sm">
          <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for a staff by name, staff id or email..."
            className="bg-transparent text-sm text-gray-700 outline-none
                       placeholder-gray-400 w-full"
          />
        </div>
      </div>

      {/* ── Grid Layout ── */}
      {layout === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map((staff) => (
            <StaffCard
              key={staff.id}
              staff={staff}
              onMenuAction={handleMenuAction}
            />
          ))}
        </div>
      )}

      {/* ── List Layout ── */}
      {layout === "list" && (
        <div className="flex gap-4">
          <div className="flex flex-col bg-white rounded-2xl border border-gray-100
                          shadow-sm overflow-hidden flex-1">
            {filtered.map((staff, i) => {
              const isAvailable = staff.status === "available";
              return (
                <div
                  key={staff.id}
                  onClick={() => setSelectedStaff(staff)}
                  className={`flex items-center gap-4 px-5 py-4 border-b border-gray-100
                              last:border-0 hover:bg-gray-50 transition-colors cursor-pointer
                              ${selectedStaff?.id === staff.id ? "bg-[#fef9ec]" : ""}`}
                >
                  <Avatar name={staff.name} photo={staff.photo} size="sm" />

                  <div className="flex flex-col flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900">{staff.name}</p>
                    <p className="text-xs text-gray-500">
                      Staff ID: <span className="font-bold text-gray-700">{staff.id}</span>
                    </p>
                  </div>

                  <p className="hidden md:block text-xs text-gray-500 flex-shrink-0">
                    {staff.phone}
                  </p>

                  <span className={`text-xs font-semibold px-4 py-1.5 rounded-lg border flex-shrink-0
                                    ${isAvailable
                                      ? "border-green-300 text-green-600 bg-green-50"
                                      : "border-red-300 text-red-500 bg-red-50"
                                    }`}>
                    {isAvailable ? "Available" : "Unavailable"}
                  </span>

                  <div className="relative flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => setOpenMenu(openMenu === i ? null : i)}
                      className="w-7 h-7 flex items-center justify-center rounded-lg
                                 hover:bg-gray-100 transition-colors"
                    >
                      <MoreVertical className="w-4 h-4 text-gray-400" />
                    </button>

                    {openMenu === i && (
                      <div className="absolute right-0 top-8 z-30 bg-white rounded-2xl
                                      shadow-xl border border-gray-100 p-2 w-44 flex flex-col gap-1">
                        <div className="flex justify-end mb-1">
                          <button
                            onClick={() => setOpenMenu(null)}
                            className="w-5 h-5 rounded-full bg-gray-100 flex items-center
                                       justify-center hover:bg-gray-200"
                          >
                            <X className="w-3 h-3 text-gray-500" />
                          </button>
                        </div>
                        <button
                          onClick={() => { setOpenMenu(null); handleMenuAction("edit", staff); }}
                          className="w-full text-left text-xs font-semibold text-white
                                     bg-blue-400 hover:bg-blue-500 px-3 py-2 rounded-xl transition-colors"
                        >
                          Edit staff details
                        </button>
                        <button
                          onClick={() => { setOpenMenu(null); handleMenuAction("delete", staff); }}
                          className="w-full text-left text-xs font-semibold text-white
                                     bg-red-400 hover:bg-red-500 px-3 py-2 rounded-xl transition-colors"
                        >
                          Delete staff
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {selectedStaff && (
            <div className="w-64 flex-shrink-0 hidden lg:block">
              <StaffCard staff={selectedStaff} onMenuAction={handleMenuAction} />
            </div>
          )}
        </div>
      )}

      {/* ── Empty state ── */}
      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <Search className="w-10 h-10 mb-3 opacity-30" />
          <p className="text-sm font-medium">No staff found matching your search</p>
        </div>
      )}

      {/* ── Modals ── */}
      <AddStaffModal
        isOpen={showAddStaff}
        onClose={() => setShowAddStaff(false)}
      />

      <EditStaffModal
        isOpen={!!editStaff}
        onClose={() => setEditStaff(null)}
        staff={editStaff ?? {}}
      />

      <DeleteStaffModal
        isOpen={!!deleteStaff}
        onClose={() => setDeleteStaff(null)}
        onDeleteConfirmed={() => {
          setShowDeleteSuccess(true);
          setDeleteStaff(null);
        }}
        staff={deleteStaff ?? {}}
      />

      <CheckInSuccessModal
        isOpen={showDeleteSuccess}
        onClose={() => setShowDeleteSuccess(false)}
      />
    </div>
  );
}









// import { useState, useEffect } from "react";
// import EditStaffModal from "../modals/EditStaffModal";
// import DeleteStaffModal from "../modals/DeleteStaffModal";
// import AddStaffModal from "../modals/AddStaffModal";
// import StaffDetailsPage from "./StaffDetailsPage";
// import CheckInSuccessModal from "../../modals/CheckInSuccessModal";
// import {
//   Search, SlidersHorizontal, LayoutGrid, List,
//   Phone, Mail, MoreVertical, X, UserPlus, Loader2,
// } from "lucide-react";
// import { staffAPI } from "../../../services/api";

// // ── Avatar ────────────────────────────────────────────────────────────────────
// function Avatar({ name, photo, size = "lg" }) {
//   const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2);
//   const colors = ["bg-amber-200", "bg-blue-200", "bg-green-200", "bg-pink-200", "bg-purple-200"];
//   const color = colors[name.length % colors.length];
//   const sizeClass = size === "lg" ? "w-12 h-12 text-sm" : "w-9 h-9 text-xs";

//   if (photo) {
//     return (
//       <img src={photo} alt={name}
//         className={`${sizeClass} rounded-full object-cover flex-shrink-0`} />
//     );
//   }
//   return (
//     <div className={`${sizeClass} ${color} rounded-full flex items-center
//                      justify-center font-bold text-gray-700 flex-shrink-0`}>
//       {initials}
//     </div>
//   );
// }

// // ── Staff Card (Grid) ─────────────────────────────────────────────────────────
// function StaffCard({ staff, onMenuAction }) {
//   const { name, status, id, phone, email, photo } = staff;
//   const isAvailable = status === "available";
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4
//                     hover:shadow-md transition-all duration-200 flex flex-col gap-3">
//       <div className="flex items-start justify-between">
//         <div className="flex items-center gap-3">
//           <Avatar name={name} photo={photo} size="lg" />
//           <div className="flex flex-col gap-1">
//             <p className="text-sm font-bold text-gray-900 leading-tight">{name}</p>
//             <span className={`text-[10px] font-semibold px-3 py-0.5 rounded-full border w-fit
//                               ${isAvailable
//                                 ? "border-green-400 text-green-600 bg-green-50"
//                                 : "border-red-300 text-red-500 bg-red-50"}`}>
//               {isAvailable ? "Available" : "Unavailable"}
//             </span>
//           </div>
//         </div>
//         <div className="relative flex-shrink-0">
//           <button onClick={() => setMenuOpen(!menuOpen)}
//             className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors">
//             <MoreVertical className="w-4 h-4 text-gray-400" />
//           </button>
//           {menuOpen && (
//             <div className="absolute right-0 top-8 z-30 bg-white rounded-2xl
//                             shadow-xl border border-gray-100 p-2 w-44 flex flex-col gap-1">
//               <div className="flex justify-end mb-1">
//                 <button onClick={() => setMenuOpen(false)}
//                   className="w-5 h-5 rounded-full bg-gray-100 flex items-center
//                              justify-center hover:bg-gray-200 transition-colors">
//                   <X className="w-3 h-3 text-gray-500" />
//                 </button>
//               </div>
//               <button onClick={() => { setMenuOpen(false); onMenuAction("edit", staff); }}
//                 className="w-full text-left text-xs font-semibold text-white
//                            bg-blue-400 hover:bg-blue-500 px-3 py-2 rounded-xl transition-colors">
//                 Edit staff details
//               </button>
//               <button onClick={() => { setMenuOpen(false); onMenuAction("delete", staff); }}
//                 className="w-full text-left text-xs font-semibold text-white
//                            bg-red-400 hover:bg-red-500 px-3 py-2 rounded-xl transition-colors">
//                 Delete staff
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//       <hr className="border-gray-100" />
//       <div className="flex flex-col gap-2">
//         <p className="text-xs text-gray-500">
//           Staff ID: <span className="font-bold text-gray-800">{id}</span>
//         </p>
//         <div className="flex items-center gap-2 text-xs text-gray-600">
//           <Phone className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
//           <span>{phone}</span>
//         </div>
//         <div className="flex items-center gap-2 text-xs text-gray-600">
//           <Mail className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
//           <span className="truncate">{email}</span>
//         </div>
//       </div>
//       <div className="flex flex-col gap-2 mt-1">
//         <button onClick={() => onMenuAction("message", staff)}
//           className="w-full bg-[#f5c045] hover:bg-[#e8b030] text-gray-900
//                      text-sm font-semibold py-2 rounded-xl transition-colors duration-200">
//           Send a Message
//         </button>
//         <button onClick={() => onMenuAction("view", staff)}
//           className="w-full border border-[#f5c045] text-gray-800
//                      text-sm font-medium py-2 rounded-xl
//                      hover:bg-[#fef9ec] transition-colors duration-200">
//           View Staff Details
//         </button>
//       </div>
//     </div>
//   );
// }

// // ── Main Page ─────────────────────────────────────────────────────────────────
// export default function StaffManagement() {
//   const [staffList, setStaffList]   = useState([]);
//   const [loading, setLoading]       = useState(true);
//   const [error, setError]           = useState(null);

//   const [search, setSearch]         = useState("");
//   const [layout, setLayout]         = useState("grid");
//   const [filterOpen, setFilterOpen] = useState(false);
//   const [filters, setFilters]       = useState([]);
//   const [openMenu, setOpenMenu]     = useState(null);
//   const [selectedStaff, setSelectedStaff]         = useState(null);
//   const [editStaff, setEditStaff]                 = useState(null);
//   const [deleteStaff, setDeleteStaff]             = useState(null);
//   const [viewStaff, setViewStaff]                 = useState(null);
//   const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
//   const [showAddStaff, setShowAddStaff]           = useState(false);

//   // ── Fetch all staff on mount ──────────────────────────────────────────────
//   const fetchStaff = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await staffAPI.getAll();
//       // Normalise API response to match the shape the UI expects
//       const data = response.data?.data ?? response.data ?? [];
//       setStaffList(Array.isArray(data) ? data : []);
//     } catch (err) {
//       setError("Failed to load staff. Please try again.");
//       console.error("Staff fetch error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchStaff();
//   }, []);

//   const toggleFilter = (option) => {
//     setFilters((prev) =>
//       prev.includes(option) ? prev.filter((f) => f !== option) : [...prev, option]
//     );
//   };

//   const filtered = staffList.filter((s) => {
//     const matchesSearch =
//       s.name?.toLowerCase().includes(search.toLowerCase()) ||
//       s.id?.toLowerCase().includes(search.toLowerCase()) ||
//       s.email?.toLowerCase().includes(search.toLowerCase());

//     if (!filters.length) return matchesSearch;

//     const matchesFilter = filters.some((f) => {
//       if (f === "Available")   return s.status === "available";
//       if (f === "Unavailable") return s.status === "unavailable";
//       return true;
//     });

//     return matchesSearch && matchesFilter;
//   });

//   const handleMenuAction = (action, staff) => {
//     if (action === "edit")   setEditStaff(staff);
//     if (action === "delete") setDeleteStaff(staff);
//     if (action === "view")   setViewStaff(staff);
//     if (action === "add")    setShowAddStaff(true);
//   };

//   // ── Delete staff ──────────────────────────────────────────────────────────
//   const handleDeleteConfirmed = async () => {
//     if (!deleteStaff) return;
//     try {
//       await staffAPI.delete(deleteStaff.id);
//       setStaffList((prev) => prev.filter((s) => s.id !== deleteStaff.id));
//       setShowDeleteSuccess(true);
//     } catch (err) {
//       console.error("Delete staff error:", err);
//     } finally {
//       setDeleteStaff(null);
//     }
//   };

//   if (viewStaff) {
//     return <StaffDetailsPage staff={viewStaff} onBack={() => setViewStaff(null)} />;
//   }

//   return (
//     <div className="flex flex-col gap-5 px-4 sm:px-6 py-5 max-w-7xl mx-auto w-full">

//       {/* ── Page header ── */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">Staff Management</h1>
//         <div className="flex items-center gap-3">
//           <div className="flex items-center gap-1 bg-white border border-gray-200
//                           rounded-xl p-1 shadow-sm">
//             <button onClick={() => setLayout("grid")}
//               className={`p-2 rounded-lg transition-all duration-200
//                 ${layout === "grid" ? "bg-[#fef9ec] text-[#e7b343] shadow-sm" : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"}`}>
//               <LayoutGrid className="w-5 h-5" />
//             </button>
//             <button onClick={() => setLayout("list")}
//               className={`p-2 rounded-lg transition-all duration-200
//                 ${layout === "list" ? "bg-[#fef9ec] text-[#e7b343] shadow-sm" : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"}`}>
//               <List className="w-5 h-5" />
//             </button>
//           </div>
//           <div className="h-8 w-px bg-gray-200" />
//           <button onClick={() => setShowAddStaff(true)}
//             className="flex items-center gap-2 bg-[#fef9ec] border border-[#f5c045]
//                        text-[#c8860a] text-sm font-semibold px-4 py-2
//                        rounded-xl hover:bg-[#fef0c0] transition-colors">
//             <UserPlus className="w-4 h-4" />
//             Add Staff
//           </button>
//         </div>
//       </div>

//       {/* ── Filter + Search row ── */}
//       <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
//         <div className="relative flex-shrink-0">
//           <button onClick={() => setFilterOpen(!filterOpen)}
//             className="flex items-center gap-2 bg-white border border-gray-200
//                        text-sm font-medium text-gray-700 px-4 py-2.5
//                        rounded-xl hover:bg-gray-50 transition-colors">
//             <SlidersHorizontal className="w-4 h-4 text-gray-400" />
//             Filter by
//             <svg className={`w-3 h-3 text-gray-400 transition-transform ${filterOpen ? "rotate-180" : ""}`}
//               fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//             </svg>
//           </button>
//           {filterOpen && (
//             <div className="absolute top-12 left-0 z-20 bg-white border border-gray-200
//                             rounded-2xl shadow-lg w-48 p-4 flex flex-col gap-3">
//               <p className="text-sm font-semibold text-gray-800">Filter by</p>
//               {["Name", "Available", "Unavailable"].map((option) => (
//                 <label key={option} className="flex items-center gap-3 text-sm text-gray-600 cursor-pointer hover:text-gray-900">
//                   <input type="checkbox" checked={filters.includes(option)}
//                     onChange={() => toggleFilter(option)}
//                     className="w-4 h-4 rounded border-gray-300 accent-[#f5c045]" />
//                   {option}
//                 </label>
//               ))}
//               <button onClick={() => setFilterOpen(false)}
//                 className="w-full bg-[#f5c045] hover:bg-[#e8b030] text-gray-900
//                            text-sm font-semibold py-2 rounded-xl mt-1 transition-colors">
//                 Done
//               </button>
//             </div>
//           )}
//         </div>
//         <div className="flex items-center gap-2 bg-white border border-gray-200
//                         rounded-xl px-4 py-2.5 flex-1 shadow-sm">
//           <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
//           <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
//             placeholder="Search for a staff by name, staff id or email..."
//             className="bg-transparent text-sm text-gray-700 outline-none placeholder-gray-400 w-full" />
//         </div>
//       </div>

//       {/* ── Loading state ── */}
//       {loading && (
//         <div className="flex items-center justify-center py-20">
//           <Loader2 className="w-8 h-8 animate-spin text-amber-400" />
//           <span className="ml-3 text-sm text-gray-500">Loading staff...</span>
//         </div>
//       )}

//       {/* ── Error state ── */}
//       {error && !loading && (
//         <div className="flex flex-col items-center justify-center py-20 text-red-400">
//           <p className="text-sm font-medium">{error}</p>
//           <button onClick={fetchStaff}
//             className="mt-3 px-4 py-2 bg-amber-400 text-gray-900 text-sm font-semibold rounded-xl hover:bg-amber-500 transition-colors">
//             Retry
//           </button>
//         </div>
//       )}

//       {/* ── Grid Layout ── */}
//       {!loading && !error && layout === "grid" && (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
//           {filtered.map((staff) => (
//             <StaffCard key={staff.id} staff={staff} onMenuAction={handleMenuAction} />
//           ))}
//         </div>
//       )}

//       {/* ── List Layout ── */}
//       {!loading && !error && layout === "list" && (
//         <div className="flex gap-4">
//           <div className="flex flex-col bg-white rounded-2xl border border-gray-100
//                           shadow-sm overflow-hidden flex-1">
//             {filtered.map((staff, i) => {
//               const isAvailable = staff.status === "available";
//               return (
//                 <div key={staff.id}
//                   onClick={() => setSelectedStaff(staff)}
//                   className={`flex items-center gap-4 px-5 py-4 border-b border-gray-100
//                               last:border-0 hover:bg-gray-50 transition-colors cursor-pointer
//                               ${selectedStaff?.id === staff.id ? "bg-[#fef9ec]" : ""}`}>
//                   <Avatar name={staff.name} photo={staff.photo} size="sm" />
//                   <div className="flex flex-col flex-1 min-w-0">
//                     <p className="text-sm font-semibold text-gray-900">{staff.name}</p>
//                     <p className="text-xs text-gray-500">
//                       Staff ID: <span className="font-bold text-gray-700">{staff.id}</span>
//                     </p>
//                   </div>
//                   <p className="hidden md:block text-xs text-gray-500 flex-shrink-0">{staff.phone}</p>
//                   <span className={`text-xs font-semibold px-4 py-1.5 rounded-lg border flex-shrink-0
//                                     ${isAvailable
//                                       ? "border-green-300 text-green-600 bg-green-50"
//                                       : "border-red-300 text-red-500 bg-red-50"}`}>
//                     {isAvailable ? "Available" : "Unavailable"}
//                   </span>
//                   <div className="relative flex-shrink-0" onClick={(e) => e.stopPropagation()}>
//                     <button onClick={() => setOpenMenu(openMenu === i ? null : i)}
//                       className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors">
//                       <MoreVertical className="w-4 h-4 text-gray-400" />
//                     </button>
//                     {openMenu === i && (
//                       <div className="absolute right-0 top-8 z-30 bg-white rounded-2xl
//                                       shadow-xl border border-gray-100 p-2 w-44 flex flex-col gap-1">
//                         <div className="flex justify-end mb-1">
//                           <button onClick={() => setOpenMenu(null)}
//                             className="w-5 h-5 rounded-full bg-gray-100 flex items-center
//                                        justify-center hover:bg-gray-200">
//                             <X className="w-3 h-3 text-gray-500" />
//                           </button>
//                         </div>
//                         <button onClick={() => { setOpenMenu(null); handleMenuAction("edit", staff); }}
//                           className="w-full text-left text-xs font-semibold text-white
//                                      bg-blue-400 hover:bg-blue-500 px-3 py-2 rounded-xl transition-colors">
//                           Edit staff details
//                         </button>
//                         <button onClick={() => { setOpenMenu(null); handleMenuAction("delete", staff); }}
//                           className="w-full text-left text-xs font-semibold text-white
//                                      bg-red-400 hover:bg-red-500 px-3 py-2 rounded-xl transition-colors">
//                           Delete staff
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//           {selectedStaff && (
//             <div className="w-64 flex-shrink-0 hidden lg:block">
//               <StaffCard staff={selectedStaff} onMenuAction={handleMenuAction} />
//             </div>
//           )}
//         </div>
//       )}

//       {/* ── Empty state ── */}
//       {!loading && !error && filtered.length === 0 && (
//         <div className="flex flex-col items-center justify-center py-20 text-gray-400">
//           <Search className="w-10 h-10 mb-3 opacity-30" />
//           <p className="text-sm font-medium">No staff found matching your search</p>
//         </div>
//       )}

//       {/* ── Modals ── */}
//       <AddStaffModal
//         isOpen={showAddStaff}
//         onClose={() => setShowAddStaff(false)}
//         onSuccess={fetchStaff}
//       />

//       <EditStaffModal
//         isOpen={!!editStaff}
//         onClose={() => setEditStaff(null)}
//         staff={editStaff ?? {}}
//         onSuccess={fetchStaff}
//       />

//       <DeleteStaffModal
//         isOpen={!!deleteStaff}
//         onClose={() => setDeleteStaff(null)}
//         onDeleteConfirmed={handleDeleteConfirmed}
//         staff={deleteStaff ?? {}}
//       />

//       <CheckInSuccessModal
//         isOpen={showDeleteSuccess}
//         onClose={() => setShowDeleteSuccess(false)}
//       />
//     </div>
//   );
// }