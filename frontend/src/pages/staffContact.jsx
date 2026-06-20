// import { FiMail, FiPhone } from "react-icons/fi";
// import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
// import { FaXTwitter } from "react-icons/fa6";

// export default function ContactSection() {
//   return (
//     <section className="bg-[#fafafa] py-24 px-10 md:px-16 lg:px-24 relative overflow-hidden">
//      <div className="max-w-7xl mx-auto">

//  {/* Rectangle 1 — pink/salmon, top right */}
//   <img
//     src="/Images/Rectangle6.png"
//     loading="lazy" alt=""
//     className="absolute top-0 right-0 w-64 rotate-12 opacity-80 z-0"
//   />

//   {/* Rectangle 2 — blue, mid right */}
//   <img
//   src="/Images/Rectangle7 peach.png"
//     loading="lazy" alt=""
//     className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 -rotate-12 opacity-80 z-0"
//   />

//   {/* Rectangle 3 — smaller, bottom right */}
//   <img
//   src="/Images/Rectangle8 green.png"
//     loading="lazy" alt=""
//       className="absolute bottom-52 right-0 w-56 rotate-6 opacity-80 z-0"
//   />
  
//         {/* Main Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start relative z-10">

            

//           {/* LEFT SIDE */}
//           <div>
//             {/* Heading with brush stroke */}
//             <div className="relative inline-block mb-6">
//               <h2 className="text-4xl md:text-5xl font-bold text-gray-900 relative z-10">
//                Contact Us 
//               </h2>
//               {/* Brush stroke underline */}
//               <img
//                 src="/Images/Vector 1.png"
//                 loading="lazy" alt=""
//                className="absolute bottom-[-6px] left-4 w-64 opacity-90 z-0"
//                 style={{ transform: "rotate(-1deg)" }}
//               />
//             </div>

//             <p className="text-gray-700 text-xl mb-10 max-w-md leading-relaxed">
//              For technical please reach via 01268 xxx xxx, email or complete the form below.
//             </p>

//             {/* Contact Cards */}
//             <div className="space-y-6">

//               {/* Email Card */}
//               <div className="bg-white rounded-xl p-6 shadow-lg flex items-center gap-4">
//                 <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-500 flex-shrink-0">
//                   <FiMail size={22} />
//                 </div>
//                 <div>
//                   <p className="text-gray-500 text-sm mb-1">Email:</p>
//                   <a
//                     href="mailto:Info@dailyassistuk.com"
//                     className="font-bold text-gray-800 hover:text-yellow-600 transition-colors"
//                   >
//                     Info@dailyassistuk.com
//                   </a>
//                 </div>
//               </div>

//               {/* Phone Card */}
//               <div className="bg-white rounded-xl p-6 shadow-lg flex items-center gap-4">
//                 <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-500 flex-shrink-0">
//                   <FiPhone size={22} />
//                 </div>
//                 <div>
//                   <p className="text-gray-500 text-sm mb-1">Phone:</p>
//                   <a
//                     href="tel:01268904508"
//                     className="font-bold text-gray-800 hover:text-yellow-600 transition-colors"
//                   >
//                     01268 904 508
//                   </a>
//                 </div>
//               </div>

//             </div>
//           </div>

//           {/* RIGHT SIDE — Form Card */}
//           <div className="bg-white rounded-2xl p-8 shadow-xl">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

//               {/* Name */}
//               <div className="flex flex-col gap-1">
//                 <label className="text-sm font-medium text-gray-700">
//                   Name<span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Full name"
//                   className="w-full bg-gray-100 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-400 text-gray-700 placeholder-gray-400"
//                 />
//               </div>

//               {/* Email */}
//               <div className="flex flex-col gap-1">
//                 <label className="text-sm font-medium text-gray-700">
//                   Email<span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="email"
//                   placeholder="example@mail.com"
//                   className="w-full bg-gray-100 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-400 text-gray-700 placeholder-gray-400"
//                 />
//               </div>

//               {/* Phone */}
//               <div className="flex flex-col gap-1">
//                 <label className="text-sm font-medium text-gray-700">
//                   Phone<span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="tel"
//                   placeholder="(123) 456 - 789"
//                   className="w-full bg-gray-100 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-400 text-gray-700 placeholder-gray-400"
//                 />
//               </div>

//               {/* Subject */}
//               <div className="flex flex-col gap-1">
//                 <label className="text-sm font-medium text-gray-700">
//                   Subject<span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="ex. Pricing"
//                   className="w-full bg-gray-100 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-400 text-gray-700 placeholder-gray-400"
//                 />
//               </div>

//               {/* Message — full width */}
//               <div className="flex flex-col gap-1 md:col-span-2">
//                 <label className="text-sm font-medium text-gray-700">
//                   Message<span className="text-red-500">*</span>
//                 </label>
//                 <textarea
//                   placeholder="Please type your message here..."
//                   className="w-full bg-gray-100 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-400 text-gray-700 placeholder-gray-400 h-32 resize-none"
//                 />
//               </div>

//             </div>

//             {/* Submit Button */}
//             <button className="w-full bg-[#c9972e] text-white font-semibold py-4 rounded-lg mt-6 transition-all duration-300 hover:shadow-[0_0_25px_rgba(201,151,46,0.6)] hover:scale-[1.02]">
//               Send Message
//             </button>
//           </div>

//         </div>

//         {/* BOTTOM SECTION */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-20">

//           {/* Operating Hours */}
//           <div>
//             <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
//               Operating hours
//             </h3>
//             <p className="text-gray-600 mb-2">
//               Monday - Saturday: <strong>8:00am - 6:00pm</strong>
//             </p>
//             <p className="text-gray-600 mb-4">
//               Sunday: <strong>Closed</strong>
//             </p>
//             <p className="text-sm text-gray-500 italic">
//               "Visits can take place outside these hours by arrangement".
//             </p>
//           </div>

//           {/* Socials */}
//       <div className="flex flex-col items-start ml-16">
//   <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
//     Socials
//   </h3>
//   <div className="grid grid-cols-3 gap-10 max-w-[200px]">
//               {/* Facebook */}
//               <a
//                 href="#"
//                 className="w-14 h-14 flex items-center justify-center rounded-full bg-[#1877F2] text-white text-2xl shadow-md transition hover:scale-110 hover:shadow-lg"
//               >
//                 <FaFacebookF />
//               </a>

//                {/* X (Twitter) */}
//                  <a href="#" className="w-14 h-14 flex items-center justify-center rounded-lg bg-black text-white text-2xl shadow-md transition hover:scale-110 hover:shadow-lg">
//                  <FaXTwitter />
//                     </a>

//               {/* Instagram */}
//               <a
//                 href="#"
//                 className="w-14 h-14 flex items-center justify-center rounded-full text-white text-2xl shadow-md transition hover:scale-110 hover:shadow-lg"
//                 style={{
//                   background:
//                     "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)",
//                 }}
//               >
//                 <FaInstagram />
//               </a>

//               {/* LinkedIn */}
//               <a
//                 href="#"
//                 className="w-14 h-14 flex items-center justify-center rounded-lg bg-[#0A66C2] text-white text-2xl shadow-md transition hover:scale-110 hover:shadow-lg"
//               >
//                 <FaLinkedinIn />
//               </a>

//               {/* YouTube */}
//               <a
//                 href="#"
//                 className="w-14 h-14 flex items-center justify-center rounded-lg bg-[#FF0000] text-white text-2xl shadow-md transition hover:scale-110 hover:shadow-lg"
//               >
//                 <FaYoutube />
//               </a>

//             </div>
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// }


import { FiMail, FiPhone } from "react-icons/fi";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function ContactSection() {
  return (
    <section className="bg-[#fafafa] py-24 px-10 md:px-16 lg:px-24 relative overflow-hidden">

      {/* ── BREADCRUMB — top left ── */}
      <div className="absolute top-16 left-46 z-20 flex items-center gap-2 text-sm">
        <Link
          to="/"
          className="text-black font-semibold hover:text-[#f5c045] transition-colors duration-200"
        >
          Home
        </Link>
        <Link
          to="/"
          className="text-black font-extrabold hover:text-[#f5c045] transition-colors duration-200"
        >
          &gt;
        </Link>
        <Link
          to="/staff-login"
          className="text-black font-semibold hover:text-[#f5c045] transition-colors duration-200"
        >
          Staff Login
        </Link>
        <Link
          to="/staff-login"
          className="text-black font-extrabold hover:text-[#f5c045] transition-colors duration-200"
        >
          &gt;
        </Link>
        <span className="text-[#f5c045] font-semibold font-medium">
          Contact Us
        </span>
      </div>

      <div className="max-w-7xl mx-auto">

        {/* Rectangle 1 — pink/salmon, top right */}
        <img
          src="/Images/Rectangle6.png"
          loading="lazy" alt=""
          className="absolute top-0 right-0 w-64 rotate-12 opacity-80 z-0"
        />

        {/* Rectangle 2 — blue, mid right */}
        <img
          src="/Images/Rectangle7 peach.png"
          loading="lazy" alt=""
          className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 -rotate-12 opacity-80 z-0"
        />

        {/* Rectangle 3 — smaller, bottom right */}
        <img
          src="/Images/Rectangle8 green.png"
          loading="lazy" alt=""
          className="absolute bottom-52 right-0 w-56 rotate-6 opacity-80 z-0"
        />

        {/* Main Grid */}
        <div className="grid grid-cols-1 top-8 lg:grid-cols-2 gap-12 items-start relative z-10">

          {/* LEFT SIDE */}
          <div>
            <div className="relative inline-block mb-6">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 relative z-10">
                Contact Us
              </h2>
              <img
                src="/Images/Vector 1.png"
                loading="lazy" alt=""
                className="absolute bottom-[-6px] left-4 w-64 opacity-90 z-0"
                style={{ transform: "rotate(-1deg)" }}
              />
            </div>

            <p className="text-gray-700 text-xl mb-10 max-w-md leading-relaxed">
              For technical please reach via 01268 xxx xxx, email or complete the form below.
            </p>

            <div className="space-y-6">

              {/* Email Card */}
              <div className="bg-white rounded-xl p-6 shadow-lg flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-500 flex-shrink-0">
                  <FiMail size={22} />
                </div>
                <div>
                  <p className="text-gray-500 text-sm mb-1">Email:</p>
                  
                    <a href="mailto:Info@dailyassistuk.com"
                    className="font-bold text-gray-800 hover:text-yellow-600 transition-colors"
                  >
                    Info@dailyassistuk.com
                  </a>
                </div>
              </div>

              {/* Phone Card */}
              <div className="bg-white rounded-xl p-6 shadow-lg flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-500 flex-shrink-0">
                  <FiPhone size={22} />
                </div>
                <div>
                  <p className="text-gray-500 text-sm mb-1">Phone:</p>
                  
                    <a href="tel:01268904508"
                    className="font-bold text-gray-800 hover:text-yellow-600 transition-colors"
                  >
                    01268 904 508
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT SIDE — Form Card */}
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Name<span className="text-red-500">*</span></label>
                <input type="text" placeholder="Full name" className="w-full bg-gray-100 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-400 text-gray-700 placeholder-gray-400" />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Email<span className="text-red-500">*</span></label>
                <input type="email" placeholder="example@mail.com" className="w-full bg-gray-100 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-400 text-gray-700 placeholder-gray-400" />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Phone<span className="text-red-500">*</span></label>
                <input type="tel" placeholder="(123) 456 - 789" className="w-full bg-gray-100 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-400 text-gray-700 placeholder-gray-400" />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Subject<span className="text-red-500">*</span></label>
                <input type="text" placeholder="ex. Pricing" className="w-full bg-gray-100 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-400 text-gray-700 placeholder-gray-400" />
              </div>

              <div className="flex flex-col gap-1 md:col-span-2">
                <label className="text-sm font-medium text-gray-700">Message<span className="text-red-500">*</span></label>
                <textarea placeholder="Please type your message here..." className="w-full bg-gray-100 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-400 text-gray-700 placeholder-gray-400 h-32 resize-none" />
              </div>

            </div>

            <button className="w-full bg-[#c9972e] text-white font-semibold py-4 rounded-lg mt-6 transition-all duration-300 hover:shadow-[0_0_25px_rgba(201,151,46,0.6)] hover:scale-[1.02]">
              Send Message
            </button>
          </div>

        </div>

        {/* BOTTOM SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-20">

          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Operating hours</h3>
            <p className="text-gray-600 mb-2">Monday - Saturday: <strong>8:00am - 6:00pm</strong></p>
            <p className="text-gray-600 mb-4">Sunday: <strong>Closed</strong></p>
            <p className="text-sm text-gray-500 italic">"Visits can take place outside these hours by arrangement".</p>
          </div>

          <div className="flex flex-col items-start ml-16">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Socials</h3>
            <div className="grid grid-cols-3 gap-10 max-w-[200px]">

              <a href="#" className="w-14 h-14 flex items-center justify-center rounded-full bg-[#1877F2] text-white text-2xl shadow-md transition hover:scale-110 hover:shadow-lg">
                <FaFacebookF />
              </a>

              <a href="#" className="w-14 h-14 flex items-center justify-center rounded-lg bg-black text-white text-2xl shadow-md transition hover:scale-110 hover:shadow-lg">
                <FaXTwitter />
              </a>

              <a href="#" className="w-14 h-14 flex items-center justify-center rounded-full text-white text-2xl shadow-md transition hover:scale-110 hover:shadow-lg"
                style={{ background: "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)" }}>
                <FaInstagram />
              </a>

              <a href="#" className="w-14 h-14 flex items-center justify-center rounded-lg bg-[#0A66C2] text-white text-2xl shadow-md transition hover:scale-110 hover:shadow-lg">
                <FaLinkedinIn />
              </a>

              <a href="#" className="w-14 h-14 flex items-center justify-center rounded-lg bg-[#FF0000] text-white text-2xl shadow-md transition hover:scale-110 hover:shadow-lg">
                <FaYoutube />
              </a>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}