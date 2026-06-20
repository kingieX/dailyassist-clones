// import { useState, useRef } from "react";
// import { X, Plus, ChevronDown, CloudUpload, Image, Users } from "lucide-react";
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

// const vehicleOptions = ["Yes, owns a vehicle", "No vehicle"];
// const sexOptions     = ["Male", "Female", "Prefer not to say"];

// const AMBER = "#f5c045";

// export default function AddStaffModal({ isOpen, onClose }) {
//   const [role, setRole]           = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName]   = useState("");
//   const [email, setEmail]         = useState("");
//   const [phone, setPhone]         = useState("");
//   const [dob, setDob]             = useState("");
//   const [sex, setSex]             = useState("");
//   const [zone, setZone]           = useState("");
//   const [vehicle, setVehicle]     = useState("");
//   const [imageFile, setImageFile] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [cvFile, setCvFile]       = useState(null);
//   const [cvDragOver, setCvDragOver] = useState(false);

//   const [showConfirm, setShowConfirm] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);

//   const imageInputRef = useRef();
//   const cvInputRef    = useRef();

//   if (!isOpen) return null;

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     setImageFile(file);
//     setImagePreview(URL.createObjectURL(file));
//   };

//   const handleCvChange = (e) => {
//     const file = e.target.files[0];
//     if (file) setCvFile(file);
//   };

//   const handleCvDrop = (e) => {
//     e.preventDefault();
//     setCvDragOver(false);
//     const file = e.dataTransfer.files[0];
//     if (file) setCvFile(file);
//   };

//   const handleAddStaff = () => {
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
//           <div className="flex items-center justify-between px-6 sm:px-8 pt-6 pb-4
//                           border-b border-gray-100">
//             <div className="flex items-center gap-3">
//               <Plus className="w-6 h-6 text-gray-800" />
//               <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Add Staff</h2>
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
//                 <label className="text-sm font-semibold text-gray-800">Staff ID</label>
//                 <input
//                   type="text"
//                   value="DA0010"
//                   readOnly
//                   className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm
//                              text-gray-700 bg-gray-50 cursor-not-allowed outline-none"
//                 />
//               </div>
//               <div className="flex flex-col gap-1.5 flex-1">
//                 <label className="text-sm font-semibold text-gray-800">Staff Role</label>
//                 <div className="relative">
//                   <select
//                     value={role}
//                     onChange={(e) => setRole(e.target.value)}
//                     className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm
//                                text-gray-700 outline-none appearance-none bg-gray-50
//                                focus:ring-2 focus:ring-amber-200"
//                   >
//                     <option value="">Select Staff Role</option>
//                     {roleOptions.map((r) => <option key={r}>{r}</option>)}
//                   </select>
//                   <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2
//                                            w-4 h-4 text-gray-400 pointer-events-none" />
//                 </div>
//               </div>
//             </div>

//             {/* First Name + Last Name */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div className="flex flex-col gap-1.5">
//                 <label className="text-sm font-semibold text-gray-800">First Name</label>
//                 <input type="text" value={firstName}
//                   onChange={(e) => setFirstName(e.target.value)}
//                   placeholder="First name"
//                   className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm
//                              text-gray-700 outline-none bg-gray-50 focus:ring-2
//                              focus:ring-amber-200 placeholder-gray-400" />
//               </div>
//               <div className="flex flex-col gap-1.5">
//                 <label className="text-sm font-semibold text-gray-800">Last Name</label>
//                 <input type="text" value={lastName}
//                   onChange={(e) => setLastName(e.target.value)}
//                   placeholder="Last name"
//                   className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm
//                              text-gray-700 outline-none bg-gray-50 focus:ring-2
//                              focus:ring-amber-200 placeholder-gray-400" />
//               </div>
//             </div>

//             {/* Email + Phone */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div className="flex flex-col gap-1.5">
//                 <label className="text-sm font-semibold text-gray-800">Email Address</label>
//                 <input type="email" value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="Enter email address"
//                   className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm
//                              text-gray-700 outline-none bg-gray-50 focus:ring-2
//                              focus:ring-amber-200 placeholder-gray-400" />
//               </div>
//               <div className="flex flex-col gap-1.5">
//                 <label className="text-sm font-semibold text-gray-800">Phone Number</label>
//                 <input type="tel" value={phone}
//                   onChange={(e) => setPhone(e.target.value)}
//                   placeholder="(123) 456 - 789"
//                   className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm
//                              text-gray-700 outline-none bg-gray-50 focus:ring-2
//                              focus:ring-amber-200 placeholder-gray-400" />
//               </div>
//             </div>

//             {/* Date of Birth + Sex */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div className="flex flex-col gap-1.5">
//                 <label className="text-sm font-semibold text-gray-800">Date of Birth</label>
//                 <input type="text" value={dob}
//                   onChange={(e) => setDob(e.target.value)}
//                   placeholder="Enter date of birth"
//                   className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm
//                              text-gray-700 outline-none bg-gray-50 focus:ring-2
//                              focus:ring-amber-200 placeholder-gray-400" />
//               </div>
//               <div className="flex flex-col gap-1.5">
//                 <label className="text-sm font-semibold text-gray-800">Sex</label>
//                 <div className="relative">
//                   <select value={sex} onChange={(e) => setSex(e.target.value)}
//                     className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm
//                                text-gray-700 outline-none appearance-none bg-gray-50
//                                focus:ring-2 focus:ring-amber-200">
//                     <option value="">Select</option>
//                     {sexOptions.map((s) => <option key={s}>{s}</option>)}
//                   </select>
//                   <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2
//                                            w-4 h-4 text-gray-400 pointer-events-none" />
//                 </div>
//               </div>
//             </div>

//             {/* Staff Zone + Staff Owns Vehicle */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div className="flex flex-col gap-1.5">
//                 <label className="text-sm font-semibold text-gray-800">Staff Zone</label>
//                 <div className="relative">
//                   <select value={zone} onChange={(e) => setZone(e.target.value)}
//                     className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm
//                                text-gray-700 outline-none appearance-none bg-gray-50
//                                focus:ring-2 focus:ring-amber-200">
//                     <option value="">Select Zone</option>
//                     {zoneOptions.map((z) => <option key={z}>{z}</option>)}
//                   </select>
//                   <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2
//                                            w-4 h-4 text-gray-400 pointer-events-none" />
//                 </div>
//               </div>
//               <div className="flex flex-col gap-1.5">
//                 <label className="text-sm font-semibold text-gray-800">Staff Owns Vehicle</label>
//                 <div className="relative">
//                   <select value={vehicle} onChange={(e) => setVehicle(e.target.value)}
//                     className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm
//                                text-gray-700 outline-none appearance-none bg-gray-50
//                                focus:ring-2 focus:ring-amber-200">
//                     <option value="">Select</option>
//                     {vehicleOptions.map((v) => <option key={v}>{v}</option>)}
//                   </select>
//                   <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2
//                                            w-4 h-4 text-gray-400 pointer-events-none" />
//                 </div>
//               </div>
//             </div>

//             {/* Upload Image */}
//             <div className="flex flex-col gap-2">
//               <label className="text-sm font-semibold text-gray-800">Upload Image</label>
//               <div
//                 onClick={() => imageInputRef.current.click()}
//                 className="w-full border-2 border-dashed border-gray-200 rounded-xl p-6
//                            flex flex-col items-center justify-center gap-2 cursor-pointer
//                            hover:border-gray-300 transition-colors min-h-[120px]"
//               >
//                 {imagePreview ? (
//                   <img src={imagePreview} alt="Preview"
//                     className="w-20 h-20 rounded-xl object-cover" />
//                 ) : (
//                   <>
//                     <Image className="w-8 h-8 text-gray-300" />
//                     <p className="text-sm text-gray-500 text-center">
//                       <span className="font-semibold" style={{ color: AMBER }}>
//                         Click to upload
//                       </span>{" "}
//                       or drag and drop
//                     </p>
//                     <p className="text-xs text-gray-400">JPG, JPEG, PNG less than 1MB</p>
//                   </>
//                 )}
//               </div>
//               <input ref={imageInputRef} type="file" accept="image/*"
//                 className="hidden" onChange={handleImageChange} />
//             </div>

//             {/* Upload CV */}
//             <div className="flex flex-col gap-2">
//               <label className="text-sm font-semibold text-gray-800">Upload CV</label>
//               <div
//                 onDragOver={(e) => { e.preventDefault(); setCvDragOver(true); }}
//                 onDragLeave={() => setCvDragOver(false)}
//                 onDrop={handleCvDrop}
//                 onClick={() => cvInputRef.current.click()}
//                 className={`w-full border-2 border-dashed rounded-xl p-8 flex flex-col
//                             items-center justify-center gap-3 cursor-pointer transition-colors
//                             ${cvDragOver
//                               ? "border-amber-400 bg-amber-50"
//                               : "border-gray-200 hover:border-gray-300 bg-white"}`}
//               >
//                 <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center
//                                 justify-center">
//                   <CloudUpload className="w-6 h-6 text-gray-400" />
//                 </div>

//                 {cvFile ? (
//                   <p className="text-sm font-semibold text-amber-600">{cvFile.name}</p>
//                 ) : (
//                   <>
//                     <p className="text-sm text-gray-600 text-center">
//                       <span className="font-semibold" style={{ color: AMBER }}>
//                         Click to upload
//                       </span>{" "}
//                       or drag and drop
//                     </p>
//                     <p className="text-xs text-gray-400">
//                       SVG, PNG, JPG or GIF (max. 800×400px)
//                     </p>
//                   </>
//                 )}

//                 <div className="flex items-center gap-3 w-full max-w-xs">
//                   <hr className="flex-1 border-gray-200" />
//                   <span className="text-xs text-gray-400">OR</span>
//                   <hr className="flex-1 border-gray-200" />
//                 </div>

//                 <button
//                   type="button"
//                   onClick={(e) => { e.stopPropagation(); cvInputRef.current.click(); }}
//                   className="px-6 py-2.5 rounded-xl text-sm font-semibold text-gray-900
//                              transition-colors hover:opacity-90"
//                   style={{ backgroundColor: AMBER }}
//                 >
//                   Browse Files
//                 </button>
//               </div>
//               <input ref={cvInputRef} type="file" accept=".pdf,.doc,.docx,image/*"
//                 className="hidden" onChange={handleCvChange} />
//             </div>
//           </div>

//           {/* Footer */}
//           <div className="px-6 sm:px-8 pb-6 pt-2">
//             <button
//               onClick={() => setShowConfirm(true)}
//               className="w-full flex items-center justify-center gap-2 py-4 rounded-xl
//                          font-semibold text-base text-gray-900 transition-all duration-200
//                          hover:opacity-90 active:scale-[0.98]"
//               style={{ backgroundColor: AMBER }}
//             >
//               <Users className="w-5 h-5" />
//               Add Staff
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
//             <h2 className="text-xl font-bold text-gray-900">Add this staff?</h2>
//             <p className="text-sm text-gray-500 leading-relaxed">
//               You're about to create a new staff profile in Daily Assist.
//               Please confirm that the details are correct before proceeding.
//             </p>
//             <div className="flex gap-3 w-full mt-2">
//               <button
//                 onClick={() => setShowConfirm(false)}
//                 className="flex-1 py-3 rounded-xl border font-medium text-sm
//                            transition-colors hover:opacity-90"
//                 style={{ borderColor: AMBER, color: "#c8860a" }}
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleAddStaff}
//                 className="flex-1 py-3 rounded-xl font-semibold text-sm text-gray-900
//                            transition-colors hover:opacity-90"
//                 style={{ backgroundColor: AMBER }}
//               >
//                 Yes, Add Staff
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
//         buttonText="Back to Staff Page"
//       />
//     </>
//   );
// }


import { useState, useRef } from "react";
import { X, Plus, ChevronDown, CloudUpload, Image, Users } from "lucide-react";
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
const sexOptions     = ["Male", "Female", "Prefer not to say"];
const AMBER = "#f5c045";

export default function AddStaffModal({ isOpen, onClose, onSuccess }) {
  const [role, setRole]           = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName]   = useState("");
  const [email, setEmail]         = useState("");
  const [phone, setPhone]         = useState("");
  const [dob, setDob]             = useState("");
  const [sex, setSex]             = useState("");
  const [zone, setZone]           = useState("");
  const [vehicle, setVehicle]     = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [cvFile, setCvFile]       = useState(null);
  const [cvDragOver, setCvDragOver] = useState(false);
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
    if (file) setCvFile(file);
  };

  const handleCvDrop = (e) => {
    e.preventDefault();
    setCvDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) setCvFile(file);
  };

  const handleAddStaff = async () => {
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

      await staffAPI.create(formData);
      setShowConfirm(false);
      setShowSuccess(true);
      if (onSuccess) onSuccess();
    } catch (err) {
      setApiError(err.response?.data?.message || "Failed to add staff. Please try again.");
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

          {/* Header */}
          <div className="flex items-center justify-between px-6 sm:px-8 pt-6 pb-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <Plus className="w-6 h-6 text-gray-800" />
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Add Staff</h2>
            </div>
            <button onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* API Error */}
          {apiError && (
            <div className="mx-6 sm:mx-8 mt-4 px-4 py-3 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-sm text-red-500">{apiError}</p>
            </div>
          )}

          {/* Body */}
          <div className="px-6 sm:px-8 py-6 flex flex-col gap-5">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex flex-col gap-1.5 w-full sm:w-32 flex-shrink-0">
                <label className="text-sm font-semibold text-gray-800">Staff ID</label>
                <input type="text" value="Auto" readOnly
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm
                             text-gray-700 bg-gray-50 cursor-not-allowed outline-none" />
              </div>
              <div className="flex flex-col gap-1.5 flex-1">
                <label className="text-sm font-semibold text-gray-800">Staff Role</label>
                <div className="relative">
                  <select value={role} onChange={(e) => setRole(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm
                               text-gray-700 outline-none appearance-none bg-gray-50 focus:ring-2 focus:ring-amber-200">
                    <option value="">Select Staff Role</option>
                    {roleOptions.map((r) => <option key={r}>{r}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-800">First Name</label>
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First name"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm
                             text-gray-700 outline-none bg-gray-50 focus:ring-2 focus:ring-amber-200 placeholder-gray-400" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-800">Last Name</label>
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last name"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm
                             text-gray-700 outline-none bg-gray-50 focus:ring-2 focus:ring-amber-200 placeholder-gray-400" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-800">Email Address</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm
                             text-gray-700 outline-none bg-gray-50 focus:ring-2 focus:ring-amber-200 placeholder-gray-400" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-800">Phone Number</label>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
                  placeholder="(123) 456 - 789"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm
                             text-gray-700 outline-none bg-gray-50 focus:ring-2 focus:ring-amber-200 placeholder-gray-400" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-800">Date of Birth</label>
                <input type="text" value={dob} onChange={(e) => setDob(e.target.value)}
                  placeholder="Enter date of birth"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm
                             text-gray-700 outline-none bg-gray-50 focus:ring-2 focus:ring-amber-200 placeholder-gray-400" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-800">Sex</label>
                <div className="relative">
                  <select value={sex} onChange={(e) => setSex(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm
                               text-gray-700 outline-none appearance-none bg-gray-50 focus:ring-2 focus:ring-amber-200">
                    <option value="">Select</option>
                    {sexOptions.map((s) => <option key={s}>{s}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-800">Staff Zone</label>
                <div className="relative">
                  <select value={zone} onChange={(e) => setZone(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm
                               text-gray-700 outline-none appearance-none bg-gray-50 focus:ring-2 focus:ring-amber-200">
                    <option value="">Select Zone</option>
                    {zoneOptions.map((z) => <option key={z}>{z}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-800">Staff Owns Vehicle</label>
                <div className="relative">
                  <select value={vehicle} onChange={(e) => setVehicle(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm
                               text-gray-700 outline-none appearance-none bg-gray-50 focus:ring-2 focus:ring-amber-200">
                    <option value="">Select</option>
                    {vehicleOptions.map((v) => <option key={v}>{v}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Upload Image */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-800">Upload Image</label>
              <div onClick={() => imageInputRef.current.click()}
                className="w-full border-2 border-dashed border-gray-200 rounded-xl p-6
                           flex flex-col items-center justify-center gap-2 cursor-pointer
                           hover:border-gray-300 transition-colors min-h-[120px]">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-20 h-20 rounded-xl object-cover" />
                ) : (
                  <>
                    <Image className="w-8 h-8 text-gray-300" />
                    <p className="text-sm text-gray-500 text-center">
                      <span className="font-semibold" style={{ color: AMBER }}>Click to upload</span>{" "}or drag and drop
                    </p>
                    <p className="text-xs text-gray-400">JPG, JPEG, PNG less than 1MB</p>
                  </>
                )}
              </div>
              <input ref={imageInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            </div>

            {/* Upload CV */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-800">Upload CV</label>
              <div onDragOver={(e) => { e.preventDefault(); setCvDragOver(true); }}
                onDragLeave={() => setCvDragOver(false)}
                onDrop={handleCvDrop}
                onClick={() => cvInputRef.current.click()}
                className={`w-full border-2 border-dashed rounded-xl p-8 flex flex-col
                            items-center justify-center gap-3 cursor-pointer transition-colors
                            ${cvDragOver ? "border-amber-400 bg-amber-50" : "border-gray-200 hover:border-gray-300 bg-white"}`}>
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                  <CloudUpload className="w-6 h-6 text-gray-400" />
                </div>
                {cvFile ? (
                  <p className="text-sm font-semibold text-amber-600">{cvFile.name}</p>
                ) : (
                  <>
                    <p className="text-sm text-gray-600 text-center">
                      <span className="font-semibold" style={{ color: AMBER }}>Click to upload</span>{" "}or drag and drop
                    </p>
                    <p className="text-xs text-gray-400">SVG, PNG, JPG or GIF (max. 800×400px)</p>
                  </>
                )}
                <div className="flex items-center gap-3 w-full max-w-xs">
                  <hr className="flex-1 border-gray-200" />
                  <span className="text-xs text-gray-400">OR</span>
                  <hr className="flex-1 border-gray-200" />
                </div>
                <button type="button" onClick={(e) => { e.stopPropagation(); cvInputRef.current.click(); }}
                  className="px-6 py-2.5 rounded-xl text-sm font-semibold text-gray-900 transition-colors hover:opacity-90"
                  style={{ backgroundColor: AMBER }}>
                  Browse Files
                </button>
              </div>
              <input ref={cvInputRef} type="file" accept=".pdf,.doc,.docx,image/*" className="hidden" onChange={handleCvChange} />
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 sm:px-8 pb-6 pt-2">
            <button onClick={() => setShowConfirm(true)}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-xl
                         font-semibold text-base text-gray-900 transition-all duration-200
                         hover:opacity-90 active:scale-[0.98]"
              style={{ backgroundColor: AMBER }}>
              <Users className="w-5 h-5" />
              Add Staff
            </button>
          </div>
        </div>
      </div>

      {/* Confirm modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 px-4"
          onClick={() => setShowConfirm(false)}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm px-8 py-8
                         flex flex-col items-center gap-4 text-center"
            onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold text-gray-900">Add this staff?</h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              You're about to create a new staff profile in Daily Assist.
              Please confirm that the details are correct before proceeding.
            </p>
            <div className="flex gap-3 w-full mt-2">
              <button onClick={() => setShowConfirm(false)}
                className="flex-1 py-3 rounded-xl border font-medium text-sm transition-colors hover:opacity-90"
                style={{ borderColor: AMBER, color: "#c8860a" }}>
                Cancel
              </button>
              <button onClick={handleAddStaff} disabled={submitting}
                className="flex-1 py-3 rounded-xl font-semibold text-sm text-gray-900
                           transition-colors hover:opacity-90 disabled:opacity-60"
                style={{ backgroundColor: AMBER }}>
                {submitting ? "Adding..." : "Yes, Add Staff"}
              </button>
            </div>
          </div>
        </div>
      )}

      <CheckInSuccessModal
        isOpen={showSuccess}
        onClose={() => { setShowSuccess(false); onClose(); }}
        buttonText="Back to Staff Page"
      />
    </>
  );
}