import { useEffect } from "react";
import {
  X,
  Home,
  Users,
  MessageSquare,
  UserCircle,
  BookOpen,
  LogOut,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";

const navItems = [
  { id: "home",    label: "Home",    icon: Home           },
  { id: "visits",  label: "Visit",   icon: Users          },
  { id: "message", label: "Message", icon: MessageSquare, badge: 1 },
  { id: "profile", label: "Profile", icon: UserCircle     },
];

const secondaryItems = [
  { label: "Code of Conduct", icon: BookOpen, href: "/code-of-conduct" },
  { label: "Log out",         icon: LogOut,  href: "/staff-login"      },
];

export default function MobileSidebar({ isOpen, onClose, activeSection, setActiveSection }) {

  /* Close on ESC key */
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  /* Prevent body scroll when open */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      {/* ── Backdrop ── */}
      <div
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity duration-300
                    ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      {/* ── Sidebar drawer ── */}
     <div
        className={`fixed top-0 left-0 h-full w-full z-50 flex flex-col
                    bg-white shadow-xl overflow-y-auto
                    transform transition-transform duration-300 ease-in-out
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >

        {/* ── Logo + close ── */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-1.5">
            <img
              src="/Images/Logo/Daily Assist Logos/LOGO-MAIN.png"
              loading="lazy" alt="Daily Assist UK logo"
              className="w-9 object-contain"
            />
            <div className="leading-tight">
              <img
                src="/Images/Logo/Daily Assist Logos/Text Logo - No Bg Black.png"
                loading="lazy" alt="Daily Assist UK text"
                className="w-[120px] object-contain"
              />
              <p className="text-[10px] text-gray-400 italic mt-0.5">
                "Support you can trust, care you can feel"
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close sidebar"
            className="w-9 h-9 rounded-xl bg-[#F3E2B3] hover:bg-[#e7c98a]
                       flex items-center justify-center flex-shrink-0
                       transition-colors duration-200"
          >
            <X className="w-4 h-4 text-gray-700" />
          </button>
        </div>

        {/* ── Main nav ── */}
        <nav className="flex flex-col gap-1 px-4 pt-5 flex-1">
          {navItems.map(({ id, label, icon: Icon, badge }) => {
            const isActive = activeSection === id;
            return (
              <button
                key={id}
                onClick={() => { setActiveSection(id); onClose(); }}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl
                            text-base font-medium w-full text-left
                            transition-all duration-200
                            ${isActive
                              ? "bg-amber-50 text-gray-900 font-semibold"
                              : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                            }`}
              >
                <Icon className={`w-5 h-5 flex-shrink-0
                                  ${isActive ? "text-amber-500" : "text-gray-500"}`} />
                <span className="flex-1">{label}</span>
                {badge && (
                  <span className="text-sm font-semibold text-gray-500">{badge}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* ── Divider + secondary nav ── */}
        <div className="px-4 pb-4">
          <div className="border-t border-gray-200 my-4" />
          {secondaryItems.map(({ label, icon: Icon, href }) => (
            <a
              key={label}
              href={href}
              className="flex items-center gap-3 px-3 py-3 rounded-xl
                         text-base font-medium text-gray-700
                         hover:bg-gray-50 hover:text-gray-900
                         transition-all duration-200"
            >
              <Icon className="w-5 h-5 text-gray-500 flex-shrink-0" />
              <span>{label}</span>
            </a>
          ))}
        </div>
{/* ── Social footer ── */}
        <div className="bg-[#E7B343] px-5 py-3 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-900">Follow us:</span>
          <div className="flex items-center gap-3">
            <a href="#" aria-label="Facebook">
              <Facebook className="w-4 h-4 text-gray-900 hover:opacity-70 transition-opacity" />
            </a>
            {/* X / Twitter */}
            <a href="#" aria-label="X">
              <svg className="w-4 h-4 text-gray-900 hover:opacity-70 transition-opacity"
                   viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="#" aria-label="Instagram">
              <Instagram className="w-4 h-4 text-gray-900 hover:opacity-70 transition-opacity" />
            </a>
            <a href="#" aria-label="LinkedIn">
              <Linkedin className="w-4 h-4 text-gray-900 hover:opacity-70 transition-opacity" />
            </a>
            <a href="#" aria-label="YouTube">
              <Youtube className="w-4 h-4 text-gray-900 hover:opacity-70 transition-opacity" />
            </a>
          </div>
       </div>

        {/* ── Tap to close ── */}
        <div
          className="bg-black/80 py-6 flex flex-col items-center gap-1 cursor-pointer"
          onClick={onClose}
        >
          <button
            className="w-11 h-11 rounded-full bg-gray-600/90
                       flex items-center justify-center shadow-md"
            aria-label="Tap to close"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          <span className="text-xs text-white font-medium">Tap to close</span>
        </div>

      </div>
    </>
  );
}