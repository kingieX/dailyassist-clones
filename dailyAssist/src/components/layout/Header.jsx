
import { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import {
  FiMail,
  FiPhone,
  FiMenu,
  FiX,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";
import {
  FaFacebookF,
  FaXTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa6";

// ─── Data ─────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
    dropdown: [
      { label: "Home-Help", href: "/services/HomeHelp" },
      { label: "Errands & Shopping", href: "/services/errands" },
      {
        label: "Welfare Check-Ins / Companionship",
        href: "/services/warfare",
      },
      {
        label: "Transport to Appointments",
        href: "/services/transport",
      },
      {
        label: "Light Gardening / Household Tasks",
        href: "/services/light",
      },
      {
        label: "Community Access Support",
        href: "/services/community",
      },
    ],
  },
  { label: "Pricing", href: "/pricing" },
  {
    label: "Packages",
    dropdown: [
      { label: "Book Standard Package", href: "/pricing/basic" },
      { label: "Book Weekly Home-Help Package", href: "/pricing/standard" },
      { label: "Book Welfare Check-In Package", href: "/pricing/premium" },
    ],
  },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "FAQs", href: "/faqs" },
];

const SOCIAL_LINKS = [
  { icon: FaFacebookF, href: "#", label: "Facebook" },
  { icon: FaXTwitter, href: "#", label: "X (Twitter)" },
  { icon: FaInstagram, href: "#", label: "Instagram" },
  { icon: FaLinkedinIn, href: "#", label: "LinkedIn" },
];

// ─── Top Bar ──────────────────────────────────────────────────────────────────

function TopBar() {
  return (
    <div className="hidden md:flex items-center justify-between px-6 lg:px-12 py-2 bg-[#fef9ec]">
      {/* Contact info */}
      <div className="flex items-center gap-5">
        <a
          href="mailto:Info@dailyassistuk.com"
          className="flex items-center gap-1.5 text-base font-medium text-[#3a3a3a] hover:text-[#c9a227] transition-colors duration-200"
        >
          <FiMail size={16} className="text-[#f5c045]" />
          Info@dailyassistuk.com
        </a>
        <a
          href="tel:01268904508"
          className="flex items-center gap-1.5 text-base font-medium text-[#3a3a3a] hover:text-[#c9a227] transition-colors duration-200"
        >
          <FiPhone size={16} className="text-[#f5c045]" />
          01268 904 508
        </a>
      </div>

      {/* Social icons */}
      <div className="flex items-center gap-2">
        {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
          <a
            key={label}
            href={href}
            aria-label={label}
            className="w-7 h-7 flex items-center justify-center rounded-md bg-[#f5c045] text-[#1a1a1a] hover:bg-[#e0aa2e] transition-colors duration-200"
          >
            <Icon size={13} />
          </a>
        ))}
      </div>
    </div>
  );
}

// ─── Desktop Dropdown ─────────────────────────────────────────────────────────

function DesktopDropdown({ items, onMouseEnter, onMouseLeave }) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50"
    >
      {items.map((item) => (
        <a
          key={item.label}
          href={item.href}
          className="block px-5 py-2.5 text-sm text-[#3a3a3a] font-medium hover:bg-gray-50 transition-colors duration-150"
        >
          {item.label}
        </a>
      ))}
    </div>
  );
}

// ─── Desktop Nav Link ─────────────────────────────────────────────────────────

function NavLink({ link, activeHref }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef(null);
  const isActive = activeHref === link.href;

  const openDropdown = () => {
    clearTimeout(closeTimer.current);
    setOpen(true);
  };

  const closeDropdown = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  };

  const baseClass = `text-base pb-0.5 border-b-2 transition-all duration-300 ${
    isActive
      ? "font-bold text-[#3a3a3a] border-[#f5c045]"
      : "font-medium text-[#3a3a3a] border-transparent hover:border-[#f5c045]"
  }`;

  if (link.dropdown) {
    return (
      <div
        className="relative"
        onMouseEnter={openDropdown}
        onMouseLeave={closeDropdown}
      >
        <div className="flex items-center gap-1">
          {/* Clicking label navigates to page */}
          <a href={link.href} className={baseClass}>
            {link.label}
          </a>
          {/* Clicking arrow toggles dropdown */}
          <button
            onClick={(e) => { e.stopPropagation(); setOpen((v) => !v); }}
            aria-label="Toggle dropdown"
            className="text-[#3a3a3a] transition-colors duration-200"
          >
            <FiChevronDown
              size={14}
              className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            />
          </button>
        </div>
        {open && (
          <DesktopDropdown
            items={link.dropdown}
            onMouseEnter={openDropdown}
            onMouseLeave={closeDropdown}
          />
        )}
      </div>
    );
  }

  return (
    <a href={link.href} className={baseClass}>
      {link.label}
    </a>
  );
}

// ─── Mobile Menu ──────────────────────────────────────────────────────────────

function MobileMenu({ isOpen, activeHref }) {
  const [openDropdown, setOpenDropdown] = useState(null);
  const toggleDropdown = (label) =>
    setOpenDropdown((prev) => (prev === label ? null : label));

  if (!isOpen) return null;

  return (
 <div className="md:hidden bg-white border-t border-gray-100 shadow-lg max-h-[80vh] overflow-y-auto">
      <nav className="flex flex-col px-5 py-4 gap-1">
        {NAV_LINKS.map((link) =>
          link.dropdown ? (
            <div key={link.label}>
              <button
                onClick={() => toggleDropdown(link.label)}
                className="w-full flex items-center justify-between py-4 text-base font-medium text-[#3a3a3a] hover:text-[#c9a227] transition-colors duration-150"
              >
                {link.label === "Packages" ? "Book Packages" : link.label}
                <FiChevronDown
                  size={18}
                  className={`text-[#c9a227] transition-transform duration-200 ${
                    openDropdown === link.label ? "rotate-180" : "-rotate-90"
                  }`}
                />
              </button>
              {openDropdown === link.label && (
                <div className="pl-4 pb-1 pt-1">
                  {link.dropdown.map((item) => (
                    
                      <a key={item.label}
                     href={item.href}
                      className="block py-2.5 text-sm text-[#555] hover:text-[#c9a227] transition-colors duration-150"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ) : (
            
             <a key={link.label}
              href={link.href}
              className={`py-4 text-base font-medium transition-colors duration-150 ${
                activeHref === link.href
                  ? "text-[#c9a227]"
                  : "text-[#3a3a3a] hover:text-[#c9a227]"
              }`}
            >
              {link.label}
            </a>
          )
        )}

        {/* Jobs Section */}
        <div className="mt-3">
          <div className="bg-[#fef3d0] px-2 py-3 rounded-sm">
            <p className="text-base font-semibold text-[#3a3a3a]">Jobs</p>
          </div>
          
           <a href="/Job"
            className="flex items-center justify-between py-4 text-base font-medium text-[#3a3a3a] hover:text-[#c9a227] transition-colors duration-150"
          >
            Apply for Jobs
            <span className="bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
              Apply now!
            </span>
          </a>
        </div>

        {/* Staff Section */}
        <div>
          <div className="bg-[#fef3d0] px-2 py-3 rounded-sm">
            <p className="text-base font-semibold text-[#3a3a3a]">Staff</p>
          </div>
          
           <a href="/staff-login"
            className="flex items-center justify-between py-4 text-base font-medium text-[#3a3a3a] hover:text-[#c9a227] transition-colors duration-150"
          >
            Login
            <span className="bg-[#f5c045] text-[#1a1a1a] text-xs font-semibold px-3 py-1 rounded-full">
              Staff only!
            </span>
          </a>
        </div>

        {/* Follow us */}
        <div className="bg-[#f5c045] rounded-lg px-4 py-3 flex items-center justify-between mt-3">
          <p className="text-base font-semibold text-[#1a1a1a]">Follow us:</p>
          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
              <a key={label} href={href} aria-label={label} className="text-[#1a1a1a] hover:opacity-70 transition-opacity">
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

      </nav>
    </div>
  );
}

// ─── Main Header Export ───────────────────────────────────────────────────────

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const { pathname } = useLocation();
  const activeHref = pathname;

  return (
    <header className="w-full sticky top-0 z-50">
      {/* Section 1 — Top Bar */}
      <TopBar />

     {/* Section 2 — Main Navigation */}
      <div className=" bg-white shadow-md md:rounded-b-[90px]">
        <div className="flex items-center justify-between px-6 lg:px-12 py-4">

          {/* Logo + Brand name */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <img
              src="/Images/Logo/Daily Assist Logos/LOGO-MAIN.png"
              loading="lazy" alt="Daily Assist UK logo"
              width={48}
              height={48}
              className="w-12 object-cover "
            />
            <div className="leading-tight">
               <img
              src="/Images/Logo/Daily Assist Logos/Text Logo - No Bg Black.png"
              loading="lazy" alt="Daily Assist UK logo"
              width={48}
              height={48}
              className="w-[150px] object-cover "
            />
              <p className="text-xs italic text-black-400 font-normal">
                Support you can trust, care you can feel
              </p>
            </div>
          </div>


          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-7">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.label} link={link} activeHref={activeHref} />
            ))}
          </nav>

          {/* Desktop CTA button */}
          <div className="hidden md:flex flex-shrink-0">
            <a
              href="/contact"
              className="flex items-center gap-2 bg-[#f5c045] hover:bg-[#e0aa2e] text-[#1a1a1a] font-semibold text-sm rounded-lg px-5 py-2.5 transition-colors duration-200 whitespace-nowrap"
            >
              <FiPhone size={15} />
              Book a Free Consultation
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
      className="md:hidden p-3 rounded-xl bg-[#fcebc5] hover:bg-[#f5c045] transition-colors duration-150"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileOpen}
          >
         {mobileOpen ? <FiX size={22} className="text-[#3a3a3a]" /> : <FiMenu size={22} className="text-[#3a3a3a]" />}
          </button>
        </div>

        {/* Mobile menu panel */}
        <MobileMenu isOpen={mobileOpen} activeHref={activeHref} />
      </div>
    </header>
  );
}