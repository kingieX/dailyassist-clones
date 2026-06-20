// import { Clock, Download, Edit2 } from "lucide-react";

// const visitTypes = [
//   "Home-Help (cleaning, tidying, laundry)",
//   "Errands & Shopping Support",
//   "Welfare Check-Ins & Companionship",
//   "Appointment Escort/Transport",
//   "Light Gardening & Practical Tasks",
//   "Community Access Support",
//   "Light Meal Preparation",
// ];

// /* ── Mock submitted log data ── */
// const mockLog = {
//   selectedTypes: ["Light Meal Preparation", "Home-Help (cleaning, tidying, laundry)"],
//   otherService: "",
//   miles: "3",
//   notes: "Provided home-help support during the scheduled visit, including light cleaning and general assistance. Client was calm and in good spirits throughout the visit. No concerns observed, and the home environment was safe and tidy. No follow-up actions required at this time.",
//   signature: "Lauren James",
//   confirmed: true,
// };

// function FormField({ label, value }) {
//   return (
//     <div className="flex flex-row rounded-xl overflow-hidden border border-[#e7b343]">
//       <div className="bg-[#e7b343] text-gray-900 font-semibold text-sm
//                       px-4 py-3 w-32 sm:w-36 flex-shrink-0 flex items-center">
//         {label}
//       </div>
//       <div className="bg-gray-50 text-gray-800 text-sm px-4 py-3 flex-1 flex items-center">
//         {value}
//       </div>
//     </div>
//   );
// }

// function TimeField({ label, value }) {
//   return (
//     <div className="flex flex-col rounded-xl overflow-hidden border border-[#e7b343] flex-1">
//       <div className="bg-[#e7b343] text-gray-900 font-semibold text-sm
//                       px-4 py-3 flex items-center justify-between gap-2">
//         <span>{label}</span>
//         <Clock className="w-4 h-4" />
//       </div>
//       <div className="bg-gray-50 text-gray-800 text-sm px-4 py-3 flex items-center">
//         {value}
//       </div>
//     </div>
//   );
// }

// export default function AdminVisitLogModal({ isOpen, onClose, task, staffName }) {
//   if (!isOpen) return null;

//   const today = new Date().toLocaleDateString("en-GB", {
//     year: "numeric", month: "long", day: "numeric",
//   });

//   const handleDownload = () => {
//     alert("Downloading log sheet...");
//   };

//   return (
//     <div
//       className="fixed inset-0 z-[70] flex items-start justify-center
//                  bg-black/40 px-2 sm:px-4 py-4 sm:py-6 overflow-y-auto"
//       onClick={onClose}
//     >
//       <div
//         className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl mx-auto flex flex-col"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Header */}
//         <div className="relative px-5 sm:px-6 pt-6 pb-4 text-left border-b border-gray-100">
//           <h2 className="text-base sm:text-xl font-bold text-gray-900 pr-8">
//             Daily Assist UK - Visit Log Sheet
//           </h2>
//           <p className="text-xs sm:text-sm text-gray-500 mt-1">
//             Staff visit record for service delivery and compliance.
//           </p>
//           <button
//             onClick={onClose}
//             className="absolute top-4 right-4 text-gray-400 hover:text-gray-700
//                        transition-colors text-xl font-bold leading-none"
//             aria-label="Close"
//           >
//             ✕
//           </button>
//         </div>

//         {/* Body — read only */}
//         <div className="px-4 sm:px-10 py-5 flex flex-col gap-3 sm:gap-4">

//           <FormField label="Client Name"  value={task?.client ?? "Mrs. Alan Sarah"} />
//           <FormField label="Address"      value={task?.address ?? "1 Church Street, Canvey Island, Essex"} />
//           <FormField label="Date"         value={today} />
//           <FormField label="Staff Member" value={staffName ?? "Lauren James"} />

//           <div className="flex flex-row gap-3">
//             <TimeField label="Time In"  value={`Checked in at ${task?.time?.split(" - ")[0] ?? "1:05pm"}`} />
//             <TimeField label="Time Out" value={`Checked out at ${task?.time?.split(" - ")[1] ?? "2:05pm"}`} />
//           </div>

//           {/* Visit Type — read only checkboxes */}
//           <div className="flex flex-col gap-2 pt-1">
//             <h3 className="text-base font-bold text-gray-900">Visit Type</h3>
//             <p className="text-xs sm:text-sm text-gray-500">
//               Services provided during this visit
//             </p>
//             <div className="flex flex-col gap-2 mt-1">
//               {visitTypes.map((type) => (
//                 <label key={type} className="flex items-center gap-3 text-sm text-gray-700">
//                   <input
//                     type="checkbox"
//                     checked={mockLog.selectedTypes.includes(type)}
//                     readOnly
//                     className="w-4 h-4 rounded border-gray-300 accent-[#e7b343] cursor-default"
//                   />
//                   {type}
//                 </label>
//               ))}
//             </div>
//             {mockLog.otherService && (
//               <div className="mt-2">
//                 <p className="text-sm font-semibold text-gray-700 mb-1">Others:</p>
//                 <div className="w-full bg-gray-100 rounded-xl px-4 py-3 text-sm text-gray-700">
//                   {mockLog.otherService}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Miles Covered */}
//           <div className="flex flex-col gap-1">
//             <h3 className="text-base font-bold text-gray-900">Miles Covered</h3>
//             <div className="w-full bg-gray-100 rounded-xl px-4 py-3 text-sm text-gray-700">
//               {mockLog.miles ? `${mockLog.miles} miles` : "Not applicable"}
//             </div>
//             <p className="text-xs text-gray-400">
//               Only filled when service involves driving a client
//             </p>
//           </div>

//           <hr className="border-gray-200" />

//           {/* Notes */}
//           <div className="flex flex-col gap-2">
//             <h3 className="text-base font-bold text-gray-900">Notes</h3>
//             <div className="w-full bg-gray-50 border border-gray-200 rounded-xl
//                             px-4 py-3 text-sm text-gray-700 leading-relaxed min-h-[120px]">
//               {mockLog.notes}
//             </div>
//           </div>

//           {/* Staff Signature */}
//           <div className="flex flex-col gap-1">
//             <label className="text-sm font-semibold text-gray-800">Staff Signature</label>
//             <div className="w-full bg-gray-50 border border-gray-200 rounded-xl
//                             px-4 py-4 text-sm text-gray-700 italic">
//               {mockLog.signature}
//             </div>
//             <p className="text-xs text-gray-400">Staff confirmed accuracy of report.</p>
//           </div>

//           {/* Confirmation — read only */}
//           <div className="flex items-start gap-3 text-sm font-medium text-gray-700">
//             <input
//               type="checkbox"
//               checked={mockLog.confirmed}
//               readOnly
//               className="w-4 h-4 mt-0.5 rounded accent-[#e7b343] flex-shrink-0 cursor-default"
//             />
//             I confirm that these notes accurately reflect today's visit and services rendered
//           </div>
//         </div>

//         {/* Footer — admin buttons */}
//         <div className="px-4 sm:px-10 pb-6 pt-2 flex flex-col sm:flex-row gap-3">
//           <button
//             onClick={onClose}
//             className="flex items-center justify-center gap-2
//                        bg-blue-500 hover:bg-blue-600 text-white
//                        font-semibold text-sm py-3 px-6 rounded-xl
//                        transition-colors duration-200"
//           >
//             <Edit2 className="w-4 h-4" />
//             Edit
//           </button>
//           <button
//             onClick={handleDownload}
//             className="flex-1 flex items-center justify-center gap-2
//                        bg-[#f7cd6a] hover:bg-[#e8b030] text-gray-900
//                        font-semibold text-sm py-3 px-6 rounded-xl
//                        transition-colors duration-200"
//           >
//             <Download className="w-4 h-4" />
//             Download Log Sheet
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { Clock, Download, Edit2, Check } from "lucide-react";

const visitTypes = [
  "Home-Help (cleaning, tidying, laundry)",
  "Errands & Shopping Support",
  "Welfare Check-Ins & Companionship",
  "Appointment Escort/Transport",
  "Light Gardening & Practical Tasks",
  "Community Access Support",
  "Light Meal Preparation",
];

const mockLog = {
  selectedTypes: ["Light Meal Preparation", "Home-Help (cleaning, tidying, laundry)"],
  otherService: "",
  miles: "3",
  notes: "Provided home-help support during the scheduled visit, including light cleaning and general assistance. Client was calm and in good spirits throughout the visit. No concerns observed, and the home environment was safe and tidy. No follow-up actions required at this time.",
  signature: "Lauren James",
  confirmed: true,
};

function FormField({ label, value }) {
  return (
    <div className="flex flex-row rounded-xl overflow-hidden border border-[#e7b343]">
      <div className="bg-[#e7b343] text-gray-900 font-semibold text-sm
                      px-4 py-3 w-32 sm:w-36 flex-shrink-0 flex items-center">
        {label}
      </div>
      <div className="bg-gray-50 text-gray-800 text-sm px-4 py-3 flex-1 flex items-center">
        {value}
      </div>
    </div>
  );
}

function TimeField({ label, value }) {
  return (
    <div className="flex flex-col rounded-xl overflow-hidden border border-[#e7b343] flex-1">
      <div className="bg-[#e7b343] text-gray-900 font-semibold text-sm
                      px-4 py-3 flex items-center justify-between gap-2">
        <span>{label}</span>
        <Clock className="w-4 h-4" />
      </div>
      <div className="bg-gray-50 text-gray-800 text-sm px-4 py-3 flex items-center">
        {value}
      </div>
    </div>
  );
}

/* ── Success state shown after saving ── */
function SaveSuccess({ onDone }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 px-8">
      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
        <Check className="w-8 h-8 text-green-500" />
      </div>
      <p className="text-xl font-bold text-gray-900">Changes Saved!</p>
      <p className="text-sm text-gray-500 text-center">
        The visit log has been updated successfully.
      </p>
      <button
        onClick={onDone}
        className="mt-2 px-8 py-3 bg-[#f7cd6a] hover:bg-[#e8b030]
                   text-gray-900 font-semibold rounded-xl transition-colors"
      >
        Back to Log Sheet
      </button>
    </div>
  );
}

export default function AdminVisitLogModal({ isOpen, onClose, task, staffName }) {
  const [mode, setMode] = useState("view"); // "view" | "edit" | "saved"
  const [editData, setEditData] = useState({
    selectedTypes: [],
    otherService: "",
    miles: "",
    notes: "",
    signature: "",
    confirmed: false,
  });

  if (!isOpen) return null;

  const today = new Date().toLocaleDateString("en-GB", {
    year: "numeric", month: "long", day: "numeric",
  });

  /* ── Download as PDF using browser print ── */
  const handleDownload = () => {
    const content = `
      DAILY ASSIST UK — VISIT LOG SHEET
      ===================================
      Client Name:    ${task?.client ?? "Mrs. Alan Sarah"}
      Address:        ${task?.address ?? "1 Church Street, Canvey Island, Essex"}
      Date:           ${today}
      Staff Member:   ${staffName ?? "Lauren James"}
      Time In:        ${task?.time?.split(" - ")[0] ?? "1:05pm"}
      Time Out:       ${task?.time?.split(" - ")[1] ?? "2:05pm"}

      VISIT TYPE:
      ${mockLog.selectedTypes.map(t => `✓ ${t}`).join("\n")}

      MILES COVERED: ${mockLog.miles} miles

      NOTES:
      ${mockLog.notes}

      STAFF SIGNATURE: ${mockLog.signature}
      CONFIRMED: Yes
    `;

    const blob = new Blob([content], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Visit_Log_${task?.client?.replace(/\s/g, "_") ?? "log"}_${today}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSave = () => setMode("saved");
  const handleDone = () => { setMode("view"); setEditData({ selectedTypes: [], otherService: "", miles: "", notes: "", signature: "", confirmed: false }); };

  const toggleType = (type) => {
    setEditData(prev => ({
      ...prev,
      selectedTypes: prev.selectedTypes.includes(type)
        ? prev.selectedTypes.filter(t => t !== type)
        : [...prev.selectedTypes, type]
    }));
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex items-start justify-center
                 bg-black/40 px-2 sm:px-4 py-4 sm:py-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl mx-auto flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative px-5 sm:px-6 pt-6 pb-4 text-left border-b border-gray-100">
          <h2 className="text-base sm:text-xl font-bold text-gray-900 pr-8">
            Daily Assist UK - Visit Log Sheet
            {mode === "edit" && <span className="text-[#e7b343] ml-2 text-sm font-medium">(Editing)</span>}
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Staff visit record for service delivery and compliance.
          </p>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-700
                       transition-colors text-xl font-bold leading-none"
          >
            ✕
          </button>
        </div>

        {/* ── Saved success state ── */}
        {mode === "saved" ? (
          <SaveSuccess onDone={handleDone} />
        ) : (
          <>
            {/* Body */}
            <div className="px-4 sm:px-10 py-5 flex flex-col gap-3 sm:gap-4">
              <FormField label="Client Name"  value={task?.client ?? "Mrs. Alan Sarah"} />
              <FormField label="Address"      value={task?.address ?? "1 Church Street, Canvey Island, Essex"} />
              <FormField label="Date"         value={today} />
              <FormField label="Staff Member" value={staffName ?? "Lauren James"} />

              <div className="flex flex-row gap-3">
                <TimeField label="Time In"  value={`Checked in at ${task?.time?.split(" - ")[0] ?? "1:05pm"}`} />
                <TimeField label="Time Out" value={`Checked out at ${task?.time?.split(" - ")[1] ?? "2:05pm"}`} />
              </div>

              {/* Visit Type */}
              <div className="flex flex-col gap-2 pt-1">
                <h3 className="text-base font-bold text-gray-900">Visit Type</h3>
                <div className="flex flex-col gap-2 mt-1">
                  {visitTypes.map((type) => (
                    <label key={type} className={`flex items-center gap-3 text-sm text-gray-700
                                                  ${mode === "edit" ? "cursor-pointer" : ""}`}>
                      <input
                        type="checkbox"
                        checked={mode === "edit"
                          ? editData.selectedTypes.includes(type)
                          : mockLog.selectedTypes.includes(type)}
                        onChange={mode === "edit" ? () => toggleType(type) : undefined}
                        readOnly={mode === "view"}
                        className="w-4 h-4 rounded border-gray-300 accent-[#e7b343]"
                      />
                      {type}
                    </label>
                  ))}
                </div>
                {mode === "edit" && (
                  <div className="mt-2">
                    <p className="text-sm font-semibold text-gray-700 mb-1">Others:</p>
                    <input
                      type="text"
                      value={editData.otherService}
                      onChange={(e) => setEditData(p => ({ ...p, otherService: e.target.value }))}
                      placeholder="Add other services..."
                      className="w-full bg-gray-100 rounded-xl px-4 py-3 text-sm
                                 text-gray-700 outline-none focus:ring-2 focus:ring-[#e7b343]/50"
                    />
                  </div>
                )}
              </div>

              {/* Miles */}
              <div className="flex flex-col gap-1">
                <h3 className="text-base font-bold text-gray-900">Miles Covered</h3>
                {mode === "edit" ? (
                  <input
                    type="number"
                    value={editData.miles}
                    onChange={(e) => setEditData(p => ({ ...p, miles: e.target.value }))}
                    placeholder="Enter the miles covered"
                    className="w-full bg-gray-100 rounded-xl px-4 py-3 text-sm
                               text-gray-700 outline-none focus:ring-2 focus:ring-[#e7b343]/50"
                  />
                ) : (
                  <div className="w-full bg-gray-100 rounded-xl px-4 py-3 text-sm text-gray-700">
                    {mockLog.miles ? `${mockLog.miles} miles` : "Not applicable"}
                  </div>
                )}
              </div>

              <hr className="border-gray-200" />

              {/* Notes */}
              <div className="flex flex-col gap-2">
                <h3 className="text-base font-bold text-gray-900">Notes</h3>
                {mode === "edit" ? (
                  <textarea
                    value={editData.notes}
                    onChange={(e) => setEditData(p => ({ ...p, notes: e.target.value }))}
                    rows={5}
                    placeholder="Any concerns or observations?"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl
                               px-4 py-3 text-sm text-gray-700 outline-none
                               focus:ring-2 focus:ring-[#e7b343]/50 resize-none"
                  />
                ) : (
                  <div className="w-full bg-gray-50 border border-gray-200 rounded-xl
                                  px-4 py-3 text-sm text-gray-700 leading-relaxed min-h-[100px]">
                    {mockLog.notes}
                  </div>
                )}
              </div>

              {/* Signature */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-800">Staff Signature</label>
                {mode === "edit" ? (
                  <input
                    type="text"
                    value={editData.signature}
                    onChange={(e) => setEditData(p => ({ ...p, signature: e.target.value }))}
                    placeholder="Staff signature goes here..."
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl
                               px-4 py-4 text-sm text-gray-700 italic
                               outline-none focus:ring-2 focus:ring-[#e7b343]/50"
                  />
                ) : (
                  <div className="w-full bg-gray-50 border border-gray-200 rounded-xl
                                  px-4 py-4 text-sm text-gray-700 italic">
                    {mockLog.signature}
                  </div>
                )}
                <p className="text-xs text-gray-400">Staff confirmed accuracy of report.</p>
              </div>

              {/* Confirmation */}
              <label className={`flex items-start gap-3 text-sm font-medium text-gray-700
                                 ${mode === "edit" ? "cursor-pointer" : ""}`}>
                <input
                  type="checkbox"
                  checked={mode === "edit" ? editData.confirmed : mockLog.confirmed}
                  onChange={mode === "edit"
                    ? (e) => setEditData(p => ({ ...p, confirmed: e.target.checked }))
                    : undefined}
                  readOnly={mode === "view"}
                  className="w-4 h-4 mt-0.5 rounded accent-[#e7b343] flex-shrink-0"
                />
                I confirm that these notes accurately reflect today's visit and services rendered
              </label>
            </div>

            {/* Footer */}
            <div className="px-4 sm:px-10 pb-6 pt-2 flex flex-col sm:flex-row gap-3">
              {mode === "view" ? (
                <>
                  <button
                    onClick={() => setMode("edit")}
                    className="flex items-center justify-center gap-2
                               bg-blue-500 hover:bg-blue-600 text-white
                               font-semibold text-sm py-3 px-6 rounded-xl
                               transition-colors duration-200"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={handleDownload}
                    className="flex-1 flex items-center justify-center gap-2
                               bg-[#f7cd6a] hover:bg-[#e8b030] text-gray-900
                               font-semibold text-sm py-3 px-6 rounded-xl
                               transition-colors duration-200"
                  >
                    <Download className="w-4 h-4" />
                    Download Log Sheet
                  </button>
                </>
              ) : (
                <button
                  onClick={handleSave}
                  className="w-full flex items-center justify-center gap-2
                             bg-blue-500 hover:bg-blue-600 text-white
                             font-semibold text-sm py-3 px-6 rounded-xl
                             transition-colors duration-200"
                >
                  Save Changes
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}