import { Calendar, Users, CheckCircle, AlertCircle } from "lucide-react";

const themes = {
  blue: {
    cardBg:   "bg-white",
    headerBg: "bg-[#dde8f0]",
    value:    "text-[#4A7FB1]",
    icon:     "text-[#4A7FB1]",
  },
  yellow: {
    cardBg:   "bg-white",
    headerBg: "bg-[#fef3d0]",
    value:    "text-[#c8860a]",
    icon:     "text-[#c8860a]",
  },
  green: {
    cardBg:   "bg-white",
    headerBg: "bg-[#d8f0e4]",
    value:    "text-[#2e8a57]",
    icon:     "text-[#2e8a57]",
  },
  red: {
    cardBg:   "bg-white",
    headerBg: "bg-[#fde8e8]",
    value:    "text-[#c0392b]",
    icon:     "text-[#c0392b]",
  },
};

const icons = {
  calendar: Calendar,
  users:    Users,
  check:    CheckCircle,
  alert:    AlertCircle,
};

export default function SummaryCard({ title, value, theme, icon, image }) {
  const t = themes[theme] ?? themes.blue;
  const Icon = icons[icon] ?? Calendar;

  return (
    <div className={`relative rounded-2xl shadow-sm overflow-hidden
                     flex flex-col ${t.cardBg}
                     hover:scale-105 hover:shadow-md
                     transition-all duration-200 cursor-pointer`}>

      {/* ── Top header section ── */}
      <div className={`${t.headerBg} flex items-center gap-2 px-4 py-3`}>
        <Icon className={`w-5 h-5 flex-shrink-0 ${t.icon}`} />
        <p className="text-sm font-medium text-gray-700">{title}</p>
      </div>

      {/* ── Bottom value section ── */}
      <div className="flex items-center justify-center py-6 px-4 relative min-h-[90px] bg-white">
        <p className={`text-5xl font-semibold z-10 ${t.value}`}>{value}</p>

       {/* Decorative image bottom right */}
        <div className="absolute -bottom-2 -right-2 w-20 h-20 opacity-90">
          {image ? (
            <img
              src={image}
              alt=""
              className="w-full h-full object-contain"
            />
          ) : (
            <svg viewBox="0 0 80 80" className="w-20 h-20" fill="none">
              <rect x="8" y="16" width="64" height="56" rx="8"
                    fill={theme === "blue" ? "#93c5fd" : theme === "yellow" ? "#fcd34d" : theme === "green" ? "#6ee7b7" : "#fca5a5"}/>
              <rect x="8" y="16" width="64" height="20" rx="8"
                    fill={theme === "blue" ? "#60a5fa" : theme === "yellow" ? "#f59e0b" : theme === "green" ? "#34d399" : "#f87171"}/>
              <rect x="24" y="8" width="6" height="18" rx="3"
                    fill={theme === "blue" ? "#3b82f6" : theme === "yellow" ? "#d97706" : theme === "green" ? "#10b981" : "#ef4444"}/>
              <rect x="50" y="8" width="6" height="18" rx="3"
                    fill={theme === "blue" ? "#3b82f6" : theme === "yellow" ? "#d97706" : theme === "green" ? "#10b981" : "#ef4444"}/>
              <rect x="18" y="46" width="8" height="8" rx="2" fill="white" opacity="0.7"/>
              <rect x="36" y="46" width="8" height="8" rx="2" fill="white" opacity="0.7"/>
              <rect x="54" y="46" width="8" height="8" rx="2" fill="white" opacity="0.7"/>
              <rect x="18" y="58" width="8" height="8" rx="2" fill="white" opacity="0.7"/>
              <rect x="36" y="58" width="8" height="8" rx="2" fill="white" opacity="0.7"/>
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}