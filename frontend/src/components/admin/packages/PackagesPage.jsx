import { useState } from "react";
import { Clock, Home, Heart, Star, Shield, Users, Zap, CheckCircle } from "lucide-react";
import { packagesData } from "../../../data/packagesData";
import CreatePackageModal from "../modals/CreatePackageModal";
import EditPackageModal from "../modals/EditPackageModal";
import CheckInSuccessModal from "../../modals/CheckInSuccessModal";

const AMBER = "#f5c045";

const iconMap = {
  clock:  Clock,
  home:   Home,
  heart:  Heart,
  star:   Star,
  shield: Shield,
  users:  Users,
  zap:    Zap,
};

// ── Delete confirm modal — matching image 3 ───────────────────────────────────
function DeleteConfirmModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 px-4"
      onClick={onClose}>
    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md px-8 py-8
                      flex flex-col items-center gap-4 text-center"
        onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-bold text-gray-900">Delete this package?</h2>
        <p className="text-sm text-gray-500 leading-relaxed">
          This action will permanently remove this package and all it
          features from Daily Assist. This cannot be undone.
        </p>
        <div className="flex gap-3 w-full mt-2">
          <button onClick={onClose}
            className="flex-1 py-3 rounded-xl border font-medium text-sm
                       transition-colors hover:bg-red-50"
            style={{ borderColor: "#ef4444", color: "#ef4444" }}>
            Cancel
          </button>
         <button onClick={onConfirm}
            className="flex-1 py-3 px-6 rounded-xl font-semibold text-sm text-white
                       transition-colors hover:opacity-90"
            style={{ backgroundColor: "#ef4444" }}>
            Yes, Delete Permanently
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Package Card ──────────────────────────────────────────────────────────────
function PackageCard({ pkg, onEdit, onRemove }) {
  const Icon = iconMap[pkg.icon] ?? Clock;
  const isHighlighted = pkg.highlighted;

  return (
    <div className={`relative rounded-3xl p-8 flex flex-col gap-5 transition-all duration-200
                     ${isHighlighted
                       ? "text-white shadow-xl"
                       : "bg-white border border-gray-100 shadow-md text-gray-900"
                     }`}
         style={isHighlighted ? { backgroundColor: "#6b9cc3" } : {}}>

      {/* Icon */}
      <div className="flex justify-center">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center
                         ${isHighlighted ? "bg-white/20" : "bg-amber-50"}`}>
          <Icon className={`w-8 h-8 ${isHighlighted ? "text-white" : "text-amber-500"}`} />
        </div>
      </div>

      {/* Name */}
      <div className="text-center">
        <p className={`text-lg font-bold ${isHighlighted ? "text-white" : "text-gray-900"}`}>
          {pkg.name}
        </p>
      </div>

      {/* Price */}
      <div className="text-center">
        <p className={`text-4xl font-bold ${isHighlighted ? "text-white" : "text-gray-900"}`}>
          {pkg.price}
        </p>
        <p className={`text-sm mt-1 ${isHighlighted ? "text-white/80" : "text-gray-500"}`}>
          {pkg.duration}
        </p>
      </div>

      {/* Tagline */}
      <p className={`text-sm text-center italic
                     ${isHighlighted ? "text-white/90" : "text-gray-500"}`}>
        {pkg.tagline}
      </p>

      {/* Features */}
      <div className="flex flex-col gap-2.5 flex-1">
        {pkg.features.map((feature, i) => (
          <div key={i} className="flex items-start gap-2.5">
            <CheckCircle className={`w-4 h-4 flex-shrink-0 mt-0.5
                                      ${isHighlighted ? "text-white" : "text-green-500"}`} />
            <span className={`text-sm ${isHighlighted ? "text-white" : "text-gray-700"}`}>
              {feature}
            </span>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-3 mt-2">
        <button
          onClick={() => onEdit(pkg)}
          className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-colors
                       ${isHighlighted
                         ? "bg-white text-gray-900 hover:bg-gray-50"
                         : "text-gray-900 hover:opacity-90"
                       }`}
          style={isHighlighted ? {} : { backgroundColor: AMBER }}
        >
          Edit Package
        </button>
        <button
          onClick={() => onRemove(pkg)}
          className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-colors border
                       ${isHighlighted
                         ? "border-white text-white hover:bg-white/10"
                         : "border-amber-400 text-gray-800 hover:bg-amber-50"
                       }`}
        >
          Remove Package
        </button>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function PackagesPage() {
  const [packages, setPackages]                   = useState(packagesData);
  const [showCreate, setShowCreate]               = useState(false);
  const [editPkg, setEditPkg]                     = useState(null);
  const [deleteTarget, setDeleteTarget]           = useState(null);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);

  const handleEdit   = (pkg) => setEditPkg(pkg);
  const handleRemove = (pkg) => setDeleteTarget(pkg);

  const handleDeleteConfirm = () => {
    setPackages((prev) => prev.filter((p) => p.id !== deleteTarget.id));
    setDeleteTarget(null);
    setTimeout(() => setShowDeleteSuccess(true), 300);
  };

  return (
    <div className="flex flex-col gap-6 px-4 sm:px-6 py-5 max-w-7xl mx-auto w-full">

      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Packages</h1>
        <button
          onClick={() => setShowCreate(true)}
          className="px-5 py-2.5 rounded-xl border text-sm font-semibold
                     transition-colors hover:opacity-90"
          style={{ borderColor: AMBER, color: "#c8860a", backgroundColor: "white" }}
        >
          Create a new package
        </button>
      </div>

      {/* ── Package cards ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {packages.map((pkg) => (
          <PackageCard
            key={pkg.id}
            pkg={pkg}
            onEdit={handleEdit}
            onRemove={handleRemove}
          />
        ))}
      </div>

      {/* ── Empty state ── */}
      {packages.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <p className="text-sm font-medium">No packages yet. Create one above.</p>
        </div>
      )}

      {/* ── Modals ── */}
      <CreatePackageModal
        isOpen={showCreate}
        onClose={() => setShowCreate(false)}
      />

      <EditPackageModal
        isOpen={!!editPkg}
        onClose={() => setEditPkg(null)}
        pkg={editPkg ?? {}}
      />

      <DeleteConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
      />

      <CheckInSuccessModal
        isOpen={showDeleteSuccess}
        onClose={() => setShowDeleteSuccess(false)}
        buttonText="Back to Packages"
      />
    </div>
  );
}














// import { useState, useEffect } from "react";
// import { Clock, Home, Heart, Star, Shield, Users, Zap, CheckCircle, Loader2 } from "lucide-react";
// import CreatePackageModal from "../modals/CreatePackageModal";
// import EditPackageModal from "../modals/EditPackageModal";
// import CheckInSuccessModal from "../../modals/CheckInSuccessModal";
// import { packagesAPI } from "../../../services/api";

// const AMBER = "#f5c045";

// const iconMap = {
//   clock:  Clock,
//   home:   Home,
//   heart:  Heart,
//   star:   Star,
//   shield: Shield,
//   users:  Users,
//   zap:    Zap,
// };

// function DeleteConfirmModal({ isOpen, onClose, onConfirm }) {
//   if (!isOpen) return null;
//   return (
//     <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 px-4" onClick={onClose}>
//       <div className="bg-white rounded-2xl shadow-xl w-full max-w-md px-8 py-8
//                       flex flex-col items-center gap-4 text-center"
//         onClick={(e) => e.stopPropagation()}>
//         <h2 className="text-xl font-bold text-gray-900">Delete this package?</h2>
//         <p className="text-sm text-gray-500 leading-relaxed">
//           This action will permanently remove this package and all its
//           features from Daily Assist. This cannot be undone.
//         </p>
//         <div className="flex gap-3 w-full mt-2">
//           <button onClick={onClose}
//             className="flex-1 py-3 rounded-xl border font-medium text-sm transition-colors hover:bg-red-50"
//             style={{ borderColor: "#ef4444", color: "#ef4444" }}>
//             Cancel
//           </button>
//           <button onClick={onConfirm}
//             className="flex-1 py-3 px-6 rounded-xl font-semibold text-sm text-white transition-colors hover:opacity-90"
//             style={{ backgroundColor: "#ef4444" }}>
//             Yes, Delete Permanently
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// function PackageCard({ pkg, onEdit, onRemove }) {
//   const Icon = iconMap[pkg.icon?.toLowerCase()] ?? Clock;
//   const isHighlighted = pkg.highlighted;

//   return (
//     <div className={`relative rounded-3xl p-8 flex flex-col gap-5 transition-all duration-200
//                      ${isHighlighted ? "text-white shadow-xl" : "bg-white border border-gray-100 shadow-md text-gray-900"}`}
//       style={isHighlighted ? { backgroundColor: "#6b9cc3" } : {}}>
//       <div className="flex justify-center">
//         <div className={`w-16 h-16 rounded-full flex items-center justify-center
//                          ${isHighlighted ? "bg-white/20" : "bg-amber-50"}`}>
//           <Icon className={`w-8 h-8 ${isHighlighted ? "text-white" : "text-amber-500"}`} />
//         </div>
//       </div>
//       <div className="text-center">
//         <p className={`text-lg font-bold ${isHighlighted ? "text-white" : "text-gray-900"}`}>{pkg.name}</p>
//       </div>
//       <div className="text-center">
//         <p className={`text-4xl font-bold ${isHighlighted ? "text-white" : "text-gray-900"}`}>{pkg.price}</p>
//         <p className={`text-sm mt-1 ${isHighlighted ? "text-white/80" : "text-gray-500"}`}>{pkg.duration}</p>
//       </div>
//       <p className={`text-sm text-center italic ${isHighlighted ? "text-white/90" : "text-gray-500"}`}>{pkg.tagline}</p>
//       <div className="flex flex-col gap-2.5 flex-1">
//         {pkg.features?.map((feature, i) => (
//           <div key={i} className="flex items-start gap-2.5">
//             <CheckCircle className={`w-4 h-4 flex-shrink-0 mt-0.5 ${isHighlighted ? "text-white" : "text-green-500"}`} />
//             <span className={`text-sm ${isHighlighted ? "text-white" : "text-gray-700"}`}>{feature}</span>
//           </div>
//         ))}
//       </div>
//       <div className="flex flex-col gap-3 mt-2">
//         <button onClick={() => onEdit(pkg)}
//           className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-colors
//                        ${isHighlighted ? "bg-white text-gray-900 hover:bg-gray-50" : "text-gray-900 hover:opacity-90"}`}
//           style={isHighlighted ? {} : { backgroundColor: AMBER }}>
//           Edit Package
//         </button>
//         <button onClick={() => onRemove(pkg)}
//           className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-colors border
//                        ${isHighlighted ? "border-white text-white hover:bg-white/10" : "border-amber-400 text-gray-800 hover:bg-amber-50"}`}>
//           Remove Package
//         </button>
//       </div>
//     </div>
//   );
// }

// export default function PackagesPage() {
//   const [packages, setPackages]                   = useState([]);
//   const [loading, setLoading]                     = useState(true);
//   const [error, setError]                         = useState(null);
//   const [showCreate, setShowCreate]               = useState(false);
//   const [editPkg, setEditPkg]                     = useState(null);
//   const [deleteTarget, setDeleteTarget]           = useState(null);
//   const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);

//   const fetchPackages = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await packagesAPI.getAll();
//       const data = response.data?.data ?? response.data ?? [];
//       setPackages(Array.isArray(data) ? data : []);
//     } catch (err) {
//       setError("Failed to load packages. Please try again.");
//       console.error("Packages fetch error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { fetchPackages(); }, []);

//   const handleEdit   = (pkg) => setEditPkg(pkg);
//   const handleRemove = (pkg) => setDeleteTarget(pkg);

//   const handleDeleteConfirm = async () => {
//     try {
//       await packagesAPI.delete(deleteTarget.id);
//       setPackages((prev) => prev.filter((p) => p.id !== deleteTarget.id));
//       setDeleteTarget(null);
//       setTimeout(() => setShowDeleteSuccess(true), 300);
//     } catch (err) {
//       console.error("Delete package error:", err);
//       setDeleteTarget(null);
//     }
//   };

//   return (
//     <div className="flex flex-col gap-6 px-4 sm:px-6 py-5 max-w-7xl mx-auto w-full">

//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Packages</h1>
//         <button onClick={() => setShowCreate(true)}
//           className="px-5 py-2.5 rounded-xl border text-sm font-semibold transition-colors hover:opacity-90"
//           style={{ borderColor: AMBER, color: "#c8860a", backgroundColor: "white" }}>
//           Create a new package
//         </button>
//       </div>

//       {loading && (
//         <div className="flex items-center justify-center py-20">
//           <Loader2 className="w-8 h-8 animate-spin text-amber-400" />
//           <span className="ml-3 text-sm text-gray-500">Loading packages...</span>
//         </div>
//       )}

//       {error && !loading && (
//         <div className="flex flex-col items-center justify-center py-20 text-red-400">
//           <p className="text-sm font-medium">{error}</p>
//           <button onClick={fetchPackages}
//             className="mt-3 px-4 py-2 bg-amber-400 text-gray-900 text-sm font-semibold rounded-xl hover:bg-amber-500 transition-colors">
//             Retry
//           </button>
//         </div>
//       )}

//       {!loading && !error && (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
//           {packages.map((pkg) => (
//             <PackageCard key={pkg.id} pkg={pkg} onEdit={handleEdit} onRemove={handleRemove} />
//           ))}
//         </div>
//       )}

//       {!loading && !error && packages.length === 0 && (
//         <div className="flex flex-col items-center justify-center py-20 text-gray-400">
//           <p className="text-sm font-medium">No packages yet. Create one above.</p>
//         </div>
//       )}

//       <CreatePackageModal
//         isOpen={showCreate}
//         onClose={() => setShowCreate(false)}
//         onSuccess={fetchPackages}
//       />
//       <EditPackageModal
//         isOpen={!!editPkg}
//         onClose={() => setEditPkg(null)}
//         pkg={editPkg ?? {}}
//         onSuccess={fetchPackages}
//       />
//       <DeleteConfirmModal
//         isOpen={!!deleteTarget}
//         onClose={() => setDeleteTarget(null)}
//         onConfirm={handleDeleteConfirm}
//       />
//       <CheckInSuccessModal
//         isOpen={showDeleteSuccess}
//         onClose={() => setShowDeleteSuccess(false)}
//         buttonText="Back to Packages"
//       />
//     </div>
//   );
// }