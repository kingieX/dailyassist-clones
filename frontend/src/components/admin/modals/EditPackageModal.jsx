// import { useState } from "react";
// import { X, Smile, ChevronDown } from "lucide-react";
// import CheckInSuccessModal from "../../modals/CheckInSuccessModal";

// const durationOptions = ["per hour", "per week", "per month", "per visit"];
// const iconOptions     = ["Clock", "Home", "Heart", "Star", "Shield", "Users", "Zap"];
// const AMBER = "#f5c045";

// export default function EditPackageModal({ isOpen, onClose, pkg }) {
//   const [icon, setIcon]             = useState(pkg?.icon ?? "");
//   const [iconOpen, setIconOpen]     = useState(false);
//   const [name, setName]             = useState(pkg?.name ?? "");
//   const [price, setPrice]           = useState(pkg?.price ?? "");
//   const [duration, setDuration]     = useState(pkg?.duration ?? "");
//   const [durationOpen, setDurationOpen] = useState(false);
//   const [tagline, setTagline]       = useState(pkg?.tagline ?? "");
//   const [features, setFeatures]     = useState(pkg?.features ?? []);
//   const [newFeature, setNewFeature] = useState("");
//   const [addingFeature, setAddingFeature] = useState(false);
//   const [additionalCharges, setAdditionalCharges] = useState(
//     pkg?.additionalCharge ? [pkg.additionalCharge] : []
//   );
//   const [newCharge, setNewCharge]   = useState("");
//   const [addingCharge, setAddingCharge] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);

//   if (!isOpen) return null;

//   const addFeature = () => {
//     if (!newFeature.trim() || features.length >= 10) return;
//     setFeatures([...features, newFeature.trim()]);
//     setNewFeature("");
//     setAddingFeature(false);
//   };

//   const removeFeature = (i) => setFeatures(features.filter((_, idx) => idx !== i));

//   const addCharge = () => {
//     if (!newCharge.trim()) return;
//     setAdditionalCharges([...additionalCharges, newCharge.trim()]);
//     setNewCharge("");
//     setAddingCharge(false);
//   };

//   const removeCharge = (i) => setAdditionalCharges(additionalCharges.filter((_, idx) => idx !== i));

//   const handleSave = () => {
//     setShowConfirm(false);
//     setShowSuccess(true);
//   };

//   return (
//     <>
//       <div
//         className="fixed inset-0 z-50 flex items-start justify-center
//                    bg-black/40 px-3 sm:px-6 py-4 sm:py-6 overflow-y-auto"
//         onClick={onClose}
//       >
//         <div
//           className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-auto flex flex-col my-2"
//           onClick={(e) => e.stopPropagation()}
//         >
//           {/* Header */}
//           <div className="px-6 pt-6 pb-4 border-b border-gray-100 flex items-center justify-between">
//             <h2 className="text-xl font-bold text-gray-900">Edit package</h2>
//             <button onClick={onClose}
//               className="w-8 h-8 flex items-center justify-center rounded-full
//                          hover:bg-gray-100 transition-colors">
//               <X className="w-5 h-5 text-gray-500" />
//             </button>
//           </div>

//           {/* Body */}
//           <div className="px-6 py-5 flex flex-col gap-4">

//             {/* Icon */}
//             <div className="flex flex-col gap-1.5">
//               <label className="text-sm font-semibold text-gray-800">Icon</label>
//               <div className="relative">
//                 <button onClick={() => setIconOpen(!iconOpen)}
//                   className="w-full flex items-center justify-between bg-white
//                              border border-gray-200 rounded-xl px-4 py-3 text-sm
//                              text-gray-700 hover:bg-gray-50 transition-colors">
//                   <span className={icon ? "text-gray-700" : "text-gray-400"}>
//                     {icon || "Pick an icon"}
//                   </span>
//                   <Smile className="w-5 h-5 text-gray-400" />
//                 </button>
//                 {iconOpen && (
//                   <div className="absolute top-12 left-0 z-20 bg-white border border-gray-200
//                                   rounded-2xl shadow-lg w-full p-2 flex flex-col gap-1">
//                     {iconOptions.map((ic) => (
//                       <button key={ic}
//                         onClick={() => { setIcon(ic); setIconOpen(false); }}
//                         className={`w-full text-left px-4 py-2.5 text-sm rounded-xl
//                                     transition-colors hover:bg-[#fef9ec]
//                                     ${icon === ic ? "bg-[#fef9ec] text-[#e7b343] font-semibold" : "text-gray-600"}`}>
//                         {ic}
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Package Name */}
//             <div className="flex flex-col gap-1.5">
//               <label className="text-sm font-semibold text-gray-800">Package Name</label>
//               <input type="text" value={name} onChange={(e) => setName(e.target.value)}
//                 placeholder="Package name"
//                 className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3
//                            text-sm text-gray-700 outline-none focus:ring-2 focus:ring-amber-200
//                            placeholder-gray-400" />
//             </div>

//             {/* Package Price */}
//             <div className="flex flex-col gap-1.5">
//               <label className="text-sm font-semibold text-gray-800">Package Price</label>
//               <input type="text" value={price} onChange={(e) => setPrice(e.target.value)}
//                 placeholder="Package price"
//                 className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3
//                            text-sm text-gray-700 outline-none focus:ring-2 focus:ring-amber-200
//                            placeholder-gray-400" />
//             </div>

//             {/* Duration */}
//             <div className="flex flex-col gap-1.5">
//               <label className="text-sm font-semibold text-gray-800">Duration</label>
//               <div className="relative">
//                 <button onClick={() => setDurationOpen(!durationOpen)}
//                   className="w-full flex items-center justify-between bg-white
//                              border border-gray-200 rounded-xl px-4 py-3 text-sm
//                              text-gray-700 hover:bg-gray-50 transition-colors">
//                   <span className={duration ? "text-gray-700" : "text-gray-400"}>
//                     {duration || "Select duration"}
//                   </span>
//                   <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform
//                                            ${durationOpen ? "rotate-180" : ""}`} />
//                 </button>
//                 {durationOpen && (
//                   <div className="absolute top-12 left-0 z-20 bg-white border border-gray-200
//                                   rounded-2xl shadow-lg w-full p-2 flex flex-col gap-1">
//                     {durationOptions.map((d) => (
//                       <button key={d}
//                         onClick={() => { setDuration(d); setDurationOpen(false); }}
//                         className={`w-full text-left px-4 py-2.5 text-sm rounded-xl
//                                     transition-colors hover:bg-[#fef9ec]
//                                     ${duration === d ? "bg-[#fef9ec] text-[#e7b343] font-semibold" : "text-gray-600"}`}>
//                         {d}
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Tagline */}
//             <div className="flex flex-col gap-1.5">
//               <label className="text-sm font-semibold text-gray-800">Tagline</label>
//               <textarea value={tagline} onChange={(e) => setTagline(e.target.value)}
//                 placeholder="Type tagline..."
//                 rows={3}
//                 className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3
//                            text-sm text-gray-700 outline-none focus:ring-2 focus:ring-amber-200
//                            placeholder-gray-400 resize-none" />
//             </div>

//             {/* Features */}
//             <div className="flex flex-col gap-2">
//               <div className="flex items-center justify-between">
//                 <label className="text-sm font-semibold text-gray-800">
//                   Features <span className="text-gray-400 font-normal">(10 max)</span>
//                 </label>
//                 {features.length < 10 && (
//                   <button onClick={() => setAddingFeature(true)}
//                     className="text-sm font-semibold" style={{ color: AMBER }}>
//                     + Add new feature
//                   </button>
//                 )}
//               </div>

//               {features.map((f, i) => (
//                 <div key={i} className="flex items-center gap-2 bg-white border border-gray-200
//                                         rounded-xl px-4 py-2.5">
//                   <span className="flex-1 text-sm text-gray-700">{f}</span>
//                   <button onClick={() => removeFeature(i)}
//                     className="text-red-400 hover:text-red-600 transition-colors flex-shrink-0">
//                     <X className="w-4 h-4" />
//                   </button>
//                 </div>
//               ))}

//               {addingFeature && (
//                 <div className="flex gap-2">
//                   <input type="text" value={newFeature}
//                     onChange={(e) => setNewFeature(e.target.value)}
//                     onKeyDown={(e) => e.key === "Enter" && addFeature()}
//                     placeholder="Enter feature..." autoFocus
//                     className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-2.5
//                                text-sm text-gray-700 outline-none focus:ring-2 focus:ring-amber-200
//                                placeholder-gray-400" />
//                   <button onClick={addFeature}
//                     className="px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-900
//                                hover:opacity-90" style={{ backgroundColor: AMBER }}>
//                     Add
//                   </button>
//                   <button onClick={() => { setAddingFeature(false); setNewFeature(""); }}
//                     className="px-4 py-2.5 rounded-xl text-sm border border-gray-200
//                                text-gray-600 hover:bg-gray-50">
//                     Cancel
//                   </button>
//                 </div>
//               )}
//             </div>

//             {/* Additional Charge */}
//             <div className="flex flex-col gap-2">
//               <div className="flex items-center justify-between">
//                 <label className="text-sm font-semibold text-gray-800">Additional Charge</label>
//                 <button onClick={() => setAddingCharge(true)}
//                   className="text-sm font-semibold" style={{ color: AMBER }}>
//                   + Add
//                 </button>
//               </div>

//               {additionalCharges.map((c, i) => (
//                 <div key={i} className="flex items-start gap-2 bg-white border border-gray-200
//                                         rounded-xl px-4 py-2.5">
//                   <span className="flex-1 text-sm text-gray-700">{c}</span>
//                   <button onClick={() => removeCharge(i)}
//                     className="text-red-400 hover:text-red-600 transition-colors flex-shrink-0 mt-0.5">
//                     <X className="w-4 h-4" />
//                   </button>
//                 </div>
//               ))}

//               {addingCharge && (
//                 <div className="flex gap-2">
//                   <input type="text" value={newCharge}
//                     onChange={(e) => setNewCharge(e.target.value)}
//                     onKeyDown={(e) => e.key === "Enter" && addCharge()}
//                     placeholder="e.g. Transport mileage: 45p/mile" autoFocus
//                     className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-2.5
//                                text-sm text-gray-700 outline-none focus:ring-2 focus:ring-amber-200
//                                placeholder-gray-400" />
//                   <button onClick={addCharge}
//                     className="px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-900
//                                hover:opacity-90" style={{ backgroundColor: AMBER }}>
//                     Add
//                   </button>
//                   <button onClick={() => { setAddingCharge(false); setNewCharge(""); }}
//                     className="px-4 py-2.5 rounded-xl text-sm border border-gray-200
//                                text-gray-600 hover:bg-gray-50">
//                     Cancel
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Footer */}
//           <div className="px-6 pb-6 pt-2 flex gap-3">
//             <button onClick={onClose}
//               className="flex-1 py-3.5 rounded-xl border border-gray-300 text-gray-700
//                          font-semibold text-sm hover:bg-gray-50 transition-colors">
//               Cancel
//             </button>
//             <button onClick={() => setShowConfirm(true)}
//               className="flex-1 py-3.5 rounded-xl font-semibold text-sm text-gray-900
//                          hover:opacity-90 transition-colors"
//               style={{ backgroundColor: AMBER }}>
//               Save Changes
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* ── Update confirm modal ── */}
//       {showConfirm && (
//         <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 px-4"
//           onClick={() => setShowConfirm(false)}>
//           <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm px-8 py-8
//                           flex flex-col items-center gap-4 text-center"
//             onClick={(e) => e.stopPropagation()}>
//             <h2 className="text-xl font-bold text-gray-900">Update this package?</h2>
//             <p className="text-sm text-gray-500 leading-relaxed">
//               Your edit will replace the existing information on this package
//               details. Would you like to continue?
//             </p>
//             <div className="flex gap-3 w-full mt-2">
//               <button onClick={() => setShowConfirm(false)}
//                 className="flex-1 py-3 rounded-xl border font-medium text-sm hover:opacity-90"
//                 style={{ borderColor: AMBER, color: "#c8860a" }}>
//                 Cancel
//               </button>
//               <button onClick={handleSave}
//                 className="flex-1 py-3 rounded-xl font-semibold text-sm text-gray-900 hover:opacity-90"
//                 style={{ backgroundColor: AMBER }}>
//                 Yes, Save Changes
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ── Success modal ── */}
//       <CheckInSuccessModal
//         isOpen={showSuccess}
//         onClose={() => { setShowSuccess(false); onClose(); }}
//         buttonText="Back to Packages"
//       />
//     </>
//   );
// }


import { useState } from "react";
import { X, Smile, ChevronDown } from "lucide-react";
import CheckInSuccessModal from "../../modals/CheckInSuccessModal";
import { packagesAPI } from "../../../services/api";

const durationOptions = ["per hour", "per week", "per month", "per visit"];
const iconOptions     = ["Clock", "Home", "Heart", "Star", "Shield", "Users", "Zap"];
const AMBER = "#f5c045";

export default function EditPackageModal({ isOpen, onClose, pkg, onSuccess }) {
  const [icon, setIcon]                 = useState(pkg?.icon ?? "");
  const [iconOpen, setIconOpen]         = useState(false);
  const [name, setName]                 = useState(pkg?.name ?? "");
  const [price, setPrice]               = useState(pkg?.price ?? "");
  const [duration, setDuration]         = useState(pkg?.duration ?? "");
  const [durationOpen, setDurationOpen] = useState(false);
  const [tagline, setTagline]           = useState(pkg?.tagline ?? "");
  const [features, setFeatures]         = useState(pkg?.features ?? []);
  const [newFeature, setNewFeature]     = useState("");
  const [addingFeature, setAddingFeature] = useState(false);
  const [additionalCharges, setAdditionalCharges] = useState(pkg?.additionalCharge ? [pkg.additionalCharge] : []);
  const [newCharge, setNewCharge]       = useState("");
  const [addingCharge, setAddingCharge] = useState(false);
  const [showConfirm, setShowConfirm]   = useState(false);
  const [showSuccess, setShowSuccess]   = useState(false);
  const [submitting, setSubmitting]     = useState(false);
  const [apiError, setApiError]         = useState(null);

  if (!isOpen) return null;

  const addFeature = () => {
    if (!newFeature.trim() || features.length >= 10) return;
    setFeatures([...features, newFeature.trim()]);
    setNewFeature("");
    setAddingFeature(false);
  };

  const removeFeature = (i) => setFeatures(features.filter((_, idx) => idx !== i));

  const addCharge = () => {
    if (!newCharge.trim()) return;
    setAdditionalCharges([...additionalCharges, newCharge.trim()]);
    setNewCharge("");
    setAddingCharge(false);
  };

  const removeCharge = (i) => setAdditionalCharges(additionalCharges.filter((_, idx) => idx !== i));

  const handleSave = async () => {
    setSubmitting(true);
    setApiError(null);
    try {
      await packagesAPI.update(pkg.id, {
        icon, name, price, duration, tagline, features,
        additionalCharge: additionalCharges.join(", "),
      });
      setShowConfirm(false);
      setShowSuccess(true);
      if (onSuccess) onSuccess();
    } catch (err) {
      setApiError(err.response?.data?.message || "Failed to update package. Please try again.");
      setShowConfirm(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 px-3 sm:px-6 py-4 sm:py-6 overflow-y-auto" onClick={onClose}>
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-auto flex flex-col my-2" onClick={(e) => e.stopPropagation()}>

          <div className="px-6 pt-6 pb-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Edit package</h2>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {apiError && (
            <div className="mx-6 mt-4 px-4 py-3 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-sm text-red-500">{apiError}</p>
            </div>
          )}

          <div className="px-6 py-5 flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-800">Icon</label>
              <div className="relative">
                <button onClick={() => setIconOpen(!iconOpen)} className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  <span className={icon ? "text-gray-700" : "text-gray-400"}>{icon || "Pick an icon"}</span>
                  <Smile className="w-5 h-5 text-gray-400" />
                </button>
                {iconOpen && (
                  <div className="absolute top-12 left-0 z-20 bg-white border border-gray-200 rounded-2xl shadow-lg w-full p-2 flex flex-col gap-1">
                    {iconOptions.map((ic) => (
                      <button key={ic} onClick={() => { setIcon(ic); setIconOpen(false); }}
                        className={`w-full text-left px-4 py-2.5 text-sm rounded-xl transition-colors hover:bg-[#fef9ec] ${icon === ic ? "bg-[#fef9ec] text-[#e7b343] font-semibold" : "text-gray-600"}`}>
                        {ic}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-800">Package Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Package name"
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-amber-200 placeholder-gray-400" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-800">Package Price</label>
              <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Package price"
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-amber-200 placeholder-gray-400" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-800">Duration</label>
              <div className="relative">
                <button onClick={() => setDurationOpen(!durationOpen)} className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  <span className={duration ? "text-gray-700" : "text-gray-400"}>{duration || "Select duration"}</span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${durationOpen ? "rotate-180" : ""}`} />
                </button>
                {durationOpen && (
                  <div className="absolute top-12 left-0 z-20 bg-white border border-gray-200 rounded-2xl shadow-lg w-full p-2 flex flex-col gap-1">
                    {durationOptions.map((d) => (
                      <button key={d} onClick={() => { setDuration(d); setDurationOpen(false); }}
                        className={`w-full text-left px-4 py-2.5 text-sm rounded-xl transition-colors hover:bg-[#fef9ec] ${duration === d ? "bg-[#fef9ec] text-[#e7b343] font-semibold" : "text-gray-600"}`}>
                        {d}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-800">Tagline</label>
              <textarea value={tagline} onChange={(e) => setTagline(e.target.value)} placeholder="Type tagline..." rows={3}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-amber-200 placeholder-gray-400 resize-none" />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-gray-800">Features <span className="text-gray-400 font-normal">(10 max)</span></label>
                {features.length < 10 && (
                  <button onClick={() => setAddingFeature(true)} className="text-sm font-semibold" style={{ color: AMBER }}>+ Add new feature</button>
                )}
              </div>
              {features.map((f, i) => (
                <div key={i} className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5">
                  <span className="flex-1 text-sm text-gray-700">{f}</span>
                  <button onClick={() => removeFeature(i)} className="text-red-400 hover:text-red-600 transition-colors flex-shrink-0">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {addingFeature && (
                <div className="flex gap-2">
                  <input type="text" value={newFeature} onChange={(e) => setNewFeature(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addFeature()} placeholder="Enter feature..." autoFocus
                    className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-amber-200 placeholder-gray-400" />
                  <button onClick={addFeature} className="px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-900 hover:opacity-90" style={{ backgroundColor: AMBER }}>Add</button>
                  <button onClick={() => { setAddingFeature(false); setNewFeature(""); }} className="px-4 py-2.5 rounded-xl text-sm border border-gray-200 text-gray-600 hover:bg-gray-50">Cancel</button>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-gray-800">Additional Charge</label>
                <button onClick={() => setAddingCharge(true)} className="text-sm font-semibold" style={{ color: AMBER }}>+ Add</button>
              </div>
              {additionalCharges.map((c, i) => (
                <div key={i} className="flex items-start gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5">
                  <span className="flex-1 text-sm text-gray-700">{c}</span>
                  <button onClick={() => removeCharge(i)} className="text-red-400 hover:text-red-600 transition-colors flex-shrink-0 mt-0.5">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {addingCharge && (
                <div className="flex gap-2">
                  <input type="text" value={newCharge} onChange={(e) => setNewCharge(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addCharge()} placeholder="e.g. Transport mileage: 45p/mile" autoFocus
                    className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-amber-200 placeholder-gray-400" />
                  <button onClick={addCharge} className="px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-900 hover:opacity-90" style={{ backgroundColor: AMBER }}>Add</button>
                  <button onClick={() => { setAddingCharge(false); setNewCharge(""); }} className="px-4 py-2.5 rounded-xl text-sm border border-gray-200 text-gray-600 hover:bg-gray-50">Cancel</button>
                </div>
              )}
            </div>
          </div>

          <div className="px-6 pb-6 pt-2 flex gap-3">
            <button onClick={onClose} className="flex-1 py-3.5 rounded-xl border border-gray-300 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors">Cancel</button>
            <button onClick={() => setShowConfirm(true)} className="flex-1 py-3.5 rounded-xl font-semibold text-sm text-gray-900 hover:opacity-90 transition-colors" style={{ backgroundColor: AMBER }}>Save Changes</button>
          </div>
        </div>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 px-4" onClick={() => setShowConfirm(false)}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm px-8 py-8 flex flex-col items-center gap-4 text-center" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold text-gray-900">Update this package?</h2>
            <p className="text-sm text-gray-500 leading-relaxed">Your edit will replace the existing information on this package details. Would you like to continue?</p>
            <div className="flex gap-3 w-full mt-2">
              <button onClick={() => setShowConfirm(false)} className="flex-1 py-3 rounded-xl border font-medium text-sm hover:opacity-90" style={{ borderColor: AMBER, color: "#c8860a" }}>Cancel</button>
              <button onClick={handleSave} disabled={submitting} className="flex-1 py-3 rounded-xl font-semibold text-sm text-gray-900 hover:opacity-90 disabled:opacity-60" style={{ backgroundColor: AMBER }}>
                {submitting ? "Saving..." : "Yes, Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      <CheckInSuccessModal isOpen={showSuccess} onClose={() => { setShowSuccess(false); onClose(); }} buttonText="Back to Packages" />
    </>
  );
}