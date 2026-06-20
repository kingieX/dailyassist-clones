import { useState } from "react";
import { Trash2, Send, Calendar } from "lucide-react";
import { messagesData } from "../../data/messagesData";


/* ── Icons per message type ── */
function MessageIcon({ type, active }) {
  const base = `w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0`;

  if (type === "megaphone") {
    return (
      <div className={`${base} ${active ? "bg-blue-100" : "bg-gray-100"}`}>
        <svg className={`w-5 h-5 ${active ? "text-blue-500" : "text-gray-500"}`}
             fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round"
                d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"/>
        </svg>
      </div>
    );
  }
  if (type === "headset") {
    return (
      <div className={`${base} ${active ? "bg-orange-100" : "bg-gray-100"}`}>
        <svg className={`w-5 h-5 ${active ? "text-orange-400" : "text-gray-500"}`}
             fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round"
                d="M3 18v-6a9 9 0 0118 0v6"/>
          <path strokeLinecap="round" strokeLinejoin="round"
                d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"/>
        </svg>
      </div>
    );
  }
  // bell
  return (
    <div className={`${base} ${active ? "bg-blue-100" : "bg-gray-100"}`}>
      <svg className={`w-5 h-5 ${active ? "text-blue-500" : "text-gray-500"}`}
           fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
      </svg>
    </div>
  );
}

/* ── Chat View ── */
function ChatView({ message }) {
  const [reply, setReply] = useState("");

  return (
    <div className="flex flex-col gap-4">
      {/* Chat card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">

        {/* Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-gray-200 mb-4">
          <div className="w-10 h-10 rounded-full bg-[#F3E2B3] flex items-center
                          justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round"
                    d="M3 18v-6a9 9 0 0118 0v6"/>
              <path strokeLinecap="round" strokeLinejoin="round"
                    d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"/>
            </svg>
          </div>
          <p className="text-lg font-semibold text-gray-900">
            Chat with {message.sender}
          </p>
        </div>

        {/* Chat bubbles */}
        <div className="flex flex-col gap-4">
          {message.chatMessages.map((msg) => {
            const isManager = msg.from === "manager";
            return (
              <div key={msg.id}
                   className={`flex gap-3 ${isManager ? "justify-start" : "justify-end"}`}>

                {/* Manager avatar */}
                {isManager && (
                  <div className="w-9 h-9 rounded-full bg-[#F3E2B3] flex items-center
                                  justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-gray-700" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round"
                            d="M3 18v-6a9 9 0 0118 0v6"/>
                      <path strokeLinecap="round" strokeLinejoin="round"
                            d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"/>
                    </svg>
                  </div>
                )}

                <div className={`flex flex-col ${isManager ? "items-start" : "items-end"}`}>
                  {/* Bubble */}
                  <div className={`rounded-2xl px-4 py-3 max-w-sm sm:max-w-md text-sm
                                   leading-relaxed flex flex-col gap-2
                                   ${isManager
                                     ? "bg-gray-100 text-gray-800"
                                     : "bg-[#243B53] text-white"
                                   }`}>
                    {msg.paragraphs.map((para, i) => (
                      <p key={i} dangerouslySetInnerHTML={{ __html: para }} />
                    ))}
                  </div>

                  {/* Timestamp */}
                  <div className={`flex items-center gap-1 mt-1
                                   ${isManager ? "justify-start" : "justify-end"}`}>
                    {!isManager && (
                      <svg className="w-3.5 h-3.5 text-green-500" fill="none"
                           viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                      </svg>
                    )}
                    <span className="text-xs text-gray-400">
                      {msg.sender} • {msg.time}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reply bar */}
      <ReplyBox />
    </div>
  );
}

/* ── Acknowledge button ── */
function AcknowledgeButton() {
  const [acknowledged, setAcknowledged] = useState(false);
  return (
    <button
      onClick={() => setAcknowledged(true)}
      className="w-full mt-5 py-3.5 rounded-xl font-semibold text-base
                 flex items-center justify-center gap-2
                 bg-[#e7b343] hover:bg-[#d4a030] text-gray-900
                 transition-all duration-300"
    >
      Click to Acknowledge
      {acknowledged && (
        <svg className="w-5 h-5 text-gray-900" fill="none" viewBox="0 0 24 24"
             stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
        </svg>
      )}
      
    </button>
  );
}

/* ── Reply box ── */
function ReplyBox() {
  const [reply, setReply] = useState("");
  return (
    <div className="bg-white rounded-2xl border border-gray-200 px-4 py-3
                    flex gap-3 items-center shadow-sm">
      <input
        type="text"
        value={reply}
        onChange={(e) => setReply(e.target.value)}
        placeholder="Reply..."
        className="flex-1 border border-gray-300 rounded-xl px-4 py-2.5
                   text-sm text-gray-700 outline-none
                   focus:ring-2 focus:ring-[#e7b343]/50
                   focus:border-[#e7b343]"
      />
      <button
        className="flex items-center gap-2 bg-[#e7b343] hover:bg-[#d4a030]
                   text-gray-900 font-semibold text-sm px-4 py-2.5
                   rounded-xl transition-all duration-200 whitespace-nowrap"
      >
        <Send className="w-4 h-4" />
        Send
      </button>
    </div>
  );
}

export default function MessageSection({ onNavigateToVisits }) {
  const [messages, setMessages]     = useState(messagesData);
  const [selected, setSelected]     = useState(messagesData[2]); // Reminder selected by default

  const handleSelect = (msg) => {
  setSelected(msg);
  setMessages((prev) =>
    prev.map((m) => m.id === msg.id ? { ...m, isNew: false } : m)
  );
};
  const handleDelete = () => {
    if (!selected) return;
    const remaining = messages.filter((m) => m.id !== selected.id);
    setMessages(remaining);
    setSelected(remaining[0] ?? null);
  };

  return (
    <div className="flex flex-col gap-4 px-4 sm:px-6 py-6 max-w-5xl mx-auto w-full">

      {/* ── Page header ── */}
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-xl font-bold text-gray-900">All Messages</h1>
        {selected && (
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700 transition-colors duration-200"
            aria-label="Delete message"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* ── Two-column layout ── */}
      <div className="flex flex-col lg:flex-row gap-4">

        {/* ── Left: message list ── */}
        <div className="flex flex-col gap-3 lg:w-[420px] flex-shrink-0">
          {messages.length === 0 && (
            <p className="text-sm text-gray-400 text-center py-10">No messages</p>
          )}
          {messages.map((msg) => {
            const isActive = selected?.id === msg.id;
            return (
              <button
                key={msg.id}
              onClick={() => handleSelect(msg)}
                className={`w-full text-left bg-white rounded-2xl border px-4 py-4
                            flex items-start gap-3 transition-all duration-200
                            ${isActive
                              ? "border-[#f5c045] shadow-[0_0_0_1px_#f5c045]"
                              : "border-gray-200 hover:border-[#f5c045] hover:shadow-[0_0_0_1px_#f5c045]"
                            }`}
              >
                <MessageIcon type={msg.icon} active={isActive} />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-bold text-gray-900 truncate">{msg.sender}</p>
                    <span className="text-xs text-gray-400 flex-shrink-0">{msg.time}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2 mt-0.5">
                    <p className="text-xs text-gray-500 truncate">{msg.subject}</p>
                    {/* Green dot — only for new messages */}
                    {msg.isNew && (
                      <span className="w-2.5 h-2.5 bg-green-500 rounded-full flex-shrink-0" />
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* ── Divider (desktop only) ── */}
        <div className="hidden lg:block w-px bg-gray-200 mx-2" />

      {/* ── Right: message detail ── */}
        <div className="flex-1 flex flex-col min-h-0">
         {selected ? selected.type === "chat" ? (
            <ChatView message={selected} />
          ) : selected.type === "reminder" ? (
            <div className="flex flex-col gap-4">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
                <div className="flex items-start gap-4 mb-5">
                  <MessageIcon type={selected.icon} active={true} />
                  <div>
                    <p className="text-lg font-semibold text-gray-900">{selected.subject}</p>
                    <p className="text-sm text-gray-500">From: {selected.from}</p>
                    <p className="text-sm text-gray-500">Sent: {selected.sent}</p>
                  </div>
                </div>
                <div className="bg-gray-100 rounded-xl p-4 text-sm text-gray-700 leading-relaxed">
                  <p>{selected.body}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4">

              {/* ── Main message card ── */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">

                {/* Header */}
                <div className="flex items-start gap-4 mb-5">
                  <MessageIcon type={selected.icon} active={true} />
                  <div>
                    <p className="text-lg font-semibold text-gray-900">{selected.subject}</p>
                    <p className="text-sm text-gray-500">From: {selected.from}</p>
                    <p className="text-sm text-gray-500">Sent: {selected.sent}</p>
                  </div>
                </div>

               {/* Body */}
<div className="bg-gray-100 rounded-xl p-4 sm:p-5 text-sm text-gray-700
                leading-relaxed flex flex-col gap-3">

  {/* Greeting */}
  {selected.greeting && <p>{selected.greeting}</p>}

  {/* Main body text */}
  {selected.body && <p>{selected.body}</p>}

  {/* Instruction list — only if exists */}
  {selected.instructions?.length > 0 && (
    <div>
      <p className="mb-2">Please review your assigned visits for today to confirm:</p>
      <ul className="list-disc list-inside space-y-1 pl-2">
        {selected.instructions.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  )}

  {/* Closing */}
  {selected.closing && <p>{selected.closing}</p>}

  {/* Visits card — only for rota type messages */}
  {selected.type === "rota" && selected.visitsCard && (
    <div className="bg-[#fef9ec] rounded-xl p-4 border border-gray-300/30">
      <p className="font-semibold text-gray-900 mb-1">{selected.visitsCard.title}</p>
      <p className="text-sm text-gray-600 mb-1">{selected.visitsCard.count}</p>
      <p className="text-sm text-gray-700 mb-3">
        First visit: <strong>{selected.visitsCard.firstVisit}</strong>
        <span className="mx-2 text-gray-400">|</span>
        Last visit: <strong>{selected.visitsCard.lastVisit}</strong>
      </p>
      <div className="flex flex-col sm:flex-row gap-2">
        <button
          onClick={onNavigateToVisits}
          className="flex items-center justify-center gap-2
                     bg-[#e7b343] hover:bg-[#d4a030] text-gray-900
                     font-medium text-sm px-4 py-2 rounded-lg
                     transition-all duration-200"
        >
          <Calendar className="w-4 h-4 text-gray-900" />
          View Today's Visits
        </button>
        <button
          onClick={() => setSelected(messages.find(m => m.id === 2))}
          className="flex items-center justify-center gap-2
                     border border-[#e7b343] text-gray-800
                     font-medium text-sm px-8 py-2 rounded-lg
                     transition-all duration-200 hover:bg-[#fef3d0]"
        >
          Message Office
        </button>
      </div>
    </div>
  )}
</div>

                {/* Acknowledge button */}
                <AcknowledgeButton />
              </div>
{/* Reply bar */}
              <ReplyBox />
            </div>
          ) : (
            <div className="flex items-center justify-center h-48 bg-white
                            rounded-2xl border border-gray-200">
              <p className="text-sm text-gray-400">Select a message to read</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}