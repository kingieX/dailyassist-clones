import { Link } from "react-router-dom";

export default function conduct() {
  return (
    <section className="relative w-full min-h-[520px] flex items-center justify-center overflow-hidden">

      {/* Background image */}
      <div
        className="absolute inset-0 bg-gray-700 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/Images/Code of Conduct.png')" }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Breadcrumb — top left */}
      <div className="absolute top-6 left-6 z-20 flex items-center gap-2 text-sm">
       <Link
          to="/"
          className="text-white hover:text-[#f5c045] transition-colors duration-200"
        >
          Home
        </Link>
        <span className="text-white/60">&gt;</span>
        <Link
          to="/staff-login"
          className="text-white hover:text-[#f5c045] transition-colors duration-200"
        >
          Staff Login
        </Link>
        <span className="text-white/60">&gt;</span>
        <span className="text-[#f5c045] font-medium">
          Terms of Service
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 py-20 max-w-3xl mx-auto">

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6">
          <span className="bg-gradient-to-r from-[#fae2a9] to-[#fae2a9] bg-clip-text text-transparent">
            Code Of Conduct
          </span>
        </h2>

      </div>
    </section>
  );
}