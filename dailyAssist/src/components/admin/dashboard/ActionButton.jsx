import { useState } from "react";

export default function ActionButton({ icon: Icon, label, color, onClick, size = "md" }) {  const [hovered, setHovered] = useState(false);

  const colors = {
    blue:   { bg: "bg-blue-50",   border: "border-blue-200",   text: "text-blue-500",   hover: "hover:bg-blue-100"   },
    yellow: { bg: "bg-amber-50",  border: "border-amber-200",  text: "text-amber-500",  hover: "hover:bg-amber-100"  },
    green:  { bg: "bg-green-50",  border: "border-green-200",  text: "text-green-500",  hover: "hover:bg-green-100"  },
    gray:   { bg: "bg-gray-50",   border: "border-gray-200",   text: "text-gray-600",   hover: "hover:bg-gray-100"   },
  };

  const c = colors[color] ?? colors.gray;

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`
        flex items-center gap-2
        ${c.bg} ${c.border} border rounded-xl
        ${c.hover}
        overflow-hidden
        transition-all duration-300 ease-in-out
        ${hovered ? "w-52 px-6" : "w-16 px-0 justify-center"}
        ${size === "lg" ? "h-14" : "h-12"}
      `}
    >
<Icon className={`${size === "lg" ? "w-6 h-6" : "w-5 h-5"} flex-shrink-0 ${c.text}`} />      <span
        className={`text-sm font-medium whitespace-nowrap ${c.text}
                    transition-all duration-300
                    ${hovered ? "opacity-100 w-auto" : "opacity-0 w-0"}`}
      >
        {label}
      </span>
    </button>
  );
}