// import { useState } from "react";
// import VisitDetailsModal from "./VisitDetailsModal";

// export default function ConfirmCheckInModal({ isOpen, onClose, onConfirm, visit }) {
//   const [showDetails, setShowDetails] = useState(false);
//   if (!isOpen) return null;

//   return (
//      <>
//     // Backdrop
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center
//                  bg-black/40 px-4"
//       onClick={onClose}
//     >
//       {/* Modal box — stop click bubbling to backdrop */}
//       <div
//       className="bg-white rounded-2xl shadow-xl w-full max-w-xl
//            px-8 py-10 sm:px-14 sm:py-12 flex flex-col gap-6"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Title */}
//         <h2 className="text-xl sm:text-2xl font-bold text-gray-900 text-center">
//           Confirm Check-In
//         </h2>

//         {/* Body text */}
//         <p className="text-sm sm:text-base text-gray-600 text-center leading-relaxed">
//           Are you currently at the client's location?{" "}
//           <br className="hidden sm:block" />
//           This action confirms your arrival and cannot be undone.
//         </p>

//         {/* Buttons */}
//         <div className="flex flex-col sm:flex-row gap-3 mt-2">
//           {/* Cancel */}
//          <button
//             onClick={() => { onClose(); setShowDetails(true); }}
//             className="flex-1 py-3.5 rounded-xl border border-[#f5c045]
//                        text-gray-800 font-medium text-sm
//                        bg-white
//                        transition-all duration-200
//                        hover:bg-[#f5c045]/15"
//           >
//             Cancel
//           </button>

//           {/* Confirm */}
//           <button
//  onClick={onConfirm}
//   className="flex-1 py-3.5 rounded-xl
//              bg-[#f5c045] hover:bg-[#e8b030]
//              text-gray-900 font-semibold text-sm
//              transition-all duration-200 shadow-sm"
// >
//   Yes, Check-In
// </button>

//         </div>
//       </div>
//     </div>
    
//   );
// }

import { useState } from "react";
import VisitDetailsModal from "./VisitDetailsModal";

export default function ConfirmCheckInModal({ isOpen, onClose, onConfirm, visit }) {
  const [showDetails, setShowDetails] = useState(false);
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center
                   bg-black/40 px-4"
        onClick={onClose}
      >
        {/* Modal box */}
        <div
          className="bg-white rounded-2xl shadow-xl w-full max-w-xl
                     px-8 py-10 sm:px-14 sm:py-12 flex flex-col gap-6"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Title */}
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 text-center">
            Confirm Check-In
          </h2>

          {/* Body text */}
          <p className="text-sm sm:text-base text-gray-600 text-center leading-relaxed">
            Are you currently at the client's location?{" "}
            <br className="hidden sm:block" />
            This action confirms your arrival and cannot be undone.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            {/* Cancel */}
           <button
  onClick={() => setShowDetails(true)}
  className="flex-1 py-3.5 rounded-xl border border-[#f5c045]
             text-gray-800 font-medium text-sm
             bg-white transition-all duration-200
             hover:bg-[#f5c045]/15"
>
  Cancel
</button>
            {/* Confirm */}
            <button
              onClick={onConfirm}
              className="flex-1 py-3.5 rounded-xl
                         bg-[#f5c045] hover:bg-[#e8b030]
                         text-gray-900 font-semibold text-sm
                         transition-all duration-200 shadow-sm"
            >
              Yes, Check-In
            </button>
          </div>
        </div>
      </div>

      {/* Visit Details Modal */}
      <VisitDetailsModal
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
        visit={visit}
        onCheckIn={() => { setShowDetails(false); onConfirm(); }}
      />
    </>
  );
}