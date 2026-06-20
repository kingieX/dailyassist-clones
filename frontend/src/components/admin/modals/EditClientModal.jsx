// import { useState } from "react";
// import { X, Plus, ChevronDown } from "lucide-react";
// import CheckInSuccessModal from "../../modals/CheckInSuccessModal";

// const titleOptions   = ["Mr.", "Mrs.", "Ms.", "Dr.", "Prof."];
// const sexOptions     = ["Male", "Female", "Prefer not to say"];
// const packageOptions = ["Basic Package", "Standard Package", "Premium Package"];
// const zoneOptions    = ["Canvey Island", "Basildon", "Southend-on-Sea", "Chelmsford", "Rayleigh"];

// export default function EditClientModal({ isOpen, onClose, client = {} }) {
//   const [title, setTitle]       = useState(client.title     ?? "Mrs.");
//   const [firstName, setFirstName] = useState(client.firstName ?? "");
//   const [lastName, setLastName]   = useState(client.lastName  ?? "");
//   const [email, setEmail]         = useState(client.email     ?? "");
//   const [phone, setPhone]         = useState(client.phone     ?? "");
//   const [dob, setDob]             = useState(client.dob       ?? "");
//   const [sex, setSex]             = useState(client.sex       ?? "Female");
//   const [address, setAddress]     = useState(client.address   ?? "");
//   const [zone, setZone]           = useState(client.zone      ?? "Canvey Island");
//   const [pkg, setPkg]             = useState(client.package   ?? "Standard Package");

//   const [showConfirm, setShowConfirm] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);

//   if (!isOpen) return null;

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
//           className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl mx-auto flex flex-col"
//           onClick={(e) => e.stopPropagation()}
//         >
//           {/* Header */}
//           <div className="flex items-center justify-between px-6 sm:px-8 pt-6 pb-4 border-b border-gray-100">
//             <div className="flex items-center gap-3">
//               <Plus className="w-6 h-6 text-gray-800" />
//               <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Edit Client</h2>
//             </div>
//             <button onClick={onClose}
//               className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
//               <X className="w-5 h-5 text-gray-600" />
//             </button>
//           </div>

//           {/* Body */}
//           <div className="px-6 sm:px-8 py-6 flex flex-col gap-5">

//             {/* Client ID (read-only) */}
//             <div className="flex flex-col gap-1.5 w-32">
//               <label className="text-sm font-medium text-gray-700">Client ID</label>
//               <input type="text" value={client.id ?? ""} readOnly
//                 className="w-full border border-gray-200 rounded-xl px-4 py-3
//                            text-sm text-gray-700 bg-gray-50 cursor-not-allowed outline-none" />
//             </div>

//             {/* Title + First Name + Last Name */}
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//               <div className="flex flex-col gap-1.5">
//                 <label className="text-sm font-medium text-gray-700">Title</label>
//                 <div className="relative">
//                   <select value={title} onChange={(e) => setTitle(e.target.value)}
//                     className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm
//                                text-gray-700 outline-none appearance-none focus:ring-2
//                                focus:ring-blue-200 bg-white">
//                     {titleOptions.map((t) => <option key={t}>{t}</option>)}
//                   </select>
//                   <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4
//                                           text-gray-400 pointer-events-none" />
//                 </div>
//               </div>
//               <div className="flex flex-col gap-1.5">
//                 <label className="text-sm font-medium text-gray-700">First Name</label>
//                 <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}
//                   className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm
//                              text-gray-700 outline-none focus:ring-2 focus:ring-blue-200" />
//               </div>
//               <div className="flex flex-col gap-1.5">
//                 <label className="text-sm font-medium text-gray-700">Last Name</label>
//                 <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}
//                   className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm
//                              text-gray-700 outline-none focus:ring-2 focus:ring-blue-200" />
//               </div>
//             </div>

//             {/* Email + Phone */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div className="flex flex-col gap-1.5">
//                 <label className="text-sm font-medium text-gray-700">Email Address</label>
//                 <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
//                   className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm
//                              text-gray-700 outline-none focus:ring-2 focus:ring-blue-200" />
//               </div>
//               <div className="flex flex-col gap-1.5">
//                 <label className="text-sm font-medium text-gray-700">Phone Number</label>
//                 <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
//                   className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm
//                              text-gray-700 outline-none focus:ring-2 focus:ring-blue-200" />
//               </div>
//             </div>

//             {/* DOB + Sex */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div className="flex flex-col gap-1.5">
//                 <label className="text-sm font-medium text-gray-700">Date of Birth</label>
//                 <input type="text" value={dob} onChange={(e) => setDob(e.target.value)}
//                   className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm
//                              text-gray-700 outline-none focus:ring-2 focus:ring-blue-200" />
//               </div>
//               <div className="flex flex-col gap-1.5">
//                 <label className="text-sm font-medium text-gray-700">Sex</label>
//                 <div className="relative">
//                   <select value={sex} onChange={(e) => setSex(e.target.value)}
//                     className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm
//                                text-gray-700 outline-none appearance-none focus:ring-2
//                                focus:ring-blue-200 bg-white">
//                     {sexOptions.map((s) => <option key={s}>{s}</option>)}
//                   </select>
//                   <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4
//                                           text-gray-400 pointer-events-none" />
//                 </div>
//               </div>
//             </div>

//             {/* Zone + Package */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div className="flex flex-col gap-1.5">
//                 <label className="text-sm font-medium text-gray-700">Zone</label>
//                 <div className="relative">
//                   <select value={zone} onChange={(e) => setZone(e.target.value)}
//                     className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm
//                                text-gray-700 outline-none appearance-none focus:ring-2
//                                focus:ring-blue-200 bg-white">
//                     {zoneOptions.map((z) => <option key={z}>{z}</option>)}
//                   </select>
//                   <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4
//                                           text-gray-400 pointer-events-none" />
//                 </div>
//               </div>
//               <div className="flex flex-col gap-1.5">
//                 <label className="text-sm font-medium text-gray-700">Package</label>
//                 <div className="relative">
//                   <select value={pkg} onChange={(e) => setPkg(e.target.value)}
//                     className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm
//                                text-gray-700 outline-none appearance-none focus:ring-2
//                                focus:ring-blue-200 bg-white">
//                     {packageOptions.map((p) => <option key={p}>{p}</option>)}
//                   </select>
//                   <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4
//                                           text-gray-400 pointer-events-none" />
//                 </div>
//               </div>
//             </div>

//             {/* Address */}
//             <div className="flex flex-col gap-1.5">
//               <label className="text-sm font-medium text-gray-700">
//                 Address <span className="text-red-500">*</span>
//               </label>
//               <input type="text" value={address} onChange={(e) => setAddress(e.target.value)}
//                 className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm
//                            text-gray-700 outline-none focus:ring-2 focus:ring-blue-200" />
//             </div>
//           </div>

//           {/* Footer */}
//           <div className="px-6 sm:px-8 pb-6 pt-2">
//             <button onClick={() => setShowConfirm(true)}
//               className="w-full flex items-center justify-center gap-2 py-4 rounded-xl
//                          font-semibold text-base bg-blue-500 hover:bg-blue-600
//                          text-white transition-all duration-200">
//               Save Changes
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Confirm modal */}
//       {showConfirm && (
//         <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 px-4"
//           onClick={() => setShowConfirm(false)}>
//           <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm px-8 py-8
//                          flex flex-col items-center gap-4 text-center"
//             onClick={(e) => e.stopPropagation()}>
//             <h2 className="text-xl font-bold text-gray-900">Update client details?</h2>
//             <p className="text-sm text-gray-500 leading-relaxed">
//               Your edit will replace the existing information on this client's
//               profile. Would you like to continue?
//             </p>
//             <div className="flex gap-3 w-full mt-2">
//               <button onClick={() => setShowConfirm(false)}
//                 className="flex-1 py-3 rounded-xl border border-blue-400
//                            text-blue-500 font-medium text-sm hover:bg-blue-50 transition-colors">
//                 Cancel
//               </button>
//               <button onClick={handleSave}
//                 className="flex-1 py-3 rounded-xl bg-blue-500 hover:bg-blue-600
//                            text-white font-semibold text-sm transition-colors">
//                 Yes, Save Changes
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Success modal */}
//       <CheckInSuccessModal
//         isOpen={showSuccess}
//         onClose={() => { setShowSuccess(false); onClose(); }}
//       />
//     </>
//   );
// }

import { useState } from "react";
import { X, Plus, ChevronDown } from "lucide-react";
import CheckInSuccessModal from "../../modals/CheckInSuccessModal";
import { clientsAPI } from "../../../services/api";

const titleOptions   = ["Mr.", "Mrs.", "Ms.", "Dr.", "Prof."];
const sexOptions     = ["Male", "Female", "Prefer not to say"];
const packageOptions = ["Basic Package", "Standard Package", "Premium Package"];
const zoneOptions    = ["Canvey Island", "Basildon", "Southend-on-Sea", "Chelmsford", "Rayleigh"];

export default function EditClientModal({ isOpen, onClose, client = {}, onSuccess }) {
  const [title, setTitle]         = useState(client.title     ?? "Mrs.");
  const [firstName, setFirstName] = useState(client.firstName ?? "");
  const [lastName, setLastName]   = useState(client.lastName  ?? "");
  const [email, setEmail]         = useState(client.email     ?? "");
  const [phone, setPhone]         = useState(client.phone     ?? "");
  const [dob, setDob]             = useState(client.dob       ?? "");
  const [sex, setSex]             = useState(client.sex       ?? "Female");
  const [address, setAddress]     = useState(client.address   ?? "");
  const [zone, setZone]           = useState(client.zone      ?? "Canvey Island");
  const [pkg, setPkg]             = useState(client.package   ?? "Standard Package");

  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submitting, setSubmitting]   = useState(false);
  const [apiError, setApiError]       = useState(null);

  if (!isOpen) return null;

  const handleSave = async () => {
    setSubmitting(true);
    setApiError(null);
    try {
      await clientsAPI.update(client.id, {
        title, firstName, lastName, email, phone,
        dob, sex, address, zone, package: pkg,
      });
      setShowConfirm(false);
      setShowSuccess(true);
      if (onSuccess) onSuccess();
    } catch (err) {
      setApiError(err.response?.data?.message || "Failed to update client. Please try again.");
      setShowConfirm(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-start justify-center
                     bg-black/40 px-3 sm:px-6 py-4 sm:py-6 overflow-y-auto" onClick={onClose}>
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl mx-auto flex flex-col"
          onClick={(e) => e.stopPropagation()}>

          <div className="flex items-center justify-between px-6 sm:px-8 pt-6 pb-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <Plus className="w-6 h-6 text-gray-800" />
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Edit Client</h2>
            </div>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {apiError && (
            <div className="mx-6 sm:mx-8 mt-4 px-4 py-3 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-sm text-red-500">{apiError}</p>
            </div>
          )}

          <div className="px-6 sm:px-8 py-6 flex flex-col gap-5">
            <div className="flex flex-col gap-1.5 w-32">
              <label className="text-sm font-medium text-gray-700">Client ID</label>
              <input type="text" value={client.id ?? ""} readOnly
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 bg-gray-50 cursor-not-allowed outline-none" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">Title</label>
                <div className="relative">
                  <select value={title} onChange={(e) => setTitle(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none appearance-none focus:ring-2 focus:ring-blue-200 bg-white">
                    {titleOptions.map((t) => <option key={t}>{t}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">First Name</label>
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-200" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">Last Name</label>
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-200" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">Email Address</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-200" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">Phone Number</label>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-200" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">Date of Birth</label>
                <input type="text" value={dob} onChange={(e) => setDob(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-200" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">Sex</label>
                <div className="relative">
                  <select value={sex} onChange={(e) => setSex(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none appearance-none focus:ring-2 focus:ring-blue-200 bg-white">
                    {sexOptions.map((s) => <option key={s}>{s}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">Zone</label>
                <div className="relative">
                  <select value={zone} onChange={(e) => setZone(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none appearance-none focus:ring-2 focus:ring-blue-200 bg-white">
                    {zoneOptions.map((z) => <option key={z}>{z}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">Package</label>
                <div className="relative">
                  <select value={pkg} onChange={(e) => setPkg(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none appearance-none focus:ring-2 focus:ring-blue-200 bg-white">
                    {packageOptions.map((p) => <option key={p}>{p}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Address <span className="text-red-500">*</span></label>
              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-200" />
            </div>
          </div>

          <div className="px-6 sm:px-8 pb-6 pt-2">
            <button onClick={() => setShowConfirm(true)}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-xl
                         font-semibold text-base bg-blue-500 hover:bg-blue-600 text-white transition-all duration-200">
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 px-4" onClick={() => setShowConfirm(false)}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm px-8 py-8 flex flex-col items-center gap-4 text-center" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold text-gray-900">Update client details?</h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              Your edit will replace the existing information on this client's profile. Would you like to continue?
            </p>
            <div className="flex gap-3 w-full mt-2">
              <button onClick={() => setShowConfirm(false)}
                className="flex-1 py-3 rounded-xl border border-blue-400 text-blue-500 font-medium text-sm hover:bg-blue-50 transition-colors">
                Cancel
              </button>
              <button onClick={handleSave} disabled={submitting}
                className="flex-1 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold text-sm transition-colors disabled:opacity-60">
                {submitting ? "Saving..." : "Yes, Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      <CheckInSuccessModal isOpen={showSuccess} onClose={() => { setShowSuccess(false); onClose(); }} />
    </>
  );
}