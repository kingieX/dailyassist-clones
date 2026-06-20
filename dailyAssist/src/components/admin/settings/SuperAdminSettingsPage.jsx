import { useState, useRef } from "react";
import { useAuth } from "../../../context/AuthContext";
import { Camera, ChevronDown, X } from "lucide-react";
import CheckInSuccessModal from "../../modals/CheckInSuccessModal";
import {
  notificationItems,
  adminPermissions,
  staffPermissions,
  systemLogs,
  logUserOptions,
  logActionOptions,
  logModuleOptions,
  dateRangeOptions,
  statusColors,
} from "../../../data/settingsData";

const AMBER = "#f5c045";

const TABS = [
  "Profile settings",
  "Security settings",
  "Notification settings",
  "Roles & Permission",
  "System Log",
];

const logStatusStyles = {
  pending:      "text-amber-500",
  reviewed:     "text-green-600",
  under_review: "text-orange-500",
  flagged:      "text-red-500",
  resolved:     "text-green-700",
};
const logStatusLabels = {
  pending:      "Pending",
  reviewed:     "Reviewed",
  under_review: "Under Review",
  flagged:      "Flagged",
  resolved:     "Resolved",
};
const logStatusOptions = ["pending", "reviewed", "under_review", "flagged", "resolved"];

// ── Shared helpers ────────────────────────────────────────────────────────────
function Section({ label, sub, children }) {
  return (
    <div className="flex flex-col lg:flex-row gap-6 py-8 border-b border-gray-100 last:border-0">
      <div className="lg:w-64 flex-shrink-0">
        <p className="text-sm font-bold text-gray-900">{label}</p>
        {sub && <p className="text-sm text-gray-500 mt-1 leading-relaxed">{sub}</p>}
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}

function Field({ label, value, onChange, disabled, type = "text", placeholder }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <input
        type={type} value={value} onChange={onChange} disabled={disabled} placeholder={placeholder}
        className={`w-full border rounded-xl px-4 py-3 text-sm outline-none transition-colors
                    ${disabled
                      ? "bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-white border-gray-200 text-gray-900 focus:ring-2 focus:ring-amber-200 focus:border-amber-300"}`}
      />
    </div>
  );
}

// ── Log Details Modal ─────────────────────────────────────────────────────────
function LogDetailsModal({ isOpen, log, onClose }) {
  if (!isOpen || !log) return null;

  const fields = [
    { label: "Time:",          value: log.time         },
    { label: "User:",          value: log.user         },
    { label: "Action:",        value: log.action       },
    { label: "Module:",        value: log.module       },
    { label: "Affected Item:", value: log.affectedItem },
    { label: "Description:",   value: log.description  },
    { label: "IP Address:",    value: log.ipAddress    },
    { label: "Status:",        value: log.status       },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-auto flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 pt-6 pb-5">
          <h2 className="text-xl font-bold text-gray-900">Log Details</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <div className="px-6 pb-6 flex flex-col gap-4">
          {fields.map(({ label, value }) => (
            <div key={label} className="flex flex-col gap-0.5">
              <p className="text-sm text-gray-400">{label}</p>
              <p className={`text-sm font-bold ${label === "Status:" ? (statusColors[value] ?? "text-gray-900") : "text-gray-900"}`}>
                {value ?? "—"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Profile Settings Tab ──────────────────────────────────────────────────────
function ProfileSettingsTab({ user }) {
  const [firstName, setFirstName]         = useState(user?.name?.split(" ")[0] ?? "");
  const [lastName, setLastName]           = useState(user?.name?.split(" ")[1] ?? "");
  const [email]                           = useState(user?.email ?? "");
  const [role]                            = useState(user?.role === "super_admin" ? "Super Admin" : "Admin");
  const [photo, setPhoto]                 = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [saved, setSaved]                 = useState(false);
  const fileRef                           = useRef();

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) setPhoto(URL.createObjectURL(file));
  };

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col sm:flex-row gap-6 py-8 border-b border-gray-100">
        <div className="lg:w-64 flex-shrink-0 flex flex-col gap-3">
          <p className="text-sm font-bold text-gray-900">Profile photo</p>
          <p className="text-sm text-gray-500 leading-relaxed">This image will be displayed on your profile</p>
          <button onClick={() => fileRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-colors hover:bg-amber-50 w-fit"
            style={{ borderColor: AMBER, color: AMBER }}>
            <Camera className="w-4 h-4" /> Change Photo
          </button>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
        </div>
        <div className="flex items-start">
          <div className="relative flex-shrink-0">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-amber-100 flex items-center justify-center border-2 border-amber-200">
              {photo
                ? <img src={photo} alt="Profile" className="w-full h-full object-cover" />
                : <span className="text-3xl font-bold text-amber-500">{firstName?.[0]}{lastName?.[0]}</span>
              }
            </div>
            <div className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-green-500 border-2 border-white flex items-center justify-center">
              <span className="text-white text-xs">✓</span>
            </div>
          </div>
        </div>
      </div>

      <Section label="Personal Information" sub="Update your personal details here.">
        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <Field label="Last Name"  value={lastName}  onChange={(e) => setLastName(e.target.value)} />
          </div>
          <Field label="Email Address" value={email} disabled />
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Role</label>
            <input type="text" value={role} disabled
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-gray-50 text-gray-500 cursor-not-allowed outline-none" />
          </div>
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button onClick={() => { setFirstName(user?.name?.split(" ")[0] ?? ""); setLastName(user?.name?.split(" ")[1] ?? ""); }}
              className="flex-1 py-3.5 rounded-xl font-semibold text-sm border transition-colors hover:bg-amber-50"
              style={{ borderColor: AMBER, color: AMBER }}>Cancel</button>
            <button onClick={handleSave}
              className="flex-1 py-3.5 rounded-xl font-semibold text-sm text-white transition-colors hover:opacity-90"
              style={{ backgroundColor: AMBER }}>{saved ? "Saved ✓" : "Save Changes"}</button>
          </div>
          <div className="pt-4">
            <p className="text-sm font-bold text-red-500 mb-1">Delete Account</p>
            <p className="text-sm text-gray-500 mb-3">Permanently deactivate your own account. This action cannot be undone.</p>
            <label className="flex items-center gap-2 cursor-pointer mb-4">
              <input type="checkbox" checked={confirmDelete} onChange={(e) => setConfirmDelete(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 accent-red-500" />
              <span className="text-sm text-gray-600">I confirm my account deactivation</span>
            </label>
            <button disabled={!confirmDelete}
              className="px-6 py-3 rounded-xl font-semibold text-sm text-white transition-colors disabled:opacity-50"
              style={{ backgroundColor: "#e8a0a0" }}>Deactivate Account</button>
          </div>
        </div>
      </Section>
    </div>
  );
}

// ── Password Field ────────────────────────────────────────────────────────────
function PasswordField({ label, value, onChange, placeholder, active }) {
  const [show, setShow] = useState(false);
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className={`flex items-center border rounded-xl px-4 py-3 transition-colors ${active ? "border-green-400 bg-white" : "border-gray-200 bg-gray-50"}`}>
        <input type={show ? "text" : "password"} value={value} onChange={onChange} placeholder={placeholder}
          className="flex-1 text-sm text-gray-900 bg-transparent outline-none placeholder-gray-400" />
        <button type="button" onClick={() => setShow((v) => !v)} className="text-gray-400 hover:text-gray-600 ml-2 flex-shrink-0">
          {show ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

// ── Security Settings Tab ─────────────────────────────────────────────────────
function SecuritySettingsTab() {
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw]         = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [saved, setSaved]         = useState(false);
  const [error, setError]         = useState("");

  const handleSave = () => {
    setError("");
    if (!currentPw || !newPw || !confirmPw) { setError("All fields are required."); return; }
    if (newPw !== confirmPw) { setError("New passwords do not match."); return; }
    if (newPw.length < 8) { setError("Password must be at least 8 characters."); return; }
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
    setCurrentPw(""); setNewPw(""); setConfirmPw("");
  };

  return (
    <div className="flex flex-col">
      <Section label="Password Change" sub="Change your password here.">
        <div className="flex flex-col gap-5">
          <PasswordField label="Current Password"     value={currentPw} onChange={(e) => setCurrentPw(e.target.value)} placeholder="* * * * * * * *" active={!!currentPw} />
          <PasswordField label="New Password"         value={newPw}     onChange={(e) => setNewPw(e.target.value)}     placeholder="Enter password" />
          <PasswordField label="Confirm New Password" value={confirmPw} onChange={(e) => setConfirmPw(e.target.value)} placeholder="Enter password" />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <div className="flex flex-col sm:flex-row gap-3 pt-1">
            <button onClick={() => { setCurrentPw(""); setNewPw(""); setConfirmPw(""); setError(""); }}
              className="flex-1 py-3.5 rounded-xl font-semibold text-sm border transition-colors hover:bg-amber-50"
              style={{ borderColor: AMBER, color: AMBER }}>Cancel</button>
            <button onClick={handleSave}
              className="flex-1 py-3.5 rounded-xl font-semibold text-sm text-white transition-colors hover:opacity-90"
              style={{ backgroundColor: AMBER }}>{saved ? "Saved ✓" : "Save Changes"}</button>
          </div>
        </div>
      </Section>
    </div>
  );
}

// ── Notification Settings Tab ─────────────────────────────────────────────────
function NotificationSettingsTab() {
  const initialSettings = Object.fromEntries(
    notificationItems.map((item) => [item.key, { email: item.defaultEmail, dashboard: item.defaultDashboard }])
  );
  const [settings, setSettings] = useState(initialSettings);
  const [saved, setSaved]       = useState(false);

  const toggle = (key, type) =>
    setSettings((prev) => ({ ...prev, [key]: { ...prev[key], [type]: !prev[key][type] } }));

  return (
    <div className="flex flex-col py-2">
      {notificationItems.map(({ key, label, sub }, idx) => (
        <div key={key} className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-6 px-2 ${idx !== notificationItems.length - 1 ? "border-b border-gray-100" : ""}`}>
          <div className="sm:max-w-xs">
            <p className="text-sm font-bold text-gray-900">{label}</p>
            <p className="text-sm text-gray-500 mt-1 leading-relaxed">{sub}</p>
          </div>
          <div className="flex flex-col gap-3 flex-shrink-0">
            <div className="flex items-center gap-3 min-w-[140px]">
              <button onClick={() => toggle(key, "email")}
                className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${settings[key].email ? "bg-amber-400" : "bg-gray-200"}`}>
                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-200 ${settings[key].email ? "left-6" : "left-1"}`} />
              </button>
              <span className="text-sm text-gray-700 select-none">Email</span>
            </div>
            <div className="flex items-center gap-3 min-w-[140px]">
              <button onClick={() => toggle(key, "dashboard")}
                className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${settings[key].dashboard ? "bg-amber-400" : "bg-gray-200"}`}>
                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-200 ${settings[key].dashboard ? "left-6" : "left-1"}`} />
              </button>
              <span className="text-sm text-gray-700 select-none">Dashboard</span>
            </div>
          </div>
        </div>
      ))}
      <div className="flex justify-end pt-4 pb-2">
        <button onClick={() => setSaved(true)}
          className="px-10 py-3.5 rounded-xl font-semibold text-sm text-white hover:opacity-90 transition-colors"
          style={{ backgroundColor: AMBER }}>{saved ? "Saved ✓" : "Save Changes"}</button>
      </div>
    </div>
  );
}

// ── Roles & Permission Tab ────────────────────────────────────────────────────
function PermissionToggle({ value, onChange }) {
  return (
    <div className="flex items-center gap-2">
      <button onClick={() => onChange(!value)}
        className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${value ? "bg-amber-400" : "bg-gray-200"}`}>
        <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-200 ${value ? "left-6" : "left-1"}`} />
      </button>
      <span className={`text-sm font-medium ${value ? "text-gray-700" : "text-gray-400"}`}>
        {value ? "On" : "Off"}
      </span>
    </div>
  );
}

function RoleCard({ roleLabel, permissions, onToggle }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100">
        <p className="text-sm font-bold text-gray-900">{roleLabel}</p>
      </div>
      <div className="flex flex-col">
        {permissions.map(({ key, label, value }, idx) => (
          <div key={key} className={`flex items-center justify-between px-6 py-4 ${idx !== permissions.length - 1 ? "border-b border-gray-100" : ""}`}>
            <p className="text-sm text-gray-900">{label}</p>
            <PermissionToggle value={value} onChange={(val) => onToggle(key, val)} />
          </div>
        ))}
      </div>
    </div>
  );
}

function RolesPermissionTab() {
  const [adminPerms, setAdminPerms] = useState(adminPermissions.map((p) => ({ ...p })));
  const [staffPerms, setStaffPerms] = useState(staffPermissions.map((p) => ({ ...p })));
  const [saved, setSaved]           = useState(false);

  const toggleAdmin = (key, val) =>
    setAdminPerms((prev) => prev.map((p) => p.key === key ? { ...p, value: val } : p));
  const toggleStaff = (key, val) =>
    setStaffPerms((prev) => prev.map((p) => p.key === key ? { ...p, value: val } : p));

  return (
    <div className="flex flex-col gap-5 py-6">
      <RoleCard roleLabel="Role: Admin" permissions={adminPerms} onToggle={toggleAdmin} />
      <RoleCard roleLabel="Role: Staff" permissions={staffPerms} onToggle={toggleStaff} />
      <div className="flex justify-end">
        <button onClick={() => setSaved(true)}
          className="px-10 py-3.5 rounded-xl font-semibold text-sm text-white hover:opacity-90 transition-colors"
          style={{ backgroundColor: AMBER }}>{saved ? "Saved ✓" : "Save Changes"}</button>
      </div>
    </div>
  );
}

// ── System Log helpers ────────────────────────────────────────────────────────
function LogDropdown({ label, options, selected, onSelect }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm hover:bg-gray-50 transition-colors min-w-[140px] justify-between">
        <span className={selected ? "text-gray-900 font-medium" : "text-gray-500"}>{selected || label}</span>
        <svg className={`w-4 h-4 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute top-12 left-0 z-20 bg-white border border-gray-200 rounded-2xl shadow-xl min-w-[160px] py-2 flex flex-col">
          {options.map((opt) => (
            <button key={opt} onClick={() => { onSelect(opt === selected ? "" : opt); setOpen(false); }}
              className={`text-left px-5 py-2.5 text-sm hover:bg-gray-50 transition-colors ${selected === opt ? "font-semibold text-amber-500" : "text-gray-700"}`}>
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function DateRangeDropdown({ selected, onSelect }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm hover:bg-gray-50 transition-colors min-w-[140px] justify-between">
        <span className={selected ? "text-gray-900 font-medium" : "text-gray-500"}>{selected || "Date Range"}</span>
        <svg className={`w-4 h-4 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute top-12 left-0 z-20 bg-white border border-gray-200 rounded-2xl shadow-xl min-w-[180px] py-3 flex flex-col gap-1">
          {dateRangeOptions.map((opt) => (
            <label key={opt} className="flex items-center justify-between px-5 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors">
              <span>{opt}</span>
              <input type="checkbox" checked={selected === opt} onChange={() => onSelect(selected === opt ? "" : opt)}
                className="w-4 h-4 rounded border-gray-300 accent-amber-400" />
            </label>
          ))}
          <div className="px-4 pt-2">
            <button onClick={() => setOpen(false)}
              className="w-full py-2.5 rounded-xl font-semibold text-sm text-gray-900 hover:opacity-90 transition-colors"
              style={{ backgroundColor: AMBER }}>Done</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── System Log Tab ────────────────────────────────────────────────────────────
function SystemLogTab() {
  const [filterUser,   setFilterUser]   = useState("");
  const [filterAction, setFilterAction] = useState("");
  const [filterModule, setFilterModule] = useState("");
  const [filterDate,   setFilterDate]   = useState("");
  const [search,       setSearch]       = useState("");
  const [page,         setPage]         = useState(1);
  const [csvHovered,   setCsvHovered]   = useState(false);
  const [pdfHovered,   setPdfHovered]   = useState(false);
  const [selectedLog,  setSelectedLog]  = useState(null);
  const PER_PAGE = 10;

  const filtered = systemLogs.filter((log) => {
    if (filterUser   && log.user   !== filterUser)   return false;
    if (filterAction && log.action !== filterAction) return false;
    if (filterModule && log.module !== filterModule) return false;
    if (search && !log.details.toLowerCase().includes(search.toLowerCase()) &&
        !log.action.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const exportCSV = () => {
    const header = "Time,User,Action,Module,Details,Status";
    const rows   = filtered.map((l) => `${l.time},${l.user},${l.action},${l.module},"${l.details}",${l.status}`);
    const blob   = new Blob([[header, ...rows].join("\n")], { type: "text/csv" });
    const url    = URL.createObjectURL(blob);
    const a      = document.createElement("a"); a.href = url; a.download = "system_log.csv"; a.click();
  };

  return (
    <div className="flex flex-col gap-5 py-6">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <LogDropdown label="Select User"   options={logUserOptions}   selected={filterUser}   onSelect={(v) => { setFilterUser(v);   setPage(1); }} />
        <LogDropdown label="Select Action" options={logActionOptions} selected={filterAction} onSelect={(v) => { setFilterAction(v); setPage(1); }} />
        <LogDropdown label="Select Module" options={logModuleOptions} selected={filterModule} onSelect={(v) => { setFilterModule(v); setPage(1); }} />
        <DateRangeDropdown selected={filterDate} onSelect={(v) => { setFilterDate(v); setPage(1); }} />
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5 flex-1 min-w-[180px]">
          <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input type="text" value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} placeholder="Search log..."
            className="bg-transparent text-sm text-gray-700 outline-none placeholder-gray-400 w-full" />
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <button onClick={exportCSV}
            onMouseEnter={() => setCsvHovered(true)}
            onMouseLeave={() => setCsvHovered(false)}
            className="flex items-center gap-1.5 rounded-xl font-semibold text-sm text-gray-900 transition-all duration-300 overflow-hidden py-2.5 hover:opacity-90"
            style={{ backgroundColor: AMBER, paddingLeft: "14px", paddingRight: "14px", width: csvHovered ? "155px" : "90px" }}>
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span className="whitespace-nowrap overflow-hidden transition-all duration-300" style={{ maxWidth: csvHovered ? "110px" : "30px" }}>
              {csvHovered ? "Export CSV" : "CSV"}
            </span>
          </button>
          <button
            onMouseEnter={() => setPdfHovered(true)}
            onMouseLeave={() => setPdfHovered(false)}
            className="flex items-center gap-1.5 rounded-xl font-semibold text-sm text-gray-900 transition-all duration-300 overflow-hidden py-2.5 hover:opacity-90"
            style={{ backgroundColor: AMBER, paddingLeft: "14px", paddingRight: "14px", width: pdfHovered ? "155px" : "90px" }}>
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span className="whitespace-nowrap overflow-hidden transition-all duration-300" style={{ maxWidth: pdfHovered ? "110px" : "30px" }}>
              {pdfHovered ? "Export PDF" : "PDF"}
            </span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-gray-100">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr style={{ backgroundColor: AMBER }}>
              {["Time","User","Action","Module","Details","Status",""].map((h) => (
                <th key={h} className="text-left px-5 py-4 text-sm font-bold text-gray-900">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.map((log, idx) => (
              <tr key={log.id} className={`border-t border-gray-100 ${idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"} hover:bg-amber-50/30 transition-colors`}>
                <td className="px-5 py-4 text-sm text-gray-700 whitespace-nowrap">{log.time}</td>
                <td className="px-5 py-4 text-sm text-gray-700">{log.user}</td>
                <td className="px-5 py-4 text-sm text-gray-700">{log.action}</td>
                <td className="px-5 py-4 text-sm text-gray-700">{log.module}</td>
              <td className="px-5 py-4 text-sm text-gray-700 max-w-[160px] truncate">{log.description}</td>
                <td className={`px-5 py-4 text-sm font-semibold ${statusColors[log.status] ?? "text-gray-500"}`}>{log.status}</td>
                <td className="px-5 py-4">
                  <button
                    onClick={() => setSelectedLog(log)}
                    className="px-4 py-1.5 rounded-lg text-xs font-semibold text-white bg-blue-500 hover:bg-blue-600 transition-colors whitespace-nowrap">
                    View details
                  </button>
                </td>
              </tr>
            ))}
            {paginated.length === 0 && (
              <tr><td colSpan={7} className="px-5 py-10 text-center text-sm text-gray-400">No logs found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
            className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-30 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button key={p} onClick={() => setPage(p)}
              className={`w-9 h-9 flex items-center justify-center rounded-xl text-sm font-semibold transition-colors
                          ${page === p ? "border-2 border-amber-400 text-gray-900" : "border border-gray-200 text-gray-500 hover:bg-gray-50"}`}>
              {p}
            </button>
          ))}
          <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
            className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-30 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}

      {/* Log Details Modal */}
      <LogDetailsModal isOpen={!!selectedLog} log={selectedLog} onClose={() => setSelectedLog(null)} />
    </div>
  );
}

// ── Main Settings Page ────────────────────────────────────────────────────────
export default function SuperAdminSettingsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState(TABS[0]);

  return (
    <div className="flex flex-col gap-6 px-4 sm:px-6 py-6 max-w-5xl mx-auto w-full">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 mt-1">View your account information</p>
      </div>
      <div className="border-b border-gray-200 overflow-x-auto">
        <div className="flex gap-0 min-w-max">
          {TABS.map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors
                          ${activeTab === tab ? "border-amber-400 text-gray-900" : "border-transparent text-gray-400 hover:text-gray-600"}`}>
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-2">
        {activeTab === "Profile settings"      && <ProfileSettingsTab user={user} />}
        {activeTab === "Security settings"     && <SecuritySettingsTab />}
        {activeTab === "Notification settings" && <NotificationSettingsTab />}
        {activeTab === "Roles & Permission"    && <RolesPermissionTab />}
        {activeTab === "System Log"            && <SystemLogTab />}
      </div>
    </div>
  );
}