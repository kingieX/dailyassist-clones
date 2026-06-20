// import { useState } from "react";
// import { Eye, EyeOff } from "lucide-react";
// import { profileData } from "../../data/profileData";

// /* ── Reusable section card wrapper ── */
// function SectionCard({ title, children }) {
//   return (
//     <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//       <h2 className="text-base font-bold text-gray-900 mb-4">{title}</h2>
//       {children}
//     </div>
//   );
// }

// /* ── Single info row ── */
// function InfoRow({ label, value, fullWidth, extra }) {
//   return (
//     <div className={`flex items-center gap-3 py-3 border-b border-gray-100
//                      last:border-0 ${fullWidth ? "col-span-2" : ""}`}>
//       <span className="text-sm text-gray-400 w-36 flex-shrink-0">{label}</span>
//       <span className="text-sm font-semibold text-gray-800 flex-1">{value}</span>
//       {extra}
//     </div>
//   );
// }

// export default function ProfileSection() {
//   const [showPassword, setShowPassword] = useState(false);
//   const { name, initials, role, personal, account, system } = profileData;

//   return (
//     <div className="flex flex-col gap-6 px-4 sm:px-6 py-6 max-w-4xl mx-auto w-full">

//       {/* ── Page header ── */}
//       <div>
//         <h1 className="text-2xl font-semibold text-gray-900">Profile</h1>
//         <p className="text-sm text-gray-500 mt-1">View-only account information</p>
//       </div>

//       {/* ── Profile card ── */}
//       <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//         <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
//           {/* Avatar with gold badge */}
//           <div className="relative flex-shrink-0">
//             <div className="w-20 h-20 rounded-full bg-[#f5e6c8] flex items-center
//                             justify-center text-2xl font-bold text-gray-700 overflow-hidden
//                             border-4 border-white shadow-md">
//               {/* Profile image placeholder with initials fallback */}
//               <span>{initials}</span>
//             </div>
//             {/* Gold check badge */}
//             <div className="absolute bottom-0 right-0 w-6 h-6 bg-[#e7b343] rounded-full
//                             flex items-center justify-center shadow-sm border-2 border-white">
//               <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24"
//                    stroke="currentColor" strokeWidth={3}>
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
//               </svg>
//             </div>
//           </div>

//           {/* Name + role */}
//           <div>
//             <p className="text-xl font-bold text-gray-900">{name}</p>
//             <p className="text-sm text-gray-500 mt-0.5">{role}</p>
//           </div>
//         </div>
//       </div>

//       {/* ── Personal Information ── */}
//       <SectionCard title="Personal Information">
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
//           <InfoRow label="Email Address" value={personal.email} />
//           <InfoRow label="Gender"        value={personal.gender} />
//           <InfoRow label="Phone Number"  value={personal.phone} />
//           <InfoRow label="Date of Birth" value={personal.dob} />
//         </div>
//       </SectionCard>

//       {/* ── Account Details ── */}
//       <SectionCard title="Account Details">
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
//           <InfoRow label="Account Type" value={account.type} />
//           <InfoRow label="Work Email"   value={account.workEmail} />
//           <InfoRow label="Department"   value={account.department} />
//           <InfoRow
//             label="Password"
//             value={showPassword ? account.password : "•".repeat(account.password.length)}
//             extra={
//               <button
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="text-gray-400 hover:text-gray-700 transition-colors ml-2"
//                 aria-label="Toggle password visibility"
//               >
//                 {showPassword
//                   ? <EyeOff className="w-4 h-4" />
//                   : <Eye className="w-4 h-4" />
//                 }
//               </button>
//             }
//           />
//           {/* Assigned Location — full width */}
//           <div className="col-span-1 sm:col-span-2 flex items-center gap-3
//                           py-3 border-b border-gray-100 last:border-0">
//             <span className="text-sm text-gray-400 w-36 flex-shrink-0">Assigned Location</span>
//             <span className="text-sm font-semibold text-gray-800">{account.location}</span>
//           </div>
//         </div>
//       </SectionCard>

//       {/* ── System Information ── */}
//       <SectionCard title="System Information">
//         <div className="flex flex-col">
//           <InfoRow label="Last Login"  value={system.lastLogin} />
//           <InfoRow label="Created By"  value={system.createdBy} />
//         </div>
//       </SectionCard>
//     </div>
//   );
// }

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

function SectionCard({ title, children }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-base font-bold text-gray-900 mb-4">{title}</h2>
      {children}
    </div>
  );
}

function InfoRow({ label, value, extra }) {
  return (
    <div className="flex items-center gap-3 py-3 border-b border-gray-100 last:border-0">
      <span className="text-sm text-gray-400 w-36 flex-shrink-0">{label}</span>
      <span className="text-sm font-semibold text-gray-800 flex-1">{value || "—"}</span>
      {extra}
    </div>
  );
}

export default function ProfileSection({ worker }) {
  const [showPassword, setShowPassword] = useState(false);

  const name     = worker?.name     ?? "Worker";
  const initials = worker?.initials ?? name.split(" ").map((n) => n[0]).join("").slice(0, 2);
  const role     = worker?.role     ?? "Support Worker";

  return (
    <div className="flex flex-col gap-6 px-4 sm:px-6 py-6 max-w-4xl mx-auto w-full">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Profile</h1>
        <p className="text-sm text-gray-500 mt-1">View-only account information</p>
      </div>

      {/* Profile card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="relative flex-shrink-0">
            <div className="w-20 h-20 rounded-full bg-[#f5e6c8] flex items-center
                            justify-center text-2xl font-bold text-gray-700
                            border-4 border-white shadow-md">
              {initials}
            </div>
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-[#e7b343] rounded-full
                            flex items-center justify-center shadow-sm border-2 border-white">
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
          </div>
          <div>
            <p className="text-xl font-bold text-gray-900">{name}</p>
            <p className="text-sm text-gray-500 mt-0.5">{role}</p>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <SectionCard title="Personal Information">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
          <InfoRow label="Email Address" value={worker?.email}  />
          <InfoRow label="Gender"        value={worker?.gender} />
          <InfoRow label="Phone Number"  value={worker?.phone}  />
          <InfoRow label="Date of Birth" value={worker?.dob}    />
        </div>
      </SectionCard>

      {/* Account Details */}
      <SectionCard title="Account Details">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
          <InfoRow label="Account Type" value={role} />
          <InfoRow label="Staff ID"     value={worker?.staffId} />
          <InfoRow label="Zone"         value={worker?.zone} />
          <div className="col-span-1 sm:col-span-2 flex items-center gap-3 py-3 border-b border-gray-100 last:border-0">
            <span className="text-sm text-gray-400 w-36 flex-shrink-0">Password</span>
            <span className="text-sm font-semibold text-gray-800 flex-1">
              {showPassword ? "••••••••" : "••••••••"}
            </span>
            <button onClick={() => setShowPassword(!showPassword)}
              className="text-gray-400 hover:text-gray-700 transition-colors ml-2"
              aria-label="Toggle password visibility">
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </SectionCard>

      {/* System Information */}
      <SectionCard title="System Information">
        <div className="flex flex-col">
          <InfoRow label="Last Login" value={new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })} />
          <InfoRow label="Account Status" value="Active" />
        </div>
      </SectionCard>
    </div>
  );
}