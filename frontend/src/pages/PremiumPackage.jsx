import PackageDetailTemplate from "../components/sections/PackageDetailTemplate";

const data = {
  pageTitle: "Welfare Check-In Package",
  subtext:
    "This package is ideal for families who want reassurance that a loved one is safe, supported, and not feeling isolated during the week. Visits focus on well-being, companionship, and safety check-ins.",
  packageTitle: "Welfare Check-In Package",
  price: "£75",
  priceLabel: "per week",
  priceNote: '"Peace of mind with regular safety and wellbeing visits"',
  features: [
    "5 short visits per week (20 mins each)",
    "Safety and wellbeing checks",
    "Conversation & reassurance",
    "Ideal for loved ones living alone",
    "Regular contact throughout the week",
    "All services available",
  ],
  backLink: "/pricing",
  backLabel: "Back to Packages",
  otherPackages: [
    { title: "Standard Package", price: "£20 - £25 per week", href: "/pricing/basic" },
    { title: "Standard Package", price: "£60 per week", href: "/pricing/standard" },
  ],
};

export default function PremiumPackage() {
  return <PackageDetailTemplate {...data} showPrices={false} />;
}