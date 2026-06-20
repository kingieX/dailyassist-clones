import { useState } from "react";
import {
  Search, SlidersHorizontal, LayoutGrid, List,
  Phone, MapPin, MoreVertical, X, UserPlus,
} from "lucide-react";
import { clientsData } from "../../../data/clientsData";
import EditClientModal from "../modals/EditClientModal";
import DeleteClientModal from "../modals/DeleteClientModal";
import AddClientModal from "../modals/AddClientModal";
import CheckInSuccessModal from "../../modals/CheckInSuccessModal";
import ClientDetailsPage from "./ClientDetailsPage";

// ── Client Card (Grid) ────────────────────────────────────────────────────────
function ClientCard({ client, onMenuAction }) {
  const { fullName, sex, phone, address } = client;
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5
                    hover:shadow-md transition-all duration-200 flex flex-col gap-4">

      {/* Top row: name + menu */}
      <div className="flex items-start justify-between">
        <p className="text-sm font-bold text-gray-900 leading-tight pr-2">
          {fullName}
        </p>

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
                onClick={() => { setMenuOpen(false); onMenuAction("edit", client); }}
                className="w-full text-left text-xs font-semibold text-white
                           bg-blue-400 hover:bg-blue-500 px-3 py-2 rounded-xl transition-colors"
              >
                Edit client details
              </button>
              <button
                onClick={() => { setMenuOpen(false); onMenuAction("delete", client); }}
                className="w-full text-left text-xs font-semibold text-white
                           bg-red-400 hover:bg-red-500 px-3 py-2 rounded-xl transition-colors"
              >
                Delete client
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Details */}
      <div className="flex flex-col gap-2">
        <p className="text-xs text-gray-600">
          Sex: <span className="font-semibold text-gray-800">{sex}</span>
        </p>
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <Phone className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
          <span>{phone}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <MapPin className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
          <span className="truncate">{address}</span>
        </div>
      </div>

      {/* View Details button */}
      <button
        onClick={() => onMenuAction("view", client)}
        className="w-full border border-[#f5c045] text-gray-800 text-sm
                   font-medium py-2 rounded-xl hover:bg-[#fef9ec]
                   transition-colors duration-200"
      >
        View Details
      </button>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function ClientsPage() {
  const [search, setSearch]                       = useState("");
  const [layout, setLayout]                       = useState("grid");
  const [sortOpen, setSortOpen]                   = useState(false);
  const [sortBy, setSortBy]                       = useState("");
  const [selectedClient, setSelectedClient]       = useState(null);
  const [openMenu, setOpenMenu]                   = useState(null);
  const [viewClient, setViewClient]               = useState(null);
  const [editClient, setEditClient]               = useState(null);
  const [deleteClient, setDeleteClient]           = useState(null);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  const [showAddClient, setShowAddClient]         = useState(false);

  const sortOptions = ["Name A-Z", "Name Z-A", "Newest", "Oldest"];

  const filtered = clientsData
    .filter((c) => {
      const q = search.toLowerCase();
      return (
        c.fullName.toLowerCase().includes(q) ||
        c.id.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.phone.includes(q)
      );
    })
    .sort((a, b) => {
      if (sortBy === "Name A-Z") return a.fullName.localeCompare(b.fullName);
      if (sortBy === "Name Z-A") return b.fullName.localeCompare(a.fullName);
      if (sortBy === "Newest")   return new Date(b.joinDate) - new Date(a.joinDate);
      if (sortBy === "Oldest")   return new Date(a.joinDate) - new Date(b.joinDate);
      return 0;
    });

  const handleMenuAction = (action, client) => {
    if (action === "edit")   setEditClient(client);
    if (action === "delete") setDeleteClient(client);
    if (action === "view")   setViewClient(client);
    if (action === "add")    setShowAddClient(true);
  };

  if (viewClient) return (
    <ClientDetailsPage
      client={viewClient}
      onBack={() => setViewClient(null)}
    />
  );

  return (
    <div className="flex flex-col gap-5 px-4 sm:px-6 py-5 max-w-7xl mx-auto w-full">

      {/* ── Page header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
          Clients
        </h1>

        <div className="flex items-center gap-3">
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

         <button
            onClick={() => setShowAddClient(true)}
            className="flex items-center gap-2 text-sm font-semibold px-4 py-2
                       rounded-xl hover:opacity-90 transition-colors"
            style={{ backgroundColor: "#e8f5e9", color: "#669369", border: "1px solid #669369" }}
          >
            <UserPlus className="w-4 h-4" />
            Add Client
          </button>
        </div>
      </div>

      {/* ── Sort + Search row ── */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-shrink-0">
          <button
            onClick={() => setSortOpen(!sortOpen)}
            className="flex items-center gap-2 bg-white border border-gray-200
                       text-sm font-medium text-gray-700 px-4 py-2.5
                       rounded-xl hover:bg-gray-50 transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4 text-gray-400" />
            {sortBy || "Sort by"}
            <svg
              className={`w-3 h-3 text-gray-400 transition-transform ${sortOpen ? "rotate-180" : ""}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {sortOpen && (
            <div className="absolute top-12 left-0 z-20 bg-white border border-gray-200
                            rounded-2xl shadow-lg w-44 p-2 flex flex-col gap-1">
              {sortOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => { setSortBy(option); setSortOpen(false); }}
                  className={`w-full text-left px-4 py-2.5 text-sm rounded-xl
                              transition-colors hover:bg-[#fef9ec]
                              ${sortBy === option
                                ? "bg-[#fef9ec] text-[#e7b343] font-semibold"
                                : "text-gray-600"}`}
                >
                  {option}
                </button>
              ))}
              {sortBy && (
                <button
                  onClick={() => { setSortBy(""); setSortOpen(false); }}
                  className="w-full text-left px-4 py-2.5 text-sm text-red-400
                             rounded-xl hover:bg-red-50 transition-colors"
                >
                  Clear
                </button>
              )}
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
            placeholder="Search for a client by name, id or email..."
            className="bg-transparent text-sm text-gray-700 outline-none
                       placeholder-gray-400 w-full"
          />
        </div>
      </div>

      {/* ── Grid Layout ── */}
      {layout === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map((client) => (
            <ClientCard
              key={client.id}
              client={client}
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
            {filtered.map((client, i) => (
              <div
                key={client.id}
                onClick={() => setSelectedClient(client)}
                className={`flex items-center gap-4 px-5 py-4 border-b border-gray-100
                            last:border-0 hover:bg-gray-50 transition-colors cursor-pointer
                            ${selectedClient?.id === client.id ? "bg-[#fef9ec]" : ""}`}
              >
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center
                                justify-center font-bold text-sm text-amber-700 flex-shrink-0">
                  {client.firstName[0]}{client.lastName[0]}
                </div>

                <div className="flex flex-col flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900">{client.fullName}</p>
                  <p className="text-xs text-gray-500">
                    ID: <span className="font-bold text-gray-700">{client.id}</span>
                  </p>
                </div>

                <p className="hidden md:block text-xs text-gray-500 flex-shrink-0">
                  Sex: <span className="font-semibold text-gray-700">{client.sex}</span>
                </p>

                <p className="hidden lg:block text-xs text-gray-500 flex-shrink-0">
                  {client.phone}
                </p>

                <div
                  className="relative flex-shrink-0"
                  onClick={(e) => e.stopPropagation()}
                >
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
                                     justify-center hover:bg-gray-200 transition-colors"
                        >
                          <X className="w-3 h-3 text-gray-500" />
                        </button>
                      </div>
                      <button
                        onClick={() => { setOpenMenu(null); handleMenuAction("edit", client); }}
                        className="w-full text-left text-xs font-semibold text-white
                                   bg-blue-400 hover:bg-blue-500 px-3 py-2 rounded-xl transition-colors"
                      >
                        Edit client details
                      </button>
                      <button
                        onClick={() => { setOpenMenu(null); handleMenuAction("delete", client); }}
                        className="w-full text-left text-xs font-semibold text-white
                                   bg-red-400 hover:bg-red-500 px-3 py-2 rounded-xl transition-colors"
                      >
                        Delete client
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {selectedClient && (
            <div className="w-64 flex-shrink-0 hidden lg:block">
              <ClientCard
                client={selectedClient}
                onMenuAction={handleMenuAction}
              />
            </div>
          )}
        </div>
      )}

      {/* ── Empty state ── */}
      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <Search className="w-10 h-10 mb-3 opacity-30" />
          <p className="text-sm font-medium">No clients found matching your search</p>
        </div>
      )}

      {/* ── Modals ── */}
      <AddClientModal
        isOpen={showAddClient}
        onClose={() => setShowAddClient(false)}
      />

      <EditClientModal
        isOpen={!!editClient}
        onClose={() => setEditClient(null)}
        client={editClient ?? {}}
      />

      <DeleteClientModal
        isOpen={!!deleteClient}
        onClose={() => setDeleteClient(null)}
        onDeleteConfirmed={() => setShowDeleteSuccess(true)}
        client={deleteClient ?? {}}
      />

      <CheckInSuccessModal
        isOpen={showDeleteSuccess}
        onClose={() => setShowDeleteSuccess(false)}
        buttonText="Back to Clients Page"
      />
    </div>
  );
}





// import { useState, useEffect } from "react";
// import {
//   Search, SlidersHorizontal, LayoutGrid, List,
//   Phone, MapPin, MoreVertical, X, UserPlus, Loader2,
// } from "lucide-react";
// import EditClientModal from "../modals/EditClientModal";
// import DeleteClientModal from "../modals/DeleteClientModal";
// import AddClientModal from "../modals/AddClientModal";
// import CheckInSuccessModal from "../../modals/CheckInSuccessModal";
// import ClientDetailsPage from "./ClientDetailsPage";
// import { clientsAPI } from "../../../services/api";

// // ── Client Card (Grid) ────────────────────────────────────────────────────────
// function ClientCard({ client, onMenuAction }) {
//   const { fullName, sex, phone, address } = client;
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5
//                     hover:shadow-md transition-all duration-200 flex flex-col gap-4">
//       <div className="flex items-start justify-between">
//         <p className="text-sm font-bold text-gray-900 leading-tight pr-2">{fullName}</p>
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
//               <button onClick={() => { setMenuOpen(false); onMenuAction("edit", client); }}
//                 className="w-full text-left text-xs font-semibold text-white
//                            bg-blue-400 hover:bg-blue-500 px-3 py-2 rounded-xl transition-colors">
//                 Edit client details
//               </button>
//               <button onClick={() => { setMenuOpen(false); onMenuAction("delete", client); }}
//                 className="w-full text-left text-xs font-semibold text-white
//                            bg-red-400 hover:bg-red-500 px-3 py-2 rounded-xl transition-colors">
//                 Delete client
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//       <div className="flex flex-col gap-2">
//         <p className="text-xs text-gray-600">Sex: <span className="font-semibold text-gray-800">{sex}</span></p>
//         <div className="flex items-center gap-2 text-xs text-gray-600">
//           <Phone className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
//           <span>{phone}</span>
//         </div>
//         <div className="flex items-center gap-2 text-xs text-gray-600">
//           <MapPin className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
//           <span className="truncate">{address}</span>
//         </div>
//       </div>
//       <button onClick={() => onMenuAction("view", client)}
//         className="w-full border border-[#f5c045] text-gray-800 text-sm
//                    font-medium py-2 rounded-xl hover:bg-[#fef9ec] transition-colors duration-200">
//         View Details
//       </button>
//     </div>
//   );
// }

// // ── Main Page ─────────────────────────────────────────────────────────────────
// export default function ClientsPage() {
//   const [clientsList, setClientsList]             = useState([]);
//   const [loading, setLoading]                     = useState(true);
//   const [error, setError]                         = useState(null);
//   const [search, setSearch]                       = useState("");
//   const [layout, setLayout]                       = useState("grid");
//   const [sortOpen, setSortOpen]                   = useState(false);
//   const [sortBy, setSortBy]                       = useState("");
//   const [selectedClient, setSelectedClient]       = useState(null);
//   const [openMenu, setOpenMenu]                   = useState(null);
//   const [viewClient, setViewClient]               = useState(null);
//   const [editClient, setEditClient]               = useState(null);
//   const [deleteClient, setDeleteClient]           = useState(null);
//   const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
//   const [showAddClient, setShowAddClient]         = useState(false);

//   const sortOptions = ["Name A-Z", "Name Z-A", "Newest", "Oldest"];

//   // ── Fetch all clients ─────────────────────────────────────────────────────
//   const fetchClients = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await clientsAPI.getAll();
//       const data = response.data?.data ?? response.data ?? [];
//       setClientsList(Array.isArray(data) ? data : []);
//     } catch (err) {
//       setError("Failed to load clients. Please try again.");
//       console.error("Clients fetch error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { fetchClients(); }, []);

//   const filtered = clientsList
//     .filter((c) => {
//       const q = search.toLowerCase();
//       return (
//         c.fullName?.toLowerCase().includes(q) ||
//         c.id?.toLowerCase().includes(q) ||
//         c.email?.toLowerCase().includes(q) ||
//         c.phone?.includes(q)
//       );
//     })
//     .sort((a, b) => {
//       if (sortBy === "Name A-Z") return a.fullName?.localeCompare(b.fullName);
//       if (sortBy === "Name Z-A") return b.fullName?.localeCompare(a.fullName);
//       if (sortBy === "Newest")   return new Date(b.joinDate) - new Date(a.joinDate);
//       if (sortBy === "Oldest")   return new Date(a.joinDate) - new Date(b.joinDate);
//       return 0;
//     });

//   const handleMenuAction = (action, client) => {
//     if (action === "edit")   setEditClient(client);
//     if (action === "delete") setDeleteClient(client);
//     if (action === "view")   setViewClient(client);
//     if (action === "add")    setShowAddClient(true);
//   };

//   // ── Delete client ─────────────────────────────────────────────────────────
//   const handleDeleteConfirmed = async () => {
//     if (!deleteClient) return;
//     try {
//       await clientsAPI.delete(deleteClient.id);
//       setClientsList((prev) => prev.filter((c) => c.id !== deleteClient.id));
//       setShowDeleteSuccess(true);
//     } catch (err) {
//       console.error("Delete client error:", err);
//     } finally {
//       setDeleteClient(null);
//     }
//   };

//   if (viewClient) return (
//     <ClientDetailsPage client={viewClient} onBack={() => setViewClient(null)} />
//   );

//   return (
//     <div className="flex flex-col gap-5 px-4 sm:px-6 py-5 max-w-7xl mx-auto w-full">

//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">Clients</h1>
//         <div className="flex items-center gap-3">
//           <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-xl p-1 shadow-sm">
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
//           <button onClick={() => setShowAddClient(true)}
//             className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl hover:opacity-90 transition-colors"
//             style={{ backgroundColor: "#e8f5e9", color: "#669369", border: "1px solid #669369" }}>
//             <UserPlus className="w-4 h-4" />
//             Add Client
//           </button>
//         </div>
//       </div>

//       {/* Sort + Search */}
//       <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
//         <div className="relative flex-shrink-0">
//           <button onClick={() => setSortOpen(!sortOpen)}
//             className="flex items-center gap-2 bg-white border border-gray-200
//                        text-sm font-medium text-gray-700 px-4 py-2.5 rounded-xl hover:bg-gray-50 transition-colors">
//             <SlidersHorizontal className="w-4 h-4 text-gray-400" />
//             {sortBy || "Sort by"}
//             <svg className={`w-3 h-3 text-gray-400 transition-transform ${sortOpen ? "rotate-180" : ""}`}
//               fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//             </svg>
//           </button>
//           {sortOpen && (
//             <div className="absolute top-12 left-0 z-20 bg-white border border-gray-200 rounded-2xl shadow-lg w-44 p-2 flex flex-col gap-1">
//               {sortOptions.map((option) => (
//                 <button key={option} onClick={() => { setSortBy(option); setSortOpen(false); }}
//                   className={`w-full text-left px-4 py-2.5 text-sm rounded-xl transition-colors hover:bg-[#fef9ec]
//                               ${sortBy === option ? "bg-[#fef9ec] text-[#e7b343] font-semibold" : "text-gray-600"}`}>
//                   {option}
//                 </button>
//               ))}
//               {sortBy && (
//                 <button onClick={() => { setSortBy(""); setSortOpen(false); }}
//                   className="w-full text-left px-4 py-2.5 text-sm text-red-400 rounded-xl hover:bg-red-50 transition-colors">
//                   Clear
//                 </button>
//               )}
//             </div>
//           )}
//         </div>
//         <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5 flex-1 shadow-sm">
//           <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
//           <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
//             placeholder="Search for a client by name, id or email..."
//             className="bg-transparent text-sm text-gray-700 outline-none placeholder-gray-400 w-full" />
//         </div>
//       </div>

//       {/* Loading */}
//       {loading && (
//         <div className="flex items-center justify-center py-20">
//           <Loader2 className="w-8 h-8 animate-spin text-amber-400" />
//           <span className="ml-3 text-sm text-gray-500">Loading clients...</span>
//         </div>
//       )}

//       {/* Error */}
//       {error && !loading && (
//         <div className="flex flex-col items-center justify-center py-20 text-red-400">
//           <p className="text-sm font-medium">{error}</p>
//           <button onClick={fetchClients}
//             className="mt-3 px-4 py-2 bg-amber-400 text-gray-900 text-sm font-semibold rounded-xl hover:bg-amber-500 transition-colors">
//             Retry
//           </button>
//         </div>
//       )}

//       {/* Grid */}
//       {!loading && !error && layout === "grid" && (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
//           {filtered.map((client) => (
//             <ClientCard key={client.id} client={client} onMenuAction={handleMenuAction} />
//           ))}
//         </div>
//       )}

//       {/* List */}
//       {!loading && !error && layout === "list" && (
//         <div className="flex gap-4">
//           <div className="flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex-1">
//             {filtered.map((client, i) => (
//               <div key={client.id} onClick={() => setSelectedClient(client)}
//                 className={`flex items-center gap-4 px-5 py-4 border-b border-gray-100
//                             last:border-0 hover:bg-gray-50 transition-colors cursor-pointer
//                             ${selectedClient?.id === client.id ? "bg-[#fef9ec]" : ""}`}>
//                 <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center
//                                 justify-center font-bold text-sm text-amber-700 flex-shrink-0">
//                   {client.firstName?.[0]}{client.lastName?.[0]}
//                 </div>
//                 <div className="flex flex-col flex-1 min-w-0">
//                   <p className="text-sm font-semibold text-gray-900">{client.fullName}</p>
//                   <p className="text-xs text-gray-500">ID: <span className="font-bold text-gray-700">{client.id}</span></p>
//                 </div>
//                 <p className="hidden md:block text-xs text-gray-500 flex-shrink-0">
//                   Sex: <span className="font-semibold text-gray-700">{client.sex}</span>
//                 </p>
//                 <p className="hidden lg:block text-xs text-gray-500 flex-shrink-0">{client.phone}</p>
//                 <div className="relative flex-shrink-0" onClick={(e) => e.stopPropagation()}>
//                   <button onClick={() => setOpenMenu(openMenu === i ? null : i)}
//                     className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors">
//                     <MoreVertical className="w-4 h-4 text-gray-400" />
//                   </button>
//                   {openMenu === i && (
//                     <div className="absolute right-0 top-8 z-30 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 w-44 flex flex-col gap-1">
//                       <div className="flex justify-end mb-1">
//                         <button onClick={() => setOpenMenu(null)}
//                           className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
//                           <X className="w-3 h-3 text-gray-500" />
//                         </button>
//                       </div>
//                       <button onClick={() => { setOpenMenu(null); handleMenuAction("edit", client); }}
//                         className="w-full text-left text-xs font-semibold text-white bg-blue-400 hover:bg-blue-500 px-3 py-2 rounded-xl transition-colors">
//                         Edit client details
//                       </button>
//                       <button onClick={() => { setOpenMenu(null); handleMenuAction("delete", client); }}
//                         className="w-full text-left text-xs font-semibold text-white bg-red-400 hover:bg-red-500 px-3 py-2 rounded-xl transition-colors">
//                         Delete client
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//           {selectedClient && (
//             <div className="w-64 flex-shrink-0 hidden lg:block">
//               <ClientCard client={selectedClient} onMenuAction={handleMenuAction} />
//             </div>
//           )}
//         </div>
//       )}

//       {/* Empty */}
//       {!loading && !error && filtered.length === 0 && (
//         <div className="flex flex-col items-center justify-center py-20 text-gray-400">
//           <Search className="w-10 h-10 mb-3 opacity-30" />
//           <p className="text-sm font-medium">No clients found matching your search</p>
//         </div>
//       )}

//       {/* Modals */}
//       <AddClientModal isOpen={showAddClient} onClose={() => setShowAddClient(false)} onSuccess={fetchClients} />
//       <EditClientModal isOpen={!!editClient} onClose={() => setEditClient(null)} client={editClient ?? {}} onSuccess={fetchClients} />
//       <DeleteClientModal isOpen={!!deleteClient} onClose={() => setDeleteClient(null)} onDeleteConfirmed={handleDeleteConfirmed} client={deleteClient ?? {}} />
//       <CheckInSuccessModal isOpen={showDeleteSuccess} onClose={() => setShowDeleteSuccess(false)} buttonText="Back to Clients Page" />
//     </div>
//   );
// }