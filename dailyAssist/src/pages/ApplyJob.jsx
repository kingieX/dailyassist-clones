import { useState, useRef } from "react";

/* ── ICONS ── */
const UserIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);

const MailIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0l-9.75 6.75L2.25 6.75" />
  </svg>
);

const PhoneIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.338A16.5 16.5 0 0117.662 21.75l1.919-1.916a1.5 1.5 0 011.671-.329c1.09.453 2.203.809 3.373 1.053a1.5 1.5 0 011.125 1.455v3.75a1.5 1.5 0 01-1.5 1.5A18 18 0 013 6a1.5 1.5 0 011.5-1.5h3.75a1.5 1.5 0 011.455 1.125c.244 1.17.6 2.283 1.053 3.373a1.5 1.5 0 01-.329 1.671L8.513 12.16" />
  </svg>
);

const UploadIcon = () => (
  <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l-3 3m3-3l3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.338-2.32 5.75 5.75 0 011.548 10.466" />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
  </svg>
);

/* ── REUSABLE INPUT ── */
const FormInput = ({ label, placeholder, type = "text", icon }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <div className="relative">
      <input
        type={type}
        placeholder={placeholder}
        className="w-full bg-gray-100 rounded-lg px-4 py-3 pr-10 outline-none focus:ring-2 focus:ring-yellow-400 text-gray-800 placeholder-gray-400 transition"
      />
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
        {icon}
      </span>
    </div>
  </div>
);

/* ── MAIN COMPONENT ── */
const ApplyJob = ({ onBack }) => {
  const [dragOver, setDragOver] = useState(false);
  const [fileName, setFileName] = useState(null);
  const fileInputRef = useRef(null);
 const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errors, setErrors] = useState({});
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const handleSubmit = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!firstName.trim()) newErrors.firstName = "First name is required.";
    if (!lastName.trim()) newErrors.lastName = "Last name is required.";
    if (!email.trim()) newErrors.email = "Email address is required.";
    else if (!emailRegex.test(email)) newErrors.email = "Please enter a valid email address.";
    if (!phone.trim()) newErrors.phone = "Phone number is required.";
    else if (phone.length !== 11) newErrors.phone = "Phone number must be exactly 11 digits.";
    if (!fileName) newErrors.cv = "Please upload your CV.";
    setErrors(newErrors);
   if (Object.keys(newErrors).length === 0) {
      setIsSuccessOpen(true);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) setFileName(file.name);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setFileName(file.name);
  };

  return (
    <div className="relative min-h-screen bg-[#FAFAFA] overflow-hidden">

      {/* ── BACKGROUND DIAMOND SQUARES ── */}
      {/* Replace these src placeholders with your actual diamond square images */}
      <img src="src/assets/Images/BG Pattern.png" className="absolute top-4 left-4 rotate-45 opacity-20 w-28 z-0" loading="lazy" alt="" />
      <img src="/square2.png" className="absolute top-4 left-36 rotate-45 opacity-20 w-20 z-0" loading="lazy" alt="" />
      <img src="/square3.png" className="absolute top-4 left-64 rotate-45 opacity-20 w-24 z-0" loading="lazy" alt="" />
      <img src="/square4.png" className="absolute top-4 right-64 rotate-45 opacity-20 w-28 z-0" loading="lazy" alt="" />
      <img src="/square5.png" className="absolute top-4 right-36 rotate-45 opacity-20 w-20 z-0" loading="lazy" alt="" />
      <img src="/square6.png" className="absolute top-4 right-4 rotate-45 opacity-20 w-24 z-0" loading="lazy" alt="" />
      <img src="/square7.png" className="absolute top-32 left-4 rotate-45 opacity-20 w-24 z-0" loading="lazy" alt="" />
      <img src="/square8.png" className="absolute top-32 left-28 rotate-45 opacity-20 w-20 z-0" loading="lazy" alt="" />
      <img src="/square9.png" className="absolute top-32 right-4 rotate-45 opacity-20 w-28 z-0" loading="lazy" alt="" />
      <img src="/square10.png" className="absolute top-32 right-28 rotate-45 opacity-20 w-20 z-0" loading="lazy" alt="" />
      <img src="/square11.png" className="absolute bottom-10 left-4 rotate-45 opacity-20 w-28 z-0" loading="lazy" alt="" />
      <img src="/square12.png" className="absolute bottom-10 left-36 rotate-45 opacity-20 w-20 z-0" loading="lazy" alt="" />
      <img src="/square13.png" className="absolute bottom-10 right-4 rotate-45 opacity-20 w-24 z-0" loading="lazy" alt="" />
      <img src="/square14.png" className="absolute bottom-10 right-36 rotate-45 opacity-20 w-20 z-0" loading="lazy" alt="" />
      <img src="/square15.png" className="absolute bottom-36 left-10 rotate-45 opacity-20 w-20 z-0" loading="lazy" alt="" />
      <img src="/square16.png" className="absolute bottom-36 right-10 rotate-45 opacity-20 w-20 z-0" loading="lazy" alt="" />

      {/* ── BACK BUTTON ── */}
      <button
        onClick={onBack}
        className="absolute top-6 left-6 z-20 flex items-center gap-2 text-gray-700 font-medium hover:text-black transition cursor-pointer"
      >
        <ArrowLeftIcon />
        Back to jobs
      </button>

      {/* ── CENTERED FORM ── */}
      <div className="flex items-center justify-center min-h-screen relative z-10 px-4 py-20">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 w-full max-w-3xl">

          {/* Form Header */}
          <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-2">
            Apply for this job.
          </h1>
          <p className="text-center text-gray-500 mb-8">
            Fill the form below to apply.
          </p>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="flex flex-col gap-1">
  <label className="text-sm font-medium text-gray-700">First Name</label>
  <div className="relative">
    <input
      type="text"
      placeholder="First name"
      value={firstName}
      onChange={(e) => setFirstName(e.target.value)}
      className="w-full bg-gray-100 rounded-lg px-4 py-3 pr-10 outline-none focus:ring-2 focus:ring-yellow-400 text-gray-800 placeholder-gray-400 transition"
    />
    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"><UserIcon /></span>
  </div>
  {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
</div>
           
           <div className="flex flex-col gap-1">
  <label className="text-sm font-medium text-gray-700">Last Name</label>
  <div className="relative">
    <input
      type="text"
      placeholder="Last name"
      value={lastName}
      onChange={(e) => setLastName(e.target.value)}
      className="w-full bg-gray-100 rounded-lg px-4 py-3 pr-10 outline-none focus:ring-2 focus:ring-yellow-400 text-gray-800 placeholder-gray-400 transition"
    />
    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"><UserIcon /></span>
  </div>
  {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
</div>

            <div className="flex flex-col gap-1">
  <label className="text-sm font-medium text-gray-700">Email Address</label>
  <div className="relative">
    <input
      type="email"
      placeholder="Enter email address"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="w-full bg-gray-100 rounded-lg px-4 py-3 pr-10 outline-none focus:ring-2 focus:ring-yellow-400 text-gray-800 placeholder-gray-400 transition"
    />
    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"><MailIcon /></span>
  </div>
  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
</div>
           
           <div className="flex flex-col gap-1">
  <label className="text-sm font-medium text-gray-700">Phone Number</label>
  <div className="relative">
    <input
      type="tel"
      placeholder="(123) 456 - 789"
      value={phone}
      maxLength={11}
      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
      className="w-full bg-gray-100 rounded-lg px-4 py-3 pr-10 outline-none focus:ring-2 focus:ring-yellow-400 text-gray-800 placeholder-gray-400 transition"
    />
    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"><PhoneIcon /></span>
  </div>
  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
</div>

            {/* Upload CV */}
            <div className="col-span-1 md:col-span-2">
              <label className="text-sm font-medium text-gray-700 mb-2 block">Upload CV</label>
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-8 text-center bg-gray-50 transition-all duration-200 ${
                  dragOver ? "border-yellow-400 bg-yellow-50" : "border-gray-300"
                }`}
              >
                {/* Upload Icon */}
                <div className="flex justify-center mb-3">
                  <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
                    <UploadIcon />
                  </div>
                </div>

                {/* Upload Text */}
                {fileName ? (
                  <p className="text-sm text-green-600 font-medium">{fileName}</p>
                ) : (
                  <>
                    <p className="text-gray-600 text-sm mb-1">
                      <span className="text-yellow-500 font-semibold cursor-pointer hover:underline" onClick={() => fileInputRef.current.click()}>
                        Click to upload
                      </span>
                      {" "}or drag and drop
                    </p>
                    <p className="text-gray-400 text-xs">SVG, PNG, JPG or GIF (max. 800×400px)</p>
                  </>
                )}

                {/* Divider */}
                <div className="flex items-center gap-3 my-4">
                  <div className="flex-1 h-px bg-gray-200" />
                  <span className="text-gray-400 text-sm">OR</span>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>

                {/* Browse Button */}
                <button
                  onClick={() => fileInputRef.current.click()}
                  className="bg-[#f5c045] px-6 py-2 rounded-md font-medium text-gray-900 hover:shadow-[0_0_20px_rgba(250,204,21,0.6)] transition cursor-pointer"
                >
                  Browse Files
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".svg,.png,.jpg,.jpeg,.gif,.pdf,.doc,.docx"
                />
            </div>
              {errors.cv && <p className="text-red-500 text-xs mt-1">{errors.cv}</p>}
            </div>

          </div>

          {/* Terms */}
          <p className="text-sm text-gray-500 mt-6 text-center">
            By clicking{" "}
            <span className="font-semibold text-gray-700">Send application</span>
            , you agree to our{" "}
            <a href="#" className="underline hover:text-gray-700 transition">User Agreement</a>,{" "}
            <a href="#" className="underline hover:text-gray-700 transition">Privacy Policy</a>
            , and{" "}
            <a href="#" className="underline hover:text-gray-700 transition">Cookie Policy</a>.
          </p>

          {/* Submit Button */}
         <button onClick={handleSubmit} className="w-full bg-[#f5c045] py-4 rounded-lg font-semibold text-gray-900 mt-6 transition-all duration-300 hover:shadow-[0_0_30px_rgba(250,204,21,0.7)] hover:scale-[1.02] cursor-pointer">
  Send Application
</button>

        </div>
      </div>
 {/* ── SUCCESS MODAL ── */}
      {isSuccessOpen && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center px-4">
          <div
            className="bg-white rounded-2xl shadow-2xl p-10 w-[90%] max-w-md text-center relative"
            style={{ animation: "modalIn 0.3s ease forwards" }}
          >
            <style>{`
              @keyframes modalIn {
                0%   { transform: scale(0.92); opacity: 0; }
                100% { transform: scale(1);    opacity: 1; }
              }
            `}</style>

            {/* Icon + decorative shapes */}
            <div className="relative w-28 h-28 mx-auto mb-6">

              {/* Floating shapes */}
              <div className="absolute -top-3 left-1/2 w-3 h-3 bg-purple-500 rounded-full"></div>
              <div className="absolute top-0 right-2 w-3 h-3 bg-yellow-400 rotate-45"></div>
              <div className="absolute top-4 -right-4 w-2 h-2 bg-green-400 rotate-45"></div>
              <div className="absolute top-1 -left-3 w-3 h-3 bg-yellow-400 rotate-45"></div>
              <div className="absolute -top-2 left-6 w-2 h-2 bg-orange-400 rounded-full"></div>
              <div className="absolute bottom-2 -right-5 w-3 h-3 bg-green-400 rotate-45"></div>
              <div className="absolute -bottom-3 right-6 w-2 h-2 bg-yellow-400 rotate-45"></div>
              <div className="absolute bottom-0 -left-5 w-3 h-3 bg-orange-400 rotate-45"></div>
              <div className="absolute -bottom-2 left-4 w-2 h-2 bg-purple-500 rounded-full"></div>
              <div className="absolute top-1/2 -left-6 w-2 h-5 border-2 border-orange-400 rounded-full border-r-0" style={{ transform: "translateY(-50%) rotate(-20deg)" }}></div>
              <div className="absolute top-1/2 -right-6 w-2 h-5 border-2 border-green-400 rounded-full border-l-0" style={{ transform: "translateY(-50%) rotate(20deg)" }}></div>
              <div className="absolute -top-1 left-14 w-2 h-4 border-2 border-yellow-400 rounded-full border-r-0" style={{ transform: "rotate(40deg)" }}></div>
              <div className="absolute bottom-1 left-0 w-2 h-4 border-2 border-orange-300 rounded-full border-l-0" style={{ transform: "rotate(-30deg)" }}></div>

              {/* Green circle with check */}
              <div className="w-28 h-28 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
            </div>

            {/* Success text */}
            <p className="text-green-600 font-semibold text-lg mb-6">Thank you for applying</p>

            {/* Button */}
            <button
              onClick={() => { setIsSuccessOpen(false); onBack(); }}
              className="bg-[#f5c045] px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 mx-auto transition-all duration-300 hover:shadow-[0_0_25px_rgba(250,204,21,0.7)] hover:scale-105 cursor-pointer"
            >
              <ArrowLeftIcon />
              Back to Job page
            </button>

          </div>
        </div>
      )}

    </div>
  );
};

export default ApplyJob;