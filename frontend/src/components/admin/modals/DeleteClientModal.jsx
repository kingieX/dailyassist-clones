export default function DeleteClientModal({ isOpen, onClose, onDeleteConfirmed, client = {} }) {
  if (!isOpen) return null;

  const handleDelete = () => {
    onClose();
    setTimeout(() => onDeleteConfirmed(), 300);
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40"
      style={{ padding: "16px" }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl text-center"
        style={{ width: "100%", maxWidth: "480px", padding: "40px 32px 32px 32px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#111827", marginBottom: "16px" }}>
          Delete client details?
        </h2>
        <p style={{ fontSize: "14px", color: "#6B7280", lineHeight: "1.6", marginBottom: "28px" }}>
          This action will permanently remove this client and all associated
          records from Daily Assist. This cannot be undone.
        </p>
        <div style={{ display: "flex", gap: "12px", width: "100%" }}>
          <button onClick={onClose}
            style={{ flex: 1, padding: "14px 0", borderRadius: "12px",
                     border: "2px solid #EF4444", background: "white",
                     color: "#EF4444", fontWeight: "600", fontSize: "14px", cursor: "pointer" }}>
            Cancel
          </button>
          <button onClick={handleDelete}
            style={{ flex: 1, padding: "14px 0", borderRadius: "12px",
                     border: "none", background: "#EF4444", color: "white",
                     fontWeight: "600", fontSize: "14px", cursor: "pointer" }}>
            Yes, Delete Permanently
          </button>
        </div>
      </div>
    </div>
  );
}