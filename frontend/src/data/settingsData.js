// ── Notification Settings ─────────────────────────────────────────────────────
export const notificationItems = [
  {
    key: "accountSignin",
    label: "Account Sign-in",
    sub: "You'll get notified when someone logs into the admin dashboard",
    defaultEmail: true,
    defaultDashboard: false,
  },
  {
    key: "accountInfoChanges",
    label: "Account information changes",
    sub: "You'll get notified when account information is updated in the dashboard",
    defaultEmail: true,
    defaultDashboard: false,
  },
  {
    key: "bookingRequest",
    label: "Booking Request",
    sub: "You'll get notified when a client request for any of your services",
    defaultEmail: true,
    defaultDashboard: true,
  },
  {
    key: "staffCheckin",
    label: "Staff Check-in",
    sub: "You'll get notified when a staff checks-in at the client's home to carryout a task or visit",
    defaultEmail: true,
    defaultDashboard: true,
  },
  {
    key: "staffCheckout",
    label: "Staff Check-Out / Visit Log Submission",
    sub: "You'll get notified when a staff checks-out on task or visit completion at the client's home",
    defaultEmail: true,
    defaultDashboard: true,
  },
  {
    key: "missedCheckin",
    label: "Staff Missed Check-In Time",
    sub: "You'll get notified when a staff misses check-in time for a task or visit",
    defaultEmail: true,
    defaultDashboard: true,
  },
  {
    key: "missedCheckout",
    label: "Staff Missed Check-Out Time",
    sub: "You'll get notified when a staff misses check-out time for a task or visit",
    defaultEmail: true,
    defaultDashboard: true,
  },
];

// ── Roles & Permissions ───────────────────────────────────────────────────────
export const adminPermissions = [
  { key: "approveBookings", label: "Approve Bookings", value: true  },
  { key: "assignVisits",    label: "Assign Visits",    value: true  },
  { key: "manageClients",   label: "Manage Clients",   value: true  },
  { key: "addOtherAdmin",   label: "Add Other Admin",  value: false },
  { key: "manageStaff",     label: "Manage Staff",     value: true  },
  { key: "sendMessage",     label: "Send Message",     value: true  },
  { key: "viewReports",     label: "View Reports",     value: true  },
];

export const staffPermissions = [
  { key: "approveBookings",  label: "Approve Bookings",   value: false },
  { key: "viewAssignVisits", label: "View Assign Visits", value: true  },
  { key: "manageClients",    label: "Manage Clients",     value: false },
  { key: "manageStaff",      label: "Manage Staff",       value: true  },
  { key: "sendMessage",      label: "Send Message",       value: true  },
  { key: "viewReports",      label: "View Reports",       value: false },
];

export const systemLogs = [
  { id:1,  time:"09:45 AM", user:"Admin John",  action:"Assigned",  module:"Visit Scheduling", affectedItem:"Visit ID: VST-1023", description:"Sarah Johnson assigned to visit for Mrs. Alan.",              ipAddress:"192.168.0.45", status:"Success"   },
  { id:2,  time:"09:30 AM", user:"Admin John",  action:"Created",   module:"Clients",          affectedItem:"Client ID: CLT-0892",description:"New client profile created for James Okafor.",               ipAddress:"192.168.0.45", status:"Success"   },
  { id:3,  time:"09:10 AM", user:"Staff Emma",  action:"Submitted", module:"Visit Logs",       affectedItem:"Visit ID: VST-1021", description:"Visit log submitted for morning care session.",              ipAddress:"192.168.1.12", status:"Success"   },
  { id:4,  time:"08:55 AM", user:"Admin John",  action:"Updated",   module:"Service",          affectedItem:"Package ID: PKG-003",description:"Personal care package description updated.",                 ipAddress:"192.168.0.45", status:"Success"   },
  { id:5,  time:"08:40 AM", user:"Admin John",  action:"Deleted",   module:"Clients",          affectedItem:"Client ID: CLT-0771",description:"Client profile for Grace Eze permanently removed.",          ipAddress:"192.168.0.45", status:"Warning"   },
  { id:6,  time:"08:32 AM", user:"Staff Mark",  action:"Attempted", module:"Check-in",         affectedItem:"Visit ID: VST-1019", description:"Check-in attempted outside the allowed time window.",       ipAddress:"192.168.1.34", status:"Failed"    },
  { id:7,  time:"08:20 AM", user:"Admin John",  action:"Approved",  module:"Bookings",         affectedItem:"Booking ID: BKG-204",description:"Client booking request approved for next Monday.",           ipAddress:"192.168.0.45", status:"Success"   },
  { id:8,  time:"08:15 AM", user:"System",      action:"Sent",      module:"Notification",     affectedItem:"Visit ID: VST-1018", description:"Visit reminder sent to assigned staff members.",            ipAddress:"127.0.0.1",    status:"Success"   },
  { id:9,  time:"08:00 AM", user:"System",      action:"Triggered", module:"Alerts",           affectedItem:"Visit ID: VST-1017", description:"Missed check-in alert triggered for overdue visit.",        ipAddress:"127.0.0.1",    status:"Warning"   },
  { id:10, time:"07:55 AM", user:"Admin John",  action:"Cancelled", module:"Bookings",         affectedItem:"Booking ID: BKG-198",description:"Booking cancelled by admin due to client request.",          ipAddress:"192.168.0.45", status:"Cancelled" },
  { id:11, time:"07:40 AM", user:"Admin John",  action:"Created",   module:"Staff",            affectedItem:"Staff ID: STF-056",  description:"New staff member David Olu added to the system.",          ipAddress:"192.168.0.45", status:"Success"   },
  { id:12, time:"07:20 AM", user:"Staff Emma",  action:"Submitted", module:"Visit Logs",       affectedItem:"Visit ID: VST-1015", description:"Morning care visit log submitted successfully.",            ipAddress:"192.168.1.12", status:"Success"   },
  { id:13, time:"07:10 AM", user:"System",      action:"Triggered", module:"Alerts",           affectedItem:"Visit ID: VST-1014", description:"Missed checkout alert triggered for incomplete visit.",     ipAddress:"127.0.0.1",    status:"Warning"   },
  { id:14, time:"06:55 AM", user:"Admin John",  action:"Updated",   module:"Settings",         affectedItem:"Role: Admin",        description:"Admin role permissions updated by super admin.",           ipAddress:"192.168.0.45", status:"Success"   },
  { id:15, time:"06:40 AM", user:"Admin John",  action:"Approved",  module:"Bookings",         affectedItem:"Booking ID: BKG-195",description:"Weekend booking approved for Mrs. Chioma.",                 ipAddress:"192.168.0.45", status:"Success"   },
  { id:16, time:"06:30 AM", user:"Staff Mark",  action:"Attempted", module:"Check-in",         affectedItem:"Visit ID: VST-1013", description:"Late check-in attempt recorded for morning visit.",        ipAddress:"192.168.1.34", status:"Failed"    },
  { id:17, time:"06:15 AM", user:"System",      action:"Sent",      module:"Notification",     affectedItem:"All Staff",          description:"Daily visit summary notification sent to all staff.",      ipAddress:"127.0.0.1",    status:"Success"   },
  { id:18, time:"06:00 AM", user:"Admin John",  action:"Deleted",   module:"Messages",         affectedItem:"Message ID: MSG-089",description:"Outdated announcement message deleted by admin.",           ipAddress:"192.168.0.45", status:"Warning"   },
  { id:19, time:"05:50 AM", user:"Admin John",  action:"Assigned",  module:"Visits",           affectedItem:"Visit ID: VST-1010", description:"Morning visit assigned to staff member Sarah.",           ipAddress:"192.168.0.45", status:"Success"   },
  { id:20, time:"05:40 AM", user:"Staff Emma",  action:"Submitted", module:"Visit Logs",       affectedItem:"Visit ID: VST-1009", description:"Early morning visit log submitted by staff.",             ipAddress:"192.168.1.12", status:"Success"   },
];

export const logUserOptions    = ["Admin", "Operation Manager", "Staff", "System"];
export const logActionOptions  = ["Created","Updated","Deleted","Assigned","Approved","Triggered","Submitted","Attempted","Sent","Cancelled"];
export const logModuleOptions  = ["Clients","Staff","Visits","Bookings","Messages","Settings","Alerts","Notification","Check-in","Visit logs","Service"];
export const dateRangeOptions  = ["Today","Yesterday","Last 7 Days","Last 30 Days","This Month","Custom Range"];
export const statusColors      = {
  Success:   "text-green-500",
  Warning:   "text-amber-500",
  Failed:    "text-red-500",
  Cancelled: "text-gray-400",
};