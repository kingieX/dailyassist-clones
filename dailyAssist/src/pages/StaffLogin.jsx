// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// /* ── ICONS ── */
// const MailIcon = () => (
//   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
//     <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0l-9.75 6.75L2.25 6.75" />
//   </svg>
// );

// const EyeIcon = () => (
//   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
//     <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
//     <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//   </svg>
// );

// const EyeOffIcon = () => (
//   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
//     <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
//   </svg>
// );

// const ChevronIcon = () => (
//   <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
//     <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
//   </svg>
// );

// /* ── MAIN COMPONENT ── */
// const StaffLogin = () => {
//   const navigate = useNavigate();
//   const { login } = useAuth();
//   const [showPassword, setShowPassword] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState({});

//   const handleSubmit = async () => {
//     const newErrors = {};
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!email.trim()) newErrors.email = "Email address is required.";
//     else if (!emailRegex.test(email)) newErrors.email = "Please enter a valid email address.";
//     if (!password.trim()) newErrors.password = "Password is required.";
//     setErrors(newErrors);
//    if (Object.keys(newErrors).length === 0) {
//       try {
//         const response = await fetch("YOUR_API_URL/auth/login", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ email, password }),
//         });

//         const data = await response.json();

//         if (!response.ok) {
//           setErrors({ general: data.message || "Invalid email or password." });
//           return;
//         }

//         login({
//           name:  data.user.name,
//           email: data.user.email,
//           role:  data.user.role,  // "super_admin", "admin", or "worker"
//           token: data.token,
//         });

//         // Redirect based on role
//         if (data.user.role === "super_admin" || data.user.role === "admin") {
//           navigate("/admin");
//         } else {
//           navigate("/dashboard");
//         }

//       } catch (err) {
//         setErrors({ general: "Something went wrong. Please try again." });
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen flex bg-white">

//       {/* ── LEFT SIDE ── */}
//       <div className="w-full lg:w-1/2 flex flex-col relative px-8 md:px-16 py-12">

//         {/* Background decorative squares */}
//         <div className="absolute inset-0 overflow-hidden pointer-events-none">
//           {[
//             "top-4 left-4 w-24 h-24", "top-4 left-32 w-16 h-16", "top-4 left-56 w-20 h-20",
//             "top-4 right-8 w-24 h-24", "top-4 right-32 w-16 h-16",
//             "top-32 left-4 w-20 h-20", "top-32 left-24 w-16 h-16",
//             "top-32 right-4 w-24 h-24", "top-32 right-24 w-16 h-16",
//             "bottom-10 left-4 w-24 h-24", "bottom-10 left-32 w-16 h-16",
//             "bottom-10 right-4 w-20 h-20", "bottom-10 right-32 w-16 h-16",
//             "bottom-36 left-10 w-16 h-16", "bottom-36 right-10 w-16 h-16",
//           ].map((cls, i) => (
//             <div key={i} className={`absolute ${cls} border border-gray-200 rounded-xl rotate-6 opacity-40`} />
//           ))}
//         </div>

       

//       {/* Breadcrumb */}
//         <div className="relative z-10 flex items-center gap-2 text-sm mb-8">
//           <span
//             className="text-gray-700 hover:text-[#f5c045] cursor-pointer transition-colors duration-200 font-medium"
//             onClick={() => navigate("/")}
//           >
//             Home
//           </span>
//           <ChevronIcon />
//           <span className="text-[#f5c045] font-medium">Staff login</span>
//         </div>

//         {/* Left content */}
//         <div className="relative z-10 flex-1 flex flex-col justify-center max-w-lg">

//           <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
//             Forget your login<br />credentials?
//           </h1>

//           <div className="w-104 h-1 bg-gradient-to-r from-yellow-400 to-yellow-200 rounded mb-8" />

//           <div className="space-y-5 text-gray-700 text-xl leading-relaxed mb-8">
//             <p>
//               <span className="font-bold text-gray-700">Username/Email:</span> We expect your login details to be your work email address.
//             </p>
//             <p>
//               <span className="font-bold text-gray-700">Password:</span> The password is originally allocated to you for this platform by the Admin.
//             </p>
//             <p className="text-gray-800">
//               If you forget your password or having trouble accessing your account please report to the admin.
//             </p>
//             <p className="text-gray-500">
//               Please click{" "}
//               <span
//                 className="text-green-600 font-semibold cursor-pointer hover:underline"
//                 onClick={() => navigate("/staffContact")}
//               >
//                 "contact us"
//               </span>
//               {" "}to request for a new password.
//             </p>
//           </div>

//           {/* Code of Conduct Button */}
//           <button
//             onClick={() => navigate("/code-of-conduct")}
//             className="w-full max-w-sm py-4 rounded-xl font-bold text-white text-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg cursor-pointer"
//             style={{ background: "linear-gradient(135deg, #4a90d9 0%, #f5c045 100%)" }}
//           >
//             "View Code of Conduct For All Staffs"
//           </button>

//         </div>
//       </div>

//       {/* ── RIGHT SIDE ── */}
//       <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center">

//         {/* Background image placeholder */}
//         <div className="absolute inset-0">
//           {/* REPLACE src below with your actual image path */}
//           <img
//             src="/Images/Staff Login Image.png"
//             loading="lazy" alt="Staff login visual"
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute inset-0 bg-black/20" />
//         </div>

//         {/* Login Card */}
//         <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm mx-8">

//           {/* Logo */}
//           <div className="flex justify-center mb-3">
//             {/* REPLACE src below with your actual logo path */}
//             <img
//               src="/Images/Logo/Daily Assist Logos/LOGO-MAIN.png"
//               loading="lazy" alt="Logo"
//               className="w-16 h-16 object-contain"
//             />
//           </div>

//           <h2 className="text-xl font-bold text-center text-yellow-500 mb-6">Staff Login</h2>

//           {/* Email */}
//           <div className="mb-4">
//             <label className="text-sm font-medium text-gray-700 mb-1 block">Email Address</label>
//             <div className="relative">
//               <input
//                 type="email"
//                 placeholder="Enter email address"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full bg-gray-100 rounded-md px-4 py-3 pr-10 outline-none text-sm focus:ring-2 focus:ring-yellow-300 text-gray-800 placeholder-gray-400 transition"
//               />
//               <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
//                 <MailIcon />
//               </span>
//             </div>
//             {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
//           </div>

//           {/* Password */}
//           <div className="mb-2">
//             <label className="text-sm font-medium text-gray-700 mb-1 block">Password</label>
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Enter password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full bg-gray-100 rounded-md px-4 py-3 pr-10 outline-none text-sm focus:ring-2 focus:ring-yellow-300 text-gray-800 placeholder-gray-400 transition"
//               />
//               <span
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <EyeIcon /> : <EyeOffIcon />}
//               </span>
//             </div>
//             {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
//           </div>

//          {/* Login Button */}
//           {errors.general && (
//             <p className="text-red-500 text-xs text-center mb-2">{errors.general}</p>
//           )}
//           <button
//             onClick={handleSubmit}
//             className="w-full py-3 rounded-md font-medium text-white mt-5 transition-all duration-300 hover:shadow-[0_0_20px_rgba(250,204,21,0.6)] hover:scale-[1.02] cursor-pointer"
//             style={{ background: "linear-gradient(to right, #f5c045, #e6a800)" }}
//           >
//             Log in
//           </button>

//         </div>
//       </div>

//       {/* ── MOBILE LOGIN CARD (shown only on small screens) ── */}
//       <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#fafafa] rounded-t-2xl shadow-2xl p-6 z-20">
//        {/* ── MOBILE VIEW (shown only on small screens) ── */}
// <div className="lg:hidden fixed inset-0 bg-[#fafafa] flex flex-col px-5 pt-28 pb-8 z-30 overflow-y-auto">

//   {/* Top Bar */}
//   <div className="flex items-center justify-between mb-10">
//    <span
//   className="flex items-center gap-1 text-gray-600 text-sm font-medium cursor-pointer hover:text-gray-900 transition-colors"
//   onClick={() => navigate("/")}
// >
//   <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
//     <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
//   </svg>
//   Back to home
// </span>
//     <button
//       onClick={() => navigate("/code-of-conduct")}
//       className="px-4 py-2 rounded-full text-sm font-semibold text-white cursor-pointer"
//       style={{ background: "linear-gradient(180deg, #4a90d9 0%, #f5c045 100%)" }}
//     >
//       Code of Conduct
//     </button>
//   </div>

//   {/* Login Card */}
//   <div className="bg-white rounded-[20px] p-6 w-full shadow-xl">

//     {/* Logo */}
//     <div className="flex justify-center mb-3">
//       <img
//         src="/Images/Logo/Daily Assist Logos/LOGO-MAIN.png"
//         loading="lazy" alt="Logo"
//         className="w-16 h-16 object-contain"
//       />
//     </div>

//     {/* Title */}
//     <h2 className="text-xl font-bold text-center mb-6" style={{ color: "#E0B44C" }}>
//       Staff Login
//     </h2>

//     {/* Email */}
//     <div className="mb-4">
//       <label className="text-sm font-semibold text-gray-700 mb-2 block">Email Address</label>
//       <div className="relative">
//         <input
//           type="email"
//           placeholder="Enter email address"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full bg-white rounded-[10px] px-4 py-3 pr-10 outline-none text-sm text-gray-800 placeholder-gray-400 shadow-sm"
//         />
//         <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
//           <MailIcon />
//         </span>
//       </div>
//       {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
//     </div>

//     {/* Password */}
//     <div className="mb-6">
//       <label className="text-sm font-semibold text-gray-700 mb-2 block">Password</label>
//       <div className="relative">
//         <input
//           type={showPassword ? "text" : "password"}
//           placeholder="Enter password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full bg-white rounded-[10px] px-4 py-3 pr-10 outline-none text-sm text-gray-800 placeholder-gray-400 shadow-sm"
//         />
//         <span
//           className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
//           onClick={() => setShowPassword(!showPassword)}
//         >
//           {showPassword ? <EyeIcon /> : <EyeOffIcon />}
//         </span>
//       </div>
//       {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
//     </div>

//     {/* Login Button */}
//     {errors.general && (
//       <p className="text-red-500 text-xs text-center mb-2">{errors.general}</p>
//     )}
//     <button
//       onClick={handleSubmit}
//       className="w-full py-3 rounded-[10px] font-semibold text-gray-900 text-base shadow-md cursor-pointer transition-all duration-300 active:scale-[0.98]"
//       style={{ background: "#E0B44C" }}
//     >
//       Log in
//     </button>
//   </div>

//   {/* Forgotten credentials */}
//   <div className="mt-6 text-center text-gray-500 text-sm">
//     Forgotten credentials?{" "}
//     <span
//       className="text-green-500 font-semibold cursor-pointer hover:underline"
//       onClick={() => navigate("/staffContact")}
//     >
//       Click here
//     </span>
//   </div>

// </div>
//       </div>

//     </div>
//   );
// };

// export default StaffLogin;




// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { authAPI } from "../services/api";

// /* ── ICONS ── */
// const MailIcon = () => (
//   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
//     <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0l-9.75 6.75L2.25 6.75" />
//   </svg>
// );

// const EyeIcon = () => (
//   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
//     <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
//     <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//   </svg>
// );

// const EyeOffIcon = () => (
//   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
//     <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
//   </svg>
// );

// const ChevronIcon = () => (
//   <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
//     <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
//   </svg>
// );

// /* ── MAIN COMPONENT ── */
// const StaffLogin = () => {
//   const navigate = useNavigate();
//   const { login } = useAuth();
//   const [showPassword, setShowPassword] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async () => {
//     const newErrors = {};
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!email.trim()) newErrors.email = "Email address is required.";
//     else if (!emailRegex.test(email)) newErrors.email = "Please enter a valid email address.";
//     if (!password.trim()) newErrors.password = "Password is required.";
//     setErrors(newErrors);

//     if (Object.keys(newErrors).length === 0) {
//       setLoading(true);
//       try {
//         // const response = await authAPI.login({ email, password });
//         // Try admin login first, fall back to worker login based on role
// let response;
// try {
//   response = await authAPI.adminLogin({ email, password });
// } catch (adminErr) {
//   try {
//     response = await authAPI.workerLogin({ email, password });
//   } catch (workerErr) {
//     throw workerErr;
//   }
// }
//        console.log("FULL RESPONSE:", response);
// console.log("RESPONSE DATA:", response.data);
// console.log("RESPONSE DATA.DATA:", response.data.data);
// const data = response.data.data;

//         // Save token and user to localStorage
//         localStorage.setItem("token", data.accessToken);
//         localStorage.setItem("user", JSON.stringify(data.user));

//         // Save to auth context
//         login({
//           name:  data.user.name  ?? data.user.email,
//           email: data.user.email,
//           role:  data.user.role?.toLowerCase(),
//           token: data.accessToken,
//         });

//         // Redirect based on role
//         if (data.user.role?.toLowerCase() === "super_admin" || data.user.role?.toLowerCase() === "admin") {
//           navigate("/admin");
//         } else {
//           navigate("/dashboard");
//         }

//       } catch (err) {
//         const message = err.response?.data?.message || "Invalid email or password.";
//         setErrors({ general: message });
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen flex bg-white">

//       {/* ── LEFT SIDE ── */}
//       <div className="w-full lg:w-1/2 flex flex-col relative px-8 md:px-16 py-12">

//         {/* Background decorative squares */}
//         <div className="absolute inset-0 overflow-hidden pointer-events-none">
//           {[
//             "top-4 left-4 w-24 h-24", "top-4 left-32 w-16 h-16", "top-4 left-56 w-20 h-20",
//             "top-4 right-8 w-24 h-24", "top-4 right-32 w-16 h-16",
//             "top-32 left-4 w-20 h-20", "top-32 left-24 w-16 h-16",
//             "top-32 right-4 w-24 h-24", "top-32 right-24 w-16 h-16",
//             "bottom-10 left-4 w-24 h-24", "bottom-10 left-32 w-16 h-16",
//             "bottom-10 right-4 w-20 h-20", "bottom-10 right-32 w-16 h-16",
//             "bottom-36 left-10 w-16 h-16", "bottom-36 right-10 w-16 h-16",
//           ].map((cls, i) => (
//             <div key={i} className={`absolute ${cls} border border-gray-200 rounded-xl rotate-6 opacity-40`} />
//           ))}
//         </div>

//         {/* Breadcrumb */}
//         <div className="relative z-10 flex items-center gap-2 text-sm mb-8">
//           <span
//             className="text-gray-700 hover:text-[#f5c045] cursor-pointer transition-colors duration-200 font-medium"
//             onClick={() => navigate("/")}
//           >
//             Home
//           </span>
//           <ChevronIcon />
//           <span className="text-[#f5c045] font-medium">Staff login</span>
//         </div>

//         {/* Left content */}
//         <div className="relative z-10 flex-1 flex flex-col justify-center max-w-lg">

//           <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
//             Forget your login<br />credentials?
//           </h1>

//           <div className="w-104 h-1 bg-gradient-to-r from-yellow-400 to-yellow-200 rounded mb-8" />

//           <div className="space-y-5 text-gray-700 text-xl leading-relaxed mb-8">
//             <p>
//               <span className="font-bold text-gray-700">Username/Email:</span> We expect your login details to be your work email address.
//             </p>
//             <p>
//               <span className="font-bold text-gray-700">Password:</span> The password is originally allocated to you for this platform by the Admin.
//             </p>
//             <p className="text-gray-800">
//               If you forget your password or having trouble accessing your account please report to the admin.
//             </p>
//             <p className="text-gray-500">
//               Please click{" "}
//               <span
//                 className="text-green-600 font-semibold cursor-pointer hover:underline"
//                 onClick={() => navigate("/staffContact")}
//               >
//                 "contact us"
//               </span>
//               {" "}to request for a new password.
//             </p>
//           </div>

//           {/* Code of Conduct Button */}
//           <button
//             onClick={() => navigate("/code-of-conduct")}
//             className="w-full max-w-sm py-4 rounded-xl font-bold text-white text-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg cursor-pointer"
//             style={{ background: "linear-gradient(135deg, #4a90d9 0%, #f5c045 100%)" }}
//           >
//             "View Code of Conduct For All Staffs"
//           </button>

//         </div>
//       </div>

//       {/* ── RIGHT SIDE ── */}
//       <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center">

//         {/* Background image */}
//         <div className="absolute inset-0">
//           <img
//             src="/Images/Staff Login Image.png"
//             loading="lazy" alt="Staff login visual"
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute inset-0 bg-black/20" />
//         </div>

//         {/* Login Card */}
//         <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm mx-8">

//           {/* Logo */}
//           <div className="flex justify-center mb-3">
//             <img
//               src="/Images/Logo/Daily Assist Logos/LOGO-MAIN.png"
//               loading="lazy" alt="Logo"
//               className="w-16 h-16 object-contain"
//             />
//           </div>

//           <h2 className="text-xl font-bold text-center text-yellow-500 mb-6">Staff Login</h2>

//           {/* Email */}
//           <div className="mb-4">
//             <label className="text-sm font-medium text-gray-700 mb-1 block">Email Address</label>
//             <div className="relative">
//               <input
//                 type="email"
//                 placeholder="Enter email address"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full bg-gray-100 rounded-md px-4 py-3 pr-10 outline-none text-sm focus:ring-2 focus:ring-yellow-300 text-gray-800 placeholder-gray-400 transition"
//               />
//               <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
//                 <MailIcon />
//               </span>
//             </div>
//             {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
//           </div>

//           {/* Password */}
//           <div className="mb-2">
//             <label className="text-sm font-medium text-gray-700 mb-1 block">Password</label>
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Enter password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full bg-gray-100 rounded-md px-4 py-3 pr-10 outline-none text-sm focus:ring-2 focus:ring-yellow-300 text-gray-800 placeholder-gray-400 transition"
//               />
//               <span
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <EyeIcon /> : <EyeOffIcon />}
//               </span>
//             </div>
//             {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
//           </div>

//           {/* General error */}
//           {errors.general && (
//             <p className="text-red-500 text-xs text-center mb-2">{errors.general}</p>
//           )}

//           {/* Login Button */}
//           <button
//             onClick={handleSubmit}
//             disabled={loading}
//             className="w-full py-3 rounded-md font-medium text-white mt-5 transition-all duration-300 hover:shadow-[0_0_20px_rgba(250,204,21,0.6)] hover:scale-[1.02] cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
//             style={{ background: "linear-gradient(to right, #f5c045, #e6a800)" }}
//           >
//             {loading ? "Logging in..." : "Log in"}
//           </button>

//         </div>
//       </div>

//       {/* ── MOBILE VIEW ── */}
//       <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#fafafa] rounded-t-2xl shadow-2xl p-6 z-20">
//         <div className="lg:hidden fixed inset-0 bg-[#fafafa] flex flex-col px-5 pt-28 pb-8 z-30 overflow-y-auto">

//           {/* Top Bar */}
//           <div className="flex items-center justify-between mb-10">
//             <span
//               className="flex items-center gap-1 text-gray-600 text-sm font-medium cursor-pointer hover:text-gray-900 transition-colors"
//               onClick={() => navigate("/")}
//             >
//               <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
//               </svg>
//               Back to home
//             </span>
//             <button
//               onClick={() => navigate("/code-of-conduct")}
//               className="px-4 py-2 rounded-full text-sm font-semibold text-white cursor-pointer"
//               style={{ background: "linear-gradient(180deg, #4a90d9 0%, #f5c045 100%)" }}
//             >
//               Code of Conduct
//             </button>
//           </div>

//           {/* Login Card */}
//           <div className="bg-white rounded-[20px] p-6 w-full shadow-xl">

//             {/* Logo */}
//             <div className="flex justify-center mb-3">
//               <img
//                 src="/Images/Logo/Daily Assist Logos/LOGO-MAIN.png"
//                 loading="lazy" alt="Logo"
//                 className="w-16 h-16 object-contain"
//               />
//             </div>

//             {/* Title */}
//             <h2 className="text-xl font-bold text-center mb-6" style={{ color: "#E0B44C" }}>
//               Staff Login
//             </h2>

//             {/* Email */}
//             <div className="mb-4">
//               <label className="text-sm font-semibold text-gray-700 mb-2 block">Email Address</label>
//               <div className="relative">
//                 <input
//                   type="email"
//                   placeholder="Enter email address"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="w-full bg-white rounded-[10px] px-4 py-3 pr-10 outline-none text-sm text-gray-800 placeholder-gray-400 shadow-sm"
//                 />
//                 <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
//                   <MailIcon />
//                 </span>
//               </div>
//               {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
//             </div>

//             {/* Password */}
//             <div className="mb-6">
//               <label className="text-sm font-semibold text-gray-700 mb-2 block">Password</label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Enter password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="w-full bg-white rounded-[10px] px-4 py-3 pr-10 outline-none text-sm text-gray-800 placeholder-gray-400 shadow-sm"
//                 />
//                 <span
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? <EyeIcon /> : <EyeOffIcon />}
//                 </span>
//               </div>
//               {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
//             </div>

//             {/* General error */}
//             {errors.general && (
//               <p className="text-red-500 text-xs text-center mb-2">{errors.general}</p>
//             )}

//             {/* Login Button */}
//             <button
//               onClick={handleSubmit}
//               disabled={loading}
//               className="w-full py-3 rounded-[10px] font-semibold text-gray-900 text-base shadow-md cursor-pointer transition-all duration-300 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
//               style={{ background: "#E0B44C" }}
//             >
//               {loading ? "Logging in..." : "Log in"}
//             </button>
//           </div>

//           {/* Forgotten credentials */}
//           <div className="mt-6 text-center text-gray-500 text-sm">
//             Forgotten credentials?{" "}
//             <span
//               className="text-green-500 font-semibold cursor-pointer hover:underline"
//               onClick={() => navigate("/staffContact")}
//             >
//               Click here
//             </span>
//           </div>

//         </div>
//       </div>

//     </div>
//   );
// };

// export default StaffLogin;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { authAPI } from "../services/api";

const MailIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0l-9.75 6.75L2.25 6.75" />
  </svg>
);
const EyeIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);
const EyeOffIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
  </svg>
);
const ChevronIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);

const StaffLogin = () => {
  const navigate  = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [errors,   setErrors]   = useState({});
  const [loading,  setLoading]  = useState(false);

  const handleSubmit = async () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) newErrors.email = "Email address is required.";
    else if (!emailRegex.test(email)) newErrors.email = "Please enter a valid email address.";
    if (!password.trim()) newErrors.password = "Password is required.";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    setErrors({});

    try {
      const response = await authAPI.adminLogin({ email, password });
      const body = response.data;
      

      const accessToken = body.data.accessToken;
      const user = body.data.user;
      const role = user.role.toLowerCase();

      localStorage.setItem("token", accessToken);
      localStorage.setItem("user", JSON.stringify(user));

      login({ name: user.email, email: user.email, role: role, token: accessToken });

      if (role === "super_admin" || role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("FULL ERROR:", err);
      setErrors({ general: err.response?.data?.message || "Invalid email or password." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      <div className="w-full lg:w-1/2 flex flex-col relative px-8 md:px-16 py-12">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {["top-4 left-4 w-24 h-24","top-4 left-32 w-16 h-16","top-4 left-56 w-20 h-20","top-4 right-8 w-24 h-24","top-4 right-32 w-16 h-16","top-32 left-4 w-20 h-20","top-32 left-24 w-16 h-16","top-32 right-4 w-24 h-24","top-32 right-24 w-16 h-16","bottom-10 left-4 w-24 h-24","bottom-10 left-32 w-16 h-16","bottom-10 right-4 w-20 h-20","bottom-10 right-32 w-16 h-16","bottom-36 left-10 w-16 h-16","bottom-36 right-10 w-16 h-16"].map((cls, i) => (
            <div key={i} className={`absolute ${cls} border border-gray-200 rounded-xl rotate-6 opacity-40`} />
          ))}
        </div>
        <div className="relative z-10 flex items-center gap-2 text-sm mb-8">
          <span className="text-gray-700 hover:text-[#f5c045] cursor-pointer transition-colors duration-200 font-medium" onClick={() => navigate("/")}>Home</span>
          <ChevronIcon />
          <span className="text-[#f5c045] font-medium">Staff login</span>
        </div>
        <div className="relative z-10 flex-1 flex flex-col justify-center max-w-lg">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">Forget your login<br />credentials?</h1>
          <div className="w-104 h-1 bg-gradient-to-r from-yellow-400 to-yellow-200 rounded mb-8" />
          <div className="space-y-5 text-gray-700 text-xl leading-relaxed mb-8">
            <p><span className="font-bold text-gray-700">Username/Email:</span> We expect your login details to be your work email address.</p>
            <p><span className="font-bold text-gray-700">Password:</span> The password is originally allocated to you for this platform by the Admin.</p>
            <p className="text-gray-800">If you forget your password or having trouble accessing your account please report to the admin.</p>
            <p className="text-gray-500">Please click{" "}<span className="text-green-600 font-semibold cursor-pointer hover:underline" onClick={() => navigate("/staffContact")}>"contact us"</span>{" "}to request for a new password.</p>
          </div>
          <button onClick={() => navigate("/code-of-conduct")} className="w-full max-w-sm py-4 rounded-xl font-bold text-white text-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg cursor-pointer" style={{ background: "linear-gradient(135deg, #4a90d9 0%, #f5c045 100%)" }}>
            "View Code of Conduct For All Staffs"
          </button>
        </div>
      </div>

      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center">
        <div className="absolute inset-0">
          <img src="/Images/Staff Login Image.png" loading="lazy" alt="Staff login visual" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/20" />
        </div>
        <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm mx-8">
          <div className="flex justify-center mb-3">
            <img src="/Images/Logo/Daily Assist Logos/LOGO-MAIN.png" loading="lazy" alt="Logo" className="w-16 h-16 object-contain" />
          </div>
          <h2 className="text-xl font-bold text-center text-yellow-500 mb-6">Staff Login</h2>
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700 mb-1 block">Email Address</label>
            <div className="relative">
              <input type="email" placeholder="Enter email address" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-gray-100 rounded-md px-4 py-3 pr-10 outline-none text-sm focus:ring-2 focus:ring-yellow-300 text-gray-800 placeholder-gray-400 transition" />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"><MailIcon /></span>
            </div>
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          <div className="mb-2">
            <label className="text-sm font-medium text-gray-700 mb-1 block">Password</label>
            <div className="relative">
              <input type={showPassword ? "text" : "password"} placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-gray-100 rounded-md px-4 py-3 pr-10 outline-none text-sm focus:ring-2 focus:ring-yellow-300 text-gray-800 placeholder-gray-400 transition" />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeIcon /> : <EyeOffIcon />}
              </span>
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>
          {errors.general && <p className="text-red-500 text-xs text-center mt-2 mb-1">{errors.general}</p>}
          <button onClick={handleSubmit} disabled={loading} className="w-full py-3 rounded-md font-medium text-white mt-5 transition-all duration-300 hover:shadow-[0_0_20px_rgba(250,204,21,0.6)] hover:scale-[1.02] cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed" style={{ background: "linear-gradient(to right, #f5c045, #e6a800)" }}>
            {loading ? "Logging in..." : "Log in"}
          </button>
        </div>
      </div>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#fafafa] rounded-t-2xl shadow-2xl p-6 z-20">
        <div className="lg:hidden fixed inset-0 bg-[#fafafa] flex flex-col px-5 pt-28 pb-8 z-30 overflow-y-auto">
          <div className="flex items-center justify-between mb-10">
            <span className="flex items-center gap-1 text-gray-600 text-sm font-medium cursor-pointer hover:text-gray-900 transition-colors" onClick={() => navigate("/")}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
              Back to home
            </span>
            <button onClick={() => navigate("/code-of-conduct")} className="px-4 py-2 rounded-full text-sm font-semibold text-white cursor-pointer" style={{ background: "linear-gradient(180deg, #4a90d9 0%, #f5c045 100%)" }}>Code of Conduct</button>
          </div>
          <div className="bg-white rounded-[20px] p-6 w-full shadow-xl">
            <div className="flex justify-center mb-3">
              <img src="/Images/Logo/Daily Assist Logos/LOGO-MAIN.png" loading="lazy" alt="Logo" className="w-16 h-16 object-contain" />
            </div>
            <h2 className="text-xl font-bold text-center mb-6" style={{ color: "#E0B44C" }}>Staff Login</h2>
            <div className="mb-4">
              <label className="text-sm font-semibold text-gray-700 mb-2 block">Email Address</label>
              <div className="relative">
                <input type="email" placeholder="Enter email address" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-white rounded-[10px] px-4 py-3 pr-10 outline-none text-sm text-gray-800 placeholder-gray-400 shadow-sm" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"><MailIcon /></span>
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            <div className="mb-6">
              <label className="text-sm font-semibold text-gray-700 mb-2 block">Password</label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-white rounded-[10px] px-4 py-3 pr-10 outline-none text-sm text-gray-800 placeholder-gray-400 shadow-sm" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                </span>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>
            {errors.general && <p className="text-red-500 text-xs text-center mb-2">{errors.general}</p>}
            <button onClick={handleSubmit} disabled={loading} className="w-full py-3 rounded-[10px] font-semibold text-gray-900 text-base shadow-md cursor-pointer transition-all duration-300 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed" style={{ background: "#E0B44C" }}>
              {loading ? "Logging in..." : "Log in"}
            </button>
          </div>
          <div className="mt-6 text-center text-gray-500 text-sm">
            Forgotten credentials?{" "}
            <span className="text-green-500 font-semibold cursor-pointer hover:underline" onClick={() => navigate("/staffContact")}>Click here</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffLogin;