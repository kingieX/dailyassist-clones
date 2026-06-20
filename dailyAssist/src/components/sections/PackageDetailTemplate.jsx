
import { useState } from "react";
import { Link } from "react-router-dom";
import { FiCheckCircle, FiClock, FiHome, FiHeart, FiShoppingBag } from "react-icons/fi";
import ContactOptionsSection from "./Home/ContactOptionsSection";
 
const SERVICES = [
  { label: "Home-Help (cleaning, tidying, laundry)", price: "£22/hour" },
  { label: "Errands & Shopping Support", price: "£25/hour + 45 mileage" },
  { label: "Welfare Check-Ins & Companionship", price: "£20/hour" },
  { label: "Appointment Escort/Transport", price: "£25/hour + 45 mileage" },
  { label: "Light Gardening & Practical Tasks", price: "£22/hour" },
  { label: "Community Access Support", price: "£22/hour" },
  { label: "Light Meal Preparation", price: "£20/hour" },
];
 
const ADDITIONAL_SERVICES = [
  { label: "One-off Deep Clean", price: "Quoted separately" },
  { label: "End of Tenancy Cleaning", price: "Quoted separately" },
  { label: "Building Construction Cleaning", price: "Quoted separately" },
];
 
const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
 
export default function PackageDetailTemplate({
  pageTitle,
  subtext,
  packageTitle,
  price,
  priceLabel,
  priceNote,
  features,
  otherPackages,
  backLink,
  backLabel,
  submitLabel,
  showServices = true,
  showPrices = true,
}) {
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedAdditional, setSelectedAdditional] = useState([]);
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [agreedData, setAgreedData] = useState(false);
 
  const toggleDay = (day) =>
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
 
  const toggleService = (label) =>
    setSelectedServices((prev) =>
      prev.includes(label) ? prev.filter((s) => s !== label) : [...prev, label]
    );
 
  const toggleAdditional = (label) =>
    setSelectedAdditional((prev) =>
      prev.includes(label) ? prev.filter((s) => s !== label) : [...prev, label]
    );
 
  return (
    <div className="bg-[#ffffff] min-h-screen relative overflow-hidden">
 
      {/* Background Rectangles */}
      <img src="/Images/Rectangle6.png" loading="lazy" alt="" className="absolute top-0 right-0 w-32 md:w-64 rotate-12 opacity-80 z-0 pointer-events-none" />
    <img src="/Images/Rectangle7 peach.png" loading="lazy" alt="" className="absolute top-[2%] left-[-60px] md:top-[10%] md:left-[400px] w-36 md:w-64 -rotate-12 opacity-40 md:opacity-80 z-0 pointer-events-none" />
      <img src="/Images/Rectangle8 green.png" loading="lazy" alt="" className="hidden md:block absolute top-[25%] right-0 w-56 rotate-6 opacity-80 z-0 pointer-events-none" />
 
      <div className="max-w-7xl mx-auto px-4 md:px-12 py-16 relative z-10">
 
        {/* Back Button */}
        <div className="flex justify-center mb-10">
          <Link
            to={backLink}
            className="inline-flex items-center gap-2 bg-[#f5c045] text-black px-6 py-2.5 rounded-md font-medium transition-all duration-300 hover:shadow-[0_0_15px_rgba(245,192,69,0.6)] hover:scale-105"
          >
            ← {backLabel}
          </Link>
        </div>
 
        {/* Page Heading */}
       {/* Page Heading */}
<div className="text-center mb-12 px-6">
 <h1 className="text-lg sm:text-2xl md:text-5xl font-bold text-gray-800 mb-4 relative inline-block leading-tight">
    <span className="relative inline-block">
      <img
  src="/Images/Vector 2.png"
  loading="lazy" alt=""
className="absolute bottom-[-6px] left-[10px] md:bottom-[-18px] md:left-[86px] opacity-90 z-0 w-[100px] md:w-auto"
  style={{ transform: "rotate(-1deg)" }}
/>
      <span className="relative z-10">Book {pageTitle}</span>
    </span>
  </h1>
  <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed mt-6 text-sm md:text-xl px-4 text-center">
    {subtext}
  </p>
</div>
 
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
 
          {/* LEFT COLUMN */}
          <div className="lg:col-span-1 flex flex-col gap-6">
 
            {/* Package Summary Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FiClock size={24} className="text-yellow-500" />
              </div>
              <h2 className="text-lg font-bold text-gray-900 text-center mb-2">{packageTitle}</h2>
              <p className="text-4xl font-bold text-gray-900 text-center">{price}</p>
              <p className="text-gray-500 text-sm text-center mb-2">{priceLabel}</p>
              <p className="text-gray-400 text-xs italic text-center mb-6">{priceNote}</p>
 
              <ul className="space-y-3 mb-6">
                {features.map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-700">
                    <FiCheckCircle className="text-green-500 flex-shrink-0" size={17} />
                    {f}
                  </li>
                ))}
              </ul>
 
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="flex items-center gap-2 text-green-700 text-sm font-medium mb-2">
                  <FiCheckCircle size={16} /> Free consultation included
                </p>
                <p className="flex items-center gap-2 text-green-700 text-sm font-medium">
                  <FiCheckCircle size={16} /> Fully insured & DBS checked
                </p>
              </div>
            </div>
 
            {/* Other Packages Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-base font-bold text-gray-900 mb-1">Other Packages</h3>
              <p className="text-gray-500 text-sm mb-4">Not quite right? Choose a different package</p>
              <div className="flex flex-col gap-3">
                {otherPackages.map((pkg, i) => (
                  <Link
                    key={i}
                    to={pkg.href}
                    className="flex items-center gap-3 border border-gray-200 rounded-md px-4 py-3 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                      {i === 0 ? <FiHome size={15} className="text-yellow-500" /> : <FiHeart size={15} className="text-yellow-500" />}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{pkg.title}</p>
                      <p className="text-xs text-gray-500">{pkg.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
 
          </div>
 
          {/* RIGHT COLUMN — Scrollable Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg">
              <div className="max-h-[850px] overflow-y-auto p-8 rounded-2xl">
 
                <h2 className="text-xl font-bold text-gray-900 text-center mb-1">Booking Details</h2>
                <p className="text-gray-500 text-sm text-center mb-8">
                  Please fill in your details below. All information is kept strictly confidential.
                </p>
 
                {/* Personal Information */}
                <h3 className="text-base font-semibold text-gray-800 mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">First Name <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="First name" className="w-full p-3 rounded-md bg-gray-100 text-sm outline-none focus:ring-2 focus:ring-yellow-400" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">Last Name <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="Last name" className="w-full p-3 rounded-md bg-gray-100 text-sm outline-none focus:ring-2 focus:ring-yellow-400" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">Email Address <span className="text-red-500">*</span></label>
                    <input type="email" placeholder="example@mail.com" className="w-full p-3 rounded-md bg-gray-100 text-sm outline-none focus:ring-2 focus:ring-yellow-400" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">Phone Number <span className="text-red-500">*</span></label>
                    <input type="tel" placeholder="(123) 456 - 789" className="w-full p-3 rounded-md bg-gray-100 text-sm outline-none focus:ring-2 focus:ring-yellow-400" />
                  </div>
                  <div className="flex flex-col gap-1 md:col-span-2">
                    <label className="text-sm font-medium text-gray-700">Address <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="123 Church Street..." className="w-full p-3 rounded-md bg-gray-100 text-sm outline-none focus:ring-2 focus:ring-yellow-400" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">City <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="Essex" className="w-full p-3 rounded-md bg-gray-100 text-sm outline-none focus:ring-2 focus:ring-yellow-400" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">Postcode <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="456789" className="w-full p-3 rounded-md bg-gray-100 text-sm outline-none focus:ring-2 focus:ring-yellow-400" />
                  </div>
                </div>
 
                {/* Service Preferences */}
                <h3 className="text-base font-semibold text-gray-800 mb-4">Service Preferences</h3>
                <div className="mb-4">
                  <label className="text-sm font-medium text-gray-700 mb-3 block">Preferred Days (select all that apply)</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                    {DAYS.map((day) => (
                      <label key={day} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedDays.includes(day)}
                          onChange={() => toggleDay(day)}
                          className="accent-yellow-400 w-4 h-4"
                        />
                        {day}
                      </label>
                    ))}
                  </div>
                  <div className="flex flex-col gap-1 mb-4">
                    <label className="text-sm font-medium text-gray-700">Preferred Time of Day</label>
                    <select className="w-full p-3 rounded-md bg-gray-100 text-sm outline-none focus:ring-2 focus:ring-yellow-400 text-gray-500">
                      <option value="">Select preferred time</option>
                      <option value="morning">Morning (8am - 12pm)</option>
                      <option value="afternoon">Afternoon (12pm - 4pm)</option>
                      <option value="evening">Evening (4pm - 6pm)</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1 mb-4">
                    <label className="text-sm font-medium text-gray-700">Preferred Start Date</label>
                    <input type="date" className="w-full p-3 rounded-md bg-gray-100 text-sm outline-none focus:ring-2 focus:ring-yellow-400 text-gray-500" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">Special Requirements or Notes</label>
                    <textarea
                      placeholder="Please let us know about any specific needs, preferences, or requirements..."
                      className="w-full p-3 rounded-md bg-gray-100 text-sm outline-none focus:ring-2 focus:ring-yellow-400 h-28 resize-none"
                    />
                  </div>
                </div>
 
                {/* Our Services */}
                <h3 className="text-base font-semibold text-gray-800 mb-1 mt-6">Our Services</h3>
                <p className="text-xs text-gray-500 mb-3">Select any services you might need</p>
                <div className="flex flex-col gap-3 mb-6">
                  {SERVICES.map((s) => (
                    <label key={s.label} className="flex items-center justify-between gap-3 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={selectedServices.includes(s.label)}
                          onChange={() => toggleService(s.label)}
                          className="accent-yellow-400 w-4 h-4 flex-shrink-0"
                        />
                        <span className="text-sm text-gray-700">{s.label}</span>
                      </div>
                  {showPrices && <span className="text-sm font-medium text-gray-500 whitespace-nowrap">{s.price}</span>}
                    </label>
                  ))}
                </div>
 
                {/* Additional Services */}
                <h3 className="text-base font-semibold text-gray-800 mb-1">Additional Services</h3>
                <p className="text-xs text-gray-500 mb-3">Select any additional services you might need (optional)</p>
                <div className="flex flex-col gap-3 mb-6">
                  {ADDITIONAL_SERVICES.map((s) => (
                    <label key={s.label} className="flex items-center justify-between gap-3 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={selectedAdditional.includes(s.label)}
                          onChange={() => toggleAdditional(s.label)}
                          className="accent-yellow-400 w-4 h-4 flex-shrink-0"
                        />
                        <span className="text-sm text-gray-700">{s.label}</span>
                      </div>
                      <span className="text-sm font-medium text-gray-500 whitespace-nowrap">{s.price}</span>
                    </label>
                  ))}
                </div>
 
                {/* Emergency Contact */}
                <h3 className="text-base font-semibold text-gray-800 mb-4">Emergency Contact</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">Contact Name</label>
                    <input type="text" placeholder="Name" className="w-full p-3 rounded-md bg-gray-100 text-sm outline-none focus:ring-2 focus:ring-yellow-400" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">Contact Phone Number</label>
                    <input type="tel" placeholder="(123) 456 - 789" className="w-full p-3 rounded-md bg-gray-100 text-sm outline-none focus:ring-2 focus:ring-yellow-400" />
                  </div>
                  <div className="flex flex-col gap-1 md:col-span-2">
                    <label className="text-sm font-medium text-gray-700">Relationship</label>
                    <input type="text" placeholder="e.g., Daughter, Son, Friend..." className="w-full p-3 rounded-md bg-gray-100 text-sm outline-none focus:ring-2 focus:ring-yellow-400" />
                  </div>
                </div>
 
                {/* Terms & Conditions */}
                <h3 className="text-base font-semibold text-gray-800 mb-3 mt-6">Terms & Conditions</h3>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 mb-4 pl-1">
                  <li>Unused visits cannot be carried forward</li>
                  <li>Services remain non-medical</li>
                  <li>Changes require prior notice</li>
                  <li>Travel mileage may apply outside local radius</li>
                </ul>
                <div className="flex flex-col gap-3 mb-6">
                  <label className="flex items-start gap-3 cursor-pointer text-sm text-gray-700">
                    <input type="checkbox" checked={agreedTerms} onChange={() => setAgreedTerms(!agreedTerms)} className="accent-yellow-400 w-4 h-4 mt-0.5 flex-shrink-0" />
                    I agree to the terms and conditions of service. I understand that this is a booking request and not a confirmed appointment until contacted by Daily Assist UK.
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer text-sm text-gray-700">
                    <input type="checkbox" checked={agreedData} onChange={() => setAgreedData(!agreedData)} className="accent-yellow-400 w-4 h-4 mt-0.5 flex-shrink-0" />
                    I consent to Daily Assist UK storing and processing my personal information for the purpose of providing standard hourly services.
                  </label>
                </div>
 
                {/* Submit Button */}
                <button className="w-full bg-[#f5c045] text-grey-600 font-semibold py-4 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(245,192,69,0.6)] hover:scale-[1.02] flex items-center justify-center gap-2">
                  <FiShoppingBag size={18} /> Book Welfare Check-In Account{submitLabel}
                </button>
                <p className="text-center text-sm text-gray-400 mt-3">
                  We'll contact you within 24 hours to confirm your booking and arrange your free consultation.
                </p>
 
              </div>
            </div>
          </div>
 
        </div>
 
        {/* What Happens Next */}
        <div className="bg-white rounded-2xl shadow-md p-8 mt-10">
          <h3 className="text-lg font-bold text-green-700 mb-6">What Happens Next?</h3>
          <div className="flex flex-col gap-4">
            <p className="flex items-start gap-3 text-sm text-gray-700">
              <FiCheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={18} />
              <span><span className="font-semibold text-green-700">Confirmation Call:</span> We'll call you within 24 hours to confirm your booking details and answer any questions.</span>
            </p>
            <p className="flex items-start gap-3 text-sm text-gray-700">
              <FiCheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={18} />
              <span><span className="font-semibold text-green-700">Free Consultation:</span> We'll arrange a free home visit to meet you and understand your specific needs.</span>
            </p>
            <p className="flex items-start gap-3 text-sm text-gray-700">
              <FiCheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={18} />
              <span><span className="font-semibold text-green-700">Service Start:</span> Once everything is agreed, we'll begin your regular support service.</span>
            </p>
          </div>
        </div>
 
        {/* Premium Rate Info */}
        <div className="bg-white rounded-2xl shadow-md p-6 mt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h3 className="text-base font-bold text-gray-900 mb-3">Premium Rate Information</h3>
            <div className="flex flex-col gap-2 text-sm text-gray-600">
              <p className="flex items-center gap-2">
                <FiClock size={16} className="text-yellow-500" />
                <span><span className="font-medium">Bank holidays & urgent visits:</span> Pricing on enquiry</span>
              </p>
              <p className="flex items-center gap-2">
                <FiCheckCircle size={16} className="text-yellow-500" />
                <span><span className="font-medium">Travel charges: <span className="text-yellow-600 font-semibold">45p per mile</span></span> (Canvey Island & Benfleet)</span>
              </p>
              <p className="flex items-center gap-2">
                <FiHome size={16} className="text-yellow-500" />
                <span><span className="font-medium">One-off services:</span> Deep cleaning, clearance work priced after assessment</span>
              </p>
            </div>
          </div>
          <Link
            to="/contact"
            className="flex-shrink-0 flex items-center gap-2 bg-[#f5c045] text-black font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(245,192,69,0.6)] hover:scale-105"
          >
            <FiCheckCircle size={16} /> Get Your Free Consultation
          </Link>
        </div>
 
      </div>
 
      {/* Contact Options Section */}
      <ContactOptionsSection />
 
    </div>
  );
}
 