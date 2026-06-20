// import { Bell, LogOut, Search } from "lucide-react";

// export default function AdminNavbar({ user, onMenuClick }) {
//   return (
//     <header className="w-full bg-[#fef9ec] px-6 py-4 flex items-center
//                        justify-between gap-4 flex-shrink-0">
//       {/* Left: hamburger (mobile) + search */}
//       <div className="flex items-center gap-3 flex-1">
//         {/* Mobile hamburger */}
//         <button
//           onClick={onMenuClick}
//           className="lg:hidden w-9 h-9 flex items-center justify-center
//                      rounded-xl bg-white/50 text-gray-700"
//         >
//           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round"
//                   strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
//           </svg>
//         </button>

//         {/* Search */}
//        <div className="flex items-center gap-2 bg-white rounded-xl
//                         px-4 py-3 flex-1 max-w-md shadow-sm border border-gray-200">
//           <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
//           <input
//             type="text"
//             placeholder="Search here..."
//             className="bg-transparent text-sm text-gray-700 outline-none
//                        placeholder-gray-400 w-full"
//           />
//         </div>
//       </div>

//       {/* Right: bell + user + logout */}
//       <div className="flex items-center gap-4">
//         {/* Bell */}
//         <button className="relative w-9 h-9 flex items-center justify-center
//                            rounded-full bg-white/60 hover:bg-white/80
//                            transition-colors">
//           <Bell className="w-5 h-5 text-gray-700" />
//         <span className="absolute top-1 right-1 w-2 h-2 bg-[#e7b343] rounded-full"/>
//         </button>

//         {/* User */}
//         <div className="flex items-center gap-2">
//           <div className="w-9 h-9 rounded-full bg-[#c9a55a] flex items-center
//                           justify-center text-white text-sm font-bold overflow-hidden">
//             {user.avatar
//               ? <img src={user.avatar} alt={user.name} className="w-full h-full object-cover"/>
//               : user.name.split(" ").map(n => n[0]).join("")
//             }
//           </div>
//           <span className="text-sm font-semibold text-gray-800 hidden sm:block">
//             {user.name}
//           </span>
//         </div>

//         {/* Logout */}
//         <button className="w-9 h-9 flex items-center justify-center
//                            rounded-xl hover:bg-white/40 transition-colors">
//           <LogOut className="w-5 h-5 text-gray-700" />
//         </button>
//       </div>
//     </header>
//   );
// }

import { Bell, LogOut, Search } from "lucide-react";

export default function AdminNavbar({ user, onMenuClick, alertCount = 0 }) {
  return (
    <header className="w-full bg-[#fef9ec] px-6 py-4 flex items-center
                       justify-between gap-4 flex-shrink-0">
      {/* Left: hamburger (mobile) + search */}
      <div className="flex items-center gap-3 flex-1">
        {/* Mobile hamburger */}
        <button
          onClick={onMenuClick}
          className="lg:hidden w-9 h-9 flex items-center justify-center
                     rounded-xl bg-white/50 text-gray-700"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round"
                  strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>

        {/* Search */}
        <div className="flex items-center gap-2 bg-white rounded-xl
                        px-4 py-3 flex-1 max-w-md shadow-sm border border-gray-200">
          <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search here..."
            className="bg-transparent text-sm text-gray-700 outline-none
                       placeholder-gray-400 w-full"
          />
        </div>
      </div>

      {/* Right: bell + user + logout */}
      <div className="flex items-center gap-4">
        {/* Bell */}
        <button className="relative w-9 h-9 flex items-center justify-center
                           rounded-full bg-white/60 hover:bg-white/80
                           transition-colors">
          <Bell className="w-5 h-5 text-gray-700" />
          {alertCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#e7b343] rounded-full"/>
          )}
        </button>

        {/* User */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-[#c9a55a] flex items-center
                          justify-center text-white text-sm font-bold overflow-hidden">
            {user?.avatar
              ? <img src={user.avatar} alt={user.name} className="w-full h-full object-cover"/>
              : user?.name?.split(" ").map(n => n[0]).join("") ?? "A"
            }
          </div>
          <span className="text-sm font-semibold text-gray-800 hidden sm:block">
            {user?.name ?? "Admin"}
          </span>
        </div>

        {/* Logout */}
        <button className="w-9 h-9 flex items-center justify-center
                           rounded-xl hover:bg-white/40 transition-colors">
          <LogOut className="w-5 h-5 text-gray-700" />
        </button>
      </div>
    </header>
  );
}