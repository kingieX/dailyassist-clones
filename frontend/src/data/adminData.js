export const adminUser = {
  name: "Raphael Osuji",
  role: "Admin",
  avatar: null,
};

export const summaryCards = [
  { id: 1, title: "Visits Today",   value: 205, theme: "blue",   icon: "calendar", image: "/Images/admin/calendar.png" },
  { id: 2, title: "Staff on Duty",  value: 100, theme: "yellow", icon: "users",    image: "/Images/admin/card-staff.png"    },
  { id: 3, title: "Completed",      value: 105, theme: "green",  icon: "check",    image: "/Images/admin/card-check.png"    },
  { id: 4, title: "Pending / Late", value: 5,   theme: "red",    icon: "alert",    image: "/Images/admin/Late.png"    },
];

export const activityData = [
  { day: "MON",  value: 80  },
  { day: "TUES", value: 120 },
  { day: "WED",  value: 95  },
  { day: "THUR", value: 140 },
  { day: "FRI",  value: 190 },
  { day: "SAT",  value: 160 },
];

export const staffSchedule = [
  { id: 1, name: "Sam Smith",    time: "9:00am - 12:00am", status: "available",   avatar: null },
  { id: 2, name: "Alison Werner",time: "11:00am - 2:00pm", status: "unavailable", avatar: null },
  { id: 3, name: "Vivian Kane",  time: "9:00am - 10:00am", status: "available",   avatar: null },
];

export const alerts = [
  { id: 1, type: "warning", text: "1 Missed Check-In for Mr..."       },
  { id: 2, type: "info",    text: "2 Visit Logs Pending Submission"   },
  { id: 3, type: "yellow",  text: "Safeguarding Review Nee..."        },
];

export const todayVisits = [
  { id: 1, client: "Mrs. Alan Sarah",   address: "1 Church Stre...",  staff: "Lauren James",  time: "9:00am - 10:00am",  status: "completed"    },
  { id: 2, client: "Mr. Collins Rice",  address: "32 Meadow...",      staff: "Sarah Adeleke", time: "11:00am - 12:00pm", status: "in-progress"  },
  { id: 3, client: "Ms. Turner Stella", address: "17 Maples Av...",   staff: "James Brown",   time: "1:00pm - 2:00pm",   status: "late"         },
  { id: 4, client: "Mr. Martins Dyle",  address: "5 Briar Close,...", staff: "John Doe",      time: "3:00pm - 4:00pm",   status: "not-started"  },
];

export const reports = [
  { id: 1, text: "Provided home-help su...", time: "1 minutes ago", avatar: null },
  { id: 2, text: "Provided home-help su...", time: "1 minutes ago", avatar: null },
  { id: 3, text: "Provided home-help su...", time: "1 minutes ago", avatar: null },
];