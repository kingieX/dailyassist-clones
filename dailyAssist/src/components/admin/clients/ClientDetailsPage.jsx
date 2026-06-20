import { useState } from "react";
import { ArrowLeft, Eye, Download, FileText, Clock, Edit2, Trash2 } from "lucide-react";
import EditClientModal from "../modals/EditClientModal";
import DeleteClientModal from "../modals/DeleteClientModal";
import CheckInSuccessModal from "../../modals/CheckInSuccessModal";
import ClientHistoryPage from "./ClientHistoryPage";

// Mock uploaded documents
const mockDocuments = {
  default: [
    { type: "doc", title: "Document title", date: "February 24, 2026", size: "2.4 MB" },
  ],
};

function getDocuments(clientId) {
  return mockDocuments[clientId] ?? mockDocuments.default;
}

// Read-only field
function Field({ label, value, required, placeholder }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-700">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <div className="w-full border border-gray-200 rounded-xl px-4 py-3
                      text-sm text-gray-800 bg-white min-h-[48px]">
        {value || <span className="text-gray-400">{placeholder ?? "—"}</span>}
      </div>
    </div>
  );
}

// Editable field
function EditableField({ label, value, onChange, placeholder, required }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-700">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-gray-200 rounded-xl px-4 py-3
                   text-sm text-gray-800 outline-none focus:ring-2
                   focus:ring-blue-200 bg-white"
      />
    </div>
  );
}

export default function ClientDetailsPage({ client, onBack }) {
  const docs = getDocuments(client.id);

  // Emergency contact state
  const [contactName, setContactName]   = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [relationship, setRelationship] = useState("");
  const [note, setNote] = useState(
    "Provided home-help support during the scheduled visit, including light cleaning and general assistance. Client was calm and in good spirits throughout the visit. No concerns observed, and the home environment was safe and tidy. No follow-up actions required at this time."
  );

  // Modal state
  const [showEdit, setShowEdit]                   = useState(false);
  const [showDelete, setShowDelete]               = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  const [showHistory, setShowHistory]             = useState(false);

  // Compute age from dob
  const age = client.dob
    ? Math.floor((new Date() - new Date(client.dob)) / (365.25 * 24 * 60 * 60 * 1000))
    : "—";

  // Show history page
  if (showHistory) return (
    <ClientHistoryPage
      client={client}
      onBack={() => setShowHistory(false)}
    />
  );

  return (
    <>
      <div className="flex flex-col gap-6 px-4 sm:px-6 py-5 max-w-4xl mx-auto w-full">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-800 font-bold text-lg
                       hover:text-gray-600 transition-colors w-fit"
          >
            <ArrowLeft className="w-5 h-5" />
            Client's details
          </button>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setShowHistory(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm
                         font-semibold text-white transition-colors hover:opacity-90"
             style={{ backgroundColor: "#669369", opacity: 0.85 }}
            >
              <Clock className="w-4 h-4" />
              Visitation Histories
            </button>
            <button
              onClick={() => setShowEdit(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm
                         font-semibold border border-gray-300 text-gray-700
                         hover:bg-gray-50 transition-colors"
            >
              <Edit2 className="w-4 h-4" />
              Edit client
            </button>
            <button
              onClick={() => setShowDelete(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm
                         font-semibold border border-red-400 text-red-500
                         hover:bg-red-50 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Delete client
            </button>
          </div>
        </div>

        {/* ── Main form card ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm
                        p-6 sm:p-8 flex flex-col gap-6">

          {/* Title */}
          <div className="w-24">
            <Field label="Title" value={client.title ?? "Mrs."} />
          </div>

          {/* First Name + Last Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="First Name" value={client.firstName ?? ""} />
            <Field label="Last Name"  value={client.lastName  ?? ""} />
          </div>

          {/* Email + Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Email Address" value={client.email ?? ""} />
            <Field label="Phone Number"  value={client.phone ?? ""} />
          </div>

          {/* Age + Sex */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Age" value={String(age)} />
            <Field label="Sex" value={client.sex ?? "Female"} />
          </div>

          {/* Address */}
          <Field
            label="Address"
            value={client.address ?? ""}
            required
          />

          {/* Emergency Contact section */}
          <div className="flex flex-col gap-4">
            <p className="text-sm font-bold text-gray-900">Emergency Contact</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <EditableField
                label="Contact Name"
                value={contactName}
                onChange={setContactName}
                placeholder="Name"
              />
              <EditableField
                label="Contact Phone Number"
                value={contactPhone}
                onChange={setContactPhone}
                placeholder="(123) 456 - 789"
              />
            </div>

            <EditableField
              label="Relationship"
              value={relationship}
              onChange={setRelationship}
              placeholder="e.g., Daughter, Son, Friend...."
            />
          </div>

          {/* Any Relevant Note */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-gray-900">Any Relevant Note</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={5}
              className="w-full border border-gray-200 rounded-xl px-4 py-3
                         text-sm text-gray-700 outline-none focus:ring-2
                         focus:ring-blue-200 resize-none"
            />
          </div>
        </div>

        {/* ── Documents card ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
          <p className="text-sm font-bold text-gray-800 mb-4">
            Client's uploaded Documents/images
          </p>
          <div className="flex flex-col gap-3">
            {docs.map((doc, i) => (
              <div
                key={i}
                className="flex items-center gap-3 border border-gray-100
                           rounded-xl px-4 py-3"
              >
                <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center
                                justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-amber-500" />
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">
                    {doc.title}
                  </p>
                  <p className="text-xs text-gray-400">{doc.date} • {doc.size}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                                     border border-amber-300 text-amber-600 text-xs
                                     font-medium hover:bg-amber-50 transition-colors">
                    <Eye className="w-3.5 h-3.5" />
                    View
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                                     border border-amber-300 text-amber-600 text-xs
                                     font-medium hover:bg-amber-50 transition-colors">
                    <Download className="w-3.5 h-3.5" />
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Modals ── */}
      <EditClientModal
        isOpen={showEdit}
        onClose={() => setShowEdit(false)}
        client={client}
      />

      <DeleteClientModal
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        onDeleteConfirmed={() => setShowDeleteSuccess(true)}
        client={client}
      />

      <CheckInSuccessModal
        isOpen={showDeleteSuccess}
        onClose={() => {
          setShowDeleteSuccess(false);
          onBack();
        }}
        buttonText="Back to Clients Page"
      />
    </>
  );
}