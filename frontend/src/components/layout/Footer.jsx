import { useState } from "react";
import { Link } from "react-router-dom";

import {
  FiShield, FiUsers, FiBookOpen, FiCheckCircle, FiHeart,
} from "react-icons/fi";

const FEATURES = [
  { icon: FiShield,      color: "text-blue-400",   label: "Fully Insured" },
  { icon: FiUsers,       color: "text-green-400",  label: "Safeguarding" },
  { icon: FiBookOpen,    color: "text-yellow-400", label: "Training" },
  { icon: FiCheckCircle, color: "text-blue-500",   label: "Enhanced DBS-Checked Staff" },
  { icon: FiHeart,       color: "text-yellow-400", label: "Locally Based Team" },
];

const SERVICES = [
  { label: "Home-Help",                         href: "/services/home-help" },
  { label: "Errands & Shopping",                href: "/services/errands" },
  { label: "Welfare Check-Ins & Companionship", href: "/services/warfare" },
  { label: "Transport to Appointments",         href: "/services/transport" },
  { label: "Light Gardening & Practical Tasks", href: "/services/light" },
  { label: "Community Access Support",          href: "/services/community" },
];

const COMPANY = [
  { label: "Who we are",               href: "/about" },
  { label: "Mission & Vision",         href: "/about#mission" },
  { label: "Pricing",                  href: "/pricing" },
  { label: "Why choose Daily Assist?", href: "/about#why" },
  { label: "How it works",             href: "/about#how" },
  { label: "Service areas",            href: "/about#areas" },
  { label: "FAQs",                     href: "/faqs" },
  { label: "Contact us",               href: "/contact" },
];

function FooterLink({ href, children }) {
  return (
    <a href={href} className="block text-sm text-gray-300 hover:text-[#f5c045] transition-colors duration-300 cursor-pointer">
      {children}
    </a>
  );
}

function BrandColumn() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    setEmail("");
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 bg-transparent flex-shrink-0">
          <img src="/Images/Logo/Daily Assist Logos/LOGO-MAIN.png" loading="lazy" alt="Daily Assist UK logo" className="w-full h-full object-contain" />
        </div>
        <div className="leading-tight">
             <img
              src="/Images/Logo/Daily Assist Logos/Text Logo - No Bg White.png"
              loading="lazy" alt="Daily Assist UK logo"
              width={48}
              height={48}
              className="w-20 object-cover "
            />
          <p className="text-xs italic text-gray-400 mt-0.5">
            "Support you can trust, care you can feel"
          </p>
        </div>
      </div>

      <ul className="space-y-3">
        {FEATURES.map(({ icon: Icon, color, label }) => (
          <li key={label} className="flex items-center gap-2.5">
            <Icon size={16} className={`${color} flex-shrink-0`} />
            <span className="text-sm text-gray-300">{label}</span>
          </li>
        ))}
      </ul>

      <div className="mt-2">
        <p className="text-sm text-gray-300 mb-4 leading-relaxed">
          Be the first to receive all the recent updates, articles, and valuable materials.
        </p>
        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            required
            className="flex-1 bg-gray-200 text-gray-800 placeholder-gray-500 text-sm rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#f5c045]"
          />
          <button
            type="submit"
            className="bg-[#f5c045] hover:brightness-95 text-black font-semibold text-sm rounded-md px-6 py-3 transition duration-300 whitespace-nowrap"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
}

function ServicesColumn() {
  return (
    <div>
      <h3 className="text-white font-semibold text-base mb-5">Our Services</h3>
      <ul className="space-y-3">
        {SERVICES.map(({ label, href }) => (
          <li key={label}><FooterLink href={href}>{label}</FooterLink></li>
        ))}
      </ul>
    </div>
  );
}

function CompanyColumn() {
  return (
    <div>
      <h3 className="text-white font-semibold text-base mb-5">Our Company</h3>
      <ul className="space-y-3">
        {COMPANY.map(({ label, href }) => (
          <li key={label}><FooterLink href={href}>{label}</FooterLink></li>
        ))}
      </ul>
    </div>
  );
}

function StaffColumn() {
  return (
    <div>
      <h3 className="text-white font-semibold text-base mb-4">Staff</h3>
      <div className="flex items-center gap-2 mb-6">
        <a href="/staff-login" className="text-sm text-gray-300 hover:text-[#f5c045] transition-colors duration-300">
          Login
        </a>
        <span className="bg-[#f5c045] text-black text-xs font-semibold px-3 py-1 rounded-full">
          Staff only!
        </span>
      </div>

      <h3 className="text-white font-semibold text-base mb-3">Jobs</h3>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-300">Apply for Jobs</span>
        <a href="/Job" className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full transition-colors duration-300">
          Apply now!
        </a>
      </div>
    </div>
  );
}

function BottomBar() {
  return (
    <div className="border-t border-gray-600 mt-12 pt-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 text-sm">
        <div className="flex items-center gap-5">
         <Link to="/terms" className="text-gray-300 hover:text-[#f5c045] transition-colors duration-300">Terms of Service</Link>
          <Link to="/privacy/page1" className="text-gray-300 hover:text-[#f5c045] transition-colors duration-300">Privacy Policy</Link>
        </div>
        <p className="text-[#f5c045] text-center">Registered in England</p>
        <p className="text-[#f5c045] text-right">© 2025 Daily Assist UK. All rights reserved.</p>
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#2f2f2f] text-gray-300 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          <BrandColumn />
          <ServicesColumn />
          <CompanyColumn />
          <StaffColumn />
        </div>
        <BottomBar />
      </div>
    </footer>
  );
}


