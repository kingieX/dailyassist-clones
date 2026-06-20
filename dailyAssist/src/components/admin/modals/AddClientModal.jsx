// import { useState, useRef } from "react";
// import { X, Plus, ChevronDown, CloudUpload, UserPlus } from "lucide-react";
// import CheckInSuccessModal from "../../modals/CheckInSuccessModal";

// const titleOptions = ["Mr.", "Mrs.", "Ms.", "Dr.", "Prof."];
// const sexOptions   = ["Male", "Female", "Prefer not to say"];

// const GREEN = "#669369";

// export default function AddClientModal({ isOpen, onClose }) {
//   const [title, setTitle]             = useState("");
//   const [firstName, setFirstName]     = useState("");
//   const [lastName, setLastName]       = useState("");
//   const [email, setEmail]             = useState("");
//   const [phone, setPhone]             = useState("");
//   const [age, setAge]                 = useState("");
//   const [sex, setSex]                 = useState("");
//   const [address, setAddress]         = useState("");
//   const [contactName, setContactName] = useState("");
//   const [contactPhone, setContactPhone] = useState("");
//   const [relationship, setRelationship] = useState("");
//   const [note, setNote]               = useState(
//     "Provided home-help support during the scheduled visit, including light cleaning and general assistance. Client was calm and in good spirits throughout the visit. No concerns observed, and the home environment was safe and tidy. No follow-up actions required at this time."
//   );
//   const [proofFile, setProofFile]     = useState(null);
//   const [dragOver, setDragOver]       = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);

//   const fileInputRef = useRef();

//   if (!isOpen) return null;

//   const handleFileDrop = (e) => {
//     e.preventDefault();
//     setDragOver(false);
//     const file = e.dataTransfer.files[0];
//     if (file) setProofFile(file);
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) setProofFile(file);
//   };

//   const handleAddClient = () => {
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
//               <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Add Client</h2>
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

//             {/* Title */}
//             <div className="flex flex-col gap-1.5 w-32">
//               <label className="text-sm font-semibold text-gray-800">Title</label>
//               <div className="relative">
//                 <select
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                   className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm
//                              text-gray-700 outline-none appearance-none bg-gray-50
//                              focus:ring-2 focus:ring-green-200"
//                 >
//                   <option value="">Select</option>
//                   {titleOptions.map((t) => <option key={t}>{t}</option>)}
//                 </select>
//                 <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2
//                                          w-4 h-4 text-gray-400 pointer-events-none" />
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
//                              focus:ring-green-200 placeholder-gray-400" />
//               </div>
//               <div className="flex flex-col gap-1.5">
//                 <label className="text-sm font-semibold text-gray-800">Last Name</label>
//                 <input type="text" value={lastName}
//                   onChange={(e) => setLastName(e.target.value)}
//                   placeholder="Last name"
//                   className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm
//                              text-gray-700 outline-none bg-gray-50 focus:ring-2
//                              focus:ring-green-200 placeholder-gray-400" />
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
//                              focus:ring-green-200 placeholder-gray-400" />
//               </div>
//               <div className="flex flex-col gap-1.5">
//                 <label className="text-sm font-semibold text-gray-800">Phone Number</label>
//                 <input type="tel" value={phone}
//                   onChange={(e) => setPhone(e.target.value)}
//                   placeholder="(123) 456 - 789"
//                   className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm
//                              text-gray-700 outline-none bg-gray-50 focus:ring-2
//                              focus:ring-green-200 placeholder-gray-400" />
//               </div>
//             </div>

//             {/* Age + Sex */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div className="flex flex-col gap-1.5">
//                 <label className="text-sm font-semibold text-gray-800">Age</label>
//                 <input type="number" value={age}
//                   onChange={(e) => setAge(e.target.value)}
//                   placeholder="Enter client's age"
//                   className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm
//                              text-gray-700 outline-none bg-gray-50 focus:ring-2
//                              focus:ring-green-200 placeholder-gray-400" />
//               </div>
//               <div className="flex flex-col gap-1.5">
//                 <label className="text-sm font-semibold text-gray-800">Sex</label>
//                 <div className="relative">
//                   <select value={sex} onChange={(e) => setSex(e.target.value)}
//                     className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm
//                                text-gray-700 outline-none appearance-none bg-gray-50
//                                focus:ring-2 focus:ring-green-200">
//                     <option value="">Select</option>
//                     {sexOptions.map((s) => <option key={s}>{s}</option>)}
//                   </select>
//                   <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2
//                                            w-4 h-4 text-gray-400 pointer-events-none" />
//                 </div>
//               </div>
//             </div>

//             {/* Address */}
//             <div className="flex flex-col gap-1.5">
//               <label className="text-sm font-semibold text-gray-800">
//                 Address<span className="text-red-500 ml-0.5">*</span>
//               </label>
//               <input type="text" value={address}
//                 onChange={(e) => setAddress(e.target.value)}
//                 placeholder="Address"
//                 className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm
//                            text-gray-700 outline-none bg-gray-50 focus:ring-2
//                            focus:ring-green-200 placeholder-gray-400" />
//             </div>

//             {/* Emergency Contact */}
//             <div className="flex flex-col gap-4">
//               <p className="text-sm font-bold text-gray-900">Emergency Contact</p>

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <div className="flex flex-col gap-1.5">
//                   <label className="text-sm font-semibold text-gray-800">Contact Name</label>
//                   <input type="text" value={contactName}
//                     onChange={(e) => setContactName(e.target.value)}
//                     placeholder="Name"
//                     className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm
//                                text-gray-700 outline-none bg-gray-50 focus:ring-2
//                                focus:ring-green-200 placeholder-gray-400" />
//                 </div>
//                 <div className="flex flex-col gap-1.5">
//                   <label className="text-sm font-semibold text-gray-800">Contact Phone Number</label>
//                   <input type="tel" value={contactPhone}
//                     onChange={(e) => setContactPhone(e.target.value)}
//                     placeholder="(123) 456 - 789"
//                     className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm
//                                text-gray-700 outline-none bg-gray-50 focus:ring-2
//                                focus:ring-green-200 placeholder-gray-400" />
//                 </div>
//               </div>

//               <div className="flex flex-col gap-1.5">
//                 <label className="text-sm font-semibold text-gray-800">Relationship</label>
//                 <input type="text" value={relationship}
//                   onChange={(e) => setRelationship(e.target.value)}
//                   placeholder="e.g., Daughter, Son, Friend...."
//                   className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm
//                              text-gray-700 outline-none bg-gray-50 focus:ring-2
//                              focus:ring-green-200 placeholder-gray-400" />
//               </div>
//             </div>

//             {/* Proof of Address */}
//             <div className="flex flex-col gap-2">
//               <label className="text-sm font-bold text-gray-900">
//                 Proof of Address{" "}
//                 <span className="text-gray-400 font-normal">(If required)</span>
//               </label>
//               <div
//                 onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
//                 onDragLeave={() => setDragOver(false)}
//                 onDrop={handleFileDrop}
//                 onClick={() => fileInputRef.current.click()}
//                 className={`w-full border-2 border-dashed rounded-xl p-8 flex flex-col
//                             items-center justify-center gap-3 cursor-pointer transition-colors
//                             ${dragOver
//                               ? "border-green-400 bg-green-50"
//                               : "border-gray-200 hover:border-gray-300 bg-white"
//                             }`}
//               >
//                 <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center
//                                 justify-center">
//                   <CloudUpload className="w-6 h-6 text-gray-400" />
//                 </div>

//                 {proofFile ? (
//                   <p className="text-sm font-semibold text-green-600">{proofFile.name}</p>
//                 ) : (
//                   <>
//                     <p className="text-sm text-gray-600 text-center">
//                       <span className="font-semibold" style={{ color: GREEN }}>
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
//                   onClick={(e) => { e.stopPropagation(); fileInputRef.current.click(); }}
//                   className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white
//                              transition-colors hover:opacity-90"
//                   style={{ backgroundColor: "#f5c045", color: "#1a1a1a" }}
//                 >
//                   Browse Files
//                 </button>
//               </div>
//               <input
//                 ref={fileInputRef}
//                 type="file"
//                 accept=".svg,.png,.jpg,.gif"
//                 className="hidden"
//                 onChange={handleFileChange}
//               />
//             </div>

//             {/* Any Relevant Note */}
//             <div className="flex flex-col gap-1.5">
//               <label className="text-sm font-bold text-gray-900">Any Relevant Note</label>
//               <textarea
//                 value={note}
//                 onChange={(e) => setNote(e.target.value)}
//                 rows={5}
//                 className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm
//                            text-gray-700 outline-none focus:ring-2 focus:ring-green-200
//                            resize-none bg-white"
//               />
//             </div>
//           </div>

//           {/* Footer */}
//           <div className="px-6 sm:px-8 pb-6 pt-2">
//             <button
//               onClick={() => setShowConfirm(true)}
//               className="w-full flex items-center justify-center gap-2 py-4 rounded-xl
//                          font-semibold text-base text-white transition-all duration-200
//                          hover:opacity-90 active:scale-[0.98]"
//               style={{ backgroundColor: GREEN }}
//             >
//               <UserPlus className="w-5 h-5" />
//               Add Client
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
//             <h2 className="text-xl font-bold text-gray-900">Add this client?</h2>
//             <p className="text-sm text-gray-500 leading-relaxed">
//               You're about to create a new client profile in Daily Assist.
//               Please confirm that the details are correct before proceeding.
//             </p>
//             <div className="flex gap-3 w-full mt-2">
//               <button
//                 onClick={() => setShowConfirm(false)}
//                 className="flex-1 py-3 rounded-xl border font-medium text-sm
//                            transition-colors hover:opacity-90"
//                 style={{ borderColor: GREEN, color: GREEN }}
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleAddClient}
//                 className="flex-1 py-3 rounded-xl font-semibold text-sm text-white
//                            transition-colors hover:opacity-90"
//                 style={{ backgroundColor: GREEN }}
//               >
//                 Yes, Add Client
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
//         buttonText="Back to Clients Page"
//       />
//     </>
//   );
// }

import { useState, useRef } from "react";
import { X, Plus, ChevronDown, CloudUpload, UserPlus } from "lucide-react";
import CheckInSuccessModal from "../../modals/CheckInSuccessModal";
import { clientsAPI } from "../../../services/api";

const titleOptions = ["Mr.", "Mrs.", "Ms.", "Dr.", "Prof."];
const sexOptions   = ["Male", "Female", "Prefer not to say"];
const GREEN = "#669369";

export default function AddClientModal({ isOpen, onClose, onSuccess }) {
  const [title, setTitle]               = useState("");
  const [firstName, setFirstName]       = useState("");
  const [lastName, setLastName]         = useState("");
  const [email, setEmail]               = useState("");
  const [phone, setPhone]               = useState("");
  const [age, setAge]                   = useState("");
  const [sex, setSex]                   = useState("");
  const [address, setAddress]           = useState("");
  const [contactName, setContactName]   = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [relationship, setRelationship] = useState("");
  const [note, setNote]                 = useState("");
  const [proofFile, setProofFile]       = useState(null);
  const [dragOver, setDragOver]         = useState(false);
  const [showConfirm, setShowConfirm]   = useState(false);
  const [showSuccess, setShowSuccess]   = useState(false);
  const [submitting, setSubmitting]     = useState(false);
  const [apiError, setApiError]         = useState(null);

  const fileInputRef = useRef();

  if (!isOpen) return null;

  const handleFileDrop = (e) => {
    e.preventDefault(); setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) setProofFile(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setProofFile(file);
  };

  const handleAddClient = async () => {
    setSubmitting(true);
    setApiError(null);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("age", age);
      formData.append("sex", sex);
      formData.append("address", address);
      formData.append("emergencyContactName", contactName);
      formData.append("emergencyContactPhone", contactPhone);
      formData.append("emergencyContactRelationship", relationship);
      formData.append("note", note);
      if (proofFile) formData.append("proofOfAddress", proofFile);

      await clientsAPI.create(formData);
      setShowConfirm(false);
      setShowSuccess(true);
      if (onSuccess) onSuccess();
    } catch (err) {
      setApiError(err.response?.data?.message || "Failed to add client. Please try again.");
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
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Add Client</h2>
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
              <label className="text-sm font-semibold text-gray-800">Title</label>
              <div className="relative">
                <select value={title} onChange={(e) => setTitle(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none appearance-none bg-gray-50 focus:ring-2 focus:ring-green-200">
                  <option value="">Select</option>
                  {titleOptions.map((t) => <option key={t}>{t}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-800">First Name</label>
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First name"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none bg-gray-50 focus:ring-2 focus:ring-green-200 placeholder-gray-400" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-800">Last Name</label>
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last name"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none bg-gray-50 focus:ring-2 focus:ring-green-200 placeholder-gray-400" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-800">Email Address</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email address"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none bg-gray-50 focus:ring-2 focus:ring-green-200 placeholder-gray-400" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-800">Phone Number</label>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(123) 456 - 789"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none bg-gray-50 focus:ring-2 focus:ring-green-200 placeholder-gray-400" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-800">Age</label>
                <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Enter client's age"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none bg-gray-50 focus:ring-2 focus:ring-green-200 placeholder-gray-400" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-800">Sex</label>
                <div className="relative">
                  <select value={sex} onChange={(e) => setSex(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none appearance-none bg-gray-50 focus:ring-2 focus:ring-green-200">
                    <option value="">Select</option>
                    {sexOptions.map((s) => <option key={s}>{s}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-800">Address <span className="text-red-500">*</span></label>
              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none bg-gray-50 focus:ring-2 focus:ring-green-200 placeholder-gray-400" />
            </div>

            <div className="flex flex-col gap-4">
              <p className="text-sm font-bold text-gray-900">Emergency Contact</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-800">Contact Name</label>
                  <input type="text" value={contactName} onChange={(e) => setContactName(e.target.value)} placeholder="Name"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none bg-gray-50 focus:ring-2 focus:ring-green-200 placeholder-gray-400" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-800">Contact Phone Number</label>
                  <input type="tel" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} placeholder="(123) 456 - 789"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none bg-gray-50 focus:ring-2 focus:ring-green-200 placeholder-gray-400" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-800">Relationship</label>
                <input type="text" value={relationship} onChange={(e) => setRelationship(e.target.value)} placeholder="e.g., Daughter, Son, Friend...."
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none bg-gray-50 focus:ring-2 focus:ring-green-200 placeholder-gray-400" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-900">Proof of Address <span className="text-gray-400 font-normal">(If required)</span></label>
              <div onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)} onDrop={handleFileDrop}
                onClick={() => fileInputRef.current.click()}
                className={`w-full border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer transition-colors
                            ${dragOver ? "border-green-400 bg-green-50" : "border-gray-200 hover:border-gray-300 bg-white"}`}>
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                  <CloudUpload className="w-6 h-6 text-gray-400" />
                </div>
                {proofFile ? (
                  <p className="text-sm font-semibold text-green-600">{proofFile.name}</p>
                ) : (
                  <>
                    <p className="text-sm text-gray-600 text-center">
                      <span className="font-semibold" style={{ color: GREEN }}>Click to upload</span>{" "}or drag and drop
                    </p>
                    <p className="text-xs text-gray-400">SVG, PNG, JPG or GIF (max. 800×400px)</p>
                  </>
                )}
                <div className="flex items-center gap-3 w-full max-w-xs">
                  <hr className="flex-1 border-gray-200" />
                  <span className="text-xs text-gray-400">OR</span>
                  <hr className="flex-1 border-gray-200" />
                </div>
                <button type="button" onClick={(e) => { e.stopPropagation(); fileInputRef.current.click(); }}
                  className="px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors hover:opacity-90"
                  style={{ backgroundColor: "#f5c045", color: "#1a1a1a" }}>
                  Browse Files
                </button>
              </div>
              <input ref={fileInputRef} type="file" accept=".svg,.png,.jpg,.gif" className="hidden" onChange={handleFileChange} />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-gray-900">Any Relevant Note</label>
              <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={5}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-green-200 resize-none bg-white" />
            </div>
          </div>

          <div className="px-6 sm:px-8 pb-6 pt-2">
            <button onClick={() => setShowConfirm(true)}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-xl
                         font-semibold text-base text-white transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
              style={{ backgroundColor: GREEN }}>
              <UserPlus className="w-5 h-5" />
              Add Client
            </button>
          </div>
        </div>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 px-4" onClick={() => setShowConfirm(false)}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm px-8 py-8 flex flex-col items-center gap-4 text-center" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold text-gray-900">Add this client?</h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              You're about to create a new client profile in Daily Assist. Please confirm that the details are correct before proceeding.
            </p>
            <div className="flex gap-3 w-full mt-2">
              <button onClick={() => setShowConfirm(false)}
                className="flex-1 py-3 rounded-xl border font-medium text-sm transition-colors hover:opacity-90"
                style={{ borderColor: GREEN, color: GREEN }}>Cancel</button>
              <button onClick={handleAddClient} disabled={submitting}
                className="flex-1 py-3 rounded-xl font-semibold text-sm text-white transition-colors hover:opacity-90 disabled:opacity-60"
                style={{ backgroundColor: GREEN }}>
                {submitting ? "Adding..." : "Yes, Add Client"}
              </button>
            </div>
          </div>
        </div>
      )}

      <CheckInSuccessModal isOpen={showSuccess} onClose={() => { setShowSuccess(false); onClose(); }} buttonText="Back to Clients Page" />
    </>
  );
}