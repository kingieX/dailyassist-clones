const Navbar = ({ worker }) => {
  return (
    <nav className="w-full bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-end">
      <div className="flex items-center gap-3">
        {/* Avatar with online dot */}
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
            <span className="text-sm font-semibold text-amber-700">
              {worker.initials}
            </span>
          </div>
          {worker.isOnline && (
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />
          )}
        </div>

        {/* Name */}
        <span className="text-sm font-medium text-gray-800">{worker.name}</span>

        {/* Sign Out button */}
        <button className="flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-gray-900 font-semibold text-sm px-4 py-2 rounded-xl transition-colors duration-200">
          Sign Out
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;