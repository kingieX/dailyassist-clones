import { Clock, Home, Heart } from "lucide-react";

export const packagesData = [
  {
    id: "PKG001",
    icon: "clock",
    name: "Standard Package",
    price: "£20 - £25",
    duration: "per hour",
    tagline: '"Flexible hourly support when you need it"',
    features: [
      "Works weekdays & daytime",
      "Perfect for one-off visits",
      "All services available",
    ],
    additionalCharge: null,
    highlighted: false,
  },
  {
    id: "PKG002",
    icon: "home",
    name: "Weekly Home-Help Package",
    price: "£60",
    duration: "per week",
    tagline: '"Regular support with housework, errands and check-ins"',
    features: [
      "2 visits per week (1 hour each)",
      "Same staff member for consistency",
      "All services available",
    ],
    additionalCharge: null,
    highlighted: true,
  },
  {
    id: "PKG003",
    icon: "heart",
    name: "Welfare Check-In Package",
    price: "£75",
    duration: "per week",
    tagline: '"Peace of mind with regular safety and wellbeing visits"',
    features: [
      "5 short visits per week (20 mins each)",
      "Safety and wellbeing checks",
      "Conversation & reassurance",
      "Ideal for loved ones living alone",
      "Regular contact throughout the week",
      "All services available",
    ],
    additionalCharge: null,
    highlighted: false,
  },
];