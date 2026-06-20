// import { useState, useRef } from "react";
// import { X, Plus, ChevronDown, Upload, FileText } from "lucide-react";
// import CheckInSuccessModal from "../../modals/CheckInSuccessModal";

// const roleOptions = [
//   "Home-Help & Support Assistant",
//   "Senior Carer",
//   "Support Worker",
//   "Community Access Support",
//   "Care Assistant",
// ];

// const zoneOptions = [
//   "Canvey Island",
//   "Basildon",
//   "Southend-on-Sea",
//   "Chelmsford",
//   "Rayleigh",
// ];

// const vehicleOptions = [
//   "Yes, owns a vehicle",
//   "No vehicle",
// ];

// const sexOptions = ["Male", "Female", "Prefer not to say"];

// export default function EditStaffModal({ isOpen, onClose, staff = {} }) {
//   const [staffId]         = useState(staff.id ?? "DA0010");
//   const [role, setRole]   = useState(staff.role ?? "Home-Help & Support Assistant");
//   const [firstName, setFirstName] = useState(staff.name?.split(" ")[0] ?? "");
//   const [lastName, setLastName]   = useState(staff.name?.split(" ").slice(1).join(" ") ?? "");
//   const [email, setEmail]         = useState(staff.email ?? "");
//   const [phone, setPhone]         = useState(staff.phone ?? "");
//   const [dob, setDob]             = useState("12 Jan, 2000");
//   const [sex, setSex]             = useState("Female");
//   const [zone, setZone]           = useState("Canvey Island");
//   const [vehicle, setVehicle]     = useState("Yes, owns a vehicle");
//   const [imagePreview, setImagePreview] = useState(staff.photo ?? null);
//   const [cvPreview, setCvPreview]       = useState(null);
//   const [cvName, setCvName]             = useState(null);

//   const [showConfirm, setShowConfirm] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);

//   const imageInputRef = useRef();
//   const cvInputRef    = useRef();

//   if (!isOpen) return null;

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     setImagePreview(URL.createObjectURL(file));
//   };

//   const handleCvChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     setCvName(file.name);
//     if (file.type.startsWith("image/")) {
//       setCvPreview(URL.createObjectURL(file));
//     } else {
//       setCvPreview(null);
//     }
//   };

//   const handleSaveChanges = () => {
//     setShowConfirm(false);
//     setShowSuccess(true);
//   };

//   return (
//     <>
//       {/* ── Main modal ── */}
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
//               <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Edit Staff</h2>
//             </div>
//             <button
//               onClick={onClose}
//               className="w-8 h-8 flex items-center justify-center rounded-full
//                          hover:bg-gray-100 transition-colors"
//             >
//               <X className="w-5 h-5 text-gray-600" />
//             </button>
//           </div>

//           {/* Body */}
//           <div className="px-6 sm:px-8 py-6 flex flex-col gap-5">

//             {/* Staff ID + Staff Role */}
//             <div className="flex flex-col sm:flex-row gap-4">
//               <div className="flex flex-col gap-1.5 w-full sm:w-32 flex-shrink-0">
//                 <label className="text-sm font-medium text-gray-700">Staff ID</label>
//                 <input
//                   type="text"
//                   value={staffId}
//                   readOnly
//                   className="w-full border border-gray-200 rounded-xl px-4 py-3
//                              text-sm text-gray-700 outline-none bg-gray-50 cursor-not-allowed"
//                 />
//               </div>
//               <div className="flex flex-col gap-1.5 flex-1">
//                 <label className="text-sm font-medium text-gray-700">Staff Role</label>
//                 <div className="relative">
//                   <select
//                     value={role}
//                     onChange={(e) => setRole(e.target.value)}
//                     className="w-full border border-gray-200 rounded-xl px-4 py-3
//                                text-sm text-gray-700 outline-none appearance-none
//                                focus:ring-2 focus:ring-blue-200 bg-white"
//                   >
//                     {roleOptions.map((r) => <option key={r}>{r}</option>)}
//                   </select>
//                   <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2
//                                           w-4 h-4 text-gray-400 pointer-events-none" />
//                 </div>
//               </div>
//             </div>

//             {/* First Name + Last Name */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div className="flex flex-col gap-1.5">
//                 <label className="text-sm font-medium text-gray-700">First Name</label>
//                 <input
//                   type="text"
//                   value={firstName}
//                   onChange={(e) => setFirstName(e.target.value)}
//                   placeholder="Lauren"
//                   className="w-full border border-gray-200 rounded-xl px-4 py-3
//                              text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-200"
//                 />
//               </div>
//               <div className="flex flex-col gap-1.5">
//                 <label className="text-sm font-medium text-gray-700">Last Name</label>
//                 <input
//                   type="text"
//                   value={lastName}
//                   onChange={(e) => setLastName(e.target.value)}
//                   placeholder="James"
//                   className="w-full border border-gray-200 rounded-xl px-4 py-3
//                              text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-200"
//                 />
//               </div>
//             </div>

//             {/* Email + Phone */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div className="flex flex-col gap-1.5">
//                 <label className="text-sm font-medium text-gray-700">Email Address</label>
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="Allansarah@gmail.com"
//                   className="w-full border border-gray-200 rounded-xl px-4 py-3
//                              text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-200"
//                 />
//               </div>
//               <div className="flex flex-col gap-1.5">
//                 <label className="text-sm font-medium text-gray-700">Phone Number</label>
//                 <input
//                   type="tel"
//                   value={phone}
//                   onChange={(e) => setPhone(e.target.value)}
//                   placeholder="01234 567 890"
//                   className="w-full border border-gray-200 rounded-xl px-4 py-3
//                              text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-200"
//                 />
//               </div>
//             </div>

//             {/* Date of Birth + Sex */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div className="flex flex-col gap-1.5">
//                 <label className="text-sm font-medium text-gray-700">Date of Birth</label>
//                 <input
//                   type="text"
//                   value={dob}
//                   onChange={(e) => setDob(e.target.value)}
//                   placeholder="12 Jan, 2000"
//                   className="w-full border border-gray-200 rounded-xl px-4 py-3
//                              text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-200"
//                 />
//               </div>
//               <div className="flex flex-col gap-1.5">
//                 <label className="text-sm font-medium text-gray-700">Sex</label>
//                 <div className="relative">
//                   <select
//                     value={sex}
//                     onChange={(e) => setSex(e.target.value)}
//                     className="w-full border border-gray-200 rounded-xl px-4 py-3
//                                text-sm text-gray-700 outline-none appearance-none
//                                focus:ring-2 focus:ring-blue-200 bg-white"
//                   >
//                     {sexOptions.map((s) => <option key={s}>{s}</option>)}
//                   </select>
//                   <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2
//                                           w-4 h-4 text-gray-400 pointer-events-none" />
//                 </div>
//               </div>
//             </div>

//             {/* Staff Zone + Staff Owns Vehicle */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div className="flex flex-col gap-1.5">
//                 <label className="text-sm font-medium text-gray-700">Staff Zone</label>
//                 <div className="relative">
//                   <select
//                     value={zone}
//                     onChange={(e) => setZone(e.target.value)}
//                     className="w-full border border-gray-200 rounded-xl px-4 py-3
//                                text-sm text-gray-700 outline-none appearance-none
//                                focus:ring-2 focus:ring-blue-200 bg-white"
//                   >
//                     {zoneOptions.map((z) => <option key={z}>{z}</option>)}
//                   </select>
//                   <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2
//                                           w-4 h-4 text-gray-400 pointer-events-none" />
//                 </div>
//               </div>
//               <div className="flex flex-col gap-1.5">
//                 <label className="text-sm font-medium text-gray-700">Staff Owns Vehicle</label>
//                 <div className="relative">
//                   <select
//                     value={vehicle}
//                     onChange={(e) => setVehicle(e.target.value)}
//                     className="w-full border border-gray-200 rounded-xl px-4 py-3
//                                text-sm text-gray-700 outline-none appearance-none
//                                focus:ring-2 focus:ring-blue-200 bg-white"
//                   >
//                     {vehicleOptions.map((v) => <option key={v}>{v}</option>)}
//                   </select>
//                   <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2
//                                           w-4 h-4 text-gray-400 pointer-events-none" />
//                 </div>
//               </div>
//             </div>

//             {/* Upload Image */}
//             <div className="flex flex-col gap-2">
//               <label className="text-sm font-medium text-gray-700">Upload Image</label>
//               <div
//                 onClick={() => imageInputRef.current.click()}
//                 className="w-full border border-gray-200 rounded-xl p-4 cursor-pointer
//                            hover:bg-gray-50 transition-colors min-h-[120px] flex items-center
//                            justify-start gap-4"
//               >
//                 {imagePreview ? (
//                   <img
//                     src={imagePreview}
//                     alt="Staff"
//                     className="w-24 h-24 rounded-xl object-cover flex-shrink-0"
//                   />
//                 ) : (
//                   <div className="w-24 h-24 rounded-xl bg-gray-100 flex flex-col
//                                   items-center justify-center gap-1 flex-shrink-0">
//                     <Upload className="w-6 h-6 text-gray-400" />
//                     <span className="text-xs text-gray-400">Upload</span>
//                   </div>
//                 )}
//               </div>
//               <input
//                 ref={imageInputRef}
//                 type="file"
//                 accept="image/*"
//                 className="hidden"
//                 onChange={handleImageChange}
//               />
//             </div>

//             {/* Upload CV */}
//             <div className="flex flex-col gap-2">
//               <label className="text-sm font-medium text-gray-700">Upload CV</label>
//               <div
//                 onClick={() => cvInputRef.current.click()}
//                 className="w-full border border-gray-200 rounded-xl p-4 cursor-pointer
//                            hover:bg-gray-50 transition-colors min-h-[120px] flex items-center
//                            justify-start gap-4"
//               >
//                 {cvPreview ? (
//                   <img
//                     src={cvPreview}
//                     alt="CV Preview"
//                     className="w-full max-h-48 object-contain rounded-xl"
//                   />
//                 ) : cvName ? (
//                   <div className="flex items-center gap-3">
//                     <FileText className="w-10 h-10 text-blue-400 flex-shrink-0" />
//                     <span className="text-sm text-gray-600 truncate">{cvName}</span>
//                   </div>
//                 ) : (
//                   <div className="flex flex-col items-center justify-center w-full gap-2 py-4">
//                     <Upload className="w-8 h-8 text-gray-300" />
//                     <span className="text-sm text-gray-400">Click to upload CV (PDF or image)</span>
//                   </div>
//                 )}
//               </div>
//               <input
//                 ref={cvInputRef}
//                 type="file"
//                 accept=".pdf,image/*"
//                 className="hidden"
//                 onChange={handleCvChange}
//               />
//             </div>
//           </div>

//           {/* Footer */}
//           <div className="px-6 sm:px-8 pb-6 pt-2">
//             <button
//               onClick={() => setShowConfirm(true)}
//               className="w-full flex items-center justify-center gap-2 py-4 rounded-xl
//                          font-semibold text-base bg-blue-500 hover:bg-blue-600
//                          text-white transition-all duration-200"
//             >
//               Save Changes
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* ── Confirm modal ── */}
//       {showConfirm && (
//         <div
//           className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 px-4"
//           onClick={() => setShowConfirm(false)}
//         >
//           <div
//             className="bg-white rounded-2xl shadow-xl w-full max-w-sm px-8 py-8
//                        flex flex-col items-center gap-4 text-center"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <h2 className="text-xl font-bold text-gray-900">Update staff details?</h2>
//             <p className="text-sm text-gray-500 leading-relaxed">
//               Your edit will replace the existing information on this staff's
//               profile. Would you like to continue?
//             </p>
//             <div className="flex gap-3 w-full mt-2">
//               <button
//                 onClick={() => setShowConfirm(false)}
//                 className="flex-1 py-3 rounded-xl border border-blue-400
//                            text-blue-500 font-medium text-sm hover:bg-blue-50 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSaveChanges}
//                 className="flex-1 py-3 rounded-xl bg-blue-500 hover:bg-blue-600
//                            text-white font-semibold text-sm transition-colors"
//               >
//                 Yes, Save Changes
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ── Success modal ── */}
//       <CheckInSuccessModal
//         isOpen={showSuccess}
//         onClose={() => {
//           setShowSuccess(false);
//           onClose();
//         }}
//       />
//     </>
//   );
// }


import { useState, useRef } from "react";
import { X, Plus, ChevronDown, Upload, FileText } from "lucide-react";
import CheckInSuccessModal from "../../modals/CheckInSuccessModal";
import { staffAPI } from "../../../services/api";

const roleOptions = [
  "Home-Help & Support Assistant",
  "Senior Carer",
  "Support Worker",
  "Community Access Support",
  "Care Assistant",
];

const zoneOptions = [
  "Canvey Island",
  "Basildon",
  "Southend-on-Sea",
  "Chelmsford",
  "Rayleigh",
];

const vehicleOptions = ["Yes, owns a vehicle", "No vehicle"];
const sexOptions = ["Male", "Female", "Prefer not to say"];

export default function EditStaffModal({ isOpen, onClose, staff = {}, onSuccess }) {
  const [staffId]         = useState(staff.id ?? "");
  const [role, setRole]   = useState(staff.role ?? "Home-Help & Support Assistant");
  const [firstName, setFirstName] = useState(staff.name?.split(" ")[0] ?? "");
  const [lastName, setLastName]   = useState(staff.name?.split(" ").slice(1).join(" ") ?? "");
  const [email, setEmail]         = useState(staff.email ?? "");
  const [phone, setPhone]         = useState(staff.phone ?? "");
  const [dob, setDob]             = useState(staff.dob ?? "");
  const [sex, setSex]             = useState(staff.sex ?? "");
  const [zone, setZone]           = useState(staff.zone ?? "");
  const [vehicle, setVehicle]     = useState(staff.vehicle ?? "");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(staff.photo ?? null);
  const [cvFile, setCvFile]       = useState(null);
  const [cvName, setCvName]       = useState(null);

  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submitting, setSubmitting]   = useState(false);
  const [apiError, setApiError]       = useState(null);

  const imageInputRef = useRef();
  const cvInputRef    = useRef();

  if (!isOpen) return null;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleCvChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setCvFile(file);
    setCvName(file.name);
  };

  const handleSaveChanges = async () => {
    setSubmitting(true);
    setApiError(null);
    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("role", role);
      formData.append("dob", dob);
      formData.append("sex", sex);
      formData.append("zone", zone);
      formData.append("vehicle", vehicle);
      if (imageFile) formData.append("photo", imageFile);
      if (cvFile)    formData.append("cv", cvFile);

      await staffAPI.update(staffId, formData);
      setShowConfirm(false);
      setShowSuccess(true);
      if (onSuccess) onSuccess();
    } catch (err) {
      setApiError(err.response?.data?.message || "Failed to update staff. Please try again.");
      setShowConfirm(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-start justify-center
                     bg-black/40 px-3 sm:px-6 py-4 sm:py-6 overflow-y-auto"
        onClick={onClose}>
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl mx-auto flex flex-col"
          onClick={(e) => e.stopPropagation()}>

          <div className="flex items-center justify-between px-6 sm:px-8 pt-6 pb-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <Plus className="w-6 h-6 text-gray-800" />
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Edit Staff</h2>
            </div>
            <button onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {apiError && (
            <div className="mx-6 sm:mx-8 mt-4 px-4 py-3 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-sm text-red-500">{apiError}</p>
            </div>
          )}

          <div className="px-6 sm:px-8 py-6 flex flex-col gap-5">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex flex-col gap-1.5 w-full sm:w-32 flex-shrink-0">
                <label className="text-sm font-medium text-gray-700">Staff ID</label>
                <input type="text" value={staffId} readOnly
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none bg-gray-50 cursor-not-allowed" />
              </div>
              <div className="flex flex-col gap-1.5 flex-1">
                <label className="text-sm font-medium text-gray-700">Staff Role</label>
                <div className="relative">
                  <select value={role} onChange={(e) => setRole(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none appearance-none focus:ring-2 focus:ring-blue-200 bg-white">
                    {roleOptions.map((r) => <option key={r}>{r}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                <label className="text-sm font-medium text-gray-700">Staff Zone</label>
                <div className="relative">
                  <select value={zone} onChange={(e) => setZone(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none appearance-none focus:ring-2 focus:ring-blue-200 bg-white">
                    {zoneOptions.map((z) => <option key={z}>{z}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">Staff Owns Vehicle</label>
                <div className="relative">
                  <select value={vehicle} onChange={(e) => setVehicle(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none appearance-none focus:ring-2 focus:ring-blue-200 bg-white">
                    {vehicleOptions.map((v) => <option key={v}>{v}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">Upload Image</label>
              <div onClick={() => imageInputRef.current.click()}
                className="w-full border border-gray-200 rounded-xl p-4 cursor-pointer
                           hover:bg-gray-50 transition-colors min-h-[120px] flex items-center justify-start gap-4">
                {imagePreview ? (
                  <img src={imagePreview} alt="Staff" className="w-24 h-24 rounded-xl object-cover flex-shrink-0" />
                ) : (
                  <div className="w-24 h-24 rounded-xl bg-gray-100 flex flex-col items-center justify-center gap-1 flex-shrink-0">
                    <Upload className="w-6 h-6 text-gray-400" />
                    <span className="text-xs text-gray-400">Upload</span>
                  </div>
                )}
              </div>
              <input ref={imageInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">Upload CV</label>
              <div onClick={() => cvInputRef.current.click()}
                className="w-full border border-gray-200 rounded-xl p-4 cursor-pointer
                           hover:bg-gray-50 transition-colors min-h-[120px] flex items-center justify-start gap-4">
                {cvName ? (
                  <div className="flex items-center gap-3">
                    <FileText className="w-10 h-10 text-blue-400 flex-shrink-0" />
                    <span className="text-sm text-gray-600 truncate">{cvName}</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center w-full gap-2 py-4">
                    <Upload className="w-8 h-8 text-gray-300" />
                    <span className="text-sm text-gray-400">Click to upload CV (PDF or image)</span>
                  </div>
                )}
              </div>
              <input ref={cvInputRef} type="file" accept=".pdf,image/*" className="hidden" onChange={handleCvChange} />
            </div>
          </div>

          <div className="px-6 sm:px-8 pb-6 pt-2">
            <button onClick={() => setShowConfirm(true)}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-xl
                         font-semibold text-base bg-blue-500 hover:bg-blue-600
                         text-white transition-all duration-200">
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 px-4"
          onClick={() => setShowConfirm(false)}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm px-8 py-8
                         flex flex-col items-center gap-4 text-center"
            onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold text-gray-900">Update staff details?</h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              Your edit will replace the existing information on this staff's profile. Would you like to continue?
            </p>
            <div className="flex gap-3 w-full mt-2">
              <button onClick={() => setShowConfirm(false)}
                className="flex-1 py-3 rounded-xl border border-blue-400 text-blue-500 font-medium text-sm hover:bg-blue-50 transition-colors">
                Cancel
              </button>
              <button onClick={handleSaveChanges} disabled={submitting}
                className="flex-1 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold text-sm transition-colors disabled:opacity-60">
                {submitting ? "Saving..." : "Yes, Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      <CheckInSuccessModal
        isOpen={showSuccess}
        onClose={() => { setShowSuccess(false); onClose(); }}
      />
    </>
  );
}