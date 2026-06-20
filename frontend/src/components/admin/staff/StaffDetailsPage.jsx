import { useState } from "react";
import { ArrowLeft, ChevronDown, Eye, Download, Image, FileText } from "lucide-react";
import DeleteStaffModal from "../modals/DeleteStaffModal";
import EditStaffModal from "../modals/EditStaffModal";
import StaffInfoModal from "../modals/StaffInfoModal";
import CheckInSuccessModal from "../../modals/CheckInSuccessModal";

const roleOptions = [
  "Home-Help & Support Assistant",
  "Senior Carer",
  "Support Worker",
  "Community Access Support",
  "Care Assistant",
];

const zoneOptions = [
  "Canvey Island",
  "Basildon",
  "Southend-on-Sea",
  "Chelmsford",
  "Rayleigh",
];

const vehicleOptions = ["Yes, owns a vehicle", "No vehicle"];
const sexOptions = ["Male", "Female", "Prefer not to say"];

// Mock uploaded documents per staff (keyed by staff id)
const mockDocuments = {
  default: [
    { type: "image", title: "Image title",    date: "October 24, 2025",  size: "2.4 MB" },
    { type: "doc",   title: "Document title", date: "February 24, 2026", size: "2.4 MB" },
  ],
};

export default function StaffDetailsPage({ staff, onBack }) {
  const docs = mockDocuments[staff.id] ?? mockDocuments.default;

  // Form state — pre-filled from staff data
  const [role, setRole]         = useState(staff.role ?? "Home-Help & Support Assistant");
  const [firstName, setFirstName] = useState(staff.name?.split(" ")[0] ?? "");
  const [lastName, setLastName]   = useState(staff.name?.split(" ").slice(1).join(" ") ?? "");
  const [email, setEmail]         = useState(staff.email ?? "");
  const [phone, setPhone]         = useState(staff.phone ?? "");
  const [dob, setDob]             = useState(staff.dob ?? "12 Jan, 2000");
  const [sex, setSex]             = useState(staff.sex ?? "Female");
  const [zone, setZone]           = useState(staff.zone ?? "Canvey Island");
  const [vehicle, setVehicle]     = useState(staff.vehicle ?? "Yes, owns a vehicle");
  const [address, setAddress]     = useState(staff.address ?? "1 Church Street, Canvey Island, Essex");

  // Credential state
  const [workEmail, setWorkEmail] = useState("");
  const [password, setPassword]   = useState("");

  // Modal state
  const [showEdit, setShowEdit]                   = useState(false);
  const [showDelete, setShowDelete]               = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  const [showInfo, setShowInfo]                   = useState(false);

  const handleGenerateEmail = () => {
    const generated = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@dailyassistuk.com`;
    setWorkEmail(generated);
  };

  const handleGeneratePassword = () => {
    const chars = "ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789@#!";
    const pwd = Array.from({ length: 12 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
    setPassword(pwd);
  };

  return (
    <>
      <div className="flex flex-col gap-6 px-4 sm:px-6 py-5 max-w-4xl mx-auto w-full">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-800 font-semibold text-lg
                       hover:text-gray-600 transition-colors w-fit"
          >
            <ArrowLeft className="w-5 h-5" />
            Staff details
          </button>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Visitation Histories */}
            <button
              onClick={() => setShowInfo(true)}
              className="px-4 py-2 rounded-xl text-sm font-semibold text-white
                         transition-colors hover:opacity-90"
              style={{ backgroundColor: "#669369" }}
            >
              Visitation Histories
            </button>

            {/* Edit staff */}
            <button
              onClick={() => setShowEdit(true)}
              className="px-4 py-2 rounded-xl text-sm font-semibold border
                         border-gray-400 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Edit staff
            </button>

            {/* Delete staff */}
            <button
              onClick={() => setShowDelete(true)}
              className="px-4 py-2 rounded-xl text-sm font-semibold border
                         border-red-400 text-red-500 hover:bg-red-50 transition-colors"
            >
              Delete staff
            </button>
          </div>
        </div>

        {/* ── Form ── */}
        <div className="flex flex-col gap-5">

          {/* Staff ID + Staff Role */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-col gap-1.5 w-full sm:w-32 flex-shrink-0">
              <label className="text-sm font-medium text-gray-700">Staff ID</label>
              <input
                type="text"
                value={staff.id}
                readOnly
                className="w-full border border-gray-200 rounded-xl px-4 py-3
                           text-sm text-gray-700 outline-none bg-gray-50 cursor-not-allowed"
              />
            </div>
            <div className="flex flex-col gap-1.5 flex-1">
              <label className="text-sm font-medium text-gray-700">Staff Role</label>
              <div className="relative">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3
                             text-sm text-gray-700 outline-none appearance-none
                             focus:ring-2 focus:ring-blue-200 bg-white"
                >
                  {roleOptions.map((r) => <option key={r}>{r}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2
                                        w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* First Name + Last Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3
                           text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3
                           text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
          </div>

          {/* Email + Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3
                           text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3
                           text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
          </div>

          {/* Date of Birth + Sex */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Date of Birth</label>
              <input
                type="text"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3
                           text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Sex</label>
              <div className="relative">
                <select
                  value={sex}
                  onChange={(e) => setSex(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3
                             text-sm text-gray-700 outline-none appearance-none
                             focus:ring-2 focus:ring-blue-200 bg-white"
                >
                  {sexOptions.map((s) => <option key={s}>{s}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2
                                        w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Staff Zone + Staff Owns Vehicle */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Staff Zone</label>
              <div className="relative">
                <select
                  value={zone}
                  onChange={(e) => setZone(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3
                             text-sm text-gray-700 outline-none appearance-none
                             focus:ring-2 focus:ring-blue-200 bg-white"
                >
                  {zoneOptions.map((z) => <option key={z}>{z}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2
                                        w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Staff Owns Vehicle</label>
              <div className="relative">
                <select
                  value={vehicle}
                  onChange={(e) => setVehicle(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3
                             text-sm text-gray-700 outline-none appearance-none
                             focus:ring-2 focus:ring-blue-200 bg-white"
                >
                  {vehicleOptions.map((v) => <option key={v}>{v}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2
                                        w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">
              Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3
                         text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* ── Uploaded Documents ── */}
          <div className="border border-gray-200 rounded-2xl p-5 flex flex-col gap-4">
            <p className="text-sm font-bold text-gray-800">
              Staff uploaded Documents/images
            </p>
            <div className="flex flex-col gap-3">
              {docs.map((doc, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-3 border
                             border-gray-100 rounded-xl px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center
                                    justify-center flex-shrink-0">
                      {doc.type === "image"
                        ? <Image className="w-5 h-5 text-amber-400" />
                        : <FileText className="w-5 h-5 text-amber-400" />
                      }
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{doc.title}</p>
                      <p className="text-xs text-gray-400">{doc.date} • {doc.size}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                                       border border-amber-300 text-amber-500 text-xs
                                       font-medium hover:bg-amber-50 transition-colors">
                      <Eye className="w-3.5 h-3.5" />
                      View
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                                       border border-amber-300 text-amber-500 text-xs
                                       font-medium hover:bg-amber-50 transition-colors">
                      <Download className="w-3.5 h-3.5" />
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Generate Staff Credential ── */}
          <div className="border border-gray-200 rounded-2xl p-5 flex flex-col gap-5">
            <p className="text-sm font-bold text-gray-800">Generate Staff Credential</p>

            {/* Work Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Work email</label>
              <div className="flex items-center border border-gray-200 rounded-xl
                              overflow-hidden focus-within:ring-2 focus-within:ring-blue-200">
                <input
                  type="text"
                  value={workEmail}
                  onChange={(e) => setWorkEmail(e.target.value)}
                  placeholder="Generate work email"
                  className="flex-1 px-4 py-3 text-sm text-gray-700 outline-none bg-gray-50"
                />
                <button
                  onClick={handleGenerateEmail}
                  className="px-4 py-3 bg-gray-700 hover:bg-gray-800 text-white
                             text-sm font-semibold transition-colors flex-shrink-0"
                >
                  Generate
                </button>
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <div className="flex items-center border border-gray-200 rounded-xl
                              overflow-hidden focus-within:ring-2 focus-within:ring-blue-200">
                <input
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Generate work password"
                  className="flex-1 px-4 py-3 text-sm text-gray-700 outline-none bg-gray-50"
                />
                <button
                  onClick={handleGeneratePassword}
                  className="px-4 py-3 bg-gray-700 hover:bg-gray-800 text-white
                             text-sm font-semibold transition-colors flex-shrink-0"
                >
                  Generate
                </button>
              </div>
            </div>

            {/* Save Staff Credentials */}
            <button
              className="w-full py-4 rounded-xl font-semibold text-base
                         text-gray-900 transition-colors hover:opacity-90"
              style={{ backgroundColor: "#f5c045" }}
            >
              Save Staff Credentials
            </button>
          </div>
        </div>
      </div>

      {/* Edit modal */}
      <EditStaffModal
        isOpen={showEdit}
        onClose={() => setShowEdit(false)}
        staff={staff}
      />

      {/* Delete modal */}
      <DeleteStaffModal
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        onDeleteConfirmed={() => setShowDeleteSuccess(true)}
        staff={staff}
      />

      {/* Delete success modal */}
     <CheckInSuccessModal
        isOpen={showDeleteSuccess}
        onClose={() => {
          setShowDeleteSuccess(false);
          onBack();
        }}
        buttonText="Proceed to Staff Details"
      />

      <StaffInfoModal
        isOpen={showInfo}
        onClose={() => setShowInfo(false)}
        staff={staff}
      />
    </>
  );
}