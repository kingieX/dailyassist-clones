import { useState, useRef } from "react";
import { X, ChevronDown, Download, Eye, UserPlus, Image as ImageIcon } from "lucide-react";
import CheckInSuccessModal from "../../modals/CheckInSuccessModal";
import AddClientModal from "../modals/AddStaffModal";

const AMBER = "#f5c045";

// ── Mock Data ─────────────────────────────────────────────────────────────────
const applicantsData = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  number: i + 1,
  role: "Home-Help & Support Assistant Role",
  name: ["Lauren James", "Marcus Thompson", "Sarah Williams", "David Okafor",
         "Emma Clarke", "James Osei", "Priya Patel", "Tom Richards",
         "Amara Diallo", "Chloe Bennett", "Noah Adeyemi", "Grace Kim",
         "Liam Foster", "Aisha Mensah", "Oliver Brown", "Zoe Andersen",
         "Ethan Musa", "Isla Nwosu", "Ryan Kowalski", "Fatima Hassan"][i],
  email: [
    "laurenjames@email.com", "marcusthompson@email.com", "sarahwilliams@email.com",
    "davidokafor@email.com", "emmaclarke@email.com", "jamesosei@email.com",
    "priyapatel@email.com", "tomrichards@email.com", "amaradiallo@email.com",
    "chloebennett@email.com", "noahadeyemi@email.com", "gracekim@email.com",
    "liamfoster@email.com", "aishamensah@email.com", "oliverbrown@email.com",
    "zoeandersen@email.com", "ethanmusa@email.com", "islanwosu@email.com",
    "ryankowalski@email.com", "fatimahassan@email.com",
  ][i],
  phone: [
    "01236 789 012", "07812 345 678", "01234 567 890", "07923 456 789",
    "01345 678 901", "07634 567 890", "01456 789 012", "07745 678 901",
    "01567 890 123", "07856 789 012", "01678 901 234", "07967 890 123",
    "01789 012 345", "07078 901 234", "01890 123 456", "07189 012 345",
    "01901 234 567", "07290 123 456", "01012 345 678", "07301 234 567",
  ][i],
  cvTitle: "Document title",
  cvDate: "February 24, 2026",
  cvSize: "2.4 MB",
  staffId: `DA00${10 + i}`,
}));

const staffRoles = [
  "Home-Help & Support Assistant",
  "Senior Care Worker",
  "Community Support Worker",
  "Live-In Carer",
  "Admin",
];

const sexOptions = ["Male", "Female", "Prefer not to say"];

// ── Delete Confirm Modal ──────────────────────────────────────────────────────
function DeleteConfirmModal({ isOpen, applicant, onCancel, onConfirm }) {
  const [showSuccess, setShowSuccess] = useState(false);

  if (!isOpen || !applicant) return null;

  const handleDelete = () => {
    setShowSuccess(true);
  };

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
        onClick={onCancel}
      >
        <div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-auto p-8 flex flex-col items-center gap-4 text-center"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-xl font-bold text-gray-900">Delete this role?</h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            This action will permanently remove this package and all it features from Daily Assist. This cannot be undone.
          </p>
          <div className="flex gap-3 w-full mt-2">
            <button
              onClick={onCancel}
              className="flex-1 py-3.5 rounded-xl font-semibold text-sm text-gray-900
                         border border-red-400 hover:bg-red-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="flex-1 py-3.5 rounded-xl font-semibold text-sm text-white
                         bg-red-500 hover:bg-red-600 transition-colors"
            >
              Yes, Delete Permanently
            </button>
          </div>
        </div>
      </div>

      <CheckInSuccessModal
        isOpen={showSuccess}
        onClose={() => { setShowSuccess(false); onConfirm(); }}
        buttonText="Back to Recruitment"
      />
    </>
  );
}

// ── Add Staff Form ────────────────────────────────────────────────────────────
function AddStaffForm({ applicant, onCancel, onSubmit }) {
  const [form, setForm] = useState({
    staffId: applicant.staffId,
    staffRole: applicant.role.replace(" Role", ""),
    firstName: applicant.name.split(" ")[0],
    lastName: applicant.name.split(" ").slice(1).join(" "),
    email: applicant.email,
    phone: applicant.phone,
    dob: "",
    sex: "",
    image: null,
    cv: null,
  });
  const [roleOpen, setRoleOpen] = useState(false);
  const [sexOpen, setSexOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const imageRef = useRef();
  const cvRef = useRef();

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-50 bg-black/40" onClick={onCancel} />

      {/* Modal */}
      <div
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-0 sm:px-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="bg-white w-full sm:max-w-2xl rounded-t-3xl sm:rounded-2xl shadow-2xl
                     flex flex-col max-h-[95vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100 flex-shrink-0">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="text-2xl font-light">+</span> Add Staff
            </h2>
            <button
              onClick={onCancel}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Body */}
          <div className="overflow-y-auto flex-1 px-6 py-5 flex flex-col gap-5">

            {/* Staff ID + Staff Role */}
            <div className="flex gap-4">
              <div className="flex flex-col gap-1.5 w-28 flex-shrink-0">
                <label className="text-sm font-semibold text-gray-800">Staff ID</label>
                <input
                  type="text"
                  value={form.staffId}
                  onChange={(e) => set("staffId", e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-3 py-3 text-sm
                             text-gray-700 outline-none focus:ring-2 focus:ring-amber-200"
                />
              </div>
              <div className="flex flex-col gap-1.5 flex-1">
                <label className="text-sm font-semibold text-gray-800">Staff Role</label>
                <div className="relative">
                  <button
                    onClick={() => setRoleOpen(!roleOpen)}
                    className="w-full flex items-center justify-between border border-gray-200
                               rounded-xl px-4 py-3 text-sm hover:bg-gray-50 transition-colors"
                  >
                    <span className={form.staffRole ? "text-gray-700" : "text-gray-400"}>
                      {form.staffRole || "Select Staff Role"}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${roleOpen ? "rotate-180" : ""}`} />
                  </button>
                  {roleOpen && (
                    <div className="absolute top-12 left-0 z-20 bg-white border border-gray-200
                                    rounded-2xl shadow-lg w-full p-2 flex flex-col gap-1">
                      {staffRoles.map((r) => (
                        <button
                          key={r}
                          onClick={() => { set("staffRole", r); setRoleOpen(false); }}
                          className={`w-full text-left px-4 py-2.5 text-sm rounded-xl transition-colors
                                      hover:bg-[#fef9ec]
                                      ${form.staffRole === r ? "text-[#e7b343] font-semibold" : "text-gray-700"}`}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* First Name + Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-800">First Name</label>
                <input
                  type="text"
                  value={form.firstName}
                  onChange={(e) => set("firstName", e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm
                             text-gray-700 outline-none focus:ring-2 focus:ring-amber-200"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-800">Last Name</label>
                <input
                  type="text"
                  value={form.lastName}
                  onChange={(e) => set("lastName", e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm
                             text-gray-700 outline-none focus:ring-2 focus:ring-amber-200"
                />
              </div>
            </div>

            {/* Email + Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-800">Email Address</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm
                             text-gray-700 outline-none focus:ring-2 focus:ring-amber-200"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-800">Phone Number</label>
                <input
                  type="text"
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm
                             text-gray-700 outline-none focus:ring-2 focus:ring-amber-200"
                />
              </div>
            </div>

            {/* DOB + Sex */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-800">Date of Birth</label>
                <input
                  type="date"
                  value={form.dob}
                  onChange={(e) => set("dob", e.target.value)}
                  placeholder="Enter date of birth"
                  className="w-full bg-gray-100 border-0 rounded-xl px-4 py-3 text-sm
                             text-gray-700 outline-none focus:ring-2 focus:ring-amber-200 placeholder-gray-400"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-800">Sex</label>
                <div className="relative">
                  <button
                    onClick={() => setSexOpen(!sexOpen)}
                    className="w-full flex items-center justify-between bg-gray-100
                               rounded-xl px-4 py-3 text-sm hover:bg-gray-200 transition-colors"
                  >
                    <span className={form.sex ? "text-gray-700" : "text-gray-400"}>
                      {form.sex || "Select"}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${sexOpen ? "rotate-180" : ""}`} />
                  </button>
                  {sexOpen && (
                    <div className="absolute top-12 left-0 z-20 bg-white border border-gray-200
                                    rounded-2xl shadow-lg w-full p-2 flex flex-col gap-1">
                      {sexOptions.map((s) => (
                        <button
                          key={s}
                          onClick={() => { set("sex", s); setSexOpen(false); }}
                          className={`w-full text-left px-4 py-2.5 text-sm rounded-xl transition-colors
                                      hover:bg-[#fef9ec]
                                      ${form.sex === s ? "text-[#e7b343] font-semibold" : "text-gray-700"}`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Upload Image */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-800">Upload Image</label>
              <div
                onClick={() => imageRef.current?.click()}
                className="border-2 border-dashed border-gray-200 rounded-xl p-8
                           flex flex-col items-center justify-center gap-2 cursor-pointer
                           hover:border-amber-300 hover:bg-amber-50/30 transition-colors"
              >
                {form.image ? (
                  <div className="flex flex-col items-center gap-2">
                    <img
                      src={URL.createObjectURL(form.image)}
                      alt="preview"
                      className="w-20 h-20 rounded-xl object-cover"
                    />
                    <p className="text-xs text-gray-500">{form.image.name}</p>
                  </div>
                ) : (
                  <>
                    <ImageIcon className="w-8 h-8 text-gray-300" />
                    <p className="text-sm text-center text-gray-500">
                      <span className="font-semibold" style={{ color: AMBER }}>Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-400">JPG, JPEG, PNG less than 1MB</p>
                  </>
                )}
              </div>
              <input
                ref={imageRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => set("image", e.target.files[0] || null)}
              />
            </div>

            {/* Upload CV */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-800">Upload CV</label>
              <div
                onClick={() => cvRef.current?.click()}
                className="border border-gray-200 rounded-xl p-4 cursor-pointer
                           hover:border-amber-300 hover:bg-amber-50/30 transition-colors min-h-[120px]
                           flex flex-col items-center justify-center gap-2"
              >
                {form.cv ? (
                  <div className="flex flex-col items-center gap-2 w-full">
                    <div className="flex items-center gap-3 w-full">
                      <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-amber-600">CV</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">{form.cv.name}</p>
                        <p className="text-xs text-gray-400">{(form.cv.size / 1024 / 1024).toFixed(1)} MB</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-sm text-center text-gray-500">
                      <span className="font-semibold" style={{ color: AMBER }}>Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-400">PDF, DOC, DOCX less than 5MB</p>
                  </>
                )}
              </div>
              <input
                ref={cvRef}
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={(e) => set("cv", e.target.files[0] || null)}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 pb-6 pt-3 flex-shrink-0 border-t border-gray-100">
            <button
              onClick={() => setShowSuccess(true)}
              className="w-full py-3.5 rounded-xl font-semibold text-sm text-gray-900
                         hover:opacity-90 transition-colors flex items-center justify-center gap-2"
              style={{ backgroundColor: AMBER }}
            >
              <UserPlus className="w-4 h-4" />
              Add Staff
            </button>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <CheckInSuccessModal
        isOpen={showSuccess}
        onClose={() => { setShowSuccess(false); onSubmit(); }}
        buttonText="Back to Recruitment"
      />
    </>
  );
}

// ── View Applicant Modal ──────────────────────────────────────────────────────
function ViewApplicantModal({ isOpen, applicant, onClose }) {
  const [showAddStaff, setShowAddStaff] = useState(false);

  if (!isOpen || !applicant) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-auto flex flex-col overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900">{applicant.name}</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Body */}
          <div className="px-6 py-5 flex flex-col gap-4">
            {/* Details */}
            <div className="flex flex-col gap-2">
              <div className="flex gap-3 text-sm">
                <span className="font-semibold text-gray-900 w-28 flex-shrink-0">Role:</span>
                <span className="text-gray-700">{applicant.role}</span>
              </div>
              <div className="flex gap-3 text-sm">
                <span className="font-semibold text-gray-900 w-28 flex-shrink-0">Email:</span>
                <span className="text-gray-700">{applicant.email}</span>
              </div>
              <div className="flex gap-3 text-sm">
                <span className="font-semibold text-gray-900 w-28 flex-shrink-0">Phone Number:</span>
                <span className="text-gray-700">{applicant.phone}</span>
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* CV Section */}
            <div className="border border-gray-200 rounded-xl p-4 flex flex-col gap-3">
              <p className="text-sm font-semibold text-gray-700">Uploaded CV</p>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-50 border border-amber-200 rounded-lg
                                  flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-amber-500">CV</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{applicant.cvTitle}</p>
                    <p className="text-xs text-gray-400">{applicant.cvDate} • {applicant.cvSize}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border
                                     border-amber-300 text-xs font-semibold text-amber-600
                                     hover:bg-amber-50 transition-colors">
                    <Eye className="w-3.5 h-3.5" />
                    View
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border
                                     border-amber-300 text-xs font-semibold text-amber-600
                                     hover:bg-amber-50 transition-colors">
                    <Download className="w-3.5 h-3.5" />
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 pb-6 pt-2">
            <button
              onClick={() => setShowAddStaff(true)}
              className="w-full py-3.5 rounded-xl font-semibold text-sm text-gray-900
                         hover:opacity-90 transition-colors"
              style={{ backgroundColor: AMBER }}
            >
              Process Staff Profile
            </button>
          </div>
        </div>
      </div>

      {/* Add Staff Form */}
    {showAddStaff && (
        <AddClientModal
          isOpen={showAddStaff}
          onClose={() => { setShowAddStaff(false); onClose(); }}
        />
      )}
    </>
  );
}

// ── Applicant Card ────────────────────────────────────────────────────────────
function ApplicantCard({ applicant, onView, onDelete }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <p className="text-sm text-gray-400">Applicant {applicant.number}</p>
        <p className="text-sm font-bold text-gray-900">{applicant.role}</p>
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Name: </span>
          {applicant.name}
        </p>
      </div>
      <div className="flex flex-col gap-2 mt-1">
        <button
          onClick={() => onView(applicant)}
          className="w-full py-2.5 rounded-xl font-semibold text-sm text-gray-900
                     hover:opacity-90 transition-colors"
          style={{ backgroundColor: AMBER }}
        >
          View Applicant
        </button>
        <button
          onClick={() => onDelete(applicant)}
          className="w-full py-2.5 rounded-xl font-semibold text-sm text-gray-900
                     border border-gray-200 hover:bg-gray-50 transition-colors"
        >
          Delete Applicant
        </button>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function RecruitmentPage() {
  const [applicants, setApplicants] = useState(applicantsData);
  const [viewApplicant, setViewApplicant] = useState(null);
  const [deleteApplicant, setDeleteApplicant] = useState(null);

  const handleDelete = () => {
    setApplicants((prev) => prev.filter((a) => a.id !== deleteApplicant.id));
    setDeleteApplicant(null);
  };

  return (
    <div className="flex flex-col gap-6 px-4 sm:px-6 py-6 max-w-7xl mx-auto w-full">

      {/* Header */}
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Recruitment</h1>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {applicants.map((applicant) => (
          <ApplicantCard
            key={applicant.id}
            applicant={applicant}
            onView={setViewApplicant}
            onDelete={setDeleteApplicant}
          />
        ))}
        {applicants.length === 0 && (
          <div className="col-span-full flex items-center justify-center py-20 text-gray-400">
            <p className="text-sm font-medium">No applicants found.</p>
          </div>
        )}
      </div>

      {/* View Applicant Modal */}
      <ViewApplicantModal
        isOpen={!!viewApplicant}
        applicant={viewApplicant}
        onClose={() => setViewApplicant(null)}
      />

      {/* Delete Confirm */}
      <DeleteConfirmModal
        isOpen={!!deleteApplicant}
        applicant={deleteApplicant}
        onCancel={() => setDeleteApplicant(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
















// import { useState, useEffect, useRef } from "react";
// import { X, ChevronDown, Download, Eye, UserPlus, Image as ImageIcon, Loader2 } from "lucide-react";
// import CheckInSuccessModal from "../../modals/CheckInSuccessModal";
// import AddStaffModal from "../modals/AddStaffModal";
// import { recruitmentAPI } from "../../../services/api";

// const AMBER = "#f5c045";

// const staffRoles = [
//   "Home-Help & Support Assistant",
//   "Senior Care Worker",
//   "Community Support Worker",
//   "Live-In Carer",
//   "Admin",
// ];

// const sexOptions = ["Male", "Female", "Prefer not to say"];

// // ── Delete Confirm Modal ──────────────────────────────────────────────────────
// function DeleteConfirmModal({ isOpen, applicant, onCancel, onConfirm }) {
//   const [showSuccess, setShowSuccess] = useState(false);
//   if (!isOpen || !applicant) return null;

//   return (
//     <>
//       <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" onClick={onCancel}>
//         <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-auto p-8 flex flex-col items-center gap-4 text-center" onClick={(e) => e.stopPropagation()}>
//           <h2 className="text-xl font-bold text-gray-900">Delete this applicant?</h2>
//           <p className="text-sm text-gray-500 leading-relaxed">
//             This action will permanently remove this applicant from Daily Assist. This cannot be undone.
//           </p>
//           <div className="flex gap-3 w-full mt-2">
//             <button onClick={onCancel} className="flex-1 py-3.5 rounded-xl font-semibold text-sm text-gray-900 border border-red-400 hover:bg-red-50 transition-colors">Cancel</button>
//             <button onClick={() => setShowSuccess(true)} className="flex-1 py-3.5 rounded-xl font-semibold text-sm text-white bg-red-500 hover:bg-red-600 transition-colors">Yes, Delete Permanently</button>
//           </div>
//         </div>
//       </div>
//       <CheckInSuccessModal isOpen={showSuccess} onClose={() => { setShowSuccess(false); onConfirm(); }} buttonText="Back to Recruitment" />
//     </>
//   );
// }

// // ── Add Staff Form ────────────────────────────────────────────────────────────
// function AddStaffForm({ applicant, onCancel, onSubmit }) {
//   const [form, setForm] = useState({
//     staffId:   applicant.staffId ?? "",
//     staffRole: applicant.role?.replace(" Role", "") ?? "",
//     firstName: applicant.name?.split(" ")[0] ?? "",
//     lastName:  applicant.name?.split(" ").slice(1).join(" ") ?? "",
//     email:     applicant.email ?? "",
//     phone:     applicant.phone ?? "",
//     dob:       "",
//     sex:       "",
//     image:     null,
//     cv:        null,
//   });
//   const [roleOpen, setRoleOpen]   = useState(false);
//   const [sexOpen, setSexOpen]     = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);
//   const imageRef = useRef();
//   const cvRef    = useRef();

//   const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

//   return (
//     <>
//       <div className="fixed inset-0 z-50 bg-black/40" onClick={onCancel} />
//       <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-0 sm:px-4" onClick={(e) => e.stopPropagation()}>
//         <div className="bg-white w-full sm:max-w-2xl rounded-t-3xl sm:rounded-2xl shadow-2xl flex flex-col max-h-[95vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
//           <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100 flex-shrink-0">
//             <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2"><span className="text-2xl font-light">+</span> Add Staff</h2>
//             <button onClick={onCancel} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"><X className="w-5 h-5 text-gray-500" /></button>
//           </div>
//           <div className="overflow-y-auto flex-1 px-6 py-5 flex flex-col gap-5">
//             <div className="flex gap-4">
//               <div className="flex flex-col gap-1.5 w-28 flex-shrink-0">
//                 <label className="text-sm font-semibold text-gray-800">Staff ID</label>
//                 <input type="text" value={form.staffId} onChange={(e) => set("staffId", e.target.value)}
//                   className="w-full border border-gray-200 rounded-xl px-3 py-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-amber-200" />
//               </div>
//               <div className="flex flex-col gap-1.5 flex-1">
//                 <label className="text-sm font-semibold text-gray-800">Staff Role</label>
//                 <div className="relative">
//                   <button onClick={() => setRoleOpen(!roleOpen)} className="w-full flex items-center justify-between border border-gray-200 rounded-xl px-4 py-3 text-sm hover:bg-gray-50 transition-colors">
//                     <span className={form.staffRole ? "text-gray-700" : "text-gray-400"}>{form.staffRole || "Select Staff Role"}</span>
//                     <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${roleOpen ? "rotate-180" : ""}`} />
//                   </button>
//                   {roleOpen && (
//                     <div className="absolute top-12 left-0 z-20 bg-white border border-gray-200 rounded-2xl shadow-lg w-full p-2 flex flex-col gap-1">
//                       {staffRoles.map((r) => (
//                         <button key={r} onClick={() => { set("staffRole", r); setRoleOpen(false); }}
//                           className={`w-full text-left px-4 py-2.5 text-sm rounded-xl transition-colors hover:bg-[#fef9ec] ${form.staffRole === r ? "text-[#e7b343] font-semibold" : "text-gray-700"}`}>
//                           {r}
//                         </button>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div className="flex flex-col gap-1.5">
//                 <label className="text-sm font-semibold text-gray-800">First Name</label>
//                 <input type="text" value={form.firstName} onChange={(e) => set("firstName", e.target.value)}
//                   className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-amber-200" />
//               </div>
//               <div className="flex flex-col gap-1.5">
//                 <label className="text-sm font-semibold text-gray-800">Last Name</label>
//                 <input type="text" value={form.lastName} onChange={(e) => set("lastName", e.target.value)}
//                   className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-amber-200" />
//               </div>
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div className="flex flex-col gap-1.5">
//                 <label className="text-sm font-semibold text-gray-800">Email Address</label>
//                 <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)}
//                   className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-amber-200" />
//               </div>
//               <div className="flex flex-col gap-1.5">
//                 <label className="text-sm font-semibold text-gray-800">Phone Number</label>
//                 <input type="text" value={form.phone} onChange={(e) => set("phone", e.target.value)}
//                   className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-amber-200" />
//               </div>
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div className="flex flex-col gap-1.5">
//                 <label className="text-sm font-semibold text-gray-800">Date of Birth</label>
//                 <input type="date" value={form.dob} onChange={(e) => set("dob", e.target.value)}
//                   className="w-full bg-gray-100 border-0 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-amber-200" />
//               </div>
//               <div className="flex flex-col gap-1.5">
//                 <label className="text-sm font-semibold text-gray-800">Sex</label>
//                 <div className="relative">
//                   <button onClick={() => setSexOpen(!sexOpen)} className="w-full flex items-center justify-between bg-gray-100 rounded-xl px-4 py-3 text-sm hover:bg-gray-200 transition-colors">
//                     <span className={form.sex ? "text-gray-700" : "text-gray-400"}>{form.sex || "Select"}</span>
//                     <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${sexOpen ? "rotate-180" : ""}`} />
//                   </button>
//                   {sexOpen && (
//                     <div className="absolute top-12 left-0 z-20 bg-white border border-gray-200 rounded-2xl shadow-lg w-full p-2 flex flex-col gap-1">
//                       {sexOptions.map((s) => (
//                         <button key={s} onClick={() => { set("sex", s); setSexOpen(false); }}
//                           className={`w-full text-left px-4 py-2.5 text-sm rounded-xl transition-colors hover:bg-[#fef9ec] ${form.sex === s ? "text-[#e7b343] font-semibold" : "text-gray-700"}`}>
//                           {s}
//                         </button>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//             <div className="flex flex-col gap-1.5">
//               <label className="text-sm font-semibold text-gray-800">Upload Image</label>
//               <div onClick={() => imageRef.current?.click()} className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-amber-300 hover:bg-amber-50/30 transition-colors">
//                 {form.image ? (
//                   <div className="flex flex-col items-center gap-2">
//                     <img src={URL.createObjectURL(form.image)} alt="preview" className="w-20 h-20 rounded-xl object-cover" />
//                     <p className="text-xs text-gray-500">{form.image.name}</p>
//                   </div>
//                 ) : (
//                   <>
//                     <ImageIcon className="w-8 h-8 text-gray-300" />
//                     <p className="text-sm text-center text-gray-500"><span className="font-semibold" style={{ color: AMBER }}>Click to upload</span> or drag and drop</p>
//                     <p className="text-xs text-gray-400">JPG, JPEG, PNG less than 1MB</p>
//                   </>
//                 )}
//               </div>
//               <input ref={imageRef} type="file" accept="image/*" className="hidden" onChange={(e) => set("image", e.target.files[0] || null)} />
//             </div>
//             <div className="flex flex-col gap-1.5">
//               <label className="text-sm font-semibold text-gray-800">Upload CV</label>
//               <div onClick={() => cvRef.current?.click()} className="border border-gray-200 rounded-xl p-4 cursor-pointer hover:border-amber-300 hover:bg-amber-50/30 transition-colors min-h-[120px] flex flex-col items-center justify-center gap-2">
//                 {form.cv ? (
//                   <div className="flex items-center gap-3 w-full">
//                     <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
//                       <span className="text-xs font-bold text-amber-600">CV</span>
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <p className="text-sm font-medium text-gray-800 truncate">{form.cv.name}</p>
//                       <p className="text-xs text-gray-400">{(form.cv.size / 1024 / 1024).toFixed(1)} MB</p>
//                     </div>
//                   </div>
//                 ) : (
//                   <>
//                     <p className="text-sm text-center text-gray-500"><span className="font-semibold" style={{ color: AMBER }}>Click to upload</span> or drag and drop</p>
//                     <p className="text-xs text-gray-400">PDF, DOC, DOCX less than 5MB</p>
//                   </>
//                 )}
//               </div>
//               <input ref={cvRef} type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={(e) => set("cv", e.target.files[0] || null)} />
//             </div>
//           </div>
//           <div className="px-6 pb-6 pt-3 flex-shrink-0 border-t border-gray-100">
//             <button onClick={() => setShowSuccess(true)}
//               className="w-full py-3.5 rounded-xl font-semibold text-sm text-gray-900 hover:opacity-90 transition-colors flex items-center justify-center gap-2"
//               style={{ backgroundColor: AMBER }}>
//               <UserPlus className="w-4 h-4" /> Add Staff
//             </button>
//           </div>
//         </div>
//       </div>
//       <CheckInSuccessModal isOpen={showSuccess} onClose={() => { setShowSuccess(false); onSubmit(); }} buttonText="Back to Recruitment" />
//     </>
//   );
// }

// // ── View Applicant Modal ──────────────────────────────────────────────────────
// function ViewApplicantModal({ isOpen, applicant, onClose }) {
//   const [showAddStaff, setShowAddStaff] = useState(false);
//   if (!isOpen || !applicant) return null;

//   return (
//     <>
//       <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4" onClick={onClose}>
//         <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-auto flex flex-col overflow-hidden" onClick={(e) => e.stopPropagation()}>
//           <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
//             <h2 className="text-2xl font-bold text-gray-900">{applicant.name}</h2>
//             <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"><X className="w-5 h-5 text-gray-500" /></button>
//           </div>
//           <div className="px-6 py-5 flex flex-col gap-4">
//             <div className="flex flex-col gap-2">
//               {[
//                 { label: "Role:",         value: applicant.role  },
//                 { label: "Email:",        value: applicant.email },
//                 { label: "Phone Number:", value: applicant.phone },
//               ].map(({ label, value }) => (
//                 <div key={label} className="flex gap-3 text-sm">
//                   <span className="font-semibold text-gray-900 w-28 flex-shrink-0">{label}</span>
//                   <span className="text-gray-700">{value}</span>
//                 </div>
//               ))}
//             </div>
//             <hr className="border-gray-100" />
//             <div className="border border-gray-200 rounded-xl p-4 flex flex-col gap-3">
//               <p className="text-sm font-semibold text-gray-700">Uploaded CV</p>
//               <div className="flex items-center justify-between gap-4">
//                 <div className="flex items-center gap-3">
//                   <div className="w-10 h-10 bg-amber-50 border border-amber-200 rounded-lg flex items-center justify-center flex-shrink-0">
//                     <span className="text-xs font-bold text-amber-500">CV</span>
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-gray-800">{applicant.cvTitle ?? "Document"}</p>
//                     <p className="text-xs text-gray-400">{applicant.cvDate} • {applicant.cvSize}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-2 flex-shrink-0">
//                   <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-amber-300 text-xs font-semibold text-amber-600 hover:bg-amber-50 transition-colors">
//                     <Eye className="w-3.5 h-3.5" /> View
//                   </button>
//                   <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-amber-300 text-xs font-semibold text-amber-600 hover:bg-amber-50 transition-colors">
//                     <Download className="w-3.5 h-3.5" /> Download
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="px-6 pb-6 pt-2">
//             <button onClick={() => setShowAddStaff(true)}
//               className="w-full py-3.5 rounded-xl font-semibold text-sm text-gray-900 hover:opacity-90 transition-colors"
//               style={{ backgroundColor: AMBER }}>
//               Process Staff Profile
//             </button>
//           </div>
//         </div>
//       </div>
//       {showAddStaff && (
//         <AddStaffModal isOpen={showAddStaff} onClose={() => { setShowAddStaff(false); onClose(); }} />
//       )}
//     </>
//   );
// }

// // ── Applicant Card ────────────────────────────────────────────────────────────
// function ApplicantCard({ applicant, onView, onDelete }) {
//   return (
//     <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-3">
//       <div className="flex flex-col gap-1">
//         <p className="text-sm text-gray-400">Applicant {applicant.number ?? applicant.id}</p>
//         <p className="text-sm font-bold text-gray-900">{applicant.role}</p>
//         <p className="text-sm text-gray-700"><span className="font-semibold">Name: </span>{applicant.name}</p>
//       </div>
//       <div className="flex flex-col gap-2 mt-1">
//         <button onClick={() => onView(applicant)}
//           className="w-full py-2.5 rounded-xl font-semibold text-sm text-gray-900 hover:opacity-90 transition-colors"
//           style={{ backgroundColor: AMBER }}>
//           View Applicant
//         </button>
//         <button onClick={() => onDelete(applicant)}
//           className="w-full py-2.5 rounded-xl font-semibold text-sm text-gray-900 border border-gray-200 hover:bg-gray-50 transition-colors">
//           Delete Applicant
//         </button>
//       </div>
//     </div>
//   );
// }

// // ── Main Page ─────────────────────────────────────────────────────────────────
// export default function RecruitmentPage() {
//   const [applicants, setApplicants]         = useState([]);
//   const [loading, setLoading]               = useState(true);
//   const [error, setError]                   = useState(null);
//   const [viewApplicant, setViewApplicant]   = useState(null);
//   const [deleteApplicant, setDeleteApplicant] = useState(null);

//   const fetchApplicants = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await recruitmentAPI.getAll();
//       const data = response.data?.data ?? response.data ?? [];
//       setApplicants(Array.isArray(data) ? data : []);
//     } catch (err) {
//       setError("Failed to load applicants. Please try again.");
//       console.error("Recruitment fetch error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { fetchApplicants(); }, []);

//   const handleDelete = async () => {
//     try {
//       await recruitmentAPI.delete(deleteApplicant.id);
//       setApplicants((prev) => prev.filter((a) => a.id !== deleteApplicant.id));
//     } catch (err) {
//       console.error("Delete applicant error:", err);
//     } finally {
//       setDeleteApplicant(null);
//     }
//   };

//   return (
//     <div className="flex flex-col gap-6 px-4 sm:px-6 py-6 max-w-7xl mx-auto w-full">
//       <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Recruitment</h1>

//       {loading && (
//         <div className="flex items-center justify-center py-20">
//           <Loader2 className="w-8 h-8 animate-spin text-amber-400" />
//           <span className="ml-3 text-sm text-gray-500">Loading applicants...</span>
//         </div>
//       )}

//       {error && !loading && (
//         <div className="flex flex-col items-center justify-center py-20 text-red-400">
//           <p className="text-sm font-medium">{error}</p>
//           <button onClick={fetchApplicants} className="mt-3 px-4 py-2 bg-amber-400 text-gray-900 text-sm font-semibold rounded-xl hover:bg-amber-500 transition-colors">Retry</button>
//         </div>
//       )}

//       {!loading && !error && (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//           {applicants.map((applicant, i) => (
//             <ApplicantCard key={applicant.id} applicant={{ ...applicant, number: i + 1 }}
//               onView={setViewApplicant} onDelete={setDeleteApplicant} />
//           ))}
//           {applicants.length === 0 && (
//             <div className="col-span-full flex items-center justify-center py-20 text-gray-400">
//               <p className="text-sm font-medium">No applicants found.</p>
//             </div>
//           )}
//         </div>
//       )}

//       <ViewApplicantModal isOpen={!!viewApplicant} applicant={viewApplicant} onClose={() => setViewApplicant(null)} />
//       <DeleteConfirmModal isOpen={!!deleteApplicant} applicant={deleteApplicant} onCancel={() => setDeleteApplicant(null)} onConfirm={handleDelete} />
//     </div>
//   );
// }