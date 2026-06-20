
// import { Routes, Route } from "react-router-dom";
// import Landing from "../pages/Landing";
// import ServicesPage from "../pages/Services";
// import Pricing from "../pages/Pricing";
// import FaQs from "../pages/FAQs";
// import About from "../pages/About";
// import Contact from "../pages/Contact";
// import HomeHelp from "../pages/HomeHelp";
// import Community from "../pages/community";
// import Errands from "../pages/errands";
// import Light from "../pages/light";
// import Transport from "../pages/transport";
// import Warfare from "../pages/warfare";
// import BasicPackage from "../pages/BasicPackage";
// import StandardPackage from "../pages/StandardPackage";
// import PremiumPackage from "../pages/PremiumPackage";

// import Terms from "../pages/Terms";

// import PrivacyPage1 from "../pages/privacy/PrivacyPage1";
// import PrivacyPage2 from "../pages/privacy/PrivacyPage2";
// import PrivacyPage3 from "../pages/privacy/PrivacyPage3";
// import PrivacyPage4 from "../pages/privacy/PrivacyPage4";
// import PrivacyPage5 from "../pages/privacy/PrivacyPage5";
// import PrivacyPage6 from "../pages/privacy/PrivacyPage6";
// import PrivacyPage7 from "../pages/privacy/PrivacyPage7";

// import Job from "../pages/Job";

// import StaffLogin from "../pages/StaffLogin";

// import Conduct from "../pages/codeConduct";

// import StaffContact from "../pages/staffContact";


// import WorkerDashboard from '../pages/WorkerDashboard'

// import AdminDashboard from '../pages/admin/AdminDashboard'

// export default function AppRouter() {
//   return (
//     <Routes>
//       <Route path="/" element={<Landing />} />
//       <Route path="/services" element={<ServicesPage />} />
//       <Route path="/pricing" element={<Pricing />} />
//       <Route path="/faqs" element={<FaQs />} />
//       <Route path="/about" element={<About />} />
//       <Route path="/contact" element={<Contact />} />
//       <Route path="/services/HomeHelp" element={<HomeHelp />} />
// <Route path="/services/community" element={<Community />} />
// <Route path="/services/errands" element={<Errands />} />
// <Route path="/services/light" element={<Light />} />
// <Route path="/services/transport" element={<Transport />} />
// <Route path="/services/warfare" element={<Warfare />} />
// <Route path="/pricing/basic" element={<BasicPackage />} />
// <Route path="/pricing/standard" element={<StandardPackage />} />
// <Route path="/pricing/premium" element={<PremiumPackage />} />
// <Route path="/terms" element={<Terms />} />

// <Route path="/privacy/page1" element={<PrivacyPage1 />} />
// <Route path="/privacy/page2" element={<PrivacyPage2 />} />
// <Route path="/privacy/page3" element={<PrivacyPage3 />} />
// <Route path="/privacy/page4" element={<PrivacyPage4 />} />
// <Route path="/privacy/page5" element={<PrivacyPage5 />} />
// <Route path="/privacy/page6" element={<PrivacyPage6 />} />
// <Route path="/privacy/page7" element={<PrivacyPage7 />} />

// <Route path="/Job" element={<Job />} />

// <Route path="/staff-login" element={<StaffLogin />} />

// <Route path="/code-of-conduct" element={<Conduct />} />

// <Route path="/staffContact" element={<StaffContact />} />


// <Route path="/dashboard" element={<WorkerDashboard />} />

// <Route path="/admin" element={<AdminDashboard />} />
//     </Routes>
//   );
// }

import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";

import Landing from "../pages/Landing";
import ServicesPage from "../pages/Services";
import Pricing from "../pages/Pricing";
import FaQs from "../pages/FAQs";
import About from "../pages/About";
import Contact from "../pages/Contact";
import HomeHelp from "../pages/HomeHelp";
import Community from "../pages/community";
import Errands from "../pages/errands";
import Light from "../pages/light";
import Transport from "../pages/transport";
import Warfare from "../pages/warfare";
import BasicPackage from "../pages/BasicPackage";
import StandardPackage from "../pages/StandardPackage";
import PremiumPackage from "../pages/PremiumPackage";
import Terms from "../pages/Terms";
import PrivacyPage1 from "../pages/privacy/PrivacyPage1";
import PrivacyPage2 from "../pages/privacy/PrivacyPage2";
import PrivacyPage3 from "../pages/privacy/PrivacyPage3";
import PrivacyPage4 from "../pages/privacy/PrivacyPage4";
import PrivacyPage5 from "../pages/privacy/PrivacyPage5";
import PrivacyPage6 from "../pages/privacy/PrivacyPage6";
import PrivacyPage7 from "../pages/privacy/PrivacyPage7";
import Job from "../pages/Job";
import StaffLogin from "../pages/StaffLogin";
import Conduct from "../pages/codeConduct";
import StaffContact from "../pages/staffContact";
import WorkerDashboard from "../pages/WorkerDashboard";
import AdminDashboard from "../pages/admin/AdminDashboard";

export default function AppRouter() {
  return (
    <Routes>
      {/* ── Public routes ── */}
      <Route path="/"                    element={<Landing />} />
      <Route path="/services"            element={<ServicesPage />} />
      <Route path="/pricing"             element={<Pricing />} />
      <Route path="/faqs"                element={<FaQs />} />
      <Route path="/about"               element={<About />} />
      <Route path="/contact"             element={<Contact />} />
      <Route path="/services/HomeHelp"   element={<HomeHelp />} />
      <Route path="/services/community"  element={<Community />} />
      <Route path="/services/errands"    element={<Errands />} />
      <Route path="/services/light"      element={<Light />} />
      <Route path="/services/transport"  element={<Transport />} />
      <Route path="/services/warfare"    element={<Warfare />} />
      <Route path="/pricing/basic"       element={<BasicPackage />} />
      <Route path="/pricing/standard"    element={<StandardPackage />} />
      <Route path="/pricing/premium"     element={<PremiumPackage />} />
      <Route path="/terms"               element={<Terms />} />
      <Route path="/privacy/page1"       element={<PrivacyPage1 />} />
      <Route path="/privacy/page2"       element={<PrivacyPage2 />} />
      <Route path="/privacy/page3"       element={<PrivacyPage3 />} />
      <Route path="/privacy/page4"       element={<PrivacyPage4 />} />
      <Route path="/privacy/page5"       element={<PrivacyPage5 />} />
      <Route path="/privacy/page6"       element={<PrivacyPage6 />} />
      <Route path="/privacy/page7"       element={<PrivacyPage7 />} />
      <Route path="/Job"                 element={<Job />} />
      <Route path="/staff-login"         element={<StaffLogin />} />
      <Route path="/code-of-conduct"     element={<Conduct />} />
      <Route path="/staffContact"        element={<StaffContact />} />

      {/* ── Protected: Worker only ── */}
      <Route path="/dashboard" element={
        <ProtectedRoute allowedRoles={["worker"]}>
          <WorkerDashboard />
        </ProtectedRoute>
      } />

      {/* ── Protected: Admin + Super Admin only ── */}
      <Route path="/admin" element={
        <ProtectedRoute allowedRoles={["admin", "super_admin"]}>
          <AdminDashboard />
        </ProtectedRoute>
      } />
    </Routes>
  );
}