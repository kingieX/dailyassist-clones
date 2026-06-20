
// import { useState } from "react";
// import { Search, ChevronDown } from "lucide-react";
// import { bookingsData } from "../../../data/bookingsData";
// import BookingDetailPage from "./BookingDetailPage";

// // import { useState, useEffect } from "react";
// // import { Search, ChevronDown, Loader2 } from "lucide-react";
// // import { bookingsAPI } from "../../../services/api";
// // import BookingDetailPage from "./BookingDetailPage";

// // ── Status badge ──────────────────────────────────────────────────────────────
// function StatusBadge({ status }) {
//   const styles = {
//     contacted: "text-amber-500  bg-amber-50   border-amber-200",
//     pending:   "text-amber-500  bg-amber-50   border-amber-200",
//     assigned:  "text-blue-500   bg-blue-50    border-blue-200",
//     completed: "text-green-600  bg-green-50   border-green-200",
//     cancelled: "text-red-500    bg-red-50     border-red-200",
//   };

//   const labels = {
//     contacted: "Contacted",
//     pending:   "Pending",
//     assigned:  "Assigned",
//     completed: "Completed",
//     cancelled: "Cancelled",
//   };

//   return (
//     <span className={`inline-flex items-center justify-center px-4 py-1.5
//                       rounded-lg border text-sm font-medium min-w-[100px]
//                       ${styles[status] ?? styles.pending}`}>
//       {labels[status] ?? status}
//     </span>
//   );
// }

// // ── Dropdown ──────────────────────────────────────────────────────────────────
// function Dropdown({ value, onChange, options, placeholder }) {
//   const [open, setOpen] = useState(false);

//   return (
//     <div className="relative flex-shrink-0">
//       <button
//         onClick={() => setOpen(!open)}
//         className="flex items-center gap-2 bg-white border border-gray-200
//                    text-sm font-medium text-gray-700 px-4 py-2.5
//                    rounded-xl hover:bg-gray-50 transition-colors min-w-[130px]"
//       >
//         <span className="flex-1 text-left">{value || placeholder}</span>
//         <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform
//                                   ${open ? "rotate-180" : ""}`} />
//       </button>

//       {open && (
//         <div className="absolute top-12 left-0 z-20 bg-white border border-gray-200
//                         rounded-2xl shadow-lg w-48 p-2 flex flex-col gap-1">
//           <button
//             onClick={() => { onChange(""); setOpen(false); }}
//             className={`w-full text-left px-4 py-2.5 text-sm rounded-xl
//                         transition-colors hover:bg-[#fef9ec]
//                         ${!value ? "bg-[#fef9ec] text-[#e7b343] font-semibold" : "text-gray-600"}`}
//           >
//             {placeholder}
//           </button>
//           {options.map((opt) => (
//             <button
//               key={opt.value}
//               onClick={() => { onChange(opt.value); setOpen(false); }}
//               className={`w-full text-left px-4 py-2.5 text-sm rounded-xl
//                           transition-colors hover:bg-[#fef9ec]
//                           ${value === opt.value
//                             ? "bg-[#fef9ec] text-[#e7b343] font-semibold"
//                             : "text-gray-600"}`}
//             >
//               {opt.label}
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// // ── Main Page ─────────────────────────────────────────────────────────────────
// // export default function BookingsPage() {
// //   const [statusFilter, setStatusFilter]   = useState("");
// //   const [serviceFilter, setServiceFilter] = useState("");
// //   const [dateFilter, setDateFilter]       = useState("");
// //   const [search, setSearch]               = useState("");
// //   const [selectedBooking, setSelectedBooking] = useState(null);

// export default function BookingsPage() {
//   const [bookingsList, setBookingsList]       = useState([]);
//   const [loading, setLoading]                 = useState(true);
//   const [error, setError]                     = useState(null);
//   const [statusFilter, setStatusFilter]       = useState("");
//   const [serviceFilter, setServiceFilter]     = useState("");
//   const [dateFilter, setDateFilter]           = useState("");
//   const [search, setSearch]                   = useState("");
//   const [selectedBooking, setSelectedBooking] = useState(null);

//   const fetchBookings = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await bookingsAPI.getAll();
//       const data = response.data?.data ?? response.data ?? [];
//       setBookingsList(Array.isArray(data) ? data : []);
//     } catch (err) {
//       setError("Failed to load bookings. Please try again.");
//       console.error("Bookings fetch error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { fetchBookings(); }, []);

//   const statusOptions = [
//     { value: "contacted", label: "Contacted" },
//     { value: "pending",   label: "Pending"   },
//     { value: "assigned",  label: "Assigned"  },
//     { value: "completed", label: "Completed" },
//     { value: "cancelled", label: "Cancelled" },
//   ];

//   const serviceOptions = [
//     { value: "Welfare Check-Ins & Companionship",      label: "Welfare Check-Ins"  },
//     { value: "Home-Help (cleaning, tidying, laundry)", label: "Home-Help"          },
//     { value: "Errands & Shopping Support",             label: "Errands & Shopping" },
//     { value: "Light Meal Preparation",                 label: "Meal Preparation"   },
//     { value: "Community Access Support",               label: "Community Access"   },
//   ];

//   const dateOptions = [
//     { value: "today",      label: "Today"      },
//     { value: "yesterday",  label: "Yesterday"  },
//     { value: "this_week",  label: "This Week"  },
//     { value: "this_month", label: "This Month" },
//   ];

//   const today     = new Date().toISOString().split("T")[0];
//   const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];

//   const filtered = bookingsData.filter((b) => {
// // const filtered = bookingsList.filter((b) => {

//     const matchesStatus  = !statusFilter  || b.status === statusFilter;
//     const matchesService = !serviceFilter || b.serviceRequest === serviceFilter;
//     const matchesSearch  = !search ||
//       b.clientName.toLowerCase().includes(search.toLowerCase()) ||
//       b.id.toLowerCase().includes(search.toLowerCase()) ||
//       b.phone.includes(search);

//     let matchesDate = true;
//     if (dateFilter === "today")     matchesDate = b.date === today;
//     if (dateFilter === "yesterday") matchesDate = b.date === yesterday;
//     if (dateFilter === "this_week") {
//       const d = new Date(b.date);
//       const now = new Date();
//       const weekAgo = new Date(now - 7 * 86400000);
//       matchesDate = d >= weekAgo && d <= now;
//     }
//     if (dateFilter === "this_month") {
//       const d = new Date(b.date);
//       const now = new Date();
//       matchesDate = d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
//     }

//     return matchesStatus && matchesService && matchesSearch && matchesDate;
//   });

//   // ── Show detail page when a booking is selected ──
//   // if (selectedBooking) return (
// if (loading) return (
//     <div className="flex items-center justify-center py-40">
//       <Loader2 className="w-8 h-8 animate-spin text-amber-400" />
//       <span className="ml-3 text-sm text-gray-500">Loading bookings...</span>
//     </div>
//   );

//   if (error) return (
//     <div className="flex flex-col items-center justify-center py-40 text-red-400">
//       <p className="text-sm font-medium">{error}</p>
//       <button onClick={fetchBookings}
//         className="mt-3 px-4 py-2 bg-amber-400 text-gray-900 text-sm font-semibold rounded-xl hover:bg-amber-500 transition-colors">
//         Retry
//       </button>
//     </div>
//   );

//   if (selectedBooking) return (

//     <BookingDetailPage
//       booking={selectedBooking}
//       onBack={() => setSelectedBooking(null)}
//     />
//   );

//   return (
//     <div className="flex flex-col gap-5 px-4 sm:px-6 py-5 max-w-7xl mx-auto w-full">

//       {/* ── Page header ── */}
//       <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Bookings</h1>

//       {/* ── Filters + Search ── */}
//       <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-wrap">
//         <Dropdown
//           value={statusFilter}
//           onChange={setStatusFilter}
//           options={statusOptions}
//           placeholder="All Status"
//         />
//         <Dropdown
//           value={serviceFilter}
//           onChange={setServiceFilter}
//           options={serviceOptions}
//           placeholder="All Services"
//         />
//         <Dropdown
//           value={dateFilter}
//           onChange={setDateFilter}
//           options={dateOptions}
//           placeholder="Today"
//         />

//         {/* Search */}
//         <div className="flex items-center gap-2 bg-white border border-gray-200
//                         rounded-xl px-4 py-2.5 flex-1 shadow-sm min-w-[200px]">
//           <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
//           <input
//             type="text"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             placeholder="Search..."
//             className="bg-transparent text-sm text-gray-700 outline-none
//                        placeholder-gray-400 w-full"
//           />
//         </div>
//       </div>

//       {/* ── Table (hidden on mobile) ── */}
//       <div className="hidden sm:block bg-white rounded-2xl border border-gray-100
//                       shadow-sm overflow-hidden">

//         {/* Table header */}
//         <div className="grid grid-cols-[120px_1fr_1fr_140px_1fr] bg-[#f5c045]
//                         px-5 py-4 gap-4">
//           <p className="text-sm font-bold text-gray-900">Status</p>
//           <p className="text-sm font-bold text-gray-900">Client Names</p>
//           <p className="text-sm font-bold text-gray-900">Service Request</p>
//           <p className="text-sm font-bold text-gray-900">Phone Number</p>
//           <p className="text-sm font-bold text-gray-900">Address</p>
//         </div>

//         {/* Table rows */}
//         {filtered.length > 0 ? (
//           filtered.map((booking) => (
//             <div
//               key={booking.id}
//               onClick={() => setSelectedBooking(booking)}
//               className="grid grid-cols-[120px_1fr_1fr_140px_1fr] px-5 py-4
//                          gap-4 border-b border-gray-100 last:border-0
//                          hover:bg-gray-50 transition-colors items-center cursor-pointer"
//             >
//               <div>
//                 <StatusBadge status={booking.status} />
//               </div>
//               <p className="text-sm font-semibold text-gray-800 truncate">
//                 {booking.clientName}
//               </p>
//               <p className="text-sm text-gray-700 truncate">
//                 {booking.serviceRequest}
//               </p>
//               <p className="text-sm text-gray-700">
//                 {booking.phone}
//               </p>
//               <p className="text-sm text-gray-500 truncate">
//                 {booking.address}
//               </p>
//             </div>
//           ))
//         ) : (
//           <div className="flex flex-col items-center justify-center py-20 text-gray-400">
//             <Search className="w-10 h-10 mb-3 opacity-30" />
//             <p className="text-sm font-medium">No bookings found</p>
//           </div>
//         )}
//       </div>

//       {/* ── Mobile card layout ── */}
//       <div className="flex flex-col gap-3 sm:hidden">
//         {filtered.map((booking) => (
//           <div
//             key={`mob-${booking.id}`}
//             onClick={() => setSelectedBooking(booking)}
//             className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4
//                        flex flex-col gap-3 cursor-pointer hover:shadow-md transition-shadow"
//           >
//             <div className="flex items-center justify-between">
//               <p className="text-sm font-bold text-gray-900">{booking.clientName}</p>
//               <StatusBadge status={booking.status} />
//             </div>
//             <p className="text-xs text-gray-600">{booking.serviceRequest}</p>
//             <p className="text-xs text-gray-600">{booking.phone}</p>
//             <p className="text-xs text-gray-500 truncate">{booking.address}</p>
//           </div>
//         ))}

//         {filtered.length === 0 && (
//           <div className="flex flex-col items-center justify-center py-20 text-gray-400">
//             <Search className="w-10 h-10 mb-3 opacity-30" />
//             <p className="text-sm font-medium">No bookings found</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }





import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import { bookingsData } from "../../../data/bookingsData";
import BookingDetailPage from "./BookingDetailPage";

// ── Status badge ──────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const styles = {
    contacted: "text-amber-500  bg-amber-50   border-amber-200",
    pending:   "text-amber-500  bg-amber-50   border-amber-200",
    assigned:  "text-blue-500   bg-blue-50    border-blue-200",
    completed: "text-green-600  bg-green-50   border-green-200",
    cancelled: "text-red-500    bg-red-50     border-red-200",
  };

  const labels = {
    contacted: "Contacted",
    pending:   "Pending",
    assigned:  "Assigned",
    completed: "Completed",
    cancelled: "Cancelled",
  };

  return (
    <span className={`inline-flex items-center justify-center px-4 py-1.5
                      rounded-lg border text-sm font-medium min-w-[100px]
                      ${styles[status] ?? styles.pending}`}>
      {labels[status] ?? status}
    </span>
  );
}

// ── Dropdown ──────────────────────────────────────────────────────────────────
function Dropdown({ value, onChange, options, placeholder }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative flex-shrink-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-white border border-gray-200
                   text-sm font-medium text-gray-700 px-4 py-2.5
                   rounded-xl hover:bg-gray-50 transition-colors min-w-[130px]"
      >
        <span className="flex-1 text-left">{value || placeholder}</span>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform
                                  ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute top-12 left-0 z-20 bg-white border border-gray-200
                        rounded-2xl shadow-lg w-48 p-2 flex flex-col gap-1">
          <button
            onClick={() => { onChange(""); setOpen(false); }}
            className={`w-full text-left px-4 py-2.5 text-sm rounded-xl
                        transition-colors hover:bg-[#fef9ec]
                        ${!value ? "bg-[#fef9ec] text-[#e7b343] font-semibold" : "text-gray-600"}`}
          >
            {placeholder}
          </button>
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => { onChange(opt.value); setOpen(false); }}
              className={`w-full text-left px-4 py-2.5 text-sm rounded-xl
                          transition-colors hover:bg-[#fef9ec]
                          ${value === opt.value
                            ? "bg-[#fef9ec] text-[#e7b343] font-semibold"
                            : "text-gray-600"}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function BookingsPage() {
  const [statusFilter, setStatusFilter]       = useState("");
  const [serviceFilter, setServiceFilter]     = useState("");
  const [dateFilter, setDateFilter]           = useState("");
  const [search, setSearch]                   = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);

  const statusOptions = [
    { value: "contacted", label: "Contacted" },
    { value: "pending",   label: "Pending"   },
    { value: "assigned",  label: "Assigned"  },
    { value: "completed", label: "Completed" },
    { value: "cancelled", label: "Cancelled" },
  ];

  const serviceOptions = [
    { value: "Welfare Check-Ins & Companionship",      label: "Welfare Check-Ins"  },
    { value: "Home-Help (cleaning, tidying, laundry)", label: "Home-Help"          },
    { value: "Errands & Shopping Support",             label: "Errands & Shopping" },
    { value: "Light Meal Preparation",                 label: "Meal Preparation"   },
    { value: "Community Access Support",               label: "Community Access"   },
  ];

  const dateOptions = [
    { value: "today",      label: "Today"      },
    { value: "yesterday",  label: "Yesterday"  },
    { value: "this_week",  label: "This Week"  },
    { value: "this_month", label: "This Month" },
  ];

  const today     = new Date().toISOString().split("T")[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];

  const filtered = bookingsData.filter((b) => {
    const matchesStatus  = !statusFilter  || b.status === statusFilter;
    const matchesService = !serviceFilter || b.serviceRequest === serviceFilter;
    const matchesSearch  = !search ||
      b.clientName.toLowerCase().includes(search.toLowerCase()) ||
      b.id.toLowerCase().includes(search.toLowerCase()) ||
      b.phone.includes(search);

    let matchesDate = true;
    if (dateFilter === "today")     matchesDate = b.date === today;
    if (dateFilter === "yesterday") matchesDate = b.date === yesterday;
    if (dateFilter === "this_week") {
      const d = new Date(b.date);
      const now = new Date();
      const weekAgo = new Date(now - 7 * 86400000);
      matchesDate = d >= weekAgo && d <= now;
    }
    if (dateFilter === "this_month") {
      const d = new Date(b.date);
      const now = new Date();
      matchesDate = d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }

    return matchesStatus && matchesService && matchesSearch && matchesDate;
  });

  // ── Show detail page when a booking is selected ──
  if (selectedBooking) return (
    <BookingDetailPage
      booking={selectedBooking}
      onBack={() => setSelectedBooking(null)}
    />
  );

  return (
    <div className="flex flex-col gap-5 px-4 sm:px-6 py-5 max-w-7xl mx-auto w-full">

      {/* ── Page header ── */}
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Bookings</h1>

      {/* ── Filters + Search ── */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-wrap">
        <Dropdown
          value={statusFilter}
          onChange={setStatusFilter}
          options={statusOptions}
          placeholder="All Status"
        />
        <Dropdown
          value={serviceFilter}
          onChange={setServiceFilter}
          options={serviceOptions}
          placeholder="All Services"
        />
        <Dropdown
          value={dateFilter}
          onChange={setDateFilter}
          options={dateOptions}
          placeholder="Today"
        />

        {/* Search */}
        <div className="flex items-center gap-2 bg-white border border-gray-200
                        rounded-xl px-4 py-2.5 flex-1 shadow-sm min-w-[200px]">
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
      </div>

      {/* ── Table (hidden on mobile) ── */}
      <div className="hidden sm:block bg-white rounded-2xl border border-gray-100
                      shadow-sm overflow-hidden">

        {/* Table header */}
        <div className="grid grid-cols-[120px_1fr_1fr_140px_1fr] bg-[#f5c045]
                        px-5 py-4 gap-4">
          <p className="text-sm font-bold text-gray-900">Status</p>
          <p className="text-sm font-bold text-gray-900">Client Names</p>
          <p className="text-sm font-bold text-gray-900">Service Request</p>
          <p className="text-sm font-bold text-gray-900">Phone Number</p>
          <p className="text-sm font-bold text-gray-900">Address</p>
        </div>

        {/* Table rows */}
        {filtered.length > 0 ? (
          filtered.map((booking) => (
            <div
              key={booking.id}
              onClick={() => setSelectedBooking(booking)}
              className="grid grid-cols-[120px_1fr_1fr_140px_1fr] px-5 py-4
                         gap-4 border-b border-gray-100 last:border-0
                         hover:bg-gray-50 transition-colors items-center cursor-pointer"
            >
              <div>
                <StatusBadge status={booking.status} />
              </div>
              <p className="text-sm font-semibold text-gray-800 truncate">
                {booking.clientName}
              </p>
              <p className="text-sm text-gray-700 truncate">
                {booking.serviceRequest}
              </p>
              <p className="text-sm text-gray-700">
                {booking.phone}
              </p>
              <p className="text-sm text-gray-500 truncate">
                {booking.address}
              </p>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <Search className="w-10 h-10 mb-3 opacity-30" />
            <p className="text-sm font-medium">No bookings found</p>
          </div>
        )}
      </div>

      {/* ── Mobile card layout ── */}
      <div className="flex flex-col gap-3 sm:hidden">
        {filtered.map((booking) => (
          <div
            key={`mob-${booking.id}`}
            onClick={() => setSelectedBooking(booking)}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4
                       flex flex-col gap-3 cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-gray-900">{booking.clientName}</p>
              <StatusBadge status={booking.status} />
            </div>
            <p className="text-xs text-gray-600">{booking.serviceRequest}</p>
            <p className="text-xs text-gray-600">{booking.phone}</p>
            <p className="text-xs text-gray-500 truncate">{booking.address}</p>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <Search className="w-10 h-10 mb-3 opacity-30" />
            <p className="text-sm font-medium">No bookings found</p>
          </div>
        )}
      </div>
    </div>
  );
}