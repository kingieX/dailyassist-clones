import { useState } from "react";
import { X, ChevronDown } from "lucide-react";
import CheckInSuccessModal from "../../modals/CheckInSuccessModal";

const AMBER = "#f5c045";

// ── Mock Data ─────────────────────────────────────────────────────────────────
const initialJobPosts = [
  {
    id: 1,
    title: "Home-Help & Support Assistant",
    description:
      "This role focuses on practical assistance, companionship, and wellbeing support to help clients live independently and comfortably.",
    payRate: "£13.00 per hour",
    contractType: "Zero-Hours Contract",
  },
];

const contractOptions = [
  "Full-Time Contract",
  "Part-Time Contract",
  "Zero-Hour Contract",
  "Freelance / Remote Contract",
  "Fixed-Term Contract",
];

// ── Expandable List Section ───────────────────────────────────────────────────
function ExpandableSection({ label, items, onAdd, onRemove }) {
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);

  const handleAdd = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setInput("");
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold text-gray-900">{label}</p>
        <button
          onClick={() => setOpen((o) => !o)}
          className="text-sm font-semibold text-amber-500 hover:text-amber-600 transition-colors"
        >
          + Add
        </button>
      </div>

      {open && (
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            placeholder={`Add ${label.toLowerCase()}...`}
            className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm
                       text-gray-700 outline-none focus:ring-2 focus:ring-amber-200 placeholder-gray-400"
          />
          <button
            onClick={handleAdd}
            className="px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-900
                       hover:opacity-90 transition-colors"
            style={{ backgroundColor: AMBER }}
          >
            Add
          </button>
        </div>
      )}

      {items.length > 0 && (
        <div className="flex flex-col gap-1.5 mt-1">
          {items.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between bg-gray-50 border border-gray-200
                         rounded-xl px-4 py-2.5 text-sm text-gray-700"
            >
              <span>{item}</span>
              <button
                onClick={() => onRemove(i)}
                className="text-red-400 hover:text-red-600 transition-colors ml-2 flex-shrink-0"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Confirm Modal ─────────────────────────────────────────────────────────────
function ConfirmModal({ isOpen, onCancel, onConfirm, mode }) {
  if (!isOpen) return null;
  const isEdit = mode === "edit";
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-auto p-8 flex flex-col items-center gap-4 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold text-gray-900">
          {isEdit ? "Save changes?" : "Create this role?"}
        </h2>
        <p className="text-sm text-gray-500 leading-relaxed">
          {isEdit
            ? "You're about to save changes to this job role in Daily Assist. Please confirm that the job details are correct before proceeding."
            : "You're about to create a new role in Daily Assist. Please confirm that the job details are correct before proceeding."}
        </p>
        <div className="flex gap-3 w-full mt-2">
          <button
            onClick={onCancel}
            className="flex-1 py-3.5 rounded-xl font-semibold text-sm text-gray-900
                       border border-amber-400 hover:bg-amber-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3.5 rounded-xl font-semibold text-sm text-gray-900
                       hover:opacity-90 transition-colors"
            style={{ backgroundColor: AMBER }}
          >
            {isEdit ? "Yes, Save Changes" : "Yes, Create Job Post"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Job Post Form (Create / Edit) ─────────────────────────────────────────────
function JobPostForm({ initialData, onCancel, onSubmit, mode }) {
  const [form, setForm] = useState(
    initialData || {
      title: "",
      reportTo: "",
      payRate: "",
      contractTypes: [],
      hours: "",
      location: "",
      overview: "",
      responsibilities: [],
      exclusions: [],
      benefits: [],
      requirements: [],
      desirable: [],
      standards: [],
    }
  );

  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const toggleContract = (opt) => {
    set(
      "contractTypes",
      form.contractTypes.includes(opt)
        ? form.contractTypes.filter((c) => c !== opt)
        : [...form.contractTypes, opt]
    );
  };

  const addToList = (key, val) => set(key, [...(form[key] || []), val]);
  const removeFromList = (key, idx) =>
    set(key, form[key].filter((_, i) => i !== idx));

  const handleSubmit = () => setShowConfirm(true);
  const handleConfirm = () => { setShowConfirm(false); setShowSuccess(true); };
  const handleSuccessClose = () => { setShowSuccess(false); onSubmit(form); };

  const isEdit = mode === "edit";

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-40 bg-black/40" onClick={onCancel} />

      {/* Drawer / Modal */}
      <div
        className="fixed inset-0 z-40 flex items-end sm:items-center justify-center px-0 sm:px-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl shadow-2xl
                     flex flex-col max-h-[92vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100 flex-shrink-0">
            <h2 className="text-xl font-bold text-gray-900">
              {isEdit ? "Edit a jobs" : "Create a jobs"}
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

            {/* Role Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-gray-900">Role Name</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => set("title", e.target.value)}
                placeholder="Role name"
                className="w-full bg-gray-100 border-0 rounded-xl px-4 py-3 text-sm
                           text-gray-700 outline-none focus:ring-2 focus:ring-amber-200 placeholder-gray-400"
              />
            </div>

            {/* Report To */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-gray-900">Report to</label>
              <input
                type="text"
                value={form.reportTo}
                onChange={(e) => set("reportTo", e.target.value)}
                placeholder="Report to:"
                className="w-full bg-gray-100 border-0 rounded-xl px-4 py-3 text-sm
                           text-gray-700 outline-none focus:ring-2 focus:ring-amber-200 placeholder-gray-400"
              />
            </div>

            {/* Pay Rate */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-gray-900">Pay Rate</label>
              <input
                type="text"
                value={form.payRate}
                onChange={(e) => set("payRate", e.target.value)}
                placeholder="Enter pay rate..."
                className="w-full bg-gray-100 border-0 rounded-xl px-4 py-3 text-sm
                           text-gray-700 outline-none focus:ring-2 focus:ring-amber-200 placeholder-gray-400"
              />
            </div>

            {/* Contract Type — checkboxes */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-900">Contract Type</label>
              <p className="text-xs text-gray-500">Select the contract types</p>
              <div className="flex flex-col gap-2.5 mt-1">
                {contractOptions.map((opt) => {
                  const checked = form.contractTypes.includes(opt);
                  return (
                    <label
                      key={opt}
                      className="flex items-center gap-3 cursor-pointer"
                      onClick={() => toggleContract(opt)}
                    >
                      <div
                        className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-colors
                                    ${checked ? "border-amber-400 bg-amber-400" : "border-gray-300 bg-white"}`}
                      >
                        {checked && (
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 12 12">
                            <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>
                      <span className="text-sm text-gray-700">{opt}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Hours */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-gray-900">Hours</label>
              <input
                type="text"
                value={form.hours}
                onChange={(e) => set("hours", e.target.value)}
                placeholder="Hour flexibility..."
                className="w-full bg-gray-100 border-0 rounded-xl px-4 py-3 text-sm
                           text-gray-700 outline-none focus:ring-2 focus:ring-amber-200 placeholder-gray-400"
              />
            </div>

            {/* Location */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-gray-900">Location</label>
              <input
                type="text"
                value={form.location}
                onChange={(e) => set("location", e.target.value)}
                placeholder="Enter location..."
                className="w-full bg-gray-100 border-0 rounded-xl px-4 py-3 text-sm
                           text-gray-700 outline-none focus:ring-2 focus:ring-amber-200 placeholder-gray-400"
              />
            </div>

            {/* Role Overview */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-gray-900">Role Overview</label>
              <textarea
                value={form.overview}
                onChange={(e) => set("overview", e.target.value)}
                placeholder="About the role..."
                rows={5}
                className="w-full bg-gray-100 border-0 rounded-xl px-4 py-3 text-sm
                           text-gray-700 outline-none focus:ring-2 focus:ring-amber-200
                           placeholder-gray-400 resize-none"
              />
            </div>

            {/* Expandable sections */}
            <ExpandableSection
              label="Key Responsibilities"
              items={form.responsibilities}
              onAdd={(v) => addToList("responsibilities", v)}
              onRemove={(i) => removeFromList("responsibilities", i)}
            />
            <ExpandableSection
              label="What This Role Does NOT Include"
              items={form.exclusions}
              onAdd={(v) => addToList("exclusions", v)}
              onRemove={(i) => removeFromList("exclusions", i)}
            />
            <ExpandableSection
              label="Pay & Benefits"
              items={form.benefits}
              onAdd={(v) => addToList("benefits", v)}
              onRemove={(i) => removeFromList("benefits", i)}
            />
            <ExpandableSection
              label="Requirements"
              items={form.requirements}
              onAdd={(v) => addToList("requirements", v)}
              onRemove={(i) => removeFromList("requirements", i)}
            />
            <ExpandableSection
              label="Desirable (Not Essential)"
              items={form.desirable}
              onAdd={(v) => addToList("desirable", v)}
              onRemove={(i) => removeFromList("desirable", i)}
            />
            <ExpandableSection
              label="Professional Standards"
              items={form.standards}
              onAdd={(v) => addToList("standards", v)}
              onRemove={(i) => removeFromList("standards", i)}
            />
          </div>

          {/* Footer */}
          <div className="px-6 pb-6 pt-3 flex gap-3 flex-shrink-0 border-t border-gray-100">
            <button
              onClick={onCancel}
              className="flex-1 py-3.5 rounded-xl font-semibold text-sm text-gray-900
                         border border-amber-400 hover:bg-amber-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 py-3.5 rounded-xl font-semibold text-sm text-gray-900
                         hover:opacity-90 transition-colors"
              style={{ backgroundColor: AMBER }}
            >
              {isEdit ? "Save Changes" : "Create Job"}
            </button>
          </div>
        </div>
      </div>

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={showConfirm}
        onCancel={() => setShowConfirm(false)}
        onConfirm={handleConfirm}
        mode={mode}
      />

      {/* Success Modal */}
      <CheckInSuccessModal
        isOpen={showSuccess}
        onClose={handleSuccessClose}
        buttonText="Back to Job Posts"
      />
    </>
  );
}

// ── Delete Confirm Modal ──────────────────────────────────────────────────────
function DeleteConfirmModal({ isOpen, onCancel, onConfirm }) {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-auto p-8 flex flex-col items-center gap-4 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold text-gray-900">Delete this role?</h2>
        <p className="text-sm text-gray-500 leading-relaxed">
          This action cannot be undone. The job post will be permanently removed from Daily Assist.
        </p>
        <div className="flex gap-3 w-full mt-2">
          <button
            onClick={onCancel}
            className="flex-1 py-3.5 rounded-xl font-semibold text-sm text-gray-900
                       border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3.5 rounded-xl font-semibold text-sm text-white
                       bg-red-500 hover:bg-red-600 transition-colors"
          >
            Delete Role
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Job Post Card ─────────────────────────────────────────────────────────────
function JobPostCard({ post, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-3 w-full max-w-[300px]">
      <div className="flex flex-col gap-1">
        <h3 className="text-base font-bold text-gray-900">{post.title}</h3>
        <p className="text-sm text-gray-500 leading-relaxed">{post.description || post.overview}</p>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-sm text-gray-700">
          <span className="font-bold">Pay Rate</span>{"  "}
          <span>{post.payRate}</span>
        </p>
        <p className="text-sm text-gray-700">
          <span className="font-bold">Contract Type:</span>{"  "}
          <span>
            {Array.isArray(post.contractTypes)
              ? post.contractTypes.join(", ")
              : post.contractType}
          </span>
        </p>
      </div>
      <div className="flex flex-col gap-2 mt-1">
        <button
          onClick={() => onEdit(post)}
          className="w-full py-2.5 rounded-xl font-semibold text-sm text-gray-900
                     hover:opacity-90 transition-colors"
          style={{ backgroundColor: AMBER }}
        >
          Edit Role
        </button>
        <button
          onClick={() => onDelete(post)}
          className="w-full py-2.5 rounded-xl font-semibold text-sm text-gray-900
                     border border-gray-200 hover:bg-gray-50 transition-colors"
        >
          Delete Role
        </button>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function JobPostsPage() {
  const [posts, setPosts] = useState(initialJobPosts);
  const [showCreate, setShowCreate] = useState(false);
  const [editPost, setEditPost] = useState(null);
  const [deletePost, setDeletePost] = useState(null);

  const handleCreate = (form) => {
    setPosts((prev) => [...prev, { id: Date.now(), ...form }]);
    setShowCreate(false);
  };

  const handleEdit = (form) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === editPost.id ? { ...p, ...form } : p))
    );
    setEditPost(null);
  };

  const handleDelete = () => {
    setPosts((prev) => prev.filter((p) => p.id !== deletePost.id));
    setDeletePost(null);
  };

  return (
    <div className="min-h-screen bg-[#fdf8f0]">
      <div className="flex flex-col gap-6 px-4 sm:px-6 py-6 max-w-7xl mx-auto w-full">

        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Job Posts</h1>
          <button
            onClick={() => setShowCreate(true)}
            className="px-5 py-2.5 rounded-xl font-semibold text-sm text-amber-600
                       border border-amber-400 bg-white hover:bg-amber-50 transition-colors
                       whitespace-nowrap"
          >
            Create a job post
          </button>
        </div>

        {/* Grid */}
        <div className="flex flex-wrap gap-4">
          {posts.map((post) => (
            <JobPostCard
              key={post.id}
              post={post}
              onEdit={setEditPost}
              onDelete={setDeletePost}
            />
          ))}
          {posts.length === 0 && (
            <div className="flex items-center justify-center w-full py-20 text-gray-400">
              <p className="text-sm font-medium">No job posts yet. Create one to get started.</p>
            </div>
          )}
        </div>
      </div>

      {/* Create Form */}
      {showCreate && (
        <JobPostForm
          mode="create"
          onCancel={() => setShowCreate(false)}
          onSubmit={handleCreate}
        />
      )}

      {/* Edit Form */}
      {editPost && (
        <JobPostForm
          mode="edit"
          initialData={{
            ...editPost,
            contractTypes: editPost.contractTypes || (editPost.contractType ? [editPost.contractType] : []),
            responsibilities: editPost.responsibilities || [],
            exclusions: editPost.exclusions || [],
            benefits: editPost.benefits || [],
            requirements: editPost.requirements || [],
            desirable: editPost.desirable || [],
            standards: editPost.standards || [],
          }}
          onCancel={() => setEditPost(null)}
          onSubmit={handleEdit}
        />
      )}

      {/* Delete Confirm */}
      <DeleteConfirmModal
        isOpen={!!deletePost}
        onCancel={() => setDeletePost(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}























// import { useState, useEffect } from "react";
// import { X, Loader2 } from "lucide-react";
// import CheckInSuccessModal from "../../modals/CheckInSuccessModal";
// import { jobPostsAPI } from "../../../services/api";

// const AMBER = "#f5c045";

// const contractOptions = [
//   "Full-Time Contract",
//   "Part-Time Contract",
//   "Zero-Hour Contract",
//   "Freelance / Remote Contract",
//   "Fixed-Term Contract",
// ];

// // ── Expandable List Section ───────────────────────────────────────────────────
// function ExpandableSection({ label, items, onAdd, onRemove }) {
//   const [input, setInput] = useState("");
//   const [open, setOpen]   = useState(false);

//   const handleAdd = () => {
//     const trimmed = input.trim();
//     if (!trimmed) return;
//     onAdd(trimmed);
//     setInput("");
//   };

//   return (
//     <div className="flex flex-col gap-2">
//       <div className="flex items-center justify-between">
//         <p className="text-sm font-bold text-gray-900">{label}</p>
//         <button onClick={() => setOpen((o) => !o)} className="text-sm font-semibold text-amber-500 hover:text-amber-600 transition-colors">+ Add</button>
//       </div>
//       {open && (
//         <div className="flex gap-2">
//           <input type="text" value={input} onChange={(e) => setInput(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && handleAdd()}
//             placeholder={`Add ${label.toLowerCase()}...`}
//             className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-amber-200 placeholder-gray-400" />
//           <button onClick={handleAdd} className="px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-900 hover:opacity-90 transition-colors" style={{ backgroundColor: AMBER }}>Add</button>
//         </div>
//       )}
//       {items.length > 0 && (
//         <div className="flex flex-col gap-1.5 mt-1">
//           {items.map((item, i) => (
//             <div key={i} className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700">
//               <span>{item}</span>
//               <button onClick={() => onRemove(i)} className="text-red-400 hover:text-red-600 transition-colors ml-2 flex-shrink-0"><X className="w-3.5 h-3.5" /></button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// // ── Confirm Modal ─────────────────────────────────────────────────────────────
// function ConfirmModal({ isOpen, onCancel, onConfirm, mode, submitting }) {
//   if (!isOpen) return null;
//   const isEdit = mode === "edit";
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" onClick={onCancel}>
//       <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-auto p-8 flex flex-col items-center gap-4 text-center" onClick={(e) => e.stopPropagation()}>
//         <h2 className="text-xl font-bold text-gray-900">{isEdit ? "Save changes?" : "Create this role?"}</h2>
//         <p className="text-sm text-gray-500 leading-relaxed">
//           {isEdit
//             ? "You're about to save changes to this job role in Daily Assist. Please confirm that the job details are correct before proceeding."
//             : "You're about to create a new role in Daily Assist. Please confirm that the job details are correct before proceeding."}
//         </p>
//         <div className="flex gap-3 w-full mt-2">
//           <button onClick={onCancel} className="flex-1 py-3.5 rounded-xl font-semibold text-sm text-gray-900 border border-amber-400 hover:bg-amber-50 transition-colors">Cancel</button>
//           <button onClick={onConfirm} disabled={submitting}
//             className="flex-1 py-3.5 rounded-xl font-semibold text-sm text-gray-900 hover:opacity-90 transition-colors disabled:opacity-60"
//             style={{ backgroundColor: AMBER }}>
//             {submitting ? "Saving..." : isEdit ? "Yes, Save Changes" : "Yes, Create Job Post"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ── Job Post Form ─────────────────────────────────────────────────────────────
// function JobPostForm({ initialData, onCancel, onSubmit, mode }) {
//   const [form, setForm] = useState(initialData || {
//     title: "", reportTo: "", payRate: "", contractTypes: [], hours: "", location: "",
//     overview: "", responsibilities: [], exclusions: [], benefits: [],
//     requirements: [], desirable: [], standards: [],
//   });
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [submitting, setSubmitting]   = useState(false);
//   const [apiError, setApiError]       = useState(null);

//   const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

//   const toggleContract = (opt) => {
//     set("contractTypes", form.contractTypes.includes(opt)
//       ? form.contractTypes.filter((c) => c !== opt)
//       : [...form.contractTypes, opt]);
//   };

//   const addToList    = (key, val) => set(key, [...(form[key] || []), val]);
//   const removeFromList = (key, idx) => set(key, form[key].filter((_, i) => i !== idx));

//   const handleConfirm = async () => {
//     setSubmitting(true);
//     setApiError(null);
//     try {
//       if (mode === "edit") {
//         await jobPostsAPI.update(initialData.id, form);
//       } else {
//         await jobPostsAPI.create(form);
//       }
//       setShowConfirm(false);
//       setShowSuccess(true);
//     } catch (err) {
//       setApiError(err.response?.data?.message || "Failed to save job post. Please try again.");
//       setShowConfirm(false);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const isEdit = mode === "edit";

//   return (
//     <>
//       <div className="fixed inset-0 z-40 bg-black/40" onClick={onCancel} />
//       <div className="fixed inset-0 z-40 flex items-end sm:items-center justify-center px-0 sm:px-4" onClick={(e) => e.stopPropagation()}>
//         <div className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
//           <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100 flex-shrink-0">
//             <h2 className="text-xl font-bold text-gray-900">{isEdit ? "Edit a job" : "Create a job"}</h2>
//             <button onClick={onCancel} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"><X className="w-5 h-5 text-gray-500" /></button>
//           </div>

//           {apiError && (
//             <div className="mx-6 mt-3 px-4 py-3 bg-red-50 border border-red-200 rounded-xl">
//               <p className="text-sm text-red-500">{apiError}</p>
//             </div>
//           )}

//           <div className="overflow-y-auto flex-1 px-6 py-5 flex flex-col gap-5">
//             {[
//               { key: "title",    label: "Role Name",  placeholder: "Role name"          },
//               { key: "reportTo", label: "Report to",  placeholder: "Report to:"         },
//               { key: "payRate",  label: "Pay Rate",   placeholder: "Enter pay rate..."  },
//               { key: "hours",    label: "Hours",      placeholder: "Hour flexibility..." },
//               { key: "location", label: "Location",   placeholder: "Enter location..."  },
//             ].map(({ key, label, placeholder }) => (
//               <div key={key} className="flex flex-col gap-1.5">
//                 <label className="text-sm font-bold text-gray-900">{label}</label>
//                 <input type="text" value={form[key]} onChange={(e) => set(key, e.target.value)} placeholder={placeholder}
//                   className="w-full bg-gray-100 border-0 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-amber-200 placeholder-gray-400" />
//               </div>
//             ))}

//             <div className="flex flex-col gap-2">
//               <label className="text-sm font-bold text-gray-900">Contract Type</label>
//               <p className="text-xs text-gray-500">Select the contract types</p>
//               <div className="flex flex-col gap-2.5 mt-1">
//                 {contractOptions.map((opt) => {
//                   const checked = form.contractTypes.includes(opt);
//                   return (
//                     <label key={opt} className="flex items-center gap-3 cursor-pointer" onClick={() => toggleContract(opt)}>
//                       <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-colors ${checked ? "border-amber-400 bg-amber-400" : "border-gray-300 bg-white"}`}>
//                         {checked && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 12 12"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
//                       </div>
//                       <span className="text-sm text-gray-700">{opt}</span>
//                     </label>
//                   );
//                 })}
//               </div>
//             </div>

//             <div className="flex flex-col gap-1.5">
//               <label className="text-sm font-bold text-gray-900">Role Overview</label>
//               <textarea value={form.overview} onChange={(e) => set("overview", e.target.value)} placeholder="About the role..." rows={5}
//                 className="w-full bg-gray-100 border-0 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-amber-200 placeholder-gray-400 resize-none" />
//             </div>

//             <ExpandableSection label="Key Responsibilities"               items={form.responsibilities} onAdd={(v) => addToList("responsibilities", v)} onRemove={(i) => removeFromList("responsibilities", i)} />
//             <ExpandableSection label="What This Role Does NOT Include"    items={form.exclusions}       onAdd={(v) => addToList("exclusions", v)}       onRemove={(i) => removeFromList("exclusions", i)} />
//             <ExpandableSection label="Pay & Benefits"                     items={form.benefits}         onAdd={(v) => addToList("benefits", v)}         onRemove={(i) => removeFromList("benefits", i)} />
//             <ExpandableSection label="Requirements"                       items={form.requirements}     onAdd={(v) => addToList("requirements", v)}     onRemove={(i) => removeFromList("requirements", i)} />
//             <ExpandableSection label="Desirable (Not Essential)"          items={form.desirable}        onAdd={(v) => addToList("desirable", v)}        onRemove={(i) => removeFromList("desirable", i)} />
//             <ExpandableSection label="Professional Standards"             items={form.standards}        onAdd={(v) => addToList("standards", v)}        onRemove={(i) => removeFromList("standards", i)} />
//           </div>

//           <div className="px-6 pb-6 pt-3 flex gap-3 flex-shrink-0 border-t border-gray-100">
//             <button onClick={onCancel} className="flex-1 py-3.5 rounded-xl font-semibold text-sm text-gray-900 border border-amber-400 hover:bg-amber-50 transition-colors">Cancel</button>
//             <button onClick={() => setShowConfirm(true)} className="flex-1 py-3.5 rounded-xl font-semibold text-sm text-gray-900 hover:opacity-90 transition-colors" style={{ backgroundColor: AMBER }}>
//               {isEdit ? "Save Changes" : "Create Job"}
//             </button>
//           </div>
//         </div>
//       </div>

//       <ConfirmModal isOpen={showConfirm} onCancel={() => setShowConfirm(false)} onConfirm={handleConfirm} mode={mode} submitting={submitting} />
//       <CheckInSuccessModal isOpen={showSuccess} onClose={() => { setShowSuccess(false); onSubmit(); }} buttonText="Back to Job Posts" />
//     </>
//   );
// }

// // ── Delete Confirm Modal ──────────────────────────────────────────────────────
// function DeleteConfirmModal({ isOpen, onCancel, onConfirm }) {
//   if (!isOpen) return null;
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" onClick={onCancel}>
//       <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-auto p-8 flex flex-col items-center gap-4 text-center" onClick={(e) => e.stopPropagation()}>
//         <h2 className="text-xl font-bold text-gray-900">Delete this role?</h2>
//         <p className="text-sm text-gray-500 leading-relaxed">This action cannot be undone. The job post will be permanently removed from Daily Assist.</p>
//         <div className="flex gap-3 w-full mt-2">
//           <button onClick={onCancel} className="flex-1 py-3.5 rounded-xl font-semibold text-sm text-gray-900 border border-gray-200 hover:bg-gray-50 transition-colors">Cancel</button>
//           <button onClick={onConfirm} className="flex-1 py-3.5 rounded-xl font-semibold text-sm text-white bg-red-500 hover:bg-red-600 transition-colors">Delete Role</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ── Job Post Card ─────────────────────────────────────────────────────────────
// function JobPostCard({ post, onEdit, onDelete }) {
//   return (
//     <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-3 w-full max-w-[300px]">
//       <div className="flex flex-col gap-1">
//         <h3 className="text-base font-bold text-gray-900">{post.title}</h3>
//         <p className="text-sm text-gray-500 leading-relaxed">{post.description || post.overview}</p>
//       </div>
//       <div className="flex flex-col gap-1">
//         <p className="text-sm text-gray-700"><span className="font-bold">Pay Rate</span>{"  "}<span>{post.payRate}</span></p>
//         <p className="text-sm text-gray-700">
//           <span className="font-bold">Contract Type:</span>{"  "}
//           <span>{Array.isArray(post.contractTypes) ? post.contractTypes.join(", ") : post.contractType}</span>
//         </p>
//       </div>
//       <div className="flex flex-col gap-2 mt-1">
//         <button onClick={() => onEdit(post)} className="w-full py-2.5 rounded-xl font-semibold text-sm text-gray-900 hover:opacity-90 transition-colors" style={{ backgroundColor: AMBER }}>Edit Role</button>
//         <button onClick={() => onDelete(post)} className="w-full py-2.5 rounded-xl font-semibold text-sm text-gray-900 border border-gray-200 hover:bg-gray-50 transition-colors">Delete Role</button>
//       </div>
//     </div>
//   );
// }

// // ── Main Page ─────────────────────────────────────────────────────────────────
// export default function JobPostsPage() {
//   const [posts, setPosts]         = useState([]);
//   const [loading, setLoading]     = useState(true);
//   const [error, setError]         = useState(null);
//   const [showCreate, setShowCreate] = useState(false);
//   const [editPost, setEditPost]   = useState(null);
//   const [deletePost, setDeletePost] = useState(null);

//   const fetchPosts = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await jobPostsAPI.getAll();
//       const data = response.data?.data ?? response.data ?? [];
//       setPosts(Array.isArray(data) ? data : []);
//     } catch (err) {
//       setError("Failed to load job posts. Please try again.");
//       console.error("Job posts fetch error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { fetchPosts(); }, []);

//   const handleDelete = async () => {
//     try {
//       await jobPostsAPI.delete(deletePost.id);
//       setPosts((prev) => prev.filter((p) => p.id !== deletePost.id));
//     } catch (err) {
//       console.error("Delete job post error:", err);
//     } finally {
//       setDeletePost(null);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#fdf8f0]">
//       <div className="flex flex-col gap-6 px-4 sm:px-6 py-6 max-w-7xl mx-auto w-full">

//         <div className="flex items-center justify-between">
//           <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Job Posts</h1>
//           <button onClick={() => setShowCreate(true)}
//             className="px-5 py-2.5 rounded-xl font-semibold text-sm text-amber-600 border border-amber-400 bg-white hover:bg-amber-50 transition-colors whitespace-nowrap">
//             Create a job post
//           </button>
//         </div>

//         {loading && (
//           <div className="flex items-center justify-center py-20">
//             <Loader2 className="w-8 h-8 animate-spin text-amber-400" />
//             <span className="ml-3 text-sm text-gray-500">Loading job posts...</span>
//           </div>
//         )}

//         {error && !loading && (
//           <div className="flex flex-col items-center justify-center py-20 text-red-400">
//             <p className="text-sm font-medium">{error}</p>
//             <button onClick={fetchPosts} className="mt-3 px-4 py-2 bg-amber-400 text-gray-900 text-sm font-semibold rounded-xl hover:bg-amber-500 transition-colors">Retry</button>
//           </div>
//         )}

//         {!loading && !error && (
//           <div className="flex flex-wrap gap-4">
//             {posts.map((post) => (
//               <JobPostCard key={post.id} post={post} onEdit={setEditPost} onDelete={setDeletePost} />
//             ))}
//             {posts.length === 0 && (
//               <div className="flex items-center justify-center w-full py-20 text-gray-400">
//                 <p className="text-sm font-medium">No job posts yet. Create one to get started.</p>
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       {showCreate && <JobPostForm mode="create" onCancel={() => setShowCreate(false)} onSubmit={() => { setShowCreate(false); fetchPosts(); }} />}
//       {editPost   && <JobPostForm mode="edit" initialData={{ ...editPost, contractTypes: editPost.contractTypes || (editPost.contractType ? [editPost.contractType] : []), responsibilities: editPost.responsibilities || [], exclusions: editPost.exclusions || [], benefits: editPost.benefits || [], requirements: editPost.requirements || [], desirable: editPost.desirable || [], standards: editPost.standards || [] }} onCancel={() => setEditPost(null)} onSubmit={() => { setEditPost(null); fetchPosts(); }} />}
//       <DeleteConfirmModal isOpen={!!deletePost} onCancel={() => setDeletePost(null)} onConfirm={handleDelete} />
//     </div>
//   );
// }