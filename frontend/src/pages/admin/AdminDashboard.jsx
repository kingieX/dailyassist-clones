
// import { useState, useEffect } from "react";
// import { dashboardAPI, visitsAPI, reportsAPI } from "../../services/api";
// import { Calendar, Users, Home, Megaphone } from "lucide-react";
// import AdminSidebar from "../../components/admin/layout/AdminSidebar";
// import AdminNavbar from "../../components/admin/layout/AdminNavbar";
// import AdminMobileSidebar from "../../components/admin/layout/AdminMobileSidebar";
// import SummaryCard from "../../components/admin/dashboard/SummaryCard";
// import ActionButton from "../../components/admin/dashboard/ActionButton";
// import ActivityChart from "../../components/admin/dashboard/ActivityChart";
// import StaffSchedule from "../../components/admin/dashboard/StaffSchedule";
// import AlertsPanel from "../../components/admin/dashboard/AlertsPanel";
// import VisitsTable from "../../components/admin/dashboard/VisitsTable";
// import ReportPanel from "../../components/admin/dashboard/ReportPanel";
// import VisitsSection from "../../components/admin/visits/VisitsSection";
// import StaffManagement from "../../components/admin/staff/StaffManagement";
// import ClientsPage from "../../components/admin/clients/ClientsPage";
// import AddClientModal from "../../components/admin/modals/AddClientModal";
// import AddStaffModal from "../../components/admin/modals/AddStaffModal";
// import AssignVisitModal from "../../components/admin/modals/AssignVisitModal";
// import { adminUser, summaryCards } from "../../data/adminData";
// import BookingsPage from "../../components/admin/bookings/BookingsPage";
// import PackagesPage from "../../components/admin/packages/PackagesPage";
// import ReportsPage from "../../components/admin/reports/ReportsPage";
// import JobPostsPage from "../../components/admin/jobs/JobPostsPage";
// import RecruitmentPage from "../../components/admin/recruitment/RecruitmentPage";
// import MessagesPage from "../../components/admin/messages/MessagesPage";
// import SendAnnouncementPage from "../../components/admin/messages/SendAnnouncementPage";
// import SuperAdminSettingsPage from "../../components/admin/settings/SuperAdminSettingsPage";
// import AdminSettingsPage from "../../components/admin/settings/AdminSettingsPage";

// const actionButtons = [
//   { color: "blue",   icon: Calendar, label: "Assign Visit",     action: "assignVisit" },
//   { color: "yellow", icon: Users,    label: "Add Staff",         action: "addStaff"    },
//   { color: "green",  icon: Home,     label: "Add Client",        action: "addClient"   },
//   { color: "gray",   icon: Megaphone,label: "Send Announcement", action: "sendAnnouncement" },
// ];

// const today = new Date().toLocaleDateString("en-GB", {
//   day: "numeric", month: "short", year: "numeric",
// });

// export default function AdminDashboard() {
//   const [activeSection, setActiveSection]       = useState("dashboard");
//   const [mobileOpen, setMobileOpen]             = useState(false);
//   const [showAddClient, setShowAddClient]       = useState(false);
//   const [showAddStaff, setShowAddStaff]         = useState(false);
//   const [showAssignVisit, setShowAssignVisit]   = useState(false);
//   const [dashboardSummary, setDashboardSummary] = useState(null);
//   const [dashboardAlerts, setDashboardAlerts]   = useState([]);
//   const [dashboardCharts, setDashboardCharts]   = useState(null);
//   const [dashboardVisits, setDashboardVisits]   = useState([]);
//   const [dashboardReports, setDashboardReports] = useState([]);

//   useEffect(() => {
//     const fetchDashboard = async () => {
//       try {
//         const [summaryRes, alertsRes, chartsRes, visitsRes, reportsRes] = await Promise.all([
//           dashboardAPI.getSummary(),
//           dashboardAPI.getAlerts(),
//           dashboardAPI.getCharts(),
//           visitsAPI.getAll({ status: "ASSIGNED", startDate: new Date().toISOString().split("T")[0], endDate: new Date().toISOString().split("T")[0] }),
//           reportsAPI.getAll({ page: 1, limit: 10 }),
//         ]);
//         setDashboardSummary(summaryRes.data?.data ?? summaryRes.data);
//         setDashboardAlerts(alertsRes.data?.data  ?? alertsRes.data  ?? []);
//         setDashboardCharts(chartsRes.data?.data  ?? chartsRes.data);
//         const visitsData = visitsRes.data?.data ?? visitsRes.data ?? [];
//         setDashboardVisits(Array.isArray(visitsData) ? visitsData : []);
//         const reportsData = reportsRes.data?.data ?? reportsRes.data ?? [];
//         setDashboardReports(Array.isArray(reportsData) ? reportsData : []);
//       } catch (err) {
//         console.error("Dashboard fetch error:", err);
//       }
//     };
//     fetchDashboard();
//   }, []);
//   const handleActionButton = (action) => {
//     if (action === "addClient")   setShowAddClient(true);
//     if (action === "addStaff")    setShowAddStaff(true);
//     if (action === "assignVisit") setShowAssignVisit(true);
//     if (action === "sendAnnouncement") setActiveSection("sendannouncement");
//   };

//   return (
//     <div className="flex h-screen bg-[#F5F5F5] overflow-hidden">

//       {/* Desktop sidebar */}
//       <div className="hidden lg:block">
//         <AdminSidebar
//           activeSection={activeSection}
//           setActiveSection={setActiveSection}
//         />
//       </div>

//       {/* Mobile sidebar */}
//       <AdminMobileSidebar
//         isOpen={mobileOpen}
//         onClose={() => setMobileOpen(false)}
//         activeSection={activeSection}
//         setActiveSection={setActiveSection}
//       />

//       {/* Main content */}
//       <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
//         <AdminNavbar
//           user={adminUser}
//           onMenuClick={() => setMobileOpen(true)}
//         />

//       <main className="flex-1 overflow-y-auto">
//           {activeSection === "visits" ? (
//             <VisitsSection />
//           ) : activeSection === "staff" ? (
//             <StaffManagement />
//           ) : activeSection === "clients" ? (
//             <ClientsPage />
//           ) : activeSection === "bookings" ? (
//             <BookingsPage />
//             ) : activeSection === "packages" ? (
//               <PackagesPage />
//               ) : activeSection === "reports" ? (
//   <ReportsPage onNavigate={setActiveSection} />
//   ) : activeSection === "jobposts" ? (
//   <JobPostsPage />
//   ) : activeSection === "recruitment" ? (
//   <RecruitmentPage />
//  ) : activeSection === "messages" ? (
//   <MessagesPage />
//  ) : activeSection === "sendannouncement" ? (
//   <SendAnnouncementPage onBack={() => setActiveSection("messages")} />
//   // ) : activeSection === "settings" ? (
//   // <SuperAdminSettingsPage />
//   ) : activeSection === "settings" ? (
//   <AdminSettingsPage />
//           ) : (
            
//             <div className="px-4 sm:px-6 py-5 space-y-5">

//               {/* Page header + action buttons + date */}
//               <div className="flex flex-col sm:flex-row sm:items-start
//                               sm:justify-between gap-4">
//                 <div>
//                   <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
//                   <p className="text-lg font-semibold text-gray-500 mt-1">
//                     Here's an overview of today's operations.
//                   </p>
//                 </div>

//                 {/* Action buttons + date */}
//                 <div className="flex items-center gap-3 flex-wrap justify-end">
//                   <div className="flex items-center gap-2">
//                     {actionButtons.map((btn) => (
//                       <ActionButton
//                         key={btn.color}
//                         icon={btn.icon}
//                         label={btn.label}
//                         color={btn.color}
//                         size="lg"
//                         onClick={() => btn.action && handleActionButton(btn.action)}
//                       />
//                     ))}
//                   </div>

//                   {/* Date */}
//                   <div className="text-right bg-white border border-gray-200
//                                   rounded-xl px-5 py-1
//                                   shadow-[0_2px_12px_rgba(0,0,0,0.12)]">
//                     <p className="text-sm text-gray-400 font-medium">Today's Date</p>
//                     <p className="text-base font-bold text-gray-800">{today}</p>
//                   </div>
//                 </div>
//               </div>

//             {/* Summary cards */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//              {dashboardSummary ? (
//                   <>
//                   <SummaryCard id={1} title="Active Clients"       value={dashboardSummary.activeClients        ?? 0} theme="blue"   icon="calendar" image="/Images/admin/calendar.png"   />
// <SummaryCard id={2} title="Active Staff"         value={dashboardSummary.activeStaff          ?? 0} theme="yellow" icon="users"    image="/Images/admin/card-staff.png" />
// <SummaryCard id={3} title="Assigned Bookings"    value={dashboardSummary.assignedBookings      ?? 0} theme="green"  icon="check"    image="/Images/admin/card-check.png" />
// <SummaryCard id={4} title="Pending Applications" value={dashboardSummary.pendingApplications  ?? 0} theme="red"    icon="alert"    image="/Images/admin/Late.png"       />
//                   </>
//                 ) : (
//                   summaryCards.map((card) => (
//                     <SummaryCard key={card.id} {...card} />
//                   ))
//                 )}
//               </div>

//               {/* Middle row: Activity + Staff Schedule + Alerts */}
//               <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
//                 <div className="lg:col-span-1">
//                   <ActivityChart chartData={dashboardCharts} />
//                 </div>
//                 <div className="lg:col-span-1">
//                  <StaffSchedule staffData={dashboardVisits} />
//                 </div>
//                 <div className="lg:col-span-1">
//                   <AlertsPanel alerts={dashboardAlerts} />
//                 </div>
//               </div>

//               {/* Bottom row: Visits table + Report panel */}
//               <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
//                 <div className="lg:col-span-3">
//                   <VisitsTable visitsData={dashboardVisits} />
//                 </div>
//                 <div className="lg:col-span-1">
//                   <ReportPanel reportsData={dashboardReports} />
//                 </div>
//               </div>

//             </div>
//           )}
//         </main>
//       </div>

//       {/* ── Modals ── */}
//       <AddClientModal
//         isOpen={showAddClient}
//         onClose={() => setShowAddClient(false)}
//       />

//       <AddStaffModal
//         isOpen={showAddStaff}
//         onClose={() => setShowAddStaff(false)}
//       />

//       <AssignVisitModal
//         isOpen={showAssignVisit}
//         onClose={() => setShowAssignVisit(false)}
//       />
//     </div>
//   );
// }




// import { useState, useEffect } from "react";
// import { dashboardAPI, visitsAPI, reportsAPI } from "../../services/api";
// import { Calendar, Users, Home, Megaphone } from "lucide-react";
// import AdminSidebar from "../../components/admin/layout/AdminSidebar";
// import AdminNavbar from "../../components/admin/layout/AdminNavbar";
// import AdminMobileSidebar from "../../components/admin/layout/AdminMobileSidebar";
// import SummaryCard from "../../components/admin/dashboard/SummaryCard";
// import ActionButton from "../../components/admin/dashboard/ActionButton";
// import ActivityChart from "../../components/admin/dashboard/ActivityChart";
// import StaffSchedule from "../../components/admin/dashboard/StaffSchedule";
// import AlertsPanel from "../../components/admin/dashboard/AlertsPanel";
// import VisitsTable from "../../components/admin/dashboard/VisitsTable";
// import ReportPanel from "../../components/admin/dashboard/ReportPanel";
// import VisitsSection from "../../components/admin/visits/VisitsSection";
// import StaffManagement from "../../components/admin/staff/StaffManagement";
// import ClientsPage from "../../components/admin/clients/ClientsPage";
// import AddClientModal from "../../components/admin/modals/AddClientModal";
// import AddStaffModal from "../../components/admin/modals/AddStaffModal";
// import AssignVisitModal from "../../components/admin/modals/AssignVisitModal";
// import { adminUser, summaryCards } from "../../data/adminData";
// import BookingsPage from "../../components/admin/bookings/BookingsPage";
// import PackagesPage from "../../components/admin/packages/PackagesPage";
// import ReportsPage from "../../components/admin/reports/ReportsPage";
// import JobPostsPage from "../../components/admin/jobs/JobPostsPage";
// import RecruitmentPage from "../../components/admin/recruitment/RecruitmentPage";
// import MessagesPage from "../../components/admin/messages/MessagesPage";
// import SendAnnouncementPage from "../../components/admin/messages/SendAnnouncementPage";
// import AdminSettingsPage from "../../components/admin/settings/AdminSettingsPage";

// const actionButtons = [
//   { color: "blue",   icon: Calendar, label: "Assign Visit",      action: "assignVisit"      },
//   { color: "yellow", icon: Users,    label: "Add Staff",          action: "addStaff"         },
//   { color: "green",  icon: Home,     label: "Add Client",         action: "addClient"        },
//   { color: "gray",   icon: Megaphone,label: "Send Announcement",  action: "sendAnnouncement" },
// ];

// const today = new Date().toLocaleDateString("en-GB", {
//   day: "numeric", month: "short", year: "numeric",
// });

// export default function AdminDashboard() {
//   const [activeSection, setActiveSection]       = useState("dashboard");
//   const [mobileOpen, setMobileOpen]             = useState(false);
//   const [showAddClient, setShowAddClient]       = useState(false);
//   const [showAddStaff, setShowAddStaff]         = useState(false);
//   const [showAssignVisit, setShowAssignVisit]   = useState(false);
//   const [dashboardSummary, setDashboardSummary] = useState(null);
//   const [dashboardAlerts, setDashboardAlerts]   = useState([]);
//   const [dashboardCharts, setDashboardCharts]   = useState(null);
//   const [dashboardVisits, setDashboardVisits]   = useState([]);
//   const [dashboardReports, setDashboardReports] = useState([]);

//   useEffect(() => {
//     const fetchDashboard = async () => {
//       // Fetch summary, alerts and charts together
//       try {
//         const [summaryRes, alertsRes, chartsRes] = await Promise.all([
//           dashboardAPI.getSummary(),
//           dashboardAPI.getAlerts(),
//           dashboardAPI.getCharts(),
//         ]);
//         setDashboardSummary(summaryRes.data?.data ?? summaryRes.data);
//         setDashboardAlerts(alertsRes.data?.data   ?? alertsRes.data  ?? []);
//         setDashboardCharts(chartsRes.data?.data   ?? chartsRes.data);
//       } catch (err) {
//         console.error("Dashboard fetch error:", err);
//       }

//       // Fetch visits separately so it doesn't break the dashboard
//       try {
//         const visitsRes = await visitsAPI.getAll({ page: 1, limit: 20 });
//         const visitsData = visitsRes.data?.data ?? visitsRes.data ?? [];
//         setDashboardVisits(Array.isArray(visitsData) ? visitsData : []);
//       } catch (err) {
//         console.error("Visits fetch error:", err);
//       }

//       // Fetch reports separately so it doesn't break the dashboard
//       try {
//         const reportsRes = await reportsAPI.getAll({ page: 1, limit: 10 });
//         const reportsData = reportsRes.data?.data ?? reportsRes.data ?? [];
//         setDashboardReports(Array.isArray(reportsData) ? reportsData : []);
//       } catch (err) {
//         console.error("Reports fetch error:", err);
//       }
//     };

//     fetchDashboard();
//   }, []);

//   const handleActionButton = (action) => {
//     if (action === "addClient")        setShowAddClient(true);
//     if (action === "addStaff")         setShowAddStaff(true);
//     if (action === "assignVisit")      setShowAssignVisit(true);
//     if (action === "sendAnnouncement") setActiveSection("sendannouncement");
//   };

//   return (
//     <div className="flex h-screen bg-[#F5F5F5] overflow-hidden">

//       {/* Desktop sidebar */}
//       <div className="hidden lg:block">
//         <AdminSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
//       </div>

//       {/* Mobile sidebar */}
//       <AdminMobileSidebar
//         isOpen={mobileOpen}
//         onClose={() => setMobileOpen(false)}
//         activeSection={activeSection}
//         setActiveSection={setActiveSection}
//       />

//       {/* Main content */}
//       <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
//         <AdminNavbar user={adminUser} onMenuClick={() => setMobileOpen(true)} />

//         <main className="flex-1 overflow-y-auto">
//           {activeSection === "visits" ? (
//             <VisitsSection />
//           ) : activeSection === "staff" ? (
//             <StaffManagement />
//           ) : activeSection === "clients" ? (
//             <ClientsPage />
//           ) : activeSection === "bookings" ? (
//             <BookingsPage />
//           ) : activeSection === "packages" ? (
//             <PackagesPage />
//           ) : activeSection === "reports" ? (
//             <ReportsPage onNavigate={setActiveSection} />
//           ) : activeSection === "jobposts" ? (
//             <JobPostsPage />
//           ) : activeSection === "recruitment" ? (
//             <RecruitmentPage />
//           ) : activeSection === "messages" ? (
//             <MessagesPage onNavigate={setActiveSection} />
//           ) : activeSection === "sendannouncement" ? (
//             <SendAnnouncementPage onBack={() => setActiveSection("messages")} />
//           ) : activeSection === "settings" ? (
//             <AdminSettingsPage />
//           ) : (

//             <div className="px-4 sm:px-6 py-5 space-y-5">

//               {/* Page header + action buttons + date */}
//               <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
//                 <div>
//                   <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
//                   <p className="text-lg font-semibold text-gray-500 mt-1">
//                     Here's an overview of today's operations.
//                   </p>
//                 </div>
//                 <div className="flex items-center gap-3 flex-wrap justify-end">
//                   <div className="flex items-center gap-2">
//                     {actionButtons.map((btn) => (
//                       <ActionButton
//                         key={btn.color}
//                         icon={btn.icon}
//                         label={btn.label}
//                         color={btn.color}
//                         size="lg"
//                         onClick={() => btn.action && handleActionButton(btn.action)}
//                       />
//                     ))}
//                   </div>
//                   <div className="text-right bg-white border border-gray-200 rounded-xl px-5 py-1 shadow-[0_2px_12px_rgba(0,0,0,0.12)]">
//                     <p className="text-sm text-gray-400 font-medium">Today's Date</p>
//                     <p className="text-base font-bold text-gray-800">{today}</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Summary cards */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//                 {dashboardSummary ? (
//                   <>
//                     <SummaryCard id={1} title="Active Clients"       value={dashboardSummary.activeClients       ?? 0} theme="blue"   icon="calendar" image="/Images/admin/calendar.png"   />
//                     <SummaryCard id={2} title="Active Staff"         value={dashboardSummary.activeStaff         ?? 0} theme="yellow" icon="users"    image="/Images/admin/card-staff.png" />
//                     <SummaryCard id={3} title="Assigned Bookings"    value={dashboardSummary.assignedBookings    ?? 0} theme="green"  icon="check"    image="/Images/admin/card-check.png" />
//                     <SummaryCard id={4} title="Pending Applications" value={dashboardSummary.pendingApplications ?? 0} theme="red"    icon="alert"    image="/Images/admin/Late.png"       />
//                   </>
//                 ) : (
//                   summaryCards.map((card) => (
//                     <SummaryCard key={card.id} {...card} />
//                   ))
//                 )}
//               </div>

//               {/* Middle row: Activity + Staff Schedule + Alerts */}
//               <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
//                 <div className="lg:col-span-1">
//                   <ActivityChart chartData={dashboardCharts} />
//                 </div>
//                 <div className="lg:col-span-1">
//                   <StaffSchedule staffData={dashboardVisits} />
//                 </div>
//                 <div className="lg:col-span-1">
//                   <AlertsPanel alerts={dashboardAlerts} />
//                 </div>
//               </div>

//               {/* Bottom row: Visits table + Report panel */}
//               <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
//                 <div className="lg:col-span-3">
//                   <VisitsTable visitsData={dashboardVisits} />
//                 </div>
//                 <div className="lg:col-span-1">
//                   <ReportPanel reportsData={dashboardReports} />
//                 </div>
//               </div>

//             </div>
//           )}
//         </main>
//       </div>

//       {/* Modals */}
//       <AddClientModal  isOpen={showAddClient}   onClose={() => setShowAddClient(false)}   />
//       <AddStaffModal   isOpen={showAddStaff}    onClose={() => setShowAddStaff(false)}    />
//       <AssignVisitModal isOpen={showAssignVisit} onClose={() => setShowAssignVisit(false)} />
//     </div>
//   );
// }




import { useState, useEffect } from "react";
import { dashboardAPI, visitsAPI, reportsAPI, staffAPI } from "../../services/api";
import { Calendar, Users, Home, Megaphone } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import AdminSidebar from "../../components/admin/layout/AdminSidebar";
import AdminNavbar from "../../components/admin/layout/AdminNavbar";
import AdminMobileSidebar from "../../components/admin/layout/AdminMobileSidebar";
import SummaryCard from "../../components/admin/dashboard/SummaryCard";
import ActionButton from "../../components/admin/dashboard/ActionButton";
import ActivityChart from "../../components/admin/dashboard/ActivityChart";
import StaffSchedule from "../../components/admin/dashboard/StaffSchedule";
import AlertsPanel from "../../components/admin/dashboard/AlertsPanel";
import VisitsTable from "../../components/admin/dashboard/VisitsTable";
import ReportPanel from "../../components/admin/dashboard/ReportPanel";
import VisitsSection from "../../components/admin/visits/VisitsSection";
import StaffManagement from "../../components/admin/staff/StaffManagement";
import ClientsPage from "../../components/admin/clients/ClientsPage";
import AddClientModal from "../../components/admin/modals/AddClientModal";
import AddStaffModal from "../../components/admin/modals/AddStaffModal";
import AssignVisitModal from "../../components/admin/modals/AssignVisitModal";
import BookingsPage from "../../components/admin/bookings/BookingsPage";
import PackagesPage from "../../components/admin/packages/PackagesPage";
import ReportsPage from "../../components/admin/reports/ReportsPage";
import JobPostsPage from "../../components/admin/jobs/JobPostsPage";
import RecruitmentPage from "../../components/admin/recruitment/RecruitmentPage";
import MessagesPage from "../../components/admin/messages/MessagesPage";
import SendAnnouncementPage from "../../components/admin/messages/SendAnnouncementPage";
import AdminSettingsPage from "../../components/admin/settings/AdminSettingsPage";

const actionButtons = [
  { color: "blue",   icon: Calendar,  label: "Assign Visit",      action: "assignVisit"      },
  { color: "yellow", icon: Users,     label: "Add Staff",         action: "addStaff"         },
  { color: "green",  icon: Home,      label: "Add Client",        action: "addClient"        },
  { color: "gray",   icon: Megaphone, label: "Send Announcement", action: "sendAnnouncement" },
];

const today = new Date().toLocaleDateString("en-GB", {
  day: "numeric", month: "short", year: "numeric",
});

function SummaryCardSkeleton() {
  return (
    <div className="rounded-2xl bg-white border border-gray-100 p-5 animate-pulse h-[110px]" />
  );
}

export default function AdminDashboard() {
  const { user } = useAuth();

  const [activeSection, setActiveSection]       = useState("dashboard");
  const [mobileOpen, setMobileOpen]             = useState(false);
  const [showAddClient, setShowAddClient]       = useState(false);
  const [showAddStaff, setShowAddStaff]         = useState(false);
  const [showAssignVisit, setShowAssignVisit]   = useState(false);
  const [summaryLoading, setSummaryLoading]     = useState(true);
  const [dashboardSummary, setDashboardSummary] = useState(null);
  const [dashboardAlerts, setDashboardAlerts]   = useState([]);
  const [dashboardCharts, setDashboardCharts]   = useState(null);
  const [dashboardVisits, setDashboardVisits]   = useState([]);
  const [dashboardStaff, setDashboardStaff]     = useState([]);
  const [dashboardReports, setDashboardReports] = useState([]);

  useEffect(() => {
    const fetchDashboard = async () => {
      setSummaryLoading(true);
      try {
        const [summaryRes, alertsRes, chartsRes] = await Promise.all([
          dashboardAPI.getSummary(),
          dashboardAPI.getAlerts(),
          dashboardAPI.getCharts(),
        ]);
        setDashboardSummary(summaryRes.data?.data ?? summaryRes.data);
        setDashboardAlerts(alertsRes.data?.data   ?? alertsRes.data  ?? []);
        setDashboardCharts(chartsRes.data?.data   ?? chartsRes.data);
      } catch (err) {
        console.error("Dashboard summary fetch error:", err);
      } finally {
        setSummaryLoading(false);
      }

      try {
        const visitsRes = await visitsAPI.getAll({ page: 1, limit: 20 });
        const visitsData = visitsRes.data?.data ?? visitsRes.data ?? [];
        setDashboardVisits(Array.isArray(visitsData) ? visitsData : []);
      } catch (err) {
        console.error("Visits fetch error:", err);
      }

      try {
        const staffRes = await staffAPI.getAll();
        const staffData = staffRes.data?.data ?? staffRes.data ?? [];
        setDashboardStaff(Array.isArray(staffData) ? staffData : []);
      } catch (err) {
        console.error("Staff fetch error:", err);
      }

      try {
        const reportsRes = await reportsAPI.getAll({ page: 1, limit: 10 });
        const reportsData = reportsRes.data?.data ?? reportsRes.data ?? [];
        setDashboardReports(Array.isArray(reportsData) ? reportsData : []);
      } catch (err) {
        console.error("Reports fetch error:", err);
      }
    };

    fetchDashboard();
  }, []);

  const alertCount =
    (dashboardAlerts?.unassignedRequestedBookings?.length ?? 0) +
    (dashboardAlerts?.overdueRequestedBookings?.length ?? 0);

  const handleActionButton = (action) => {
    if (action === "addClient")        setShowAddClient(true);
    if (action === "addStaff")         setShowAddStaff(true);
    if (action === "assignVisit")      setShowAssignVisit(true);
    if (action === "sendAnnouncement") setActiveSection("sendannouncement");
  };

  return (
    <div className="flex h-screen bg-[#F5F5F5] overflow-hidden">

      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <AdminSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      </div>

      {/* Mobile sidebar */}
      <AdminMobileSidebar
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main content */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <AdminNavbar
          user={user}
          onMenuClick={() => setMobileOpen(true)}
          alertCount={alertCount}
        />

        <main className="flex-1 overflow-y-auto">
          {activeSection === "visits" ? (
            <VisitsSection />
          ) : activeSection === "staff" ? (
            <StaffManagement />
          ) : activeSection === "clients" ? (
            <ClientsPage />
          ) : activeSection === "bookings" ? (
            <BookingsPage />
          ) : activeSection === "packages" ? (
            <PackagesPage />
          ) : activeSection === "reports" ? (
            <ReportsPage onNavigate={setActiveSection} />
          ) : activeSection === "jobposts" ? (
            <JobPostsPage />
          ) : activeSection === "recruitment" ? (
            <RecruitmentPage />
          ) : activeSection === "messages" ? (
            <MessagesPage onNavigate={setActiveSection} />
          ) : activeSection === "sendannouncement" ? (
            <SendAnnouncementPage onBack={() => setActiveSection("messages")} />
          ) : activeSection === "settings" ? (
            <AdminSettingsPage />
          ) : (

            <div className="px-4 sm:px-6 py-5 space-y-5">

              {/* Page header + action buttons + date */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                  <p className="text-lg font-semibold text-gray-500 mt-1">
                    Here's an overview of today's operations.
                  </p>
                </div>
                <div className="flex items-center gap-3 flex-wrap justify-end">
                  <div className="flex items-center gap-2">
                    {actionButtons.map((btn) => (
                      <ActionButton
                        key={btn.color}
                        icon={btn.icon}
                        label={btn.label}
                        color={btn.color}
                        size="lg"
                        onClick={() => btn.action && handleActionButton(btn.action)}
                      />
                    ))}
                  </div>
                  <div className="text-right bg-white border border-gray-200 rounded-xl px-5 py-1 shadow-[0_2px_12px_rgba(0,0,0,0.12)]">
                    <p className="text-sm text-gray-400 font-medium">Today's Date</p>
                    <p className="text-base font-bold text-gray-800">{today}</p>
                  </div>
                </div>
              </div>

              {/* Summary cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {summaryLoading ? (
                  <>
                    <SummaryCardSkeleton />
                    <SummaryCardSkeleton />
                    <SummaryCardSkeleton />
                    <SummaryCardSkeleton />
                  </>
                ) : dashboardSummary ? (
                  <>
                    <SummaryCard id={1} title="Visits Today"   value={dashboardSummary.visitsToday   ?? 0} theme="blue"   icon="calendar" image="/Images/admin/calendar.png"   />
                    <SummaryCard id={2} title="Staff on Duty"  value={dashboardSummary.staffOnDuty   ?? 0} theme="yellow" icon="users"    image="/Images/admin/card-staff.png" />
                    <SummaryCard id={3} title="Completed"      value={dashboardSummary.completed     ?? 0} theme="green"  icon="check"    image="/Images/admin/card-check.png" />
                    <SummaryCard id={4} title="Pending / Late" value={dashboardSummary.pendingOrLate ?? 0} theme="red"    icon="alert"    image="/Images/admin/Late.png"       />
                  </>
                ) : (
                  <>
                    <SummaryCard id={1} title="Visits Today"   value={0} theme="blue"   icon="calendar" image="/Images/admin/calendar.png"   />
                    <SummaryCard id={2} title="Staff on Duty"  value={0} theme="yellow" icon="users"    image="/Images/admin/card-staff.png" />
                    <SummaryCard id={3} title="Completed"      value={0} theme="green"  icon="check"    image="/Images/admin/card-check.png" />
                    <SummaryCard id={4} title="Pending / Late" value={0} theme="red"    icon="alert"    image="/Images/admin/Late.png"       />
                  </>
                )}
              </div>

              {/* Middle row: Activity + Staff Schedule + Alerts */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-1">
                  <ActivityChart chartData={dashboardCharts} />
                </div>
                <div className="lg:col-span-1">
                  <StaffSchedule staffData={dashboardStaff} onViewAll={() => setActiveSection("visits")} />
                </div>
                <div className="lg:col-span-1">
                  <AlertsPanel alerts={dashboardAlerts} />
                </div>
              </div>

              {/* Bottom row: Visits table + Report panel */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                <div className="lg:col-span-3">
                  <VisitsTable visitsData={dashboardVisits} onViewAll={() => setActiveSection("visits")} />
                </div>
                <div className="lg:col-span-1">
                  <ReportPanel reportsData={dashboardReports} />
                </div>
              </div>

            </div>
          )}
        </main>
      </div>

      {/* Modals */}
      <AddClientModal   isOpen={showAddClient}   onClose={() => setShowAddClient(false)}   />
      <AddStaffModal    isOpen={showAddStaff}    onClose={() => setShowAddStaff(false)}    />
      <AssignVisitModal isOpen={showAssignVisit} onClose={() => setShowAssignVisit(false)} />
    </div>
  );
}