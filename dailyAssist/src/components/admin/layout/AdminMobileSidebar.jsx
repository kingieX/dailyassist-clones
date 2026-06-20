// import { useEffect } from "react";
// import {
//   X, LayoutDashboard, Calendar, Users, UserCircle,
//   BookOpen, MessageSquare, BarChart2, Package,
//   Briefcase, FileText, Settings, LogOut,
// } from "lucide-react";

// const navItems = [
//   { id: "dashboard",   label: "Dashboard",         icon: LayoutDashboard },
//   { id: "visits",      label: "Visits & Schedules", icon: Calendar        },
//   { id: "staff",       label: "Staff Management",   icon: Users           },
//   { id: "clients",     label: "Clients",            icon: UserCircle      },
//   { id: "bookings",    label: "Bookings",           icon: BookOpen,   badge: 12 },
//   { id: "messages",    label: "Messages",           icon: MessageSquare, badge: 11 },
//   { id: "reports",     label: "Reports",            icon: BarChart2,  badge: 4  },
//   { id: "packages",    label: "Packages",           icon: Package         },
//   { id: "recruitment", label: "Recruitment",        icon: Briefcase,  badge: 11 },
//   { id: "jobposts",    label: "Job Posts",          icon: FileText        },
//   { id: "settings",    label: "Settings",           icon: Settings        },
//   { id: "logout",      label: "Log out",            icon: LogOut          },
// ];

// export default function AdminMobileSidebar({ isOpen, onClose, activeSection, setActiveSection }) {
//   useEffect(() => {
//     document.body.style.overflow = isOpen ? "hidden" : "";
//     return () => { document.body.style.overflow = ""; };
//   }, [isOpen]);

//   return (
//     <>
//       <div
//         className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300
//                     ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
//         onClick={onClose}
//       />
//       <div className={`fixed top-0 left-0 h-full w-72 z-50 bg-[#FAFAFA]
//                        shadow-xl flex flex-col overflow-y-auto
//                        transform transition-transform duration-300
//                        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
//         {/* Header */}
//         <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
//           <div className="flex items-center gap-2">
//             <img src="/Images/Logo/Daily Assist Logos/LOGO-MAIN.png"
//                  alt="logo" className="w-8 object-contain" />
//             <img src="/Images/Logo/Daily Assist Logos/Text Logo - No Bg Black.png"
//                  alt="Daily Assist UK" className="w-[110px] object-contain" />
//           </div>
//           <button onClick={onClose}
//                   className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center">
//             <X className="w-4 h-4 text-gray-600" />
//           </button>
//         </div>

//         {/* Nav */}
//         <nav className="flex flex-col gap-0.5 px-3 py-4 flex-1">
//           {navItems.map(({ id, label, icon: Icon, badge }) => {
//             const isActive = activeSection === id;
//             return (
//               <button
//                 key={id}
//                 onClick={() => { setActiveSection(id); onClose(); }}
//                 className={`flex items-center gap-3 px-3 py-2.5 rounded-xl
//                             text-sm font-medium w-full text-left transition-all
//                             ${isActive
//                               ? "bg-[#fef3d0] text-gray-900 font-semibold"
//                               : "text-gray-600 hover:bg-gray-100"}`}
//               >
//                 <Icon className={`w-4 h-4 flex-shrink-0
//                                   ${isActive ? "text-[#e7b343]" : "text-gray-400"}`} />
//                 <span className="flex-1">{label}</span>
//                 {badge && (
//                   <span className="bg-gray-200 text-gray-600 text-xs font-bold
//                                    rounded-full px-2 py-0.5">{badge}</span>
//                 )}
//               </button>
//             );
//           })}
//         </nav>
//       </div>
//     </>
//   );
// }

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import {
  X, LayoutDashboard, Calendar, Users, UserCircle,
  BookOpen, MessageSquare, BarChart2, Package,
  Briefcase, FileText, Settings, LogOut,
} from "lucide-react";

const navItems = [
  { id: "dashboard",   label: "Dashboard",         icon: LayoutDashboard },
  { id: "visits",      label: "Visits & Schedules", icon: Calendar        },
  { id: "staff",       label: "Staff Management",   icon: Users           },
  { id: "clients",     label: "Clients",            icon: UserCircle      },
  { id: "bookings",    label: "Bookings",           icon: BookOpen,   badge: 12 },
  { id: "messages",    label: "Messages",           icon: MessageSquare, badge: 11 },
  { id: "reports",     label: "Reports",            icon: BarChart2,  badge: 4  },
  { id: "packages",    label: "Packages",           icon: Package         },
  { id: "recruitment", label: "Recruitment",        icon: Briefcase,  badge: 11 },
  { id: "jobposts",    label: "Job Posts",          icon: FileText        },
  { id: "settings",    label: "Settings",           icon: Settings        },
];

function LogoutModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 px-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md px-8 py-8 flex flex-col items-center gap-4 text-center" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-bold text-gray-900">Confirm Logout?</h2>
        <p className="text-sm text-gray-500 leading-relaxed">
          Logging out will end your current admin session. Make sure all important changes have been saved.
        </p>
        <div className="flex gap-3 w-full mt-2">
          <button onClick={onClose}
            className="flex-1 py-3 rounded-xl border border-red-400 font-medium text-sm text-red-500 hover:bg-red-50 transition-colors">
            Go Back
          </button>
          <button onClick={onConfirm}
            className="flex-1 py-3 rounded-xl font-semibold text-sm text-white hover:opacity-90 transition-colors bg-red-500">
            Yes, Log Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminMobileSidebar({ isOpen, onClose, activeSection, setActiveSection }) {
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);
const handleLogout = () => {
    setShowLogout(false);
    logout();
    onClose();
    navigate("/");
  };

  return (
    <>
      <div className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300
                       ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={onClose} />

      <div className={`fixed top-0 left-0 h-full w-72 z-50 bg-[#FAFAFA]
                       shadow-xl flex flex-col overflow-y-auto
                       transform transition-transform duration-300
                       ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <img src="/Images/Logo/Daily Assist Logos/LOGO-MAIN.png" alt="logo" className="w-8 object-contain" />
            <img src="/Images/Logo/Daily Assist Logos/Text Logo - No Bg Black.png" alt="Daily Assist UK" className="w-[110px] object-contain" />
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center">
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-0.5 px-3 py-4 flex-1">
          {navItems.map(({ id, label, icon: Icon, badge }) => {
            const isActive = activeSection === id;
            return (
              <button key={id}
                onClick={() => { setActiveSection(id); onClose(); }}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl
                            text-sm font-medium w-full text-left transition-all
                            ${isActive ? "bg-[#fef3d0] text-gray-900 font-semibold" : "text-gray-600 hover:bg-gray-100"}`}>
                <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? "text-[#e7b343]" : "text-gray-400"}`} />
                <span className="flex-1">{label}</span>
                {badge && (
                  <span className="bg-gray-200 text-gray-600 text-xs font-bold rounded-full px-2 py-0.5">{badge}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-3 pb-4 border-t border-gray-100 pt-3">
          <button onClick={() => setShowLogout(true)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl
                       text-sm font-medium w-full text-left
                       text-red-500 hover:bg-red-50 transition-all duration-200">
            <LogOut className="w-4 h-4 text-red-400 flex-shrink-0" />
            <span>Log out</span>
          </button>
        </div>
      </div>

      <LogoutModal isOpen={showLogout} onClose={() => setShowLogout(false)} onConfirm={handleLogout} />
    </>
  );
}