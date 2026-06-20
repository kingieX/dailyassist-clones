import PackageDetailTemplate from "../components/sections/PackageDetailTemplate";

const data = {
  pageTitle: "Weekly Home-Help Package",
  subtext:
    "This package is designed for individuals who want consistent weekly support. A regular staff member visits twice a week to assist with agreed tasks, helping maintain comfort, routine, and independence.",
  packageTitle: "Weekly Home-Help Package",
  price: "£60",
  priceLabel: "per week",
  priceNote: '"Regular support with housework, errands and check-ins"',
  features: [
    "2 visits per week (1 hour each)",
    "Same staff member for consistency",
    "All services available",
  ],
  backLink: "/pricing",
  backLabel: "Back to Packages",
  otherPackages: [
    { title: "Standard Package", price: "£20 - £25 per week", href: "/pricing/basic" },
    { title: "Welfare Check-In Package", price: "£75 per week", href: "/pricing/premium" },
  ],
};

export default function PremiumPackage() {
  return <PackageDetailTemplate {...data} showPrices={false} />;
}