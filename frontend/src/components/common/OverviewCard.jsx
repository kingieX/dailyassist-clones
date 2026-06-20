const themeMap = {
  blue: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    value: "text-blue-500",
  },
  green: {
    bg: "bg-green-50",
    border: "border-green-200",
    value: "text-green-500",
  },
  yellow: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    value: "text-amber-400",
  },
  gray: {
    bg: "bg-gray-100",
    border: "border-gray-200",
    value: "text-gray-800",
  },
};

const MilesIcon = () => (
  <svg className="w-8 h-8 text-gray-700 mx-auto mb-1" viewBox="0 0 24 24"
       fill="none" stroke="currentColor" strokeWidth="1.8"
       strokeLinecap="round" strokeLinejoin="round">
    <circle cx="6"  cy="18" r="2" fill="currentColor" stroke="none"/>
    <circle cx="18" cy="6"  r="2" fill="currentColor" stroke="none"/>
    <path d="M6 16 C6 10 10 10 12 12 C14 14 18 14 18 8"/>
  </svg>
);

const OverviewCard = ({ label, value, theme, icon }) => {
  const styles = themeMap[theme] || themeMap.gray;

  return (
    <div className={`flex-1 rounded-2xl border ${styles.bg} ${styles.border} px-5 py-6 flex flex-col items-center justify-center text-center min-h-[140px]`}>
      {icon && <MilesIcon />}
      <p className="text-lg text-gray-800 font-medium mb-2">{label}</p>
     <p className={`${theme === "gray" ? "text-xl font-bold" : "text-5xl font-bold"} ${styles.value}`}>{value}</p>
    </div>
  );
};

export default OverviewCard;